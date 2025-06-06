'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 dark:bg-dark-700 border-t border-gray-200 dark:border-dark-600 text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 公司信息 */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-6">{t('home.hero.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('home.hero.description')}
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition duration-150 ease-in-out">
                <span className="sr-only">WeChat</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.69 13.09c-.4 0-.73-.33-.73-.73s.33-.73.73-.73.73.33.73.73-.33.73-.73.73m4.15 0c-.4 0-.73-.33-.73-.73s.33-.73.73-.73.73.33.73.73-.33.73-.73.73m4.99 3.38c-.33 0-.59.27-.59.59 0 .27.18.5.45.57l.23.05c.45.09.77.5.77.95 0 .55-.45 1-.99 1-.45 0-.86-.32-.96-.77l-.05-.23c-.09-.45-.5-.77-.95-.77-.33 0-.59-.27-.59-.59 0-.33.27-.59.59-.59.55 0 1 .45 1 .99 0 .45-.32.86-.77.96l-.23.05c.45-.09.77-.5.77-.95 0 .33.27.59.59.59.55 0 1-.45 1-1 0-.45.32-.86.77-.95l.23-.05c.45-.09.77-.5.77-.96 0-.55-.45-1-.99-1zm2.34-6.5c1.56 0 2.83 1.27 2.83 2.83s-1.27 2.83-2.83 2.83-2.83-1.27-2.83-2.83 1.27-2.83 2.83-2.83m0 6.83c2.22 0 4-1.78 4-4s-1.78-4-4-4-4 1.78-4 4 1.78 4 4 4zm-11.09 0c.4 0 .73.33.73.73s-.33.73-.73.73-.73-.33-.73-.73.33-.73.73-.73m.73-2.83c0-.4.33-.73.73-.73s.73.33.73.73-.33.73-.73.73-.73-.33-.73-.73m8-1.85c1.24 0 2.25 1.01 2.25 2.26s-1.01 2.25-2.25 2.25-2.25-1-2.25-2.25 1.01-2.26 2.25-2.26M12 5.5c4.27 0 7.73 2.46 7.73 5.5s-3.46 5.5-7.73 5.5S4.27 14.04 4.27 11 7.73 5.5 12 5.5m0-2c-5.52 0-10 3.36-10 7.5s4.48 7.5 10 7.5 10-3.36 10-7.5S17.52 3.5 12 3.5z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition duration-150 ease-in-out">
                <span className="sr-only">Weibo</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10.9 6.7a4.8 4.8 0 0 0-4.8 4.8c0 .6.1 1.1.3 1.6.1.3.5.4.7.3.3-.1.4-.5.3-.7-.1-.4-.2-.8-.2-1.2a3.5 3.5 0 0 1 3.5-3.6h.4c.3-.1.5-.4.4-.7s-.4-.5-.7-.4h-.1l.2-.1zM6.9 17c1.3 1.3 3.5 1.9 5.5 1.9 3.5 0 5.9-1.7 7-3.2 1.1-1.5 1.3-3.2.6-4.2-.4-.6-1.1-1-2.1-1.1-2.1-.3-4.5 1.1-4.5 1.1s-.3-.5-.9-1.1c-1.1-1-2.5-.9-3-.9-1.7.2-3.4 1.6-3.4 3.4 0 1.8 1.4 3 1.4 3s-.1.2-.3.7c-.2.7-.1 1.5.8 2.4zm7.4-5.8s1.7-1 3.1-.8c.7.1 1 .3 1.1.5.2.3.2 1.1-.5 2.1-.8 1.1-2.6 2.5-5.4 2.5-1.6 0-3.3-.5-4.3-1.3-.3-.3-.5-.6-.6-.9-.1-.3 0-.6.1-.8.1-.2.2-.3.2-.3s-1.3-1-1.3-2.2c0-1.3 1.3-2.1 2.3-2.2.5 0 1.5 0 2.3.6.6.5.9 1 .9 1l1.1.8z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition duration-150 ease-in-out">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 产品 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent-400">{t('footer.products')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('home.hero.title')}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('footer.enterprise')}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('footer.api')}</a></li>
              <li><a href="#download" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('nav.download')}</a></li>
            </ul>
          </div>

          {/* 支持 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent-400">{t('footer.support')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('footer.helpCenter')}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('footer.tutorials')}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('footer.faq')}</a></li>
              <li><a href="mailto:contact@zhama.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('common.contactUs')}</a></li>
            </ul>
          </div>

          {/* 公司 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent-400">{t('nav.about')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('common.privacyPolicy')}</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('common.termsOfService')}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-500">
          <div className="flex flex-col md:flex-row justify-start items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
            {t('footer.icp') && (
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 ml-4 md:mt-0">
                <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{t('footer.icp')}</a> 
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 