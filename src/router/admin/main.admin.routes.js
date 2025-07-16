// Import the actual layouts and placeholder views
import DashboardLayout from '@/layouts/admin/DashboardLayout.vue'
import HomeView from '@/views/HomeView.vue' // Used for root path
import AuthLogin from '@/views/auth/AuthLogin.vue' // Used for auth login
import NotFound from '@/views/NotFound.vue' // Used for 404

// Admin-specific views
import AdminDashboardView from '@/views/admin/DashboardView.vue'
import GenericPlaceholder from '@/views/admin/GenericPlaceholder.vue'

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
    component: DashboardLayout, // Use the actual DashboardLayout
    children: [
      {
        path: '', // Default route for /admin
        name: 'AdminDashboard',
        component: AdminDashboardView, // Use the actual AdminDashboardView
        // meta: { requiresAuth: true }, // Will be active once auth logic is fully ready
      },
      // NEW: Professional Dashboards - Pointing to specific placeholder views
      {
        path: 'dashboards/warehouse',
        name: 'WarehouseDashboard',
        component: () => import('@/views/admin/dashboards/WarehouseDashboard.vue'), // Lazy load specific placeholder
        meta: { requiresAuth: true },
      },
      // Route for UI Components -> Badges
      {
        path: 'ui-components/badges',
        name: 'UIComponentsBadges',
        component: () => import('@/views/ui-components/BadgesShowcase.vue'), // Lazy load specific placeholder
        // meta: { requiresAuth: true },
      },
      {
        path: 'ui-components/alerts',
        name: 'UIComponentsAlerts',
        component: () => import('@/views/ui-components/AlertsShowcase.vue'), // Lazy load specific placeholder
        // meta: { requiresAuth: true },
      },
      // Route for UI Components -> Accordions
      {
        path: 'ui-components/accordions',
        name: 'UIComponentsAccordions',
        component: () => import('@/views/ui-components/AccordionsShowcase.vue'), // Lazy load specific placeholder
        meta: { requiresAuth: true },
      },
      // Inventory Routes
      {
        path: 'inventory/current-stock',
        name: 'CurrentStock',
        component: () => import('@/views/admin/inventory/CurrentStock.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory/add-product',
        name: 'AddProduct',
        component: () => import('@/views/admin/inventory/AddProduct.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'inventory/adjustments',
        name: 'StockAdjustments',
        component: () => import('@/views/admin/inventory/Adjustments.vue'),
        meta: { requiresAuth: true },
      },
      // Orders Routes
      {
        path: 'orders/pending',
        name: 'PendingOrders',
        component: () => import('@/views/admin/orders/PendingOrders.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders/completed',
        name: 'CompletedOrders',
        component: () => import('@/views/admin/orders/CompletedOrders.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders/new',
        name: 'NewOrder',
        component: () => import('@/views/admin/orders/NewOrder.vue'),
        meta: { requiresAuth: true },
      },
      // Settings Route
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/SettingsView.vue'),
        meta: { requiresAuth: true },
      },
      // Add other feature-specific routes as children here
      // For example, when you create userRoutes, you would spread them here:
      // ...userRoutes.admin,
      // ...courseRoutes.admin,
      // etc.
    ],
  },
  // Any other top-level routes (e.g., public routes like home, auth) can go here
}

export default mainAdminRoutes
