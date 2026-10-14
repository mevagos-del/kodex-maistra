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
const {
  normalizeClassProgressionRows,
  progressionValueChanged,
} = loadLocalRules(resolve('src/features/catalog/utils/classProgression.ts'));
const { officialSpells: spells } = await loadSpells();

const expectedClassSlugs = [
  'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk',
  'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard',
];
const expectedSpellcasters = new Set(['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'warlock', 'wizard']);
const expectedWeaponMastery = new Set(['barbarian', 'fighter', 'paladin', 'ranger', 'rogue']);
const missingSourceText = 'Опис не вказано у доступному джерелі.';
const classSlugs = new Set(classes.map((entry) => entry.slug));
const subclasses = classes.flatMap((entry) => entry.subclasses);
const ruleSlugs = new Set(rules.map((entry) => entry.slug));
const spellSlugs = new Set(spells.map((entry) => entry.slug));
const featSlugs = new Set(feats.map((entry) => entry.slug));
const itemSlugs = new Set(items.map((entry) => entry.slug));
const conditionSlugs = new Set(conditions.map((entry) => entry.slug));
const itemLinkPlacements = classes.flatMap((entry) => entry.startingEquipment.flatMap((group) =>
  (group.itemLinks ?? []).map((link) => ({ classSlug: entry.slug, groupTitle: group.title, ...link })),
));
const classItemRelationships = new Set(itemLinkPlacements.map((link) => `${link.classSlug}:${link.slug}`));
const expectedFeaturelessLevels = {
  barbarian: [], bard: [11, 13, 15, 17], cleric: [9, 11, 13, 15, 18], druid: [9, 11, 13, 17],
  fighter: [], monk: [], paladin: [13, 17], ranger: [], rogue: [], sorcerer: [9, 11, 13, 15],
  warlock: [5, 7, 18], wizard: [7, 9, 11, 13, 15, 17],
};
const fullSlots = [
  [2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],
  [4,3,3,3,2,1],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],
  [4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],
  [4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1],
];
const halfSlots = [
  [2],[2],[3],[3],[4,2],[4,2],[4,3],[4,3],[4,3,2],[4,3,2],[4,3,3],[4,3,3],
  [4,3,3,1],[4,3,3,1],[4,3,3,2],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,1],
  [4,3,3,3,2],[4,3,3,3,2],
];

function progressionValues(slug, section, key, fallback = '—') {
  const entry = classes.find((candidate) => candidate.slug === slug);
  assert.ok(entry, `Missing class ${slug}`);
  return entry.progression.map((row) => row[section]?.[key] ?? fallback);
}

function expectedSlotRows(source, count) {
  return source.map((slots) => Array.from({ length: count }, (_, index) => slots[index] ?? '—'));
}

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
  assert.equal(subclasses.length, 48);
  assert.equal(new Set(subclasses.map((entry) => entry.id)).size, 48);
  assert.equal(new Set(subclasses.map((entry) => entry.slug)).size, 48);
  assert.equal(new Set(subclasses.map((entry) => entry.nameOriginal)).size, 48);
  for (const parent of classes) {
    assert.equal(parent.subclasses.length, 4, `${parent.slug}: expected four registered subclasses`);
    for (const subclass of parent.subclasses) {
      assert.equal(subclass.classSlug, parent.slug);
      assert.ok(classSlugs.has(subclass.classSlug));
      assert.equal(subclass.chosenAtLevel, 3);
      assert.ok(subclass.nameUk.trim() && subclass.nameOriginal.trim() && subclass.slug.trim());
      assert.ok(subclass.features.length > 0, `${subclass.slug}: identity-only subclass`);
      assert.ok(subclass.features.every((feature) => feature.level >= subclass.chosenAtLevel && feature.level <= 20));
      assert.equal(new Set(subclass.features.map((feature) => feature.id)).size, subclass.features.length);
      assert.ok(subclass.features.every((feature) => feature.sourceText.trim() && feature.sourceText !== missingSourceText), `${subclass.slug}: placeholder subclass feature`);
    }
  }
});

