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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0 flex items-center">
                <img src="/images/logo.png" alt="Logo" className="h-8 sm:h-10 w-auto mr-2" />
                <span className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  扎马 AI
                </span>
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-6 lg:space-x-10">
                <Link href="/" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                  首页
                </Link>
                <a href="#features" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                  核心能力
                </a>
                <a href="#advantages" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                  产品价值
                </a>
                <a href="#download" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                  立即使用
                </a>
                <a href="#about" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                  关于我们
                </a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
              <Link href="/download" className="glow-button text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                立即体验
              </Link>
              
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
    <header className="backdrop-blur-md bg-white/90 dark:bg-dark-800/90 border-b border-light-400/50 dark:border-dark-600/50 shadow-light-medium dark:shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center">
              <img src={getLogoSrc()} alt="Logo" className="h-8 sm:h-10 w-auto mr-2" />
              
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-6 lg:space-x-10">
              <Link href="/" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                {t('nav.home')}
              </Link>
              <a href="#features" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                {t('nav.features')}
              </a>
              <a href="#advantages" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                {t('nav.advantages')}
              </a>
              <a href="#download" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                {t('nav.download')}
              </a>
              <a href="#about" className="text-secondary hover:text-accent-600 dark:hover:text-accent-400 px-3 lg:px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg hover:bg-light-300/50 dark:hover:bg-dark-700/50">
                {t('nav.about')}
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
            <Link href="/download" className="glow-button text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
              {t('nav.tryNow')}
            </Link>
            
            <div className="flex items-center md:hidden ml-2">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-accent-400 p-2 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-6 w-6 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-3 sm:px-6 backdrop-blur-md bg-white/95 dark:bg-dark-800/95 border-t border-light-400/30 dark:border-dark-600/30 shadow-lg">
            <Link 
              href="/" 
              className="block px-4 py-3 rounded-xl text-base font-semibold text-secondary hover:text-accent-600 dark:hover:text-accent-400 hover:bg-light-100 dark:hover:bg-dark-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <a 
              href="#features" 
              className="block px-4 py-3 rounded-xl text-base font-semibold text-secondary hover:text-accent-600 dark:hover:text-accent-400 hover:bg-light-100 dark:hover:bg-dark-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.features')}
            </a>
            <a 
              href="#advantages" 
              className="block px-4 py-3 rounded-xl text-base font-semibold text-secondary hover:text-accent-600 dark:hover:text-accent-400 hover:bg-light-100 dark:hover:bg-dark-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.advantages')}
            </a>
            <a 
              href="#download" 
              className="block px-4 py-3 rounded-xl text-base font-semibold text-secondary hover:text-accent-600 dark:hover:text-accent-400 hover:bg-light-100 dark:hover:bg-dark-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.download')}
            </a>
            <a 
              href="#about" 
              className="block px-4 py-3 rounded-xl text-base font-semibold text-secondary hover:text-accent-600 dark:hover:text-accent-400 hover:bg-light-100 dark:hover:bg-dark-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </a>
            
            {/* 移动端显示主题和语言切换 */}
            <div className="pt-3 border-t border-light-400/30 dark:border-dark-600/30">
              <div className="flex items-center justify-center space-x-4 px-4 py-2">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted">主题 / Theme:</span>
                  <ThemeSwitcher />
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted">语言 / Language:</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 