<template>
    <div>
        <div class="lane-status-widget d-flex align-items-center" data-toggle="modal" data-target="#lane-edit-modal">
            <div id="laneStatusBadge" class="status-badge"></div>
            <div class="lane-status">
                <p class="info-title"> Lane {{ lane.id }} </p>
                <p class="info-address">{{ lane.item }} </p>
            </div>

            <div class="stock-status d-flex">
                <p class="info-title mr-2"> {{ lane.stock_status }} </p>
                <p class="info-address"> {{ lane.stock_time }} </p>
            </div>

            <div class="env-status d-flex">
                <p class="info-title mr-2"> {{ lane.env_status}} </p>
                <p class="info-address"> {{ lane.env_time }} </p>
            </div>
        </div>

        <!-- Lane 편집 Modal -->
        <div id="lane-edit-modal" class="modal fade" tabindex="-1" role="dialog">
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
                    <hr/>
                    <!--제품 정보 편집-->
                    <form>
                        <div class="form-group text-left">
                            <h5 class="modal-title mb-3">제품</h5>
                            <label> 제품명 : </label>
                            <input class="form-control" type="text" />
                            <label> 제품가격 : </label>
                            <input class="form-control" type="text" />
                        </div>
                        <button type="button" class="btn btn-primary btn-sm">제품추가</button>
                    </form>
                </div>
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
    name: "LaneStatus",
    data () {
        return {
            lane: this.laneProp,
        }
    },
    props: ['laneProp']
}
</script>

<style scoped>
    /*lane-status widget*/
    .lane-status-widget {
        height: 50px;
        cursor: pointer;
        margin-bottom: 10px;
    }

    .lane-status-widget:hover {
        background-color: #FCFCFC;
        border-radius: 3px 3px 3px 3px;
    }
    .lane-status{
       text-align: left;
    }
    .info-title {
        font-size: 0.8rem;
        font-weight: bold;
        color: #3d4465;
        margin-bottom: 0px;
    }
    .info-address {
        font-size: 0.8rem;
        font-weight: bold;
        color: #a1a8c3;
        margin-bottom: 0px;
    }
    .stock-status {
        margin-left: auto;
    }

    .env-status {
        margin-left: auto;
    }

    .form-group input{
        margin-bottom:10px;
    }
</style>
