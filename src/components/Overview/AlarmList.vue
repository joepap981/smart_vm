<template>
<div class="wrapper">
<div v-if="alarm_data_loaded">
    <alarm-list-item v-for="alarm in this.alarm_data_list" :key="alarm.id" :alarm_data="alarm" :alarm_type="alarm_type" />
</div>
</div>

</template>

<script>
import AlarmListItem from './AlarmListItem.vue'

export default {
    name: 'AlarmList',
    components: {
        AlarmListItem
    },
    props: {
        'alarm_type': String,
    },
    data () {
        return {
            'alarm_service': null,
            'alarm_data_loaded': false,
            'alarm_data_list': [],
            'alarm_list_temp': null
        }
    },
    methods: {
        init () {
            var self = this;
  
            //alarm-service
            this.alarm_service = this.$axios.create({
                baseURL: self.$service.zuul_service,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${$cookies.get('access_token')}`,
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
        insertToFinalList () {
            var self = this;

            for(var i; i< this.alarm_list_temp.length; i++){
                for(var j; j < this.alarm_list_temp[i].alarms.length; j++) {
                    this.alarm_data_list.push(this.alarm_list_temp.alarms[j]);
                }
            }

           

        },
        getAlarmData () {
            var self = this
            //get all alarms
            this.alarm_service.get('users/alarms', {
                params: {
                    type: this.alarm_type,
                    status: 'unread',
                }
            }).then(function (response, error) {
                self.alarm_data_list = response.data;
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
        height: 400px;
        overflow: auto;
    }
</style>
