<template>
  <div class="border border-gray-300 py-4 px-3">
    <input
      class="border border-gray-300 w-full rounded-sm text-base px-3 py-2"
      placeholder="Enter task"
      v-model="enteredTask"
      @keyup.enter="addTask"
    />

    <button class="btn-primary mt-4" @click="addTask" :disabled="!enteredTask">Add Task</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['onAddTask'],

  setup(_, context) {
    const enteredTask = ref('')

    function addTask() {
      if (enteredTask.value.length === 0) return
      context.emit('onAddTask', enteredTask.value)
      enteredTask.value = ''
    }

    return {
      enteredTask,
      addTask
    }
  }
}
</script>

<style lang="scss" scoped></style>
