<template>
    <div class="">
        <div class="top-nav">
            <h5> Add Vending Machine </h5>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="map-container">
                    <kt-map3 />
                </div>
                <div class="row mt-3">
                    <div class="form-group col-xl-6 text-left">
                        <label> Name </label>
                        <input class="form-control" />
                    </div>
                    <div class="location-info col-xl-6 text-left">
                        <label> Address </label>
                        <input class="form-control" />
                        <div class="row">
                            <div class="col-6">
                                <label> Lat </label>
                                <input class="form-control mr-2" />
                            </div>
                            <div class="col-6">
                                <label> Long </label>
                                <input class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import KtMap3 from '../../components/KtMap3.vue'
export default {
    name: 'AddVendingMachine',
    components: {
        KtMap3
    },
    data () {
        return {
            
        }
    }
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
    .card-body {
        padding: 30px;
    }
    .map-container {
        height: 300px;
    }

    .form-control {
        height: 27px;
        margin-bottom: 10px;
    }



 



</style>
