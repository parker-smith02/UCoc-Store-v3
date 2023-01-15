import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards/auth";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import login from "../components/login.vue";
import TripsView from "../views/TripsView.vue";
import GroupOrderView from "../views/GroupOrderView.vue";
import AboutView from "../views/AboutView.vue";
import HowView from "../views/HowView.vue";
import CartView from "../views/CartView.vue";
import MerchDetailView from "../views/MerchDetailView.vue";
import ConfirmationView from "../views/ConfirmationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { authRequired: false },
      component: HomeView,
    },
    {
      path: "/merch/:name",
      meta: { authRequired: false },
      component: MerchDetailView,
    },
    {
      path: "/trips",
      name: "trips",
      meta: { authRequired: false },
      component: TripsView,
    },
    {
      path: "/group_orders",
      name: "group orders",
      meta: { authRequired: false },
      component: GroupOrderView,
    },
    {
      path: "/about",
      name: "about",
      meta: { authRequired: false },
      component: AboutView,
    },
    {
      path: "/how",
      name: "how to join",
      meta: { authRequired: false },
      component: HowView,
    },
    {
      path: "/cart",
      name: "cart",
      meta: { authRequired: false },
      component: CartView,
    },
    {
      path: "/confirmation",
      name: "confirmation",
      meta: { authRequired: false },
      component: ConfirmationView,
    },
    {
      path: "/admin",
      name: "admin login",
      meta: { authRequired: false },
      component: login,
    },
    {
      path: "/admin/main",
      name: "admin",
      meta: { authRequired: true },
      component: AdminView,
    },
  ],
});

router.beforeEach(authGuard);

export default router;
