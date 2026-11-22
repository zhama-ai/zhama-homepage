import { createIndustryModule } from '../shared/industry-module';
import { generalPresentation } from './page-content';
import type { SolutionModule } from '../types';

const generalModule = createIndustryModule({
  slug: 'general',
  order: 6,
  icon: 'folder',
  names: { zh: '企业通用解决方案', en: 'General business' },
  navigation: undefined,
}, generalPresentation);

export default {
  ...generalModule,
  category: 'general',
} satisfies SolutionModule;
