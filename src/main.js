import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 汉化
import locale from 'element-plus/es/locale/lang/zh-cn'
import "dayjs/locale/zh-cn"
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus, { locale })
app.mount('#app')
