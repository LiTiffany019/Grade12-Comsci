import { createRouter, createWebHistory } from "vue-router";
import HomepageView from "../views/HomepageView.vue";
import LoginView from "../views/LoginView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import CartView from "../views/CartView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: HomepageView,
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/purchase",
      component: PurchaseView,
    },
    {
      path: "/cart",
      component: CartView,
    },
  ],
});
