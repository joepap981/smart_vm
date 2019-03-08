<template>
    <div id="map" style="width:100%;height:350px;"></div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=a2ebbeb486802e2210128b28e3403190"></script>
<script>

import loadScriptOnce from 'load-script-once';

export default {
    name: 'KakaoMap',
    mounted () {
        console.log("KakaoMap")
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }
        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new daum.maps.Map(mapContainer, mapOption); 

        //var load = require('load-script-once')
 
        // load('http://dapi.kakao.com/v2/maps/sdk.js?appkey=a2ebbeb486802e2210128b28e3403190', function (err, script) {
        //     if (err) {
        //         // print useful message
        //         console.log(err)
        //     }
        //     else {
        //         var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        //         mapOption = { 
        //             center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        //             level: 3 // 지도의 확대 레벨
        //         }

        //         // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        //         var map = new daum.maps.Map(mapContainer, mapOption); 
        //         console.log('loaded script')
        //     }
        // })


    }
}
</script>

<style scoped>

</style>
