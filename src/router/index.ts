import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import CartView from '@/views/cartView.vue'


const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      // children: [
      //   {
      //     path: "/login",
      //     component: Login,
      //   }
      //   ,
      //   {
      //     path: "/signup",
      //     component: SingUp,
      //   }
      // ]
    },
    {
      path: '/about',
      name: 'about',
      component: ProductDetailView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailView
    }
  ]
})

export default router
