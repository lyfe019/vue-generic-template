import router from './index' // Import the actual router instance
import { useAuth } from '../services/useAuth'
import { useLoadingStore } from '../stores/loading'

router.beforeEach(async (to, from, next) => {
  const loadingStore = useLoadingStore()
  loadingStore.startLoading()

  const { isAuthenticated, refreshAccessToken } = useAuth()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    if (await isAuthenticated()) {
      next()
    } else if (localStorage.getItem('refreshToken')) {
      if (await refreshAccessToken()) {
        next()
      } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        next('/auth/login') // Redirect to login if token refresh fails
      }
    } else {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      next('/auth/login') // Redirect to login if no refresh token
    }
  } else {
    next() // Proceed if route does not require authentication
  }
})

router.afterEach(() => {
  const loadingStore = useLoadingStore()
  loadingStore.stopLoading()
})

export default router
