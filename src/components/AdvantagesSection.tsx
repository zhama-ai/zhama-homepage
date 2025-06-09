'use client';

import { useTranslation } from 'react-i18next';

export default function AdvantagesSection() {
  const { t } = useTranslation();

  // 优势点数据
  const efficiencyPoints = t('advantagesSection.efficiency.points', { returnObjects: true }) as string[];

  const knowledgePoints = t('advantagesSection.knowledge.points', { returnObjects: true }) as string[];

  const decisionPoints = t('advantagesSection.decision.points', { returnObjects: true }) as string[];

  return (
    <section id="advantages" className="py-16 sm:py-20 md:py-24 bg-white dark:bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-5"></div>
      {/* 动态背景元素 */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent-600 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-400 rounded-full filter blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="mt-2 text-2xl sm:text-3xl md:text-4xl leading-8 font-bold tracking-tight text-gray-900 dark:text-white">
            {t('advantagesSection.title')}
          </p>
          <div className="mt-4 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300">
              <span className="flex items-center whitespace-nowrap"><span className="text-accent-400 mr-1 sm:mr-2">•</span> {t('advantagesSection.values.remember')}</span>
              <span className="flex items-center whitespace-nowrap"><span className="text-accent-400 mr-1 sm:mr-2">•</span> {t('advantagesSection.values.think')}</span>
              <span className="flex items-center whitespace-nowrap"><span className="text-accent-400 mr-1 sm:mr-2">•</span> {t('advantagesSection.values.do')}</span>
              <span className="flex items-center whitespace-nowrap"><span className="text-accent-400 mr-1 sm:mr-2">•</span> {t('advantagesSection.values.live')}</span>
            </div>
          </div>
        </div>

        {/* 核心价值卡片 */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* 价值1 */}
          <div className="group p-1 rounded-xl bg-gradient-to-br from-accent-500/10 to-accent-600/10 dark:from-accent-500/20 dark:to-accent-700/20 hover:from-accent-500/20 hover:to-accent-600/20 dark:hover:from-accent-500/30 dark:hover:to-accent-700/30 transition-all duration-300">
            <div className="tech-card bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-xl flex flex-col h-full hover-lift transform transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white mb-4 sm:mb-6 shadow-lg group-hover:shadow-accent-600/50">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">{t('advantagesSection.efficiency.title')}</h3>
              <div className="mt-2 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {efficiencyPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-accent-500/10 p-1 rounded mr-2 text-accent-600 dark:text-accent-400 flex-shrink-0">→</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 价值2 */}
          <div className="group p-1 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-700/20 hover:from-accent-500/30 hover:to-accent-700/30 transition-all duration-300" style={{ transitionDelay: '100ms' }}>
            <div className="tech-card bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-xl flex flex-col h-full hover-lift transform transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white mb-4 sm:mb-6 shadow-lg group-hover:shadow-accent-600/50">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">{t('advantagesSection.knowledge.title')}</h3>
              <div className="mt-2 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {knowledgePoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-accent-500/10 p-1 rounded mr-2 text-accent-600 dark:text-accent-400 flex-shrink-0">→</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 价值3 */}
          <div className="group p-1 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-700/20 hover:from-accent-500/30 hover:to-accent-700/30 transition-all duration-300 md:col-span-2 lg:col-span-1" style={{ transitionDelay: '200ms' }}>
            <div className="tech-card bg-white dark:bg-dark-800 p-6 sm:p-8 rounded-xl flex flex-col h-full hover-lift transform transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-white mb-4 sm:mb-6 shadow-lg group-hover:shadow-accent-600/50">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">{t('advantagesSection.decision.title')}</h3>
              <div className="mt-2 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {decisionPoints.map((point, index) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-accent-500/10 p-1 rounded mr-2 text-accent-600 dark:text-accent-400 flex-shrink-0">→</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 适用场景 */}
        <div className="mt-16 sm:mt-20">
          <div className="relative mb-8 sm:mb-12 flex justify-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white inline-block relative">
              {t('advantagesSection.scenarios.title')}
              <span className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-accent-400 rounded-full"></span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* 场景1 */}
            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900 group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-accent-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              
              <div className="p-5 sm:p-6 relative z-10">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-600/20 text-accent-400 mb-3 sm:mb-4 mx-auto">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-center">{t('advantagesSection.scenarios.professional.title')}</h4>
                <div className="text-center text-gray-700 dark:text-gray-300 text-sm">{t('advantagesSection.scenarios.professional.description')}</div>
              </div>
            </div>

            {/* 场景2 */}
            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900 group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-accent-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              
              <div className="p-5 sm:p-6 relative z-10">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-600/20 text-accent-400 mb-3 sm:mb-4 mx-auto">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-center">{t('advantagesSection.scenarios.personal.title')}</h4>
                <div className="text-center text-gray-700 dark:text-gray-300 text-sm">{t('advantagesSection.scenarios.personal.description')}</div>
              </div>
            </div>
            
            {/* 场景3 */}
            <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-900 group sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-600/10 to-accent-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-500 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              
              <div className="p-5 sm:p-6 relative z-10">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent-600/20 text-accent-400 mb-3 sm:mb-4 mx-auto">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-center">{t('advantagesSection.scenarios.enterprise.title')}</h4>
                <div className="text-center text-gray-700 dark:text-gray-300 text-sm">{t('advantagesSection.scenarios.enterprise.description')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 