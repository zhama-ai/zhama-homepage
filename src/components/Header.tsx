'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Cloud, Menu, Server, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cloudFirst } from '@/lib/audience';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import CloudLink from './CloudLink';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);
  const productMenuRef = useRef<HTMLDivElement>(null);
  const isCloudFirst = cloudFirst(locale);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!productMenuRef.current?.contains(event.target as Node)) {
        setProductMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProductMenuOpen(false);
    };
    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sectionIds = [
      'home',
      'choose',
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
    { href: `/${locale}/#scenarios`, label: t('nav.biz.solutions'), section: 'scenarios' },
    { href: `/${locale}/#customers`, label: t('nav.biz.customers'), section: 'customers' },
    { href: `/${locale}/#delivery`, label: t('nav.biz.delivery'), section: 'delivery' },
    { href: `/${locale}/#pricing`, label: t('nav.pricing'), section: 'pricing' },
    { href: `/${locale}/#resources`, label: t('nav.biz.resources'), section: 'resources' },
    { href: `/${locale}/blog`, label: t('nav.blog') },
  ];

  const productItems = [
    {
      href: `/${locale}/#value-pillars`,
      label: t('nav.enterpriseProduct'),
      description: t('nav.biz.value'),
      icon: Server,
    },
    {
      href: `/${locale}/station`,
      label: t('nav.station'),
      description: locale === 'zh' ? '软硬一体，私有部署' : 'Private AI appliance',
      icon: Zap,
    },
    {
      href: `/${locale}/cloud`,
      label: t('nav.cloud'),
      description: locale === 'zh' ? '注册即用，$0 起步' : 'Self-serve SaaS from $0',
      icon: Cloud,
      live: true,
    },
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
              <div ref={productMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProductMenuOpen((open) => !open)}
                  aria-expanded={productMenuOpen}
                  aria-haspopup="menu"
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white',
                    productMenuOpen && 'bg-zinc-100 text-zinc-950 dark:bg-white/10 dark:text-white',
                  )}
                >
                  {t('nav.product')}
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform', productMenuOpen && 'rotate-180')}
                  />
                </button>

                {productMenuOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-[calc(100%+0.65rem)] w-80 overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-[#0b1b2a]"
                  >
                    {productItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setProductMenuOpen(false)}
                          className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-white/10"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2 text-sm font-semibold text-zinc-950 dark:text-white">
                              {item.label}
                              {item.live && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  {t('nav.cloudLive')}
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">
                              {item.description}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

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

            <div className="hidden items-center gap-2 sm:flex">
              {isCloudFirst ? (
                <>
                  <Link
                    href={`/${locale}/contact`}
                    className="hidden rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 xl:inline-flex"
                  >
                    {t('nav.tryNow')}
                  </Link>
                  <CloudLink
                    medium="header"
                    locale={locale}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
                  >
                    {t('nav.startFree')}
                    <ArrowRight className="h-4 w-4" />
                  </CloudLink>
                </>
              ) : (
                <>
                  <CloudLink
                    medium="header"
                    locale={locale}
                    className="hidden rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 xl:inline-flex"
                  >
                    {t('nav.startFree')}
                  </CloudLink>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
                  >
                    {t('nav.tryNow')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>

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
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t('nav.product')}
            </p>
            {productItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 text-primary-700 dark:text-primary-200" />
                  <span className="text-sm font-semibold">{item.label}</span>
                  {item.live && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {t('nav.cloudLive')}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="my-2 h-px bg-zinc-200 dark:bg-white/10" />

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

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {isCloudFirst ? (
                <>
                  <CloudLink
                    medium="header"
                    locale={locale}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-800"
                  >
                    {t('nav.startFree')}
                    <ArrowRight className="h-4 w-4" />
                  </CloudLink>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white"
                  >
                    {t('nav.tryNow')}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-800"
                  >
                    {t('nav.tryNow')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <CloudLink
                    medium="header"
                    locale={locale}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:text-white"
                  >
                    {t('nav.startFree')}
                  </CloudLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
