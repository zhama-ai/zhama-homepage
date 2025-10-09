import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';

interface FooterSectionProps {
  locale: string;
}

export default async function FooterSection({ locale }: FooterSectionProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tc = await getTranslations({ locale, namespace: 'common' });
  const tn = await getTranslations({ locale, namespace: 'nav' });

  const footerSections = [
    {
      title: t('products'),
      links: [
        { label: t('home.hero.title'), href: '#' },
        { label: t('enterprise'), href: '#' },
        { label: t('api'), href: '#' },
      ],
    },
    {
      title: t('support'),
      links: [
        { label: t('helpCenter'), href: 'https://docs.zhama.com.cn/architecture/', external: true },
        { label: t('tutorials'), href: 'https://docs.zhama.com.cn/requirements/', external: true },
        { label: t('faq'), href: 'https://docs.zhama.com.cn/faq/', external: true },
        { label: tc('contactUs'), href: `/${locale}/contact` },
      ],
    },
    {
      title: tn('about'),
      links: [
        { label: tc('privacyPolicy'), href: `/${locale}/privacy` },
        { label: tc('termsOfService'), href: `/${locale}/terms` },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 公司信息 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo_light.png" alt="TeGo Logo" className="h-8 w-auto dark:hidden" />
              <img src="/images/logo_dark.png" alt="TeGo Logo" className="h-8 w-auto hidden dark:block" />
              <h3 className="text-xl font-bold">{t('companyName')}</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t('companyDescription')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/zhama-ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 dark:text-zinc-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer 链接列 */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-primary-600 dark:text-primary-400">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${link.label}-${index}`}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row justify-start items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <p>{t('copyright')}</p>
            {t('icp') && (
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                {t('icp')}
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
