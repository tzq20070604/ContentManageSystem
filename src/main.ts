import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.ts'

const app = createApp(App)
app.use(ElementPlus)

const pinia = createPinia()
// 使用持久化插件，并配置需要持久化的状态路径
pinia.use(
  createPersistedState({
    storage: window.localStorage // 使用 localStorage 进行存储
  })
)
app.use(pinia)
app.use(router)
app.mount('#app')
