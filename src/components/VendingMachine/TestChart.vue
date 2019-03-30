<template>
    <div>
        <div style="width:75%;">
            <canvas id="canvas"></canvas>
        </div>
        <button id="addData" @click="addData()">Add Data</button>
    </div>


</template>

<script>
import axios from 'axios';
import linechart_template from '../../assets/templates/linechart_template.json';

export default {
    name: "TestChart",
    props: {
        data_type: null
    },
    data () {
        return {
            //axios statistics server instance
            statistics_service: null,

            //final objects whose datacollection and options gets inserted into the chart
            chartData: null,

            //arrays 
            init_data: [],

            //flags to alert chart that data has been received
            data_ready: false,
            
            cur: 5,
            chartData: null
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
            // this.createChart();

        },
        //initial data
        getInitData () {
            var self = this;

            //`/logs/${this.data_type}/init/${user_id}/${this.vm_data.id}/${lane_id}`
            let promise = self.statistics_service.get(`/logs/${this.data_type}/init/user1@kt.com/machine1/`, {
            }).then(function (response, error) {
                self.init_data = response.data;


                //set flag to true to initiate chart creation
                self.data_ready = true;

                self.pushToDatacollection();
     
            }).catch(function (error) {
                console.log(error);
            });
            return promise;
        },
        pushToDatacollection () {
            var self = this;

            // console.log(self.init_data[0].data[0].date);
            console.log(moment('2019-03-30 17:27:00').format('ll hh:mm:ss'));

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
                    lane_dataset.data.push({
                        x: moment(lane[j].date).format('ll hh:mm:ss'),
                        y: lane[j].degree
                    });
                }
                //set border color for lane -> get from the linechart_template list of bordercolors              
                lane_dataset.borderColor.push(self.chartData.borderColor[i])

                //push current dataset (lane) into the datacollection
                // *having muliple lanes means having multiple datasets and labels
                self.chartData.datacollection.datasets.push(lane_dataset);
            }
            console.log(self.chartData.datacollection)
        },
        createChart: function () {
            var color = Chart.helpers.color;
            this.chartData = {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Dataset with string point data',
                        backgroundColor: "red",
                        borderColor: "red",
                        fill: false,
                        data: [{
                            x: moment(),
                            y: this.randomScalingFactor()
                        }, {
                            x: moment()+2,
                            y: this.randomScalingFactor()
                        }, {
                            x: moment()+4,
                            y: this.randomScalingFactor()
                        }, {
                            x: moment()+6,
                            y: this.randomScalingFactor()
                        }],
                    }, {
                        label: 'Dataset with date object point data',
                        backgroundColor: "blue",
                        borderColor: "blue",
                        fill: false,
                        data: [{
                            x: moment(),
                            y: this.randomScalingFactor()
                        }, {
                            x: moment()+2,
                            y: this.randomScalingFactor()
                        }, {
                            x: moment()+4,
                            y: this.randomScalingFactor()
                        }, {
                            x: moment()+6,
                            y: this.randomScalingFactor()
                        }]
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Time Point Data'
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            },
                            ticks: {
                                major: {
                                    fontStyle: 'bold',
                                    fontColor: '#FF0000'
                                }
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'value'
                            }
                        }]
                    }
                }
            };

            var ctx = document.getElementById('canvas').getContext('2d');
            window.myLine = new Chart(ctx, this.chartData);
        },
        addData: function () {
                if (this.chartData.data.datasets.length > 0) {
                    this.chartData.data.datasets[0].data.push({
                        x: moment() + this.cur,
                        y: this.randomScalingFactor()
                    });
                    this.chartData.data.datasets[1].data.push({
                        x: moment() + this.cur,
                        y: this.randomScalingFactor()
                    });

                    this.cur++;

                    window.myLine.update();
                }
        }
    },
    mounted ( ){
        this.init();
    }
}
</script>

<style>

</style>
