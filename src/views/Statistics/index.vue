<template>
    <div>
        <div class="top-nav">
            <h5> Statistics </h5>
        </div>
        <div class="row">
            <!-- Map based statistics -->
            <div class="col-xl-12 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <!-- <map-statistics /> -->
                        hellooo
                    </div>
                </div>
            </div>

            <!-- Doughnut chart statistics -->
            <div id="doughnut-chart" class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <doughnut-statistics />
                    </div>
                </div>
            </div>

            <!-- Line chart statistics -->
            <div id="line-chart" class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <!-- <bar-statistics /> -->
                    </div>
                </div>
            </div>

            <!-- Bar graph statistics -->
            <!-- <div class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <line-statistics />
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import BarStatistics from '../../components/Statistics/BarStatistics.vue'
import DoughnutStatistics from '../../components/Statistics/DoughnutStatistics.vue'
import MapStatistics from '../../components/Statistics/MapStatistics.vue'
import LineStatistics from '../../components/Statistics/LineStatistics.vue'

export default {
    name: 'Statistics',
    components: {
        BarStatistics, DoughnutStatistics, MapStatistics, LineStatistics
    }
}
</script>

<style scoped>
    .card {
        min-height: 300px;
        margin-top: 10px;
        margin-bottom: 10px;
        padding-top: 10px;
    }

    .col-xl-6 .card {
        min-height: 450px;
    }

    #doughnut-chart {
        padding-right: 10px;
    }
    #line-chart {
        padding-left: 10px;
    }
</style>
