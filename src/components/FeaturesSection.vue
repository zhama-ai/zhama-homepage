<template>
  <section id="features" class="py-20 bg-white dark:bg-dark-800 overflow-hidden relative">
    <div class="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-5"></div>
    <div class="particle-background" ref="particleContainer"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {{ t('featuresSection.title') }}
        </p>
        <p class="mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300 lg:mx-auto mb-12">
          {{ t('featuresSection.subtitle') }}
        </p>
      </div>

      <!-- 新的布局：卡片内容展示 -->
      <div class="feature-showcase mt-12 relative">
        <!-- 主要展示区域 -->
        <div class="flex flex-col lg:flex-row bg-gray-100/80 dark:bg-dark-900/60 rounded-2xl p-4 lg:p-8 gap-6 lg:gap-12 border border-gray-300 dark:border-accent-500/20 h-full">
          <!-- 左侧内容 -->
          <div class="lg:w-5/12 flex flex-col">
            <div v-if="activeFeature === 0" class="feature-content h-full">
              <div class="feature-icon-wrapper mb-4 flex items-center gap-4">
                <div class="feature-icon">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('featuresSection.collection.title') }}</h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed my-6" v-html="highlightText(t('featuresSection.collection.description'))"></p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span v-for="(tag, idx) in collectionTags" :key="idx" class="feature-tag">{{ tag }}</span>
              </div>
            </div>

            <div v-if="activeFeature === 1" class="feature-content h-full">
              <div class="feature-icon-wrapper mb-4 flex items-center gap-4">
                <div class="feature-icon feature-icon-alt">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('featuresSection.analysis.title') }}</h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed my-6" v-html="highlightText(t('featuresSection.analysis.description'))"></p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span v-for="(tag, idx) in analysisTags" :key="idx" class="feature-tag">{{ tag }}</span>
              </div>
            </div>

            <div v-if="activeFeature === 2" class="feature-content h-full">
              <div class="feature-icon-wrapper mb-4 flex items-center gap-4">
                <div class="feature-icon">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('featuresSection.organization.title') }}</h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed my-6" v-html="highlightText(t('featuresSection.organization.description'))"></p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span v-for="(tag, idx) in organizationTags" :key="idx" class="feature-tag">{{ tag }}</span>
              </div>
            </div>
          </div>

          <!-- 右侧图片 -->
          <div class="lg:w-7/12 flex items-center">
            <div class="feature-display-wrapper w-full border border-accent-500/30 rounded-xl overflow-hidden">
              <img 
                v-if="activeFeature === 0" 
                src="/images/features/multi-source-collection.jpg" 
                :alt="t('featuresSection.collection.title')" 
                class="w-full h-full object-cover"
              />
              <img 
                v-if="activeFeature === 1" 
                src="/images/features/ai-note.jpg" 
                :alt="t('featuresSection.analysis.title')" 
                class="w-full h-full object-cover"
              />
              <img 
                v-if="activeFeature === 2" 
                src="/images/features/knowledge-graph.jpg" 
                :alt="t('featuresSection.organization.title')" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Tab 切换按钮 -->
        <div class="tab-container mt-8 p-2 bg-gray-200/70 dark:bg-dark-700/50 rounded-full inline-flex mx-auto">
          <button 
            v-for="(_, index) in tabsList" 
            :key="index"
            @click="activeFeature = index"
            class="tab-button py-2 px-6 rounded-full text-sm transition-all duration-300"
            :class="activeFeature === index ? 'active-tab' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'"
          >
            {{ tabsList[index] }}
          </button>
        </div>
      </div>

      <!-- 更多功能 -->
      <div class="mt-24" data-aos="fade-up">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white text-center mb-12">{{ t('featuresSection.moreFeatures.title') }}</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 功能4：高效任务与时间管理 -->
          <div class="tech-card p-6 hover-lift transition-transform duration-300" data-aos="zoom-in" data-aos-delay="100">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent-600/20 text-accent-400 mb-4">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ t('featuresSection.moreFeatures.taskManagement.title') }}</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed" v-html="highlightText(t('featuresSection.moreFeatures.taskManagement.description'))">
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/images/features/audio-transcription.jpg" :alt="t('featuresSection.moreFeatures.taskManagement.title')" class="w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- 功能5：习惯养成与健康追踪 -->
          <div class="tech-card p-6 hover-lift transition-transform duration-300" data-aos="zoom-in" data-aos-delay="200">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent-600/20 text-accent-400 mb-4">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ t('featuresSection.moreFeatures.habitTracking.title') }}</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed" v-html="highlightText(t('featuresSection.moreFeatures.habitTracking.description'))">
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/images/features/knowledge-assets.jpg" :alt="t('featuresSection.moreFeatures.habitTracking.title')" class="w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- 功能6：智能记账与财务管理 -->
          <div class="tech-card p-6 hover-lift transition-transform duration-300" data-aos="zoom-in" data-aos-delay="300">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent-600/20 text-accent-400 mb-4">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ t('featuresSection.moreFeatures.financeManagement.title') }}</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed" v-html="highlightText(t('featuresSection.moreFeatures.financeManagement.description'))">
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/images/features/professional-scenarios.jpg" :alt="t('featuresSection.moreFeatures.financeManagement.title')" class="w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Ref } from 'vue';
import enMessages from '../i18n/en';
import zhMessages from '../i18n/zh';

