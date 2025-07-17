// src/composables/useToast.js
// No longer needs 'inject', directly imports from the store
import { addToast } from '@/stores/toastStore'

/**
 * Composable to trigger global toast notifications.
 * It provides a function to add a toast to the central toast store.
 *
 * @returns {function(object): void} A function to add a toast notification.
 * The function accepts an object with properties:
 * {
 * message: string,
 * type?: 'success' | 'error' | 'warning' | 'info',
 * duration?: number, // in ms, 0 for permanent
 * dismissible?: boolean,
 * position?: 'top-right' | 'top-center' | 'bottom-left'
 * }
 */
export function useToast() {
  // Directly return the addToast function from the store
  return addToast
}
