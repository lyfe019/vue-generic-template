<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Quantity Stepper Component</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Variant 1: Basic Stepper -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Basic Quantity Stepper</h3>
        <div class="flex items-center space-x-4">
          <QuantityStepper v-model="basicQuantity" />
          <p class="text-gray-700">Value: {{ basicQuantity }}</p>
        </div>
      </section>

      <!-- Variant 2: Small Stepper with Custom Min/Max -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Small Stepper (Min 1, Max 10)</h3>
        <div class="flex items-center space-x-4">
          <QuantityStepper v-model="smallQuantity" :min="1" :max="10" size="sm" />
          <p class="text-gray-700">Value: {{ smallQuantity }}</p>
        </div>
      </section>

      <!-- Variant 3: Large Stepper with Custom Step -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Large Stepper (Step 5)</h3>
        <div class="flex items-center space-x-4">
          <QuantityStepper v-model="largeQuantity" :step="5" size="lg" />
          <p class="text-gray-700">Value: {{ largeQuantity }}</p>
        </div>
      </section>

      <!-- Variant 4: Disabled Stepper -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Disabled Stepper</h3>
        <div class="flex items-center space-x-4">
          <QuantityStepper v-model="disabledQuantity" :is-disabled="true" />
          <p class="text-gray-700">Value: {{ disabledQuantity }}</p>
        </div>
      </section>

      <!-- Variant 5: Stepper with Initial Value -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Stepper with Initial Value (7)</h3>
        <div class="flex items-center space-x-4">
          <QuantityStepper v-model="initialQuantity" :min="0" :max="20" />
          <p class="text-gray-700">Value: {{ initialQuantity }}</p>
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;QuantityStepper&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;QuantityStepper&gt;</code> component provides an intuitive way for users to
          increment or decrement a numerical value within a defined range, commonly used for product
          quantities or item counts.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>modelValue</code> (Number, default: <code>0</code>): The current numerical
            quantity. Supports <code>v-model</code> for two-way binding.
          </li>
          <li>
            <code>min</code> (Number, default: <code>0</code>): The minimum allowed value for the
            quantity.
          </li>
          <li>
            <code>max</code> (Number, default: <code>100</code>): The maximum allowed value for the
            quantity.
          </li>
          <li>
            <code>step</code> (Number, default: <code>1</code>): The amount by which the quantity
            increments or decrements with each click.
          </li>
          <li>
            <code>size</code> (String, default: <code>'md'</code>): Controls the visual size of the
            stepper.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'sm' (small), 'md' (medium), 'lg' (large).
            </span>
          </li>
          <li>
            <code>isDisabled</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            the stepper buttons and input will be disabled.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:modelValue(newValue)</code>: Emitted when the quantity changes, for
            <code>v-model</code> binding. Payload: `(newValue: number)`.
          </li>
          <li>
            <code>change(newValue)</code>: Emitted when the quantity changes (after button click or
            input blur). Payload: `(newValue: number)`.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;QuantityStepper v-model="productQuantity" :min="1" :max="10" :step="1" size="md" /&gt;
  &lt;p&gt;Selected Quantity: &lbrace;&lbrace; productQuantity &rbrace;&rbrace;&lt;/p&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { QuantityStepper } from '@/components/forms';

const productQuantity = ref(1);
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QuantityStepper } from '@/components/forms'

const basicQuantity = ref(0)
const smallQuantity = ref(1)
const largeQuantity = ref(10)
const disabledQuantity = ref(5)
const initialQuantity = ref(7)
</script>

<style scoped>
/* No specific scoped styles needed for the showcase, as it uses Tailwind and the component's styles. */
</style>
