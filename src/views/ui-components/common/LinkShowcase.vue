<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Link Components</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Variant 1: Standard Text Links -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Standard Text Links</h3>
        <div class="flex flex-wrap items-center gap-6">
          <Link to="#" text="View All Products" color="indigo-600" />
          <Link to="#" text="Download Report (PDF)" color="blue-600" />
          <Link to="#" text="Read Our Privacy Policy" color="gray-700" />
        </div>
      </section>

      <!-- Variant 2: Button-like Links -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Button-like Links</h3>
        <div class="flex flex-wrap items-center gap-4">
          <Link to="#" text="Add New Item" variant="button" bgColor="indigo-600" />
          <Link
            to="#"
            text="Manage Users"
            variant="button"
            color="gray-800"
            bgColor="white"
            borderColor="gray-300"
          />
          <Link to="#" text="Delete Account" variant="button" bgColor="red-600" />
        </div>
      </section>

      <!-- Variant 3: Icon Links -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Icon Links</h3>
        <div class="flex flex-wrap items-center gap-6">
          <Link
            to="#"
            text="Visit Help Center"
            variant="icon-text"
            icon="external-link"
            color="indigo-600"
          />
          <Link to="#" text="Download App" variant="icon-text" icon="download" color="green-600" />
          <Link to="#" text="More Info" variant="icon-text" icon="info" color="gray-700" />
          <Link
            to="#"
            variant="icon-only"
            icon="edit"
            size="lg"
            color="blue-600"
            aria-label="Edit Item"
          />
          <Link
            to="#"
            variant="icon-only"
            icon="trash-2"
            size="lg"
            color="red-600"
            aria-label="Delete Item"
          />
          <Link
            to="#"
            text="Filter"
            variant="button-icon"
            icon="filter"
            size="md"
            color="indigo-700"
            bgColor="indigo-50"
          />
        </div>
      </section>

      <!-- Variant 4: Disabled Links -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Disabled Links</h3>
        <div class="flex flex-wrap items-center gap-6">
          <Link to="#" text="(Disabled) Upload New Document" isDisabled />
          <Link to="#" text="(Disabled) Proceed to Checkout" variant="button" isDisabled />
          <Link
            to="#"
            variant="icon-only"
            icon="settings"
            size="lg"
            isDisabled
            aria-label="Settings Disabled"
          />
        </div>
        <p class="mt-4 text-sm text-gray-500">
          *Note: Disabled links use `aria-disabled="true"` and `pointer-events-none` for styling.
          Clicks are programmatically prevented within the component.
        </p>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3"><code>&lt;Link&gt;</code> Component</h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;Link&gt;</code> component provides a flexible way to create various types of
          clickable navigation elements, from simple text links to styled buttons and icon-based
          actions. It integrates with Vue Router for internal navigation and handles external links
          and disabled states gracefully.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>to</code> (String, required): The destination URL or Vue Router path. Use a full
            URL for external links (e.g., `'https://example.com'`) or a relative path for internal
            routes (e.g., `'/admin/dashboard'`).
          </li>
          <li>
            <code>text</code> (String, default: null): The visible text for the link. This prop is
            used for `text`, `icon-text`, `button`, and `button-icon` variants. For `icon-only`, the
            text prop is ignored, and `aria-label` should be used for accessibility.
          </li>
          <li>
            <code>variant</code> (String, default: 'text'): Defines the visual style and behavior of
            the link.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values:
              <ul class="list-circle list-inside ml-6 mt-1">
                <li>`'text'` (Default): A standard text link with hover underline.</li>
                <li>
                  `'button'` : Renders the link with button-like styling (solid background,
                  padding).
                </li>
                <li>
                  `'icon-only'` : Renders only an icon as a clickable link (circle background on
                  hover).
                </li>
                <li>`'icon-text'` : Renders an icon followed by text.</li>
                <li>`'button-icon'` : Renders a button-like link with an icon and text.</li>
              </ul>
            </span>
          </li>
          <li>
            <code>icon</code> (String, default: null): A Lucide icon name to display. Required for
            `'icon-only'`, `'icon-text'`, and `'button-icon'` variants. (e.g., 'external-link',
            'download', 'edit').
          </li>
          <li>
            <code>size</code> (String, default: 'md'): Controls the size for button and icon
            variants.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'sm', 'md', 'lg'. (Corresponds to w-X h-X or padding values).
            </span>
          </li>
          <li>
            <code>color</code> (String, default: 'indigo-600'): The primary Tailwind text color
            class for the link (e.g., 'blue-500', 'gray-700'). For `button` variants, this is used
            as a fallback if `bgColor` is not provided.
          </li>
          <li>
            <code>bgColor</code> (String, default: null): A Tailwind background color class for
            `'button'` and `'button-icon'` variants. (e.g., 'indigo-600', 'red-600'). Overrides
            `color` for background.
          </li>
          <li>
            <code>borderColor</code> (String, default: null): A Tailwind border color class for
            `'button'` and `'button-icon'` variants, useful for outlined buttons (e.g., 'gray-300').
          </li>
          <li>
            <code>newTab</code> (Boolean, default: false): If `true`, the link will open in a new
            browser tab (`target="_blank"`).
          </li>
          <li>
            <code>isDisabled</code> (Boolean, default: false): If `true`, the link will be visually
            styled as disabled and its navigation will be programmatically prevented. Also sets
            `aria-disabled="true"` for accessibility.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- Basic text link --&gt;
  &lt;Link to="/admin/settings" text="Go to Settings" color="purple-600" /&gt;

  &lt;!-- Primary button link --&gt;
  &lt;Link to="/products/new" text="Add Product" variant="button" bgColor="green-500" /&gt;

  &lt;!-- Icon-only link --&gt;
  &lt;Link to="/user/profile/edit" variant="icon-only" icon="user-plus" size="lg" color="teal-600" aria-label="Edit Profile" /&gt;

  &lt;!-- Icon and text link --&gt;
  &lt;Link to="https://github.com" text="GitHub Repo" variant="icon-text" icon="github" color="gray-800" new-tab /&gt;

  &lt;!-- Disabled button link --&gt;
  &lt;Link to="/checkout" text="Checkout" variant="button" is-disabled /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Link } from '@/components/common';
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Link } from '@/components/common'

// No script-specific logic needed for this showcase,
// as all variations are handled by the props of the Link component.
</script>

<style scoped>
/* No specific scoped styles needed, as this component primarily relies on Tailwind classes. */
</style>
