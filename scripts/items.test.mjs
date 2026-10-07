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
const repository = read('src/features/catalog/api/officialCatalogRepository.ts');
const detail = read('src/pages/ContentDetailPage.tsx');
const catalog = read('src/features/catalog/components/ItemsArchiveCatalog.tsx');

assert.equal(tupleCount(weapons), 38, 'SRD weapon table must contain 38 weapons');
assert.equal(tupleCount(armor), 13, 'armor table must contain 12 suits and one shield');
assert.equal(tupleCount(tools, 'const artisan') + tupleCount(tools, 'const other'), 25, 'tool groups must contain 25 entries');
assert.equal(tupleCount(gear), 79, 'adventuring gear table must contain 79 entries');
assert.equal((magic.match(/entity:'item'/g) ?? []).length, 3, 'only verified translated magic entries are published');
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
assert.doesNotMatch([weapons,armor,tools,gear,magic].join('\n'), /['"](?:\[object Object\]|undefined|null)['"]/);

console.log('Items tests passed: 158 verified runtime records, 38 weapons, 13 armor/shields, 79 gear, 25 tools, 3 magic items.');
