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
                    <div class="vm-list card-body">
                        <vm-list-item v-for="vm in this.vm_data" :key="vm.id" :vm_data="vm"/>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 재고알람 </p>
                    </div>
                    <div class="card-body">
                       
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-md-6">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 온도알람 </p>
                    </div>
                    <div class="card-body">
                        <alarm-list alarm_type="temp" />
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
import KtMap from '../../components/Overview/KtMap.vue'
import VmListItem from '../../components/Overview/VmListItem.vue'
import AlarmList from '../../components/Overview/AlarmList.vue'


import axios from 'axios'

export default {
    name: 'Overview',
    components: {
        // KakaoMap, 
        KtMap, VmListItem, AlarmList
    },
    data: function () {
        return {
            vm_data: null,
            ready: false,
            stock_alarm_data: null,
            alarm_data: null,
            alarm_polling: null,
            machine_service: null,
        }
    },
    methods: {
        getVMData: function () {
            //state this component for use in axios 'then' callback function
            var self = this;
          
            //machine-service
            this.machine_service = axios.create({
                baseURL:'http://localhost:8100/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            //get all vending machines
            this.machine_service.get('/machines/', {
            }).then(function (response, error) {
                self.vm_data = response.data.content;
            }).catch(function (error) {
                console.log(error);
            })
        },
    },
    beforeMount () {
        var self = this;

        this.getVMData();
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

    .vm-list {
        overflow: auto;
    }

</style>


// <div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>