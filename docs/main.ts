import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import '@p/css/main.scss'
import init from '@p/js/init'
import { createPinia } from 'pinia'

init()

createApp(App).use(Router).use(createPinia()).mount('#app')
