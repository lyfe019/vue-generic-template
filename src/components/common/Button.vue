<template>
  <button
    :type="nativeType"
    :disabled="disabled"
    :class="[
      'flex items-center justify-center font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
      dynamicClasses,
      { 'cursor-not-allowed opacity-75': disabled },
    ]"
    @click="handleClick"
  >
    <i
      v-if="icon && iconPosition === 'left'"
      :data-lucide="icon"
      :class="[iconClass, { 'mr-2': $slots.default }]"
    ></i>
    <slot></slot>
    <!-- Main content slot for text -->
    <i
      v-if="icon && iconPosition === 'right'"
      :data-lucide="icon"
      :class="[iconClass, { 'ml-2': $slots.default }]"
    ></i>
  </button>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'

const props = defineProps({
  // Native button type: 'button', 'submit', 'reset'
  nativeType: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value),
  },
  // Main color variant (e.g., 'indigo', 'gray', 'green', 'red', 'yellow', 'blue', 'purple', 'pink', 'teal')
  color: {
    type: String,
    default: 'indigo',
    validator: (value) =>
      ['indigo', 'gray', 'green', 'red', 'yellow', 'blue', 'purple', 'pink', 'teal'].includes(
        value,
      ),
  },
  // Style variant: 'filled', 'outline', 'ghost' (text-only hover), 'link'
  variant: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'outline', 'ghost', 'link'].includes(value),
  },
  // Size of the button: 'sm', 'md', 'lg', 'xl'
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  // Optional Lucide icon name
  icon: {
    type: String,
    default: null,
  },
  // Position of the icon relative to text
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value),
  },
  // Makes the button square (for icon-only buttons)
  isSquare: {
    type: Boolean,
    default: false,
  },
  // Makes the button circular (for FABs or simple icon-only buttons)
  isCircle: {
    type: Boolean,
    default: false,
  },
  // Adds a shadow (useful for FABs)
  shadow: {
    type: Boolean,
    default: false,
  },
  // Disables the button
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

// Determine padding and text size based on button size
const paddingClasses = computed(() => {
  if (props.isSquare || props.isCircle) {
    switch (props.size) {
      case 'sm':
        return 'p-2' // w-8 h-8
      case 'md':
        return 'p-3' // w-10 h-10
      case 'lg':
        return 'p-4' // w-12 h-12
      case 'xl':
        return 'p-5' // w-14 h-14
    }
  }
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'md':
      return 'px-4 py-2 text-base'
    case 'lg':
      return 'px-6 py-3 text-lg'
    case 'xl':
      return 'px-8 py-4 text-xl'
  }
  return ''
})

// Determine icon size based on button size
const iconSizeClasses = computed(() => {
  if (props.icon) {
    switch (props.size) {
      case 'sm':
        return 'w-4 h-4'
      case 'md':
        return 'w-5 h-5'
      case 'lg':
        return 'w-6 h-6'
      case 'xl':
        return 'w-7 h-7'
    }
  }
  return ''
})

// Determine overall shape class
const shapeClasses = computed(() => {
  if (props.isCircle) return 'rounded-full'
  if (props.isSquare) return 'rounded-lg' // Square with rounded corners
  return 'rounded-lg'
})

// Determine overall width/height for square/circular buttons
const dimensionsClasses = computed(() => {
  if (props.isSquare || props.isCircle) {
    switch (props.size) {
      case 'sm':
        return 'w-8 h-8'
      case 'md':
        return 'w-10 h-10'
      case 'lg':
        return 'w-12 h-12'
      case 'xl':
        return 'w-14 h-14'
    }
  }
  return ''
})

// Computed property to generate dynamic Tailwind classes
const dynamicClasses = computed(() => {
  const classes = [paddingClasses.value, shapeClasses.value, dimensionsClasses.value]

  // Colors and variant styling
  switch (props.variant) {
    case 'filled':
      classes.push(`bg-${props.color}-600 text-white`)
      classes.push(`hover:bg-${props.color}-700`)
      classes.push(`focus:ring-${props.color}-500`)
      break
    case 'outline':
      classes.push(`bg-white border border-${props.color}-400 text-${props.color}-700`)
      classes.push(`hover:bg-${props.color}-50 hover:text-${props.color}-800`)
      classes.push(`focus:ring-${props.color}-500`)
      break
    case 'ghost':
      classes.push(`bg-transparent text-${props.color}-700`)
      classes.push(`hover:bg-${props.color}-50 hover:text-${props.color}-800`)
      classes.push(`focus:ring-${props.color}-500`)
      break
    case 'link':
      classes.push(`bg-transparent text-${props.color}-600 underline`)
      classes.push(`hover:text-${props.color}-800`)
      classes.push(`focus:ring-${props.color}-500`)
      break
  }

  if (props.shadow) {
    classes.push('shadow-lg')
  }

  return classes.join(' ')
})

// Computed property for icon-specific classes
const iconClass = computed(() => {
  return iconSizeClasses.value
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

// Function to re-render Lucide icons
const renderLucideIcons = () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
}

// Re-render icons when the component is mounted or relevant props change
onMounted(renderLucideIcons)
watch(() => props.icon, renderLucideIcons)
</script>

<style scoped>
/* No specific scoped CSS needed, primarily uses Tailwind. */
</style>
