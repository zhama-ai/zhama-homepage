'use client';

import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contactSection.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('contactSection.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="tech-card p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contactSection.business.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('contactSection.business.description')}
            </p>
            <a href="mailto:business@zhama.com" className="text-accent-500 hover:text-accent-600 font-medium">
              business@zhama.com
            </a>
          </div>

          <div className="tech-card p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contactSection.support.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('contactSection.support.description')}
            </p>
            <a href="mailto:support@zhama.com" className="text-accent-500 hover:text-accent-600 font-medium">
              support@zhama.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 