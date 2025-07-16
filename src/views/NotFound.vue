<template>
  <div class="not-found-view">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script setup>
// No specific logic needed for a basic 404 view
</script>

<style scoped>
.not-found-view {
  padding: 50px;
  text-align: center;
}
h1 {
  font-size: 2.5em;
  color: #e44d26; /* A common error color */
}
p {
  margin: 20px 0;
  font-size: 1.2em;
}
router-link {
  color: #007bff;
  text-decoration: underline;
}
</style>
