import { readFile, writeFile } from 'node:fs/promises';

// Input: plain-text extraction of the official SRD 5.2.1 PDF, in reading order.
const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/build-spell-source-index.mjs <srd.txt>');
const text = (await readFile(input, 'utf8')).replace(/\\n\\f\\n/g, '\n');
const lines = text.split(/\r?\n/);
let page = 0;
const clean = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === 'System Reference Document 5.2.1') {
    page = Number(lines[++i].trim());
    continue;
  }
  if (page >= 107 && page <= 175) clean.push({ text: lines[i].trim(), page });
}
const schools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
const entries = [];
for (let i = 0; i < clean.length; i++) {
  const match = clean[i].text.match(/^(?:Level ([1-9]) (\w+)|(\w+) Cantrip) \(/);
  if (!match) continue;
  let header = clean[i].text;
  let end = i;
  while (!header.includes(')')) header += ' ' + clean[++end].text;
  if (!schools.includes(match[2] ?? match[3])) throw new Error(`Unknown school: ${header}`);
  const nameEn = clean[i - 1].text.replace(/\s+/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  const fields = {};
  let field;
  for (let j = end + 1; j < clean.length; j++) {
    const property = clean[j].text.match(/^(Casting Time|Range|Components?|Duration):\s*(.*)$/);
    if (property) {
      field = property[1] === 'Component' ? 'Components' : property[1];
      fields[field] = property[2];
    } else if (field) fields[field] += ' ' + clean[j].text;
    if (field === 'Duration') break;
  }
  if (!fields.Duration || !fields.Components) throw new Error(`Missing source header: ${nameEn}`);
  entries.push({
    nameEn,
    slug: nameEn.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    level: Number(match[1] ?? 0), school: match[2] ?? match[3],
    classes: header.slice(header.indexOf('(') + 1, header.indexOf(')')).split(',').map(c => c.trim().toLowerCase()),
    page: clean[i - 1].page,
    concentration: fields.Duration.startsWith('Concentration'),
    ritual: /Ritual/.test(fields['Casting Time']),
    components: fields.Components.split('(')[0].split(',').map(c => c.trim()),
    castingTime: fields['Casting Time'], range: fields.Range, duration: fields.Duration,
  });
  i = end;
}
if (entries.length < 300 || new Set(entries.map(e => e.slug)).size !== entries.length) {
  throw new Error(`Incomplete or duplicate source extraction (${entries.length} entries)`);
}
const index = {
  source: 'SRD 5.2.1', license: 'CC-BY-4.0',
  url: 'https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf',
  entries,
};
await writeFile(new URL('../src/data/rules/spell-source-index.json', import.meta.url), JSON.stringify(index, null, 2) + '\n');
console.log(`Indexed ${entries.length} official spell identities (not translated runtime entries).`);
