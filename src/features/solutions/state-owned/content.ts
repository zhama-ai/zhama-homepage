import { createIndustryModule } from '../shared/industry-module';
import { stateOwnedPresentation } from './page-content';

export default createIndustryModule({
  slug: 'state-owned',
  order: 4,
  icon: 'buildings',
  names: { zh: '央国企解决方案', en: 'State-owned enterprises' },
  navigation: {
    zh: { name: '央国企', description: '经营看得清、任务落得下、集团方法规模复用', icon: 'buildings' },
    en: { name: 'State-owned enterprises', description: 'Clearer performance, frontline execution and reusable group methods', icon: 'buildings' },
  },
}, stateOwnedPresentation);
