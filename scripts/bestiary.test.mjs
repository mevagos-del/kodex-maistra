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
const { officialRules: rules } = loadLocalRules(resolve(rulesRoot, 'rules.ts'));
const { officialSpells: spells } = await loadSpells();
const { bestiaryModelFixtures: fixtures } = loadLocalRules(resolve('src/data/rules/__fixtures__/bestiaryModel.ts'));
const {
  extractDamageFormula, formatAttackMetadata, formatDamageText, formatMonsterActionScanFacts, formatMonsterDamageInstance,
  formatMonsterGear, formatMonsterLimitedUse, formatMonsterRecharge, formatMonsterSavingThrow, formatMonsterSavingThrowOutcomes,
  formatMonsterSpellcastingGroupLabel, formatMonsterSpellReference, normalizeMonsterDamageInstances, normalizeMonsterMechanicSteps,
  parseDiceFormula, rollDiceFormula, splitBestiaryDescription, splitBestiarySpeed,
} = loadLocalRules(resolve('src/features/catalog/utils/bestiaryMechanics.ts'));
const { segmentBestiaryReferences } = loadLocalRules(resolve('src/features/catalog/utils/bestiaryReferences.ts'));
const { BESTIARY_ICONS } = loadLocalRules(resolve('src/features/catalog/utils/codexIcons.ts'));
const bestiaryManifest = JSON.parse(readFileSync(resolve('docs/bestiary-manifest.json'), 'utf8'));
const spellSlugs = new Set(spells.map(entry => entry.slug));
const conditionSlugs = new Set(conditions.map(entry => entry.slug));
const itemSlugs = new Set(items.map(entry => entry.slug));
const ruleSlugs = new Set(rules.map(entry => entry.slug));
const abilityKeys = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const validChallengeRating = /^(?:0|1\/8|1\/4|1\/2|[1-9]|[12]\d|30)$/;
const bySlug = Object.fromEntries(entries.map(entry => [entry.slug, entry]));

test('SRD 5.2.1 manifest contains all 330 canonical stat blocks', () => {
  assert.equal(bestiaryManifest.source.id, 'srd-5-2-1');
  assert.equal(bestiaryManifest.source.edition, 'D&D 2024');
  assert.equal(bestiaryManifest.statBlockCount, 330);
  assert.equal(bestiaryManifest.monsters.length, 330);
  assert.equal(new Set(bestiaryManifest.monsters.map(entry => entry.slug)).size, 330);
  assert.equal(new Set(bestiaryManifest.monsters.map(entry => entry.nameOriginal)).size, 330);
  assert.deepEqual(bestiaryManifest.coverage, { complete: 237, partial: 0, missing: 93 });
  assert.ok(bestiaryManifest.monsters.every(entry => entry.source === 'SRD 5.2.1'));
  assert.ok(bestiaryManifest.monsters.every(entry => Number.isInteger(entry.sourcePage) && entry.sourcePage >= 258 && entry.sourcePage <= 364));
  assert.ok(bestiaryManifest.monsters.every(entry => entry.slug && entry.nameOriginal && entry.size && entry.creatureType && entry.identityLine));
  assert.ok(bestiaryManifest.monsters.every(entry => validChallengeRating.test(entry.challengeRating)));
  const typeCounts = Object.fromEntries([...new Set(bestiaryManifest.monsters.map(entry => entry.creatureType))]
    .sort()
    .map(type => [type, bestiaryManifest.monsters.filter(entry => entry.creatureType === type).length]));
  assert.deepEqual(typeCounts, {
    Aberration: 9, Beast: 90, Celestial: 13, Construct: 10, Dragon: 45, Elemental: 17, Fey: 15,
    Fiend: 29, Giant: 10, Humanoid: 26, Monstrosity: 37, Ooze: 4, Plant: 6, Undead: 19,
  });
});

test('runtime Bestiary identities map to Complete manifest entries', () => {
  const manifestBySlug = new Map(bestiaryManifest.monsters.map(entry => [entry.slug, entry]));
  for (const entry of entries) {
    const manifestEntry = manifestBySlug.get(entry.slug);
    assert.ok(manifestEntry, `${entry.slug}: missing from canonical manifest`);
    assert.equal(manifestEntry.nameOriginal, entry.nameOriginal);
    assert.equal(manifestEntry.coverageStatus, 'Complete');
  }
  assert.equal(bestiaryManifest.monsters.filter(entry => entry.coverageStatus === 'Complete').length, entries.length);
  assert.equal(bestiaryManifest.monsters.filter(entry => entry.coverageStatus === 'Partial').length, 0);
  assert.equal(bestiaryManifest.monsters.filter(entry => entry.coverageStatus === 'Missing').length, 93);
});

test('imported Bestiary batches have unique official identities and valid sources', () => {
  assert.equal(entries.length, 237);
  assert.equal(new Set(entries.map(entry => entry.slug)).size, entries.length);
  assert.equal(new Set(entries.map(entry => entry.nameOriginal)).size, entries.length);
  assert.ok(entries.every(entry => entry.entity === 'monster' && entry.status === 'official'));
  assert.ok(entries.every(entry => entry.source?.id === 'srd-5-2-1' && entry.sourcePage > 0));
});

for (const entry of entries) test(`${entry.slug}: required runtime fields and valid action groups`, () => {
  assert.match(entry.challengeRating, validChallengeRating);
  assert.ok(entry.experiencePoints >= 0);
  assert.deepEqual(Object.keys(entry.abilities), abilityKeys);
  assert.ok(Object.values(entry.abilities).every(value => Number.isInteger(value.score) && value.modifier && value.save));
  assert.ok(entry.armorClass && entry.hitPoints && entry.hitDice && entry.speed.length && entry.proficiencyBonus);
  assert.ok([entry.actions, entry.bonusActions, entry.reactions, entry.legendaryActions, entry.lairActions].some(group => group?.length > 0));
  for (const group of [entry.traits, entry.actions, entry.bonusActions, entry.reactions, entry.legendaryActions, entry.lairActions].filter(Boolean)) {
    assert.ok(group.every(block => block.id && block.nameUk && (block.sourceText === undefined || block.sourceText.trim())));
    assert.equal(new Set(group.map(block => block.id)).size, group.length);
  }
});

test('conditional renderer branches are represented by real data only', () => {
  assert.deepEqual(entries.filter(entry => entry.bonusActions?.length).map(entry => entry.slug), [
    'goblin-boss', 'mage', 'elephant', 'giant-ape', 'giant-hyena', 'giant-seahorse', 'mammoth', 'panther',
    'saber-toothed-tiger', 'tiger', 'assassin', 'cultist-fanatic', 'archmage', 'pirate-captain',
    'priest-acolyte', 'priest', 'spy', 'vampire-familiar', 'clay-golem', 'gorgon', 'magmin', 'stone-golem', 'xorn',
    'cloud-giant', 'frost-giant', 'troll', 'couatl', 'deva', 'planetar', 'solar', 'unicorn',
    'blink-dog', 'bugbear-stalker', 'centaur-trooper', 'dryad', 'goblin-minion', 'goblin-warrior', 'cloaker',
    'basilisk', 'behir', 'bulette', 'doppelganger', 'drider', 'ettercap', 'medusa', 'mimic', 'phase-spider',
    'purple-worm', 'remorhaz', 'roc', 'tarrasque', 'werebear', 'wereboar', 'wererat', 'weretiger', 'werewolf',
  ]);
  assert.deepEqual(entries.filter(entry => entry.reactions?.length).map(entry => entry.slug), [
    'goblin-boss', 'mage', 'giant-octopus', 'octopus', 'bandit-captain', 'gladiator', 'knight', 'archmage',
    'noble', 'pirate-captain', 'warrior-veteran', 'black-pudding', 'shrieker-fungus', 'ochre-jelly', 'shield-guardian',
    'stone-giant', 'sphinx-of-wonder',
    'rust-monster',
  ]);
  assert.deepEqual(entries.filter(entry => entry.legendaryActions?.length).map(entry => entry.slug), [
    'aboleth', 'solar', 'sphinx-of-lore', 'sphinx-of-valor', 'unicorn', 'kraken', 'tarrasque',
  ]);
  assert.deepEqual(entries.filter(entry => entry.spellcasting).map(entry => entry.slug), [
    'mage', 'cultist-fanatic', 'druid', 'archmage', 'priest-acolyte', 'priest', 'djinni', 'efreeti',
    'cloud-giant', 'storm-giant', 'couatl', 'deva', 'guardian-naga', 'planetar', 'solar', 'sphinx-of-lore',
    'sphinx-of-valor', 'unicorn', 'giant-owl', 'dryad', 'green-hag', 'sea-hag', 'sprite', 'cloaker',
  ]);
  assert.ok(entries.every(entry => !entry.lairActions?.length));
});

test('all 90 canonical SRD Beasts are complete after importing the first batch', () => {
  const manifestBeasts = bestiaryManifest.monsters.filter(entry => entry.creatureType === 'Beast');
  const runtimeBeasts = entries.filter(entry => entry.creatureType === 'Звір');
  assert.equal(manifestBeasts.length, 90);
  assert.equal(runtimeBeasts.length, 90);
  assert.ok(manifestBeasts.every(entry => entry.coverageStatus === 'Complete'));
  assert.deepEqual(new Set(runtimeBeasts.map(entry => entry.slug)), new Set(manifestBeasts.map(entry => entry.slug)));
  assert.ok(runtimeBeasts.every(entry => entry.actions.length > 0));
  assert.ok(runtimeBeasts.every(entry => entry.sourcePage >= 344 && entry.sourcePage <= 364));
});

test('representative imported Beasts match exact SRD 5.2.1 core statistics', () => {
  const expected = {
    allosaurus: ['13', '51', '6к10 + 18', ['60 фт'], '+1', 11, '2', 450, '+2', 344],
    'giant-ape': ['12', '168', '16к12 + 64', ['40 фт', 'лазіння 40 фт'], '+5', 15, '7', 2900, '+3', 349],
    'giant-spider': ['14', '26', '4к10 + 4', ['30 фт', 'лазіння 30 фт'], '+3', 13, '1', 200, '+2', 353],
    'giant-octopus': ['11', '45', '7к10 + 7', ['10 фт', 'плавання 60 фт'], '+1', 11, '1', 200, '+2', 352],
    mammoth: ['13', '126', '11к12 + 55', ['50 фт'], '+2', 12, '6', 2300, '+3', 357],
    'tyrannosaurus-rex': ['13', '136', '13к12 + 52', ['50 фт'], '+3', 13, '8', 3900, '+3', 363],
  };
  for (const [slug, values] of Object.entries(expected)) {
    const entry = bySlug[slug];
    assert.deepEqual([
      entry.armorClass, entry.hitPoints, entry.hitDice, entry.speed, entry.initiative.modifier, entry.initiative.score,
      entry.challengeRating, entry.experiencePoints, entry.proficiencyBonus, entry.sourcePage,
    ], values, `${slug}: core statistics`);
  }
});

