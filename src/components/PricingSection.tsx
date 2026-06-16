import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';

interface PricingSectionProps {
  locale: string;
}

const pricingPlans = [
  {
    key: 'community',
    badge: 'badge',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    ribbon: false,
  },
  {
    key: 'subscription',
    badge: 'badge',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    ribbon: true,
  },
  {
    key: 'enterprise',
    badge: 'badge',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-200',
    ribbon: true,
  },
];

export default async function PricingSection({ locale }: PricingSectionProps) {
  const t = await getTranslations({ locale, namespace: 'pricingSection' });

  const getPlanFeatures = (planKey: string) => {
    return t.raw(`${planKey}.features`) as string[];
  };

  return (
    <section id="pricing" className="bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.key} hover className="relative flex flex-col overflow-hidden p-0">
              {plan.ribbon && (
                <div className="absolute -right-8 top-7 rotate-45 z-10">
                  <div className="bg-accent-500 px-10 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md">
                    {t(`${plan.key}.ribbon`)}
                  </div>
                </div>
              )}

              <CardHeader>
                <span className="inline-flex items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-800 dark:border-primary-800 dark:bg-primary-950/40 dark:text-primary-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                  {t(`${plan.key}.${plan.badge}`)}
                </span>
                <h3 className="mt-4 text-xl font-bold text-zinc-950 dark:text-white">
                  {t(`${plan.key}.name`)}
                </h3>
                <p className="mt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {t(`${plan.key}.lead`)}
                </p>
                <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                  {t(`${plan.key}.desc`)}
                </p>
              </CardHeader>

              <CardContent className="flex-grow">
                <h4 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {t(`${plan.key}.featuresTitle`)}
                </h4>
                <ul className="space-y-3">
                  {getPlanFeatures(plan.key).map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-950/60">
                        <svg viewBox="0 0 24 24" className="h-3 w-3 text-primary-700 dark:text-primary-200" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-zinc-950 dark:text-white">
                    {t(`${plan.key}.price`)}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t(`${plan.key}.period`)}
                  </div>
                </div>
                <Link 
                  href={`/${locale}/contact`}
                  className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 active:scale-95 ${
                    plan.key === 'community'
                      ? 'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800'
                      : 'bg-primary-700 text-white shadow-md shadow-primary-950/10 hover:bg-primary-800 hover:shadow-lg'
                  }`}
                >
                  {t(`${plan.key}.cta`)}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
