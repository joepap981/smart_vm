<template>
    <div class="d-flex flex-row justify-content-start">
        <img src="../../assets/vending-machine.png" height="38" width="40" />
        <div class="ml-2 mb-2">
            <p class="info-title"> Vending Machine {{ vm_data.id }} </p>
            <p class="info-sub"> {{ vm_data.municipality }} </p>
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
        font-size: 0.8rem;
        font-weight: bold;
        color: #a1a8c3;
        margin-bottom: 0px;
    }

</style>
