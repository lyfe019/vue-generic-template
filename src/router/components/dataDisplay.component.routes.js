// src/router/components/dataDisplay.component.routes.js

// Import component showcase views for the dataDisplay category
import CardShowcase from '@/views/ui-components/dataDisplay/CardShowcase.vue'
import CarouselShowcase from '@/views/ui-components/dataDisplay/CarouselShowcase.vue'
import ChartShowcase from '@/views/ui-components/dataDisplay/ChartShowcase.vue'
import CommentShowcase from '@/views/ui-components/dataDisplay/CommentShowcase.vue'
import DataTableShowcase from '@/views/ui-components/dataDisplay/TableShowcase.vue'
import FeedShowcase from '@/views/ui-components/dataDisplay/FeedShowcase.vue' // NEW: Import FeedShowcase

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
    path: 'dataDisplay/comments',
    name: 'ComponentShowcaseComments',
    component: CommentShowcase,
    meta: { requiresAuth: true, title: 'Comments Showcase' },
  },
  {
    path: 'dataDisplay/data-table',
    name: 'ComponentShowcaseDataTable',
    component: DataTableShowcase,
    meta: { requiresAuth: true, title: 'Data Table Showcase' },
  },
  {
    path: 'dataDisplay/feed', // NEW: Path for Feed showcase
    name: 'ComponentShowcaseFeed', // NEW: Name for Feed showcase
    component: FeedShowcase, // NEW: FeedShowcase component
    meta: { requiresAuth: true, title: 'Feed Components Showcase' },
  },
  // Add other dataDisplay component routes here as they are developed
]

export default dataDisplayComponentRoutes
