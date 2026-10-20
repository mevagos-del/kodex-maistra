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
const { extractDamageFormula, formatAttackMetadata, formatDamageText, parseDiceFormula, rollDiceFormula, splitBestiaryDescription, splitBestiarySpeed } = loadLocalRules(resolve('src/features/catalog/utils/bestiaryMechanics.ts'));
const { segmentBestiaryReferences } = loadLocalRules(resolve('src/features/catalog/utils/bestiaryReferences.ts'));
const { BESTIARY_ICONS } = loadLocalRules(resolve('src/features/catalog/utils/codexIcons.ts'));
const bestiaryManifest = JSON.parse(readFileSync(resolve('docs/bestiary-manifest.json'), 'utf8'));
const spellSlugs = new Set(spells.map(entry => entry.slug));
const conditionSlugs = new Set(conditions.map(entry => entry.slug));
const itemSlugs = new Set(items.map(entry => entry.slug));
const abilityKeys = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
const validChallengeRating = /^(?:0|1\/8|1\/4|1\/2|[1-9]|[12]\d|30)$/;

test('SRD 5.2.1 manifest contains all 330 canonical stat blocks', () => {
  assert.equal(bestiaryManifest.source.id, 'srd-5-2-1');
  assert.equal(bestiaryManifest.source.edition, 'D&D 2024');
  assert.equal(bestiaryManifest.statBlockCount, 330);
  assert.equal(bestiaryManifest.monsters.length, 330);
  assert.equal(new Set(bestiaryManifest.monsters.map(entry => entry.slug)).size, 330);
  assert.equal(new Set(bestiaryManifest.monsters.map(entry => entry.nameOriginal)).size, 330);
  assert.deepEqual(bestiaryManifest.coverage, { complete: 0, partial: 5, missing: 325 });
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

test('runtime Bestiary identities map to Partial manifest entries', () => {
  const manifestBySlug = new Map(bestiaryManifest.monsters.map(entry => [entry.slug, entry]));
  for (const entry of entries) {
    const manifestEntry = manifestBySlug.get(entry.slug);
    assert.ok(manifestEntry, `${entry.slug}: missing from canonical manifest`);
    assert.equal(manifestEntry.nameOriginal, entry.nameOriginal);
    assert.equal(manifestEntry.coverageStatus, 'Partial');
  }
  assert.equal(bestiaryManifest.monsters.filter(entry => entry.coverageStatus === 'Partial').length, entries.length);
  assert.equal(bestiaryManifest.monsters.filter(entry => entry.coverageStatus === 'Missing').length, 325);
});

test('first bestiary dataset has unique official identities and valid sources', () => {
  assert.equal(entries.length, 5);
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
  assert.doesNotMatch(serialized, /\[object Object\]|undefined|null|placeholder|опис не вказано/i);
  const detailSource = readFileSync(resolve('src/pages/BestiaryDetailPage.tsx'), 'utf8');
  assert.match(detailSource, /entry\.bonusActions\?\.length/);
  assert.match(detailSource, /entry\.legendaryActions\?\.length/);
  assert.match(detailSource, /entry\.spellcasting \?/);
  assert.match(detailSource, /extractDamageFormula\(entry\.damage\)/);
  assert.match(detailSource, /segmentBestiaryReferences/);
  assert.match(detailSource, /HitPointsControl/);
});

console.info(JSON.stringify({ creatures: entries.length, spells: entries.flatMap(entry => entry.relationships?.spellSlugs ?? []).length, conditions: entries.flatMap(entry => entry.relationships?.conditionSlugs ?? []).length, items: entries.flatMap(entry => entry.relationships?.itemSlugs ?? []).length }));
