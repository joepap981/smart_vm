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
                //create new user
                self.user_service.post('/users', {
                    name: self.name,
                    phone: self.phone,
                    password: self.pwd,
                    username: self.username
                }).then(function (response, error) {
                    //add login session
                    self.$router.push('/overview')
                }).catch(function (error) {
                    var error_message;
                    for(var i=0; i < error.response.data.message.length; i++) {
                        error_message = error_message + (error.response.data.message[i]) + "\n";
                    }
                    alert(error_message);
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
                    console.log('UserInfo Validated')
                    resolve('UserInfo Validated');
                }
                else {
                    alert('필수 정보를 입력해주세요.')
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
                if (!passwordConfirmed) {
                    alert("비밀번호를 입력해주세요")
                    reject('Password validation failed');
                }
            
                //validate if the two password inputs match
                passwordConfirmed = passwordConfirmed && (self.pwd == self.confirm_pwd);
                if (passwordConfirmed) {
                    resolve('Password Validated');
                    console.log('Password Validated')
                }
                else {
                    reject('Password validation failed');
                    alert('입력한 비밀 번호가 동일하지 않습니다. 다시 입력해주세요.')
                }
            }) 

            return promise;
        },
        validateUsername: function () {
            var self = this;
            var result;
            //validate if input username does not already exists
            var promise = new Promise ((resolve, reject) => {
                this.user_service.head(`/users/${this.username}`, {
                }).then(function (response, error) {
                    result = response.status;
                    if (result == '200') {
                        reject("Username already exists");
                    } else if (result == '404') {
                        resolve("Username Validated");
                    } else {
                        reject("Unknown error")
                    }
                }).catch(function (error) {
                    // console.log(error);
                    resolve("Username validated");
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
