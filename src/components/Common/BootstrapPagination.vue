<template>
<div class="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
    <ul class="pagination pagination-sm">
        <li @click="changePage(cur_page-1)" class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li @click="changePage(x)" :class="{ active: x == cur_page }" v-for="x in num_of_pages" :key="x.id" class="page-item"><a class="page-link"> {{ x }} </a></li>
        <li @click="changePage(cur_page+1)" class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
    </nav>
</div>
    
</template>

<script>
export default {
    name: 'BootstrapPagination',
    props: {
        num_of_pages: Number,
        cur_page: Number
    },
    methods: {
        changePage (event) {
            this.$emit('changePage', event);
        }
    }
}
</script>

<style scoped>
    li {
        cursor: pointer;
    }
    .page-link {
        color: #343a40;
    }

    .page-item.active .page-link {
        background-color: #242939;
        border-color: #242939;
    }
</style>
