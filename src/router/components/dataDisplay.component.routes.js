// src/router/components/dataDisplay.component.routes.js

// Import component showcase views for the dataDisplay category
import CardShowcase from '@/views/ui-components/dataDisplay/CardShowcase.vue'
import CarouselShowcase from '@/views/ui-components/dataDisplay/CarouselShowcase.vue' // NEW: Import CarouselShowcase

const dataDisplayComponentRoutes = [
  {
    path: 'dataDisplay/cards',
    name: 'ComponentShowcaseCards',
    component: CardShowcase,
    meta: { requiresAuth: true, title: 'Cards Showcase' },
  },
  {
    path: 'dataDisplay/carousel', // NEW: Path for Carousel showcase
    name: 'ComponentShowcaseCarousel', // NEW: Name for Carousel showcase
    component: CarouselShowcase, // NEW: CarouselShowcase component
    meta: { requiresAuth: true, title: 'Carousel Showcase' },
  },
  // Add other dataDisplay component routes here as they are developed
]

export default dataDisplayComponentRoutes
