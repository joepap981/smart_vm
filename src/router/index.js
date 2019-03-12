import Vue from 'vue'
import VueRouter from 'vue-router'

//View paths
import SignIn from '../views/Authentication/SignIn'
import DashboardIndex from '../views/'

import Overview from '../views/Overview'
import Alarms from '../views/Alarms'
import Statistics from '../views/Statistics'
import User from '../views/User'

Vue.use(VueRouter)

export function createRouter () {
    return new VueRouter({
        mode: 'history',
       routes: [
           //authentication/redirect routes
           { path: '/signin', component: SignIn},

           //dashboard routes
           { path: '/', component: DashboardIndex,
                children: [
                    {path: 'overview', component: Overview},
                    {path: 'alarms', component: Alarms},
                    {path: 'statistics', component: Statistics},
                    {path: 'user', component: User}
                ]
            }
       ]
    })
}