<template>
    <div>
        <div class="top-nav">
            <h5> 자판기 {{ vm_id}} </h5>
        </div>
        <div class="card">
            <div class="card-header">
                <p> 온도 </p>
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

</style>
