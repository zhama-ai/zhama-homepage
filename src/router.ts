import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import PrivacyPolicy from './pages/PrivacyPolicy.vue'
import TermsOfService from './pages/TermsOfService.vue'
import PrivacyPolicyEN from './pages/PrivacyPolicyEN.vue'
import TermsOfServiceEN from './pages/TermsOfServiceEN.vue'
import AppDownload from './pages/AppDownload.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: PrivacyPolicy
  },
  {
    path: '/terms-of-service',
    name: 'terms-of-service',
    component: TermsOfService
  },
  {
    path: '/privacy-policy-en',
    name: 'privacy-policy-en',
    component: PrivacyPolicyEN
  },
  {
    path: '/terms-of-service-en',
    name: 'terms-of-service-en',
    component: TermsOfServiceEN
  },
  {
    path: '/download',
    name: 'app-download',
    component: AppDownload
  },
  {
    path: '/guide',
    name: 'guide',
    component: AppDownload
  },
  {
    path: '/app/home',
    name: 'app-home',
    component: AppDownload
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router 