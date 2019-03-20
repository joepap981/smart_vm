<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4geodata_southKoreaHigh from "@amcharts/amcharts4-geodata/southKoreaHigh";
import am4geodata_seoulSubmunicipalities from "../assets/geojson/seoul_submunicipalities.json";
import am4geodata_seoulMunicipalities from "../assets/geojson/seoul_municipalities.json";
// import am4geodata_koreaMunicipalities from "../assets/geojson/provinces.json";

am4core.useTheme(am4themes_animated);

export default {
    name: 'MapChart',
    mounted() {
        //set map
        let map = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
        //disable wheel control + pan control + double click zoom
        map.chartContainer.wheelable = false;
        map.seriesContainer.draggable = false;
        map.seriesContainer.resizable = false;
        map.seriesContainer.events.disableType("doublehit");
        map.chartContainer.background.events.disableType("doublehit");

        //map up level button
        var upButton = map.chartContainer.createChild(am4core.Button);
        upButton.label.text = "+";
        upButton.label.fontSize= 9;
        upButton.padding(5, 5, 5, 5);
        upButton.width = 20;
        upButton.align = "right";
        upButton.marginRight = 30;
        upButton.cursorOverStyle = am4core.MouseCursorStyle.pointer;
        upButton.events.on("hit", function() {
            map.goHome();
            //remove submunicipality
            if (map.series._values.length > 1)
                map.series.removeIndex(1);
        });

        // set series for Seoul municipalities map

        map.geodata = am4geodata_seoulMunicipalities;
        map.projection = new am4maps.projections.Miller();


        // set series for South Korea
        var seoulSeries = map.series.push(new am4maps.MapPolygonSeries());
        seoulSeries.useGeodata = true;
    
        var seoulPolygonTemplate = seoulSeries.mapPolygons.template;
        seoulPolygonTemplate.tooltipText = "{name}";
        seoulPolygonTemplate.fill = am4core.color("#113f67");

        var hs = seoulPolygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#226597");

        // console.log(seoulPolygonTemplate)


        // //specify polygon that is being hovered over
        // seoulSeries.mapPolygons.template.events.on("over", function(ev) {
        //     console.log(ev.target.dataItem.dataContext.id);

        //zoom into municipality to show submuniciple
        seoulSeries.mapPolygons.template.events.on("hit", function(ev) {
            //remove loaded submunicipality series
            if (map.series._values.length > 1)
                map.series.removeIndex(1);

            map.zoomToMapObject(ev.target);

            // set series for Seoul submunicipalities map
            var seoulSubSeries = map.series.push(new am4maps.MapPolygonSeries());
            // seoulSubSeries.geodata = am4geodata_seoulSubmunicipalities;
            seoulSubSeries.geodata = {"type":"FeatureCollection", "features": [
            ]}

            seoulSubSeries.geodata.features = am4geodata_seoulSubmunicipalities.features.filter(features => {
                return features.properties.municipality == ev.target.dataItem.dataContext.id;
            });
                
            var seoulSubPolygonTemplate = seoulSubSeries.mapPolygons.template;
            seoulSubPolygonTemplate.tooltipText = "{name}";
            seoulSubPolygonTemplate.fill = am4core.color("#87c0cd");

            var hs2 = seoulSubPolygonTemplate.states.create("hover");
            hs2.properties.fill = am4core.color("#f3f9fb");
        });

    }, beforeDestroy() {
        if (this.chart)
            this.chart.dispose();
    }
}

</script>

<style>

</style>
