import { createApp } from 'vue'
import { createPinia } from 'pinia' // Make sure this is imported
import App from './App.vue'
import router from './router' // Assuming your router is in src/router/index.js now

import '@/assets/css/main.css' // Ensure your global CSS is imported

const app = createApp(App)

app.use(createPinia()) // This line is crucial for Pinia initialization
app.use(router)

app.mount('#app')
