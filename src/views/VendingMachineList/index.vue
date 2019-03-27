<template>
    <div class="">
        <div class="top-nav">
            <h5> Vending Machine List </h5>
        </div>
        <div class="card">
            <router-link tag="button" to="/vm_list/add_machine" class="btn btn-light btn-sm mb-2 w-25" > 자판기 추가 </router-link>
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col"># of lanes</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    <router-link :to="{ name: 'vm', params: {id: vm.name } }" tag="tr" v-for="vm in vm_data" :key="vm.id">
                        <td> {{vm.id }} </td>
                        <td> {{vm.name }} </td>
                        <td> {{vm.username}} </td>
                        <td> {{vm.lanes.length }} </td>
                        <td> {{vm.location.address.province }} </td>
                    </router-link>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'VendingMachineList',
    data () {
        return {
            axios_instance: null,
            vm_data: null,

            rows: null,
            columns: null,
        }
    },
    methods: {
        init () {
            var self = this;
          
            //machine-service
            this.axios_instance = axios.create({
                baseURL:'http://localhost:8100/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getVMList();

        },

        getVMList () {
            var self = this;

            this.axios_instance.get('/machines/', {
            }).then(function (response, error) {
                self.vm_data = response.data.content;
            }).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style scoped>
    .card {
        padding: 30px;
        padding-top: 10px;
 
        border-color: white;
        width: 100%;
        height: 80vh;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        margin-top: 10px;
        margin-bottom: 10px;

        overflow: auto;
    }

    .table, thead {
         box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }

    .table * {
        font-size: 13px;
        
    }
    .btn {
        font-size: 13px;
        font-weight: bold;
    }

    tbody tr:hover{
        background-color: rgb(253, 253, 253);
        cursor: pointer;
    }

</style>
