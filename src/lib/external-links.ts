const ZHAMA_AI = 'https://zhama.ai';

export type CloudLinkMedium =
  | 'header'
  | 'hero'
  | 'team_pack'
  | 'audience_split'
  | 'delivery'
  | 'pricing'
  | 'cloud_page'
  | 'footer';

export function cloudUrl(medium: CloudLinkMedium, locale: string, path = '/') {
  const url = new URL(path, ZHAMA_AI);
  url.searchParams.set('utm_source', 'zhama.com');
  url.searchParams.set('utm_medium', medium);
  url.searchParams.set('utm_campaign', 'cloud_handoff');
  url.searchParams.set('lang', locale);
  return url.toString();
}

export const DOCS_URL = 'https://docs.zhama.com.cn';

/** Deep links into the TeGo documentation center (Chinese only). */
export const DOCS_PATHS = {
  home: '/',
  quickStart: '/product-manual/getting-started',
  productGuide: '/product-guide/',
  manual: '/product-manual/',
  bestPractices: '/product-manual/best-practices/',
  poc: '/product-manual/poc',
  deploy: '/ops-deployment/',
  requirements: '/ops-deployment/deployment/requirements',
  downloads: '/api-support/downloads',
  videos: '/api-support/videos/',
  faq: '/api-support/troubleshooting/',
  support: '/api-support/support/contact',
  releaseNotes: '/release-notes/',
  docDownloads: '/document-downloads/',
} as const;

export type DocsPage = keyof typeof DOCS_PATHS;

export function docsUrl(page: DocsPage = 'home') {
  return new URL(DOCS_PATHS[page], DOCS_URL).toString();
}
