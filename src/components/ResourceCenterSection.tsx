import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { BookOpen, FileText, Newspaper, FileCog, ArrowRight } from 'lucide-react';
import { SectionHead } from './ui/Section';
import { Card } from './ui/Card';

interface ResourceCenterSectionProps {
  locale: string;
}

export default async function ResourceCenterSection({ locale }: ResourceCenterSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.resources' });

  const items = [
    {
      key: 'manual',
      icon: BookOpen,
      href: `/${locale}/guide`,
      external: false,
    },
    {
      key: 'whitepaper',
      icon: FileText,
      href: `/${locale}/contact`,
      external: false,
    },
    {
      key: 'blog',
      icon: Newspaper,
      href: `/${locale}/blog`,
      external: false,
    },
    {
      key: 'deploy',
      icon: FileCog,
      href: 'https://docs.zhama.com.cn',
      external: true,
    },
  ] as const;

  return (
    <section
      id="resources"
      className="py-16 md:py-24 bg-white dark:bg-zinc-900"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            const card = (
              <Card hover className="group flex h-full flex-col">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`items.${item.key}.description`)}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors group-hover:text-primary-800 dark:text-primary-200">
                  {t(`items.${item.key}.cta`)}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </div>
              </Card>
            );

            return item.external ? (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {card}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className="block">
                {card}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
