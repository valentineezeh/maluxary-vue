import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FontAwesomeIcon from '@/assets/fontawesome-icons'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
