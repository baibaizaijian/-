import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

// 导入插件
import Geek from '@/components'
Vue.use(Geek)

Vue.config.productionTip = false
Vue.use(Vant)
// 使用插件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
