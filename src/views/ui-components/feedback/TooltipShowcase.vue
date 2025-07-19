<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Tooltip Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Variant 1: Basic Tooltips -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Basic Tooltips</h3>
        <div class="flex flex-wrap gap-x-12 gap-y-10 items-center justify-center">
          <Tooltip text="This is a top tooltip." position="top">
            <button
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Hover Top
            </button>
          </Tooltip>

          <Tooltip text="This is a bottom tooltip." position="bottom">
            <button
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Hover Bottom
            </button>
          </Tooltip>

          <Tooltip text="This is a left tooltip." position="left">
            <button
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Hover Left
            </button>
          </Tooltip>

          <Tooltip text="This is a right tooltip." position="right">
            <button
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Hover Right
            </button>
          </Tooltip>
        </div>
        <p class="mt-6 text-sm text-gray-500">
          *These tooltips use Vue's reactivity for controlled showing/hiding on hover/focus.
        </p>
      </section>

      <!-- Variant 2: Tooltips on Icons -->
      <section
        class="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center"
      >
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Icon Tooltips</h3>
        <div class="flex flex-wrap gap-x-12 gap-y-10 items-center justify-center">
          <Tooltip text="Edit Item" position="bottom">
            <button
              class="p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Edit item"
            >
              <Icon name="edit" class="w-6 h-6"></Icon>
            </button>
          </Tooltip>

          <Tooltip text="Delete Item" position="bottom">
            <button
              class="p-2 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Delete item"
            >
              <Icon name="trash-2" class="w-6 h-6"></Icon>
            </button>
          </Tooltip>

          <Tooltip text="Add New" position="bottom">
            <button
              class="p-2 rounded-full text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Add new"
            >
              <Icon name="plus-circle" class="w-6 h-6"></Icon>
            </button>
          </Tooltip>
        </div>
      </section>

      <!-- Variant 3: Tooltip with Richer Content -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Tooltip with Richer Content</h3>
        <div class="flex items-center justify-center">
          <Tooltip position="bottom">
            <template #default>
              <span
                class="text-lg font-medium text-gray-800 border-b-2 border-dashed border-gray-400 pb-1 cursor-help"
              >
                View User Profile
              </span>
            </template>
            <template #content>
              <div class="flex items-center mb-2">
                <img
                  src="https://placehold.co/40x40/6B46C1/ffffff?text=U"
                  alt="User Avatar"
                  class="w-8 h-8 rounded-full mr-2"
                />
                <span class="font-bold text-base">Alex Johnson</span>
              </div>
              <p class="text-sm text-gray-200">Role: Administrator</p>
              <p class="text-sm text-gray-200">Last login: 2 hours ago</p>
              <a
                href="#"
                class="text-blue-300 hover:underline text-sm mt-2 block"
                @click.prevent="goToProfile"
                >Go to profile page</a
              >
            </template>
          </Tooltip>
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;Tooltip&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;Tooltip&gt;</code> component provides a non-intrusive way to display
          informative text or rich content when a user hovers over or focuses on an element. It is
          accessible and supports various positioning options.
        </p>

        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>text</code> (String, default: <code>''</code>): The simple text content for the
            tooltip. This prop is used if the <code>#content</code> slot is not provided.
          </li>
          <li>
            <code>position</code> (String, default: <code>'top'</code>): Determines the placement of
            the tooltip relative to its trigger element. Accepted values: <code>'top'</code>,
            <code>'bottom'</code>, <code>'left'</code>, <code>'right'</code>.
          </li>
          <li>
            <code>showDelay</code> (Number, default: <code>100</code>): The delay in milliseconds
            before the tooltip appears after the trigger element is hovered or focused.
          </li>
          <li>
            <code>hideDelay</code> (Number, default: <code>100</code>): The delay in milliseconds
            before the tooltip hides after the mouse leaves or focus shifts from the trigger
            element.
          </li>
          <li>
            <code>modelValue</code> (Boolean, default: <code>false</code>): A v-model compatible
            prop to programmatically control the visibility of the tooltip. Emits
            <code>update:modelValue</code>.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            **Default Slot**: This slot is used for the **trigger element** (the element that, when
            hovered/focused, shows the tooltip).
            <pre
              class="bg-gray-100 p-2 rounded text-sm mt-1"
            ><code>&lt;Tooltip text="My tooltip"&gt;
  &lt;button&gt;Hover Me&lt;/button&gt; &lt;!-- This is the default slot content --&gt;
&lt;/Tooltip&gt;</code></pre>
          </li>
          <li>
            <code>#content</code>: Use this named slot to provide **richer HTML content** for the
            tooltip itself. If this slot is provided, the <code>text</code> prop will be ignored.
            <pre
              class="bg-gray-100 p-2 rounded text-sm mt-1"
            ><code>&lt;Tooltip position="bottom"&gt;
  &lt;template #default&gt;
    &lt;span&gt;Hover for rich content&lt;/span&gt;
  &lt;/template&gt;
  &lt;template #content&gt;
    &lt;div&gt;
      &lt;h4&gt;Rich Title&lt;/h4&gt;
      &lt;p&gt;More detailed information.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Tooltip&gt;</code></pre>
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li><code>show</code>: Emitted when the tooltip becomes visible.</li>
          <li><code>hide</code>: Emitted when the tooltip becomes hidden.</li>
          <li>
            <code>update:modelValue</code>: Emitted with `true` or `false` when the tooltip's
            visibility changes (for v-model usage).
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;Tooltip text="Hello, I am a tooltip!" position="top" :show-delay="300"&gt;
    &lt;button class="bg-blue-500 text-white p-2 rounded"&gt;Hover Me&lt;/button&gt;
  &lt;/Tooltip&gt;

  &lt;Tooltip position="right"&gt;
    &lt;template #default&gt;
      &lt;Icon name="info" class="w-5 h-5 text-gray-600" /&gt;
    &lt;/template&gt;
    &lt;template #content&gt;
      &lt;div class="p-2"&gt;
        &lt;h5 class="font-bold mb-1"&gt;Information&lt;/h5&gt;
        &lt;p&gt;This is important context for the user.&lt;/p&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Tooltip&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Tooltip } from '@/components/feedback';
import { Icon } from '@/components/common'; // If using Icon inside tooltip trigger or content
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Tooltip } from '@/components/feedback'
import { Icon } from '@/components/common' // Assuming Icon is available for icon tooltips

const goToProfile = () => {
  alert('Navigating to user profile page!')
  // In a real application, you would use Vue Router here:
  // router.push('/user/alex-johnson-profile');
}
</script>

<style scoped>
/* No specific scoped styles needed for the showcase,
   as the Tooltip component contains its own styles. */
</style>
