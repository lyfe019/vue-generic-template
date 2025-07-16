<template>
  <div class="auth-login-view max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
    <p class="text-gray-600 mb-6 text-center">Enter your credentials to access the admin panel.</p>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="********"
        />
      </div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-500">
      <p>
        Access Token:
        <span class="font-mono text-xs text-gray-700">{{
          auth.accessToken.value ? 'Present' : 'N/A'
        }}</span>
      </p>
      <p>
        Is Authenticated:
        <span
          :class="{
            'text-green-600': auth.isAuthenticated.value,
            'text-red-600': !auth.isAuthenticated.value,
          }"
          >{{ auth.isAuthenticated.value }}</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/services/useAuth'
import { useRouter } from 'vue-router' // Import useRouter for programmatic navigation

const auth = useAuth()
const router = useRouter() // Initialize router

const email = ref('test@example.com') // Pre-fill for easy testing
const password = ref('password123') // Pre-fill for easy testing

const handleLogin = async () => {
  console.log('Attempting login with:', email.value, password.value)
  const success = await auth.login({ email: email.value, password: password.value })
  if (success) {
    console.log('Login simulated successfully. Redirecting to admin dashboard.')
    router.push('/admin') // Redirect to admin dashboard after successful login
  } else {
    console.log('Login failed. Check console for errors.')
    // A real app would use a toast notification here
  }
}
</script>

<style scoped>
/* No specific scoped styles needed here, Tailwind handles all styling. */
</style>
