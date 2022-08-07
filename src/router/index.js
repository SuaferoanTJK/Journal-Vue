import { createRouter, createWebHashHistory } from "vue-router";
import authRouter from "@/modules/auth/router";
import daybookRouter from "@/modules/daybook/router";
import isAuthenticated from "@/modules/auth/router/authGuard";

const routes = [
  {
    path: "/",
    ...authRouter,
  },
  {
    path: "/daybook",
    beforeEnter: [isAuthenticated],
    ...daybookRouter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
