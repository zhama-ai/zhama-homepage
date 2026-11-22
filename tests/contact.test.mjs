import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtemp, rm, readdir, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import nodemailer from 'nodemailer';
import { SMTPServer } from 'smtp-server';
import { createContactApp, validateLead } from '../server/contact/app.mjs';
import { loadContactConfig } from '../server/contact/config.mjs';
import { createDelivery } from '../server/contact/delivery.mjs';
import { LeadStore } from '../server/contact/store.mjs';
import { buildLeadCard } from '../server/contact/card.mjs';
import { DEFAULT_REPLY_TIME, IMMEDIATE_REPLY_TIME } from '../shared/contact-fields.mjs';
import { contactLanguageFor } from '../shared/contact-languages.mjs';

function cardElements(card) {
  const walk = elements => elements.flatMap(element => [element, ...walk(element.elements || []), ...walk(element.columns || [])]);
  return walk(card.body.elements);
}

const leadBody = { title: '企业版部署咨询', email: 'procurement@inquiry.invalid', phone: '', content: '需要了解数字员工的企业部署与业务系统集成。', plan: 'enterprise', referrer: 'https://www.zhama.com/zh/contact/?private=discard', nickname: '采购负责人', expectedReplyTime: '工作日下午14:00–17:00' };
const logger = { info() {} };
async function fixture(t, { max = 100, delivery, env = {} } = {}) {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), 'tego-contact-'));
  const config = loadContactConfig({ SMTP_HOST: '127.0.0.1', SMTP_USER: 'contact@zhama.com', SMTP_PASS: 'local-transport', CONTACT_DATA_DIR: dataDir, CONTACT_EXTRA_EMAIL: 'secondary@notifications.invalid', RATE_LIMIT_MAX: String(max), ...env });
  const calls = [];
  delivery ||= { async email(lead, recipient) { calls.push({ channel: 'email', recipient, id: lead.id }); }, async feishu(lead) { calls.push({ channel: 'feishu', id: lead.id }); } };
  const app = createContactApp(config, { delivery, logger });
  const server = createServer((req, res) => { app.handle(req, res).then(handled => { if (!handled) { res.writeHead(404); res.end(); } }); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await app.close(); await new Promise(resolve => server.close(resolve)); await rm(dataDir, { recursive: true, force: true }); });
  const url = `http://127.0.0.1:${server.address().port}/api/contact`;
  const post = (body = leadBody, id = randomUUID(), headers = {}) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': id, ...headers }, body: JSON.stringify(body) });
  return { config, app, post, url, calls, dataDir, store: new LeadStore(dataDir) };
}

test('contact response language respects Chinese scripts, regions and weighted browser preferences', () => {
  for (const [header, expected] of [
    ['', 'zh'], ['en-US', 'en'], ['EN-GB', 'en'], ['zh-CN', 'zh'],
    ['zh-Hant', 'zh-Hant'], ['zh-Hant-TW', 'zh-Hant'], ['zh-TW', 'zh-Hant'],
    ['zh-HK', 'zh-Hant'], ['zh-MO', 'zh-Hant'], ['zh-Hans-TW', 'zh'],
    ['fr-FR, en;q=0.6, zh-TW;q=0.8', 'zh-Hant'],
    ['zh-Hant;q=0, en;q=0.5', 'en'], ['zh-CN;q=0.9, en;q=0.5', 'zh'],
    ['zh-TW;q=invalid, en;q=0.5', 'en'], ['unsupported', 'zh'],
  ]) assert.equal(contactLanguageFor(header), expected, header);
});

