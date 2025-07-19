// src/router/components/forms.component.routes.js

// Import component showcase views for the forms category
import QuantityStepperShowcase from '@/views/ui-components/forms/QuantityStepperShowcase.vue'
import RangeSliderShowcase from '@/views/ui-components/forms/RangeSliderShowcase.vue'
import RichTextEditorShowcase from '@/views/ui-components/forms/RichTextEditorShowcase.vue'
import DatePickerShowcase from '@/views/ui-components/forms/DatePickerShowcase.vue'
import FileUploaderShowcase from '@/views/ui-components/forms/FileUploaderShowcase.vue' // NEW: Import FileUploaderShowcase

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
    path: 'forms/date-picker',
    name: 'ComponentShowcaseDatePicker',
    component: DatePickerShowcase,
    meta: { requiresAuth: true, title: 'Date Picker Showcase' },
  },
  {
    path: 'forms/file-uploader', // NEW: Path for FileUploader showcase
    name: 'ComponentShowcaseFileUploader', // NEW: Name for FileUploader showcase
    component: FileUploaderShowcase, // NEW: FileUploaderShowcase component
    meta: { requiresAuth: true, title: 'File Uploader Showcase' },
  },
  // Add other forms component routes here as they are developed
]

export default formsComponentRoutes
