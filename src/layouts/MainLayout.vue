<template>
  <div class="h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
    <!-- 导航栏 - 使用磨砂玻璃效果增强现代感 -->
    <nav class="flex-none h-16 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div class="flex justify-between h-full">
          <!-- Logo区域 -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2 group">
              <div class="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
                <img src="/logo.png" alt="灵溯Logo" class="h-5 w-auto" />
              </div>
              <div class="font-bold text-lg text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">灵溯LLM安全测试平台</div>
            </router-link>

            <!-- 桌面端导航链接 - 简化样式 -->
            <div class="ml-8 hidden md:flex">
              <NavLink
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                :icon="item.icon"
              >
                {{ item.name }}
              </NavLink>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- API状态指示器 -->
            <div class="hidden md:flex items-center text-sm text-slate-600 dark:text-slate-300">
              <div class="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              API正常
            </div>

            <!-- 深色模式切换 - 添加动画 -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative overflow-hidden"
              aria-label="切换深色模式"
            >
              <SunIcon v-if="isDarkMode" class="h-5 w-5 text-amber-400 dark:text-amber-300 transform transition-transform rotate-0" />
              <MoonIcon v-else class="h-5 w-5 text-slate-700 transform transition-transform rotate-0" />
            </button>

            <!-- 设置按钮 -->
            <router-link
              to="/settings"
              class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="设置"
            >
              <Cog6ToothIcon class="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </router-link>

            <!-- 移动端菜单按钮 -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="菜单"
            >
              <Bars3Icon v-if="!mobileMenuOpen" class="h-5 w-5 text-slate-700 dark:text-slate-300" />
              <XMarkIcon v-else class="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 移动端菜单抽屉 - 更现代的侧滑菜单 -->
    <MobileMenu :open="mobileMenuOpen" @close="mobileMenuOpen = false" :nav-items="navItems" :side-items="[...guideItems, ...toolItems]" />

    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      <!-- 侧边栏 - 使用flex-none固定宽度 -->
      <aside class="w-64 flex-none hidden md:block bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
        <div class="p-4">
          <!-- 安全指南部分 -->
          <SidebarSection
            title="安全指南"
            :icon="icons.shieldCheck"
            className="mb-6"
          >
            <SidebarLink
              v-for="item in guideItems"
              :key="item.path"
              :to="item.path"
              :icon="item.icon"
            >
              {{ item.name }}
            </SidebarLink>
          </SidebarSection>

          <!-- 测试工具部分 -->
          <SidebarSection
            title="测试工具"
            :icon="icons.beaker"
            className="mt-6"
          >
            <SidebarLink
              v-for="item in toolItems"
              :key="item.path"
              :to="item.path"
              :icon="item.icon"
            >
              {{ item.name }}
            </SidebarLink>
          </SidebarSection>

          <!-- 状态信息卡片 - 更现代的设计 -->
          <div class="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-100 dark:border-indigo-800/50">
            <div class="flex items-start">
              <div class="shrink-0 bg-indigo-100 dark:bg-indigo-800/50 rounded-lg p-2">
                <InformationCircleIcon class="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-indigo-800 dark:text-indigo-300">安全测试模式</h3>
                <p class="mt-1 text-xs text-indigo-700 dark:text-indigo-400">当前系统仅用于安全研究目的，请勿用于实际攻击</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- 内容区域 -->
      <main class="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-900">
        <div class="p-4 md:p-6 lg:p-8">
          <router-view v-slot="{ Component }" :key="$route.fullPath">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <!-- 页脚 -->
    <footer class="flex-none bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-slate-400 text-sm gap-y-3">
          <div class="flex items-center">
            <div class="h-6 w-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center mr-2">
              <img src="/logo.png" alt="灵溯Logo" class="h-3.5 w-auto" />
            </div>
            <p>灵溯LLM安全测试平台 © {{ new Date().getFullYear() }}</p>
          </div>
          <div class="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <!-- <FooterLink icon="UserGroupIcon">米斯特安全团队</FooterLink> -->
            <FooterLink icon="BuildingOffice2Icon">御之安科技有限公司</FooterLink>
            <FooterLink icon="SparklesIcon">米斯特安全团队AI分部</FooterLink>
            <FooterLink icon="CodeBracketIcon">GeetoRinku</FooterLink>
          </div>
        </div>
      </div>
    </footer>

    <!-- 移动端底部导航 -->
    <div class="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-40">
      <router-link
        v-for="item in mobileNavItems"
        :key="item.path"
        :to="item.path"
        class="py-3 flex flex-1 flex-col items-center justify-center text-xs font-medium transition-colors"
        :class="[$route.path === item.path ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400']"
      >
        <component :is="item.icon" class="h-5 w-5 mb-1" />
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, markRaw, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDarkMode } from '@/composables/useDarkMode';
import {
  HomeIcon, BeakerIcon, ClipboardDocumentListIcon,
  Cog6ToothIcon, SunIcon, MoonIcon, UserGroupIcon, SparklesIcon,
  CodeBracketIcon, BuildingOffice2Icon, InformationCircleIcon,
  CommandLineIcon, CircleStackIcon, DocumentTextIcon,
  PresentationChartLineIcon, EnvelopeIcon, ShieldCheckIcon,
  ShieldExclamationIcon, Bars3Icon, XMarkIcon
} from '@heroicons/vue/24/outline';
import type { IconType } from '@/types/components';