test('Traditional Chinese API errors stay localized without persisting or delivering rejected requests', async t => {
  const f = await fixture(t, { env: { SMTP_PASS: '' } });
  for (const language of ['zh-Hant', 'zh-TW', 'zh-HK', 'zh-Hant-HK']) {
    const response = await f.post({}, randomUUID(), { 'Accept-Language': language });
    assert.equal(response.status, 400);
    assert.equal(response.headers.get('content-language'), 'zh-Hant');
    assert.equal((await response.json()).message, '請填寫諮詢主題、內容和聯繫方式。');
  }
  const unavailable = await f.post(leadBody, randomUUID(), { 'Accept-Language': 'zh-TW', Origin: 'https://www.zhama.com' });
  assert.equal(unavailable.status, 503);
  assert.equal(unavailable.headers.get('vary'), 'Origin, Accept-Language');
  assert.equal((await unavailable.json()).message, '諮詢接收服務尚未連接郵箱，請直接聯繫 contact@zhama.com。');
  const forbidden = await f.post(leadBody, randomUUID(), { 'Accept-Language': 'zh-HK', Origin: 'https://untrusted.invalid' });
  assert.equal(forbidden.status, 403);
  assert.equal((await forbidden.json()).message, '不允許從此頁面提交。');
  const english = await f.post({}, randomUUID(), { 'Accept-Language': 'en-US' });
  assert.equal(english.headers.get('content-language'), 'en');
  assert.equal((await english.json()).message, 'Enter a subject, message, and contact details.');
  const simplified = await f.post({}, randomUUID(), { 'Accept-Language': 'zh-Hans' });
  assert.equal(simplified.headers.get('content-language'), 'zh-CN');
  assert.equal((await simplified.json()).message, '请填写咨询主题、内容和联系方式。');
  assert.equal(f.calls.length, 0);
  assert.equal((await readdir(f.dataDir)).length, 0);
});

test('changing response language preserves submission fields and idempotency', async t => {
  const f = await fixture(t);
  const id = randomUUID();
  const created = await f.post(leadBody, id, { 'Accept-Language': 'zh-TW' });
  assert.equal(created.status, 201);
  assert.deepEqual(await created.json(), { success: true, message: '信息已收到，我們通常在24小時內回覆。', leadId: id });
  const before = await f.store.get(id);
  const duplicate = await f.post(leadBody, id, { 'Accept-Language': 'en-GB' });
  assert.equal(duplicate.status, 200);
  assert.deepEqual(await duplicate.json(), { success: true, message: 'Your message has been received. We typically reply within 24 hours.', leadId: id });
  const after = await f.store.get(id);
  assert.equal(after.fingerprint, before.fingerprint);
  assert.equal(after.content, leadBody.content);
  assert.equal(after.expectedReplyTime, leadBody.expectedReplyTime);
  assert.equal(Object.hasOwn(after, 'locale'), false);
  assert.equal(Object.hasOwn(after, 'language'), false);
  await f.app.deliverPending();
  assert.equal(f.calls.length, 2);
});

test('persists a lead and delivers once to both recipients and Feishu despite concurrent duplicate submissions', async t => {
  const f = await fixture(t, { env: { FEISHU_APP_ID: 'bot-contract', FEISHU_APP_SECRET: 'local-auth', FEISHU_CHAT_ID: 'market-leads' } });
  const id = randomUUID();
  const responses = await Promise.all([f.post(leadBody, id), f.post(leadBody, id)]);
  assert.deepEqual(responses.map(response => response.status).sort(), [200, 201]);
  assert.ok((await Promise.all(responses.map(response => response.json()))).every(value => value.success && value.leadId === id));
  await f.app.deliverPending();
  assert.equal(f.calls.length, 3);
  assert.deepEqual(f.calls.filter(call => call.channel === 'email').map(call => call.recipient).sort(), ['contact@zhama.com', 'secondary@notifications.invalid']);
  const lead = await f.store.get(id);
  assert.equal(lead.referrer, 'https://www.zhama.com/zh/contact/');
  assert.equal(lead.nickname, leadBody.nickname);
  assert.equal(lead.expectedReplyTime, leadBody.expectedReplyTime);
  assert.equal(lead.delivery.feishu.status, 'delivered');
  assert.ok(lead.delivery.email.every(item => item.status === 'delivered'));
  assert.equal((await stat(path.join(f.dataDir, `${id}.json`))).mode & 0o777, 0o600);
  assert.equal((await f.post({ ...leadBody, content: '另一项需求' }, id)).status, 409);
});

