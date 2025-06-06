<template>
  <div class="relative">
    <div class="theme-switcher-container">
      <button 
        @click="toggleTheme" 
        class="theme-switcher-btn"
        :title="getThemeTitle()"
        aria-label="切换主题"
      >
        <!-- 图标容器 -->
        <div class="icon-container">
          <!-- 系统模式图标 -->
          <div v-if="themeMode === 'system'" class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <!-- 暗色模式图标（太阳） -->
          <div v-else-if="themeMode === 'dark'" class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <!-- 亮色模式图标（月亮） -->
          <div v-else class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
        </div>
        
        <!-- 模式指示器 -->
        <div class="mode-indicator">
          {{ getModeText() }}
        </div>
      </button>
      
      <!-- 切换动画效果 -->
      <div class="switch-ripple" :class="{ active: isAnimating }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

type ThemeMode = 'system' | 'light' | 'dark';

// 主题状态
const isDark = ref(false);
const themeMode = ref<ThemeMode>('system');
const isAnimating = ref(false);

// 获取系统主题偏好
const getSystemTheme = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// 切换主题
const toggleTheme = () => {
  isAnimating.value = true;
  
  const modes: ThemeMode[] = ['system', 'light', 'dark'];
  const currentIndex = modes.indexOf(themeMode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  themeMode.value = modes[nextIndex];
  
  updateTheme();
  
  // 重置动画状态
  setTimeout(() => {
    isAnimating.value = false;
  }, 300);
};

// 获取模式文本
const getModeText = (): string => {
  const texts = {
    system: '跟随',
    light: '亮色',
    dark: '暗色'
  };
  return texts[themeMode.value];
};

// 获取主题标题
const getThemeTitle = (): string => {
  const titles = {
    system: '跟随系统主题',
    light: '切换到亮色模式',
    dark: '切换到暗色模式'
  };
  return titles[themeMode.value];
};

// 更新文档的主题类
const updateTheme = () => {
  if (themeMode.value === 'system') {
    isDark.value = getSystemTheme();
    localStorage.setItem('theme', 'system');
  } else {
    isDark.value = themeMode.value === 'dark';
    localStorage.setItem('theme', themeMode.value);
  }
  
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 处理系统主题变化
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  if (themeMode.value === 'system') {
    isDark.value = e.matches;
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

// 组件加载时检查本地存储的主题设置
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') as ThemeMode;
  
  if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
    themeMode.value = savedTheme;
  } else {
    themeMode.value = 'system'; // 默认跟随系统
  }
  
  updateTheme();
  
  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handleSystemThemeChange);
  
  // 组件卸载时清理监听器
  onUnmounted(() => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  });
});
</script>

<style scoped>
.theme-switcher-container {
  @apply relative;
}

.theme-switcher-btn {
  @apply flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300;
  @apply bg-white/80 dark:bg-dark-700/80 backdrop-blur-md;
  @apply border border-light-400/30 dark:border-dark-500/30;
  @apply shadow-light-soft hover:shadow-light-medium dark:shadow-lg;
  @apply text-secondary hover:text-accent-600 dark:hover:text-accent-400;
  @apply focus:outline-none focus:ring-2 focus:ring-accent-400/50;
  @apply transform hover:scale-105 active:scale-95;
  min-width: 100px;
}

.icon-container {
  @apply relative flex items-center justify-center;
}

.icon-wrapper {
  @apply flex items-center justify-center w-5 h-5;
  @apply transition-transform duration-300 ease-out;
}

.icon {
  @apply w-5 h-5 transition-all duration-300;
}

.mode-indicator {
  @apply text-xs font-semibold tracking-wide uppercase;
  @apply transition-all duration-300;
}

.switch-ripple {
  @apply absolute inset-0 rounded-2xl;
  @apply bg-accent-400/20 dark:bg-accent-400/30;
  @apply scale-0 transition-transform duration-300 ease-out;
  @apply pointer-events-none;
}

.switch-ripple.active {
  @apply scale-110;
  animation: ripple-effect 0.3s ease-out;
}

/* 主题特定样式 */
.theme-switcher-btn[data-theme="system"] {
  @apply bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20;
  @apply border-blue-200 dark:border-blue-700/50;
}

.theme-switcher-btn[data-theme="light"] {
  @apply bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20;
  @apply border-yellow-200 dark:border-yellow-700/50;
}

.theme-switcher-btn[data-theme="dark"] {
  @apply bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20;
  @apply border-slate-200 dark:border-slate-700/50;
}

/* 悬停动画 */
.theme-switcher-btn:hover .icon-wrapper {
  @apply transform rotate-12 scale-110;
}

.theme-switcher-btn:hover .mode-indicator {
  @apply text-accent-600 dark:text-accent-400;
}

/* 涟漪动画 */
@keyframes ripple-effect {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* 响应式调整 */
@media (max-width: 640px) {
  .theme-switcher-btn {
    min-width: auto;
    @apply px-3 py-2;
  }
  
  .mode-indicator {
    @apply hidden;
  }
}
</style> 