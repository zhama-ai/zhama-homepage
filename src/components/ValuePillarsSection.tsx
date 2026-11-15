import { getTranslations } from 'next-intl/server';
import {
  BadgeCheck,
  BookOpen,
  ClipboardList,
  FileSearch,
  KeyRound,
  Link2,
  ShieldCheck,
  Target,
  UserCheck,
  Boxes,
} from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface ValuePillarsSectionProps {
  locale: string;
}

interface TitledItem {
  title: string;
  description: string;
}

const qualificationIcons = [ClipboardList, KeyRound, UserCheck, FileSearch];
const assetIcons = [ClipboardList, Boxes, BookOpen, Link2, ShieldCheck];

export default async function ValuePillarsSection({ locale }: ValuePillarsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.valuePillars' });
  const items = t.raw('items') as TitledItem[];
  const assets = t.raw('assets.items') as TitledItem[];
  const steps = t.raw('path.steps') as TitledItem[];

  return (
    <section id="value-pillars" className="scroll-mt-20 bg-zinc-50 py-16 dark:bg-zinc-950 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = qualificationIcons[i % qualificationIcons.length];
            return (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-zinc-950 dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-4 rounded-lg border border-primary-200 bg-primary-50 px-6 py-4 dark:border-primary-800/70 dark:bg-primary-950/30">
          <Target className="h-6 w-6 shrink-0 text-primary-700 dark:text-primary-200" aria-hidden="true" />
          <div>
            <span className="font-semibold text-zinc-950 dark:text-white">{t('acceptance.title')}</span>
            <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-300">{t('acceptance.description')}</span>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">{t('assets.title')}</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{t('assets.subtitle')}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {assets.map((asset, i) => {
                const Icon = assetIcons[i % assetIcons.length];
                return (
                  <div
                    key={asset.title}
                    className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-700 dark:text-primary-200" strokeWidth={1.75} aria-hidden="true" />
                    <div>
                      <div className="text-sm font-semibold text-zinc-950 dark:text-white">{asset.title}</div>
                      <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{asset.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-zinc-950 dark:text-white">{t('path.title')}</h3>
            <ol className="mt-5 space-y-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-zinc-950 dark:text-white">{step.title}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{step.description}</div>
                  </div>
                  {i === steps.length - 1 ? (
                    <BadgeCheck className="ml-auto h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
