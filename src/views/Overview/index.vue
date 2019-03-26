<template>
    <div class="">
        <div class="top-nav">
            <h5> Overview </h5>
        </div>

        <div class="row">
            <div class="col-xl-9 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 자판기 위치 </p>
                    </div>
                    <div class="card-body">
                        <div class="map-container">
                            <kt-map v-bind:vm_data="vm_data"/>
                            <!-- <kakao-map /> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 자판기 </p>
                    </div>
                    <div class="card-body">
                        <vending-machine-list v-for="vm in this.vm_data" :key="vm.id" :vm_data="vm"/>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 재고알람 </p>
                    </div>
                    <div class="card-body">
                        <stock-alarm />
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-md-6">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 온도알람 </p>
                    </div>
                    <div class="card-body">
                        <alarm />
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 습도알람 </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import KakaoMap from '../../components/KakaoMap.vue'
import KtMap from '../../components/KtMap.vue'
import VendingMachineList from '../../components/Overview/VendingMachineList.vue'
import StockAlarm from '../../components/Overview/StockAlarm.vue'
import Alarm from '../../components/Overview/Alarm.vue'

import axios from 'axios'

export default {
    name: 'Overview',
    components: {
        // KakaoMap, 
        KtMap, VendingMachineList, StockAlarm, Alarm
    },
    data: function () {
        return {
            vm_data: null,
            ready: false,
            stock_alarm_data: null,
            alarm_data: null,
            alarm_polling: null,
        }
    },
    methods: {
        getVMData: function () {
            //state this component for use in axios 'then' callback function
            var self = this;
          
            const instance = axios.create({
                baseURL:'http://localhost:8082/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            instance.get('/machines/', {
            }).then(function (response, error) {
                self.vm_data = response.data.content;

            }).catch(function (error) {
                console.log(error);
            })
        },
        getStockAlarmData: function () {
            //state this component for use in axios 'then' callback function
            var self = this;
          
            const instance = axios.create({
                baseURL:'https://my-json-server.typicode.com/joepap981/api/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            instance.get('/content/', {
            }).then(function (response, error) {
                self.stock_alarm_data = response.data;
            }).catch(function (error) {
                console.log(error);
            })

            console.log(new Date());
        },
        getAlarmData: function () {
                        //state this component for use in axios 'then' callback function
            var self = this;
          
            const instance = axios.create({
                baseURL:'https://my-json-server.typicode.com/joepap981/api/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            instance.get('/content/', {
            }).then(function (response, error) {
                self.alarm_data = response.data;
            }).catch(function (error) {
                console.log(error);
            })

            console.log(new Date());
        }
    },
    beforeMount () {
        var self = this;
        // this.alarm_polling = setInterval(() => {
        //     self.getStockDataAlarmData();
        //     self.getAlarmData();
        // }, 3000)

       this.getVMData();
    },
    beforeDestroy() {
        // clearInterval(this.alarm_polling)
    }
}
</script>

<style scoped>
    .card {
        border-color: white;
        width: 100%;
        height: 500px;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .row {
        margin-right:0;
    }

    .col-xl-3, .col-md-12, .col-xl-6, .col-xl-9, .col-md-4 .col-md-6, .col-xl-4{
        padding-right: 10px!important;
        padding-left: 10px!important;
    }

    .map-container {
        height: 400px;
    }

</style>


// <div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>