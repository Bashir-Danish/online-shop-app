import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import Cart from '@/views/CartView.vue'
import CartView from '@/components/cart.vue'
import checkout from '@/components/checkout.vue'


const router = createRouter({
  history: createWebHistory(),
  
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: ProductDetailView
    },
    {
      path: '/cart',
      component: Cart,
      children: [
        {
          path: '',
          name: 'cart',
          component:CartView
        }
        ,{
          path: 'checkout-flow',
          name: 'checkout',
          component:checkout
        }
      ]
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductDetailView
    }
  ]
})

export default router
