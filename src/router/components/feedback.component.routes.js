// src/router/components/feedback.component.routes.js

// Import feedback component showcase views
import AlertsShowcase from '@/views/ui-components/feedback/AlertsShowcase.vue'
import ToastsShowcase from '@/views/ui-components/feedback/ToastsShowcase.vue'
import ConfirmationDialogsShowcase from '@/views/ui-components/feedback/ConfirmationDialogsShowcase.vue'
import ValidationMessageShowcase from '@/views/ui-components/feedback/ValidationMessageShowcase.vue'
import TooltipShowcase from '@/views/ui-components/feedback/TooltipShowcase.vue' // New Import

const feedbackComponentRoutes = [
  {
    path: 'feedback/alerts', // Relative path as it will be nested under '/admin/components'
    name: 'ComponentShowcaseAlerts',
    component: AlertsShowcase,
    meta: { requiresAuth: true, title: 'Alerts Showcase' },
  },
  {
    path: 'feedback/toasts',
    name: 'ComponentShowcaseToasts',
    component: ToastsShowcase,
    meta: { requiresAuth: true, title: 'Toasts Showcase' },
  },
  {
    path: 'feedback/confirmation-dialogs',
    name: 'ComponentShowcaseConfirmationDialogs',
    component: ConfirmationDialogsShowcase,
    meta: { requiresAuth: true, title: 'Confirmation Dialogs Showcase' },
  },
  {
    path: 'feedback/validation-messages',
    name: 'ComponentShowcaseValidationMessages',
    component: ValidationMessageShowcase,
    meta: { requiresAuth: true, title: 'Validation Messages Showcase' },
  },
  {
    path: 'feedback/tooltips', // New Route
    name: 'ComponentShowcaseTooltips',
    component: TooltipShowcase,
    meta: { requiresAuth: true, title: 'Tooltips Showcase' },
  },
]

export default feedbackComponentRoutes
