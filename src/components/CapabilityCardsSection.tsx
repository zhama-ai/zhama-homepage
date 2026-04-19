import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import {
  Server,
  Database,
  ShieldCheck,
  LineChart,
  MessageCircleMore,
  Wrench,
  PackageCheck,
  FlaskConical,
} from 'lucide-react';

interface CapabilityCardsSectionProps {
  locale: string;
}

const cards = [
  { key: 'perUser', branch: 'architecture', accent: 'violet', icon: Server },
  { key: 's3', branch: 'architecture', accent: 'violet', icon: Database },
  { key: 'template', branch: 'governance', accent: 'amber', icon: ShieldCheck },
  { key: 'monitor', branch: 'observability', accent: 'emerald', icon: LineChart },
  { key: 'miniChat', branch: 'experience', accent: 'sky', icon: MessageCircleMore },
  { key: 'skills', branch: 'ecosystem', accent: 'rose', icon: Wrench },
  { key: 'build', branch: 'experience', accent: 'sky', icon: PackageCheck },
  { key: 'test', branch: 'ecosystem', accent: 'rose', icon: FlaskConical },
] as const;

const accentMap = {
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950/20',
    border: 'border-violet-200 dark:border-violet-900/40',
    text: 'text-violet-700 dark:text-violet-300',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    chip: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    border: 'border-amber-200 dark:border-amber-900/40',
    text: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    chip: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    border: 'border-emerald-200 dark:border-emerald-900/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    chip: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950/20',
    border: 'border-sky-200 dark:border-sky-900/40',
    text: 'text-sky-700 dark:text-sky-300',
    iconBg: 'bg-sky-100 dark:bg-sky-900/30',
    chip: 'bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/20',
    border: 'border-rose-200 dark:border-rose-900/40',
    text: 'text-rose-700 dark:text-rose-300',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30',
    chip: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300',
  },
} as const;

const branchOrder = ['architecture', 'governance', 'observability', 'experience', 'ecosystem'] as const;
const branchAccents: Record<(typeof branchOrder)[number], keyof typeof accentMap> = {
  architecture: 'violet',
  governance: 'amber',
  observability: 'emerald',
  experience: 'sky',
  ecosystem: 'rose',
};

export default async function CapabilityCardsSection({ locale }: CapabilityCardsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.capabilityCards' });

  return (
    <section id="capabilities" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Mindmap-style five branches */}
        <div className="max-w-5xl mx-auto mb-16 px-4">
          <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4">
            {branchOrder.map((branch) => {
              const acc = accentMap[branchAccents[branch]];
              return (
                <div
                  key={branch}
                  className={`flex flex-col items-center px-3 py-4 rounded-xl border ${acc.border} ${acc.bg}`}
                >
                  <span className={`text-xs font-semibold uppercase tracking-wider ${acc.text}`}>
                    {t(`branches.${branch}`)}
                  </span>
                  <span className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 text-center">
                    {cards
                      .filter((c) => c.branch === branch)
                      .map((c) => t(`cards.${c.key}.name`))
                      .join(' · ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 8 capability cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {cards.map((card) => {
            const acc = accentMap[card.accent];
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${acc.iconBg}`}>
                    <Icon className={`w-5 h-5 ${acc.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                      {t(`cards.${card.key}.name`)}
                    </h3>
                    <span className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${acc.chip}`}>
                      {t(`branches.${card.branch}`)}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {t(`cards.${card.key}.upgrade`)}
                  </p>
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <p className={`text-sm font-semibold ${acc.text} leading-relaxed`}>
                      {t(`cards.${card.key}.value`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
