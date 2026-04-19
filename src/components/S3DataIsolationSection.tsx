import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { KeyRound, Network, Layers, RefreshCw } from 'lucide-react';

interface S3DataIsolationSectionProps {
  locale: string;
}

const layoutRows = ['template', 'shared', 'perUser'] as const;
const highlightKeys = ['jwt', 'rewrite', 'fallback', 'reset'] as const;

const highlightIcons = {
  jwt: KeyRound,
  rewrite: Network,
  fallback: Layers,
  reset: RefreshCw,
};

const rowAccents = {
  template: 'border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/20',
  shared: 'border-blue-300 dark:border-blue-700 bg-blue-50/60 dark:bg-blue-950/20',
  perUser: 'border-violet-300 dark:border-violet-700 bg-violet-50/60 dark:bg-violet-950/20',
};

const rowLabel = {
  template: 'template/',
  shared: 'shared/',
  perUser: 'per-user/',
};

export default async function S3DataIsolationSection({ locale }: S3DataIsolationSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.s3Isolation' });

  return (
    <section id="s3-isolation" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-3">
            02 · S3 ISOLATION
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* S3 layout */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-5">
              {t('layout.title')}
            </p>
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              {layoutRows.map((row) => (
                <div
                  key={row}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-3 px-4 py-3 rounded-xl border ${rowAccents[row]}`}
                >
                  <div className="md:col-span-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-zinc-900/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 font-semibold">
                      {rowLabel[row]}
                    </span>
                  </div>
                  <div className="md:col-span-4 text-zinc-800 dark:text-zinc-200">
                    {t.raw(`layout.rows.${row}.path`) as string}
                  </div>
                  <div className="md:col-span-5 text-zinc-600 dark:text-zinc-400 font-sans">
                    {t.raw(`layout.rows.${row}.comment`) as string}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 highlights */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-10">
          {highlightKeys.map((key) => {
            const Icon = highlightIcons[key];
            return (
              <div
                key={key}
                className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex-shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {t(`highlights.${key}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t.raw(`highlights.${key}.description`) as string}
                </p>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto px-5 py-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-400 dark:border-emerald-500">
          <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
            {t('value')}
          </p>
        </div>
      </Container>
    </section>
  );
}
