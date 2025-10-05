import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface FooterSectionProps {
  locale: string;
}

export default async function FooterSection({ locale }: FooterSectionProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  return (
    <footer className="bg-light-100 dark:bg-dark-900 border-t border-light-300 dark:border-dark-700 text-light-700 dark:text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 公司信息 */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo_dark.png" alt="TeGo Logo" className="h-8 w-auto hidden dark:block" />
              <img src="/images/logo_light.png" alt="TeGo Logo" className="h-8 w-auto dark:hidden" />
              <h3 className="text-xl font-bold">{t('companyName')}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('companyDescription')}</p>
            <div className="mt-6 flex space-x-4">
              
              <a href="https://github.com/zhama-ai" className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-accent-400 transition duration-150 ease-in-out">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 产品 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent-400">{t('products')}</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('home.hero.title')}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('enterprise')}</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('api')}</a></li>
            </ul>
          </div>

          {/* 支持 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent-400">{t('support')}</h3>
            <ul className="space-y-3">
              <li><a href="https://docs.zhama.com.cn/architecture/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('helpCenter')}</a></li>
              <li><a href="https://docs.zhama.com.cn/requirements/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('tutorials')}</a></li>
              <li><a href="https://docs.zhama.com.cn/faq/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{t('faq')}</a></li>
              <li><Link href={`/${locale}/contact`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{tc('contactUs')}</Link></li>
            </ul>
          </div>

          {/* 公司 */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-accent-400">{tn('about')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{tc('privacyPolicy')}</Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition duration-150 ease-in-out">{tc('termsOfService')}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light-300 dark:border-dark-700">
          <div className="flex flex-col md:flex-row justify-start items-center">
            <p className="text-light-600 dark:text-dark-400 text-sm">
              {t('copyright')}
            </p>
            {t('icp') && (
              <p className="text-light-600 dark:text-dark-400 text-sm mt-4 ml-4 md:mt-0">
                <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{t('icp')}</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
} 