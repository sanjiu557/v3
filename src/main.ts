import { createApp } from 'vue'
import Ele from 'element-plus'
import App from './App.vue'
import Modal from 'S/utils/DefineModal'
import Router from 'S/routes'
import './style.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)



import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.directive('highlight',(el)=>{
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block:HTMLElement)=>{
      hljs.highlightElement(block)
  })
})

app.component('Modal', Modal)
app.use(Router).use(pinia).use(Ele).mount('#app')
