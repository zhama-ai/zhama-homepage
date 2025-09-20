'use client';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutUsSection() {
  const { t, i18n } = useTranslation();
  const typingTextRef = useRef<HTMLSpanElement>(null);

  // 特性图标数据
  const featureIcons = [
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>`,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>`
  ];

  // 获取本地化特性数据和打字效果文本
  const features = t('aboutSection.features', { returnObjects: true }) as Array<{title: string, description: string}>;

  const typingPhrases = t('aboutSection.typingPhrases', { returnObjects: true }) as string[];

  // 启动打字效果
  useEffect(() => {
    const element = typingTextRef.current;
    if (!element || typingPhrases.length === 0) return;

    // 清理当前内容
    element.textContent = "";
    
    let timeoutIds: NodeJS.Timeout[] = [];
    let currentIndex = 0;
    let isActive = true;

    const typeText = (text: string, callback?: () => void) => {
      if (!isActive || !element) return;
      
      element.textContent = "";
      let charIndex = 0;

      const typeChar = () => {
        if (!isActive || !element || charIndex >= text.length) {
          if (callback && isActive) {
            const timeoutId = setTimeout(callback, 2000);
            timeoutIds.push(timeoutId);
          }
          return;
        }

        element.textContent += text[charIndex];
        charIndex++;
        const timeoutId = setTimeout(typeChar, 100);
        timeoutIds.push(timeoutId);
      };

      typeChar();
    };

    const eraseText = (callback?: () => void) => {
      if (!isActive || !element) return;
      
      const currentText = element.textContent || "";
      let charIndex = currentText.length;

      const eraseChar = () => {
        if (!isActive || !element || charIndex <= 0) {
          if (callback && isActive) {
            const timeoutId = setTimeout(callback, 500);
            timeoutIds.push(timeoutId);
          }
          return;
        }

        element.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        const timeoutId = setTimeout(eraseChar, 50);
        timeoutIds.push(timeoutId);
      };

      eraseChar();
    };

    const runCycle = () => {
      if (!isActive) return;
      
      const currentPhrase = typingPhrases[currentIndex];
      
      typeText(currentPhrase, () => {
        eraseText(() => {
          currentIndex = (currentIndex + 1) % typingPhrases.length;
          if (isActive) {
            const timeoutId = setTimeout(runCycle, 300);
            timeoutIds.push(timeoutId);
          }
        });
      });
    };

    // 开始动画循环
    const initialTimeoutId = setTimeout(runCycle, 500);
    timeoutIds.push(initialTimeoutId);

    // 清理函数
    return () => {
      isActive = false;
      timeoutIds.forEach(clearTimeout);
      timeoutIds = [];
      if (element) {
        element.textContent = "";
      }
    };
  }, [typingPhrases]);

  return (
    <section id="about" className="py-32 bg-white dark:bg-dark-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern opacity-5"></div>
      <div className="absolute -right-32 -top-32 w-96 h-96 bg-accent-400 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-accent-400 opacity-10 rounded-full blur-3xl"></div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with animation */}
        <div className="text-center mb-20">
          <div className="animate-fadeIn">
            <h2 className="text-accent-400 font-semibold text-lg uppercase tracking-wider mb-3">{t('aboutSection.title')}</h2>
            <p className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl leading-tight" dangerouslySetInnerHTML={{ __html: t('aboutSection.subtitle') }}>
            </p>
            <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('aboutSection.description')}
            </p>
          </div>
        </div>

        {/* Vision card with hover effects */}
        <div className="tech-card p-10 mx-auto rounded-2xl backdrop-blur-sm bg-gray-50 dark:bg-dark-800/80 border border-gray-200 dark:border-dark-700 shadow-xl transform transition-all duration-300 hover:shadow-accent-400/10">
          <div className="animate-slideInUp">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <span className="inline-flex items-center justify-center p-2 bg-accent-400/10 rounded-md mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              {t('aboutSection.vision.title')}
            </h3>
            <div className="space-y-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: t('aboutSection.vision.paragraphs.0') }}>
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: t('aboutSection.vision.paragraphs.1') }}>
              </p>
            </div>
            
            {/* Features with animated hover */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index}
                     className="feature-card group p-6 rounded-xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800/50 transition-all duration-300 hover:border-accent-400/30 hover:bg-accent-400/5 hover:shadow-lg hover:-translate-y-1"
                     style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="text-accent-400 bg-accent-400/10 p-3 rounded-lg group-hover:bg-accent-400/20 transition-all">
                      <div dangerouslySetInnerHTML={{ __html: featureIcons[index] }} className="h-6 w-6"></div>
                    </div>
                    <div>
                      <h4 className="text-gray-900 dark:text-white text-lg font-medium mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Final statement with typing animation */}
        <div className="mt-16 text-center">
          <p className="text-2xl text-gray-700 dark:text-gray-300 mx-auto font-light leading-relaxed">
            <span className="text-accent-400 font-bold">{t('aboutSection.footer.prefix')}</span>{t('aboutSection.footer.suffix')}
            <br className="hidden sm:block" />
            <span ref={typingTextRef} className="inline-block h-8"></span>
          </p>
        </div>
      </div>
    </section>
  );
} 