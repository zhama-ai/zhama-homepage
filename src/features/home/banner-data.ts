import type { Locale } from '../../data/types';
import { DUTY_CYCLE_DURATION } from './outcomes-data';
import { ui } from '../../lib/ui';

export const bannerCopy = (locale: Locale) => locale === 'zh' ? [
  { label: '团队协作', title: ['让数字员工', '成为团队的一员'], description: '连接企业知识与业务系统，与数字员工协作，把工作做成可交付的成果。', primary: ui.zh.contact, duration: 14000 },
  { label: '任务执行', title: ['一句话交办', '让任务跨系统完成'], description: '从理解目标、拆解规划，到跨系统执行、成果校验与分发，让一句交代形成完整业务闭环。', primary: ui.zh.contact, duration: 18000 },
  { label: '业务成果', title: ['7×24 小时待命', '重复工作交给数字员工'], description: '定时核对、经营日报、监控告警与舆情追踪，让数字员工持续值守，把发现的问题和完成的成果送到对应岗位。', primary: '案例演示', duration: DUTY_CYCLE_DURATION + 800 },
] : [
  { label: 'Collaborate', title: ['Bring digital employees', 'into your team'], description: 'Connect enterprise knowledge and business systems. Work with digital employees to deliver results your team can build on.', primary: ui.en.contact, duration: 14000 },
  { label: 'Execute', title: ['One request', 'Work across systems'], description: 'From understanding the goal and planning the work to execution, review and delivery: turn one request into a complete workflow.', primary: ui.en.contact, duration: 18000 },
  { label: 'Deliver', title: ['Ready around the clock', 'Built for recurring work'], description: 'Scheduled checks, daily reports, alerts and sentiment tracking. Keep a digital employee on duty to bring findings and completed work to the right teams.', primary: 'Case showcase', duration: DUTY_CYCLE_DURATION + 800 },
];
