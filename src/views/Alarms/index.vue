<template>
    <div class="">
        <div class="top-nav">
            <h5> Alarms </h5>
        </div>
        <div class="card">
            <div class="card-body">
                <!-- <router-link tag="button" to="/vm_list/add_machine" class="btn btn-light btn-sm mb-2 w-25" > 자판기 추가 </router-link> -->
                <table class="table table-borderless">
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Machine Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Error Type</th>
                        <th scope="col">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alarm in this.alarm_list" :key="alarm.id">
                            <td> {{alarm.id }} </td>
                            <td> {{alarm.machine.name }} </td>
                            <td> {{alarm.dateTime}} </td>
                            <td> {{alarm.message }} </td>
                            <td> {{alarm.machine.location.address.province }} {{alarm.machine.location.address.municipality }} {{alarm.machine.location.address.submunicipality }}</td>
                        </tr>
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
    name: 'Alarms',
    components: {
        BootstrapPagination
    },
    data () {
        return {
            alarm_list: null,
            axios_instance: null,
            page: 1,
            num_of_pages: 10,
        }
    },
    methods: {
        init () {
            var self = this;
          
            //machine-service
            this.axios_instance = axios.create({
                baseURL:'http://localhost:8400/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getAlarmList();

        },
        getAlarmList () {
            var self = this;

            this.axios_instance.get('/alarms', {
                 params: {
                    page: self.page,
                    size: 10
                }
            }).then(function (response, error) {
                self.alarm_list = response.data.content;
                console.log(self.alarm_list)
            }).catch(function (error) {
                console.log(error);
            })
        },
        changePage (event) {
            console.log(event);
            if(event > 0) {
                this.page = event;
                this.getAlarmList();
            }
        }
    },
    mounted () {
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

</style>
