import type { CapabilityModule } from '../types';
import landing from './landing';

export default {
  slug: "digital-employees",
  order: 0,
  icon: "network",
  copy: {
    zh: {
      name: "岗位数字员工",
      title: landing.zh.hero.lines.join("，"),
      description: landing.zh.hero.summary,
      navigationDescription: "按岗位配置，招募数字员工",
      features: landing.zh.features,
      related: [{"path": "product", "label": "查看平台能力"}],
    },
    en: {
      name: "Digital Employees for Business Roles",
      title: landing.en.hero.lines.join(" "),
      description: landing.en.hero.summary,
      navigationDescription: "Configure and recruit by role",
      features: landing.en.features,
      related: [{"path": "product", "label": "Explore the platform"}],
    },
  },
} satisfies CapabilityModule;