test('all 26 canonical SRD Humanoids are complete after importing the second batch', () => {
  const manifestHumanoids = bestiaryManifest.monsters.filter(entry => entry.creatureType === 'Humanoid');
  const runtimeHumanoids = entries.filter(entry => entry.creatureType === 'Гуманоїд');
  assert.equal(manifestHumanoids.length, 26);
  assert.equal(runtimeHumanoids.length, 26);
  assert.ok(manifestHumanoids.every(entry => entry.coverageStatus === 'Complete'));
  assert.deepEqual(new Set(runtimeHumanoids.map(entry => entry.slug)), new Set(manifestHumanoids.map(entry => entry.slug)));
  assert.ok(runtimeHumanoids.every(entry => entry.actions.length > 0));
});

test('every imported Humanoid matches its source-backed core and action-group signature', () => {
  const expected = {
    assassin: ['16', '97', '15к8 + 30', '+10', 20, '8', 3900, '+3', 260, [1, 3, 1, 0, 0]],
    'bandit-captain': ['15', '52', '8к8 + 16', '+3', 13, '2', 450, '+2', 261, [0, 3, 0, 1, 0]],
    berserker: ['13', '67', '9к8 + 27', '+1', 11, '2', 450, '+2', 263, [1, 1, 0, 0, 0]],
    commoner: ['10', '4', '1к8', '+0', 10, '0', 10, '+2', 275, [1, 1, 0, 0, 0]],
    cultist: ['12', '9', '2к8', '+1', 11, '1/8', 25, '+2', 278, [0, 1, 0, 0, 0]],
    'cultist-fanatic': ['13', '44', '8к8 + 8', '+2', 12, '2', 450, '+2', 278, [0, 1, 1, 0, 4]],
    druid: ['13', '44', '8к8 + 8', '+1', 11, '2', 450, '+2', 282, [0, 3, 0, 0, 3]],
    gladiator: ['16', '112', '15к8 + 45', '+5', 15, '5', 1800, '+3', 289, [0, 3, 0, 1, 0]],
    guard: ['16', '11', '2к8 + 2', '+1', 11, '1/8', 25, '+2', 296, [0, 1, 0, 0, 0]],
    'guard-captain': ['18', '75', '10к8 + 30', '+4', 14, '4', 1100, '+2', 296, [0, 3, 0, 0, 0]],
    knight: ['18', '52', '8к8 + 16', '+0', 10, '3', 700, '+2', 302, [0, 3, 0, 1, 0]],
    archmage: ['17', '170', '31к8 + 31', '+7', 17, '12', 8000, '+4', 305, [1, 2, 1, 1, 5]],
    noble: ['15', '9', '2к8', '+1', 11, '1/8', 25, '+2', 312, [0, 1, 0, 1, 0]],
    pirate: ['14', '33', '6к8 + 6', '+5', 15, '1', 200, '+2', 314, [0, 3, 0, 0, 0]],
    'pirate-captain': ['17', '84', '13к8 + 26', '+7', 17, '6', 2300, '+3', 314, [0, 3, 1, 1, 0]],
    'priest-acolyte': ['13', '11', '2к8 + 2', '+0', 10, '1/4', 50, '+2', 316, [0, 2, 1, 0, 2]],
    priest: ['13', '38', '7к8 + 7', '+0', 10, '2', 450, '+2', 316, [0, 3, 1, 0, 3]],
    scout: ['13', '16', '3к8 + 3', '+2', 12, '1/2', 100, '+2', 322, [0, 3, 0, 0, 0]],
    spy: ['12', '27', '6к8', '+4', 14, '1', 200, '+2', 329, [0, 2, 1, 0, 0]],
    tough: ['12', '32', '5к8 + 10', '+1', 11, '1/2', 100, '+2', 332, [1, 2, 0, 0, 0]],
    'tough-boss': ['16', '82', '11к8 + 33', '+2', 12, '4', 1100, '+2', 332, [1, 3, 0, 0, 0]],
    'vampire-familiar': ['15', '65', '10к8 + 20', '+5', 15, '3', 700, '+2', 334, [1, 2, 1, 0, 0]],
    'warrior-infantry': ['13', '9', '2к8', '+0', 10, '1/8', 25, '+2', 336, [1, 1, 0, 0, 0]],
    'warrior-veteran': ['17', '65', '10к8 + 20', '+3', 13, '3', 700, '+2', 337, [0, 3, 0, 1, 0]],
  };
  for (const [slug, signature] of Object.entries(expected)) {
    const entry = bySlug[slug];
    const groups = [entry.traits?.length ?? 0, entry.actions.length, entry.bonusActions?.length ?? 0, entry.reactions?.length ?? 0, entry.spellcasting?.groups.length ?? 0];
    assert.deepEqual([
      entry.armorClass, entry.hitPoints, entry.hitDice, entry.initiative.modifier, entry.initiative.score,
      entry.challengeRating, entry.experiencePoints, entry.proficiencyBonus, entry.sourcePage, groups,
    ], signature, `${slug}: SRD core/action signature`);
  }
});

test('Humanoid Gear uses exact Item links and preserves source quantities', () => {
  const imported = entries.filter(entry => entry.creatureType === 'Гуманоїд' && !['bandit', 'mage'].includes(entry.slug));
  assert.ok(imported.every(entry => entry.gear?.length));
  assert.ok(imported.flatMap(entry => entry.gear ?? []).filter(gear => gear.itemSlug).every(gear => itemSlugs.has(gear.itemSlug)));
  assert.deepEqual(bySlug.gladiator.gear.find(gear => gear.itemSlug === 'spear'), { nameUk: 'Спис', quantity: 3, itemSlug: 'spear' });
  assert.deepEqual(bySlug['guard-captain'].gear.find(gear => gear.itemSlug === 'javelin'), { nameUk: 'Дротик', quantity: 6, itemSlug: 'javelin' });
  assert.deepEqual(bySlug['vampire-familiar'].gear, [{ nameUk: 'Кинджал', quantity: 10, itemSlug: 'dagger' }]);
  assert.deepEqual(bySlug.archmage.gear, [{ nameUk: 'Паличка' }]);
});

test('Humanoid spellcasting, usage limits and unlinked source spells remain exact', () => {
  const casters = ['cultist-fanatic', 'druid', 'archmage', 'priest-acolyte', 'priest'].map(slug => bySlug[slug]);
  for (const entry of casters) {
    const linked = entry.spellcasting.groups.flatMap(group => group.spells.map(spell => spell.slug).filter(Boolean));
    assert.deepEqual(new Set(linked), new Set(entry.relationships.spellSlugs));
    assert.ok(linked.every(slug => spellSlugs.has(slug)));
  }
  const unlinked = casters.flatMap(entry => entry.spellcasting.groups.flatMap(group => group.spells.filter(spell => !spell.slug).map(spell => [entry.slug, spell.nameUk])));
  assert.deepEqual(unlinked, [['druid', 'Розмова з тваринами']]);
  const archmage = bySlug.archmage;
  assert.equal(archmage.spellcasting.groups[1].spells.find(spell => spell.slug === 'lightning-bolt').castAtLevel, 7);
  assert.equal(archmage.spellcasting.groups[2].spells.find(spell => spell.slug === 'cone-of-cold').castAtLevel, 9);
  assert.equal(archmage.spellcasting.groups[2].spells.find(spell => spell.slug === 'mind-blank').qualifier, 'накладено до бою');
  assert.deepEqual(archmage.bonusActions[0].limitedUse, { uses: 3, period: 'day' });
  assert.deepEqual(bySlug['priest-acolyte'].bonusActions[0].limitedUse, { uses: 1, period: 'day' });
  assert.deepEqual(bySlug.priest.bonusActions[0].limitedUse, { uses: 3, period: 'day' });
});

test('Humanoid saves, reactions and complex condition effects remain structured', () => {
  assert.deepEqual(bySlug.gladiator.actions.find(action => action.id === 'gladiator-shield-bash').savingThrow, {
    ability: 'strength', dc: 15, onFailure: 'Ціль отримує повну шкоду; якщо вона має Середній або менший розмір, також отримує стан Збитий з ніг.',
  });
  assert.deepEqual(bySlug.pirate.actions.find(action => action.id === 'pirate-enthralling-panache').savingThrow, {
    ability: 'wisdom', dc: 12, onFailure: 'Ціль отримує стан Зачарований до початку наступного ходу пірата.',
  });
  assert.deepEqual(bySlug['pirate-captain'].bonusActions[0].savingThrow, {
    ability: 'wisdom', dc: 14, onFailure: 'Ціль отримує стан Зачарований до початку наступного ходу пірата.',
  });
  assert.match(bySlug['pirate-captain'].reactions[0].sourceText, /У разі промаху/u);
  assert.match(bySlug['vampire-familiar'].actions.find(action => action.id === 'vampire-familiar-umbral-dagger').sourceText, /Стабільною/u);
  assert.deepEqual(bySlug['vampire-familiar'].relationships.conditionSlugs, ['charmed', 'paralyzed', 'poisoned']);
});

test('all 37 canonical third-batch creatures are complete by exact manifest type', () => {
  const manifestEntries = bestiaryManifest.monsters.filter(entry => ['Elemental', 'Construct', 'Ooze', 'Plant'].includes(entry.creatureType));
  const runtimeEntries = entries.filter(entry => ['Елементаль', 'Конструкт', 'Слиз', 'Рослина'].includes(entry.creatureType));
  assert.equal(manifestEntries.length, 37);
  assert.equal(runtimeEntries.length, 37);
  assert.deepEqual(
    Object.fromEntries(['Elemental', 'Construct', 'Ooze', 'Plant'].map(type => [type, manifestEntries.filter(entry => entry.creatureType === type).length])),
    { Elemental: 17, Construct: 10, Ooze: 4, Plant: 6 },
  );
  assert.ok(manifestEntries.every(entry => entry.coverageStatus === 'Complete'));
  assert.deepEqual(new Set(runtimeEntries.map(entry => entry.slug)), new Set(manifestEntries.map(entry => entry.slug)));
});

