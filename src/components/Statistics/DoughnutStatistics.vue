<template>
    <div class="">
        <div class="card-body">
            <doughnut-chart v-if="data_ready" v-on:update-chart="getChartData" class="chart-container" :chart-data="chart_data" :options="options" />
        </div>
        <div class="card-footer">
            <date-picker />
        </div>
    </div>
</template>

<script>
import DoughnutChart from '../DoughnutChart.vue'
import DatePicker from '../../components/DatePicker.vue'
import doughnutchartjson from '../../data/doughnutchart.json'

import axios from 'axios';

export default {
    name: 'DoughnutStatistics',
    components: {
        DoughnutChart, DatePicker
    },
    data () {
        return {
            data_ready: false,
            chart_data: {
                "labels": [],
                "datasets": [
                    {
                        "label": "Dataset 1",
                        "data": [],
                        "backgroundColor": [
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 159, 64, 1)"
                        ]
                    }
                ]
            },
            options: {
                "responsive": true,
                "legend": {
                    "position": "top"
                },
                "title": {
                    "display": false,
                    "text": "인기제품"
                },
                "animation": {
                    "animateScale": true,
                    "animateRotate": true
                }
            }
        }
    },
    methods: {
        initData: function() {
            // this.chartData = doughnutchartjson.datacollection
            // this.options = doughnutchartjson.options
            //state this component for use in axios 'then' callback function
            var self = this;
            this.start = new Date().toISOString().split("T")[0];
            this.end = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];
          
            const instance = axios.create({
                baseURL:'https://my-json-server.typicode.com/joepap981/api/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            instance.get('/result/', {
                // params: {
                //     start: this.start,
                //     end: this.end
                // }
            }).then(function (response, error) {
                var iterator = response.data;
                iterator.forEach(element => {
                    self.chart_data.labels.push(element.product);
                    self.chart_data.datasets[0].data.push(element.set);
                });
                self.data_ready = true;
                console.log(self.chart_data.labels)
            }).catch(function (error) {
                console.log(error);
            })
        },
        getChartData: function () {
            // this.start = event.start;
            // this.end = event.end;
            console.log("getchartdata")
            // if (event != undefined) {
            //     console.log(event.start);

            //     console.log(this.start);
            //     console.log(this.end);
            // }

        }
    },
    created: function (){
        this.initData()
    }
}
</script>

<style scoped>
    .chart-container {
        min-width: 400px;
        max-width: 400px;
        margin: auto;
    }
</style>

