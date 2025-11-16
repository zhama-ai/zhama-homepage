'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { ChevronRight, Menu, X } from 'lucide-react';

export default function BlogNav() {
  const t = useTranslations();
  const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = () => {
      setMobileMenuOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  if (!mounted) {
    return (
      <nav className="glass border-b border-zinc-200 dark:border-zinc-800 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-9 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav 
      className={cn(
        'glass border-b border-zinc-200 dark:border-zinc-800 fixed top-0 left-0 right-0 z-50 transition-shadow',
        scrolled ? 'shadow-lg' : 'shadow-md'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Breadcrumb Style Navigation */}
          <div className="flex items-center gap-2">
            <Link 
              href={`/${locale}`}
              className={cn(
                'text-base font-medium transition-colors duration-200',
                'text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400'
              )}
            >
              {t('nav.home')}
            </Link>
            
            <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
            
            <Link 
              href={`/${locale}/blog`}
              className="flex items-center gap-2 group"
            >
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200">
                {t('blog.nav.title')}
              </span>
            </Link>
          </div>

          {/* Right side - Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={`/${locale}/blog`}
              className={cn(
                'px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200',
                'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50',
                'hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              {t('blog.nav.allPosts')}
            </Link>
            
            <a
              href="https://docs.zhama.com.cn"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200',
                'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50',
                'hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              {t('nav.docs')}
            </a>

            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700 mx-2" />

            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href={`/${locale}/blog`}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50',
                'hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              {t('blog.nav.allPosts')}
            </Link>
            
            <a
              href="https://docs.zhama.com.cn"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50',
                'hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              {t('nav.docs')}
            </a>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block px-4">
                    {t('ui.theme')}
                  </span>
                  <div className="px-4">
                    <ThemeSwitcher />
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 block px-4">
                    {t('ui.language')}
                  </span>
                  <div className="px-4">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