test('rejects malformed input, injection, unexpected origins, unsupported methods and oversize content', async t => {
  const f = await fixture(t);
  for (const body of [null, [], { ...leadBody, title: '  ' }, { ...leadBody, email: 29 }, { ...leadBody, email: '', phone: '' }, { ...leadBody, contact: 29 }, { ...leadBody, contact: 'x'.repeat(255) }, { ...leadBody, contact: '地址\r\nBcc: intruder@reserved.invalid' }, { ...leadBody, nickname: '称呼\r\n注入' }, { ...leadBody, expectedReplyTime: 'x'.repeat(161) }, { ...leadBody, title: '咨询\r\nBcc: intruder@reserved.invalid' }, { ...leadBody, content: 'x'.repeat(6001) }, { ...leadBody, website: 'spam' }]) {
    assert.equal((await f.post(body)).status, 400);
  }
  assert.equal((await f.post(leadBody, randomUUID(), { Origin: 'https://untrusted.invalid' })).status, 403);
  assert.equal((await fetch(f.url)).status, 405);
  assert.equal((await fetch(f.url, { method: 'POST', body: 'plain' })).status, 415);
  assert.equal((await fetch(f.url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' })).status, 400);
  assert.equal((await f.post({ ...leadBody, content: '文'.repeat(18000) })).status, 413);
  assert.equal((await readdir(f.dataDir)).filter(name => name.endsWith('.json')).length, 0);
});

test('rate limit consumes one quota per request and ignores spoofed forwarding headers by default', async t => {
  const f = await fixture(t, { max: 1 });
  assert.equal((await f.post(leadBody)).status, 201);
  const response = await f.post(leadBody, randomUUID(), { 'X-Forwarded-For': '192.0.2.47' });
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get('retry-after')) > 0);
});

test('missing SMTP configuration rejects submission without falsely claiming receipt', async t => {
  const f = await fixture(t, { env: { SMTP_PASS: '' } });
  assert.equal((await f.post()).status, 503);
  assert.equal((await readdir(f.dataDir)).length, 0);
});

test('a persisted failure survives restart and retries only the unfinished recipient and Feishu channel', async t => {
  let fail = true;
  const calls = [];
  const delivery = { async email(_lead, recipient) { calls.push(recipient); if (fail && recipient.startsWith('secondary@')) throw Object.assign(new Error('recipient unavailable'), { code: 'ETIMEDOUT' }); }, async feishu() { if (fail) throw Object.assign(new Error('permission denied'), { code: 'FEISHU_99991672' }); } };
  const f = await fixture(t, { delivery, env: { FEISHU_APP_ID: 'bot-contract', FEISHU_APP_SECRET: 'local-auth', FEISHU_CHAT_ID: 'market-leads' } });
  const id = randomUUID();
  await f.post(leadBody, id); await f.app.deliverPending(); await f.app.close();
  let lead = await f.store.get(id);
  assert.equal(lead.delivery.email[0].status, 'delivered'); assert.equal(lead.delivery.email[1].lastError, 'ETIMEDOUT');
  assert.equal(lead.delivery.feishu.lastError, 'FEISHU_99991672');
  lead.delivery.email[1].nextAttempt = 0; lead.delivery.feishu.nextAttempt = 0; await f.store.write(lead); fail = false;
  const restarted = createContactApp(f.config, { delivery, logger });
  await restarted.deliverPending(); await restarted.close();
  lead = await f.store.get(id);
  assert.ok(lead.delivery.email.every(item => item.status === 'delivered')); assert.equal(lead.delivery.feishu.status, 'delivered');
  assert.equal(calls.filter(recipient => recipient === 'contact@zhama.com').length, 1);
  assert.equal(calls.filter(recipient => recipient === 'secondary@notifications.invalid').length, 2);
});

test('real SMTP protocol preserves both recipients, reply-to and lead content; Feishu uses token and stable uuid', async t => {
  const messages = [];
  const smtpServer = new SMTPServer({ disabledCommands: ['AUTH', 'STARTTLS'], onData(stream, session, done) { let text = ''; stream.on('data', chunk => { text += chunk; }); stream.on('end', () => { messages.push({ envelope: session.envelope, text }); done(); }); } });
  await new Promise(resolve => smtpServer.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => smtpServer.close(resolve)));
  const config = loadContactConfig({ SMTP_HOST: '127.0.0.1', SMTP_USER: 'contact@zhama.com', SMTP_PASS: 'local-auth', CONTACT_EXTRA_EMAIL: 'secondary@notifications.invalid', FEISHU_APP_ID: 'bot-contract', FEISHU_APP_SECRET: 'local-auth', FEISHU_CHAT_ID: 'market-leads' });
  const transporter = nodemailer.createTransport({ host: '127.0.0.1', port: smtpServer.server.address().port, secure: false, ignoreTLS: true });
  const requests = [];
  const fetchImpl = async (url, options) => { requests.push({ url, ...options }); return Response.json(url.includes('/auth/') ? { code: 0, tenant_access_token: 'contract-token', expire: 7200 } : { code: 0, data: { message_id: 'accepted' } }); };
  const delivery = createDelivery(config, { transporter, fetchImpl });
  t.after(() => delivery.close());
  const lead = { ...validateLead({ ...leadBody, email: '', contact: leadBody.email }), id: randomUUID(), createdAt: new Date().toISOString() };
  for (const recipient of config.recipients) await delivery.email(lead, recipient);
  await delivery.feishu(lead); await delivery.feishu(lead);
  assert.deepEqual(messages.map(item => item.envelope.rcptTo[0].address), config.recipients);
  assert.ok(messages.every(item => /Reply-To: procurement@inquiry.invalid/i.test(item.text)));
  assert.ok(messages.every(item => item.text.includes(lead.id)));
  assert.equal(requests.filter(item => item.url.includes('/auth/')).length, 1);
  const request = requests.find(item => item.url.includes('/im/'));
  assert.equal(request.headers.Authorization, 'Bearer contract-token');
  const message = JSON.parse(request.body);
  assert.equal(message.uuid, lead.id);
  assert.equal(message.msg_type, 'interactive');
  const card = JSON.parse(message.content);
  assert.deepEqual(card, buildLeadCard(lead));
  assert.equal(cardElements(card).find(element => element.element_id === 'lead_message').text.content, lead.content);
});

