<template>
  <div class="language-switcher">
    <div class="language-switcher-container">
      <button 
        @click="toggleLanguage"
        class="language-switcher-btn"
        :title="getLanguageTitle()"
        aria-label="切换语言"
      >
        <!-- 语言图标 -->
        <div class="icon-container">
          <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
        </div>
        
        <!-- 当前语言显示 -->
        <div class="language-display">
          <span class="language-text">{{ getCurrentLanguageText() }}</span>
        </div>
        
        <!-- 箭头指示器 -->
        <div class="arrow-container">
          <svg class="arrow-icon" :class="{ rotated: showDropdown }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <!-- 语言选项下拉菜单 -->
      <Transition name="dropdown">
        <div v-if="showDropdown" class="language-dropdown">
          <button 
            v-for="lang in languages" 
            :key="lang.code"
            @click="selectLanguage(lang.code)"
            class="language-option"
            :class="{ active: currentLocale === lang.code }"
          >
            <div class="option-icon">
              {{ lang.flag }}
            </div>
            <div class="option-content">
              <span class="option-name">{{ lang.name }}</span>
              <span class="option-native">{{ lang.native }}</span>
            </div>
            <div v-if="currentLocale === lang.code" class="option-check">
              <svg xmlns="http://www.w3.org/2000/svg" class="check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </button>
        </div>
      </Transition>
      
      <!-- 切换动画效果 -->
      <div class="switch-ripple" :class="{ active: isAnimating }"></div>
    </div>
    
    <!-- 点击遮罩层关闭下拉菜单 -->
    <div v-if="showDropdown" class="dropdown-overlay" @click="closeDropdown"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

const { locale } = useI18n()
const currentLocale = computed(() => locale.value)
const showDropdown = ref(false)
const isAnimating = ref(false)

// 支持的语言列表
const languages: Language[] = [
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' }
]

// 获取当前语言文本
const getCurrentLanguageText = (): string => {
  const currentLang = languages.find(lang => lang.code === currentLocale.value)
  return currentLang ? currentLang.native : '中文'
}

// 获取语言标题
const getLanguageTitle = (): string => {
  return `当前语言: ${getCurrentLanguageText()}`
}

// 切换语言（简单切换）
const toggleLanguage = () => {
  showDropdown.value = !showDropdown.value
  if (!showDropdown.value) {
    // 如果是关闭下拉菜单，执行简单切换
    const currentIndex = languages.findIndex(lang => lang.code === currentLocale.value)
    const nextIndex = (currentIndex + 1) % languages.length
    selectLanguage(languages[nextIndex].code)
  }
}

// 选择语言
const selectLanguage = (langCode: string) => {
  if (langCode !== currentLocale.value) {
    isAnimating.value = true
    locale.value = langCode
    localStorage.setItem('locale', langCode)
    
    // 重置动画状态
    setTimeout(() => {
      isAnimating.value = false
    }, 300)
  }
  closeDropdown()
}

// 关闭下拉菜单
const closeDropdown = () => {
  showDropdown.value = false
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.language-switcher-container')) {
    closeDropdown()
  }
}

// Initialize locale from localStorage on component mount
onMounted(() => {
  const storedLocale = localStorage.getItem('locale')
  if (storedLocale && languages.some(lang => lang.code === storedLocale)) {
    locale.value = storedLocale
  }
  
  // 添加全局点击监听
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 移除全局点击监听
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-switcher {
  @apply relative;
}

.language-switcher-container {
  @apply relative;
}

.language-switcher-btn {
  @apply flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300;
  @apply bg-white/80 dark:bg-dark-700/80 backdrop-blur-md;
  @apply border border-light-400/30 dark:border-dark-500/30;
  @apply shadow-light-soft hover:shadow-light-medium dark:shadow-lg;
  @apply text-secondary hover:text-accent-600 dark:hover:text-accent-400;
  @apply focus:outline-none focus:ring-2 focus:ring-accent-400/50;
  @apply transform hover:scale-105 active:scale-95;
  @apply cursor-pointer;
  min-width: 120px;
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

.language-display {
  @apply flex-1 text-left;
}

.language-text {
  @apply text-sm font-semibold;
}

.arrow-container {
  @apply flex items-center justify-center w-4 h-4;
}

.arrow-icon {
  @apply w-4 h-4 transition-transform duration-300;
}

.arrow-icon.rotated {
  @apply transform rotate-180;
}

/* 下拉菜单样式 */
.language-dropdown {
  @apply absolute top-full left-0 right-0 mt-2 py-2;
  @apply bg-white/95 dark:bg-dark-800/95 backdrop-blur-lg;
  @apply border border-light-400/30 dark:border-dark-500/30;
  @apply rounded-2xl shadow-light-xl dark:shadow-xl;
  @apply z-50;
  min-width: 200px;
}

.language-option {
  @apply w-full flex items-center gap-3 px-4 py-3;
  @apply text-left transition-all duration-200;
  @apply hover:bg-light-100 dark:hover:bg-dark-700;
  @apply focus:outline-none focus:bg-light-100 dark:focus:bg-dark-700;
}

.language-option.active {
  @apply bg-accent-50 dark:bg-accent-900/20;
  @apply text-accent-600 dark:text-accent-400;
}

.option-icon {
  @apply text-lg;
}

.option-content {
  @apply flex-1 flex flex-col;
}

.option-name {
  @apply text-sm font-medium text-primary;
}

.option-native {
  @apply text-xs text-muted;
}

.option-check {
  @apply flex items-center justify-center w-5 h-5;
}

.check-icon {
  @apply w-4 h-4 text-accent-600 dark:text-accent-400;
}

/* 动画效果 */
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

/* 下拉菜单过渡动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}

/* 遮罩层 */
.dropdown-overlay {
  @apply fixed inset-0 z-40;
}

/* 悬停动画 */
.language-switcher-btn:hover .icon-wrapper {
  @apply transform rotate-12 scale-110;
}

.language-switcher-btn:hover .language-text {
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
  .language-switcher-btn {
    min-width: auto;
    @apply px-3 py-2;
  }
  
  .language-text {
    @apply text-xs;
  }
  
  .language-dropdown {
    min-width: 180px;
  }
}
</style> 