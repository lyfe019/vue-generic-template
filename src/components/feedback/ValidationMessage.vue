<template>
  <p :class="['validation-message', messageClasses]">
    <Icon :name="iconName" :class="['validation-icon', iconClasses]" />
    <span>{{ message }}</span>
  </p>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon component is available

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['error', 'success', 'hint'].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
})

const messageClasses = computed(() => {
  return {
    'text-error': props.type === 'error',
    'text-success': props.type === 'success',
    'text-hint': props.type === 'hint',
  }
})

const iconName = computed(() => {
  switch (props.type) {
    case 'error':
      return 'alert-circle'
    case 'success':
      return 'check-circle'
    case 'hint':
      return 'info'
    default:
      return ''
  }
})

const iconClasses = computed(() => {
  return {
    'text-red-500': props.type === 'error',
    'text-green-500': props.type === 'success',
    'text-gray-400': props.type === 'hint', // Specific for hint icon color
  }
})
</script>

<style scoped>
.validation-message {
  display: flex;
  align-items: center;
  font-size: 0.875rem; /* text-sm */
  margin-top: 0.25rem; /* mt-1 */
}
.validation-icon {
  width: 1rem; /* w-4 */
  height: 1rem; /* h-4 */
  margin-right: 0.25rem; /* mr-1 */
  flex-shrink: 0; /* Prevent icon from shrinking */
}

/* Tailwind-equivalent classes, defined here for clarity if not globally available in main CSS */
.text-error {
  color: #ef4444;
} /* red-500 */
.text-success {
  color: #10b981;
} /* green-500 */
.text-hint {
  color: #6b7280;
} /* gray-500 */

/* The actual border classes will be applied to the input field itself, not the message component.
   So, no .border-error or .border-success here. */
</style>
