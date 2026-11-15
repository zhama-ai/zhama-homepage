import { getTranslations } from 'next-intl/server';
import {
  Brain,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  Fingerprint,
  Network,
  ShieldAlert,
  ShieldCheck,
  Workflow,
  Wrench,
} from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface CoreTechnologySectionProps {
  locale: string;
}

interface TechItem {
  label: string;
  title: string;
  description: string;
  points: string[];
  value: string;
}

interface TitledItem {
  title: string;
  description: string;
}

const techIcons = [Fingerprint, Network, ShieldCheck];
const stepIcons = [FileText, Brain, Wrench, FileCheck2, ShieldAlert, ShieldCheck];

export default async function CoreTechnologySection({ locale }: CoreTechnologySectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.coreTech' });
  const items = t.raw('items') as TechItem[];
  const replaySteps = t.raw('replay.steps') as string[];
  const replayPoints = t.raw('replay.points') as TitledItem[];

  return (
    <section id="technology" className="scroll-mt-20 bg-[#07131f] py-16 text-zinc-50 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} dark />

        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = techIcons[i % techIcons.length];
            return (
              <article
                key={item.title}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">{item.label}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10 text-sky-200">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-300">{item.description}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-6 text-zinc-200">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-300" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-accent-300">{item.value}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-semibold text-white">
                <Workflow className="h-5 w-5 text-sky-300" aria-hidden="true" />
                {t('replay.title')}
              </h3>
              <p className="mt-2 text-sm text-zinc-300">{t('replay.subtitle')}</p>
            </div>
          </div>

          <ol className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {replaySteps.map((step, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <li
                  key={step}
                  className="relative flex items-center gap-2 rounded-lg border border-sky-400/20 bg-sky-400/[0.06] px-3 py-3 text-sm font-medium text-sky-50"
                >
                  <Icon className="h-4 w-4 shrink-0 text-sky-300" aria-hidden="true" />
                  <span className="min-w-0">{step}</span>
                  {i < replaySteps.length - 1 ? (
                    <ChevronRight className="absolute -right-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-sky-400/60 lg:block" aria-hidden="true" />
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {replayPoints.map((point) => (
              <div key={point.title} className="rounded-lg bg-white/[0.04] p-4">
                <div className="text-sm font-semibold text-white">{point.title}</div>
                <div className="mt-1 text-sm text-zinc-400">{point.description}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