test('Feishu HTTP 200 business error is treated as a delivery failure', async () => {
  const config = loadContactConfig({ FEISHU_APP_ID: 'bot-contract', FEISHU_APP_SECRET: 'local-auth', FEISHU_CHAT_ID: 'market-leads' });
  const delivery = createDelivery(config, { transporter: { close() {} }, fetchImpl: async () => Response.json({ code: 99991672, msg: 'permission denied' }) });
  await assert.rejects(delivery.feishu({}), { code: 'FEISHU_99991672' });
});

test('phone-only, email-only and combined contacts are accepted while nickname and reply time stay optional', async t => {
  const f = await fixture(t);
  for (const contact of [{ email: '', phone: '+1 202-555-0148' }, { email: '', phone: '123' }, { email: '', phone: '123456789012345678901' }, { email: 'procurement@inquiry.invalid', phone: '' }, { email: 'procurement@inquiry.invalid', phone: '+1 202-555-0148' }]) {
    const id = randomUUID();
    assert.equal((await f.post({ ...leadBody, ...contact, nickname: '', expectedReplyTime: '' }, id)).status, 201);
    const saved = await f.store.get(id);
    assert.equal(saved.nickname, ''); assert.equal(saved.expectedReplyTime, '');
    assert.equal(saved.phone, contact.phone); assert.equal(saved.email, contact.email);
    await f.app.deliverPending();
  }
  await f.app.deliverPending();
  assert.equal(f.calls.length, 10);
});

test('cards merge legacy contact channels into one field and keep visitor markup as plain text', () => {
  for (const contact of [{ email: '', phone: '+1 202-555-0148' }, { email: 'procurement@inquiry.invalid', phone: '' }, { email: 'procurement@inquiry.invalid', phone: '+1 202-555-0148' }]) {
    const card = buildLeadCard({ ...leadBody, ...contact, content: '<at id=all>所有人</at> **咨询正文**' });
    assert.equal(card.schema, '2.0');
    const elements = cardElements(card);
    const fields = elements.filter(element => element.element_id === 'lead_contact');
    assert.equal(fields.length, 1);
    assert.ok(fields.every(field => field.text.tag === 'plain_text'));
    assert.equal(fields[0].text.content, [contact.email, contact.phone].filter(Boolean).join(' / '));
    const body = elements.find(element => element.element_id === 'lead_message').text;
    assert.equal(body.tag, 'plain_text'); assert.equal(body.content, '<at id=all>所有人</at> **咨询正文**');
  }
});

