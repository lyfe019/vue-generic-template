<template>
  <div :class="['flex items-center', { 'space-x-3': label }]">
    <label :for="uniqueId" :class="['relative inline-block toggle-switch', scaleClass]">
      <input
        :id="uniqueId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="handleChange"
        class="opacity-0 w-0 h-0"
      />
      <span
        :class="[
          'toggle-slider',
          'absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 transition-colors duration-400 rounded-full',
          { 'checked-bg': modelValue },
        ]"
      ></span>
    </label>
    <label
      v-if="label"
      :for="uniqueId"
      :class="['text-gray-700 text-base', { 'cursor-not-allowed opacity-75': disabled }]"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Use v-model for checked state
  modelValue: {
    type: Boolean,
    default: false,
  },
  // Optional label next to the switch
  label: {
    type: String,
    default: null,
  },
  // Size of the toggle switch (e.g., to scale it down)
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value),
  },
  // Disables the switch
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

// Generate a unique ID for accessibility (linking label to input)
const uniqueId = computed(() => `toggle-switch-${Math.random().toString(36).substring(2, 9)}`)

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked)
}

// Apply scale class for different sizes
const scaleClass = computed(() => {
  return props.size === 'sm' ? 'transform scale-75' : ''
})
</script>

<style scoped>
/* Custom styles for toggle switch based on original HTML */
.toggle-switch {
  width: 60px;
  height: 34px;
}

.toggle-slider {
  /* background-color handled by checked-bg class */
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: transform 0.4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #4f46e5; /* Indigo-600 */
}

input:focus + .toggle-slider {
  box-shadow: 0 0 1px #4f46e5;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}
</style>
