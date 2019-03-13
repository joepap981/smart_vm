<template>
    <div id="map"></div>
</template>

<script>

export default {
    name: 'KtMap',
    data: () => ({
        map: null,
        latlng: null,
    }),
    methods: {
    },
    mounted () {
        var initialize = function () {
            var mapOpts = {
                center: new olleh.maps.UTMK(958386.06353292, 1941447.5761742294),
                zoom: 9,
                mapTypeId: 'ROADMAP'
            };

            var map = new olleh.maps.Map(document.getElementById("map"), mapOpts);
        }

        initialize();

    
    }
}
</script>

<style scoped>
    #map {
        width:90%;
        height:400px;
        margin: auto;
        border-radius: 3px 3px 3px 3px;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }


</style>
