<template>
  <div :class="['w-full', { relative: type === 'multi-select' || type === 'combobox' }]">
    <label v-if="label && srOnly" :for="id" class="sr-only">{{ label }}</label>
    <label
      v-else-if="label"
      :for="id"
      :class="['block text-sm font-medium mb-1', error ? 'text-red-700' : 'text-gray-700']"
    >
      {{ label }}
    </label>

    <!-- Checkbox / Radio Button -->
    <div v-if="type === 'checkbox' || type === 'radio'" class="flex items-center">
      <input
        :id="id"
        :type="type"
        :name="name"
        :checked="modelValue"
        :value="value"
        @change="handleCheckboxRadioChange"
        :disabled="disabled"
        :class="[
          'h-4 w-4 border-gray-300 focus:ring-indigo-500',
          type === 'checkbox' ? 'rounded' : '', // Checkboxes are rounded
          error ? 'border-red-500 text-red-600' : 'text-indigo-600',
          { 'cursor-not-allowed text-gray-400': disabled },
        ]"
      />
      <label
        v-if="!srOnly && label"
        :for="id"
        :class="['ml-2 text-sm', disabled ? 'text-gray-500' : 'text-gray-700']"
      >
        {{ label }}
      </label>
    </div>

    <!-- Standard Select (Dropdown) -->
    <div v-else-if="type === 'select'" class="relative mt-1 rounded-md shadow-sm">
      <select
        :id="id"
        :value="modelValue"
        @change="handleSelectChange"
        :disabled="disabled"
        :class="[
          'block w-full pl-3 pr-10 py-2 text-base border rounded-md shadow-sm focus:outline-none sm:text-sm',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
          { 'cursor-not-allowed bg-gray-100': disabled },
          { 'appearance-none bg-white': !hasNativeArrow }, // Remove native arrow if we add custom one
        ]"
      >
        <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <div
        v-if="!hasNativeArrow"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <Icon name="chevron-down" size="md" color="gray-400" />
      </div>
    </div>

    <!-- Multi-select Dropdown (Custom UI) -->
    <div v-else-if="type === 'multi-select'" class="multi-select-dropdown relative w-full">
      <button
        :id="id"
        type="button"
        @click="toggleMultiSelect"
        :disabled="disabled"
        :class="[
          'w-full text-left bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 focus:outline-none sm:text-sm cursor-pointer flex justify-between items-center',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
          { 'cursor-not-allowed bg-gray-100': disabled },
        ]"
        aria-haspopup="listbox"
        :aria-expanded="multiSelectOpen"
      >
        <span class="text-gray-700">{{ multiSelectDisplayText }}</span>
        <Icon name="chevron-down" size="md" color="gray-400" />
      </button>
      <div
        v-show="multiSelectOpen"
        class="multi-select-options absolute w-full bg-white mt-1"
        @click.stop
      >
        <div class="py-1" role="menu" aria-orientation="vertical" :aria-labelledby="id">
          <label
            v-for="option in options"
            :key="option.value"
            class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-sm"
          >
            <input
              type="checkbox"
              :value="option.value"
              v-model="internalMultiSelectValues"
              :disabled="
                disabled ||
                (maxSelections &&
                  internalMultiSelectValues.length >= maxSelections &&
                  !internalMultiSelectValues.includes(option.value))
              "
              class="mr-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            {{ option.text }}
          </label>
        </div>
      </div>
    </div>

    <!-- Combobox (Searchable Dropdown) -->
    <div v-else-if="type === 'combobox'" class="relative w-full">
      <input
        :id="id"
        type="text"
        :placeholder="placeholder"
        v-model="comboboxSearchTerm"
        @input="handleComboboxInput"
        @focus="handleComboboxFocus"
        @blur="handleComboboxBlur"
        @keydown.down.prevent="navigateComboboxOptions('down')"
        @keydown.up.prevent="navigateComboboxOptions('up')"
        @keydown.enter.prevent="selectHighlightedComboboxOption"
        :disabled="disabled"
        :class="[
          'block w-full pl-3 pr-10 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
          { 'cursor-not-allowed bg-gray-100': disabled },
        ]"
        role="combobox"
        aria-autocomplete="list"
        :aria-controls="`${id}-options`"
        :aria-expanded="comboboxOptionsOpen"
      />
      <div
        :id="`${id}-options`"
        v-show="comboboxOptionsOpen"
        class="combobox-options absolute w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200"
      >
        <div class="py-1" role="listbox">
          <template v-if="filteredComboboxOptions.length > 0">
            <div
              v-for="(option, index) in filteredComboboxOptions"
              :key="option.value"
              @click="selectComboboxOption(option)"
              @mouseenter="highlightedIndex = index"
              :class="[
                'px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm',
                { 'bg-indigo-50': highlightedIndex === index },
              ]"
              role="option"
              :aria-selected="highlightedIndex === index"
            >
              {{ option.text }}
            </div>
          </template>
          <div v-else class="px-4 py-2 text-gray-500 text-sm">No matching items</div>
        </div>
      </div>
    </div>

    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Icon } from '@/components/common'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [Boolean, String, Array], // Boolean for checkbox, String for radio/select/combobox, Array for multi-select
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
  type: {
    type: String,
    default: 'checkbox',
    validator: (val) => ['checkbox', 'radio', 'select', 'multi-select', 'combobox'].includes(val),
  },
  name: {
    type: String, // For radio button groups
    default: null,
  },
  value: {
    type: [String, Boolean, Number], // For individual checkbox/radio button value
    default: null,
  },
  options: {
    type: Array, // [{ text: String, value: any }] for select/multi-select/combobox
    default: () => [],
  },
  placeholder: {
    type: String,
    default: 'Select an option',
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
  hasNativeArrow: {
    type: Boolean,
    default: true, // For standard select, show native arrow or custom Lucide icon
  },
  maxSelections: {
    type: Number, // For multi-select
    default: null,
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

// --- Common Logic for all types ---
const handleInput = (event) => {
  let value
  if (props.type === 'checkbox') {
    value = event.target.checked
  } else if (props.type === 'radio') {
    value = event.target.value
  } else if (props.type === 'select') {
    value = event.target.value
  }
  emit('update:modelValue', value)
  emit('change', value)
}

// --- Checkbox/Radio specific logic ---
const handleCheckboxRadioChange = (event) => {
  if (props.type === 'checkbox') {
    emit('update:modelValue', event.target.checked)
    emit('change', event.target.checked)
  } else if (props.type === 'radio') {
    emit('update:modelValue', event.target.value)
    emit('change', event.target.value)
  }
}

// --- Select specific logic ---
const handleSelectChange = (event) => {
  emit('update:modelValue', event.target.value)
  emit('change', event.target.value)
}

// --- Multi-select specific logic ---
const multiSelectOpen = ref(false)
const internalMultiSelectValues = ref([])

// Initialize internalMultiSelectValues from modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    if (props.type === 'multi-select' && Array.isArray(newVal)) {
      internalMultiSelectValues.value = [...newVal]
    }
  },
  { immediate: true },
)

