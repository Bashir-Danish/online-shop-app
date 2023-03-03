import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/HomeVue.vue";
import jwt from "@/utils/jwt";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: home,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/components/Home/Home.vue"),
        },
        {
          path: "my-account",
          name: "account",
          component: () => import("@/components/Home/myAccount.vue"),
          meta: {
            isAuth: true,
          },
        },
        {
          path: "wishlist",
          name: "wishlist",
          component: () => import("@/components/Home/wishlist.vue"),
          meta: {
            isAuth: true,
          },
        },
      ],
    },
    {
      path: "/cart",
      component: () => import("@/views/CartView.vue"),
      children: [
        {
          path: "",
          name: "cart",
          component: () => import("@/components/cart.vue"),
        },
        {
          path: "checkout-flow",
          name: "checkout",
          component: () => import("@/components/checkout.vue"),
        },
      ],
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("@/views/ProductDetailView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((e) => e.meta.isAuth)) {
    if (!jwt.getToken()) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
