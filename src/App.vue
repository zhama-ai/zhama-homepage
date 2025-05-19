<template>
  <div class="min-h-screen bg-white bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
    <router-view />
  </div>
</template>

<style>
html {
  scroll-padding-top: 80px; /* 为固定导航条留出空间 */
}
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
});
</script>
