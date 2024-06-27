import { createApp } from 'vue'
import App from './App.vue'

import './assets/style.css'

/* 引入 router */
import router from './router/router'

/* 引入 验证码 */
import SIdentify from './components/SIdentify.vue'

/* 引入 ElementPlus */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import echarts from "./echart/index.js";

/* 引入 vuex */
import store from './store/store.js'

const app = createApp(App)
app.use(echarts)//echarts
app.use(router)//使用路由
app.use(SIdentify)//验证码组件
app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(store)
app.mount('#app')
