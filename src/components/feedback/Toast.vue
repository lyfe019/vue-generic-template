<template>
  <div
    :class="[
      'toast min-w-[250px] max-w-[400px] p-4 rounded-lg shadow-md flex items-start gap-3',
      typeClass,
      { show: isVisible, hide: isHiding },
    ]"
    :role="type === 'error' ? 'alert' : 'status'"
    @transitionend="handleTransitionEnd"
  >
    <div class="flex-shrink-0">
      <Icon :name="iconName" :class="iconClass" class="w-5 h-5" />
    </div>
    <div class="flex-1">
      <p class="font-medium text-sm">{{ title }}</p>
      <p class="text-xs opacity-90">{{ message }}</p>
    </div>
    <button
      v-if="dismissible"
      @click="dismiss"
      type="button"
      :class="['flex-shrink-0 toast-close-button', closeButtonClass]"
      aria-label="Close notification"
    >
      <Icon name="x" class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon component is available

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'info', // 'success', 'error', 'warning', 'info'
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  duration: {
    type: Number,
    default: 3000, // Duration in milliseconds, 0 for permanent
  },
  dismissible: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['dismiss'])

const isVisible = ref(false)
const isHiding = ref(false)
let dismissTimeout = null

// Computed properties for dynamic classes and content
const typeClass = computed(() => {
  return `toast-${props.type}`
})

const iconName = computed(() => {
  switch (props.type) {
    case 'success':
      return 'check-circle'
    case 'error':
      return 'x-circle'
    case 'warning':
      return 'alert-triangle'
    case 'info':
      return 'info'
    default:
      return 'info'
  }
})

const iconClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-500'
    case 'error':
      return 'text-red-500'
    case 'warning':
      return 'text-yellow-500'
    case 'info':
      return 'text-blue-500'
    default:
      return ''
  }
})

const title = computed(() => {
  switch (props.type) {
    case 'success':
      return 'Success!'
    case 'error':
      return 'Error!'
    case 'warning':
      return 'Warning!'
    case 'info':
      return 'Info'
    default:
      return 'Notification'
  }
})

const closeButtonClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-500 hover:bg-green-100'
    case 'error':
      return 'text-red-500 hover:bg-red-100'
    case 'warning':
      return 'text-yellow-500 hover:bg-yellow-100'
    case 'info':
      return 'text-blue-500 hover:bg-blue-100'
    default:
      return ''
  }
})

const dismiss = () => {
  clearTimeout(dismissTimeout)
  isHiding.value = true
}

const handleTransitionEnd = () => {
  if (isHiding.value) {
    emit('dismiss', props.id)
  }
}

onMounted(() => {
  // Trigger show animation
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  // Set auto-dismissal if duration is specified and greater than 0
  if (props.duration > 0) {
    dismissTimeout = setTimeout(() => {
      dismiss()
    }, props.duration)
  }
})
</script>

<style scoped>
/* Individual Toast Style */
.toast {
  opacity: 0;
  transform: translateY(-20px); /* Initial position for slide-in */
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out,
    height 0.3s ease-out,
    margin 0.3s ease-out;
  pointer-events: auto; /* Re-enable pointer events for the toast itself */
}

/* Toast entry animation */
.toast.show {
  opacity: 1;
  transform: translateY(0);
}

/* Toast exit animation */
.toast.hide {
  opacity: 0;
  transform: translateY(-20px);
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  height: 0; /* Collapse height */
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden; /* Prevent content from showing during collapse */
}

/* Toast type colors */
.toast-success {
  background-color: #ecfdf5;
  border: 1px solid #34d399;
  color: #065f46;
}
.toast-error {
  background-color: #fef2f2;
  border: 1px solid #f87171;
  color: #991b1b;
}
.toast-warning {
  background-color: #fffbeb;
  border: 1px solid #fcd34d;
  color: #92400e;
}
.toast-info {
  background-color: #eff6ff;
  border: 1px solid #60a5fa;
  color: #1e40af;
}

.toast-close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 9999px; /* rounded-full */
  transition: background-color 0.2s;
}

/* Specific button hover colors are handled by computed props and inline classes */
</style>
