import { createApp } from "vue";
import TicTacToe from "./TicTacToe";
import store from "./store.js";

createApp(TicTacToe).use(store).mount('#root');




