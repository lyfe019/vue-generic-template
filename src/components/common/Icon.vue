<template>
  <i
    :data-lucide="name"
    :class="[sizeClasses, colorClasses]"
    :aria-label="ariaLabel || `${name} icon`"
  ></i>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'

const props = defineProps({
  // Name of the Lucide icon (e.g., 'check', 'alert-triangle', 'settings')
  name: {
    type: String,
    required: true,
  },
  // Size of the icon (e.g., 'sm', 'md', 'lg', 'xl', or specific Tailwind size like 'w-4 h-4')
  size: {
    type: String,
    default: 'md', // Corresponds to w-6 h-6 usually
  },
  // Tailwind text color class (e.g., 'gray-500', 'blue-600')
  color: {
    type: String,
    default: 'current', // 'currentColor' to inherit text color by default
  },
  // Optional accessibility label for screen readers
  ariaLabel: {
    type: String,
    default: null,
  },
})

// Computed property to determine icon size classes
const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4' // Smaller icon
    case 'md':
      return 'w-5 h-5' // Standard icon size
    case 'lg':
      return 'w-6 h-6' // Slightly larger
    case 'xl':
      return 'w-8 h-8' // Large icon
    case '2xl':
      return 'w-10 h-10' // Extra Large
    case '3xl':
      return 'w-12 h-12' // Even larger
    default:
      // Allow passing direct Tailwind classes like "w-8 h-8"
      if (props.size.startsWith('w-') && props.size.includes('h-')) {
        return props.size
      }
      return 'w-5 h-5' // Fallback to default md
  }
})

// Computed property to determine icon color class
const colorClasses = computed(() => {
  return props.color === 'current' ? 'text-current' : `text-${props.color}`
})

// Function to ensure Lucide icons are rendered
const renderLucideIcons = () => {
  // A small delay to ensure icons are rendered after Vue's DOM updates
  setTimeout(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  }, 50)
}

// Re-render icons when the component is mounted or the icon name changes
onMounted(renderLucideIcons)
watch(() => props.name, renderLucideIcons)
watch(() => props.size, renderLucideIcons) // Re-render if size changes, sometimes helps
</script>

<style scoped>
/* No specific scoped CSS needed, as this component primarily relies on Tailwind and Lucide's SVG injection. */
</style>
