<template>
    <div>
        <div class="top-nav">
            <h5> Statistics </h5>
        </div>
        <div class="row">
            <!-- Map based statistics -->
            <div class="col-xl-12 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <label> 지역별 </label>
                    </div>
                    <div class="card-body">
                        <map-statistics />
                    </div>
                </div>
            </div>

            <!-- Doughnut chart statistics -->
            <div id="doughnut-chart" class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <label> 기간별 인기제품 </label>
                    </div>
                    <!-- <doughnut-statistics /> -->
                   
                </div>
            </div>

            <!-- Line chart statistics -->
            <div id="line-chart" class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-header"> 
                        <label> 시간별 판매량 </label>
                    </div>
                    <!-- <line-statistics /> -->

                </div>
            </div>

            <!-- Bar graph statistics -->
            <div class="col-xl-12 col-sm-12">
                <div id="bar-chart" class="card">
                    <div class="card-header"> 
                        <label> 시간별 기사 방문 횟수 </label>
                    </div>
                    <div class="card-body p-0">
                        <!-- <bar-statistics /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DoughnutStatistics from '../../components/Statistics/DoughnutStatistics.vue'
import MapStatistics from '../../components/Statistics/MapStatistics.vue'
import LineStatistics from '../../components/Statistics/LineStatistics.vue'
import BarStatistics from '../../components/Statistics/BarStatistics.vue'

import axios from 'axios';

export default {
    name: 'Statistics',
    components: {
        DoughnutStatistics, MapStatistics, LineStatistics, BarStatistics
    },
    data: function () {
        return {
            "statistics_service": null,
        }
    },
    methods: {
        init: function () {

        },
    },
    mounted () {
        this.init();
    }
}
</script>

<style scoped>
    .card {

        margin-top: 10px;
        margin-bottom: 10px;
        padding-top: 10px;
    }

    .card-header {
        padding: 0;
    }

    .card-header label {
        font-size: 13px;
        font-weight: bold;
    }

    .card-footer {
        padding: 10px;
    }

 

    /* #doughnut-chart {
        padding-right: 10px;
    } */
    #line-chart {
        padding-left: 10px;
    }

</style>
