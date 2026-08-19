import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Database, LockKeyhole, Network } from 'lucide-react';
import { Container } from './ui/Container';
import HeroVideoButton from './HeroVideoButton';
import CloudLink from './CloudLink';
import { cloudFirst } from '@/lib/audience';

interface HeroSectionProps {
  locale: string;
}

export default async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale, namespace: 'biz.hero' });
  const cloudT = await getTranslations({ locale, namespace: 'cloud.hero' });
  const isCloudFirst = cloudFirst(locale);

  const highlightKeys = ['scale', 'speed', 'delivery'] as const;
  const consoleCopy =
    locale === 'zh'
      ? {
          title: '数字员工控制台',
          subtitle: '统一编排任务、权限、数据与审计状态',
          workers: [
            ['IT 支持', '正在处理 12 个员工请求'],
            ['跨境运营', 'Listing 本地化任务运行中'],
          ],
          workflowTitle: '实时任务流',
          workflow: ['接收员工请求', '调用知识与系统', '生成可审计结果'],
          governanceTitle: '治理状态',
          governance: ['RBAC 权限已启用', '用户级数据边界', '调用全链路留痕'],
          footer: ['实例隔离', '企业知识库', '审计追踪'],
        }
      : {
          title: 'Digital Employee Console',
          subtitle: 'Orchestrate tasks, access, data and audit status in one place',
          workers: [
            ['IT Support', 'Handling 12 employee requests'],
            ['Commerce Ops', 'Listing localization in progress'],
          ],
          workflowTitle: 'Live Workflow',
          workflow: ['Receive employee request', 'Call knowledge and systems', 'Return auditable result'],
          governanceTitle: 'Governance',
          governance: ['RBAC enabled', 'Per-user data boundary', 'Full call audit trail'],
          footer: ['Instance isolation', 'Enterprise knowledge', 'Audit trail'],
        };
  const panelItems = [
    { label: consoleCopy.footer[0], icon: LockKeyhole },
    { label: consoleCopy.footer[1], icon: Database },
    { label: consoleCopy.footer[2], icon: Network },
  ] as const;

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f7fafc] pt-16 dark:bg-[#07131f] lg:pt-20"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_26%,rgba(50,153,227,0.16),transparent_34%),radial-gradient(circle_at_8%_88%,rgba(245,158,11,0.10),transparent_28%)]" />

      <Container className="relative z-10 grid items-center gap-10 py-10 lg:grid-cols-[0.96fr_1.04fr] lg:py-12">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-md border border-primary-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary-800 shadow-sm dark:border-primary-900 dark:bg-white/10 dark:text-primary-100">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            {t('badge')}
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-tight text-zinc-950 dark:text-white sm:text-5xl lg:text-[3rem]">
            {t('title')}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300 lg:max-w-xl">
            {t('subtitle')}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {isCloudFirst ? (
              <CloudLink
                medium="hero"
                locale={locale}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
              >
                {cloudT('primaryCta')}
                <ArrowRight className="h-4 w-4" />
              </CloudLink>
            ) : (
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary-700 px-6 py-3 text-base font-semibold text-white shadow-md shadow-primary-950/10 transition-all duration-300 hover:bg-primary-800 hover:shadow-lg active:scale-95"
              >
                {t('primaryCta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {isCloudFirst && (
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                {t('primaryCta')}
              </Link>
            )}
            <Link
              href={`/${locale}/download`}
              className={isCloudFirst
                ? 'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:text-primary-700 dark:text-zinc-300 dark:hover:text-primary-200'
                : 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition-all duration-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800'}
            >
              {t('secondaryCta')}
            </Link>
            <HeroVideoButton
              label={t('watchDemo')}
              ariaLabel={t('watchDemoAria')}
              title={t('watchDemo')}
            />
          </div>

          <div className="mt-7 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3 lg:max-w-xl">
            {highlightKeys.map((key) => (
              <div
                key={key}
                className="min-w-0 border-l-2 border-primary-600 bg-white/90 px-3 py-3 shadow-sm backdrop-blur dark:border-primary-300 dark:bg-white/5 sm:px-4"
              >
                <div className="whitespace-nowrap text-xl font-bold text-zinc-950 dark:text-white sm:text-2xl">
                  {t(`highlights.${key}.value`)}
                </div>
                <div className="mt-1 text-xs leading-4 text-zinc-600 dark:text-zinc-400 sm:text-sm lg:text-[0.78rem]">
                  {t(`highlights.${key}.label`)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex max-w-2xl flex-wrap items-start gap-x-5 gap-y-2">
            <Link
              href={`/${locale}/contact`}
              className="flex items-start gap-2 text-sm leading-6 text-zinc-600 transition-colors hover:text-primary-700 dark:text-zinc-400 dark:hover:text-primary-200"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-300" />
              <span>
                {t('tertiaryCta')} · {t('tertiaryCtaHint')}
              </span>
            </Link>
            {!isCloudFirst && (
              <CloudLink
                medium="hero"
                locale={locale}
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-200"
              >
                {cloudT('primaryCta')}
                <ArrowRight className="h-3.5 w-3.5" />
              </CloudLink>
            )}
          </div>
        </div>

        <div className="relative hidden animate-scale-in lg:block">
          <div className="absolute -inset-6 rounded-[2rem] bg-primary-400/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-lg border border-white/70 bg-[#07131f] shadow-2xl shadow-slate-950/20 dark:border-white/10">
            <div className="flex h-9 items-center justify-between border-b border-white/10 bg-white/[0.04] px-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-xs font-semibold tracking-[0.24em] text-white/45">TEGO OS v3.0.0</span>
              <span className="h-2 w-14 rounded-full bg-white/10" />
            </div>

            <div className="relative min-h-[270px] overflow-hidden p-6">
              <div className="absolute inset-0 bg-grid opacity-[0.08]" />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_46%,rgba(50,153,227,0.10)_46.3%,transparent_47.4%,transparent_68%,rgba(245,158,11,0.08)_68.3%,transparent_69.2%)]" />
              <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-400/20 blur-3xl" />
              <div className="absolute bottom-10 right-12 h-44 w-44 rounded-full bg-accent-400/10 blur-3xl" />
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full text-primary-300/25"
                viewBox="0 0 720 360"
                fill="none"
              >
                <path d="M52 88H182L224 130H342" stroke="currentColor" strokeWidth="1" />
                <path d="M510 54H612V116H684" stroke="currentColor" strokeWidth="1" />
                <path d="M392 280H500L546 234H668" stroke="currentColor" strokeWidth="1" />
                <path d="M72 266H168L210 224H288" stroke="currentColor" strokeWidth="1" />
                <circle cx="52" cy="88" r="3" fill="currentColor" />
                <circle cx="342" cy="130" r="3" fill="currentColor" />
                <circle cx="684" cy="116" r="3" fill="currentColor" />
                <circle cx="668" cy="234" r="3" fill="currentColor" />
                <circle cx="72" cy="266" r="3" fill="currentColor" />
              </svg>
              <div className="absolute left-12 top-16 h-2 w-2 rounded-full bg-primary-300 shadow-[0_0_22px_rgba(142,211,255,0.85)]" />
              <div className="absolute right-16 top-28 h-1.5 w-1.5 rounded-full bg-accent-300 shadow-[0_0_20px_rgba(252,211,77,0.75)]" />
              <div className="absolute bottom-12 right-1/3 h-1.5 w-1.5 rounded-full bg-primary-300 shadow-[0_0_18px_rgba(142,211,255,0.75)]" />

              <div className="relative flex items-start justify-between gap-5">
                <div>
                  <h2 className="text-2xl font-bold leading-tight text-white">{consoleCopy.title}</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">{consoleCopy.subtitle}</p>
                </div>
                <span className="rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                  Live
                </span>
              </div>

              <div className="relative mt-5 grid grid-cols-[0.82fr_1.18fr] gap-3">
                <div className="space-y-2">
                  {consoleCopy.workers.map(([name, status], index) => (
                    <div key={name} className="rounded-lg border border-white/10 bg-white/[0.06] p-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-300/10 text-sm font-bold text-primary-100">
                          {index + 1}
                        </span>
                        <div>
                          <div className="text-sm font-semibold text-white">{name}</div>
                          <div className="mt-0.5 text-xs leading-4 text-zinc-400">{status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-primary-100">
                      {consoleCopy.governanceTitle}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {consoleCopy.governance.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-300" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{consoleCopy.workflowTitle}</span>
                    <span className="text-xs text-zinc-400">03 steps</span>
                  </div>
                  <div className="space-y-3">
                    {consoleCopy.workflow.map((step, index) => (
                      <div key={step} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary-200/20 bg-primary-300/10 text-xs font-bold text-primary-100">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-white">{step}</div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-primary-300 to-accent-300"
                              style={{ width: `${index === 0 ? 92 : index === 1 ? 68 : 44}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 bg-[#07131f]/85 p-3 backdrop-blur-md">
              <div className="grid gap-3 sm:grid-cols-3">
                {panelItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-white">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-primary-100">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="line-clamp-2">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
