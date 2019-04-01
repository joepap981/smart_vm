<template>
    <div>
        <div class="list-item d-flex flex-row justify-content-start ml-2" data-toggle="modal" data-target="#alarm-modal">
            <div class="status-badge"></div>
            <div class="alarm-box">
                <p class="info-title"> {{ messageFormat }} </p>
                <p class="info-sub"> {{ dateFormat }} </p>
            </div>
            <div class="alarm-status">
                <p class="info-title"> Status </p>
                <p class="info-sub"> {{ alarm_data.status }} </p>
            </div>
        </div>

        <!--Alarm info modal -->
        <div id="alarm-modal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> Alarm</h5>
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
export default {
    name: 'AlarmListItem',
    props: {
        'alarm_data': Object,
    },
    methods: {
    },
    computed: {
        dateFormat () {
            return moment(this.alarm_data.dateTime).format('lll');
        },
        messageFormat () {
            return this.alarm_data.message.split('_')[1];
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
