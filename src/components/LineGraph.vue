<template>
    <div class="graph-container">
        <canvas id="line-graph" width= "400" height="80"> </canvas>
    </div>
</template>

<script>
import Chart from 'chart.js'

export default {
    name: 'LineGraph',
    data: function () {
        return {
            mockData: {
                labels: ["00", "01", "02", "03", "04", "05"],
                datasets: [
                    {
                        label: 'time: hours',
                        data: [12, 11, 3, 5, 2, 3],
                        backgroundColor:'rgba(0, 0, 0, 0)',
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                    ,{
                        label: 'time: hours',
                        data: [2, 14, 6, 2, 12, 4],
                        backgroundColor:'rgba(0, 0, 0, 0)',
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }, 

                ]
            }
        }
    },
    mounted() {
        var ctx = document.getElementById("line-graph").getContext('2d');
  
        //chart options 
        var chartOpts = {
            type: 'line',
            data: this.mockData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        }

        var myChart = new Chart(ctx, chartOpts);


    }
}
</script>

<style scoped>
</style>
