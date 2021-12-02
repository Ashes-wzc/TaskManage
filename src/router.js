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
          path: '/projects',
          name: 'Projects',
          component: () => import('./components/views/Office/Projects.vue')
        },
        {
          path: '/userinfo',
          name: 'UserInfo',
          component: () => import('./components/views/Office/UserInfo.vue')
        },
        {
          path: '/usermanage',
          name: 'UserManage',
          component: () => import('./components/views/Office/UserManage.vue')
        }
      ]
    }
  ]
})

export default router