test('default, scheduled and legacy immediate reply requests persist in the Feishu card and email', async t => {
  const f = await fixture(t);
  for (const expectedReplyTime of [DEFAULT_REPLY_TIME, '2026-11-23 上午', '2026-11-23 下午', IMMEDIATE_REPLY_TIME]) {
    const id = randomUUID();
    assert.equal((await f.post({ ...leadBody, expectedReplyTime }, id)).status, 201);
    const lead = await f.store.get(id);
    assert.equal(lead.expectedReplyTime, expectedReplyTime);
    const card = buildLeadCard(lead);
    assert.equal(Boolean(card.header.text_tag_list?.some(tag => tag.text.content === '即时联系')), expectedReplyTime === IMMEDIATE_REPLY_TIME);
    assert.equal(cardElements(card).find(element => element.element_id === 'lead_reply_time').text.content, expectedReplyTime);
    assert.equal(buildLeadCard(leadBody).header.text_tag_list, undefined);
    let mail;
    const delivery = createDelivery(f.config, { transporter: { async sendMail(message) { mail = message; return { accepted: [message.to] }; }, close() {} } });
    await delivery.email(lead, 'contact@zhama.com');
    assert.ok(mail.text.includes(`期望回复时间：${expectedReplyTime}`));
  }
  assert.equal(cardElements(buildLeadCard({ ...leadBody, expectedReplyTime: '' })).find(element => element.element_id === 'lead_reply_time').text.content, DEFAULT_REPLY_TIME);
});

test('phone-only email notification omits reply-to while retaining recipient and consultation details', async () => {
  const config = loadContactConfig({ SMTP_HOST: '127.0.0.1', SMTP_USER: 'contact@zhama.com', SMTP_PASS: 'local-auth' });
  let mail;
  const delivery = createDelivery(config, { transporter: { async sendMail(message) { mail = message; return { accepted: [message.to], messageId: message.messageId }; }, close() {} } });
  const lead = { ...leadBody, email: '', phone: '+1 202-555-0148', id: randomUUID(), createdAt: new Date().toISOString() };
  await delivery.email(lead, 'secondary@notifications.invalid');
  assert.equal(Object.hasOwn(mail, 'replyTo'), false);
  assert.ok(mail.text.includes(lead.phone)); assert.ok(mail.text.includes(lead.nickname)); assert.ok(mail.text.includes(lead.expectedReplyTime));
  assert.ok(!mail.text.includes('邮箱：'));
});

test('existing submissions without the new optional fields remain idempotent', async t => {
  const f = await fixture(t);
  const id = randomUUID();
  const originalFields = { title: leadBody.title, email: leadBody.email, phone: '', content: leadBody.content, plan: leadBody.plan, referrer: 'https://www.zhama.com/zh/contact/' };
  await f.store.write({ id, ...originalFields, fingerprint: createHash('sha256').update(JSON.stringify(originalFields)).digest('hex'), createdAt: new Date().toISOString(), delivery: { email: [], feishu: null } }, { create: true });
  assert.equal((await f.post(originalFields, id)).status, 200);
  assert.equal((await f.post({ ...originalFields, nickname: '', expectedReplyTime: '' }, id)).status, 200);
  assert.equal((await f.post({ ...originalFields, nickname: '新称呼' }, id)).status, 409);
});

