import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards/auth";
import HomeView from "../views/HomeView.vue";
import AdminView from "../views/AdminView.vue";
import login from "../components/login.vue";

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
