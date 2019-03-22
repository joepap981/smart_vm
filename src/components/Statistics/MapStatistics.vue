<template>
    <div>
        <div class="card-body">
            <map-chart class="chart-container"/>
        </div>
        <div class="card-footer">
            <date-picker />
        </div>
    </div>
</template>

<script>
import MapChart from '../MapChart.vue'
import DatePicker from '../DatePicker.vue'

import axios from 'axios'

export default {
    name: 'MapStatistics',
    data: function () {
        return {
            dataSet: null,
        }
    },
    components: {
        MapChart, DatePicker
    },
    methods: {
        getStatData: function () {
            const instance = axios.create({
                baseURL:'http://121.140.19.90:8080',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
            instance.get('/logs/sell/user1?start=2019-03-01&end=2019-03-28')
                .then(function (response, error) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
            })
        }
    },
    mounted () {
        //this.getStatData();
    }
}
</script>

<style>
    .chart-container {
        height: 400px;
    }
    
    .card-footer {
        padding: 10px;
    }
</style>
