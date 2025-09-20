import { getTranslations } from 'next-intl/server';
import FeaturesClient from './FeaturesClient';

interface FeaturesSectionProps {
  locale: string;
}

export default async function FeaturesSection({ locale }: FeaturesSectionProps) {
  const t = await getTranslations({ locale, namespace: 'featuresSection' });

  // 准备所有翻译数据
  const featuresData = {
    title: t('title'),
    subtitle: t('subtitle'),
    tabs: {
      collection: t('tabs.collection'),
      analysis: t('tabs.analysis'),
      organization: t('tabs.organization'),
      gateway: t('tabs.gateway')
    },
    collection: {
      title: t('collection.title'),
      description: t('collection.description'),
      tags: t.raw('collection.tags') as string[]
    },
    analysis: {
      title: t('analysis.title'),
      description: t('analysis.description'),
      tags: t.raw('analysis.tags') as string[]
    },
    organization: {
      title: t('organization.title'),
      description: t('organization.description'),
      tags: t.raw('organization.tags') as string[]
    },
    gateway: {
      title: t('gateway.title'),
      description: t('gateway.description'),
      tags: t.raw('gateway.tags') as string[]
    },
    moreFeatures: {
      title: t('moreFeatures.title'),
      taskManagement: {
        title: t('moreFeatures.taskManagement.title'),
        description: t('moreFeatures.taskManagement.description')
      },
      habitTracking: {
        title: t('moreFeatures.habitTracking.title'),
        description: t('moreFeatures.habitTracking.description')
      },
      financeManagement: {
        title: t('moreFeatures.financeManagement.title'),
        description: t('moreFeatures.financeManagement.description')
      }
    }
  };

  return <FeaturesClient data={featuresData} />;
} 