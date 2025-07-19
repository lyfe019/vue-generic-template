<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Icon Components</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Standard Icons (Various Sizes & Colors) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Standard Icons (Sizes & Colors)</h3>
        <div class="flex flex-wrap items-end gap-6">
          <!-- Small Icons -->
          <Icon name="check" size="sm" color="green-500" aria-label="Checkmark icon" />
          <Icon name="x" size="sm" color="red-500" aria-label="Close icon" />
          <Icon name="info" size="sm" color="blue-500" aria-label="Info icon" />

          <!-- Medium Icons -->
          <Icon name="sun" size="md" color="yellow-500" aria-label="Sun icon" />
          <Icon name="moon" size="md" color="gray-700" aria-label="Moon icon" />
          <Icon name="star" size="md" color="orange-500" aria-label="Star icon" />

          <!-- Large Icons -->
          <Icon name="database" size="lg" color="indigo-600" aria-label="Database icon" />
          <Icon name="cloud" size="lg" color="purple-600" aria-label="Cloud icon" />
          <Icon name="cpu" size="lg" color="teal-600" aria-label="CPU icon" />

          <!-- Extra Large Icons (Responsive sizing handled by Tailwind in Icon component's size prop) -->
          <Icon name="bar-chart-2" size="2xl" color="pink-600" aria-label="Bar chart icon" />
          <Icon name="pie-chart" size="2xl" color="lime-600" aria-label="Pie chart icon" />
        </div>
      </section>

      <!-- Icons with Text (Inline Usage) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Icons with Text (Inline Usage)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p class="flex items-center text-gray-700 text-base">
            <Icon name="clock" size="md" color="gray-500" class="mr-2" /> Last updated: 2 hours ago
          </p>
          <p class="flex items-center text-gray-700 text-base">
            <Icon name="calendar" size="md" color="gray-500" class="mr-2" /> Due Date: 2025-07-30
          </p>
          <p class="flex items-center text-gray-700 text-base">
            <Icon name="map-pin" size="md" color="gray-500" class="mr-2" /> Location: Main Kitchen
          </p>
          <p class="flex items-center text-gray-700 text-base">
            <Icon name="users" size="md" color="gray-500" class="mr-2" /> Assigned To: Sarah J.
          </p>
          <p class="flex items-center text-green-700 text-base font-medium">
            <Icon name="check-circle" size="md" color="green-500" class="mr-2" /> Status: Completed
          </p>
          <p class="flex items-center text-red-700 text-base font-medium">
            <Icon name="alert-triangle" size="md" color="red-500" class="mr-2" /> Urgent: Action
            Required!
          </p>
        </div>
      </section>

      <!-- Action Icons (Clickable/Hover Effects) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Action Icons (Clickable)</h3>
        <div class="flex flex-wrap items-center gap-4">
          <button
            class="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            aria-label="Edit Item"
          >
            <Icon name="edit" size="lg" color="current" />
          </button>
          <button
            class="p-2 rounded-full text-red-500 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors duration-200"
            aria-label="Delete Item"
          >
            <Icon name="trash-2" size="lg" color="current" />
          </button>
          <button
            class="p-2 rounded-full text-blue-500 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
            aria-label="Add New"
          >
            <Icon name="plus-circle" size="lg" color="current" />
          </button>
          <button
            class="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors duration-200"
            aria-label="Filter Options"
          >
            <Icon name="filter" size="md" color="current" />
            <span>Filter</span>
          </button>
        </div>
      </section>

      <!-- Decorative Icons / Dividers -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Decorative Icons / Dividers</h3>
        <div class="space-y-6">
          <div class="flex items-center text-gray-400">
            <span class="h-px bg-gray-300 flex-1"></span>
            <Icon name="grip-horizontal" size="lg" color="current" class="mx-4" />
            <span class="h-px bg-gray-300 flex-1"></span>
          </div>

          <div class="flex items-center justify-center space-x-4">
            <Icon name="cookie" size="2xl" color="orange-400" />
            <Icon name="cup-soda" size="2xl" color="blue-400" />
            <Icon name="ice-cream" size="2xl" color="pink-400" />
          </div>

          <div class="flex justify-center">
            <Icon name="layout-dashboard" size="3xl" color="indigo-300" />
          </div>
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3"><code>&lt;Icon&gt;</code> Component</h4>
        <p class="text-gray-600 mb-2">
          A reusable Vue component for rendering
          <a
            href="https://lucide.dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
            >Lucide Icons</a
          >. This component simplifies icon usage by abstracting the `data-lucide` attribute and
          providing props for common styling properties like name, size, and color.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>name</code> (String, required): The official name of the Lucide icon to display.
            <br />
            <span class="font-mono text-sm text-gray-500">
              E.g., 'check', 'alert-triangle', 'settings', 'bell'. Refer to the
              <a
                href="https://lucide.dev/icons/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:underline"
                >Lucide Icons website</a
              >
              for a full list of available icons.
            </span>
          </li>
          <li>
            <code>size</code> (String, default: 'md'): Controls the visual size of the icon.
            Predefined values map to Tailwind `w-X h-X` classes. You can also pass raw Tailwind size
            classes directly (e.g., `'w-7 h-7'`).
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid predefined values: 'sm' (w-4 h-4), 'md' (w-5 h-5), 'lg' (w-6 h-6), 'xl' (w-8
              h-8), '2xl' (w-10 h-10), '3xl' (w-12 h-12).
            </span>
          </li>
          <li>
            <code>color</code> (String, default: 'current'): Sets the color of the icon using
            Tailwind CSS text color utility classes. Use 'current' to inherit the text color from
            the parent element.
            <br />
            <span class="font-mono text-sm text-gray-500">
              E.g., 'blue-500', 'red-700', 'gray-600'.
            </span>
          </li>
          <li>
            <code>ariaLabel</code> (String, default: null): An optional accessibility label for
            screen readers, describing the icon's purpose. If not provided, it defaults to
            `"{icon-name} icon"`.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- A medium-sized settings icon in gray --&gt;
  &lt;Icon name="settings" size="md" color="gray-600" aria-label="Settings icon" /&gt;

  &lt;!-- A large download icon in a primary color, within a button --&gt;
  &lt;button class="flex items-center px-3 py-2 bg-blue-500 text-white rounded-md"&gt;
    &lt;Icon name="download" size="md" color="white" class="mr-2" /&gt;
    Download
  &lt;/button&gt;

  &lt;!-- A small mail icon with accompanying text --&gt;
  &lt;p class="flex items-center text-gray-800"&gt;
    &lt;Icon name="mail" size="sm" color="purple-500" class="mr-2" /&gt;
    Check your inbox.
  &lt;/p&gt;

  &lt;!-- Custom size icon --&gt;
  &lt;Icon name="activity" size="w-7 h-7" color="teal-500" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Icon } from '@/components/common';
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Icon } from '@/components/common' // Import the new Icon component

// The Icon component itself handles calling lucide.createIcons() on mount and prop changes.
// So, for this showcase page, we just need to ensure lucide is available globally,
// which is typically handled by the main application's entry point (main.js or similar).
// If this were a standalone page, we'd keep the onMounted for lucide.createIcons.
// For a Vue SPA, it's generally done once at app init or whenever dynamic components are loaded.

// However, for safety and direct testing in an isolated environment like this,
// it's good practice to ensure the createIcons function is called.
// In a proper Vue setup, this would be managed by the parent app or a plugin.
onMounted(() => {
  // Ensure Lucide is available and re-render if needed after initial component mounting
  // The individual Icon components will also call createIcons when they appear.
  if (typeof lucide !== 'undefined') {
    setTimeout(() => lucide.createIcons(), 100)
  }
})
</script>

<style scoped>
/* No specific scoped CSS needed here, as it relies on Tailwind classes and the Icon component. */
</style>
