<template>
    <div id="map"></div>
</template>

<script>

import loadScriptOnce from 'load-script-once';

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

        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onreadystatechange = function () {
            if (this.readyState == 'complete') initialize();
        }

        script.onload = initialize;
        script.src = 'https://gis.kt.com/maps/v3.0/sdk.js?key=eb142d9027f84d51a4a20df8490e44bcf6fc7ef4dea64cae96a7fca282ebd8cc02764651';
        head.appendChild(script);
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
