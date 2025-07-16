import { createRouter, createWebHistory } from 'vue-router'

// Import main admin routes (which will contain all child admin routes)
import mainAdminRoutes from './admin/main.admin.routes'

// Define your base routes array here
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'), // Lazy load HomeView
  },
  {
    path: '/auth/login',
    name: 'auth-login',
    component: () => import('@/views/auth/AuthLogin.vue'), // Lazy load AuthLogin
  },
  // Add the main admin dashboard route from your modular definition
  mainAdminRoutes.dashboard, // This will include all nested admin routes

  // Catch all unmatched routes - should always be the last route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'), // Lazy load NotFound
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router // Export the raw router instance
