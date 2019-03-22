<template>
    <div class="">
        <div class="top-nav">
            <h5> Overview </h5>
        </div>

        <div class="row">
            <div class="col-xl-9 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 자판기 위치 </p>
                    </div>
                    <div class="card-body">
                        <div class="map-container">
                            <overview-map />
                            <!-- <kt-map /> -->
                            <!-- <kakao-map /> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 자판기 </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 재고알람 </p>
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-md-12">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 장애알람 </p>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-12">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> x </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import KakaoMap from '../../components/KakaoMap.vue'
// import KtMap from '../../components/KtMap.vue'
import OverviewMap from '../../components/Overview/OverviewMap.vue'
import axios from 'axios'

export default {
    name: 'Overview',
    components: {
        // KakaoMap, 
       OverviewMap
    },
    data: function () {
        return {
            vm_data: null
        }
    },
    methods: {
        getVMData: function () {
            //state this component for use in axios 'then' callback function
            var self = this;
          
            const instance = axios.create({
                baseURL:'http://localhost:8082',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })
            //'/logs/sell/user1?start=2019-03-01&end=2019-03-28'
            instance.get('/machines', {
            }).then(function (response, error) {
                console.log(response.data.content);
            }).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted () {
        this.getVMData()
    }
}
</script>

<style scoped>
    .card {
        border-color: white;
        width: 100%;
        height: 500px;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .row {
        margin-right:0;
    }

    .col-xl-3, .col-md-12, .col-xl-6, .col-xl-9 {
        padding-right: 10px!important;
        padding-left: 10px!important;
    }

    .map-container {
        height: 400px;
    }

</style>
