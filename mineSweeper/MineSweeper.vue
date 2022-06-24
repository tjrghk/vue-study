<template>
    <div>   
        <mine-form/>
        <div>{{timer}}</div>
       <table-component/>
       <div>{{result}}</div>
    </div>
</template>

<script>
  
import { mapState } from "vuex";
import MineForm from './MineForm';
import TableComponent from './TableComponent';
import { INCREMENT_TIMER } from "./store";

    let interval;

    export default {
        components: {
            TableComponent,
            MineForm
        },
        computed: {
           ...mapState(["timer", "result", "halted"])
         
        },
        methods: {
          
        },
        mounted() {
           
        },
        beforeDestroyed() {
            
        },  
        watch: {
            halted(value, oldValue) {
                if (value === false) {
                    interval = setInterval(() => {
                        this.$store.commit(INCREMENT_TIMER);
                    }, 1000);
                } else {
                    clearInterval(interval);
                    alert(this.$store.state.result);
                }
            }
        }
          
    };
</script>
<style>
   table {
       border-collapse: collapse;
   }
   td {
       border: 3px solid black;
       width: 100px;
       height: 100px;
       text-align: center;
   }

</style>