// Sync internalMultiSelectValues with modelValue on change
watch(internalMultiSelectValues, (newVal) => {
  emit('update:modelValue', newVal)
  emit('change', newVal)
})

const toggleMultiSelect = () => {
  if (!props.disabled) {
    multiSelectOpen.value = !multiSelectOpen.value
  }
}

const multiSelectDisplayText = computed(() => {
  if (internalMultiSelectValues.value.length === 0) {
    return props.placeholder || 'Select options...'
  } else if (internalMultiSelectValues.value.length === 1) {
    const selected = props.options.find((opt) => opt.value === internalMultiSelectValues.value[0])
    return selected ? selected.text : internalMultiSelectValues.value[0]
  } else {
    return `${internalMultiSelectValues.value.length} selected`
  }
})

// Close multi-select dropdown when clicking outside
const onClickOutsideMultiSelect = (event) => {
  if (multiSelectOpen.value && !event.target.closest('.multi-select-dropdown')) {
    multiSelectOpen.value = false
  }
}
onMounted(() => {
  if (props.type === 'multi-select') {
    document.addEventListener('click', onClickOutsideMultiSelect)
  }
})
onUnmounted(() => {
  if (props.type === 'multi-select') {
    document.removeEventListener('click', onClickOutsideMultiSelect)
  }
})

// --- Combobox specific logic ---
// Initialize comboboxSearchTerm only if type is 'combobox' and modelValue is string-like
const comboboxSearchTerm = ref(
  props.type === 'combobox' && props.modelValue !== null && props.modelValue !== undefined
    ? String(props.modelValue)
    : '',
)

