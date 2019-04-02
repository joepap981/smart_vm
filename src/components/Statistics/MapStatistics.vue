<template>
    <div >
        <map-chart class="chart-container"/>
    </div>
</template>

<script>
import axios from 'axios';
import MapChart from '../Common/MapChart.vue'

export default {
    name: 'MapStatistics',
    data () { 
        return {
            user_id: 'user1@kt.com',

        }
    },
    components: {
        MapChart
    },
    methods: {
    },
    mounted () {

    }
}
</script>

<style>
    .chart-container {
        height: 400px;
    }
</style>
