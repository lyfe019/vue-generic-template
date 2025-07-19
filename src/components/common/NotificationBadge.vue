<template>
  <div class="relative">
    <slot></slot>
    <!-- This slot holds the element being badged (e.g., a button, an icon) -->
    <span
      v-if="!isDot && count !== null"
      class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full text-white text-xs font-bold"
      :class="countClasses"
    >
      {{ count }}
    </span>
    <span
      v-else-if="isDot"
      class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 block h-3 w-3 rounded-full"
      :class="dotClasses"
    ></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // The count to display (e.g., 3, '9+')
  count: {
    type: [String, Number],
    default: null,
  },
  // If true, displays a simple dot instead of a count
  isDot: {
    type: Boolean,
    default: false,
  },
  // Color for the badge background (e.g., 'red', 'orange', 'green')
  color: {
    type: String,
    default: 'red',
    validator: (value) => ['red', 'orange', 'green'].includes(value),
  },
})

// Computed property for count badge background color
const countClasses = computed(() => {
  return `bg-${props.color}-500`
})

// Computed property for dot badge background color
const dotClasses = computed(() => {
  return `bg-${props.color}-500`
})
</script>

<style scoped>
/* No specific scoped CSS needed here, Tailwind handles the styling. */
</style>
