<template>
  <span class="flex items-center hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-pointer">
    <component :is="iconComponent" class="h-3.5 w-3.5 mr-1.5" />
    <slot></slot>
  </span>
</template>

<script setup>
import * as HeroIcons from '@heroicons/vue/24/outline';

const props = defineProps({
  icon: String,
});

const iconComponent = HeroIcons[props.icon] || null;
</script>
