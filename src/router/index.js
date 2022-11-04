import { createRouter, createWebHistory } from 'vue-router'

import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children:[
        {
          path: '/',
          meta: {
            title: '首页',
            name: 'home',
            isNavBar: true,
            keepAlive: true,
          },
          component: () => import('@/views/HomeView.vue'),
        }
      ]
    },
    {
      path: '/list',
      component: Layout,
      children:[
        {
          path: '/list',
          meta: {
            title: '列表',
            name: 'list',
            isNavBar: true,
            keepAlive: false,
          },
          component: () => import('../views/list.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: Layout,
      children:[
        {
          path: '/:pathMatch(.*)*',
          meta: {
            title: '404_页面找不到啦',
            name: '404',
            keepAlive: false,
            isNavBar: true,
          },
          component: () => import('../views/NotPage.vue')
        }
      ]
    }
  ]
})

// router.afterEach((to, from, next) => {
//   console.log(isNavBar)
// })


// router.beforeEach((to, from, next) => {
//   console.log(to)
// })


export default router
