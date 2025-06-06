import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

const messages = {
  en,
  zh
}

// 获取浏览器语言偏好
const getBrowserLocale = (): string => {
  const browserLanguage = navigator.language || navigator.languages?.[0] || 'zh-CN'
  
  // 检测是否为中文相关语言
  if (browserLanguage.startsWith('zh')) {
    return 'zh'
  }
  
  // 检测是否为英文
  if (browserLanguage.startsWith('en')) {
    return 'en'
  }
  
  // 默认返回中文
  return 'zh'
}

// 获取用户偏好语言，优先级：localStorage > 浏览器语言 > 默认中文
const getUserLocale = (): string => {
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && messages[savedLocale as keyof typeof messages]) {
    return savedLocale
  }
  
  return getBrowserLocale()
}

const i18n = createI18n({
  legacy: false, // Use the Composition API
  locale: getUserLocale(), // 使用优化后的语言检测
  fallbackLocale: 'zh', // Fallback locale if a translation is missing
  messages,
})

export default i18n 