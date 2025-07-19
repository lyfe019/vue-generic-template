<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Comment Components</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Variant 1: Basic Comment Section -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Product Feedback Section</h3>
        <CommentSection
          title="Product Feedback"
          current-user-avatar="https://placehold.co/100x100/63B3ED/ffffff?text=YOU"
          current-user-name="You"
        />
      </section>

      <!-- You can add other variants of comment sections here if needed,
           e.g., a read-only activity log, by passing different props. -->
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;CommentSection&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;CommentSection&gt;</code> component provides a complete interface for
          displaying and managing comments, including an input field for new comments and a list of
          existing ones.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>title</code> (String, default: 'Comments'): The title displayed at the top of the
            comment section.
          </li>
          <li>
            <code>currentUserAvatar</code> (String, default: a placeholder URL): The URL for the
            avatar image of the current user submitting comments.
          </li>
          <li>
            <code>currentUserName</code> (String, default: 'Current User'): The name of the current
            user, used for new comments.
          </li>
        </ul>
        <p class="text-gray-600 mt-4">
          Internally, it uses the <code>&lt;CommentItem&gt;</code> component for individual
          comments.
        </p>
      </div>

      <div class="mb-8 mt-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;CommentItem&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;CommentItem&gt;</code> component is used to render a single comment,
          supporting author information, content, timestamp, and interactive buttons for replies,
          edits, and deletions. It also supports nested replies.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>comment</code> (Object, required): An object representing the comment, with
            properties:
            <ul class="list-circle list-inside ml-6 mt-1">
              <li>`id` (String): Unique identifier for the comment.</li>
              <li>`author` (String): Name of the comment author.</li>
              <li>`avatar` (String, optional): URL to the author's avatar image.</li>
              <li>`timestamp` (String): Human-readable timestamp (e.g., '2 hours ago').</li>
              <li>`content` (String): The text content of the comment.</li>
              <li>
                `role` (String, optional): 'user' or 'admin' to apply specific styling (e.g., author
                name color).
              </li>
              <li>
                `replies` (Array, optional): An array of nested `Comment` objects for replies.
              </li>
            </ul>
          </li>
          <li>
            <code>bgColor</code> (String, default: 'bg-gray-50'): Tailwind CSS class for the
            background color of the comment item.
          </li>
          <li>
            <code>isReply</code> (Boolean, default: false): Internal prop used to apply indentation
            for nested replies.
          </li>
        </ul>
        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>reply(commentId)</code>: Emitted when the "Reply" button is clicked, passing the
            ID of the comment being replied to.
          </li>
          <li>
            <code>edit(commentId, currentContent)</code>: Emitted when the "Edit" button is clicked,
            passing the comment ID and its current text.
          </li>
          <li>
            <code>delete(commentId)</code>: Emitted when the "Delete" button is clicked, passing the
            comment ID.
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { CommentSection } from '@/components/dataDisplay' // Import from dataDisplay folder
</script>

<style scoped>
/* No specific scoped styles needed. */
</style>
