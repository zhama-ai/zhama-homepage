import type { Locale } from '../../data/types';

export interface LandingCopy {
  hero: { lines: string[]; summary: string };
  pain: { title: string; items: string[] };
  concept: { title: string; body: string; labels: string[] };
  features: { icon: string; title: string; body: string }[];
  scenarios: { title: string; body: string; flow: string[] }[];
  benefits: { title: string; body: string }[];
  closing: string;
  related: string[];
}

export type LandingTranslations = Record<Locale, LandingCopy>;
