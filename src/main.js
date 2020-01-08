import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import Element from 'element-ui'

import '@/styles/index.scss' // global css

import '@/icons'
import api from './api'
import './permission'

Vue.config.productionTip = false
Vue.prototype.$http = api // 将api挂载到vue的原型上

// 可以修改element-ui 组件的大小
Vue.use(Element, { size: 'mini', zIndex: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
