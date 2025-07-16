<template>
  <header
    class="bg-white shadow-md p-4 flex items-center justify-between rounded-bl-lg rounded-br-lg"
  >
    <h2 class="text-xl md:text-2xl font-semibold text-gray-800">UI Components: Badges</h2>
    <button
      v-if="isMobile"
      @click="toggleSidebar"
      class="p-2 rounded-full text-indigo-800 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
      aria-label="Toggle sidebar menu"
    >
      <i data-lucide="menu" class="w-6 h-6"></i>
    </button>
    <button
      v-if="!isMobile"
      @click="toggleSidebar"
      class="p-2 rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform duration-300 hidden md:block"
      aria-label="Toggle sidebar"
    >
      <i data-lucide="menu" class="w-6 h-6"></i>
    </button>
  </header>
</template>

<script setup>
import { onMounted, watch } from 'vue'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

// Re-render Lucide icons on mount (and potentially if props change, though less likely for this component)
onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})

watch(
  () => props.isMobile,
  () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  },
)
</script>

<style scoped>
/* No scoped styles needed here, Tailwind handles ait. */
</style>
