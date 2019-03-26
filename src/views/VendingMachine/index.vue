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
                        <line-chart v-if="temp_data_ready" class="chart-container" :chart-data="temp.datacollection" :options="temp.options" />
                    </div>
                </div>
            </div>

            <!-- Humidity Monitoring Graph-->
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 습도 </p>
                        <div id="humidityStatusBadge" class="status-badge"></div>
                    </div>
                    <div class="card-body">
                        <line-chart v-if="temp_data_ready" class="chart-container" :chart-data="hum.datacollection"  :options="hum.options" />
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
                        <lane-status v-for="lane in this.lanes" :key="lane.id" :laneProp="lane" />                 
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
                            <kt-map2 v-bind:vm_data="map_data"/>
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
import LineChart from '../../components/LineChart.vue';
import KtMap2 from '../../components/KtMap.vue';
import LaneStatus from '../../components/VendingMachine/LaneStatus.vue';

import linechartjson from '../../data/linechart.json';
import lanechartjson from '../../data/lanestatus.json';

import linechart_template from '../../data/linechart_template.json';
// import { JSONParser } from '@amcharts/amcharts4/core';

export default {
    name: 'VendingMachine',
    components: {
        LineChart, KtMap2, LaneStatus
    },
    data() {
        return {
            vm_id: this.$route.params.id,
            vm_data: null,
            map_data: null,
            data_instance: null,
            vm_info_instance: null,

            //final objects whose datacollection and options gets inserted into the chart
            temp: null,
            hum: null,
            //arrays 
            temp_init_data: [],
            hum_init_data: [],

            //flags to alert chart that data has been received
            temp_data_ready: false,
            hum_data_ready: false,
            vm_data_ready: false,

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
                sequence: 0
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


            //initialize temperature and humidity variables
            //these are the final object whose datacollection and options gets inserted into the chart
            this.temp = linechart_template;
            this.hum= linechart_template;

            //get vending machine information
            this.vm_info_instance = axios.create({
                baseURL:'http://localhost:8082/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            //get initial temperature and humidity data
            this.data_instance = axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getLanes();

            //get vending machine data
            var getMachineData = function () {
                let promise = self.vm_info_instance.get(`/machines/${self.vm_id}`, {
                }).then(function (response, error) {
                    self.vm_data = response.data;
                    self.map_data= [response.data];
                    self.vm_data_ready = true;
                }).catch(function (error) {
                    console.log(error);
                });

                return promise;
            }

            getMachineData();
            
            //initial temperature data
            //`/logs/temperature/init/${user_id}/${vm_id}/${lane_id}`
            var getInitTempData = function () {
                let promise = self.data_instance.get('/logs/temperature/init/user1@kt.com/machine1/', {
                }).then(function (response, error) {
                    self.temp_init_data = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
                return promise;
            }

            //initial humidity data
            //`/logs/humidity/init/${user_id}/${vm_id}/${lane_id}`
            var getInitHumData = function () {
                let promise = self.data_instance.get('/logs/humidity/init/user1@kt.com/machine1/', {
                }).then(function (response, error) {
                    self.hum_init_data = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
                return promise;
            }

            //once successful in getting machine and lane data
            //format lane temp + hum data from server to chart
            Promise.all([getMachineData(), getInitTempData(), getInitHumData()])
                .then(function() {
                    //add labels
                    let temp_init_lane = self.temp_init_data[0];
                    for(let i=0; i < temp_init_lane.data.length; i++) {
                        self.temp.datacollection.labels.push(temp_init_lane.data[i].date.split(" ")[1]);
                    }
                    
                    //temperature
                    //push each lane data into a dataset, which is inserted into datacollection
                    for(var i=0; i < self.temp_init_data.length; i++){
                        //current lane
                        let lane = self.temp_init_data[i].data;
                 
                        //dataset object to push into temp_datacollection
                        let lane_dataset = {
                            "label": "lane " + self.vm_data.lanes[i].id,
                            "data": [],
                            "backgroundColor":"rgba(0, 0, 0, 0)",
                            "borderColor": [
                            ],
                            "borderWidth": 1
                        }

                        for(var j=0; j < lane.length; j++) {
                            //split string to get just time
                            lane_dataset.data.push(lane[j].degree);
                        }
                        //set border color for lane -> get from the linechart_template list of bordercolors
                        lane_dataset.borderColor.push(self.temp.borderColor[i])

                        //push current dataset (lane) into the datacollection
                        // *having muliple lanes means having multiple datasets and labels
                        self.temp.datacollection.datasets.push(lane_dataset);
                    }
                    //set flag to true to initiate chart creation
                    self.temp_data_ready = true

                    //humidity
                    //push each lane data into a dataset, which is inserted into datacollection
                    for(var i=0; i < self.hum_init_data.length; i++){
                        //current lane
                        let lane = self.hum_init_data[i].data;
                 
                        //dataset object to push into temp_datacollection
                        let lane_dataset = {
                            "label": "lane " + self.vm_data.lanes[i].id,
                            "data": [],
                            "backgroundColor":"rgba(0, 0, 0, 0)",
                            "borderColor": [
                            ],
                            "borderWidth": 1
                        }

                        for(var j=0; j < lane.length; j++) {
                            //split string to get just time
                            lane_dataset.data.push(lane[j].degree);
                        }
                        //set border color for lane -> get from the linechart_template list of bordercolors
                        lane_dataset.borderColor.push(self.hum.borderColor[i])

                        //push current dataset (lane) into the datacollection
                        // *having muliple lanes means having multiple datasets and labels
                        self.hum.datacollection.datasets.push(lane_dataset);

                        
                    }
                    //set flag to true to initiate chart creation
                    self.hum_data_ready = true
                    
                    self.updateData();
                }).catch(function (error) {
                    console.log(error);
                })


        },
        updateData () {
            var self = this;
            //get new data
            //data_type: temperature/humidity
            //datacollection: this.temp/this.hum
  
            var temp_datasets = self.temp.datacollection.datasets;
            var temp_labels = self.temp.datacollection.labels;

            var update_temp;
            var update_hum;

            //get latest data
            //`/logs/temperature/${user_id}/${vm_id}/${lane_id}`
            var getTempData = function () {
                let promise = self.data_instance.get('/logs/temperature/user1@kt.com/machine1/', {
                }).then(function (response, error) {
                     update_temp = response.data;
                }).catch(function (error) {
                    console.log(error);
                });

                return promise;
            }

            var getHumData = function () {
                let promise = self.data_instance.get('/logs/humidity/user1@kt.com/machine1/', {
                }).then(function (response, error) {
                     update_hum = response.data;
                }).catch(function (error) {
                    console.log(error);
                });

                return promise;
            }


            Promise.all([getTempData(), getHumData()])
            .then(function () {
                // console.log(temp_datasets);
                // console.log(temp_datasets.length);
                // console.log(update_temp);

                //remove labels
                // for(let i=0; i < update_temp[0].data.length; i++){
                //     temp_labels.splice(0, update_temp[0].data.length)
                // }

                // for(let i=0; i< temp_datasets.length; i++) {
                //     //splice off num of data being pushed in
                //     temp_datasets[i].data.splice(0, update_temp[0].data.length)
                    
                // }
                
                console.log(self.temp.datacollection.labels.length);

                // console.log(temp_datasets);

            })
            .catch(function () {

            })
        },
        addLane () {
            //get vending machine data
            var self = this;
            
            this.vm_info_instance.post(`/machines/${this.vm_id}/lanes`, {
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
                    sequence: 0
                }
            });
        },
        getLanes () {
            var self = this;

            this.vm_info_instance.get(`/machines/${this.vm_id}/lanes`, {
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
