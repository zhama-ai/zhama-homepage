import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Container } from './ui/Container';

interface BottomCTASectionProps {
  locale: string;
}

export default async function BottomCTASection({ locale }: BottomCTASectionProps) {
  const t = await getTranslations({ locale, namespace: 'bottomCTA' });

  return (
    <section id="cta" className="py-20 md:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg text-primary-100 leading-relaxed">
            {t('description')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl hover:bg-zinc-50 transition-all duration-300 active:scale-95"
            >
              {t('primaryCTA')}
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 active:scale-95 backdrop-blur-sm"
            >
              {t('secondaryCTA')}
            </Link>
          </div>

          <p className="mt-8 text-sm text-primary-200">
            {t('hint')}
          </p>
        </div>
      </Container>
    </section>
  );
}
