import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, ClipboardList, FileSearch, KeyRound, Server, UserCheck } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';

interface TrustSectionProps {
  locale: string;
}

interface TrustItem {
  title: string;
  description: string;
}

const icons = [ClipboardList, KeyRound, UserCheck, FileSearch];

export default async function TrustSection({ locale }: TrustSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.trust' });
  const items = t.raw('items') as TrustItem[];
  const deployPoints = t.raw('deploy.points') as string[];

  return (
    <section id="trust" className="scroll-mt-20 bg-[#07131f] py-16 text-zinc-50 md:py-24">
      <Container>
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} lead={t('subtitle')} dark center />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10 text-sky-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-6 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-400/10 text-accent-300">
              <Server className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-white">{t('deploy.title')}</h3>
              <ul className="mt-3 space-y-1.5">
                {deployPoints.map((point) => (
                  <li key={point} className="text-sm leading-6 text-zinc-300">
                    · {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href={`/${locale}/technical#technology`}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10 lg:self-center"
          >
            {t('techLink')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
