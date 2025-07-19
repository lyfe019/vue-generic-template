// src/router/components/forms.component.routes.js

// Import component showcase views for the forms category
import QuantityStepperShowcase from '@/views/ui-components/forms/QuantityStepperShowcase.vue'

const formsComponentRoutes = [
  {
    path: 'forms/quantity-stepper', // Path for QuantityStepper showcase
    name: 'ComponentShowcaseQuantityStepper',
    component: QuantityStepperShowcase,
    meta: { requiresAuth: true, title: 'Quantity Stepper Showcase' },
  },
  // Add other forms component routes here as they are developed
]

export default formsComponentRoutes
