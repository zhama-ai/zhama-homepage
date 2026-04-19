import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface WatershedSectionProps {
  locale: string;
}

const itemKeys = ['concurrency', 'isolation', 'governance', 'observability'] as const;

const itemAccents: Record<(typeof itemKeys)[number], { dot: string; ring: string }> = {
  concurrency: { dot: 'bg-violet-500', ring: 'ring-violet-200 dark:ring-violet-900/50' },
  isolation: { dot: 'bg-blue-500', ring: 'ring-blue-200 dark:ring-blue-900/50' },
  governance: { dot: 'bg-amber-500', ring: 'ring-amber-200 dark:ring-amber-900/50' },
  observability: { dot: 'bg-emerald-500', ring: 'ring-emerald-200 dark:ring-emerald-900/50' },
};

export default async function WatershedSection({ locale }: WatershedSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.watershed' });

  return (
    <section id="watershed" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="hidden md:grid grid-cols-12 gap-0 bg-zinc-100 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800">
            <div className="col-span-3 px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300" />
            <div className="col-span-4 px-6 py-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              {t('vBefore')}
            </div>
            <div className="col-span-5 px-6 py-4 text-sm font-semibold text-primary-700 dark:text-primary-300 bg-primary-50/50 dark:bg-primary-950/20">
              {t('vAfter')}
            </div>
          </div>

          {itemKeys.map((key, idx) => {
            const accent = itemAccents[key];
            return (
              <div
                key={key}
                className={`grid grid-cols-1 md:grid-cols-12 gap-0 ${
                  idx !== itemKeys.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800/80' : ''
                }`}
              >
                <div className="col-span-3 px-6 py-5 flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 md:bg-transparent md:dark:bg-transparent">
                  <span className={`w-2 h-2 rounded-full ${accent.dot} ring-4 ${accent.ring}`} />
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {t(`items.${key}.dimension`)}
                  </h3>
                </div>
                <div className="col-span-4 px-6 py-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <span className="md:hidden block text-xs font-semibold text-zinc-500 dark:text-zinc-500 mb-1">
                    {t('vBefore')}
                  </span>
                  <span className="line-through decoration-zinc-300 dark:decoration-zinc-700 decoration-1">
                    {t(`items.${key}.before`)}
                  </span>
                </div>
                <div className="col-span-5 px-6 py-5 text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed bg-primary-50/30 dark:bg-primary-950/10 font-medium">
                  <span className="md:hidden block text-xs font-semibold text-primary-700 dark:text-primary-300 mb-1">
                    {t('vAfter')}
                  </span>
                  {t(`items.${key}.after`)}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
