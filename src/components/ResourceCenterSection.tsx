import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from './ui/Container';
import { BookOpen, FileText, Newspaper, FileCog, ArrowRight } from 'lucide-react';
import { SectionHead } from './ui/Section';
import { Card } from './ui/Card';

interface ResourceCenterSectionProps {
  locale: string;
}

export default async function ResourceCenterSection({ locale }: ResourceCenterSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.resources' });

  const items = [
    {
      key: 'manual',
      icon: BookOpen,
      href: `/${locale}/guide`,
      external: false,
    },
    {
      key: 'whitepaper',
      icon: FileText,
      href: `/${locale}/contact`,
      external: false,
    },
    {
      key: 'blog',
      icon: Newspaper,
      href: `/${locale}/blog`,
      external: false,
    },
    {
      key: 'deploy',
      icon: FileCog,
      href: 'https://docs.zhama.com.cn',
      external: true,
    },
  ] as const;

  return (
    <section
      id="resources"
      className="py-16 md:py-24 bg-white dark:bg-zinc-900"
    >
      <Container>
        <SectionHead title={t('title')} lead={t('subtitle')} center />

        <Link
          href={`/${locale}/cloud-agent`}
          className="group mb-8 grid overflow-hidden rounded-2xl bg-[#07131f] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600 md:grid-cols-[1fr_0.9fr]"
        >
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <p className="text-sm font-semibold text-sky-300">
              {locale === 'zh' ? '专题 · 云端 Agent' : 'Feature · Cloud AI Agents'}
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
              {locale === 'zh' ? '从 Muse 到 Tego OS：让数字员工接任务、交结果' : 'From Muse to Tego OS: agents that deliver real work'}
            </h3>
            <p className="mt-4 max-w-xl leading-7 text-slate-200">
              {locale === 'zh'
                ? '看看云端 Agent 如何进入企业岗位、工具与审批流程。'
                : 'Explore how cloud agents fit into enterprise roles, tools, and approvals.'}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-300 group-hover:text-sky-200">
              {locale === 'zh' ? '查看专题' : 'Explore the story'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
          <div className="relative min-h-56 md:min-h-72">
            <Image
              src="/images/cloud-agent/hero.png"
              alt={locale === 'zh' ? '云端 Agent 工作空间场景示意' : 'Cloud agent workspace illustration'}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Link>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            const card = (
              <Card hover className="group flex h-full flex-col">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-200">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-950 dark:text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {t(`items.${item.key}.description`)}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 transition-colors group-hover:text-primary-800 dark:text-primary-200">
                  {t(`items.${item.key}.cta`)}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </div>
              </Card>
            );

            return item.external ? (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {card}
              </a>
            ) : (
              <Link key={item.key} href={item.href} className="block">
                {card}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
