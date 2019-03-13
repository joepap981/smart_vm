<template>
    <div class="">
        <div class="top-nav">
            <div class="d-flex flex-row">
                <h5> 자판기 {{ vm_id}} </h5>
            </div>
        </div>

        <div class="row">
            <!-- Temperature Monitoring Graph-->
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 온도 </p>
                        <div id="tempStatusBadge" class="status-badge"></div>
                    </div>
                    <div class="card-body">
                        <line-chart class="chart-container" :chart-data="datacollection" :options="options" />
                    </div>
                </div>
            </div>

            <!-- Humidity Monitoring Graph-->
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 습도 </p>
                        <div id="humidityStatusBadge" class="status-badge"></div>
                    </div>
                    <div class="card-body">
                        <line-chart class="chart-container" :chart-data="datacollection"  :options="options" />
                    </div>
                </div>
            </div>

            <!-- Stock Status -->
            <div class="col-xl-6 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> Lane Status </p>
                    </div>
                    <div class="card-body">
                        <div class="lane-status-widget d-flex align-items-center">
                            <div id="laneStatusBadge" class="status-badge"></div>
                            <div class="lane-status">
                                <p class="info-title"> Lane 1 </p>
                                <p class="info-address"> Pepsi </p>
                            </div>
    
                            <div class="stock-status d-flex">
                                <p class="info-title mr-2"> 재고충분 </p>
                                <p class="info-address"> Mar 13 13:45:13 </p>
                            </div>
                
                            <div class="env-status d-flex">
                                <p class="info-title mr-2"> 상태양호 </p>
                                <p class="info-address"> Mar 13 13:45:13 </p>
                            </div>
                   
                        </div>
                    </div>
                </div>
            </div>

            <!-- Location -->
            <div class="col-xl-6 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 위치 </p>
                    </div>
                    <div class="card-body">
                        <div class="map-container">
                            <kt-map />
                        </div>
                    </div>
                    <div class="card-footer">
                        <p> location </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LineGraph from '../../components/LineGraph.vue'
import LineChart from '../../components/LineChart.vue'
import KtMap from '../../components/KtMap.vue'

export default {
    name: 'VendingMachine',
    components: {
        LineChart, KtMap
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

    .map-container {
        height: 300px;
    }

    /*stock-status widget*/
    .lane-status-widget {
        height: 50px;
    }

    .status-badge {
        background-color: #36a2eb;
        min-width: 1rem;
        min-height: 1rem;
        border-radius: 3px;
        margin-right: 1.2rem;
    }

    .lane-status{
       text-align: left;
    }
    .info-title {
        font-size: 0.8rem;
        font-weight: bold;
        color: #3d4465;
        margin-bottom: 5px;
    }
    .info-address {
        font-size: 0.8rem;
        font-weight: bold;
        color: #a1a8c3;
        margin-bottom: 0px;
    }

    .stock-status {
        margin-left: 10%;
    }

    .env-status {
        margin-left: 10%;
    }



</style>
