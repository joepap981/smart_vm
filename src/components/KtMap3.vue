<template>
    <div id="map"></div>
</template>

<script>

export default {
    name: 'KtMap3',
    data: () => ({
        map: null,
        latlng: null,
    }),
    props: {
    },
    methods: {
        initialize: function () {
            var self = this;

            var mapOpts = {
                center: new olleh.maps.LatLng(37.5210873, 127.0889181),
                zoom: 4,
                mapTypeId: 'ROADMAP',
                disableDefaultUI: true
            };

            self.map = new olleh.maps.Map(document.getElementById("map"), mapOpts);
        },
    },
    mounted () {
        this.initialize();
    }
}
</script>

<style scoped>
    #map {
        width:100%;
        height:100%;
        margin: auto;
        border-radius: 3px 3px 3px 3px;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }


</style>
