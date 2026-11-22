import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createSatteriMarkdownProcessor } from '@astrojs/markdown-satteri';
import { parseFragment } from 'parse5';
import { articleLinksPlugin } from '../scripts/article-links.mjs';

const render = async (source, plugins = [articleLinksPlugin]) => {
  const processor = await createSatteriMarkdownProcessor({ syntaxHighlight: false, hastPlugins: plugins });
  return (await processor.render(source)).code;
};
const inspect = html => {
  const links = [];
  const text = [];
  const tags = [];
  const walk = node => {
    if (node.tagName) tags.push(node.tagName);
    if (node.tagName === 'a') links.push(node.attrs.find(attr => attr.name === 'href')?.value);
    if (node.nodeName === '#text') text.push(node.value);
    node.childNodes?.forEach(walk);
  };
  walk(parseFragment(html));
  return { links, text: text.join(''), tags };
};

test('article links use confirmed workspace and protocol destinations, preserving query and fragment', async () => {
  const source = '[工作空间](https://app.zhama.com) [English](https://app.zhama.com/?lang=en#projects) [协议规范](https://spec.modelcontextprotocol.io/)';
  const result = inspect(await render(source));
  assert.deepEqual(result.links, [
    'https://zhama.ai/',
    'https://zhama.ai/?lang=en#projects',
    'https://modelcontextprotocol.io/specification/latest',
  ]);
  assert.equal(result.text, inspect(await render(source, [])).text);
});

test('unavailable historical anchors and the local tutorial link retain every label and inline element', async () => {
  const source = '[**@zhama/mcp-server**](https://github.com/zhama-ai/mcp-server) [GitHub Discussions](https://github.com/zhama-ai/mcp-server/discussions/) [本地 `localhost:5174`](http://localhost:5174)\n\nOpen http://localhost:5174 to continue.';
  const result = inspect(await render(source));
  const before = inspect(await render(source, []));
  assert.deepEqual(result.links, []);
  assert.equal(result.text, before.text);
  assert.ok(result.tags.includes('strong'));
  assert.ok(result.tags.includes('code'));
  assert.ok(!result.tags.includes('span'));
});

test('matching is limited to the audited destinations and does not change code samples or other paths', async () => {
  const source = '[Other path](https://app.zhama.com/help) [Other repository](https://github.com/zhama-ai/conductor-mcp-server) [Other host](https://app.zhama.com.invalid/) [Internal](#api) [Email](mailto:business@zhama.com)\n\n`https://app.zhama.com`\n\n```sh\ncurl https://spec.modelcontextprotocol.io/\n```';
  const result = inspect(await render(source));
  const before = inspect(await render(source, []));
  assert.deepEqual(result.links, before.links);
  assert.equal(result.text, before.text);
});

test('existing Chinese and English historical articles render repaired links without changing their source files', async () => {
  for (const locale of ['zh', 'en']) {
    for (const name of ['2026-04-22-per-user-isolated-instances', '2024-11-16-building-custom-mcp-servers-for-claude', '2026-01-13-a2ui-wechat-article']) {
      const file = new URL(`../src/content/blog/${locale}/${name}.md`, import.meta.url);
      const source = readFileSync(file, 'utf8');
      const before = inspect(await render(source, []));
      const result = inspect(await render(source));
      assert.equal(result.text, before.text, `${locale}/${name}: article text is preserved`);
      assert.equal(readFileSync(file, 'utf8'), source, `${locale}/${name}: source remains unchanged`);
      assert.ok(result.links.every(href => ![
        'https://app.zhama.com',
        'https://spec.modelcontextprotocol.io/',
        'https://github.com/zhama-ai/mcp-server',
        'https://github.com/zhama-ai/mcp-server/discussions',
        'http://localhost:5174',
      ].includes(href)), `${locale}/${name}: unavailable links are no longer active`);
    }
  }
});
