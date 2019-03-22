<template>
    <div class="map-container">
        <kt-map />
    </div>
</template>

<script>
import KtMap from '../KtMap.vue'
export default {
    name: 'OverviewMap',
    components: {
        KtMap
    },
    props: ['vm_data'],
    data () {
        return {
            map_data: this.vm_data
        }
    },
    computed: {
        printData: function () {
            console.log("map_data"+ this.map_data)
        }
    },
    watch: {
      vm_data(value) {
        debugger;
        console.log("vm_data: "+value)
      }
    },
    beforeMount () {
        console.log("overviewmap beforemount")
        console.log("vm_data")
        console.log(this.vm_data)
        console.log("map_data")
        console.log(this.map_data)
    },
    mounted () {
        console.log("overviewmap mount")
        console.log("vm_data")
        console.log(this.vm_data)
        console.log("map_data")
        console.log(this.map_data)
        
    },
    beforeUpdate () {
        console.log("overviewmap beforeupdate")
        console.log("vm_data")
        console.log(this.vm_data)
        console.log("map_data")
        console.log(this.map_data)
    },
    updated () {
        console.log("overviewmap updated")
        console.log("vm_data")
        console.log(this.vm_data)
        console.log("map_data")
        console.log(this.map_data)
    }
}
</script>

<style>
    .map-container {
        height: 400px;
    }
</style>