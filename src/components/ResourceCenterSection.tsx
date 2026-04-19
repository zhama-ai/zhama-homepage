import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { BookOpen, FileText, Newspaper, FileCog, ArrowRight } from 'lucide-react';

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
      iconColor: 'text-violet-500',
      iconBg: 'bg-violet-50 dark:bg-violet-950/40',
    },
    {
      key: 'whitepaper',
      icon: FileText,
      href: `/${locale}/contact`,
      external: false,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      key: 'blog',
      icon: Newspaper,
      href: `/${locale}/blog`,
      external: false,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      key: 'deploy',
      icon: FileCog,
      href: 'https://docs.zhama.com.cn',
      external: true,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    },
  ] as const;

  return (
    <section
      id="resources"
      className="py-20 md:py-28 bg-white dark:bg-zinc-950"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const card = (
              <div className="h-full p-7 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all duration-300 group flex flex-col">
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${item.iconBg} ${item.iconColor} mb-5`}>
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2.5">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1 mb-5">
                  {t(`items.${item.key}.description`)}
                </p>
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all">
                  {t(`items.${item.key}.cta`)}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </div>
              </div>
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
