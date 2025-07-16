<template>
  <div class="admin-dashboard-view p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Admin Dashboard Overview</h2>
    <p class="text-gray-600 mb-6">
      This is the main dashboard for administrative users. Here you will find key metrics and quick
      links.
    </p>
    <div class="dashboard-widgets grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div class="widget bg-blue-50 border border-blue-200 p-6 rounded-lg text-center shadow-sm">
        <h3 class="text-xl font-semibold text-blue-800">Users</h3>
        <p class="text-3xl font-bold text-blue-600 mt-2">1,234</p>
      </div>
      <div class="widget bg-green-50 border border-green-200 p-6 rounded-lg text-center shadow-sm">
        <h3 class="text-xl font-semibold text-green-800">Courses</h3>
        <p class="text-3xl font-bold text-green-600 mt-2">120</p>
      </div>
      <div
        class="widget bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center shadow-sm"
      >
        <h3 class="text-xl font-semibold text-yellow-800">Assignments</h3>
        <p class="text-3xl font-bold text-yellow-600 mt-2">500</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Admin Dashboard specific logic goes here
</script>

<style scoped>
/* No specific scoped styles needed here, Tailwind handles all styling. */
</style>
