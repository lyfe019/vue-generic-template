<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Date & Time Picker Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Variant 1: Single Date Picker -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Single Date Picker</h3>
        <DatePicker
          id="single-date-picker"
          label="Select a Date"
          placeholder="Choose a date"
          :options="{ dateFormat: 'Y-m-d', altInput: true, altFormat: 'F j, Y', minDate: 'today' }"
          v-model="singleDate"
        />
        <p class="text-sm text-gray-500 mt-2">Selected: {{ singleDate || 'None' }}</p>
      </section>

      <!-- Variant 2: Date Range Picker -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Date Range Picker</h3>
        <DatePicker
          id="date-range-picker"
          label="Select Date Range"
          placeholder="Choose a date range"
          :options="{
            mode: 'range',
            dateFormat: 'Y-m-d',
            altInput: true,
            altFormat: 'F j, Y',
            minDate: 'today',
          }"
          v-model="dateRange"
        />
        <p class="text-sm text-gray-500 mt-2">
          Selected: {{ dateRange.length ? dateRange.join(' to ') : 'None' }}
        </p>
      </section>

      <!-- Variant 3: Time Picker -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Time Picker</h3>
        <DatePicker
          id="time-picker"
          label="Select Time"
          placeholder="Choose a time"
          :options="{
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            time_24hr: true,
            altInput: true,
            altFormat: 'h:i K',
          }"
          v-model="selectedTime"
        />
        <p class="text-sm text-gray-500 mt-2">Selected: {{ selectedTime || 'None' }}</p>
      </section>

      <!-- Variant 4: Date & Time Picker -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Date & Time Picker</h3>
        <DatePicker
          id="datetime-picker"
          label="Select Date and Time"
          placeholder="Choose date and time"
          :options="{
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
            altInput: true,
            altFormat: 'F j, Y H:i',
            time_24hr: true,
          }"
          v-model="selectedDateTime"
        />
        <p class="text-sm text-gray-500 mt-2">Selected: {{ selectedDateTime || 'None' }}</p>
      </section>

      <!-- Variant 5: Disabled Date Picker -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Disabled Date Picker</h3>
        <DatePicker
          id="disabled-date-picker"
          label="Availability (Disabled)"
          placeholder="Not available"
          :options="{ dateFormat: 'Y-m-d', altInput: true, altFormat: 'F j, Y' }"
          :disabled="true"
          v-model="disabledDate"
        />
        <p class="text-sm text-gray-500 mt-2">Selected: {{ disabledDate || 'None' }}</p>
      </section>

      <!-- Variant 6: Date Picker with Error State -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Date Picker with Error</h3>
        <DatePicker
          id="error-date-picker"
          label="Event Date"
          placeholder="Select a valid date"
          :options="{ dateFormat: 'Y-m-d', altInput: true, altFormat: 'F j, Y' }"
          :error="true"
          errorMessage="This date is not available."
          v-model="errorDate"
        />
        <p class="text-sm text-gray-500 mt-2">Selected: {{ errorDate || 'None' }}</p>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;DatePicker&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;DatePicker&gt;</code> component provides a flexible interface for selecting
          dates and times, powered by the Flatpickr library. It supports single dates, date ranges,
          time-only selection, and combined date-time selection.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li><code>id</code> (String, required): A unique ID for the input element.</li>
          <li>
            <code>modelValue</code> (String | Array | null, default: null): The selected
            date(s)/time. Use with `v-model` for two-way binding.
            <ul class="list-circle list-inside ml-6 mt-1">
              <li>`String` for single date/time.</li>
              <li>`Array&lt;String&gt;` for `mode: 'range'` or `mode: 'multiple'`.</li>
            </ul>
          </li>
          <li>
            <code>label</code> (String, default: null): The visible label for the date picker.
          </li>
          <li>
            <code>srOnly</code> (Boolean, default: false): If `true`, the label will be visually
            hidden but accessible to screen readers.
          </li>
          <li>
            <code>placeholder</code> (String, default: 'Select...'): The placeholder text for the
            input field.
          </li>
          <li>
            <code>options</code> (Object, default: <code>{}</code>): An object containing
            <a
              href="https://flatpickr.js.org/options/"
              target="_blank"
              class="text-indigo-600 hover:underline"
              >Flatpickr configuration options</a
            >. Common options include:
            <ul class="list-circle list-inside ml-6 mt-1">
              <li>`dateFormat: 'Y-m-d'` (for internal value format)</li>
              <li>`altInput: true`, `altFormat: 'F j, Y'` (for user-friendly display)</li>
              <li>`enableTime: true`, `noCalendar: true` (for time-only picker)</li>
              <li>
                `mode: 'range'`, `mode: 'multiple'` (for date range or multiple date selection)
              </li>
              <li>`time_24hr: true` (for 24-hour time format)</li>
              <li>`minDate: 'today'`, `maxDate: '2025-12-31'`</li>
            </ul>
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
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:modelValue(value)</code>: Emitted on date/time selection change for two-way
            binding with `v-model`.
          </li>
          <li>
            <code>change(dateStr, selectedDates)</code>: Emitted when the date picker's value
            changes. `dateStr` is the formatted string, `selectedDates` is an array of Date objects.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Important Note on Flatpickr:</h5>
        <p class="text-gray-600 mb-2">
          This component relies on the Flatpickr library being available globally. Ensure you have
          linked the Flatpickr CSS and JavaScript files in your `index.html` or main layout, for
          example:
        </p>
        <pre
          class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"
        ><code>&lt;!-- In your index.html head --&gt;
&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"&gt;
&lt;!-- Before your app's main.js script --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/flatpickr"&gt;&lt;/script&gt;
</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DatePicker } from '@/components/forms'

const singleDate = ref(null)
const dateRange = ref([])
const selectedTime = ref(null)
const selectedDateTime = ref(null)
const disabledDate = ref('2024-01-15')
const errorDate = ref(null)
</script>

<style scoped>
/* No specific scoped styles needed, as this component primarily relies on Tailwind classes
   and the DatePicker component's own scoped styles. */
</style>
