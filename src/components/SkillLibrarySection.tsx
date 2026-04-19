'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from './ui/Container';
import { Terminal, Wrench } from 'lucide-react';

const itOpsKeys = [
  'ticket-handler',
  'incident-triage',
  'auto-remediation',
  'system-monitor',
  'infra-documenter',
  'patch-manager',
  'sla-reporter',
] as const;

const crossBorderKeys = [
  'market-scout',
  'competitor-intel',
  'listing-forge',
  'image-studio',
  'video-maker',
  'voice-miner',
  'review-shield',
  'site-cloner',
  'locale-adapt',
] as const;

type Tab = 'itOps' | 'crossBorder';

export default function SkillLibrarySection() {
  const t = useTranslations('v3.skillLibrary');
  const [tab, setTab] = useState<Tab>('itOps');

  const skills =
    tab === 'itOps'
      ? itOpsKeys.map((k) => ({
          key: k,
          name: t(`itOps.${k}.name`),
          ability: t(`itOps.${k}.ability`),
        }))
      : crossBorderKeys.map((k) => ({
          key: k,
          name: t(`crossBorder.${k}.name`),
          ability: t(`crossBorder.${k}.ability`),
        }));

  return (
    <section id="skill-library" className="py-20 md:py-28 bg-white dark:bg-zinc-900">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400 mb-3">
            05 · SKILL LIBRARY
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            {(['itOps', 'crossBorder'] as Tab[]).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setTab(tabKey)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === tabKey
                    ? 'bg-white dark:bg-zinc-900 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {t(`tabs.${tabKey}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Notice */}
        <div className="max-w-3xl mx-auto mb-8 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-3">
          <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-800 dark:text-emerald-200">
            {t('noticeText')}
          </p>
        </div>

        {/* Skill grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.key}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-rose-300 dark:hover:border-rose-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                  <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 whitespace-nowrap">
                  {t('executable')}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {skill.ability}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
