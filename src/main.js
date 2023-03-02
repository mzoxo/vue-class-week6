import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'

import App from './App.vue'
import router from './router'

import './assets/all.scss'
import 'vue-loading-overlay/dist/css/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.component('VueLoading', Loading)
app.mount('#app')
