import Vue from 'vue'
import VueRouter from 'vue-router'

//View paths
import SignIn from '../views/Authentication/SignIn'
import DashboardIndex from '../views/'

Vue.use(VueRouter)

export function createRouter () {
    return new VueRouter({
        mode: 'history',
       routes: [
           { path: '/signin', component: SignIn},
           { path: '/', component: DashboardIndex }
       ]
    })
}