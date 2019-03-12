<template>
    <div>
        <div class="top-nav">
            <h5> 자판기 {{ vm_id}} </h5>
        </div>
        <div class="card">
            <div class="card-header">
                <p> 온도 </p>
            </div>
        </div>
    </div>
</template>

<script>
import LineGraph from '../components/LineGraph.vue'

export default {
    name: 'VendingMachine',
    data: function (){
        return {
            vm_id: 0
        }
    },
    mounted () {
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        })
    }
}
</script>

<style scoped>
    
</style>
