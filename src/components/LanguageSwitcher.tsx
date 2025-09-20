'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 确保在客户端正确设置语言
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && (savedLocale === 'zh' || savedLocale === 'en')) {
      i18n.changeLanguage(savedLocale);
    } else {
      // 如果没有保存的语言设置，默认使用中文
      i18n.changeLanguage('zh');
      localStorage.setItem('locale', 'zh');
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
    localStorage.setItem('locale', newLang);
  };

  const getLanguageIcon = () => {
    if (i18n.language === 'zh') {
      // 中文 - 使用中文字符图标
      return (
        <div className="text-sm font-bold">中</div>
      );
    } else {
      // 英文 - 使用英文字符图标
      return (
        <div className="text-sm font-bold">EN</div>
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
      onClick={toggleLanguage}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white/80 dark:bg-dark-700/80 backdrop-blur-md border border-light-400/30 dark:border-dark-500/30 shadow-light-soft hover:shadow-light-medium dark:shadow-lg text-secondary hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transform hover:scale-105 active:scale-95 group"
      title={i18n.language === 'zh' ? '切换到英文' : '切换到中文'}
      aria-label="切换语言"
    >
      <div className="transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
        {getLanguageIcon()}
      </div>
    </button>
  );
} 