import useIota from "@p/js/useIota";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";

useIota();

createApp(App).use(Router).use(createPinia()).mount("#app");
