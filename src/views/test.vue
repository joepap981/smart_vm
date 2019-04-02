<template>
    <div class="wrapper">
        <div class="card">
            <div v-for="hello in 50" :key="hello.id">
                <p> Heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "test"
}
</script>

<style scoped>
    .wrapper {
        max-height: 200px;
        background-color: grey;
        overflow: auto;
    }
    .card {
        height: 500px;
    }
</style>