const { t, locale } = useI18n();
const particleContainer: Ref<HTMLElement | null> = ref(null);
const activeFeature: Ref<number> = ref(0);

// 使用计算属性获取动态的 tab 列表
const tabsList = computed(() => [
  t('featuresSection.tabs.collection'),
  t('featuresSection.tabs.analysis'),
  t('featuresSection.tabs.organization')
]);

// 根据当前语言直接从翻译文件获取标签列表
const collectionTags = computed(() => {
  return locale.value === 'zh' 
    ? zhMessages.featuresSection.collection.tags 
    : enMessages.featuresSection.collection.tags;
});

const analysisTags = computed(() => {
  return locale.value === 'zh' 
    ? zhMessages.featuresSection.analysis.tags 
    : enMessages.featuresSection.analysis.tags;
});

const organizationTags = computed(() => {
  return locale.value === 'zh' 
    ? zhMessages.featuresSection.organization.tags 
    : enMessages.featuresSection.organization.tags;
});

// 高亮文本中的重点内容
const highlightText = (text: string): string => {
  // 将文本中的 <span class="text-accent-400">...</span> 保留并高亮
  return text.replace(/<span class="text-accent-400">(.*?)<\/span>/g, '<span class="text-accent-400">$1</span>');
};

// 创建粒子效果
const createParticles = (): void => {
  if (!particleContainer.value) return;
  
  const container: HTMLElement = particleContainer.value;
  const containerWidth: number = container.offsetWidth;
  const containerHeight: number = container.offsetHeight;
  
  // 清空容器
  container.innerHTML = '';
  
  // 创建粒子
  for (let i = 0; i < 30; i++) {
    const particle: HTMLDivElement = document.createElement('div');
    particle.classList.add('particle');
    
    // 随机位置
    const x: number = Math.random() * containerWidth;
    const y: number = Math.random() * containerHeight;
    
    // 随机大小
    const size: number = Math.random() * 4 + 1;
    
    // 随机动画持续时间
    const duration: number = Math.random() * 10 + 10;
    const delay: number = Math.random() * 5;
    
    // 应用样式
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animation = `float-up ${duration}s linear ${delay}s infinite`;
    
    container.appendChild(particle);
  }
};

