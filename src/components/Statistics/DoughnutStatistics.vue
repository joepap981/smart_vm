<template>
    <div class="">
        <doughnut-chart class="chart-container" :chart-data="chartData" :options="options" />
    </div>
</template>

<script>
import DoughnutChart from '../DoughnutChart.vue'


import doughnutchartjson from '../../data/doughnutchart.json'

export default {
    name: 'DoughnutStatistics',
    components: {
        DoughnutChart
    },
    data () {
        return {
            chartData: null,
            options: null,
        }
    },
    methods: {
        initData: function() {
            this.chartData = doughnutchartjson.datacollection
            this.options = doughnutchartjson.options
        },
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

