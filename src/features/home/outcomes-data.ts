import type { Locale } from '../../data/types';

export const DUTY_EXECUTION_DURATION = 8_400;
export const DUTY_SCENE_DURATION = DUTY_EXECUTION_DURATION + 1_200;
// Reveal ranges use timeline units independently of the playback duration.
export const DUTY_REVEAL_UNITS = 2_400;
export const DUTY_CYCLE_DURATION = DUTY_SCENE_DURATION * 4;

export function dutyCopy(locale: Locale) {
  const zh = locale === 'zh';
  return {
    title: zh ? 'TeGo 数字员工值守' : 'TeGo · Always on duty',
    employee: zh ? '数字员工' : 'Digital employee',
    service: zh ? '服务时间' : 'Service hours',
    online: zh ? '持续在线' : 'Online',
    running: zh ? '执行中' : 'In progress',
    delivered: zh ? '已交付' : 'Delivered',
    day: zh ? '日间值守' : 'Day shift',
    night: zh ? '夜间值守' : 'Night shift',
    scenes: [
      { id: 'reconciliation', time: '03:00', minute: 180, icon: 'layers',
        name: zh ? '业务核对' : 'Reconciliation', title: zh ? '夜间业务核对' : 'Overnight reconciliation',
        steps: zh ? ['读取业务流水', '定位核对差异', '交付差异清单'] : ['Read records', 'Find differences', 'Deliver findings'],
        destination: zh ? '财务工作群' : 'Finance team', file: zh ? '核对差异.xlsx' : 'Differences.xlsx' },
      { id: 'report', time: '06:30', minute: 390, icon: 'chart',
        name: zh ? '经营日报' : 'Business report', title: zh ? '开工前 日报已就绪' : 'The daily brief is ready before work',
        steps: zh ? ['汇总经营数据', '分析指标变化', '分发经营日报'] : ['Collect metrics', 'Analyze changes', 'Send daily brief'],
        destination: zh ? '经营工作群' : 'Management team', file: zh ? '经营日报.pdf' : 'Daily brief.pdf' },
      { id: 'monitoring', time: '14:20', minute: 860, icon: 'monitor',
        name: zh ? '监控告警' : 'Monitoring', title: zh ? '接口异常 及时通知值班人' : 'An incident reaches the on-call team',
        steps: zh ? ['识别异常信号', '整理影响范围', '通知值班负责人'] : ['Detect the signal', 'Summarize impact', 'Notify on-call owner'],
        destination: zh ? '运维值班群' : 'On-call team', file: zh ? '告警通知已送达' : 'Alert delivered' },
      { id: 'trends', time: '22:10', minute: 1330, icon: 'globe',
        name: zh ? '舆情与热点' : 'News & trends', title: zh ? '热点持续跟踪 重点提前掌握' : 'Keep track of the topics that matter',
        steps: zh ? ['追踪公开资讯', '归并重复主题', '交付热点简报'] : ['Track public sources', 'Group related topics', 'Deliver trend brief'],
        destination: zh ? '行业研究群' : 'Industry research team', file: zh ? '热点追踪简报' : 'Trend briefing' },
    ],
    reconciliation: {
      source: zh ? '订单台账 × 收款明细' : 'Orders × Payment records',
      checked: zh ? '已核对记录' : 'Records checked', differences: zh ? '差异记录' : 'Differences',
      columns: zh ? ['差异类型', '笔数', '涉及金额 / 元'] : ['Difference', 'Records', 'Amount / CNY'],
      rows: zh ? [['回款未关联', '9', '31,824.20'], ['金额不一致', '5', '12,638.45'], ['重复记录', '3', '3,865.00']]
        : [['Unmatched payments', '9', '31,824.20'], ['Amount differences', '5', '12,638.45'], ['Duplicate entries', '3', '3,865.00']],
      conclusion: zh ? '差异已分类 关联原始记录' : 'Differences classified and linked to source records',
    },
    report: {
      sales: zh ? '销售额 / 万元' : 'Sales / CNY 10k', orders: zh ? '成交笔数' : 'Completed orders', collection: zh ? '回款率' : 'Collection rate',
      chartTitle: zh ? '昨日分时销售额 / 万元' : 'Yesterday’s sales by time / CNY 10k',
      conclusion: zh ? '14–18 时贡献 53.5%销售额 晚间转化值得跟进' : '14:00–18:00 contributed 53.5% of sales. Review evening conversion.',
    },
    monitoring: {
      service: zh ? '订单查询接口' : 'Order-query service', severity: zh ? '需关注' : 'Attention',
      latency: zh ? 'P95 响应 / 秒' : 'P95 response / s', errors: zh ? '5 分钟失败请求' : 'Failed requests / 5 min',
      events: zh ? [['14:20:03', '异常信号已确认'], ['14:20:11', '影响范围：订单查询接口'], ['14:20:18', '值班负责人通知已送达']]
        : [['14:20:03', 'Incident signal confirmed'], ['14:20:11', 'Impact: order-query service'], ['14:20:18', 'Notification delivered to on-call owner']],
    },
    trends: {
      source: zh ? '公开资讯归集' : 'Public-source coverage', count: zh ? '条资讯' : 'articles', topics: zh ? '重点主题' : 'Key themes',
      rows: zh ? [['招采动态', '26', '企业 AI 采购进入方案评估'], ['治理要求', '19', '数据权限成为选型重点'], ['部署实践', '16', '轻量部署方案关注上升']]
        : [['Procurement', '26', 'Enterprise AI procurement moves into evaluation'], ['Governance', '19', 'Data access is a key selection criterion'], ['Deployment', '16', 'Interest in lighter deployment grows']],
    },
  };
}
