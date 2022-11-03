import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 按需引入Vant组件
// import { Toast } from 'vant'
import "vant/lib/index.css"

import SvgIcon from './components/svgIcon/SvgIcon.vue'
import './assets/svg/iconfont'
import './assets/lv_svg/iconfont'

import './assets/main.css'
import dir from '@/directive/index'

const app = createApp(App)

app.config.warnHandler = () => null

app.directive('stopReClick',dir.stopReClick)

app.use(createPinia())
app.use(router)

// 注册Vant组件
// app.use( Toast )

app.component('SvgIcon', SvgIcon);
app.mount('#app')
