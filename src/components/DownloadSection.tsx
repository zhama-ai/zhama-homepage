import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';
import { Section, SectionHeader } from './ui/Section';
import { Card, CardContent } from './ui/Card';

interface DownloadSectionProps {
  locale: string;
}

const downloadOptions = [
  {
    key: 'enterprise',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    iconBg: (
      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    link: 'https://docs.zhama.com.cn/faq/',
  },
  {
    key: 'docs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    iconBg: (
      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M10 6V5a2 2 0 011-1.732l4-2.267a2 2 0 011.732 0L20 3M10 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2" />
      </svg>
    ),
    link: 'https://docs.zhama.com.cn',
  },
];

export default async function DownloadSection({ locale }: DownloadSectionProps) {
  const t = await getTranslations({ locale, namespace: 'downloadSection' });

  return (
    <Section id="download" className="bg-white dark:bg-zinc-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <Container className="relative z-10">
        <SectionHeader title={t('title')} />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {downloadOptions.map((option) => (
            <Card key={option.key} hover className="group">
              <CardContent className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 rounded-2xl bg-primary-600/10 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600/20 transition-all duration-300 group-hover:scale-110">
                    {option.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  {t(`${option.key}.title`)}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t(`${option.key}.description`)}
                </p>
                
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  {option.iconBg}
                  {t(`${option.key}.button`)}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* 网页版入口 */}
        <div className="mt-12 text-center">
          <a
            href="https://docs.zhama.com.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-50 font-medium border border-zinc-200 dark:border-zinc-700 transition-all duration-300 active:scale-95 group"
          >
            <svg 
              className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            {t('web.button')}
          </a>
        </div>
      </Container>
    </Section>
  );
}
