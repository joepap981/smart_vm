<template>
    <div class="date-picker d-flex justify-content-center">
        <!--dropdown button for data type-->
        <div class="dropdown">
            <button class="btn btn-secondary btn-sm btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Data Type
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
            </div>
        </div>

        <datepicker class="datepicker-util" calendar-button-icon="far fa-calendar-alt" :calendar-button="true" v-model="date.start" input-class="inputclass"></datepicker>
        ~
        <datepicker class="datepicker-util" calendar-button-icon="far fa-calendar-alt" :calendar-button="true" v-model="date.end" input-class="inputclass"></datepicker>

        <button @click="update()" class="update-btn btn btn-primary btn-light btn-sm"> Update </button>
    </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
    name: 'DatePicker',
    components: {
        Datepicker
    },
    methods: {
        update: function () {
            console.log("update");
            console.log(this.$emit('update-chart'));
        }
    },
    data () {
        return {
            date: {
                start: null,
                end: null
            }
            
        }
    },
    // watch: {
    //     start: function (value) {
    //         console.log(value);
    //     },
    //     end: function (value) {
    //         console.log(value);
    //     }
    // }
}
</script>

<style>
    .date-picker {
        align-items: center;
    }
    
    .datepicker-label {
        font-size: 13px;
        margin-bottom: 0;
    }

    .datepicker-util {
        margin-left: 15px;
        margin-right: 15px;
    }

    .dropdown {
        margin-right: 10px;
    }

    @media screen and (max-width: 1340px)  {
        .inputclass {
            width: 50px;
        }
        .dropdown {
        margin-right: 1px;
        }
    }

    @media screen and (max-width: 1200px)  {
        .inputclass {
            width: 100px;
        }
        .dropdown {
            margin-right: 15px;
        }
    }

    @media screen and (max-width: 499px)  {
        .inputclass {
            width: 25px;
        }
        .dropdown {
            margin-right: 5px;
        }

    }


</style>
