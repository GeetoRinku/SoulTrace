import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import type { IconType } from './types/components'

// 检查深色模式偏好
if (localStorage.getItem('darkMode') === 'true' ||
  (!('darkMode' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
  localStorage.setItem('darkMode', 'true')
} else {
  document.documentElement.classList.remove('dark')
  localStorage.setItem('darkMode', 'false')
}

const app = createApp(App)

// 禁用 Vue Devtools
if (process.env.NODE_ENV === 'production') {
  app.config.devtools = false
}

// 注册全局自定义指令
app.directive('animate', {
  mounted(el, binding) {
    // 创建观察器实例
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 元素进入视口
          let delay = 0;

          // 处理不同的动画值形式
          if (typeof binding.value === 'object') {
            delay = binding.value.delay || 0;
          }

          // 延迟添加可见类
          setTimeout(() => {
            el.classList.add('visible');
          }, delay);

          // 一旦动画完成，停止观察
          observer.unobserve(el);
        }
      });
    });

    // 开始观察元素
    observer.observe(el);
  }
})

app.use(createPinia())
app.use(router)

// 声明 Vue 的全局类型
declare module 'vue' {
  export interface GlobalComponents {
    SidebarLink: {
      icon: IconType
      to: string
    }
    SidebarSection: {
      title: string
      icon?: IconType | string
    }
  }
}

app.mount('#app')
