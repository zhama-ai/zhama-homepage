import type { SolutionModule } from './types';
const modules = import.meta.glob<{ default: SolutionModule }>('./*/content.ts', { eager: true });
export const solutionModules = Object.values(modules).map(module => module.default).sort((a, b) => a.order - b.order);
