<template>
    <div class="container" id="login-box">
        <h2 class="mb-4"> Sign in </h2>

        <form>
            <div class="form-group">
                <label class="d-flex align-content-start"> username </label>
                <input v-model="user" class="form-control" type="text" id="emailInput"/>
            </div>

            <div class="form-group">
                <label class="d-flex align-content-start"> password </label>
                <input v-model="password" class="form-control" type="password" id="passInput"/>
            </div>
        </form>
        <button @click="getOAuthToken(user, password)" class="btn btn-primary w-100 mt-3"> Sign In </button>
        <router-link tag="p" to="/signup" class="signup" > Sign Up </router-link>
    </div>
</template>

<script>
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
          
            this.auth_service = self.$axios.create({
                baseURL: self.$service.zuul_service,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'Basic dHJ1c3RlZC1hcHA6c2VjcmV0',
                    'Content-Type': 'application/x-www-form-urlencoded;utf-8'
                },
                useCredentials: true,
                crossDomain: true,
            })
        },
        getOAuthToken (username, password) {
            var self = this;
            var querystring = require('querystring');

            let promise = this.auth_service.post(`/oauth/token`, 
                querystring.stringify({
                    grant_type: 'password',
                    username: username,
                    password: password
                })
            ).then(function (response, error) {

                //check for oauth-key in cookie and if does not exist, set
        
                $cookies.set('access_token', response.data.access_token);
                $cookies.set('refresh_token', response.data.refresh_token);
                $cookies.set('username', self.user);
   
                self.$router.push('/overview');
            }).catch(function (error) {
                console.log(error);
            })

            return promise;
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
    .signup {
        margin-top: 5px;
        cursor: pointer;
        font-size: 15px;
    }

    .signup:hover {
        color: blue;
    }
</style>
