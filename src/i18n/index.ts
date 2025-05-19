import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

const messages = {
  en,
  zh
}

const i18n = createI18n({
  legacy: false, // Use the Composition API
  locale: localStorage.getItem('locale') || 'zh', // Default locale
  fallbackLocale: 'zh', // Fallback locale if a translation is missing
  messages,
})

export default i18n 