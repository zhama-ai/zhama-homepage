'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import type { Locale } from '@/i18n';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations('ui');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  const handleLanguageSwitch = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    const pathWithoutLocale = pathname.startsWith(`/${locale}`) 
      ? pathname.slice(`/${locale}`.length) || '/'
      : pathname;
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <button 
      onClick={handleLanguageSwitch}
      disabled={isPending}
      className={cn(
        'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300',
        'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
        'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50',
        'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
        'active:scale-95 disabled:opacity-50'
      )}
      title={t('switchLanguage')}
      aria-label={t('switchLanguage')}
    >
      <div className={cn('text-sm font-bold', isPending && 'animate-pulse')}>
        {locale === 'zh' ? '中' : 'EN'}
      </div>
    </button>
  );
}
