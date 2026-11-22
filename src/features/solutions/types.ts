import type { Locale } from '../../data/types';
export interface OutcomeExhibit {
  title: string;
  request: string;
  sources: string[];
  columns: string[];
  rows: string[][];
  deliverables: string[];
}
export interface SolutionStory {
  lines: string[];
  priorities: { title: string; body: string }[];
  exhibit: OutcomeExhibit;
  foundation: { title: string; body: string }[];
}
export interface Industry {
  slug: string; icon: string; name: string; tag: string; title: string; description: string;
  scope: string; image: string;
  tasks: { title: string; input: string; action: string; output: string; problem?: string; value?: string }[];
  story?: SolutionStory;
}
export interface SolutionModule {
  slug: string;
  order: number;
  category: 'industry' | 'general' | 'deployment';
  navigation?: Record<Locale, { name: string; description: string; icon: string }>;
  copy: Record<Locale, Industry>;
}
