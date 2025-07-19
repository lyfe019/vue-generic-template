<template>
  <div :class="['relative flex-shrink-0', containerSizeClasses, roundedClasses]">
    <img
      v-if="src"
      :src="src"
      :alt="alt || 'User avatar'"
      :class="['object-cover', imageClasses, roundedClasses, ringClasses]"
      @error="handleImageError"
    />
    <div
      v-else-if="initials"
      :class="[
        'flex items-center justify-center font-semibold text-white',
        initialsClasses,
        roundedClasses,
        ringClasses,
        backgroundClasses,
      ]"
    >
      {{ initials }}
    </div>
    <div
      v-else
      :class="[
        'flex items-center justify-center text-gray-600',
        iconPlaceholderClasses,
        roundedClasses,
        ringClasses,
        backgroundClasses,
      ]"
    >
      <Icon name="user" :size="iconSizeMapping[size]" />
    </div>

    <!-- Status Badge (online, offline, away) -->
    <span
      v-if="status"
      :class="[
        'absolute block rounded-full ring-2 ring-white',
        statusPositionClasses,
        statusColorClasses,
        statusSizeClasses,
      ]"
      :aria-label="`${status} status`"
    ></span>

    <!-- Notification Badge -->
    <span
      v-if="notificationCount > 0"
      :class="[
        'absolute block rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white',
        notificationPositionClasses,
        notificationSizeClasses,
      ]"
      :aria-label="`${notificationCount} new notifications`"
    >
      {{ notificationCount }}
    </span>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { Icon } from './index' // Assuming Icon component is in the same common folder

const props = defineProps({
  // Image URL for the avatar
  src: {
    type: String,
    default: null,
  },
  // Alt text for the image avatar
  alt: {
    type: String,
    default: 'User avatar',
  },
  // Initials to display if no image is provided
  initials: {
    type: String,
    default: null,
  },
  // Size of the avatar: 'sm', 'md', 'lg', 'xl'
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  // Background color for initials/placeholder avatars (Tailwind color classes like 'blue-500')
  color: {
    type: String,
    default: 'gray-200',
  },
  // Status indicator: 'online', 'offline', 'away'
  status: {
    type: String,
    default: null,
    validator: (value) => ['online', 'offline', 'away'].includes(value),
  },
  // Number for the notification badge
  notificationCount: {
    type: Number,
    default: 0,
  },
  // Adds a ring/border around the avatar (e.g., for group spacing)
  hasRing: {
    type: Boolean,
    default: false,
  },
})

// Fallback image in case src fails
const handleImageError = (event) => {
  event.target.src = `https://placehold.co/100x100/${props.color.replace('-', '').replace('-', '')}/ffffff?text=X`
  event.target.alt = 'Fallback avatar image'
}

// --- Computed classes for styling ---

// Main container size classes
const containerSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 w-8'
    case 'md':
      return 'h-10 w-10'
    case 'lg':
      return 'h-12 w-12'
    case 'xl':
      return 'h-16 w-16'
    default:
      return 'h-10 w-10'
  }
})

// Image specific classes (for object-cover)
const imageClasses = computed(() => containerSizeClasses.value)

// Initials text size classes
const initialsClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-base'
    case 'lg':
      return 'text-lg'
    case 'xl':
      return 'text-xl'
    default:
      return 'text-base'
  }
})

// Icon placeholder size classes (for the div containing the icon)
const iconPlaceholderClasses = computed(() => containerSizeClasses.value)

// Map avatar size to Icon component's size prop
const iconSizeMapping = {
  sm: 'sm', // w-4 h-4
  md: 'md', // w-5 h-5
  lg: 'lg', // w-6 h-6
  xl: 'xl', // w-8 h-8
}

// Always circular for avatars
const roundedClasses = 'rounded-full'

// Background color for initials/placeholder avatars
const backgroundClasses = computed(() => `bg-${props.color}`)

// Ring classes for group display or specific emphasis
const ringClasses = computed(() => (props.hasRing ? 'ring-2 ring-white' : ''))

// Status badge size
const statusSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-2 w-2'
    case 'md':
      return 'h-2.5 w-2.5'
    case 'lg':
      return 'h-3 w-3'
    case 'xl':
      return 'h-3.5 w-3.5'
    default:
      return 'h-2.5 w-2.5'
  }
})

// Status badge color
const statusColorClasses = computed(() => {
  switch (props.status) {
    case 'online':
      return 'bg-green-500'
    case 'offline':
      return 'bg-gray-400'
    case 'away':
      return 'bg-yellow-400'
    default:
      return ''
  }
})

// Status badge position (bottom-right)
const statusPositionClasses = 'bottom-0 right-0'

// Notification badge size
const notificationSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-3.5 w-3.5' // Slightly larger to fit numbers
    case 'md':
      return 'h-4 w-4'
    case 'lg':
      return 'h-4.5 w-4.5'
    case 'xl':
      return 'h-5 w-5'
    default:
      return 'h-4 w-4'
  }
})

// Notification badge position (top-right)
const notificationPositionClasses = 'top-0 right-0 -mt-1 -mr-1'

// Ensure Lucide icons are rendered for the placeholder icon
onMounted(() => {
  // A small delay ensures the DOM is fully ready for Lucide to process
  setTimeout(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  }, 50)
})
watch(
  () => props.icon,
  () => {
    // Watch for icon changes for re-rendering
    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons()
      }
    }, 50)
  },
)
</script>

<style scoped>
/* No specific scoped CSS needed, as this component primarily relies on Tailwind and Lucide's SVG injection. */
</style>
