import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarClock, FileCheck2, Layers3, PenLine, Ruler, ShieldCheck, Target, TrendingUp, UserRoundCheck } from 'lucide-react';
import Header from '@/components/Header';
import FooterSection from '@/components/FooterSection';
import CloudLink from '@/components/CloudLink';
import { Container } from '@/components/ui/Container';
import { localizedAlternates, localizedOpenGraph, SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

const copy = {
  zh: {
    metaTitle: '云端 Agent 数字员工 | Tego OS',
    metaDescription: 'Tego OS 让云端 Agent 进入中国企业的真实工作流：接住目标、调用工具、交付成果，并在授权、审批和审计下持续工作。',
    eyebrow: '从 Muse 看见 Agent 的下一步',
    heroLine1: '给 AI 一个目标，',
    heroLine2: '让数字员工交付。',
    heroLead: 'Tego OS 把云端 Agent 带进真实业务：在项目工作空间里规划任务、使用工具、处理文件，并在关键时刻请人确认。',
    demo: '预约企业演示',
    tryCloud: '体验云端版',
    readStory: '阅读完整故事',
    heroImageAlt: '云端工作空间连接企业桌面与移动端的场景示意',
    storyEyebrow: '一个正在发生的变化',
    storyTitle: '从“给一个回答”，走向“完成一件事”',
    storyBody: 'Meta 的 Muse 让云端个人 Agent 走到台前。对于企业，下一步是让 Agent 进入客户、文档、协作和审批流程，在具体岗位上交付可检查的结果。',
    museSource: '了解 Muse 的官方介绍',
    principles: [
      { title: '接住目标', description: '把一项工作拆成计划，在项目空间里持续跟进。' },
      { title: '使用工具', description: '按授权连接文件、浏览器、桌面软件与业务能力。' },
      { title: '交回结果', description: '交付文档、草稿、报告与待确认事项。' },
    ],
    rolesEyebrow: '从具体岗位开始',
    rolesTitle: '四位数字员工，四种真实工作',
    rolesLead: '全新系统可以预置日常助理、销售、内容运营和 CAD 审图四类数字员工。每个岗位都有明确的任务与交付物。',
    rolesImageAlt: '研究、销售、内容运营和 CAD 审图四类数字员工场景示意',
    roles: [
      { title: '我的助理', description: '研究资料、整理会议、拆解计划，处理日常办公文件。', output: '交付：提纲、纪要、文档' },
      { title: '销售全流程助理', description: '协助线索、商机和 Pipeline 阶段任务推进。', output: '交付：跟进事项、流程进度' },
      { title: '公众号运营助手', description: '从选题、研究到写作、配图、排版和草稿提交。', output: '交付：待审核的公众号草稿' },
      { title: 'CAD 审图工程师', description: '读取 DXF 图纸，整理测量、检查证据和报告。', output: '交付：审图报告' },
    ],
    workflowEyebrow: '持续工作',
    workflowTitle: '任务会暂停，工作不必从头开始',
    workflowBody: '项目工作空间保留相关会话、文件、计划和进度。需要补充资料或修改要求时，数字员工可以沿着已有上下文继续；定时任务让周期性工作也有稳定的入口。',
    workflowPoints: ['先规划、再执行，过程可查看', '桌面、移动端与协作渠道都能参与', '成果留在工作空间，方便下一步接力'],
    trustEyebrow: '企业治理',
    trustTitle: '能动手，也懂得何时交还决定权',
    trustBody: '数字员工的使用范围、可访问资料和关键操作，都应由组织明确管理。Tego OS 支持授权、审批、审计和运行状态管理；用户的个人档案、长期记忆与工作日记保存在隔离的工作区。',
    trustImageAlt: '企业负责人确认关键操作的场景示意',
    trustPoints: [
      { title: '权限有边界', description: '为用户、团队和分身配置访问与操作范围。' },
      { title: '关键动作有人确认', description: '需要判断或授权的步骤回到负责人手中。' },
      { title: '经验留在组织里', description: '成熟流程经审核后沉淀为可复用技能。' },
    ],
    ctaEyebrow: '从一件具体的工作开始',
    ctaTitle: '让你的第一位数字员工上岗',
    ctaBody: '选择一项每周重复、结果可检验的任务。给它目标，看看它交回什么，再把有效的方法复制到更多岗位。',
    disclaimer: 'Muse 是 Meta 的产品。本文以云端 Agent 的产品方向作类比，Tego OS 与 Meta 无品牌或产品关联；具体功能以实际部署配置为准。',
  },
  en: {
    metaTitle: 'Cloud AI Agents for Real Work | Tego OS',
    metaDescription: 'Tego OS brings cloud AI agents into enterprise workflows to plan work, use tools, deliver results, and operate with clear approval and governance.',
    eyebrow: 'The next step for cloud agents',
    heroLine1: 'Give AI a goal.',
    heroLine2: 'Get work back.',
    heroLead: 'Tego OS brings cloud agents into real workflows. Digital employees plan work, use tools, handle files, and return to people when a decision or approval is needed.',
    demo: 'Book an enterprise demo',
    tryCloud: 'Try Tego Cloud',
    readStory: 'Read the full story',
    heroImageAlt: 'A cloud workspace connected to an office desk and mobile device',
    storyEyebrow: 'A shift in how AI works',
    storyTitle: 'From answering a question to completing a task',
    storyBody: 'Meta’s Muse brought cloud-based personal agents into focus. For enterprises, the next step is connecting agents to customer work, documents, collaboration, and approvals so that each role can deliver results people can review.',
    museSource: 'Read Meta’s Muse announcement',
    principles: [
      { title: 'Take the goal', description: 'Break work into a plan and keep its context in a project workspace.' },
      { title: 'Use the tools', description: 'Access files, browsers, desktop software, and business capabilities with permission.' },
      { title: 'Deliver results', description: 'Return documents, drafts, reports, and questions that need a decision.' },
    ],
    rolesEyebrow: 'Start with a role',
    rolesTitle: 'Four digital employees. Four concrete jobs.',
    rolesLead: 'A new deployment can start with assistants for everyday work, sales, publishing, and CAD review. Each role has a clear task and deliverable.',
    rolesImageAlt: 'Four digital employee workspaces for research, sales, publishing, and CAD review',
    roles: [
      { title: 'My Assistant', description: 'Research, meeting notes, plans, and everyday office files.', output: 'Delivers: outlines, notes, documents' },
      { title: 'Sales Process Assistant', description: 'Support leads, opportunities, and pipeline stages.', output: 'Delivers: follow-ups and process status' },
      { title: 'Publishing Assistant', description: 'Research, write, illustrate, format, and prepare article drafts.', output: 'Delivers: drafts ready for review' },
      { title: 'CAD Review Engineer', description: 'Read DXF drawings and organize measurements, checks, and evidence.', output: 'Delivers: review reports' },
    ],
    workflowEyebrow: 'Continuous work',
    workflowTitle: 'Work can pause without losing its place',
    workflowBody: 'The project workspace keeps related conversations, files, plans, and progress together. When requirements change or more information arrives, a digital employee can continue from the existing context. Scheduled tasks support recurring work.',
    workflowPoints: ['Plan first, execute step by step', 'Collaborate across desktop, mobile, and messaging', 'Keep deliverables in the project workspace'],
    trustEyebrow: 'Enterprise control',
    trustTitle: 'Capable agents need clear decision boundaries',
    trustBody: 'Organizations need to define who can use each agent, which information it can access, and which actions need approval. Tego OS supports permissions, approvals, audit, and runtime management. Each user’s profile, long-term memory, and work journal stay in an isolated workspace.',
    trustImageAlt: 'A person approving a sensitive action in a cloud-agent workflow',
    trustPoints: [
      { title: 'Defined access', description: 'Set usage and operating permissions for users, teams, and agents.' },
      { title: 'Human approval', description: 'Bring decisions and sensitive actions back to a responsible person.' },
      { title: 'Reusable experience', description: 'Review and publish proven workflows as reusable skills.' },
    ],
    ctaEyebrow: 'Start with one real task',
    ctaTitle: 'Put your first digital employee to work',
    ctaBody: 'Choose a recurring task with a clear result. Give it a goal, review what comes back, and bring the proven workflow to more roles.',
    disclaimer: 'Muse is a Meta product. This page compares product directions only; Tego OS is not affiliated with Meta. Features depend on deployment configuration.',
  },
} as const;

const principleIcons = [Target, Layers3, FileCheck2] as const;
const roleIcons = [CalendarClock, TrendingUp, PenLine, Ruler] as const;
const trustIcons = [ShieldCheck, UserRoundCheck, FileCheck2] as const;
const blogSlug = 'tego-os-cloud-agent-muse';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = copy[locale === 'en' ? 'en' : 'zh'];
  const image = `${SITE_URL}/images/cloud-agent/${locale === 'en' ? 'hero' : 'cover'}.png`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: localizedAlternates(locale, '/cloud-agent'),
    openGraph: {
      ...localizedOpenGraph(locale, '/cloud-agent'),
      title: c.metaTitle,
      description: c.metaDescription,
      type: 'website',
      images: [{ url: image, width: 1672, height: 941, alt: c.heroImageAlt }],
    },
    twitter: { card: 'summary_large_image', title: c.metaTitle, description: c.metaDescription, images: [image] },
  };
}

