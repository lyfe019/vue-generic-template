// import DashboardLayout from '@/layouts/admin/DashboardLayout.vue' // Future: Uncomment when layouts are implemented
// import GenericPlaceholder from '@/views/admin/GenericPlaceholder.vue' // Future: Uncomment when placeholder view is used

// Placeholder imports for feature-specific admin routes - will be uncommented as features are built
// import studentAssignmentRoutes from '@/features/assignments/routes/client/assignment.client.routes'
// import userRoutes from '@/features/user/routes/admin/user.admin.routes'
// import courseRoutes from '@/features/course/routes/admin/course.admin.routes'
// import assignmentRoutes from '@/features/assignments/routes/admin/assignment.admin.routes'
// import submissionRoutes from '@/features/submission/routes/admin/submission.admin.routes'
// import instructorRoutes from '@/features/instructor/routes/admin/instructor.admin.routes'
// import enrollmentRoutes from '@/features/enrollment/routes/admin/enrollment.admin.routes'

const mainAdminRoutes = {
  dashboard: {
    path: '/admin',
    // component: DashboardLayout, // Future: Uncomment and import DashboardLayout
    component: () => import('@/layouts/admin/DashboardLayout.vue'), // Lazy load DashboardLayout
    children: [
      {
        path: '', // Default route for /admin
        name: 'AdminDashboard',
        component: () => import('@/views/admin/DashboardView.vue'), // Lazy load DashboardView
        // meta: { requiresAuth: true }, // Will be active once auth logic is fully ready
      },
      // NEW: Professional Dashboards - Placeholder routes, components will be created later
      {
        path: 'dashboards/warehouse',
        name: 'WarehouseDashboard',
        component: () => import('@/views/admin/GenericPlaceholder.vue'), // Using GenericPlaceholder for now
        meta: { requiresAuth: true },
      },
      // Route for UI Components -> Badges
      {
        path: 'ui-components/badges',
        name: 'UIComponentsBadges',
        component: () => import('@/views/admin/GenericPlaceholder.vue'), // Using GenericPlaceholder for now
        meta: { requiresAuth: true },
      },
      {
        path: 'ui-components/alerts',
        name: 'UIComponentsAlerts',
        component: () => import('@/views/admin/GenericPlaceholder.vue'), // Using GenericPlaceholder for now
        meta: { requiresAuth: true },
      },
      // Route for UI Components -> Accordions
      {
        path: 'ui-components/accordions',
        name: 'UIComponentsAccordions',
        component: () => import('@/views/admin/GenericPlaceholder.vue'), // Using GenericPlaceholder for now
        meta: { requiresAuth: true },
      },
      // Add other feature-specific routes as children here
      // For example, when you create userRoutes, you would spread them here:
      // ...userRoutes.admin,
      // ...courseRoutes.admin,
      // etc.
    ],
  },
  // If you have other top-level admin routes that don't use DashboardLayout, they would go here
  // outside the 'dashboard' object.
}

export default mainAdminRoutes
