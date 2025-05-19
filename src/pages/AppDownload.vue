<template>
  <div class="min-h-screen bg-white overflow-x-hidden">
    <!-- WeChat Open-in-Browser Overlay -->
    <div v-if="isWechat && !maskClosed" class="wechat-browser-mask fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-stretch">
      <div class="relative flex-1">
        <!-- Top-right arrow pointing to menu -->
        <div class="absolute top-3 right-10">
          <div class="relative">
            <!-- Arrow with glow effect -->
            <div class="arrow-glow absolute inset-0"></div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-white transform rotate-20 animate-bounce-slow" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            <div class="absolute top-28 right-0 w-48 text-white text-lg font-bold text-center">
              <p class="text-shadow">{{ t('appDownload.wechatBrowser.topArrow') }}</p>
              <div class="flex items-center justify-center mt-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
              <p class="text-shadow">{{ t('appDownload.wechatBrowser.selectBrowser') }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Bottom instructions -->
      <div class="text-center text-white p-6 bg-black bg-opacity-60">
        <p class="text-lg mb-2">{{ t('appDownload.wechatBrowser.message') }}</p>
        <button @click="closeWeChatMask" class="mt-2 px-6 py-2 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition-colors">{{ t('appDownload.wechatBrowser.button') }}</button>
      </div>
    </div>

    <main class="animate-fadeIn py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        <!-- Page Title -->
        <h1 class="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">{{ t('appDownload.title') }}</h1>
        
        <!-- WeChat Open-in-Browser Notice (smaller notice that remains after dismissing overlay) -->
        <div v-if="isWechat && !maskClosed" class="wechat-notice bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md shadow-sm max-w-md mx-auto">
          <div class="flex">
            <div class="flex-shrink-0 text-yellow-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 class="text-md font-semibold text-yellow-800 mb-1">{{ t('appDownload.wechatBrowser.notice') }}</h3>
              <p class="text-sm text-yellow-700 mb-2">
                {{ t('appDownload.wechatBrowser.instruction') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="inline-block h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </p>
            </div>
          </div>
        </div>

        <!-- Desktop/Mobile Layout -->
        <div class="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          <!-- Left Column for Desktop (App Logo, Features) -->
          <div class="lg:w-1/2">
            <!-- App Logo and Title -->
            <div class="text-center lg:text-left mb-8">
              <div class="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl mx-auto lg:mx-0 mb-4 flex items-center justify-center shadow-lg">
                <img src="/images/logo.png" alt="扎马 AI Logo" class="w-full h-full object-contain">
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">扎马 AI</h1>
              <p class="text-gray-600 text-lg md:text-xl">{{ t('appDownload.appIntro.slogan') }}</p>
              <p class="text-accent-600 font-medium mt-2 text-sm md:text-base">{{ t('appDownload.appIntro.tagline') }}</p>
            </div>

            <!-- App Features -->
            <div class="mb-8">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-900 mb-4 lg:text-left">{{ t('appDownload.whyChoose') }}</h2>
              <div class="space-y-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 text-accent-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-800 font-medium md:text-lg">{{ t('appDownload.features.dataCollection.title') }}</p>
                    <p class="text-gray-600 text-sm md:text-base">{{ t('appDownload.features.dataCollection.description') }}</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex-shrink-0 text-accent-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-800 font-medium md:text-lg">{{ t('appDownload.features.aiContent.title') }}</p>
                    <p class="text-gray-600 text-sm md:text-base">{{ t('appDownload.features.aiContent.description') }}</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex-shrink-0 text-accent-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-800 font-medium md:text-lg">{{ t('appDownload.features.taskManagement.title') }}</p>
                    <p class="text-gray-600 text-sm md:text-base">{{ t('appDownload.features.taskManagement.description') }}</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <div class="flex-shrink-0 text-accent-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-800 font-medium md:text-lg">{{ t('appDownload.features.finance.title') }}</p>
                    <p class="text-gray-600 text-sm md:text-base">{{ t('appDownload.features.finance.description') }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Ideal for sections -->
              <div class="mt-6 bg-gradient-to-r from-accent-50 to-blue-50 p-4 rounded-lg border border-accent-100">
                <h3 class="font-medium text-accent-700 mb-2 lg:text-left">{{ t('appDownload.targetUsers.title') }}</h3>
                <div class="grid grid-cols-2 gap-2 text-sm md:text-base">
                  <div class="flex items-center">
                    <span class="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                    <span class="text-gray-700">{{ t('appDownload.targetUsers.executive') }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                    <span class="text-gray-700">{{ t('appDownload.targetUsers.researcher') }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                    <span class="text-gray-700">{{ t('appDownload.targetUsers.student') }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                    <span class="text-gray-700">{{ t('appDownload.targetUsers.planner') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column for Desktop (Download Options) -->
          <div class="lg:w-1/2">
            <!-- Download Buttons - Redesigned Layout -->
            <div class="space-y-6">
              <h2 class="text-xl md:text-2xl font-semibold text-gray-900 mb-3 lg:text-left">{{ t('appDownload.download.heading') }}</h2>
              
              <!-- Web App Button -->
              <a :href="appLinksUrl" target="_blank" 
                class="group block w-full bg-gradient-to-r from-blue-500 to-accent-500 hover:from-blue-600 hover:to-accent-600 text-white font-medium py-3 px-5 rounded-xl shadow-md transition-all duration-300">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-white bg-opacity-20 p-2.5 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <span class="block text-sm font-normal md:text-base">{{ t('appDownload.download.webapp.title') }}</span>
                    <span class="block text-base font-bold group-hover:translate-x-1 transition-transform md:text-lg">{{ t('appDownload.download.webapp.action') }}</span>
                  </div>
                  <div class="flex-shrink-0 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </a>
              
              <div class="relative py-2">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center">
                  <span class="bg-white px-3 text-sm text-gray-500 md:text-base">{{ t('appDownload.download.appSection') }}</span>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- iOS App Button -->
                <a href="javascript:void(0)" @click.prevent="openIOSAppStore"
                  class="group flex flex-col h-full bg-white border border-gray-200 hover:border-accent-300 hover:shadow-lg rounded-xl p-4 transition-all duration-300">
                  <div class="flex items-center mb-3">
                    <div class="flex-shrink-0 bg-black rounded-xl p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-white" viewBox="0 0 384 512" fill="currentColor">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                      </svg>
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 md:text-base">{{ t('appDownload.download.ios.title') }}</span>
                      <span class="block text-base font-bold text-gray-900 md:text-lg">{{ t('appDownload.download.ios.subtitle') }}</span>
                    </div>
                  </div>
                  <div class="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span class="text-xs text-gray-500 md:text-sm">{{ t('appDownload.download.ios.description') }}</span>
                    <span class="flex items-center text-accent-500 group-hover:translate-x-1 transition-transform">
                      <span class="text-sm font-medium mr-1 md:text-base">{{ t('appDownload.download.ios.action') }}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </a>
                
                <!-- Android App Button -->
                <a :href="androidDownloadUrl" target="_blank"
                  class="group flex flex-col h-full bg-white border border-gray-200 hover:border-accent-300 hover:shadow-lg rounded-xl p-4 transition-all duration-300">
                  <div class="flex items-center mb-3">
                    <div class="flex-shrink-0 bg-accent-500 rounded-xl p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-white" viewBox="0 0 576 512" fill="currentColor">
                        <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
                      </svg>
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 md:text-base">{{ t('appDownload.download.android.title') }}</span>
                      <span class="block text-base font-bold text-gray-900 md:text-lg">{{ t('appDownload.download.android.subtitle') }}</span>
                    </div>
                  </div>
                  <div class="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                    <span class="text-xs text-gray-500 md:text-sm">{{ t('appDownload.download.android.description') }}</span>
                    <span class="flex items-center text-accent-500 group-hover:translate-x-1 transition-transform">
                      <span class="text-sm font-medium mr-1 md:text-base">{{ t('appDownload.download.android.action') }}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
              
              <!-- QR Code Section (Optional) -->
              <div class="mt-8 text-center">
                <p class="text-sm text-gray-500 mb-2 md:text-base">{{ t('appDownload.download.qrCode.notice') }}</p>
                <div class="w-48 h-48 md:w-56 md:h-56 bg-white p-2 mx-auto rounded-md shadow-md border border-gray-200 overflow-hidden">
                  <!-- Real QR code image -->
                  <img src="/images/link_qrcode.png" alt="扎马 AI 下载二维码" class="w-full h-full object-contain" />
                </div>
                <p class="text-xs text-gray-500 mt-2 md:text-sm">{{ t('appDownload.download.qrCode.description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

interface AppDownloadData {
  iosAppStoreUrl: string;
  androidDownloadUrl: string;
  isWechat: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  maskClosed: boolean;
  appLinksUrl: string;
}

export default defineComponent({
  name: 'AppDownload',
  setup() {
    const { t, locale } = useI18n();
    return { t, locale };
  },
  data(): AppDownloadData {
    return {
      // App Store URL using universal link format for direct opening in App Store
      iosAppStoreUrl: 'https://apps.apple.com/us/app/%E6%89%8E%E9%A9%ACai/id6744411300',
      // Android Download URL - Replace with your actual Google Play or APK download URL
      androidDownloadUrl: 'https://static-1251849568.cos.ap-guangzhou.myqcloud.com/apks/app-release.apk',
      // Detect if user is in WeChat browser
      isWechat: false,
      // Detect iOS platform
      isIOS: false,

      isAndroid: false,
      // WeChat mask state
      maskClosed: false,
      // App Links URL
      appLinksUrl: 'https://www.zhama.com/app/home'
    }
  },
  mounted() {
    // Detect WeChat browser
    this.isWechat = /MicroMessenger/i.test(navigator.userAgent);
    
    // Detect iOS platform
    this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    this.isAndroid = /Android/.test(navigator.userAgent);
    // Get code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    this.appLinksUrl = `zhamaapp://app/home?route=invite&code=${code}`;
    if (this.isIOS || this.isAndroid ) {
      // Store the code in localStorage for later use
      // localStorage.setItem('inviteCode', code);
      setTimeout(() => {
        window.location.href = this.appLinksUrl;
      }, 500);
    }
  },
  methods: {
    // Handle iOS app download - ensures App Store opens correctly
    openIOSAppStore(): void {
      window.location.href = this.iosAppStoreUrl;
    },
    // Close WeChat mask
    closeWeChatMask(): void {
      this.maskClosed = true;
    }
  }
})
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

/* WeChat browser mask styles */
.wechat-browser-mask {
  backdrop-filter: blur(2px);
}

/* Custom slow bounce animation for the arrow */
.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0) rotate(20deg);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-15px) rotate(20deg);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Arrow glow effect */
.arrow-glow {
  animation: glow 1.5s ease-in-out infinite alternate;
  border-radius: 50%;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.5);
  }
  to {
    box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.8);
  }
}

/* Text shadow for better readability */
.text-shadow {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}

/* Rotate by 20 degrees */
.rotate-20 {
  transform: rotate(20deg);
}

/* Responsive media queries */
@media (min-width: 1024px) {
  .lg-container-padding {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style> 