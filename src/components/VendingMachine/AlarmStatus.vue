<template>
<div class="wrapper" v-if="alarm_data_loaded">
    <alarm-list-item v-for="alarm in this.alarm_data_list" :key="alarm.id" :alarm_data="alarm" />
</div>

</template>

<script>
import axios from 'axios';
import AlarmListItem from './AlarmListItem.vue'

export default {
    name: 'AlarmStatus',
    components: {
        AlarmListItem
    },
    props: {
        'alarm_type': String,
        'vm_id': String,
    },
    data () {
        return {
            'alarm_service': null,
            'alarm_data_loaded': false,
            'alarm_data_list': null,
        }
    },
    methods: {
        init () {
            //machine-service
            this.alarm_service = axios.create({
                baseURL:'http://localhost:8400/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getAlarmData();
            // this.alarm_polling = setInterval(() => {
            //     self.getStockDataAlarmData();
            //     self.getAlarmData();
            // }, 3000)

        },
        getAlarmData () {
            var self = this
            //get all alarms
            this.alarm_service.get(`/alarms/machines/${self.vm_id}`, {
                params: {
                    size: 6,
                    sort: 'desc'
                }
            }).then(function (response, error) {
                self.alarm_data_list = response.data.content;
                self.alarm_data_loaded = true;
            }).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted () {
        this.init();
    },
    beforeDestroy() {
        // clearInterval(this.alarm_polling)
    }
}
</script>

<style scoped>
    .wrapper {
        overflow: auto;
    }
</style>
