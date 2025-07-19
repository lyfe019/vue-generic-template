<template>
  <div
    class="range-slider-container w-full p-4 rounded-md bg-white border border-gray-200 shadow-sm"
  >
    <label v-if="label" :for="sliderId" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="showValue" class="ml-2 text-indigo-600 font-semibold">{{ formattedValue }}</span>
    </label>
    <input
      type="range"
      :id="sliderId"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="handleInput"
      :disabled="isDisabled"
      :class="[
        'w-full h-2 rounded-lg appearance-none cursor-pointer',
        trackClasses,
        { 'opacity-50 cursor-not-allowed': isDisabled },
      ]"
      :style="trackStyle"
    />
    <div v-if="showMinMaxLabels" class="flex justify-between text-xs text-gray-500 mt-2">
      <span>{{ min }}</span>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  label: {
    type: String,
    default: null,
  },
  showValue: {
    type: Boolean,
    default: true,
  },
  showMinMaxLabels: {
    type: Boolean,
    default: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  sliderColor: {
    type: String, // Tailwind color for the active track, e.g., 'indigo-600', 'blue-500'
    default: 'indigo-600',
  },
  trackBgColor: {
    type: String, // Tailwind color for the background track, e.g., 'gray-200'
    default: 'gray-200',
  },
  sliderId: {
    type: String,
    default: () => `range-slider-${Math.random().toString(36).substr(2, 9)}`,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleInput = (event) => {
  const value = parseFloat(event.target.value)
  emit('update:modelValue', value)
  emit('change', value)
}

const formattedValue = computed(() => {
  // Basic formatting, can be extended for currency, percentage etc.
  return props.modelValue
})

// Dynamic styling for the track fill
const trackStyle = computed(() => {
  const percentage = ((props.modelValue - props.min) / (props.max - props.min)) * 100
  return {
    background: `linear-gradient(to right, var(--tw-bg-${props.sliderColor}) ${percentage}%, var(--tw-bg-${props.trackBgColor}) ${percentage}%)`,
  }
})

// Tailwind classes for the track background (will be overridden by inline style for fill)
const trackClasses = computed(() => {
  // These classes are for the overall appearance, the inline style handles the fill.
  return `bg-${props.trackBgColor}`
})
</script>

<style scoped>
/* Base styles for range input */
input[type='range'] {
  -webkit-appearance: none; /* Hides default slider */
  width: 100%; /* Full-width */
  background: transparent; /* Make default track transparent */
}

/* Thumb styles */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none; /* Hides default thumb */
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: var(--tw-bg-indigo-600); /* Default thumb color, matches sliderColor */
  cursor: pointer;
  margin-top: -6px; /* Adjust thumb position */
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2); /* Focus ring effect */
  transition:
    background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

input[type='range']::-moz-range-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: var(--tw-bg-indigo-600); /* Default thumb color */
  cursor: pointer;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
  transition:
    background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

input[type='range']::-ms-thumb {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background: var(--tw-bg-indigo-600); /* Default thumb color */
  cursor: pointer;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
  transition:
    background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

/* Thumb hover/active states */
input[type='range']::-webkit-slider-thumb:hover {
  background: var(--tw-bg-indigo-700); /* Darker on hover */
}
input[type='range']::-webkit-slider-thumb:active {
  background: var(--tw-bg-indigo-800); /* Even darker on active */
}

input[type='range']::-moz-range-thumb:hover {
  background: var(--tw-bg-indigo-700);
}
input[type='range']::-moz-range-thumb:active {
  background: var(--tw-bg-indigo-800);
}

input[type='range']::-ms-thumb:hover {
  background: var(--tw-bg-indigo-700);
}
input[type='range']::-ms-thumb:active {
  background: var(--tw-bg-indigo-800);
}

/* Disabled state for thumb */
input[type='range']:disabled::-webkit-slider-thumb {
  background: var(--tw-bg-gray-400);
  cursor: not-allowed;
  box-shadow: none;
}
input[type='range']:disabled::-moz-range-thumb {
  background: var(--tw-bg-gray-400);
  cursor: not-allowed;
  box-shadow: none;
}
input[type='range']:disabled::-ms-thumb {
  background: var(--tw-bg-gray-400);
  cursor: not-allowed;
  box-shadow: none;
}

/* Track styles (these are the default background, the inline style overrides for fill) */
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  background: var(--tw-bg-gray-200); /* Default track color */
  border-radius: 2px;
}

input[type='range']::-moz-range-track {
  width: 100%;
  height: 4px;
  background: var(--tw-bg-gray-200); /* Default track color */
  border-radius: 2px;
}

input[type='range']::-ms-track {
  width: 100%;
  height: 4px;
  background: var(--tw-bg-gray-200); /* Default track color */
  border-radius: 2px;
}

/* Focus styles */
input[type='range']:focus {
  outline: none;
}

/* Variables for dynamic colors (ensure Tailwind colors are available) */
.range-slider-container {
  --tw-bg-indigo-600: #4f46e5;
  --tw-bg-indigo-700: #4338ca;
  --tw-bg-indigo-800: #3730a3;
  --tw-bg-blue-500: #3b82f6;
  --tw-bg-green-500: #22c55e;
  --tw-bg-red-500: #ef4444;
  --tw-bg-gray-200: #e5e7eb;
  --tw-bg-gray-400: #9ca3af;
}
</style>
