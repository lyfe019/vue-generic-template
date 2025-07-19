<template>
  <div>
    <label
      v-if="label && !srOnly"
      :for="id"
      :class="['block text-sm font-medium mb-1', error ? 'text-red-700' : 'text-gray-700']"
    >
      {{ label }}
    </label>
    <label v-else-if="label && srOnly" :for="id" class="sr-only">{{ label }}</label>

    <input
      :id="id"
      type="text"
      :placeholder="placeholder"
      :disabled="disabled"
      ref="flatpickrInput"
      :class="[
        'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
        error
          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
        { 'bg-gray-100 cursor-not-allowed': disabled },
      ]"
    />

    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

// Flatpickr is assumed to be globally available via CDN in index.html
// If using npm: import flatpickr from 'flatpickr';
// Ensure Flatpickr CSS is also imported or linked in your main HTML/CSS
// import 'flatpickr/dist/flatpickr.min.css';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    // Can be a string, array of strings (for range), or null
    type: [String, Array, null],
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  srOnly: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Select...',
  },
  options: {
    // Flatpickr configuration options
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const flatpickrInput = ref(null) // Ref to the input element
let flatpickrInstance = null // To store the Flatpickr instance

const initializeFlatpickr = () => {
  // Destroy existing instance if any
  if (flatpickrInstance) {
    flatpickrInstance.destroy()
  }

  // Ensure flatpickr is available globally (from CDN)
  if (typeof flatpickr === 'undefined') {
    console.error('Flatpickr library not found. Please ensure it is loaded.')
    return
  }

  // Combine default options with prop options
  const defaultOptions = {
    // Add any global defaults here
  }

  flatpickrInstance = flatpickr(flatpickrInput.value, {
    ...defaultOptions,
    ...props.options,
    onChange: (selectedDates, dateStr, instance) => {
      // Emit the selected date string(s)
      const dateFormat = props.options.dateFormat || 'Y-m-d'
      if (props.options.mode === 'range' || props.options.mode === 'multiple') {
        const newValues = selectedDates.map((d) => instance.formatDate(d, dateFormat))
        // Only emit if the value truly changed from the current modelValue
        if (JSON.stringify(props.modelValue || []) !== JSON.stringify(newValues)) {
          emit('update:modelValue', newValues)
        }
      } else {
        // Only emit if the value truly changed from the current modelValue
        if (props.modelValue !== dateStr) {
          emit('update:modelValue', dateStr)
        }
      }
      emit('change', dateStr, selectedDates) // Also emit a generic change event
    },
    onClose: (selectedDates, dateStr, instance) => {
      // This is a fallback/additional check, ensuring modelValue is updated on close
      // if it wasn't already updated by onChange (e.g., user types, then closes).
      // The logic is already sound here, preventing recursive updates if value is same.
      const dateFormat = props.options.dateFormat || 'Y-m-d'
      if (props.options.mode === 'range' || props.options.mode === 'multiple') {
        const currentModelValue = props.modelValue || []
        const newValues = selectedDates.map((d) => instance.formatDate(d, dateFormat))
        if (JSON.stringify(currentModelValue) !== JSON.stringify(newValues)) {
          emit('update:modelValue', newValues)
        }
      } else {
        const currentModelValue = props.modelValue
        if (currentModelValue !== dateStr) {
          emit('update:modelValue', dateStr)
          C
        }
      }
    },
  })

  // Set initial value WITHOUT triggering onChange to prevent initial loop
  if (props.modelValue) {
    flatpickrInstance.setDate(props.modelValue, false) // Changed 'true' to 'false' here
  }
}

onMounted(() => {
  initializeFlatpickr()
})

onUnmounted(() => {
  if (flatpickrInstance) {
    flatpickrInstance.destroy()
    flatpickrInstance = null
  }
})

// Watch for external changes to modelValue and update Flatpickr
watch(
  () => props.modelValue,
  (newVal) => {
    if (!flatpickrInstance) return // No instance, nothing to do

    const dateFormat = props.options.dateFormat || 'Y-m-d'

    if (props.options.mode === 'range' || props.options.mode === 'multiple') {
      // For range/multiple, get array of formatted strings from Flatpickr
      const currentFlatpickrValue = flatpickrInstance.selectedDates.map((d) =>
        flatpickrInstance.formatDate(d, dateFormat),
      )
      // Compare stringified arrays for true equality
      if (JSON.stringify(currentFlatpickrValue) !== JSON.stringify(newVal || [])) {
        flatpickrInstance.setDate(newVal, false) // false to not trigger onChange
      }
    } else {
      // For single date/time, get formatted string from Flatpickr
      const currentFlatpickrValue =
        flatpickrInstance.selectedDates.length > 0
          ? flatpickrInstance.formatDate(flatpickrInstance.selectedDates[0], dateFormat)
          : null
      // Compare strings for true equality
      if (currentFlatpickrValue !== newVal) {
        flatpickrInstance.setDate(newVal, false) // false to not trigger onChange
      }
    }
  },
  { deep: true }, // Keep deep watch for options object, but not strictly needed for modelValue itself if comparison is robust
)

// Watch for changes in options (e.g., `mode` changes) and re-initialize
watch(
  () => props.options,
  () => {
    initializeFlatpickr()
  },
  { deep: true },
)
</script>

<style scoped>
/* No additional scoped styles needed as Tailwind classes are used directly,
   and Flatpickr's own CSS is handled by the CDN link. */
</style>
