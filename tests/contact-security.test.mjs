import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { mkdtemp, rm, writeFile, symlink, stat, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { loadContactConfig, configurationStatus, projectRoot } from '../server/contact/config.mjs';
import { LeadStore } from '../server/contact/store.mjs';
import { createContactApp } from '../server/contact/app.mjs';
import { createDelivery } from '../server/contact/delivery.mjs';

const body = { title: '数字员工部署咨询', content: '了解企业知识接入与权限设置。', contact: 'procurement@inquiry.invalid' };
const state = () => ({ status: 'pending', attempts: 0, nextAttempt: 0 });
const record = id => ({ id, ...body, createdAt: new Date().toISOString(), delivery: { email: [{ recipient: 'contact@zhama.com', ...state() }, { recipient: 'secondary@notifications.invalid', ...state() }], feishu: state() } });
const logger = { info() {} };

async function directory(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'tego-contact-security-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

test('recipient defaults contain only the public business inbox and additional recipients require explicit configuration', () => {
  assert.deepEqual(loadContactConfig({}).recipients, ['contact@zhama.com']);
  assert.deepEqual(loadContactConfig({ CONTACT_EMAIL: 'sales@notifications.invalid', CONTACT_EXTRA_EMAIL: 'team@notifications.invalid; sales@notifications.invalid' }).recipients, ['sales@notifications.invalid', 'team@notifications.invalid']);
});

test('configuration rejects ambiguous booleans and unsafe public data directories without including values in errors', () => {
  for (const key of ['CONTACT_TRUST_PROXY', 'SMTP_SECURE', 'FEISHU_ENABLED']) {
    for (const value of ['yes', '1', 'FALSE', 'tru']) assert.throws(() => loadContactConfig({ [key]: value }), { message: `Invalid ${key}` });
    assert.doesNotThrow(() => loadContactConfig({ [key]: 'true' }));
    assert.doesNotThrow(() => loadContactConfig({ [key]: 'false' }));
  }
  for (const value of ['.', 'public', 'public/contact', 'dist', 'dist/private', projectRoot]) {
    assert.throws(() => loadContactConfig({ CONTACT_DATA_DIR: value }), { message: 'Invalid CONTACT_DATA_DIR' });
  }
  assert.equal(loadContactConfig({ CONTACT_DATA_DIR: 'public-backup' }).dataDir, path.resolve(projectRoot, 'public-backup'));
  assert.equal(configurationStatus(loadContactConfig({ FEISHU_ENABLED: 'true' })).feishu, false);
  assert.equal(configurationStatus(loadContactConfig({ FEISHU_ENABLED: 'false' })).feishu, true);
});

test('production origins exclude local development and every configured origin must be an origin URL', () => {
  assert.deepEqual([...loadContactConfig({ NODE_ENV: 'production' }).origins], ['https://www.zhama.com', 'https://zhama.com']);
  assert.ok(loadContactConfig({}).origins.has('http://127.0.0.1:4350'));
  for (const value of ['https://www.zhama.com/path', 'https://www.zhama.com/?private=1', 'https://www.zhama.com/#private', 'https://credentials@www.zhama.com', 'file:///private', 'not-a-url', 'https://www.zhama.com,']) {
    assert.throws(() => loadContactConfig({ CONTACT_ALLOWED_ORIGINS: value }), { message: 'Invalid CONTACT_ALLOWED_ORIGINS' });
  }
});

test('lead storage rejects path traversal, symbolic links and oversized records while keeping files private', async t => {
  const dataDir = await directory(t);
  const store = new LeadStore(dataDir);
  for (const id of ['../outside', '', 'not-an-id']) {
    await assert.rejects(store.get(id), { code: 'INVALID_LEAD_ID' });
    await assert.rejects(store.write({ id }), { code: 'INVALID_LEAD_ID' });
  }
  const id = randomUUID();
  await store.write(record(id), { create: true });
  assert.equal((await store.get(id)).id, id);
  if (process.platform !== 'win32') {
    assert.equal((await stat(dataDir)).mode & 0o777, 0o700);
    assert.equal((await stat(store.file(id))).mode & 0o777, 0o600);
  }
  const linkedId = randomUUID();
  await symlink(store.file(id), store.file(linkedId));
  await assert.rejects(store.get(linkedId));
  const linkedDirectory = path.join(dataDir, 'linked');
  await symlink(dataDir, linkedDirectory);
  await assert.rejects(new LeadStore(linkedDirectory).get(id), { code: 'INVALID_STORAGE_DIRECTORY' });
  const largeId = randomUUID();
  await writeFile(store.file(largeId), ' '.repeat(131073));
  await assert.rejects(store.get(largeId), { code: 'INVALID_LEAD_RECORD' });
  const circular = { id: randomUUID() }; circular.circular = circular;
  await assert.rejects(store.write(circular), TypeError);
  assert.deepEqual((await readdir(dataDir)).filter(name => name.endsWith('.tmp')), []);
});

test('corrupt and malformed saved records do not block healthy pending deliveries or expose their content in logs', async t => {
  const dataDir = await directory(t);
  const store = new LeadStore(dataDir);
  const corruptId = randomUUID(), malformedId = randomUUID(), healthyId = randomUUID();
  await writeFile(store.file(corruptId), '{private-input');
  await store.write({ id: malformedId, privateContent: 'private-input', delivery: { email: 'not-an-array' } });
  await store.write(record(healthyId));
  const calls = [], logs = [];
  const app = createContactApp(loadContactConfig({ CONTACT_DATA_DIR: dataDir }), {
    store: { list: async () => [corruptId, malformedId, healthyId], get: id => store.get(id), write: lead => store.write(lead) },
    delivery: { async email(lead, recipient) { calls.push([lead.id, recipient]); }, async feishu(lead) { calls.push([lead.id, 'feishu']); } },
    logger: { info(value) { logs.push(value); } },
  });
  t.after(() => app.close());
  await app.deliverPending();
  assert.equal(calls.length, 3);
  assert.ok(calls.every(([id]) => id === healthyId));
  assert.ok((await store.get(healthyId)).delivery.email.every(item => item.status === 'delivered'));
  assert.equal(logs.filter(value => JSON.parse(value).event === 'lead_record_unavailable').length, 2);
  assert.ok(logs.every(value => !value.includes('private-input')));
  assert.equal(await readFile(store.file(corruptId), 'utf8'), '{private-input');
});

test('closing the queue finishes its active channel and preserves unfinished channels for restart', async t => {
  const dataDir = await directory(t);
  const store = new LeadStore(dataDir), id = randomUUID();
  await store.write(record(id));
  let finish, entered;
  const started = new Promise(resolve => { entered = resolve; });
  const release = new Promise(resolve => { finish = resolve; });
  const calls = [];
  const app = createContactApp(loadContactConfig({ CONTACT_DATA_DIR: dataDir }), {
    delivery: { async email(_lead, recipient) { calls.push(recipient); entered(); await release; }, async feishu() { calls.push('feishu'); } }, logger,
  });
  await started;
  const closing = app.close();
  finish(); await closing;
  const saved = await store.get(id);
  assert.deepEqual(calls, ['contact@zhama.com']);
  assert.equal(saved.delivery.email[0].status, 'delivered');
  assert.equal(saved.delivery.email[1].status, 'pending');
  assert.equal(saved.delivery.feishu.status, 'pending');
});

test('closed service and unsupported content encoding reject requests before persisting a lead', async t => {
  const dataDir = await directory(t);
  const app = createContactApp(loadContactConfig({ CONTACT_DATA_DIR: dataDir, SMTP_HOST: '127.0.0.1', SMTP_USER: 'sender@notifications.invalid', SMTP_PASS: 'local-transport' }), { delivery: { async email() { assert.fail('rejected request must not send'); } }, logger });
  const server = createServer((request, response) => { app.handle(request, response).catch(error => { response.destroy(error); }); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(async () => { await app.close(); await new Promise(resolve => server.close(resolve)); });
  const url = `http://127.0.0.1:${server.address().port}/api/contact`;
  const options = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Encoding': 'gzip' }, body: JSON.stringify(body) };
  const unsupported = await fetch(url, options);
  assert.equal(unsupported.status, 415); await unsupported.text();
  await app.close();
  const closed = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json' } });
  assert.equal(closed.status, 503); assert.equal(closed.headers.get('retry-after'), '5'); await closed.text();
  assert.deepEqual((await readdir(dataDir)).filter(name => name.endsWith('.json')), []);
});

test('Feishu requests reject redirects for both secret exchange and authenticated notification', async () => {
  const requests = [];
  const delivery = createDelivery(loadContactConfig({ FEISHU_APP_ID: 'bot-contract', FEISHU_APP_SECRET: 'local-transport', FEISHU_CHAT_ID: 'market-leads' }), {
    transporter: { close() {} },
    fetchImpl: async (url, options) => { requests.push({ url, options }); return Response.json(url.includes('/auth/') ? { code: 0, tenant_access_token: 'contract-token', expire: 7200 } : { code: 0, data: { message_id: 'received' } }); },
  });
  await delivery.feishu(record(randomUUID()));
  assert.equal(requests.length, 2);
  assert.ok(requests.every(({ options }) => options.redirect === 'error' && options.signal instanceof AbortSignal));
  delivery.close();
});
