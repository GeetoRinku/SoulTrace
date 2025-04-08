<template>
  <router-link
    :to="to"
    class="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center"
    :class="{ 'text-indigo-600 dark:text-indigo-400': $route.path === to }"
  >
    <component :is="icon" class="h-5 w-5 mr-2" />
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import type { IconType } from '@/types/components'

defineProps<{
  to: string
  icon: IconType
}>()
</script>
