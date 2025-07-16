<template>
  <div
    class="not-found-view flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50 p-6"
  >
    <h1 class="text-6xl font-extrabold text-red-600 mb-4">404</h1>
    <p class="text-2xl text-gray-700 mb-8">Page Not Found</p>
    <p class="text-lg text-gray-600 mb-10">
      The page you are looking for does not exist or has been moved.
    </p>
    <router-link
      to="/"
      class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
    >
      Go to Home
    </router-link>
  </div>
</template>

<script setup>
// No specific logic needed for a basic 404 view
</script>

<style scoped>
/* No specific scoped styles needed here, Tailwind handles all styling. */
</style>
