<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
    <main class="animate-fadeIn py-8 px-4">
      <div class="max-w-md mx-auto">
        <!-- Page Title -->
        <h1 class="text-2xl font-bold text-center text-gray-900 mb-6">下载扎马 AI 应用</h1>
        
        <!-- WeChat Open-in-Browser Notice -->
        <div v-if="isWechat" class="wechat-notice bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md shadow-sm">
          <div class="flex">
            <div class="flex-shrink-0 text-yellow-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-md font-semibold text-yellow-800 mb-1">请在浏览器中打开</h3>
              <p class="text-sm text-yellow-700 mb-2">
                微信内无法直接下载应用，请点击右上角 
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                然后选择<strong>"在浏览器中打开"</strong>
              </p>
              <div class="flex flex-row-reverse">
                <svg class="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- App Logo and Title -->
        <div class="text-center mb-8">
          <div class="w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <img src="/images/logo.png" alt="扎马 AI Logo" class="w-full h-full object-contain">
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">扎马 AI</h1>
          <p class="text-gray-600">智能笔记与知识管理工具</p>
        </div>

        <!-- App Features -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">应用亮点</h2>
          <div class="space-y-3">
            <div class="flex items-start">
              <div class="flex-shrink-0 text-accent-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-gray-700">AI 驱动的智能笔记系统</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 text-accent-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-gray-700">自动生成知识图谱</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 text-accent-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-gray-700">多设备同步与云端备份</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 text-accent-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-gray-700">智能搜索与内容推荐</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Buttons -->
        <div class="space-y-4">
          <a href="javascript:void(0)" @click.prevent="openIOSAppStore" class="block w-full bg-accent-500 hover:bg-accent-400 text-white font-medium py-4 px-6 rounded-lg shadow-md transition-all duration-300 text-center">
            <div class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span>iOS 版下载</span>
            </div>
          </a>
          
          <a :href="androidDownloadUrl" target="_blank" class="block w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-4 px-6 rounded-lg shadow-md transition-all duration-300 text-center">
            <div class="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 576 512" fill="currentColor">
                <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
              </svg>
              <span>Android 版下载</span>
            </div>
          </a>
        </div>

        <!-- QR Code Section (Optional) -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500 mb-2">或扫描二维码下载</p>
          <div class="w-40 h-40 bg-white p-2 mx-auto rounded-md shadow-md border border-gray-200">
            <!-- Placeholder for QR code image -->
            <div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
              扫描下载
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AppDownload',
  data() {
    return {
      // App Store URL using universal link format for direct opening in App Store
      iosAppStoreUrl: 'https://itunes.apple.com/app/id********',
      // Android Download URL - Replace with your actual Google Play or APK download URL
      androidDownloadUrl: 'https://play.google.com/store/apps/details?id=your.package.id',
      // Detect if user is in WeChat browser
      isWechat: false,
      // Detect iOS platform
      isIOS: false
    }
  },
  mounted() {
    // Detect WeChat browser
    this.isWechat = /MicroMessenger/i.test(navigator.userAgent);
    
    // Detect iOS platform
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  },
  methods: {
    // Handle iOS app download - ensures App Store opens correctly
    openIOSAppStore() {
      window.location.href = this.iosAppStoreUrl;
    }
  }
}
</script>

<style scoped>
/* Add any additional component-specific styles here */
.wechat-notice {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(253, 224, 71, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(253, 224, 71, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(253, 224, 71, 0);
  }
}
</style> 