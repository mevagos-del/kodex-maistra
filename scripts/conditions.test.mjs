import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { loadSpells } from './load-spells.mjs';

async function loadData(path) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
}
const { officialConditions: entries, conditionSlugs, conditionSource, conditionIcon, filterConditions } = await loadData('../src/data/rules/conditions.ts');
const { spellConditionApplications: applications, conditionTextAliases, conditionTextMatches, conditionLinkLabel } = await loadData('../src/data/rules/spellConditions.ts');
const { officialSpells: spells } = await loadSpells();
const names = ['Засліплений', 'Зачарований', 'Оглухлий', 'Виснаження', 'Наляканий', 'Схоплений', 'Недієздатний', 'Невидимий', 'Паралізований', 'Скам’янілий', 'Отруєний', 'Збитий з ніг', 'Стримуваний', 'Оглушений', 'Непритомний'];
const english = ['Blinded', 'Charmed', 'Deafened', 'Exhaustion', 'Frightened', 'Grappled', 'Incapacitated', 'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained', 'Stunned', 'Unconscious'];
const pointCounts = [2, 2, 1, 3, 2, 3, 4, 3, 5, 7, 1, 2, 3, 3, 6];
const bySlug = slug => entries.find(entry => entry.slug === slug);
const text = slug => bySlug(slug).effects.concat(bySlug(slug).ending ?? []).map(point => point.text).join(' ');

