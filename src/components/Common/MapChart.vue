<template>
<div>
    <div class="card-header">
        <label> 지역별 </label>
    </div>
    <div class="chart-container card-body" ref="chartdiv"></div>
    <div class="card-footer">
        <div class="input-box d-flex flex-row justify-content-center">
            <!-- search by data type -->
            <div id="data-type-select" class="d-flex flex-column">
                <select v-model="data_type" class="custom-select custom-select-sm mb-3">
                    <option value="visit">기사 방문량</option>
                    <option value="product_comp">인기 제품</option>
                    <option value="sales"> 개별 제품 판매량</option>
                </select>
            </div>

            <div v-if="data_type=='sales'" id="data-type-select" class="d-flex flex-column">
                <select v-model="product_type" class="custom-select custom-select-sm mb-3">
                    <option :value="product.drink_type" v-for="product in product_list" :key="product.id"> {{ product.drink_type }} </option>
                </select>
            </div>
            <date-picker v-on:update-chart="updateChart" />
        </div>
    </div>
</div>
</template>

<script>

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import submunicipality from "../../assets/geojson/submunicipalities.json";
import municipality from "../../assets/geojson/municipalities.json";
import province from "../../assets/geojson/provinces.json";

import DatePicker from "./DatePicker";

am4core.useTheme(am4themes_animated);

export default {
    name: 'MapChart',
    components: {
        DatePicker
    },
    data () {
        return {
            user_id: 'user1@kt.com',
            statistics_service: null,
            municipality_data : null,
            submunicipality_data: null,

            start: null,
            end: null,
            data_type: 'visit',

            product_list: null,
            product_type: null,

            tooltipText: `{name}\n 기사 방문 횟수 : {data}`,
        }
    },
    methods: {
        init () {
            var self = this;
            //automatically set date to search. (a week from today) ~ (today)

            this.start = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];
            this.end = new Date().toISOString().split("T")[0];

            //statistics service instance
            this.statistics_service = this.$axios.create({
                baseURL:'http://121.140.19.90:8080/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${$cookies.get('token')}`,
                },
                useCredentials: true,
                crossDomain: true,
            })
            this.getProductList().then(function () {
                self.getMunicipalityData();
            })
           
            
       
        },
        getProductList () {
            var self = this;

            var query = `/logs/sell/all/10`
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            let promise = this.statistics_service.get(query, {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.product_list = response.data;
                self.product_type = self.product_list[0].drink_type;
            }).catch(function (error) {
                console.log(error);
            })

            return promise;

        },
        getMunicipalityData () {
            var self = this;
            let query;

            if(this.data_type == 'visit') {
                query = `/logs/visit/loc/서울/${this.user_id}/`;
            }else if (this.data_type == 'product_comp') {
                query = `/logs/sell/loc/서울/${this.user_id}/`;
            } else if (this.data_type == 'sales'){ 
                query = `/logs/sell/${product_type}/loc/서울/${this.user_id}/`;
            } else {
                alert("Something has gone wrong")
            }
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            let promise = this.statistics_service.get(query, {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.municipality_data = response.data;
                console.log(response.data);
                self.buildMap();
            }).catch(function (error) {
                console.log(error);
            })

            return promise;
        },
        getSubmunicipalityData (district) {
            var self = this;
            let query;

            if(this.data_type == 'visit') {
                query = `/logs/visit/loc/서울/${district}/${this.user_id}/`;
            }else if (this.data_type == 'product_comp') {
                query = `/logs/sell/loc/서울/${district}/${this.user_id}/`;
            } else if (this.data_type == 'sales'){ 
                query = `/logs/sell/${product_type}/loc/서울/${district}/${this.user_id}/`;
            } else {

            }
            
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            let promise = this.statistics_service.get(query, {
                params: {
                    start: self.start,
                    end: self.end,
                }
            }).then(function (response, error) {
                self.submunicipality_data = response.data;
            }).catch(function (error) {
                console.log(error);
            })

            return promise;
        },
        setTooltipText () {
            //set tooltip text for each data type
            if (this.data_type == 'visit') {
                this.tooltipText = `{name}\n${self.data_type} : {data}`;
            } else if(this.data_type == 'sales') {
                this.tooltipText = `{name}\n {data}`;
            } else if(this.data_type == 'product_comp'){
                let string;
                // for (var i=0; i < this.product_list)
                this.tooltipText = `{name}\n${self.product_type} : {data}`;
            } else {

            }
        },
        //update chart on response from DatePicker
        updateChart: function (event) {

            this.getMunicipalityData(); 
            this.setTooltipText();
            alert('Map data updated');
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
            provincePolygonTemplate.tooltipText = self.tooltipText;
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
                municipalityPolygonTemplate.tooltipText = self.tooltipText;
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
                        submunicipalityPolygonTemplate.tooltipText = self.tooltipText;
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
    .chart-container {
        height: 400px;
    }
    .card-body {
        padding: 0;
    }
    .card-footer {
        padding: 0;
    }
    .data-type-select {
        min-width: 100px;
    }
    .custom-select {
        margin-bottom: 0;
    }

    #data-type-select {
        margin-top: 20px;
    }

    .input-box {
        margin:auto;
    }
</style>
