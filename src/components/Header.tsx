'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sectionIds = [
      'home',
      'pain-points',
      'value-pillars',
      'scenarios',
      'outcomes',
      'readiness',
      'delivery',
      'pricing',
      'customers',
      'resources',
      'cta',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { href: `/${locale}/#value-pillars`, label: t('nav.biz.value'), section: 'value-pillars' },
    { href: `/${locale}/#scenarios`, label: t('nav.biz.solutions'), section: 'scenarios' },
    { href: `/${locale}/#customers`, label: t('nav.biz.customers'), section: 'customers' },
    { href: `/${locale}/#delivery`, label: t('nav.biz.delivery'), section: 'delivery' },
    { href: `/${locale}/#pricing`, label: t('nav.pricing'), section: 'pricing' },
    { href: `/${locale}/blog`, label: t('nav.blog') },
    { href: `/${locale}/#resources`, label: t('nav.biz.resources'), section: 'resources' },
  ];

  if (!mounted) {
    return (
      <header className="glass border-b border-zinc-200 dark:border-zinc-800 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link href={`/${locale}`} className="flex items-center flex-shrink-0">
              <Image src="/images/logo_light.png" alt="Logo" width={120} height={48} className="h-10 sm:h-12 w-auto dark:hidden" priority />
              <Image src="/images/logo_dark.png" alt="Logo" width={120} height={48} className="h-10 sm:h-12 w-auto hidden dark:block" priority />
            </Link>
            <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        'glass border-b border-zinc-200 dark:border-zinc-800 fixed top-0 left-0 right-0 z-50 transition-shadow',
        scrolled ? 'shadow-lg' : 'shadow-md'
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center min-w-0">
            <Link href={`/${locale}`} className="flex items-center flex-shrink-0 mr-8">
              <Image src="/images/logo_light.png" alt="Logo" width={120} height={48} className="h-10 sm:h-12 w-auto dark:hidden" priority />
              <Image src="/images/logo_dark.png" alt="Logo" width={120} height={48} className="h-10 sm:h-12 w-auto hidden dark:block" priority />
            </Link>

            <nav className="hidden lg:flex lg:items-center lg:gap-1">
              {navItems.map((item) => {
                const linkClass = cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap',
                  'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50',
                  'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  item.section && activeSection === item.section && 'text-primary-600 dark:text-primary-400'
                );

                return (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center" style={{ height: '40px' }}>
                <ThemeSwitcher />
              </div>
              <div className="flex items-center" style={{ height: '40px' }}>
                <LanguageSwitcher />
              </div>
            </div>

            <Link
              href={`/${locale}/contact`}
              className="hidden sm:flex items-center justify-center px-5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 whitespace-nowrap"
              style={{ height: '40px' }}
            >
              {t('nav.tryNow')}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6 transition-transform duration-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {!mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="glass border-t border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div className="container-custom py-6 space-y-2">
              {navItems.map((item) => {
                const linkClass = cn(
                  'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50',
                  'hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  item.section && activeSection === item.section && 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950'
                );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={linkClass}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="block mt-4 px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-center text-sm font-medium shadow-md transition-all"
              >
                {t('nav.tryNow')}
              </Link>

              <div className="pt-6 mt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {t('ui.theme')}
                    </span>
                    <ThemeSwitcher />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {t('ui.language')}
                    </span>
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
