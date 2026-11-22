import { createIndustryModule } from '../shared/industry-module';
import { governmentPresentation } from './page-content';

export default createIndustryModule({
  slug: 'government',
  order: 3,
  icon: 'landmark',
  names: { zh: '政务解决方案', en: 'Government' },
  navigation: {
    zh: { name: '数字政务', description: '政策有据、工单接续、公文督办减负提效', icon: 'landmark' },
    en: { name: 'Digital government', description: 'Cited policies, connected cases and less administrative work', icon: 'landmark' },
  },
}, governmentPresentation);
