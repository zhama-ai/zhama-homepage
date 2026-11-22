import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import { contactContent } from '../src/features/contact/content.ts';
import * as contactFields from '../shared/contact-fields.mjs';
import * as contactNavigation from '../shared/contact-navigation.mjs';

const source = await readFile(new URL('../src/features/contact/form.ts', import.meta.url), 'utf8');
const runtime = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

class Element extends EventTarget {
  dataset = {};
  attributes = new Map();
  hidden = true;
  textContent = '';
  disabled = false;
  focusCount = 0;
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  focus() { this.focusCount++; }
}

function fixture(reply = async () => new Response(JSON.stringify({ success: true, leadId: 'server-receipt' }), { headers: { 'content-type': 'application/json' } }), signal, attribution = { sourceTrail: [], referrer: '' }) {
  const values = { title: '私有化部署咨询', content: '希望了解企业知识接入与权限配置。', contact: 'consultant@contacts.invalid', nickname: '', expectedReplyTime: '', website: '' };
  const fields = new Map(Object.entries(values).map(([name, value]) => {
    const field = new Element();
    Object.assign(field, { id: `enquiry-${name}`, name, value, required: ['title', 'content', 'contact'].includes(name), maxLength: name === 'content' ? 6000 : name === 'title' ? 160 : name === 'nickname' ? 80 : 254 });
    return [name, field];
  }));
  const errors = new Map([...fields.values()].map(field => [`#${field.id}-error`, new Element()]));
  const form = new Element();
  form.dataset = { locale: 'zh', contactApi: '/api/contact/' };
  form.elements = { namedItem: name => fields.get(name) };
  const status = new Element();
  const submit = new Element();
  let resets = 0;
  let confirmations = 0;
  let replyResets = 0;
  form.querySelector = selector => selector === '[type="submit"]' ? submit : errors.get(selector);
  form.reset = () => { resets++; fields.forEach(field => { field.value = ''; }); };
  let onSubmit;
  const register = form.addEventListener.bind(form);
  form.addEventListener = (type, listener, ...options) => {
    if (type === 'submit') onSubmit = listener;
    else register(type, listener, ...options);
  };
  const notifications = [];
  form.addEventListener('tego:contact-status', event => {
    assert.equal(event.bubbles, true);
    const detail = JSON.parse(JSON.stringify(event.detail));
    assert.deepEqual(Object.keys(detail).sort(), detail.reason ? ['reason', 'status'] : ['status']);
    notifications.push(detail);
  });
  const requests = [];
  const document = {
    querySelector: selector => selector === '#enquiry-form' ? form : selector === '#enquiry-status' ? status : null,
    documentElement: { lang: 'zh-CN' }, referrer: '',
  };
  const location = { href: 'https://www.zhama.com/zh/contact/', search: '', origin: 'https://www.zhama.com' };
  const history = { length: 1, state: {}, replaceState(state) { this.state = state; } };
  const memory = new Map();
  const imports = {
    './content': { contactContent },
    '../../../shared/contact-fields.mjs': contactFields,
    './reply-picker': { initReplyPicker: () => ({ reset() { replyResets++; } }) },
    '../../../shared/contact-navigation.mjs': contactNavigation,
    './confirmation': { initContactConfirmation: () => ({ show() { confirmations++; } }) },
    '../attribution/tracker': { getContactAttribution: () => attribution },
  };
  const exports = {};
  runInNewContext(runtime, {
    exports, document, location, history, CustomEvent, URLSearchParams, crypto, AbortSignal, Error, TypeError,
    sessionStorage: { getItem: key => memory.get(key) || null, setItem: (key, value) => memory.set(key, value) },
    FormData: class { constructor(form) { this.form = form; } get(name) { return this.form.elements.namedItem(name)?.value ?? null; } },
    fetch: async (url, options) => { requests.push({ url, options }); return reply(url, options); },
    require: name => { assert.ok(Object.hasOwn(imports, name), name); return imports[name]; },
  });
  exports.initContactForm(signal);
  return { form, fields, status, submit, notifications, requests, history, send: () => onSubmit(new Event('submit', { cancelable: true })), get resets() { return resets; }, get confirmations() { return confirmations; }, get replyResets() { return replyResets; } };
}

test('confirmation return uses the latest client route instead of the original document referrer', () => {
  const page = fixture(undefined, undefined, { sourceTrail: [{ path: '/zh/pricing/', label: '价格', kind: 'page' }], referrer: 'https://www.zhama.com/zh/pricing/' });
  assert.equal(page.history.state.contactReturn.path, '/zh/pricing/');
});

