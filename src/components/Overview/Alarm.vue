<template>
    <div class="d-flex flex-row justify-content-start">
        <div id="laneStatusBadge" class="status-badge"></div>
        <div class="ml-2 mb-2">
            <p class="info-title"> Vending Machine 5 </p>
            <p class="info-sub"> 서울시 광진구 잠실동 </p>
        </div>
        <div class="ml-5">
            <p class="info-title"> Lane 3: Pepsi </p>
            <p class="info-sub"> Mar 6 13:53 </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alarm',
    props: ['alarm_data']
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
</style>
