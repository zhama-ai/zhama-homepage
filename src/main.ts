import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

createApp(App)
  .use(MotionPlugin)
  .use(router)
  .use(i18n)
  .mount('#app')
