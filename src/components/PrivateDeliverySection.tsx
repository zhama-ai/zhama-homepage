import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { Building2, Cloud, Sparkles, Check } from 'lucide-react';

interface PrivateDeliverySectionProps {
  locale: string;
}

interface ModeStyle {
  key: 'private' | 'hybrid' | 'saas';
  icon: typeof Building2;
  popular?: boolean;
  cardBg: string;
  border: string;
  buttonClass: string;
}

export default async function PrivateDeliverySection({ locale }: PrivateDeliverySectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.delivery' });

  const modes: ModeStyle[] = [
    {
      key: 'private',
      icon: Building2,
      popular: true,
      cardBg: 'bg-gradient-to-b from-primary-50 to-white dark:from-primary-950/40 dark:to-zinc-950',
      border: 'border-primary-300 dark:border-primary-700',
      buttonClass: 'bg-primary-600 hover:bg-primary-700 text-white',
    },
    {
      key: 'hybrid',
      icon: Cloud,
      cardBg: 'bg-white dark:bg-zinc-950',
      border: 'border-zinc-200 dark:border-zinc-800',
      buttonClass: 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900',
    },
    {
      key: 'saas',
      icon: Sparkles,
      cardBg: 'bg-white dark:bg-zinc-950',
      border: 'border-zinc-200 dark:border-zinc-800',
      buttonClass: 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900',
    },
  ];

  return (
    <section
      id="delivery"
      className="py-20 md:py-28 bg-white dark:bg-zinc-950"
    >
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const features = t.raw(`modes.${mode.key}.features`) as string[];
            return (
              <div
                key={mode.key}
                className={`relative rounded-3xl border-2 ${mode.border} ${mode.cardBg} p-7 md:p-8 flex flex-col hover:shadow-xl transition-all duration-300`}
              >
                {mode.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-semibold shadow-md">
                      {t('popularLabel')}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md">
                    <Icon className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {t(`modes.${mode.key}.title`)}
                  </h3>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                  {t(`modes.${mode.key}.tagline`)}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      <Check className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${locale}/contact`}
                  className={`inline-flex items-center justify-center w-full px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95 ${mode.buttonClass}`}
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
