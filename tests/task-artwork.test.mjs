import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseFragment } from 'parse5';

const documentModule = new URL('../src/features/home/hero-task-scene-document.ts', import.meta.url);
const imports = await readFile(documentModule, 'utf8');
const attribute = (node, name) => node.attrs?.find(item => item.name === name)?.value;
const classes = node => (attribute(node, 'class') || '').split(/\s+/);
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');

for (const [locale, binding] of [['zh', 'chineseSource'], ['en', 'englishSource']]) {
  const path = imports.match(new RegExp(`import ${binding} from '([^']+)\\?raw'`))?.[1];
  assert.ok(path, `${locale} artwork is imported by the live scene document`);
  const source = await readFile(new URL(path, documentModule), 'utf8');
  const root = parseFragment(source).childNodes.find(node => node.tagName === 'template').content;
  const nodes = [];
  const walk = node => { nodes.push(node); (node.childNodes || []).forEach(walk); };
  walk(root);
  const ids = nodes.map(node => attribute(node, 'id')).filter(Boolean);
  const timeline = text(nodes.find(node => node.tagName === 'script'));

  test(`${locale}: editing artwork content leaves no missing animation target or duplicate ID`, () => {
    assert.equal(ids.length, new Set(ids).size);
    for (const match of timeline.matchAll(/tl\.(?:fromTo|to|set)\('([^']+)'/g)) {
      for (const selector of match[1].split(',')) {
        for (const token of selector.split(' ')) {
          if (token.endsWith('-')) continue;
          const exists = token.startsWith('#') ? ids.includes(token.slice(1))
            : token.startsWith('.') ? nodes.some(node => classes(node).includes(token.slice(1)))
            : nodes.some(node => node.tagName === token);
          assert.ok(exists, `Missing animation target: ${selector}`);
        }
      }
    }
    for (let index = 0; index < 5; index++) {
      assert.ok(ids.includes(`step-${index}`));
      assert.ok(ids.includes(`check-${index}`));
    }
  });

  test(`${locale}: the typed request, sent request and delivered client totals agree`, () => {
    const prompt = JSON.parse(timeline.match(/const prompt=("[^"]*");/)[1]);
    assert.equal(text(nodes.find(node => classes(node).includes('user-message'))), prompt);
    const metrics = nodes.filter(node => classes(node).includes('metric'));
    assert.deepEqual(metrics.map(node => text(node.childNodes.find(child => child.tagName === 'strong'))), ['12,863.42', '472.80', '23']);
    const counts = nodes.filter(node => classes(node).includes('bar-value')).map(node => Number(text(node)));
    assert.equal(counts.reduce((sum, value) => sum + value, 0), Number(text(metrics[2].childNodes.find(child => child.tagName === 'strong'))));
    assert.equal(nodes.filter(node => classes(node).includes('output-file')).length, 2);
    assert.ok(nodes.some(node => classes(node).includes('receipt')));
  });
}
