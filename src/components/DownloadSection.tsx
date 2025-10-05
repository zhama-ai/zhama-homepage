import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface DownloadSectionProps {
  locale: string;
}

export default async function DownloadSection({ locale }: DownloadSectionProps) {
  const t = await getTranslations({ locale, namespace: 'downloadSection' });

  return (
    <section id="download" className="py-16 bg-white dark:bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-5"></div>
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {t('title')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                {t('enterprise.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-5 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {t('enterprise.description')}
              </p>
              <a href="https://docs.zhama.com.cn/faq/" target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center text-center transition-all duration-300 ease-in-out">
                <svg className="w-5 h-5 mr-2 transform group-hover:rotate-[-5deg] transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('enterprise.button')}
              </a>
            </div>
          </div>

          {/* 文档中心 */}
          <div className="tech-card p-6 hover-card group relative transform hover:-translate-y-1 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-accent-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 ease-in-out"></div>
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="p-4 rounded-full bg-accent-500/10 mb-5 group-hover:bg-accent-500/20 transform group-hover:scale-110 transition-all duration-300 ease-out">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent-400 group-hover:text-accent-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                {t('docs.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-5 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                {t('docs.description')}
              </p>
              <a href="https://docs.zhama.com.cn" target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center text-center transition-all duration-300 ease-in-out">
                <svg className="w-5 h-5 mr-2 transform group-hover:rotate-[-5deg] transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M10 6V5a2 2 0 011-1.732l4-2.267a2 2 0 011.732 0L20 3M10 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" />
                </svg>
                {t('docs.button')}
              </a>
            </div>
          </div>
        </div>
        
        {/* 网页版入口 */}
        <div className="mt-10 text-center">
          <a href="https://docs.zhama.com.cn" target="_blank" className="web-button inline-flex items-center text-center mx-auto relative overflow-hidden group">
            <span className="relative z-10 inline-flex items-center">
              <svg className="w-5 h-5 mr-2 transform group-hover:rotate-180 transition-transform duration-500 ease-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {t('web.button')}
            </span>
            <span className="absolute inset-0 bg-accent-500/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
          </a>
        </div>
      </div>
    </section>
  );
} 