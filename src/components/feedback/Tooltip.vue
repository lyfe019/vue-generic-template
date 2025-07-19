<template>
  <div
    class="tooltip-container relative inline-block"
    @mouseenter="showTooltipWithDelay"
    @mouseleave="hideTooltipWithDelay"
    @focusin="showTooltipWithDelay"
    @focusout="hideTooltipWithDelay"
  >
    <!-- The element that triggers the tooltip -->
    <slot></slot>

    <!-- The Tooltip Content -->
    <div
      :id="tooltipId"
      role="tooltip"
      :class="[
        'tooltip-content absolute bg-gray-800 text-white p-2 rounded-md text-sm whitespace-nowrap z-50',
        'transition-opacity transition-visibility duration-200 ease-in-out',
        'pointer-events-none', // Allows clicks through when not visible
        positionClass,
        { 'opacity-0 invisible': !isVisible },
        { '!whitespace-normal w-64 p-4 text-left': hasRichContentSlot }, // Specific styling for rich content
      ]"
    >
      <div v-if="$slots.content">
        <slot name="content"></slot>
      </div>
      <span v-else>{{ text }}</span>

      <!-- Tooltip Arrow -->
      <div :class="['tooltip-arrow absolute', arrowClass]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, useSlots, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: 'top', // 'top', 'bottom', 'left', 'right'
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
  },
  showDelay: {
    type: Number,
    default: 100, // Milliseconds before tooltip appears on hover/focus
  },
  hideDelay: {
    type: Number,
    default: 100, // Milliseconds before tooltip hides on mouseleave/blur
  },
  // Optionally allows for manual control if needed
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'show', 'hide'])

const isVisible = ref(props.modelValue)
const showTimeout = ref(null)
const hideTimeout = ref(null)

// Generate a unique ID for aria-describedby
const tooltipId = `tooltip-${Math.random().toString(36).substring(2, 9)}`

// Check if the 'content' slot is being used
const slots = useSlots()
const hasRichContentSlot = computed(() => !!slots.content)

// Apply position classes for the tooltip content
const positionClass = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-full left-1/2 -translate-x-1/2 mb-2' // `mb-2` for spacing + arrow
    case 'bottom':
      return 'top-full left-1/2 -translate-x-1/2 mt-2' // `mt-2` for spacing + arrow
    case 'left':
      return 'right-full top-1/2 -translate-y-1/2 mr-2' // `mr-2` for spacing + arrow
    case 'right':
      return 'left-full top-1/2 -translate-y-1/2 ml-2' // `ml-2` for spacing + arrow
    default:
      return ''
  }
})

// Apply classes for the tooltip arrow
const arrowClass = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-[-8px] left-1/2 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-gray-800'
    case 'bottom':
      return 'top-[-8px] left-1/2 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-gray-800'
    case 'left':
      return 'left-full top-1/2 -translate-y-1/2 border-y-8 border-l-8 border-y-transparent border-l-gray-800'
    case 'right':
      return 'right-full top-1/2 -translate-y-1/2 border-y-8 border-r-8 border-y-transparent border-r-gray-800'
    default:
      return ''
  }
})

const showTooltip = () => {
  clearTimeout(showTimeout.value)
  clearTimeout(hideTimeout.value) // Clear any pending hide
  showTimeout.value = setTimeout(() => {
    isVisible.value = true
    emit('update:modelValue', true)
    emit('show')
  }, props.showDelay)
}

const hideTooltip = () => {
  clearTimeout(showTimeout.value) // Clear any pending show
  clearTimeout(hideTimeout.value)
  hideTimeout.value = setTimeout(() => {
    isVisible.value = false
    emit('update:modelValue', false)
    emit('hide')
  }, props.hideDelay)
}

// Use the functions with delays
const showTooltipWithDelay = () => showTooltip()
const hideTooltipWithDelay = () => hideTooltip()

// Clean up timeouts on component unmount
onUnmounted(() => {
  clearTimeout(showTimeout.value)
  clearTimeout(hideTimeout.value)
})

// Sync internal state with modelValue prop if it changes externally
watch(
  () => props.modelValue,
  (newValue) => {
    isVisible.value = newValue
  },
)
</script>

<style scoped>
/* No specific scoped styles needed beyond the component's internal logic,
   as Tailwind handles the provided classes and the dynamic classes for positioning.
   The `transition-opacity transition-visibility` class is a helper, if it's not
   a custom utility in your Tailwind config, it would just be `transition-opacity`.
   `visibility` transition can be added via CSS directly if desired:
   .transition-visibility {
     transition: visibility 0s linear 0.2s;
   }
   .opacity-0.invisible {
     visibility: hidden;
     transition-delay: 0s;
   }
*/
</style>
