<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Confirmation Dialog Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Variant 1: Delete Confirmation -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Delete Item Confirmation</h3>
        <p class="text-gray-600 mb-6">Confirm irreversible deletion of data.</p>
        <Button color="red" variant="filled" @click="showDeleteModal = true"> Delete Item </Button>
      </section>

      <!-- Variant 2: Publish Confirmation -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Publish Content Confirmation</h3>
        <p class="text-gray-600 mb-6">Confirm making content publicly available.</p>
        <Button color="green" variant="filled" @click="showPublishModal = true">
          Publish Content
        </Button>
      </section>

      <!-- Variant 3: Save Changes Confirmation -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Save Changes Confirmation</h3>
        <p class="text-gray-600 mb-6">Prompt to save unsaved work before navigating away.</p>
        <Button color="indigo" variant="filled" @click="showSaveModal = true">
          Discard Changes?
        </Button>
      </section>

      <!-- Variant 4: Generic Confirmation with Custom Colors -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center col-span-full md:col-span-1"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Custom Confirmation Dialog</h3>
        <p class="text-gray-600 mb-6">A versatile dialog for any confirmation need.</p>
        <Button color="blue" variant="filled" @click="showCustomModal = true">
          Show Custom Dialog
        </Button>
      </section>

      <!-- Variant 5: Disabled Confirmation Dialog (for demonstration) -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center col-span-full md:col-span-1"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Disabled Confirmation Dialog</h3>
        <p class="text-gray-600 mb-6">Dialog with all buttons disabled.</p>
        <Button @click="showDisabledModal = true"> Show Disabled Dialog </Button>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;ConfirmationDialog&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;ConfirmationDialog&gt;</code> component provides a flexible and accessible
          way to ask users for confirmation before proceeding with an action. It supports different
          visual cues (icons, colors) based on the type of confirmation required.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>id</code> (String, required): A unique ID for the modal element, used for
            accessibility attributes.
          </li>
          <li>
            <code>isOpen</code> (Boolean, default: <code>false</code>): Controls the visibility of
            the dialog. Use with `v-model:isOpen` for two-way binding.
          </li>
          <li><code>title</code> (String, required): The main title of the confirmation dialog.</li>
          <li>
            <code>message</code> (String, required): The descriptive message explaining the action
            requiring confirmation.
          </li>
          <li>
            <code>icon</code> (String, default: 'info'): The Lucide icon name to display (e.g.,
            'alert-triangle', 'check-circle', 'save').
          </li>
          <li>
            <code>iconColor</code> (String, default: 'indigo-600'): Tailwind CSS class for the icon
            color (e.g., 'red-600', 'green-600').
          </li>
          <li>
            <code>iconBgColor</code> (String, default: 'indigo-100'): Tailwind CSS class for the
            background color of the icon circle (e.g., 'red-100', 'green-100').
          </li>
          <li>
            <code>confirmButtonText</code> (String, default: 'Confirm'): Text for the confirmation
            button.
          </li>
          <li>
            <code class="font-bold">confirmButtonColor</code> (String, default: 'indigo'): The base
            color for the confirm button (e.g., 'red', 'green', 'indigo'), passed to your Button
            component.
          </li>
          <li>
            <code class="font-bold">confirmButtonVariantStyle</code> (String, default: 'filled'):
            The style variant for the confirm button ('filled', 'outline', 'ghost', 'link'), passed
            to your Button component.
          </li>
          <li>
            <code>confirmButtonSize</code> (String, default: 'md'): Size for the confirmation
            button. (e.g., 'sm', 'md', 'lg').
          </li>
          <li>
            <code>cancelButtonText</code> (String, default: 'Cancel'): Text for the cancel button.
          </li>
          <li>
            <code class="font-bold">cancelButtonColor</code> (String, default: 'gray'): The base
            color for the cancel button (e.g., 'gray', 'red'), passed to your Button component.
          </li>
          <li>
            <code class="font-bold">cancelButtonVariantStyle</code> (String, default: 'outline'):
            The style variant for the cancel button ('filled', 'outline', 'ghost', 'link'), passed
            to your Button component.
          </li>
          <li>
            <code>cancelButtonSize</code> (String, default: 'md'): Size for the cancel button.
          </li>
          <li>
            <code>disabled</code> (Boolean, default: false): If `true`, all buttons within the
            dialog will be disabled.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:isOpen(boolean)</code>: Emitted when the dialog's visibility changes (e.g.,
            closed by button or backdrop), for two-way binding with `v-model:isOpen`.
          </li>
          <li><code>confirm()</code>: Emitted when the confirmation button is clicked.</li>
          <li>
            <code>cancel()</code>: Emitted when the cancel button, close icon, or backdrop is
            clicked, or Escape key is pressed.
          </li>
        </ul>
      </div>
    </section>
  </div>

  <!-- Confirmation Dialogs -->
  <ConfirmationDialog
    id="delete-item-dialog"
    v-model:is-open="showDeleteModal"
    title="Confirm Deletion"
    message="Are you sure you want to permanently delete this item? This action cannot be undone."
    icon="alert-triangle"
    icon-color="red-600"
    icon-bg-color="red-100"
    confirm-button-text="Delete"
    confirm-button-color="red"
    confirm-button-variant-style="filled"
    @confirm="handleDeleteConfirm"
    @cancel="handleDeleteCancel"
  />

  <ConfirmationDialog
    id="publish-content-dialog"
    v-model:is-open="showPublishModal"
    title="Confirm Publish"
    message="Are you sure you want to publish this content? It will be visible to all users."
    icon="check-circle"
    icon-color="green-600"
    icon-bg-color="green-100"
    confirm-button-text="Publish"
    confirm-button-color="green"
    confirm-button-variant-style="filled"
    @confirm="handlePublishConfirm"
    @cancel="handlePublishCancel"
  />

  <ConfirmationDialog
    id="save-changes-dialog"
    v-model:is-open="showSaveModal"
    title="Unsaved Changes"
    message="You have unsaved changes. Do you want to save them before leaving?"
    icon="save"
    icon-color="yellow-600"
    icon-bg-color="yellow-100"
    confirm-button-text="Save Changes"
    confirm-button-color="indigo"
    confirm-button-variant-style="filled"
    cancel-button-text="Discard"
    cancel-button-color="gray"
    cancel-button-variant-style="outline"
    @confirm="handleSaveConfirm"
    @cancel="handleSaveCancel"
  />

  <ConfirmationDialog
    id="custom-dialog"
    v-model:is-open="showCustomModal"
    title="Custom Action Required"
    message="This is a custom confirmation dialog. You can customize icons, colors, and button texts."
    icon="star"
    icon-color="purple-600"
    icon-bg-color="purple-100"
    confirm-button-text="Proceed"
    confirm-button-color="purple"
    confirm-button-variant-style="filled"
    cancel-button-text="No Thanks"
    cancel-button-color="gray"
    cancel-button-variant-style="ghost"
    @confirm="handleCustomConfirm"
    @cancel="handleCustomCancel"
  />

  <ConfirmationDialog
    id="disabled-dialog"
    v-model:is-open="showDisabledModal"
    title="Action Disabled"
    message="This dialog is currently disabled for demonstration purposes. No actions can be taken."
    icon="slash"
    icon-color="gray-500"
    icon-bg-color="gray-100"
    confirm-button-text="OK"
    confirm-button-color="gray"
    confirm-button-variant-style="filled"
    cancel-button-text="Close"
    cancel-button-color="gray"
    cancel-button-variant-style="outline"
    :disabled="true"
    @confirm="() => console.log('This should not be called when disabled')"
    @cancel="() => console.log('This should not be called when disabled')"
  />
