import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { Building2, Cloud, Sparkles, Check } from 'lucide-react';
import { SectionHead } from './ui/Section';

interface PrivateDeliverySectionProps {
  locale: string;
}

interface ModeStyle {
  key: 'private' | 'hybrid' | 'saas';
  icon: typeof Building2;
  popular?: boolean;
}

export default async function PrivateDeliverySection({ locale }: PrivateDeliverySectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.delivery' });

  const modes: ModeStyle[] = [
    {
      key: 'private',
      icon: Building2,
      popular: true,
    },
    {
      key: 'hybrid',
      icon: Cloud,
    },
    {
      key: 'saas',
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="delivery"
      className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 md:grid-cols-3">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const features = t.raw(`modes.${mode.key}.features`) as string[];
            return (
              <div
                key={mode.key}
                className="relative flex flex-col rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 sm:p-7"
              >
                {mode.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-md bg-primary-700 px-3 py-1 text-xs font-semibold text-white shadow-md">
                      {t('popularLabel')}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-white">
                    {t(`modes.${mode.key}.title`)}
                  </h3>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`modes.${mode.key}.tagline`)}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-300" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/contact`}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
                >
                  {t(`modes.${mode.key}.cta`)}
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
