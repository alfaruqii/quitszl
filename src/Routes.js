import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/quit",
    name: "quit",
    component: () => import("./views/AddEvents.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  }
});

export default router;

