<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Selection Control Components</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Variant 1: Checkboxes -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Checkboxes</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Standard Checkbox -->
          <SelectionControl
            id="checkbox-standard"
            type="checkbox"
            label="Receive promotional emails"
            v-model="receiveEmails"
          />
          <p class="text-sm text-gray-500 mt-1">
            Status: {{ receiveEmails ? 'Checked' : 'Unchecked' }}
          </p>

          <!-- Checked Checkbox -->
          <SelectionControl
            id="checkbox-checked"
            type="checkbox"
            label="Subscribe to newsletter"
            v-model="subscribeNewsletter"
          />
          <p class="text-sm text-gray-500 mt-1">
            Status: {{ subscribeNewsletter ? 'Checked' : 'Unchecked' }}
          </p>

          <!-- Disabled Checkbox -->
          <SelectionControl
            id="checkbox-disabled"
            type="checkbox"
            label="Feature disabled"
            :disabled="true"
            v-model="featureDisabled"
          />
          <p class="text-sm text-gray-500 mt-1">
            Status: {{ featureDisabled ? 'Checked' : 'Unchecked' }} (Disabled)
          </p>

          <!-- Group of Checkboxes -->
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Select your preferred toppings:</p>
            <div class="space-y-2">
              <SelectionControl
                id="topping-cheese"
                type="checkbox"
                label="Extra Cheese"
                value="cheese"
                v-model="selectedToppings"
              />
              <SelectionControl
                id="topping-bacon"
                type="checkbox"
                label="Bacon Bits"
                value="bacon"
                v-model="selectedToppings"
              />
              <SelectionControl
                id="topping-onion"
                type="checkbox"
                label="Caramelized Onions"
                value="onion"
                v-model="selectedToppings"
              />
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Selected: {{ selectedToppings.join(', ') || 'None' }}
            </p>
          </div>
        </div>
      </section>

      <!-- Variant 2: Radio Buttons -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Radio Buttons</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Standard Radio Button Group -->
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Choose your meal size:</p>
            <div class="space-y-2">
              <SelectionControl
                id="size-small"
                type="radio"
                name="meal-size"
                label="Small"
                value="small"
                v-model="mealSize"
              />
              <SelectionControl
                id="size-medium"
                type="radio"
                name="meal-size"
                label="Medium"
                value="medium"
                v-model="mealSize"
              />
              <SelectionControl
                id="size-large"
                type="radio"
                name="meal-size"
                label="Large"
                value="large"
                v-model="mealSize"
              />
              <SelectionControl
                id="size-disabled"
                type="radio"
                name="meal-size"
                label="Extra Large (Out of Stock)"
                value="extra-large"
                :disabled="true"
                v-model="mealSize"
              />
            </div>
            <p class="text-sm text-gray-500 mt-2">Selected Size: {{ mealSize || 'None' }}</p>
          </div>

          <!-- Payment Method Radio Buttons -->
          <div>
            <p class="text-sm font-medium text-gray-700 mb-2">Payment Method:</p>
            <div class="space-y-2">
              <SelectionControl
                id="pay-credit"
                type="radio"
                name="payment-method"
                label="Credit Card"
                value="credit"
                v-model="paymentMethod"
              />
              <SelectionControl
                id="pay-cash"
                type="radio"
                name="payment-method"
                label="Cash on Delivery"
                value="cash"
                v-model="paymentMethod"
              />
              <SelectionControl
                id="pay-online"
                type="radio"
                name="payment-method"
                label="Online Payment"
                value="online"
                v-model="paymentMethod"
              />
            </div>
            <p class="text-sm text-gray-500 mt-2">Payment: {{ paymentMethod || 'None' }}</p>
          </div>
        </div>
      </section>

      <!-- Variant 3: Dropdowns/Selects -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Dropdowns / Selects</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Standard Dropdown -->
          <SelectionControl
            id="category-select"
            type="select"
            label="Product Category"
            placeholder="Select a category"
            :options="categoryOptions"
            v-model="selectedCategory"
          />
          <p class="text-sm text-gray-500 mt-1">
            Selected Category: {{ selectedCategory || 'None' }}
          </p>

          <!-- Stylized Dropdown (with custom chevron) -->
          <SelectionControl
            id="sort-select"
            type="select"
            label="Sort By"
            :options="sortOptions"
            :has-native-arrow="false"
            v-model="selectedSortOption"
          />
          <p class="text-sm text-gray-500 mt-1">
            Selected Sort: {{ selectedSortOption || 'None' }}
          </p>
        </div>
      </section>

      <!-- Variant 4: Multi-select Dropdowns -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Multi-select Dropdowns</h3>
        <div>
          <SelectionControl
            id="multi-select-ingredients"
            type="multi-select"
            label="Select Ingredients"
            placeholder="Select ingredients..."
            :options="ingredientOptions"
            v-model="selectedIngredients"
            :max-selections="3"
          />
          <p class="text-sm text-gray-500 mt-2">
            Selected Ingredients:
            {{ selectedIngredients.length ? selectedIngredients.join(', ') : 'None' }}
          </p>
          <p v-if="selectedIngredients.length >= 3" class="text-sm text-red-500">
            (Maximum 3 ingredients selected)
          </p>
        </div>
      </section>

      <!-- Variant 5: Comboboxes -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Comboboxes</h3>
        <div>
          <SelectionControl
            id="food-item-combobox"
            type="combobox"
            label="Search Food Item"
            placeholder="Start typing a food item..."
            :options="foodItemOptions"
            v-model="selectedFoodItem"
          />
          <p class="text-sm text-gray-500 mt-2">Selected Item: {{ selectedFoodItem || 'None' }}</p>
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;SelectionControl&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;SelectionControl&gt;</code> component provides a unified interface for
          various selection input types, including checkboxes, radio buttons, standard dropdowns,
          multi-select dropdowns, and searchable comboboxes.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>id</code> (String, required): A unique ID for the input element, used for `for`
            attribute on the label.
          </li>
          <li>
            <code>modelValue</code> (Boolean | String | Array, default: null): The value of the
            control. Use with `v-model` for two-way binding.
            <ul class="list-circle list-inside ml-6 mt-1">
              <li>`Boolean` for `type="checkbox"` (true/false).</li>
              <li>
                `String` for `type="radio"`, `type="select"`, `type="combobox"` (the selected
                option's `value`).
              </li>
              <li>`Array` of Strings for `type="multi-select"` (values of selected options).</li>
            </ul>
          </li>
          <li><code>label</code> (String, default: null): The visible label for the control.</li>
          <li>
            <code>srOnly</code> (Boolean, default: false): If `true`, the label will be visually
            hidden but still accessible to screen readers.
          </li>
          <li>
            <code>type</code> (String, default: 'checkbox'): The type of selection control to
            render.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'checkbox', 'radio', 'select', 'multi-select', 'combobox'.
            </span>
          </li>
          <li>
            <code>name</code> (String, default: null): **Required for `type="radio"`** to group
            radio buttons. Not used for other types.
          </li>
          <li>
            <code>value</code> (String | Boolean | Number, default: null): The individual value of a
            checkbox or radio button. **Required for `type="checkbox"` and `type="radio"` when used
            in a group.**
          </li>
          <li>
            <code>options</code> (Array of Objects, default: `[]`): An array of objects `[{ text:
            String, value: Any }]` for `type="select"`, `type="multi-select"`, and
            `type="combobox"`. For `type="combobox"`, the `value` can be optional if you only need
            the text.
          </li>
          <li>
            <code>placeholder</code> (String, default: 'Select an option'): The placeholder text for
            `type="select"`, `type="multi-select"`, or `type="combobox"`.
          </li>
          <li>
            <code>disabled</code> (Boolean, default: false): If `true`, the control will be
            disabled.
          </li>
          <li><code>error</code> (Boolean, default: false): If `true`, applies error styling.</li>
          <li>
            <code>errorMessage</code> (String, default: null): A message to display below the
            control when `error` is `true`.
          </li>
          <li>
            <code>hasNativeArrow</code> (Boolean, default: true): For `type="select"`. If `false`,
            replaces the browser's native dropdown arrow with a Lucide icon.
          </li>
          <li>
            <code>maxSelections</code> (Number, default: null): For `type="multi-select"`. Limits
            the number of selectable options.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:modelValue(value)</code>: Emitted on change for two-way binding with
            `v-model`.
          </li>
          <li>
            <code>change(value)</code>: Emitted on change, similar to the native `change` event.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- Single Checkbox --&gt;
  &lt;SelectionControl id="remember-me" type="checkbox" label="Remember me" v-model="rememberMe" /&gt;

  &lt;!-- Radio Button Group --&gt;
  &lt;div&gt;
    &lt;p&gt;Delivery Type:&lt;/p&gt;
    &lt;SelectionControl id="delivery-pickup" type="radio" name="delivery" label="Pickup" value="pickup" v-model="deliveryType" /&gt;
    &lt;SelectionControl id="delivery-delivery" type="radio" name="delivery" label="Delivery" value="delivery" v-model="deliveryType" /&gt;
  &lt;/div&gt;

  &lt;!-- Standard Dropdown --&gt;
  &lt;SelectionControl
    id="city-select"
    type="select"
    label="City"
    :options="[{ text: 'New York', value: 'nyc' }, { text: 'Los Angeles', value: 'la' }]"
    v-model="selectedCity"
  /&gt;

  &lt;!-- Multi-select --&gt;
  &lt;SelectionControl
    id="tags-select"
    type="multi-select"
    label="Select Tags"
    :options="[{ text: 'Fast Food', value: 'fast-food' }, { text: 'Healthy', value: 'healthy' }]"
    v-model="selectedTags"
  /&gt;

  &lt;!-- Combobox --&gt;
  &lt;SelectionControl
    id="cuisine-combobox"
    type="combobox"
    label="Cuisine Preference"
    placeholder="Search cuisine..."
    :options="[{ text: 'Italian', value: 'italian' }, { text: 'Mexican', value: 'mexican' }]"
    v-model="chosenCuisine"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { SelectionControl } from '@/components/common';

const rememberMe = ref(false);
const deliveryType = ref('pickup');
const selectedCity = ref('');
const selectedTags = ref([]);
const chosenCuisine = ref('');
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SelectionControl } from '@/components/forms'

