// src/stores/toastStore.js
import { reactive } from 'vue'

// A simple global store for managing toasts
const toastState = reactive({
  toasts: [],
  idCounter: 0,
})

/**
 * Adds a new toast notification.
 * @param {object} options - Toast options.
 * @param {string} options.message - The message to display.
 * @param {'success'|'error'|'warning'|'info'} [options.type='info'] - Type of toast.
 * @param {number} [options.duration=3000] - Duration in ms (0 for permanent).
 * @param {boolean} [options.dismissible=true] - Whether the toast can be manually dismissed.
 * @param {'top-right'|'top-center'|'bottom-left'} [options.position='top-right'] - Where the toast should appear.
 */
function addToast(options) {
  const newToast = {
    // Generate a unique ID that Vue can use for keying and tracking removals
    id: `toast-${toastState.idCounter++}-${Date.now()}`,
    message: options.message,
    type: options.type || 'info',
    duration: options.duration !== undefined ? options.duration : 3000,
    dismissible: options.dismissible !== undefined ? options.dismissible : true,
    position: options.position || 'top-right',
  }
  toastState.toasts.push(newToast)
}

/**
 * Removes a toast notification by its ID.
 * This function is called by the Toast component itself when it finishes its hide animation.
 * @param {string} id - The ID of the toast to remove.
 */
function removeToast(id) {
  toastState.toasts = toastState.toasts.filter((toast) => toast.id !== id)
}

export { toastState, addToast, removeToast }
