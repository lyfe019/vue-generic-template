<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Rich Text Editor Component</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Variant 1: Basic Rich Text Editor -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Blog Post Content</h3>
        <RichTextEditor
          v-model="blogContent"
          label="Article Content"
          placeholder="Write your blog post here..."
          help-text="Supports basic HTML formatting."
          :show-preview="true"
        />
        <p class="mt-4 text-gray-700">
          Current Content Length: {{ blogContent.length }} characters
        </p>
      </section>

      <!-- Variant 2: Editor with Pre-filled Content & Error State -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Product Description (with Error)</h3>
        <RichTextEditor
          v-model="productDescription"
          label="Product Description"
          placeholder="Describe your product features..."
          :has-error="true"
          error-message="Description must be at least 50 characters."
          :rows="6"
        />
      </section>

      <!-- Variant 3: Disabled Editor -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Read-Only Notes</h3>
        <RichTextEditor
          v-model="readOnlyNotes"
          label="Meeting Notes"
          :is-disabled="true"
          help-text="This field is read-only."
        />
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;RichTextEditor&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;RichTextEditor&gt;</code> component provides a basic text area designed to
          be extensible into a full-featured rich text editor (e.g., with Quill, TinyMCE). It
          supports labels, placeholders, error states, and content preview.
        </p>
        <p class="text-sm text-gray-500 mb-4">
          **Note:** This component provides the structural wrapper. For full rich text editing
          capabilities (bold, italics, lists, etc.), you would integrate a third-party library like
          Quill, TinyMCE, or Tiptap and initialize it within this component's `onMounted` hook.
        </p>

        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>modelValue</code> (String, default: <code>''</code>): The current content of the
            editor. Supports <code>v-model</code> for two-way binding.
          </li>
          <li>
            <code>label</code> (String, default: <code>null</code>): An optional label displayed
            above the editor.
          </li>
          <li>
            <code>placeholder</code> (String, default: <code>'Start typing your content...'</code>):
            Placeholder text for the editor.
          </li>
          <li>
            <code>rows</code> (Number, default: <code>8</code>): The initial number of visible text
            lines in the editor.
          </li>
          <li>
            <code>isDisabled</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            the editor will be visually and functionally disabled (read-only).
          </li>
          <li>
            <code>hasError</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            applies error styling to the editor border.
          </li>
          <li>
            <code>errorMessage</code> (String, default: <code>null</code>): An optional error
            message displayed below the editor when `hasError` is `true`.
          </li>
          <li>
            <code>helpText</code> (String, default: <code>null</code>): Optional helper text
            displayed below the editor.
          </li>
          <li>
            <code>showPreview</code> (Boolean, default: <code>false</code>): If `true`, displays a
            read-only HTML preview of the content below the editor.
          </li>
          <li>
            <code>editorId</code> (String, default: auto-generated): A unique ID for the textarea
            element, useful for linking labels or external editor instances.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>update:modelValue(newValue)</code>: Emitted when the editor content changes, for
            <code>v-model</code> binding. Payload: `(newValue: string)`.
          </li>
          <li>
            <code>change(newValue)</code>: Emitted when the editor content changes (e.g., on input).
            Payload: `(newValue: string)`.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;RichTextEditor
    v-model="articleContent"
    label="Article Body"
    placeholder="Start writing your article here..."
    help-text="Use basic HTML for formatting."
    :show-preview="true"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { RichTextEditor } from '@/components/forms';

const articleContent = ref('&lt;p&gt;This is some &lt;strong&gt;initial content&lt;/strong&gt;.&lt;/p&gt;');
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RichTextEditor } from '@/components/forms'

const blogContent = ref(
  '<p>This is the <strong>main content</strong> for your blog post. You can type here and see the preview below.</p><p>It supports <em>basic HTML</em> like paragraphs, <strong>strong</strong>, and <em>em</em> tags.</p>',
)
const productDescription = ref('This product is amazing...')
const readOnlyNotes = ref(
  '<p>Meeting Summary:</p><ul><li>Discussed Q3 goals.</li><li>Action item: Follow up on marketing campaign.</li></ul>',
)
</script>

<style scoped>
/* No specific scoped styles needed for the showcase, as it uses Tailwind and the component's styles. */
</style>
