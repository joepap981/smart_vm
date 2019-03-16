<template>
    <div>
        <!-- <doughnut-chart :chart-data="chartData" /> -->
    </div>
</template>

<script>
// import DoughnutChart from '../DoughnutChart.vue'

import doughnutchartjson from '../../data/doughnutchart.json'

export default {
    name: 'DoughnutStatistics',
    // components: DoughnutChart,
    data: function () {
        return {
            chartData: null,
            options: null,
        }
    },
    methods: {
        updateChart: function() {
              this.chartData = doughnutchartjson.dataset
              this.options = doughnutchartjson.options
        }
    },
    created: function (){
        this.updateChart()
    }
}
</script>

<style scoped>

</style>