const comboboxOptionsOpen = ref(false)
const highlightedIndex = ref(-1) // Index of the currently highlighted option

const filteredComboboxOptions = computed(() => {
  if (!props.options || props.options.length === 0) return []
  // Ensure comboboxSearchTerm.value is a string before calling toLowerCase()
  const term = String(comboboxSearchTerm.value).toLowerCase()
  return props.options.filter((option) => String(option.text).toLowerCase().includes(term))
})

// Update modelValue when comboboxSearchTerm changes (for v-model sync)
watch(comboboxSearchTerm, (newVal) => {
  // Only emit update if the type is combobox to avoid unintended updates for other types
  if (props.type === 'combobox') {
    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
})

// Update comboboxSearchTerm from modelValue (initial and external changes)
watch(
  () => props.modelValue,
  (newVal) => {
    if (props.type === 'combobox') {
      // Convert to string to prevent toLowerCase errors if newVal is null/undefined/number
      const newValueAsString = newVal !== null && newVal !== undefined ? String(newVal) : ''
      if (newValueAsString !== comboboxSearchTerm.value) {
        comboboxSearchTerm.value = newValueAsString
      }
    }
  },
  { immediate: true },
)

const handleComboboxInput = () => {
  comboboxOptionsOpen.value = true
  highlightedIndex.value = -1 // Reset highlight on new input
}

const handleComboboxFocus = () => {
  comboboxOptionsOpen.value = true
  highlightedIndex.value = -1 // Reset highlight on focus
}

const handleComboboxBlur = () => {
  // Delay hiding to allow click event on option to fire
  setTimeout(() => {
    if (!document.activeElement || !document.activeElement.closest('.combobox-options')) {
      comboboxOptionsOpen.value = false
      highlightedIndex.value = -1
    }
  }, 100)
}

const selectComboboxOption = (option) => {
  comboboxSearchTerm.value = option.text // Display the text in the input
  comboboxOptionsOpen.value = false
  emit('update:modelValue', option.value) // Emit the value, not just the text
  emit('change', option.value)
}

const navigateComboboxOptions = (direction) => {
  const optionsCount = filteredComboboxOptions.value.length
  if (optionsCount === 0) return

  if (direction === 'down') {
    highlightedIndex.value = (highlightedIndex.value + 1) % optionsCount
  } else if (direction === 'up') {
    highlightedIndex.value = (highlightedIndex.value - 1 + optionsCount) % optionsCount
  }

  // Scroll into view
  // Use nextTick or a small timeout if the options list is rendered conditionally,
  // to ensure the elements are in the DOM before attempting to scroll.
  const optionsContainer = document.getElementById(`${props.id}-options`)
  if (optionsContainer && optionsContainer.children[0]?.children[highlightedIndex.value]) {
    const highlightedOption = optionsContainer.children[0].children[highlightedIndex.value]
    if (highlightedOption) {
      highlightedOption.scrollIntoView({ block: 'nearest' })
    }
  }
}

const selectHighlightedComboboxOption = () => {
  if (highlightedIndex.value !== -1 && filteredComboboxOptions.value[highlightedIndex.value]) {
    selectComboboxOption(filteredComboboxOptions.value[highlightedIndex.value])
  } else if (comboboxSearchTerm.value.trim() !== '') {
    // If no option is highlighted, and there's text in the input,
    // consider it a custom entry or a direct match if available.
    const exactMatch = props.options.find(
      (opt) => String(opt.text).toLowerCase() === String(comboboxSearchTerm.value).toLowerCase(),
    )
    if (exactMatch) {
      selectComboboxOption(exactMatch)
    } else {
      // If no exact match and not from options, emit current text value as the value
      emit('update:modelValue', comboboxSearchTerm.value)
      emit('change', comboboxSearchTerm.value)
      comboboxOptionsOpen.value = false
    }
  }
}

// Initial Lucide icon rendering for any dynamically added icons (like chevron for multi-select)
onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})
</script>

<style scoped>
/* Styles for multi-select dropdown */
.multi-select-dropdown {
  position: relative;
}
.multi-select-options {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0; /* gray-200 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
  z-index: 10;
}

/* Styles for Combobox */
.combobox-options {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0; /* gray-200 */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
  z-index: 10;
}
</style>
