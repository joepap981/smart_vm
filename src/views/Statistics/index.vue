<template>
    <div>
        <div class="top-nav">
            <h5> Statistics </h5>
        </div>
        <div class="row">
            <!-- Map based statistics -->
            <div class="col-xl-12 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <label> 지역별 </label>
                    </div>
                    <div class="card-body">
                        <map-statistics />
                    </div>
                    <div class="card-footer">
  
                    </div>
                </div>
            </div>

            <!-- Doughnut chart statistics -->
            <div id="doughnut-chart" class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <label> 기간별 인기제품 </label>
                    </div>
                    <doughnut-statistics />
                   
                </div>
            </div>

            <!-- Line chart statistics -->
            <div id="line-chart" class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-header"> 
                        <label> 시간별 판매량 </label>
                    </div>
                    <div class="card-body">
                        <line-statistics />
                    </div>
                    <div class="card-footer">
         
                    </div>
                </div>
            </div>

            <!-- Bar graph statistics -->
            <!-- <div class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <line-statistics />
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import BarStatistics from '../../components/Statistics/BarStatistics.vue'
import DoughnutStatistics from '../../components/Statistics/DoughnutStatistics.vue'
import MapStatistics from '../../components/Statistics/MapStatistics.vue'
import LineStatistics from '../../components/Statistics/LineStatistics.vue'

import axios from 'axios';

export default {
    name: 'Statistics',
    components: {
        BarStatistics, DoughnutStatistics, MapStatistics, LineStatistics,
    },
    data: function () {
        return {
            instance: null,
        }
    },
    methods: {
        init: function () {
            //'https://my-json-server.typicode.com/joepap981/api/'
             this.instance = axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.start = new Date().toISOString().split("T")[0];
            this.end = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];

        },
        getTempData: function () {
            var self = this;
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            this.instance.get('/logs/sell/user1@kt.com/', {
                params: {
                    start: '2019-03-10',
                    end: '2019-03-28'
                }
            }).then(function (response, error) {
                console.log(response.data);
                self.data_ready = true;
                console.log(self.chart_data.labels)
            }).catch(function (error) {
                console.log(error);
            })
        },
        beforeMount () {
            var self = this;
            // this.alarm_polling = setInterval(() => {
            //     self.getStockDataAlarmData();
            //     self.getAlarmData();
            // }, 3000)

            this.getVMData();
        },
    },
    mounted () {
        this.init();
        this.getTempData();
    }
}
</script>

<style scoped>
    .card {
        min-height: 300px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-top: 10px;
    }

    .card-header {
        padding: 0;
    }

    .card-header label {
        font-size: 13px;
        font-weight: bold;
    }

    .card-footer {
        padding: 10px;
    }

    .col-xl-6 .card {
        min-height: 535px;
    }

    /* #doughnut-chart {
        padding-right: 10px;
    } */
    #line-chart {
        padding-left: 10px;
    }



</style>
