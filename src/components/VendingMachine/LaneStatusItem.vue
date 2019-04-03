<template>
    <div>
        <div class="lane-status-widget d-flex align-items-center" @click="showModal()">
            <div id="laneStatusBadge" class="status-badge"></div>
            <div class="lane-status">
                <p class="info-title"> Lane {{ lane.sequence }} </p>
                <p class="info-address">{{ product.name }} {{ product.price }}원</p>
            </div>

            <!-- <div class="stock-status d-flex">
                <p class="info-title mr-2"> {{ lane.stock_status }} </p>
                <p class="info-address"> {{ lane.stock_time }} </p>
            </div>

            <div class="env-status d-flex">
                <p class="info-title mr-2"> {{ lane.env_status}} </p>
                <p class="info-address"> {{ lane.env_time }} </p>
            </div> -->
        </div>
        <b-modal :ref="lane.sequence" hide-footer title="Lane 정보">
            <div class="modal-body">
                <!--Lane 정보 편집-->
                <form>
                    <div class="form-group text-left">
                        <label> Sequence : </label>
                            <input v-model="lane.sequence" class="form-control" type="text" />
                            <label> 적정 온도 (high) : </label>
                            <input v-model="lane.temperature.optimal_temp_high" class="form-control" type="text" />
                            <label> 적정 온도 (low): </label>
                            <input v-model="lane.temperature.optimal_temp_low" class="form-control" type="text" />
                            <label> 적정 습도 (high): </label>
                            <input v-model="lane.humidity.optimal_humi_high" class="form-control" type="text" />
                            <label> 적정 습도 (low): </label>
                            <input v-model="lane.humidity.optimal_humi_low" class="form-control" type="text" />
                    </div>
                    <button @click="test()" type="button" class="btn btn-primary btn-sm">변경저장</button>
                </form>
                <hr/>

                <form >
                    <div class="form-group text-left" >
                        <h5 class="modal-title mb-3">제품</h5>
                        <label> 제품명 : </label>
                        <input v-model="product.name" class="form-control" type="text" :placeholder="product.name">
                        <label> 제품가격 : </label>
                        <input v-model="product.price" class="form-control" type="text" :placeholder="product.price">
                    </div>
                    <button type="button" class="btn btn-primary btn-sm" @click="updateProductData()">제품추가</button>
                </form>
                
            </div>
            <div class="modal-footer">
                <button class="btn btn-danger btn-sm d-flex" @click="deleteLane()"> Delete Lane </button>
                <button type="button" class="btn btn-secondary" @click="hideModal()">닫기</button>
            </div>
        </b-modal>

        <!-- Lane 편집 Modal -->
        <div  class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LaneStatusItem",
    props: {
        'laneProp': Object,
        'vm_id': String,
    },
    data () {
        return {
            lane: this.laneProp,
            product_service: null,
            product: {
                name: null,
                price: 0
            },
        }
    },
    methods: {
        init () {
           var self = this;

            //machine-service
            this.product_service = axios.create({
                baseURL:self.$service.zuul_service,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${$cookies.get('access_token')}`,
                },
                useCredentials: true,
                crossDomain: true,
            })
            this.getProductData();
        },
        getProductData () {
            var self = this;
            
            this.product_service.get(`/machines/${self.vm_id}/lanes/${self.lane.sequence}/product`, {
            }).then(function (response, error) {
                self.product = response.data;
            }).catch(function (error) {
                console.log(error);
            })
        },
        updateProductData () {
            var self = this;
            
            this.product_service.put(`/machines/${self.vm_id}/lanes/${self.lane.sequence}/product`, {
                name: self.product.name,
                price: self.product.price
            }).then(function (response, error) {
                self.getProductData();
                alert("Product Updated!")
            }).catch(function (error) {
                console.log(error);
            })
        },
        deleteLane () {
            var self = this;
            this.product_service.delete(`/machines/${self.vm_id}/lanes/${self.lane.sequence}`, {
            }).then(function (response, error) {
                self.$emit('refreshLane');
            }).catch(function (error) {
                console.log(error);
            })
        },
        showModal() {
            this.$refs[this.lane.sequence].toggle()
        },
        hideModal() {
            this.$refs[this.lane.sequence].hide()
        },
        toggleModal() {
            // We pass the ID of the button that we want to return focus to
            // when the modal has hidden
            this.$refs[this.lane.sequence].toggle('#toggle-btn')
        }

    },

    mounted () {
        this.init();
    }
}
</script>

<style scoped>
    /*lane-status widget*/
    .lane-status-widget {
        height: 50px;
        cursor: pointer;
        margin-bottom: 0px;
    }

    .lane-status-widget:hover {
        box-shadow: 0px 0px 13px 0px rgba(82,63,105,0.05);
        border-radius: 3px 3px 3px 3px;
    }
    .lane-status{
       text-align: left;
    }
    .info-title {
        font-size: 0.8rem;
        font-weight: bold;
        color: #3d4465;
        margin-bottom: 0px;
    }
    .info-address {
        font-size: 0.8rem;
        font-weight: bold;
        color: #a1a8c3;
        margin-bottom: 0px;
    }
    .stock-status {
        margin-left: auto;
    }

    .env-status {
        margin-left: auto;
    }

    .form-group input{
        margin-bottom:10px;
    }
</style>
