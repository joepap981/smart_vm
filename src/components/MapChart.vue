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
import am4geodata_koreaMunicipalities from "../assets/geojson/provinces.json";

am4core.useTheme(am4themes_animated);

export default {
    name: 'MapChart',
    mounted() {
        //set map
        let map = am4core.create(this.$refs.chartdiv, am4maps.MapChart);
       
        map.geodata = am4geodata_koreaMunicipalities
        map.projection = new am4maps.projections.Miller();


        // set series for South Korea
        var koreaSeries = map.series.push(new am4maps.MapPolygonSeries());
        koreaSeries.useGeodata = true;
    
        var koreaPolygonTemplate = koreaSeries.mapPolygons.template;
        koreaPolygonTemplate.tooltipText = "{name}";
        koreaPolygonTemplate.fill = am4core.color("#74B266");

        var hs = koreaPolygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");
        

        koreaSeries.mapPolygons.template.events.on("hit", function(ev) {
            map.zoomToMapObject(ev.target);
            // set series for Seoul submunicipalities map
            var seoulSeries = map.series.push(new am4maps.MapPolygonSeries());
            seoulSeries.useGeodata = am4geodata_seoulMunicipalities;
        
            var seoulPolygonTemplate = seoulSeries.mapPolygons.template;
            seoulPolygonTemplate.tooltipText = "{name}";
            seoulPolygonTemplate.fill = am4core.color("#74B266");

            var hs = seoulPolygonTemplate.states.create("hover");
            hs.properties.fill = am4core.color("#367B25");


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

        });

        
        // //specify polygon that is being hovered over
        // seoulSeries.mapPolygons.template.events.on("hover", function(ev) {
        //     console.log(ev.target._dataItem._dataContext.id);
        // });
    

        


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
