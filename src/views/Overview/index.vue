<template>
    <div class="">
        <div class="d-flex justify-content-start">
            <h5> Overview </h5>
        </div>
        <hr />
        <div class="card" >
            <KakaoMap />
        </div>
    </div>
</template>

<script>
import KakaoMap from '../../components/KakaoMap.vue'

export default {
    name: 'Overview',
    components: {
        KakaoMap
    }
}
</script>

<style scoped>
    .card {
        border-color: white;
    }
</style>
