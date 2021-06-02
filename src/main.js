import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/axios.js'
import './plugins/vant.js'

import "./assets/css/base.css";
import "./assets/css/main.css";
import store from './store'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

window.vm = vm