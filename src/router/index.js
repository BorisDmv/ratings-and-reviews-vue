import { createRouter, createWebHistory } from 'vue-router'
import Library from "../views/Library.vue";
import Content from "../views/Content.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "library",
      component: Library,
    },
    {
      path: '/:id',
      name: "content",
      component: Content,
      meta: { transitionName: 'slide' }
    }
  ]
})

export default router
