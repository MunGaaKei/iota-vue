import "@p/css/main.scss";
import useInit from "@p/js/useInit";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";

useInit();

createApp(App).use(Router).use(createPinia()).mount("#app");