export default async function CloudAgentPage({ params }: Props) {
  const { locale } = await params;
  const c = copy[locale === 'en' ? 'en' : 'zh'];

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="relative overflow-hidden bg-[#07131f] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(14,165,233,0.18),transparent_32%)]" />
          <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-24">
            <div>
              <p className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-200">
                {c.eyebrow}
              </p>
              <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {c.heroLine1}<br /><span className="text-sky-300">{c.heroLine2}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{c.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {c.demo}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <CloudLink medium="cloud_page" locale={locale} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/35 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  {c.tryCloud}
                </CloudLink>
              </div>
              <Link href={`/${locale}/blog/${blogSlug}`} className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sky-200 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                {c.readStory}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-sky-950/30">
              <Image src="/images/cloud-agent/hero.png" alt={c.heroImageAlt} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </Container>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-[#0b1b2a] md:py-24">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary-700 dark:text-sky-300">{c.storyEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{c.storyTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{c.storyBody}</p>
              <a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary-700 hover:underline dark:text-sky-300">
                {c.museSource}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {c.principles.map((item, index) => {
                const Icon = principleIcons[index];
                return <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <Icon className="h-6 w-6 text-primary-600 dark:text-sky-300" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 leading-7 text-zinc-600 dark:text-zinc-300">{item.description}</p>
                </div>;
              })}
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-primary-700 dark:text-sky-300">{c.rolesEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{c.rolesTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{c.rolesLead}</p>
            </div>
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
              <Image src="/images/cloud-agent/digital-employees.png" alt={c.rolesImageAlt} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {c.roles.map((role, index) => {
                const Icon = roleIcons[index];
                return <div key={role.title} className="rounded-2xl border border-slate-200 p-6 dark:border-white/10 dark:bg-white/5">
                  <Icon className="h-6 w-6 text-primary-600 dark:text-sky-300" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold">{role.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{role.description}</p>
                  <p className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-primary-700 dark:border-white/10 dark:text-sky-300">{role.output}</p>
                </div>;
              })}
            </div>
          </Container>
        </section>

        <section className="bg-slate-50 py-16 dark:bg-[#0b1b2a] md:py-24">
          <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-primary-700 dark:text-sky-300">{c.workflowEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{c.workflowTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{c.workflowBody}</p>
              <ul className="mt-7 space-y-3">
                {c.workflowPoints.map((point) => <li key={point} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-200"><FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600 dark:text-sky-300" aria-hidden="true" />{point}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-10">
              <div className="space-y-5">
                {c.principles.map((item, index) => <div key={item.title} className="flex gap-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-bold text-primary-700 dark:bg-sky-300/10 dark:text-sky-300">0{index + 1}</span>
                  <div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.description}</p></div>
                </div>)}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
              <Image src="/images/cloud-agent/human-approval.png" alt={c.trustImageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-700 dark:text-sky-300">{c.trustEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{c.trustTitle}</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-300">{c.trustBody}</p>
              <div className="mt-7 space-y-5">
                {c.trustPoints.map((item, index) => {
                  const Icon = trustIcons[index];
                  return <div key={item.title} className="flex gap-4">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600 dark:text-sky-300" aria-hidden="true" />
                    <div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{item.description}</p></div>
                  </div>;
                })}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#07131f] py-16 text-white md:py-24">
          <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-sky-300">{c.ctaEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{c.ctaTitle}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">{c.ctaBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 font-semibold text-white hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{c.demo}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              <CloudLink medium="cloud_page" locale={locale} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/35 px-6 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{c.tryCloud}</CloudLink>
            </div>
          </Container>
        </section>
        <div className="bg-white py-5 text-xs leading-6 text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400"><Container>{c.disclaimer}</Container></div>
      </main>
      <FooterSection locale={locale} />
    </div>
  );
}
