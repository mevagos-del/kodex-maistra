import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/data/rules/spells.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { officialSpells, filterSpells, spellClasses } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const empty = { search: '', level: '', school: '', class: '', concentration: '', ritual: '' };
const filter = (values) => filterSpells(officialSpells, { ...empty, ...values });

test('all spells have unique slugs, complete text and licensed provenance', () => {
  assert.equal(new Set(officialSpells.map((spell) => spell.slug)).size, 6);
  for (const spell of officialSpells) {
    assert.ok(spell.sourceText.length > 80);
    assert.equal(spell.source.license, 'CC-BY-4.0');
    assert.ok(spell.source.page > 0);
    assert.ok(spell.classes.every((key) => key in spellClasses));
    assert.doesNotMatch(spell.sourceText, /\[object Object\]|undefined|null/);
  }
});
test('search matches Ukrainian, English, slug and tags', () => {
  for (const search of ['куля вогню', ' FIREBALL ', 'fireball', 'сфера']) {
    assert.equal(filter({ search })[0].slug, 'fireball');
  }
  assert.equal(filter({ search: 'немає такого закляття' }).length, 0);
});
test('filters combine and preserve the zero-level cantrip', () => {
  assert.equal(filter({ level: '0' })[0].slug, 'fire-bolt');
  assert.equal(filter({ school: 'Евокація' }).length, 3);
  assert.equal(filter({ class: 'bard' }).length, 2);
  assert.equal(filter({ concentration: 'yes' }).length, 2);
  assert.equal(filter({ ritual: 'yes' })[0].slug, 'detect-magic');
  assert.equal(filter({ class: 'wizard', concentration: 'yes', ritual: 'yes' }).length, 1);
  assert.equal(filter({ concentration: 'no', ritual: 'yes' }).length, 0);
});
test('2024 healing, fire damage and scaling retain exact source values', () => {
  const healing = officialSpells.find((spell) => spell.slug === 'healing-word');
  assert.match(healing.sourceText, /2к4/);
  const fireball = officialSpells.find((spell) => spell.slug === 'fireball');
  assert.equal(fireball.damage, '8к6');
  assert.match(fireball.higherLevels, /1к6/);
  assert.equal(fireball.mitigation.length, 3);
});
