import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/views/Login.vue')
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('./components/views/ProjectMenu.vue'),
    },
    {
      path: '/userinfo',
      name: 'UserInfo',
      component: () => import('./components/views/Office/UserInfo.vue')
    },
    {
      path: '/usermanage',
      name: 'UserManage',
      component: () => import('./components/views/Office/UserManage.vue'),
      // meta: {
      //   requireAuth: true
      // }
    },
    {
      path: '/template',
      name: 'Template',
      component: () => import('./components/views/Office/Template.vue')
    }
  ]
})

export default router
