import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let nextId = 0

  /**
   * Adds a new toast notification.
   * @param {string} message - The message to display.
   * @param {'success'|'error'|'info'|'warning'} type - The type of toast.
   * @param {number} duration - How long the toast should be visible in ms. Use 0 for sticky.
   */
  function addToast(message, type = 'info', duration = 5000) {
    const id = nextId++
    toasts.value.push({ id, message, type, duration })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  /**
   * Removes a toast by its ID.
   * @param {number} id - The ID of the toast to remove.
   */
  function removeToast(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  // Convenience methods
  const success = (message, duration) => addToast(message, 'success', duration)
  const error = (message, duration) => addToast(message, 'error', duration)
  const info = (message, duration) => addToast(message, 'info', duration)
  const warning = (message, duration) => addToast(message, 'warning', duration)

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
})
