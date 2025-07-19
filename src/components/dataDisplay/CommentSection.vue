<template>
  <div class="bg-white p-6 rounded-xl shadow-md">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h3>

    <!-- Comment Input Area -->
    <div class="mb-6">
      <h4 class="text-lg font-medium text-gray-800 mb-2">Leave a Comment</h4>
      <div class="flex items-start space-x-3">
        <Avatar :src="currentUserAvatar" alt="Your Avatar" size="md" />
        <div class="flex-1">
          <textarea
            v-model="newCommentText"
            :class="[
              'w-full p-3 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-y min-h-[80px]',
              commentInputError ? 'border-red-500' : 'border-gray-300',
            ]"
            placeholder="Write your comment here..."
          ></textarea>
          <p v-if="commentInputError" class="mt-1 text-sm text-red-600">
            {{ commentInputErrorMessage }}
          </p>
          <div class="flex justify-end mt-2">
            <Button
              variant="primary"
              size="md"
              @click="addComment"
              :disabled="!newCommentText.trim()"
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Individual Comments List -->
    <div class="space-y-6">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @reply="handleReply"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      <p v-if="comments.length === 0" class="text-center text-gray-500">
        No comments yet. Be the first to comment!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Avatar, Button } from '@/components/common' // Assuming Avatar and Button are in common
import { CommentItem } from './' // Import CommentItem from the same dataDisplay folder

const props = defineProps({
  title: {
    type: String,
    default: 'Comments',
  },
  currentUserAvatar: {
    type: String,
    default: 'https://placehold.co/100x100/63B3ED/ffffff?text=U', // Default user avatar
  },
  currentUserName: {
    type: String,
    default: 'Current User',
  },
})

const newCommentText = ref('')
const commentInputError = ref(false)
const commentInputErrorMessage = ref('')

// Reactive array to hold comments
const comments = reactive([
  {
    id: 'c1',
    author: 'Alice Johnson',
    avatar: 'https://placehold.co/100x100/A0AEC0/ffffff?text=A',
    timestamp: '2 hours ago',
    content:
      'The new burger patties are excellent! Very juicy and flavorful. Keep up the great quality!',
    role: 'user',
    replies: [],
  },
  {
    id: 'c2',
    author: 'Bob Williams',
    avatar: 'https://placehold.co/100x100/FBD38D/000000?text=B',
    timestamp: '1 day ago',
    content: 'I noticed a slight increase in the price of fries. Is there a reason for this?',
    role: 'user',
    replies: [
      {
        id: 'r1',
        author: 'Admin Response',
        avatar: 'https://placehold.co/100x100/9F7AEA/ffffff?text=Admin',
        timestamp: '20 hours ago',
        content:
          'Hello Bob, the price adjustment on fries is due to an increase in potato supply costs. We strive to maintain quality while keeping prices competitive.',
        role: 'admin',
        replies: [],
      },
    ],
  },
])

const addComment = () => {
  if (!newCommentText.value.trim()) {
    commentInputError.value = true
    commentInputErrorMessage.value = 'Comment cannot be empty.'
    return
  }

  commentInputError.value = false
  commentInputErrorMessage.value = ''

  const newComment = {
    id: `c${Date.now()}`, // Simple unique ID
    author: props.currentUserName,
    avatar: props.currentUserAvatar,
    timestamp: 'Just now', // In a real app, calculate dynamic time
    content: newCommentText.value.trim(),
    role: 'user', // Assuming current user is a regular user
    replies: [],
  }

  comments.unshift(newComment) // Add to the beginning of the list
  newCommentText.value = '' // Clear the input
}

// Placeholder handlers for comment actions
const handleReply = (commentId) => {
  console.log(`Reply to comment with ID: ${commentId}`)
  // In a real application, you'd open a reply input field for that comment
  // For this showcase, we'll just log.
}

const handleEdit = (commentId, currentContent) => {
  console.log(`Edit comment with ID: ${commentId}, current content: "${currentContent}"`)
  // In a real application, you'd open an edit modal or inline editor
}

const handleDelete = (commentId) => {
  console.log(`Delete comment with ID: ${commentId}`)
  // In a real application, you'd show a confirmation modal and then delete
  const confirmDelete = window.confirm('Are you sure you want to delete this comment?')
  if (confirmDelete) {
    // Basic recursive deletion for demonstration
    const deleteRecursive = (items, idToDelete) => {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === idToDelete) {
          items.splice(i, 1)
          return true
        }
        if (items[i].replies && items[i].replies.length > 0) {
          if (deleteRecursive(items[i].replies, idToDelete)) {
            return true
          }
        }
      }
      return false
    }
    deleteRecursive(comments, commentId)
  }
}
</script>

<style scoped>
/* No specific scoped styles needed as Tailwind classes are used directly. */
</style>
