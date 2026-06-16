import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Target, Rocket, TrendingDown, Clock } from 'lucide-react';
import { SectionHead } from './ui/Section';

interface CustomerOutcomesSectionProps {
  locale: string;
}

export default async function CustomerOutcomesSection({ locale }: CustomerOutcomesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.outcomes' });

  const metrics = [
    { key: 'resolution', icon: Target },
    { key: 'ttm', icon: Rocket },
    { key: 'cost', icon: TrendingDown },
    { key: 'response', icon: Clock },
  ] as const;

  return (
    <section
      id="outcomes"
      className="py-16 md:py-24 bg-[#07131f] text-zinc-50 dark:bg-[#07131f]"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center dark />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.key}
                className="border-t border-white/10 pt-5"
              >
                <Icon className="h-6 w-6 text-accent-300" strokeWidth={1.75} />
                <div className="mt-5 text-4xl font-bold leading-none text-white md:text-5xl">
                  {t(`metrics.${m.key}.value`)}
                </div>
                <div className="mt-3 text-sm font-semibold text-zinc-200">
                  {t(`metrics.${m.key}.label`)}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {t(`metrics.${m.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-zinc-500">
          {t('footnote')}
        </p>
      </Container>
    </section>
  );
}
