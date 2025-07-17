// src/router/components/feedback.component.routes.js

// Import component showcase views for the feedback category
import AlertsShowcase from '../../views/ui-components/feedback/AlertsShowcase.vue'
import ToastsShowcase from '../../views/ui-components/feedback/ToastShowcase.vue' // NEW IMPORT

const feedbackComponentRoutes = [
  {
    path: 'feedback/alerts', // Relative path as it's nested under '/admin/components'
    name: 'ComponentShowcaseAlerts',
    component: AlertsShowcase,
    meta: { requiresAuth: true, title: 'Alerts Showcase' },
  },
  {
    path: 'feedback/toasts', // NEW ROUTE: Relative path for Toasts Showcase
    name: 'ComponentShowcaseToasts',
    component: ToastsShowcase,
    meta: { requiresAuth: true, title: 'Toasts Showcase' },
  },
  // Add other feedback component routes here as they are created
  // {
  //   path: 'feedback/validation-messages',
  //   name: 'ComponentShowcaseValidationMessages',
  //   component: () => import('@/views/admin/components/feedback/ValidationMessagesShowcase.vue'),
  //   meta: { requiresAuth: true, title: 'Validation Messages Showcase' },
  // },
]

export default feedbackComponentRoutes
