import type { CapabilityModule } from '../types';
import landing from './landing';

export default {
  slug: "collaboration",
  order: 3,
  icon: "folder",
  copy: {
    zh: {
      name: "项目协作与交付",
      title: landing.zh.hero.lines.join("，"),
      description: landing.zh.hero.summary,
      navigationDescription: "围绕项目协作，成果交人审阅",
      features: landing.zh.features,
      related: [{"path": "product", "label": "查看平台能力"}],
    },
    en: {
      name: "Project Collaboration & Delivery",
      title: landing.en.hero.lines.join(" "),
      description: landing.en.hero.summary,
      navigationDescription: "Collaborate, review and deliver",
      features: landing.en.features,
      related: [{"path": "product", "label": "Explore the platform"}],
    },
  },
} satisfies CapabilityModule;
