<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Button Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Standard Buttons -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Standard Buttons</h3>
        <div class="flex flex-wrap items-center gap-4">
          <Button color="indigo" size="md">Primary Action</Button>
          <Button color="gray" variant="outline" size="md">Secondary Action</Button>
          <Button color="green" size="md">Success</Button>
          <Button color="red" size="md">Danger</Button>
          <Button color="yellow" size="md">Warning</Button>
          <Button color="gray" size="md" :disabled="true">Disabled</Button>
        </div>
      </section>

      <!-- Buttons with Icons -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Buttons with Icons</h3>
        <div class="flex flex-wrap items-center gap-4">
          <!-- Small Icon Button (Circular) -->
          <Button color="indigo" size="sm" icon="plus" is-circle aria-label="Add Item" />
          <!-- Medium Icon Button (Square) -->
          <Button color="blue" size="md" icon="edit" is-square aria-label="Edit Item" />
          <!-- Large Outlined Icon Button -->
          <Button
            color="red"
            variant="outline"
            size="lg"
            icon="trash"
            is-square
            aria-label="Delete Item"
          />
          <!-- Text with Icon Button -->
          <Button color="purple" size="md" icon="download" icon-position="left"
            >Download Report</Button
          >
          <Button color="blue" variant="ghost" size="md" icon="send" icon-position="right"
            >Send Message</Button
          >
          <Button color="gray" variant="link" size="md" icon="link" icon-position="left"
            >More Info</Button
          >
        </div>
      </section>

      <!-- Toggle Buttons / Switches -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Toggle Switches</h3>
        <div class="flex flex-col space-y-4">
          <ToggleSwitch v-model="isInventoryEnabled" label="Enable Inventory Management" />
          <ToggleSwitch v-model="receiveNotifications" label="Receive Notifications" size="sm" />
          <ToggleSwitch v-model="isDarkMode" label="Dark Mode" :disabled="true" />
        </div>
      </section>

      <!-- Button Groups -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Button Groups</h3>

        <div class="mb-6">
          <h4 class="text-lg font-medium text-gray-700 mb-2">Horizontal Button Group</h4>
          <ButtonGroup direction="horizontal">
            <Button color="gray" variant="outline" size="md">Day</Button>
            <Button color="gray" variant="outline" size="md">Week</Button>
            <Button color="gray" variant="outline" size="md">Month</Button>
          </ButtonGroup>
        </div>

        <div>
          <h4 class="text-lg font-medium text-gray-700 mb-2">Vertical Button Group</h4>
          <ButtonGroup direction="vertical">
            <Button color="gray" variant="outline" size="md">Top View</Button>
            <Button color="gray" variant="outline" size="md">Middle View</Button>
            <Button color="gray" variant="outline" size="md">Bottom View</Button>
          </ButtonGroup>
        </div>
      </section>

      <!-- Floating Action Buttons (FABs) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Floating Action Buttons (FABs)</h3>
        <div class="flex flex-wrap items-center gap-6">
          <!-- Standard Circular FAB -->
          <Button color="pink" size="xl" icon="plus" is-circle shadow aria-label="Create New" />
          <!-- Extended FAB -->
          <Button color="purple" size="md" icon="plus" shadow>Add Product</Button>
          <!-- Small Circular FAB -->
          <Button color="teal" size="lg" icon="message-circle" is-circle shadow aria-label="Chat" />
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;Button&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          A highly customizable button component supporting various colors, sizes, styles (filled,
          outline, ghost, link), and optional Lucide icons.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>nativeType</code> (String, default: 'button'): The HTML `type` attribute for the
            button ('button', 'submit', 'reset').
          </li>
          <li>
            <code>color</code> (String, default: 'indigo'): Sets the primary color theme.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'indigo', 'gray', 'green', 'red', 'yellow', 'blue', 'purple', 'pink',
              'teal'.
            </span>
          </li>
          <li>
            <code>variant</code> (String, default: 'filled'): Defines the visual style of the
            button.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'filled' (solid background), 'outline' (border only), 'ghost'
              (transparent with hover effects), 'link' (text-only, underlined).
            </span>
          </li>
          <li>
            <code>size</code> (String, default: 'md'): Controls the padding, font size, and default
            icon size of the button.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'sm', 'md', 'lg', 'xl'.
            </span>
          </li>
          <li>
            <code>icon</code> (String, default: null): The name of a Lucide icon to display within
            the button.
          </li>
          <li>
            <code>iconPosition</code> (String, default: 'left'): Determines the icon's position
            relative to the text content.
            <br />
            <span class="font-mono text-sm text-gray-500"> Valid values: 'left', 'right'. </span>
          </li>
          <li>
            <code>isSquare</code> (Boolean, default: false): If `true`, makes the button's width and
            height equal to create a square shape. Ideal for icon-only buttons. Overrides default
            horizontal padding.
          </li>
          <li>
            <code>isCircle</code> (Boolean, default: false): If `true`, makes the button perfectly
            circular. Ideal for Floating Action Buttons (FABs) or round icon-only buttons. Overrides
            `isSquare` and default rounding.
          </li>
          <li>
            <code>shadow</code> (Boolean, default: false): If `true`, applies a `shadow-lg` class to
            the button, useful for FABs.
          </li>
          <li>
            <code>disabled</code> (Boolean, default: false): If `true`, disables the button and
            applies a `cursor-not-allowed` style.
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            Default Slot: Used for the text content of the button. When using an `icon`, this slot
            provides the accompanying label.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Example: <code>&lt;Button&gt;Submit&lt;/Button&gt;</code>
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre
          class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"
        ><code>&lt;Button color="indigo" size="lg"&gt;Large Button&lt;/Button&gt;
