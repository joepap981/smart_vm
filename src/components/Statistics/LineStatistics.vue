<template>
    <div>
        <div class="card-body mt-3" >
            <line-chart class="chart-container" v-if="data_ready" :chart-data="chart_data.datacollection" :options="chart_data.options" />
        </div>
        <div class="card-footer">
            <date-picker v-on:update-chart="updateChart" />
        </div>
    </div>
</template>

<script>
import LineChart from '../Common/LineChart.vue'
import DatePicker from '../../components/Common/DatePicker.vue'

import linechart_sales_template from '../../assets/templates/linechart_sales_template.json'

import axios from 'axios';
export default {
    name: 'LineStatistics',
    components: {
        LineChart, DatePicker
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
        init() {
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
            this.chart_data = JSON.parse(JSON.stringify(linechart_sales_template));

            this.getSalesData()
        },
        //update chart on response from DatePicker
        updateChart: function (event) {
            var self = this;

            this.start = event.start;
            this.end = event.end;

            //deep copy chart_data template
            var temp_chart_data = JSON.parse(JSON.stringify(linechart_sales_template));

            this.statistics_service.get('/logs/sell/time/user1@kt.com/', {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.chart_data_buffer = response.data;

                for(var i=0; i < response.data.length; i++) {
                    temp_chart_data.datacollection.datasets[0].data.push(self.chart_data_buffer[i].count);
                }
                self.chart_data = temp_chart_data;
            }).catch(function (error) {
                alert(error);
            })
        },
        getSalesData: function () {
            var self = this;
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            this.statistics_service.get('/logs/sell/time/user1@kt.com/', {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.chart_data_buffer = response.data;

                for(var i=0; i < response.data.length; i++) {
                    self.chart_data.datacollection.datasets[0].data.push(self.chart_data_buffer[i].count);
                }
                self.data_ready = true;
            }).catch(function (error) {
                console.log(error);
            })
        },
    },
    mounted (){
        this.init()
    }
}
</script>

<style scoped>
    .chart-container {
        position: relative;
        height: 100%;
        width: 95%;
        margin: auto;
        margin-bottom: 40px;
    }

    .date-picker {
        align-items: center;
        margin-top: 5px;
    }
    
    .datepicker-label {
        font-size: 10px;
        margin-bottom: 0;
    }

    .card-body {
        height: 350px;
        padding-top:0;
    }

    .card-footer {
        padding: 5px;
    }
</style>
