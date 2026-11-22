import type { CapabilityModule } from './types';
const modules = import.meta.glob<{ default: CapabilityModule }>('./*/content.ts', { eager: true });
export const capabilities = Object.values(modules).map(module => module.default).sort((a, b) => a.order - b.order);