test('every third-batch creature matches its SRD 5.2.1 core and action-group signature', () => {
  const expected = {
    'air-elemental': ['15', '90', '12к10 + 24', '+5', 15, '5', 1800, '+3', 258, [1, 3, 0, 0, 0]],
    'animated-armor': ['18', '33', '6к8 + 6', '+2', 12, '1', 200, '+2', 259, [0, 2, 0, 0, 0]],
    'animated-flying-sword': ['17', '14', '4к6', '+4', 14, '1/4', 50, '+2', 259, [0, 1, 0, 0, 0]],
    'animated-rug-of-smothering': ['12', '27', '5к10', '+4', 14, '2', 450, '+2', 259, [0, 1, 0, 0, 0]],
    'awakened-shrub': ['9', '10', '3к6', '−1', 9, '0', 10, '+2', 260, [0, 1, 0, 0, 0]],
    'awakened-tree': ['13', '59', '7к12 + 14', '−2', 8, '2', 450, '+2', 260, [0, 1, 0, 0, 0]],
    'azer-sentinel': ['17', '39', '6к8 + 12', '+1', 11, '2', 450, '+2', 261, [2, 1, 0, 0, 0]],
    'black-pudding': ['7', '68', '8к10 + 24', '−3', 7, '4', 1100, '+2', 265, [3, 1, 0, 1, 0]],
    'clay-golem': ['14', '123', '13к10 + 52', '+3', 13, '9', 5000, '+4', 274, [4, 2, 1, 0, 0]],
    djinni: ['17', '218', '19к10 + 114', '+2', 12, '11', 7200, '+4', 280, [3, 4, 0, 0, 3]],
    'earth-elemental': ['17', '147', '14к10 + 70', '−1', 9, '5', 1800, '+3', 282, [2, 3, 0, 0, 0]],
    efreeti: ['17', '212', '17к10 + 119', '+1', 11, '11', 7200, '+4', 283, [3, 3, 0, 0, 2]],
    'fire-elemental': ['13', '93', '11к10 + 33', '+3', 13, '5', 1800, '+3', 284, [4, 2, 0, 0, 0]],
    'flesh-golem': ['9', '127', '15к8 + 60', '−1', 9, '5', 1800, '+3', 285, [5, 2, 0, 0, 0]],
    'shrieker-fungus': ['5', '13', '3к8', '−5', 5, '0', 0, '+2', 286, [0, 0, 0, 1, 0]],
    'violet-fungus': ['5', '18', '4к8', '−5', 5, '1/4', 50, '+2', 286, [0, 2, 0, 0, 0]],
    gargoyle: ['15', '67', '9к8 + 27', '+2', 12, '2', 450, '+2', 286, [1, 2, 0, 0, 0]],
    'gelatinous-cube': ['6', '63', '6к10 + 30', '−4', 6, '2', 450, '+2', 286, [2, 2, 0, 0, 0]],
    gorgon: ['19', '114', '12к10 + 48', '+0', 10, '5', 1800, '+3', 292, [0, 2, 1, 0, 0]],
    'gray-ooze': ['9', '22', '3к8 + 9', '−2', 13, '1/2', 100, '+2', 293, [2, 1, 0, 0, 0]],
    homunculus: ['13', '4', '1к4 + 2', '+2', 12, '0', 10, '+2', 299, [1, 1, 0, 0, 0]],
    'invisible-stalker': ['14', '97', '13к10 + 26', '+7', 22, '6', 2300, '+3', 301, [2, 3, 0, 0, 0]],
    'iron-golem': ['20', '252', '24к10 + 120', '+9', 19, '16', 15000, '+5', 302, [3, 4, 0, 0, 0]],
    magmin: ['14', '13', '3к6 + 3', '+2', 12, '1/2', 100, '+2', 305, [1, 1, 1, 0, 0]],
    'dust-mephit': ['12', '17', '5к6', '+2', 12, '1/2', 100, '+2', 307, [1, 3, 0, 0, 0]],
    'ice-mephit': ['11', '21', '6к6', '+1', 11, '1/2', 100, '+2', 307, [1, 3, 0, 0, 0]],
    'magma-mephit': ['11', '18', '4к6 + 4', '+1', 11, '1/2', 100, '+2', 307, [1, 2, 0, 0, 0]],
    'steam-mephit': ['10', '17', '5к6', '+0', 10, '1/4', 50, '+2', 308, [2, 2, 0, 0, 0]],
    'merfolk-skirmisher': ['11', '11', '2к8 + 2', '+1', 11, '1/8', 25, '+2', 308, [1, 1, 0, 0, 0]],
    'ochre-jelly': ['8', '52', '7к10 + 14', '−2', 8, '2', 450, '+2', 312, [2, 1, 0, 1, 0]],
    salamander: ['15', '90', '12к10 + 24', '+2', 12, '5', 1800, '+3', 321, [1, 3, 0, 0, 0]],
    'shambling-mound': ['15', '110', '13к10 + 39', '−1', 9, '5', 1800, '+3', 323, [1, 3, 0, 0, 0]],
    'shield-guardian': ['17', '142', '15к10 + 60', '−1', 9, '7', 2900, '+3', 323, [3, 2, 0, 1, 0]],
    'stone-golem': ['18', '220', '21к10 + 105', '+3', 13, '10', 5900, '+4', 330, [2, 3, 1, 0, 0]],
    treant: ['16', '138', '12к12 + 60', '+3', 13, '9', 5000, '+4', 333, [1, 4, 0, 0, 0]],
    'water-elemental': ['14', '114', '12к10 + 48', '+2', 12, '5', 1800, '+3', 337, [2, 3, 0, 0, 0]],
    xorn: ['19', '84', '8к8 + 48', '+0', 10, '5', 1800, '+3', 343, [2, 3, 1, 0, 0]],
  };
  for (const [slug, signature] of Object.entries(expected)) {
    const entry = bySlug[slug];
    const groups = [entry.traits?.length ?? 0, entry.actions.length, entry.bonusActions?.length ?? 0, entry.reactions?.length ?? 0, entry.spellcasting?.groups.length ?? 0];
    assert.deepEqual([
      entry.armorClass, entry.hitPoints, entry.hitDice, entry.initiative.modifier, entry.initiative.score,
      entry.challengeRating, entry.experiencePoints, entry.proficiencyBonus, entry.sourcePage, groups,
    ], signature, `${slug}: SRD core/action signature`);
  }
});

test('third-batch complex mechanics remain structured and source-complete', () => {
  assert.deepEqual(bySlug['air-elemental'].actions.find(action => action.nameOriginal === 'Whirlwind').recharge, { kind: 'roll', die: 6, minimum: 4, maximum: 6 });
  assert.equal(bySlug['clay-golem'].actions.find(action => action.nameOriginal === 'Slam').damageInstances.length, 2);
  assert.deepEqual(bySlug['clay-golem'].bonusActions[0].recharge, { kind: 'roll', die: 6, minimum: 5, maximum: 6 });
  assert.match(bySlug['clay-golem'].actions.find(action => action.nameOriginal === 'Slam').sourceText, /Максимум хітів/u);
  assert.deepEqual([
    bySlug.djinni.actions.find(action => action.nameOriginal === 'Storm Blade').reach,
    bySlug.djinni.actions.find(action => action.nameOriginal === 'Storm Bolt').range,
  ], ['5 фт', '120 фт']);
  assert.equal(bySlug.gorgon.actions.find(action => action.nameOriginal === 'Petrifying Breath').savingThrow.repeat.endsEffectOnSuccess, true);
  assert.equal(bySlug['gelatinous-cube'].actions.find(action => action.nameOriginal === 'Engulf').damageInstances[1].application, 'start-of-turn');
  assert.match(bySlug['animated-rug-of-smothering'].actions[0].sourceText, /задихається/u);
  assert.match(bySlug['shield-guardian'].traits.find(trait => trait.nameOriginal === 'Spell Storing').sourceText, /4 рівня або нижче/u);
  assert.equal(bySlug['iron-golem'].actions.find(action => action.nameOriginal === 'Poison Breath').damageInstances[0].formula, '10к10');
  assert.equal(bySlug['water-elemental'].actions.find(action => action.nameOriginal === 'Whelm').savingThrow.dc, 15);
  assert.equal(bySlug.treant.actions.find(action => action.nameOriginal === 'Animate Trees').limitedUse.uses, 1);
  assert.deepEqual(bySlug['black-pudding'].reactions.map(action => action.nameOriginal), ['Split']);
  assert.deepEqual(bySlug['ochre-jelly'].reactions.map(action => action.nameOriginal), ['Split']);
});

test('third-batch spellcasting preserves exact groups and only links available canonical spells', () => {
  assert.deepEqual(bySlug.djinni.spellcasting.groups.map(group => [group.mode, group.uses ?? null, group.each ?? false, group.spells.length]), [
    ['at-will', null, false, 2], ['daily', 2, true, 3], ['daily', 1, true, 5],
  ]);
  assert.deepEqual(bySlug.efreeti.spellcasting.groups.map(group => [group.mode, group.uses ?? null, group.each ?? false, group.spells.length]), [
    ['at-will', null, false, 2], ['daily', 1, true, 6],
  ]);
  const unlinked = [bySlug.djinni, bySlug.efreeti].flatMap(entry => entry.spellcasting.groups.flatMap(group => group.spells.filter(spell => !spell.slug).map(spell => [entry.slug, spell.nameUk])));
  assert.deepEqual(unlinked, [['djinni', 'Виявлення зла й добра'], ['efreeti', 'Стіна вогню']]);
  assert.equal(bySlug.efreeti.spellcasting.groups[1].spells.find(spell => spell.nameUk === 'Стіна вогню').castAtLevel, 7);
  assert.ok([bySlug.djinni, bySlug.efreeti].flatMap(entry => entry.relationships.spellSlugs).every(slug => spellSlugs.has(slug)));
});

test('all 23 canonical Giants and Celestials are complete in the fourth batch', () => {
  const manifestEntries = bestiaryManifest.monsters.filter(entry => ['Giant', 'Celestial'].includes(entry.creatureType));
  const runtimeEntries = entries.filter(entry => ['Велетень', 'Небожитель'].includes(entry.creatureType));
  assert.equal(manifestEntries.length, 23);
  assert.deepEqual(
    Object.fromEntries(['Giant', 'Celestial'].map(type => [type, manifestEntries.filter(entry => entry.creatureType === type).length])),
    { Giant: 10, Celestial: 13 },
  );
  assert.ok(manifestEntries.every(entry => entry.coverageStatus === 'Complete'));
  assert.deepEqual(new Set(runtimeEntries.map(entry => entry.slug)), new Set(manifestEntries.map(entry => entry.slug)));
});

