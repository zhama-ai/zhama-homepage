import { createIndustryModule } from '../shared/industry-module';
import { trustPresentation } from './page-content';

export default createIndustryModule({
  "slug": "trust",
  "order": 5,
  "icon": "layers",
  "names": {
    "zh": "信托解决方案",
    "en": "Trust services"
  },
  "navigation": {
    "zh": {
      "name": "信托",
      "description": "资产服务、合同核对、运营报送",
      "icon": "layers"
    },
    "en": {
      "name": "Trust services",
      "description": "Asset services, agreement checks and reporting",
      "icon": "layers"
    }
  }
}, trustPresentation);