test('leaving the contact page cancels its request and cannot show a stale confirmation or error', async () => {
  const lifecycle = new AbortController();
  let receive;
  const page = fixture(() => new Promise(resolve => { receive = resolve; }), lifecycle.signal);
  const pending = page.send();
  assert.equal(page.requests.length, 1);
  lifecycle.abort();
  assert.equal(page.requests[0].options.signal.aborted, true);
  receive(new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json' } }));
  await pending;
  assert.deepEqual(page.notifications, [{ status: 'submit' }]);
  assert.equal(page.confirmations, 0);
  assert.equal(page.resets, 0);
  assert.equal(page.status.focusCount, 0);
  await page.send();
  assert.equal(page.requests.length, 1);
});

test('validation emits one fixed reason without requesting or reporting any field content', async () => {
  const missing = fixture();
  for (const name of ['title', 'content', 'contact']) missing.fields.get(name).value = '';
  await missing.send();
  assert.deepEqual(missing.notifications, [{ status: 'validation_error', reason: 'required' }]);
  assert.equal(missing.requests.length, 0);
  assert.equal(missing.fields.get('title').focusCount, 1);
  const tooLong = fixture();
  tooLong.fields.get('title').value = '业'.repeat(161);
  await tooLong.send();
  assert.deepEqual(tooLong.notifications, [{ status: 'validation_error', reason: 'too_long' }]);
  assert.equal(tooLong.requests.length, 0);
});

test('a valid request emits submit once, rejects concurrent duplicates and emits success only on acceptance', async () => {
  let receive;
  const page = fixture(() => new Promise(resolve => { receive = resolve; }));
  const pending = page.send();
  await page.send();
  assert.equal(page.requests.length, 1);
  assert.deepEqual(page.notifications, [{ status: 'submit' }]);
  assert.equal(page.submit.disabled, true);
  receive(new Response(JSON.stringify({ success: true, leadId: 'server-receipt' }), { status: 201, headers: { 'content-type': 'application/json' } }));
  await pending;
  assert.deepEqual(page.notifications, [{ status: 'submit' }, { status: 'success' }]);
  assert.equal(page.resets, 1);
  assert.equal(page.replyResets, 1);
  assert.equal(page.confirmations, 1);
  assert.equal(page.submit.disabled, false);
  assert.equal(page.form.getAttribute('aria-busy'), null);
  assert.doesNotMatch(JSON.stringify(page.notifications), /consultant|contacts\.invalid|server-receipt|私有化|企业知识/);
});

test('HTTP failures, malformed content and false success responses never report a conversion', async () => {
  for (const [body, status, contentType, reason] of [
    ['{"success":true}', 503, 'application/json', 'http'],
    ['{"success":false,"message":"请求未接受"}', 200, 'application/json', 'invalid_response'],
    ['{"success":"true"}', 200, 'application/json', 'invalid_response'],
    ['null', 200, 'application/json', 'invalid_response'],
    ['{', 200, 'application/json', 'invalid_response'],
    ['<html>请求失败</html>', 200, 'text/html', 'invalid_response'],
  ]) {
    const page = fixture(async () => new Response(body, { status, headers: { 'content-type': contentType } }));
    await page.send();
    assert.deepEqual(page.notifications, [{ status: 'submit' }, { status: 'error', reason }]);
    assert.equal(page.resets, 0);
    assert.equal(page.confirmations, 0);
    assert.equal(page.status.dataset.state, 'error');
    assert.equal(page.status.hidden, false);
    assert.equal(page.submit.disabled, false);
  }
});

test('transport failures use fixed reasons and preserve the request identity on retry', async () => {
  for (const [error, reason] of [[new TypeError('unreachable'), 'network'], [Object.assign(new Error('deadline'), { name: 'TimeoutError' }), 'timeout'], [Object.assign(new Error('aborted'), { name: 'AbortError' }), 'timeout']]) {
    let attempts = 0;
    const page = fixture(async () => {
      if (attempts++ === 0) throw error;
      return new Response('{"success":true}', { headers: { 'content-type': 'application/json' } });
    });
    await page.send();
    assert.deepEqual(page.notifications, [{ status: 'submit' }, { status: 'error', reason }]);
    await page.send();
    assert.deepEqual(page.notifications.slice(-2), [{ status: 'submit' }, { status: 'success' }]);
    assert.equal(page.requests[0].options.headers['Idempotency-Key'], page.requests[1].options.headers['Idempotency-Key']);
    assert.equal(page.confirmations, 1);
  }
});

test('unavailable event dispatch never prevents a valid enquiry from completing', async () => {
  const page = fixture();
  page.form.dispatchEvent = () => { throw new Error('event delivery unavailable'); };
  await page.send();
  assert.equal(page.requests.length, 1);
  assert.equal(page.confirmations, 1);
  assert.equal(page.resets, 1);
  assert.equal(page.submit.disabled, false);
});