test('Eldritch Knight and Arcane Trickster have complete D&D 2024 spell progression', () => {
  const expectedPrepared = [3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13];
  const expectedSlots = [
    [2,0,0,0], [3,0,0,0], [3,0,0,0], [3,0,0,0],
    [4,2,0,0], [4,2,0,0], [4,2,0,0], [4,3,0,0], [4,3,0,0], [4,3,0,0],
    [4,3,2,0], [4,3,2,0], [4,3,2,0], [4,3,3,0], [4,3,3,0], [4,3,3,0],
    [4,3,3,1], [4,3,3,1],
  ];
  for (const [slug, expectedCantrips] of [
    ['eldritch-knight', [2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3]],
    ['arcane-trickster', [3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4]],
  ]) {
    const subclass = subclasses.find((entry) => entry.slug === slug);
    assert.ok(subclass?.spellcasting, `${slug}: missing structured spellcasting`);
    assert.equal(subclass.spellcasting.ability, 'Інтелект');
    assert.equal(subclass.spellcasting.spellList, 'wizard');
    assert.deepEqual(subclass.spellcasting.progression.map((row) => row.level), Array.from({ length: 18 }, (_, index) => index + 3));
    assert.deepEqual(subclass.spellcasting.progression.map((row) => row.cantrips), expectedCantrips);
    assert.deepEqual(subclass.spellcasting.progression.map((row) => row.preparedSpells), expectedPrepared);
    assert.deepEqual(subclass.spellcasting.progression.map((row) => row.slots), expectedSlots);
  }
});

