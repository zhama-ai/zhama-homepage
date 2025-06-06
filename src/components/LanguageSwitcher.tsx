'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface Language {
  code: string;
  name: string;
  native: string;
  flag: string;
}

// 支持的语言列表 - 移到组件外部避免依赖问题
const languages: Language[] = [
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // 确保在客户端正确设置语言
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && languages.some(lang => lang.code === savedLocale)) {
      i18n.changeLanguage(savedLocale);
    }

    // 添加全局点击监听
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-switcher-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mounted, i18n]);

  if (!mounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  // 获取当前语言文本
  const getCurrentLanguageText = (): string => {
    if (!mounted) return '中文';
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang ? currentLang.native : '中文';
  };

  // 获取语言标题
  const getLanguageTitle = (): string => {
    return `当前语言: ${getCurrentLanguageText()}`;
  };

  // 切换下拉菜单显示状态
  const toggleLanguage = () => {
    setShowDropdown(!showDropdown);
  };

  // 选择语言
  const selectLanguage = (langCode: string) => {
    if (langCode !== i18n.language) {
      setIsAnimating(true);
      i18n.changeLanguage(langCode);
      localStorage.setItem('locale', langCode);
      
      // 重置动画状态
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative language-switcher">
      <div className="language-switcher-container">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-300 bg-white/80 dark:bg-dark-700/80 backdrop-blur-md border border-light-400/30 dark:border-dark-500/30 shadow-light-soft hover:shadow-light-medium dark:shadow-lg text-secondary hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transform hover:scale-105 active:scale-95 cursor-pointer min-w-[120px] group"
          title={getLanguageTitle()}
          aria-label="切换语言"
        >
          {/* 语言图标 */}
          <div className="relative flex items-center justify-center w-5 h-5 transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          
          {/* 当前语言显示 */}
          <div className="flex-1 text-left">
            <span className="text-sm font-semibold transition-all duration-300 group-hover:text-accent-600 dark:group-hover:text-accent-400">{getCurrentLanguageText()}</span>
          </div>
          
          {/* 箭头指示器 */}
          <div className="flex items-center justify-center w-4 h-4">
            <svg className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        {/* 语言选项下拉菜单 */}
        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-white/95 dark:bg-dark-800/95 backdrop-blur-lg border border-light-400/30 dark:border-dark-500/30 rounded-2xl shadow-light-xl dark:shadow-xl z-50 min-w-[200px] opacity-100 transform translate-y-0 transition-all duration-200 ease-out">
            {languages.map((lang) => (
              <button 
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-light-100 dark:hover:bg-dark-700 focus:outline-none focus:bg-light-100 dark:focus:bg-dark-700 ${
                  i18n.language === lang.code ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400' : ''
                }`}
              >
                <div className="text-lg">
                  {lang.flag}
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-medium text-primary">{lang.name}</span>
                  <span className="text-xs text-muted">{lang.native}</span>
                </div>
                {i18n.language === lang.code && (
                  <div className="flex items-center justify-center w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
        
        {/* 切换动画效果 */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-2xl bg-accent-400/20 dark:bg-accent-400/30 scale-110 animate-ping pointer-events-none"></div>
        )}
      </div>
    </div>
  );
} 