&lt;Button color="green" variant="outline" icon="check"&gt;Save&lt;/Button&gt;
&lt;Button color="red" size="md" icon="trash" is-circle aria-label="Delete" /&gt;
&lt;Button color="blue" variant="ghost" icon="info" icon-position="right"&gt;Details&lt;/Button&gt;</code></pre>
      </div>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;ToggleSwitch&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">A custom styled toggle switch (checkbox) component.</p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>modelValue</code> (Boolean, default: false): The checked state of the switch.
            Supports <code>v-model</code> for two-way binding.
          </li>
          <li>
            <code>label</code> (String, default: null): Optional text label displayed next to the
            switch.
          </li>
          <li>
            <code>size</code> (String, default: 'md'): Controls the visual size of the switch.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'sm' (smaller scale) or 'md' (default size).
            </span>
          </li>
          <li>
            <code>disabled</code> (Boolean, default: false): If `true`, the switch is unclickable
            and appears faded.
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;ToggleSwitch v-model="isEnabled" label="Enable Feature" /&gt;
  &lt;ToggleSwitch v-model="isNotificationsOn" size="sm" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { ToggleSwitch } from '@/components/common';
const isEnabled = ref(false);
const isNotificationsOn = ref(true);
&lt;/script&gt;</code></pre>
      </div>

      <div>
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;ButtonGroup&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          A wrapper component to group multiple <code>&lt;Button&gt;</code> components, handling
          consistent border and rounded corner styling for a seamless group appearance.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>direction</code> (String, default: 'horizontal'): Specifies the layout direction
            of the buttons within the group.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'horizontal' or 'vertical'.
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            Default Slot: Expects one or more <code>&lt;Button&gt;</code> components as its
            children.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Example:
              <pre class="bg-gray-100 p-2 rounded-md text-sm mt-1"><code>&lt;ButtonGroup&gt;
  &lt;Button color="gray" variant="outline"&gt;One&lt;/Button&gt;
  &lt;Button color="gray" variant="outline"&gt;Two&lt;/Button&gt;
&lt;/ButtonGroup&gt;</code></pre>
            </span>
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;h4&gt;Horizontal Group&lt;/h4&gt;
  &lt;ButtonGroup direction="horizontal"&gt;
    &lt;Button color="gray" variant="outline" size="md"&gt;Previous&lt;/Button&gt;
    &lt;Button color="gray" variant="outline" size="md"&gt;Next&lt;/Button&gt;
  &lt;/ButtonGroup&gt;

  &lt;h4 class="mt-4"&gt;Vertical Group&lt;/h4&gt;
  &lt;ButtonGroup direction="vertical"&gt;
    &lt;Button color="indigo"&gt;Save&lt;/Button&gt;
    &lt;Button color="red" variant="outline"&gt;Delete&lt;/Button&gt;
  &lt;/ButtonGroup&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Button, ButtonGroup } from '@/components/common';
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
// Import common components from their barrel file
import { Button, ButtonGroup } from '@/components/common'

// Import form components from their barrel file
import { ToggleSwitch } from '@/components/forms'
import { ref, onMounted } from 'vue'

const isInventoryEnabled = ref(false)
const receiveNotifications = ref(true)
const isDarkMode = ref(false)

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
