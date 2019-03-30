<template>
import { close } from 'fs';
    <div id="map2"></div>
</template>

<script>

export default {
    name: 'KtMap2',
    data: () => ({
        map2: null,
        latlng: null,
    }),
    props: {
        map_data: Array,
        map_id: String,
    },
    watch: {
        map_data: function (value) {
            var self = this;
            console.log('here');
            
            //if the map is not initialize create new map
            if(this.map2 == null) {
                this.initialize();
            }

            //loop through array of vending machines and add marker on map
            value.forEach(function(coor) {
                var marker = new olleh.maps.overlay.Marker({
                    position: new olleh.maps.UTMK(coor.location.latitude, coor.location.longitude),
                    map: self.map2,
                    // icon: {
                    //     url:'../assets/vending-machine2.png'
                    // }
                })
            });
        }
    },
    methods: {
        initialize: function () {
            var self = this;

            var mapOpts = {
                center: new olleh.maps.LatLng(this.vm_data[0].location.latitude, this.vm_data[0].location.longitude),
                zoom: 6,
                mapTypeId: 'ROADMAP',
                disableDefaultUI: true
            };

            self.map2 = new olleh.maps.Map(document.getElementById("map2"), mapOpts);
        },
    },
}
</script>

<style scoped>
    #map2 {
        width:90%;
        height:100%;
        margin: auto;
        border-radius: 3px 3px 3px 3px;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }


</style>
