// 官网经营分析场景底稿；不代表 TeGo、客户或公司的实际经营业绩。
export const dashboardScenario = {
  provenance: '官网经营分析任务的设计场景',
  months: ['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'],
  categories: [
    { id: 'subscription', name: { zh: '企业订阅', en: 'Subscriptions' }, amounts: [36.2, 39.6, 41.3, 43.8, 44.6, 53.2], margin: .72 },
    { id: 'delivery', name: { zh: '项目交付', en: 'Project delivery' }, amounts: [24.8, 26.4, 25.1, 27.6, 29.1, 31.9], margin: .43 },
    { id: 'channel', name: { zh: '渠道合作', en: 'Channel partners' }, amounts: [13.1, 12.7, 13.6, 12.4, 14.2, 12.1], margin: .31 },
  ],
  orders: [108, 117, 121, 128, 136, 149],
  unit: '万元',
};
const sum=(values:number[])=>values.reduce((total,value)=>total+value,0);
export const dashboardRevenue=dashboardScenario.months.map((_,i)=>sum(dashboardScenario.categories.map(category=>category.amounts[i])));
export const dashboardProfit=dashboardScenario.months.map((_,i)=>sum(dashboardScenario.categories.map(category=>category.amounts[i]*category.margin)));
export const dashboardCurrent=dashboardRevenue.at(-1)!;
export const dashboardPrevious=dashboardRevenue.at(-2)!;
export const dashboardGrowth=(dashboardCurrent/dashboardPrevious-1)*100;
export const dashboardMargin=dashboardProfit.at(-1)!/dashboardCurrent*100;
export const dashboardAverage=dashboardCurrent*10000/dashboardScenario.orders.at(-1)!;
export const dashboardContributions=dashboardScenario.categories.map(category=>({...category,change:category.amounts.at(-1)!-category.amounts.at(-2)!}));
