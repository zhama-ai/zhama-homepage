<template>
  <section id="about" class="py-32 bg-dark-900 relative overflow-hidden">
    <!-- Animated background particles -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div class="absolute -right-32 -top-32 w-96 h-96 bg-accent-400 opacity-10 rounded-full blur-3xl"></div>
    <div class="absolute -left-32 -bottom-32 w-96 h-96 bg-accent-400 opacity-10 rounded-full blur-3xl"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section header with animation -->
      <div class="text-center max-w-3xl mx-auto mb-20">
        <div ref="headerRef">
          <h2 class="text-accent-400 font-semibold text-lg uppercase tracking-wider mb-3">关于我们</h2>
          <p class="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            用AI技术<span class="text-accent-400">重新定义</span>知识管理体验
          </p>
          <p class="mt-6 text-xl text-gray-300 leading-relaxed">
            扎马笔记融合尖端人工智能技术，彻底革新信息的获取、整理与转化方式，
            助您构建高效决策系统，释放认知潜能
          </p>
        </div>
      </div>

      <!-- Vision card with hover effects -->
      <div class="tech-card p-10 max-w-4xl mx-auto rounded-2xl backdrop-blur-sm bg-dark-800/80 border border-dark-700 shadow-xl transform transition-all duration-300 hover:shadow-accent-400/10">
        <div ref="visionRef">
          <h3 class="text-2xl font-bold text-white mb-8 flex items-center">
            <span class="inline-flex items-center justify-center p-2 bg-accent-400/10 rounded-md mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            我们的愿景
          </h3>
          <div class="space-y-6">
            <p class="text-gray-300 leading-relaxed text-lg">
              扎马笔记致力于构建全球领先的<span class="text-white font-medium">AI知识管理平台</span>，让每一次会议、访谈、阅读与思考，转化为结构化、可交互的洞见资产。
            </p>
            <p class="text-gray-300 leading-relaxed text-lg">
              我们的核心团队汇聚<span class="text-white font-medium">顶尖AI研究机构与科技企业</span>的专业人才，拥有深厚的技术积淀和丰富的行业实践，致力于打造最符合人类认知规律的智能工作环境。
            </p>
          </div>
          
          <!-- Features with animated hover -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(feature, index) in features" :key="index"
                 class="feature-card group p-6 rounded-xl border border-dark-700 bg-dark-800/50 transition-all duration-300 hover:border-accent-400/30 hover:bg-accent-400/5 hover:shadow-lg hover:-translate-y-1"
                 :style="{ animationDelay: `${index * 100}ms`, animation: 'fadeInUp 0.6s both' }">
              <div class="flex items-start gap-4">
                <div class="text-accent-400 bg-accent-400/10 p-3 rounded-lg group-hover:bg-accent-400/20 transition-all">
                  <div v-html="feature.icon" class="h-6 w-6"></div>
                </div>
                <div>
                  <h4 class="text-white text-lg font-medium mb-2 group-hover:text-accent-400 transition-colors">{{ feature.title }}</h4>
                  <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Final statement with typing animation -->
      <div class="mt-16 text-center" ref="footerRef">
        <p class="text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
          <span class="text-accent-400 font-bold">扎马笔记</span>，不止于工具，
          <br class="hidden sm:block" />
          <span ref="typingText" class="inline-block h-8">重塑思考与决策的方式</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { MotionPlugin, useMotion } from '@vueuse/motion';

// Typing animation reference
const typingText = ref(null);

// For motion animations
const headerRef = ref(null);
const visionRef = ref(null);
const footerRef = ref(null);

// Apply motions
onMounted(() => {
  const headerMotion = useMotion(headerRef, {
    initial: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 800 } }
  });
  
  const visionMotion = useMotion(visionRef, {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 300, duration: 800 } }
  });
  
  const footerMotion = useMotion(footerRef, {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 800, duration: 1000 } }
  });
  
  // Feature card animations will be handled with CSS
});

// Features data
const features = [
  {
    title: "突破性AI技术",
    description: "融合大语言模型与知识图谱技术，实现内容的智能理解、关联与推理",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>`
  },
  {
    title: "高效工作流",
    description: "自动化信息提取、整理与检索流程，释放创造力，将时间专注于思考与决策",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>`
  },
  {
    title: "知识资产化",
    description: "将零散信息转化为系统化知识网络，构建可持续增长的个人与组织智慧库",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>`
  },
  {
    title: "数据驱动决策",
    description: "基于深度分析与智能推荐，辅助制定更精准、更具前瞻性的决策",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>`
  }
];

// Implement typing animation
onMounted(async () => {
  await nextTick();
  if (typingText.value) {
    const phrases = ["重塑思考与决策的方式", "激发创新与认知潜能", "打造个人知识管理体系"];
    let currentPhraseIndex = 0;
    
    const typePhrase = async (phrase) => {
      const element = typingText.value;
      element.textContent = "";
      
      // Type characters one by one
      for (let i = 0; i < phrase.length; i++) {
        element.textContent += phrase[i];
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Wait before erasing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Erase characters one by one
      for (let i = phrase.length; i > 0; i--) {
        element.textContent = phrase.substring(0, i-1);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Move to next phrase
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      await typePhrase(phrases[currentPhraseIndex]);
    };
    
    typePhrase(phrases[0]);
  }
});
</script>

<style scoped>
.feature-card {
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(var(--accent-400-rgb), 0.08) 0%, rgba(var(--accent-400-rgb), 0) 60%);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.5);
  transition: opacity 0.5s, transform 0.5s;
  pointer-events: none;
}

.feature-card:hover::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Initial opacity for animation targets */
#about [ref="headerRef"],
#about [ref="visionRef"],
#about [ref="footerRef"] {
  opacity: 0;
}

/* Animated gradient border */
.tech-card {
  position: relative;
}

.tech-card::after {
  content: '';
  position: absolute;
  inset: -1px;
  background: linear-gradient(45deg, transparent 50%, rgba(var(--accent-400-rgb), 0.1) 50%, rgba(var(--accent-400-rgb), 0.2) 75%, transparent 75%);
  z-index: -1;
  border-radius: inherit;
  animation: borderGlow 4s linear infinite;
}

@keyframes borderGlow {
  0% { background-position: 0% 0%; }
  100% { background-position: 400% 400%; }
}

/* Ensure we have CSS variables for the accent color */
:root {
  --accent-400-rgb: 78, 170, 255; /* Updated to match accent-400 from the Tailwind config */
}
</style> 