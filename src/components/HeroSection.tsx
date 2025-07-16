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
    <section className="relative gradient-bg pt-16 sm:pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-20"></div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 lg:px-8">
          <main className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center lg:text-left lg:max-w-lg xl:max-w-xl">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-primary animate-fadeIn">
                <span className="block">{mounted ? t('home.hero.title') : '扎马 AI'}</span>
              </h1>
              <h2 className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight animate-slideInUp">
                <span className="block neon-text">{mounted ? t('home.hero.tagline') : '你的个性化 AI 研究助理'}</span>
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto lg:mx-0 leading-relaxed animate-slideInUp">
                {mounted ? t('home.hero.description') : '基于文档的智能笔记与知识管理工具。上传资料、提出问题，获得有据可查的精准回答。让每一份文档都成为可对话的智能知识库，助您高效研究、深度思考、快速洞察。'}
              </p>
              <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-4 animate-slideInUp">
                <div className="w-full sm:w-auto">
                  <a href="download" className="btn-primary inline-block w-full sm:w-auto text-center">
                    {mounted ? t('home.hero.cta') : '立即体验'}
                  </a>
                </div>
                <div className="w-full sm:w-auto">
                  <a href="#features" className="btn-secondary inline-block w-full sm:w-auto text-center">
                    {mounted ? t('home.hero.secondaryCta') : '了解更多'}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="mt-8 sm:mt-12 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:mt-0">
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-full w-full overflow-hidden modern-card animate-float">
          <img className="h-full w-full object-cover" src="/images/home.png" alt={mounted ? t('home.hero.imgAlt') : 'Hero Image'} />
        </div>
      </div>
    </section>
  );
} 