// 激活AOS动画效果
onMounted(() => {
  // 创建粒子效果
  createParticles();
  
  // 窗口大小变化时重新创建粒子
  window.addEventListener('resize', createParticles);
  
  // 首次加载时添加动画类
  setTimeout(() => {
    const elements: NodeListOf<Element> = document.querySelectorAll('[data-aos]');
    elements.forEach((element: Element) => {
      element.classList.add('aos-animate');
    });
  }, 100);

  // 监听滚动事件，在元素进入视口时添加动画类
  const handleScroll = (): void => {
    const elements: NodeListOf<Element> = document.querySelectorAll('[data-aos]:not(.aos-animate)');
    
    elements.forEach((element: Element) => {
      const elementPosition: number = element.getBoundingClientRect().top;
      const windowHeight: number = window.innerHeight;
      
      if (elementPosition < windowHeight * 0.9) {
        element.classList.add('aos-animate');
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  
  // 初始触发一次滚动事件处理
  handleScroll();
  
  // 组件卸载时移除事件监听
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', createParticles);
  };
});
</script>

<style scoped>
/* Tab相关样式 */
.tab-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.tab-button {
  transition: all 0.3s ease;
}

.active-tab {
  background-color: rgba(132, 90, 223, 0.2);
  color: #333;
  font-weight: 600;
  box-shadow: 0 0 15px rgba(132, 90, 223, 0.4);
}

.dark .active-tab {
  color: #fff;
}

/* 展示区样式 */
.feature-showcase {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-display-wrapper {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16/9;
  position: relative;
  min-height: 350px;
  max-height: 420px;
}

.dark .feature-display-wrapper {
  background-color: #252847;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}

.feature-display-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

/* 其它原有样式 */
.feature-content-card {
  border-radius: 16px;
  border: 1px solid rgba(200, 200, 200, 0.3);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(245, 245, 245, 0.95));
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.dark .feature-content-card {
  border: 1px solid rgba(132, 90, 223, 0.1);
  background: linear-gradient(145deg, rgba(26, 26, 46, 0.8), rgba(26, 26, 46, 0.95));
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(132, 90, 223, 0.8), rgba(132, 90, 223, 0.6));
  color: white;
  box-shadow: 0 10px 20px -5px rgba(132, 90, 223, 0.4);
  position: relative;
  overflow: hidden;
  animation: glow 3s ease-in-out infinite;
}

.feature-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-icon:hover::before {
  opacity: 1;
}

.feature-icon-alt {
  background: linear-gradient(135deg, rgba(65, 184, 131, 0.8), rgba(65, 184, 131, 0.6));
  box-shadow: 0 10px 20px -5px rgba(65, 184, 131, 0.4);
}

.feature-tag {
  background-color: rgba(132, 90, 223, 0.15);
  color: rgba(132, 90, 223, 0.9);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.feature-tag:hover {
  background-color: rgba(132, 90, 223, 0.25);
  transform: translateY(-2px);
}

/* 特性卡片（下面小卡片）样式 */
.tech-card {
  border-radius: 16px;
  border: 1px solid rgba(200, 200, 200, 0.5);
  background: white;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.dark .tech-card {
  border: 1px solid rgba(132, 90, 223, 0.1);
  background: linear-gradient(145deg, rgba(26, 26, 46, 0.8), rgba(26, 26, 46, 0.95));
}

/* 小卡片专用的图片容器 */
.interactive-image {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-height: 200px;
  display: block;
  border-radius: 8px;
}

.interactive-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
}

.interactive-image .relative {
  background-color: #f5f5f5;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

.dark .interactive-image .relative {
  background-color: #252847;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4);
}

.hover-lift:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
}

.dark .hover-lift:hover {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .feature-display-wrapper {
    min-height: 300px;
    max-height: 380px;
  }
}

@media (max-width: 992px) {
  .feature-display-wrapper {
    min-height: 280px;
    max-height: 350px;
  }
}

@media (max-width: 768px) {
  .feature-display-wrapper {
    aspect-ratio: 4/3;
    min-height: 250px;
    max-height: 320px;
  }
  
  .tab-button {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .feature-display-wrapper {
    aspect-ratio: 1/1;
    min-height: 220px;
    max-height: 280px;
  }
}

/* 粒子背景效果 */
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  background-color: rgba(132, 90, 223, 0.3);
  border-radius: 50%;
  pointer-events: none;
}

@keyframes float-up {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
    transform: translateY(-50px) rotate(45deg) scale(1.2);
  }
  50% {
    transform: translateY(-400px) rotate(180deg) scale(1.5);
  }
  90% {
    opacity: 0.2;
    transform: translateY(-800px) rotate(360deg) scale(1);
  }
  100% {
    transform: translateY(-1000px) rotate(720deg) scale(0.5);
    opacity: 0;
  }
}

@keyframes glow {
  0% {
    box-shadow: 0 0 10px 0 rgba(132, 90, 223, 0.5);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(132, 90, 223, 0.7);
  }
  100% {
    box-shadow: 0 0 10px 0 rgba(132, 90, 223, 0.5);
  }
}

.feature-content {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 992px) {
  .feature-content {
    min-height: 250px;
  }
}

@media (max-width: 768px) {
  .feature-content {
    min-height: auto;
    padding: 20px 0;
  }
}
</style> 