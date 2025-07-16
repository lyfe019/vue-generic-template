<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Alert / Banner Components</h2>

    <div class="grid grid-cols-1 gap-6">
      <Alert
        type="success"
        title="Success!"
        message="Your changes have been saved successfully."
        :dismissible="true"
        @dismiss="handleAlertDismiss('success')"
      />

      <Alert
        type="error"
        title="Error!"
        message="Something went wrong. Please try again later."
        :dismissible="true"
        @dismiss="handleAlertDismiss('error')"
      />

      <Alert
        type="warning"
        title="Warning!"
        message="Your inventory is critically low on several items."
        :dismissible="true"
        @dismiss="handleAlertDismiss('warning')"
      />

      <Alert
        type="info"
        title="Information"
        message="New features have been rolled out. Check the announcement section!"
        :dismissible="false"
        @dismiss="handleAlertDismiss('info')"
      />

      <Alert
        type="action"
        title="Offline Mode"
        message="You are currently offline. Data may not be synced."
        action-button-text="Reconnect"
        :dismissible="true"
        custom-icon="cloud-off"
        @action-click="handleActionClick"
        @dismiss="handleAlertDismiss('action')"
      />
    </div>

    <hr class="my-10 border-gray-300" />

    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div>
        <h4 class="text-xl font-medium text-gray-700 mb-3"><code>&lt;Alert&gt;</code> Component</h4>
        <p class="text-gray-600 mb-2">
          A flexible component for displaying various types of alerts and banners, including
          success, error, warning, informational, and action-oriented messages. Supports dismissible
          functionality and custom icons.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>type</code> (String, required): Defines the visual style and default icon of the
            alert.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'success', 'error', 'warning', 'info', 'action'.
            </span>
          </li>
          <li>
            <code>title</code> (String, required): The main heading or short summary of the alert.
          </li>
          <li>
            <code>message</code> (String, required): The detailed message content of the alert.
          </li>
          <li>
            <code>dismissible</code> (Boolean, default: true): If `true`, a close ('x') button will
            be displayed, allowing the user to dismiss the alert.
          </li>
          <li>
            <code>actionButtonText</code> (String, default: null): If provided, an action button
            will be displayed on the right side of the alert.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Example: 'Reconnect', 'View Details'.
            </span>
          </li>
          <li>
            <code>customIcon</code> (String, default: null): A Lucide icon name to override the
            default icon associated with the `type` prop.
            <br />
            <span class="font-mono text-sm text-gray-500"> E.g., 'download', 'bell'. </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>@dismiss</code>: Emitted when the dismiss button is clicked and the alert starts
            to fade out. Useful for triggering parent component logic (e.g., removing the alert from
            a list).
          </li>
          <li>
            <code>@action-click</code>: Emitted when the optional action button is clicked. Useful
            for triggering specific actions like navigating or performing an API call.
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;Alert
  type="success"
  title="Success!"
  message="Your data was saved."
  :dismissible="true"
  @dismiss="handleSuccessDismiss"
/&gt;

&lt;Alert
  type="warning"
  title="Low Stock!"
  message="Some items are running low."
  :dismissible="false"
/&gt;

&lt;Alert
  type="action"
  title="Account Update"
  message="Your profile needs attention."
  action-button-text="Update Now"
  @action-click="navigateToProfile"
/&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Alert from '@/components/feedback/Alert.vue' // CORRECTED IMPORT PATH

// Placeholder functions for demonstration purposes
const handleAlertDismiss = (alertType) => {
  console.log(`${alertType} alert dismissed!`)
  // In a real application, you might remove the alert from a list in a store here
}

const handleActionClick = () => {
  console.log('Action button clicked!')
  // Implement reconnect logic or other action here
}

// Ensure Lucide icons are rendered for this view when it's mounted
onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})
</script>

<style scoped>
/* No specific scoped CSS needed here, as it relies on imported components and Tailwind. */
</style>
