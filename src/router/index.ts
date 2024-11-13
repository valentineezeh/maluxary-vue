import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/Layout.vue'),
      children: [
          {
            path: '/',
            name: 'home',
            // route level code-splitting
            // this generates a separate chunk (HomeView.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/HomeView.vue'),
          },
          {
            path: '/checkout',
            name: 'checkout',
            // route level code-splitting
            // this generates a separate chunk (Checkout.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/Checkout.vue'),
          },
      ]
    },
  ],
})

export default router
