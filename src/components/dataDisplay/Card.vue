<template>
  <div
    :class="[
      'p-6 rounded-xl shadow-md',
      bgColorClass,
      textColorClass,
      borderClass,
      'flex',
      flexDirectionClass,
      itemsAlignmentClass,
      justifyContentClass,
      spaceClass,
    ]"
  >
    <!-- Icon or Image Slot -->
    <div
      v-if="icon || imageUrl"
      :class="[
        'flex-shrink-0',
        iconBgClass,
        iconColorClass,
        'rounded-full',
        iconPaddingClass,
        { 'mb-4': flexDirectionClass === 'flex-col' },
      ]"
    >
      <Icon v-if="icon" :name="icon" :class="iconSizeClass" />
      <img v-else-if="imageUrl" :src="imageUrl" :alt="imageAlt" :class="imageShapeClass" />
    </div>

    <div
      :class="[
        'flex-1',
        { 'ml-4': flexDirectionClass === 'flex-row' && (icon || imageUrl) },
        { 'text-center': textCenter },
      ]"
    >
      <!-- Title -->
      <h3 :class="['font-semibold mb-1', titleSizeClass, titleColorClass]">
        {{ title }}
      </h3>

      <!-- Subtitle/Description -->
      <p :class="['text-sm mb-3', descriptionColorClass]">
        {{ description }}
      </p>

      <!-- Optional Value/Progress Display -->
      <div v-if="value" class="mb-2">
        <p :class="['font-bold', valueSizeClass, valueColorClass]">{{ value }}</p>
        <div
          v-if="progressBarValue !== null && progressBarValue !== undefined"
          class="w-full bg-gray-200 rounded-full h-2.5 mt-1"
        >
          <div
            :class="['h-2.5 rounded-full', progressBarColorClass]"
            :style="{ width: `${progressBarValue}%` }"
          ></div>
        </div>
        <p v-if="progressText" :class="['text-xs mt-1', progressTextColorClass]">
          {{ progressText }}
        </p>
      </div>

      <!-- Additional Content Slot -->
      <slot></slot>

      <!-- Action Button Slot -->
      <div
        v-if="$slots.actions"
        :class="['mt-auto', 'flex', buttonFlexClass, buttonJustifyClass, buttonSpaceClass]"
      >
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon component is available

const props = defineProps({
  // General Card Props
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: 'white', // Tailwind colors: 'white', 'yellow-50', 'blue-100', etc.
  },
  textColor: {
    type: String,
    default: 'gray-800',
  },
  borderColor: {
    type: String,
    default: '', // e.g., 'yellow-200'
  },
  flexDirection: {
    type: String,
    default: 'flex-col', // 'flex-col' or 'flex-row'
    validator: (value) => ['flex-col', 'flex-row'].includes(value),
  },
  alignItems: {
    type: String,
    default: 'items-center', // For flex-col: items-start, items-center, items-end
    validator: (value) => ['items-start', 'items-center', 'items-end'].includes(value),
  },
  justifyContent: {
    type: String,
    default: 'justify-start', // For flex-col: justify-start, justify-center, justify-between
    validator: (value) => ['justify-start', 'justify-center', 'justify-between'].includes(value),
  },
  gap: {
    type: String,
    default: 'space-y-4', // Tailwind spacing classes: 'space-y-4', 'space-x-4'
  },
  textCenter: {
    type: Boolean,
    default: false,
  },

  // Icon/Image Props
  icon: {
    type: String, // Lucide icon name, e.g., 'truck', 'tag', 'trending-up', 'alert-triangle'
    default: '',
  },
  iconSize: {
    type: String,
    default: 'w-6 h-6',
  },
  iconBgColor: {
    type: String,
    default: '', // e.g., 'blue-100'
  },
  iconColor: {
    type: String,
    default: '', // e.g., 'blue-600'
  },
  iconPadding: {
    type: String,
    default: 'p-3',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  imageAlt: {
    type: String,
    default: 'Card image',
  },
  imageShape: {
    type: String,
    default: 'w-32 h-32 object-cover rounded-full mb-4 shadow-sm', // Tailwid classes for image size, shape, shadow
  },

  // Progress Bar / Value Props
  value: {
    type: [String, Number],
    default: null,
  },
  valueSize: {
    type: String,
    default: 'text-3xl',
  },
  valueColor: {
    type: String,
    default: 'text-gray-900',
  },
  progressBarValue: {
    type: Number, // Percentage 0-100
    default: null,
  },
  progressBarColor: {
    type: String,
    default: 'bg-indigo-600',
  },
  progressText: {
    type: String,
    default: '',
  },
  progressTextColor: {
    type: String,
    default: 'text-gray-500',
  },

  // Button Slot Alignment
  buttonFlex: {
    type: String,
    default: 'flex',
  },
  buttonJustify: {
    type: String,
    default: 'justify-center',
  },
  buttonSpace: {
    type: String,
    default: 'space-x-0',
  },
})

const bgColorClass = computed(() => `bg-${props.bgColor}`)
const textColorClass = computed(() => `text-${props.textColor}`)
const borderClass = computed(() => (props.borderColor ? `border border-${props.borderColor}` : ''))
const flexDirectionClass = computed(() => props.flexDirection)
const itemsAlignmentClass = computed(() => props.alignItems)
const justifyContentClass = computed(() => props.justifyContent)
const spaceClass = computed(() => props.gap)

const iconBgClass = computed(() => (props.iconBgColor ? `bg-${props.iconBgColor}` : ''))
const iconColorClass = computed(() => (props.iconColor ? `text-${props.iconColor}` : ''))
const iconPaddingClass = computed(() => props.iconPadding)
const iconSizeClass = computed(() => props.iconSize)

const imageShapeClass = computed(() => props.imageShape)

const titleSizeClass = computed(() => 'text-lg') // Standardized for these cards
const titleColorClass = computed(() =>
  props.textColor ? `text-${props.textColor}` : 'text-gray-900',
)
const descriptionColorClass = computed(() =>
  props.textColor ? `text-${props.textColor}` : 'text-gray-600',
)

const valueSizeClass = computed(() => props.valueSize)
const valueColorClass = computed(() => props.valueColor)
const progressBarColorClass = computed(() => props.progressBarColor)
const progressTextColorClass = computed(() => props.progressTextColor)

const buttonFlexClass = computed(() => props.buttonFlex)
const buttonJustifyClass = computed(() => props.buttonJustify)
const buttonSpaceClass = computed(() => props.buttonSpace)
</script>

<style scoped>
/* No specific scoped styles needed, Tailwind CSS handles layout and styling. */
/* The "no-scrollbar" class is not directly used by this component's structure,
   but it's good to keep in mind for parent elements if needed. */
</style>
