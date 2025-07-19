<template>
  <!-- Modal Overlay -->
  <div
    v-if="isOpen"
    :id="id"
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[1000] opacity-0 invisible transition-opacity duration-300 ease-in-out"
    :class="{ 'opacity-100 visible': isOpen }"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`${id}-title`"
    :aria-describedby="`${id}-description`"
    @click.self="handleBackdropClick"
    ref="modalOverlay"
  >
    <!-- Modal Content -->
    <div
      class="bg-white rounded-xl shadow-xl p-6 w-11/12 md:w-1/3 max-w-lg max-h-[90vh] overflow-y-auto transform -translate-y-5 opacity-0 transition-all duration-300 ease-out"
      :class="{ 'translate-y-0 opacity-100': isOpen }"
      tabindex="-1"
      ref="modalContent"
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
        <h3 :id="`${id}-title`" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <button
          class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
          @click="cancel"
          aria-label="Close dialog"
          ref="closeButton"
        >
          <Icon name="x" class="w-5 h-5" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="flex items-start space-x-4 mb-6">
        <div :class="['flex-shrink-0 p-3 rounded-full', iconBgClass, iconColorClass]">
          <Icon :name="icon" class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <p :id="`${id}-description`" class="text-gray-700">{{ message }}</p>
        </div>
      </div>

      <!-- Modal Footer - Action Buttons -->
      <div class="flex justify-end space-x-3">
        <!-- Cancel Button -->
        <Button
          :color="cancelButtonColor"
          :variant="cancelButtonVariantStyle"
          :size="cancelButtonSize"
          @click="cancel"
          :disabled="disabled"
          ref="cancelBtn"
        >
          {{ cancelButtonText }}
        </Button>
        <!-- Confirm Button -->
        <Button
          :color="confirmButtonColor"
          :variant="confirmButtonVariantStyle"
          :size="confirmButtonSize"
          @click="confirm"
          :disabled="disabled"
          ref="confirmBtn"
        >
          {{ confirmButtonText }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { Button, Icon } from '@/components/common' // Assuming Button and Icon are in common components

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: 'info', // Default Lucide icon
  },
  iconColor: {
    type: String, // e.g., 'red-600', 'green-600', 'yellow-600', 'indigo-600'
    default: 'indigo-600',
  },
  iconBgColor: {
    type: String, // e.g., 'red-100', 'green-100', 'yellow-100', 'indigo-100'
    default: 'indigo-100',
  },
  confirmButtonText: {
    type: String,
    default: 'Confirm',
  },
  // New props for button styling, aligning with your Button.vue
  confirmButtonColor: {
    type: String,
    default: 'indigo', // Maps to your Button.vue's 'color' prop
    validator: (value) =>
      ['indigo', 'gray', 'green', 'red', 'yellow', 'blue', 'purple', 'pink', 'teal'].includes(
        value,
      ),
  },
  confirmButtonVariantStyle: {
    // Renamed from confirmButtonVariant to avoid clash with dialog concept
    type: String,
    default: 'filled', // Maps to your Button.vue's 'variant' prop ('filled', 'outline', 'ghost', 'link')
    validator: (value) => ['filled', 'outline', 'ghost', 'link'].includes(value),
  },
  confirmButtonSize: {
    type: String,
    default: 'md',
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel',
  },
  // New props for button styling, aligning with your Button.vue
  cancelButtonColor: {
    type: String,
    default: 'gray', // Maps to your Button.vue's 'color' prop
    validator: (value) =>
      ['indigo', 'gray', 'green', 'red', 'yellow', 'blue', 'purple', 'pink', 'teal'].includes(
        value,
      ),
  },
  cancelButtonVariantStyle: {
    // Renamed from cancelButtonVariant
    type: String,
    default: 'outline', // Maps to your Button.vue's 'variant' prop
    validator: (value) => ['filled', 'outline', 'ghost', 'link'].includes(value),
  },
  cancelButtonSize: {
    type: String,
    default: 'md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:isOpen', 'confirm', 'cancel'])

const modalOverlay = ref(null)
const modalContent = ref(null)
const closeButton = ref(null)
const confirmBtn = ref(null)
const cancelBtn = ref(null)

// Computed classes for icon styling
const iconColorClass = computed(() => `text-${props.iconColor}`)
const iconBgClass = computed(() => `bg-${props.iconBgColor}`)

// Manage body scroll and focus when modal opens/closes
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.classList.add('overflow-hidden', 'modal-open') // Prevent body scroll
      // Delay focusing to ensure modal is visible and interactive
      setTimeout(() => {
        // Focus on the confirm button by default, or the close button if no confirm
        // Access the underlying DOM element for focus (important for components)
        if (confirmBtn.value && confirmBtn.value.$el && !props.disabled) {
          confirmBtn.value.$el.focus()
        } else if (closeButton.value) {
          closeButton.value.focus()
        }
      }, 100)
    } else {
      document.body.classList.remove('overflow-hidden', 'modal-open')
    }
  },
)

// Close modal on Escape key press
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    cancel()
  }
}

// Close modal when clicking on the backdrop
const handleBackdropClick = (event) => {
  if (event.target === modalOverlay.value) {
    cancel()
  }
}

const confirm = () => {
  if (!props.disabled) {
    emit('confirm')
    emit('update:isOpen', false)
  }
}

const cancel = () => {
  if (!props.disabled) {
    emit('cancel')
    emit('update:isOpen', false)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Ensure body scroll is restored if component is unmounted while modal is open
  document.body.classList.remove('overflow-hidden', 'modal-open')
})
</script>

<style scoped>
/*
  Tailwind classes are used directly for styling.
  The `transition-opacity` and `transition-transform` classes are handled
  by Tailwind itself. Custom CSS for `modal-overlay` and `modal-content`
  from the original HTML file is translated to Tailwind utility classes where possible.
  The `opacity-0 invisible` and `translate-y-5 opacity-0` combined with
  `visible` and `translate-y-0 opacity-100` are what drive the transitions.
*/

/* Custom styles for body `modal-open` class for scroll prevention */
body.modal-open {
  overflow: hidden;
}
</style>
