<template>
   <div v-if="currentGame === 'number-baseball'">
        <NumberBaseball></NumberBaseball>
    </div>
   <div v-else-if="currentGame === 'response-check'">
        <ResponseCheck></ResponseCheck>
   </div>
   <div v-else-if="currentGame === 'rock-paper-scissors'">
        <RockPaperScissors></RockPaperScissors>
   </div>
   <div v-else>일치하는 게임이 없습니다.</div>
  
</template>

<script>
import NumberBaseball from "../numberBaseBoll/numberBaseBoll";
import ResponseCheck from "../responseCheck/responseCheck";
import RockPaperScissors from "../rockPaperScissors/rockPaperScissors";
import LottoGame from "../lottoGame/lottoGame";

export default {
    components: {
        NumberBaseball,
        ResponseCheck,
        RockPaperScissors,
        LottoGame
    },
    mounted() {
        console.log(this.$router);
        console.log(this.$route);
    },
    computed: {
        currentGame() {
            return this.$route.params.name;
        }
    }
}
</script>
