'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FeaturesSection() {
  const { t } = useTranslation();
  const particleContainer = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // Tab 列表
  const tabsList = [
    t('featuresSection.tabs.collection'),
    t('featuresSection.tabs.analysis'), 
    t('featuresSection.tabs.organization'),
    t('featuresSection.tabs.gateway')
  ];

  // 标签数据
  const collectionTags = t('featuresSection.collection.tags', { returnObjects: true }) as string[];
  const analysisTags = t('featuresSection.analysis.tags', { returnObjects: true }) as string[];
  const organizationTags = t('featuresSection.organization.tags', { returnObjects: true }) as string[];
  const gatewayTags = t('featuresSection.gateway.tags', { returnObjects: true }) as string[];

  // 关闭粒子效果，保留容器占位以防布局抖动
  const createParticles = () => {
    if (!particleContainer.current) return;
    particleContainer.current.innerHTML = '';
  };

  // 高亮文本中的重点内容
  const highlightText = (text: string): string => {
    return text.replace(/<span class="text-accent-400">(.*?)<\/span>/g, '<span class="text-accent-400">$1</span>');
  };

  useEffect(() => {
    // 创建粒子效果
    createParticles();
    
    // 窗口大小变化时重新创建粒子
    const handleResize = () => createParticles();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="features" className="section relative overflow-hidden">
      {/* 背景效果：更克制的浅网格 */}
      <div className="absolute inset-0 bg-grid-subtle opacity-20"></div>
      <div className="particles" ref={particleContainer} aria-hidden="true"></div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-700 dark:text-white animate-fade-in">
            {t('featuresSection.title')}
          </h2>
          <p className="mt-6 text-xl text-light-600 dark:text-dark-400 animate-slide-up animate-stagger-1">
            {t('featuresSection.subtitle')}
          </p>
        </div>

        {/* 主要展示区域 */}
        <div className="feature-showcase animate-scale-in">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 左侧内容 */}
            <div className="space-y-8">
              {activeFeature === 0 && (
                <div className="space-y-6 group">
                  <div className="flex items-center gap-4">
                    <div className="feature-icon">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-light-700 dark:text-white">
                      {t('featuresSection.collection.title')}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.collection.description')) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {collectionTags.map((tag, idx) => (
                      <span key={idx} className="tag animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeFeature === 1 && (
                <div className="space-y-6 group">
                  <div className="flex items-center gap-4">
                    <div className="feature-icon">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-light-700 dark:text-white">
                      {t('featuresSection.analysis.title')}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.analysis.description')) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {analysisTags.map((tag, idx) => (
                      <span key={idx} className="tag animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeFeature === 2 && (
                <div className="space-y-6 group">
                  <div className="flex items-center gap-4">
                    <div className="feature-icon">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-light-700 dark:text-white">
                      {t('featuresSection.organization.title')}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.organization.description')) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {organizationTags.map((tag, idx) => (
                      <span key={idx} className="tag animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeFeature === 3 && (
                <div className="space-y-6 group">
                  <div className="flex items-center gap-4">
                    <div className="feature-icon">
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-light-700 dark:text-white">
                      {t('featuresSection.gateway.title')}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.gateway.description')) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {gatewayTags.map((tag, idx) => (
                      <span key={idx} className="tag animate-slide-up" style={{animationDelay: `${idx * 100}ms`}}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 右侧图片 */}
            <div className="relative">
              <div className="feature-display">
                {activeFeature === 0 && (
                  <img 
                    src="/images/features/multi-source-collection.jpg" 
                    alt={t('featuresSection.collection.title')} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                )}
                {activeFeature === 1 && (
                  <img 
                    src="/images/features/ai-note.jpg" 
                    alt={t('featuresSection.analysis.title')} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                )}
                {activeFeature === 2 && (
                  <img 
                    src="/images/features/knowledge-graph.jpg" 
                    alt={t('featuresSection.organization.title')} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                )}
                {activeFeature === 3 && (
                  <img 
                    src="/images/features/professional-scenarios.jpg" 
                    alt={t('featuresSection.gateway.title')} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Tab 切换按钮 */}
          <div className="flex justify-center mt-12">
            <div className="tabs">
              {tabsList.map((tab, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`tab-button ${
                    activeFeature === index ? 'active' : ''
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 更多特性 */}
        <div className="mt-24 space-y-16">
          <div className="section-header">
            <h3 className="text-2xl md:text-3xl font-bold text-light-700 dark:text-white">
              {t('featuresSection.moreFeatures.title')}
            </h3>
          </div>
          
          <div className="grid-feature">
            {/* 特性1 */}
            <div className="card group hover:scale-105 transition-all duration-500">
              <div className="p-8 space-y-6">
                <div className="feature-icon mx-auto">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-bold text-light-700 dark:text-white">
                    {t('featuresSection.moreFeatures.taskManagement.title')}
                  </h4>
                  <p className="text-light-600 dark:text-dark-400" 
                     dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.moreFeatures.taskManagement.description')) }}>
                  </p>
                </div>
                
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/images/features/audio-transcription.jpg" 
                    alt={t('featuresSection.moreFeatures.taskManagement.title')} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* 特性2 */}
            <div className="card group hover:scale-105 transition-all duration-500">
              <div className="p-8 space-y-6">
                <div className="feature-icon mx-auto">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-bold text-light-700 dark:text-white">
                    {t('featuresSection.moreFeatures.habitTracking.title')}
                  </h4>
                  <p className="text-light-600 dark:text-dark-400" 
                     dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.moreFeatures.habitTracking.description')) }}>
                  </p>
                </div>
                
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/images/features/knowledge-assets.jpg" 
                    alt={t('featuresSection.moreFeatures.habitTracking.title')} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* 特性3 */}
            <div className="card group hover:scale-105 transition-all duration-500">
              <div className="p-8 space-y-6">
                <div className="feature-icon mx-auto">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-bold text-light-700 dark:text-white">
                    {t('featuresSection.moreFeatures.financeManagement.title')}
                  </h4>
                  <p className="text-light-600 dark:text-dark-400" 
                     dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.moreFeatures.financeManagement.description')) }}>
                  </p>
                </div>
                
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/images/features/professional-scenarios.jpg" 
                    alt={t('featuresSection.moreFeatures.financeManagement.title')} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 