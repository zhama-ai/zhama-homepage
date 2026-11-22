import { loadContactConfig, configurationStatus } from './config.mjs';
import { createDelivery } from './delivery.mjs';

const config = loadContactConfig();
const status = configurationStatus(config);
console.info('Channel configuration:', status);
let failed = false;
if (status.email) {
  const delivery = createDelivery(config);
  try { await delivery.verifyEmail(); console.info('SMTP TLS and authentication: passed'); }
  catch (error) { failed = true; console.error('SMTP verification failed:', error.code || 'CONNECTION_FAILED'); }
  finally { delivery.close(); }
} else { failed = true; console.error('SMTP_HOST, SMTP_USER, SMTP_PASS and SMTP_FROM must be configured.'); }
if (config.feishu.enabled) {
  try {
    const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_id: config.feishu.appId, app_secret: config.feishu.appSecret }), signal: AbortSignal.timeout(15000),
    });
    const auth = await response.json();
    if (!response.ok || auth.code !== 0 || !auth.tenant_access_token) throw Object.assign(new Error(), { code: auth.code || response.status });
    const headers = { Authorization: `Bearer ${auth.tenant_access_token}` };
    const groupsResponse = await fetch('https://open.feishu.cn/open-apis/im/v1/chats?page_size=100', { headers, signal: AbortSignal.timeout(15000) });
    const groups = await groupsResponse.json();
    if (!groupsResponse.ok || groups.code !== 0) throw Object.assign(new Error(), { code: groups.code || groupsResponse.status });
    console.info('Robot groups:', groups.data.items.map(item => ({ name: item.name, chatId: item.chat_id, selected: item.chat_id === config.feishu.chatId })));
    if (!config.feishu.chatId) { failed = true; console.error('FEISHU_CHAT_ID must select the lead notification group.'); }
    else if (!groups.data.items.some(item => item.chat_id === config.feishu.chatId) && !groups.data.has_more) { failed = true; console.error('The configured notification group was not found.'); }
  } catch (error) { failed = true; console.error('Feishu verification failed:', error.code || 'CONNECTION_FAILED'); }
}
if (failed) process.exitCode = 1;
