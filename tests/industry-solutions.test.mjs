import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const modules = new Map();
function loadData(relativePath) {
  const file = path.resolve(root, relativePath);
  if (modules.has(file)) return modules.get(file).exports;
  const module = { exports: {} };
  modules.set(file, module);
  const source = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const require = specifier => {
    assert.ok(specifier.startsWith('.'), `Industry content must remain local data: ${specifier}`);
    return loadData(path.resolve(path.dirname(file), `${specifier}.ts`));
  };
  runInNewContext(source, { module, exports: module.exports, require });
  return module.exports;
}

const { homeIndustries } = loadData('src/data/home-industries.ts');
const industries = [
  ['banking', 'bankingPresentation', 0],
  ['insurance', 'insurancePresentation', 1],
  ['securities', 'securitiesPresentation', 2],
  ['government', 'governmentPresentation', 3],
  ['state-owned', 'stateOwnedPresentation', 4],
  ['trust', 'trustPresentation', 5],
  ['general', 'generalPresentation', 6],
];

const finalizedZhHomepageTitles = {
  banking: '让专业作业提速，让客户经营增效',
  insurance: '让条款讲得清楚，让理赔办得明白',
  securities: '让投研响应更快，让专业服务更稳',
  government: '让政策找得到，让办件办得快',
  'state-owned': '让集团管控穿透，让专业协同提效',
  trust: '让尽调做深做透，让受托尽责有据',
};

const finalizedEnHomepageTitles = {
  banking: 'Accelerate specialist work. Grow client value.',
  insurance: 'Explain coverage clearly. Handle claims with clarity.',
  securities: 'Respond faster in research. Deliver consistent professional service.',
  government: 'Find the policy. Move services forward.',
  'state-owned': 'See across the group. Coordinate specialist work.',
  trust: 'Deepen due diligence. Evidence trustee responsibilities.',
};

test('solution discovery retains the supported industries, general business and appliance routes', () => {
  const directory = path.join(root, 'src/features/solutions');
  const entries = readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && existsSync(path.join(directory, entry.name, 'content.ts')))
    .map(entry => loadData(`src/features/solutions/${entry.name}/content.ts`).default);
  assert.deepEqual(entries.map(entry => entry.slug).sort(), ['appliance', 'banking', 'general', 'government', 'insurance', 'securities', 'state-owned', 'trust']);
  for (const locale of ['zh', 'en']) {
    assert.deepEqual(Object.keys(homeIndustries[locale]).sort(), ['banking', 'general', 'government', 'insurance', 'securities', 'state-owned', 'trust']);
    for (const entry of entries) {
      assert.equal(entry.copy[locale].slug, entry.slug);
      assert.ok(existsSync(path.join(directory, entry.slug, 'Page.astro')));
    }
  }
});

test('seven solution pages share the value-led composition and industry-specific artwork', () => {
  const sharedPage = readFileSync(path.join(root, 'src/features/solutions/shared/IndustrySolutionPage.astro'), 'utf8');
  assert.doesNotMatch(sharedPage, /IndustryWorkbench|IndustryValueVisual|SolutionVisual/);
  assert.match(sharedPage, /\/images\/solutions\/\$\{slug\}\/\$\{slug\}-value-\$\{index \+ 1\}_V2\.0\.webp/);
  for (const [slug] of industries) {
    const route = readFileSync(path.join(root, `src/features/solutions/${slug}/Page.astro`), 'utf8');
    assert.match(route, /import IndustrySolutionPage from '\.\.\/shared\/IndustrySolutionPage\.astro'/);
    assert.match(route, new RegExp(`slug="${slug}"`));
    assert.doesNotMatch(route, /SolutionVisual|IndustryPage|Visual=\{/);
  }
});

test('general business remains discoverable without adding a seventh homepage or navigation tab', () => {
  const source = readFileSync(path.join(root, 'src/data/industries.ts'), 'utf8');
  const homepageSlugs = source.match(/export const homeIndustrySlugs = (\[[^\]]+\])/);
  assert.ok(homepageSlugs, 'Homepage industry tabs need an explicit discovery order');
  const slugs = JSON.parse(homepageSlugs[1].replaceAll("'", '"'));
  assert.deepEqual(slugs, ['banking', 'insurance', 'securities', 'government', 'state-owned', 'trust']);
  const general = loadData('src/features/solutions/general/content.ts').default;
  assert.equal(general.category, 'general');
});

