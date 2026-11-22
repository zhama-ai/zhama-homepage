import type { Locale } from '../../../data/types';
import type { Industry, SolutionModule } from '../types';
import type { IndustrySolutionCopy, IndustrySolutionPresentation } from './types';

interface IndustryDefinition {
  slug: string;
  order: number;
  icon: string;
  names: Record<Locale, string>;
  navigation: SolutionModule['navigation'];
}

function createCopy(definition: IndustryDefinition, locale: Locale, presentation: IndustrySolutionCopy): Industry {
  const zh = locale === 'zh';
  const separator = zh ? '、' : ', ';
  return {
    slug: definition.slug,
    icon: definition.icon,
    name: definition.names[locale],
    tag: definition.names[locale],
    title: presentation.home.title,
    description: presentation.home.value,
    scope: presentation.deployment.body,
    image: 'collaborative-review',
    tasks: presentation.employees.map(employee => ({
      title: employee.role,
      input: presentation.sources.join(separator),
      action: employee.process.join(zh ? '；' : '; '),
      output: employee.outputs.join(separator),
      value: employee.value,
    })),
    story: {
      lines: presentation.hero.lines,
      priorities: presentation.features.map(feature => ({ title: feature.title, body: feature.problem })),
      exhibit: {
        title: presentation.teamTitle,
        request: presentation.home.value,
        sources: presentation.sources,
        columns: zh ? ['业务环节', '作业重点', '交付成果'] : ['Business area', 'Work', 'Deliverable'],
        rows: presentation.features.map((feature, index) => [feature.title, feature.body, presentation.outputs[index]]),
        deliverables: presentation.outputs,
      },
      foundation: presentation.features.map(feature => ({ title: feature.title, body: feature.body })),
    },
  };
}

export function createIndustryModule(definition: IndustryDefinition, presentation: IndustrySolutionPresentation): SolutionModule {
  return {
    slug: definition.slug,
    order: definition.order,
    category: 'industry',
    navigation: definition.navigation,
    copy: {
      zh: createCopy(definition, 'zh', presentation.zh),
      en: createCopy(definition, 'en', presentation.en),
    },
  };
}
