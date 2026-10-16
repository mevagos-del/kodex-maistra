import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import { loadSpells } from './load-spells.mjs';

const modules = new Map();
function loadLocalRules(path) {
  const filename = [path, `${path}.ts`, resolve(path, 'index.ts')].find(candidate => existsSync(candidate) && candidate.endsWith('.ts'));
  assert.ok(filename, `Missing rules module: ${path}`);
  if (modules.has(filename)) return modules.get(filename);
  const exports = {};
  modules.set(filename, exports);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  new Function('require', 'exports', compiled)(specifier => loadLocalRules(resolve(dirname(filename), specifier)), exports);
  return exports;
}

const rulesRoot = resolve('src/data/rules');
const { officialBestiary: entries } = loadLocalRules(resolve(rulesRoot, 'bestiary.ts'));
const { officialConditions: conditions } = loadLocalRules(resolve(rulesRoot, 'conditions.ts'));
const { officialItems: items } = loadLocalRules(resolve(rulesRoot, 'items'));
const { officialSpells: spells } = await loadSpells();
const { extractDamageFormula, formatAttackMetadata, formatDamageText, parseDiceFormula, rollDiceFormula } = loadLocalRules(resolve('src/features/catalog/utils/bestiaryMechanics.ts'));
const { segmentBestiaryReferences } = loadLocalRules(resolve('src/features/catalog/utils/bestiaryReferences.ts'));
const spellSlugs = new Set(spells.map(entry => entry.slug));
const conditionSlugs = new Set(conditions.map(entry => entry.slug));
const itemSlugs = new Set(items.map(entry => entry.slug));
const abilityKeys = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

test('first bestiary dataset has unique official identities and valid sources', () => {
  assert.equal(entries.length, 5);
  assert.equal(new Set(entries.map(entry => entry.slug)).size, entries.length);
  assert.equal(new Set(entries.map(entry => entry.nameOriginal)).size, entries.length);
  assert.ok(entries.every(entry => entry.entity === 'monster' && entry.status === 'official'));
  assert.ok(entries.every(entry => entry.source?.id === 'srd-5-2-1' && entry.sourcePage > 0));
});

for (const entry of entries) test(`${entry.slug}: complete stat block and valid action groups`, () => {
  assert.match(entry.challengeRating, /^(?:0|1\/8|1\/4|1\/2|[1-9]|[12]\d|30)$/);
  assert.ok(entry.experiencePoints >= 0);
  assert.deepEqual(Object.keys(entry.abilities), abilityKeys);
  assert.ok(Object.values(entry.abilities).every(value => Number.isInteger(value.score) && value.modifier && value.save));
  assert.ok(entry.armorClass && entry.hitPoints && entry.hitDice && entry.speed.length && entry.proficiencyBonus);
  assert.ok(entry.actions.length > 0);
  for (const group of [entry.traits, entry.actions, entry.bonusActions, entry.reactions, entry.legendaryActions, entry.lairActions].filter(Boolean)) {
    assert.ok(group.every(block => block.id && block.nameUk && (block.sourceText === undefined || block.sourceText.trim())));
    assert.equal(new Set(group.map(block => block.id)).size, group.length);
  }
});

test('conditional renderer branches are represented by real data only', () => {
  assert.deepEqual(entries.filter(entry => entry.bonusActions?.length).map(entry => entry.slug), ['goblin-boss', 'mage']);
  assert.deepEqual(entries.filter(entry => entry.reactions?.length).map(entry => entry.slug), ['goblin-boss', 'mage']);
  assert.deepEqual(entries.filter(entry => entry.legendaryActions?.length).map(entry => entry.slug), ['aboleth']);
  assert.deepEqual(entries.filter(entry => entry.spellcasting).map(entry => entry.slug), ['mage']);
  assert.ok(entries.every(entry => !entry.lairActions?.length));
});

test('spell, condition and item relationships resolve without dead links', () => {
  for (const entry of entries) {
    const spellLinks = entry.relationships?.spellSlugs ?? [];
    const conditionLinks = entry.relationships?.conditionSlugs ?? [];
    const itemLinks = entry.relationships?.itemSlugs ?? [];
    assert.equal(new Set(spellLinks).size, spellLinks.length);
    assert.equal(new Set(conditionLinks).size, conditionLinks.length);
    assert.equal(new Set(itemLinks).size, itemLinks.length);
    assert.ok(spellLinks.every(slug => spellSlugs.has(slug)), `${entry.slug}: dead spell link`);
    assert.ok(conditionLinks.every(slug => conditionSlugs.has(slug)), `${entry.slug}: dead condition link`);
    assert.ok(itemLinks.every(slug => itemSlugs.has(slug)), `${entry.slug}: dead item link`);
    const groupedSpells = entry.spellcasting?.groups.flatMap(group => group.spells.map(spell => spell.slug)) ?? [];
    assert.ok(groupedSpells.every(slug => spellSlugs.has(slug)), `${entry.slug}: dead spellcasting link`);
    assert.deepEqual(new Set(groupedSpells), new Set(spellLinks));
  }
});

