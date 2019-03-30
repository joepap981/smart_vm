<template>
<div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li @click="changePage(x)" v-for="x in num_of_pages" :key="x.id" class="page-item"><a class="page-link" href="#"> {{ x }} </a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
    </nav>
</div>
    
</template>

<script>
export default {
    name: 'BootstrapPagination',
    props: {
        num_of_pages: Number
    },
    methods: {
        changePage (event) {
            this.$emit('changePage', event);
        }
    }
}
</script>

<style scoped>

</style>
