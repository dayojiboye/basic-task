<template>
  <li class="w-full flex gap-2 items-center border-b border-b-gray-200 pb-4">
    <CheckIcon v-if="isCompleted" class="w-6 h-6" />
    <ExclamationIcon v-else class="w-6 h-6" />
    <p class="text-base uppercase">{{ title }}</p>
    <div class="flex gap-2 ml-auto">
      <button class="w-fit h-fit" @click="deleteTask">
        <TrashIcon class="w-6 h-6" />
      </button>
      <button class="w-fit h-fit" @click="toggleComplete">
        <CheckmarkIcon v-if="!isCompleted" class="w-6 h-6" />
        <RefreshIcon v-else class="w-6 h-6" />
      </button>
    </div>
  </li>
</template>

<script>
import TrashIcon from '../assets/trash-icon.svg?component'
import ExclamationIcon from '../assets/exclamation-icon.svg?component'
import CheckIcon from '../assets/check-icon.svg?component'
import CheckmarkIcon from '../assets/checkmark-icon.svg?component'
import RefreshIcon from '../assets/refresh-icon.svg?component'

export default {
  components: {
    TrashIcon,
    ExclamationIcon,
    CheckIcon,
    CheckmarkIcon,
    RefreshIcon
  },

  props: ['title', 'isCompleted'],

  emits: ['onToggleComplete', 'onDelete'],

  setup(props, context) {
    function deleteTask() {
      context.emit('onDelete')
    }

    function toggleComplete() {
      context.emit('onToggleComplete')
    }

    return {
      deleteTask,
      toggleComplete
    }
  }
}
</script>

<style lang="scss" scoped></style>
