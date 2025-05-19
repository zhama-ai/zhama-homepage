<template>
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-md transition-colors duration-200 focus:outline-none"
    :class="{ 'text-gray-400 hover:text-yellow-500': isDark, 'text-gray-600 hover:text-gray-800': !isDark }"
    :title="isDark ? '切换到亮色模式' : '切换到暗色模式'"
    aria-label="切换主题"
  >
    <!-- 暗色模式图标（太阳） -->
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    <!-- 亮色模式图标（月亮） -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// 主题状态
const isDark = ref(true);

// 切换主题
const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

// 更新文档的主题类
const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

// 组件加载时检查本地存储的主题设置
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else {
    // 如果没有保存的主题设置，检查用户系统偏好
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  updateTheme();
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      isDark.value = e.matches;
      updateTheme();
    }
  });
});
</script> 