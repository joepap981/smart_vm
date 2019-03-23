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
    data() {
        return {
            map_data: this.vm_data,
        }
    },
    watch: {
        vm_data: function (val) {
            console.log(val);
        }
    },
    methods: {
    },

}
</script>

<style>
    .map-container {
        height: 400px;
    }

</style>
