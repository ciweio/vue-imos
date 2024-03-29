import {createRouter, createWebHashHistory} from "vue-router"

import navigation from '../pages/PageNavigation.vue'
import login from '../components/UserLogin.vue'
import register from '../components/UserRegister.vue'
import home from '../pages/ServiceHome.vue'
import admin from '../components/admin/HomeAdmin.vue'
import user from '../components/user/HomeUser.vue'

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
        {
            path: '/home',
            component: home,
            children: [
                {path: 'admin', component: admin},
                {path: 'user', component: user},
            ],
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.path === '/navigation/login') return next()
    if (to.path === '/navigation/register') return next()
    const token = localStorage.getItem('token')
    if (!token) {
        return next('/navigation/login')
    }
    next()
})

export default router