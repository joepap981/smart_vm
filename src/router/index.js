import Vue from 'vue'
import VueRouter from 'vue-router'

//View paths
import SignIn from '../views/Authentication/SignIn'
import SignUp from '../views/Authentication/SignUp'
import DashboardIndex from '../views/'

import Overview from '../views/Overview'
import Alarms from '../views/Alarms'
import Statistics from '../views/Statistics'
import User from '../views/User'
import VendingMachine from '../views/VendingMachine'
import VendingMachineList from '../views/VendingMachineList'
import AddVendingMachine from '../views/VendingMachineList/AddVendingMachine.vue'

import PageNotFound from '../components/Common/PageNotFound'

import Mapchart from '../components/Common/MapChart.vue'

Vue.use(VueRouter)

export function createRouter () {
    return new VueRouter({
        mode: 'history',
        routes: [
           //authentication/redirect routes
           { path: '/signin', component: SignIn},
           { path: '/signup', component: SignUp},

           //dashboard routes
           { path: '/', component: DashboardIndex,
                children: [
                    {name: 'overview', path: 'overview', component: Overview},
                    {name: 'alarms', path: 'alarms', component: Alarms},
                    {name: 'statistics', path: 'statistics', component: Statistics},
                    {name: 'user', path: 'user', component: User},
                    {name: 'vm', path: 'vm/:id', component: VendingMachine},
                    {name: 'vm_list', path: 'vm_list/', component: VendingMachineList},
                    {name: 'vm_list/add_machine', path: 'vm_list/add_machine', component: AddVendingMachine}
                ]
            },
            {path: '/test', component: Mapchart },
            {path: '*', component: PageNotFound}

       ]
    })
}