test('one contact field accepts unrestricted formats and reaches storage, email and card without requiring a nickname', async t => {
  const f = await fixture(t);
  for (const contact of ['procurement@inquiry.invalid', '+1 (202) 555-0148 转 9', 'not-an-email', '<at id=all>联系</at>']) {
    const id = randomUUID();
    const body = { title: leadBody.title, content: leadBody.content, contact: ` ${contact} `, nickname: '' };
    assert.equal((await f.post(body, id)).status, 201);
    assert.equal((await f.post(body, id)).status, 200);
    const lead = await f.store.get(id);
    assert.equal(lead.contact, contact);
    assert.equal(lead.nickname, '');
    const contactText = cardElements(buildLeadCard(lead)).find(element => element.element_id === 'lead_contact').text;
    assert.equal(contactText.tag, 'plain_text'); assert.equal(contactText.content, contact);
    let mail;
    const delivery = createDelivery(f.config, { transporter: { async sendMail(value) { mail = value; return { accepted: [value.to] }; }, close() {} } });
    await delivery.email(lead, 'contact@zhama.com');
    assert.ok(mail.text.includes(`联系方式：${contact}`));
    assert.ok(!mail.text.includes('未留昵称'));
    assert.equal(mail.replyTo, contact === 'procurement@inquiry.invalid' ? contact : undefined);
    await f.app.deliverPending();
  }
  for (const contact of ['', '   ', null, 37]) {
    assert.equal((await f.post({ title: leadBody.title, content: leadBody.content, contact })).status, 400);
  }
  assert.equal(f.calls.length, 8);
});

test('source attribution is persisted with the lead and included in email and the plain-text Feishu card', async t => {
  const f = await fixture(t);
  const sourceTrail = [
    { path: '/zh/', label: '首页', kind: 'page' },
    { path: '/zh/solutions/', label: '解决方案', kind: 'menu' },
    { path: '/zh/solutions/banking/', label: '银行解决方案', kind: 'page' },
  ];
  const body = { ...leadBody, sourceTrail, referrer: 'https://www.zhama.com/zh/solutions/banking/?private=discard#private' };
  const id = randomUUID();
  assert.equal((await f.post(body, id)).status, 201);
  const saved = await f.store.get(id);
  assert.deepEqual(saved.sourceTrail, sourceTrail);
  assert.equal(saved.referrer, 'https://www.zhama.com/zh/solutions/banking/');
  const { formatLead } = await import('../server/contact/delivery.mjs');
  assert.ok(formatLead(saved).includes('来源路径：首页 → 解决方案 → 银行解决方案'));
  const elements = cardElements(buildLeadCard(saved));
  assert.equal(elements.find(e => e.element_id === 'lead_journey').text.content, '首页 → 解决方案 → 银行解决方案');
  assert.equal(elements.find(e => e.element_id === 'lead_journey').text.tag, 'plain_text');
  const contactRow = buildLeadCard(saved).body.elements[1];
  assert.equal(contactRow.columns[0].elements.find(e => e.element_id).element_id, 'lead_contact');
  assert.equal(contactRow.columns[1].elements.find(e => e.element_id).element_id, 'lead_journey');
  assert.equal(buildLeadCard(saved).body.elements[0].columns[1].elements.find(e => e.element_id).element_id, 'lead_reply_time');
  assert.ok(!JSON.stringify(buildLeadCard(saved)).includes('来源页面'));
  assert.ok(!JSON.stringify(buildLeadCard(saved)).includes('联系入口'));
  assert.equal((await f.post(body, id)).status, 200);
  assert.equal((await f.post({ ...body, sourceTrail: [] }, id)).status, 409);
});

test('attribution rejects malformed or oversized metadata and direct entries cannot claim a source URL', async t => {
  const f = await fixture(t);
  for (const extra of [
    {sourceTrail: '首页'}, {sourceTrail: [{path:'https://reserved.invalid/',label:'来源'}]},
    {sourceTrail: [{path:'/zh/contact/',label:'联系我们'}]},
    {sourceTrail: [{path:'/zh/blog/article/',label:'标题\r\n注入'}]},
    {sourceTrail: Array(21).fill({path:'/zh/',label:'首页'})},
  ]) assert.equal((await f.post({...leadBody,...extra})).status, 400);
  const direct = validateLead({...leadBody,sourceTrail:[]});
  assert.equal(direct.referrer, '');
  assert.equal(cardElements(buildLeadCard(direct)).find(e=>e.element_id==='lead_journey').text.content, '直接进入联系页');
});