for (const [slug, exportName, order] of industries) {
  const presentation = loadData(`src/features/solutions/${slug}/page-content.ts`)[exportName];
  const metadata = loadData(`src/features/solutions/${slug}/content.ts`).default;

  test(`${slug}: homepage, detail and navigation provide complete localized content`, () => {
    assert.equal(metadata.order, order);
    for (const locale of ['zh', 'en']) {
      const copy = presentation[locale];
      const homepage = homeIndustries[locale][slug];
      const finalizedTitles = locale === 'zh' ? finalizedZhHomepageTitles : finalizedEnHomepageTitles;
      if (slug in finalizedTitles) {
        assert.equal(homepage.title, finalizedTitles[slug]);
      } else {
        assert.equal(homepage, copy.home, 'Non-finalized homepage copy must use the detail content source');
        assert.equal(homepage.scenarios, copy.home.scenarios, 'Non-finalized homepage scenarios must use the detail content source');
      }
      assert.equal(homepage.scenarios.length, 6);
      assert.equal(homepage.benefits.length, 3);
      assert.ok(homepage.title.trim().length > 0 && homepage.pain.trim().length > 0 && homepage.value.trim().length > 0);
      assert.ok(homepage.benefits.every(benefit => benefit.title.trim().length > 0 && benefit.description.trim().length > 0));
      assert.equal(metadata.copy[locale].title, copy.home.title);
      assert.equal(metadata.copy[locale].description, copy.home.value);
      assert.equal(copy.features.length, 4);
      assert.equal(copy.outputs.length, 4);
      assert.equal(copy.sources.length, 4);
      assert.equal(copy.hero.lines.length, 2);
      if (slug !== 'general') {
        assert.equal(copy.reasons.length, 3, `${slug} needs three finalized TeGo reasons`);
        assert.ok(copy.reasons.every(reason => reason.trim().length > 0));
      }
      for (const feature of copy.features) {
        assert.ok(feature.title.trim() && feature.problem.trim() && feature.body.trim());
        if (slug !== 'general') assert.ok(feature.value?.trim(), `${slug} needs finalized business value copy for each feature`);
        assert.equal(feature.outcomes.length, 3, `${slug} needs three business outcomes for each feature`);
        assert.ok(feature.outcomes.every(outcome => outcome.trim().length > 0));
      }
      assert.equal('workbench' in copy, false);
      assert.equal('visual' in copy, false);
      assert.equal(metadata.copy[locale].tasks.length, copy.employees.length);
    }
  });

  test(`${slug}: both languages provide complete employee roles`, () => {
    for (const locale of ['zh', 'en']) {
      const copy = presentation[locale];
      assert.equal(copy.employees.length, 6);
      assert.equal(new Set(copy.employees.map(employee => employee.role)).size, copy.employees.length);
      for (const employee of copy.employees) {
        for (const [field, count] of [['skills', 3], ['process', 3], ['outputs', 2]]) {
          assert.equal(employee[field].length, count, `${employee.role} needs ${count} ${field}`);
          assert.ok(employee[field].every(item => item.trim().length > 0));
        }
        assert.ok(employee.value.trim().length > 0);
      }
    }
  });

  test(`${slug}: both languages reference complete hero, role and business-value artwork`, () => {
    for (const locale of ['zh', 'en']) {
      const copy = presentation[locale];
      const assets = [
        copy.hero.background,
        ...copy.employees.map(employee => employee.avatar),
        ...Array.from({ length: 4 }, (_, index) => copy.features[index].image ?? `/images/solutions/${slug}/${slug}-value-${index + 1}_V2.0.webp`),
      ];
      for (const asset of assets) {
        assert.ok(asset.startsWith('/images/'));
        assert.ok(existsSync(path.join(root, 'public', asset)), `Missing asset: ${asset}`);
      }
    }
  });
}
