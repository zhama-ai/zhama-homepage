import { createIndustryModule } from '../shared/industry-module';
import { securitiesPresentation } from './page-content';

export default createIndustryModule({
  "slug": "securities",
  "order": 2,
  "icon": "chart",
  "names": {
    "zh": "证券解决方案",
    "en": "Securities"
  },
  "navigation": {
    "zh": {
      "name": "证券",
      "description": "ETF 潜客、专业投研、经营问数",
      "icon": "chart"
    },
    "en": {
      "name": "Securities",
      "description": "ETF prospects, research and business analytics",
      "icon": "chart"
    }
  }
}, securitiesPresentation);
