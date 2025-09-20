'use client';

import { useEffect, useRef, useState } from 'react';

interface FeatureData {
  title: string;
  subtitle: string;
  tabs: {
    collection: string;
    analysis: string;
    organization: string;
    gateway: string;
  };
  collection: {
    title: string;
    description: string;
    tags: string[];
  };
  analysis: {
    title: string;
    description: string;
    tags: string[];
  };
  organization: {
    title: string;
    description: string;
    tags: string[];
  };
  gateway: {
    title: string;
    description: string;
    tags: string[];
  };
  moreFeatures: {
    title: string;
    taskManagement: {
      title: string;
      description: string;
    };
    habitTracking: {
      title: string;
      description: string;
    };
    financeManagement: {
      title: string;
      description: string;
    };
  };
}

interface FeaturesClientProps {
  data: FeatureData;
}

export default function FeaturesClient({ data }: FeaturesClientProps) {
  const particleContainer = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // Tab 列表
  const tabsList = [
    data.tabs.collection,
    data.tabs.analysis,
    data.tabs.organization,
    data.tabs.gateway
  ];

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
      
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-700 dark:text-white animate-fade-in">
            {data.title}
          </h2>
          <p className="mt-6 text-xl text-light-600 dark:text-dark-400 animate-slide-up animate-stagger-1">
            {data.subtitle}
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
                      {data.collection.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(data.collection.description) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {data.collection.tags.map((tag, idx) => (
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
                      {data.analysis.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(data.analysis.description) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {data.analysis.tags.map((tag, idx) => (
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
                      {data.organization.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(data.organization.description) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {data.organization.tags.map((tag, idx) => (
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
                      {data.gateway.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-light-600 dark:text-dark-400 leading-relaxed" 
                     dangerouslySetInnerHTML={{ __html: highlightText(data.gateway.description) }}>
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {data.gateway.tags.map((tag, idx) => (
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
                    alt={data.collection.title} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                )}
                {activeFeature === 1 && (
                  <img 
                    src="/images/features/ai-note.jpg" 
                    alt={data.analysis.title} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                )}
                {activeFeature === 2 && (
                  <img 
                    src="/images/features/knowledge-graph.jpg" 
                    alt={data.organization.title} 
                    className="w-full h-full object-cover transition-all duration-500"
                    loading="lazy"
                  />
                )}
                {activeFeature === 3 && (
                  <img 
                    src="/images/features/professional-scenarios.jpg" 
                    alt={data.gateway.title} 
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
              {data.moreFeatures.title}
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
                    {data.moreFeatures.taskManagement.title}
                  </h4>
                  <p className="text-light-600 dark:text-dark-400" 
                     dangerouslySetInnerHTML={{ __html: highlightText(data.moreFeatures.taskManagement.description) }}>
                  </p>
                </div>
                
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/images/features/audio-transcription.jpg" 
                    alt={data.moreFeatures.taskManagement.title} 
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
                    {data.moreFeatures.habitTracking.title}
                  </h4>
                  <p className="text-light-600 dark:text-dark-400" 
                     dangerouslySetInnerHTML={{ __html: highlightText(data.moreFeatures.habitTracking.description) }}>
                  </p>
                </div>
                
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/images/features/knowledge-assets.jpg" 
                    alt={data.moreFeatures.habitTracking.title} 
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
                    {data.moreFeatures.financeManagement.title}
                  </h4>
                  <p className="text-light-600 dark:text-dark-400" 
                     dangerouslySetInnerHTML={{ __html: highlightText(data.moreFeatures.financeManagement.description) }}>
                  </p>
                </div>
                
                <div className="overflow-hidden rounded-xl">
                  <img 
                    src="/images/features/professional-scenarios.jpg" 
                    alt={data.moreFeatures.financeManagement.title} 
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
