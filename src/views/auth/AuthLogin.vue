<template>
  <div class="auth-login-view">
    <h1>Login</h1>
    <p>This is the login page. Authentication form will be built here.</p>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Access Token: {{ auth.accessToken.value || 'N/A' }}</p>
    <p>Is Authenticated: {{ auth.isAuthenticated.value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/services/useAuth' // Import your useAuth composable

const auth = useAuth() // Use the auth composable

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  console.log('Attempting login with:', email.value, password.value)
  const success = await auth.login({ email: email.value, password: password.value })
  if (success) {
    // router.push('/dashboard') // Placeholder: Actual redirect after successful login
    console.log('Login simulated successfully. Check localStorage.')
  } else {
    console.log('Login failed.')
  }
}
</script>

<style scoped>
.auth-login-view {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}
form div {
  margin-bottom: 15px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type='email'],
input[type='password'] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
