import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import {
  Globe,
  ShoppingBag,
  Server,
  Landmark,
  Banknote,
  Factory,
} from 'lucide-react';
import { SectionHead } from './ui/Section';

interface CustomerLogosSectionProps {
  locale: string;
}

interface IndustryItem {
  key: string;
  label: string;
}

const ICON_MAP: Record<string, typeof Globe> = {
  internet: Globe,
  ecommerce: ShoppingBag,
  itServices: Server,
  government: Landmark,
  finance: Banknote,
  manufacturing: Factory,
};

export default async function CustomerLogosSection({ locale }: CustomerLogosSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.logos' });
  const industries = t.raw('industries') as IndustryItem[];

  return (
    <section
      id="customers"
      className="border-y border-zinc-200 bg-zinc-50 py-16 dark:border-white/10 dark:bg-zinc-950 md:py-24"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((ind) => {
            const Icon = ICON_MAP[ind.key] || Globe;
            return (
              <div
                key={ind.key}
                className="flex flex-col items-center justify-center gap-2.5 bg-white p-5 transition-colors hover:bg-zinc-50 dark:bg-[#07131f] dark:hover:bg-white/5"
              >
                <Icon className="h-6 w-6 text-primary-700 dark:text-primary-200" strokeWidth={1.5} />
                <span className="text-center text-xs font-medium leading-tight text-zinc-700 dark:text-zinc-300 md:text-sm">
                  {ind.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
          {t('footnote')}
        </p>
      </Container>
    </section>
  );
}
