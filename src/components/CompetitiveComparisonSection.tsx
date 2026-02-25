import { Fragment } from 'react';
import { getTranslations } from 'next-intl/server';
import { Container } from './ui/Container';

interface CompetitiveComparisonSectionProps {
  locale: string;
}

type SupportLevel = 'full' | 'partial' | 'none' | 'basic';

interface ComparisonRow {
  labelKey: string;
  tego: SupportLevel;
  dify: SupportLevel;
  coze: SupportLevel;
  chatgptTeams: SupportLevel;
}

const comparisonData: { categoryKey: string; rows: ComparisonRow[] }[] = [
  {
    categoryKey: 'avatar',
    rows: [
      { labelKey: 'digitalAvatar', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'personalAvatar', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'orgAvatar', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
    ],
  },
  {
    categoryKey: 'enterprise',
    rows: [
      { labelKey: 'multiTenant', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'resourceQuota', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'lifecycle', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'configManagement', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
    ],
  },
  {
    categoryKey: 'ecosystem',
    rows: [
      { labelKey: 'skillHotReload', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'agentSkills', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'a2ui', tego: 'full', dify: 'none', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'channels', tego: 'full', dify: 'none', coze: 'partial', chatgptTeams: 'none' },
    ],
  },
  {
    categoryKey: 'deployment',
    rows: [
      { labelKey: 'privateDeploy', tego: 'full', dify: 'full', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'rbac', tego: 'full', dify: 'basic', coze: 'none', chatgptTeams: 'none' },
      { labelKey: 'audit', tego: 'full', dify: 'basic', coze: 'none', chatgptTeams: 'none' },
    ],
  },
];

const supportStyles: Record<SupportLevel, { bg: string; text: string }> = {
  full: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
  partial: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' },
  basic: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' },
  none: { bg: 'bg-zinc-100 dark:bg-zinc-800', text: 'text-zinc-400 dark:text-zinc-500' },
};

export default async function CompetitiveComparisonSection({ locale }: CompetitiveComparisonSectionProps) {
  const t = await getTranslations({ locale, namespace: 'competitiveComparison' });

  const competitors = ['tego', 'dify', 'coze', 'chatgptTeams'] as const;

  return (
    <section id="comparison" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-3 text-xl font-medium text-primary-600 dark:text-primary-400">
            {t('subtitle')}
          </p>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 w-[30%]" />
                {competitors.map((comp) => (
                  <th
                    key={comp}
                    className={`p-4 text-center text-sm font-bold w-[17.5%] ${
                      comp === 'tego'
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-t-xl'
                        : 'text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {t(`competitors.${comp}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((category) => (
                <Fragment key={category.categoryKey}>
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 pt-6 pb-2 text-sm font-bold text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-700"
                    >
                      {t(`categories.${category.categoryKey}.title`)}
                    </td>
                  </tr>
                  {category.rows.map((row) => (
                    <tr
                      key={row.labelKey}
                      className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="p-4 text-sm text-zinc-700 dark:text-zinc-300">
                        {t(`categories.${category.categoryKey}.items.${row.labelKey}`)}
                      </td>
                      {competitors.map((comp) => {
                        const level = row[comp];
                        const style = supportStyles[level];
                        return (
                          <td
                            key={comp}
                            className={`p-4 text-center ${comp === 'tego' ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                          >
                            <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                              {t(`support.${level}`)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
