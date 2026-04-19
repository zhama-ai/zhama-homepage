import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { AlertTriangle } from 'lucide-react';

interface UpgradeMigrationSectionProps {
  locale: string;
}

const stepKeys = ['1', '2', '3', '4', '5'] as const;
const breakingKeys = ['1', '2', '3', '4', '5', '6'] as const;

export default async function UpgradeMigrationSection({ locale }: UpgradeMigrationSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.upgradeMigration' });

  return (
    <section id="upgrade" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-3">
            10 · UPGRADE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Steps */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 md:p-8">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm">
                ✓
              </span>
              {t('stepsTitle')}
            </h3>
            <ol className="space-y-3">
              {stepKeys.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex-shrink-0 mt-0.5">
                    {step}
                  </span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {t(`steps.${step}`)}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Breaking changes */}
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/10 p-6 md:p-8">
            <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-5 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              {t('breakingTitle')}
            </h3>
            <ul className="space-y-3">
              {breakingKeys.map((key) => (
                <li key={key} className="flex items-start gap-2.5">
                  <span className="text-amber-500 dark:text-amber-400 flex-shrink-0 mt-1">⚠</span>
                  <span className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                    {t(`breaking.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
