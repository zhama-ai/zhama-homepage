import { createHash, randomUUID } from 'node:crypto';
import { isIP } from 'node:net';
import { LeadStore } from './store.mjs';
import { createDelivery } from './delivery.mjs';
import { configurationStatus } from './config.mjs';
import { normalizeSourceTrail } from '../../shared/contact-attribution.mjs';
import { contactLanguageFor } from '../../shared/contact-languages.mjs';
import { Converter } from 'opencc-js';

const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const LIMIT = 49152;
const errorCode = error => /^[A-Z0-9_]{1,64}$/.test(error?.code || '') ? error.code : 'DELIVERY_FAILED';
const traditionalChinese = Converter({ from: 'cn', to: 'tw' });

export function validateLead(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const limits = { title: 160, email: 254, phone: 40, content: 6000, plan: 80, referrer: 2048, nickname: 80, expectedReplyTime: 160, contact: 254 };
  const value = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (body[key] !== undefined && typeof body[key] !== 'string') return null;
    value[key] = (body[key] || '').trim();
    if (value[key].length > limit || /\u0000/.test(value[key])) return null;
  }
  if (!value.title || !value.content || (!value.contact && !value.email && !value.phone)) return null;
  if (/[\r\n]/.test(value.title + value.contact + value.email + value.phone + value.plan + value.nickname + value.expectedReplyTime)) return null;
  if (!value.contact) delete value.contact;
  value.email = value.email.toLowerCase();
  if (value.referrer) {
    try { const url = new URL(value.referrer); value.referrer = /^https?:$/.test(url.protocol) ? url.origin + url.pathname : ''; }
    catch { value.referrer = ''; }
  }
  if (body.sourceTrail !== undefined) {
    const trail = normalizeSourceTrail(body.sourceTrail);
    if (!trail) return null;
    value.sourceTrail = trail;
    const source = trail.filter(step => step.kind === 'page').at(-1);
    // The URL and readable journey must identify the same entry page.
    if (source && value.referrer) {
      const url = new URL(value.referrer);
      value.referrer = url.origin + source.path;
    } else if (!source) value.referrer = '';
  }
  return value;
}

async function readJson(request) {
  if (Number(request.headers['content-length']) > LIMIT) throw Object.assign(new Error('Body too large'), { status: 413 });
  const chunks = []; let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > LIMIT) throw Object.assign(new Error('Body too large'), { status: 413 });
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error('Invalid JSON'), { status: 400 }); }
}

