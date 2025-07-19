<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">File Uploader Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Variant 1: Simple Single File Upload -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Single File Upload</h3>
        <FileUploader
          id="single-profile-picture"
          label="Upload Profile Picture"
          accept="image/*"
          :max-file-size="2 * 1024 * 1024"
          v-model="singleFile"
          @error="handleUploadError"
        />
        <p class="text-sm text-gray-500 mt-2">
          Selected: {{ singleFile ? singleFile.name : 'None' }}
        </p>
      </section>

      <!-- Variant 2: Multiple File Upload -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Multiple Files Upload</h3>
        <FileUploader
          id="multiple-product-images"
          label="Upload Product Images"
          :multiple="true"
          accept="image/png,image/jpeg"
          :max-file-size="5 * 1024 * 1024"
          v-model="multipleFiles"
          @error="handleUploadError"
        />
        <p class="text-sm text-gray-500 mt-2">
          Selected ({{ multipleFiles ? multipleFiles.length : 0 }}):
        </p>
        <ul class="list-disc list-inside text-sm text-gray-600 pl-4">
          <li v-for="file in Array.from(multipleFiles || [])" :key="file.name">{{ file.name }}</li>
          <li v-if="!multipleFiles || multipleFiles.length === 0">None</li>
        </ul>
      </section>

      <!-- Variant 3: Drag-and-Drop File Uploader -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full md:col-span-2 lg:col-span-1">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Drag & Drop Upload (Any File)</h3>
        <FileUploader
          id="drag-drop-general"
          drag-and-drop
          :multiple="true"
          accept=".pdf,.doc,.docx,image/*"
          :max-file-size="10 * 1024 * 1024"
          v-model="dragDropFiles"
          @error="handleUploadError"
        />
        <p class="text-sm text-gray-500 mt-2">
          Selected ({{ dragDropFiles ? dragDropFiles.length : 0 }}):
        </p>
        <ul class="list-disc list-inside text-sm text-gray-600 pl-4">
          <li v-for="file in Array.from(dragDropFiles || [])" :key="file.name">{{ file.name }}</li>
          <li v-if="!dragDropFiles || dragDropFiles.length === 0">None</li>
        </ul>
      </section>

      <!-- Variant 4: Disabled File Uploader -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Disabled File Uploader</h3>
        <FileUploader
          id="disabled-upload"
          label="Upload Receipts (Currently Disabled)"
          :disabled="true"
          v-model="disabledFile"
        />
        <p class="text-sm text-gray-500 mt-2">
          Selected: {{ disabledFile ? disabledFile.name : 'None' }}
        </p>
      </section>

      <!-- Variant 5: File Uploader with Error State -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">File Uploader with Error</h3>
        <FileUploader
          id="error-upload"
          label="Contract Document"
          accept=".pdf"
          :max-file-size="1 * 1024 * 1024"
          :error="fileUploadError"
          :error-message="fileUploadErrorMessage"
          v-model="errorFile"
          @error="handleErrorUpload"
        />
        <p class="text-sm text-gray-500 mt-2">
          Selected: {{ errorFile ? errorFile.name : 'None' }}
        </p>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;FileUploader&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;FileUploader&gt;</code> component provides a flexible and customizable
          interface for file uploads, supporting single files, multiple files, and drag-and-drop
          functionality. It includes built-in validation for file type and size.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li><code>id</code> (String, required): A unique ID for the internal file input.</li>
          <li>
            <code>modelValue</code> (File | FileList | null, default: null): The selected file(s).
            Use with `v-model` for two-way binding.
            <ul class="list-circle list-inside ml-6 mt-1">
              <li>`File` object for single file uploads.</li>
              <li>`FileList` object for multiple file uploads.</li>
            </ul>
          </li>
          <li>
            <code>label</code> (String, default: null): The visible label for the file uploader.
          </li>
          <li>
            <code>srOnly</code> (Boolean, default: false): If `true`, the label will be visually
            hidden but accessible to screen readers.
          </li>
          <li>
            <code>multiple</code> (Boolean, default: false): If `true`, allows multiple files to be
            selected.
          </li>
          <li>
            <code>dragAndDrop</code> (Boolean, default: false): If `true`, enables a drag-and-drop
            area for file selection. The standard input will be hidden.
          </li>
          <li>
            <code>accept</code> (String, default: null): A string specifying accepted file types
            (e.g., "image/*", ".pdf", ".jpg,.png"). Maps to HTML `accept` attribute.
          </li>
          <li>
            <code>maxFileSize</code> (Number, default: null): Maximum allowed file size in bytes.
            Files exceeding this will trigger an error.
          </li>
          <li>
            <code>placeholder</code> (String, default: null): Text to display when no file is chosen
            (only for standard input, not drag & drop).
          </li>
          <li>
            <code>disabled</code> (Boolean, default: false): If `true`, the file uploader will be
            disabled.
          </li>
          <li>
            <code>error</code> (Boolean, default: false): If `true`, applies error styling to the
            component.
          </li>
          <li>
            <code>errorMessage</code> (String, default: null): A message to display below the
            component when `error` is `true`.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:modelValue(files)</code>: Emitted on file selection/drop for two-way
            binding with `v-model`. `files` will be `File` or `FileList`.
          </li>
          <li><code>change(files)</code>: Emitted when the file input's value changes.</li>
          <li>
            <code>files-selected(files)</code>: Emitted when files are selected via the standard
            file input.
          </li>
          <li>
            <code>file-dropped(files)</code>: Emitted when files are dropped into the drag-and-drop
            area.
          </li>
          <li>
            <code>error({ file, type, message })</code>: Emitted when a file fails validation (e.g.,
            size or type). `type` can be 'validation', `message` provides details.
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FileUploader } from '@/components/forms' // Assuming path

const singleFile = ref(null)
const multipleFiles = ref(null) // FileList object
const dragDropFiles = ref(null) // FileList object
const disabledFile = ref(null)
const errorFile = ref(null)

const fileUploadError = ref(false)
const fileUploadErrorMessage = ref('')

const handleUploadError = (errorDetails) => {
  console.error('File upload error:', errorDetails)
  fileUploadError.value = true
  fileUploadErrorMessage.value = errorDetails.message
  // You might want to clear the file input here if it caused the error
  if (errorDetails.file === errorFile.value) {
    errorFile.value = null // Clear the model if it's the error one
  }
}

const handleErrorUpload = (errorDetails) => {
  fileUploadError.value = true
  fileUploadErrorMessage.value = errorDetails.message
  errorFile.value = null // Clear the value if an error occurs
}
</script>

<style scoped>
/* No specific scoped styles needed, as this component primarily relies on Tailwind classes
   and the FileUploader component's own scoped styles. */
</style>
