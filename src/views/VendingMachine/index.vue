<template>
    <div>
        <div class="top-nav">
            <h5> 자판기 {{ vm_id}} </h5>
        </div>

        <!-- Temperature Monitoring Graph-->
        <div class="card">
            <div class="card-header">
                <p class="card-header-title"> 온도 </p>
            </div>

            <!--Line Graph-->
            <div class="card-body">
                <line-graph />
            </div>
        </div>

        <!-- Humidity Monitoring Graph-->
        <div class="card">
            <div class="card-header">
                <p class="card-header-title"> 습도 </p>
            </div>

            <!--Line Graph-->
            <div class="card-body">
                <line-graph />
            </div>
        </div>
    </div>
</template>

<script>
import LineGraph from '../../components/LineGraph.vue'

export default {
    name: 'VendingMachine',
    components: {
        LineGraph
    },
    data: function (){
        return {
            vm_id: 0
        }
    },
}
</script>

<style scoped>
    .card {
        margin-bottom: 20px;
    }
</style>
