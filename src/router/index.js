import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginPage',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../DashboardLayout/DashboardView.vue'),
      children: [
        { path: '', redirect: '/user-info' },
        { path: '/user-info', component: () => import('@/views/UserInfo.vue') },
        { path: '/Allusers', component: () => import('@/views/AllUsers.vue') },
        { path: '/posts-page', component: () => import('@/views/PostPage.vue') },
        { path: '/post/:id', component: () => import('@/components/PostDetails.vue') },
        { path: '/user-profile/:id', component: () => import('@/views/UserProfile.vue') },
        { path: '/:catchAll(.*)', redirect: '/' },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/')
  } else if (to.path === '/' && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})
export default router
