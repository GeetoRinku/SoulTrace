<template>
  <div :class="className">
    <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center uppercase tracking-wider">
      <component :is="iconComponent" class="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
      {{ title }}
    </h2>
    <ul class="space-y-1">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup lang="ts">
import * as HeroIcons from '@heroicons/vue/24/outline';
import type { IconType } from '@/types/components'
import { computed } from 'vue';

const props = defineProps<{
  title: string
  icon?: IconType | string
  className?: string
}>();

const iconComponent = computed(() => {
  if (typeof props.icon === 'string') {
    return HeroIcons[props.icon as keyof typeof HeroIcons] || null;
  }
  return props.icon || null;
});
</script>
