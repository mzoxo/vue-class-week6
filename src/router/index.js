import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首頁',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('../views/front/IndexView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          path: 'product/:id',
          component: () => import('../views/front/ProductItemView.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartView.vue')
        },
        {
          path: 'login',
          component: () => import('../views/front/LoginView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: '後台首頁',
      component: () => import('../views/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'DashBoard',
          component: () => import('../views/admin/DashBoardView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/admin/AdminProductView.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrderView.vue')
        }
      ]
    }
  ]
})

export default router
