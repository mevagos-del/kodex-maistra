import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const tupleCount = (source, marker = 'const seeds') => {
  const start = source.indexOf(marker);
  const end = source.indexOf('];', start) + 2;
  return (source.slice(start, end).match(/\['[a-z0-9-]+','[^']+','[^']+'/g) ?? []).length;
};
const weapons = read('src/data/rules/items/weapons.ts');
const armor = read('src/data/rules/items/armor.ts');
const tools = read('src/data/rules/items/tools.ts');
const gear = read('src/data/rules/items/adventuringGear.ts');
const magic = read('src/data/rules/items/magicItems.ts');
const magicModules = ['ammunition','armor','potions','rings','rods','scrolls','shields','staffs','wands','weapons','wondrous'];
const parseMagicModule = (name) => {
  const source = read(`src/data/rules/items/magic/${name}.ts`);
  const declaration = source.indexOf('OfficialItemEntry[]');
  const start = source.indexOf('= [', declaration) + 2;
  const end = source.lastIndexOf('];') + 1;
  return JSON.parse(source.slice(start, end).replaceAll('SRD_52_SOURCE', '{"title":"SRD 5.2.1"}'));
};
const magicEntries = magicModules.flatMap(parseMagicModule);
const repository = read('src/features/catalog/api/officialCatalogRepository.ts');
const detail = read('src/pages/ContentDetailPage.tsx');
const catalog = read('src/features/catalog/components/ItemsArchiveCatalog.tsx');
const terminology = read('src/features/catalog/utils/itemTerminology.ts');

assert.equal(tupleCount(weapons), 38, 'SRD weapon table must contain 38 weapons');
assert.equal(tupleCount(armor), 13, 'armor table must contain 12 suits and one shield');
assert.equal(tupleCount(tools, 'const artisan') + tupleCount(tools, 'const other'), 25, 'tool groups must contain 25 entries');
assert.equal(tupleCount(gear), 79, 'adventuring gear table must contain 79 entries');
assert.match(magic, /completeMagicItems/);
assert.equal(magicEntries.length, 243, 'runtime must contain 243 canonical SRD magic-item identities');
assert.equal(new Set(magicEntries.map((entry) => entry.slug)).size, 243, 'magic-item slugs must be unique');
assert.equal(new Set(magicEntries.map((entry) => entry.nameOriginal.toLocaleLowerCase('en'))).size, 243, 'English identities must be unique');
assert.equal(magicEntries.reduce((count, entry) => count + (entry.variants?.length ?? 0), 0), 19, 'grouped items must expose 19 real child variants');
assert.deepEqual(
  Object.fromEntries(magicModules.map((name) => [name, parseMagicModule(name).length])),
  { ammunition:2, armor:12, potions:20, rings:22, rods:5, scrolls:1, shields:5, staffs:12, wands:13, weapons:28, wondrous:123 },
  'magic-item subtype counts must remain stable',
);
for (const entry of magicEntries) {
  assert.equal(entry.entity, 'item');
  assert.equal(entry.magical, true);
  assert.equal(typeof entry.attunement, 'boolean');
  assert.ok(entry.nameUk.trim() && entry.nameOriginal.trim());
  assert.doesNotMatch(entry.nameUk, /[A-Za-z]{3,}/, `${entry.slug} has untranslated text in its Ukrainian name`);
  assert.equal(entry.source?.title, 'SRD 5.2.1', `${entry.slug} must use the official open source label`);
  assert.ok(entry.properties?.length, `${entry.slug} must expose its rules as properties`);
  assert.ok(entry.properties.every((property) => property.sourceText?.trim()), `${entry.slug} has an empty rule`);
  assert.ok(
    entry.properties.every((property) => !/[A-Za-z]{3,}/.test(property.sourceText)),
    `${entry.slug} has untranslated technical text in its rules`,
  );
  assert.ok(
    (entry.variants ?? []).every((variant) => variant.sourceText?.trim() && !/[A-Za-z]{3,}/.test(variant.sourceText)),
    `${entry.slug} has an empty or untranslated grouped variant`,
  );
  assert.doesNotMatch(JSON.stringify(entry), /\[object Object\]|"undefined"|"null"/i);
  assert.doesNotMatch(JSON.stringify(entry), /Unearthed Arcana|\bUA\b|2014/i, `${entry.slug} includes a legacy or playtest marker`);
}
for (const mastery of ['Cleave','Graze','Nick','Push','Sap','Slow','Topple','Vex']) assert.match(weapons, new RegExp(`'${mastery}'`));
assert.match(weapons, /versatileDamage:/);
assert.match(weapons, /normalRange:/);
assert.match(armor, /stealthDisadvantage/);
assert.match(repository, /is_magical: entry\.magical/);
assert.match(repository, /stealth_disadvantage: entry\.stealthDisadvantage \?\? false/);
assert.doesNotMatch(detail, /versatileMatch|match\(\/універсальн/);
assert.match(catalog, /categoryOrder = \['Зброя', 'Обладунки', 'Пригодницьке спорядження', 'Інструменти', 'Магічні предмети'\]/);
assert.match(catalog, /aria-expanded/);
assert.match(catalog, /entry\.title_original/);
assert.match(catalog, /categoryDescriptions/);
assert.match(catalog, /aria-current/);
assert.match(detail, /compactEntry=\{mastery\}/);
assert.doesNotMatch(detail, /const masteryUk/);
for (const mastery of ['Cleave','Graze','Nick','Push','Sap','Slow','Topple','Vex']) assert.match(terminology, new RegExp(`${mastery}:`));
assert.match(detail, /addInfo\(blocks, 'Клас'/);
assert.doesNotMatch(detail, /addInfo\(blocks, 'Підтип'/);
assert.doesNotMatch([weapons,armor,tools,gear,magic].join('\n'), /['"](?:\[object Object\]|undefined|null)['"]/);

const conditionSource = read('src/data/rules/conditions.ts');
const conditionSlugs = new Set([...conditionSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]));
const spellSource = [
  read('src/data/rules/spells.ts'),
  ...['spells-level-1.json','spells-level-2.json','spells-level-3.json','spells-level-4-5.json','spells-level-6.json','spells-level-7-9.json'].map((path) => read(`src/data/rules/${path}`)),
].join('\n');
const spellSlugs = new Set([...spellSource.matchAll(/["']slug["']?\s*:\s*["']([^"']+)["']/g)].map((match) => match[1]));
const ordinarySlugs = new Set(
  [weapons, armor, tools, gear].flatMap((source) => [
    ...[...source.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]),
    ...[...source.matchAll(/\['([a-z0-9-]+)'/g)].map((match) => match[1]),
  ]),
);
for (const entry of magicEntries) {
  for (const slug of entry.relatedConditionSlugs ?? []) assert.ok(conditionSlugs.has(slug), `${entry.slug}: missing condition ${slug}`);
  for (const slug of entry.relatedSpellSlugs ?? []) assert.ok(spellSlugs.has(slug), `${entry.slug}: missing spell ${slug}`);
  for (const slug of entry.baseItemSlugs ?? []) assert.ok(ordinarySlugs.has(slug), `${entry.slug}: missing base item ${slug}`);
}

assert.equal(
  magicEntries.reduce((count, entry) => count + (entry.relatedSpellSlugs?.length ?? 0), 0),
  43,
  'magic-item spell relationships must remain stable',
);
assert.equal(
  magicEntries.reduce((count, entry) => count + (entry.relatedConditionSlugs?.length ?? 0), 0),
  60,
  'magic-item condition relationships must remain stable',
);
assert.equal(
  magicEntries.reduce((count, entry) => count + (entry.baseItemSlugs?.length ?? 0), 0),
  8,
  'magic-item base-item relationships must remain stable',
);
assert.ok(
  magicEntries.every((entry) => !(entry.relatedSpellSlugs ?? []).includes('areas')),
  'generic area wording must not create a false spell relationship',
);

assert.equal(38 + 13 + 79 + 25 + magicEntries.length, 398, 'the complete item catalog must contain 398 canonical entries');
console.log('Items tests passed: 398 runtime records, including 243 canonical magic items and 19 grouped variants.');
