// src/router/admin/main.admin.routes.js

import DashboardLayout from '@/layouts/admin/DashboardLayout.vue'
import DashboardView from '@/views/admin/DashboardView.vue'

// Import component category routes
import feedbackComponentRoutes from '../components/feedback.component.routes'
import commonComponentRoutes from '../components/common.component.routes'
import dataDisplayComponentRoutes from '../components/dataDisplay.component.routes'
import formsComponentRoutes from '../components/forms.component.routes' // NEW: Import forms routes
// ... import other component category routes here

const mainAdminRoutes = {
  path: '/admin',
  name: 'admin-dashboard-layout',
  component: DashboardLayout,
  meta: { requiresAuth: true },

  children: [
    {
      path: '',
      name: 'admin-dashboard',
      component: DashboardView,
      meta: { title: 'Dashboard' },
    },
    {
      path: 'components',
      name: 'AdminComponents',
      redirect: { name: 'ComponentShowcaseAlerts' },
      meta: { requiresAuth: true, title: 'UI Components' },
      children: [
        ...feedbackComponentRoutes,
        ...commonComponentRoutes,
        ...dataDisplayComponentRoutes,
        ...formsComponentRoutes, // NEW: Spread forms component routes here
        // ... add other component category routes here
      ],
    },
  ],
}

export default {
  dashboard: mainAdminRoutes,
}
