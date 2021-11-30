import { createRouter, createWebHistory } from "vue-router"

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/views/Login.vue')
    },
    {
      path: '/office',
      name: 'Office',
      component: () => import('./components/views/Office.vue'),
      children: [
        {
          path: 'task',
          name: 'Task',
          component: () => import('./components/views/Task.vue')
        },
        {
          path: '/projects',
          name: 'Projects',
          component: () => import('./components/views/Projects.vue')
        }
      ]
    }
  ]
})

export default router