export function createContactApp(config, { delivery = createDelivery(config), store = new LeadStore(config.dataDir), logger = console } = {}) {
  const requests = new Map();
  let worker;
  let closed = false;
  const writeLog = (event, leadId, code) => logger.info(JSON.stringify({ event, leadId, ...(code ? { code } : {}) }));
  async function deliverPending() {
    if (closed) return;
    if (worker) return worker;
    worker = (async () => {
      for (const id of await store.list()) {
        if (closed) break;
        let lead, channels;
        try {
          lead = await store.get(id);
          if (!lead) continue;
          const validState = state => state && ['pending', 'delivered'].includes(state.status) && Number.isInteger(state.attempts) && state.attempts >= 0 && Number.isFinite(state.nextAttempt) && state.nextAttempt >= 0;
          if (lead.id !== id || !Array.isArray(lead.delivery?.email) || !lead.delivery.email.every(item => validState(item) && typeof item.recipient === 'string') || (lead.delivery.feishu && !validState(lead.delivery.feishu))) throw Object.assign(new Error('Invalid lead record'), { code: 'INVALID_LEAD_RECORD' });
          channels = [
            ...lead.delivery.email.map(item => ({ state: item, send: () => delivery.email(lead, item.recipient), name: 'email' })),
            ...(lead.delivery.feishu ? [{ state: lead.delivery.feishu, send: () => delivery.feishu(lead), name: 'feishu' }] : []),
          ];
        } catch (error) {
          writeLog('lead_record_unavailable', id, error instanceof SyntaxError ? 'INVALID_LEAD_JSON' : errorCode(error));
          continue;
        }
        for (const channel of channels) {
          if (closed) break;
          if (channel.state.status === 'delivered' || channel.state.nextAttempt > Date.now()) continue;
          try {
            const receipt = await channel.send();
            Object.assign(channel.state, { status: 'delivered', deliveredAt: new Date().toISOString(), lastError: null, ...(receipt?.messageId ? { messageId: receipt.messageId } : {}), ...(receipt?.messageType ? { messageType: receipt.messageType } : {}) });
            writeLog(`${channel.name}_accepted`, id);
          } catch (error) {
            channel.state.attempts += 1;
            channel.state.lastError = errorCode(error);
            channel.state.nextAttempt = Date.now() + Math.min(3600000, 15000 * 2 ** Math.min(channel.state.attempts - 1, 8));
            writeLog(`${channel.name}_pending`, id, channel.state.lastError);
          }
          await store.write(lead);
        }
      }
    })().finally(() => { worker = undefined; });
    return worker;
  }
  const timer = setInterval(() => { deliverPending().catch(() => writeLog('delivery_worker_failed')); }, 15000);
  timer.unref();
  queueMicrotask(() => { deliverPending().catch(() => writeLog('delivery_worker_failed')); });

  async function handle(request, response) {
    const url = new URL(request.url || '/', 'http://contact.internal');
    if (!['/api/contact', '/api/contact/'].includes(url.pathname)) return false;
    const language = contactLanguageFor(request.headers['accept-language']);
    const reply = (status, body, headers = {}) => {
      if (response.destroyed || response.writableEnded) return true;
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Language': language === 'zh' ? 'zh-CN' : language, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers });
      response.end(JSON.stringify(body)); return true;
    };
    const message = (cn, en) => language === 'en' ? en : language === 'zh-Hant' ? traditionalChinese(cn) : cn;
    if (closed) return reply(503, { success: false, message: message('咨询服务正在重启，请稍后重试。', 'The enquiry service is restarting. Please try again shortly.') }, { 'Retry-After': '5' });
    const origin = request.headers.origin;
    response.setHeader('Vary', 'Accept-Language');
    if (origin && !config.origins.has(origin)) return reply(403, { success: false, message: message('不允许从此页面提交。', 'Submissions from this page are not allowed.') });
    if (origin) { response.setHeader('Access-Control-Allow-Origin', origin); response.setHeader('Vary', 'Origin, Accept-Language'); }
    if (request.method === 'OPTIONS') return reply(204, {}, { 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Idempotency-Key, Accept-Language', 'Access-Control-Max-Age': '600' });
    if (request.method !== 'POST') return reply(405, { success: false, message: message('此接口仅支持提交消息。', 'This endpoint only accepts message submissions.') }, { Allow: 'POST, OPTIONS' });
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] || '')) return reply(415, { success: false, message: message('请求格式不正确。', 'The request format is not supported.') });
    if (request.headers['content-encoding'] && request.headers['content-encoding'] !== 'identity') return reply(415, { success: false, message: message('请求格式不正确。', 'The request format is not supported.') });
    const forwarded = config.trustProxy ? String(request.headers['x-forwarded-for'] || '').split(',').at(-1)?.trim() : '';
    const ip = isIP(forwarded || '') ? forwarded : request.socket.remoteAddress || 'unknown';
    const now = Date.now();
    for (const [key, item] of requests) if (item.reset <= now) requests.delete(key);
    if (!requests.has(ip) && requests.size >= 10000) return reply(429, { success: false, message: message('咨询较多，请稍后重试。', 'Please try again shortly.') }, { 'Retry-After': '60' });
    const quota = requests.get(ip) || { count: 0, reset: now + config.rateLimit.windowMs };
    requests.set(ip, quota);
    if (quota.count >= config.rateLimit.max) return reply(429, { success: false, message: message('提交过于频繁，请稍后重试。', 'Too many submissions. Please try again later.') }, { 'Retry-After': String(Math.ceil((quota.reset - now) / 1000)), 'X-RateLimit-Remaining': '0' });
    quota.count += 1;
    response.setHeader('X-RateLimit-Remaining', String(config.rateLimit.max - quota.count));
    try {
      const body = await readJson(request);
      if (body?.website) return reply(400, { success: false, message: message('请重新填写咨询信息。', 'Please complete the enquiry again.') });
      const value = validateLead(body);
      if (!value) return reply(400, { success: false, message: message('请填写咨询主题、内容和联系方式。', 'Enter a subject, message, and contact details.') });
      const key = request.headers['idempotency-key'] || body.requestId || randomUUID();
      if (typeof key !== 'string' || !UUID.test(key)) return reply(400, { success: false, message: message('提交标识无效，请刷新页面。', 'Invalid submission ID. Refresh the page.') });
      const id = key.toLowerCase();
      const { nickname, expectedReplyTime, ...originalFields } = value;
      const fingerprintValue = { ...originalFields, ...(nickname ? { nickname } : {}), ...(expectedReplyTime ? { expectedReplyTime } : {}) };
      const fingerprint = createHash('sha256').update(JSON.stringify(fingerprintValue)).digest('hex');
      let existing = await store.get(id);
      if (!existing && !configurationStatus(config).email) return reply(503, { success: false, message: message('咨询接收服务尚未连接邮箱，请直接联系 contact@zhama.com。', 'The enquiry email service is not connected. Email contact@zhama.com directly.') });
      if (!existing) {
        const state = () => ({ status: 'pending', attempts: 0, nextAttempt: 0 });
        const lead = { id, ...value, fingerprint, createdAt: new Date().toISOString(), delivery: {
          email: config.recipients.map(recipient => ({ recipient, ...state() })),
          feishu: config.feishu.enabled ? state() : null,
        } };
        try { await store.write(lead, { create: true }); writeLog('lead_received', id); }
        catch (error) { if (error.code !== 'EEXIST') throw error; existing = await store.get(id); }
      }
      if (existing && existing.fingerprint !== fingerprint) return reply(409, { success: false, message: message('内容已变更，请重新提交。', 'The message has changed. Submit it again.') });
      const result = reply(existing ? 200 : 201, { success: true, message: message('信息已收到，我们通常在24小时内回复。', 'Your message has been received. We typically reply within 24 hours.'), leadId: id });
      setImmediate(() => { deliverPending().catch(() => writeLog('delivery_worker_failed', id)); });
      return result;
    } catch (error) {
      const status = [400, 413].includes(error.status) ? error.status : 503;
      writeLog('contact_request_failed', undefined, status === 503 ? 'STORAGE_UNAVAILABLE' : `HTTP_${status}`);
      return reply(status, { success: false, message: message(status === 413 ? '内容过长，请缩短后提交。' : status === 400 ? '提交内容格式不正确。' : '信息未能保存，请稍后重试或直接发送邮件。', status === 413 ? 'The message is too long.' : status === 400 ? 'The message format is invalid.' : 'Your message could not be saved. Try again or contact us by email.') });
    }
  }
  return { handle, deliverPending, async close() { closed = true; clearInterval(timer); if (worker) await worker; delivery.close?.(); } };
}
