// src/router/components/forms.component.routes.js

// Import component showcase views for the forms category
import QuantityStepperShowcase from '@/views/ui-components/forms/QuantityStepperShowcase.vue'
import RangeSliderShowcase from '@/views/ui-components/forms/RangeSliderShowcase.vue'
import RichTextEditorShowcase from '@/views/ui-components/forms/RichTextEditorShowcase.vue'
import DatePickerShowcase from '@/views/ui-components/forms/DatePickerShowcase.vue'
import FileUploaderShowcase from '@/views/ui-components/forms/FileUploaderShowcase.vue'
import SelectionControlShowcase from '@/views/ui-components/forms/SelectionControlShowcase.vue'
import TextInputShowcase from '@/views/ui-components/forms/TextInputShowcase.vue' // NEW: Import TextInputShowcase

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
    path: 'forms/file-uploader',
    name: 'ComponentShowcaseFileUploader',
    component: FileUploaderShowcase,
    meta: { requiresAuth: true, title: 'File Uploader Showcase' },
  },
  {
    path: 'forms/selection-control',
    name: 'ComponentShowcaseSelectionControl',
    component: SelectionControlShowcase,
    meta: { requiresAuth: true, title: 'Selection Control Showcase' },
  },
  {
    path: 'forms/text-input', // NEW: Path for TextInput showcase
    name: 'ComponentShowcaseTextInput', // NEW: Name for TextInput showcase
    component: TextInputShowcase, // NEW: TextInputShowcase component
    meta: { requiresAuth: true, title: 'Text Input Showcase' },
  },
  // Add other forms component routes here as they are developed
]

export default formsComponentRoutes
