import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import pinia from "./stores/store.ts"
import './router/permissions.ts'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
