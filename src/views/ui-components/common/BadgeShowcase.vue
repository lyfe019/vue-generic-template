<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Badge Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Start Component: Badge - Variant 1: Basic Text Badges -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Basic Text Badges</h3>
        <div class="flex flex-wrap items-center gap-3">
          <Badge color="green">Active</Badge>
          <Badge color="yellow">Pending</Badge>
          <Badge color="red">Urgent</Badge>
          <Badge color="blue">New</Badge>
          <Badge color="gray">Draft</Badge>
          <Badge color="purple">Feature</Badge>
        </div>
      </section>
      <!-- End Component: Badge - Variant 1: Basic Text Badges -->

      <!-- Start Component: Badge - Variant 2: Badges with Icons -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Badges with Icons</h3>
        <div class="flex flex-wrap items-center gap-3">
          <Badge color="green" icon="check-circle">Completed</Badge>
          <Badge color="blue" icon="star" icon-fill-color="blue-500">Featured</Badge>
          <Badge color="red" icon="alert-triangle">Alert</Badge>
          <Badge color="orange" icon="clock">Due Soon</Badge>
        </div>
      </section>
      <!-- End Component: Badge - Variant 2: Badges with Icons -->

      <!-- Start Component: Badge - Variant 3: Notification/Count Badges -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Notification / Count Badges</h3>
        <div class="flex flex-wrap items-center gap-6">
          <NotificationBadge :count="312" color="red">
            <button
              class="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              aria-label="Notifications"
            >
              <i data-lucide="bell" class="w-6 h-6"></i>
            </button>
          </NotificationBadge>
          <NotificationBadge count="9+" color="orange">
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Messages"
            >
              Messages
            </button>
          </NotificationBadge>
          <NotificationBadge is-dot color="green">
            <button
              class="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              aria-label="Tasks"
            >
              <i data-lucide="clipboard" class="w-6 h-6"></i>
            </button>
          </NotificationBadge>
        </div>
      </section>
      <!-- End Component: Badge - Variant 3: Notification/Count Badges -->

      <!-- Start Component: Badge - Variant 4: Outline Badges -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Outline Badges</h3>
        <div class="flex flex-wrap items-center gap-3">
          <Badge type="outline" color="indigo">Primary</Badge>
          <Badge type="outline" color="green">Success</Badge>
          <Badge type="outline" color="red">Danger</Badge>
          <Badge type="outline" color="gray" icon="tag">Category</Badge>
        </div>
      </section>
      <!-- End Component: Badge - Variant 4: Outline Badges -->
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3"><code>&lt;Badge&gt;</code> Component</h4>
        <p class="text-gray-600 mb-2">
          A versatile component for displaying small, descriptive labels. Supports various colors,
          filled or outline styles, and optional Lucide icons.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>color</code> (String, default: 'gray'): Sets the primary color theme of the badge.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'green', 'yellow', 'red', 'blue', 'gray', 'purple', 'indigo', 'orange'.
            </span>
          </li>
          <li>
            <code>type</code> (String, default: 'filled'): Defines the visual style of the badge.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'filled' (solid background) or 'outline' (border only).
            </span>
          </li>
          <li>
            <code>icon</code> (String, default: null): The name of a Lucide icon to display before
            the text.
            <br />
            <span class="font-mono text-sm text-gray-500">
              E.g., 'check-circle', 'star', 'alert-triangle', 'clock', 'tag'.
            </span>
          </li>
          <li>
            <code>iconFillColor</code> (String, default: null): Tailwind color class (e.g.,
            'blue-500') to apply a fill color to the icon. Useful for icons that support fill (like
            'star').
            <br />
            <span class="font-mono text-sm text-gray-500">
              E.g., 'blue-500' would result in `fill-blue-500 stroke-blue-500`.
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            Default Slot: Used for the main text content of the badge.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Example: <code>&lt;Badge&gt;Your Text&lt;/Badge&gt;</code>
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre
          class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"
        ><code>&lt;Badge color="green"&gt;Active&lt;/Badge&gt;
&lt;Badge type="outline" color="indigo" icon="tag"&gt;Category&lt;/Badge&gt;</code></pre>
      </div>

      <div>
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;NotificationBadge&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          A specialized component for displaying numerical counts or simple dots, typically overlaid
          on another element (like a button or icon).
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>count</code> (String or Number, default: null): The number or text to display
            within the badge. If `isDot` is true, this prop is ignored.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Example: <code>:count="5"</code> or <code>count="9+"</code>.
            </span>
          </li>
          <li>
            <code>isDot</code> (Boolean, default: false): If true, the badge will render as a small
            colored dot without any text.
          </li>
          <li>
            <code>color</code> (String, default: 'red'): Sets the background color of the
            notification badge.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'red', 'orange', 'green'.
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            Default Slot: Used for the element (e.g., button, icon) that the notification badge is
            attached to.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Example:
              <code
                >&lt;NotificationBadge&gt;&lt;button&gt;Messages&lt;/button&gt;&lt;/NotificationBadge&gt;</code
              >
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre
          class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"
        ><code>&lt;NotificationBadge :count="7" color="red"&gt;
  &lt;i data-lucide="bell" class="w-6 h-6"&gt;&lt;/i&gt;
&lt;/NotificationBadge&gt;

&lt;NotificationBadge is-dot color="green"&gt;
  &lt;button&gt;Tasks&lt;/button&gt;
&lt;/NotificationBadge&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Badge, NotificationBadge } from '@/components/common' // Import the badge components

// Render Lucide icons when this view is mounted
onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})
</script>

<style scoped>
/* No specific scoped CSS needed here, as it primarily relies on Tailwind classes and imported components. */
</style>
