import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)
app.mount('#app')
app.use(Antd)
app.config.productionTip = false