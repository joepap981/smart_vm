<template>
    <div class="wrapper">

        <!--Side Navigation Bar-->
        <div class="sidebar">
            <nav class="flex-column">
                <h3 id="nav-header" style="color:white"> </h3>

                <div class="nav-group">
                    <router-link tag="div" to="overview" class="nav-item"> Overview </router-link>
                    <router-link tag="div" to="user" class="nav-item"> 사용자 </router-link>
                    <router-link tag="div" to="alarms" class="nav-item"> 알림 </router-link>
                    <router-link tag="div" to="statistics" class="nav-item"> 통계 </router-link>
                </div>
            </nav>
        </div>

        <!-- Rightside Content -->
        <div class="content">
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
}
</script>

<style scoped>
    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
        background-color: #EEEEF5;
        min-width: 350px;
    }

    .sidebar {
        min-width: 280px;
        max-width: 280px;
        min-height: 91vh;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        background-color: #242939;
        margin: 30px 25px 30px 30px;
        border-radius: 3px 3px 3px 3px;
        position: fixed;
    }

    .content {
        width: 100%;
        min-height: 100vh;
        margin-left: 340px;
        padding-right: 25px;
        padding-bottom: 15px;
    }

    @media screen and (max-width: 992px) {
        .sidebar {
            position: fixed;
            margin-left: -280px;
        }
        .content {
            margin-left: 15px;
            padding-right: 0px;
        }
    }

    @media screen and (max-width: 400px) {
        .sidebar a {
            text-align: center;
            float: none;
        }
        .content {
            padding-right: 0px;
        }
    }

    #nav-header {
        height: 60px;
        margin: 0 0 0 0;
        padding-top: 7%;
    }

    .nav-group {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .nav-group .nav-item {
        margin-top: 10px;
        margin-bottom: 10px;
        color: #D8D8D8;
        cursor: pointer;
    }

    .nav-group .nav-item:hover {
        color: white;
        
    }

    .nav-item:active {
        color: white;
        cursor: pointer;
    }

    

    /*Top nav*/
    #topbar {
        margin: 25px 25px 0 0;
        min-height: 50px;
        max-height: 50px;
        min-width: 100%;
        vertical-align: middle;
    }

    .nav-img {
        border-radius: 50%;
        margin: 0 5px 0 5px;
        vertical-align: middle;
    }

    #notification-bell {
        background-color: white;
        border-radius: 50%;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }

    #notification-badge {
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);    
        height: 15px;
        position: absolute;
        float: left;
    }

    /*Router page*/
    #page {
        margin-top: -50px;
    }

</style>

<style>
    .top-nav {
        margin-top: 20px;
        min-height: 35px;
        max-height: 35px;
        min-width: 100%;
        vertical-align: middle;
        text-align: left;
    }

    .top-nav h5 {
        font-weight: bold;
    }

    .card-header, .card-footer {
        background-color: white;
    }

    .card-header-title {
        text-align: left;
        font-weight: bold;
        vertical-align: middle;
        margin-bottom: 0;
    }

    .status-badge {
        background-color: #36a2eb;
        min-width: 1rem;
        min-height: 1rem;
        border-radius: 3px;
        margin-right: 1.2rem;
    }

    /* Calendar related styling */
    .inputclass {
        height: 25px;
        border-radius: .25rem;
        border-style: solid;
        border: 1px solid #ced4da;
        font-size: 10px;
        cursor: pointer;
        width: 100px;
    }

    .date-picker * {
        align-items: center;
    }


</style>
