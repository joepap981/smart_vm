<template>
    <div class="">
        <div class="card-body">
            <doughnut-chart v-if="data_ready" class="chart-container" :chart-data="chart_data.datacollection" :options="chart_data.options" />
        </div>
        <div class="card-footer">
            <date-picker v-on:update-chart="updateChart" />
        </div>
    </div>
</template>

<script>
import DoughnutChart from '../Common/DoughnutChart.vue'
import DatePicker from '../../components/Common/DatePicker.vue'

import doughnutchart_template from '../../assets/templates/doughnutchart_template.json'

import axios from 'axios';

export default {
    name: 'DoughnutStatistics',
    components: {
        DoughnutChart, DatePicker
    },
    data () {
        return {
            statistics_service: null,
            data_ready: false,
            start: null,
            end: null,
            chart_data: null,
            chart_data_buffer: null,
        }
    },
    methods: {
        init: function () {
            var self = this;
            //automatically set date to search. (a week from today) ~ (today)

            this.start = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];
            this.end = new Date().toISOString().split("T")[0];

            //statistics service instance
            this.statistics_service = axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            //deep copy chart_data template
            this.chart_data = JSON.parse(JSON.stringify(doughnutchart_template));

            //get sales data
            this.getSalesData();
        },
        getSalesData: function () {
            var self = this;
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            this.statistics_service.get('/logs/sell/user1@kt.com/', {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.chart_data_buffer = response.data;

                for(var i=0; i < 10; i++) {
                    self.chart_data.datacollection.labels.push(self.chart_data_buffer[i].drink_type);
                    self.chart_data.datacollection.datasets[0].data.push(self.chart_data_buffer[i].sell);
                }
                self.data_ready = true;
            }).catch(function (error) {
                console.log(error);
            })
        },

        //update chart on response from DatePicker
        updateChart: function (event) {
            var self = this;

            this.start = event.start;
            this.end = event.end;

            //deep copy chart_data template
            var temp_chart_data = JSON.parse(JSON.stringify(doughnutchart_template));

            this.statistics_service.get('/logs/sell/user1@kt.com/', {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.chart_data_buffer = response.data;

                for(var i=0; i < 10; i++) {
                    temp_chart_data.datacollection.labels.push(self.chart_data_buffer[i].drink_type);
                    temp_chart_data.datacollection.datasets[0].data.push(self.chart_data_buffer[i].sell);
                }
                self.chart_data = temp_chart_data;
                console.log(self.chart_data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted: function (){
        this.init()
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

