<template>
    <div class="hello" ref="chartdiv">
    </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_southKoreaHigh from "@amcharts/amcharts4-geodata/southKoreaHigh";
import am4geodata_seoulSubmunicipalities from "../assets/geojson/seoul_submunicipalities.json";
import am4geodata_seoulMunicipalities from "../assets/geojson/seoul_municipalities.json";

am4core.useTheme(am4themes_animated);

export default {
    name: 'MapChart',
    mounted() {
        let map = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
        

        // set series for Seoul submunicipalities map
        map.geodata = am4geodata_seoulMunicipalities;
        map.projection = new am4maps.projections.Miller();

        var seoulSeries = map.series.push(new am4maps.MapPolygonSeries());
        seoulSeries.useGeodata = true;
    
        var seoulPolygonTemplate = seoulSeries.mapPolygons.template;
        seoulPolygonTemplate.tooltipText = "{name}";
        seoulPolygonTemplate.fill = am4core.color("#74B266");

        var hs = seoulPolygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");


        //specify polygon that is being hovered over
        seoulSeries.mapPolygons.template.events.on("over", function(ev) {
            console.log(ev.target._dataItem._dataContext.id);
        });
    

        seoulSeries.mapPolygons.template.events.on("hit", function(ev) {
            map.zoomToMapObject(ev.target);


            // set series for Seoul submunicipalities map
            var seoulSubSeries = map.series.push(new am4maps.MapPolygonSeries());
            seoulSubSeries.geodata = am4geodata_seoulSubmunicipalities;
                
            var seoulSubPolygonTemplate = seoulSubSeries.mapPolygons.template;
            seoulSubPolygonTemplate.tooltipText = "{name}";
            seoulSubPolygonTemplate.fill = am4core.color("#74B266");

            var hs = seoulSubPolygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color("#367B25");
            
            // console.log(seoulSubPolygonTemplate.visible)
            // console.log(seoulSubPolygonTemplate.show(5000))
            // seoulSubPolygonTemplate.toFront();
            // console.log(seoulSubPolygonTemplate.visible)
        });
        


// 1105057



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
