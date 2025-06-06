'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

export default function DownloadPage() {
  const { t } = useTranslation();
  const [isWechat, setIsWechat] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [maskClosed, setMaskClosed] = useState(false);
  const [appLinksUrl, setAppLinksUrl] = useState('https://www.zhama.com/app/home');

  // App Store and download URLs
  const iosAppStoreUrl = 'https://apps.apple.com/us/app/%E6%89%8E%E9%A9%ACai/id6744411300';
  const androidDownloadUrl = 'https://static-1251849568.cos.ap-guangzhou.myqcloud.com/apks/app-release.apk';

  useEffect(() => {
    // Detect WeChat browser
    setIsWechat(/MicroMessenger/i.test(navigator.userAgent));
    
    // Detect iOS platform
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    // Detect Android platform
    setIsAndroid(/Android/.test(navigator.userAgent));

    // Get code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    const deepLinkUrl = `zhamaapp://app/home?route=invite&code=${code}`;
    setAppLinksUrl(deepLinkUrl);
    
    if ((isIOS || isAndroid) && code) {
      setTimeout(() => {
        window.location.href = deepLinkUrl;
      }, 500);
    }
  }, [isIOS, isAndroid]);

  const openIOSAppStore = () => {
    window.location.href = iosAppStoreUrl;
  };

  const closeWeChatMask = () => {
    setMaskClosed(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* WeChat Open-in-Browser Overlay */}
      {isWechat && !maskClosed && (
        <div className="wechat-browser-mask fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-stretch">
          <div className="relative flex-1">
            {/* Top-right arrow pointing to menu */}
            <div className="absolute top-3 right-10">
              <div className="relative">
                {/* Arrow with glow effect */}
                <div className="arrow-glow absolute inset-0"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white transform rotate-20 animate-bounce-slow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <div className="absolute top-28 right-0 w-48 text-white text-lg font-bold text-center">
                  <p className="text-shadow">{t('appDownload.wechatBrowser.topArrow')}</p>
                  <div className="flex items-center justify-center mt-1 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </div>
                  <p className="text-shadow">{t('appDownload.wechatBrowser.selectBrowser')}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom instructions */}
          <div className="text-center text-white p-6 bg-black bg-opacity-60">
            <p className="text-lg mb-2">{t('appDownload.wechatBrowser.message')}</p>
            <button onClick={closeWeChatMask} className="mt-2 px-6 py-2 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400 transition-colors">{t('appDownload.wechatBrowser.button')}</button>
          </div>
        </div>
             )}

      <main className="animate-fadeIn py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">{t('appDownload.title')}</h1>
          
          {/* WeChat Open-in-Browser Notice (smaller notice that remains after dismissing overlay) */}
          {isWechat && maskClosed && (
            <div className="wechat-notice bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md shadow-sm max-w-md mx-auto">
              <div className="flex">
                <div className="flex-shrink-0 text-yellow-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-yellow-800 mb-1">{t('appDownload.wechatBrowser.notice')}</h3>
                  <p className="text-sm text-yellow-700 mb-2">
                    {t('appDownload.wechatBrowser.instruction')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Desktop/Mobile Layout */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            {/* Left Column for Desktop (App Logo, Features) */}
            <div className="lg:w-1/2">
              {/* App Logo and Title */}
              <div className="text-center lg:text-left mb-8">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl mx-auto lg:mx-0 mb-4 flex items-center justify-center shadow-lg">
                  <img src="/images/logo.png" alt={t('appDownload.appLogo.alt')} className="w-full h-full object-contain" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t('appDownload.appLogo.title')}</h1>
                <p className="text-gray-600 text-lg md:text-xl">{t('appDownload.appIntro.slogan')}</p>
                <p className="text-accent-600 font-medium mt-2 text-sm md:text-base">{t('appDownload.appIntro.tagline')}</p>
              </div>

              {/* App Features */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 text-center lg:text-left">{t('appDownload.whyChoose')}</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-accent-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium md:text-lg">{t('appDownload.features.dataCollection.title')}</p>
                      <p className="text-gray-600 text-sm md:text-base">{t('appDownload.features.dataCollection.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-accent-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium md:text-lg">{t('appDownload.features.aiContent.title')}</p>
                      <p className="text-gray-600 text-sm md:text-base">{t('appDownload.features.aiContent.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-accent-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium md:text-lg">{t('appDownload.features.taskManagement.title')}</p>
                      <p className="text-gray-600 text-sm md:text-base">{t('appDownload.features.taskManagement.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-accent-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800 font-medium md:text-lg">{t('appDownload.features.finance.title')}</p>
                      <p className="text-gray-600 text-sm md:text-base">{t('appDownload.features.finance.description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Ideal for sections */}
                <div className="mt-6 bg-gradient-to-r from-accent-50 to-blue-50 p-4 rounded-lg border border-accent-100">
                  <h3 className="font-medium text-accent-700 mb-2 text-center lg:text-left">{t('appDownload.targetUsers.title')}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm md:text-base">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{t('appDownload.targetUsers.executive')}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{t('appDownload.targetUsers.researcher')}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{t('appDownload.targetUsers.student')}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
                      <span className="text-gray-700">{t('appDownload.targetUsers.planner')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column for Desktop (Download Options) */}
            <div className="lg:w-1/2">
              {/* Download Buttons - Redesigned Layout */}
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 text-center lg:text-left">{t('appDownload.download.heading')}</h2>
                
                {/* Web App Button */}
                <a href={appLinksUrl} target="_blank" 
                  className="group block w-full bg-gradient-to-r from-blue-500 to-accent-500 hover:from-blue-600 hover:to-accent-600 text-white font-medium py-3 px-5 rounded-xl shadow-md transition-all duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-white bg-opacity-20 p-2.5 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="block text-sm font-normal md:text-base">{t('appDownload.download.webapp.title')}</span>
                      <span className="block text-base font-bold group-hover:translate-x-1 transition-transform md:text-lg">{t('appDownload.download.webapp.action')}</span>
                    </div>
                    <div className="flex-shrink-0 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </a>
                
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-sm text-gray-500 md:text-base">{t('appDownload.download.appSection')}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* iOS App Button */}
                  <button onClick={openIOSAppStore}
                    className="group flex flex-col h-full bg-white border border-gray-200 hover:border-accent-300 hover:shadow-lg rounded-xl p-4 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 bg-black rounded-xl p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-white" viewBox="0 0 384 512" fill="currentColor">
                          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 md:text-base">{t('appDownload.download.ios.title')}</span>
                        <span className="block text-base font-bold text-gray-900 md:text-lg">{t('appDownload.download.ios.subtitle')}</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500 md:text-sm">{t('appDownload.download.ios.description')}</span>
                      <span className="flex items-center text-accent-500 group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium mr-1 md:text-base">{t('appDownload.download.ios.action')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </button>
                  
                  {/* Android App Button */}
                  <a href={androidDownloadUrl} target="_blank"
                    className="group flex flex-col h-full bg-white border border-gray-200 hover:border-accent-300 hover:shadow-lg rounded-xl p-4 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 bg-accent-500 rounded-xl p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-white" viewBox="0 0 576 512" fill="currentColor">
                          <path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"/>
                        </svg>
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500 md:text-base">{t('appDownload.download.android.title')}</span>
                        <span className="block text-base font-bold text-gray-900 md:text-lg">{t('appDownload.download.android.subtitle')}</span>
                      </div>
                    </div>
                    <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500 md:text-sm">{t('appDownload.download.android.description')}</span>
                      <span className="flex items-center text-accent-500 group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium mr-1 md:text-base">{t('appDownload.download.android.action')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </a>
                </div>
                
                {/* QR Code Section */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-500 mb-2 md:text-base">{t('appDownload.download.qrCode.notice')}</p>
                  <div className="w-48 h-48 md:w-56 md:h-56 bg-white p-2 mx-auto rounded-md shadow-md border border-gray-200 overflow-hidden">
                    <img src="/images/link_qrcode.png" alt={t('appDownload.download.qrCode.alt')} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 md:text-sm">{t('appDownload.download.qrCode.description')}</p>
                </div>
              </div>
            </div>
          </div>
                 </div>
       </main>

      <style jsx>{`
        /* WeChat notice animation */
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

        /* Fade in animation */
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 