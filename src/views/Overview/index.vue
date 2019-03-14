<template>
    <div class="">
        <div class="top-nav">
            <h5> Overview </h5>
        </div>

        <div class="row">
            <div class="col-xl-9 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 자판기 위치 </p>
                    </div>
                    <div class="card-body">
                        <div class="map-container">
                            <kt-map />
                            <!-- <kakao-map /> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 자판기 </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 재고알람 </p>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-md-12">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 장애알람 </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-12">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> x </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import KakaoMap from '../../components/KakaoMap.vue'
import KtMap from '../../components/KtMap.vue'

export default {
    name: 'Overview',
    components: {
        // KakaoMap, 
        KtMap
    },
}
</script>

<style scoped>
    .card {
        border-color: white;
        width: 100%;
        height: 500px;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .row {
        margin-right:0;
    }

    .col-xl-3, .col-md-12, .col-xl-6, .col-xl-9 {
        padding-right: 10px!important;
        padding-left: 10px!important;
    }

    .map-container {
        height: 400px;
    }

</style>
