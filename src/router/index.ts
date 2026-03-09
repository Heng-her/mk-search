import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import NotFound from "../pages/NotFound.vue";
import { trackUser } from "../services/tracker.service"; // Import your tracker

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        { path: "", name: "home", component: Home },
        { path: "/about", name: "about", component: About },
        // Catch-all route for 404s
        { path: ":pathMatch(.*)*", name: "not-found", component: NotFound },
      ],
    },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

// THIS IS THE FIX:
// Runs after every successful navigation
router.afterEach((to) => {
  trackUser(to.fullPath);
});

export default router;