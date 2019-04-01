import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);


import { createRouter } from './router'


Vue.config.productionTip = false


const router =  createRouter()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


//https://keenthemes.com/keen/preview/demo2/dashboards/aside-navy.html