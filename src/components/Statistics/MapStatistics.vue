<template>
    <div >
        <map-chart class="chart-container"/>
    </div>
</template>

<script>
import MapChart from '../MapChart.vue'

export default {
    name: 'MapStatistics',
    components: {
        MapChart
    }
}
</script>

<style>
    .chart-container {
        height: 400px;
    }
</style>
