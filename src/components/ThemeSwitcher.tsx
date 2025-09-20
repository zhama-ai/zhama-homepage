'use client';

import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setMounted(true);
    
    // 读取本地存储的主题，默认为dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
    setCurrentTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (theme: 'light' | 'dark') => {
    const html = document.documentElement;
    
    // 清除所有主题类
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
    
    localStorage.setItem('theme', theme);
  };

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const getThemeIcon = () => {
    if (currentTheme === 'light') {
      // 太阳图标（亮色主题）
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    } else {
      // 月亮图标（暗色主题）
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse" />
    );
  }

  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white/80 dark:bg-dark-700/80 backdrop-blur-md border border-light-400/30 dark:border-dark-500/30 shadow-light-soft hover:shadow-light-medium dark:shadow-lg text-secondary hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transform hover:scale-105 active:scale-95 group"
      title={currentTheme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
      aria-label="切换主题"
    >
      <div className="transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
        {getThemeIcon()}
      </div>
    </button>
  );
} 