import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import { loadSpells } from './load-spells.mjs';

const modules = new Map();

function loadLocalRules(path) {
  const filename = [path, `${path}.ts`, resolve(path, 'index.ts')]
    .find((candidate) => existsSync(candidate) && candidate.endsWith('.ts'));
  assert.ok(filename, `Missing rules module: ${path}`);
  if (modules.has(filename)) return modules.get(filename);

  const exports = {};
  modules.set(filename, exports);
  const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  // Test-only loader evaluates the project's trusted static TypeScript data.
  new Function('require', 'exports', compiled)(
    (specifier) => loadLocalRules(resolve(dirname(filename), specifier)),
    exports,
  );
  return exports;
}

const rulesRoot = resolve('src/data/rules');
const { officialClasses: classes } = loadLocalRules(resolve(rulesRoot, 'classes'));
const { officialRules: rules } = loadLocalRules(resolve(rulesRoot, 'rules.ts'));
const { officialFeats: feats } = loadLocalRules(resolve(rulesRoot, 'feats.ts'));
const { officialItems: items } = loadLocalRules(resolve(rulesRoot, 'items'));
const { officialConditions: conditions } = loadLocalRules(resolve(rulesRoot, 'conditions.ts'));
const {
  MISSING_CLASS_FEATURE_DESCRIPTION,
  resolveClassFeatureCards,
} = loadLocalRules(resolve('src/features/catalog/utils/classFeatureResolver.ts'));
const { officialSpells: spells } = await loadSpells();

const expectedClassSlugs = [
  'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk',
  'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard',
];
const expectedSpellcasters = new Set(['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard']);
const expectedWeaponMastery = new Set(['barbarian', 'fighter', 'paladin', 'ranger', 'rogue']);
const missingSourceText = 'Опис не вказано у доступному джерелі.';
const classSlugs = new Set(classes.map((entry) => entry.slug));

function allFeatureText(entry) {
  return [
    ...entry.features.flatMap((feature) => [feature.nameUk, feature.nameOriginal, feature.sourceText]),
    ...entry.subclasses.flatMap((subclass) => subclass.features.flatMap((feature) => [feature.nameUk, feature.nameOriginal, feature.sourceText])),
  ].filter(Boolean);
}

test('runtime contains exactly the twelve unique D&D 2024 base classes', () => {
  assert.deepEqual(classes.map((entry) => entry.slug), expectedClassSlugs);
  assert.equal(classSlugs.size, 12);
  assert.equal(new Set(classes.map((entry) => entry.nameOriginal)).size, 12);
  assert.ok(classes.every((entry) => entry.entity === 'class' && entry.status === 'official'));
});

for (const entry of classes) test(`${entry.slug}: complete level 1-20 progression and valid base features`, () => {
  assert.deepEqual(entry.progression.map((row) => row.level), Array.from({ length: 20 }, (_, index) => index + 1));
  assert.equal(new Set(entry.progression.map((row) => row.level)).size, 20);
  assert.ok(entry.progression.every((row) => /^\+[2-6]$/.test(row.proficiencyBonus)));

  const progressionFeatures = new Set(entry.progression
    .flatMap((row) => row.features)
    .filter((name) => !/^(особливість підкласу|subclass feature|підкласова особливість)/i.test(name.trim()))
    .map((name) => name.toLocaleLowerCase('uk-UA')));
  const featureNames = new Set(entry.features.map((feature) => feature.nameUk.toLocaleLowerCase('uk-UA')));
  assert.deepEqual([...progressionFeatures].filter((name) => !featureNames.has(name)), []);
  assert.ok(entry.features.every((feature) => feature.level >= 1 && feature.level <= 20));
  assert.equal(new Set(entry.features.map((feature) => feature.id)).size, entry.features.length);
  assert.equal(new Set(entry.features.map((feature) => feature.anchorId)).size, entry.features.length);
});

test('all forty-eight subclasses have valid parents, identities and feature levels', () => {
  const subclasses = classes.flatMap((entry) => entry.subclasses);
  assert.equal(subclasses.length, 48);
  assert.equal(new Set(subclasses.map((entry) => entry.id)).size, 48);
  for (const parent of classes) {
    assert.equal(parent.subclasses.length, 4, `${parent.slug}: expected four registered subclasses`);
    for (const subclass of parent.subclasses) {
      assert.equal(subclass.classSlug, parent.slug);
      assert.ok(classSlugs.has(subclass.classSlug));
      assert.equal(subclass.chosenAtLevel, 3);
      assert.ok(subclass.features.every((feature) => feature.level >= subclass.chosenAtLevel && feature.level <= 20));
      assert.equal(new Set(subclass.features.map((feature) => feature.id)).size, subclass.features.length);
    }
  }
});

test('class passport, proficiencies and starting equipment are structurally usable', () => {
  for (const entry of classes) {
    assert.match(entry.hitDie, /^d(6|8|10|12)$/);
    assert.ok(entry.primaryAbility.trim());
    assert.equal(entry.savingThrows.length, 2);
    assert.ok(entry.weaponProficiencies.length > 0);
    assert.ok(Number.isInteger(entry.skillChoices.choose) && entry.skillChoices.choose > 0);
    assert.ok(entry.skillChoices.from.length > 0);
    assert.ok(entry.startingEquipment.length >= 2);
    assert.ok(entry.startingEquipment.every((group) => group.title.trim() && group.items.length > 0 && group.items.every((item) => item.trim())));
  }
});

