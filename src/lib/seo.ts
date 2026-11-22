import type { Locale } from '../data/types';
import type { WebsiteLanguage } from './languages';

export interface SeoImage {
  src: string;
  width?: number;
  height?: number;
  type?: string;
  alt?: string;
}
export interface SeoArticle {
  author: string;
  authorType?: 'Organization' | 'Person';
  published: string;
  modified?: string;
  section?: string;
  tags?: string[];
}
export interface SeoListEntry { name: string; url: string; }
export interface SeoQuestion { question: string; answer: string; }
export interface SeoInput {
  origin: string;
  locale: Locale;
  language: WebsiteLanguage;
  title: string;
  description: string;
  page?: string;
  documentTitle?: string;
  image: SeoImage;
  article?: SeoArticle;
  entries?: SeoListEntry[];
  questions?: SeoQuestion[];
  noindex?: boolean;
}

const languageTags = { zh: 'zh-CN', 'zh-Hant': 'zh-Hant', en: 'en' } as const;
const openGraphLocales = { zh: 'zh_CN', 'zh-Hant': 'zh_TW', en: 'en_US' } as const;
const pageNames = {
  zh: { home: '首页', product: '产品能力', solutions: '行业解决方案', blog: '产品博客' },
  en: { home: 'Home', product: 'Product', solutions: 'Industry solutions', blog: 'Blog' },
};

/** Public verification tokens are emitted only when configured; template values stay out of HTML. */
export function verificationToken(value?: string): string | undefined {
  const token = value?.trim();
  if (!token || /^(?:your[\s_-]|replace[\s_-]|placeholder|todo\b|undefined$|null$)/i.test(token)) return;
  return token;
}

/** Keep JSON data inert even when a title or article string contains HTML syntax. */
export function serializeStructuredData(value: unknown): string {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, character => `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`);
}

