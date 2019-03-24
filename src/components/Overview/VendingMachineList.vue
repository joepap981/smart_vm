<template>
<div>
    <div class="list-item d-flex flex-row justify-content-start">
        <div>
            <img src="../../assets/vending-machine.png" height="32" width="34" />
        </div>
        <div class="ml-2 mb-2">
            <p class="info-title"> Vending Machine {{ vm_data.id }} </p>
            <p class="info-sub"> {{ vm_data.province }} {{ vm_data.municipality }} {{ vm_data.submunicipality }} </p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'VendingMachineList',
    props: ['vm_data']
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