test('exact fifteen official identities, unique stable slugs and Ukrainian names', () => {
  assert.equal(entries.length, 15);
  assert.deepEqual(entries.map(entry => entry.slug), conditionSlugs);
  assert.equal(new Set(conditionSlugs).size, 15);
  assert.deepEqual(entries.map(entry => entry.nameUk), names);
  assert.deepEqual(entries.map(entry => entry.nameEn), english);
  assert.equal(conditionSource.license, 'CC-BY-4.0');
  assert.equal(conditionSource.edition, 'D&D 2024');
});
for (const [index, entry] of entries.entries()) {
  test(`${entry.slug}: complete rule points, source, relationships and real WebP icon`, async () => {
    assert.equal(entry.effects.length, pointCounts[index]);
    assert.ok(entry.page >= 177 && entry.page <= 191);
    const points = [...entry.effects, ...entry.ending ?? []];
    for (const point of points) {
      assert.ok(point.title && point.text.length > 20);
      assert.doesNotMatch(point.text, /\[object Object\]|undefined|null|не вказано|за правилами кампанії|[a-z]{3}/i);
    }
    assert.equal(new Set(points.map(point => point.text)).size, points.length);
    assert.ok(entry.relatedConditions.every(slug => bySlug(slug) && slug !== entry.slug));
    assert.ok(entry.relatedRules.every(rule => rule.slug && rule.label && !rule.path));
    const bytes = await readFile(new URL(`../public${conditionIcon(entry.slug)}`, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  });
}
test('2024 Exhaustion: cumulative levels, death at six, -2 per level, -5 feet, one level per Long Rest', () => {
  assert.match(text('exhaustion'), /1 рівень.*дорівнює 6/);
  assert.match(text('exhaustion'), /подвоєному рівню/);
  assert.match(text('exhaustion'), /5 футів за кожен твій рівень/);
  assert.match(text('exhaustion'), /тривалого відпочинку знімає 1/);
  assert.match(text('exhaustion'), /сягає 0, стан завершується/);
  assert.doesNotMatch(text('exhaustion'), /половин|максимум.*хітів|Невдач/);
});
test('intrinsic ending methods only; no generic invented remedy', () => {
  assert.deepEqual(entries.filter(entry => entry.ending).map(entry => entry.slug), ['exhaustion', 'grappled', 'prone']);
  assert.match(text('prone'), /половині.*округленням донизу/);
  assert.match(text('prone'), /швидкість дорівнює 0.*не можеш підвестися/);
  assert.match(text('grappled'), /Акробатика.*СК звільнення/);
  assert.match(text('grappled'), /Недієздатною.*дальність захоплення.*не витрачаючи дії/);
});
test('2024 exceptions are preserved (not 2014 condition mechanics)', () => {
  assert.match(text('grappled'), /крім істоти, що тебе схопила/);
  assert.match(text('grappled'), /Крихітний.*дві чи більше/);
  assert.match(text('invisible'), /може якось бачити тебе.*не отримуєш/);
  assert.match(text('incapacitated'), /не можеш говорити/);
  assert.match(text('incapacitated'), /Ініціативу.*Невдачу/);
  assert.match(text('unconscious'), /залишаєшся Збитим з ніг/);
  assert.match(text('petrified'), /імунітет до стану Отруєний/);
  assert.doesNotMatch(text('stunned'), /швидкість.*0/);
});
test('search Ukrainian, English and stable slug; empty result; all fifteen entries', () => {
  for (const entry of entries) {
    for (const query of [entry.nameUk, entry.nameEn, entry.slug]) assert.ok(filterConditions(query).includes(entry));
  }
  assert.equal(filterConditions('  BLINDED ').length, 1);
  assert.equal(filterConditions('немає такого стану').length, 0);
  assert.equal(filterConditions(' ').length, 15);
});
test('bidirectional application map has no missing spell/condition or duplicate targets', () => {
  for (const [slug, conditions] of Object.entries(applications)) {
    const spell = spells.find(entry => entry.slug === slug);
    assert.ok(spell, slug);
    assert.equal(new Set(conditions).size, conditions.length);
    for (const key of conditions) {
      assert.ok(bySlug(key), key);
      const alias = conditionTextAliases.find(alias => alias.slug === key);
      assert.ok([...spell.sourceText.matchAll(alias.pattern)].length, `${slug}: ${key} not present in source-backed description`);
    }
  }
});
test('immunity/removal/detection and invisible forces are NOT application relationships', () => {
  for (const slug of ['calm-emotions', 'protection-from-poison', 'dispel-evil-and-good', 'mind-spike', 'see-invisibility', 'shining-smite', 'rope-trick', 'unseen-servant', 'heroism', 'freedom-of-movement', 'lesser-restoration', 'greater-restoration', 'power-word-heal', 'mass-heal', 'mind-blank', 'faerie-fire', 'arcane-eye', 'clairvoyance', 'scrying', 'wall-of-force']) assert.equal(applications[slug], undefined, slug);
  assert.deepEqual(applications.hallow, ['frightened']);
  assert.deepEqual(applications['sleep'], ['incapacitated', 'unconscious']);
  assert.deepEqual(applications['blindness-deafness'], ['blinded', 'deafened']);
});
test('grammatical forms and legacy translations resolve without changing source text', () => {
  for (const [slug, forms] of Object.entries({ incapacitated: ['Недієздатний', 'Недієздатною'], prone: ['Збитим з ніг', 'Лежачий'], stunned: ['Оглушений', 'Приголомшений'], restrained: ['Обмежений у русі', 'Обплутаний', 'Скутий', 'Стримуваною'], blinded: ['Засліплений', 'Осліпленій'] })) {
    const { pattern } = conditionTextAliases.find(alias => alias.slug === slug);
    for (const value of forms) assert.equal([...value.matchAll(pattern)][0]?.[0], value);
  }
});
test('link matcher keeps grammatical forms, word boundaries and non-condition limits intact', () => {
  assert.deepEqual(conditionTextMatches('Радіус обмежений 300 футами.', conditionSlugs), []);
  assert.deepEqual(conditionTextMatches('Напівневидимий предмет.', conditionSlugs), []);
  assert.deepEqual(conditionTextMatches('Стан Обмежений до кінця ходу.', conditionSlugs).map(match => match.slug), ['restrained']);
  assert.deepEqual(conditionTextMatches('Істота стає Недієздатною та Збитою з ніг.', conditionSlugs).map(match => match.slug), ['incapacitated', 'prone']);
});
test('condition links use approved Ukrainian terms without losing inflection', () => {
  assert.equal(conditionLinkLabel('stunned', 'Приголомшеної'), 'Оглушеної');
  assert.equal(conditionLinkLabel('blinded', 'Осліпленій'), 'Засліпленій');
  assert.equal(conditionLinkLabel('restrained', 'Обмежений у русі'), 'Стримуваний');
  assert.equal(conditionLinkLabel('restrained', 'Скутий'), 'Стримуваний');
  assert.equal(conditionLinkLabel('prone', 'Лежачою'), 'Збитою з ніг');
});
test('routes, active sidebar, native links, accessible search and icon failure fallback', async () => {
  const read = path => readFile(new URL(`../src/${path}`, import.meta.url), 'utf8');
  assert.match(await read('routes/appRoutes.ts'), /conditions: '\/conditions',[\r\n\s]+conditionDetail: '\/conditions\/:slug'/);
  assert.match(await read('app/App.tsx'), /path=\{appRoutes.conditionDetail\}/);
  assert.match(await read('components/layout/Sidebar.tsx'), /label: 'Стани'.*path: appRoutes.conditions/);
  assert.match(await read('pages/ConditionsPage.tsx'), /aria-label="Пошук станів"/);
  assert.match(await read('pages/ConditionsPage.tsx'), /<Link className="condition-record"/);
  assert.match(await read('features/catalog/components/ConditionIcon.tsx'), /onError=.*setFailedSrc/);
  assert.match(await read('pages/SpellDetailPage.tsx'), /<ConditionText/);
  assert.match(await read('features/catalog/components/ConditionText.tsx'), /<RuleText>/);
});
console.log(`Verified ${entries.length} conditions; ${Object.keys(applications).length} spells explicitly apply conditions.`);
