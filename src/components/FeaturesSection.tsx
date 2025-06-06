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
    t('featuresSection.tabs.organization')
  ];

  // 标签数据
  const collectionTags = t('featuresSection.collection.tags', { returnObjects: true }) as string[];
  const analysisTags = t('featuresSection.analysis.tags', { returnObjects: true }) as string[];
  const organizationTags = t('featuresSection.organization.tags', { returnObjects: true }) as string[];

  // 创建粒子效果
  const createParticles = () => {
    if (!particleContainer.current) return;
    
    const container = particleContainer.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建粒子
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // 随机位置
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      
      // 随机大小
      const size = Math.random() * 4 + 1;
      
      // 随机动画持续时间
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;
      
      // 应用样式
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animation = `float-up ${duration}s linear ${delay}s infinite`;
      
      container.appendChild(particle);
    }
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
    <section id="features" className="py-20 gradient-bg overflow-hidden relative">
      <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-10"></div>
      <div className="particle-background" ref={particleContainer}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-primary sm:text-4xl animate-fadeIn">
            {t('featuresSection.title')}
          </p>
          <p className="mt-4 max-w-3xl text-xl text-muted lg:mx-auto mb-12 animate-slideInUp">
            {t('featuresSection.subtitle')}
          </p>
        </div>

        {/* 新的布局：卡片内容展示 */}
        <div className="feature-showcase mt-12 relative">
          {/* 主要展示区域 */}
          <div className="flex flex-col lg:flex-row modern-card p-4 lg:p-8 gap-6 lg:gap-12 h-full">
            {/* 左侧内容 */}
            <div className="lg:w-5/12 flex flex-col">
              {activeFeature === 0 && (
                <div className="feature-content h-full">
                  <div className="feature-icon-wrapper mb-4 flex items-center gap-4">
                    <div className="feature-icon">
                      <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">{t('featuresSection.collection.title')}</h3>
                  </div>
                  <p className="text-secondary leading-relaxed my-6" dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.collection.description')) }}></p>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {collectionTags.map((tag, idx) => (
                      <span key={idx} className="feature-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeFeature === 1 && (
                <div className="feature-content h-full">
                  <div className="feature-icon-wrapper mb-4 flex items-center gap-4">
                    <div className="feature-icon feature-icon-alt">
                      <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">{t('featuresSection.analysis.title')}</h3>
                  </div>
                  <p className="text-secondary leading-relaxed my-6" dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.analysis.description')) }}></p>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {analysisTags.map((tag, idx) => (
                      <span key={idx} className="feature-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {activeFeature === 2 && (
                <div className="feature-content h-full">
                  <div className="feature-icon-wrapper mb-4 flex items-center gap-4">
                    <div className="feature-icon">
                      <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-primary">{t('featuresSection.organization.title')}</h3>
                  </div>
                  <p className="text-secondary leading-relaxed my-6" dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.organization.description')) }}></p>
                  <div className="mt-auto flex flex-wrap gap-3">
                    {organizationTags.map((tag, idx) => (
                      <span key={idx} className="feature-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 右侧图片 */}
            <div className="lg:w-7/12 flex items-center">
              <div className="feature-display-wrapper w-full border border-accent-500/30 rounded-xl overflow-hidden">
                {activeFeature === 0 && (
                  <img 
                    src="/images/features/multi-source-collection.jpg" 
                    alt={t('featuresSection.collection.title')} 
                    className="w-full h-full object-cover"
                  />
                )}
                {activeFeature === 1 && (
                  <img 
                    src="/images/features/ai-note.jpg" 
                    alt={t('featuresSection.analysis.title')} 
                    className="w-full h-full object-cover"
                  />
                )}
                {activeFeature === 2 && (
                  <img 
                    src="/images/features/knowledge-graph.jpg" 
                    alt={t('featuresSection.organization.title')} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Tab 切换按钮 */}
          <div className="tab-container mt-8 p-2 bg-gray-200/70 dark:bg-dark-700/50 rounded-full inline-flex mx-auto">
            {tabsList.map((tab, index) => (
              <button 
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`tab-button py-2 px-6 rounded-full text-sm transition-all duration-300 ${
                  activeFeature === index 
                    ? 'active-tab' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 更多功能 */}
        <div className="mt-24">
          <h3 className="text-xl font-bold text-primary text-center mb-12">{t('featuresSection.moreFeatures.title')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 功能4：高效任务与时间管理 */}
            <div className="modern-card p-6 hover-lift transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 mb-4 shadow-light-soft dark:shadow-accent-glow">
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-primary mb-2">{t('featuresSection.moreFeatures.taskManagement.title')}</h4>
                <p className="text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.moreFeatures.taskManagement.description')) }}>
                </p>
                <div className="mt-4 w-full">
                  <div className="interactive-image">
                    <img src="/images/features/audio-transcription.jpg" alt={t('featuresSection.moreFeatures.taskManagement.title')} className="w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* 功能5：习惯养成与健康追踪 */}
            <div className="modern-card p-6 hover-lift transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 mb-4 shadow-light-soft dark:shadow-accent-glow">
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-primary mb-2">{t('featuresSection.moreFeatures.habitTracking.title')}</h4>
                <p className="text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.moreFeatures.habitTracking.description')) }}>
                </p>
                <div className="mt-4 w-full">
                  <div className="interactive-image">
                    <img src="/images/features/knowledge-assets.jpg" alt={t('featuresSection.moreFeatures.habitTracking.title')} className="w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* 功能6：智能记账与财务管理 */}
            <div className="modern-card p-6 hover-lift transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 mb-4 shadow-light-soft dark:shadow-accent-glow">
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-primary mb-2">{t('featuresSection.moreFeatures.financeManagement.title')}</h4>
                <p className="text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightText(t('featuresSection.moreFeatures.financeManagement.description')) }}>
                </p>
                <div className="mt-4 w-full">
                  <div className="interactive-image">
                    <img src="/images/features/professional-scenarios.jpg" alt={t('featuresSection.moreFeatures.financeManagement.title')} className="w-full transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 