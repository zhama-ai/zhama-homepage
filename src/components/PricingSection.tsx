import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';
import { Section, SectionHeader } from './ui/Section';
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
    <Section id="pricing" className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <Container className="relative z-10">
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card key={plan.key} className="relative flex flex-col overflow-hidden">
              {/* Ribbon */}
              {plan.ribbon && (
                <div className="absolute -right-8 top-7 rotate-45 z-10">
                  <div className="px-10 py-1 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold uppercase tracking-wider shadow-md">
                    {t(`${plan.key}.ribbon`)}
                  </div>
                </div>
              )}
              
              {/* Header */}
              <CardHeader>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold ${plan.badgeColor}`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  {t(`${plan.key}.${plan.badge}`)}
                </span>
                <h3 className="text-xl font-bold mt-4 text-zinc-900 dark:text-zinc-50">
                  {t(`${plan.key}.name`)}
                </h3>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-2">
                  {t(`${plan.key}.lead`)}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  {t(`${plan.key}.desc`)}
                </p>
              </CardHeader>
              
              {/* Content */}
              <CardContent className="flex-grow">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4">
                  {t(`${plan.key}.featuresTitle`)}
                </h4>
                <ul className="space-y-3">
                  {getPlanFeatures(plan.key).map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              {/* Footer */}
              <CardFooter className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    {t(`${plan.key}.price`)}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t(`${plan.key}.period`)}
                  </div>
                </div>
                <Link 
                  href={`/${locale}/contact`}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 active:scale-95 ${
                    plan.key === 'community'
                      ? 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  {t(`${plan.key}.cta`)}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
