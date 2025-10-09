'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { 
  Settings, 
  Package, 
  Code2, 
  Rocket, 
  CheckCircle, 
  Lightbulb 
} from 'lucide-react';

export default function TechnicalFeaturesSection() {
  const t = useTranslations('technicalFeatures');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 左侧：功能特点 */}
          <div className="space-y-4">
            {[
              { key: 'framework', icon: Package },
              { key: 'standardization', icon: Code2 },
              { key: 'simplification', icon: Rocket },
            ].map((feature) => {
              const FeatureIcon = feature.icon;
              return (
              <div
                key={feature.key}
                className="tech-card p-6 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                    <FeatureIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-light-700 dark:text-white">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-light-600 dark:text-dark-400">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* 右侧：代码示例 */}
          <div>
            <div className="tech-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-light-700 dark:text-white">
                  {t('codeExample.title')}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    TypeScript
                  </span>
                </div>
              </div>
              <p className="mb-4 text-sm text-light-600 dark:text-dark-400">
                {t('codeExample.description')}
              </p>

              {/* 代码块 */}
              <div className="overflow-x-auto rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 p-6">
                <pre className="text-base">
                  <code className="text-gray-100">
                    <span className="text-purple-400">@Tool</span>
                    {`({\n`}
                    {'  '}
                    <span className="text-blue-300">name</span>
                    {': '}
                    <span className="text-green-300">'saveMedicalRecord'</span>
                    {',\n'}
                    {'  '}
                    <span className="text-blue-300">description</span>
                    {': '}
                    <span className="text-green-300">'Save medical record to database/保存电子病历'</span>
                    {',\n'}
                    {'  '}
                    <span className="text-blue-300">parameters</span>
                    {': [\n'}
                    {'    {\n'}
                    {'      '}
                    <span className="text-blue-300">name</span>
                    {': '}
                    <span className="text-green-300">'tenantId'</span>
                    {',\n'}
                    {'      '}
                    <span className="text-blue-300">type</span>
                    {': '}
                    <span className="text-green-300">'string'</span>
                    {',\n'}
                    {'      '}
                    <span className="text-blue-300">description</span>
                    {': '}
                    <span className="text-green-300">'The tenant id/租户id'</span>
                    {',\n'}
                    {'      '}
                    <span className="text-blue-300">required</span>
                    {': '}
                    <span className="text-orange-400">true</span>
                    {'\n'}
                    {'    }\n'}
                    {'    '}
                    <span className="text-gray-500">{'// ... 更多参数'}</span>
                    {'\n  ]\n})\n'}
                    <span className="text-purple-400">export class</span>
                    {' '}
                    <span className="text-yellow-300">MedicalRecordTool</span>
                    {' '}
                    <span className="text-purple-400">extends</span>
                    {' '}
                    <span className="text-yellow-300">BaseTool</span>
                    {' {\n'}
                    {'  '}
                    <span className="text-gray-500">{'// 工具实现'}</span>
                    {'\n}'}
                  </code>
                </pre>
              </div>

              {/* 关键点说明 */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {['typeSafety', 'autoValidation'].map((point) => (
                  <div
                    key={point}
                    className="rounded-lg bg-light-100 p-3 dark:bg-dark-800"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-light-700 dark:text-white">
                        {t(`codeExample.keyPoints.${point}.title`)}
                      </span>
                    </div>
                    <p className="text-xs text-light-600 dark:text-dark-400">
                      {t(`codeExample.keyPoints.${point}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* 底部总结 */}
      <div className="mt-6 tech-card p-6 bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-dark-700">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-light-700 dark:text-white">
              {t('summary.title')}
            </h3>
            <p className="text-sm leading-relaxed text-light-600 dark:text-dark-400">
              {t('summary.content')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

