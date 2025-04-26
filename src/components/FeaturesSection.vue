<template>
  <section id="features" class="py-20 bg-dark-800 overflow-hidden relative">
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div class="particle-background" ref="particleContainer"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl">
          AI驱动的全能认知与生活引擎
        </p>
        <p class="mt-4 max-w-3xl text-xl text-gray-300 lg:mx-auto mb-12">
          扎马AI不仅是记录工具，更是你的AI驱动的认知与生活操作系统，融合深度知识管理与智能生活辅助
        </p>
      </div>

      <!-- 新的布局：卡片内容展示 -->
      <div class="feature-showcase mt-12 relative">
        <!-- 主要展示区域 -->
        <div class="flex flex-col lg:flex-row bg-dark-900/60 rounded-2xl p-4 lg:p-8 gap-6 lg:gap-12 border border-accent-500/20 h-full">
          <!-- 左侧内容 -->
          <div class="lg:w-5/12 flex flex-col">
            <div v-if="activeFeature === 0" class="feature-content h-full">
              <div class="feature-icon-wrapper mb-4 flex items-center gap-4">
                <div class="feature-icon">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">全域智能采集</h3>
              </div>
              <p class="text-gray-300 leading-relaxed my-6">
                支持<span class="text-accent-400">文本、语音、图片、PDF、网页、YouTube视频</span>等全格式解析，会议纪要、手写草图、白板照片、语音备忘、网页剪藏，AI自动识别并结构化归档。通过便捷的"操作按钮"或语音指令激活，轻松捕捉灵感与信息。
              </p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span class="feature-tag">文本识别</span>
                <span class="feature-tag">语音转写</span>
                <span class="feature-tag">图片解析</span>
                <span class="feature-tag">PDF提取</span>
                <span class="feature-tag">网页抓取</span>
              </div>
            </div>

            <div v-if="activeFeature === 1" class="feature-content h-full">
              <div class="feature-icon-wrapper mb-4 flex items-center gap-4">
                <div class="feature-icon feature-icon-alt">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">AI内容精炼与洞察</h3>
              </div>
              <p class="text-gray-300 leading-relaxed my-6">
                一键生成会议纪要、决策要点、项目待办清单，<span class="text-accent-400">节省高达90%的整理时间</span>。支持逻辑结构提取、语义总结、情绪趋势分析，适用于工作复盘、用户访谈、研究速览、个人成长反思等场景。
              </p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span class="feature-tag">会议摘要</span>
                <span class="feature-tag">决策要点</span>
                <span class="feature-tag">待办清单</span>
                <span class="feature-tag">情绪分析</span>
              </div>
            </div>

            <div v-if="activeFeature === 2" class="feature-content h-full">
              <div class="feature-icon-wrapper mb-4 flex items-center gap-4">
                <div class="feature-icon">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">智能组织与主动检索</h3>
              </div>
              <p class="text-gray-300 leading-relaxed my-6">
                基于知识图谱，按<span class="text-accent-400">项目/主题/人物/时间/情绪/收支类别</span>等智能分类，构建个人/团队知识网络。交互式AI问答：直接提问如"上周关于XX项目的关键风险是什么？"或"我近一个月的主要开销在哪方面？"，即时获取上下文精准答案。
              </p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span class="feature-tag">知识图谱</span>
                <span class="feature-tag">语义搜索</span>
                <span class="feature-tag">智能问答</span>
                <span class="feature-tag">多维分类</span>
              </div>
            </div>
          </div>

          <!-- 右侧图片 -->
          <div class="lg:w-7/12 flex items-center">
            <div class="feature-display-wrapper w-full border border-accent-500/30 rounded-xl overflow-hidden">
              <img 
                v-if="activeFeature === 0" 
                src="/images/features/multi-source-collection.jpg" 
                alt="多源智能采集" 
                class="w-full h-full object-cover"
              />
              <img 
                v-if="activeFeature === 1" 
                src="/images/features/ai-note.jpg" 
                alt="AI内容精炼与摘要" 
                class="w-full h-full object-cover"
              />
              <img 
                v-if="activeFeature === 2" 
                src="/images/features/knowledge-graph.jpg" 
                alt="智能分类与主动检索" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Tab 切换按钮 -->
        <div class="tab-container mt-8 p-2 bg-dark-700/50 rounded-full inline-flex mx-auto">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="activeFeature = index"
            class="tab-button py-2 px-6 rounded-full text-sm transition-all duration-300"
            :class="activeFeature === index ? 'active-tab' : 'text-gray-300 hover:text-white'"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- 更多功能 -->
      <div class="mt-24" data-aos="fade-up">
        <h3 class="text-xl font-bold text-white text-center mb-12">更多强大功能</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 功能4：高效任务与时间管理 -->
          <div class="tech-card p-6 hover-lift transition-transform duration-300" data-aos="zoom-in" data-aos-delay="100">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent-600/20 text-accent-400 mb-4">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">高效任务与时间管理</h4>
              <p class="text-sm text-gray-300 leading-relaxed">
                强大的待办事项、日程安排与提醒功能，支持<span class="text-accent-400">语音创建任务</span>。从会议记录、笔记中自动识别并生成行动项，一键添加到待办清单。
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/images/features/audio-transcription.jpg" alt="高效任务与时间管理" class="w-full transition-all duration-500" />
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
              <h4 class="text-lg font-semibold text-white mb-2">习惯养成与健康追踪</h4>
              <p class="text-sm text-gray-300 leading-relaxed">
                设定运动、阅读、学习等目标，利用待办清单与<span class="text-accent-400">习惯追踪器</span>培养良好习惯。可同步Apple Health等健康平台数据，结合饮食、运动记录，全面了解身体状况。
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/images/features/knowledge-assets.jpg" alt="习惯养成与健康追踪" class="w-full transition-all duration-500" />
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
              <h4 class="text-lg font-semibold text-white mb-2">智能记账与财务管理</h4>
              <p class="text-sm text-gray-300 leading-relaxed">
                通过语音轻松记录每笔收支，"<span class="text-accent-400">报销打车费50元</span>"，AI自动分类记账。提供清晰的收支统计与预算管理，助你轻松掌控资金流向，简化理财。
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/images/features/professional-scenarios.jpg" alt="智能记账与财务管理" class="w-full transition-all duration-500" />
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
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

const particleContainer: Ref<HTMLElement | null> = ref(null);
const activeFeature: Ref<number> = ref(0);
const tabs: string[] = ['全域智能采集', 'AI内容精炼与洞察', '智能组织与主动检索'];

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
  color: #fff;
  font-weight: 600;
  box-shadow: 0 0 15px rgba(132, 90, 223, 0.4);
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
  background-color: #252847;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  aspect-ratio: 16/9;
  position: relative;
  min-height: 350px;
  max-height: 420px;
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
  border: 1px solid rgba(132, 90, 223, 0.1);
  background: linear-gradient(145deg, rgba(26, 26, 46, 0.8), rgba(26, 26, 46, 0.95));
  transition: transform 0.4s ease, box-shadow 0.4s ease;
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
  border: 1px solid rgba(132, 90, 223, 0.1);
  background: linear-gradient(145deg, rgba(26, 26, 46, 0.8), rgba(26, 26, 46, 0.95));
  transition: transform 0.4s ease, box-shadow 0.4s ease;
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
  background-color: #252847;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4);
}

.hover-lift:hover {
  transform: translateY(-10px);
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