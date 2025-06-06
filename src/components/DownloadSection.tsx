'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function DownloadSection() {
  const { t } = useTranslation();

  return (
    <section id="download" className="py-16 bg-white dark:bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('downloadSection.title')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 企业版 */}
          <div className="tech-card p-6 hover-card group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-accent-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 ease-in-out"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="p-4 rounded-full bg-accent-500/10 mb-5 group-hover:bg-accent-500/20 transform group-hover:scale-110 transition-all duration-300 ease-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-400 group-hover:text-accent-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                {t('downloadSection.enterprise.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-5 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {t('downloadSection.enterprise.description')}
              </p>
              <a href="#" className="btn-shine inline-flex items-center text-center transition-all duration-300 ease-in-out">
                <svg className="w-5 h-5 mr-2 transform group-hover:rotate-[-5deg] transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('downloadSection.enterprise.button')}
              </a>
            </div>
          </div>

          {/* iOS 下载 */}
          <div className="tech-card p-6 hover-card group relative transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-accent-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 ease-in-out"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="p-4 rounded-full bg-accent-500/10 mb-5 group-hover:bg-accent-500/20 transform group-hover:scale-110 transition-all duration-300 ease-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-400 group-hover:text-accent-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                {t('downloadSection.ios.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-5 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {t('downloadSection.ios.description')}
              </p>
              <Link href="/download" className="btn-shine inline-flex items-center text-center transition-all duration-300 ease-in-out">
                <svg className="w-5 h-5 mr-2 transform group-hover:rotate-[-5deg] transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.36 14.218c-.004-2.677 2.189-3.961 2.289-4.018-1.244-1.822-3.178-2.071-3.869-2.103-1.649-.168-3.213.968-4.047.968-.834 0-2.12-.945-3.488-.92-1.789.027-3.441 1.044-4.356 2.649-1.858 3.219-.475 7.97 1.337 10.57.886 1.281 1.932 2.711 3.316 2.659 1.33-.054 1.832-.86 3.438-.86 1.604 0 2.058.86 3.464.835 1.433-.024 2.343-1.3 3.215-2.586.815-1.19 1.15-2.341 1.169-2.4-.025-.013-2.24-.862-2.262-3.412-.02-2.131 1.743-3.152 1.821-3.202-1.001-1.464-2.548-1.621-3.096-1.659"/>
                </svg>
                {t('downloadSection.ios.button')}
              </Link>
            </div>
          </div>

          {/* Android 下载 */}
          <div className="tech-card p-6 hover-card group relative transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-accent-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 ease-in-out"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="p-4 rounded-full bg-accent-500/10 mb-5 group-hover:bg-accent-500/20 transform group-hover:scale-110 transition-all duration-300 ease-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-400 group-hover:text-accent-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                {t('downloadSection.android.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-5 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {t('downloadSection.android.description')}
              </p>
              <Link href="/download" className="btn-shine inline-flex items-center text-center transition-all duration-300 ease-in-out">
                <svg className="w-5 h-5 mr-2 transform group-hover:rotate-[-5deg] transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.349a1.2 1.2 0 01-1.2 1.2h-1.2v4.151c0 1.05-.85 1.9-1.9 1.9s-1.9-.85-1.9-1.9v-4.15h-1.996v4.15c0 1.05-.85 1.9-1.9 1.9s-1.9-.85-1.9-1.9v-4.15h-1.2a1.2 1.2 0 01-1.2-1.2V8.253h14.396v7.095zm-11.096-9.295a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm9.4 0a1.25 1.25 0 000-2.5 1.25 1.25 0 000 2.5zM22.4 8.252a1.9 1.9 0 01-1.9 1.9v7.097a1.9 1.9 0 11-3.8 0V10.15a1.9 1.9 0 01-1.9-1.9V5.346a1.9 1.9 0 011.9-1.9h3.8a1.9 1.9 0 011.9 1.9v2.906zm-19.9 1.9a1.9 1.9 0 01-1.9-1.9V5.346a1.9 1.9 0 011.9-1.9h3.8a1.9 1.9 0 011.9 1.9v2.906a1.9 1.9 0 01-1.9 1.9v7.097a1.9 1.9 0 11-3.8 0V10.15z"/>
                </svg>
                {t('downloadSection.android.button')}
              </Link>
            </div>
          </div>
        </div>
        
        {/* 网页版入口 */}
        <div className="mt-10 text-center">
          <a href="https://dashboard.zhama.com.cn" className="web-button inline-flex items-center text-center mx-auto relative overflow-hidden group">
            <span className="relative z-10 inline-flex items-center">
              <svg className="w-5 h-5 mr-2 transform group-hover:rotate-180 transition-transform duration-500 ease-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {t('downloadSection.web.button')}
            </span>
            <span className="absolute inset-0 bg-accent-500/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
          </a>
        </div>
      </div>
    </section>
  );
} 