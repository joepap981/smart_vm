<template>
    <div class="">
        <div class="top-nav">
            <div class="d-flex flex-row">
                <h5> 자판기 {{ vm_id }} </h5>
            </div>
        </div>

        <div class="row">
            <!-- Temperature monitor-->
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 온도 </p>
                        <div id="tempStatusBadge" class="status-badge"></div>
                    </div>
                    <div class="card-body">
                        <temp-monitor-chart />
                    </div>
                </div>
            </div>

            <!-- Humidity monitor-->
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 습도 </p>
                        <div id="humiStatusBadge" class="status-badge"></div>
                    </div>
                    <div class="card-body">
                        <humi-monitor-chart />
                    </div>
                </div>
            </div>

            <!-- Lane Status -->
            <div class="col-xl-3 col-md-6">
                <div class="card row3">
                    <div class="card-header d-flex justify-content-between">
                        <p class="card-header-title"> Lane Status </p>
                        <!-- Add Lane Modal Button -->
                        <button class="btn btn-sm btn-light" data-toggle="modal" data-target="#lane-modal"> + </button>
                    </div>
                    <div class="card-body">
                        <lane-status-item v-for="lane in this.lanes" :key="lane.id" :laneProp="lane" />                 
                    </div>
                </div>
            </div>
            <!-- Lane Status -->
            <div class="col-xl-3 col-md-6">
                <div class="card row3">
                    <div class="card-header d-flex justify-content-between">
                        <p class="card-header-title"> Alarm Status </p>
                        <!-- Add Lane Modal Button -->
                        <button class="btn btn-sm btn-light" @click="markAllRead()"> Mark All as Read </button>
                    </div>
                    <div class="card-body">
                        <alarm-status :vm_id="vm_id"/>      
                    </div>
                </div>
            </div>

            <!-- Location -->
            <div class="col-xl-6 col-md-12">
                <div class="card row3">
                    <div class="card-header">
                        <p class="card-header-title"> 위치 </p>
                    </div>
                    <div class="card-body">
                        <div class="map-container">
                            <!-- <KtMap2 v-bind:vm_data="map_data"/> -->
                            <KtMap v-bind:vm_data="map_data"/>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p v-if="vm_data_ready"> {{ vm_data.location.address.province }} {{ vm_data.location.address.municipality }} {{ vm_data.location.address.submunicipality }} </p>
                    </div>
                </div>
            </div>

            <!-- number of times visited during time bar chart -->
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 시간별 방문 횟수 </p>
                    </div>

                    <div class="card-body pb-0">
                        <visit-statistics />
                    </div>
                </div>
            </div>

            <!-- Best selling drink -->
            <div class="col-xl-6 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 제품 판매량 </p>
                    </div>

                    <div class="card-body p-0">
                        <product-sales-statistics />
                    </div>
                </div>
            </div>

            <!-- Lane 추가 Modal -->
            <div id="lane-modal" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Lane 추가</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group text-left">
                                <label> Sequence : </label>
                                <input v-model="add_lane.sequence" class="form-control" type="text" />
                                <label> 적정 온도 (high) : </label>
                                <input v-model="add_lane.temperature.optimal_temp_high" class="form-control" type="text" />
                                <label> 적정 온도 (low): </label>
                                <input v-model="add_lane.temperature.optimal_temp_low" class="form-control" type="text" />
                                <label> 적정 습도 (high): </label>
                                <input v-model="add_lane.humidity.optimal_humi_high" class="form-control" type="text" />
                                <label> 적정 습도 (low): </label>
                                <input v-model="add_lane.humidity.optimal_humi_low" class="form-control" type="text" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button @click="addLane()" type="button" class="btn btn-primary" data-dismiss="modal">Lane 추가</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import KtMap from '../../components/Overview/KtMap.vue';
import LaneStatusItem from '../../components/VendingMachine/LaneStatusItem.vue';
import AlarmStatus from '../../components/VendingMachine/AlarmStatus.vue';

// import LaneMonitorChart from '../../components/VendingMachine/LaneMonitorChart.vue'
import TempMonitorChart from '../../components/VendingMachine/TempMonitorChart.vue'
import HumiMonitorChart from '../../components/VendingMachine/HumiMonitorChart.vue'

import VisitStatistics from '../../components/VendingMachine/VisitStatistics.vue'
import ProductSalesStatistics from '../../components/VendingMachine/ProductSalesStatistics.vue'

export default {
    name: 'VendingMachine',
    components: {
        LaneStatusItem, AlarmStatus, TempMonitorChart, HumiMonitorChart, KtMap, VisitStatistics, ProductSalesStatistics
    },
    data() {
        return {
            vm_id: this.$route.params.id,
            vm_data: null,
            map_data: [],
            vm_data_ready: false,

            //axios machine service instance
            machine_service: null,

            //lane related data
            add_lane: {
                humidity: {
                    optimal_humi_high: null,
                    optimal_humi_low: null,
                },
                temperature: {
                    optimal_temp_high: null,
                    optimal_temp_low: null,
                },
                sequence: (Math.random() * 100000).toFixed(0)
            },

            lanes: [],
            datacollection: null,
            options: null,
        }
    },
    mounted () {
        this.init();
    },

    methods: {
        init () {
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
            this.getLanes();
            this.getMachineData();
        },
        getProductData () {

        },
        getMachineData () {
            var self = this;

            //get vending machine data
            let promise = self.machine_service.get(`/machines/${self.vm_id}`, {
            }).then(function (response, error) {
                self.vm_data = response.data;
                self.map_data= [response.data];
            
                self.vm_data_ready = true;
            }).catch(function (error) {
                console.log(error);
            });

            return promise;
        },
        addLane () {
            //get vending machine data
            var self = this;
            
            this.machine_service.post(`/machines/${this.vm_id}/lanes`, {
                humidity: this.add_lane.humidity,
                temperature: this.add_lane.temperature,
                sequence: this.add_lane.sequence
            }).then(function (response, error) {
                self.getLanes();
            }).catch(function (error) {
                console.log(error);
            }).then(function (){
                //reset add lane
                self.add_lane = {
                    humidity: {
                        optimal_humi_high: null,
                        optimal_humi_low: null,
                    },
                    temperature: {
                        optimal_temp_high: null,
                        optimal_temp_low: null,
                    },
                    sequence: (Math.random() * 100000).toFixed(0)
                }
            });
        },
        getLanes () {
            var self = this;

            this.machine_service.get(`/machines/${this.vm_id}/lanes`, {
            }).then(function (response, error) {
                self.lanes = response.data;
            }).catch(function (error) {
                console.log(error);
            })
        },
        markAllRead () {
            
        }
    }
}
</script>

<style scoped>
    .col-md-12, .col-md-6 {
        padding: 10px;
    }

    .col-xl-6.col-md-6 {
        padding-top: 0;
    }

    .col-xl-12 {
        margin-top: 10px;
    }
    .card {
        margin-bottom: 10px;
    }

    .card-body {
        vertical-align: middle;
    }

    .chart-container {
        position: relative;
        height: 300px;
        width: 95%;
        margin: auto;

    }
    .map-container {
        height: 300px;
    }
    .row3 {
        min-height: 460px;
    }
    .btn-light {
        background-color: white;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }
    .form-group {
        padding:5px;
    }

    .form-group input {
        margin-bottom:10px;
    }
</style>
