<template>
    <div>
        <div class="top-nav">
            <h5> Statistics </h5>
        </div>
        <div class="row">
            <!-- Map based statistics -->
            <div class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <!-- <map-statistics /> -->
                    </div>
                </div>
            </div>

            <!-- Doughnut chart statistics -->
            <div class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <DoughnutStatistics />
                    </div>
                </div>
            </div>

            <!-- Line chart statistics -->
            <div class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <!-- <bar-statistics /> -->
                    </div>
                </div>
            </div>

            <!-- Bar graph statistics -->
            <div class="col-xl-6 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <!-- <line-statistics /> -->
                    </div>
                </div>
            </div>
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
    components: BarStatistics, DoughnutStatistics, MapStatistics, LineStatistics
}
</script>

<style scoped>
    .card {
        min-height: 400px;
        margin-top: 10px;
        margin-bottom: 10px;

    }

    .col-xl-6 {
        padding-left: 10px;
        padding-right: 10px;
    }
</style>
