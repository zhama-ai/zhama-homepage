import type { Locale } from '../../data/types';

export type ExperienceKind = 'roster' | 'execution' | 'connections' | 'document' | 'knowledge' | 'governance';

export interface ExperienceSection {
  id: string;
  kind: ExperienceKind;
  title: string;
  body: string;
  points: { title: string; body: string }[];
  visual: {
    title: string;
    context: string;
    tabs: string[];
    request: string;
    response: string;
    columns: string[];
    rows: string[][];
    focus: { label: string; title: string; body: string };
    files: string[];
  };
}

export interface ProductExperience {
  heroAlt: string;
  sectionTitle: string;
  sections: ExperienceSection[];
}

export type ProductExperienceTranslations = Record<Locale, ProductExperience>;
