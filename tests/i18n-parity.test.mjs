import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { DOCS_PATHS, DOCS_URL, docsUrl } from '../src/lib/external-links.ts';

const load = (locale) =>
  JSON.parse(readFileSync(new URL(`../src/messages/${locale}.json`, import.meta.url), 'utf8'));

function shape(value, prefix = '') {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => shape(item, `${prefix}[${i}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => shape(child, prefix ? `${prefix}.${key}` : key));
  }
  return [prefix];
}

test('zh and en messages have the same keys', () => {
  const zh = new Set(shape(load('zh')));
  const en = new Set(shape(load('en')));
  assert.deepEqual([...zh].filter((key) => !en.has(key)), [], 'keys missing in en.json');
  assert.deepEqual([...en].filter((key) => !zh.has(key)), [], 'keys missing in zh.json');
});

test('docs deep links are unique, rooted and stay on the docs host', () => {
  const paths = Object.values(DOCS_PATHS);
  assert.equal(new Set(paths).size, paths.length, 'duplicate docs path');
  for (const path of paths) assert.ok(path.startsWith('/'), `${path} must start with /`);
  for (const page of Object.keys(DOCS_PATHS)) {
    assert.equal(new URL(docsUrl(page)).origin, DOCS_URL);
  }
  assert.equal(docsUrl(), `${DOCS_URL}/`);
});
