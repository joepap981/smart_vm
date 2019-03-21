<template>
    <div class="">
        <doughnut-chart class="chart-container" :chart-data="chartData" :options="options" />
    </div>
</template>

<script>
import DoughnutChart from '../DoughnutChart.vue'


import doughnutchartjson from '../../data/doughnutchart.json'
import doughnutchart_template from '../../data/doughnut_chart_template.json'

import axios from 'axios'

export default {
    name: 'DoughnutStatistics',
    components: {
        DoughnutChart, 
    },
    data () {
        return {
            chartData: null,
            options: null,
            start: null,
            end: null,
        }
    },
    methods: {
        initData: function() {
            // this.chartData = doughnutchartjson.datacollection
            // this.options = doughnutchartjson.options

            this.options = doughnutchart_template.options

            //get data from a week from today to today
            this.start = new Date()
            this.start.setDate(this.start.getDate() - 7);
            this.start = this.start.toISOString().split("T")[0];
            this.end = new Date().toISOString().split("T")[0];
            
            this.getStatData();
        },
        pushToChartTemplate: function (data) {
            console.log(data)
        },
        getStatData: function () {
            //state this component for use in axios 'then' callback function
            var self = this;
            this.chartData = doughnutchart_template.datacollection;
            const instance = axios.create({
                baseURL:'http://121.140.19.90:8080',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            instance.get('/logs/sell/user1', {
                params: {
                    start: this.start,
                    end: this.end,
                }
            }).then(function (response, error) {
                self.pushToChartTemplate(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        },
        
    },
    created: function (){
        this.initData();
        // this.pushToChartTemplate()

         // console.log(this.end_date.toISOString().split("T")[0])
        // this.getStatData();
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

