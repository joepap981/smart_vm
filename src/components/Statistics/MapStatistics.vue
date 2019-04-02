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
    data() {
        return {
            statistics_service: null,
            get_data: null,
        }
    },
    methods: {
        init () {
            var self = this;
            //automatically set date to search. (a week from today) ~ (today)

            this.start = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];
            this.end = new Date().toISOString().split("T")[0];

            //statistics service instance
            this.statistics_service = axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
        },
        getData (data_type, level) {
            var self = this;
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            this.statistics_service.get('/logs/sell/all', {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.chart_data_buffer = response.data;

                for(var i=0; i < self.chart_data_buffer.length; i++) {
                    self.chart_data.datacollection.labels.push(self.chart_data_buffer[i].drink_type);
                    self.chart_data.datacollection.datasets[0].data.push(self.chart_data_buffer[i].count);
                }
                self.data_ready = true;
            }).catch(function (error) {
                console.log(error);
            })
        },
      
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
