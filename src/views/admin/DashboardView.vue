<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
    <p>Welcome to the admin dashboard!</p>
    <h2 class="text-2xl font-semibold text-gray-800 mt-8 mb-6">Badge Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Basic Text Badges</h3>
        <div class="flex flex-wrap items-center gap-3">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
          <span
            class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
          >
            Pending
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Urgent
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            New
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
            Draft
          </span>
          <span
            class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
          >
            Feature
          </span>
        </div>
      </section>
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Badges with Icons</h3>
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          >
            <i data-lucide="check-circle" class="w-3 h-3 mr-1"></i> Completed
          </span>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            <i data-lucide="star" class="w-3 h-3 mr-1 fill-blue-500 stroke-blue-500"></i> Featured
          </span>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
          >
            <i data-lucide="alert-triangle" class="w-3 h-3 mr-1"></i> Alert
          </span>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
          >
            <i data-lucide="clock" class="w-3 h-3 mr-1"></i> Due Soon
          </span>
        </div>
      </section>
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Notification / Count Badges</h3>
        <div class="flex flex-wrap items-center gap-6">
          <div class="relative">
            <button
              class="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              aria-label="Notifications"
            >
              <i data-lucide="bell" class="w-6 h-6"></i>
            </button>
            <span
              class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold"
            >
              3
            </span>
          </div>
          <div class="relative">
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Messages"
            >
              Messages
            </button>
            <span
              class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-orange-500 text-white text-xs font-bold"
            >
              9+
            </span>
          </div>
          <div class="relative">
            <button
              class="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              aria-label="Tasks"
            >
              <i data-lucide="clipboard" class="w-6 h-6"></i>
            </button>
            <span
              class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 block h-3 w-3 rounded-full bg-green-500"
            ></span>
          </div>
        </div>
      </section>
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Outline Badges</h3>
        <div class="flex flex-wrap items-center gap-3">
          <span
            class="px-2.5 py-0.5 rounded-full text-xs font-medium border border-indigo-400 text-indigo-700"
          >
            Primary
          </span>
          <span
            class="px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-400 text-green-700"
          >
            Success
          </span>
          <span
            class="px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-400 text-red-700"
          >
            Danger
          </span>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-400 text-gray-700"
          >
            <i data-lucide="tag" class="w-3 h-3 mr-1"></i> Category
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Re-render Lucide icons for this view when it's mounted
onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})
</script>
