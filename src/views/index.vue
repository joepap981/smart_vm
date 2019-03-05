<template>
    <div class="wrapper">
        <div class="row">
            <!--Side Navigation Bar-->
            <div id="sidebar" class="flex-column">
                <h3 id="nav-header" style="color:white"> </h3>

                <div class="nav-group">
                    <div class="nav-item"> Overview </div>
                    <div class="nav-item">자판기 </div>
                    <div class="nav-item">사용자 </div>
                    <div class="nav-item">알림 </div>
                    <div class="nav-item">통계 </div>
                </div>

            </div>

            <!-- Rightside Content -->
            <div class="content">
                <!--Top Navigation Bar-->
                <div id="topbar">
                    <div class="d-flex justify-content-end mr-4">
                        <p> Sign Out </p>
                    </div>
                </div>

                <!-- Pages -->
                <div id="page">
                    <OverviewIndex />
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import OverviewIndex from "../views/Overview/"
import AlarmIndex from "../views/Alarm/"
import UserIndex from "../views/User/"
import StatisticsIndex from "../views/Statistics/"

export default {
    name: 'DashboardIndex',
    components: {
        OverviewIndex, AlarmIndex, UserIndex, StatisticsIndex
    }
}
</script>

<style scoped>
    .content {
        width: 84%;
    }
    .wrapper {
        min-height: 100vh;
        background-color: #FBFBFB;
    }

    #nav-header {
        height: 60px;
        margin: 0 0 0 0;
        padding-top: 7%;
    }

    #sidebar {
        display: flex;
        background-color: #3F3F50;
        width: 16%;
        min-height: 100vh;
        box-shadow: 1px 2px #F7F7F7;
    }

    .nav-group {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .nav-group .nav-item:hover {
        color: white;
        cursor: pointer;
    }

    .nav-group .nav-item {
        margin-top: 10px;
        margin-bottom: 10px;
        color: #D8D8D8;
    }

    #topbar {
        height: 60px;
        background-color: white;
        min-width: 100%;
        box-shadow: 1px 2px #F7F7F7;
    }


</style>