test('subclass mechanical relationships resolve to existing runtime entities', () => {
  const registries = {
    ruleSlugs,
    spellSlugs,
    featSlugs,
    itemSlugs,
    conditionSlugs,
  };
  for (const subclass of subclasses) {
    for (const [key, registry] of Object.entries(registries)) {
      for (const slug of subclass.relationships?.[key] ?? []) {
        assert.ok(registry.has(slug), `${subclass.slug}: dead ${key} relationship ${slug}`);
      }
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

test('starting equipment item relationships are exact, resolvable and deduplicated', () => {
  assert.equal(itemLinkPlacements.length, 66);
  assert.equal(classItemRelationships.size, 65);

  for (const entry of classes) {
    assert.ok(entry.startingEquipment.some((group) => (group.itemLinks?.length ?? 0) > 0), `${entry.slug}: no linked starting equipment`);
    for (const group of entry.startingEquipment) {
      const links = group.itemLinks ?? [];
      assert.equal(new Set(links.map((link) => link.slug)).size, links.length, `${entry.slug}/${group.title}: duplicate item slug`);
      assert.equal(new Set(links.map((link) => link.match.toLocaleLowerCase('uk-UA'))).size, links.length, `${entry.slug}/${group.title}: duplicate item match`);
      const visibleText = group.items.join(' ').toLocaleLowerCase('uk-UA');
      for (const link of links) {
        assert.ok(itemSlugs.has(link.slug), `${entry.slug}: dead starting equipment item ${link.slug}`);
        assert.ok(link.match.trim(), `${entry.slug}: empty item match for ${link.slug}`);
        assert.ok(visibleText.includes(link.match.toLocaleLowerCase('uk-UA')), `${entry.slug}/${group.title}: match not present for ${link.slug}`);
      }
    }
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

test('all official spellcasting progressions match the D&D 2024 level 1-20 tables', () => {
  const fullCasterData = {
    bard: { cantrips: [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4], prepared: [4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    cleric: { cantrips: [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5], prepared: [4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    druid: { cantrips: [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4], prepared: [4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    sorcerer: { cantrips: [4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6], prepared: [2,4,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    wizard: { cantrips: [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5], prepared: [4,5,6,7,9,10,11,12,14,15,16,16,17,18,19,21,22,23,24,25] },
  };
  for (const [slug, expected] of Object.entries(fullCasterData)) {
    assert.deepEqual(progressionValues(slug, 'spellcasting', 'cantrips'), expected.cantrips, `${slug}: cantrips`);
    assert.deepEqual(progressionValues(slug, 'spellcasting', 'prepared_spells'), expected.prepared, `${slug}: prepared spells`);
    const actualSlots = Array.from({ length: 20 }, (_, levelIndex) => Array.from(
      { length: 9 },
      (_, slotIndex) => progressionValues(slug, 'spellcasting', `slot_${slotIndex + 1}`)[levelIndex],
    ));
    assert.deepEqual(actualSlots, expectedSlotRows(fullSlots, 9), `${slug}: spell slots`);
  }

  const halfPrepared = [2,3,4,5,6,6,7,7,9,9,10,10,11,11,12,12,14,14,15,15];
  for (const slug of ['paladin', 'ranger']) {
    assert.deepEqual(progressionValues(slug, 'spellcasting', 'prepared_spells'), halfPrepared, `${slug}: prepared spells`);
    const actualSlots = Array.from({ length: 20 }, (_, levelIndex) => Array.from(
      { length: 5 },
      (_, slotIndex) => progressionValues(slug, 'spellcasting', `slot_${slotIndex + 1}`)[levelIndex],
    ));
    assert.deepEqual(actualSlots, expectedSlotRows(halfSlots, 5), `${slug}: spell slots`);
  }
});

test('class-specific resource progressions match the verified D&D 2024 values', () => {
  assert.deepEqual(progressionValues('barbarian', 'resources', 'rages'), [2,2,3,3,3,4,4,4,4,4,4,5,5,5,5,5,6,6,6,6]);
  assert.deepEqual(progressionValues('barbarian', 'resources', 'rage_damage'), ['+2','+2','+2','+2','+2','+2','+2','+2','+3','+3','+3','+3','+3','+3','+3','+4','+4','+4','+4','+4']);
  assert.deepEqual(progressionValues('barbarian', 'resources', 'weapon_mastery'), [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4]);
  assert.deepEqual(progressionValues('barbarian', 'resources', 'brutal_strike_damage'), ['—','—','—','—','—','—','—','—','1к10','1к10','1к10','1к10','1к10','1к10','1к10','1к10','2к10','2к10','2к10','2к10']);
  assert.deepEqual(progressionValues('barbarian', 'resources', 'brutal_strike_effects'), ['—','—','—','—','—','—','—','—',1,1,1,1,1,1,1,1,2,2,2,2]);

  assert.deepEqual(progressionValues('bard', 'resources', 'bardic_die'), ['к6','к6','к6','к6','к8','к8','к8','к8','к8','к10','к10','к10','к10','к10','к12','к12','к12','к12','к12','к12']);
  assert.deepEqual(progressionValues('cleric', 'resources', 'channel_divinity'), ['—',2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4]);
  assert.deepEqual(progressionValues('druid', 'resources', 'wild_shape'), ['—',2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4]);

  assert.deepEqual(progressionValues('fighter', 'resources', 'second_wind'), [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4]);
  assert.deepEqual(progressionValues('fighter', 'resources', 'weapon_mastery'), [3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6]);
  assert.deepEqual(progressionValues('fighter', 'resources', 'action_surge'), ['—',1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2]);
  assert.deepEqual(progressionValues('fighter', 'resources', 'extra_attack'), ['—','—','—','—','2 атаки','2 атаки','2 атаки','2 атаки','2 атаки','2 атаки','3 атаки','3 атаки','3 атаки','3 атаки','3 атаки','3 атаки','3 атаки','3 атаки','3 атаки','4 атаки']);

  assert.deepEqual(progressionValues('monk', 'resources', 'martial_arts_die'), ['к6','к6','к6','к6','к8','к8','к8','к8','к8','к8','к10','к10','к10','к10','к10','к10','к12','к12','к12','к12']);
  assert.deepEqual(progressionValues('monk', 'resources', 'focus_points'), ['—',2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  assert.deepEqual(progressionValues('monk', 'resources', 'unarmored_movement'), ['—','+10 фт','+10 фт','+10 фт','+10 фт','+15 фт','+15 фт','+15 фт','+15 фт','+20 фт','+20 фт','+20 фт','+20 фт','+25 фт','+25 фт','+25 фт','+25 фт','+30 фт','+30 фт','+30 фт']);

  assert.deepEqual(progressionValues('paladin', 'resources', 'lay_on_hands'), Array.from({ length: 20 }, (_, index) => (index + 1) * 5));
  assert.deepEqual(progressionValues('paladin', 'resources', 'channel_divinity'), ['—','—',2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3]);
  assert.deepEqual(progressionValues('paladin', 'resources', 'weapon_mastery'), Array(20).fill(2));
  assert.deepEqual(progressionValues('ranger', 'resources', 'favored_enemy'), [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6]);
  assert.deepEqual(progressionValues('ranger', 'resources', 'weapon_mastery'), Array(20).fill(2));
  assert.deepEqual(progressionValues('rogue', 'resources', 'sneak_attack'), ['1к6','1к6','2к6','2к6','3к6','3к6','4к6','4к6','5к6','5к6','6к6','6к6','7к6','7к6','8к6','8к6','9к6','9к6','10к6','10к6']);
  assert.deepEqual(progressionValues('rogue', 'resources', 'weapon_mastery'), Array(20).fill(2));
  assert.deepEqual(progressionValues('rogue', 'resources', 'cunning_strike_effects'), ['—','—','—','—',1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2]);
  assert.deepEqual(progressionValues('sorcerer', 'resources', 'sorcery_points'), ['—',2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
  assert.deepEqual(progressionValues('sorcerer', 'resources', 'metamagic_options'), ['—',2,2,2,2,2,2,2,2,4,4,4,4,4,4,4,6,6,6,6]);
  assert.deepEqual(progressionValues('wizard', 'resources', 'arcane_recovery_levels'), [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10]);
});

test('featureless official levels still expose a real progression change', () => {
  for (const entry of classes) {
    const actualFeatureless = entry.progression.filter((row) => row.features.length === 0).map((row) => row.level);
    assert.deepEqual(actualFeatureless, expectedFeaturelessLevels[entry.slug], `${entry.slug}: unexpected featureless levels`);
    for (const level of actualFeatureless) {
      const current = entry.progression[level - 1];
      const previous = entry.progression[level - 2];
      assert.ok(progressionValueChanged(current, previous), `${entry.slug} level ${level}: no feature and no numeric progression change`);
    }
  }
});

test('progression normalizer exposes every nested resource and spellcasting value as a table column', () => {
  for (const entry of classes) {
    const normalized = normalizeClassProgressionRows(entry.progression);
    assert.equal(normalized.length, 20);
    for (let index = 0; index < entry.progression.length; index += 1) {
      const source = entry.progression[index];
      const expectedKeys = [...Object.keys(source.resources ?? {}), ...Object.keys(source.spellcasting ?? {})];
      for (const key of expectedKeys) {
        assert.equal(normalized[index][key], source.resources?.[key] ?? source.spellcasting?.[key], `${entry.slug} level ${source.level}: hidden ${key}`);
      }
      assert.equal('resources' in normalized[index], false);
      assert.equal('spellcasting' in normalized[index], false);
    }
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
  assert.deepEqual(warlock.progression.map((row) => row.resources?.mystic_arcanum), ['—','—','—','—','—','—','—','—','—','—','6 рів.','6 рів.','6–7 рів.','6–7 рів.','6–8 рів.','6–8 рів.','6–9 рів.','6–9 рів.','6–9 рів.','6–9 рів.']);
  assert.deepEqual(warlock.progression.map((row) => row.spellcasting?.cantrips), [2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4]);
  assert.deepEqual(warlock.progression.map((row) => row.spellcasting?.prepared_spells), [2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15]);
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

test('all subclass data is complete and user-facing', () => {
  const incomplete = subclasses.flatMap((subclass) => subclass.features
    .filter((feature) => !feature.sourceText.trim() || feature.sourceText === missingSourceText)
    .map((feature) => `${subclass.slug}:${feature.nameUk}`));
  assert.deepEqual(incomplete, []);
  assert.doesNotMatch(JSON.stringify(subclasses), /опис не вказано|placeholder|todo|tbd|\[object Object\]|undefined|null/i);
});

const missingBaseFeatures = classes.reduce((total, entry) => total + entry.features.filter((feature) => feature.sourceText === missingSourceText).length, 0);
const incompleteSubclasses = subclasses.filter((subclass) => subclass.features.length === 0 || subclass.features.some((feature) => feature.sourceText === missingSourceText));
console.log(JSON.stringify({
  classes: classes.length,
  subclasses: subclasses.length,
  completeProgressions: classes.filter((entry) => entry.progression.length === 20).length,
  missingBaseFeatures,
  incompleteSubclasses: incompleteSubclasses.length,
  relationships: {
    rules: rules.reduce((total, entry) => total + entry.relatedClassSlugs.length, 0),
    spells: spells.reduce((total, entry) => total + entry.classes.length, 0),
    feats: feats.reduce((total, entry) => total + entry.classSlugs.length, 0),
    items: classItemRelationships.size,
    conditions: 0,
  },
  subclassRelationships: {
    rules: subclasses.reduce((total, entry) => total + (entry.relationships?.ruleSlugs?.length ?? 0), 0),
    spells: subclasses.reduce((total, entry) => total + (entry.relationships?.spellSlugs?.length ?? 0), 0),
    feats: subclasses.reduce((total, entry) => total + (entry.relationships?.featSlugs?.length ?? 0), 0),
    items: subclasses.reduce((total, entry) => total + (entry.relationships?.itemSlugs?.length ?? 0), 0),
    conditions: subclasses.reduce((total, entry) => total + (entry.relationships?.conditionSlugs?.length ?? 0), 0),
  },
}));
