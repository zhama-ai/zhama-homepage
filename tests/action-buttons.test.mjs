import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const themeFile = 'src/styles/action-buttons.css';
const standardClasses = new Set(['button', 'capability-button', 'dei-button']);
const requiredEntries = ['industry-details-link', 'installer-download', 'release-download'];
const functionalClasses = new Set(['filter-button', 'icon-button']);
const classTokens = value => value.trim().split(/\s+/).filter(Boolean);

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(file) : /\.(?:astro|css|[cm]?[jt]s)$/.test(file) ? [file] : [];
  }).sort();
}

function closingDelimiter(source, opening, left = '(', right = ')') {
  let depth = 1, quote = '';
  for (let index = opening + 1; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (character === '\\') index += 1;
      else if (character === quote) quote = '';
    } else if ('\"\'`'.includes(character)) quote = character;
    else if (character === left) depth += 1;
    else if (character === right && --depth === 0) return index;
  }
  throw new Error(`Unclosed ${left} at character ${opening}`);
}

function splitSelectors(selector) {
  const result = [];
  let start = 0;
  for (let index = 0; index < selector.length; index += 1) {
    if (selector[index] === '(' || selector[index] === '[') {
      index = closingDelimiter(selector, index, selector[index], selector[index] === '(' ? ')' : ']');
    } else if (selector[index] === ',') {
      result.push(selector.slice(start, index).trim());
      start = index + 1;
    }
  }
  return [...result, selector.slice(start).trim()].filter(Boolean);
}

function targetsEntry(selector, aliases) {
  return splitSelectors(selector).some(part => {
    let start = 0;
    for (let index = 0; index < part.length; index += 1) {
      if (part[index] === '(' || part[index] === '[') {
        index = closingDelimiter(part, index, part[index], part[index] === '(' ? ')' : ']');
      } else if (/[\s>+~|]/.test(part[index])) start = index + 1;
    }
    const subject = part.slice(start);
    for (let index = 0; index < subject.length; index += 1) {
      if (subject[index] === '[') {
        index = closingDelimiter(subject, index, '[', ']');
      } else if (subject[index] === '.') {
        const name = subject.slice(index + 1).match(/^[\w-]+/)?.[0];
        if (aliases.has(name)) return true;
        index += name?.length || 0;
      } else if (subject[index] === ':') {
        const match = subject.slice(index).match(/^:{1,2}([\w-]+)\(/);
        if (!match) continue;
        const opening = index + match[0].length - 1;
        const closing = closingDelimiter(subject, opening);
        // Negative selectors and :has() describe other elements; SVG descendants
        // are likewise not the button itself. :global() is Astro's CSS wrapper.
        if (['is', 'where', 'global'].includes(match[1]) && targetsEntry(subject.slice(opening + 1, closing), aliases)) return true;
        index = closing;
      }
    }
    return false;
  });
}

function cssRules(source) {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, comment => comment.replace(/[^\n]/g, ' '));
  const rules = [];
  function walk(start, end, parents = [], conditions = []) {
    const declarations = [];
    let segment = start, quote = '';
    const declaration = until => {
      const match = css.slice(segment, until).trim().match(/^([\w-]+)\s*:\s*([\s\S]+)$/);
      if (match) declarations.push({ property: match[1].toLowerCase(), value: match[2].trim() });
    };
    for (let index = start; index < end; index += 1) {
      const character = css[index];
      if (quote) {
        if (character === '\\') index += 1;
        else if (character === quote) quote = '';
      } else if ('\"\''.includes(character)) quote = character;
      else if (character === '(' || character === '[') {
        index = closingDelimiter(css, index, character, character === '(' ? ')' : ']');
      } else if (character === ';') {
        declaration(index);
        segment = index + 1;
      } else if (character === '{') {
        const prelude = css.slice(segment, index).trim();
        const closing = closingDelimiter(css, index, '{', '}');
        const atRule = prelude.startsWith('@');
        const selectors = atRule ? parents : splitSelectors(prelude).flatMap(selector => parents.length
          ? parents.map(parent => selector.includes('&') ? selector.replaceAll('&', parent) : `${parent} ${selector}`)
          : [selector]);
        const nestedConditions = atRule ? [...conditions, prelude] : conditions;
        const rule = {
          selector: selectors.join(', '), conditions: nestedConditions,
          line: css.slice(0, segment + css.slice(segment, index).search(/\S/)).split('\n').length, declarations: [],
        };
        rules.push(rule);
        rule.declarations = walk(index + 1, closing, selectors, nestedConditions);
        index = closing;
        segment = index + 1;
      }
    }
    declaration(end);
    return declarations;
  }
  walk(0, css.length);
  return rules;
}

