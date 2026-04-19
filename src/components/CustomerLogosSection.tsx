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
      className="py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {t('title')}
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {industries.map((ind) => {
            const Icon = ICON_MAP[ind.key] || Globe;
            return (
              <div
                key={ind.key}
                className="flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-sm transition-all duration-300"
              >
                <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" strokeWidth={1.5} />
                <span className="text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 text-center leading-tight">
                  {ind.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-zinc-500 dark:text-zinc-500 mt-10 max-w-2xl mx-auto leading-relaxed">
          {t('footnote')}
        </p>
      </Container>
    </section>
  );
}
