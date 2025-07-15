import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('message', () => {
  const messageText = ref('')
  const messageType = ref('info') // e.g., 'info', 'success', 'warning', 'error'
  const isMessageVisible = ref(false)
  let timeoutId = null

  function setMessage(text, type = 'info', duration = 3000) {
    messageText.value = text
    messageType.value = type
    isMessageVisible.value = true

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      clearMessage()
    }, duration)
  }

  function clearMessage() {
    messageText.value = ''
    isMessageVisible.value = false
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return { messageText, messageType, isMessageVisible, setMessage, clearMessage }
})
