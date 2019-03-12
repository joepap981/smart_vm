<template>
    <div id="map"></div>
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
        loadScriptOnce('//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a2ebbeb486802e2210128b28e3403190&libraries=services', (err) => {
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
                var geocoder = new daum.maps.services.Geocoder();
                daum.maps.event.addListener(this.map, 'click', function(mouseEvent) {
                    this.latlng = mouseEvent.latLng;
                    
                    var callback = function(result, status) {
                        if (status === daum.maps.services.Status.OK) {
                            console.log(result[0].address);
                            
                        }
                    };

                    geocoder.coord2Address(this.latlng.getLng(), this.latlng.getLat(), callback);
                    console.log(this.latlng)
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
    #map {
        width:100%;
        height:400px;
    }
</style>
