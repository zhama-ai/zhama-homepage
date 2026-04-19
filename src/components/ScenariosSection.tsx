import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Headphones, Globe2, Landmark } from 'lucide-react';

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
      gradient: 'from-violet-600 to-indigo-600',
      cardBg: 'bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/40 dark:to-indigo-950/40',
      iconBg: 'bg-violet-600',
    },
    {
      key: 'crossBorder',
      icon: Globe2,
      gradient: 'from-emerald-600 to-teal-600',
      cardBg: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40',
      iconBg: 'bg-emerald-600',
    },
    {
      key: 'regulated',
      icon: Landmark,
      gradient: 'from-amber-600 to-orange-600',
      cardBg: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40',
      iconBg: 'bg-amber-600',
    },
  ] as const;

  return (
    <section
      id="scenarios"
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

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {scenarios.map((s) => {
            const Icon = s.icon;
            const metrics = t.raw(`items.${s.key}.metrics`) as Metric[];
            return (
              <div
                key={s.key}
                className={`relative rounded-3xl border border-zinc-200 dark:border-zinc-800 ${s.cardBg} p-7 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${s.iconBg} text-white shadow-md`}>
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {t(`items.${s.key}.industry`)}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 leading-snug">
                  {t(`items.${s.key}.title`)}
                </h3>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">
                  {t(`items.${s.key}.description`)}
                </p>

                <div className="mt-6 pt-6 border-t border-zinc-200/70 dark:border-zinc-800/70 grid grid-cols-3 gap-3">
                  {metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className={`text-lg md:text-xl font-bold bg-gradient-to-br ${s.gradient} bg-clip-text text-transparent leading-tight`}>
                        {m.value}
                      </div>
                      <div className="mt-1 text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-tight">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
