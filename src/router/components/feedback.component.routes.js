// src/router/components/feedback.component.routes.js

// Import component showcase views for the feedback category
// Note: The path for showcase views is assumed to be src/views/admin/components/{category}/
import AlertsShowcase from '../../views/ui-components/feedback/AlertsShowcase.vue' // Ensure this path is correct with the @ alias

const feedbackComponentRoutes = [
  {
    // The path here should be relative to the parent route it will be nested under
    // Since it's nested under '/admin', this path becomes '/components/feedback/alerts'
    path: 'feedback/alerts', // Changed to relative path 'feedback/alerts'
    name: 'ComponentShowcaseAlerts',
    component: AlertsShowcase,
    meta: { requiresAuth: true, title: 'Alerts Showcase' },
  },
  // Add other feedback component routes here
  // {
  //   path: 'feedback/toasts', // Relative path
  //   name: 'ComponentShowcaseToasts',
  //   component: () => import('@/views/admin/components/feedback/ToastsShowcase.vue'),
  //   meta: { requiresAuth: true, title: 'Toasts Showcase' },
  // },
  // {
  //   path: 'feedback/validation-messages', // Relative path
  //   name: 'ComponentShowcaseValidationMessages',
  //   component: () => import('@/views/admin/components/feedback/ValidationMessagesShowcase.vue'),
  //   meta: { requiresAuth: true, title: 'Validation Messages Showcase' },
  // },
]

export default feedbackComponentRoutes
