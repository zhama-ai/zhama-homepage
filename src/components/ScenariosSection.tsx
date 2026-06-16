import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Headphones, Globe2, Landmark } from 'lucide-react';
import { SectionHead } from './ui/Section';
import { Card } from './ui/Card';

interface ScenariosSectionProps {
  locale: string;
}

interface Metric {
  label: string;
  value: string;
}

export default async function ScenariosSection({ locale }: ScenariosSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.scenarios' });

  const scenarios = [
    {
      key: 'itSupport',
      icon: Headphones,
    },
    {
      key: 'crossBorder',
      icon: Globe2,
    },
    {
      key: 'regulated',
      icon: Landmark,
    },
  ] as const;

  return (
    <section
      id="scenarios"
      className="py-16 md:py-24 bg-white dark:bg-zinc-900"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s) => {
            const Icon = s.icon;
            const metrics = t.raw(`items.${s.key}.metrics`) as Metric[];
            return (
              <Card key={s.key} hover className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-100">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-200">
                    {t(`items.${s.key}.industry`)}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">
                  {t(`items.${s.key}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`items.${s.key}.description`)}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-zinc-200 pt-5 dark:border-zinc-800 sm:gap-3">
                  {metrics.map((m, i) => (
                    <div key={i} className="min-w-0">
                      <div className="whitespace-nowrap text-base font-bold leading-tight text-zinc-950 dark:text-white sm:text-lg">
                        {m.value}
                      </div>
                      <div className="mt-1 text-[11px] leading-tight text-zinc-500 dark:text-zinc-400">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
