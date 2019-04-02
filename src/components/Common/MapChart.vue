<template>
<div class="hello" ref="chartdiv"></div>
</template>

<script>
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import submunicipality from "../../assets/geojson/submunicipalities.json";
import municipality from "../../assets/geojson/municipalities.json";
import province from "../../assets/geojson/provinces.json";

am4core.useTheme(am4themes_animated);

export default {
    name: 'MapChart',
    data () {
        return {
            user_id: 'user1@kt.com',
            statistics_service: null,
            data_ready: false,
            municipality_data : null,
            submunicipality_data: null,

            start: null,
            end: null,
            data_type: 'Sales',
        }
    },
    methods: {
        init () {
            var self = this;
            //automatically set date to search. (a week from today) ~ (today)

            this.start = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];
            this.end = new Date().toISOString().split("T")[0];

            //statistics service instance
            this.statistics_service = axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getMunicipalityData();
       
        },
        getMunicipalityData () {
            var self = this;
            let query = `/logs/visit/loc/서울/${this.user_id}/`;
         
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            let promise = this.statistics_service.get(query, {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.municipality_data = response.data;
                self.buildMap();
                self.data_ready = true;
            }).catch(function (error) {
                console.log(error);
            })

            return promise;
        },
        getSubmunicipalityData (district) {
            var self = this;
            let query = `/logs/visit/loc/서울/${district}/${this.user_id}/`;
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            let promise = this.statistics_service.get(query, {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.submunicipality_data = response.data;
                self.data_ready = true;
            }).catch(function (error) {
                console.log(error);
            })

            return promise;
        },
        //build the 3 layer map chart
        buildMap () {
            //zoom depth of map
            //0: province, 1: municipality, 2: submunicipality
            var depth = 0;
            var curObject = null;
            var self = this;

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
            map.geodata = province;

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
                municipalitySeries.geodata.features = municipality.features.filter(features => {
                    return features.id.substr(0,2) == ev.target.dataItem.dataContext.id;
                });

                //insert data
                for(var i=0; i < self.municipality_data.length; i++) {
                    for(var j=0; j < municipalitySeries.geodata.features.length; j++){
                        if(self.municipality_data[i].loc == municipalitySeries.geodata.features[j].properties.name) {
                            municipalitySeries.geodata.features[j].properties.data = self.municipality_data[i].count;
                        }
                    }
                }

                var municipalityPolygonTemplate = municipalitySeries.mapPolygons.template;
                municipalityPolygonTemplate.tooltipText = `{name}\n${self.data_type} : {data}`;
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

                    var tempFeatures = submunicipality.features.filter(features => {
                        return features.id.substr(0,5) == ev.target.dataItem.dataContext.id;
                    });

                    var municipality_name = ev.target.dataItem.dataContext.name;

                    self.getSubmunicipalityData(municipality_name).then(function() {
                        //insert data
                        for(var i=0; i < self.submunicipality_data.length; i++) {
                            for(var j=0; j < tempFeatures.length; j++){
                                if(self.submunicipality_data[i].loc == tempFeatures[j].properties.name) {
                                   tempFeatures[j].properties.data = self.submunicipality_data[i].count;
                                }
                            }
                        }

                        // set series for municipality for selected provice
                        var submunicipalitySeries = map.series.push(new am4maps.MapPolygonSeries());
                        //set template for series geodata
                        submunicipalitySeries.geodata = {"type":"FeatureCollection", "features": []}
                        //filter submunicipality that belongs to selected municipality
                        submunicipalitySeries.geodata.features = tempFeatures;

                        var submunicipalityPolygonTemplate = submunicipalitySeries.mapPolygons.template;
                        submunicipalityPolygonTemplate.tooltipText = `{name}\n${self.data_type} : {data}`;
                        submunicipalityPolygonTemplate.fill = am4core.color("#7D7FD2");

                        var submunicipalityHS = submunicipalityPolygonTemplate.states.create("hover");
                        submunicipalityHS.properties.fill = am4core.color("#BDBED9");

                    }).catch(function(error) {
                        console.log(error);
                    });
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
        }
    },
    mounted() {
        this.init()

    }, beforeDestroy() {
        if (this.chart)
            this.chart.dispose();
    }
}

</script>

<style scoped>
</style>