</template>

<script setup>
import { ref } from 'vue'
// import { Button } from '@/components/common' // Assuming Button is in common components
import { ConfirmationDialog } from '@/components/feedback' // Import from new feedback folder

const showDeleteModal = ref(false)
const showPublishModal = ref(false)
const showSaveModal = ref(false)
const showCustomModal = ref(false)
const showDisabledModal = ref(false)

const handleDeleteConfirm = () => {
  console.log('Delete confirmed!')
  // Perform delete logic here
}

const handleDeleteCancel = () => {
  console.log('Delete cancelled.')
}

const handlePublishConfirm = () => {
  console.log('Publish confirmed!')
  // Perform publish logic here
}

const handlePublishCancel = () => {
  console.log('Publish cancelled.')
}

const handleSaveConfirm = () => {
  console.log('Save Changes confirmed!')
  // Perform save changes logic here
}

const handleSaveCancel = () => {
  console.log('Save Changes discarded.')
}

const handleCustomConfirm = () => {
  console.log('Custom action confirmed!')
}

const handleCustomCancel = () => {
  console.log('Custom action cancelled.')
}
</script>

<style scoped>
/* No specific scoped styles needed, as this component primarily relies on Tailwind classes
   and the ConfirmationDialog component's own scoped styles. */
</style>
