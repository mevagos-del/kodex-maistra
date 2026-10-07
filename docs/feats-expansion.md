# PHB 2024 feat dataset audit

## Completed coverage, 2026-10-07

The runtime dataset now contains all 75 identities from the project PHB 2024 inventory.
The previous runtime count was 22; 53 prepared Ukrainian entries from
`docs/phb2024-missing-feats-uk.md` were added.

Category totals:

- Origin: 10
- General: 43
- Fighting Style: 10
- Epic Boon: 12
- Total: 75

The inventory and runtime datasets have the same unique English identities. There are no
duplicate Ukrainian names, English names or slugs. Legacy Mobile was not substituted for
Speedy. No 2014, UA/playtest, homebrew or third-party identity was introduced.

## Mapping notes

The prepared records were adapted to the existing `FeatEntry` model without shortening their
mechanics. Prerequisite OR choices, feature/training prerequisites, repeat restrictions,
ability choices and maxima, action timing, ranges, usage limits, recharge conditions and
exceptions remain explicit.

The relationship model gained two optional capabilities:

- `spellRule` represents fixed spells and constrained choices by level, school or Ritual tag.
  Fey-Touched, Shadow-Touched, Telekinetic, Telepathic and Ritual Caster use it. Every returned
  spell is an existing static spell entry.
- `weaponRule` gained semantic selectors for melee, finesse, heavy, crossbow, polearm, thrown
  and slashing interactions. Selectors only return weapons that exist in the static item data.
  Weapon Master uses the existing weapon record and a `weapon-mastery` rule reference; it does
  not create a guessed mastery implementation.

The prepared source did not define slugs, so stable lowercase English slugs were assigned to
match existing routing conventions. Ukrainian punctuation was normalized for UI text, and the
Telekinetic summary typo was corrected to `телекінезом`. New Epic Boons explicitly clear the
SRD page inherited by the shared Boon defaults because they are not labeled as SRD entries.

## Source presentation

The 53 prepared records are labeled `Player’s Handbook 2024` in the UI. They are not marked as
SRD or CC-BY. Runtime records contain no TTG source entries. Internal preparation notes, TTG,
and editorial/legal explanations are not rendered. Existing licensed SRD records retain their
compact SRD 5.2.1 and CC-BY-4.0 attribution.

## Relationship audit

The completed dataset currently resolves relationships to:

- 10 classes
- 1 weapon available in the present static item dataset
- 214 unique spells
- 5 conditions
- 65 general rule identifiers

The low weapon count reflects the current static item dataset, which contains one weapon. No
dead or thematic weapon links were added. Broad spell-choice feats expose only eligible
existing spells; fixed-spell feats point to exact slugs. Condition links use existing condition
records only. Rule references remain text labels until corresponding rule routes exist.

## Validation

The feat test suite enforces:

- exactly 75 runtime entries and category counts 10 / 43 / 10 / 12;
- exact equality with `feat-inventory.ts` and all 53 prepared Markdown identities;
- unique slugs and names, source separation, and exclusion of legacy/playtest/third-party data;
- valid prerequisites, ability increases, repeatability and repeat restrictions;
- constrained spell relationships, weapon selectors and condition targets;
- Ukrainian/English/slug search, category and prerequisite filters, and alphabetical grouping;
- no invalid values such as `null`, `undefined` or `[object Object]` in visible text fields.

Validation completed on 2026-10-07:

- `node --test scripts/feats.test.mjs scripts/conditions.test.mjs scripts/spells.test.mjs`:
  141 tests passed;
- `npm run build`: passed;
- `npm run lint`: passed with the pre-existing Fast Refresh warning in `AuthProvider.tsx` and no
  errors;
- browser verification confirmed 75 catalog records, category totals 10 / 43 / 10 / 12,
  Ukrainian/English search, desktop alphabet navigation, responsive filters, no mobile horizontal
  overflow, concise source labels and representative detail pages from every category.
