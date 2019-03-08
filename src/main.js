import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createRouter } from './router'

// var load = require('load-script')

// load('http://dapi.kakao.com/v2/maps/sdk.js?appkey=a2ebbeb486802e2210128b28e3403190', function (err, script) {
//     if (err) {
//         // print useful message
//         console.log(err)
//     }
//     else {
//         console.log('loaded script')
//     }
// })

// import loadScriptOnce from 'load-script-once';

// loadScriptOnce('http://dapi.kakao.com/v2/maps/sdk.js?appkey=a2ebbeb486802e2210128b28e3403190')
// .then(() => console.log('loaded'))
// .catch(err => console.error('failed to load!', err))

Vue.config.productionTip = false


const router =  createRouter()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


//https://keenthemes.com/keen/preview/demo2/dashboards/aside-navy.html