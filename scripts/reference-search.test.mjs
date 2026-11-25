import test from 'node:test';
import assert from 'node:assert/strict';
import { searchModuleUrl } from './load-search.mjs';

const { normalizeReferenceSearch, referenceSearchScore, searchReferences } = await import(await searchModuleUrl());
const entries = [
  { nameUk: 'Відкладена куля вогню', nameOriginal: 'Delayed Blast Fireball', slug: 'delayed-blast-fireball' },
  { nameUk: 'Куля вогню', nameOriginal: 'Fireball', slug: 'fireball' },
  { nameUk: 'Кам’яний голем', nameOriginal: 'Stone Golem', slug: 'stone-golem' },
];
const find = query => searchReferences(entries, query, entry => entry);

test('normalizes case, whitespace, apostrophes and punctuation', () => {
  assert.equal(normalizeReferenceSearch('  КАМ ’ ЯНИЙ   голем '), 'кам яний голем');
  assert.deepEqual(find(' КУЛЯ   ВОГНЮ ').map(entry => entry.slug), ['fireball', 'delayed-blast-fireball']);
  assert.equal(find('КАМʼЯНИЙ ГОЛЕМ')[0].slug, 'stone-golem');
  assert.equal(find('stone golem')[0].slug, 'stone-golem');
});

test('canonical, alias, prefix, unordered words and partial have descending rank', () => {
  const fireball = entries[1];
  assert.equal(referenceSearchScore(fireball, 'куля вогню'), 5);
  assert.equal(referenceSearchScore(fireball, 'вогняна куля'), 4);
  assert.equal(referenceSearchScore(fireball, 'куля вог'), 3);
  assert.equal(referenceSearchScore(fireball, 'вогню куля'), 2);
  assert.equal(referenceSearchScore(fireball, 'огню'), 1);
  assert.equal(find('вогняна куля')[0].slug, 'fireball');
  assert.equal(find('fireball')[0].slug, 'fireball');
});

test('negative matches, no description or category indexing, no duplicates', () => {
  assert.deepEqual(find('сфера'), []);
  assert.deepEqual(find('неіснуючий термін'), []);
  assert.equal(find('куля').filter(entry => entry.slug === 'fireball').length, 1);
  assert.deepEqual(searchReferences(entries, 'куля', entry => entry, true).map(entry => entry.slug), ['delayed-blast-fireball', 'fireball']);
});
