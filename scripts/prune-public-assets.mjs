import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readdirSync, readFileSync, realpathSync, unlinkSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const visualExtension = /\.(?:avif|gif|jpe?g|png|svg|webp|webm|mp4)$/i;
const textExtension = /\.(?:astro|[cm]?[jt]sx?|css|html|json|webmanifest|xml|svg|md|mdx|py)$/i;
const assetExtension = /\.(?:avif|gif|jpe?g|png|svg|webp|webm|mp4|css|c?m?js|json|webmanifest|xml|woff2?|ttf|otf|ico|pdf|zip)(?:[?#].*)?$/i;
const publicPrefixes = ['images/', 'blog-assets/'];
const localOrigins = new Set(['https://www.zhama.com', 'https://zhama.com']);
const posix = value => value.split(path.sep).join('/');
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing to inspect a symbolic link: ${file}`);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function literals(text) {
  const result = [];
  for (let index = 0; index < text.length; index++) {
    const quote = text[index];
    if (!['"', "'", '`'].includes(quote)) continue;
    const start = ++index;
    while (index < text.length && text[index] !== quote) {
      if (text[index] === '\\') index++;
      index++;
    }
    if (index < text.length) result.push(text.slice(start, index).replace(/\\\//g, '/').replace(/\\(["'`])/g, '$1'));
  }
  return result;
}

function constantStrings(text) {
  const values = new Map();
  for (const match of text.matchAll(/\b(?:const|let|var)\s+(\w+)\s*=\s*(["'`])((?:\\[\s\S]|(?!\2)[\s\S])*?)\2/g)) values.set(match[1], match[3]);
  return values;
}

function expand(value, constants, depth = 0) {
  if (depth > 8) return value.replace(/\$\{[^}]*\}/g, '*');
  return value.replace(/\$\{([^}]*)\}/g, (_, expression) => {
    const name = expression.trim();
    return constants.has(name) ? expand(constants.get(name), constants, depth + 1) : '*';
  });
}

function normalPublic(value) {
  let clean = value.trim().replace(/^public\//, '/');
  if (/^https?:\/\//.test(clean)) {
    try { const url = new URL(clean); if (!localOrigins.has(url.origin)) return undefined; clean = url.pathname; }
    catch { return undefined; }
  }
  clean = clean.split(/[?#]/)[0];
  return /^\/(?:images|blog-assets)\//.test(clean) ? clean.slice(1) : undefined;
}

/** Match complete paths and dynamic filenames; incomplete prefixes never keep an entire directory. */
export function sourceAssetPatterns(text) {
  const constants = constantStrings(text);
  const values = literals(text).map(value => expand(value, constants));
  const result = new Set();
  for (const value of values) {
    const direct = normalPublic(value);
    if (direct && visualExtension.test(direct)) result.add(direct);
    // Python pathlib and JS path.join commonly keep the directory and filename in separate literals.
    if (visualExtension.test(value) && !value.includes('/') && value.length > 7) {
      for (const directory of values) {
        const normalized = normalPublic(directory);
        if (normalized && !path.posix.extname(normalized)) result.add(path.posix.join(normalized, value.replace(/\{\w+\}/g, '*')));
      }
    }
  }
  // Markdown and SVG references can be unquoted; read complete public paths as well.
  for (const match of text.matchAll(/\/(?:images|blog-assets)\/[^\s<>"'`\)]+\.(?:avif|gif|jpe?g|png|svg|webp|webm|mp4)/gi)) {
    if (!match[0].includes('${')) result.add(match[0].slice(1));
  }
  return [...result];
}

const patternRegex = pattern => new RegExp('^' + pattern.split('*').map(escapeRegex).join('.*') + '$');

function generatorInputPatterns(text) {
  // Generator destinations are reproducible outputs, not dependencies. The artwork generators
  // use named source/input assignments or read/open calls for the public inputs they consume.
  return [...new Set(text.split('\n').filter(line =>
    /\b(?:source|input|original|reference|seed)\b\s*=|\b(?:SOURCE|INPUT|ORIGINAL|REFERENCE|SEED)\b\s*=|\b(?:readFile(?:Sync)?|Image\.open|sharp)\s*\(/.test(line)
  ).flatMap(line => sourceAssetPatterns(line)))];
}

function decoded(value) { try { return decodeURIComponent(value); } catch { return value; } }

function resolveDistReference(value, from, dist) {
  let clean = value.trim().replace(/&amp;/g, '&').replace(/\\\//g, '/');
  if (!clean || /^(?:data:|blob:|mailto:|tel:|#|javascript:|\/\/)/i.test(clean)) return undefined;
  if (/^https?:/i.test(clean)) {
    let url;
    try { url = new URL(clean); } catch { return undefined; }
    if (!localOrigins.has(url.origin)) return undefined;
    clean = url.pathname;
  }
  if (!assetExtension.test(clean) || /[<>\s{}]/.test(clean) || /^\.[a-z\d]+$/i.test(clean)) return undefined;
  clean = decoded(clean.split(/[?#]/)[0]);
  if (/^_(?:astro|media)\//.test(clean)) clean = '/' + clean;
  const file = path.resolve(clean.startsWith('/') ? dist : path.dirname(from), '.' + (clean.startsWith('/') ? clean : '/' + clean));
  if (!file.startsWith(dist + path.sep)) return undefined;
  return file;
}

/** Follow only resources reachable from published documents, including nested SVG and CSS resources. */
export function publishedGraph(dist) {
  const files = walk(dist);
  const available = new Set(files);
  const entries = files.filter(file => /\.html$/i.test(file) || /(?:^|\/)(?:robots\.txt|[^/]*sitemap[^/]*\.xml|[^/]*manifest[^/]*\.(?:json|webmanifest))$/i.test(file));
  const queue = [...entries];
  const seen = new Set();
  const missing = new Map();
  const edges = new Map();
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file)) continue;
    seen.add(file);
    if (!textExtension.test(file)) continue;
    const body = readFileSync(file, 'utf8');
    const references = new Map();
    const add = (value, required = true) => {
      const target = resolveDistReference(value, file, dist);
      if (target && (required || available.has(target))) references.set(target, required || references.get(target) || false);
    };
    const executable = [];
    if (/\.html$/i.test(file)) {
      const visit = node => {
        for (const attribute of node.attrs || []) {
          if (/(?:^|-)srcset$/.test(attribute.name)) {
            for (const item of attribute.value.split(',')) add(item.trim().split(/\s+/)[0]);
          } else if (/^(?:src|href|xlink:href|poster|data|data-[\w-]*src|content)$/.test(attribute.name)) add(attribute.value);
          else if (attribute.name === 'style') executable.push(attribute.value);
        }
        if (['script', 'style'].includes(node.tagName)) executable.push((node.childNodes || []).map(child => child.value || '').join(''));
        for (const child of node.childNodes || []) visit(child);
        if (node.content) visit(node.content);
      };
      visit(parse(body));
    } else executable.push(body);
    for (const text of executable) {
      for (const match of text.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/gi)) add(match[1]);
      for (const value of literals(text)) add(value, false);
      for (const match of text.matchAll(/(?:\bfrom\s*|\b(?:import|fetch)\s*\(\s*|@import\s*)["'`]([^"'`]+)["'`]/g)) add(match[1]);
      for (const match of text.matchAll(/(?:https?:\/\/[^\s<>"'`]+|\/(?:images|blog-assets|_astro|_media|brand|artwork)\/[^\s<>"'`\)]+)/g)) add(match[0]);
    }
    edges.set(file, new Set(references.keys()));
    for (const [target, required] of references) {
      if (available.has(target)) queue.push(target);
      else if (required && !missing.has(target)) missing.set(target, new Set([file]));
      else if (required) missing.get(target).add(file);
    }
  }
  return { seen, edges, entries, missing };
}

function sourceDependencies(file, text, root) {
  const result = new Set();
  for (const value of literals(text)) {
    const clean = value.split(/[?#]/)[0];
    if (!clean.startsWith('.') || clean.includes('${') || /[<>\n\r]/.test(clean)) continue;
    const target = path.resolve(path.dirname(file), clean);
    for (const candidate of [target, ...['.ts', '.js', '.mjs', '.tsx', '.astro', '/index.ts', '/index.js'].map(extension => target + extension)]) {
      if (candidate.startsWith(root + path.sep) && existsSync(candidate) && lstatSync(candidate).isFile() && textExtension.test(candidate)) { result.add(candidate); break; }
    }
  }
  // Python importlib source filenames use ROOT / 'filename.py' rather than relative import syntax.
  if (file.endsWith('.py')) for (const value of literals(text)) {
    if (!/^[\w.-]+\.py$/.test(value)) continue;
    const target = path.resolve(path.dirname(file), value);
    if (existsSync(target)) result.add(target);
  }
  return result;
}

function sourceRoots(root) {
  const roots = [...walk(path.join(root, 'src/pages')), ...walk(path.join(root, 'src/content')), ...walk(path.join(root, 'server')), ...walk(path.join(root, 'tests'))];
  for (const name of ['astro.config.mjs', 'astro.config.ts']) if (existsSync(path.join(root, name))) roots.push(path.join(root, name));
  const packageFile = path.join(root, 'package.json');
  if (existsSync(packageFile)) for (const command of Object.values(JSON.parse(readFileSync(packageFile, 'utf8')).scripts || {})) {
    for (const match of command.matchAll(/\b(?:scripts|server)\/[\w/.-]+\.(?:mjs|js|ts)\b/g)) roots.push(path.join(root, match[0]));
  }
  return roots.filter(file => textExtension.test(file) && !/prune-public-assets/.test(path.basename(file)));
}

function inspectSource(root, candidates, published) {
  const queue = sourceRoots(root);
  const seen = new Set();
  const source = new Map();
  const generators = new Map();
  const dynamic = [];
  const visit = (file, category) => {
    if (seen.has(file) || !existsSync(file) || !textExtension.test(file)) return;
    seen.add(file);
    const text = readFileSync(file, 'utf8');
    for (const pattern of category === 'generator' ? generatorInputPatterns(text) : sourceAssetPatterns(text)) {
      const regex = patternRegex(pattern);
      const matches = candidates.filter(asset => regex.test(asset));
      if (pattern.includes('*') && matches.length) dynamic.push({ source: posix(path.relative(root, file)), pattern, matchedAssets: matches.length });
      for (const asset of matches) {
        const collection = category === 'generator' ? generators : source;
        if (!collection.has(asset)) collection.set(asset, new Set());
        collection.get(asset).add(posix(path.relative(root, file)));
      }
    }
    for (const dependency of sourceDependencies(file, text, root)) queue.push({ file: dependency, category });
  };
  while (queue.length) { const item = queue.shift(); if (typeof item === 'string') visit(item, 'source'); else visit(item.file, item.category); }
  const activeGenerators = [];
  const pendingGenerators = new Map(walk(path.join(root, 'artwork')).filter(file => /\.(?:mjs|py|html)$/.test(file) && !file.includes('/lib/')).map(file => [file, sourceAssetPatterns(readFileSync(file, 'utf8'))]));
  let changed = true;
  while (changed) {
    changed = false;
    const currentlyUsed = new Set([...published, ...source.keys(), ...generators.keys()]);
    for (const [file, patterns] of pendingGenerators) {
      if (!patterns.some(pattern => { const regex = patternRegex(pattern); return [...currentlyUsed].some(asset => regex.test(asset)); })) continue;
      activeGenerators.push(posix(path.relative(root, file)));
      pendingGenerators.delete(file);
      queue.push({ file, category: 'generator' });
      changed = true;
    }
    while (queue.length) { const item = queue.shift(); visit(item.file, item.category); }
  }
  const historicalGenerators = [...pendingGenerators.keys()].map(file => posix(path.relative(root, file)));
  return { source, generators, dynamic, seen, activeGenerators, historicalGenerators };
}

function digestFiles(root, files) {
  const digest = createHash('sha256');
  for (const file of [...files].sort()) digest.update(posix(path.relative(root, file))).update('\0').update(readFileSync(file)).update('\0');
  return digest.digest('hex');
}

/** Analyze afresh on every run; a previous report is never accepted as a deletion manifest. */
export function analyzePublicAssets(root) {
  root = realpathSync(root);
  const publicDirectory = path.join(root, 'public');
  const dist = path.join(root, 'dist');
  if (!existsSync(dist)) throw new Error('Build dist before analyzing public assets.');
  const publicFiles = walk(publicDirectory);
  const candidates = publicFiles.filter(file => visualExtension.test(file) && publicPrefixes.some(prefix => posix(path.relative(publicDirectory, file)).startsWith(prefix)));
  const candidatePaths = candidates.map(file => posix(path.relative(publicDirectory, file)));
  const graph = publishedGraph(dist);
  if (!graph.entries.length) throw new Error('No published document entry points were found.');
  const published = new Set([...graph.seen].map(file => posix(path.relative(dist, file))).filter(file => candidatePaths.includes(file)));
  const code = inspectSource(root, candidatePaths, published);
  const assets = candidates.map(file => {
    const asset = posix(path.relative(publicDirectory, file));
    const reasons = [];
    if (published.has(asset)) reasons.push('reachable-published-resource');
    if (code.source.has(asset)) reasons.push('current-source-or-build-input');
    if (code.generators.has(asset)) reasons.push('active-artwork-generator-dependency');
    return { path: 'public/' + asset, bytes: lstatSync(file).size, action: reasons.length ? 'keep' : 'delete', reasons: reasons.length ? reasons : ['unreferenced-by-published-graph-current-source-and-active-generators'], referencedBy: [...(code.source.get(asset) || []), ...(code.generators.get(asset) || [])].sort() };
  });
  const missingReferences = [...graph.missing].map(([file, sources]) => ({ path: posix(path.relative(dist, file)), referencedBy: [...sources].map(source => posix(path.relative(dist, source))).sort() }));
  const deletable = assets.filter(asset => asset.action === 'delete');
  const inputFiles = [...graph.seen, ...code.seen].filter(file => textExtension.test(file));
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    mode: 'dry-run',
    root,
    deletionScope: ['public/images/** visual files', 'public/blog-assets/** visual files'],
    protectedScope: ['output/**', 'artwork/**', 'docs/**', 'public/releases/**', 'public/brand/**', 'public root resources', 'all other public files'],
    method: 'Recursive published HTML/CSS/JS/SVG/JSON references, reachable source/build/test imports, active artwork dependencies. Historical research and dormant artwork references do not keep obsolete public copies.',
    limitations: ['Dynamic template paths are matched conservatively against existing files; arbitrary runtime-generated URLs require browser verification.', 'Artwork inputs are recognized through source/input assignments and read/open calls; generic destinations do not retain historical public outputs.', 'A fresh final build and whole-site verification are required before applying this report.'],
    counts: { publicFiles: publicFiles.length, visualAssets: assets.length, publishedUsed: published.size, sourceUsed: code.source.size, generatorUsed: code.generators.size, kept: assets.length - deletable.length, deletable: deletable.length, deletableBytes: deletable.reduce((sum, asset) => sum + asset.bytes, 0), publishedEntryPoints: graph.entries.length, publishedReachableFiles: graph.seen.size, sourceFilesInspected: code.seen.size, missingPublishedReferences: missingReferences.length },
    inputFingerprint: digestFiles(root, inputFiles),
    activeGenerators: code.activeGenerators,
    dormantGenerators: code.historicalGenerators,
    dynamicPatterns: code.dynamic,
    missingReferences,
    assets,
  };
}

export function nextReportPath(directory, basename = 'public-assets-prune') {
  mkdirSync(directory, { recursive: true });
  for (let minor = 0; ; minor++) {
    const file = path.join(directory, `${basename}_V1.${minor}.json`);
    if (!existsSync(file)) return file;
  }
}

export function applyPruning(report) {
  if (report.counts.missingPublishedReferences) throw new Error('Resolve missing published resources before applying cleanup.');
  const fresh = analyzePublicAssets(report.root);
  if (fresh.inputFingerprint !== report.inputFingerprint || JSON.stringify(fresh.assets) !== JSON.stringify(report.assets)) throw new Error('Inputs changed after analysis; rerun the cleanup analysis.');
  const publicRoot = realpathSync(path.join(report.root, 'public'));
  for (const asset of report.assets.filter(asset => asset.action === 'delete')) {
    const file = path.resolve(report.root, asset.path);
    const relative = posix(path.relative(publicRoot, file));
    if (!file.startsWith(publicRoot + path.sep) || !publicPrefixes.some(prefix => relative.startsWith(prefix)) || !visualExtension.test(file) || lstatSync(file).isSymbolicLink()) throw new Error(`Out-of-scope deletion refused: ${file}`);
  }
  for (const asset of report.assets.filter(asset => asset.action === 'delete')) unlinkSync(path.resolve(report.root, asset.path));
  return { ...report, mode: 'applied', appliedAt: new Date().toISOString() };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const apply = process.argv.includes('--apply');
  if (process.argv.slice(2).some(argument => !['--apply', '--dry-run'].includes(argument))) throw new Error('Supported arguments: --dry-run (default), --apply');
  let report = analyzePublicAssets(root);
  if (apply) report = applyPruning(report);
  const reportPath = nextReportPath(path.join(root, 'docs', 'research'));
  writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
  console.log(JSON.stringify({ mode: report.mode, report: reportPath, ...report.counts }, null, 2));
  if (report.counts.missingPublishedReferences) process.exitCode = 1;
}
