import {createRouter, createWebHashHistory} from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'router-active',
    routes: []
})

export default router