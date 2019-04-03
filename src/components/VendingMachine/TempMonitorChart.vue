<template>
    <div>
        <div>
            <canvas height="200" width="400" id="temp-canvas"></canvas>
        </div>
    </div>


</template>

<script>
import axios from 'axios';
import monitor_chart_template from '../../assets/templates/monitor_chart_template.json';
import border_color from '../../assets/templates/border_color.json';

export default {
    name: "TempMonitorChart",
    data () {
        return {
            data_type: "temperature",
            //axios statistics server instance
            statistics_service: null,

            //final objects whose datacollection and options gets inserted into the chart
            chartData: null,

            //arrays 
            init_data: [],

            //chart variable
            chart: null,

            //interval
            interval: 60000,

        }
    },
    methods: {
        randomScalingFactor () {
	        return Math.floor(Math.random() * 100) + 1  ;
        },
        init () {
            var self = this;

            //these are the final object whose datacollection and options gets inserted into the chart
            //deep copy json object template
            this.chartData = JSON.parse(JSON.stringify(monitor_chart_template.datacollection));

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
            // this.createChart();

        },
        //initial data
        getInitData () {
            var self = this;

            //`/logs/${this.data_type}/init/${user_id}/${this.vm_data.id}/${lane_id}`
            let promise = self.statistics_service.get(`/logs/${this.data_type}/init/hanope/machine1/`, {
            }).then(function (response, error) {
                console.log(response.data)
                self.init_data = response.data;

                //set flag to true to initiate chart creation
                self.data_ready = true;

                self.pushToDatacollection();
                self.createChart();
     
            }).catch(function (error) {
                console.log(error);
            });
            return promise;
        },
        pushToDatacollection () {
            var self = this;

            // console.log(self.init_data[0].data[0].date);
            // console.log(moment('2019-03-30 17:27:00').format('ll hh:mm:ss'));
            this.chartData.options.title.text = "Temperature Monitor: " + moment(self.init_data[0].data[0].date).format('ll');

            //push each lane data into a dataset, which is inserted into datacollection
            for(var i=0; i < self.init_data.length; i++){
                //current lane
                let lane = self.init_data[i].data;
            
                //dataset object to push into temp_datacollection
                let lane_dataset = {
                    "label": null,
                    "data": [],
                    "fill": false,
             
                    "borderColor": null,
                    "borderWidth": 1
                }

                //fix once server data match
                lane_dataset.label = "lane " + self.init_data[i].lane;

                for(var j=0; j < lane.length; j++) {
                    //split string to get just time
                    lane_dataset.data.push({
                        x: moment(lane[j].date, moment.ISO_8601).format('ll hh:mm:ss'),
                        y: lane[j].degree
                    });
                }
                //set border color for lane -> get from the linechart_template list of bordercolors              
                lane_dataset.borderColor = border_color.borderColor[i];

                //push current dataset (lane) into the datacollection
                // *having muliple lanes means having multiple datasets and labels
                self.chartData.data.datasets.push(lane_dataset);
            }
        },
        createChart: function () {
            var color = Chart.helpers.color;

            var ctx = document.getElementById('temp-canvas').getContext('2d');
            this.chart = new Chart(ctx, this.chartData);
        },
        updateData: function () {
            var self = this;
            this.interval = setInterval(() => {
                //`/logs/${this.data_type}/init/${user_id}/${this.vm_data.id}/${lane_id}`
                this.statistics_service.get(`/logs/${this.data_type}/hanope/machine1/`, {
                }).then(function (response, error) {
                    self.init_data = response.data;

                    //check if the updated data's number of lane matches current charts number of lanes
                    // if (self.chartData.data.datasets.length != self.init_data.length)
                    //     throw new Error("Retrieved update data's lane number does not match current charts num of lanes.")

                    for(var i=0; i < self.init_data.length; i++) {
                        let lane = self.init_data[i].data;
                        for(var j=0; j < lane.length; j++) {
                            self.chartData.data.datasets[i].data.shift();
                            self.chartData.data.datasets[i].data.push({
                                x: moment(lane[j].date, moment.ISO_8601).format('ll hh:mm:ss'),
                                y: self.init_data[i].data[j].degree
                            });
                        }
                    }

                    //update chart
                    self.chart.update();
        
                    }).catch(function (error) {
                        console.log(error);
                });
            }, self.interval);
        }
    },
    mounted ( ){
        this.init();
        this.updateData();
    }
}
</script>

<style scoped>
</style>
