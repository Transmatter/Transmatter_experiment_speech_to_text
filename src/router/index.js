import { createRouter, createWebHistory } from "vue-router";
import ContentPage from "@/views/content/content-page/content.page.vue";
import About from "@/views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ContentPage,
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