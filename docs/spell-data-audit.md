# Spell dataset audit

The source identity index contains the 339 spell descriptions from the official
SRD 5.2.1, pages 107–175. It is a build-time audit fixture, not runtime content.
Only complete Ukrainian records are exported through `officialSpells`.

The open 2024 Basic Rules spell-description page was also inspected:
https://www.dndbeyond.com/sources/dnd/br-2024/spell-descriptions
It contains 339 spell entries. Named aliases such as Bigby's Hand / Arcane Hand,
Melf's Acid Arrow / Acid Arrow and Leomund's Tiny Hut / Tiny Hut are not separate
spells and must not inflate the dataset. Licensed SRD names and mechanics remain
authoritative; publicly readable Basic Rules text is not itself a CC license.
All indexed entries have complete SRD text, so no TTG fallback is required for
this source set. This is not a claim to reproduce non-open PHB supplements.

Telekinesis has one source defect: the SRD PDF ends its last example with a
comma. The missing trailing examples (24 English words) are translated from the
official Basic Rules and credited separately through `source.supplement`.
No mechanical values are inferred from the truncated PDF sentence.

Source: https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf

This work includes material from the System Reference Document 5.2.1 (SRD 5.2.1)
by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd.
The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International
License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
Spell rules are translated into Ukrainian; the identity index retains English
names for source reconciliation. No Supabase content is used as a source.

Run the completeness audit:

```sh
node scripts/audit-spells.mjs --write --require-complete
node --test scripts/spells.test.mjs
```

`spell-data-audit.json` records counts and every missing source identity. An
incomplete audit exits unsuccessfully with `--require-complete`. Missing
translations are not classified as intentionally excluded or unavailable.

To reproduce the identity fixture from a plain-text, reading-order extraction
of the official PDF:

```sh
node scripts/build-spell-source-index.mjs /path/to/srd.txt
```

The index is not a machine translation and does not supply missing rule text.
Descriptions, options, exception clauses, tables and included creature stat
blocks require complete source-backed translations before a record is included.
