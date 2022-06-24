import { createRouter, createWebHistory } from "vue-router";
import NumberBaseball from "../numberBaseBoll/numberBaseBoll";
import ResponseCheck from "../responseCheck/responseCheck";
import RockPaperScissors from "../rockPaperScissors/rockPaperScissors";
import LottoGame from "../lottoGame/lottoGame";
import GameMatcher from "./GameMatcher";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/number-baseball", component: NumberBaseball },
        { path: "/response-check",  component: ResponseCheck },
        { path: "/rock-paper-scissors",  component: RockPaperScissors },
        { path: "/lotto-game",  component: LottoGame },
        { path: "/game/:name",  component: GameMatcher }
    ]
}); 