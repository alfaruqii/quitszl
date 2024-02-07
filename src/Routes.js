import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      enterClass: "animate__animated animate__fadeInLeft animate__fast",
      leaveClass: "animate__animated animate__fadeOutRight animate__fast"
    }
  },
  {
    path: "/quit",
    name: "AddEvents",
    component: () => import("./views/AddEvents.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInRight animate__fast",
      leaveClass: "animate__animated animate__fadeOutLeft animate__fast"
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: "NotFound",
    component: () => import("./views/NotFound.vue"),
    meta: {
      enterClass: "animate__animated animate__fadeInLeft animate__fast",
      leaveClass: "animate__animated animate__fadeOutRight animate__fast"
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'auto',
    }
  }
});

export default router;

