<template>
<div>
    <bar-chart class="chart-container" v-if="data_ready" :chartData="chart_data.datacollection" :options="chart_data.options"/>
    <div class="card-footer">
        <date-picker v-on:update-chart="updateChart"/>
    </div>
</div>
    
</template>

<script>
import axios from 'axios';
import BarChart from '../../components/Common/BarChart.vue';
import DatePicker from '../../components/Common/DatePicker.vue';

import barchart_template from '../../assets/templates/barchart_template.json'

export default {
    name: 'VisitStatistics',
    components: {
        BarChart, DatePicker
    },
    props: {
        vm_id: String,
    },
    data () {
        return {
            data_ready: false,
            chart_data: null,
            user_id: null,
            visit_data: null,
            statistics_service: null,

            start: null,
            end: null
        }
    },
    methods: {
        init() {
            //deep copy chart_data template
            this.chart_data = JSON.parse(JSON.stringify(barchart_template));

            //automatically set date to search. (a week from today) ~ (today)
            this.start = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];
            this.end = new Date().toISOString().split("T")[0];

            //statistics-service
            this.statistics_service = axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getVisitData();
        },
        getVisitData () {
            var self = this;

            //get vending machine data
            //`/logs/visit/${self.user_id}/${self.vm_id}`
            let promise = self.statistics_service.get(`/logs/visit/user1@kt.com/machine1/`, {
                params: {
                    start: self.start,
                    end: self.end
                }
            }).then(function (response, error) {
                self.visit_data = response.data;

                self.pushToChartData();
                self.data_ready = true;
            }).catch(function (error) {
                console.log(error);
            });

            return promise;
        },
        pushToChartData () {
            for (var i = 0; i< this.visit_data.length; i++) {
                this.chart_data.datacollection.datasets[0].data[this.visit_data[i].hour] += this.visit_data[i].count;
            }
        },
        //update chart on response from DatePicker
        updateChart: function (event) {
            var self = this;

            this.start = event.start;
            this.end = event.end;

            //deep copy chart_data template
            let temp_chart_data = JSON.parse(JSON.stringify(barchart_template));

            this.getVisitData();
            console.log("updated");
        }
    },
    mounted () {
        this.init();
    }
}
</script>

<style scoped>
    .chart-container {
        height: 150px;
        width: 80%;
        margin: auto;
    }

 

</style>
