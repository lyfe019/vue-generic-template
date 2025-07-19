<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Range Slider Component</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Variant 1: Basic Slider -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Basic Price Range (0-100)</h3>
        <RangeSlider v-model="priceRange" label="Price Range" />
      </section>

      <!-- Variant 2: Custom Min/Max/Step -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Volume Control (0-10, Step 0.5)</h3>
        <RangeSlider
          v-model="volume"
          :min="0"
          :max="10"
          :step="0.5"
          label="Volume"
          slider-color="blue-500"
        />
      </section>

      <!-- Variant 3: Disabled Slider -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Disabled Brightness Control</h3>
        <RangeSlider
          v-model="brightness"
          label="Brightness"
          :is-disabled="true"
          slider-color="gray-500"
        />
      </section>

      <!-- Variant 4: Custom Color Slider -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Custom Green Progress</h3>
        <RangeSlider
          v-model="progress"
          label="Progress"
          slider-color="green-500"
          track-bg-color="green-100"
        />
      </section>

      <!-- Variant 5: No Value/Min/Max Labels -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Simple Slider (No Labels)</h3>
        <RangeSlider
          v-model="simpleValue"
          :show-value="false"
          :show-min-max-labels="false"
          slider-color="red-500"
        />
      </section>

      <!-- Variant 6: Slider with Initial Value -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Initial Value (75%)</h3>
        <RangeSlider
          v-model="initialValue"
          :min="0"
          :max="100"
          label="Completion"
          slider-color="purple-600"
        />
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;RangeSlider&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;RangeSlider&gt;</code> component provides a visual input control for
          selecting a single value within a continuous range. It supports customizable range, step,
          labels, and styling.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>modelValue</code> (Number, default: <code>0</code>): The current selected value of
            the slider. Supports <code>v-model</code> for two-way binding.
          </li>
          <li>
            <code>min</code> (Number, default: <code>0</code>): The minimum allowed value for the
            slider.
          </li>
          <li>
            <code>max</code> (Number, default: <code>100</code>): The maximum allowed value for the
            slider.
          </li>
          <li>
            <code>step</code> (Number, default: <code>1</code>): The granularity of the slider; the
            value will change by this amount.
          </li>
          <li>
            <code>label</code> (String, default: <code>null</code>): An optional label displayed
            above the slider.
          </li>
          <li>
            <code>showValue</code> (Boolean, default: <code>true</code>): If <code>true</code>, the
            current `modelValue` will be displayed next to the label.
          </li>
          <li>
            <code>showMinMaxLabels</code> (Boolean, default: <code>true</code>): If
            <code>true</code>, the `min` and `max` values will be displayed at the ends of the
            slider track.
          </li>
          <li>
            <code>isDisabled</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            the slider will be visually and functionally disabled.
          </li>
          <li>
            <code>sliderColor</code> (String, default: <code>'indigo-600'</code>): Tailwind color
            class for the active part of the slider track and the thumb (e.g., 'blue-500',
            'green-500').
          </li>
          <li>
            <code>trackBgColor</code> (String, default: <code>'gray-200'</code>): Tailwind color
            class for the background part of the slider track (e.g., 'gray-200', 'red-100').
          </li>
          <li>
            <code>sliderId</code> (String, default: auto-generated): A unique ID for the input
            element, useful for accessibility when using a label.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:modelValue(newValue)</code>: Emitted when the slider value changes, for
            <code>v-model</code> binding. Payload: `(newValue: number)`.
          </li>
          <li>
            <code>change(newValue)</code>: Emitted when the slider value changes (on input).
            Payload: `(newValue: number)`.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;RangeSlider v-model="volumeLevel" :min="0" :max="10" :step="0.1" label="Volume" slider-color="blue-500" /&gt;
  &lt;p&gt;Current Volume: &lbrace;&lbrace; volumeLevel &rbrace;&rbrace;&lt;/p&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { RangeSlider } from '@/components/forms';

const volumeLevel = ref(5.0);
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RangeSlider } from '@/components/forms'

const priceRange = ref(50)
const volume = ref(5)
const brightness = ref(70)
const progress = ref(40)
const simpleValue = ref(25)
const initialValue = ref(75)
</script>

<style scoped>
/* No specific scoped styles needed for the showcase, as it uses Tailwind and the component's styles. */
</style>