test('every fourth-batch creature matches its SRD 5.2.1 core and action-group signature', () => {
  const expected = {
    'cloud-giant': ['14', '200', '16к12 + 96', '+4', 14, '9', 5000, '+4', 275, [0, 3, 1, 0, 0, 3]],
    ettin: ['12', '85', '10к10 + 30', '−1', 9, '4', 1100, '+2', 284, [0, 3, 0, 0, 0, 0]],
    'fire-giant': ['18', '162', '13к12 + 78', '+3', 13, '9', 5000, '+4', 285, [0, 3, 0, 0, 0, 0]],
    'frost-giant': ['15', '149', '13к12 + 65', '+2', 12, '8', 3900, '+3', 285, [0, 3, 1, 0, 0, 0]],
    'hill-giant': ['13', '105', '10к12 + 40', '+2', 12, '5', 1800, '+3', 298, [0, 3, 0, 0, 0, 0]],
    ogre: ['11', '68', '8к10 + 24', '−1', 9, '2', 450, '+2', 312, [0, 2, 0, 0, 0, 0]],
    'stone-giant': ['17', '126', '11к12 + 55', '+5', 15, '7', 2900, '+3', 330, [0, 3, 0, 1, 0, 0]],
    'storm-giant': ['16', '230', '20к12 + 100', '+7', 17, '13', 10000, '+5', 330, [1, 4, 0, 0, 0, 2]],
    troll: ['15', '94', '9к10 + 45', '+1', 11, '5', 1800, '+3', 333, [2, 2, 1, 0, 0, 0]],
    'troll-limb': ['13', '14', '4к6', '+1', 11, '1/2', 100, '+2', 333, [2, 1, 0, 0, 0, 0]],
    couatl: ['19', '60', '8к8 + 24', '+5', 15, '4', 1100, '+2', 277, [1, 2, 1, 0, 0, 3]],
    deva: ['17', '229', '27к8 + 108', '+4', 14, '10', 5900, '+4', 279, [2, 2, 1, 0, 0, 3]],
    'guardian-naga': ['18', '136', '16к10 + 48', '+4', 14, '10', 5900, '+4', 296, [1, 3, 0, 0, 0, 2]],
    pegasus: ['12', '59', '7к10 + 21', '+2', 12, '2', 450, '+2', 313, [0, 1, 0, 0, 0, 0]],
    planetar: ['19', '262', '21к10 + 147', '+10', 20, '16', 15000, '+5', 315, [3, 3, 1, 0, 0, 3]],
    solar: ['21', '297', '22к10 + 176', '+20', 30, '21', 33000, '+7', 326, [4, 3, 1, 0, 2, 3]],
    'sphinx-of-wonder': ['13', '24', '7к4 + 7', '+3', 13, '1', 200, '+2', 327, [1, 1, 0, 1, 0, 0]],
    'sphinx-of-lore': ['17', '170', '20к10 + 60', '+10', 20, '11', 7200, '+4', 327, [2, 3, 0, 0, 2, 2]],
    'sphinx-of-valor': ['17', '199', '19к10 + 95', '+12', 22, '17', 18000, '+6', 328, [2, 3, 0, 0, 2, 2]],
    unicorn: ['12', '97', '13к10 + 26', '+8', 18, '5', 1800, '+3', 334, [2, 3, 1, 0, 2, 3]],
    'giant-eagle': ['13', '26', '4к10 + 4', '+3', 13, '1', 200, '+2', 350, [0, 2, 0, 0, 0, 0]],
    'giant-elk': ['14', '42', '5к12 + 10', '+6', 16, '2', 450, '+2', 351, [0, 1, 0, 0, 0, 0]],
    'giant-owl': ['12', '19', '3к10 + 3', '+2', 12, '1/4', 50, '+2', 352, [1, 1, 0, 0, 0, 2]],
  };
  for (const [slug, signature] of Object.entries(expected)) {
    const entry = bySlug[slug];
    const groups = [entry.traits?.length ?? 0, entry.actions.length, entry.bonusActions?.length ?? 0, entry.reactions?.length ?? 0, entry.legendaryActions?.length ?? 0, entry.spellcasting?.groups.length ?? 0];
    assert.deepEqual([
      entry.armorClass, entry.hitPoints, entry.hitDice, entry.initiative.modifier, entry.initiative.score,
      entry.challengeRating, entry.experiencePoints, entry.proficiencyBonus, entry.sourcePage, groups,
    ], signature, `${slug}: SRD core/action signature`);
  }
});

test('fourth-batch complex saves, damage, recharge and legendary mechanics remain exact', () => {
  assert.equal(bySlug['cloud-giant'].actions.find(action => action.nameOriginal === 'Thunderous Mace').damageInstances.length, 2);
  assert.deepEqual(bySlug['stone-giant'].reactions[0].recharge, { kind: 'roll', die: 6, minimum: 5, maximum: 6 });
  assert.deepEqual(bySlug['storm-giant'].actions.find(action => action.nameOriginal === 'Lightning Storm').savingThrow, {
    ability: 'dexterity', dc: 18, onFailure: 'Ціль отримує повну шкоду.', onSuccess: 'Ціль отримує половину шкоди.',
  });
  assert.equal(bySlug.solar.actions.find(action => action.nameOriginal === 'Slaying Bow').savingThrow.dc, 21);
  assert.match(bySlug.solar.actions.find(action => action.nameOriginal === 'Slaying Bow').savingThrow.onFailure, /100 хітів/u);
  assert.ok(bySlug.solar.legendaryActions.every(action => action.legendaryActionCost === 1));
  assert.deepEqual(bySlug['sphinx-of-lore'].alternativeExperience, [{ experiencePoints: 8400, condition: 'у лігві' }]);
  assert.deepEqual(bySlug['sphinx-of-valor'].alternativeExperience, [{ experiencePoints: 20000, condition: 'у лігві' }]);
  const roar = bySlug['sphinx-of-valor'].actions.find(action => action.nameOriginal === 'Roar');
  assert.deepEqual(roar.mechanicSteps.map(step => step.order), [1, 2, 3]);
  assert.equal(roar.mechanicSteps[1].savingThrow.repeat.endsEffectOnSuccess, true);
  assert.equal(roar.mechanicSteps[2].damageInstances[0].formula, '8к10');
  assert.deepEqual(bySlug.ogre.gear, [
    { nameUk: 'Велика дубина', itemSlug: 'greatclub' },
    { nameUk: 'Дротик', quantity: 3, itemSlug: 'javelin' },
  ]);
});

test('fourth-batch spellcasting links exact catalog spells and preserves known unresolved names', () => {
  const casters = entries.filter(entry => ['Велетень', 'Небожитель'].includes(entry.creatureType) && entry.spellcasting);
  for (const entry of casters) {
    const linked = entry.spellcasting.groups.flatMap(group => group.spells.map(value => value.slug).filter(Boolean));
    assert.ok(linked.every(slug => spellSlugs.has(slug)), `${entry.slug}: invalid spell slug`);
    assert.deepEqual(new Set(linked), new Set(entry.relationships.spellSlugs));
  }
  const unresolved = casters.flatMap(entry => entry.spellcasting.groups.flatMap(group => group.spells
    .filter(value => !value.slug).map(value => [entry.slug, value.nameUk])));
  assert.deepEqual(unresolved, [
    ['couatl', 'Виявлення зла й добра'], ['deva', 'Виявлення зла й добра'], ['planetar', 'Виявлення зла й добра'],
    ['solar', 'Виявлення зла й добра'], ['sphinx-of-valor', 'Виявлення зла й добра'],
    ['unicorn', 'Виявлення зла й добра'], ['giant-owl', 'Виявлення зла й добра'],
  ]);
});

test('all 22 missing Fey and Aberrations are complete in the fifth batch', () => {
  const manifestEntries = bestiaryManifest.monsters.filter(entry => ['Fey', 'Aberration'].includes(entry.creatureType));
  const manifestSlugs = new Set(manifestEntries.map(entry => entry.slug));
  const runtimeEntries = entries.filter(entry => manifestSlugs.has(entry.slug));
  assert.equal(manifestEntries.length, 24);
  assert.equal(runtimeEntries.length, 24);
  assert.deepEqual(
    Object.fromEntries(['Fey', 'Aberration'].map(type => [type, manifestEntries.filter(entry => entry.creatureType === type).length])),
    { Fey: 15, Aberration: 9 },
  );
  assert.ok(manifestEntries.every(entry => entry.coverageStatus === 'Complete'));
  assert.deepEqual(new Set(runtimeEntries.map(entry => entry.slug)), new Set(manifestEntries.map(entry => entry.slug)));
  assert.equal(runtimeEntries.filter(entry => !['goblin-boss', 'aboleth'].includes(entry.slug)).length, 22);
});

test('every fifth-batch creature matches its SRD 5.2.1 core and action-group signature', () => {
  const expected = {
    'blink-dog': ['13', '22', '4к8 + 4', '+3', 13, '1/4', 50, '+2', 266, [0, 1, 1, 0, 0]],
    'bugbear-stalker': ['15', '65', '10к8 + 20', '+2', 12, '3', 700, '+2', 271, [1, 3, 1, 0, 0]],
    'bugbear-warrior': ['14', '33', '6к8 + 6', '+2', 12, '1', 200, '+2', 272, [1, 2, 0, 0, 0]],
    'centaur-trooper': ['16', '45', '6к10 + 12', '+2', 12, '2', 450, '+2', 272, [0, 3, 1, 0, 0]],
    chuul: ['16', '76', '9к10 + 27', '+0', 10, '4', 1100, '+2', 273, [2, 3, 0, 0, 0]],
    cloaker: ['14', '91', '14к10 + 14', '+5', 15, '8', 3900, '+3', 274, [1, 3, 2, 0, 1]],
    darkmantle: ['11', '22', '5к6 + 5', '+3', 13, '1/2', 100, '+2', 278, [0, 2, 0, 0, 0]],
    dryad: ['16', '22', '5к8', '+1', 11, '1', 200, '+2', 282, [2, 3, 1, 0, 2]],
    'gibbering-mouther': ['9', '52', '7к8 + 21', '−1', 9, '2', 450, '+2', 288, [2, 2, 0, 0, 0]],
    'goblin-minion': ['12', '7', '2к6', '+2', 12, '1/8', 25, '+2', 290, [0, 1, 1, 0, 0]],
    'goblin-warrior': ['15', '10', '3к6', '+2', 12, '1/4', 50, '+2', 290, [0, 2, 1, 0, 0]],
    'green-hag': ['17', '82', '11к8 + 33', '+1', 11, '3', 700, '+2', 295, [3, 2, 0, 0, 2]],
    grick: ['14', '54', '12к8', '+2', 12, '2', 450, '+2', 295, [0, 3, 0, 0, 0]],
    grimlock: ['11', '11', '2к8 + 2', '+1', 11, '1/4', 50, '+2', 296, [0, 1, 0, 0, 0]],
    'hobgoblin-warrior': ['18', '11', '2к8 + 2', '+3', 13, '1/2', 100, '+2', 298, [1, 2, 0, 0, 0]],
    'hobgoblin-captain': ['17', '58', '9к8 + 18', '+4', 14, '3', 700, '+2', 299, [1, 3, 0, 0, 0]],
    otyugh: ['14', '104', '11к10 + 44', '+0', 10, '5', 1800, '+3', 313, [0, 4, 0, 0, 0]],
    roper: ['20', '93', '11к10 + 33', '+5', 15, '5', 1800, '+3', 320, [1, 4, 0, 0, 0]],
    satyr: ['13', '31', '7к8', '+3', 13, '1/2', 100, '+2', 321, [1, 2, 0, 0, 0]],
    'sea-hag': ['14', '52', '7к8 + 21', '+1', 11, '2', 450, '+2', 322, [3, 3, 0, 0, 2]],
    sprite: ['15', '10', '4к4', '+4', 14, '1/4', 50, '+2', 329, [0, 4, 0, 0, 1]],
    worg: ['13', '26', '4к10 + 4', '+1', 11, '1/2', 100, '+2', 342, [0, 1, 0, 0, 0]],
  };
  for (const [slug, signature] of Object.entries(expected)) {
    const entry = bySlug[slug];
    const groups = [entry.traits?.length ?? 0, entry.actions.length, entry.bonusActions?.length ?? 0, entry.reactions?.length ?? 0, entry.spellcasting?.groups.length ?? 0];
    assert.deepEqual([
      entry.armorClass, entry.hitPoints, entry.hitDice, entry.initiative.modifier, entry.initiative.score,
      entry.challengeRating, entry.experiencePoints, entry.proficiencyBonus, entry.sourcePage, groups,
    ], signature, `${slug}: SRD core/action signature`);
  }
});

