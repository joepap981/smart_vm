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
                    <div id="notification-bell">
                        <span id="notification-badge" class="badge badge-light"> 1 </span>
                        <img class="nav-img" src="../assets/bell.png" width="30" height="30" style="margin-top: 4px"/>          
                    </div>
                    <img class="nav-img" src="../assets/profile_placeholder.png" width="40" height="40"  />
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
    },
    data: function () {
        return {
            path: []
        }
    },
    computed: {

    }
    //if no tabs have been selected, push to 'overview' page
    // mounted () {
    //     if (this.$route.path == "/")
    //         this.$router.push('overview')
    // }
}
</script>

<style scoped>
    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
        background-color: #EEEEF5;
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
        background-color: #242939;
        margin: 25px 25px 25px 25px;
        border-radius: 5px 5px 5px 5px;
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
        margin: 25px 25px 0 0;
        min-height: 60px;
        max-height: 60px;
        min-width: 100%;
        vertical-align: middle;
    }

    #page {
        padding: 40px 40px 40px 40px;
    }

    .nav-img {
        border-radius: 50%;
        margin: 0 5px 0 5px;
        vertical-align: middle;
    }

    #notification-bell {
        background-color: white;
        border-radius: 50%;
    }

    #notification-badge {
        height: 15px;
        position: absolute;
        float: left;
    }

    .breadcrumbs {
    
    }

</style>
