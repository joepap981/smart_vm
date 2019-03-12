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
                <!-- <line-chart :chart-data="datacollection" :width="400" :height="100" :options="options" /> -->
                <line-graph />
            </div>
        </div>

        <!-- Humidity Monitoring Graph-->
        <div class="card">
            <div class="card-header">
                <p class="card-header-title"> 습도 </p>
            </div>

            <!--Line Graph-->
            <div class="card-body">
                <!-- <line-chart :chart-data="datacollection" :width="400" :height="100" /> -->
                <line-graph />
            </div>
        </div>
    </div>
</template>

<script>
import LineGraph from '../../components/LineGraph.vue'
import LineChart from '../../components/LineChart.vue'

export default {
    name: 'VendingMachine',
    components: {
        LineGraph, LineChart
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
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                        label: 'time: hours',
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
                        label: 'time: hours',
                        data: [2, 14, 6, 2, 12, 4],
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
                responsive: true
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
    }
</style>
