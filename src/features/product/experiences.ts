import type { ProductExperienceTranslations } from './experience-types';

const modules = import.meta.glob<{ default: ProductExperienceTranslations }>('./*/experience.ts', { eager: true });
export const productExperiences = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [path.split('/')[1], module.default]),
) as Record<string, ProductExperienceTranslations>;
