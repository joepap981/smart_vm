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
    data () {
        return {
            vm_data: null
        }
    }
}
</script>

<style>
    .map-container {
        height: 400px;
    }

</style>
