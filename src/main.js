import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/routerSetup'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Run Lucide icon rendering after the app is mounted and DOM is ready
// This ensures icons are rendered for components that are part of the initial render.
// For dynamically loaded components, you might need to re-run lucide.createIcons()
// or integrate Lucide more deeply with Vue.
document.addEventListener('DOMContentLoaded', function () {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})

router.afterEach(() => {
  // This will re-render icons after each route change.
  // It's a pragmatic solution for now. For a more "Vue-native" way,
  // you'd use a dedicated Lucide Vue component.
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})
