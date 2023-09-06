import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dayjs from 'dayjs'

import Vant from 'vant'
import 'vant/lib/index.css'
import relativeTime from 'dayjs/plugin/relativeTime'
// 导入插件
import Geek from '@/components'
dayjs.extend(relativeTime)
Vue.use(Geek)

Vue.config.productionTip = false
Vue.use(Vant)
// 使用插件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
