<template>
  <li>
    <router-link
      :to="to"
      class="group flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-300 rounded-lg transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700/50"
      :class="{ 'bg-indigo-50/70 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium': $route.path === to }"
    >
      <component
        :is="icon"
        class="h-4.5 w-4.5 mr-2.5 transition-colors"
        :class="[$route.path === to ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400']"
      />
      <slot></slot>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { IconType } from '@/types/components'

defineProps<{
  to: string
  icon: IconType
}>()
</script>
