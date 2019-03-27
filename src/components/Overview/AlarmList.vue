<template>
<div v-if="data_loaded">
    <div v-for="alarm in this.alarm_data" :key="alarm.id">
        <p> {{ alarm.name }} </p>
        <!-- <div class="list-item d-flex flex-row justify-content-start" data-toggle="modal" data-target="#stock-alarm-modal">
            <div class="status-badge"></div>
            <div class="ml-2 mb-2">
                <p class="info-title"> {{ alarm.machine.name }} </p>
                <p class="info-sub">  {{ alarm.machine.address.province }} {{ alarm.machine.address.municipality }} {{ alarm.machine.address.submunicipality }}</p>
            </div>
            <div class="ml-5">
                <p class="info-title"> Lane 3: Pepsi </p>
                <p class="info-sub"> {{ alarm.dateTime }} </p>
            </div>
        </div> -->
    </div>
    <!--Stock alarm info modal -->
    <div id="stock-alarm-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Stock Alarm</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--Lane 정보 편집-->

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'AlarmList',
    props: {
        'alarm_type': String,
    },
    data () {
        return {
            'alarm_service': null,
            'alarm_data': null,
            'data_loaded': false,
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
            //get all alarms
            this.alarm_service.get('/alarms', {
                params: {
                    type: this.alarm_type,
                }
            }).then(function (response, error) {
                self.alarm_data = response.data.content;
                self.data_loaded = true;
                console.log(self.alarm_data);
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
    .info-title {
        font-size: 0.8rem;
        font-weight: bold;
        color: #3d4465;
        margin-bottom: 0px;
    }

    .info-sub {
        text-align: left;
        font-size: 0.7rem;
        font-weight: bold;
        color: #a1a8c3;
        margin-bottom: 0px;
    }

    .status-badge {
        background-color: #36a2eb;
        min-width: 0.4rem;
        height: 2rem;
        border-radius: 3px;
        margin-right: 1.2rem;
    }

    .list-item {
        height: 50px;
        cursor: pointer;
        margin-bottom: 10px;
    }
    .list-item:hover{ 
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        border-radius: 3px 3px 3px 3px;
    }

    .modal-title {
        font-size: 16px;
        font-weight: bold;
    }

</style>
