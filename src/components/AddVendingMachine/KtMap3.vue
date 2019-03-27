<template>
<div class="wrapper">
    <div id="map3"></div>
    <div class="coord row text-left justify-content-center">
        <p> x: {{ utmk.x }} </p>
        <p> y: {{ utmk.y }} </p>
    </div>
    <div class="form-group text-left">
        <label> Name </label>
        <input v-model="name" class="form-control" />
        <label> Province </label>
        <input v-model="address.province" class="form-control" />
        <label> Municipality </label>
        <input v-model="address.municipality" class="form-control" />
        <label> Submunicipality </label>
        <input v-model="address.submunicipality" class="form-control" />
        <button @click="registerVM()" class="btn btn-primary btn-sm"> Register </button>
    </div>
  
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'KtMap3',
    data: () => ({
        machine_service: null,
        vm_data: null,
        map3: null,
        latlng: null,
        utmk: {
            x: null,
            y: null,
        },
        address: {
            province: null,
            municipality: null,
            submunicipality: null,
        },
        name: null,
    }),
    props: {
    },
    methods: {
        initialize: function () {
            //initialize map
            var self = this;

            var mapOpts = {
                center: new olleh.maps.LatLng(37.5210873, 127.0889181),
                zoom: 4,
                mapTypeId: 'ROADMAP',
                disableDefaultUI: true
            };

            self.map3 = new olleh.maps.Map(document.getElementById("map3"), mapOpts);

            // var marker = new olleh.maps.overlay.Marker({
            //     position: new olleh.maps.LatLng(37.5210873, 127.0889181),
            //     map: self.map,
            //     visible: false,
            // })

            this.map3.onEvent('click', function (event, payload){
                // marker.position = event.getCoord(),
                // marker.visible = true;
                
                self.utmk.x = event.getCoord().x;
                self.utmk.y = event.getCoord().y;
            })

            //machine-service
             this.machine_service = axios.create({
                baseURL:'http://localhost:8100/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
        },
        getMachineList () {
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            this.machine_service.get('/machines/', {
            }).then(function (response, error) {
                self.vm_data = response.data.content;
                console.log(response.data.content);
            }).catch(function (error) {
                console.log(error);
            })
        },
        registerVM () {
            var self = this;
            var clearFields = function () {
                self.utmk.x = null;
                self.utmk.y = null;
                self.address.province= null;
                self.address.municipality = null;
                self.address.submunicipality= null;
                self.name = null;
            }
            

            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            this.machine_service.post('/machines/', {
                location: {
                    address: self.address,
                    latitude: self.utmk.x,
                    longitude: self.utmk.y
                },
                name: self.name
            }).then(function (response, error) {
                console.log(response.data);
                clearFields();
            }).catch(function (error) {
                console.log(error);
            })

        }
    },
    mounted () {
        this.initialize();
    }
}
</script>

<style scoped>
    #map3 {
        width:100%;
        height:100%;
        margin: auto;
        border-radius: 3px 3px 3px 3px;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }

    .wrapper {
        height: 300px;
    }
    .coord p {
        font-size: 14px;
        min-width: 200px;
        margin: 10px 20px 0px 20px;
    }

    .btn-primary {
        width: 100%;
        margin: auto;
        margin-top: 20px;
    }

</style>
