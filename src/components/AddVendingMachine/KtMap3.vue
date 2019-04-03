<template>
<div class="wrapper">
    <div id="map3"></div>
    <div class="coord row text-left justify-content-center">
        <p> x: {{ coord.lat }} </p>
        <p> y: {{ coord.lng }} </p>
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
        coord: {
            lat: 36.123,
            lng: 126.123,
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
         
            // this.authMachineToUser();
            //initialize map
            var self = this;

            var mapOpts = {
                center: new olleh.maps.LatLng(37.41684166505688, 127.11765038867628),
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
                var coord = new olleh.maps.LatLng.valueOf(event.getCoord());
                
                self.coord.lat= coord.x;
                self.coord.lng = coord.y;

            })

            //machine-service
             this.machine_service = axios.create({
                baseURL:self.$service.zuul_service,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${$cookies.get('access_token')}`,
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

            }).catch(function (error) {
                console.log(error);
            })
        },
        authMachineToUser () {
            var self = this;
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            this.machine_service.post(`/users/${$cookies.get('username')}/machines/${self.name}`, {
            }).then(function (response, error) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
            console.log($cookies.get('username'));
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

            if (self.utmk.x == null || self.utmk.y == null ) {
                alert('좌표를 찍어주세요!')
            } else {
                //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
                this.machine_service.post('/machines/', {
                    location: {
                        address: self.address,
                        latitude: self.utmk.x,
                        longitude: self.utmk.y
                    },
                    name: self.name
                }).then(function (response, error) {
                    self.authMachineToUser();
                    alert("registered")
                    clearFields();
                    self.$router.push('/vm_list')
                }).catch(function (error) {
                    console.log(error);
                })
            }
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
