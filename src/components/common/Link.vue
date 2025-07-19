<template>
  <!-- Using a regular <a> tag for semantic correctness and native browser behavior -->
  <a
    :href="isDisabled ? '#' : to"
    :class="[baseClasses, computedVariantClasses, { 'cursor-not-allowed': isDisabled }]"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : null"
    :aria-disabled="isDisabled ? 'true' : null"
    @click="handleClick"
  >
    <template v-if="variant === 'icon-text' || variant === 'button-icon'">
      <Icon
        v-if="icon"
        :name="icon"
        :size="iconSizeMap[size]"
        :class="['flex-shrink-0', { 'mr-2': text }]"
      />
    </template>
    <span v-if="text">{{ text }}</span>
    <slot></slot>
    <!-- For additional content or more complex internal structures -->
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from './index' // Assuming Icon component is in the same common folder

const props = defineProps({
  // The destination URL or Vue Router path
  to: {
    type: String,
    required: true,
  },
  // The display text for the link (optional, used for text-only or icon-text links)
  text: {
    type: String,
    default: null,
  },
  // Type of link style: 'text', 'button', 'icon-only', 'icon-text', 'button-icon'
  variant: {
    type: String,
    default: 'text',
    validator: (val) => ['text', 'button', 'icon-only', 'icon-text', 'button-icon'].includes(val),
  },
  // Lucide icon name (for icon-only, icon-text, button-icon variants)
  icon: {
    type: String,
    default: null,
  },
  // Link size for button and icon variants: 'sm', 'md', 'lg'
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val),
  },
  // Tailwind color for the link (e.g., 'indigo-600', 'blue-500', 'gray-700')
  color: {
    type: String,
    default: 'indigo-600',
  },
  // Background color for button variants (e.g., 'indigo-600', 'red-600')
  bgColor: {
    type: String,
    default: null,
  },
  // Border color for button variants (e.g., 'gray-300')
  borderColor: {
    type: String,
    default: null,
  },
  // If the link should open in a new tab
  newTab: {
    type: Boolean,
    default: false,
  },
  // If the link should be visually and functionally disabled
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()

const target = computed(() => (props.newTab ? '_blank' : '_self'))

// Base classes common to all link types
const baseClasses = computed(() => {
  let classes =
    'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
  if (!props.isDisabled) {
    classes += ' cursor-pointer'
  }
  return classes
})

// Map component size prop to Icon component's size prop
const iconSizeMap = {
  sm: 'sm', // w-4 h-4
  md: 'md', // w-5 h-5
  lg: 'lg', // w-6 h-6
}

// Computed classes based on variant, size, and color props
const computedVariantClasses = computed(() => {
  let classes = []

  const hoverColorClass = (baseColor) => {
    const [name, shade] = baseColor.split('-')
    const newShade = parseInt(shade) + 200 // Example: 500 -> 700
    return `hover:text-${name}-${newShade > 900 ? 900 : newShade}`
  }

  const hoverBgClass = (baseColor) => {
    if (!baseColor) return ''
    const [name, shade] = baseColor.split('-')
    const newShade = parseInt(shade) + 100 // Example: 600 -> 700
    return `hover:bg-${name}-${newShade > 900 ? 900 : newShade}`
  }

  const focusRingClass = (baseColor) => {
    const [name, shade] = baseColor.split('-')
    const focusShade = parseInt(shade) - 100 // Example: 600 -> 500
    return `focus:ring-${name}-${focusShade < 100 ? 100 : focusShade}`
  }

  if (props.isDisabled) {
    classes.push('text-gray-400', 'bg-gray-200', 'border-gray-200', 'pointer-events-none')
    if (props.variant === 'button' || props.variant === 'button-icon') {
      classes.push('px-4 py-2') // Add padding for disabled buttons too
    } else if (props.variant === 'icon-only') {
      classes.push('p-2') // Add padding for disabled icon-only too
    }
    return classes.join(' ')
  }

  switch (props.variant) {
    case 'text':
      classes.push(`text-${props.color}`, `hover:underline`, hoverColorClass(props.color))
      break
    case 'button':
    case 'button-icon':
      classes.push(
        'px-6 py-3',
        'text-base font-medium shadow-md',
        props.bgColor ? `bg-${props.bgColor}` : `bg-${props.color}`,
        props.bgColor ? `text-white` : `text-white`, // Buttons typically have white text
        props.borderColor ? `border border-${props.borderColor}` : '',
        hoverBgClass(props.bgColor || props.color),
        focusRingClass(props.bgColor || props.color),
      )
      if (props.variant === 'button-icon') {
        classes.push('flex items-center space-x-2')
      }
      break
    case 'icon-only':
      classes.push(
        'p-2 rounded-full',
        `text-${props.color}`,
        `hover:bg-${props.color.split('-')[0]}-100`, // e.g., hover:bg-blue-100
        `hover:text-${props.color.split('-')[0]}-700`, // e.g., hover:text-blue-700
        focusRingClass(props.color),
      )
      break
    case 'icon-text':
      classes.push(
        `text-${props.color}`,
        `hover:text-${props.color.split('-')[0]}-800`,
        'flex items-center space-x-2',
        `hover:underline`,
      )
      break
  }
  return classes.join(' ')
})

const handleClick = (event) => {
  if (props.isDisabled) {
    event.preventDefault() // Prevent navigation for disabled links
  } else if (!props.newTab && props.to) {
    // If it's an internal link and not opening in a new tab, use router-link's navigation
    // This assumes Vue Router is set up and the 'to' prop is a valid route path
    event.preventDefault() // Prevent default <a> tag navigation
    router.push(props.to)
  }
  // For newTab or external links, default <a> tag behavior is fine.
}
</script>

<style scoped>
/* No specific scoped styles needed, as this component primarily relies on Tailwind classes. */
</style>
