<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Toast Notification Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Trigger for Success Toast -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Success Toast</h3>
        <p class="text-gray-600 mb-6">Displays successful operations.</p>
        <button
          class="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          @click="showSuccessToast"
        >
          Show Success Toast
        </button>
      </section>

      <!-- Trigger for Error Toast -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Error Toast</h3>
        <p class="text-gray-600 mb-6">Informs about failed actions.</p>
        <button
          class="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          @click="showErrorToast"
        >
          Show Error Toast
        </button>
      </section>

      <!-- Trigger for Warning Toast -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Warning Toast</h3>
        <p class="text-gray-600 mb-6">Alerts about potential issues.</p>
        <button
          class="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
          @click="showWarningToast"
        >
          Show Warning Toast (Dismissible)
        </button>
      </section>

      <!-- Trigger for Info Toast -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Info Toast</h3>
        <p class="text-gray-600 mb-6">General, non-critical updates.</p>
        <button
          class="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          @click="showInfoToast"
        >
          Show Info Toast
        </button>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">Integrating the Toast System</h4>
        <p class="text-gray-600 mb-2">
          To use toast notifications, you first need to place the
          <code>&lt;ToastContainer&gt;</code> component in a high-level layout, preferably in your
          main application layout (e.g., <code>DashboardLayout.vue</code>) or <code>App.vue</code>.
          You can place multiple containers if you need different toast positions simultaneously.
        </p>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;div id="app-layout"&gt;
    &lt;!-- Your main content --&gt;
    &lt;router-view /&gt;

    &lt;!-- Toast Containers --&gt;
    &lt;ToastContainer position="top-right" /&gt;
    &lt;ToastContainer position="top-center" /&gt;
    &lt;ToastContainer position="bottom-left" /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ToastContainer } from '@/components/feedback'; // Don't forget to import!
&lt;/script&gt;</code></pre>

        <h4 class="text-xl font-medium text-gray-700 mt-6 mb-3">
          Using <code>useToast()</code> Composable
        </h4>
        <p class="text-gray-600 mb-2">
          Once the <code>&lt;ToastContainer&gt;</code> is mounted, you can trigger toasts from any
          component using the <code>useToast</code> composable.
        </p>

        <h5 class="text-lg font-medium text-gray-700 mb-2"><code>useToast()</code> Parameters:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            An object with the following properties:
            <ul class="list-disc list-inside text-gray-600 space-y-1 ml-6">
              <li>
                <code>message</code> (String, required): The text content to display in the toast.
              </li>
              <li>
                <code>type</code> (String, optional, default: <code>'info'</code>): The style of the
                toast. Accepted values: <code>'success'</code>, <code>'error'</code>,
                <code>'warning'</code>, <code>'info'</code>.
              </li>
              <li>
                <code>duration</code> (Number, optional, default: <code>3000</code>): How long (in
                milliseconds) the toast should be visible before auto-dismissing. Set to
                <code>0</code> for a permanent toast that must be dismissed manually via its close
                button.
              </li>
              <li>
                <code>dismissible</code> (Boolean, optional, default: <code>true</code>): If
                <code>false</code>, the close button will not be shown. (Note: A permanent toast
                should ideally be dismissible).
              </li>
              <li>
                <code>position</code> (String, optional, default: <code>'top-right'</code>): The
                position where the toast should appear. Accepted values: <code>'top-right'</code>,
                <code>'top-center'</code>, <code>'bottom-left'</code>. **Important:** This toast
                will only appear in the container that matches this position.
              </li>
            </ul>
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Example Usage:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;button @click="triggerToast"&gt;Show Toast&lt;/button&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { useToast } from '@/composables/useToast';

const addToast = useToast();

const triggerToast = () => {
  addToast({
    message: 'Operation completed successfully!',
    type: 'success',
    duration: 5000,
    position: 'top-right' // Ensure a ToastContainer with this position exists
  });
};
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useToast } from '../../../composables/useToast'

const addToast = useToast()

const showSuccessToast = () => {
  addToast({
    message: 'Your profile has been updated successfully!',
    type: 'success',
    duration: 3000,
    position: 'top-right',
  })
}

const showErrorToast = () => {
  addToast({
    message: 'Failed to save changes. Please check your input.',
    type: 'error',
    duration: 5000,
    position: 'top-center',
  })
}

const showWarningToast = () => {
  addToast({
    message: 'Some fields are missing required information.',
    type: 'warning',
    duration: 0, // Permanent, requires manual dismissal
    dismissible: true,
    position: 'bottom-left',
  })
}

const showInfoToast = () => {
  addToast({
    message: 'Welcome back! New features are now available.',
    type: 'info',
    duration: 2000,
    position: 'top-right',
  })
}
</script>

<style scoped>
/* No specific scoped styles needed for the showcase,
   as Toast and ToastContainer components contain their own styles. */
</style>
