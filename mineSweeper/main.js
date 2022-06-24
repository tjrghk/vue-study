import { createApp } from "vue";
import MineSweeper from "./MineSweeper";
import store from "./store.js";

createApp(MineSweeper).use(store).mount('#root');




