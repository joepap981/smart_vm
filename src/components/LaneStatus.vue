<template>
    <div class="lane-status-widget d-flex align-items-center">
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


</style>
