import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { ShieldCheck, Crown, ShieldAlert, GitMerge, Database } from 'lucide-react';

interface TemplateGovernanceSectionProps {
  locale: string;
}

const highlightKeys = ['adminOnly', 'interception', 'consistency', 'backfill'] as const;

const highlightIcons = {
  adminOnly: Crown,
  interception: ShieldAlert,
  consistency: GitMerge,
  backfill: Database,
};

export default async function TemplateGovernanceSection({ locale }: TemplateGovernanceSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.templateGovernance' });

  return (
    <section id="template-governance" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400 mb-3">
            03 · GOVERNANCE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Permission diagram */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Admin path */}
              <div className="space-y-3">
                <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-center shadow-md">
                  <div className="flex items-center justify-center gap-2">
                    <Crown className="w-4 h-4" />
                    <span className="font-bold">{t('diagram.admin')}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-amber-600 dark:text-amber-400">
                  <span className="text-xs font-mono">[{t('diagram.writeTemplate')}] ↓</span>
                </div>
                <div className="px-4 py-3 rounded-xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200 text-center font-mono text-sm">
                  <ShieldCheck className="w-4 h-4 inline mr-1" />
                  {t('diagram.template')}
                </div>
                <div className="flex flex-col items-center text-zinc-400">
                  <span className="text-xs font-mono">[{t('diagram.readTemplate')}] ↓</span>
                </div>
                <div className="px-4 py-3 rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-center font-mono text-sm">
                  {t('diagram.runtime')}
                </div>
              </div>

              {/* User path */}
              <div className="space-y-3">
                <div className="px-4 py-3 rounded-xl bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 text-center">
                  <span className="font-bold">{t('diagram.user')}</span>
                </div>
                <div className="flex flex-col items-center text-rose-600 dark:text-rose-400">
                  <span className="text-xs font-mono">[{t('diagram.tryWriteTemplate')}] ↓</span>
                </div>
                <div className="px-4 py-3 rounded-xl border-2 border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200 text-center">
                  <ShieldAlert className="w-4 h-4 inline mr-1" />
                  <span className="font-bold font-mono">{t('diagram.forbidden')}</span>
                </div>
                <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
                  <span className="text-xs font-mono">[{t('diagram.writeRuntime')}] ↓</span>
                </div>
                <div className="px-4 py-3 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200 text-center font-mono text-sm">
                  ✓ {t('diagram.runtime')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 highlights */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {highlightKeys.map((key) => {
            const Icon = highlightIcons[key];
            return (
              <div
                key={key}
                className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 flex-shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {t(`highlights.${key}.title`)}
                  </h3>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {t(`highlights.${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
