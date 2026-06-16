import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Users, Database, ShieldAlert, BarChart3 } from 'lucide-react';
import { SectionHead } from './ui/Section';

interface PainPointsSectionProps {
  locale: string;
}

export default async function PainPointsSection({ locale }: PainPointsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.painPoints' });

  const items = [
    {
      key: 'shared',
      icon: Users,
    },
    {
      key: 'data',
      icon: Database,
    },
    {
      key: 'control',
      icon: ShieldAlert,
    },
    {
      key: 'blackbox',
      icon: BarChart3,
    },
  ] as const;

  return (
    <section id="pain-points" className="py-16 md:py-24 bg-white dark:bg-zinc-900">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <SectionHead title={t('title')} lead={t('subtitle')} className="mb-0" />
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="border-l border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-primary-700 dark:text-primary-200">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <Icon className="h-4 w-4 text-primary-700 dark:text-primary-200" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-zinc-950 dark:text-white">
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {t(`items.${item.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
