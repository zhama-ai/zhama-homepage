import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { UserCheck, Lock, Eye, Sparkles } from 'lucide-react';

interface ValuePillarsSectionProps {
  locale: string;
}

export default async function ValuePillarsSection({ locale }: ValuePillarsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.valuePillars' });

  const pillars = [
    {
      key: 'dedicated',
      icon: UserCheck,
      gradient: 'from-violet-500 to-indigo-500',
      tagBg: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300',
    },
    {
      key: 'ownership',
      icon: Lock,
      gradient: 'from-blue-500 to-cyan-500',
      tagBg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300',
    },
    {
      key: 'governance',
      icon: Eye,
      gradient: 'from-amber-500 to-orange-500',
      tagBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300',
    },
    {
      key: 'ready',
      icon: Sparkles,
      gradient: 'from-emerald-500 to-teal-500',
      tagBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
    },
  ] as const;

  return (
    <section
      id="value-pillars"
      className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-900"
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
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.key}
                className="relative p-7 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden"
              >
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${p.gradient} opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`} />

                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-md mb-5`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>

                <span className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${p.tagBg} mb-3`}>
                  {t(`pillars.${p.key}.tag`)}
                </span>

                <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 leading-snug">
                  {t(`pillars.${p.key}.title`)}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`pillars.${p.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
