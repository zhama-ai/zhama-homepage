'use client';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] lg:min-h-[86vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-light-50 to-light-200 dark:from-dark-950 dark:to-dark-900"></div>
      <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-bold tracking-tight animate-fade-in">
                <span className="block text-light-700 dark:text-white">
                  {mounted ? t('home.hero.title') : 'TeGo-AI智能体操作系统'}
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-light-700 dark:text-white/90 animate-slide-up">
                {mounted ? t('home.hero.tagline') : 'A1·基建驱动 · 万物皆智能体 · 全链路智能协作平台'}
              </p>
            </div>
            <p className="text-base md:text-lg text-light-600 dark:text-dark-400 leading-relaxed max-w-2xl animate-slide-up">
              {mounted ? t('home.hero.description') : '用AI驱动企业服务全面升级，构建一站式智能化业务平台。'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <a href="#download" className="btn btn-primary group">
                <span>{mounted ? t('nav.tryNow') : '联系销售'}</span>
                <svg className="ml-2 -mr-1 w-5 h-5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#features" className="btn btn-secondary">
                {mounted ? t('home.hero.secondaryCta') : '产品演示'}
              </a>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="tag">企业级部署</span>
              <span className="tag">MCP 框架</span>
              <span className="tag">零代码开发</span>
              <span className="tag">全链路智能</span>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-light-300/60 dark:border-dark-700/60 shadow-xl">
              <img
                className="w-full h-auto object-cover"
                src="/images/home.png"
                alt={mounted ? t('home.hero.imgAlt') : 'TeGo-AI智能体操作系统'}
                loading="eager"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/home.png'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 