test('fifth-batch complex conditions, repeated saves and ordered effects remain exact', () => {
  assert.equal(bySlug.chuul.actions.find(action => action.nameOriginal === 'Paralyzing Tentacles').savingThrow.repeat.endsEffectOnSuccess, true);
  assert.deepEqual(bySlug.chuul.relationships.spellSlugs, ['detect-magic']);
  assert.match(bySlug.chuul.actions.find(action => action.nameOriginal === 'Paralyzing Tentacles').sourceText, /1 хвилину/u);
  assert.match(bySlug.cloaker.actions.find(action => action.nameOriginal === 'Attach').sourceText, /половину/u);
  assert.equal(bySlug.cloaker.bonusActions.find(action => action.nameOriginal === 'Moan').savingThrow.onSuccess.includes('24 годин'), true);
  assert.deepEqual(bySlug['gibbering-mouther'].traits.find(value => value.nameOriginal === 'Gibbering').mechanicSteps.map(step => step.label), ['1–4', '5–6', '7–8']);
  assert.equal(bySlug['gibbering-mouther'].actions.find(action => action.nameOriginal === 'Blinding Spittle').savingThrow.dc, 10);
  assert.equal(bySlug.otyugh.actions.find(action => action.nameOriginal === 'Bite').savingThrow.repeat.timing, 'щоразу після завершення Тривалого відпочинку');
  assert.equal(bySlug.otyugh.actions.find(action => action.nameOriginal === 'Tentacle Slam').damageInstances[1].application, 'successful-save');
  assert.match(bySlug.roper.actions.find(action => action.nameOriginal === 'Tentacle').sourceText, /КЗ 20, 10 хітів/u);
  assert.equal(bySlug.grimlock.actions[0].damageInstances.length, 2);
  assert.deepEqual(bySlug['sea-hag'].actions.find(action => action.nameOriginal === 'Death Glare').recharge, { kind: 'roll', die: 6, minimum: 5, maximum: 6 });
});

test('fifth-batch spellcasting and exact relationships remain complete', () => {
  const casters = ['dryad', 'green-hag', 'sea-hag', 'sprite', 'cloaker'].map(slug => bySlug[slug]);
  for (const entry of casters) {
    const linked = entry.spellcasting.groups.flatMap(group => group.spells.map(value => value.slug).filter(Boolean));
    assert.ok(linked.every(slug => spellSlugs.has(slug)), `${entry.slug}: invalid spell slug`);
    assert.deepEqual(new Set(linked), new Set(entry.relationships.spellSlugs));
  }
  assert.equal(casters.flatMap(entry => entry.spellcasting.groups.flatMap(group => group.spells.filter(value => !value.slug))).length, 0);
  assert.deepEqual(bySlug.dryad.spellcasting.groups.map(group => [group.mode, group.uses ?? null, group.each ?? false]), [['at-will', null, false], ['daily', 1, true]]);
  assert.equal(bySlug['green-hag'].spellcasting.groups[0].spells.find(value => value.slug === 'ray-of-sickness').castAtLevel, 3);
  assert.deepEqual(bySlug.cloaker.bonusActions.find(action => action.nameOriginal === 'Phantasms').recharge, { kind: 'rest', rest: 'short-or-long' });
});

test('all 37 canonical Monstrosities are complete in the sixth batch', () => {
  const manifestEntries = bestiaryManifest.monsters.filter(entry => entry.creatureType === 'Monstrosity');
  const manifestSlugs = new Set(manifestEntries.map(entry => entry.slug));
  const runtimeEntries = entries.filter(entry => manifestSlugs.has(entry.slug));
  assert.equal(manifestEntries.length, 37);
  assert.equal(runtimeEntries.length, 37);
  assert.ok(manifestEntries.every(entry => entry.coverageStatus === 'Complete'));
  assert.deepEqual(new Set(runtimeEntries.map(entry => entry.slug)), manifestSlugs);
});

test('every sixth-batch creature matches its SRD 5.2.1 core and action-group signature', () => {
  const expected = {
    ankheg: ['14', '45', '6к10 + 12', '+0', 10, '2', 450, '+2', 259, [1, 2, 0, 0, 0]],
    'axe-beak': ['11', '19', '3к10 + 3', '+1', 11, '1/4', 50, '+2', 260, [0, 1, 0, 0, 0]],
    basilisk: ['15', '52', '8к8 + 16', '−1', 9, '3', 700, '+2', 262, [0, 1, 1, 0, 0]],
    behir: ['17', '168', '16к12 + 64', '+3', 13, '11', 7200, '+4', 263, [0, 4, 1, 0, 0]],
    bulette: ['17', '94', '9к10 + 45', '+0', 10, '5', 1800, '+3', 272, [0, 3, 1, 0, 0]],
    chimera: ['14', '114', '12к10 + 48', '+0', 10, '6', 2300, '+3', 273, [0, 5, 0, 0, 0]],
    cockatrice: ['11', '22', '5к6 + 5', '+1', 11, '1/2', 100, '+2', 275, [0, 1, 0, 0, 0]],
    'death-dog': ['12', '39', '6к8 + 12', '+2', 12, '1', 200, '+2', 279, [0, 2, 0, 0, 0]],
    doppelganger: ['14', '52', '8к8 + 16', '+4', 14, '3', 700, '+2', 280, [0, 4, 1, 0, 0]],
    drider: ['19', '123', '13к10 + 52', '+4', 14, '6', 2300, '+3', 281, [3, 3, 1, 0, 0]],
    ettercap: ['13', '44', '8к8 + 8', '+2', 12, '2', 450, '+2', 284, [2, 4, 1, 0, 0]],
    griffon: ['12', '59', '7к10 + 21', '+2', 12, '2', 450, '+2', 295, [0, 2, 0, 0, 0]],
    harpy: ['11', '38', '7к8 + 7', '+1', 11, '1', 200, '+2', 297, [0, 2, 0, 0, 0]],
    hippogriff: ['11', '26', '4к10 + 4', '+1', 11, '1', 200, '+2', 298, [1, 2, 0, 0, 0]],
    hydra: ['15', '184', '16к12 + 80', '+4', 14, '8', 3900, '+3', 300, [3, 2, 0, 0, 0]],
    kraken: ['18', '481', '26к20 + 208', '+14', 24, '23', 50000, '+7', 303, [3, 5, 0, 0, 2]],
    manticore: ['14', '68', '8к10 + 24', '+3', 13, '3', 700, '+2', 306, [0, 3, 0, 0, 0]],
    medusa: ['15', '127', '17к8 + 51', '+6', 16, '6', 2300, '+3', 306, [0, 4, 1, 0, 0]],
    merrow: ['13', '45', '6к10 + 12', '+2', 12, '2', 450, '+2', 308, [1, 4, 0, 0, 0]],
    mimic: ['12', '58', '9к8 + 18', '+3', 13, '2', 450, '+2', 308, [1, 2, 1, 0, 0]],
    'minotaur-of-baphomet': ['14', '85', '10к10 + 30', '+0', 10, '3', 700, '+2', 309, [0, 2, 0, 0, 0]],
    owlbear: ['13', '59', '7к10 + 21', '+1', 11, '3', 700, '+2', 313, [0, 2, 0, 0, 0]],
    'phase-spider': ['14', '45', '7к10 + 7', '+3', 13, '3', 700, '+2', 313, [3, 2, 1, 0, 0]],
    'purple-worm': ['18', '247', '15к20 + 90', '+3', 13, '15', 13000, '+5', 316, [1, 3, 1, 0, 0]],
    remorhaz: ['17', '195', '17к12 + 85', '+5', 15, '11', 7200, '+4', 319, [1, 1, 1, 0, 0]],
    roc: ['15', '248', '16к20 + 80', '+8', 18, '11', 7200, '+4', 320, [0, 3, 1, 0, 0]],
    'rust-monster': ['14', '33', '6к8 + 6', '+1', 11, '1/2', 100, '+2', 320, [1, 4, 0, 1, 0]],
    stirge: ['13', '5', '2к4', '+3', 13, '1/8', 25, '+2', 329, [0, 1, 0, 0, 0]],
    tarrasque: ['25', '697', '34к20 + 340', '+18', 28, '30', 155000, '+9', 331, [4, 5, 1, 0, 2]],
    werebear: ['15', '135', '18к8 + 54', '+3', 13, '5', 1800, '+3', 337, [0, 4, 1, 0, 0]],
    wereboar: ['15', '97', '15к8 + 30', '+2', 12, '4', 1100, '+2', 338, [0, 4, 1, 0, 0]],
    wererat: ['13', '60', '11к8 + 11', '+3', 13, '2', 450, '+2', 338, [0, 4, 1, 0, 0]],
    weretiger: ['12', '120', '16к8 + 48', '+2', 12, '4', 1100, '+2', 339, [0, 4, 2, 0, 0]],
    werewolf: ['15', '71', '11к8 + 22', '+4', 14, '3', 700, '+2', 339, [1, 4, 1, 0, 0]],
    'winter-wolf': ['13', '75', '10к10 + 20', '+1', 11, '3', 700, '+2', 342, [1, 2, 0, 0, 0]],
    'flying-snake': ['14', '5', '2к4', '+2', 12, '1/8', 25, '+2', 348, [1, 1, 0, 0, 0]],
    'giant-vulture': ['10', '25', '3к10 + 9', '+0', 10, '1', 200, '+2', 354, [1, 1, 0, 0, 0]],
  };
  for (const [slug, signature] of Object.entries(expected)) {
    const entry = bySlug[slug];
    const groups = [entry.traits?.length ?? 0, entry.actions.length, entry.bonusActions?.length ?? 0, entry.reactions?.length ?? 0, entry.legendaryActions?.length ?? 0];
    assert.deepEqual([
      entry.armorClass, entry.hitPoints, entry.hitDice, entry.initiative.modifier, entry.initiative.score,
      entry.challengeRating, entry.experiencePoints, entry.proficiencyBonus, entry.sourcePage, groups,
    ], signature, `${slug}: SRD core/action signature`);
  }
});

