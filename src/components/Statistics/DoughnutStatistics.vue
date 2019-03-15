<template>
    <div >
        <doughnut-chart class="chart-container" :chart-data="chartData" :options="options" />
        <div class="date-picker d-flex d-flex-row justify-content-center">
            <p class="datepicker-label"> Start </p>
            <datepicker input-class="inputclass"></datepicker>
            <p class="datepicker-label"> End </p>
            <datepicker input-class="inputclass"></datepicker>
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

    .date-picker {
        margin-top: 20px;
        align-items: center;
    }

    .input-box {
        margin:20px!important;
    }
    
    .datepicker-label {
        font-size: 10px;
        margin-bottom: 0;
        margin-left: 5px;
        margin-right: 5px;
    }

</style>

<!-- calendar related styles -->
<style>
    .inputclass {
        height: 25px;
        border-radius: .25rem;
        border-style: solid;
        border: 1px solid #ced4da;
    }
</style>
