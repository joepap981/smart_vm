<template>
    <div class="">
        <div class="top-nav">
            <div class="d-flex flex-row">
                <h5> 사용자 </h5>
            </div>
        </div>

        <div class="row">
            <!-- User Basic Info-->
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 기본 정보 </p>
                    </div>
                    <div class="card-body text-left">
                        <label> 사용자 이름: </label>
                        <input class="form-control mb-2" />
                        <label> email: </label>
                        <input class="form-control mb-2" />
                        <label> phone: </label>
                        <input class="form-control mb-4" />

                        <button class="btn btn-primary btn-sm"> 변경 저장 </button>
                    </div>
                </div>
            </div>

            <!-- Temperature Monitoring Graph-->
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-header d-flex align-items-center">
                        <p class="card-header-title mr-2"> 관리 자판기 정보 </p>
                    </div>
                    <div class="card-body">
                        <line-chart class="chart-container" :chart-data="datacollection" :options="options" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'User'
}
</script>

<style scoped>

</style>
