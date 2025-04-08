// 路由配置（添加安全危害页面）
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
// import HistoryView from '../views/HistoryView.vue'
import TemplatesView from '../views/TemplatesView.vue'
import SettingsView from '../views/SettingsView.vue'
import SecurityGuideView from '../views/SecurityGuideView.vue'
import SecurityDemoView from '../views/SecurityDemoView.vue'
import SecurityRisksView from '../views/SecurityRisksView.vue'
import ContactView from '../views/ContactView.vue'
import JailbreakDetection from '../views/JailbreakDetection.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/test',
          name: 'test',
          component: TestView
        },
        // {
        //   path: '/history',
        //   name: 'history',
        //   component: HistoryView
        // },
        {
          path: '/templates',
          name: 'templates',
          component: TemplatesView
        },
        {
          path: '/settings',
          name: 'settings',
          component: SettingsView
        },
        // 安全指南相关路由
        {
          path: '/security-guide',
          name: 'security-guide',
          component: SecurityGuideView
        },
        {
          path: '/security-demo',
          name: 'security-demo',
          component: SecurityDemoView
        },
        {
          path: '/security-risks',
          name: 'security-risks',
          component: SecurityRisksView
        },
        {
          path: '/contact',
          name: 'contact',
          component: ContactView
        },
        {
          path: '/jailbreak-detection',
          name: 'jailbreak-detection',
          component: JailbreakDetection
        }
      ]
    }
  ]
})

export default router
