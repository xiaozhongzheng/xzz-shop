import { createSSRApp } from 'vue'
import pinia from './stores'
import vant from 'vant'
import 'vant/lib/index.css' // 引入样式文件

import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)

  app.use(pinia)
  app.use(vant)
  return {
    app,
  }
}
