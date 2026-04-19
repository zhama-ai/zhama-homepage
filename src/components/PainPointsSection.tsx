import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Users, Database, ShieldAlert, BarChart3 } from 'lucide-react';

interface PainPointsSectionProps {
  locale: string;
}

export default async function PainPointsSection({ locale }: PainPointsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.painPoints' });

  const items = [
    {
      key: 'shared',
      icon: Users,
      color: 'text-rose-600 dark:text-rose-300',
      bg: 'bg-rose-50 dark:bg-rose-950/30',
      border: 'border-rose-200/70 dark:border-rose-900/60',
      iconBg: 'bg-rose-100 dark:bg-rose-900/40',
    },
    {
      key: 'data',
      icon: Database,
      color: 'text-amber-600 dark:text-amber-300',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-200/70 dark:border-amber-900/60',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    },
    {
      key: 'control',
      icon: ShieldAlert,
      color: 'text-orange-600 dark:text-orange-300',
      bg: 'bg-orange-50 dark:bg-orange-950/30',
      border: 'border-orange-200/70 dark:border-orange-900/60',
      iconBg: 'bg-orange-100 dark:bg-orange-900/40',
    },
    {
      key: 'blackbox',
      icon: BarChart3,
      color: 'text-zinc-700 dark:text-zinc-300',
      bg: 'bg-zinc-50 dark:bg-zinc-900/40',
      border: 'border-zinc-200 dark:border-zinc-800',
      iconBg: 'bg-zinc-100 dark:bg-zinc-800',
    },
  ] as const;

  return (
    <section id="pain-points" className="py-20 md:py-28 bg-white dark:bg-zinc-950">
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
            return (
              <div
                key={item.key}
                className={`relative p-6 rounded-2xl border ${item.border} ${item.bg} transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${item.iconBg} ${item.color} mb-5`}>
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2.5">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`items.${item.key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
