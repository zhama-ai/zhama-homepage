import type { Locale } from '../../../data/types';

export function employeeArtworkFor(locale: Locale) {
const zh = locale === 'zh';
return [
  {
    portrait: 'finance', color: 'blue',
    name: zh ? '财务核算专员' : 'Finance specialist',
    sector: zh ? '企业财务' : 'Corporate finance',
    skills: zh ? ['工资核算', '税务整理', '账务核对'] : ['Payroll', 'Tax data', 'Reconciliation'],
    deliverable: zh ? '月结核算表 · 异常清单' : 'Monthly calculations and exceptions',
    description: zh ? '汇集考勤与财务数据，按规则计算工资、整理报税字段。' : 'Bring attendance and finance records together for payroll and tax preparation.',
  },
  {
    portrait: 'public-service', color: 'teal',
    name: zh ? '政务材料专员' : 'Public service specialist',
    sector: zh ? '政务服务' : 'Public services',
    skills: zh ? ['政策核对', '材料归集', '事项交接'] : ['Policy checks', 'Materials', 'Handover'],
    deliverable: zh ? '材料清单 · 办理事项' : 'Material and action checklists',
    description: zh ? '核对政策适用要求，归集办事材料，整理待补事项。' : 'Check policy requirements, organize materials and identify missing items.',
  },
  {
    portrait: 'claims', color: 'violet',
    name: zh ? '保险理赔专员' : 'Claims specialist',
    sector: zh ? '保险理赔' : 'Insurance claims',
    skills: zh ? ['保单核验', '材料审核', '赔付试算'] : ['Policy checks', 'Document review', 'Calculations'],
    deliverable: zh ? '补件清单 · 理赔审核底稿' : 'Missing items and claim review notes',
    description: zh ? '核对保单责任与申请材料，标记缺件和需要人工复核的异常。' : 'Review policy coverage and claim records; flag missing items and exceptions.',
  },
  {
    portrait: 'equipment', color: 'teal',
    name: zh ? '设备运维助手' : 'Equipment operations',
    sector: zh ? '工业制造' : 'Manufacturing',
    skills: zh ? ['状态监测', '异常分析', '经验复用'] : ['Monitoring', 'Diagnostics', 'Work methods'],
    deliverable: zh ? '异常预警 · 诊断建议' : 'Anomaly alerts and diagnostic suggestions',
    description: zh ? '结合运行数据与历史记录，识别异常变化，整理排查方向。' : 'Use operating data and historical records to identify anomalies and checks.',
  },
  {
    portrait: 'retail', color: 'amber',
    name: zh ? '门店对账专员' : 'Store reconciliation',
    sector: zh ? '连锁零售' : 'Retail operations',
    skills: zh ? ['订单匹配', '流水核对', '日结归集'] : ['Order matching', 'Receipt checks', 'Daily close'],
    deliverable: zh ? '日结对账表 · 差异明细' : 'Daily reconciliation and differences',
    description: zh ? '关联门店订单与各渠道收款，归集退款、少收和未匹配记录。' : 'Match store orders and receipts; collect refunds, shortfalls and unmatched items.',
  },
  {
    portrait: 'ecommerce', color: 'blue',
    name: zh ? '电商口碑分析师' : 'E-commerce review analyst',
    sector: zh ? '电商运营' : 'E-commerce',
    skills: zh ? ['评价分析', '竞品对比', '问题归因'] : ['Review analysis', 'Competitors', 'Issue grouping'],
    deliverable: zh ? '口碑分析 · 产品改进清单' : 'Review insights and product improvement items',
    description: zh ? '整理商品评论与竞品反馈，识别情感倾向和高频问题。' : 'Organize product and competitor reviews; identify sentiment and recurring issues.',
  },
  {
    portrait: 'teaching', color: 'violet',
    name: zh ? '课程助教' : 'Teaching assistant',
    sector: zh ? '教育教学' : 'Education',
    skills: zh ? ['教案编写', '辅助批改', '学情分析'] : ['Lesson plans', 'Marking support', 'Learning needs'],
    deliverable: zh ? '教案初稿 · 学情分析' : 'Lesson drafts and learning analysis',
    description: zh ? '按教学要求准备教案，辅助批改作业，整理共性学习问题。' : 'Prepare lesson plans, assist with marking and identify shared learning needs.',
  },
  {
    portrait: 'hr', color: 'teal',
    name: zh ? '人事档案专员' : 'HR records specialist',
    sector: zh ? '人力资源' : 'Human resources',
    skills: zh ? ['材料核验', '档案维护', '异动交接'] : ['Document checks', 'Records', 'Handover'],
    deliverable: zh ? '员工档案 · 异动交接清单' : 'Employee records and handover checklists',
    description: zh ? '核对入职、调岗与离职材料，维护档案，衔接权限事项。' : 'Check onboarding, transfer and exit records; maintain files and access handovers.',
  },
];
}
