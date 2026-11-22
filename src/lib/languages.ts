import type { Locale } from '../data/types';

export type WebsiteLanguage = Locale | 'zh-Hant';
export const languages = [
  { id: 'zh', label: '简体中文', short: '简体', tag: 'zh-CN' },
  { id: 'zh-Hant', label: '繁體中文', short: '繁體', tag: 'zh-Hant' },
  { id: 'en', label: 'English', short: 'EN', tag: 'en' },
] as const;

export const sourceLocaleFor = (language: WebsiteLanguage): Locale => language === 'zh-Hant' ? 'zh' : language;
export const languagePathFor = (language: WebsiteLanguage, page = '') => `/${language}/${page ? `${page}/` : ''}`;
export const websiteLanguageFor = (value?: string): WebsiteLanguage => languages.some(language => language.id === value) ? value as WebsiteLanguage : 'zh';