test('attack renderer helpers use Ukrainian quick-scan wording without average damage', () => {
  const wolfBite = entries.find(entry => entry.slug === 'wolf').actions.find(action => action.id === 'wolf-bite');
  assert.equal(formatAttackMetadata(wolfBite), 'Ближня атака зброєю: +4 до влучання, досяжність 5 фт., одна ціль.');
  assert.equal(extractDamageFormula(wolfBite.damage), '1к6 + 2');
  assert.doesNotMatch(extractDamageFormula(wolfBite.damage), /^5\s/u);
  assert.equal(formatDamageText('Атака завдає додатково 2 (1к4) рубальної шкоди.'), 'Атака завдає додатково 1к4 рубальної шкоди.');
});

test('structured condition and spell references link only valid exact relationships', () => {
  const conditionSegments = segmentBestiaryReferences('Ціль отримує стан Збитий з ніг.', [{
    slug: 'prone', href: '/conditions/prone', labels: ['Збитий з ніг'],
  }]);
  assert.equal(conditionSegments.find(segment => segment.slug === 'prone')?.href, '/conditions/prone');
  assert.ok(conditionSlugs.has('prone'));

  const spellSegments = segmentBestiaryReferences('Маг накладає «Щит».', [{
    slug: 'shield', href: '/spells/shield', labels: ['Щит'],
  }]);
  assert.equal(spellSegments.find(segment => segment.slug === 'shield')?.href, '/spells/shield');
  assert.ok(spellSlugs.has('shield'));

  const fallback = segmentBestiaryReferences('Невідомий стан залишається текстом.', []);
  assert.deepEqual(fallback, [{ text: 'Невідомий стан залишається текстом.' }]);
});

test('hit dice parser accepts supported formulas and fails safely', () => {
  assert.deepEqual(parseDiceFormula('2d8+2'), { count: 2, sides: 8, modifier: 2, canonical: '2к8 + 2', minimum: 4, maximum: 18 });
  assert.deepEqual(parseDiceFormula('3d6'), { count: 3, sides: 6, modifier: 0, canonical: '3к6', minimum: 3, maximum: 18 });
  assert.deepEqual(parseDiceFormula('4d10-4'), { count: 4, sides: 10, modifier: -4, canonical: '4к10 − 4', minimum: 0, maximum: 36 });
  assert.equal(parseDiceFormula('2d'), null);
  assert.equal(parseDiceFormula('not dice'), null);
  assert.equal(parseDiceFormula('0d8+2'), null);
});

test('hit dice rolls stay within formula bounds and never mutate canonical HP', () => {
  const minimum = rollDiceFormula('2d8+2', () => 0);
  const maximum = rollDiceFormula('2d8+2', () => 0.999999);
  assert.equal(minimum.total, minimum.minimum);
  assert.equal(maximum.total, maximum.maximum);
  assert.equal(rollDiceFormula('2d8+2', () => Number.NaN), null);
  const bandit = entries.find(entry => entry.slug === 'bandit');
  assert.equal(bandit.hitPoints, '11');
  assert.equal(bandit.hitDice, '2к8 + 2');
});

test('dataset and bestiary pages do not leak raw invalid values', () => {
  const serialized = JSON.stringify(entries);
  assert.doesNotMatch(serialized, /\[object Object\]|undefined|null/i);
  const detailSource = readFileSync(resolve('src/pages/BestiaryDetailPage.tsx'), 'utf8');
  assert.match(detailSource, /entry\.bonusActions\?\.length/);
  assert.match(detailSource, /entry\.legendaryActions\?\.length/);
  assert.match(detailSource, /entry\.spellcasting \?/);
  assert.match(detailSource, /extractDamageFormula\(entry\.damage\)/);
  assert.match(detailSource, /segmentBestiaryReferences/);
  assert.match(detailSource, /HitPointsControl/);
});

console.info(JSON.stringify({ creatures: entries.length, spells: entries.flatMap(entry => entry.relationships?.spellSlugs ?? []).length, conditions: entries.flatMap(entry => entry.relationships?.conditionSlugs ?? []).length, items: entries.flatMap(entry => entry.relationships?.itemSlugs ?? []).length }));
