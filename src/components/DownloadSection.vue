<template>
  <section id="download" class="py-28 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">下载应用</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          随时随地，高效学习
        </p>
        <p class="mt-4 max-w-3xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
          知学易提供多平台支持，让您无论何时何地都能高效记录与学习
        </p>
      </div>

      <div class="mt-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <!-- 左侧：设备展示 -->
          <div class="flex justify-center">
            <div class="relative hover-lift">
              <img :src="deviceMockup" alt="知学易应用界面展示" class="max-w-full h-auto rounded-2xl shadow-2xl">
              <div class="absolute -bottom-6 -right-6 bg-indigo-600 text-white p-4 rounded-full shadow-xl">
                <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- 右侧：下载选项 -->
          <div>
            <h3 class="text-2xl font-bold text-gray-900 mb-8">选择您的平台</h3>
            
            <!-- 平台选项卡 -->
            <div class="mb-8">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                  <button 
                    @click="activePlatform = 'ios'" 
                    class="w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition duration-150 ease-in-out"
                    :class="activePlatform === 'ios' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  >
                    <svg class="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    iOS
                  </button>
                  <button 
                    @click="activePlatform = 'android'" 
                    class="w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition duration-150 ease-in-out"
                    :class="activePlatform === 'android' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  >
                    <svg class="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.523 15.3414c-.5511 0-.998-.4527-.998-1.0102 0-.5552.4457-1.0102.998-1.0102.5511 0 .998.455.998 1.0102 0 .5575-.4457 1.0102-.998 1.0102m-10.546 0c-.5511 0-.998-.4527-.998-1.0102 0-.5552.4457-1.0102.998-1.0102.5511 0 .998.455.998 1.0102 0 .5575-.4457 1.0102-.998 1.0102m11.0983-6.7334l1.7343-3.0097c.0986-.1745.0407-.3954-.1304-.4899-.1734-.0968-.3904-.0368-.4911.1345l-1.7571 3.0487c-1.3624-.6008-2.8897-.9377-4.5218-.9377-1.6321 0-3.1595.337-4.5219.9377L6.3849 5.2329c-.1005-.1713-.3198-.2313-.4911-.1345-.1711.0945-.229.3154-.1304.4899l1.7342 3.0097C4.4935 9.9804 2.5 12.2292 2.5 15.0013h19c0-2.7721-1.9938-5.0209-4.5227-6.3933"/>
                    </svg>
                    Android
                  </button>
                  <button 
                    @click="activePlatform = 'desktop'" 
                    class="w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition duration-150 ease-in-out"
                    :class="activePlatform === 'desktop' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  >
                    <svg class="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                    桌面版
                  </button>
                </nav>
              </div>
              
              <!-- 平台内容 -->
              <div class="pt-8">
                <!-- iOS -->
                <div v-if="activePlatform === 'ios'" class="flex flex-col md:flex-row items-center">
                  <div class="flex-1">
                    <h4 class="text-lg font-bold mb-3 text-gray-900">iOS 版本</h4>
                    <p class="text-gray-600 mb-6">支持 iOS 12.0 及以上系统</p>
                    <div class="flex space-x-4">
                      <a href="#" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        App Store
                      </a>
                    </div>
                  </div>
                  <div class="mt-6 md:mt-0 ml-0 md:ml-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <img :src="qrCode" alt="iOS下载二维码" class="w-32 h-32">
                  </div>
                </div>
                
                <!-- Android -->
                <div v-if="activePlatform === 'android'" class="flex flex-col md:flex-row items-center">
                  <div class="flex-1">
                    <h4 class="text-lg font-bold mb-3 text-gray-900">Android 版本</h4>
                    <p class="text-gray-600 mb-6">支持 Android 7.0 及以上系统</p>
                    <div class="flex flex-wrap gap-4">
                      <a href="#" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302-2.302 5.028 3.04a.997.997 0 0 1 0 1.712l-5.028 3.04-2.302-2.303L16.438 12l-1.94-3.293zM14.8 7.88l2.066 3.523-2.064 3.525L7.032 8.026H16.8zM7.031 15.974l7.77-6.902 2.064 3.525-2.066 3.523H7.031z"/>
                        </svg>
                        Google Play
                      </a>
                      <a href="#" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"/>
                        </svg>
                        直接下载APK
                      </a>
                    </div>
                  </div>
                  <div class="mt-6 md:mt-0 ml-0 md:ml-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <img :src="qrCode" alt="Android下载二维码" class="w-32 h-32">
                  </div>
                </div>
                
                <!-- 桌面版 -->
                <div v-if="activePlatform === 'desktop'" class="flex flex-col md:flex-row items-center">
                  <div class="flex-1">
                    <h4 class="text-lg font-bold mb-3 text-gray-900">桌面版</h4>
                    <p class="text-gray-600 mb-6">支持 Windows、macOS、Linux 系统</p>
                    <div class="flex flex-wrap gap-4">
                      <a href="#" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 2.5v19H3v-19h18m0-2H3c-1.11 0-2 .89-2 2v19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-19c0-1.11-.9-2-2-2zm-7.5 5h-7v1h7V5.5zm0 2.5h-7v1h7V8zm-7 2h7v1h-7v-1zm10 6.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
                        </svg>
                        Windows
                      </a>
                      <a href="#" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-gray-800 hover:bg-gray-900 transition duration-300 ease-in-out">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 1.5c4.14 0 7.5 3.36 7.5 7.5S16.14 19.5 12 19.5 4.5 16.14 4.5 12 7.86 4.5 12 4.5zm2.5 3.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-5 0C8.67 8 8 8.67 8 9.5S8.67 11 9.5 11s1.5-.67 1.5-1.5S10.33 8 9.5 8zM12 14c-2.33 0-4.31 1.46-5.11 3.5h10.22c-.8-2.04-2.78-3.5-5.11-3.5z"/>
                        </svg>
                        macOS
                      </a>
                      <a href="#" class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-orange-600 hover:bg-orange-700 transition duration-300 ease-in-out">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 7v10H3V7h18m0-2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"/>
                        </svg>
                        Linux
                      </a>
                    </div>
                  </div>
                  <div class="mt-6 md:mt-0 ml-0 md:ml-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                    <img :src="qrCode" alt="桌面版下载网址" class="w-32 h-32">
                  </div>
                </div>
              </div>
            </div>
            
            <p class="text-sm text-gray-600 mt-8">
              扫描二维码或点击按钮下载最新版知学易应用。如遇到下载或安装问题，请<a href="#contact" class="text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300">联系我们</a>获取帮助。
            </p>
          </div>
        </div>
      </div>
      
      <!-- 版本信息 -->
      <div class="mt-20 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition duration-300">
        <h3 class="text-xl font-bold text-gray-900 mb-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          最新版本信息
        </h3>
        <div class="overflow-hidden bg-gray-50 rounded-xl">
          <dl class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            <div class="px-6 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500">当前版本</dt>
              <dd class="mt-1 text-lg font-semibold text-indigo-700">v2.5.1</dd>
            </div>
            <div class="px-6 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500">发布日期</dt>
              <dd class="mt-1 text-lg font-semibold text-indigo-700">2023年12月15日</dd>
            </div>
            <div class="px-6 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500">文件大小</dt>
              <dd class="mt-1 text-lg font-semibold text-indigo-700">78.5 MB</dd>
            </div>
          </dl>
        </div>
        
        <div class="mt-8">
          <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            更新内容：
          </h4>
          <ul class="list-disc pl-5 text-gray-600 space-y-3 leading-relaxed">
            <li>全新AI摘要功能，一键提取文档关键信息</li>
            <li>优化了音频转文字的识别准确率</li>
            <li>新增知识图谱可视化功能</li>
            <li>修复了多设备同步偶发的问题</li>
            <li>UI界面优化，提升用户体验</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import deviceMockupImg from '@/assets/images/home-o.png';
import qrCodeImg from '@/assets/images/qrcode.svg';

const deviceMockup = deviceMockupImg;
const qrCode = qrCodeImg;
const activePlatform = ref('ios');
</script> 