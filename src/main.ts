import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FontAwesomeIcon from '@/assets/fontawesome-icons'
// import { useStore } from './stores'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
app.use(pinia)
app.use(router)

// const store = useStore();


app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')

// store.initializeStore().then(() => {
//   app.mount('#app')
// })
