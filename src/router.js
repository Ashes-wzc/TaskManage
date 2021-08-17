import { createRouter, createWebHistory } from "vue-router"

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./components/views/Home.vue')
    },
    {
      path: '/b8l',
      name: 'B8L',
      component: () => import('./components/views/B8L.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('./components/views/Contact.vue')
    }
  ]
})

export default router