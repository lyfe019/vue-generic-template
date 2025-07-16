<template>
  <div class="generic-placeholder-view">
    <h2>{{ title || 'Generic Placeholder' }}</h2>
    <p>{{ message || 'This page is a placeholder for future content.' }}</p>
    <p>
      It demonstrates a route that will eventually lead to a specific feature or UI component
      showcase.
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.generic-placeholder-view {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  text-align: center;
}
h2 {
  color: #364d79;
}
</style>
