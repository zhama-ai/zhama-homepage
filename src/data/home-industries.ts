import { generalPresentation } from '../features/solutions/general/page-content';

import type { Locale } from './types';

export interface HomeIndustry {
  title: string;
  pain: string;
  value: string;
  scenarios: string[];
  benefits: { title: string; description: string }[];
}

const finalizedZhHomeIndustries: Record<string, HomeIndustry> = {
  banking: {
    title: '让专业作业提速，让客户经营增效',
    scenarios: ['授信尽调', '贷后风控', '对公经营', '零售财富', '运营服务', '合规管理'],
    pain: '对公授信需核对财报、流水、征信与担保，人工勾稽周期长、风险易漏；财富配置又依赖个人经验。数据受严格授权和出域限制，结论与对客话术必须可追溯。',
    value: 'TeGo 以数字员工协同信贷、风控、财富与网点运营。主 Agent 拆解任务，子 Agent 并行核验财报、流水与话术；制度和岗位方法沉淀为 Skill，数据留在行内，关键结论由人工确认。',
    benefits: [
      { title: '数字员工协同完成尽调', description: '主 Agent 拆解任务，子 Agent 并行核验财报与流水，形成底稿供人工判断。' },
      { title: 'Skill 沉淀，岗位方法复用', description: '授信、适当性与话术审查方法沉淀为 Skill，供各分支机构复用。' },
      { title: '数据不出域，成果可追溯', description: '征信与账户信息按授权访问，结论人工确认，成果带依据与记录。' },
    ],
  },
  insurance: {
    title: '让条款讲得清楚，让理赔办得明白',
    scenarios: ['销售支持', '智能核保', '智能理赔', '消保审查', '客服保全', '经营分析'],
    pain: '条款、免责与健康告知复杂，答复口径容易不一；核保理赔又依赖资深经验。销售话术必须守住消保底线，过程可回溯、结论人工确认。',
    value: 'TeGo 以数字员工协同销售、核保、理赔、消保与保全。主 Agent 拆解任务，子 Agent 并行解析单证、比对条款、筛查话术；规则与经验沉淀为 Skill，数据留在企业内，结论由人工确认。',
    benefits: [
      { title: '数字员工协同办案', description: '主 Agent 拆解任务，子 Agent 并行核对单证与条款，形成意见供人工确认。' },
      { title: 'Skill 沉淀，核赔经验复用', description: '条款比对、健康告知与责任判定方法沉淀为 Skill，供各机构复用。' },
      { title: '数据不出域，销售可回溯', description: '保单与客户信息按授权访问，话术和核赔结论人工确认。' },
    ],
  },
  securities: {
    title: '让投研响应更快，让专业服务更稳',
    scenarios: ['智能投研', '智能投顾', '投行资管', '合规审查', '财富管理', '经营分析'],
    pain: '研报、公告与行情庞杂，研究员时间耗在资料整理；投顾与投行方法又依赖个人经验。适当性、尽调与观点必须留痕溯源，关键内容由持牌人员确认。',
    value: 'TeGo 以数字员工协同投研、投顾、投行与经营分析。主 Agent 拆解任务，子 Agent 并行检索、摘要与核对；研究方法沉淀为 Skill，数据留在券商内，观点与审查结论由持牌人员确认。',
    benefits: [
      { title: '数字员工协同完成研究', description: '主 Agent 拆解任务，子 Agent 并行检索、摘要与比对，观点带出处。' },
      { title: 'Skill 沉淀，专家方法复用', description: '投顾服务与投行尽调方法沉淀为 Skill，供各团队复用。' },
      { title: '数据不出域，观点可溯源', description: '研报与持仓数据按授权访问，对客内容与审查结论人工确认。' },
    ],
  },
  government: {
    title: '让政策找得到，让办件办得快',
    scenarios: ['政策服务', '公文办公', '事项办理', '热线研判', '督查督办', '民情响应'],
    pain: '政策、指南和卷宗分散，基层查找依据、核验材料和分派工单耗时。涉密与个人信息不得越权，政策口径和对外发布必须准确留痕。',
    value: 'TeGo 以数字员工协同政策服务、公文、办件和热线督办。主 Agent 拆解任务，子 Agent 并行检索政策、核验材料、分类诉求；办事方法沉淀为 Skill，数据留在内网，口径与签发由人工确认。',
    benefits: [
      { title: '数字员工协同办件', description: '主 Agent 拆解任务，子 Agent 并行查政策、核材料、分诉求。' },
      { title: 'Skill 沉淀，办事口径复用', description: '政策答复、公文规范与热线研判方法沉淀为 Skill，供窗口与处室复用。' },
      { title: '数据留在内网，过程可追溯', description: '政务数据按授权访问，政策口径与公文签发人工确认。' },
    ],
  },
  'state-owned': {
    title: '让集团管控穿透，让专业协同提效',
    scenarios: ['公文办公', '招采合规', '经营分析', '督查督办', '制度合同', '审计备查'],
    pain: '经营数据、公文和招采材料层层上报，人工核对口径不一、疏漏难查；制度方法也随人员流动。集团数据需留在内网，决策与审计链条必须完整。',
    value: 'TeGo 以数字员工协同公文、招采、经营分析和合同审查。主 Agent 拆解任务，子 Agent 并行扫描否决项、比对条款、汇总指标；集团制度沉淀为 Skill，数据按密级授权，决策与签发由人工确认。',
    benefits: [
      { title: '数字员工协同完成材料', description: '主 Agent 拆解任务，子 Agent 并行扫描否决项、比对条款、汇总指标。' },
      { title: 'Skill 沉淀，集团口径复用', description: '公文、招采和法务审查方法沉淀为 Skill，供总部与所属单位复用。' },
      { title: '数据不出域，决策可追溯', description: '集团数据按密级授权，决策与签发人工确认，成果留存依据。' },
    ],
  },
  trust: {
    title: '让尽调做深做透，让受托尽责有据',
    scenarios: ['产品尽调', '财富管理', '家族信托', '标品投研', '存续期监测', '合规留痕'],
    pain: '项目资料分散，尽调与合同核对周期长、风险易漏；财富配置又依赖个人经验。适当性与受托尽责必须留痕，客户和项目数据不能出域。',
    value: 'TeGo 以数字员工协同尽调、财富管理、家族信托和存续监测。主 Agent 拆解任务，子 Agent 并行勾稽资料、比对条款、巡检异动；规则方法沉淀为 Skill，数据留在企业内，关键结论由人工确认。',
    benefits: [
      { title: '数字员工协同完成尽调', description: '主 Agent 拆解任务，子 Agent 并行勾稽资料与比对合同条款。' },
      { title: 'Skill 沉淀，受托方法复用', description: '尽调审查、配置逻辑与存续巡检方法沉淀为 Skill，供业务团队复用。' },
      { title: '数据不出域，履职可追溯', description: '项目与客户数据按授权访问，适当性与尽责结论人工确认。' },
    ],
  },
};

