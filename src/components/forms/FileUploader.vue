<template>
  <div :class="{ 'w-full': true }">
    <label
      v-if="label && !srOnly"
      :for="id"
      :class="['block text-sm font-medium mb-1', error ? 'text-red-700' : 'text-gray-700']"
    >
      {{ label }}
    </label>
    <label v-else-if="label && srOnly" :for="id" class="sr-only">{{ label }}</label>

    <!-- Standard File Input (or invisible for drag & drop) -->
    <input
      :id="id"
      type="file"
      :multiple="multiple"
      :accept="accept"
      :disabled="disabled"
      ref="fileInput"
      @change="handleFileChange"
      :class="[
        'block w-full text-sm text-gray-500',
        'file:mr-4 file:py-2 file:px-4',
        'file:rounded-md file:border-0',
        'file:text-sm file:font-semibold',
        error ? 'file:bg-red-50 file:text-red-700' : 'file:bg-indigo-50 file:text-indigo-700',
        error ? 'hover:file:bg-red-100' : 'hover:file:bg-indigo-100',
        { 'cursor-not-allowed file:opacity-50': disabled },
        { hidden: dragAndDrop }, // Hide if dragAndDrop is true
      ]"
    />

    <!-- Drag and Drop Area -->
    <div
      v-if="dragAndDrop"
      :id="`drag-drop-area-${_uid}`"
      :class="[
        'drag-drop-area flex flex-col items-center justify-center p-8 rounded-lg cursor-pointer h-48',
        'border-2 dashed',
        isDragOver ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50',
        { 'cursor-not-allowed opacity-70': disabled },
      ]"
      @click="openFileInput"
      @dragenter.prevent="handleDragEnter"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <Icon
        name="cloud-upload"
        size="lg"
        :color="isDragOver ? 'indigo-600' : 'gray-400'"
        class="mb-3"
      />
      <p class="text-gray-600 text-center mb-2">
        Drag & drop files here or
        <span class="text-indigo-600 font-medium hover:underline">browse</span>
      </p>
      <p v-if="maxFileSize" class="text-xs text-gray-500">
        Max file size: {{ formatBytes(maxFileSize) }}
      </p>
      <p v-if="multiple" class="text-xs text-gray-500">Multiple files allowed</p>
      <p v-if="accept" class="text-xs text-gray-500">Allowed types: {{ accept }}</p>
    </div>

    <!-- Display selected file names -->
    <div class="mt-2 text-sm text-gray-600">
      <template v-if="selectedFileNames.length > 0">
        <p class="font-medium">Selected Files:</p>
        <ul :class="{ 'list-disc list-inside space-y-1 pl-4': multiple }">
          <li v-for="(name, index) in selectedFileNames" :key="index">{{ name }}</li>
        </ul>
      </template>
      <p v-else-if="!dragAndDrop && !placeholder" class="text-gray-500">No file chosen</p>
      <p v-else-if="!dragAndDrop && placeholder" class="text-gray-500">{{ placeholder }}</p>
    </div>

    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
    <p v-if="sizeError" class="mt-1 text-sm text-red-600">
      {{ sizeError }}
    </p>
    <p v-if="typeError" class="mt-1 text-sm text-red-600">
      {{ typeError }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon component is in the same common folder

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    // Can be File, FileList, or null/undefined
    type: [File, FileList, null],
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
  multiple: {
    type: Boolean,
    default: false,
  },
  dragAndDrop: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String, // e.g., "image/*", ".pdf", ".jpg,.png"
    default: null,
  },
  maxFileSize: {
    type: Number, // Max file size in bytes
    default: null,
  },
  placeholder: {
    type: String,
    default: null, // For standard input, if no file is selected
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

const emit = defineEmits(['update:modelValue', 'change', 'files-selected', 'file-dropped', 'error'])

const fileInput = ref(null)
const isDragOver = ref(false)
const sizeError = ref(null)
const typeError = ref(null)

// Unique ID for drag-drop area, useful if multiple instances exist
const _uid = Math.random().toString(36).substring(2, 9)

const selectedFileNames = computed(() => {
  if (props.modelValue instanceof File) {
    return [props.modelValue.name]
  } else if (props.modelValue instanceof FileList) {
    return Array.from(props.modelValue).map((file) => file.name)
  }
  return []
})

const validateFiles = (files) => {
  sizeError.value = null
  typeError.value = null
  const validFiles = []

  for (const file of files) {
    let isValid = true

    // Validate file size
    if (props.maxFileSize && file.size > props.maxFileSize) {
      sizeError.value = `File "${file.name}" exceeds maximum size of ${formatBytes(props.maxFileSize)}.`
      isValid = false
    }

    // Validate file type
    if (props.accept) {
      const acceptedTypes = props.accept.split(',').map((type) => type.trim().toLowerCase())
      const fileType = file.type.toLowerCase()
      const fileExtension = file.name.split('.').pop().toLowerCase()

      let typeMatches = false
      for (const acceptedType of acceptedTypes) {
        if (acceptedType.startsWith('.')) {
          // It's an extension like ".pdf"
          if ('.' + fileExtension === acceptedType) {
            typeMatches = true
            break
          }
        } else if (acceptedType.endsWith('/*')) {
          // It's a general type like "image/*"
          if (fileType.startsWith(acceptedType.slice(0, -1))) {
            typeMatches = true
            break
          }
        } else {
          // Exact MIME type like "application/pdf"
          if (fileType === acceptedType) {
            typeMatches = true
            break
          }
        }
      }

      if (!typeMatches) {
        typeError.value = `File "${file.name}" has an unsupported type. Allowed: ${props.accept}.`
        isValid = false
      }
    }

    if (isValid) {
      validFiles.push(file)
    } else {
      // Emit an error specific to file validation
      emit('error', { file: file, type: 'validation', message: sizeError.value || typeError.value })
    }
  }

  return validFiles
}

const handleFileChange = (event) => {
  if (props.disabled) return
  const files = event.target.files
  processFiles(files, 'files-selected')
}

const handleDragEnter = () => {
  if (props.disabled) return
  isDragOver.value = true
}

const handleDragOver = () => {
  if (props.disabled) return
  isDragOver.value = true
}

const handleDragLeave = () => {
  if (props.disabled) return
  isDragOver.value = false
}

const handleDrop = (event) => {
  if (props.disabled) return
  isDragOver.value = false
  const files = event.dataTransfer.files
  processFiles(files, 'file-dropped')
}

const openFileInput = () => {
  if (!props.disabled && fileInput.value) {
    fileInput.value.click()
  }
}

const processFiles = (files, eventName) => {
  const validatedFiles = validateFiles(files)

  if (validatedFiles.length > 0) {
    let result = null
    if (props.multiple) {
      // Create a new FileList from the validated files
      const dataTransfer = new DataTransfer()
      validatedFiles.forEach((file) => dataTransfer.items.add(file))
      result = dataTransfer.files
    } else {
      result = validatedFiles[0] // Only take the first valid file for single upload
    }
    emit('update:modelValue', result)
    emit('change', result)
    emit(eventName, result)
  } else {
    // If no valid files, clear the modelValue and any existing errors
    emit('update:modelValue', props.multiple ? new DataTransfer().files : null)
    emit('change', props.multiple ? new DataTransfer().files : null)
  }
}

// Helper to format bytes into readable size
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

// Sync internal state with external modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      // If modelValue is cleared externally, also clear internal errors
      sizeError.value = null
      typeError.value = null
    }
  },
)
</script>

<style scoped>
/* Styling for drag-and-drop area */
.drag-drop-area {
  border-color: #cbd5e0; /* gray-300 */
  background-color: #f8fafc; /* gray-50 */
  transition: all 0.2s ease-in-out;
}
/* No separate .dragover class needed as it's handled inline with isDragOver */
</style>
