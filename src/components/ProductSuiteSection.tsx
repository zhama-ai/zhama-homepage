import { getTranslations } from 'next-intl/server';
import ProductSuiteClient from './ProductSuiteClient';

interface ProductSuiteSectionProps {
  locale: string;
}

export default async function ProductSuiteSection({ locale }: ProductSuiteSectionProps) {
  const t = await getTranslations({ locale, namespace: 'productSuite' });

  // 准备所有翻译数据
  const productData = {
    title: t('title'),
    subtitle: t('subtitle'),
    desktop: {
      title: t('desktop.title'),
      description: t('desktop.description'),
      features: t.raw('desktop.features') as string[],
      cta: t('desktop.cta'),
    },
    web: {
      title: t('web.title'),
      description: t('web.description'),
      features: t.raw('web.features') as string[],
      cta: t('web.cta'),
    },
    office: {
      title: t('office.title'),
      description: t('office.description'),
      features: t.raw('office.features') as string[],
      cta: t('office.cta'),
    },
    capabilities: {
      title: t('capabilities.title'),
      subtitle: t('capabilities.subtitle'),
      a2ui: {
        title: t('capabilities.a2ui.title'),
        description: t('capabilities.a2ui.description'),
        tags: t.raw('capabilities.a2ui.tags') as string[],
      },
      skills: {
        title: t('capabilities.skills.title'),
        description: t('capabilities.skills.description'),
        tags: t.raw('capabilities.skills.tags') as string[],
      },
    },
    footer: {
      text: t('footer.text'),
      link: t('footer.link'),
    },
  };

  return <ProductSuiteClient data={productData} locale={locale} />;
}
