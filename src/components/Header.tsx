'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setScrolled(window.scrollY > 8);
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
    { href: `/${locale}/download`, label: t('nav.download') },
    { href: `/${locale}/blog`, label: t('nav.blog') },
    { href: `/${locale}/#resources`, label: t('nav.biz.resources'), section: 'resources' },
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-zinc-200/70 bg-white/90 backdrop-blur-xl transition-shadow dark:border-white/10 dark:bg-[#07131f]/90',
        scrolled ? 'shadow-lg shadow-zinc-950/5' : 'shadow-none',
      )}
    >
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <div className="flex min-w-0 items-center gap-8">
            <Link href={`/${locale}`} className="flex shrink-0 items-center">
              <span className="flex h-12 items-center">
                <Image
                  src="/images/logo_light.png"
                  alt="TeGo Logo"
                  width={160}
                  height={64}
                  className="h-10 w-auto dark:hidden sm:h-11 lg:h-12"
                  priority
                />
                <Image
                  src="/images/logo_dark.png"
                  alt="TeGo Logo"
                  width={160}
                  height={64}
                  className="hidden h-10 w-auto dark:block sm:h-11 lg:h-12"
                  priority
                />
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const linkClass = cn(
                  'whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white',
                  item.section &&
                    activeSection === item.section &&
                    'bg-zinc-100 text-primary-700 dark:bg-white/10 dark:text-primary-200',
                );

                return (
                  <Link key={item.href} href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />

            <Link
              href={`/${locale}/contact`}
              className="hidden items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95 sm:flex"
            >
              {t('nav.tryNow')}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#07131f]/95 lg:hidden">
          <nav className="container-custom flex flex-col gap-1 py-4">
            {navItems.map((item) => {
              const linkClass = cn(
                'rounded-lg px-3 py-2.5 text-base font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white',
                item.section &&
                  activeSection === item.section &&
                  'bg-zinc-100 text-primary-700 dark:bg-white/10 dark:text-primary-200',
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
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-800"
            >
              {t('nav.tryNow')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
