<template>
    <div class="container" id="login-box">
        <h2 class="mb-4"> Sign in </h2>

        <form>
            <div class="form-group">
                <label class="d-flex align-content-start"> email </label>
                <input v-model="user" class="form-control" type="email" id="emailInput"/>
            </div>

            <div class="form-group">
                <label class="d-flex align-content-start"> password </label>
                <input v-model="password" class="form-control" type="password" id="passInput"/>
            </div>

            <button @click="getOAuthToken()" class="btn btn-primary w-100 mt-3"> Sign In </button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import VueCookies from 'vue-cookies';

export default {
    name: 'SignIn',
    data () {
        return {
            user: null,
            password: null,
            auth_service: null,
        }
    },
    methods: {
        init() {
            //state this component for use in axios 'then' callback function
            var self = this;
          
            //machine-service
            this.auth_service = axios.create({
                baseURL:'http://localhost:8300/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

            this.getOAuthToken();
        },
        userSignIn: function () {
            
            this.auth_service.get('/users/', {
            }).then(function (response, error) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        },
        getOAuthToken () {
            var self = this;

            this.auth_service.post(`/oauth/token`, {
                grant_type: 'password',
                user: self.user,
                password: self.password
            }).then(function (response, error) {
                console.log(response.data);

                //check for oauth-key in cookie and if does not exist, set
                if (!$cookies.isKey('token')) {
                    $cookies.set('token', response.data);
                }
                
                //redirect to overview
                self.$router.push('/overview');
            }).catch(function (error) {
                console.log(error);
            })
        }
    },
    mounted () {
        this.init();
    }
    
}
</script>

<style scoped>
    #login-box {
        margin-top: 100px;
        min-width: 300px;
        max-width: 300px;
    }
    .form-control {
        height: 33px;
    }
</style>
