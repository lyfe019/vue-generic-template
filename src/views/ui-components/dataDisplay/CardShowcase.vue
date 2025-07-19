<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Card Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <!-- Variant 1: Detailed Info with Icon -->
      <Card
        title="Recent Deliveries"
        description="Track the status of your latest ingredient deliveries and their expected arrival times."
        icon="truck"
        icon-bg-color="blue-100"
        icon-color="blue-600"
        flex-direction="flex-col"
        align-items="items-start"
        justify-content="justify-start"
        gap="space-y-4"
      >
        <template #actions>
          <Button color="blue" variant="filled"> View Details </Button>
        </template>
      </Card>

      <!-- Variant 2: Product Highlight Card -->
      <Card
        title="Classic Beef Burger"
        description="A popular item with high demand. Stock needs to be monitored closely."
        image-url="https://placehold.co/120x120/FFD700/000?text=Product"
        image-alt="Classic Beef Burger"
        flex-direction="flex-col"
        align-items="items-center"
        justify-content="justify-start"
        gap="space-y-4"
        :text-center="true"
      >
        <div class="flex items-center space-x-2 text-sm text-gray-700 mb-3">
          <Icon name="tag" class="w-4 h-4" />
          <span>Category: Main Course</span>
        </div>
        <template #actions>
          <Button color="indigo" variant="filled"> Edit Product </Button>
        </template>
      </Card>

      <!-- Variant 3: Progress/Stats Card -->
      <Card
        title="Weekly Goal Progress"
        description=""
        icon="trending-up"
        icon-bg-color="green-100"
        icon-color="green-600"
        :value="'75%'"
        value-size="text-3xl"
        value-color="text-green-700"
        :progress-bar-value="75"
        progress-bar-color="bg-green-600"
        progress-text="Achieved 75% of sales target this week."
        progress-text-color="text-gray-500"
        flex-direction="flex-col"
        align-items="items-start"
        justify-content="justify-between"
      >
        <div class="flex items-center justify-between text-sm text-gray-600 w-full">
          <span>Target: $10,000</span>
          <span>Current: $7,500</span>
        </div>
        <!-- No action buttons for this card based on original HTML -->
      </Card>

      <!-- Variant 4: Alert/Notification Card -->
      <Card
        title="Low Stock Alert!"
        description='Several key ingredients are running low. Please restock "Buns" and "Cheese" immediately.'
        icon="alert-triangle"
        icon-color="yellow-600"
        bg-color="yellow-50"
        border-color="yellow-200"
        text-color="yellow-800"
        flex-direction="flex-row"
        align-items="items-start"
        justify-content="justify-start"
        gap="ml-4"
        icon-padding="p-0"
      >
        <a
          href="#"
          class="text-sm font-medium text-yellow-700 hover:text-yellow-900 underline mt-2"
        >
          View all low stock items
        </a>
      </Card>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3"><code>&lt;Card&gt;</code> Component</h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;Card&gt;</code> component provides a flexible container for displaying
          various types of content in a visually distinct block. It supports icons, images, progress
          bars, and custom content via slots.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li><code>title</code> (String, required): The main title displayed on the card.</li>
          <li>
            <code>description</code> (String, default: ''): A brief descriptive text for the card.
          </li>
          <li>
            <code>bgColor</code> (String, default: 'white'): Tailwind color class for the background
            (e.g., 'white', 'yellow-50').
          </li>
          <li>
            <code>textColor</code> (String, default: 'gray-800'): Tailwind color class for the
            primary text.
          </li>
          <li>
            <code>borderColor</code> (String, default: ''): Tailwind color class for a border (e.g.,
            'yellow-200').
          </li>
          <li>
            <code>flexDirection</code> (String, default: 'flex-col'): Layout of card content
            ('flex-col' or 'flex-row').
          </li>
          <li>
            <code>alignItems</code> (String, default: 'items-center'): Tailwind alignment for items
            ('items-start', 'items-center', 'items-end').
          </li>
          <li>
            <code>justifyContent</code> (String, default: 'justify-start'): Tailwind justify for
            items ('justify-start', 'justify-center', 'justify-between').
          </li>
          <li>
            <code>gap</code> (String, default: 'space-y-4'): Tailwind spacing between items
            ('space-y-4', 'space-x-4', etc.).
          </li>
          <li>
            <code>textCenter</code> (Boolean, default: false): If true, main text content will be
            centered.
          </li>
          <li>
            <code>icon</code> (String, default: ''): Lucide icon name to display (e.g., 'truck',
            'alert-triangle').
          </li>
          <li>
            <code>iconSize</code> (String, default: 'w-6 h-6'): Tailwind size classes for the icon.
          </li>
          <li>
            <code>iconBgColor</code> (String, default: ''): Tailwind color class for the icon's
            background.
          </li>
          <li>
            <code>iconColor</code> (String, default: ''): Tailwind color class for the icon itself.
          </li>
          <li>
            <code>iconPadding</code> (String, default: 'p-3'): Tailwind padding for the icon
            container.
          </li>
          <li><code>imageUrl</code> (String, default: ''): URL for an image to display.</li>
          <li><code>imageAlt</code> (String, default: 'Card image'): Alt text for the image.</li>
          <li>
            <code>imageShape</code> (String, default: 'w-32 h-32 object-cover rounded-full mb-4
            shadow-sm'): Tailwind classes for image styling.
          </li>
          <li>
            <code>value</code> (String | Number, default: null): A main value to display (e.g.,
            '75%').
          </li>
          <li>
            <code>valueSize</code> (String, default: 'text-3xl'): Tailwind size class for the value.
          </li>
          <li>
            <code>valueColor</code> (String, default: 'text-gray-900'): Tailwind color class for the
            value.
          </li>
          <li>
            <code>progressBarValue</code> (Number, default: null): Percentage (0-100) for a progress
            bar.
          </li>
          <li>
            <code>progressBarColor</code> (String, default: 'bg-indigo-600'): Tailwind color for the
            progress bar.
          </li>
          <li>
            <code>progressText</code> (String, default: ''): Additional text for the progress bar.
          </li>
          <li>
            <code>progressTextColor</code> (String, default: 'text-gray-500'): Tailwind color for
            progress text.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            **Default Slot**: Used for any additional content in the card body, placed after the
            main title/description/value.
            <pre class="bg-gray-100 p-2 rounded text-sm mt-1"><code>&lt;Card ...&gt;
  &lt;p&gt;Additional custom content here.&lt;/p&gt;
&lt;/Card&gt;</code></pre>
          </li>
          <li>
            <code>#actions</code>: Used for action buttons or links typically placed at the bottom
            of the card. This slot provides flexbox utilities (`buttonFlex`, `buttonJustify`,
            `buttonSpace`) for flexible arrangement of its content.
            <pre class="bg-gray-100 p-2 rounded text-sm mt-1"><code>&lt;template #actions&gt;
  &lt;Button&gt;Action 1&lt;/Button&gt;
  &lt;Button variant="outline"&gt;Action 2&lt;/Button&gt;
&lt;/template&gt;</code></pre>
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- Simple Info Card --&gt;
  &lt;Card
    title="Daily Sales"
    description="Overview of today's sales performance."
    icon="dollar-sign"
    icon-bg-color="green-100"
    icon-color="green-600"
  &gt;
    &lt;template #actions&gt;
      &lt;Button color="green" variant="filled"&gt;View Report&lt;/Button&gt;
    &lt;/template&gt;
  &lt;/Card&gt;

  &lt;!-- Product Card --&gt;
  &lt;Card
    title="Spicy Chicken Burger"
    description="A customer favorite with a fiery kick."
    image-url="https://placehold.co/100x100/FFD700/000?text=Chicken"
    :text-center="true"
  &gt;
    &lt;div class="text-sm text-gray-600"&gt;
      &lt;p&gt;Spicy Level: &lt;span class="font-bold text-orange-500"&gt;High&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
    &lt;template #actions&gt;
      &lt;Button color="red" variant="outline"&gt;Remove&lt;/Button&gt;
    &lt;/template&gt;
  &lt;/Card&gt;

  &lt;!-- Task Progress Card --&gt;
  &lt;Card
    title="Project Completion"
    description=""
    icon="check-circle"
    icon-bg-color="indigo-100"
    icon-color="indigo-600"
    :value="'80%'"
    value-color="text-indigo-700"
    :progress-bar-value="80"
    progress-bar-color="bg-indigo-600"
    progress-text="Remaining tasks: 5"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Card } from '@/components/dataDisplay';
import { Button } from '@/components/common';
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Card } from '@/components/dataDisplay'
import { Button, Icon } from '@/components/common'
</script>

<style scoped>
/* No specific scoped styles needed, as Card component handles its own styling. */
</style>
