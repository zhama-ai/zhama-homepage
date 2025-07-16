import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import zh from './locales/zh';

const resources = {
  en: { translation: en },
  zh: { translation: zh }
};

// 获取浏览器语言偏好
const getBrowserLocale = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLanguage = navigator.language || (window.navigator.languages?.[0]) || 'en-US';
  
  // 检测是否为中文相关语言
  if (browserLanguage.startsWith('zh')) {
    return 'zh';
  }
  
  // 检测是否为英文
  if (browserLanguage.startsWith('en')) {
    return 'en';
  }
  
  // 默认返回英文
  return 'en';
};

// 获取用户偏好语言，优先级：localStorage > 浏览器语言 > 默认英文
const getUserLocale = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && resources[savedLocale as keyof typeof resources]) {
    return savedLocale;
  }
  
  return getBrowserLocale();
};

// 确保 i18n 始终以英文初始化
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // 硬编码英文，确保服务端和客户端一致
      fallbackLng: 'en',
      debug: false,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false
      }
    });
}

// 客户端语言检测 - 仅在hydration完成后执行
if (typeof window !== 'undefined') {
  // 确保在React hydration完成后再执行语言切换
  const setUserLanguage = () => {
    const userLocale = getUserLocale();
    if (userLocale !== 'en' && i18n.language === 'en') {
      i18n.changeLanguage(userLocale);
    }
  };

  // 使用多种方式确保在hydration之后执行
  if (document.readyState === 'complete') {
    setTimeout(setUserLanguage, 100);
  } else {
    window.addEventListener('load', () => {
      setTimeout(setUserLanguage, 100);
    });
  }

  // 监听语言变化
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('locale', lng);
  });
}

export { getUserLocale, getBrowserLocale };
export default i18n; 