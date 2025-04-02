<template>
  <section id="advantages" class="py-24 bg-dark-900 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <!-- 动态背景元素 -->
    <div class="absolute top-20 left-10 w-64 h-64 bg-accent-600 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
    <div class="absolute bottom-20 right-10 w-80 h-80 bg-accent-400 rounded-full filter blur-[120px] opacity-10 animate-pulse" style="animation-delay: 1s;"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="lg:text-center mb-16">
        
        <p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          扎马AI：认知升级与品质生活的操作系统
        </p>
        <div class="mt-4 max-w-2xl lg:mx-auto flex items-center justify-center space-x-4 text-xl text-gray-300">
          <span class="flex items-center"><span class="text-accent-400 mr-2">•</span> 记得少</span>
          <span class="flex items-center"><span class="text-accent-400 mr-2">•</span> 想得深</span>
          <span class="flex items-center"><span class="text-accent-400 mr-2">•</span> 做得快</span>
          <span class="flex items-center"><span class="text-accent-400 mr-2">•</span> 活得好</span>
        </div>
      </div>

      <!-- 核心价值卡片 -->
      <div class="grid grid-cols-1 gap-10 md:grid-cols-3">
        <!-- 价值1 -->
        <div class="group p-1 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-700/20 hover:from-accent-500/30 hover:to-accent-700/30 transition-all duration-300">
          <div class="tech-card bg-dark-800 p-8 rounded-xl flex flex-col h-full hover-lift transform transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white mb-6 shadow-lg group-hover:shadow-accent-600/50">
              <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors">极致效率</h3>
            <div class="mt-2 space-y-2 text-gray-300">
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>AI自动整理+摘要，解放重复劳动</span>
              </div>
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>语音/多模态输入，随时随地轻松记录</span>
              </div>
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>多终端无缝同步，信息触手可及</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 价值2 -->
        <div class="group p-1 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-700/20 hover:from-accent-500/30 hover:to-accent-700/30 transition-all duration-300" style="transition-delay: 100ms;">
          <div class="tech-card bg-dark-800 p-8 rounded-xl flex flex-col h-full hover-lift transform transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white mb-6 shadow-lg group-hover:shadow-accent-600/50">
              <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors">知识与生活沉淀</h3>
            <div class="mt-2 space-y-2 text-gray-300">
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>工作生活信息一站式结构化归档</span>
              </div>
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>构建个人/团队知识库与生活档案</span>
              </div>
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>支持企业级部署，保障数据安全</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 价值3 -->
        <div class="group p-1 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-700/20 hover:from-accent-500/30 hover:to-accent-700/30 transition-all duration-300" style="transition-delay: 200ms;">
          <div class="tech-card bg-dark-800 p-8 rounded-xl flex flex-col h-full hover-lift transform transition-all duration-300 hover:-translate-y-1">
            <div class="flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white mb-6 shadow-lg group-hover:shadow-accent-600/50">
              <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors">智慧决策与行动</h3>
            <div class="mt-2 space-y-2 text-gray-300">
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>语义检索+智能问答，快速定位关键信息</span>
              </div>
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>智能生成待办/提醒，推动计划落地</span>
              </div>
              <div class="flex items-start">
                <span class="bg-accent-500/10 p-1 rounded mr-2 text-accent-400">→</span>
                <span>提供趋势分析（情绪/财务），辅助决策</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 适用场景 -->
      <div class="mt-20">
        <div class="relative mb-12 flex justify-center">
          <h3 class="text-2xl font-bold text-white inline-block relative">
            适用场景
            <span class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-accent-400 rounded-full"></span>
          </h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 场景1 -->
          <div class="relative overflow-hidden rounded-xl border border-gray-800 bg-dark-900 group">
            <div class="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-accent-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div class="p-6 relative z-10">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-accent-600/20 text-accent-400 mb-4 mx-auto">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-3 text-center">职场与专业人士</h4>
              <div class="text-center text-gray-300 text-sm">高管/创业者的会议决策，产品/咨询团队的用户访谈分析，内容创作者的素材整理</div>
            </div>
          </div>

          <!-- 场景2 -->
          <div class="relative overflow-hidden rounded-xl border border-gray-800 bg-dark-900 group">
            <div class="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-accent-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div class="p-6 relative z-10">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-accent-600/20 text-accent-400 mb-4 mx-auto">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-3 text-center">个人生活与成长</h4>
              <div class="text-center text-gray-300 text-sm">学习笔记整理，习惯养成追踪，健康数据管理，生活规划与日程安排</div>
            </div>
          </div>
          
          <!-- 场景3 -->
          <div class="relative overflow-hidden rounded-xl border border-gray-800 bg-dark-900 group">
            <div class="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-accent-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            <div class="p-6 relative z-10">
              <div class="flex items-center justify-center w-12 h-12 rounded-full bg-accent-600/20 text-accent-400 mb-4 mx-auto">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-3 text-center">企业与团队</h4>
              <div class="text-center text-gray-300 text-sm">团队知识库共建，垂直领域AI定制，安全合规的协同管理</div>
            </div>
          </div>
        </div>
        
        <!-- 互动卡片 -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex bg-gradient-to-br from-dark-800 to-dark-900 p-2 rounded-xl overflow-hidden relative group border border-gray-800">
            <div class="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex items-center justify-center w-16 h-16 bg-accent-600/10 rounded-lg shrink-0">
              <svg class="h-8 w-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="p-4 flex-1 relative z-10">
              <h4 class="text-lg font-semibold text-white mb-1">多终端支持</h4>
              <p class="text-gray-300 text-sm">PC、移动端、平板全覆盖，随时随地记录与使用</p>
            </div>
          </div>
          
          <div class="flex bg-gradient-to-br from-dark-800 to-dark-900 p-2 rounded-xl overflow-hidden relative group border border-gray-800">
            <div class="absolute inset-0 bg-gradient-to-r from-accent-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="flex items-center justify-center w-16 h-16 bg-accent-600/10 rounded-lg shrink-0">
              <svg class="h-8 w-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="p-4 flex-1 relative z-10">
              <h4 class="text-lg font-semibold text-white mb-1">数据安全</h4>
              <p class="text-gray-300 text-sm">企业级加密，权限精细控制，自主可控部署选项</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <a href="#" class="glow-button inline-flex items-center px-8 py-4 text-base relative overflow-hidden group">
          <span class="relative z-10">立即体验</span>
          <svg class="ml-2 h-5 w-5 relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span class="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:from-accent-600 group-hover:to-accent-700 transition-all duration-300"></span>
          <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-400 to-accent-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></span>
        </a>
      </div>
    </div>
  </section>
</template> 