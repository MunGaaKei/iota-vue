import { createRouter, createWebHistory } from "vue-router";
import routes from './routes';

const Router = createRouter({
    history: createWebHistory(),
    routes
});

Router.beforeEach((to, from, next) => {
    return next()
});

export default Router;