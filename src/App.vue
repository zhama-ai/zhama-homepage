<template>
  <div class="min-h-screen bg-light-200 bg-light-grid-pattern dark:bg-dark-900 dark:bg-grid-pattern overflow-x-hidden">
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

// 获取系统主题偏好
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // 默认跟随系统设置（system模式或没有保存的设置）
    if (getSystemTheme()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 如果没有保存的主题设置，设置为系统模式
    if (!savedTheme) {
      localStorage.setItem('theme', 'system');
    }
  }
});
</script>
