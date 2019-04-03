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
                            <kt-map v-bind:vm_data="vm_data"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-header d-flex flex-row">
                        <p class="card-header-title"> 자판기 </p>
                        <router-link tag="button" to="/vm_list/add_machine" class="btn btn-light btn-sm  add-btn" > + </router-link>
                    </div>
                    <div class="vm-list card-body">
                        <vm-list-item v-for="vm in this.vm_data" :key="vm.id" :vm_data="vm"/>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 재고알림 </p>
                    </div>
                    <div class="card-body">
                       <alarm-list alarm_type="stock" />
                    </div>
                </div>
            </div>

            <div class="col-xl-4 col-md-6">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 온도알림 </p>
                    </div>
                    <div class="card-body">
                        <alarm-list alarm_type="temp" />
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-md-6">
                 <div class="card">
                    <div class="card-header">
                        <p class="card-header-title"> 습도알림 </p>
                    </div>
                    <div class="card-body">
                        <alarm-list alarm_type="humi" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import KakaoMap from '../../components/KakaoMap.vue'
import KtMap from '../../components/Overview/KtMap.vue'
import VmListItem from '../../components/Overview/VmListItem.vue'
import AlarmList from '../../components/Overview/AlarmList.vue'


export default {
    name: 'Overview',
    components: {
        // KakaoMap, 
        KtMap, VmListItem, AlarmList
    },
    data: function () {
        return {
            vm_data: null,
            ready: false,
            stock_alarm_data: null,
            alarm_data: null,
            alarm_polling: null,
            machine_service: null,
        }
    },
    methods: {
        init() {
            // this.checkAuth();
            var self = this;
            var auth = 'Bearer '+ $cookies.get('access_token');

            //machine-service
            this.machine_service = self.$axios.create({
                baseURL: self.$service.zuul_service,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': auth,
                },
       
                useCredentials: true,
                crossDomain: true,
            })

            this.getVMData();

        },
        checkAuth () {
            //check if key exists
            if(!$cookies.isKey('token')) {
                this.$router.push('/signin');
            }
        },
        getVMData: function () {
            //state this component for use in axios 'then' callback function
            var self = this;
          
            //get all vending machines
            this.machine_service.get('users/machines/', {
            }).then(function (response, error) {
                self.vm_data = response.data.machines;
                console.log(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        },
    },
    beforeMount () {
        this.init();
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

    .col-xl-3, .col-md-12, .col-xl-6, .col-xl-9, .col-md-4 .col-md-6, .col-xl-4{
        padding-right: 10px!important;
        padding-left: 10px!important;
    }

    .map-container {
        height: 400px;
    }

    .vm-list {
        overflow: auto;
    }

    .add-btn {
        height: 20px;
        width: 20px;
        margin-left: 20px;
    }

</style>


// <div>Icons made by <a href="https://www.flaticon.com/authors/itim2101" title="itim2101">itim2101</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>