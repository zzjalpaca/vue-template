import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import Element from 'element-ui'

import '@/styles/index.scss' // global css

import '@/icons'

Vue.config.productionTip = false

Vue.use(Element, { size: 'mini', zIndex: 3000 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
