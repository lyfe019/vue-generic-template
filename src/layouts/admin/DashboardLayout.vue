<template>
  <div class="bg-gray-100 min-h-screen flex flex-col md:flex-row">
    <TheSidebar
      :is-expanded="isSidebarExpanded"
      :is-mobile="isMobileView"
      @close-mobile-sidebar="isSidebarExpanded = false"
    />

    <div class="main-content-area flex-1 flex flex-col overflow-hidden">
      <TheHeader :is-mobile="isMobileView" @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 p-6 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheSidebar from './TheSidebar.vue'
import TheHeader from './TheHeader.vue'

const isSidebarExpanded = ref(true) // Default to expanded on desktop
const isMobileView = ref(false) // Tracks if currently in mobile breakpoint

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

const handleResize = () => {
  const mdBreakpoint = 768 // Tailwind's 'md' breakpoint
  isMobileView.value = window.innerWidth < mdBreakpoint

  // Adjust sidebar state based on screen size on resize
  if (!isMobileView.value && !isSidebarExpanded.value) {
    // If desktop and currently collapsed, expand it
    isSidebarExpanded.value = true
  } else if (isMobileView.value && isSidebarExpanded.value) {
    // If mobile and currently expanded, collapse it (hide it)
    isSidebarExpanded.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // Initial call to set state based on current window size
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Any layout-specific scoped styles can go here if needed, but Tailwind handles most. */
</style>
