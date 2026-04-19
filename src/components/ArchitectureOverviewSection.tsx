import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import {
  Globe,
  Monitor,
  MessageCircleMore,
  Server,
  Network,
  Boxes,
  User,
  PlugZap,
  Database,
  HardDrive,
  Layers,
  Activity,
} from 'lucide-react';

interface ArchitectureOverviewSectionProps {
  locale: string;
}

const legendKeys = ['server', 'gateway', 's3', 'monitor'] as const;

export default async function ArchitectureOverviewSection({ locale }: ArchitectureOverviewSectionProps) {
  const t = await getTranslations({ locale, namespace: 'v3.architecture' });

  const Box = ({
    icon: Icon,
    label,
    color,
  }: {
    icon: typeof Globe;
    label: string;
    color: string;
  }) => (
    <div className={`px-3 py-2 rounded-lg border ${color} text-xs font-medium flex items-center gap-2`}>
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );

  return (
    <section id="architecture" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-3">
            09 · ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30 p-6 md:p-10">
          <div className="space-y-8">
            {/* Tier 1: Clients */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2 text-center">
                Clients
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Box
                  icon={Globe}
                  label={t('nodes.web')}
                  color="border-blue-200 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200"
                />
                <Box
                  icon={Monitor}
                  label={t('nodes.desktop')}
                  color="border-blue-200 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200"
                />
                <Box
                  icon={MessageCircleMore}
                  label={t('nodes.mini')}
                  color="border-blue-200 dark:border-blue-900/40 bg-blue-50/60 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200"
                />
              </div>
            </div>

            <Arrow />

            {/* Tier 2: Server */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2 text-center">
                Control Plane
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Box
                  icon={Server}
                  label={t('nodes.server')}
                  color="border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200"
                />
                <Box
                  icon={PlugZap}
                  label={t('nodes.channels')}
                  color="border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200"
                />
              </div>
            </div>

            <Arrow />

            {/* Tier 3: Gateway */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2 text-center">
                Gateway
              </div>
              <Box
                icon={Network}
                label={t('nodes.gateway')}
                color="border-violet-200 dark:border-violet-900/40 bg-violet-50/60 dark:bg-violet-950/20 text-violet-800 dark:text-violet-200"
              />
            </div>

            <Arrow />

            {/* Tier 4: Pools */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2 text-center">
                Instance Pools
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <Box
                  icon={Boxes}
                  label={t('nodes.shared')}
                  color="border-sky-200 dark:border-sky-900/40 bg-sky-50/60 dark:bg-sky-950/20 text-sky-800 dark:text-sky-200"
                />
                <Box
                  icon={User}
                  label={t('nodes.perUser')}
                  color="border-violet-200 dark:border-violet-900/40 bg-violet-50/60 dark:bg-violet-950/20 text-violet-800 dark:text-violet-200"
                />
              </div>
            </div>

            <Arrow />

            {/* Tier 5: Storage */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2 text-center">
                Storage & Observability
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Box
                  icon={Database}
                  label={t('nodes.pg')}
                  color="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200"
                />
                <Box
                  icon={Layers}
                  label={t('nodes.redis')}
                  color="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200"
                />
                <Box
                  icon={HardDrive}
                  label={t('nodes.s3')}
                  color="border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200"
                />
                <Box
                  icon={Activity}
                  label={t('nodes.monitor')}
                  color="border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto mt-6">
          {legendKeys.map((key) => (
            <div
              key={key}
              className="px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              {t.raw(`legend.${key}`) as string}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center">
      <svg className="w-4 h-6 text-zinc-300 dark:text-zinc-700" fill="currentColor" viewBox="0 0 16 24">
        <path d="M8 0v18m-5-5l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
