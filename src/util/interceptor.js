import axios from 'axios'
import router from '@/router/routerSetup' // Update import to use routerSetup.js

const ApiClientFor = (domain) => {
  if (!domain) {
    throw new Error('A domain must be provided')
  }

  let apiBaseUrl = ''

  switch (domain) {
    case 'auth':
      apiBaseUrl = import.meta.env.VITE_APP_AUTH_API_BASE_URL
      break
    case 'project':
      apiBaseUrl = import.meta.env.VITE_APP_PROJECT_API_BASE_URL
      break
    case 'wenext':
      apiBaseUrl = import.meta.env.VITE_APP_WENEXT_API_BASE_URL
      break
    default:
      throw new Error(`Invalid domain: ${domain}`)
  }

  const apiClient = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
  })

  // Add request interceptor to include Authorization header
  apiClient.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        const refreshToken = localStorage.getItem('refreshToken')

        if (refreshToken) {
          try {
            const refreshResponse = await apiClient.post('/auth/refresh-token', null, {
              headers: { Authorization: `Bearer ${refreshToken}` },
            })

            const newAccessToken = refreshResponse.data.accessToken
            const newRefreshToken = refreshResponse.data.refreshToken

            localStorage.setItem('accessToken', newAccessToken)
            localStorage.setItem('refreshToken', newRefreshToken)

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return apiClient(originalRequest)
          } catch (refreshError) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            toast.error('Session expired, please login again')
            router.push('/auth/login')
            return Promise.reject(refreshError)
          }
        } else {
          localStorage.removeItem('accessToken')
          router.push('/auth/login')
          return Promise.reject(error)
        }
      } else if (error.response && error.response.status === 403) {
        return Promise.reject(error)
      } else if (error.response && error.response.status === 400) {
        console.error('Bad Request:', error.response.data)
      } else if (error.response) {
        console.error('API Error:', error.response.status, error.response.data)
      } else if (error.request) {
        console.error('Request Error:', error.request)
      } else {
        console.error('Axios setup Error:', error.message)
      }

      return Promise.reject(error)
    },
  )

  return apiClient
}

export default ApiClientFor
