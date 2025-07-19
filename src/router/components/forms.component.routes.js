// src/router/components/forms.component.routes.js

// Import component showcase views for the forms category
import QuantityStepperShowcase from '@/views/ui-components/forms/QuantityStepperShowcase.vue'
import RangeSliderShowcase from '@/views/ui-components/forms/RangeSliderShowcase.vue'
import RichTextEditorShowcase from '@/views/ui-components/forms/RichTextEditorShowcase.vue'
import DatePickerShowcase from '@/views/ui-components/forms/DatePickerShowcase.vue' // NEW: Import DatePickerShowcase

const formsComponentRoutes = [
  {
    path: 'forms/quantity-stepper',
    name: 'ComponentShowcaseQuantityStepper',
    component: QuantityStepperShowcase,
    meta: { requiresAuth: true, title: 'Quantity Stepper Showcase' },
  },
  {
    path: 'forms/range-slider',
    name: 'ComponentShowcaseRangeSlider',
    component: RangeSliderShowcase,
    meta: { requiresAuth: true, title: 'Range Slider Showcase' },
  },
  {
    path: 'forms/rich-text-editor',
    name: 'ComponentShowcaseRichTextEditor',
    component: RichTextEditorShowcase,
    meta: { requiresAuth: true, title: 'Rich Text Editor Showcase' },
  },
  {
    path: 'forms/date-picker', // NEW: Path for DatePicker showcase
    name: 'ComponentShowcaseDatePicker', // NEW: Name for DatePicker showcase
    component: DatePickerShowcase, // NEW: DatePickerShowcase component
    meta: { requiresAuth: true, title: 'Date Picker Showcase' },
  },
  // Add other forms component routes here as they are developed
]

export default formsComponentRoutes
