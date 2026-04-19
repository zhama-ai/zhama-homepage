import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import {
  HeartPulse,
  Users,
  TrendingUp,
  Activity,
  Workflow,
  Zap,
  Database,
  Layers,
} from 'lucide-react';

interface BusinessMonitorSectionProps {
  locale: string;
}

const panelKeys = ['health', 'coverage', 'growth', 'tasks', 'workflow', 'skills'] as const;

const panelMeta: Record<
  (typeof panelKeys)[number],
  { icon: typeof HeartPulse; gradient: string; chip: string }
> = {
  health: {
    icon: HeartPulse,
    gradient: 'from-rose-500/20 to-rose-500/0',
    chip: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
  },
  coverage: {
    icon: Users,
    gradient: 'from-blue-500/20 to-blue-500/0',
    chip: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
  },
  growth: {
    icon: TrendingUp,
    gradient: 'from-emerald-500/20 to-emerald-500/0',
    chip: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  },
  tasks: {
    icon: Activity,
    gradient: 'from-amber-500/20 to-amber-500/0',
    chip: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  },
  workflow: {
    icon: Workflow,
    gradient: 'from-violet-500/20 to-violet-500/0',
    chip: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  },
  skills: {
    icon: Zap,
    gradient: 'from-sky-500/20 to-sky-500/0',
    chip: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300',
  },
};

export default async function BusinessMonitorSection({ locale }: BusinessMonitorSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.businessMonitor' });

  return (
    <section id="business-monitor" className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 mb-3">
            04 · OBSERVABILITY
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

        {/* 6 panels */}
        <div className="max-w-6xl mx-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
              BusinessMonitorSnapshot v1
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {panelKeys.map((key) => {
              const meta = panelMeta[key];
              const Icon = meta.icon;
              return (
                <div
                  key={key}
                  className={`relative overflow-hidden p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br ${meta.gradient}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${meta.chip}`}>
                      panel
                    </span>
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {t(`panels.${key}.name`)}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(`panels.${key}.metrics`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech notes */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mt-8">
          <div className="flex items-start gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t('tech.lru')}
            </p>
          </div>
          <div className="flex items-start gap-3 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t('tech.dual')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
