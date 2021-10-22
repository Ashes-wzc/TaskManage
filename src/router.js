import { createRouter, createWebHistory } from "vue-router"

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('./components/index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/views/Login.vue')
    },
    {
      path: '/demup',
      name: 'Demup',
      component: () => import('./components/layout/DemupApp.vue'),
      children: [
        {
          path: 'task',
          name: 'Task',
          component: () => import('./components/views/Task.vue')
        },
        {
          path: 'user',
          name: 'User',
          component: () => import('./components/views/User.vue')
        },
        {
          path: 'other',
          name: 'Other',
          component: () => import('./components/views/Other.vue')
        },
        {
          path: '/projects',
          name: 'Projects',
          component: () => import('./components/views/Projects.vue'),
          children: [{
            path: 'b8l',
            name: 'B8L',
            component: () => import('./components/Projects/B8L.vue'),
            children: [{
              path: 'projectinfo',
              name: 'projectinfo',
              component: () => import('./components/ui-components/ProjectInfo.vue')
            },{
              path: 'task',
              name: 'task',
              component: () => import('./components/ui-components/Task.vue')
            },{
              path: 'filesystem',
              name: 'filesystem',
              component: () => import('./components/ui-components/FileSystem.vue')
            },{
              path: 'standard',
              name: 'standard',
              component: () => import('./components/ui-components/Standard.vue')
            },{
              path: 'test',
              name: 'test',
              component: () => import('./components/ui-components/Test.vue')
            }]
          }]
        }
      ]
    }
  ]
})

export default router
