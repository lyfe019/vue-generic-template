<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Accordion Components</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Exclusive Accordion (FAQ Style) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Exclusive Accordion (FAQ Style)</h3>
        <AccordionGroup :items="faqItems" type="exclusive" />
      </section>

      <!-- Multi-Open Accordion (Filter Options) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Multi-Open Accordion (Filter Options)
        </h3>
        <AccordionGroup :items="filterItems" type="multi-open" />
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;AccordionItem&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          Represents a single, collapsible panel within an accordion. It handles its own open/close
          state and icon rotation, and can be used individually or managed by an
          <code>&lt;AccordionGroup&gt;</code>.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>title</code> (String, default: ''): The text content displayed in the accordion
            header.
          </li>
          <li>
            <code>modelValue</code> (Boolean, default: false): Controls the open/closed state of the
            accordion item. Supports <code>v-model</code> for two-way binding.
          </li>
          <li>
            <code>icon</code> (String, default: 'chevron-right'): The Lucide icon name to display on
            the right side of the header.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'chevron-right', 'chevron-down', 'plus', 'minus', etc.
            </span>
          </li>
          <li>
            <code>iconRotateType</code> (String, default: 'rotate'): Defines how the icon rotates
            when the accordion opens.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'rotate' (rotates 90 degrees, e.g., for 'chevron-right') or
              'rotate-down' (rotates 180 degrees, e.g., for 'chevron-down').
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>@update:modelValue(boolean)</code>: Emitted when the open/closed state changes,
            for <code>v-model</code> binding.
          </li>
          <li>
            <code>@toggle(boolean)</code>: Emitted when the accordion header is clicked, passing the
            new state (`true` for open, `false` for closed).
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>#header</code>: Optional slot for custom content in the accordion header,
            overriding the `title` prop.
          </li>
          <li>
            <code>#content</code>: Slot for the collapsible content of the accordion item.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Example:
              <code
                >&lt;template #content&gt;&lt;p&gt;Your content
                here.&lt;/p&gt;&lt;/template&gt;</code
              >
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">
          Basic Usage Example (Individual Item):
        </h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;AccordionItem
    title="Click Me"
    v-model="isItemOpen"
    icon="plus"
    icon-rotate-type="rotate"
  &gt;
    &lt;template #content&gt;
      &lt;p&gt;This is the content of the accordion item.&lt;/p&gt;
    &lt;/template&gt;
  &lt;/AccordionItem&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { AccordionItem } from '@/components/common';
const isItemOpen = ref(false);
&lt;/script&gt;</code></pre>
      </div>

      <div>
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;AccordionGroup&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          A container component that manages multiple <code>&lt;AccordionItem&gt;</code> components.
          It provides logic for exclusive (single open) or multi-open behavior.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>items</code> (Array, required): An array of objects, where each object represents
            the data for an <code>&lt;AccordionItem&gt;</code>.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Each item object should have <code>title</code> and <code>content</code> (HTML string)
              properties. Optional properties include <code>icon</code> and
              <code>iconRotateType</code> to override defaults.
            </span>
          </li>
          <li>
            <code>type</code> (String, default: 'exclusive'): Determines the behavior of the
            accordion group.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'exclusive' (only one item can be open at a time) or 'multi-open'
              (multiple items can be open simultaneously).
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- Exclusive Accordion --&gt;
  &lt;AccordionGroup :items="faqData" type="exclusive" /&gt;

  &lt;!-- Multi-Open Accordion --&gt;
  &lt;AccordionGroup :items="filterData" type="multi-open" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { AccordionGroup } from '@/components/common';

const faqData = ref([
  { title: 'Question 1', content: '&lt;p&gt;Answer 1&lt;/p&gt;' },
  { title: 'Question 2', content: '&lt;p&gt;Answer 2&lt;/p&gt;' },
]);

const filterData = ref([
  { title: 'Option 1', content: '&lt;input type="checkbox"&gt;' },
  { title: 'Option 2', content: '&lt;input type="radio"&gt;' },
]);
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { AccordionGroup } from '@/components/common' // Import the AccordionGroup component

// Data for the Exclusive Accordion (FAQ Style)
const faqItems = ref([
  {
    title: 'What are your delivery hours?',
    content:
      '<p>Our delivery service operates from <strong>10:00 AM to 9:00 PM</strong>, Monday through Sunday.</p>',
    icon: 'chevron-right',
    iconRotateType: 'rotate',
  },
  {
    title: 'How can I track my order?',
    content:
      '<p>You can track your order status in real-time by visiting the "My Orders" section of your dashboard and clicking on the specific order.</p>',
    icon: 'chevron-right',
    iconRotateType: 'rotate',
  },
  {
    title: 'Do you offer catering services?',
    content:
      '<p>Yes, we do! Please contact our customer support team for more details on our catering packages and custom options.</p>',
    icon: 'chevron-right',
    iconRotateType: 'rotate',
  },
])

// Data for the Multi-Open Accordion (Filter Options)
const filterItems = ref([
  {
    title: 'Filter by Category',
    content: `
      <div class="space-y-2">
          <label class="flex items-center"><input type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500 mr-2"> Burgers</label>
          <label class="flex items-center"><input type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500 mr-2"> Sides</label>
          <label class="flex items-center"><input type="checkbox" class="rounded text-indigo-600 focus:ring-indigo-500 mr-2"> Drinks</label>
      </div>
    `,
    icon: 'chevron-down',
    iconRotateType: 'rotate-down',
  },
  {
    title: 'Filter by Price Range',
    content: `
      <input type="range" min="0" max="100" value="50" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
      <p class="text-sm mt-2 text-gray-500">Selected range: $0 - $50</p>
    `,
    icon: 'chevron-down',
    iconRotateType: 'rotate-down',
  },
  {
    title: 'Filter by Availability',
    content: `
      <div class="space-y-2">
          <label class="flex items-center"><input type="radio" name="availability" class="text-indigo-600 focus:ring-indigo-500 mr-2"> In Stock</label>
          <label class="flex items-center"><input type="radio" name="availability" class="text-indigo-600 focus:ring-indigo-500 mr-2"> Out of Stock</label>
          <label class="flex items-center"><input type="radio" name="availability" class="text-indigo-600 focus:ring-indigo-500 mr-2"> Pre-order</label>
      </div>
    `,
    icon: 'chevron-down',
    iconRotateType: 'rotate-down',
  },
])

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
