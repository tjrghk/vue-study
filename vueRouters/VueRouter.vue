<template>
    <div>   
        <div>
            <router-link to="/game/index">게임 매쳐</router-link>
            <router-link to="/game/number-baseball?page=3&limit=10">숫자야구</router-link>
            <router-link to="/game/response-check">반응속도</router-link>
            <router-link to="/game/rock-paper-scissors">가위바위보</router-link>
            <router-link to="/game/lotto-game">로또생성기</router-link>
        </div>
       <router-view></router-view>
    </div>
</template>

<script>


    export default {
        components: {
          
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
