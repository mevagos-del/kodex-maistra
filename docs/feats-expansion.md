# Feat expansion audit

## Published coverage, 2026-10-07

This is a **partial expansion**, not a complete PHB or revised-edition catalog.
22 entries are published: 17 unchanged SRD entries plus 5 independently worded Ukrainian
mechanical summaries. Categories: Origin 8, General 3, Fighting Style 4, Epic Boon 7.
No legacy 2014, playtest, homebrew or unverified rules were added.

The user approved original Ukrainian summaries instead of wholesale translations of
copyrighted fallback text. Public availability is not a CC-BY license. Only the original
17 SRD entries use CC-BY-4.0 attribution. Each additional entry explicitly identifies its
own official public reference, edition and `summary` presentation; it has no SRD page or license.
The source union also supports TTG provenance for subsequently verified summaries,
but **zero published entries currently use TTG mechanics**.

## Verified additions

| English identity | Ukrainian name | Public primary reference | Verified mechanics |
| --- | --- | --- | --- |
| Lucky | Щасливий | [D&D Beyond, Warlock feats](https://www.dndbeyond.com/posts/1801-the-12-best-feats-for-warlocks-in-the-2024-players) and [Origin feats](https://www.dndbeyond.com/posts/1785-the-backgrounds-and-origin-feats-in-the-2024) | Proficiency-based luck points; Long Rest; one-point Advantage on own d20 test or Disadvantage on attack against owner. Not the legacy three-point reroll rule. |
| Tough | Міцний | [Wizards of the Coast, Niko, page 2](https://media.dndbeyond.com/compendium-images/uhlh/downloads/nikos-character-sheet.pdf#page=2) | Twice current character level to maximum HP; another 2 per subsequent level. |
| Healer | Лікар | [Wizards of the Coast, Niko, page 2](https://media.dndbeyond.com/compendium-images/uhlh/downloads/nikos-character-sheet.pdf#page=2) | Utilize action; 5 feet; one kit use; target may spend own Hit Die, owner rolls it plus owner's proficiency; optional reroll of healing die 1, replacement mandatory, spell healing included. Not legacy 1d6 healing. |
| Tavern Brawler | Шинковий забіяка | [D&D Beyond, Origin feats](https://www.dndbeyond.com/posts/1785-the-backgrounds-and-origin-feats-in-the-2024) | Optional d4 + Strength for damaging Unarmed Strike; reroll damage die 1, replacement mandatory; improvised proficiency; once-per-turn 5-foot push of creature hit within Attack action in addition to damage. Not legacy bonus-action grapple or ASI. |

No inferred class prerequisites, ability increases or thematic spell links were added.
New rules use the existing text-first detail structure and existing Advantage/Disadvantage
highlighting. Search, alphabet and filters retain the same implementation.

## TTG verification blocker

[TTG's revised-edition feat index](https://new.ttg.club/feats) was readable and used only
to audit identities/categories. Individual detail pages either returned the index, or
headings with no actual rules. A live-browser attempt timed out; a direct HTTP read also
timed out after network access was allowed. Consequently, the index alone was **not** used
as evidence for prerequisites, ASI, action timing or exceptions. No missing rule was guessed.

`src/data/rules/feat-inventory.ts` records the 75 PHB 2024 identities, separately from runtime
entries. Tests enforce uniqueness, category matching and explicitly expose 53 unpublished
identities. This inventory is not imported by the application and does not create placeholder
detail pages, empty rules, misleading source flags or dead navigation links.

## PHB entries still awaiting complete source verification

- Origin (2): Crafter; Musician. The official overview is insufficient to verify the full
  crafting table and all performance restrictions; they were checked rather than declared absent.
- Fighting Style (6): Blind Fighting; Dueling; Interception; Protection;
  Thrown Weapon Fighting; Unarmed Fighting.
- Epic Boon (5): Boon of Energy Resistance; Boon of Fortitude; Boon of Recovery;
  Boon of Skill; Boon of Speed.
- General (40): Actor; Athlete; Charger; Chef; Crossbow Expert; Crusher; Defensive Duelist;
  Dual Wielder; Durable; Elemental Adept; Fey-Touched; Great Weapon Master; Heavily Armored;
  Heavy Armor Master; Inspiring Leader; Keen Mind; Lightly Armored; Mage Slayer;
  Martial Weapon Training; Medium Armor Master; Moderately Armored; Mounted Combatant;
  Observant; Piercer; Poisoner; Polearm Master; Resilient; Ritual Caster; Sentinel;
  Shadow-Touched; Sharpshooter; Shield Master; Skill Expert; Skulker; Slasher;
  Spell Sniper; Telekinetic; Telepathic; War Caster; Weapon Master.

The TTG index also contains official revised-edition supplements (e.g. EFA and FRHoF),
playtest tags and third-party books. Supplement mechanics are not yet verified or published;
the 75-entry PHB inventory must not be presented as the entirety of all revised-edition books.
UA/playtest and third-party identities are excluded from official content, not merged as PHB.
Legacy-only Mobile is not substituted for revised Speedy. No legacy duplicate was introduced.

## Relationship audit

Unique linked records remain 9 classes, 1 existing weapon, 214 spells and 3 conditions.
General rule references increased from 25 to 35; they remain plain Ukrainian labels without
links to nonexistent routes. Existing Magic Initiate (72 choices) and Spell Recall (190 slot
interactions) selectors are unchanged. No arbitrary new spell candidates are granted by the
new entries. All internal targets resolve to existing static data in tests.

## Validation

### 2026-10-07 continuation

The remaining PHB inventory was checked again rather than treating TTG access failure as a
reason to abandon unrelated work. Direct access to the Actor detail timed out after 20 seconds;
the web reader returned the index instead of rules. Every identity in the four pending lists
above lacks a verified complete rules text in the sources reviewed: Origin 2, General 40,
Fighting Style 6, Epic Boon 5. No placeholder mechanics were published.

One additional identity, **Speedy / Прудкий**, was verified using the official
[Cleric feats article](https://www.dndbeyond.com/posts/1791-12-best-feats-for-clerics-in-the-2024-players):
level 4+, Dexterity or Constitution 13+, +1 Dexterity or Constitution, +10 feet Speed,
Dash bypasses extra Difficult Terrain movement cost, Opportunity Attacks have Disadvantage.
It is not the legacy Mobile feat. No arbitrary spell/class/weapon relationships were added.

Public source presentation now uses `featPublicSource`: official publication title/link only.
Working article/PDF/TTG provenance remains in static data for audit, never in the visible
source header/footer. Editorial summary explanations were removed from the detail page.
SRD author, license link and translation attribution remain compact to preserve CC-BY credit.
Tests cover source separation (including a synthetic TTG reference) and Speedy regressions.

Current continuation validation: all 86 feat/condition/spell tests passed (38 feat tests).
Build passed; lint passed with the existing AuthProvider Fast Refresh warning and no errors.
All 22 detail routes were browser-checked at 390 x 844: no invalid values, editorial source
text, TTG/Niko leakage or horizontal overflow. Speedy search and combined General/ability
filters returned the correct entry. Its desktop detail at 1440 x 900 also had no overflow.
No layout, styling, catalog search implementation or unrelated runtime behavior was changed.

The results below are retained as the historical 21-entry validation pass.

- Expanded feat suite checks all published identities, provenance, license separation,
  duplicate slugs/names, prerequisites, ASI, repeatability, relationships and alphabetical search.
- Mechanical regressions check new Origin feat counts, timing, range, recharge and 2014 conflicts.
- Run: `node --test scripts/feats.test.mjs scripts/conditions.test.mjs scripts/spells.test.mjs`.
- All 83 feat/condition/spell tests passed, including 35 feat tests.
- `npm run build` passed; the existing large spell-chunk warning remains.
- `npm run lint` passed with zero errors and the existing AuthProvider Fast Refresh warning.
- Browser: all 21 detail routes checked at 390 x 844, with correct sources, no invalid values
  or horizontal overflow. Desktop catalog and Healer detail checked at 1440 x 900.
- Browser search for Lucky, combined Origin/no-prerequisite filters (8 results), empty state
  and the new Ukrainian alphabet letters were verified. No layout/CSS was changed.
