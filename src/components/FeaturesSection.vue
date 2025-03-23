<template>
  <section id="features" class="py-20 bg-dark-800 overflow-hidden relative">
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div class="particle-background" ref="particleContainer"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-accent-400 font-semibold tracking-wide uppercase">核心能力</h2>
        <p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl">
          AI驱动的全场景生产力引擎
        </p>
        <p class="mt-4 max-w-3xl text-xl text-gray-300 lg:mx-auto mb-12">
          扎马笔记不仅是记录工具，更是你的AI知识中枢，能打破信息孤岛，深度提炼价值，主动赋能决策
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
                <h3 class="text-2xl font-bold text-white">多源智能采集</h3>
              </div>
              <p class="text-gray-300 leading-relaxed my-6">
                支持文本、音频、图片、PDF、网页、YouTube视频等<span class="text-accent-400">全格式解析</span>，无论是会议录音、手写草图、白板照片，还是跨平台内容，AI自动识别并结构化归档。
              </p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span class="feature-tag">文本识别</span>
                <span class="feature-tag">音频转写</span>
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
                <h3 class="text-2xl font-bold text-white">AI内容精炼与摘要</h3>
              </div>
              <p class="text-gray-300 leading-relaxed my-6">
                一键生成会议纪要、决策要点、项目待办清单，<span class="text-accent-400">节省90%整理时间</span>。支持逻辑结构提取与语义总结，适用于战略复盘、访谈分析、研究速览等场景。
              </p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span class="feature-tag">会议摘要</span>
                <span class="feature-tag">决策要点</span>
                <span class="feature-tag">待办清单</span>
                <span class="feature-tag">结构化提炼</span>
              </div>
            </div>

            <div v-if="activeFeature === 2" class="feature-content h-full">
              <div class="feature-icon-wrapper mb-4 flex items-center gap-4">
                <div class="feature-icon">
                  <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white">智能分类+主动检索</h3>
              </div>
              <p class="text-gray-300 leading-relaxed my-6">
                基于知识图谱按<span class="text-accent-400">项目/主题/人物/时间</span>自动分类，支持模糊搜索、标签筛选、时间线视图。交互式AI问答：直接提问如"上周会议的关键矛盾是什么？"，即时获取上下文精准答案。
              </p>
              <div class="mt-auto flex flex-wrap gap-3">
                <span class="feature-tag">知识图谱</span>
                <span class="feature-tag">语义搜索</span>
                <span class="feature-tag">智能问答</span>
                <span class="feature-tag">标签筛选</span>
              </div>
            </div>
          </div>

          <!-- 右侧图片 -->
          <div class="lg:w-7/12 flex items-center">
            <div class="feature-display-wrapper w-full border border-accent-500/30 rounded-xl overflow-hidden">
              <img 
                v-if="activeFeature === 0" 
                src="/img/features/multi-source-collection.jpg" 
                alt="多源智能采集" 
                class="w-full h-full object-cover"
              />
              <img 
                v-if="activeFeature === 1" 
                src="/img/features/ai-content-refinement.jpg" 
                alt="AI内容精炼与摘要" 
                class="w-full h-full object-cover"
              />
              <img 
                v-if="activeFeature === 2" 
                src="/img/features/knowledge-graph.jpg" 
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
          <!-- 功能4：实时录音+高精度转写 -->
          <div class="tech-card p-6 hover-lift transition-transform duration-300" data-aos="zoom-in" data-aos-delay="100">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent-600/20 text-accent-400 mb-4">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">实时录音+高精度转写</h4>
              <p class="text-sm text-gray-300 leading-relaxed">
                商务会议、客户访谈、培训课程全程录音，<span class="text-accent-400">语音转文字准确率超98%</span>，支持多语言识别与重点标记。
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/img/features/audio-transcription.jpg" alt="实时录音与转写" class="w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- 功能5：知识资产化与复用 -->
          <div class="tech-card p-6 hover-lift transition-transform duration-300" data-aos="zoom-in" data-aos-delay="200">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent-600/20 text-accent-400 mb-4">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">知识资产化与复用</h4>
              <p class="text-sm text-gray-300 leading-relaxed">
                个性化闪卡 & 智能测验：基于笔记生成记忆卡片与测试题，结合<span class="text-accent-400">间隔重复算法</span>，强化知识留存。
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/img/features/knowledge-assets.jpg" alt="知识资产化与复用" class="w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>

          <!-- 功能6：适用各类专业场景 -->
          <div class="tech-card p-6 hover-lift transition-transform duration-300" data-aos="zoom-in" data-aos-delay="300">
            <div class="flex flex-col items-center text-center">
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-accent-600/20 text-accent-400 mb-4">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">适用各类专业场景</h4>
              <p class="text-sm text-gray-300 leading-relaxed">
                职场效率专家：高管/创业者的战略会议要点速记，产品/咨询团队的<span class="text-accent-400">跨项目资料整合</span>，远程协作场景支持。
              </p>
              <div class="mt-4 w-full">
                <div class="interactive-image">
                  <img src="/img/features/professional-scenarios.jpg" alt="专业应用场景" class="w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 可以在这里引入需要的图片或其他资源
import { onMounted, ref } from 'vue';

const particleContainer = ref(null);
const activeFeature = ref(0);
const tabs = ['多源智能采集', 'AI内容精炼与摘要', '智能分类与检索'];

// 创建粒子效果
const createParticles = () => {
  if (!particleContainer.value) return;
  
  const container = particleContainer.value;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  
  // 清空容器
  container.innerHTML = '';
  
  // 创建粒子
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // 随机位置
    const x = Math.random() * containerWidth;
    const y = Math.random() * containerHeight;
    
    // 随机大小
    const size = Math.random() * 4 + 1;
    
    // 随机动画持续时间
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
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
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
      element.classList.add('aos-animate');
    });
  }, 100);

  // 监听滚动事件，在元素进入视口时添加动画类
  const handleScroll = () => {
    const elements = document.querySelectorAll('[data-aos]:not(.aos-animate)');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
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