<template>
    <div class="wrapper">

        <!--Side Navigation Bar-->
        <nav id="sidebar" class="flex-column">
            <h3 id="nav-header" style="color:white"> </h3>

            <div class="nav-group">
                <router-link tag="div" to="overview" class="nav-item"> Overview </router-link>
                <router-link tag="div" to="vm" class="nav-item"> 자판기 </router-link>
                <router-link tag="div" to="user" class="nav-item"> 사용자 </router-link>
                <router-link tag="div" to="alarms" class="nav-item"> 알림 </router-link>
                <router-link tag="div" to="statistics" class="nav-item"> 통계 </router-link>
            </div>
        </nav>

        <!-- Rightside Content -->
        <div id="content">
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

    
</template>

<script>

export default {
    name: 'DashboardIndex',
    components: {
    }
}
</script>

<style scoped>
    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
        background-color: #FBFBFB;
    }

    #nav-header {
        height: 60px;
        margin: 0 0 0 0;
        padding-top: 7%;
    }

    #sidebar {
        min-width: 250px;
        max-width: 250px;
        min-height: 100vh;
        box-shadow: 1px 2px #F7F7F7;
        background-color: #232327;
    }

    #content {
        width: 100%;
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
