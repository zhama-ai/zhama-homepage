import { getTranslations } from 'next-intl/server';

export default async function TermsOfService({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('terms');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <main className="animate-fadeIn py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('title')}</h1>
            <p className="text-gray-500 dark:text-gray-400">{t('lastUpdated')}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 leading-relaxed">
            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.acceptance.title')}</h2>
              <p className="mb-4">{t('sections.acceptance.content')}</p>
              <p>{t('sections.acceptance.content2')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.service.title')}</h2>
              <p className="mb-4">{t('sections.service.content')}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {t.raw('sections.service.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{t('sections.service.modification')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.account.title')}</h2>
              <p className="mb-4">{t('sections.account.content')}</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {t.raw('sections.account.promises').map((promise: string, index: number) => (
                  <li key={index}>{promise}</li>
                ))}
              </ul>
              <p className="mb-4">{t('sections.account.restrictions')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.account.restrictionItems').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.conduct.title')}</h2>
              <p className="mb-4">{t('sections.conduct.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.conduct.prohibited').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.ip.title')}</h2>
              <p className="mb-4">{t('sections.ip.content')}</p>
              <p>{t('sections.ip.userContent')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.disclaimer.title')}</h2>
              <p className="mb-4">{t('sections.disclaimer.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.disclaimer.reasons').map((reason: string, index: number) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.changes.title')}</h2>
              <p>{t('sections.changes.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.disputes.title')}</h2>
              <p>{t('sections.disputes.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.contact.title')}</h2>
              <p className="mb-4">{t('sections.contact.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.contact.methods').map((method: string, index: number) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}