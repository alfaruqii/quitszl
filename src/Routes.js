import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomePage.vue"
import QuitPage from "./views/AddEvents.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/quit",
    name: "quit",
    component: QuitPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

