<template>
  <div class="rich-text-editor-container bg-white rounded-xl shadow-md">
    <!-- Toolbar for Rich Text Editor -->
    <div class="editor-toolbar">
      <button
        @click="execCmd('bold')"
        :class="{ active: isActive('bold') }"
        class="editor-button"
        title="Bold"
      >
        <Icon name="bold" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('italic')"
        :class="{ active: isActive('italic') }"
        class="editor-button"
        title="Italic"
      >
        <Icon name="italic" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('underline')"
        :class="{ active: isActive('underline') }"
        class="editor-button"
        title="Underline"
      >
        <Icon name="underline" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('strikeThrough')"
        :class="{ active: isActive('strikeThrough') }"
        class="editor-button"
        title="Strikethrough"
      >
        <Icon name="strikethrough" class="w-5 h-5" />
      </button>
      <span class="border-l border-gray-300 h-6 mx-1"></span>
      <button
        @click="execCmd('insertUnorderedList')"
        :class="{ active: isActive('insertUnorderedList') }"
        class="editor-button"
        title="Unordered List"
      >
        <Icon name="list" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('insertOrderedList')"
        :class="{ active: isActive('insertOrderedList') }"
        class="editor-button"
        title="Ordered List"
      >
        <Icon name="list-ordered" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('blockquote')"
        :class="{ active: isActive('blockquote') }"
        class="editor-button"
        title="Blockquote"
      >
        <Icon name="blockquote" class="w-5 h-5" />
      </button>
      <span class="border-l border-gray-300 h-6 mx-1"></span>
      <button
        @click="execCmd('justifyLeft')"
        :class="{ active: isActive('justifyLeft') }"
        class="editor-button"
        title="Align Left"
      >
        <Icon name="align-left" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('justifyCenter')"
        :class="{ active: isActive('justifyCenter') }"
        class="editor-button"
        title="Align Center"
      >
        <Icon name="align-center" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('justifyRight')"
        :class="{ active: isActive('justifyRight') }"
        class="editor-button"
        title="Align Right"
      >
        <Icon name="align-right" class="w-5 h-5" />
      </button>
      <button
        @click="execCmd('justifyFull')"
        :class="{ active: isActive('justifyFull') }"
        class="editor-button"
        title="Justify"
      >
        <Icon name="align-justify" class="w-5 h-5" />
      </button>
      <span class="border-l border-gray-300 h-6 mx-1"></span>
      <button @click="execCmd('undo')" class="editor-button" title="Undo">
        <Icon name="undo" class="w-5 h-5" />
      </button>
      <button @click="execCmd('redo')" class="editor-button" title="Redo">
        <Icon name="redo" class="w-5 h-5" />
      </button>
      <!-- Add more buttons as needed, e.g., for headers, links, images -->
      <!-- Example for inserting link (requires more complex UI) -->
      <!-- <button @click="insertLink" class="editor-button" title="Insert Link">
        <Icon name="link" class="w-5 h-5" />
      </button> -->
    </div>

    <!-- Content Editable Area -->
    <div
      ref="editorRef"
      contenteditable="true"
      @input="onInput"
      @paste="onPaste"
      @focus="onFocus"
      @blur="onBlur"
      class="editor-content"
      :class="{ 'empty-placeholder': !hasContent && placeholder }"
      :data-placeholder="placeholder"
      role="textbox"
      aria-multiline="true"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon component is available

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Start writing your blog post here...',
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const editorRef = ref(null)
const hasContent = ref(false) // Reactive state to manage placeholder visibility
let isTyping = false // Flag to prevent immediate updates during typing

onMounted(() => {
  // Initialize content
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue
    updateHasContent()
    // Re-render Lucide icons if any are inside the contenteditable area (unlikely for now)
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  }
})

onUnmounted(() => {
  // Clean up if necessary
})

// Watch for external modelValue changes and update the editor's innerHTML
// This is crucial for two-way binding: when parent updates modelValue, editor reflects it.
watch(
  () => props.modelValue,
  (newValue) => {
    if (editorRef.value && editorRef.value.innerHTML !== newValue && !isTyping) {
      editorRef.value.innerHTML = newValue
      updateHasContent()
    }
  },
)

const onInput = () => {
  isTyping = true // Set flag when user is typing
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
    updateHasContent()
  }
  // Reset flag after a short delay to allow for continuous typing without external updates
  setTimeout(() => {
    isTyping = false
  }, 50) // Small debounce
}

const onFocus = () => {
  emit('focus')
}

const onBlur = () => {
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML) // Ensure latest content is emitted on blur
  }
  emit('blur')
  updateHasContent() // Update placeholder visibility on blur
}

const updateHasContent = () => {
  hasContent.value = editorRef.value && editorRef.value.textContent.trim() !== ''
}

