'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sectionIds = ['features', 'advantages', 'pricing', 'download', 'about'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: [0.25, 0.5, 0.75]
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 根据主题选择logo
  const getLogoSrc = () => {
    if (!mounted) return "/images/logo.png"; // 默认logo
    
    const currentTheme = resolvedTheme || theme;
    return currentTheme === 'light' ? '/images/logo_light.png' : '/images/logo.png';
  };

  // 如果还没有挂载，直接返回带有默认中文文本的JSX
  if (!mounted) {
    return (
      <header className="backdrop-blur-md bg-white/90 dark:bg-dark-800/90 border-b border-light-400/50 dark:border-dark-600/50 shadow-light-medium dark:shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0 flex items-center">
                <img src="/images/logo.png" alt="Logo" className="h-10 sm:h-12 lg:h-14 w-auto mr-2" />
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-6 lg:space-x-8 flex-nowrap whitespace-nowrap">
                <Link href="/" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                  首页
                </Link>
                <Link href="/#features" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50 whitespace-nowrap">
                  核心能力
                </Link>
                <Link href="/#advantages" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50 whitespace-nowrap">
                  产品价值
                </Link>
                <Link href="/#pricing" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50 whitespace-nowrap">
                  价格
                </Link>
                <a href="https://docs.zhama.com.cn" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50 whitespace-nowrap">
                  文档中心
                </a>
                <Link href="/contact" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50 whitespace-nowrap">
                  立即使用
                </Link>
                <Link href="/#about" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50 whitespace-nowrap">
                  关于我们
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
              <a href="/contact" className="flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 bg-white/80 dark:bg-dark-700/80 backdrop-blur-md border border-light-400/30 dark:border-dark-500/30 shadow-light-soft hover:shadow-light-medium dark:shadow-lg text-secondary hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transform hover:scale-105 active:scale-95 group">
                <span className="text-sm font-semibold transition-all duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-400">立即试用</span>
              </a>
              
              <div className="flex items-center md:hidden ml-2">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                  className="text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 p-2"
                  aria-label="Toggle mobile menu"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`glass-strong border-b border-light-200/50 dark:border-dark-700/50 ${scrolled ? 'shadow-large' : 'shadow-medium'} fixed top-0 left-0 right-0 z-50 transition-shadow`}>
      <div className="w-full">
         <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center">
              <img src={getLogoSrc()} alt="Logo" className="h-10 sm:h-12 lg:h-14 w-auto mr-3" />
            </div>
            
            <nav className="hidden lg:ml-12 lg:flex lg:space-x-8">
              <Link href="/" className={`btn btn-ghost ${activeSection === 'home' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                {t('nav.home')}
              </Link>
              <Link href="/#features" className={`btn btn-ghost ${activeSection === 'features' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                {t('nav.features')}
              </Link>
              <Link href="/#advantages" className={`btn btn-ghost ${activeSection === 'advantages' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                {t('nav.advantages')}
              </Link>
              <Link href="/#pricing" className={`btn btn-ghost ${activeSection === 'pricing' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                {t('nav.pricing')}
              </Link>
              <a href="https://docs.zhama.com.cn" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                {t('nav.docs')}
              </a>
              <Link href="/contact" className="btn btn-ghost">
                {t('nav.download')}
              </Link>
              <Link href="/#about" className={`btn btn-ghost ${activeSection === 'about' ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                {t('nav.about')}
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            
            <a href="https://tego.zhama.com.cn" target="_blank" className="flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 bg-white/80 dark:bg-dark-700/80 backdrop-blur-md border border-light-400/30 dark:border-dark-500/30 shadow-light-soft hover:shadow-light-medium dark:shadow-lg text-secondary hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transform hover:scale-105 active:scale-95 group">
              <span className="text-sm font-semibold transition-all duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-400">{t('nav.tryNow')}</span>
            </a>
            
            <div className="flex items-center lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="btn btn-ghost p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {!mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="glass-strong border-t border-light-200/50 dark:border-dark-700/50 shadow-large">
             <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-4">
              <Link 
                href="/" 
                className={`block btn btn-ghost w-full text-left justify-start ${activeSection === 'home' ? 'text-primary-600 dark:text-primary-400' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/#features" 
                className={`block btn btn-ghost w-full text-left justify-start ${activeSection === 'features' ? 'text-primary-600 dark:text-primary-400' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.features')}
              </Link>
              <Link 
                href="/#advantages" 
                className={`block btn btn-ghost w-full text-left justify-start ${activeSection === 'advantages' ? 'text-primary-600 dark:text-primary-400' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.advantages')}
              </Link>
              <Link 
                href="/#pricing" 
                className={`block btn btn-ghost w-full text-left justify-start ${activeSection === 'pricing' ? 'text-primary-600 dark:text-primary-400' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.pricing')}
              </Link>
              <a 
                href="https://docs.zhama.com.cn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block btn btn-ghost w-full text-left justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.docs')}
              </a>
              <Link 
                href="/contact" 
                className="block btn btn-ghost w-full text-left justify-start"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.download')}
              </Link>
              <Link 
                href="/#about" 
                className={`block btn btn-ghost w-full text-left justify-start ${activeSection === 'about' ? 'text-primary-600 dark:text-primary-400' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              
              {/* 移动端设置 */}
              <div className="pt-4 border-t border-light-200/50 dark:border-dark-700/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-light-600 dark:text-dark-400">
                      主题
                    </span>
                    <ThemeSwitcher />
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-light-600 dark:text-dark-400">
                      语言
                    </span>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 