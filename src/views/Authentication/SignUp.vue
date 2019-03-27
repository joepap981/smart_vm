<template>
    <div class="container" id="login-box">
        <h2 class="mb-4"> Sign Up </h2>

        <form>
            <div class="form-group">
                <label class="d-flex align-content-start"> email </label>
                <input class="form-control" type="email" />
            </div>

            <div class="form-group">
                <label class="d-flex align-content-start"> password </label>
                <input class="form-control" type="password" />
            </div>
            <div class="form-group">
                <label class="d-flex align-content-start"> confirm password </label>
                <input class="form-control" type="password" />
            </div>

            <button @click="userSignUp()" class="btn btn-primary w-100 mt-3"> Sign Up </button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data () {
        return {
            user_service:null,
            email: null,
            pwd: null,
            confirm_pwd: null,
        }
    },
    methods: {
        init: function () {
            this.user_service = axios.create({
                baseURL:'http://localhost:8200/',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                useCredentials: true,
                crossDomain: true,
            })

           
        },
        userSignUp: function () {
            var self = this;

            if (this.validateEmail() && this.validatePassword()) {
                //create new user
                this.user_service.put('/logs/sell/user1@kt.com/', {
                }).then(function (response, error) {
    
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                alert("failed")
            }

       
        },
        validatePassword: function () {
            //validate if one of password input is empty
            if (this.pwd == null || this.confirm_pwd == null)
                return false;
            //validate if the two passwords match
            else if (this.pwd != this.confirm_pwd) 
                return false;
            else 
                return true;
          
        },
        validateEmail: function () {
            //validate if input username does not already exists
            this.user_service.get(`/users/${this.email}`, {
            }).then(function (response, error) {
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            })

            return false;
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
        min-width: 320px;
        max-width: 320px;
    }

    .form-group {
        margin-bottom: 0;
    }

    label {
        margin-bottom: 5px;
    }

    .form-control {
        height: 33px;
    }
</style>
