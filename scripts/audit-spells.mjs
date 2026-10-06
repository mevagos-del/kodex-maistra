import { readFile, writeFile } from 'node:fs/promises';
import { loadSpells } from './load-spells.mjs';

const { officialSpells, spellClasses } = await loadSpells();
const index = JSON.parse(await readFile(new URL('../src/data/rules/spell-source-index.json', import.meta.url), 'utf8'));
const available = new Set(officialSpells.map(s => s.slug));
const count = (entries, key) => Object.fromEntries([...new Set(entries.map(s => s[key]))].sort().map(value => [value, entries.filter(s => s[key] === value).length]));
const missing = index.entries.filter(s => !available.has(s.slug));
const audit = {
  complete: missing.length === 0,
  source: { title: index.source, url: index.url, license: index.license },
  sourceCount: index.entries.length,
  translatedCount: officialSpells.length,
  missingCount: missing.length,
  countsByLevel: Object.fromEntries(Array.from({ length: 10 }, (_, level) => [level, officialSpells.filter(s => s.level === level).length])),
  sourceCountsByLevel: count(index.entries, 'level'),
  countsBySchool: count(officialSpells, 'school'),
  countsByClass: Object.fromEntries(Object.keys(spellClasses).map(key => [key, officialSpells.filter(s => s.classes.includes(key)).length])),
  concentrationCount: officialSpells.filter(s => s.concentration).length,
  ritualCount: officialSpells.filter(s => s.ritual).length,
  officialOpenSourceCount: officialSpells.filter(s => s.source.license === 'CC-BY-4.0' && s.source.url.startsWith('https://media.dndbeyond.com/')).length,
  ttgSourceCount: officialSpells.filter(s => s.source.url.includes('ttg.club')).length,
  officialSupplements: officialSpells.filter(s => s.source.supplement).map(s => ({ slug: s.slug, ...s.source.supplement })),
  intentionallyExcluded: [],
  // Missing translations are work remaining, not unavailable or excluded spells.
  missingTranslations: missing,
};
if (process.argv.includes('--write')) {
  await writeFile(new URL('../docs/spell-data-audit.json', import.meta.url), JSON.stringify(audit, null, 2) + '\n');
}
console.log(JSON.stringify({ ...audit, missingTranslations: undefined }, null, 2));
if (process.argv.includes('--require-complete') && !audit.complete) {
  console.error(`${missing.length} source-backed spells still need complete Ukrainian translations.`);
  process.exitCode = 1;
}
