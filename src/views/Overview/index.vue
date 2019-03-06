<template>
    <div class="">
        <div class="d-flex justify-content-start">
            <h5> Overview </h5>
        </div>
        <hr />
        <div class="card">

        </div>
        
    </div>
</template>


<script>
import KakaoMap from '../components/KakaoMap.vue';

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
<!-- <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title text-left"> 자판기 </p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body ">
                        <p class="card-title text-left"> 장애현황 </p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title text-left"> 재고현황 </p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title text-left"> 통계 </p>
                    </div>
                </div>
            </div>
        </div> -->