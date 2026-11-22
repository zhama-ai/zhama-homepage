import type { Locale } from '../../../data/types';
import type { HomeIndustry } from '../../../data/home-industries';

export interface IndustryEmployee {
  role: string;
  avatar: string;
  skills: string[];
  process: string[];
  outputs: string[];
  value: string;
}

export interface IndustrySolutionCopy {
  home: HomeIndustry;
  hero: { lines: string[]; background: string };
  sources: string[];
  outputs: string[];
  features: { title: string; problem: string; body: string; value?: string; image?: string; outcomes?: string[] }[];
  reasons?: string[];
  teamTitle: string;
  employees: IndustryEmployee[];
  deployment: { title: string; body: string };
}

export type IndustrySolutionPresentation = Record<Locale, IndustrySolutionCopy>;