export function buildSeo(input: SeoInput) {
  const { locale, language, title, description, image, article, entries, questions, noindex = false } = input;
  const page = (input.page || '').replace(/^\/+|\/+$/g, '');
  const base = new URL(input.origin).origin;
  const absolute = (path: string) => new URL(path, `${base}/`).href;
  const localized = (path = '') => absolute(`/${language}/${path ? `${path}/` : ''}`);
  const canonical = localized(page);
  const subjectTitles: Record<string, string> = locale === 'zh' ? {
    '': 'TeGo 企业 AI 数字员工协作平台｜扎马星辰',
    product: '数字员工产品能力｜TeGo 企业 AI 协作平台',
    ecosystem: '技能插件与系统集成｜TeGo 开放生态',
    enterprise: '私有化部署与企业治理｜TeGo 数字员工平台',
  } : {
    '': 'TeGo | Enterprise AI Digital Employee Platform',
    product: 'Digital Employee Capabilities | TeGo Enterprise AI',
    ecosystem: 'Skills, Plugins and System Integration | TeGo Ecosystem',
    enterprise: 'Private Deployment and Enterprise Governance | TeGo',
  };
  const industryName = locale === 'zh' ? title.replace(/(?:行业)?解决方案\s*$/, '').trim() : title.replace(/\s+(?:industry\s+)?solutions?\s*$/i, '').trim();
  const industryTitle = page.startsWith('solutions/') ? locale === 'zh'
    ? `${page === 'solutions/appliance' ? 'TeGo Station AI 一体机' : `${industryName}数字员工`}解决方案｜TeGo`
    : `${page === 'solutions/appliance' ? 'TeGo Station AI Appliance' : `${industryName} Digital Employee`} Solution | TeGo` : undefined;
  const resolvedTitle = input.documentTitle || subjectTitles[page] || industryTitle || `${title} · TeGo`;
  const organizationId = absolute('/#organization');
  const websiteId = absolute('/#website');
  const webpageId = `${canonical}#webpage`;
  const imageId = `${canonical}#primaryimage`;
  const articleId = `${canonical}#article`;
  const softwareId = absolute('/#tego-os');
  const organizationName = locale === 'zh' ? '深圳市扎马星辰科技有限公司' : 'Shenzhen Zhama Xingchen Technology Co., Ltd.';
  const imageUrl = absolute(image.src);
  const isProductCapability = /^product\/.+/.test(page);
  const pageType = article ? 'WebPage' : page === 'about' ? 'AboutPage' : page === 'contact' ? 'ContactPage'
    : page === 'faq' && questions?.length ? 'FAQPage' : ['blog', 'solutions', 'resources', 'download', 'releases'].includes(page) ? 'CollectionPage' : 'WebPage';
  const organization = {
    '@type': 'Organization', '@id': organizationId,
    name: organizationName, alternateName: 'ZHAMA', url: absolute('/'),
    logo: { '@type': 'ImageObject', url: absolute('/images/zhama-logo_V1.0.webp'), width: 640, height: 125 },
    email: 'business@zhama.com',
    address: {
      '@type': 'PostalAddress', addressCountry: 'CN',
      addressRegion: locale === 'zh' ? '广东省' : 'Guangdong',
      addressLocality: locale === 'zh' ? '深圳市' : 'Shenzhen',
      streetAddress: locale === 'zh' ? '福田区福田中心区深南路4009号华融大厦' : 'Huarong Building, No. 4009 Shennan Road, Futian District',
    },
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'business@zhama.com', url: localized('contact'), availableLanguage: Object.values(languageTags) },
  };
  const graph: Record<string, unknown>[] = [
    organization,
    { '@type': 'WebSite', '@id': websiteId, name: 'TeGo', alternateName: 'TeGo by ZHAMA', url: absolute('/'), inLanguage: Object.values(languageTags), publisher: { '@id': organizationId } },
    { '@type': 'ImageObject', '@id': imageId, url: imageUrl, contentUrl: imageUrl, ...(image.width ? { width: image.width } : {}), ...(image.height ? { height: image.height } : {}), caption: image.alt || title },
  ];
  const webpage: Record<string, unknown> = {
    '@type': pageType, '@id': webpageId, url: canonical, name: resolvedTitle, description,
    inLanguage: languageTags[language], isPartOf: { '@id': websiteId }, publisher: { '@id': organizationId },
    primaryImageOfPage: { '@id': imageId },
  };
  graph.push(webpage);

  // Capability pages already publish one breadcrumb from their visible product hierarchy.
  if (page && !isProductCapability && !noindex) {
    const names = pageNames[locale];
    const ancestors: SeoListEntry[] = [{ name: names.home, url: localized() }];
    if (page.startsWith('solutions/')) ancestors.push({ name: names.solutions, url: localized('solutions') });
    else if (page.startsWith('blog/')) ancestors.push({ name: names.blog, url: localized('blog') });
    ancestors.push({ name: title, url: canonical });
    const breadcrumbId = `${canonical}#breadcrumb`;
    graph.push({ '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: ancestors.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, name: entry.name, item: entry.url })) });
    webpage.breadcrumb = { '@id': breadcrumbId };
  }
  if (article) {
    graph.push({
      '@type': 'BlogPosting', '@id': articleId,
      headline: title, description, image: [imageUrl],
      datePublished: article.published, ...(article.modified ? { dateModified: article.modified } : {}),
      author: { '@type': article.authorType || 'Organization', name: article.author },
      publisher: { '@id': organizationId }, mainEntityOfPage: { '@id': webpageId },
      inLanguage: languageTags[language], ...(article.section ? { articleSection: article.section } : {}),
      ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
    });
    webpage.mainEntity = { '@id': articleId };
  } else if (page === 'product') {
    graph.push({ '@type': 'SoftwareApplication', '@id': softwareId, name: locale === 'zh' ? 'TeGo 数字员工协作平台' : 'TeGo Digital Employee Collaboration Platform', url: canonical, description, applicationCategory: 'BusinessApplication', publisher: { '@id': organizationId } });
    webpage.mainEntity = { '@id': softwareId };
  } else if (page === 'faq' && questions?.length) {
    webpage.mainEntity = questions.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } }));
  } else if (entries?.length) {
    const listId = `${canonical}#items`;
    graph.push({ '@type': 'ItemList', '@id': listId, numberOfItems: entries.length, itemListElement: entries.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, name: entry.name, url: absolute(entry.url) })) });
    webpage.mainEntity = { '@id': listId };
  }

  return {
    canonical, title: resolvedTitle, description, image: { ...image, src: imageUrl, alt: image.alt || title },
    robots: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    openGraphType: article ? 'article' : 'website', openGraphLocale: openGraphLocales[language],
    alternateLocales: Object.entries(openGraphLocales).filter(([key]) => key !== language).map(([,value]) => value),
    languageTag: languageTags[language], organizationName,
    structuredData: noindex ? undefined : { '@context': 'https://schema.org', '@graph': graph },
  };
}
