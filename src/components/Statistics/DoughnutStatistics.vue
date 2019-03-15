<template>
    <div >
        <doughnut-chart class="chart-container" :chart-data="chartData" :options="options" />
        <div class="date-picker d-flex d-flex-row justify-content-center">
            <label> Start </label>
            <datepicker id="start-date"></datepicker>
            <label> End </label>
            <datepicker id="start-date"></datepicker>
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
        }
    },
    methods: {
        updateChart: function() {
              this.chartData = doughnutchartjson.datacollection
              this.options = doughnutchartjson.options
        }
    },
    created: function (){
        this.updateChart()
    }
}
</script>

<style scoped>
    .chart-container {
        width: 60%;
        margin: auto;
    }

    .input-class {
        border-radius: 3px 3px 3px 3px;
    }

    .date-picker {
        margin-top: 20px;
    }

    .date-picker label {
        font-size: 10px;
    }

</style>
