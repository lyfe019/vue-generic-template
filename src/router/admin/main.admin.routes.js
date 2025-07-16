// src/router/admin/main.admin.routes.js

import DashboardLayout from '@/layouts/admin/DashboardLayout.vue'
import DashboardView from '@/views/admin/DashboardView.vue' // Assuming this is your default dashboard view

// Import component category routes
import feedbackComponentRoutes from '../components/feedback.component.routes'
// import dataDisplayComponentRoutes from '../components/dataDisplay.component.routes' // For future categories
// ... import other component category routes here

const mainAdminRoutes = {
  path: '/admin', // Parent path for all admin-related routes
  name: 'admin-dashboard-layout',
  component: DashboardLayout, // This is the layout that will contain the child views
  meta: { requiresAuth: true }, // Apply auth guard to all admin routes

  children: [
    {
      path: '', // Default child route for /admin
      name: 'admin-dashboard',
      component: DashboardView, // Your main dashboard content
      meta: { title: 'Dashboard' },
    },
    // Add other top-level admin pages here
    // {
    //   path: 'settings',
    //   name: 'admin-settings',
    //   component: () => import('@/views/admin/SettingsView.vue'),
    //   meta: { title: 'Settings' },
    // },

    // NEW: A nested route for all UI components showcases
    {
      path: 'components', // This creates the /admin/components/ prefix
      name: 'AdminComponents',
      // No component here, as this is just a wrapper for its children to inherit the layout
      // Or, if you have a general "Components Home" view, you could put it here.
      // For now, let's just make it a route that *contains* other component routes.
      redirect: { name: 'ComponentShowcaseAlerts' }, // Redirect to Alerts by default for /admin/components
      meta: { requiresAuth: true, title: 'UI Components' },
      children: [
        ...feedbackComponentRoutes, // Spread all feedback component routes here
        // ...dataDisplayComponentRoutes, // Add other component category routes here
        // ...formsComponentRoutes,
      ],
    },
  ],
}

export default {
  dashboard: mainAdminRoutes,
}
