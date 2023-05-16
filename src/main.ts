import { createApp } from 'vue'
import Ele from 'element-plus'
import App from './App.vue'
import Router from 'S/routes'
import './style.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import 'element-plus/dist/index.css'
import {createPinia} from 'pinia'
const pinia  =createPinia()

createApp(App).use(Router).use(pinia).use(Ele).mount('#app')