function entryClasses(source) {
  const entries = [];
  for (const match of source.matchAll(/<(a|button)\b/g)) {
    let index = match.index + match[0].length, braces = 0, quote = '';
    for (; index < source.length; index += 1) {
      const character = source[index];
      if (quote) {
        if (character === '\\') index += 1;
        else if (character === quote) quote = '';
      } else if ('\"\'`'.includes(character)) quote = character;
      else if (character === '{') braces += 1;
      else if (character === '}') braces -= 1;
      else if (character === '>' && braces === 0) break;
    }
    const tag = source.slice(match.index, index + 1);
    const attribute = tag.match(/\bclass\s*=\s*([\"'])([\s\S]*?)\1/)
      || tag.match(/\bclass\s*=\s*\{\s*([\"'])([\s\S]*?)\1\s*\}/);
    if (attribute) entries.push({
      classes: classTokens(attribute[2]), tag,
      line: source.slice(0, match.index).split('\n').length,
      inlineStyle: tag.match(/\bstyle\s*=\s*([\"'])([\s\S]*?)\1/)?.[2],
    });
  }
  for (const match of source.matchAll(/\bmake\(\s*([\"'])(?:a|button)\1\s*,[^,\n]+,\s*([\"'])([^\"']+)\2\s*\)/g)) {
    entries.push({ classes: classTokens(match[3]), tag: match[0], line: source.slice(0, match.index).split('\n').length });
  }
  return entries;
}

function isCta(entry) {
  if (entry.classes.some(name => standardClasses.has(name) || requiredEntries.includes(name))) return true;
  if (entry.classes.some(name => functionalClasses.has(name) || /^(?:nav|tego-nav|tab|filter|carousel|pagination)-/.test(name))) return false;
  if (/\brole\s*=\s*([\"'])(?:tab|menuitem)\1|\bdata-(?:nav-disclosure|slide-to|carousel-toggle|employee-step|employee-playback)/.test(entry.tag)) return false;
  return entry.classes.some(name => /(?:^|-)(?:button|cta|action)(?:-|$)/.test(name));
}

const sources = sourceFiles(path.join(root, 'src')).map(file => ({
  file: path.relative(root, file).split(path.sep).join('/'), text: readFileSync(file, 'utf8'),
}));
const entries = sources.filter(source => !source.file.endsWith('.css')).flatMap(source =>
  entryClasses(source.text).map(entry => ({ ...entry, file: source.file })));
const ctas = entries.filter(isCta);
const aliases = new Set([...standardClasses, ...requiredEntries, ...ctas.flatMap(entry => entry.classes)]);
const styleSheets = sources.flatMap(source => source.file.endsWith('.css') ? [source] : source.file.endsWith('.astro')
  ? [...source.text.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/g)].map(match => ({
    file: source.file, text: match[1], lineOffset: source.text.slice(0, match.index + match[0].indexOf(match[1])).split('\n').length - 1,
  })) : []);
const themeProperty = property => /^(?:background(?:-.+)?|color|border(?:-.+)?|outline(?:-.+)?|(?:box|text)-shadow|filter|(?:-webkit-)?backdrop-filter|opacity|transform|transition(?:-.+)?)$/.test(property);
const themeToken = property => /^--(?:action|button)-/.test(property);

test('marketing and download entry points opt into the shared button theme', () => {
  const missing = ctas.filter(entry => !entry.classes.some(name => standardClasses.has(name)));
  assert.deepEqual(missing.map(entry => `${entry.file}:${entry.line} ${entry.classes.join(' ')}`), [],
    'CTA aliases must accompany button, capability-button or dei-button; functional controls keep their own styles');
  for (const name of requiredEntries) {
    const matches = entries.filter(entry => entry.classes.includes(name));
    assert.ok(matches.length, `The ${name} entry must remain discoverable, including dynamically created download links`);
    assert.ok(matches.every(entry => entry.classes.some(token => standardClasses.has(token))), `${name} must use the shared button theme`);
  }
});

test('CTA theme properties and tokens have exactly one source', () => {
  const violations = [];
  for (const sheet of styleSheets) {
    if (sheet.file === themeFile) continue;
    for (const rule of cssRules(sheet.text)) {
      for (const declaration of rule.declarations) {
        if (themeToken(declaration.property) || (targetsEntry(rule.selector, aliases) && themeProperty(declaration.property))) {
          violations.push(`${sheet.file}:${(sheet.lineOffset || 0) + rule.line} ${rule.selector} → ${declaration.property}`);
        }
      }
    }
  }
  for (const entry of ctas.filter(entry => entry.inlineStyle)) {
    for (const declaration of cssRules(`.button { ${entry.inlineStyle} }`)[0].declarations) {
      if (themeToken(declaration.property) || themeProperty(declaration.property)) violations.push(`${entry.file}:${entry.line} inline ${declaration.property}`);
    }
  }
  assert.deepEqual(violations, [], `Move CTA theme declarations to ${themeFile}; page styles may set layout and dimensions`);
});

test('the shared theme is loaded by the layout and handles disabled and reduced motion states', () => {
  const layout = readFileSync(path.join(root, 'src/layouts/Layout.astro'), 'utf8');
  assert.match(layout, /import\s+['"]\.\.\/styles\/action-buttons\.css['"]/);
  const sheet = sources.find(source => source.file === themeFile);
  assert.ok(sheet, 'The shared button stylesheet must exist');
  const rules = cssRules(sheet.text).filter(rule => targetsEntry(rule.selector, standardClasses));
  assert.ok(rules.some(rule => /:disabled|aria-disabled/.test(rule.selector)
    && rule.declarations.some(declaration => ['opacity', 'cursor', 'pointer-events'].includes(declaration.property))), 'Shared buttons need a disabled state');
  assert.ok(rules.some(rule => rule.conditions.some(condition => /prefers-reduced-motion\s*:\s*reduce/.test(condition))
    && rule.declarations.some(declaration => ['transition', 'animation', 'transform'].includes(declaration.property)
      && /^none(?:\s*!important)?$/.test(declaration.value))), 'Shared buttons must honor reduced motion');
});

test('theme discovery follows new CTA aliases without treating controls or SVG children as buttons', () => {
  const discovered = entryClasses('<a class="pe-button">体验产品</a><button class="filter-button">全部</button><button class="icon-button">关闭</button>\nconst download = make(\'a\', label, \'button release-download\');');
  assert.deepEqual(discovered.filter(isCta).map(entry => entry.classes), [['pe-button'], ['button', 'release-download']]);
  const names = new Set(['button', 'pe-button', 'release-download']);
  for (const selector of ['.pe-button:hover', ':global(.release-download)', ':is(.button, .pe-button):focus-visible', '.button::before']) {
    assert.equal(targetsEntry(selector, names), true, selector);
  }
  for (const selector of ['.support-shell a:not(:where(.button, .pe-button)):focus-visible', '.button svg', '.button > svg path', ':is(.button svg, .navigation-icon)', '.panel:has(.button)']) {
    assert.equal(targetsEntry(selector, names), false, selector);
  }
  const nested = cssRules('@media (hover: hover) { .pe-button { padding: 12px; &:hover { background: blue; } svg { color: white; } } }');
  assert.equal(nested.filter(rule => targetsEntry(rule.selector, names) && rule.declarations.some(declaration => themeProperty(declaration.property))).length, 1);
});
