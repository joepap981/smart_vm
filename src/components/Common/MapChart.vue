<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import am4geodata_koreaSubmunicipalities from "../../assets/geojson/skorea_submunicipalities_2018_geo.json";
import am4geodata_koreaMunicipalities from "../../assets/geojson/skorea_municipalities_2018_geo.json";
import am4geodata_koreaProvinces from "../../assets/geojson/skorea_provinces_2018_geo.json";

am4core.useTheme(am4themes_animated);

export default {
    name: 'MapChart',
    methods: {
        
    },
    mounted() {
        //zoom depth of map
        //0: province, 1: municipality, 2: submunicipality
        var depth = 0;
        var curObject = null;

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

        //when zoom out button is pressed, 
        upButton.events.on("hit", function() {
            //if depth 2, zoom out to the previous
            if (depth > 1) {
                zoomOut(curObject);
            }
            //if depth 1 zoom out to home
            else if (depth == 1) {
                map.series.removeIndex(depth);
                depth--;
                curObject = null;
                map.goHome();
            } else {
                //do nothing if already home
            }
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
        provinceHS.properties.fill = am4core.color("#1E3D7E");

        //zoom in/out to municipality level when clicked
        provinceSeries.mapPolygons.template.events.on("hit", function(ev) {
            curObject = ev.target;
            //province(0) -> municipality(1)
            if (depth == 0) {
                zoomIn(ev.target);
            }
            //municipality(1) -> municipality(1)
            else if(depth == 1) {
                zoomMove(ev.target);
                curObject = ev.target;  
            }
            //submunicipality(2) -> municipality(1)
            else {
                zoomOut(ev.target);
                zoomMove(ev.target);
                curObject = ev.target;  
            }
            

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


            //zoom in/out to submunicipality level when clicked
            municipalitySeries.mapPolygons.template.events.on("hit", function(ev) {
                //municipality(1) -> submunicipality(2)
                if (depth == 1){
                    zoomIn(ev.target);
                }
                //submunicipality(2) -> another.submunicipality(2)
                else if (depth == 2) {
                    zoomMove(ev.target)
                }

                
                // set series for municipality for selected provice
                let submunicipalitySeries = map.series.push(new am4maps.MapPolygonSeries());
                //set template for series geodata
                submunicipalitySeries.geodata = {"type":"FeatureCollection", "features": []}
                //filter submunicipality that belongs to selected municipality
                submunicipalitySeries.geodata.features = am4geodata_koreaSubmunicipalities.features.filter(features => {
                    return features.id.substr(0,5) == ev.target.dataItem.dataContext.id;
                });

                let submunicipalityPolygonTemplate = submunicipalitySeries.mapPolygons.template;
                municipalityPolygonTemplate.tooltipText = "{name}";
                municipalityPolygonTemplate.fill = am4core.color("#002A8C");

                let submunicipalityHS = submunicipalityPolygonTemplate.states.create("hover");
                municipalityHS.properties.fill = am4core.color("#0035AE");
            });
        });

        var zoomMove = function (target) {
            map.series.removeIndex(depth);
            let selectedObjData = target.dataItem.dataContext;
                if (selectedObjData.zoomLevel != null) {
                    map.zoomToMapObject(target, selectedObjData.zoomLevel)
                } else {
                    map.zoomToMapObject(target)
            }
        }
        
        var zoomIn = function (target) {
            depth++;
            let selectedObjData = target.dataItem.dataContext;
                if (selectedObjData.zoomLevel != null) {
                    map.zoomToMapObject(target, selectedObjData.zoomLevel)
                } else {
                    map.zoomToMapObject(target)
            }

        };

        var zoomOut = function (target) {
            map.series.removeIndex(depth);
            depth--;
           
            let selectedObjData = target.dataItem.dataContext;
                if (selectedObjData.zoomLevel != null) {
                    map.zoomToMapObject(target, selectedObjData.zoomLevel)
                } else {
                    map.zoomToMapObject(target)
            }
        }

    }, beforeDestroy() {
        if (this.chart)
            this.chart.dispose();
    }
}

</script>

<style>

</style>
