<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Text Input Components</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Variant 1: Text Fields -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Text Fields</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Default Text Input -->
          <TextInput id="name-input" label="Full Name" placeholder="John Doe" v-model="name" />

          <!-- Email Text Input with Icon -->
          <TextInput
            id="email-input"
            label="Email Address"
            type="email"
            icon="mail"
            placeholder="you@example.com"
            v-model="email"
          />

          <!-- Disabled Text Input -->
          <TextInput
            id="disabled-input"
            label="Disabled Input"
            value="Cannot edit this"
            :disabled="true"
          />

          <!-- Text Input with Error State -->
          <TextInput
            id="error-input"
            label="Username"
            placeholder="Choose a username"
            :error="true"
            errorMessage="Username already taken."
            v-model="username"
          />
        </div>
      </section>

      <!-- Variant 2: Text Areas -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Text Areas</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Default Text Area -->
          <TextInput
            id="comment-area"
            label="Comments"
            type="textarea"
            placeholder="Enter your comments here..."
            v-model="comments"
          />

          <!-- Resizable Text Area -->
          <TextInput
            id="description-area"
            label="Description (Resizable)"
            type="textarea"
            placeholder="Provide a detailed description..."
            :resizable="true"
            v-model="description"
          />
        </div>
      </section>

      <!-- Variant 3: Password Fields -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Password Fields</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Standard Password Field -->
          <TextInput
            id="password-input"
            label="Password"
            type="password"
            placeholder="Enter your password"
            v-model="password"
          />

          <!-- Password Field with Show/Hide Toggle -->
          <TextInput
            id="password-toggle-input"
            label="Password with Toggle"
            type="password"
            placeholder="Enter your password"
            v-model="passwordToggle"
          />
        </div>
      </section>

      <!-- Variant 4: Search Fields/Bars -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Search Fields / Bars</h3>
        <div class="grid grid-cols-1 gap-6">
          <!-- Basic Search Bar -->
          <TextInput
            id="search-input"
            sr-only
            label="Search"
            type="search"
            placeholder="Search for items, orders..."
            v-model="searchQuery"
          />

          <!-- Search Bar with Button -->
          <TextInput
            id="search-button-input"
            sr-only
            label="Search with Button"
            type="search-button"
            placeholder="Search product by name..."
            v-model="searchButtonQuery"
            @search="handleSearch"
          />
        </div>
      </section>

      <!-- Variant 5: Number Inputs -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Number Inputs</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Simple Number Input -->
          <TextInput
            id="quantity-input"
            label="Quantity"
            type="number"
            :min="0"
            v-model.number="quantity"
          />

          <!-- Number Input with Increment/Decrement Buttons -->
          <TextInput
            id="stock-level-input"
            label="Stock Level"
            type="number-stepper"
            :min="0"
            :max="100"
            v-model.number="stockLevel"
          />
        </div>
      </section>

      <!-- Variant 6: Tag Inputs -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Tag Inputs</h3>
        <div>
          <TextInput
            id="tag-input-field"
            label="Add Tags"
            type="tag"
            placeholder="Add a tag and press Enter"
            v-model="productTags"
            :initial-tags="productTags"
            @add-tag="logAddTag"
            @remove-tag="logRemoveTag"
          />
          <p class="mt-2 text-sm text-gray-500">
            Press Enter to add a tag. Click on a tag to remove it.
          </p>
          <p class="mt-2 text-sm text-gray-600">
            Current Tags: {{ productTags.join(', ') || 'None' }}
          </p>
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;TextInput&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;TextInput&gt;</code> component is a versatile input field that supports
          various types, including text, email, password (with toggle), search (with optional
          button), number (with optional steppers), text areas (with optional resizing), and a
          dynamic tag input.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>id</code> (String, required): A unique ID for the input element, used for `for`
            attribute on the label.
          </li>
          <li>
            <code>modelValue</code> (String, Number, Array, default: ''): The value of the input
            field. Use with `v-model` for two-way binding. For `type="tag"`, this will be an Array
            of strings.
          </li>
          <li>
            <code>label</code> (String, default: null): The visible label for the input field.
          </li>
          <li>
            <code>srOnly</code> (Boolean, default: false): If `true`, the label will be visually
            hidden but still accessible to screen readers. Useful for search inputs.
          </li>
          <li>
            <code>placeholder</code> (String, default: ''): The placeholder text for the input.
          </li>
          <li>
            <code>type</code> (String, default: 'text'): The type of input to render.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'text', 'email', 'password', 'number', 'textarea', 'search',
              'search-button' (search input with a dedicated search button), 'number-stepper'
              (number input with +/- buttons), 'tag' (input for adding/removing tags).
            </span>
          </li>
          <li>
            <code>icon</code> (String, default: null): A Lucide icon name to display as a prefix
            inside the input field. Automatically set for 'email' (to 'mail') and
            'search'/'search-button' (to 'search') if not provided.
          </li>
          <li>
            <code>disabled</code> (Boolean, default: false): If `true`, the input field will be
            disabled.
          </li>
          <li>
            <code>error</code> (Boolean, default: false): If `true`, applies error styling to the
            input border and label.
          </li>
          <li>
            <code>errorMessage</code> (String, default: null): A message to display below the input
            when `error` is `true`.
          </li>
          <li><code>rows</code> (Number, default: 4): Number of rows for `type="textarea"`.</li>
          <li>
            <code>resizable</code> (Boolean, default: false): If `true`, `type="textarea"` can be
            vertically resized by the user.
          </li>
          <li>
            <code>min</code> (Number, default: undefined): Minimum value for `type="number"` or
            `type="number-stepper"`.
          </li>
          <li>
            <code>max</code> (Number, default: undefined): Maximum value for `type="number"` or
            `type="number-stepper"`.
          </li>
          <li>
            <code>initialTags</code> (Array, default: `[]`): Initial array of tags for `type="tag"`.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:modelValue(value)</code>: Emitted on input change for two-way binding with
            `v-model`. For `type="tag"`, the `value` is the updated array of tags.
          </li>
          <li>
            <code>search(query)</code>: Emitted when the search button is clicked for
            `type="search-button"`.
          </li>
          <li><code>add-tag(tag)</code>: Emitted when a new tag is added (for `type="tag"`).</li>
          <li><code>remove-tag(tag)</code>: Emitted when a tag is removed (for `type="tag"`).</li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- Basic Text Input --&gt;
  &lt;TextInput id="product-name" label="Product Name" placeholder="Enter product name" v-model="productName" /&gt;

  &lt;!-- Password with Toggle --&gt;
  &lt;TextInput id="user-password" label="Your Password" type="password" v-model="userPassword" /&gt;

  &lt;!-- Number Input with Steppers --&gt;
  &lt;TextInput id="item-count" label="Item Count" type="number-stepper" :min="1" :max="99" v-model.number="itemCount" /&gt;

  &lt;!-- Tag Input --&gt;
  &lt;TextInput
    id="product-keywords"
    label="Product Keywords"
    type="tag"
    placeholder="Add keywords..."
    v-model="keywords"
    :initial-tags="['electronics', 'gadgets']"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { TextInput } from '@/components/common';

const productName = ref('');
const userPassword = ref('');
const itemCount = ref(1);
const keywords = ref(['vue', 'components']); // For tag input
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TextInput } from '@/components/forms'

// Reactive variables for showcasing different input types
const name = ref('')
const email = ref('')
const username = ref('') // For error state
const comments = ref('')
const description = ref('')
const password = ref('')
const passwordToggle = ref('')
const searchQuery = ref('')
const searchButtonQuery = ref('')
const quantity = ref(1)
const stockLevel = ref(10)
const productTags = ref(['food', 'drinks'])

// Example handler for search button
const handleSearch = (query) => {
  console.log('Searching for:', query)
  // In a real app, you would dispatch a search action
}

// Example handlers for tag add/remove
const logAddTag = (tag) => {
  console.log('Tag added:', tag)
}

const logRemoveTag = (tag) => {
  console.log('Tag removed:', tag)
}
</script>

<style scoped>
/* No specific scoped styles needed, as this component primarily relies on Tailwind classes
   and the TextInput component's own scoped styles. */
</style>
