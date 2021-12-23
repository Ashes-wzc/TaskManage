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
      path: '/',
      component: () => import('./components/views/Office.vue'),
      children: [
        {
          path: 'projects',
          name: 'Projects',
          component: () => import('./components/views/Office/Projects.vue'),
          children: [
            {
              path: 'detail',
              name: 'Detail',
              component: () => import('./components/views/Office/projects/Detail.vue')
            },
            {
              path: 'schedule',
              name: 'Schedule',
              component: () => import('./components/views/Office/projects/Schedule.vue')
            },
            {
              path: 'process',
              name: 'Process',
              component: () => import('./components/views/Office/projects/Process.vue')
            }
          ]
        },
        {
          path: 'userinfo',
          name: 'UserInfo',
          component: () => import('./components/views/Office/UserInfo.vue')
        },
        {
          path: 'usermanage',
          name: 'UserManage',
          component: () => import('./components/views/Office/UserManage.vue'),
          // meta: {
          //   requireAuth: true
          // }
        }
      ]
    }
  ]
})

export default router
