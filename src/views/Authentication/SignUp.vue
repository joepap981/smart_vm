<template>
    <div class="container" id="login-box">
        <h2 class="mb-4"> Sign Up </h2>

        <form>
            <div class="form-group">
                <label class="d-flex align-content-start"> name </label>
                <input v-model="name" class="form-control" type="text" />
            </div>
            <div class="form-group">
                <label class="d-flex align-content-start"> phone </label>
                <input v-model="phone" class="form-control" type="text" />
            </div>
            <div class="form-group">
                <label class="d-flex align-content-start"> username </label>
                <input v-model="username" class="form-control" type="text" />
            </div>

            <div class="form-group">
                <label class="d-flex align-content-start"> password </label>
                <input v-model="pwd" class="form-control" type="password" />
            </div>
            <div class="form-group">
                <label class="d-flex align-content-start"> confirm password </label>
                <input v-model="confirm_pwd" class="form-control" type="password" />
            </div>
        </form>
        <button @click="userSignUp()" class="btn btn-primary w-100 mt-3"> Sign Up </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data () {
        return {
            user_service:null,
            name: null,
            phone: null,
            username: null,
            pwd: null,
            confirm_pwd: null,
        }
    },
    methods: {
        log (message) {
            console.log(message)
        },
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

            Promise.all([this.validateUsername(), this.validatePassword(), this.validateUserInfo()])
            .then(function (response) {
                console.log(response);
                //create new user
                self.user_service.post('/users', {
                    name: self.name,
                    phone: self.phone,
                    password: self.pwd,
                    username: self.username
                }).then(function (response, error) {
                    self.log(response);
                }).catch(function (error) {
                    self.log(error);
                })
            }).catch(function (error) {
                console.log(error);
            })
    
        },
        validateUserInfo: function () {
            var self = this;
            let promise = new Promise( (resolve, reject) => {
                //validate if password and conf password are not null
                let passwordConfirmed = self.username != null && self.phone != null && self.name != null;

                if (passwordConfirmed) {
                    self.log('UserInfo Validated')
                    resolve('UserInfo Validated');
                }
                else {
                    self.log('UserInfo validtion failed')
                    reject('UserInfo validation failed');
                }
            })

            return promise;
        },
        validatePassword: function () {
            var self = this;
            let promise = new Promise( (resolve, reject) => {
                //validate if password and conf password are not null
                let passwordConfirmed = self.pwd != null && self.confirm_pwd != null;
                //validate if the two password inputs match
                passwordConfirmed = passwordConfirmed && (self.pwd == self.confirm_pwd);
                if (passwordConfirmed) {
                    resolve('Password Validated');
                    self.log('Password Validated')
                }
                else {
                    reject('Password validation failed');
                    this.log('Password validation failed')
                }
            }) 

            return promise;
        },
        validateUsername: function () {
            var self = this;
            var result;
            //validate if input username does not already exists
            var promise = new Promise ((resolve, reject) => {

                this.user_service.get(`/users/${this.username}`, {
                }).then(function (response, error) {
                    result = response.data.content;
                    if (result.length > 0) {
                        reject("Username already exists");
                    } else {
                        resolve("Username Validated");
                    }
                }).catch(function (error) {
                    self.log(error);
                    reject("Username validation failed");
                });

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
