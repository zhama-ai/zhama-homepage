import type { CapabilityModule } from '../types';
import landing from './landing';

export default {
  slug: "knowledge",
  order: 4,
  icon: "book",
  copy: {
    zh: {
      name: "企业知识进入工作",
      title: landing.zh.hero.lines.join("，"),
      description: landing.zh.hero.summary,
      navigationDescription: "按权限检索，结论可溯源",
      features: landing.zh.features,
      related: [{"path": "ecosystem", "label": "了解开放生态"}],
    },
    en: {
      name: "Enterprise Knowledge at Work",
      title: landing.en.hero.lines.join(" "),
      description: landing.en.hero.summary,
      navigationDescription: "Search with permission and citations",
      features: landing.en.features,
      related: [{"path": "ecosystem", "label": "Explore the open ecosystem"}],
    },
  },
} satisfies CapabilityModule;
