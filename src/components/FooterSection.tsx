import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from './ui/Container';

interface FooterSectionProps {
  locale: string;
}

export default async function FooterSection({ locale }: FooterSectionProps) {
  const t = await getTranslations({ locale, namespace: 'footer' });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const footerSections = [
    {
      title: t('products'),
      links: [
        { label: t('station'), href: `/${locale}/station` },
        { label: t('digitalAvatar'), href: `/${locale}/#engines` },
        { label: t('lampEngine'), href: `/${locale}/#engines` },
        { label: t('mcpEngine'), href: `/${locale}/#engines` },
        { label: t('governanceEngine'), href: `/${locale}/#engines` },
        { label: t('enterprise'), href: `/${locale}/contact` },
      ],
    },
    {
      title: t('support'),
      links: [
        { label: t('helpCenter'), href: 'https://docs.zhama.com.cn/', external: true },
        { label: t('tutorials'), href: 'https://docs.zhama.com.cn/requirements/', external: true },
        { label: t('faq'), href: 'https://docs.zhama.com.cn/faq/', external: true },
        { label: tc('contactUs'), href: `/${locale}/contact` },
      ],
    },
    {
      title: t('resources'),
      links: [
        { label: t('blog'), href: `/${locale}/blog` },
        { label: t('docs'), href: 'https://docs.zhama.com.cn/', external: true },
        { label: t('community'), href: `/${locale}/#pricing` },
        { label: tc('privacyPolicy'), href: `/${locale}/privacy` },
        { label: tc('termsOfService'), href: `/${locale}/terms` },
      ],
    },
  ];

  return (
    <footer
      id="about"
      className="border-t border-zinc-200 bg-white text-zinc-900 dark:border-white/10 dark:bg-[#07131f] dark:text-zinc-50"
    >
      <Container>
        <div className="grid gap-10 py-14 lg:grid-cols-[1.45fr_0.9fr_0.9fr_0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-12 items-center">
                <Image
                  src="/images/logo_light.png"
                  alt="TeGo Logo"
                  width={120}
                  height={48}
                  className="h-9 w-auto dark:hidden"
                />
                <Image
                  src="/images/logo_dark.png"
                  alt="TeGo Logo"
                  width={120}
                  height={48}
                  className="hidden h-9 w-auto dark:block"
                />
              </span>
            </div>
            <p className="mt-3 max-w-[36ch] text-sm text-zinc-600 dark:text-zinc-400">
              {t('companyDescription')}
            </p>
            <p className="mt-4 max-w-[42ch] text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {t('about')}
            </p>
            <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {t('companyName')}
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {section.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {section.links.map((link, index) => (
                  <li key={`${section.title}-${link.label}-${index}`}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 transition-colors hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-zinc-600 transition-colors hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-white/10 dark:bg-white/5">
            <p className="text-sm font-semibold text-zinc-950 dark:text-white">{tc('contactUs')}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {t('companyDescription')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-200"
            >
              {tc('contactUs')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-200 py-6 text-xs text-zinc-500 dark:border-white/10">
          <span>{t('copyright')}</span>
          {t('icp') ? (
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
            >
              · {t('icp')}
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
