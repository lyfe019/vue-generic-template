<template>
  <div
    :class="[
      'toast-container fixed z-[10000] flex flex-col gap-3 max-w-full pointer-events-none',
      positionClass,
    ]"
  >
    <Toast
      v-for="toast in filteredToasts"
      :key="toast.id"
      :id="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      :dismissible="toast.dismissible"
      @dismiss="removeToastFromStore"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Toast from './Toast.vue' // Import the individual Toast component
import { toastState, removeToast } from '@/stores/toastStore' // Import the global toast state and remove function

const props = defineProps({
  position: {
    type: String,
    default: 'top-right', // 'top-right', 'top-center', 'bottom-left'
    validator: (value) => ['top-right', 'top-center', 'bottom-left'].includes(value),
  },
})

// Filter toasts from the global state that match this container's position
const filteredToasts = computed(() => {
  return toastState.toasts.filter((toast) => toast.position === props.position)
})

// Computed class for container position
const positionClass = computed(() => {
  switch (props.position) {
    case 'top-right':
      return 'top-6 right-6 items-end'
    case 'top-center':
      return 'top-6 left-1/2 -translate-x-1/2 items-center'
    case 'bottom-left':
      return 'bottom-6 left-6 items-start'
    default:
      return ''
  }
})

// Function to call the global removeToast from the store when a Toast component dismisses itself
const removeToastFromStore = (id) => {
  removeToast(id)
}
</script>

<style scoped>
/* Toast Container */
.toast-container {
  /* Common styles are defined in the component's class binding */
  /* Specific position classes are defined in the computed property */
}
</style>
