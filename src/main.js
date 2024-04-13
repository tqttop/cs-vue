import { createApp } from 'vue'
import {createPinia} from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import router from './router'
import App from "@/App.vue";



const app = createApp(App)
app.use(createPinia().use(persist))
app.use(router)
app.mount('#app')

