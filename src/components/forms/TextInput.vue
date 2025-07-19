<template>
  <div :class="['relative', { 'w-full': type !== 'tag' }]">
    <label v-if="label && srOnly" :for="id" class="sr-only">{{ label }}</label>
    <label
      v-else-if="label"
      :for="id"
      :class="['block text-sm font-medium mb-1', error ? 'text-red-700' : 'text-gray-700']"
    >
      {{ label }}
    </label>

    <!-- Tag Input specific wrapper -->
    <div
      v-if="type === 'tag'"
      :class="[
        'flex flex-wrap items-center gap-2 border rounded-md p-2 bg-white shadow-sm',
        error
          ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500'
          : 'border-gray-300 focus-within:ring-indigo-500 focus-within:border-indigo-500',
      ]"
    >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tag, index) in internalTags"
          :key="tag"
          class="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full cursor-pointer transition-colors duration-200 hover:bg-indigo-200"
          @click="removeTag(index)"
        >
          {{ tag }}
          <Icon name="x" size="sm" class="ml-2 text-indigo-600 hover:text-indigo-900" />
        </span>
      </div>
      <input
        :id="id"
        type="text"
        :placeholder="placeholder"
        :disabled="disabled"
        v-model="currentTagInput"
        @keydown.enter.prevent="addTag"
        :class="[
          'flex-grow min-w-[100px] outline-none border-none focus:ring-0 focus:border-0 p-0 m-0 sm:text-sm',
          { 'cursor-not-allowed bg-gray-50': disabled },
        ]"
      />
    </div>

    <!-- Regular input/textarea with conditional rendering for icons/buttons -->
    <template v-else>
      <div
        v-if="
          hasPrefixIcon || type === 'password' || type === 'search' || type === 'number-stepper'
        "
        :class="['relative mt-1 rounded-md shadow-sm', { flex: type === 'number-stepper' }]"
      >
        <!-- Prefix Icon for email/search/general inputs -->
        <div
          v-if="hasPrefixIcon"
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <Icon :name="prefixIcon" size="md" color="gray-400" />
        </div>

        <!-- Decrement Button for number-stepper -->
        <button
          v-if="type === 'number-stepper'"
          type="button"
          @click="stepDown"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          :disabled="disabled || currentNumberValue <= minNumber"
        >
          <Icon name="minus" size="sm" />
        </button>

        <component
          :is="inputTag"
          :id="id"
          :type="inputType"
          :placeholder="placeholder"
          :value="modelValue"
          @input="handleInput"
          :disabled="disabled"
          :rows="rows"
          :min="minNumber"
          :max="maxNumber"
          :class="[
            'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
            hasPrefixIcon ? 'pl-10' : '', // Adjust padding for prefix icon
            type === 'password' ? 'pr-10' : '', // Adjust padding for password toggle
            type === 'search-button' ? 'rounded-r-none' : '', // For search with button
            type === 'number-stepper'
              ? 'flex-grow text-center px-0 border-t border-b rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              : '', // For number steppers
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
            { 'resize-y': resizable },
            { 'bg-gray-100 cursor-not-allowed': disabled },
          ]"
        ></component>

        <!-- Toggle Password Visibility Button -->
        <button
          v-if="type === 'password'"
          type="button"
          @click="togglePasswordVisibility"
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Toggle password visibility"
          :disabled="disabled"
        >
          <Icon :name="passwordVisible ? 'eye-off' : 'eye'" size="md" />
        </button>

        <!-- Increment Button for number-stepper -->
        <button
          v-if="type === 'number-stepper'"
          type="button"
          @click="stepUp"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
          :disabled="disabled || currentNumberValue >= maxNumber"
        >
          <Icon name="plus" size="sm" />
        </button>
      </div>

      <!-- Simple input/textarea (no prefix icon, password toggle, or steppers) -->
      <component
        v-else
        :is="inputTag"
        :id="id"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput"
        :disabled="disabled"
        :rows="rows"
        :min="minNumber"
        :max="maxNumber"
        :class="[
          'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
          { 'resize-y': resizable },
          { 'bg-gray-100 cursor-not-allowed': disabled },
        ]"
      ></component>
    </template>

    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>

    <!-- Append Slot for things like search buttons -->
    <div v-if="type === 'search-button'" class="flex-shrink-0">
      <button
        type="button"
        @click="$emit('search', modelValue)"
        class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Icon } from '@/components/common'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Array],
    default: '',
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
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (val) =>
      [
        'text',
        'email',
        'password',
        'number',
        'textarea',
        'search',
        'search-button',
        'number-stepper',
        'tag',
      ].includes(val),
  },
  icon: {
    type: String, // Lucide icon name for prefix or general use
    default: null,
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
  rows: {
    type: Number,
    default: 4, // Only for textarea
  },
  resizable: {
    type: Boolean,
    default: false, // Only for textarea
  },
  min: {
    type: Number,
    default: undefined, // Only for number/number-stepper
  },
  max: {
    type: Number,
    default: undefined, // Only for number/number-stepper
  },
  // Specific for tag input
  initialTags: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue', 'search', 'add-tag', 'remove-tag'])

// Internal state for password visibility
const passwordVisible = ref(false)

// Internal state for tags
const internalTags = ref([...props.initialTags])
const currentTagInput = ref('')

// Computed properties for dynamic rendering
const inputTag = computed(() => (props.type === 'textarea' ? 'textarea' : 'input'))
const inputType = computed(() => {
  if (props.type === 'password') {
    return passwordVisible.value ? 'text' : 'password'
  }
  if (props.type === 'number-stepper') {
    return 'number' // The actual input type for number steppers
  }
  // Map 'search-button' to 'text' for the input field
  if (props.type === 'search-button') {
    return 'text'
  }
  return props.type
})

const hasPrefixIcon = computed(() => {
  return (
    props.icon &&
    props.type !== 'password' &&
    props.type !== 'number-stepper' &&
    props.type !== 'tag'
  )
})

const prefixIcon = computed(() => {
  if (props.type === 'email' && !props.icon) return 'mail'
  if (props.type === 'search' || (props.type === 'search-button' && !props.icon)) return 'search'
  return props.icon
})

// Internal state for number inputs with steppers
const currentNumberValue = ref(props.modelValue || 0)
const minNumber = computed(() => (props.min !== undefined ? props.min : -Infinity))
const maxNumber = computed(() => (props.max !== undefined ? props.max : Infinity))

// Watch for changes in modelValue for number type to keep internal state in sync
watch(
  () => props.modelValue,
  (newValue) => {
    if (props.type === 'number' || props.type === 'number-stepper') {
      currentNumberValue.value = newValue
    }
  },
)

// Watch for changes in initialTags prop to update internalTags
watch(
  () => props.initialTags,
  (newTags) => {
    internalTags.value = [...newTags]
  },
)

// Event handlers
const handleInput = (event) => {
  let value = event.target.value
  if (props.type === 'number' || props.type === 'number-stepper') {
    value = parseFloat(value)
    // Ensure value is within min/max if specified
    if (props.min !== undefined && value < props.min) value = props.min
    if (props.max !== undefined && value > props.max) value = props.max
    currentNumberValue.value = value
  }
  emit('update:modelValue', value)
}

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const stepUp = () => {
  let newValue = (currentNumberValue.value || 0) + 1
  if (newValue > maxNumber.value) newValue = maxNumber.value
  emit('update:modelValue', newValue)
  currentNumberValue.value = newValue
}

const stepDown = () => {
  let newValue = (currentNumberValue.value || 0) - 1
  if (newValue < minNumber.value) newValue = minNumber.value
  emit('update:modelValue', newValue)
  currentNumberValue.value = newValue
}

const addTag = () => {
  const trimmedTag = currentTagInput.value.trim()
  if (
    trimmedTag &&
    !internalTags.value.some((tag) => tag.toLowerCase() === trimmedTag.toLowerCase())
  ) {
    internalTags.value.push(trimmedTag)
    emit('update:modelValue', internalTags.value) // Emit updated array of tags
    emit('add-tag', trimmedTag)
    currentTagInput.value = ''
  }
}

const removeTag = (index) => {
  const removedTag = internalTags.value.splice(index, 1)[0]
  emit('update:modelValue', internalTags.value) // Emit updated array of tags
  emit('remove-tag', removedTag)
}

// Auto-create icons for dynamically added tags. This should be handled in the main app
// if this component is used within an overall Vue app that handles icon rendering.
// For self-contained examples, it would be within onMounted/watch in the showcase.
</script>

<style scoped>
/* Hide number input arrows (spin buttons) only for generic number inputs,
   not if we are intentionally providing stepper buttons.
   Tailwind's utility classes `[appearance:textfield]` and
   `[&::-webkit-outer-spin-button]:appearance-none` handle this inline.
*/
/* input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
} */
</style>
