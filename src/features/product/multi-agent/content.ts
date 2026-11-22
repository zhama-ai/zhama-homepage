import type { CapabilityModule } from '../types';
import landing from './landing';

export default {
  slug: "multi-agent",
  order: 1,
  icon: "layers",
  copy: {
    zh: {
      name: "多 Agent 协作",
      title: landing.zh.hero.lines.join("，"),
      description: landing.zh.hero.summary,
      navigationDescription: "主 Agent 编排，专业分工交付",
      features: landing.zh.features,
      related: [{"path": "product", "label": "查看平台能力"}],
    },
    en: {
      name: "Multi-Agent Collaboration",
      title: landing.en.hero.lines.join(" "),
      description: landing.en.hero.summary,
      navigationDescription: "Delegate, coordinate, deliver",
      features: landing.en.features,
      related: [{"path": "product", "label": "Explore the platform"}],
    },
  },
} satisfies CapabilityModule;
