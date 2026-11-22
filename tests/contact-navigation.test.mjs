import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveContactReturn, resolveContactConfirmation } from '../shared/contact-navigation.mjs';

const origin = 'https://www.zhama.com';
const contact = `${origin}/zh/contact/?plan=enterprise`;

test('a confirmation dialog can return to the original page through browser history', () => {
  assert.deepEqual(resolveContactReturn(contact, `${origin}/zh/pricing/?team=enterprise#plans`, 3), { path: '/zh/pricing/?team=enterprise#plans', back: true });
});

test('direct contact visits and links opened in a new tab have useful return destinations', () => {
  assert.deepEqual(resolveContactReturn(`${origin}/en/contact/`, '', 4), { path: '/en/', back: false });
  assert.deepEqual(resolveContactReturn(contact, `${origin}/zh/pricing/`, 1), { path: '/zh/pricing/', back: false });
});

test('changing contact language retains the original entry page instead of looping back into the form', () => {
  assert.deepEqual(resolveContactReturn(`${origin}/en/contact/`, contact, 4, { path: '/zh/product/digital-employees/', back: true }), { path: '/zh/product/digital-employees/', back: false });
});

test('external entry pages use actual browser history and never become scripted redirect targets', () => {
  assert.deepEqual(resolveContactReturn(contact, 'https://search.invalid/results', 3), { path: '/zh/', back: true });
  const target = { path: '//redirect.invalid/', back: false };
  assert.deepEqual(resolveContactConfirmation(contact, target, 3), { path: '/zh/', back: false });
});

test('missing return information falls back without traversing unrelated history', () => {
  const url = `${origin}/zh-Hant/contact/`;
  for (const target of [null, {}, { back: 'true' }]) {
    assert.deepEqual(resolveContactConfirmation(url, target, 4), { path: '/zh-Hant/', back: false });
  }
});

test('confirmation cannot return to another contact page or execute a non-HTTP destination', () => {
  const url = `${origin}/en/contact/`;
  for (const path of ['/en/contact/', '/en/contact/submitted/', 'javascript:alert(1)']) {
    assert.equal(resolveContactConfirmation(url, { path }, 1).path, '/en/');
  }
  assert.deepEqual(resolveContactReturn(contact, 'javascript:alert(1)', 4), { path: '/zh/', back: false });
});
