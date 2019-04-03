<template>
    <router-link tag="div" :to="{ name: 'vm', params: {id: alarm_data.machineName } }">
        <div class="list-item d-flex flex-row justify-content-start ml-2">
            <div class="status-badge"></div>
            <div class="machine-name mb-2">
                <p class="info-title"> {{ alarm_data.machineName }} </p>
            </div>
            <div class="alarm-box">
                <p class="info-title"> {{ alarm_data.message }} </p>
                <p class="info-sub"> {{ alarm_data.dateTime }} </p>
            </div>
            <div class="alarm-status">
                <p class="info-title"> Status </p>
                <p class="info-sub"> {{ alarm_data.status }} </p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'AlarmListItem',
    props: {
        'alarm_data': Object,
        'alarm_type': String,
    },
    methods: {
        alarmName () {
            return this.alarm_type.charAt(0).toUpperCase() + this.alarm_type.slice(1);
        }
    },
    mounted() {
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
        background-color: rgba(255, 206, 86, 1);
        min-width: 0.4rem;
        height: 2rem;
        border-radius: 3px;
        margin-right: 1.2rem;
    }
    .list-item {
        height: 50px;
        cursor: pointer;
        margin: auto;
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
    .machine-name {
        width: 40px;
        vertical-align: middle;
    }
    .alarm-box {
        margin-left: auto;
    }
    .alarm-status {
        width: 50px;
        margin-left: auto;
        padding-right: 2px;
    }
    .alarm-status *{
        text-align: center;
    }
</style>
