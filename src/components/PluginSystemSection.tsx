'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { 
  Rocket, 
  Zap, 
  Target, 
  BarChart3, 
  Shield, 
  Code2, 
  TrendingUp, 
  Trophy,
  CheckCircle2 
} from 'lucide-react';
import { Container } from './ui/Container';

export default function PluginSystemSection() {
  const t = useTranslations('pluginSystem');

  return (
    <Container>
      <div className="space-y-16">
        {/* 四大核心特性 */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 inline-block relative">
              {t('features.title')}
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-500 rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { key: 'secure', icon: Shield },
              { key: 'rapid', icon: Zap },
              { key: 'advanced', icon: Code2 },
              { key: 'roi', icon: TrendingUp },
            ].map((feature) => {
              const FeatureIcon = feature.icon;
              
              return (
                <div
                  key={feature.key}
                  className="card-hover group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 dark:text-primary-400 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <FeatureIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4 text-center">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    <ul className="space-y-3">
                      {[0, 1, 2, 3].map((index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 group/item"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {t(`features.${feature.key}.items.${index}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 关键数据 */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 inline-block relative">
              {t('stats.title')}
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-500 rounded-full"></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { key: 'development', icon: Rocket },
              { key: 'codeLines', icon: Code2 },
              { key: 'learning', icon: Zap },
              { key: 'roi', icon: TrendingUp },
            ].map((stat) => {
              const StatIcon = stat.icon;
              
              return (
                <div
                  key={stat.key}
                  className="card-hover group text-center"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 dark:text-primary-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <StatIcon className="h-6 w-6" />
                    </div>
                    <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
                      {t(`stats.${stat.key}.label`)}
                    </div>
                    <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                      {t(`stats.${stat.key}.value`)}
                    </div>
                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {t(`stats.${stat.key}.change`)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
