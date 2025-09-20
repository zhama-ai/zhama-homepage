import { getTranslations } from 'next-intl/server';

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('privacy');

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
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.introduction.title')}</h2>
              <p className="mb-4">{t('sections.introduction.content')}</p>
              <p>{t('sections.introduction.content2')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.collection.title')}</h2>
              <p className="mb-4">{t('sections.collection.content')}</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {t.raw('sections.collection.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong>
                    {item.content}
                  </li>
                ))}
              </ul>
              <p className="mb-4">{t('sections.collection.usageIntro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.collection.usageItems').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.sharing.title')}</h2>
              <p className="mb-4">{t('sections.sharing.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.sharing.items').map((item: any, index: number) => (
                  <li key={index}>
                    <strong>{item.title}</strong>
                    {item.content}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.security.title')}</h2>
              <p>{t('sections.security.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.retention.title')}</h2>
              <p className="mb-4">{t('sections.retention.content')}</p>
              <p>{t('sections.retention.content2')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.rights.title')}</h2>
              <p className="mb-4">{t('sections.rights.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.rights.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.children.title')}</h2>
              <p>{t('sections.children.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.changes.title')}</h2>
              <p>{t('sections.changes.content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('sections.contact.title')}</h2>
              <p className="mb-4">{t('sections.contact.content')}</p>
              <ul className="list-disc pl-6 space-y-2">
                {t.raw('sections.contact.items').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('sections.contact.response')}</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}