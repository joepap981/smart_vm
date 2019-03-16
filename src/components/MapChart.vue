<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);

export default {
    name: 'MapChart',
    mounted() {
            let map = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
            map.geodata = am4geodata_worldLow;
            map.projection = new am4maps.projections.Miller();

            var polygonSeries = new am4maps.MapPolygonSeries();
            polygonSeries.useGeodata = true;
            map.series.push(polygonSeries);


            //
            polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
            map.zoomToMapObject(ev.target);

            // Configure series
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}";
            polygonTemplate.fill = am4core.color("#74B266");

            // Create hover state and set alternative fill color
            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color("#367B25");

        });
    },

    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}

</script>

<style>

</style>
