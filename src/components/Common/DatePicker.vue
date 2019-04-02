<template>
    <div class="date-picker d-flex justify-content-center">
        <datepicker class="datepicker-util" calendar-button-icon="far fa-calendar-alt" :calendar-button="true" v-model="start" input-class="inputclass"></datepicker>
        ~
        <datepicker class="datepicker-util" calendar-button-icon="far fa-calendar-alt" :calendar-button="true" v-model="end" input-class="inputclass"></datepicker>

        <button @click="update" class="update-btn btn btn-primary btn-light btn-sm"> Update </button>
    </div>

</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
    name: 'DatePicker',
    components: {
        Datepicker
    },
    data () {
        return {
            start: null,
            end: null
        }
    },
    watch: {
        start: function (value) {
            //convert date into wanted format
            this.start = new Date(value).toISOString().split("T")[0];
        },
        end: function (value) {
            //convert date into wanted format
            this.end = new Date(value).toISOString().split("T")[0];
        }
    },
    methods: {
        //when update button is clicked, emits data to parent
        update: function (event) {
            var self = this;

            //check if the starting date is before the end date
            if(this.validateDates()) {
                alert("시작 날짜가 앞서 있습니다. 날짜를 다시 선택해주세요.")
            } else {
                var date = {
                    start: self.start,
                    end: self.end
                };
                this.$emit('update-chart', date);
            }
            
        },
        //validate inserted dates 
        validateDates: function () {
            return this.start > this.end;
        }
    },
    mounted () {
        this.start = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000).toISOString().split("T")[0];
        this.end = new Date().toISOString().split("T")[0];
    }
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
