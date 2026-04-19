import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import {
  User,
  Box,
  Timer,
  Layers3,
  Cpu,
  Activity,
  Lock,
} from 'lucide-react';

interface PerUserIsolationSectionProps {
  locale: string;
}

const highlightKeys = ['container', 'recycle', 'quota', 'capacity', 'heartbeat', 'stale'] as const;

const highlightIcons = {
  container: Box,
  recycle: Timer,
  quota: Layers3,
  capacity: Cpu,
  heartbeat: Activity,
  stale: Lock,
};

export default async function PerUserIsolationSection({ locale }: PerUserIsolationSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.perUserIsolation' });

  return (
    <section id="per-user" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-violet-600 dark:text-violet-400 mb-3">
            01 · per_user
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Pain point */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl border-l-4 border-rose-400 dark:border-rose-500 bg-rose-50/50 dark:bg-rose-950/10 px-6 py-5">
            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <span className="font-semibold text-rose-700 dark:text-rose-400">[v2 痛点 / Pain Point] </span>
              {t('painPoint')}
            </p>
          </div>
        </div>

        {/* Scheduling diagram */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 p-6 md:p-8">
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-6 text-center">
              {t('solution')}
            </p>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Users column */}
              <div className="space-y-3">
                {(['userA', 'userB', 'userC'] as const).map((u, i) => (
                  <div
                    key={u}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i === 0 ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300' :
                      i === 1 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' :
                      'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300'
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {t(`diagram.${u}`)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Scheduler */}
              <div className="flex flex-col items-center">
                <div className="hidden md:flex w-full items-center mb-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-violet-300 dark:to-violet-700" />
                  <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="px-5 py-4 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-600 text-white text-center shadow-lg">
                  <div className="text-xs uppercase tracking-wider opacity-80 mb-1">scheduler</div>
                  <div className="font-bold">{t('diagram.scheduler')}</div>
                </div>
                <div className="hidden md:flex w-full items-center mt-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-violet-300 to-transparent dark:from-violet-700" />
                  <svg className="w-4 h-4 text-violet-400 -scale-x-100" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Containers */}
              <div className="space-y-3">
                {(['containerA', 'containerB', 'containerC'] as const).map((c, i) => (
                  <div
                    key={c}
                    className={`px-4 py-3 rounded-xl border text-xs ${
                      i === 0 ? 'border-violet-200 dark:border-violet-900/40 bg-violet-50 dark:bg-violet-950/20 text-violet-800 dark:text-violet-200' :
                      i === 1 ? 'border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200' :
                      'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <Box className="w-3.5 h-3.5" />
                      <span>{t(`diagram.${c}`)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recycle / wakeup hint */}
            <div className="mt-6 grid md:grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <div className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
                  <Timer className="w-4 h-4" />
                  <span>{t('diagram.recycle')}</span>
                </div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-200">
                  <Activity className="w-4 h-4" />
                  <span>{t('diagram.wakeup')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {highlightKeys.map((key) => {
            const Icon = highlightIcons[key];
            return (
              <div
                key={key}
                className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 flex-shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
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

        {/* Roadmap note */}
        <div className="max-w-4xl mx-auto mt-10 px-5 py-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-semibold">[Roadmap] </span>
            {t('roadmap')}
          </p>
        </div>
      </Container>
    </section>
  );
}
