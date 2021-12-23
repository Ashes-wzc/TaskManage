import { createApp } from 'vue'
import App from './App.vue'
// Element-UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Router
import router from './router'
// Chinese
import locale from 'element-plus/es/locale/lang/zh-cn'
import "dayjs/locale/zh-cn"

const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')
