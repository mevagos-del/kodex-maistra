import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const generatedPath = resolve('src/data/homeReferenceIndex.generated.ts');
const compiled = ts.transpileModule(readFileSync(generatedPath, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const generated = {};
new Function('exports', compiled)(generated);
const entries = generated.HOME_REFERENCE_INDEX;

const expectedSections = ['races', 'classes', 'feats', 'spells', 'items', 'conditions', 'rules', 'bestiary'];
const expectedAssets = [
  'public/images/home/kodex_maistra_hero.webp',
  'public/images/home/sections/kodex_maistra_bestiary_background.webp',
  'public/images/home/sections/kodex_maistra_spells_background.webp',
  'public/images/home/sections/kodex_maistra_rules_background_3x1.webp',
  'public/images/home/sections/kodex_maistra_stany_background_variant1_3x1.webp',
  'public/icons/home/rasy.webp',
  'public/icons/home/klasy.webp',
  'public/icons/home/rysy.webp',
  'public/icons/home/predmety.webp',
];

test('homepage index covers all eight reference sections without duplicate routes', () => {
  assert.deepEqual([...new Set(entries.map((entry) => entry.section))].sort(), [...expectedSections].sort());
  assert.equal(new Set(entries.map((entry) => entry.path)).size, entries.length);
  assert.ok(entries.every((entry) => entry.slug && entry.nameUk && entry.sectionLabel && entry.path));
  assert.ok(entries.every((entry) => entry.path === `/${entry.section}/${entry.slug}`));
});

test('homepage search index includes representative Ukrainian and English names', () => {
  const searchable = (query) => entries.filter((entry) => `${entry.nameUk} ${entry.nameOriginal} ${entry.slug} ${entry.keywords ?? ''}`.toLocaleLowerCase('uk').includes(query.toLocaleLowerCase('uk')));
  const examples = [
    ['Людина', '/races/human'],
    ['Fighter', '/classes/fighter'],
    ['Alert', '/feats/alert'],
    ['Fireball', '/spells/fireball'],
    ['Longsword', '/items/longsword'],
    ['Переляканий', '/conditions/frightened'],
    ['Initiative', '/rules/initiative'],
    ['Adult Red Dragon', '/bestiary/adult-red-dragon'],
  ];
  for (const [query, path] of examples) {
    assert.ok(searchable(query).some((entry) => entry.path === path), `${query}: missing ${path}`);
  }
});

test('all prepared homepage assets exist', () => {
  for (const asset of expectedAssets) assert.ok(existsSync(resolve(asset)), `Missing homepage asset: ${asset}`);
});
