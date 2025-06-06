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
    <section className="relative gradient-bg pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-20"></div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl animate-fadeIn">
                <span className="block">{mounted ? t('home.hero.title') : '扎马 AI'}</span>
              </h1>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl animate-slideInUp">
                <span className="block neon-text">{mounted ? t('home.hero.tagline') : '你的个性化 AI 研究助理'}</span>
              </h2>
              <p className="mt-6 text-base text-muted sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-6 md:text-xl lg:mx-0 leading-relaxed animate-slideInUp">
                {mounted ? t('home.hero.description') : '基于文档的智能笔记与知识管理工具。上传资料、提出问题，获得有据可查的精准回答。让每一份文档都成为可对话的智能知识库，助您高效研究、深度思考、快速洞察。'}
              </p>
              <div className="mt-10 sm:mt-12 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-slideInUp">
                <div>
                  <a href="download" className="btn-primary inline-block">
                    {mounted ? t('home.hero.cta') : '立即体验'}
                  </a>
                </div>
                <div>
                  <a href="#features" className="btn-secondary inline-block">
                    {mounted ? t('home.hero.secondaryCta') : '了解更多'}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full overflow-hidden modern-card animate-float">
          <img className="h-full w-full object-cover" src="/images/home.png" alt={t('home.hero.imgAlt')} />
        </div>
      </div>
    </section>
  );
} 