const finalizedEnHomeIndustries: Record<string, HomeIndustry> = {
  banking: {
    title: 'Accelerate specialist work. Grow client value.',
    scenarios: ['Credit diligence', 'Post-loan risk', 'Corporate coverage', 'Retail and wealth', 'Service operations', 'Compliance management'],
    pain: 'Corporate credit teams reconcile financial statements, cash flows, credit records and guarantees. Manual checks take time and can miss risks, while wealth allocation relies on individual expertise. Data access and transfers are restricted; conclusions and client communications need traceable sources.',
    value: 'TeGo coordinates credit, risk, wealth and branch operations through digital employees. A main Agent breaks down tasks; sub-Agents check financial statements, cash flows and client communications in parallel. Policies and role methods become reusable skills, data stays within the bank, and people confirm key conclusions.',
    benefits: [
      { title: 'Coordinate due diligence', description: 'A main Agent delegates parallel financial and cash flow checks to sub-Agents, producing working papers for human judgment.' },
      { title: 'Reuse role methods as skills', description: 'Credit, suitability and client communication review methods become reusable skills for branches.' },
      { title: 'Keep data in-house and results traceable', description: 'Credit and account information follows access permissions. People confirm conclusions, with evidence and records retained.' },
    ],
  },
  insurance: {
    title: 'Explain coverage clearly. Handle claims with clarity.',
    scenarios: ['Sales support', 'Underwriting', 'Claims review', 'Consumer protection', 'Policy servicing', 'Business analysis'],
    pain: 'Complex terms, exclusions and health disclosures make consistent answers difficult. Underwriting and claims depend on specialist experience. Sales communications must meet consumer protection requirements, with traceable handling and human confirmation of conclusions.',
    value: 'TeGo coordinates sales, underwriting, claims, consumer protection and policy servicing through digital employees. A main Agent breaks down tasks; sub-Agents parse documents, compare terms and review sales communications in parallel. Rules and experience become reusable skills, data stays in-house, and people confirm conclusions.',
    benefits: [
      { title: 'Coordinate case preparation', description: 'A main Agent delegates parallel document and policy checks to sub-Agents, preparing findings for human confirmation.' },
      { title: 'Reuse underwriting and claims methods', description: 'Policy comparisons, health disclosure checks and liability assessment methods become reusable skills across the organization.' },
      { title: 'Keep data in-house and sales traceable', description: 'Policy and client information follows access permissions. People confirm communications and underwriting and claims conclusions.' },
    ],
  },
  securities: {
    title: 'Respond faster in research. Deliver consistent professional service.',
    scenarios: ['Investment research', 'Investment advisory', 'Investment banking and asset management', 'Compliance review', 'Wealth management', 'Business analysis'],
    pain: 'Research reports, announcements and market data consume time before analysis begins. Advisory and investment banking methods rely on individual expertise. Suitability, diligence and opinions need traceable evidence, with key content confirmed by licensed professionals.',
    value: 'TeGo coordinates research, advisory, investment banking and business analysis through digital employees. A main Agent breaks down tasks; sub-Agents retrieve, summarize and cross-check in parallel. Research methods become reusable skills, data stays within the firm, and licensed professionals confirm opinions and review conclusions.',
    benefits: [
      { title: 'Coordinate research work', description: 'A main Agent delegates parallel retrieval, summaries and comparisons to sub-Agents. Opinions retain their sources.' },
      { title: 'Reuse specialist methods as skills', description: 'Advisory service and investment banking diligence methods become reusable skills across teams.' },
      { title: 'Keep data in-house and opinions sourced', description: 'Research and holdings data follows access permissions. People confirm client-facing content and review conclusions.' },
    ],
  },
  government: {
    title: 'Find the policy. Move services forward.',
    scenarios: ['Policy services', 'Official documents', 'Service processing', 'Hotline assessment', 'Action follow-up', 'Public request response'],
    pain: 'Policies, guides and case files sit apart. Frontline staff spend time finding sources, checking material and routing requests. Classified and personal information must stay within permissions, while policy guidance and public releases need accurate records.',
    value: 'TeGo coordinates policy services, documents, case handling and hotline follow-up through digital employees. A main Agent breaks down tasks; sub-Agents retrieve policies, check materials and classify requests in parallel. Service methods become reusable skills, data stays on the internal network, and people confirm guidance and formal issuance.',
    benefits: [
      { title: 'Coordinate service preparation', description: 'A main Agent delegates parallel policy searches, material checks and request classification to sub-Agents.' },
      { title: 'Reuse consistent service methods', description: 'Policy responses, document standards and hotline assessment methods become reusable skills for service desks and departments.' },
      { title: 'Keep data internal and handling traceable', description: 'Government data follows access permissions. People confirm policy guidance and formal issuance.' },
    ],
  },
  'state-owned': {
    title: 'See across the group. Coordinate specialist work.',
    scenarios: ['Official documents', 'Procurement compliance', 'Business analysis', 'Action follow-up', 'Policies and contracts', 'Audit preparation'],
    pain: 'Operating data, official documents and procurement materials pass through reporting layers. Manual checks use inconsistent definitions and miss issues, while staff changes disrupt established methods. Group data stays internal, and decision and audit records must remain complete.',
    value: 'TeGo coordinates documents, procurement, business analysis and contract review through digital employees. A main Agent breaks down tasks; sub-Agents scan disqualification clauses, compare terms and consolidate metrics in parallel. Group policies become reusable skills, data access follows classification, and people confirm decisions and formal issuance.',
    benefits: [
      { title: 'Coordinate complete working materials', description: 'A main Agent delegates parallel disqualification checks, clause comparisons and metric consolidation to sub-Agents.' },
      { title: 'Reuse group methods as skills', description: 'Document, procurement and legal review methods become reusable skills for headquarters and subsidiaries.' },
      { title: 'Keep data in-house and decisions traceable', description: 'Group data access follows classification. People confirm decisions and formal issuance; outputs retain supporting evidence.' },
    ],
  },
  trust: {
    title: 'Deepen due diligence. Evidence trustee responsibilities.',
    scenarios: ['Product due diligence', 'Wealth management', 'Family trusts', 'Securities research', 'Ongoing monitoring', 'Compliance records'],
    pain: 'Scattered project files prolong diligence and contract checks and make risks easier to miss. Wealth allocation depends on individual expertise. Suitability and trustee responsibilities need records, while client and project data stays in-house.',
    value: 'TeGo coordinates diligence, wealth management, family trusts and ongoing monitoring through digital employees. A main Agent breaks down tasks; sub-Agents reconcile materials, compare clauses and monitor changes in parallel. Rules and methods become reusable skills, data stays in-house, and people confirm key conclusions.',
    benefits: [
      { title: 'Coordinate due diligence', description: 'A main Agent delegates parallel material reconciliation and contract comparisons to sub-Agents.' },
      { title: 'Reuse trustee work methods', description: 'Diligence review, allocation methods and ongoing monitoring become reusable skills for business teams.' },
      { title: 'Keep data in-house and trustee work traceable', description: 'Project and client data follows access permissions. People confirm suitability and trustee conclusions.' },
    ],
  },
};

export const homeIndustries: Record<Locale, Record<string, HomeIndustry>> = {
  zh: {
    ...finalizedZhHomeIndustries,
    'general': generalPresentation.zh.home,
  },
  en: {
    ...finalizedEnHomeIndustries,
    'general': generalPresentation.en.home,
  },
};
