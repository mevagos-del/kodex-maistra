import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { loadSpells } from './load-spells.mjs';

const source = await readFile(new URL('../src/data/rules/feats.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { officialFeats: entries, featCategories, featAbilities, featSource, filterFeats, groupFeats, featPrerequisites, eligibleFeatSpells, eligibleFeatWeapons } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const { officialSpells: spells } = await loadSpells();
const modules = new Map();
function loadLocalRules(path) {
  const filename = [path, `${path}.ts`, resolve(path, 'index.ts')].find(candidate => existsSync(candidate) && candidate.endsWith('.ts'));
  assert.ok(filename, `Missing rules module: ${path}`);
  if (modules.has(filename)) return modules.get(filename);
  const exports = {};
  modules.set(filename, exports);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  // Test-only loader evaluates the project's trusted static TypeScript data, without adding a runtime dependency.
  new Function('require', 'exports', compiled)(specifier => loadLocalRules(resolve(dirname(filename), specifier)), exports);
  return exports;
}
const rulesRoot = fileURLToPath(new URL('../src/data/rules/', import.meta.url));
const { officialClasses: classes } = loadLocalRules(resolve(rulesRoot, 'classes'));
const { officialItems: items } = loadLocalRules(resolve(rulesRoot, 'items'));
const { officialConditions: conditions } = loadLocalRules(resolve(rulesRoot, 'conditions.ts'));
const bySlug = slug => entries.find(entry => entry.slug === slug);
const text = slug => bySlug(slug).effects.map(effect => effect.text).join(' ');
const identities = ['Alert', 'Magic Initiate', 'Savage Attacker', 'Skilled', 'Ability Score Improvement', 'Grappler', 'Archery', 'Defense', 'Great Weapon Fighting', 'Two-Weapon Fighting', 'Boon of Combat Prowess', 'Boon of Dimensional Travel', 'Boon of Fate', 'Boon of Irresistible Offense', 'Boon of Spell Recall', 'Boon of the Night Spirit', 'Boon of Truesight'];
const effectCounts = [2, 3, 1, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1];

test('complete SRD 5.2.1 feat identities and category counts', () => {
  assert.deepEqual(entries.map(entry => entry.nameEn), identities);
  assert.equal(new Set(entries.map(entry => entry.slug)).size, 17);
  assert.equal(new Set(entries.map(entry => entry.nameUk)).size, 17);
  assert.deepEqual(Object.keys(featCategories).map(category => entries.filter(entry => entry.category === category).length), [4, 2, 4, 7]);
  assert.equal(featSource.license, 'CC-BY-4.0');
  assert.equal(featSource.edition, 'D&D 2024');
});
for (const entry of entries) test(`${entry.slug}: Ukrainian text, source, no duplicate effects or invalid values`, () => {
  assert.match(entry.slug, /^[a-z]+(?:-[a-z]+)*$/);
  assert.match(entry.nameUk, /^[А-ЯІЇЄҐ]/);
  assert.ok([87, 88].includes(entry.page));
  assert.ok(entry.effects.length || entry.increase);
  assert.equal(entry.effects.length, effectCounts[identities.indexOf(entry.nameEn)]);
  const paragraphs = entry.effects.map(effect => effect.text);
  assert.equal(new Set(paragraphs).size, paragraphs.length);
  for (const value of [entry.nameUk, entry.summary, ...paragraphs]) assert.doesNotMatch(value, /\[object Object\]|undefined|null|[a-z]{3}|не вказано|за правилами кампанії/i);
  assert.ok(entry.rules.every(rule => rule.slug && rule.label && !rule.path));
  assert.ok(entry.conditions.every(slug => ['incapacitated', 'grappled', 'invisible'].includes(slug)));
});
test('prerequisites: no inferred restrictions and exact OR semantics', () => {
  assert.equal(filterFeats('', '', 'none').length, 4);
  assert.equal(filterFeats('', '', 'level').length, 9);
  assert.equal(filterFeats('', '', 'ability').length, 1);
  assert.equal(filterFeats('', '', 'feature').length, 5);
  assert.equal(featPrerequisites(bySlug('grappler')), 'Рівень 4+; Сила або Спритність 13+');
  assert.equal(featPrerequisites(bySlug('boon-of-spell-recall')), 'Рівень 19+; Уміння «Накладання заклять»');
  assert.equal(bySlug('magic-initiate').prerequisites.length, 0);
});
test('ability increases: exact amounts, choices, maxima and alternative', () => {
  assert.equal(entries.filter(entry => entry.increase).length, 9);
  assert.deepEqual(bySlug('ability-score-improvement').increase, { choices: Object.keys(featAbilities), amount: 2, maximum: 20, alternative: { count: 2, amount: 1 } });
  assert.deepEqual(bySlug('grappler').increase, { choices: ['strength', 'dexterity'], amount: 1, maximum: 20 });
  for (const entry of entries.filter(entry => entry.category === 'epicBoon')) assert.equal(entry.increase.maximum, 30);
  assert.deepEqual(bySlug('boon-of-spell-recall').increase.choices, ['intelligence', 'wisdom', 'charisma']);
  assert.deepEqual(bySlug('boon-of-irresistible-offense').increase.choices, ['strength', 'dexterity']);
});
test('repeatability and changing spell list requirement', () => {
  assert.deepEqual(entries.filter(entry => entry.repeatable).map(entry => entry.slug), ['magic-initiate', 'skilled', 'ability-score-improvement']);
  assert.match(bySlug('magic-initiate').repeatRestriction, /інший список/);
});
test('exact source-backed limits and exceptions across combat and boons', () => {
  assert.match(text('alert'), /одного згодного союзника.*Недієздатний/);
  assert.match(text('savage-attacker'), /Раз за хід.*двічі/);
  assert.match(text('grappler'), /лише раз за хід/);
  assert.match(text('grappler'), /твого розміру або менша/);
  assert.match(text('great-weapon-fighting'), /1 або 2.*як 3.*Дворучна або Універсальна/);
  assert.match(text('two-weapon-fighting'), /якщо ти ще не додаєш/);
  assert.match(text('boon-of-fate'), /60 футів.*2к4.*бонус або штраф.*Ініціативу.*короткий чи тривалий/);
  assert.match(text('boon-of-combat-prowess'), /до початку свого наступного ходу/);
  assert.match(text('boon-of-dimensional-travel'), /Одразу.*Атака.*Магія.*30 футів.*незайняте.*бачиш/);
  assert.match(text('boon-of-irresistible-offense'), /значенню характеристики/);
  assert.doesNotMatch(text('boon-of-irresistible-offense'), /модифікатор/);
  assert.match(text('boon-of-spell-recall'), /1–4.*1к4.*рівнем комірки.*не витрачається/);
  assert.match(text('boon-of-the-night-spirit'), /бонусною дією.*дію, бонусну дію або Реакцію/);
  assert.match(text('boon-of-the-night-spirit'), /крім психічної та променистої/);
});
test('alphabet grouping, multilingual search and combined filters', () => {
  const sorted = filterFeats();
  assert.deepEqual(sorted.map(entry => entry.nameUk), entries.map(entry => entry.nameUk).sort((a, b) => a.localeCompare(b, 'uk')));
  assert.deepEqual(groupFeats(sorted).flatMap(group => group.entries), sorted);
  assert.ok(groupFeats(sorted).every(group => group.entries.every(entry => entry.nameUk.startsWith(group.letter))));
  for (const query of ['  ПИЛЬНИЙ ', 'alert', 'ALERT']) assert.equal(filterFeats(query)[0].slug, 'alert');
  assert.equal(filterFeats('boon-of-spell-recall')[0].slug, 'boon-of-spell-recall');
  assert.equal(filterFeats('', 'fightingStyle', 'feature').length, 4);
  assert.equal(filterFeats('alert', 'general').length, 0);
});
test('Magic Initiate uses exact selectable lists and levels, not thematic relationships', () => {
  const entry = bySlug('magic-initiate');
  const selected = eligibleFeatSpells(entry, spells);
  const expected = spells.filter(spell => spell.level <= 1 && spell.classes.some(key => ['cleric', 'druid', 'wizard'].includes(key)));
  assert.deepEqual(new Set(selected.map(spell => spell.slug)), new Set(expected.map(spell => spell.slug)));
  assert.equal(entry.spellChoice.cantrips, 2);
  assert.equal(entry.spellChoice.levelOne, 1);
  assert.match(text('magic-initiate'), /один раз без комірки.*тривалого відпочинку/);
  assert.match(text('magic-initiate'), /того самого рівня з обраного списку/);
  assert.ok(!selected.some(spell => spell.slug === 'eldritch-blast'));
});
test('Spell Recall lists only eligible slot-level spells, never grants them or requires Pact Magic', () => {
  const entry = bySlug('boon-of-spell-recall');
  const selected = eligibleFeatSpells(entry, spells);
  assert.deepEqual(new Set(selected.map(spell => spell.slug)), new Set(spells.filter(spell => spell.level >= 1 && spell.level <= 4).map(spell => spell.slug)));
  assert.ok(!entry.classSlugs.includes('warlock'));
  assert.equal(eligibleFeatSpells(bySlug('alert'), spells).length, 0);
});
test('weapon relationships derive from existing property data, not duplicate definitions', () => {
  const weapon = { slug: 'longsword', itemType: 'зброя', category: 'військова зброя ближнього бою', properties: [{ scanLine: { property: 'універсальна (1к10)' } }] };
  const items = [weapon, { ...weapon, slug: 'armor', itemType: 'обладунок' }];
  assert.deepEqual(eligibleFeatWeapons(bySlug('great-weapon-fighting'), items).map(item => item.slug), ['longsword']);
  assert.equal(eligibleFeatWeapons(bySlug('archery'), items).length, 0);
  assert.equal(eligibleFeatWeapons(bySlug('two-weapon-fighting'), items).length, 0);
  assert.equal(eligibleFeatWeapons(bySlug('savage-attacker'), items).length, 1);
  assert.equal(eligibleFeatWeapons(bySlug('alert'), items).length, 0);
});
test('all class, weapon, spell and condition links resolve to actual static records', () => {
  for (const entry of entries) {
    assert.ok(entry.classSlugs.every(slug => classes.some(item => item.slug === slug)));
    assert.ok(entry.conditions.every(slug => conditions.some(item => item.slug === slug)));
    assert.ok(eligibleFeatSpells(entry, spells).every(spell => spells.includes(spell)));
    assert.ok(eligibleFeatWeapons(entry, items).every(item => items.includes(item)));
  }
  const styles = bySlug('archery').classSlugs.map(slug => classes.find(entry => entry.slug === slug));
  assert.ok(styles.every(entry => entry.features.some(feature => feature.nameOriginal === 'Fighting Style' || feature.nameUk === 'Бойовий стиль')));
  assert.deepEqual(eligibleFeatWeapons(bySlug('great-weapon-fighting'), items).map(item => item.slug), ['longsword']);
  const fighter = classes.find(entry => entry.slug === 'fighter');
  const rogue = classes.find(entry => entry.slug === 'rogue');
  assert.ok(fighter.subclasses.some(entry => entry.slug === 'eldritch-knight'));
  assert.ok(rogue.subclasses.some(entry => entry.slug === 'arcane-trickster'));
});
console.log(JSON.stringify({ feats: entries.length, linkedClasses: new Set(entries.flatMap(entry => entry.classSlugs)).size, linkedWeapons: new Set(entries.flatMap(entry => eligibleFeatWeapons(entry, items).map(item => item.slug))).size, linkedSpells: new Set(entries.flatMap(entry => eligibleFeatSpells(entry, spells).map(spell => spell.slug))).size, magicInitiateSpells: eligibleFeatSpells(bySlug('magic-initiate'), spells).length, spellRecallSpells: eligibleFeatSpells(bySlug('boon-of-spell-recall'), spells).length, linkedConditions: new Set(entries.flatMap(entry => entry.conditions)).size, relatedRules: new Set(entries.flatMap(entry => entry.rules.map(rule => rule.slug))).size }));
