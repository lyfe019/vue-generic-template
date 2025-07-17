// src/components/feedback/index.js

// Import individual components from their respective files
import Alert from './Alert.vue'
// import ConfirmationDialog from './ConfirmationDialog.vue'
import Toast from './Toast.vue'
import ToastContainer from './ToastContainer.vue'
// import Tooltip from './Tooltip.vue'
// import ValidationMessage from './ValidationMessage.vue' // As per our re-categorization

// Re-export them
export {
  Alert,
  /**  ConfirmationDialog */ Toast,
  ToastContainer /**  Tooltip, ValidationMessage */,
}

// Optionally, you can also export them individually if you prefer
// export { default as Alert } from './Alert.vue';
// export { default as ConfirmationDialog } from './ConfirmationDialog.vue';
// export { default as Toast } from './Toast.vue';
// export { default as ToastContainer } from './ToastContainer.vue';
// export { default as Tooltip } from './Tooltip.vue';
// export { default as ValidationMessage } from './ValidationMessage.vue';
