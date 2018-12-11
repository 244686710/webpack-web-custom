import Vue from 'vue'
// import FastClick from 'fastclick'
import App from './App'
// import router from './router'
import './index'

Vue.config.productionTip = false
// FastClick.attach(document.body) // vue移动端使用click
// Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
