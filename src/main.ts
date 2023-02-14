import { createSSRApp } from 'vue'
import { piniaInstall } from '@/stores'
import './index.css'

import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(piniaInstall)
  return {
    app,
  }
}
