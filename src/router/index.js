import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.page.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name : "Sign in"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;