<template>
  <div
    v-if="isVisible"
    :class="['alert p-4 rounded-lg shadow-sm', baseAlertClasses, { 'hidden-fade': fadingOut }]"
    role="alert"
    @transitionend="handleTransitionEnd"
  >
    <!-- Left Section: Icon + Title/Message. This flex-grows to push content right. -->
    <div class="flex items-start flex-grow">
      <div class="flex-shrink-0">
        <!-- Main icon for all alerts -->
        <i :data-lucide="iconName" :class="['w-5 h-5', iconColorClass]"></i>
      </div>
      <div class="ml-3">
        <p class="font-medium">{{ title }}</p>
        <p class="text-sm">{{ message }}</p>
      </div>
    </div>

    <!-- Right Section: Action Button (if present) and Dismiss Button (if dismissible) -->
    <!-- This section is placed to the far right due to flex-grow on the left section and justify-between on parent -->
    <div
      v-if="dismissible || actionButtonText"
      :class="['flex-shrink-0 flex items-center', { 'ml-4': !isActionButtonAlert }]"
    >
      <button
        v-if="actionButtonText"
        @click="$emit('action-click')"
        class="px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
        :class="actionButtonClasses"
      >
        {{ actionButtonText }}
      </button>
      <button
        v-if="dismissible"
        @click="dismiss"
        type="button"
        class="rounded-full p-1 -mt-1"
        :class="[dismissButtonClasses, { 'ml-2': actionButtonText }]"
        aria-label="Dismiss"
      >
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  // Type of alert: 'success', 'error', 'warning', 'info', 'action'
  type: {
    type: String,
    required: true,
    validator: (value) => ['success', 'error', 'warning', 'info', 'action'].includes(value),
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  // Whether the alert can be dismissed by the user
  dismissible: {
    type: Boolean,
    default: true,
  },
  // Text for an optional action button (e.g., 'Reconnect', 'View Details')
  actionButtonText: {
    type: String,
    default: null,
  },
  // Custom icon name if default is not desired (Lucide icon name)
  customIcon: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['dismiss', 'action-click'])

const isVisible = ref(true)
const fadingOut = ref(false)

// Computed property to determine if it's an alert with an action button
const isActionButtonAlert = computed(() => props.actionButtonText !== null)

// Computed property for dynamic Tailwind background, border, and text classes
const baseAlertClasses = computed(() => {
  const classes = []
  // Color classes
  switch (props.type) {
    case 'success':
      classes.push('bg-green-50 border-green-200 text-green-800')
      break
    case 'error':
      classes.push('bg-red-50 border-red-200 text-red-800')
      break
    case 'warning':
      classes.push('bg-yellow-50 border-yellow-200 text-yellow-800')
      break
    case 'info':
      classes.push('bg-blue-50 border-blue-200 text-blue-800')
      break
    case 'action':
      classes.push('bg-indigo-50 border-indigo-200 text-indigo-800')
      break
    default:
      classes.push('bg-gray-50 border-gray-200 text-gray-800') // Fallback
  }

  // Layout classes: Apply primary flex layout to the overall alert container
  if (isActionButtonAlert.value) {
    // For action alerts, use flex-col for mobile, flex-row for larger screens
    classes.push(
      'flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4',
    )
  } else {
    // For simple alerts, use a standard row layout with items-start and justify-between
    classes.push('flex items-start justify-between space-x-3')
  }
  return classes.join(' ')
})

// Computed property for the main icon name based on alert type or custom icon
const iconName = computed(() => {
  if (props.customIcon) return props.customIcon
  switch (props.type) {
    case 'success':
      return 'check-circle'
    case 'error':
      return 'x-octagon'
    case 'warning':
      return 'alert-triangle'
    case 'info':
      return 'info'
    case 'action':
      return 'cloud-off' // Default for action type
    default:
      return 'bell' // Generic fallback icon
  }
})

// Computed property for icon color class
const iconColorClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-600'
    case 'error':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    case 'info':
      return 'text-blue-600'
    case 'action':
      return 'text-indigo-600'
    default:
      return 'text-gray-600'
  }
})

// Computed property for dismiss button classes
const dismissButtonClasses = computed(() => {
  let classes = ['focus:outline-none focus:ring-2 rounded-full']
  switch (props.type) {
    case 'success':
      classes.push('text-green-600 hover:text-green-800 focus:ring-green-400')
      break
    case 'error':
      classes.push('text-red-600 hover:text-red-800 focus:ring-red-400')
      break
    case 'warning':
      classes.push('text-yellow-600 hover:text-yellow-800 focus:ring-yellow-400')
      break
    case 'info':
      classes.push('text-blue-600 hover:text-blue-800 focus:ring-blue-400')
      break
    case 'action':
      classes.push('text-indigo-600 hover:text-indigo-800 focus:ring-indigo-400')
      break
    default:
      classes.push('text-gray-600 hover:text-gray-800 focus:ring-gray-400')
  }
  return classes.join(' ')
})

// Computed property for action button classes
const actionButtonClasses = computed(() => {
  let classes = ['text-white focus:ring-offset-2']
  switch (props.type) {
    case 'success':
      classes.push('bg-green-600 hover:bg-green-700 focus:ring-green-500')
      break
    case 'error':
      classes.push('bg-red-600 hover:bg-red-700 focus:ring-red-500')
      break
    case 'warning':
      classes.push('bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500')
      break
    case 'info':
      classes.push('bg-blue-600 hover:bg-blue-700 focus:ring-blue-500')
      break
    case 'action':
      classes.push('bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500')
      break
    default:
      classes.push('bg-gray-600 hover:bg-gray-700 focus:ring-gray-500')
  }
  return classes.join(' ')
})

// Method to initiate alert dismissal animation
const dismiss = () => {
  fadingOut.value = true
}

// Handle CSS transition end to truly remove the element from DOM
const handleTransitionEnd = (event) => {
  // Only remove element if the opacity transition has completed AND it's fading out
  if (event.propertyName === 'opacity' && fadingOut.value) {
    isVisible.value = false
    emit('dismiss') // Emit a dismiss event for parent components to react if needed
  }
}

// Function to re-render Lucide icons, important for dynamic content
const renderLucideIcons = () => {
  // A small delay to ensure icons are rendered after Vue's DOM updates
  setTimeout(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  }, 50)
}

// Call renderLucideIcons when the component is mounted or relevant props change
onMounted(renderLucideIcons)
watch(() => props.type, renderLucideIcons) // Watch alert type changes for icon updates
watch(() => props.customIcon, renderLucideIcons) // Watch custom icon changes
</script>

<style scoped>
/* Alert specific styles */
.alert {
  opacity: 1;
  /* Include height, margin, padding, and border-width in transition for a smooth collapse effect */
  transition:
    opacity 0.3s ease,
    height 0.3s ease,
    margin 0.3s ease,
    padding 0.3s ease,
    border-width 0.3s ease;
  overflow: hidden; /* Important for height transition to work correctly */
}

.alert.hidden-fade {
  opacity: 0;
  height: 0;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  border-width: 0 !important; /* Ensures border also collapses smoothly */
}
</style>
