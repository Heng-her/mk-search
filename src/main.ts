import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Start in dark mode
document.documentElement.classList.add('dark')

createApp(App).use(router).mount('#app')