// Checkboxes
const receiveEmails = ref(false)
const subscribeNewsletter = ref(true) // Initially checked
const featureDisabled = ref(false) // For disabled checkbox
const selectedToppings = ref([])

// Radio Buttons
const mealSize = ref('medium') // Initially medium
const paymentMethod = ref(null)

// Dropdowns
const categoryOptions = ref([
  { text: 'Burgers', value: 'burgers' },
  { text: 'Sides', value: 'sides' },
  { text: 'Drinks', value: 'drinks' },
  { text: 'Desserts', value: 'desserts' },
])
const selectedCategory = ref('')

const sortOptions = ref([
  { text: 'Date Added', value: 'date' },
  { text: 'Product Name (A-Z)', value: 'name' },
  { text: 'Price (Low to High)', value: 'price-asc' },
  { text: 'Price (High to Low)', value: 'price-desc' },
])
const selectedSortOption = ref('date')

// Multi-select Dropdown
const ingredientOptions = ref([
  { text: 'Lettuce', value: 'lettuce' },
  { text: 'Tomato', value: 'tomato' },
  { text: 'Pickles', value: 'pickles' },
  { text: 'Special Sauce', value: 'sauce' },
  { text: 'Cheese', value: 'cheese' },
  { text: 'Onion', value: 'onion' },
])
const selectedIngredients = ref([])

// Combobox
const foodItemOptions = ref([
  { text: 'Burger', value: 'burger' },
  { text: 'Fries', value: 'fries' },
  { text: 'Pizza', value: 'pizza' },
  { text: 'Salad', value: 'salad' },
  { text: 'Soda', value: 'soda' },
  { text: 'Milkshake', value: 'milkshake' },
  { text: 'Chicken Nuggets', value: 'chicken-nuggets' },
  { text: 'Hot Dog', value: 'hot-dog' },
  { text: 'Onion Rings', value: 'onion-rings' },
  { text: 'Fish Fillet', value: 'fish-fillet' },
])
const selectedFoodItem = ref('') // For combobox, will store the selected value
</script>

<style scoped>
/* No specific scoped styles needed beyond what's in the component. */
</style>
