<template>
    <div class="">
        <div class="top-nav">
            <h5> Alarms </h5>
        </div>
        <div class="card">
            <!-- <router-link tag="button" to="/vm_list/add_machine" class="btn btn-light btn-sm mb-2 w-25" > 자판기 추가 </router-link> -->
            <table class="table table-borderless">
                <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col"># of lanes</th>
                    <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="vm in vm_data" :key="vm.id">
                        <td> {{vm.id }} </td>
                        <td> {{vm.name }} </td>
                        <td> {{vm.username}} </td>
                        <td> {{vm.lanes.length }} </td>
                        <td> {{vm.location.address.province }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alarms'
}
</script>

<style scoped>
 .card {
        border-color: white;
        width: 100%;
        height: 80vh;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .table, thead {
         box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
    }

    .table * {
        font-size: 13px;
    }
    .btn {
        font-size: 13px;
        font-weight: bold;
    }

</style>
