export type Locale = 'zh' | 'en';
export type DetailPageId = 'product' | 'solutions' | 'ecosystem' | 'enterprise';
export interface FeatureItem { icon: string; title: string; body: string }
export interface PageSection { id: string; eyebrow: string; title: string; body: string; items: FeatureItem[] }
export interface DetailPage { eyebrow: string; title: string; description: string; sections: PageSection[] }
export interface FaqItem { question: string; answer: string }
