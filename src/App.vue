<script>
import AddTask from '@/components/AddTask.vue'
import { computed, ref, watch } from 'vue'
import useStorage from '@/hooks/use-storage'
import TaskItem from './components/TaskItem.vue'
import ExclamationIcon from './assets/exclamation-icon.svg?component'
import CheckIcon from './assets/check-icon.svg?component'

export default {
  components: {
    AddTask,
    TaskItem,
    ExclamationIcon,
    CheckIcon
  },

  setup() {
    const { getItem, setItem } = useStorage()
    const tasks = ref(JSON.parse(getItem('tasks') || '[]'))

    function addTask(text) {
      if (!text) return
      tasks.value = [
        {
          title: text,
          completed: false
        },
        ...tasks.value
      ]
    }

    function deleteTask(id) {
      tasks.value = tasks.value.filter((_, index) => index !== id)
    }

    function toggleComplete(id) {
      const updatedTask = tasks.value.map((task, index) => {
        if (index === id) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task
      })

      tasks.value = updatedTask
    }

    watch(tasks, () => {
      setItem('tasks', JSON.stringify(tasks.value))
    })

    const allPendingTasks = computed(() => {
      const pendingTasks = tasks.value.filter((task) => !task.completed)
      return pendingTasks
    })

    const allCompletedTasks = computed(() => {
      const completedTasks = tasks.value.filter((task) => task.completed)
      return completedTasks
    })

    return {
      tasks,
      addTask,
      deleteTask,
      toggleComplete,
      allPendingTasks,
      allCompletedTasks
    }
  }
}
</script>

<template>
  <header
    role="banner"
    class="bg-gray-700 flex justify-center py-5 px-2 w-full fixed top-0 left-[50%] right-[50%] translate-x-[-50%] z-10 h-[70px] shadow-gray-400 shadow-sm max-w-[1920px]"
  >
    <div class="max-w-[768px] px-4 mx-auto w-full flex justify-between items-center gap-2">
      <h1 class="font-bold text-lg lg:text-xl text-white">TASKS FOR TODAY</h1>
      <div class="flex items-center gap-2">
        <span class="flex gap-1 items-center">
          <ExclamationIcon class="w-5 h-5" />
          <b class="text-white font-medium text-sm">{{ allPendingTasks.length }}</b>
        </span>

        <span class="flex gap-1 items-center">
          <CheckIcon class="w-5 h-5" />
          <b class="text-white font-medium text-sm">{{ allCompletedTasks.length }}</b>
        </span>
      </div>
    </div>
  </header>

  <main role="main" class="w-full py-8 px-4 max-w-[768px] mx-auto mt-[70px]">
    <AddTask @onAddTask="addTask" />
    <!-- List -->
    <div class="mt-8 w-full">
      <ul v-if="tasks.length > 0" class="flex flex-col gap-3">
        <TaskItem
          v-for="(task, index) in tasks"
          :key="index"
          :title="task.title"
          :isCompleted="task.completed"
          @onDelete="deleteTask(index)"
          @onToggleComplete="toggleComplete(index)"
        />
      </ul>

      <div v-else class="h-[100px] flex justify-center items-center">
        <p class="text-lg text-gray-400 font-medium text-center">You have no pending task</p>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
