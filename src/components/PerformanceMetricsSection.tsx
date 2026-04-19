import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import {
  Package,
  HardDrive,
  Zap,
  Database,
  Cpu,
  ScrollText,
  Boxes,
} from 'lucide-react';

interface PerformanceMetricsSectionProps {
  locale: string;
}

const itemKeys = ['build', 'baseImage', 'ci', 'monitor', 'memory', 'chat', 'pnpm'] as const;

const itemMeta: Record<
  (typeof itemKeys)[number],
  { icon: typeof Package; accent: string }
> = {
  build: { icon: Package, accent: 'text-violet-600 dark:text-violet-400' },
  baseImage: { icon: HardDrive, accent: 'text-blue-600 dark:text-blue-400' },
  ci: { icon: Zap, accent: 'text-amber-600 dark:text-amber-400' },
  monitor: { icon: Database, accent: 'text-emerald-600 dark:text-emerald-400' },
  memory: { icon: Cpu, accent: 'text-rose-600 dark:text-rose-400' },
  chat: { icon: ScrollText, accent: 'text-sky-600 dark:text-sky-400' },
  pnpm: { icon: Boxes, accent: 'text-zinc-600 dark:text-zinc-400' },
};

export default async function PerformanceMetricsSection({ locale }: PerformanceMetricsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.performanceMetrics' });

  return (
    <section id="performance" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-3">
            08 · PERFORMANCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          {/* Header (md+) */}
          <div className="hidden md:grid grid-cols-12 gap-0 bg-zinc-100 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
            <div className="col-span-5 px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('tableHeaders.dimension')}
            </div>
            <div className="col-span-7 px-6 py-4 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('tableHeaders.improvement')}
            </div>
          </div>

          {itemKeys.map((key, idx) => {
            const meta = itemMeta[key];
            const Icon = meta.icon;
            return (
              <div
                key={key}
                className={`grid grid-cols-1 md:grid-cols-12 gap-0 ${
                  idx !== itemKeys.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800/80' : ''
                }`}
              >
                <div className="col-span-5 px-6 py-4 flex items-center gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 ${meta.accent}`} />
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                    {t(`items.${key}.dimension`)}
                  </span>
                </div>
                <div className="col-span-7 px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`items.${key}.improvement`)}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
