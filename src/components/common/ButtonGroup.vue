<template>
  <div :class="['inline-flex rounded-lg shadow-sm', flexDirectionClass]" role="group">
    <slot></slot>
    <!-- Slot for Button components -->
  </div>
</template>

<script setup>
import { computed, useSlots, onMounted, watch } from 'vue'

const props = defineProps({
  // Direction of the button group: 'horizontal' or 'vertical'
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value),
  },
})

const slots = useSlots() // Get access to slots to apply dynamic classes to children

const flexDirectionClass = computed(() => {
  return props.direction === 'vertical' ? 'flex-col' : ''
})

// A function to apply button group specific classes to direct children
const applyButtonGroupClasses = () => {
  if (!slots.default) return

  const children = slots.default()
  if (!children || children.length === 0) return

  children.forEach((vnode, index) => {
    // Only target actual Button components (or plain elements if preferred, but safer to target Buttons)
    // Note: In a real app, if you want to modify child VNodes directly, it's more complex.
    // For this simple case, we rely on CSS descendant selectors, or expect the user to apply base styles.
    // Or, if ButtonGroup *renders* buttons, it would pass these classes.
    // Given the request, we'll make this a CSS-driven group, assuming base Button styles.
    // However, for rounded corners on first/last, we need to explicitly remove/add.
    // This part is tricky with pure slots and direct DOM manipulation after render.
    // The most robust way for Vue components is for the ButtonGroup to
    // render its own buttons based on an array prop, OR use a direct DOM reference
    // and modify children on mounted/updated.
    // Let's stick to the example's original "HTML-like" class application where possible,
    // assuming some manual class overriding or relying on CSS pseudo-classes.
    // A simpler way with Tailwind's approach is to apply general styles to all
    // buttons and then override first/last child via parent styles.
    // Let's assume the default `rounded-lg` on Button.vue is fine, and we just need to
    // remove specific rounded classes for middle buttons. This is hard without direct child control.
    // Reverting to the simpler model where ButtonGroup is just a flex container.
    // The user will need to manage `rounded-l-lg`, `rounded-r-lg` etc. on individual buttons
    // when using this ButtonGroup, as seen in their original HTML.
    // This component will primarily just set the flex direction and basic shared styling like shadow.
  })
}

// Re-evaluate classes when component mounts or children change (if applicable)
onMounted(applyButtonGroupClasses)
// watch(slots, applyButtonGroupClasses, { deep: true }); // Watch for slot changes (may be too heavy)
</script>

<style scoped>
/* Scoped styles to manage rounded corners and borders for grouped buttons */

/* General styles for buttons within a group (override default rounded-lg) */
.inline-flex > :deep(button) {
  border-radius: 0; /* Remove default rounding for all buttons in group */
}

/* Specific rounding for first and last buttons in horizontal group */
.inline-flex > :deep(button:first-child) {
  border-top-left-radius: 0.5rem; /* rounded-l-lg */
  border-bottom-left-radius: 0.5rem;
}
.inline-flex > :deep(button:last-child) {
  border-top-right-radius: 0.5rem; /* rounded-r-lg */
  border-bottom-right-radius: 0.5rem;
}

/* Specific rounding for first and last buttons in vertical group */
.flex-col > :deep(button:first-child) {
  border-top-left-radius: 0.5rem; /* rounded-t-lg */
  border-top-right-radius: 0.5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.flex-col > :deep(button:last-child) {
  border-bottom-left-radius: 0.5rem; /* rounded-b-lg */
  border-bottom-right-radius: 0.5rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

/* Border management for grouped buttons to prevent double borders */
.inline-flex > :deep(button + button) {
  margin-left: -1px; /* Overlap borders horizontally */
}
.flex-col > :deep(button + button) {
  margin-top: -1px; /* Overlap borders vertically */
}
</style>
