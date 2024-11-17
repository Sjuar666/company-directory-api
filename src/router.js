import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import CardDetails from './views/CardDetails.vue'
import LoginPage from './views/LoginPage.vue'
import SettingsPage from './views/SettingsPage.vue'

import { useAuth } from './composables/useAuth'
const { isAuthenticated } = useAuth()

const routes = [
  { path: '/Project5/', name: 'Home', component: HomePage },
  { path: '/Project5/other', name: 'Other', component: () => import('@/views/OtherPage.vue') },
  { path: '/Project5/employees/:id', name: 'CardDetails', component: CardDetails },
  { path: '/Project5/login', name: 'LoginPage', component: LoginPage },
  { path: '/Project5/settings', name: 'SettingsPage', component: SettingsPage, meta: {requires: true} },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

//navigation guard
router.beforeEach((to, _, next) => {
  if (to.meta.requiredAuth && !isAuthenticated.value) {
    next({name: 'LoginPage', query: {redirect: to.fullPath}})
  } else {
    next()
  }
})


export default router