// 导入组件
import NavLink from '@/components/NavLink.vue';
import SidebarSection from '@/components/SidebarSection.vue';
import SidebarLink from '@/components/SidebarLink.vue';
import FooterLink from '@/components/FooterLink.vue';
import MobileMenu from '@/components/MobileMenu.vue';

// 使用 markRaw 处理所有图标
const icons = {
  home: markRaw(HomeIcon),
  beaker: markRaw(BeakerIcon),
  circleStack: markRaw(CircleStackIcon),
  clipboard: markRaw(ClipboardDocumentListIcon),
  document: markRaw(DocumentTextIcon),
  presentation: markRaw(PresentationChartLineIcon),
  shieldExclamation: markRaw(ShieldExclamationIcon),
  envelope: markRaw(EnvelopeIcon),
  command: markRaw(CommandLineIcon),
  shieldCheck: markRaw(ShieldCheckIcon),
  cog: markRaw(Cog6ToothIcon)
} as const;

// 修改导航数据，使用处理过的图标
const navItems = [
  { name: '首页', path: '/', icon: icons.home },
  { name: '测试界面', path: '/test', icon: icons.beaker },
  { name: '模板库', path: '/templates', icon: icons.circleStack },
  // { name: '历史记录', path: '/history', icon: icons.clipboard }
];

const guideItems = [
  { name: 'LLM安全总纲', path: '/security-guide', icon: icons.document },
  { name: 'LLM安全演示', path: '/security-demo', icon: icons.presentation },
  { name: 'LLM安全危害', path: '/security-risks', icon: icons.shieldExclamation },
  { name: '联系我们', path: '/contact', icon: icons.envelope }
];

const toolItems = [
  { name: '越狱测试', path: '/test', icon: icons.command },
  { name: '越狱检测', path: '/jailbreak-detection', icon: icons.shieldCheck },
  { name: 'API配置', path: '/settings', icon: icons.cog }
];

// 移动端导航项目 - 优化精简
const mobileNavItems = [
  { name: '首页', path: '/', icon: icons.home },
  { name: '测试', path: '/test', icon: icons.command },
  { name: '模板', path: '/templates', icon: icons.circleStack },
  { name: '设置', path: '/settings', icon: icons.cog }
];

// 使用可复用的深色模式组合式函数
const { isDarkMode, toggleDarkMode } = useDarkMode();

// 移动菜单状态
const mobileMenuOpen = ref(false);
const route = useRoute();

// 路由变化时关闭移动菜单
watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});

// 处理ESC键关闭移动菜单
onMounted(() => {
  const handleEsc = (e) => {
    if (e.key === 'Escape' && mobileMenuOpen.value) {
      mobileMenuOpen.value = false;
    }
  };
  window.addEventListener('keydown', handleEsc);
  return () => {
    window.removeEventListener('keydown', handleEsc);
  };
});
</script>

<style>
/* 自定义滚动条样式 */
.scrollbar::-webkit-scrollbar {
  width: 4px;
}

.scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(99, 102, 241, 0.2);
  border-radius: 20px;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局样式 */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-content {
    padding-bottom: env(safe-area-inset-bottom, 4rem);
  }
}
</style>
