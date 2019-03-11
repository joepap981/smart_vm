<template>
    <div class="">
        <div class="d-flex justify-content-start">
            <h5> Overview </h5>
        </div>
        <hr />
        <div class="card" >
            <!-- <vue-daum-map v-on:load="onLoad" v-bind:appKey= "appKey" v-bind:center= "center " style="width:500px;height:400px;"/> -->
            <kakao-map v-on:load="onLoad" style="width:500px;height:400px;"/>
        </div>
    </div>
</template>

<script>
import KakaoMap from '../../components/KakaoMap.vue'
// import VueDaumMap from 'vue-daum-map'

export default {
    name: 'Overview',
    components: {
        KakaoMap
        // VueDaumMap
    },
    // data: function() {
    //     return {
    //         appKey: 'a2ebbeb486802e2210128b28e3403190', // 테스트용 appkey
    //         center: {lat:33.450701, lng:126.570667}, // 지도의 중심 좌표
    //         level: 3, // 지도의 레벨(확대, 축소 정도),
    //         mapTypeId: VueDaumMap.MapTypeId.NORMAL, // 맵 타입
    //         libraries: [], // 추가로 불러올 라이브러리
    //         map: null // 지도 객체. 지도가 로드되면 할당됨.
    //     }
    // },
    // methods: {
    //     // 지도가 로드 완료되면 load 이벤트 발생
    //     onLoad (map) {
    //         console.log("onload")
    //         this.map = map
    //     }
    // }
}
</script>

<style scoped>
    .card {
        border-color: white;
        width: 100%;
        height: 500px;
    }
</style>
