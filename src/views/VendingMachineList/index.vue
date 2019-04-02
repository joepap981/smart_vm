<template>
    <div class="">
        <div class="top-nav">
            <h5> Vending Machine List </h5>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="card-header d-flex justify-content-start">
                    <router-link tag="button" to="/vm_list/add_machine" class="btn btn-light btn-sm mb-2 w-25" > 자판기 추가 </router-link>
                </div>
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
            <div class="card-footer">
                <bootstrap-pagination :num_of_pages="num_of_pages" v-on:changePage="changePage" :cur_page="page"/>
            </div>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';

import BootstrapPagination from '../../components/Common/BootstrapPagination';

export default {
    name: 'VendingMachineList',
    components: {
        BootstrapPagination
    },
    data () {
        return {
            axios_instance: null,
            vm_data: null,
            page: 1,
            num_of_pages: 10,
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
                    'Authorization': `Bearer ${$cookies.get('token')}`,
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getVMList();

        },

        getVMList () {
            var self = this;

            this.axios_instance.get('/machines/', {
                params: {
                    page: self.page,
                    size: 10
                }
            }).then(function (response, error) {
                self.vm_data = response.data.content;
                self.num_of_pages = response.data.totalPages;
            }).catch(function (error) {
                console.log(error);
            })
        },

        changePage (event) {
            console.log(event);
            if(event > 0) {
                this.page = event;
                this.getVMList();
            }
        }
    },
    mounted() {
        this.init();
    }
}
</script>

<style scoped>
    .card {
        padding: 0px;
 
        border-color: white;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        margin-top: 10px;
        margin-bottom: 10px;    
    }

    .card-header {
        padding: 0;
    }

    .card-body {
        padding: 20px;
    }

    .card-footer{
        padding-bottom: 0;
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

    /* width */
    ::-webkit-scrollbar {
        width: 10px;
        border-radius: 3px 3px 3px 3px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px 3px 3px 3px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px 5px 5px 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
        border-radius: 3px 3px 3px 3px;
    }

</style>
