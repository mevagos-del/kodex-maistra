# Feats reference

## Source and scope

This document records the initial 17-entry SRD implementation. For the current expansion,
per-entry provenance and outstanding coverage, see [feats-expansion.md](feats-expansion.md).

All 17 feats in SRD 5.2.1, pages 87–88, are included as Ukrainian translations.
The official D&D Beyond Basic Rules feat list was cross-checked and contains the same set.

- Source: https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf
- Cross-check: https://www.dndbeyond.com/sources/dnd/br-2024/feats
- License: CC-BY-4.0; attribution, translation notice and page link appear on each detail page.
- Categories: Origin 4, General 2, Fighting Style 4, Epic Boon 7.
- No TTG.club fallback was needed: all in-scope rules are complete in the official licensed source.
- No SRD feat was excluded. Actor, Athlete, War Caster and Great Weapon Master are examples in the request, not entries in this open source set; the catalog does not claim to contain the entire paid PHB.
- No Supabase official content, data mutation or schema/auth/admin changes.

## Representation

`src/data/rules/feats.ts` owns identities, categories, translated rule points, prerequisites,
repeatability, increases and structured relationships. Empty optional sections are hidden.
Ability increases are represented once, outside effect paragraphs: choices, amount, maximum,
and the ASI alternative of two distinct abilities at +1 instead of one at +2.

Prerequisites preserve level thresholds, OR choices for Strength/Dexterity 13+, and named
Fighting Style/Spellcasting features. Magic Initiate does not require levels in its spell-list classes.
Pact Magic alone is not Spellcasting for Boon of Spell Recall.

## Relationships

- 9 unique class records, with context distinguishing a class spell list from an actual prerequisite.
- 1 unique weapon record: the existing longsword, for Savage Attacker and Great Weapon Fighting.
  Weapon eligibility reads current category/property data; it does not redefine weapons.
  No ranged or Light weapon currently exists in the static item set, so no speculative link is added.
- 214 unique spells linked across two rules-based selectors.
  Magic Initiate: 72 unique cantrip/level-1 choices across Cleric, Druid and Wizard.
  Boon of Spell Recall: 190 level-1–4 spells that can interact with its slot rule; not granted spells.
  The actual slot must be level 1–4, even when casting a spell at a higher level.
- 3 existing condition routes: Incapacitated, Grappled, Invisible.
- 25 unique general-rule references stored as slugs and Ukrainian labels, not dead links.

## UI and knowledge use

Routes `/feats` and `/feats/:slug` are lazy-loaded and use AppLayout and Archive tokens.
The existing sidebar gets one native NavLink; drawer mechanics remain unchanged.
The header only gains route-context text. No global redesign or runtime knowledge dependency.

Catalog: Ukrainian alphabetical groups, sticky letter anchors, full-row native Links,
UK/EN/slug search, category/prerequisite filters and native collapsible filter disclosure.
Details: text-first translated rules, structured increases, collapsible spell lists, existing
ConditionText links and RuleText Advantage/Disadvantage highlighting.

Knowledge query: `npm run recommend -- --use-case directional-cue --limit 5`.
Reviewed `effects/hover/icon-forward-cue/README.md`: production recommended, excellent performance,
mobile fallback, keyboard parity and reduced motion. Rejected for this dense alphabet control
group per its own caution; existing Archive focus/hover primitives are simpler and sufficient.
Only scoped feat CSS is added, including an overflow/specificity fix for sticky positioning.

## Validation

- Browser: all 17 detail routes at 390×844; no invalid text or horizontal overflow.
- Catalog and expanded Magic Initiate list at 1920×1080, 1440×900, 1366×768,
  1024×768, 768×1024 and 390×844; no horizontal overflow.
- Search, combined filters, empty state, native Enter activation, visible keyboard focus,
  alphabet anchors, active sidebar item and drawer closing verified.
- Tests: 27 feat tests plus 48 existing condition/spell tests, 75 passing.
- `npm run build`: passed; existing large spell-chunk warning remains.
- `npm run lint`: passed with the existing AuthProvider react-refresh warning.
