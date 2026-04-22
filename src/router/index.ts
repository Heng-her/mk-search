import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import NotFound from "../pages/NotFound.vue";
import { trackUser } from "../services/tracker.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        { path: "", name: "home", component: Home },
        { path: "about", name: "about", component: About },
        // We can point these to Home or specific components
        { path: "projects", name: "projects", component: Home },
        { path: "contact", name: "contact", component: Home },
        { path: ":pathMatch(.*)*", name: "not-found", component: NotFound },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    console.log("to: ", to);
    console.log("from: ", from);

    // If navigating to a route name that matches a section ID on Home
    if (
      to.name === "projects" ||
      to.name === "contact" ||
      to.name === "about"
    ) {
      // Only scroll if we are already on the home page
      const element = document.getElementById(to.name as string);
      if (element) return { el: `#${to.name}`, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

router.afterEach((to) => {
  trackUser(to.fullPath);
});

export default router;