test('sixth-batch complex mechanics preserve saves, recharge, ordered steps and multiple damage', () => {
  assert.equal(bySlug.ankheg.actions.find(value => value.nameOriginal === 'Bite').damageInstances.length, 2);
  assert.equal(bySlug.basilisk.bonusActions[0].savingThrow.repeat.endsEffectOnSuccess, true);
  assert.equal(bySlug.cockatrice.actions[0].savingThrow.onFailure.includes('24 години'), true);
  assert.equal(bySlug.behir.bonusActions[0].mechanicSteps.length, 4);
  assert.equal(bySlug.behir.actions.find(value => value.nameOriginal === 'Lightning Breath').damageInstances[0].average, 66);
  assert.equal(bySlug['death-dog'].actions.find(value => value.nameOriginal === 'Bite').savingThrow.repeat.timing, 'кожні 24 години');
  assert.deepEqual(bySlug.ettercap.actions.find(value => value.nameOriginal === 'Web Strand').recharge, { kind: 'roll', die: 6, minimum: 5, maximum: 6 });
  assert.match(bySlug.harpy.actions.find(value => value.nameOriginal === 'Luring Song').sourceText, /Концентрацію/u);
  assert.match(bySlug.hydra.traits.find(value => value.nameOriginal === 'Multiple Heads').sourceText, /20 хітів/u);
  assert.deepEqual(bySlug.kraken.alternativeExperience, [{ experiencePoints: 62000, condition: 'у лігві' }]);
  assert.equal(bySlug.kraken.legendaryActionUses, '3 (4 у лігві)');
  assert.equal(bySlug.mimic.actions.find(value => value.nameOriginal === 'Bite').damageInstances.length, 2);
  assert.equal(bySlug['minotaur-of-baphomet'].actions.find(value => value.nameOriginal === 'Gore').damageInstances.length, 2);
  assert.equal(bySlug['phase-spider'].relationships.conditionSlugs.includes('paralyzed'), true);
  assert.equal(bySlug.remorhaz.bonusActions[0].damageInstances.length, 2);
  assert.equal(bySlug['rust-monster'].actions.find(value => value.nameOriginal === 'Antennae').savingThrow.dc, 11);
  assert.match(bySlug['rust-monster'].reactions[0].sourceText, /Тригер/u);
  assert.equal(bySlug.stirge.actions[0].damageInstances[1].application, 'start-of-turn');
  assert.equal(bySlug.tarrasque.traits.find(value => value.nameOriginal === 'Legendary Resistance').limitedUse.uses, 6);
  assert.match(bySlug.tarrasque.traits.find(value => value.nameOriginal === 'Magic Resistance').sourceText, /Перевагу/u);
  assert.equal(bySlug.tarrasque.legendaryActions.length, 2);
  assert.ok([...bySlug.kraken.legendaryActions, ...bySlug.tarrasque.legendaryActions].every(value => value.legendaryActionCost === 1));
  assert.equal(bySlug.werebear.actions.find(value => value.nameOriginal === 'Bite').savingThrow.dc, 14);
  assert.match(bySlug.werebear.actions.find(value => value.nameOriginal === 'Handaxe').sourceText, /гуманоїдній або гібридній формі/u);
  assert.equal(bySlug['winter-wolf'].actions.find(value => value.nameOriginal === 'Cold Breath').savingThrow.onSuccess, 'Половина шкоди.');
});

test('sixth-batch exact spell, condition and equipment relationships resolve', () => {
  assert.deepEqual(bySlug.doppelganger.relationships.spellSlugs, ['detect-thoughts']);
  assert.deepEqual(bySlug.drider.relationships.spellSlugs, ['darkness', 'faerie-fire', 'web']);
  assert.deepEqual(bySlug['rust-monster'].relationships.spellSlugs, ['mending']);
  assert.deepEqual(bySlug.tarrasque.relationships.spellSlugs, ['magic-missile']);
  assert.deepEqual(bySlug.werebear.relationships.itemSlugs, ['handaxe']);
  assert.deepEqual(bySlug.wereboar.relationships.itemSlugs, ['javelin']);
  assert.deepEqual(bySlug.wererat.relationships.itemSlugs, ['hand-crossbow']);
  assert.deepEqual(bySlug.weretiger.relationships.itemSlugs, ['longbow']);
  assert.deepEqual(bySlug.werewolf.relationships.itemSlugs, ['longbow']);
});

test('five initial creatures match exact SRD 5.2.1 core statistics', () => {
  const expected = {
    bandit: ['12', '11', '2к8 + 2', ['30 фт'], '+1', 11, '1/8', 25, '+2', 261],
    'goblin-boss': ['17', '21', '6к6', ['30 фт'], '+2', 12, '1', 200, '+2', 290],
    wolf: ['12', '11', '2к8 + 2', ['40 фт'], '+2', 12, '1/4', 50, '+2', 364],
    mage: ['15', '81', '18к8', ['30 фт'], '+2', 12, '6', 2300, '+3', 305],
    aboleth: ['17', '150', '20к10 + 40', ['10 фт', 'плавання 40 фт'], '+7', 17, '10', 5900, '+4', 258],
  };
  for (const [slug, values] of Object.entries(expected)) {
    const entry = bySlug[slug];
    assert.deepEqual([
      entry.armorClass, entry.hitPoints, entry.hitDice, entry.speed, entry.initiative.modifier, entry.initiative.score,
      entry.challengeRating, entry.experiencePoints, entry.proficiencyBonus, entry.sourcePage,
    ], values, `${slug}: core statistics`);
  }
  assert.deepEqual(bySlug.aboleth.alternativeExperience, [{ experiencePoints: 7200, condition: 'у лігві' }]);
});

test('all six ability scores, modifiers and saves match the five SRD stat blocks', () => {
  const compact = entry => abilityKeys.map(key => {
    const value = entry.abilities[key];
    return `${value.score}/${value.modifier}/${value.save}`;
  }).join('|');
  assert.equal(compact(bySlug.bandit), '11/+0/+0|12/+1/+1|12/+1/+1|10/+0/+0|10/+0/+0|10/+0/+0');
  assert.equal(compact(bySlug['goblin-boss']), '10/+0/+0|15/+2/+2|10/+0/+0|10/+0/+0|8/−1/−1|10/+0/+0');
  assert.equal(compact(bySlug.wolf), '14/+2/+2|15/+2/+2|12/+1/+1|3/−4/−4|12/+1/+1|6/−2/−2');
  assert.equal(compact(bySlug.mage), '9/−1/−1|14/+2/+2|11/+0/+0|17/+3/+6|12/+1/+4|11/+0/+0');
  assert.equal(compact(bySlug.aboleth), '21/+5/+5|9/−1/+3|15/+2/+6|18/+4/+8|15/+2/+6|18/+4/+4');
});

test('gear and exact item identities are complete without inventing a generic wand link', () => {
  assert.deepEqual(bySlug.bandit.gear.map(entry => entry.itemSlug), ['leather-armor', 'light-crossbow', 'scimitar']);
  assert.deepEqual(bySlug['goblin-boss'].gear.map(entry => entry.itemSlug), ['chain-shirt', 'scimitar', 'shield', 'shortbow']);
  assert.deepEqual(bySlug.mage.gear, [{ nameUk: 'Паличка' }]);
  assert.ok([...bySlug.bandit.gear, ...bySlug['goblin-boss'].gear].every(entry => itemSlugs.has(entry.itemSlug)));
  assert.equal(itemSlugs.has('wand'), false);
  assert.ok(!bySlug.wolf.gear && !bySlug.aboleth.gear);
});

test('traits and action groups are complete for the initial batch', () => {
  assert.deepEqual({
    bandit: [bySlug.bandit.traits?.length ?? 0, bySlug.bandit.actions.length, bySlug.bandit.bonusActions?.length ?? 0, bySlug.bandit.reactions?.length ?? 0, bySlug.bandit.legendaryActions?.length ?? 0],
    goblinBoss: [bySlug['goblin-boss'].traits?.length ?? 0, bySlug['goblin-boss'].actions.length, bySlug['goblin-boss'].bonusActions.length, bySlug['goblin-boss'].reactions.length, bySlug['goblin-boss'].legendaryActions?.length ?? 0],
    wolf: [bySlug.wolf.traits.length, bySlug.wolf.actions.length, bySlug.wolf.bonusActions?.length ?? 0, bySlug.wolf.reactions?.length ?? 0, bySlug.wolf.legendaryActions?.length ?? 0],
    mage: [bySlug.mage.traits?.length ?? 0, bySlug.mage.actions.length, bySlug.mage.bonusActions.length, bySlug.mage.reactions.length, bySlug.mage.legendaryActions?.length ?? 0],
    aboleth: [bySlug.aboleth.traits.length, bySlug.aboleth.actions.length, bySlug.aboleth.bonusActions?.length ?? 0, bySlug.aboleth.reactions?.length ?? 0, bySlug.aboleth.legendaryActions.length],
  }, {
    bandit: [0, 2, 0, 0, 0], goblinBoss: [0, 3, 1, 1, 0], wolf: [1, 1, 0, 0, 0],
    mage: [0, 2, 1, 1, 0], aboleth: [5, 4, 0, 0, 2],
  });
  assert.deepEqual(bySlug['goblin-boss'].actions.map(action => action.nameUk), ['Мультиатака', 'Ятаган', 'Короткий лук']);
  assert.deepEqual(bySlug.aboleth.actions.map(action => action.nameUk), ['Мультиатака', 'Щупальце', 'Поглинання спогадів', 'Панування над розумом']);
});

