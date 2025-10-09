'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

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

const features = [
  {
    key: 'collection',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    image: '/images/features/multi-source-collection.jpg',
  },
  {
    key: 'analysis',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    image: '/images/features/ai-note.jpg',
  },
  {
    key: 'organization',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    image: '/images/features/knowledge-graph.jpg',
  },
  {
    key: 'gateway',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    image: '/images/features/professional-scenarios.jpg',
  },
];

const moreFeatures = [
  {
    key: 'taskManagement',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    image: '/images/features/audio-transcription.jpg',
  },
  {
    key: 'habitTracking',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    image: '/images/features/knowledge-assets.jpg',
  },
  {
    key: 'financeManagement',
    icon: (
      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    image: '/images/features/professional-scenarios.jpg',
  },
];

export default function FeaturesClient({ data }: FeaturesClientProps) {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="section relative overflow-hidden bg-white dark:bg-zinc-900">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="font-bold text-zinc-900 dark:text-zinc-50 animate-fade-in">
            {data.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 animate-fade-in animate-delay-100">
            {data.subtitle}
          </p>
        </div>

        {/* 主要展示区域 */}
        <div className="card p-8 lg:p-12 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 左侧内容 */}
            <div className="space-y-6">
              {features.map((feature, index) => {
                if (activeFeature !== index) return null;
                const featureData = data[feature.key as 'collection' | 'analysis' | 'organization' | 'gateway'];
                return (
                  <div key={feature.key} className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 text-white shadow-md">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        {featureData.title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {featureData.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {featureData.tags.map((tag: string, idx: number) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 右侧图片 */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg aspect-video">
                {features.map((feature, index) => {
                  if (activeFeature !== index) return null;
                  const featureData = data[feature.key as 'collection' | 'analysis' | 'organization' | 'gateway'];
                  return (
                    <img
                      key={feature.key}
                      src={feature.image}
                      alt={featureData.title}
                      className="w-full h-full object-cover transition-all duration-500"
                      loading="lazy"
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tab 切换按钮 */}
          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              {features.map((feature, index) => (
                <button
                  key={feature.key}
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    'px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300',
                    activeFeature === index
                      ? 'bg-white dark:bg-zinc-700 text-primary-600 dark:text-primary-400 shadow-md'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                  )}
                >
                  {data.tabs[feature.key as keyof typeof data.tabs]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 更多特性 */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {data.moreFeatures.title}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {moreFeatures.map((feature) => {
              const featureData = data.moreFeatures[feature.key as 'taskManagement' | 'habitTracking' | 'financeManagement'];
              return (
                <div key={feature.key} className="card-hover group">
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-600 text-white shadow-md mx-auto group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    
                    <div className="text-center space-y-4">
                      <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                        {featureData.title}
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {featureData.description}
                      </p>
                    </div>
                    
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={feature.image}
                        alt={featureData.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
