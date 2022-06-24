import { createApp } from "vue";
import routes from "./routes";
import VueRouter from "./VueRouter";
import store from "./store.js";

createApp(VueRouter).use(store).use(routes).mount('#root');




