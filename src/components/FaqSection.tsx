import { getTranslations } from 'next-intl/server';
import { ChevronDown } from 'lucide-react';
import { Container } from './ui/Container';
import { SectionHead } from './ui/Section';
import ExternalLink from './ExternalLink';
import { docsUrl } from '@/lib/external-links';

interface FaqSectionProps {
  locale: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default async function FaqSection({ locale }: FaqSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.faq' });
  const items = t.raw('items') as FaqItem[];
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <section id="faq" className="scroll-mt-20 bg-white py-16 dark:bg-zinc-900 md:py-24">
      <Container className="max-w-4xl">
        <SectionHead title={t('title')} center />
        <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 bg-zinc-50 dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
          {items.map((item, i) => (
            <details key={item.question} className="group px-6 py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-zinc-950 dark:text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <ExternalLink
            href={docsUrl('faq')}
            medium="faq"
            icon
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 dark:text-primary-200"
          >
            {t('docsCta')}
          </ExternalLink>
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
    </section>
  );
}
