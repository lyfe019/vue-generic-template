<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      dynamicClasses,
    ]"
  >
    <i v-if="icon" :data-lucide="icon" :class="['w-3 h-3 mr-1', iconClasses]"></i>
    <slot></slot>
    <!-- Slot for the badge text content -->
  </span>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'

const props = defineProps({
  // Main color variant (e.g., 'green', 'yellow', 'red', 'blue', 'gray', 'purple', 'indigo', 'orange')
  color: {
    type: String,
    default: 'gray',
    validator: (value) =>
      ['green', 'yellow', 'red', 'blue', 'gray', 'purple', 'indigo', 'orange'].includes(value),
  },
  // Type of badge: 'filled' (default) or 'outline'
  type: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'outline'].includes(value),
  },
  // Optional Lucide icon name (e.g., 'check-circle', 'star', 'alert-triangle', 'clock', 'tag')
  icon: {
    type: String,
    default: null,
  },
  // Optional: For icons that need a specific fill class (e.g., Lucide star)
  iconFillColor: {
    type: String,
    default: null, // e.g., 'blue-500' for fill-blue-500
  },
})

// Computed property to generate dynamic Tailwind classes
const dynamicClasses = computed(() => {
  const classes = []
  if (props.type === 'filled') {
    classes.push(`bg-${props.color}-100`)
    classes.push(`text-${props.color}-800`)
  } else if (props.type === 'outline') {
    classes.push(`border`)
    classes.push(`border-${props.color}-400`)
    classes.push(`text-${props.color}-700`)
  }
  return classes.join(' ')
})

// Computed property for icon-specific classes
const iconClasses = computed(() => {
  const classes = []
  if (props.iconFillColor) {
    classes.push(`fill-${props.iconFillColor}`)
    classes.push(`stroke-${props.iconFillColor}`)
  }
  return classes.join(' ')
})

// Function to re-render Lucide icons
const renderLucideIcons = () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
}

// Re-render icons when the component is mounted or relevant props change
onMounted(renderLucideIcons)
watch(() => props.icon, renderLucideIcons) // Watch for icon name changes
</script>

<style scoped>
/* No specific scoped CSS needed for this component, as it primarily relies on Tailwind classes. */
/* If you had unique badge styles not covered by Tailwind, they would go here. */
</style>
