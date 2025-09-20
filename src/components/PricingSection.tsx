import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface PricingSectionProps {
  locale: string;
}

export default async function PricingSection({ locale }: PricingSectionProps) {
  const t = await getTranslations({ locale, namespace: 'pricingSection' });

  const communityFeatures = t.raw('community.features') as string[];
  const subscriptionFeatures = t.raw('subscription.features') as string[];
  const enterpriseFeatures = t.raw('enterprise.features') as string[];

  return (
    <section id="pricing" className="section bg-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-40"></div>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-light-700 dark:text-white">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg text-light-600 dark:text-dark-400">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gridTemplateRows: '1fr' }}>
          {/* 社区版 */}
          <article className="card group flex flex-col">
            {/* 固定高度顶部区域 */}
            <div className="p-6 lg:p-8" style={{ minHeight: '180px' }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_8px_#34d399]"></span>
                {t('community.badge')}
              </span>
              <h3 className="name text-xl font-extrabold mt-3 text-light-700 dark:text-white leading-tight">
                {t('community.name')}
              </h3>
              <p className="lead text-sm text-light-700 dark:text-white/90 font-semibold mt-2">
                {t('community.lead')}
              </p>
              <p className="desc text-xs text-light-600 dark:text-dark-400 mt-1">
                {t('community.desc')}
              </p>
            </div>
            
            {/* 自适应中间区域 */}
            <div className="border-t border-light-200/60 dark:border-dark-700/60" />
            <div className="p-6 lg:p-8 flex-grow">
              <h4 className="text-sm font-semibold tracking-wide text-light-700/80 dark:text-white/80 mb-3">
                {t('community.featuresTitle')}
              </h4>
              <ul className="space-y-2">
                {communityFeatures.map((item, idx) => (
                  <li key={idx} className="grid grid-cols-[20px_1fr] gap-3 text-sm text-light-700 dark:text-gray-200">
                    <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-emerald-50">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 固定高度底部区域 */}
            <div className="border-t border-light-200/60 dark:border-dark-700/60" />
            <div className="p-6 lg:p-6 flex items-center justify-between" style={{ minHeight: '100px' }}>
              <div>
                <div className="text-2xl font-black tracking-tight text-light-700 dark:text-white">
                  {t('community.price')}
                </div>
                <div className="text-sm text-muted">
                  {t('community.period')}
                </div>
              </div>
              <Link href={`/${locale}/contact`} className="btn btn-outline px-6 py-3 rounded-2xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-500 hover:text-white dark:hover:text-white transition-all min-w-[120px] text-center">
                {t('community.cta')}
              </Link>
            </div>
          </article>

          {/* 订阅版 */}
          <article className="card group flex flex-col relative overflow-hidden">
            <div className="absolute z-10" style={{ right: '-44px', top: '16px', transform: 'rotate(40deg)' }}>
              <div
                className="text-center font-bold text-white border border-white/20"
                style={{
                  width: '160px',
                  padding: '6px 0',
                  fontSize: '11px',
                  letterSpacing: '.5px',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #f97316, #ea580c, #dc2626)',
                  boxShadow: '0 8px 25px rgba(249,115,22,.3), 0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {t('subscription.ribbon')}
              </div>
            </div>
            
            {/* 固定高度顶部区域 */}
            <div className="p-6 lg:p-8" style={{ minHeight: '180px' }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                {t('subscription.badge')}
              </span>
              <h3 className="name text-xl font-extrabold mt-3 text-light-700 dark:text-white leading-tight">
                {t('subscription.name')}
              </h3>
              <p className="lead text-sm text-light-700 dark:text-white/90 font-semibold mt-2">
                {t('subscription.lead')}
              </p>
              <p className="desc text-xs text-light-600 dark:text-dark-400 mt-1">
                {t('subscription.desc')}
              </p>
            </div>
            
            {/* 自适应中间区域 */}
            <div className="border-t border-light-200/60 dark:border-dark-700/60" />
            <div className="p-6 lg:p-8 flex-grow">
              <h4 className="text-sm font-semibold tracking-wide text-light-700/80 dark:text-white/80 mb-3">
                {t('subscription.featuresTitle')}
              </h4>
              <ul className="space-y-2">
                {subscriptionFeatures.map((item, idx) => (
                  <li key={idx} className="grid grid-cols-[20px_1fr] gap-3 text-sm text-light-700 dark:text-gray-200">
                    <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-emerald-50">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 固定高度底部区域 */}
            <div className="border-t border-light-200/60 dark:border-dark-700/60" />
            <div className="p-6 lg:p-6 flex items-center justify-between" style={{ minHeight: '100px' }}>
              <div>
                <div className="text-2xl font-black tracking-tight text-light-700 dark:text-white">
                  {t('subscription.price')}
                </div>
                <div className="text-sm text-muted">
                  {t('subscription.period')}
                </div>
              </div>
              <Link href={`/${locale}/contact`} className="btn btn-primary px-6 py-3 rounded-2xl min-w-[120px] text-center">
                {t('subscription.cta')}
              </Link>
            </div>
          </article>

          {/* 企业版 */}
          <article className="card group flex flex-col relative overflow-hidden">
            <div className="absolute z-10" style={{ right: '-44px', top: '16px', transform: 'rotate(40deg)' }}>
              <div
                className="text-center font-bold text-white border border-white/20"
                style={{
                  width: '160px',
                  padding: '6px 0',
                  fontSize: '11px',
                  letterSpacing: '.5px',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #f97316, #ea580c, #dc2626)',
                  boxShadow: '0 8px 25px rgba(249,115,22,.3), 0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {t('enterprise.ribbon')}
              </div>
            </div>
            
            {/* 固定高度顶部区域 */}
            <div className="p-6 lg:p-8" style={{ minHeight: '180px' }}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-extrabold bg-rose-100 text-rose-900 border border-rose-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                {t('enterprise.badge')}
              </span>
              <h3 className="name text-xl font-extrabold mt-3 text-light-700 dark:text-white leading-tight">
                {t('enterprise.name')}
              </h3>
              <p className="lead text-sm text-light-700 dark:text-white/90 font-semibold mt-2">
                {t('enterprise.lead')}
              </p>
              <p className="desc text-xs text-light-600 dark:text-dark-400 mt-1">
                {t('enterprise.desc')}
              </p>
            </div>
            
            {/* 自适应中间区域 */}
            <div className="border-t border-light-200/60 dark:border-dark-700/60" />
            <div className="p-6 lg:p-8 flex-grow">
              <h4 className="text-sm font-semibold tracking-wide text-light-700/80 dark:text-white/80 mb-3">
                {t('enterprise.featuresTitle')}
              </h4>
              <ul className="space-y-2">
                {enterpriseFeatures.map((item, idx) => (
                  <li key={idx} className="grid grid-cols-[20px_1fr] gap-3 text-sm text-light-700 dark:text-gray-200">
                    <span className="inline-grid place-items-center w-5 h-5 rounded-full bg-emerald-50">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* 固定高度底部区域 */}
            <div className="border-t border-light-200/60 dark:border-dark-700/60" />
            <div className="p-6 lg:p-6 flex items-center justify-between" style={{ minHeight: '100px' }}>
              <div>
                <div className="text-2xl font-black tracking-tight text-light-700 dark:text-white">
                  {t('enterprise.price')}
                </div>
                <div className="text-sm text-muted">
                  {t('enterprise.period')}
                </div>
              </div>
              <Link href={`/${locale}/contact`} className="btn btn-primary px-6 py-3 rounded-2xl min-w-[120px] text-center">
                {t('enterprise.cta')}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}


