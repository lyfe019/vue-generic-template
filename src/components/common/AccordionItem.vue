<template>
  <div>
    <button
      :class="[
        'flex items-center justify-between w-full px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 focus:outline-none',
      ]"
      @click="toggle"
      :aria-expanded="isOpen.toString()"
      aria-controls="accordion-content"
    >
      <slot name="header">
        <!-- Default header content if no slot provided -->
        {{ title }}
      </slot>
      <i
        :data-lucide="icon"
        :class="['accordion-icon w-5 h-5 text-gray-500', iconRotationClass]"
      ></i>
    </button>
    <div
      ref="contentRef"
      :class="['accordion-content px-4 text-gray-600', { open: isOpen }]"
      :style="contentStyle"
    >
      <div class="pb-3">
        <!-- Padding for content -->
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  // The title text for the accordion header
  title: {
    type: String,
    default: '',
  },
  // Controls whether the accordion item is open (can be v-model controlled by parent)
  modelValue: {
    type: Boolean,
    default: false,
  },
  // Icon for the accordion header (Lucide icon name)
  icon: {
    type: String,
    default: 'chevron-right', // Default for exclusive style
    validator: (value) => ['chevron-right', 'chevron-down', 'plus', 'minus'].includes(value),
  },
  // How the icon rotates: 'rotate' (90deg for chevron-right) or 'rotate-down' (180deg for chevron-down)
  iconRotateType: {
    type: String,
    default: 'rotate', // Default for exclusive style
    validator: (value) => ['rotate', 'rotate-down'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'toggle'])

// Internal state for open/close, can be overridden by modelValue
const isOpen = ref(props.modelValue)
const contentRef = ref(null) // Ref to the content div for dynamic height calculation
const contentHeight = ref('0px') // Dynamic height for smooth transition

// Watch for external modelValue changes
watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue
  },
)

// Watch for internal isOpen changes to calculate content height
watch(isOpen, (newVal) => {
  if (newVal) {
    // Set height to 'auto' temporarily to get scrollHeight
    contentHeight.value = 'auto'
    // Use nextTick to ensure DOM is updated before measuring
    // For smooth expand, set to scrollHeight and then back to auto after transition
    if (contentRef.value) {
      contentHeight.value = contentRef.value.scrollHeight + 'px'
      // In a real scenario, you might use a CSS class to set max-height to a large value
      // and let the transition handle it, rather than direct style binding for 'auto'.
      // For this example, we'll keep it as dynamic style for direct control.
    }
  } else {
    // Before collapsing, ensure current height is set for transition
    if (contentRef.value) {
      contentHeight.value = contentRef.value.scrollHeight + 'px'
      // Force repaint
      requestAnimationFrame(() => {
        contentHeight.value = '0px' // Collapse
      })
    } else {
      contentHeight.value = '0px'
    }
  }
})

// Style binding for accordion content height
const contentStyle = computed(() => ({
  maxHeight: isOpen.value ? contentHeight.value : '0px',
  opacity: isOpen.value ? '1' : '0',
  paddingTop: isOpen.value ? '0.75rem' : '0', // Adjust padding-top based on 'pt-3' in original HTML
  paddingBottom: isOpen.value ? '0.75rem' : '0', // Adjusted to ensure padding transitions
}))

// Computed class for icon rotation
const iconRotationClass = computed(() => {
  if (isOpen.value) {
    return props.iconRotateType === 'rotate' ? 'rotate' : 'rotate-down'
  }
  return ''
})

const toggle = () => {
  const newState = !isOpen.value
  isOpen.value = newState
  emit('update:modelValue', newState) // Emit for v-model
  emit('toggle', newState) // Emit general toggle event
}

// Function to re-render Lucide icons
const renderLucideIcons = () => {
  setTimeout(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  }, 50) // Small delay to ensure DOM is ready
}

// Re-render icons on mount and when icon prop changes
onMounted(() => {
  renderLucideIcons()
  // Set initial height if it's open on mount
  if (isOpen.value && contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight + 'px'
  }
})
watch(() => props.icon, renderLucideIcons)
</script>

<style scoped>
/* Accordion specific styles */
.accordion-content {
  transition:
    max-height 0.3s ease-out,
    opacity 0.3s ease-out,
    padding-top 0.3s ease-out,
    padding-bottom 0.3s ease-out;
  overflow: hidden;
  opacity: 0;
  max-height: 0; /* Ensures content is hidden and collapses */
  /* Initial padding-top and bottom are 0, controlled by JS for smooth transition */
}

/* The 'open' class is conditionally applied via Vue for managing max-height dynamically */
/* The icon rotation classes are also applied dynamically */

.accordion-icon {
  transition: transform 0.2s ease-in-out;
}
.accordion-icon.rotate {
  transform: rotate(90deg); /* Rotate for chevron-right */
}
.accordion-icon.rotate-down {
  transform: rotate(180deg); /* For chevron-down or arrow-down */
}
</style>
