import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/widgets',
        name: 'Widgets',
        component: () => import(/* webpackChunkName: "widgets" */ '../views/Widgets.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
