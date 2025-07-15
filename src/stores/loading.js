import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false)
  const loadingCount = ref(0) // To handle multiple concurrent loading states

  function startLoading() {
    loadingCount.value++
    isLoading.value = true
  }

  function stopLoading() {
    if (loadingCount.value > 0) {
      loadingCount.value--
    }
    if (loadingCount.value === 0) {
      isLoading.value = false
    }
  }

  // Getter is automatically exposed by ref/computed, but explicit could be:
  // const getIsLoading = computed(() => isLoading.value)

  return { isLoading, startLoading, stopLoading }
})
