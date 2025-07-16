<template>
  <div id="app-container">
    <router-view />

    <footer class="app-footer">
      <p>&copy; 2025 Vue Generic Template. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { useAuth } from '@/services/useAuth'
// import { useRouter } from 'vue-router'; // Uncomment if you need programmatic navigation here

const auth = useAuth()
// const router = useRouter(); // Uncomment if you need programmatic navigation here

// Note: The logout function here will trigger clearAuthTokens in useAuth
// and the router guard in routerSetup.js might then redirect if applicable.
</script>

<style>
/* Global styles (App.vue can contain global app layout styles or use main.css) */
</style>
