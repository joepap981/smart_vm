<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import am4geodata_koreaSubmunicipalities from "../assets/geojson/skorea_submunicipalities_2018_geo.json";
import am4geodata_koreaMunicipalities from "../assets/geojson/skorea_municipalities_2018_geo.json";
import am4geodata_koreaProvinces from "../assets/geojson/skorea_provinces_2018_geo.json";

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

        map.seriesContainer.events.on("hit", function(ev) {
            console.log((map).svgPointToGeo(ev.svgPoint));
        });

    
        // set series for Seoul municipalities map
        map.geodata = am4geodata_koreaProvinces;
        // map.geodata = am4geodata_seoulMunicipalities;
        map.projection = new am4maps.projections.Miller();

        var provinceSeries = map.series.push(new am4maps.MapPolygonSeries());
        provinceSeries.useGeodata = true;
        var provincePolygonTemplate = provinceSeries.mapPolygons.template;
        provincePolygonTemplate.tooltipText = "{name}";
        provincePolygonTemplate.fill = am4core.color("#00184E");
        var provinceHS = provincePolygonTemplate.states.create("hover");
        provinceHS.properties.fill = am4core.color("#00226F");

        provinceSeries.mapPolygons.template.events.on("hit", function(ev) {
        //     var center = {
        //         latitude:,
        //         longitude
        //     }

            map.zoomToMapObject(ev.target)
            // map.zoomToGeoPoint(center,3, false);
            // set series for municipality for selected provice
            var municipalitySeries = map.series.push(new am4maps.MapPolygonSeries());
            //set template for series geodata
            municipalitySeries.geodata = {"type":"FeatureCollection", "features": []}
            //filter submunicipality that belongs to selected municipality
            municipalitySeries.geodata.features = am4geodata_koreaMunicipalities.features.filter(features => {
                return features.id.substr(0,2) == ev.target.dataItem.dataContext.id;
            });

            var municipalityPolygonTemplate = municipalitySeries.mapPolygons.template;
            municipalityPolygonTemplate.tooltipText = "{name}";
            municipalityPolygonTemplate.fill = am4core.color("#002A8C");

            var municipalityHS = municipalityPolygonTemplate.states.create("hover");
            municipalityHS.properties.fill = am4core.color("#0035AE");
        });



        // // set series for South Korea
        // var seoulSeries = map.series.push(new am4maps.MapPolygonSeries());
        // seoulSeries.useGeodata = true;
    
        // var seoulPolygonTemplate = seoulSeries.mapPolygons.template;
        // seoulPolygonTemplate.tooltipText = "{name}";
        // seoulPolygonTemplate.fill = am4core.color("#113f67");

        // var hs = seoulPolygonTemplate.states.create("hover");
        // hs.properties.fill = am4core.color("#226597");

        // //zoom into municipality to show submuniciple
        // seoulSeries.mapPolygons.template.events.on("hit", function(ev) {
        //     //remove loaded submunicipality series
        //     if (map.series._values.length > 1)
        //         map.series.removeIndex(1);

        //     map.zoomToMapObject(ev.target);

        //     // set series for Seoul submunicipalities map
        //     var seoulSubSeries = map.series.push(new am4maps.MapPolygonSeries());
        //     seoulSubSeries.geodata = {"type":"FeatureCollection", "features": [
        //     ]}

        //     //filter submunicipality that belongs to selected municipality
        //     seoulSubSeries.geodata.features = am4geodata_seoulSubmunicipalities.features.filter(features => {
        //         return features.properties.municipality == ev.target.dataItem.dataContext.id;
        //     });
                
        //     var seoulSubPolygonTemplate = seoulSubSeries.mapPolygons.template;
        //     seoulSubPolygonTemplate.tooltipText = "{name}";
        //     seoulSubPolygonTemplate.fill = am4core.color("#87c0cd");

        //     var hs2 = seoulSubPolygonTemplate.states.create("hover");
        //     hs2.properties.fill = am4core.color("#f3f9fb");
        // });

    }, beforeDestroy() {
        if (this.chart)
            this.chart.dispose();
    }
}

</script>

<style>

</style>
