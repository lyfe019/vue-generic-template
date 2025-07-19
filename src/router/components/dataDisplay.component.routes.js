// src/router/components/dataDisplay.component.routes.js

// Import component showcase views for the dataDisplay category
import CardShowcase from '@/views/ui-components/dataDisplay/CardShowcase.vue'

const dataDisplayComponentRoutes = [
  {
    path: 'dataDisplay/cards',
    name: 'ComponentShowcaseCards',
    component: CardShowcase,
    meta: { requiresAuth: true, title: 'Cards Showcase' },
  },
  // Add other dataDisplay component routes here as they are developed
]

export default dataDisplayComponentRoutes
