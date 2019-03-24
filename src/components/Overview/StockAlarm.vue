<template>
<div>
    <div class="list-item d-flex flex-row justify-content-start" data-toggle="modal" data-target="#stock-alarm-modal">
        <div class="status-badge"></div>
        <div class="ml-2 mb-2">
            <p class="info-title"> Vending Machine 5 </p>
            <p class="info-sub"> 서울시 광진구 잠실동 </p>
        </div>
        <div class="ml-5">
            <p class="info-title"> Lane 3: Pepsi </p>
            <p class="info-sub"> Mar 6 13:53 </p>
        </div>
    </div>
    <!-- Lane 편집 Modal -->
    <div id="stock-alarm-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Lane 정보</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!--Lane 정보 편집-->
                <form>
                    <div class="form-group text-left">
                        <label> Lane id : </label>
                        <input class="form-control" type="text" />
                        <label> 적정 온도 : </label>
                        <input class="form-control" type="text" />
                        <label> 적정 습도 : </label>
                        <input class="form-control" type="text" />
                    </div>
                    <button type="button" class="btn btn-primary btn-sm">변경저장</button>
                </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'StockAlarm',
    props: ['stock_alarm_data']
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
    .list-item :hover{ 
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        border-radius: 3px 3px 3px 3px;
    }

</style>
