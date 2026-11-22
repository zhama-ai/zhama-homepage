import type { CapabilityModule } from '../types';
import landing from './landing';

export default {
  slug: "integrations",
  order: 2,
  icon: "plug",
  copy: {
    zh: {
      name: "连接业务系统",
      title: landing.zh.hero.lines.join("，"),
      description: landing.zh.hero.summary,
      navigationDescription: "接入业务系统，回写任务成果",
      features: landing.zh.features,
      related: [{"path": "ecosystem", "label": "了解开放生态"}],
    },
    en: {
      name: "Connect Business Systems",
      title: landing.en.hero.lines.join(" "),
      description: landing.en.hero.summary,
      navigationDescription: "Connect systems and return results",
      features: landing.en.features,
      related: [{"path": "ecosystem", "label": "Explore the open ecosystem"}],
    },
  },
} satisfies CapabilityModule;
