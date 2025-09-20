'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import type { Locale } from '@/i18n';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations('ui');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  const handleLanguageSwitch = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    // Remove current locale prefix and add new one
    const pathWithoutLocale = pathname.startsWith(`/${locale}`) 
      ? pathname.slice(`/${locale}`.length) || '/'
      : pathname;
    const newPath = newLocale === 'zh' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;
    
    startTransition(() => {
      router.replace(newPath);
    });
  };

  const getLanguageIcon = () => {
    if (locale === 'zh') {
      return (
        <div className="text-sm font-bold">中</div>
      );
    } else {
      return (
        <div className="text-sm font-bold">EN</div>
      );
    }
  };

  return (
    <button 
      onClick={handleLanguageSwitch}
      disabled={isPending}
      className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 bg-white/80 dark:bg-dark-700/80 backdrop-blur-md border border-light-400/30 dark:border-dark-500/30 shadow-light-soft hover:shadow-light-medium dark:shadow-lg text-secondary hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/50 transform hover:scale-105 active:scale-95 group disabled:opacity-50"
      title={t('switchToEnglish')}
      aria-label={t('switchLanguage')}
    >
      <div className={`transition-transform duration-300 ease-out group-hover:rotate-12 group-hover:scale-110 ${isPending ? 'animate-pulse' : ''}`}>
        {getLanguageIcon()}
      </div>
    </button>
  );
} 