test('all structured damage formulas are valid and preserve multiple damage instances', () => {
  const damageActions = entries.flatMap(entry => [entry.traits ?? [], entry.actions, entry.bonusActions ?? [], entry.reactions ?? [], entry.legendaryActions ?? []].flat())
    .filter(block => block.damageInstances?.length);
  for (const block of damageActions) {
    assert.ok(block.damageInstances.every(damage => !damage.formula || parseDiceFormula(damage.formula)), `${block.id}: invalid damage formula`);
  }
  assert.equal(bySlug['goblin-boss'].actions.find(action => action.id === 'goblin-boss-scimitar').damageInstances.length, 2);
  assert.equal(bySlug['goblin-boss'].actions.find(action => action.id === 'goblin-boss-shortbow').damageInstances.length, 2);
  assert.equal(bySlug.aboleth.traits.find(trait => trait.id === 'aboleth-mucus-cloud').damageInstances[0].formula, '1к12');
});

test('Mage spellcasting preserves exact groups, qualifiers and limited uses', () => {
  const mage = bySlug.mage;
  assert.equal(mage.spellcasting.ability, 'Інтелект');
  assert.equal(mage.spellcasting.saveDc, '14');
  assert.deepEqual(mage.spellcasting.groups.map(formatMonsterSpellcastingGroupLabel), ['Без обмежень', '2/день кожне', '1/день кожне', 'Бонусна дія · 3/день', 'Реакція · 3/день']);
  assert.equal(mage.spellcasting.groups[0].spells.find(spell => spell.slug === 'mage-armor').qualifier, 'враховано в КЗ');
  assert.equal(mage.spellcasting.groups[1].spells.find(spell => spell.slug === 'fireball').castAtLevel, 4);
  assert.deepEqual(mage.bonusActions[0].limitedUse, { uses: 3, period: 'day' });
  assert.deepEqual(mage.reactions[0].limitedUse, { uses: 3, period: 'day' });
  assert.equal(new Set(mage.spellcasting.groups.flatMap(group => group.spells.map(spell => spell.slug))).size, 12);
});

test('Aboleth saves, limits and legendary actions preserve exact mechanics', () => {
  const aboleth = bySlug.aboleth;
  const mucus = aboleth.traits.find(trait => trait.id === 'aboleth-mucus-cloud');
  const resistance = aboleth.traits.find(trait => trait.id === 'aboleth-legendary-resistance');
  const consume = aboleth.actions.find(action => action.id === 'aboleth-consume-memories');
  const dominate = aboleth.actions.find(action => action.id === 'aboleth-dominate-mind');
  assert.deepEqual(mucus.savingThrow, { ability: 'constitution', dc: 14, onFailure: 'Ціль проклята до завершення прокляття.' });
  assert.deepEqual(mucus.mechanicSteps.map(step => step.order), [1, 2, 3]);
  assert.deepEqual(resistance.limitedUse, { uses: 3, period: 'day', qualifier: '4/день у лігві' });
  assert.deepEqual(consume.savingThrow, { ability: 'intelligence', dc: 16, onFailure: 'Ціль отримує повну шкоду.', onSuccess: 'Ціль отримує половину шкоди.' });
  assert.equal(dominate.limitedUse.uses, 2);
  assert.deepEqual([dominate.savingThrow.ability, dominate.savingThrow.dc, dominate.savingThrow.repeat.endsEffectOnSuccess], ['wisdom', 16, true]);
  assert.ok(aboleth.legendaryActionUses.includes('Одразу після ходу іншої істоти'));
  assert.ok(aboleth.legendaryActionUses.includes('початку кожного ходу'));
  assert.ok(aboleth.legendaryActions.every(action => action.legendaryActionCost === 1));
});

