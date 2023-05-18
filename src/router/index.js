import { createRouter, createWebHistory } from "vue-router";
import HomepageView from "../views/HomepageView.vue";
import LoginView from "../views/LoginView.vue";
import PurchaseView from "../views/PurchaseView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:"/",
            component: HomepageView
        }, 
        {
            path: "/Login",
            //capital L? what's the proper naming convention
            component: LoginView
        }, 
        {
            path: "/purchase", 
            component: PurchaseView
        }
    ],
});

export default router;