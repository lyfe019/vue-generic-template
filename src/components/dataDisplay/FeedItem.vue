<template>
  <div :class="['flex items-start space-x-3 p-3 rounded-lg', bgColorClass]">
    <div class="flex-shrink-0 pt-1">
      <Icon :name="icon" :class="['w-5 h-5', iconColorClass]" />
    </div>
    <div>
      <p class="text-sm" :class="textColorClass" v-html="message"></p>
      <span class="text-xs text-gray-500">{{ timestamp }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon is in common components

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String, // Tailwind color class e.g., 'indigo-600', 'green-500'
    default: 'text-gray-600',
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String, // Tailwind background color class e.g., 'gray-50', 'white'
    default: 'bg-gray-50',
  },
  textColor: {
    type: String, // Tailwind text color class for the message e.g., 'gray-800'
    default: 'text-gray-800',
  },
})

const iconColorClass = computed(() => `text-${props.iconColor}`)
const bgColorClass = computed(() => `bg-${props.bgColor}`)
const textColorClass = computed(() => `text-${props.textColor}`)
</script>

<style scoped>
/* No specific scoped styles needed as Tailwind classes are used directly. */
</style>
