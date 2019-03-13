<template>
    <div class="">
        <div class="top-nav">
            <h5> 자판기 {{ vm_id}} </h5>
        </div>

        <!-- Temperature Monitoring Graph-->
        <div class="card">
            <div class="card-header">
                <p class="card-header-title"> 온도 </p>
            </div>

            <!--Line Graph-->
            <div class="card-body">
                <line-chart class="chart-container" :chart-data="datacollection" :options="options" />
                <!-- <line-graph /> -->
                <!-- <hello-world /> -->
            </div>
        </div>

        <!-- Humidity Monitoring Graph-->
        <div class="card">
            <div class="card-header">
                <p class="card-header-title"> 습도 </p>
            </div>

            <!--Line Graph-->
            <div class="card-body">
                <line-chart class="chart-container" :chart-data="datacollection"  :options="options" />
                <!-- <line-graph /> -->
            </div>
        </div>
    </div>
</template>

<script>
import LineGraph from '../../components/LineGraph.vue'
import LineChart from '../../components/LineChart.vue'
import HelloWorld from '../../components/AmChart.vue'

export default {
    name: 'VendingMachine',
    components: {
        LineGraph, LineChart, HelloWorld
    },
    data() {
        return {
            vm_id: 0,
            datacollection: null,
            options: null
        }
    },
    mounted () {
        this.fillData()
    },
    methods: {
        fillData () {
            this.datacollection = {
                labels: ["00", "01", "02", "03", "04", "05"],
                datasets: [
                    {
                        label: 'lane1',
                        data: [12, 11, 3, 5, 2, 3],
                        backgroundColor:'rgba(0, 0, 0, 0)',
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                    ,{
                        label: 'lane2',
                        data: [2, 14, 6, 2, 12, 4],
                        backgroundColor:'rgba(0, 0, 0, 0)',
                        borderColor: [
                            // 'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }, 
                    {
                        label: 'lane3',
                        data: [4, 4, 1, 12, 11, 13],
                        backgroundColor:'rgba(0, 0, 0, 0)',
                        borderColor: [
                            // 'rgba(255,99,132,1)',
                            // 'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }, 
                ]
            }

            this.options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
}
</script>

<style scoped>
    .card {
        margin-bottom: 20px;
        height: 250px;
    }

    .card-body {
        vertical-align: middle;
    }

    .chart-container {
        position: relative;
        height: 150px;
        width: 95%;
        margin: auto;

    }
</style>
