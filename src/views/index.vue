<template>
    <div class="wrapper">
        <div class="row">
            <!--Side Navigation Bar-->
            <div id="sidebar" class="flex-column">
                <h3 id="nav-header" style="color:white"> </h3>

                <div class="nav-group">
                    <router-link tag="div" to="overview" class="nav-item"> Overview </router-link>
                    <router-link tag="div" to="vm" class="nav-item">자판기 </router-link>
                    <router-link tag="div" to="user" class="nav-item">사용자 </router-link>
                    <router-link tag="div" to="alarms" class="nav-item">알림 </router-link>
                    <router-link tag="div" to="statistics" class="nav-item">통계 </router-link>
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
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>

export default {
    name: 'DashboardIndex',
    components: {
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
        background-color: #232327;
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
