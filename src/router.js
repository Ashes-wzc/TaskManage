import { createRouter, createWebHistory } from "vue-router"
import B8L from './components/views/B8L.vue'
import Contact from './components/views/Contact.vue'

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/b8l',
      component: B8L
    },
    {
      path: '/contact',
      component: Contact
    }
  ]
})

export default router