test('spellcasting flags and progression rows are internally consistent', () => {
  assert.deepEqual(new Set(classes.filter((entry) => entry.hasSpellcasting).map((entry) => entry.slug)), expectedSpellcasters);
  for (const entry of classes) {
    const spellRows = entry.progression.filter((row) => row.spellcasting && Object.keys(row.spellcasting).length > 0);
    assert.equal(spellRows.length, entry.hasSpellcasting ? 20 : 0, `${entry.slug}: inconsistent spellcasting rows`);
    assert.ok(spellRows.every((row) => Object.values(row.spellcasting).every((value) => typeof value === 'string' || typeof value === 'number')));
  }
});

test('Weapon Mastery is registered on the expected 2024 classes', () => {
  const actual = new Set(classes
    .filter((entry) => entry.features.some((feature) => feature.nameUk === 'Майстерність зброї'))
    .map((entry) => entry.slug));
  assert.deepEqual(actual, expectedWeaponMastery);
});

test('repeated progression features reuse canonical content at every level', () => {
  const fighter = classes.find((entry) => entry.slug === 'fighter');
  assert.ok(fighter);
  const canonicalDescription = fighter.features.find((feature) => feature.nameUk === 'Збільшення характеристик')?.sourceText;
  assert.ok(canonicalDescription && canonicalDescription !== missingSourceText);

  const canonicalCards = fighter.features.map((feature) => ({
    title: feature.nameUk,
    description: feature.sourceText,
    rows: [{ label: 'Рівень', value: String(feature.level) }],
    kind: 'base',
  }));
  const resolvedCards = resolveClassFeatureCards(canonicalCards, fighter.progression);
  const expectedLevels = fighter.progression
    .filter((row) => row.features.includes('Збільшення характеристик'))
    .map((row) => String(row.level));
  const resolvedAsi = resolvedCards.filter((card) => card.title === 'Збільшення характеристик');

  assert.deepEqual(resolvedAsi.map((card) => card.rows.find((row) => row.label === 'Рівень')?.value), expectedLevels);
  assert.ok(resolvedAsi.every((card) => card.description === canonicalDescription));
  assert.ok(resolvedAsi.every((card) => card.description !== MISSING_CLASS_FEATURE_DESCRIPTION));
});

test('Warlock Pact Magic progression is complete and matches D&D 2024 levels 1-20', () => {
  const warlock = classes.find((entry) => entry.slug === 'warlock');
  assert.ok(warlock);
  assert.deepEqual(warlock.progression.map((row) => row.resources?.eldritch_invocations), [1,3,3,3,5,5,6,6,7,7,7,8,8,8,9,9,9,10,10,10]);
  assert.deepEqual(warlock.progression.map((row) => row.spellcasting?.pact_slots), [1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4]);
  assert.deepEqual(warlock.progression.map((row) => row.spellcasting?.pact_slot_level), [1,1,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5]);
  assert.ok(warlock.progression.every((row) => Number.isInteger(row.spellcasting?.pact_slots)));
  assert.ok(warlock.progression.every((row) => Number.isInteger(row.spellcasting?.pact_slot_level) && Number(row.spellcasting?.pact_slot_level) >= 1 && Number(row.spellcasting?.pact_slot_level) <= 5));
});

test('all base-class features have canonical source text after the first completion pass', () => {
  const incomplete = classes.flatMap((entry) => entry.features
    .filter((feature) => feature.sourceText === missingSourceText)
    .map((feature) => `${entry.slug}:${feature.nameUk}`));
  assert.deepEqual(incomplete, []);
});

test('class relationships from Rules, Spells and Feats resolve to real runtime classes', () => {
  for (const rule of rules) assert.ok(rule.relatedClassSlugs.every((slug) => classSlugs.has(slug)), `${rule.slug}: dead class rule link`);
  for (const spell of spells) assert.ok(spell.classes.every((slug) => classSlugs.has(slug)), `${spell.slug}: dead spell class link`);
  for (const feat of feats) assert.ok(feat.classSlugs.every((slug) => classSlugs.has(slug)), `${feat.slug}: dead feat class link`);
  assert.ok(Array.isArray(items) && Array.isArray(conditions));
});

test('no obvious legacy, raw object or invalid placeholder leaks exist', () => {
  assert.doesNotMatch(JSON.stringify(classes), /2014|Unearthed Arcana|playtest|\[object Object\]|undefined|null/i);
  for (const entry of classes) {
    for (const value of allFeatureText(entry)) assert.ok(value === missingSourceText || value.trim().length > 0);
    assert.ok(entry.source.url.startsWith('https://'));
    assert.ok(entry.subclasses.every((subclass) => subclass.source.url.startsWith('https://')));
  }
});

const missingBaseFeatures = classes.reduce((total, entry) => total + entry.features.filter((feature) => feature.sourceText === missingSourceText).length, 0);
const incompleteSubclasses = classes.flatMap((entry) => entry.subclasses).filter((subclass) => subclass.features.length === 0 || subclass.features.some((feature) => feature.sourceText === missingSourceText));
console.log(JSON.stringify({
  classes: classes.length,
  subclasses: classes.flatMap((entry) => entry.subclasses).length,
  completeProgressions: classes.filter((entry) => entry.progression.length === 20).length,
  missingBaseFeatures,
  incompleteSubclasses: incompleteSubclasses.length,
  relationships: {
    rules: rules.reduce((total, entry) => total + entry.relatedClassSlugs.length, 0),
    spells: spells.reduce((total, entry) => total + entry.classes.length, 0),
    feats: feats.reduce((total, entry) => total + entry.classSlugs.length, 0),
    items: 0,
    conditions: 0,
  },
}));