const execCmd = (command, value = null) => {
  document.execCommand(command, false, value)
  // After executing command, force update to reflect content change in v-model
  onInput()
  // Update active state of buttons
  setTimeout(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons() // Re-render Lucide icons if any are affected
    }
  }, 0) // Small delay to ensure DOM updates before checking active state
}

const isActive = (command) => {
  // Check if the command is currently active on the selection
  if (editorRef.value && editorRef.value.contains(document.getSelection().anchorNode)) {
    return document.queryCommandState(command)
  }
  return false
}

// Handle paste events to strip formatting (optional but good for clean content)
const onPaste = (event) => {
  event.preventDefault()
  const text = event.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
  onInput() // Update model after paste
}

// Optional: For inserting links/images (more complex, usually involves a modal)
const insertLink = () => {
  const url = prompt('Enter the URL:')
  if (url) {
    execCmd('createLink', url)
  }
}
</script>

<style scoped>
/* Rich Text Editor Specific Styles */
.rich-text-editor-container {
  /* Tailwind classes for bg, p, rounded, shadow are applied in template,
     but here for general structure if needed */
  border: 1px solid #e5e7eb; /* border-gray-200 */
}

.editor-toolbar {
  border-bottom: 1px solid #e5e7eb; /* border-gray-200 */
  padding: 0.5rem 0.75rem; /* px-3 py-2 */
  background-color: #f9fafb; /* bg-gray-50 */
  border-top-left-radius: 0.75rem; /* rounded-t-xl */
  border-top-right-radius: 0.75rem;
  display: flex;
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
  gap: 0.25rem; /* gap-1 */
}

.editor-button {
  padding: 0.5rem; /* p-2 */
  border-radius: 0.375rem; /* rounded-md */
  color: #4b5563; /* text-gray-700 */
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
}
.editor-button:hover {
  background-color: #e5e7eb; /* hover:bg-gray-200 */
  color: #1f2937; /* hover:text-gray-900 */
}
.editor-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5); /* focus:ring-indigo-500 */
}
.editor-button.active {
  background-color: #6366f1; /* indigo-500 */
  color: white;
}
.editor-button.active:hover {
  background-color: #4f46e5; /* indigo-600 */
}

.editor-content {
  min-height: 400px; /* Increased height for blog content */
  padding: 1rem; /* p-4 */
  background-color: #ffffff; /* bg-white */
  border: 1px solid #e5e7eb; /* border-gray-200 */
  border-bottom-left-radius: 0.75rem; /* rounded-b-xl */
  border-bottom-right-radius: 0.75rem;
  outline: none; /* Remove default outline */
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05); /* inset shadow */
  line-height: 1.5; /* leading-relaxed */
  font-size: 1rem; /* text-base */
  overflow-y: auto; /* Enable scrolling for long content */
}

/* Placeholder for contenteditable */
.editor-content:empty:before {
  content: attr(data-placeholder);
  color: #6b7280; /* text-gray-500 */
  pointer-events: none;
  display: block; /* Important for placeholder to be visible */
}

/* Basic styles for contenteditable elements to ensure visual consistency */
.editor-content h1,
.editor-content h2,
.editor-content h3,
.editor-content h4,
.editor-content h5,
.editor-content h6 {
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.editor-content h1 {
  font-size: 2.25rem;
} /* text-4xl */
.editor-content h2 {
  font-size: 1.875rem;
} /* text-3xl */
.editor-content h3 {
  font-size: 1.5rem;
} /* text-2xl */
.editor-content h4 {
  font-size: 1.25rem;
} /* text-xl */
.editor-content h5 {
  font-size: 1.125rem;
} /* text-lg */
.editor-content h6 {
  font-size: 1rem;
} /* text-base */

.editor-content p {
  margin-bottom: 1em;
}
.editor-content ul,
.editor-content ol {
  margin-left: 1.5rem; /* ml-6 */
  margin-bottom: 1em;
}
.editor-content ul {
  list-style-type: disc;
}
.editor-content ol {
  list-style-type: decimal;
}
.editor-content blockquote {
  border-left: 4px solid #d1d5db; /* border-gray-300 */
  padding-left: 1rem; /* pl-4 */
  margin-left: 1rem; /* ml-4 */
  font-style: italic;
  color: #6b7280; /* text-gray-500 */
}
.editor-content b,
.editor-content strong {
  font-weight: bold;
}
.editor-content i,
.editor-content em {
  font-style: italic;
}
.editor-content u {
  text-decoration: underline;
}
.editor-content strike {
  text-decoration: line-through;
}
.editor-content a {
  color: #4f46e5; /* indigo-600 */
  text-decoration: underline;
}

/* Media embed specific styling */
.editor-content img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem auto; /* Center images */
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.editor-content audio,
.editor-content video {
  max-width: 100%;
  display: block;
  margin: 1rem auto;
  border-radius: 0.5rem;
}
</style>
