import nodemailer from 'nodemailer';
import { createHash } from 'node:crypto';
import { buildLeadCard } from './card.mjs';
import { DEFAULT_REPLY_TIME, isContactEmail, leadContact } from '../../shared/contact-fields.mjs';
import { leadJourney } from '../../shared/contact-attribution.mjs';

export function formatLead(lead) {
  return [
    '官网新增咨询', '线索来源：官网', `线索编号：${lead.id}`, `咨询主题：${lead.title}`,
    `联系方式：${leadContact(lead)}`,
    `期望回复时间：${lead.expectedReplyTime || DEFAULT_REPLY_TIME}`,
    ...(leadJourney(lead) ? [`来源路径：${leadJourney(lead)}`] : []),
    `提交时间：${new Date(lead.createdAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })}（北京时间）`,
    '', '咨询内容：', lead.content,
    ...(lead.nickname ? ['', `昵称：${lead.nickname}`] : []),
    ...(lead.plan ? ['', `关注方案：${lead.plan}`] : []),
  ].join('\n');
}

export function createDelivery(config, { fetchImpl = fetch, transporter } = {}) {
  const smtp = transporter || nodemailer.createTransport({
    host: config.smtp.host, port: config.smtp.port, secure: config.smtp.secure,
    requireTLS: !config.smtp.secure,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
    connectionTimeout: 15000, greetingTimeout: 10000, socketTimeout: 20000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  let cachedToken;
  let tokenExpires = 0;
  async function feishuRequest(url, options) {
    const response = await fetchImpl(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(15000) });
    const data = await response.json();
    if (!response.ok || data.code !== 0) {
      const error = new Error('Feishu request failed');
      error.code = `FEISHU_${Number.isInteger(data.code) ? data.code : response.status}`;
      throw error;
    }
    return data;
  }
  async function getToken() {
    if (cachedToken && tokenExpires > Date.now()) return cachedToken;
    const data = await feishuRequest('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_id: config.feishu.appId, app_secret: config.feishu.appSecret }),
    });
    if (!data.tenant_access_token) throw Object.assign(new Error('Feishu token missing'), { code: 'FEISHU_TOKEN_MISSING' });
    cachedToken = data.tenant_access_token;
    tokenExpires = Date.now() + Math.max(0, (Number(data.expire) - 120) * 1000);
    return cachedToken;
  }
  return {
    async email(lead, recipient) {
      const replyAddress = lead.contact || lead.email || '';
      const result = await smtp.sendMail({
        from: config.smtp.from, to: recipient, ...(isContactEmail(replyAddress) ? { replyTo: replyAddress } : {}),
        subject: `[官网线索] ${lead.title}`, text: formatLead(lead),
        messageId: `<${lead.id}.${createHash('sha256').update(recipient).digest('hex').slice(0, 12)}@zhama.com>`,
      });
      if (!result.accepted?.some(address => address.toLowerCase() === recipient.toLowerCase())) {
        throw Object.assign(new Error('Recipient rejected'), { code: 'SMTP_RECIPIENT_REJECTED' });
      }
      return { messageId: result.messageId };
    },
    async feishu(lead) {
      if (!config.feishu.chatId) throw Object.assign(new Error('Feishu group is not configured'), { code: 'FEISHU_CHAT_NOT_CONFIGURED' });
      const token = await getToken();
      try {
        const result = await feishuRequest('https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ receive_id: config.feishu.chatId, msg_type: 'interactive', content: JSON.stringify(buildLeadCard(lead)), uuid: lead.id }),
        });
        return { messageId: result.data?.message_id, messageType: 'interactive' };
      } catch (error) {
        if (['FEISHU_99991663', 'FEISHU_99991668'].includes(error.code)) { cachedToken = undefined; tokenExpires = 0; }
        throw error;
      }
    },
    verifyEmail: () => smtp.verify(),
    close: () => smtp.close(),
  };
}
