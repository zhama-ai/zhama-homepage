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
  if (typeof window === 'undefined') return 'zh';
  
  const browserLanguage = navigator.language || (window.navigator.languages?.[0]) || 'zh-CN';
  
  // 检测是否为中文相关语言
  if (browserLanguage.startsWith('zh')) {
    return 'zh';
  }
  
  // 检测是否为英文
  if (browserLanguage.startsWith('en')) {
    return 'en';
  }
  
  // 默认返回中文
  return 'zh';
};

// 获取用户偏好语言，优先级：localStorage > 浏览器语言 > 默认中文
const getUserLocale = (): string => {
  if (typeof window === 'undefined') return 'zh';
  
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale && resources[savedLocale as keyof typeof resources]) {
    return savedLocale;
  }
  
  return getBrowserLocale();
};

// 初始化 i18n
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'zh', // 始终初始化为中文
      fallbackLng: 'zh',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false
      }
    });
}

export { getUserLocale, getBrowserLocale };
export default i18n; 