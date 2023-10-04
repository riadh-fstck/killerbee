import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {top: 0};
    },
})

router.beforeEach((to, from, next) => {
    if (to.name === 'login' && localStorage.getItem('token')) {
        next({name: 'home'})
    }
    if (to.name !== 'login' && to.name !== 'register' && !localStorage.getItem('token')) {
        next({name: 'login'})
    } else {
        next()
    }
});

export default router
