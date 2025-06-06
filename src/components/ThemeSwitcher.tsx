'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ThemeSwitcher() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('light');

  useEffect(() => {
    setMounted(true);
    
    // 读取本地存储的主题
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'light';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const html = document.documentElement;
    const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 清除所有主题类
    html.classList.remove('light', 'dark');
    
    if (theme === 'dark') {
      html.classList.add('dark');
    } else if (theme === 'light') {
      html.classList.add('light');
    } else if (theme === 'system') {
      html.classList.add(isDarkSystem ? 'dark' : 'light');
    }
    
    localStorage.setItem('theme', theme);
    console.log(`Applied theme: ${theme}, HTML classes: ${html.className}`);
  };

  const toggleTheme = () => {
    let nextTheme: 'light' | 'dark' | 'system';
    
    if (currentTheme === 'light') {
      nextTheme = 'dark';
    } else if (currentTheme === 'dark') {
      nextTheme = 'system';
    } else {
      nextTheme = 'light';
    }
    
    console.log(`Switching from ${currentTheme} to ${nextTheme}`);
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const getModeText = (): string => {
    return t(`theme.${currentTheme}`);
  };

  const getThemeIcon = () => {
    const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveTheme = currentTheme === 'system' ? (isDarkSystem ? 'dark' : 'light') : currentTheme;
    
    switch (effectiveTheme) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'dark':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
    );
  }

  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 bg-white/80 dark:bg-dark-700/80 backdrop-blur-md border border-light-400/30 dark:border-dark-500/30 shadow-light-soft hover:shadow-light-medium dark:shadow-lg text-secondary hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transform hover:scale-105 active:scale-95 min-w-[100px] group"
      title={`${t('theme.currentTheme')}: ${getModeText()}`}
      aria-label={t('theme.switchTheme')}
    >
      {/* 图标容器 */}
      <div className="relative flex items-center justify-center w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
        {getThemeIcon()}
      </div>
      
      {/* 模式指示器 */}
      <div className="text-xs font-semibold tracking-wide uppercase transition-all duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 hidden sm:block">
        {getModeText()}
      </div>
    </button>
  );
} 