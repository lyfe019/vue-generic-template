<template>
  <div class="border border-gray-200 rounded-lg divide-y divide-gray-200">
    <AccordionItem
      v-for="(item, index) in items"
      :key="index"
      :title="item.title"
      :model-value="openStates[index]"
      @update:model-value="(newValue) => handleToggle(index, newValue)"
      :icon="item.icon || defaultIcon"
      :icon-rotate-type="item.iconRotateType || defaultIconRotateType"
    >
      <template #content>
        <div v-html="item.content"></div>
        <!-- Render HTML content directly -->
      </template>
    </AccordionItem>
  </div>
</template>

<script setup>
// CORRECTED: Added 'computed' to the import list from 'vue'
import { ref, watch, onMounted, computed } from 'vue'
import AccordionItem from './AccordionItem.vue' // Import the single accordion item

const props = defineProps({
  // Array of accordion items: [{ title: string, content: string, icon?: string, iconRotateType?: string }]
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  // Type of accordion: 'exclusive' (only one open) or 'multi-open' (multiple can be open)
  type: {
    type: String,
    default: 'exclusive',
    validator: (value) => ['exclusive', 'multi-open'].includes(value),
  },
})

// Manage the open state of each accordion item
const openStates = ref(props.items.map(() => false))

// Determine default icon based on type
const defaultIcon = computed(() => {
  return props.type === 'exclusive' ? 'chevron-right' : 'chevron-down'
})

// Determine default icon rotation type based on type
const defaultIconRotateType = computed(() => {
  return props.type === 'exclusive' ? 'rotate' : 'rotate-down'
})

const handleToggle = (index, newValue) => {
  if (props.type === 'exclusive' && newValue) {
    // If exclusive, close all others when one opens
    openStates.value = openStates.value.map((state, i) => (i === index ? newValue : false))
  } else {
    // For multi-open, just toggle the specific one
    openStates.value[index] = newValue
  }
  // Ensure reactivity for the array itself when updating specific index
  openStates.value = [...openStates.value]
}

// Initial setup to open the first item if it's an exclusive accordion
onMounted(() => {
  if (props.type === 'exclusive' && props.items.length > 0) {
    openStates.value[0] = true
  }
})

// Re-initialize openStates if items array changes (e.g., dynamic content)
watch(
  () => props.items,
  () => {
    openStates.value = props.items.map(() => false)
    if (props.type === 'exclusive' && props.items.length > 0) {
      openStates.value[0] = true
    }
  },
)
</script>

<style scoped>
/* No specific scoped CSS for AccordionGroup, as it controls AccordionItem styling via props/global styles. */
</style>
