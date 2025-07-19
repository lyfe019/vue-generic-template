// src/router/components/dataDisplay.component.routes.js

// Import component showcase views for the dataDisplay category
import CardShowcase from '@/views/ui-components/dataDisplay/CardShowcase.vue'
import CarouselShowcase from '@/views/ui-components/dataDisplay/CarouselShowcase.vue'
import ChartShowcase from '@/views/ui-components/dataDisplay/ChartShowcase.vue'
import CommentShowcase from '@/views/ui-components/dataDisplay/CommentShowcase.vue' // NEW: Import CommentShowcase

const dataDisplayComponentRoutes = [
  {
    path: 'dataDisplay/cards',
    name: 'ComponentShowcaseCards',
    component: CardShowcase,
    meta: { requiresAuth: true, title: 'Cards Showcase' },
  },
  {
    path: 'dataDisplay/carousel',
    name: 'ComponentShowcaseCarousel',
    component: CarouselShowcase,
    meta: { requiresAuth: true, title: 'Carousel Showcase' },
  },
  {
    path: 'dataDisplay/charts',
    name: 'ComponentShowcaseCharts',
    component: ChartShowcase,
    meta: { requiresAuth: true, title: 'Charts Showcase' },
  },
  {
    path: 'dataDisplay/comments', // NEW: Path for Comment showcase
    name: 'ComponentShowcaseComments', // NEW: Name for Comment showcase
    component: CommentShowcase, // NEW: CommentShowcase component
    meta: { requiresAuth: true, title: 'Comments Showcase' },
  },
  // Add other dataDisplay component routes here as they are developed
]

export default dataDisplayComponentRoutes
