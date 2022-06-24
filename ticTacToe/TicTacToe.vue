<template>
    <div>   
        <div v-if="winner">{{winner}}님의 승리입니다.</div>
        <table-component :table-data="tableData"></table-component>
        <div>{{turn}}님의 턴입니다.</div>
    </div>
</template>

<script>
    import TableComponent from "./TableComponent";
    
    export default {
        components: {
           "table-component": TableComponent
        },
        data() {
            return {
                tableData: [
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""]
                ],
                turn: 'O',
                winner: ""
            }
        },
        computed: {
          
         
        },
        methods: {
          
        },
        mounted() {
           
        },
        beforeDestroyed() {
            
        },  
          
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
