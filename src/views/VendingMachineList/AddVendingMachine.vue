<template>
    <div class="">
        <div class="top-nav">
            <h5> Add Vending Machine </h5>
        </div>
        <div class="row">
            <div class="col-xl-8">
                <div class="card">
                    <div class="card-body">
                        <div class="map-container">
                            <kt-map3 />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="card">
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
    },
    methods: {
    }
}
</script>

<style scoped>
    .card {
        border-color: white;
        width: 100%;
        min-height: 95vh;
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .card-body {
        padding: 30px;
    }
    .map-container {
        min-height: 300px;
    }

    .form-control {
        height: 27px;
        margin-bottom: 10px;
    }



 



</style>
