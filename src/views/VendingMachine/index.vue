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
                        <line-chart class="chart-container" :chart-data="datacollection" :options="options" />
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
                        <line-chart class="chart-container" :chart-data="datacollection"  :options="options" />
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
                        <lane-status v-for="lane in this.lanechartArr" :key="lane.id" :laneProp="lane" />                 
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
                            <kt-map />
                        </div>
                    </div>
                    <div class="card-footer">
                        <p> location </p>
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
                                <label> Lane id : </label>
                                <input class="form-control" type="text" />
                                <label> 적정 온도 : </label>
                                <input class="form-control" type="text" />
                                <label> 적정 습도 : </label>
                                <input class="form-control" type="text" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Lane 추가</button>
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
import KtMap from '../../components/KtMap.vue';
import LaneStatus from '../../components/LaneStatus.vue';

import linechartjson from '../../data/linechart.json';
import lanechartjson from '../../data/lanestatus.json';

import linechart_template from '../../data/linechart_template.json';
// import { JSONParser } from '@amcharts/amcharts4/core';

export default {
    name: 'VendingMachine',
    components: {
        LineChart, KtMap, LaneStatus
    },
    data() {
        return {
            vm_id: this.$route.params.id,
            vm_data: null,
            data_instance: null,

            temp_datacollection: null,
            hum_datacollection: null,

            temp_init_data: [],
            hum_init_data: [],

            datacollection: null,
            options: null,
            lanechartArr: null
        }
    },
    mounted () {
        this.fillData()
        this.init();
    },
    methods: {
        fillData () {
            //get data from linechart.json file
            this.datacollection = linechartjson.datacollection

            this.options = linechartjson.options

            this.lanechartArr = lanechartjson.laneData
      },
      init () {
            var self = this;

            //initialize temperature and humidity variables
            this.temp = linechart_template;
            this.hum= linechart_template;

            //get vending machine information
            var vm_info_instance = axios.create({
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

            //get vending machine data
            var getMachineData = function () {
                let promise = vm_info_instance.get(`/machines/${self.vm_id}`, {
                }).then(function (response, error) {
                    self.vm_data = response.data;
                }).catch(function (error) {
                    console.log(error);
                });

                return promise;
            }
            
            //initial temperature data
            //`/logs/temperature/init/${user_id}/${vm_id}/${lane_id}`
            var getInitLaneData = function () {
                let promise = self.data_instance.get('/logs/temperature/init/user1@kt.com/machine1/1', {
                }).then(function (response, error) {
                    self.temp_init_data.push(response.data);
                }).catch(function (error) {
                    console.log(error);
                });

                return promise;
            }

            //once successful in getting machine and lane data
            //format lane temp + hum data from server to chart
            Promise.all([getMachineData(), getInitLaneData()])
                .then(function() {
                    // console.log(self.vm_data);
                    // console.log(self.temp_init_data);

                    // var str = self.temp_init_data;
                    // console.log(str[0][0].date.split(" ")[1]);

                    //push each lane data to separate chart datacollection
                    for(var i=0; i < self.temp_init_data.length; i++){
                        //current lane
                        var lane = self.temp_init_data[i];
                        //dataset object to push into temp_datacollection
                        var lane_dataset = {
                            "label": null,
                            "data": [],
                            "backgroundColor":"rgba(0, 0, 0, 0)",
                            "borderColor": [
                            ],
                            "borderWidth": 1
                        }

                        for(var j=0; j < lane.length; j++) {
                            //split string to get just time
                            self.temp.datacollection.labels.push(lane[j].date.split(" ")[1]);
                            lane_dataset.data.push(lane[j].degree);
                        }
                        //set border color for lane -> get from the linechart_template list of bordercolors
                        lane.borderColor.push(self.temp.borderColor[i])
                        self.temp.datacollection.datasets.push(lane);
                    }
                    
                }).catch(function (error) {
                    console.log(error);
                })

            console.log(this.temp);
            
            

            // //initial humidity data
            // //`/logs/humidity/init/${user_id}/${vm_id}/${lane_id}`
            // this.axios_instance.get('/logs/humidity/init/user1@kt.com/machine1/1', {
            // }).then(function (response, error) {
            //     console.log(response.data);
            // }).catch(function (error) {
            //     console.log(error);
            // });

            // this.getTempData();
      },
      getTempData () {
            //latest temperature data
            //`/logs/temperature/${user_id}/${vm_id}/${lane_id}`
            this.data_instance.get('/logs/temperature/user1@kt.com/machine1/1', {
            }).then(function (response, error) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
      },
      getHumidData () {
            //latest humidity data
            //`/logs/humidity/${user_id}/${vm_id}/${lane_id}`
            this.data_instance.get('/logs/humidity/user1@kt.com/machine1/1', {
            }).then(function (response, error) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
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
        height: 150px;
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
