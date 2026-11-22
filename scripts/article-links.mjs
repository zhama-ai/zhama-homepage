const replacements = new Map([
  ['https://app.zhama.com', 'https://zhama.ai/'],
  ['https://spec.modelcontextprotocol.io', 'https://modelcontextprotocol.io/specification/latest'],
]);
const unavailable = new Set([
  'https://github.com/zhama-ai/mcp-server',
  'https://github.com/zhama-ai/mcp-server/discussions',
  'http://localhost:5174',
]);

/** @type {import('satteri').HastPluginDefinition} */
export const articleLinksPlugin = {
  name: 'tego-verified-article-links',
  element: {
    filter: ['a'],
    visit(node, context) {
      const href = node.properties.href;
      if (typeof href !== 'string') return;
      let destination;
      try { destination = new URL(href); } catch { return; }
      const target = destination.origin + destination.pathname.replace(/\/$/, '');
      if (unavailable.has(target)) {
        context.replaceNode(node, node.children);
        return;
      }
      const replacement = replacements.get(target);
      if (!replacement) return;
      const current = new URL(replacement);
      current.search = destination.search;
      current.hash = destination.hash;
      context.setProperty(node, 'href', current.href);
    },
  },
};
