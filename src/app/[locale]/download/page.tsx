import type { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import DownloadClient from '@/components/DownloadClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const messages = await getMessages({ locale }) as any;
  const downloadSeo = messages?.downloadPage?.seo || {};

  return {
    title: downloadSeo.title || (locale === 'zh' 
      ? '下载体验 - TeGo AI智能体操作系统' 
      : 'Download & Experience - TeGo AI Agent Platform'),
    description: downloadSeo.description || (locale === 'zh' 
      ? 'TeGo AI智能体操作系统下载与体验页面。'
      : 'TeGo AI Agent Platform download and experience page.'),
    keywords: downloadSeo.keywords || (locale === 'zh'
      ? 'TeGo下载, 智能体平台体验, 企业AI演示'
      : 'TeGo download, AI agent platform experience, enterprise AI demo'),
    openGraph: {
      title: downloadSeo.openGraph?.title || downloadSeo.title,
      description: downloadSeo.openGraph?.description || downloadSeo.description,
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title: downloadSeo.title,
      description: downloadSeo.description
    }
  };
}

export default async function DownloadPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main>
        <DownloadClient />
      </main>
      <FooterSection locale={locale} />
    </div>
  );
} 