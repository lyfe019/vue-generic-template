import { ref, computed } from 'vue'
import ApiClientFor from '../util/interceptor' // Corrected import path to use alias
// import router from '@/router/routerSetup' // Future: Import router for redirection
// import { useToastStore } from '@/stores/toastStore' // Future: Import toast store for notifications

// Initialize an API client instance specifically for authentication endpoints
const authApiClient = ApiClientFor('auth')

// Reactive state for authentication (shared across all useAuth instances)
const accessToken = ref(localStorage.getItem('accessToken'))
const refreshToken = ref(localStorage.getItem('refreshToken'))
const user = ref(JSON.parse(localStorage.getItem('user') || 'null')) // Optional: store user details

// Function to update tokens in state and localStorage
function setAuthTokens(newAccessToken, newRefreshToken, userData = null) {
  accessToken.value = newAccessToken
  refreshToken.value = newRefreshToken
  localStorage.setItem('accessToken', newAccessToken)
  localStorage.setItem('refreshToken', newRefreshToken)

  if (userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  } else {
    user.value = null
    localStorage.removeItem('user')
  }
}

// Function to clear all authentication data
function clearAuthTokens() {
  accessToken.value = null
  refreshToken.value = null
  user.value = null
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}

// Main composable function
export function useAuth() {
  // const toast = useToastStore() // Future: initialize toast

  /**
   * Checks if the user is authenticated.
   * This is now an async function to match routerSetup.js usage.
   * @returns {Promise<boolean>} True if authenticated, false otherwise.
   */
  const isAuthenticated = async () => {
    // In a real app, you might add more robust checks like token validation on the server.
    // For now, it checks for the presence of both tokens.
    return !!accessToken.value && !!refreshToken.value
  }

  /**
   * Refreshes the access token using the refresh token.
   * This function can be called explicitly or implicitly by the interceptor.
   * @returns {Promise<boolean>} True if refresh was successful, false otherwise.
   */
  const refreshAccessToken = async () => {
    if (!refreshToken.value) {
      console.warn('No refresh token available. Cannot refresh access token.')
      clearAuthTokens()
      // router.push('/auth/login') // Future: Redirect to login
      // toast.error('Session expired. Please log in.') // Future: show toast
      return false
    }

    try {
      const response = await authApiClient.post('/refresh-token', null, {
        headers: {
          Authorization: `Bearer ${refreshToken.value}`,
        },
      })

      if (response.data.accessToken && response.data.refreshToken) {
        setAuthTokens(response.data.accessToken, response.data.refreshToken)
        return true
      } else {
        console.error('Refresh token response missing new tokens.')
        clearAuthTokens()
        // router.push('/auth/login') // Future: Redirect to login
        // toast.error('Session expired. Please log in.') // Future: show toast
        return false
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      clearAuthTokens()
      // router.push('/auth/login') // Future: Redirect to login
      // toast.error('Session expired. Please log in.') // Future: show toast
      return false
    }
  }

  /**
   * Placeholder for user login logic.
   * Will interact with the API client.
   */
  const login = async (credentials) => {
    try {
      // Example: const response = await authApiClient.post('/login', credentials);
      // setAuthTokens(response.data.accessToken, response.data.refreshToken, response.data.user);
      console.log('Login function: Placeholder for API call.')
      // Simulate successful login
      const dummyAccessToken = 'dummy_access_token_' + Date.now()
      const dummyRefreshToken = 'dummy_refresh_token_' + Date.now()
      const dummyUser = { id: 1, name: 'Test User', email: credentials.email }
      setAuthTokens(dummyAccessToken, dummyRefreshToken, dummyUser)
      console.log('Dummy login successful.')
      // router.push('/dashboard') // Future: Redirect on successful login
      // toast.success('Logged in successfully!') // Future: show toast
      return true
    } catch (error) {
      console.error('Login failed:', error)
      clearAuthTokens()
      // toast.error('Login failed. Please check credentials.') // Future: show toast
      return false
    }
  }

  /**
   * Placeholder for user logout logic.
   * Clears tokens and redirects.
   */
  const logout = () => {
    clearAuthTokens()
    console.log('Logged out.')
    // router.push('/auth/login') // Future: Redirect after logout
    // toast.info('You have been logged out.') // Future: show toast
  }

  /**
   * Placeholder for user registration logic.
   */
  const register = async (userData) => {
    try {
      // Example: const response = await authApiClient.post('/register', userData);
      console.log('Register function: Placeholder for API call.')
      // Simulate successful registration (e.g., no immediate token, just success)
      console.log('Dummy registration successful.')
      // router.push('/auth/registration-success') // Future: Redirect
      // toast.success('Registration successful! Please log in.') // Future: show toast
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      // toast.error('Registration failed. Please try again.') // Future: show toast
      return false
    }
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated, // Now an async function
    login,
    logout,
    register,
    refreshAccessToken,
  }
}
