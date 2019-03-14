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

            <!-- Lane Modal -->
            <div id="lane-modal" class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Lane 추가</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LineGraph from '../../components/LineGraph.vue'
import LineChart from '../../components/LineChart.vue'
import KtMap from '../../components/KtMap.vue'
import LaneStatus from '../../components/LaneStatus.vue'

import linechartjson from '../../data/linechart.json'
import lanechartjson from '../../data/lanestatus.json'
import { JSONParser } from '@amcharts/amcharts4/core';

export default {
    name: 'VendingMachine',
    components: {
        LineChart, KtMap, LaneStatus
    },
    data() {
        return {
            vm_id: 0,
            datacollection: null,
            options: null,
            lanechartArr: null
        }
    },
    mounted () {
        this.fillData()
    },
    methods: {
        fillData () {
            //get data from linechart.json file
            this.datacollection = linechartjson.datacollection

            this.options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }

            this.lanechartArr = lanechartjson.laneData
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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
        background-color: #f8f8f8;
    }
</style>
