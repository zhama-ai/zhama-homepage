const ZHAMA_AI = 'https://zhama.ai';

export type CloudLinkMedium =
  | 'header'
  | 'hero'
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
