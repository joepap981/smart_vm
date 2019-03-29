<template>
    <line-chart v-if="data_ready" class="chart-container" :chart-data="chartData.datacollection" :options="chartData.options" />
</template>

<script>
import axios from 'axios';
import LineChart from '../Common/LineChart.vue'
import linechart_template from '../../assets/templates/linechart_template.json';

export default {
    name: "LaneMonitorChart",
    components: {
        LineChart
    },
    data() {
        return {
            //axios statistics server instance
            statistics_service: null,

            //final objects whose datacollection and options gets inserted into the chart
            chartData: null,

            //arrays 
            init_data: [],

            //flags to alert chart that data has been received
            data_ready: false,
        }
    },
    props: {
        vm_data: Object,
        data_type: String
    },
    methods: {
        init () {
            var self = this;

            //these are the final object whose datacollection and options gets inserted into the chart
            //deep copy json object template
            this.chartData = JSON.parse(JSON.stringify(linechart_template));

            //get initial temperature and humidity data
            this.statistics_service = axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getInitData();

        },
        //initial data
        getInitData () {
            var self = this;

            //`/logs/temperature/init/${user_id}/${vm_id}/${lane_id}`
            let promise = self.statistics_service.get(`/logs/${this.data_type}/init/user1@kt.com/machine1/`, {
            }).then(function (response, error) {
                self.init_data = response.data;

                //insert labels for the chart
                self.insertChartLabel();

                //push the received into datacollection format that chart.js understart
                self.pushToDatacollection();

                //set flag to true to initiate chart creation
                self.data_ready = true;
     
            }).catch(function (error) {
                console.log(error);
            });
            return promise;
        },
        pushToDatacollection () {
            var self = this;

            //push each lane data into a dataset, which is inserted into datacollection
            for(var i=0; i < self.init_data.length; i++){
                //current lane
                let lane = self.init_data[i].data;
            
                //dataset object to push into temp_datacollection
                let lane_dataset = {
                    "label": null,
                    "data": [],
                    "backgroundColor":"rgba(0, 0, 0, 0)",
                    "borderColor": [
                    ],
                    "borderWidth": 1
                }

                //fix once server data match
                lane_dataset.label = "lane " + self.init_data[i].lane;

                for(var j=0; j < lane.length; j++) {
                    //split string to get just time
                    lane_dataset.data.push(lane[j].degree);
                }
                //set border color for lane -> get from the linechart_template list of bordercolors
                lane_dataset.borderColor.push(self.chartData.borderColor[i])

                //push current dataset (lane) into the datacollection
                // *having muliple lanes means having multiple datasets and labels
                self.chartData.datacollection.datasets.push(lane_dataset);
            }
        },
        insertChartLabel() {
            var self = this;
            var data = self.init_data[0].data;

            for(let i=0; i < data.length; i++) {
                this.chartData.datacollection.labels.push(data[i].date.split(" ")[1]);
            }
        }
    },
    mounted () {
        this.init();
    }
}
</script>

<style scoped>

</style>
