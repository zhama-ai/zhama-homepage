import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Target, Rocket, TrendingDown, Clock } from 'lucide-react';

interface CustomerOutcomesSectionProps {
  locale: string;
}

export default async function CustomerOutcomesSection({ locale }: CustomerOutcomesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.outcomes' });

  const metrics = [
    { key: 'resolution', icon: Target, color: 'text-violet-500' },
    { key: 'ttm', icon: Rocket, color: 'text-emerald-500' },
    { key: 'cost', icon: TrendingDown, color: 'text-amber-500' },
    { key: 'response', icon: Clock, color: 'text-blue-500' },
  ] as const;

  return (
    <section
      id="outcomes"
      className="py-20 md:py-28 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.key}
                className="relative p-7 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300"
              >
                <Icon className={`w-6 h-6 ${m.color} mb-5`} strokeWidth={1.75} />
                <div className="text-4xl md:text-5xl font-bold text-white leading-none mb-3">
                  {t(`metrics.${m.key}.value`)}
                </div>
                <div className="text-sm font-semibold text-zinc-200 mb-2">
                  {t(`metrics.${m.key}.label`)}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {t(`metrics.${m.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-zinc-500 mt-10 max-w-2xl mx-auto">
          {t('footnote')}
        </p>
      </Container>
    </section>
  );
}
