<template>
    <div class="mt-3" >
        <line-chart class="chart-container" :chart-data="chartData" :options="options" />
    </div>
</template>

<script>
import LineChart from '../Common/LineChart.vue'
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
            this.options.title.display = false;
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
        height: 350px;
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
