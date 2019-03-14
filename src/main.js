import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createRouter } from './router'

// import DoughnutStatistics from './components/Statistics/DoughnutStatistics.vue'

// Vue.component('doughnut-statistics', DoughnutStatistics)

// import DoughnutChart from './components/DoughnutChart.vue'
// Vue.component('doughnut-chart', DoughnutChart)

Vue.config.productionTip = false


const router =  createRouter()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


//https://keenthemes.com/keen/preview/demo2/dashboards/aside-navy.html