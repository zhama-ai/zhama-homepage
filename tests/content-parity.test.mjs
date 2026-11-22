import test from 'node:test';
import assert from 'node:assert/strict';
import { parse } from 'parse5';
import { marketingStructure } from '../shared/content-parity.mjs';

test('translation parity detects omitted business values and platform reasons', () => {
  const page = (value, reasons) => parse(`<main><section id="credit"><h2>Credit</h2>${value ? '<p class="industry-value-result">Evidence</p>' : ''}</section><ul class="industry-value-why-reasons">${'<li><h3>Method</h3></li>'.repeat(reasons)}</ul></main>`);
  const complete = marketingStructure(page(true, 3));
  assert.notDeepEqual(marketingStructure(page(false, 3)), complete);
  assert.notDeepEqual(marketingStructure(page(true, 0)), complete);
  assert.equal(complete.values, 1);
  assert.equal(complete.reasons, 3);
});

test('parity detects missing role components while allowing different text and translated line breaks', () => {
  const page = content => parse(`<header><h2>Navigation</h2></header><main><section id="role"><h1>${content}</h1><dl><dt>Identity</dt><dd>Scope</dd><dt>Tools</dt><dd>Rules</dd></dl></section></main>`);
  assert.deepEqual(marketingStructure(page('数字员工')), marketingStructure(page('Digital<br>employee')));
  assert.notDeepEqual(marketingStructure(page('Digital employee')), marketingStructure(parse('<main><section id="role"><h1>Employee</h1><dl><dt>Identity</dt><dd>Scope</dd></dl></section></main>')));
});
