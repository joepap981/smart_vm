<template>
    <div class="">
        <doughnut-chart class="chart-container" :chart-data="chartData" :options="options" />
        <div class="date-picker d-flex justify-content-center">
            <div>
                <div class="d-flex d-flex-row justify-content-center mb-2">
                    <p class="datepicker-label mr-1"> Start </p>
                    <datepicker v-model="start_date" input-class="inputclass"></datepicker>
                </div>
                <div class="d-flex d-flex-row justify-content-center">
                    <p class="datepicker-label mr-2"> End </p>
                    <datepicker v-model="end_date" input-class="inputclass"></datepicker>
                </div>
            </div>
            <div class="">
                <button @click="updateData()" class="btn btn-primary btn-sm ml-3"> Show </button>
            </div>
        </div>
    </div>
</template>

<script>
import DoughnutChart from '../DoughnutChart.vue'
import Datepicker from 'vuejs-datepicker';

import doughnutchartjson from '../../data/doughnutchart.json'

export default {
    name: 'DoughnutStatistics',
    components: {
        DoughnutChart, Datepicker
    },
    data () {
        return {
            chartData: null,
            options: null,
            start_date: null,
            end_date: null
        }
    },
    methods: {
        initData: function() {
            this.chartData = doughnutchartjson.datacollection
            this.options = doughnutchartjson.options
        },
        updateData: function () {

            // console.log(this.end_date.toISOString().split("T")[0])
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

    .date-picker {
        margin-top: 20px;
        align-items: center;
    }
    
    .datepicker-label {
        font-size: 10px;
        margin-bottom: 0;
    }



</style>

