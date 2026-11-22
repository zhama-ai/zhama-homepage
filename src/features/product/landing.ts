import type { LandingTranslations } from './landing-types';

const modules = import.meta.glob<{ default: LandingTranslations }>('./*/landing.ts', { eager: true });
export const capabilityLandings = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [path.split('/')[1], module.default]),
) as Record<string, LandingTranslations>;
