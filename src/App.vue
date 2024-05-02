<script>
import AddTask from '@/components/AddTask.vue'
import { ref, watch } from 'vue'
import useStorage from '@/hooks/use-storage'
import TaskItem from './components/TaskItem.vue'

export default {
  components: {
    AddTask,
    TaskItem
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

    return {
      tasks,
      addTask,
      deleteTask,
      toggleComplete
    }
  }
}
</script>

<template>
  <header
    role="banner"
    class="bg-gray-700 flex justify-center py-5 px-2 w-full fixed top-0 left-0 z-10 h-[70px] shadow-gray-400 shadow-sm"
  >
    <h1 class="font-bold text-xl lg:text-2xl text-white">TASKS FOR TODAY</h1>
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
