<template>
    <div>
        <div style="width:75%;">
            <canvas id="canvas"></canvas>
        </div>
        <br>
        <br>

        <button id="addData" @click="addData()">Add Data</button>
    </div>


</template>

<script>
export default {
    name: "TestChart",
    data () {
        return {
            cur: 5,
            config: null
        }
    },
    methods: {
        randomScalingFactor () {
	        return Math.floor(Math.random() * 100) + 1  ;
        },
        newDate: function (days) {
			return moment().add(days, 'd').toDate();
		},
		newDateString: function (days) {
			return moment().add(days, 'd').format();
        },
        init: function () {
            var color = Chart.helpers.color;
            this.config = {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Dataset with string point data',
                        backgroundColor: "red",
                        borderColor: "red",
                        fill: false,
                        data: [{
                            x: 1,
                            y: this.randomScalingFactor()
                        }, {
                            x: 2,
                            y: this.randomScalingFactor()
                        }, {
                            x: 3,
                            y: this.randomScalingFactor()
                        }, {
                            x: 4,
                            y: this.randomScalingFactor()
                        }],
                    }, {
                        label: 'Dataset with date object point data',
                        backgroundColor: "blue",
                        borderColor: "blue",
                        fill: false,
                        data: [{
                            x: 1,
                            y: this.randomScalingFactor()
                        }, {
                            x: 2,
                            y: this.randomScalingFactor()
                        }, {
                            x: 3,
                            y: this.randomScalingFactor()
                        }, {
                            x: 4,
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
                window.myLine = new Chart(ctx, this.config);

            
        },
        addData: function () {
            
                if (this.config.data.datasets.length > 0) {
                    this.config.data.datasets[0].data.push({
                        x: this.cur,
                        y: this.randomScalingFactor()
                    });
                    this.config.data.datasets[1].data.push({
                        x: this.cur,
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
