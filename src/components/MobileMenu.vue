<template>
  <div>
    <!-- 背景遮罩 -->
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
        @click="$emit('close')"
      ></div>
    </transition>

    <!-- 侧滑菜单 -->
    <transition name="slide">
      <div
        v-if="open"
        class="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-slate-800 z-50 shadow-xl overflow-y-auto"
      >
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <img src="/logo.png" alt="灵溯Logo" class="h-5 w-auto" />
            </div>
            <div class="font-bold text-slate-800 dark:text-white">灵溯安全平台</div>
          </div>
          <button @click="$emit('close')" class="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">
            <XMarkIcon class="h-5 w-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <div class="p-4">
          <div class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            主导航
          </div>
          <div class="space-y-1 mb-6">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300"
              :class="{ 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium': $route.path === item.path }"
              @click="$emit('close')"
            >
              <component
                :is="item.icon"
                :class="[$route.path === item.path ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400']"
                class="h-5 w-5 mr-3"
              />
              {{ item.name }}
            </router-link>
          </div>

          <div class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 mt-4">
            所有功能
          </div>
          <div class="space-y-1">
            <router-link
              v-for="item in sideItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-300"
              :class="{ 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium': $route.path === item.path }"
              @click="$emit('close')"
            >
              <component
                :is="item.icon"
                :class="[$route.path === item.path ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400']"
                class="h-5 w-5 mr-3"
              />
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';

defineProps({
  open: Boolean,
  navItems: Array,
  sideItems: Array
});

defineEmits(['close']);

const route = useRoute();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
