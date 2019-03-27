<template>
    <div >
        <map-chart class="chart-container"/>
    </div>
</template>

<script>
import MapChart from '../Common/MapChart.vue'

export default {
    name: 'MapStatistics',
    components: {
        MapChart
    },
    methods: {
    }
}
</script>

<style>
    .chart-container {
        height: 400px;
    }
</style>
