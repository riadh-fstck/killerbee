import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from "@/views/ProductsView.vue";
import CartView from "@/views/CartView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import ProductView from "@/views/ProductView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CguView from "@/views/CguView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import FaqView from "@/views/FaqView.vue";
import CgvView from "@/views/CgvView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/products',
            name: 'products',
            component: ProductsView
        },
        {
            path: '/products/:id',
            name: 'product',
            component: ProductView
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartView
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckoutView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView
        },
        {
            path: '/faq',
            name: 'faq',
            component: FaqView
        },
        {
            path: '/cgv',
            name: 'cgv',
            component: CgvView
        },
        {
            path: '/cgu',
            name: 'cgu',
            component: CguView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {top: 0}
        }
    },
})

export default router
