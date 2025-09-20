import { getTranslations } from 'next-intl/server';
import AboutUsClient from './AboutUsClient';

interface AboutUsSectionProps {
  locale: string;
}

export default async function AboutUsSection({ locale }: AboutUsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'aboutSection' });

  // 准备所有翻译数据
  const aboutData = {
    title: t('title'),
    subtitle: t('subtitle'),
    description: t('description'),
    vision: {
      title: t('vision.title'),
      paragraphs: t.raw('vision.paragraphs') as string[]
    },
    features: t.raw('features') as Array<{title: string, description: string}>,
    footer: {
      prefix: t('footer.prefix'),
      suffix: t('footer.suffix')
    },
    typingPhrases: t.raw('typingPhrases') as string[]
  };

  return <AboutUsClient data={aboutData} />;
} 