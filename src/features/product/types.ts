import type { Locale, FeatureItem } from '../../data/types';
export interface CapabilityCopy {
  name: string;
  title: string;
  description: string;
  navigationDescription?: string;
  features: FeatureItem[];
  related: { path: string; label: string }[];
}
export interface CapabilityModule {
  slug: string;
  order: number;
  icon: string;
  copy: Record<Locale, CapabilityCopy>;
}
