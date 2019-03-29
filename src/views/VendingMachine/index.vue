<template>
    <div class="">
        <div class="top-nav">
            <div class="d-flex flex-row">
                <h5> 자판기 {{ vm_id}} </h5>
            </div>
        </div>

        <div class="row">
            <!-- Temperature Monitoring Graph-->
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 온도 </p>
                        <div id="tempStatusBadge" class="status-badge"></div>
                    </div>
                    <div class="card-body">
                        <lane-monitor-chart v-if="vm_data_ready" :vm_data="vm_data" data_type="temperature"/>
                    </div>
                </div>
            </div>

            <!-- Humidity Monitoring Graph-->
             <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 습도 </p>
                        <div id="tempStatusBadge" class="status-badge"></div>
                    </div>
                    <div class="card-body">
                        <lane-monitor-chart v-if="vm_data_ready" :vm_data="vm_data" data_type="humidity"/>
                    </div>
                </div>
            </div>

            <!-- Lane Status -->
            <div class="col-xl-6 col-md-12">
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

            <!-- Location -->
            <div class="col-xl-6 col-md-12">
                <div class="card row3">
                    <div class="card-header">
                        <p class="card-header-title"> 위치 </p>
                    </div>
                    <div class="card-body">
                        <div class="map-container">
                            <kt-map2 v-if="vm_data_ready" v-bind:vm_data="map_data"/>
                        </div>
                    </div>
                    <div class="card-footer">
                        <p v-if="vm_data_ready"> {{ vm_data.location.address.province }} {{ vm_data.location.address.municipality }} {{ vm_data.location.address.submunicipality }} </p>
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
import KtMap2 from '../../components/VendingMachine/KtMap2.vue';
import LaneStatusItem from '../../components/VendingMachine/LaneStatusItem.vue';

import LaneMonitorChart from '../../components/VendingMachine/LaneMonitorChart.vue'

export default {
    name: 'VendingMachine',
    components: {
        KtMap2, LaneStatusItem, LaneMonitorChart
    },
    data() {
        return {
            vm_id: this.$route.params.id,
            vm_data: null,
            map_data: null,
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
        getMachineData () {
            var self = this;
            
            //get vending machine data
            let promise = self.machine_service.get(`/machines/${self.vm_id}`, {
            }).then(function (response, error) {
                self.vm_data = response.data;
                self.map_data= [response.data];

                console.log( self.vm_data)
            
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
                console.log(response);
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
        }

        
    }
}
</script>

<style scoped>
    .card {
        margin-bottom: 20px;
    }

    .card-body {
        vertical-align: middle;
    }

    .chart-container {
        position: relative;
        height: 500px;
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
