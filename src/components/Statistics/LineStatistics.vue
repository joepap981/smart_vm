<template>
    <div >
        <line-chart class="chart-container" :chart-data="chartData" :options="options" />
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
            <div>
                <button @click="updateData()" class="btn btn-primary btn-sm ml-3"> Show </button>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart from '../LineChart.vue'
import Datepicker from 'vuejs-datepicker';

import linechartjson from '../../data/linechart.json'
export default {
    name: 'LineStatistics',
    components: {
        LineChart, Datepicker
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
            this.chartData = linechartjson.datacollection
            this.options = linechartjson.options
            this.options.title.display = true;
            this.options.title.text = '시간별 판매량'
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
        position: relative;
        height: 300px;
        width: 95%;
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
