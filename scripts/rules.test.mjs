import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import ts from 'typescript';
import { loadSpells } from './load-spells.mjs';

const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
async function loadData(path) {
  const source = await read(path);
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const slugsFrom = (source, includeTuples = false) => new Set([
  ...[...source.matchAll(/slug:\s*['"]([a-z0-9-]+)['"]/g)].map(match => match[1]),
  ...(includeTuples ? [...source.matchAll(/\['([a-z0-9-]+)'\s*,/g)].map(match => match[1]) : []),
]);
const sourceForDirectory = async path => {
  const files = (await readdir(new URL(path, root))).filter(file => file.endsWith('.ts'));
  return (await Promise.all(files.map(file => read(`${path}${file}`)))).join('\n');
};

const rulesModule = await loadData('src/data/rules/rules.ts');
const iconsModule = await loadData('src/features/catalog/utils/codexIcons.ts');
const conditionsModule = await loadData('src/data/rules/conditions.ts');
const { officialSpells: spells } = await loadSpells();
const rules = rulesModule.officialRules;
const classes = slugsFrom(await sourceForDirectory('src/data/rules/classes/'));
const feats = slugsFrom(await read('src/data/rules/feats.ts'));
const items = slugsFrom(await sourceForDirectory('src/data/rules/items/'), true);
const spellSlugs = new Set(spells.map(entry => entry.slug));
const conditionSlugs = new Set(conditionsModule.officialConditions.map(entry => entry.slug));
const ruleSlugs = new Set(rules.map(entry => entry.slug));

const required = ['action','bonus-action','reaction','movement','attack-rolls','ability-checks','saving-throws','advantage','disadvantage','initiative','armor-class','hit-points','healing','death-saving-throws','concentration','short-rest','long-rest','cover','critical-hits','difficulty-class','opportunity-attacks','dash','disengage','dodge','help','hide','ready','search','influence','spellcasting','weapon-mastery'];

test('core rules dataset has forty-five unique D&D 2024 identities in valid categories', () => {
  assert.equal(rules.length, 45);
  assert.equal(ruleSlugs.size, rules.length);
  assert.equal(new Set(rules.map(entry => entry.nameOriginal.toLocaleLowerCase('en'))).size, rules.length);
  for (const slug of required) assert.ok(ruleSlugs.has(slug), `missing required rule ${slug}`);
  for (const entry of rules) assert.ok(rulesModule.ruleCategories[entry.category], `${entry.slug}: invalid category`);
  assert.equal(Object.keys(rulesModule.ruleCategories).length, 8);
  assert.ok(Object.keys(rulesModule.ruleCategories).every(category => rules.some(entry => entry.category === category)));
});

test('rules expose complete user-facing Ukrainian mechanics without raw values or legacy collisions', () => {
  for (const entry of rules) {
    assert.ok(entry.nameUk && entry.shortDescription && entry.overview && entry.mechanicType);
    assert.equal(entry.source, 'SRD 5.2.1');
    assert.ok(entry.mechanics.length > 0);
    assert.ok(entry.mechanics.every(point => point.title && point.text.length > 20));
    assert.doesNotMatch(JSON.stringify(entry), /\[object Object\]|"undefined"|"null"|TTG\.club|\b2014\b/i);
  }
});

test('all rule and entity relationships resolve to real runtime identities', () => {
  for (const entry of rules) {
    for (const slug of entry.relatedRuleSlugs) assert.ok(ruleSlugs.has(slug) && slug !== entry.slug, `${entry.slug}: invalid related rule ${slug}`);
    for (const slug of entry.relatedClassSlugs) assert.ok(classes.has(slug), `${entry.slug}: invalid class ${slug}`);
    for (const slug of entry.relatedFeatSlugs) assert.ok(feats.has(slug), `${entry.slug}: invalid feat ${slug}`);
    for (const slug of entry.relatedSpellSlugs) assert.ok(spellSlugs.has(slug), `${entry.slug}: invalid spell ${slug}`);
    for (const slug of entry.relatedItemSlugs) assert.ok(items.has(slug), `${entry.slug}: invalid item ${slug}`);
    for (const slug of entry.relatedConditionSlugs) assert.ok(conditionSlugs.has(slug), `${entry.slug}: invalid condition ${slug}`);
  }
});

test('search supports Ukrainian, English, slug, category and keywords; category filter remains exact', () => {
  for (const entry of rules) {
    for (const query of [entry.nameUk, entry.nameOriginal, entry.slug]) assert.ok(rulesModule.filterRules(query).includes(entry));
  }
  assert.ok(rulesModule.filterRules('захист').length > 0);
  assert.ok(rulesModule.filterRules('Кидки').length > 0);
  assert.ok(rulesModule.filterRules('два к20').length > 0);
  assert.ok(rulesModule.filterRules('', 'combat').every(entry => entry.category === 'combat'));
  assert.equal(rulesModule.filterRules('немає такого правила').length, 0);
});

test('central icon mapping resolves every rule icon to a real WebP asset', async () => {
  for (const entry of rules) {
    const icon = iconsModule.RULE_REFERENCE_ICONS[entry.iconKey];
    assert.ok(icon, `${entry.slug}: missing icon key ${entry.iconKey}`);
    const bytes = await readFile(new URL(`public${icon}`, root));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
});

test('routes, homepage activation, sidebar and responsive pages are wired without dead paths', async () => {
  const [routes, app, nav, sidebar, catalog, detail, css] = await Promise.all([
    read('src/routes/appRoutes.ts'), read('src/app/App.tsx'), read('src/data/navigation.ts'),
    read('src/components/layout/Sidebar.tsx'), read('src/pages/RulesPage.tsx'),
    read('src/pages/RuleDetailPage.tsx'), read('src/pages/rules.css'),
  ]);
  assert.match(routes, /rules: '\/rules',[\s\S]*ruleDetail: '\/rules\/:slug'/);
  assert.match(app, /path=\{appRoutes\.rules\}/);
  assert.match(app, /path=\{appRoutes\.ruleDetail\}/);
  assert.match(nav, /title: 'Правила', path: appRoutes\.rules[\s\S]*isDisabled: false/);
  assert.match(sidebar, /label: 'Правила'.*path: appRoutes\.rules/);
  assert.match(catalog, /aria-label="Пошук правил"/);
  assert.match(catalog, /to=\{`\/rules\/\$\{entry\.slug\}`\}/);
  assert.match(detail, /id="mechanics"[\s\S]*Як працює/);
  assert.doesNotMatch(detail, />Огляд</);
  assert.doesNotMatch(detail, />Пов’язані правила</);
  assert.doesNotMatch(detail, />Пов’язані сутності</);
  assert.match(css, /@media \(max-width: 600px\)/);
  assert.match(css, /overflow-x: auto/);
});

const totals = rules.reduce((total, entry) => ({
  rules: total.rules + entry.relatedRuleSlugs.length,
  classes: total.classes + entry.relatedClassSlugs.length,
  feats: total.feats + entry.relatedFeatSlugs.length,
  spells: total.spells + entry.relatedSpellSlugs.length,
  items: total.items + entry.relatedItemSlugs.length,
  conditions: total.conditions + entry.relatedConditionSlugs.length,
}), { rules: 0, classes: 0, feats: 0, spells: 0, items: 0, conditions: 0 });

console.log(`Verified ${rules.length} rules. Relationships: ${JSON.stringify(totals)}.`);

