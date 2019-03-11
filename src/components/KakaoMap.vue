<template>
    <div id="map" style="width:500px;height:400px;"></div>
</template>

<script>

import loadScriptOnce from 'load-script-once';

export default {
    name: 'KakaoMap',
    data: () => ({
        map: null,
        latlng: null,
    }),
    mounted () {
        loadScriptOnce('//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a2ebbeb486802e2210128b28e3403190', (err) => {
            if (err) {
                console.error(err);
                return;
            }

            //once map lib is loaded setup map
            daum.maps.load(() => {
                var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                var options = { //지도를 생성할 때 필요한 기본 옵션
                    center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                    level: 7 //지도의 레벨(확대, 축소 정도)
                };

                this.map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴


                //return coordinates on click
                daum.maps.event.addListener(this.map, 'click', function(mouseEvent) {
                    var latlng = mouseEvent.latLng;
                    console.log(latlng);
                });

                //set up markers
                var markerPosition  = new daum.maps.LatLng(33.450701, 126.570667); 

                var marker = new daum.maps.Marker({
                    position: markerPosition
                });

                marker.setMap(this.map);
            })
      });
    }
}
</script>

<style scoped>

</style>
