<template>
  <div :class="['flex items-start space-x-4 p-4 border border-gray-200 rounded-lg', bgColorClass]">
    <!-- Avatar -->
    <Avatar :src="comment.avatar" :alt="`Avatar of ${comment.author}`" size="md" />

    <div class="flex-1">
      <div class="flex justify-between items-center mb-1">
        <!-- Author Name -->
        <span :class="['font-semibold', authorColorClass]">{{ comment.author }}</span>
        <!-- Timestamp -->
        <span class="text-xs text-gray-500">{{ comment.timestamp }}</span>
      </div>
      <!-- Comment Content -->
      <p class="text-sm text-gray-700 mb-2">{{ comment.content }}</p>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-3 text-xs text-gray-600">
        <Button
          variant="ghost"
          size="sm"
          class="hover:underline flex items-center space-x-1"
          @click="emit('reply', comment.id)"
        >
          <Icon name="message-square" class="w-4 h-4" />
          <span>Reply</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="hover:underline flex items-center space-x-1"
          @click="emit('edit', comment.id, comment.content)"
        >
          <Icon name="edit-3" class="w-4 h-4" />
          <span>Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="hover:underline flex items-center space-x-1 text-red-600"
          @click="emit('delete', comment.id)"
        >
          <Icon name="trash-2" class="w-4 h-4" />
          <span>Delete</span>
        </Button>
      </div>

      <!-- Nested Replies -->
      <div v-if="comment.replies && comment.replies.length > 0" class="mt-4 space-y-3">
        <CommentItem
          v-for="reply in comment.replies"
          :key="reply.id"
          :comment="reply"
          bg-color="bg-white"
          :is-reply="true"
          @reply="emit('reply', $event)"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Avatar, Button, Icon } from '@/components/common' // Assuming correct paths

const props = defineProps({
  comment: {
    type: Object,
    required: true,
    validator: (value) => {
      // Basic validation for comment object structure
      return (
        typeof value.id === 'string' &&
        typeof value.author === 'string' &&
        typeof value.timestamp === 'string' &&
        typeof value.content === 'string' &&
        (value.avatar === undefined || typeof value.avatar === 'string') &&
        (value.role === undefined || typeof value.role === 'string') &&
        (value.replies === undefined || Array.isArray(value.replies))
      )
    },
  },
  bgColor: {
    type: String, // Tailwind background color class for the comment item itself
    default: 'bg-gray-50',
  },
  isReply: {
    type: Boolean, // Flag to indicate if it's a nested reply, for styling
    default: false,
  },
})

const emit = defineEmits(['reply', 'edit', 'delete'])

const bgColorClass = computed(() => {
  // Add ml-8 for nested replies to create indentation
  return [props.bgColor, { 'ml-8': props.isReply }]
})

const authorColorClass = computed(() => {
  // Example: Admin comments could have a different color
  return props.comment.role === 'admin' ? 'text-indigo-700' : 'text-gray-900'
})
</script>

<style scoped>
/* No specific scoped styles needed as Tailwind classes are used directly. */
</style>
