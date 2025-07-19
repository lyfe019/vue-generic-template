<template>
  <div
    :class="[
      'flex items-center rounded-md border border-gray-300 overflow-hidden',
      containerClasses,
    ]"
  >
    <button
      @click="decrement"
      :disabled="isDisabled || modelValue <= min"
      :class="[
        'flex-shrink-0 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0',
        buttonClasses,
        { 'opacity-50 cursor-not-allowed': isDisabled || modelValue <= min },
      ]"
      aria-label="Decrease quantity"
    >
      <Icon name="minus" :class="iconSizeClass" />
    </button>

    <input
      type="number"
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      :min="min"
      :max="max"
      :step="step"
      :disabled="isDisabled"
      :class="[
        'flex-grow text-center outline-none focus:outline-none bg-white text-gray-900 font-medium',
        inputClasses,
        { 'opacity-75 cursor-not-allowed': isDisabled },
      ]"
      role="spinbutton"
      :aria-valuenow="modelValue"
      :aria-valuemin="min"
      :aria-valuemax="max"
    />

    <button
      @click="increment"
      :disabled="isDisabled || modelValue >= max"
      :class="[
        'flex-shrink-0 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0',
        buttonClasses,
        { 'opacity-50 cursor-not-allowed': isDisabled || modelValue >= max },
      ]"
      aria-label="Increase quantity"
    >
      <Icon name="plus" :class="iconSizeClass" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon component is in common

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
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg'
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const containerClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8'
    case 'md':
      return 'h-10'
    case 'lg':
      return 'h-12'
    default:
      return 'h-10'
  }
})

const buttonClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-8 h-8'
    case 'md':
      return 'w-10 h-10'
    case 'lg':
      return 'w-12 h-12'
    default:
      return 'w-10 h-10'
  }
})

const inputClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-2 w-16'
    case 'md':
      return 'text-base px-3 w-20'
    case 'lg':
      return 'text-lg px-4 w-24'
    default:
      return 'text-base px-3 w-20'
  }
})

const iconSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4'
    case 'md':
      return 'w-5 h-5'
    case 'lg':
      return 'w-6 h-6'
    default:
      return 'w-5 h-5'
  }
})

const setValue = (newValue) => {
  let clampedValue = Math.max(props.min, Math.min(props.max, newValue))
  clampedValue = Math.round(clampedValue / props.step) * props.step // Ensure it's a multiple of step

  if (clampedValue !== props.modelValue) {
    emit('update:modelValue', clampedValue)
    emit('change', clampedValue)
  }
}

const increment = () => {
  if (!props.isDisabled) {
    setValue(props.modelValue + props.step)
  }
}

const decrement = () => {
  if (!props.isDisabled) {
    setValue(props.modelValue - props.step)
  }
}

const handleInput = (event) => {
  const value = parseFloat(event.target.value)
  if (!isNaN(value)) {
    setValue(value)
  }
}

const handleBlur = (event) => {
  // On blur, re-set value to ensure it's clamped and a multiple of step
  setValue(parseFloat(event.target.value) || props.min)
}
</script>

<style scoped>
/* Hide default number input arrows */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
