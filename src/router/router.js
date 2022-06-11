import {createRouter, createWebHashHistory} from "vue-router";

import navigation from '../pages/PageNavigation.vue'
import login from '../components/UserLogin.vue'
import register from '../components/UserRegister.vue'
import home from '../pages/ServiceHome.vue'

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: 'router-active',
    routes: [
        {path: '/', redirect: '/navigation/login'},
        {
            path: '/navigation',
            component: navigation,
            children: [
                {path: 'login', component: login},
                {path: 'register', component: register},
            ],
        },
        {path: '/home', component: home}
    ]
})

export default router