<template>
    <div class="container w-25 margin-top">
        <h2 class="mb-4"> Sign in </h2>

        <form>
            <div class="form-group">
                <label class="d-flex align-content-start"> email </label>
                <input class="form-control" type="email" id="emailInput"/>
            </div>

            <div class="form-group">
                <label class="d-flex align-content-start"> password </label>
                <input class="form-control" type="password" id="passInput"/>
            </div>

            <button @click="userSignIn()" class="btn btn-primary w-100 mt-3"> Sign in </button>
        </form>
    </div>

</template>

<script>
export default {
    name: 'SignIn',
    methods: {
        userSignIn: function () {
            //console.log("This is a placeholder message for 'userSignIn'")
        }
    }
    
}
</script>

<style scoped>
    .margin-top {
        margin-top: 100px;
    }
</style>