test('Recharge and limited-use mechanics are preserved only where stated by the source', () => {
  const blocks = entries.flatMap(entry => [entry.traits ?? [], entry.actions, entry.bonusActions ?? [], entry.reactions ?? [], entry.legendaryActions ?? []].flat());
  assert.deepEqual(blocks.filter(block => block.recharge).map(block => [block.id, block.recharge]), [
    ['ape-rock', { kind: 'roll', die: 6, minimum: 6 }],
    ['giant-ape-boulder-toss', { kind: 'roll', die: 6, minimum: 6 }],
    ['giant-spider-web', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['swarm-of-ravens-cacophony', { kind: 'roll', die: 6, minimum: 6 }],
    ['air-elemental-whirlwind', { kind: 'roll', die: 6, minimum: 4, maximum: 6 }],
    ['clay-golem-hasten', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['gorgon-petrifying-breath', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['iron-golem-poison-breath', { kind: 'roll', die: 6, minimum: 6 }],
    ['dust-mephit-blinding-breath', { kind: 'roll', die: 6, minimum: 6 }],
    ['ice-mephit-frost-breath', { kind: 'roll', die: 6, minimum: 6 }],
    ['magma-mephit-fire-breath', { kind: 'roll', die: 6, minimum: 6 }],
    ['steam-mephit-steam-breath', { kind: 'roll', die: 6, minimum: 6 }],
    ['stone-golem-slow', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['water-elemental-whelm', { kind: 'roll', die: 6, minimum: 4, maximum: 6 }],
    ['frost-giant-war-cry', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['stone-giant-deflect-missile', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['storm-giant-lightning-storm', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['sphinx-of-lore-mind-rending-roar', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['blink-dog-teleport', { kind: 'roll', die: 6, minimum: 4, maximum: 6 }],
    ['centaur-trooper-trampling-charge', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['sea-hag-death-glare', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['cloaker-phantasms', { kind: 'rest', rest: 'short-or-long' }],
    ['gibbering-mouther-blinding-spittle', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['ankheg-acid-spray', { kind: 'roll', die: 6, minimum: 6 }],
    ['basilisk-petrifying-gaze', { kind: 'roll', die: 6, minimum: 4, maximum: 6 }],
    ['behir-lightning-breath', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['chimera-fire-breath', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['doppelganger-unsettling-visage', { kind: 'roll', die: 6, minimum: 6 }],
    ['drider-magic-of-the-spider-queen', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['ettercap-web-strand', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['medusa-petrifying-gaze', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['minotaur-of-baphomet-gore', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['roc-swoop', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['tarrasque-thunderous-bellow', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
    ['winter-wolf-cold-breath', { kind: 'roll', die: 6, minimum: 5, maximum: 6 }],
  ]);
  assert.deepEqual(blocks.filter(block => block.limitedUse).map(block => block.id), [
    'mage-misty-step', 'mage-protective-magic', 'aboleth-legendary-resistance', 'aboleth-dominate-mind',
    'giant-hyena-rampage', 'giant-octopus-ink-cloud', 'octopus-ink-cloud', 'cultist-fanatic-spiritual-weapon',
    'archmage-misty-step', 'archmage-protective-magic', 'priest-acolyte-divine-aid', 'priest-divine-aid',
    'dust-mephit-sleep', 'ice-mephit-fog-cloud', 'treant-animate-trees',
    'troll-loathsome-limbs', 'couatl-divine-aid', 'deva-divine-aid', 'planetar-divine-aid',
    'solar-legendary-resistance', 'solar-divine-aid', 'sphinx-of-wonder-burst-of-ingenuity',
    'sphinx-of-lore-legendary-resistance', 'sphinx-of-valor-legendary-resistance', 'sphinx-of-valor-roar',
    'unicorn-legendary-resistance', 'unicorn-unicorns-blessing',
    'green-hag-coven-magic', 'sea-hag-coven-magic', 'darkmantle-darkness-aura',
    'kraken-legendary-resistance', 'tarrasque-legendary-resistance',
  ]);
  assert.equal(formatMonsterRecharge(fixtures.rechargeableAction.recharge), 'Відновлення: 5–6');
});

test('complex Beast mechanics preserve saves, damage, conditions and action placement', () => {
  const giantApeBoulder = bySlug['giant-ape'].actions.find(action => action.id === 'giant-ape-boulder-toss');
  assert.deepEqual(giantApeBoulder.recharge, { kind: 'roll', die: 6, minimum: 6 });
  assert.deepEqual(giantApeBoulder.savingThrow, {
    ability: 'dexterity', dc: 17, onFailure: 'Ціль отримує повну шкоду та стан Збитий з ніг.', onSuccess: 'Ціль отримує половину шкоди.',
  });
  assert.equal(giantApeBoulder.damageInstances[0].formula, '7к6');

  const web = bySlug['giant-spider'].actions.find(action => action.id === 'giant-spider-web');
  assert.deepEqual(web.recharge, { kind: 'roll', die: 6, minimum: 5, maximum: 6 });
  assert.deepEqual([web.savingThrow.ability, web.savingThrow.dc], ['dexterity', 13]);
  assert.match(web.sourceText, /КЗ 10/u);
  assert.match(web.sourceText, /5 хітів/u);

  assert.deepEqual(bySlug['giant-frog'].relationships.conditionSlugs, ['blinded', 'grappled', 'prone', 'restrained']);
  assert.equal(bySlug['giant-frog'].actions.find(action => action.id === 'giant-frog-swallow').damageInstances[0].formula, '2к4');
  assert.equal(bySlug['giant-toad'].actions.find(action => action.id === 'giant-toad-swallow').damageInstances[0].formula, '3к6');

  const tyrannosaurus = bySlug['tyrannosaurus-rex'];
  assert.deepEqual(tyrannosaurus.actions.map(action => action.nameUk), ['Мультиатака', 'Укус', 'Хвіст']);
  const tyrannosaurusBite = tyrannosaurus.actions.find(action => action.id === 'tyrannosaurus-rex-bite');
  assert.match(tyrannosaurusBite.sourceText, /СК 17/u);
  assert.match(tyrannosaurusBite.sourceText, /не може бути ціллю атаки Хвостом/u);
  assert.match(tyrannosaurus.actions.find(action => action.id === 'tyrannosaurus-rex-tail').sourceText, /Величезний або менший/u);

  assert.deepEqual(bySlug['giant-octopus'].reactions[0].limitedUse, { uses: 1, period: 'day' });
  assert.deepEqual(bySlug['swarm-of-ravens'].actions.map(action => action.nameUk), ['Дзьоби', 'Какофонія']);
  assert.deepEqual(bySlug['swarm-of-ravens'].actions[1].recharge, { kind: 'roll', die: 6, minimum: 6 });
});

test('spell, condition, item and rule relationships resolve without dead links', () => {
  for (const entry of entries) {
    const spellLinks = entry.relationships?.spellSlugs ?? [];
    const conditionLinks = entry.relationships?.conditionSlugs ?? [];
    const itemLinks = entry.relationships?.itemSlugs ?? [];
    const ruleLinks = entry.relationships?.ruleSlugs ?? [];
    assert.equal(new Set(spellLinks).size, spellLinks.length);
    assert.equal(new Set(conditionLinks).size, conditionLinks.length);
    assert.equal(new Set(itemLinks).size, itemLinks.length);
    assert.equal(new Set(ruleLinks).size, ruleLinks.length);
    assert.ok(spellLinks.every(slug => spellSlugs.has(slug)), `${entry.slug}: dead spell link`);
    assert.ok(conditionLinks.every(slug => conditionSlugs.has(slug)), `${entry.slug}: dead condition link`);
    assert.ok(itemLinks.every(slug => itemSlugs.has(slug)), `${entry.slug}: dead item link`);
    assert.ok(ruleLinks.every(slug => ruleSlugs.has(slug)), `${entry.slug}: dead rule link`);
    const groupedSpells = entry.spellcasting?.groups.flatMap(group => group.spells.map(spell => spell.slug).filter(Boolean)) ?? [];
    assert.ok(groupedSpells.every(slug => spellSlugs.has(slug)), `${entry.slug}: dead spellcasting link`);
    assert.ok(groupedSpells.every(slug => spellLinks.includes(slug)), `${entry.slug}: spellcasting link missing from relationships`);
  }
});

test('extended model normalizes initiative, gear and multiple damage instances', () => {
  assert.deepEqual(fixtures.simpleBeast.initiative, { modifier: '+2', score: 12 });
  assert.equal(formatMonsterGear(fixtures.equippedHumanoid.gear[0]), 'Довгий меч');
  assert.equal(formatMonsterGear(fixtures.equippedHumanoid.gear[1]), '3 × Дротик');
  assert.ok(itemSlugs.has(fixtures.equippedHumanoid.gear[0].itemSlug));

  const damages = normalizeMonsterDamageInstances(fixtures.complexAttack);
  assert.equal(damages.length, 2);
  assert.deepEqual(damages.map(formatMonsterDamageInstance), [
    '1к10 + 4 рубальна шкоди',
    '2к6 вогняна шкоди (лише в розпеченій формі)',
  ]);

  const legacy = normalizeMonsterDamageInstances({ damage: '5 (1к6 + 2)', damageType: 'колюча' });
  assert.deepEqual(legacy.map(formatMonsterDamageInstance), ['1к6 + 2 колюча шкоди']);
});

test('structured saves, recharge and limited uses produce precise scan facts', () => {
  assert.equal(formatMonsterSavingThrow(fixtures.complexAttack.savingThrow), 'Ряткидок: Спритність, СК 15');
  assert.deepEqual(formatMonsterSavingThrowOutcomes(fixtures.complexAttack.savingThrow), [
    'Провал: Ціль отримує повну додаткову шкоду.',
    'Успіх: Ціль отримує половину додаткової шкоди.',
    'Повторний ряткидок: наприкінці кожного свого ходу; успіх завершує ефект',
  ]);
  assert.equal(formatMonsterRecharge(fixtures.rechargeableAction.recharge), 'Відновлення: 5–6');
  assert.equal(formatMonsterLimitedUse(fixtures.limitedAction.limitedUse), 'Використання: 3/день кожне');
  assert.deepEqual(formatMonsterActionScanFacts(fixtures.legendaryAction), ['Вартість: 2 легендарні дії']);
  assert.equal(formatMonsterRecharge({ kind: 'roll', die: 6, minimum: 7 }), null);
  assert.equal(formatMonsterLimitedUse({ uses: 0, period: 'day' }), null);
});

test('spellcasting qualifiers, legendary costs and alternative XP remain structured', () => {
  const [atWill, daily, slots] = fixtures.spellcaster.groups;
  assert.equal(formatMonsterSpellcastingGroupLabel(atWill), 'Без обмежень');
  assert.equal(formatMonsterSpellcastingGroupLabel(daily), '1/день кожне');
  assert.equal(formatMonsterSpellcastingGroupLabel(slots), '2 комірки 3-го рівня');
  assert.equal(formatMonsterSpellReference(atWill.spells[0]), 'Виявлення магії (Концентрація)');
  assert.equal(formatMonsterSpellReference(daily.spells[0]), 'Куля вогню (5-й рівень)');
  assert.ok(fixtures.spellcaster.groups.flatMap(group => group.spells).every(spell => spellSlugs.has(spell.slug)));
  assert.equal(fixtures.legendaryAction.legendaryActionCost, 2);
  assert.deepEqual(fixtures.alternativeExperience, [{ experiencePoints: 7200, condition: 'у лігві' }]);
});

test('ordered mechanic steps represent sequential dragon and complex attack effects', () => {
  assert.deepEqual(normalizeMonsterMechanicSteps(fixtures.complexAttack).map(step => step.order), [1, 2]);
  assert.deepEqual(normalizeMonsterMechanicSteps(fixtures.dragonSequence).map(step => step.id), ['fixture-area', 'fixture-damage']);
  assert.equal(formatMonsterRecharge(fixtures.dragonSequence.recharge), 'Відновлення: 5–6');
  assert.equal(formatMonsterSavingThrow(fixtures.dragonSequence.savingThrow), 'Ряткидок: Спритність, СК 21');
});

test('canonical relationship fixtures resolve across all supported modules', () => {
  const relationships = {
    ruleSlugs: ['saving-throws', 'initiative'],
    spellSlugs: ['fireball'],
    conditionSlugs: ['prone'],
    itemSlugs: ['longsword'],
  };
  assert.ok(relationships.ruleSlugs.every(slug => ruleSlugs.has(slug)));
  assert.ok(relationships.spellSlugs.every(slug => spellSlugs.has(slug)));
  assert.ok(relationships.conditionSlugs.every(slug => conditionSlugs.has(slug)));
  assert.ok(relationships.itemSlugs.every(slug => itemSlugs.has(slug)));
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

test('combat summary icons resolve and renderer keeps canonical stat values', () => {
  assert.deepEqual(BESTIARY_ICONS, {
    armorClass: '/icons/bestiary/ac.webp',
    hitPoints: '/icons/bestiary/hp.webp',
    speed: '/icons/bestiary/speed.webp',
  });
  for (const assetPath of Object.values(BESTIARY_ICONS)) {
    const absolutePath = resolve('public', assetPath.replace(/^\//u, ''));
    assert.ok(existsSync(absolutePath), `Missing Bestiary icon: ${assetPath}`);
    const bytes = readFileSync(absolutePath);
    assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
    assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');
  }

  const detailSource = readFileSync(resolve('src/pages/BestiaryDetailPage.tsx'), 'utf8');
  assert.match(detailSource, /BESTIARY_ICONS\.armorClass/);
  assert.match(detailSource, /<strong>\{entry\.armorClass\}<\/strong>/);
  assert.match(detailSource, /average=\{entry\.hitPoints\}/);
  assert.match(detailSource, /setRollAnimationKey\(current => current \+ 1\)/);
  assert.match(detailSource, /bestiary-hp-control__die/);
  assert.match(detailSource, /setRolled\(null\)/);
  assert.match(detailSource, /Повернути стандартне/);
  assert.match(detailSource, /title="Кинути хіти"/);
});

test('speed summary keeps base and additional movement types', () => {
  const wolfSpeed = splitBestiarySpeed(entries.find(entry => entry.slug === 'wolf').speed);
  assert.deepEqual(wolfSpeed, { base: '40 фт', value: '40', unit: 'фт.', additional: [] });

  const aboleth = entries.find(entry => entry.slug === 'aboleth');
  const abolethSpeed = splitBestiarySpeed(aboleth.speed);
  assert.equal(abolethSpeed.value, '10');
  assert.deepEqual(abolethSpeed.additional, ['плавання 40 фт']);
  assert.deepEqual([abolethSpeed.base, ...abolethSpeed.additional], aboleth.speed);
});

test('detail sidebar renders optional artwork, paragraph lore, relationships and one source in order', () => {
  assert.deepEqual(splitBestiaryDescription(undefined), []);
  assert.deepEqual(splitBestiaryDescription('  Один абзац.  '), ['Один абзац.']);
  assert.deepEqual(splitBestiaryDescription('Перший абзац.\n\n  Другий абзац.\n\n'), ['Перший абзац.', 'Другий абзац.']);

  const detailSource = readFileSync(resolve('src/pages/BestiaryDetailPage.tsx'), 'utf8');
  const artworkIndex = detailSource.indexOf('entry.imageUrl ?');
  const descriptionIndex = detailSource.indexOf('descriptionParagraphs.length ?');
  const relationshipsIndex = detailSource.indexOf('className="bestiary-related"');
  const sourceIndex = detailSource.indexOf('className="bestiary-source"');
  assert.ok(artworkIndex < descriptionIndex && descriptionIndex < relationshipsIndex && relationshipsIndex < sourceIndex);
  assert.match(detailSource, /\{entry\.imageUrl \? <img[^>]+> : null\}/);
  assert.match(detailSource, /\{descriptionParagraphs\.length \? <section id="description"/);
  assert.match(detailSource, /descriptionParagraphs\.map/);
  assert.match(detailSource, /relatedConditions\.length \|\| relatedSpells\.length \|\| relatedItems\.length/);
  assert.equal(detailSource.match(/aria-label="Пов’язані механіки"/gu)?.length, 1);
  assert.equal(detailSource.match(/entry\.source\.title/gu)?.length, 1);
});

test('dataset and bestiary pages do not leak raw invalid values', () => {
  const serialized = JSON.stringify(entries);
  const serializedFixtures = JSON.stringify(fixtures);
  assert.doesNotMatch(serialized, /\[object Object\]|undefined|null|placeholder|опис не вказано/i);
  assert.doesNotMatch(serializedFixtures, /\[object Object\]|undefined|null|placeholder|опис не вказано/i);
  const detailSource = readFileSync(resolve('src/pages/BestiaryDetailPage.tsx'), 'utf8');
  assert.match(detailSource, /entry\.bonusActions\?\.length/);
  assert.match(detailSource, /entry\.legendaryActions\?\.length/);
  assert.match(detailSource, /entry\.spellcasting \?/);
  assert.match(detailSource, /normalizeMonsterDamageInstances\(entry\)/);
  assert.match(detailSource, /formatMonsterSavingThrowOutcomes\(entry\.savingThrow\)/);
  assert.match(detailSource, /entry\.initiative/);
  assert.match(detailSource, /entry\.gear\?\.length/);
  assert.match(detailSource, /entry\.relationships\?\.ruleSlugs/);
  assert.match(detailSource, /entry\.alternativeExperience\?\.length/);
  assert.match(detailSource, /segmentBestiaryReferences/);
  assert.match(detailSource, /HitPointsControl/);
});

console.info(JSON.stringify({ creatures: entries.length, spells: entries.flatMap(entry => entry.relationships?.spellSlugs ?? []).length, conditions: entries.flatMap(entry => entry.relationships?.conditionSlugs ?? []).length, items: entries.flatMap(entry => entry.relationships?.itemSlugs ?? []).length, rules: entries.flatMap(entry => entry.relationships?.ruleSlugs ?? []).length }));
