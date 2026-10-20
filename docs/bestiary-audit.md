# Аудит Бестіарію SRD 5.2.1

Дата аудиту: 20 жовтня 2026 року.

## Підсумок

- Канонічне джерело: **System Reference Document 5.2.1**, D&D 2024, CC-BY-4.0.
- Розділ зі stat blocks: друковані сторінки **258-364**.
- Повноцінних monster stat blocks: **330**.
- Поточний runtime dataset: **5** істот.
- Complete: **0**.
- Partial: **5**.
- Missing: **325**.
- Масовий імпорт у межах цього аудиту не виконувався.

Повний машинозчитуваний перелік із canonical English name, slug, size, type, CR і сторінкою SRD збережено в `docs/bestiary-manifest.json`. До підрахунку включено лише записи з повноцінним stat block; згадки істот у правилах не враховано.

## Методика

Перелік отримано безпосередньо з офіційного PDF SRD 5.2.1. Для кожного запису перевірено наявність заголовка істоти, рядка size/type та початку stat block із Armor Class. Це усуває хибні збіги зі змісту, таблиць, spell text і текстових згадок.

Canonical identity визначається за англійською назвою. Український переклад не використовується для дедуплікації. У manifest зафіксовано 330 унікальних English identities і 330 унікальних slug.

## Розподіл за типами

| Тип | Кількість |
| --- | ---: |
| Aberration | 9 |
| Beast | 90 |
| Celestial | 13 |
| Construct | 10 |
| Dragon | 45 |
| Elemental | 17 |
| Fey | 15 |
| Fiend | 29 |
| Giant | 10 |
| Humanoid | 26 |
| Monstrosity | 37 |
| Ooze | 4 |
| Plant | 6 |
| Undead | 19 |
| **Разом** | **330** |

## Поточне покриття

`Complete` означає, що збережено всі наявні в офіційному stat block механіки, а не лише identity та базові характеристики. Необов'язкове поле не вважається прогалиною, якщо його немає в офіційному записі.

| Істота | Статус | Причина |
| --- | --- | --- |
| Aboleth | Partial | Основні риси, дії та legendary actions є; немає structured Initiative та альтернативного XP для лігва. |
| Bandit | Partial | Основні атаки є; немає structured Initiative і Gear. |
| Goblin Boss | Partial | Actions, Bonus Action і Reaction є; немає structured Initiative і Gear. |
| Mage | Partial | Spellcasting і дії є; немає structured Initiative/Gear, а qualifiers `Fireball (level 4 version)` і `Mage Armor (included in AC)` не представлені окремими полями. |
| Wolf | Partial | Основна риса й атака є; немає structured Initiative. |

Отже, чинні п'ять записів придатні для перевірки renderer, але жоден ще не відповідає суворому критерію повного SRD 5.2.1 stat block.

## Checklist повного stat block

Для кожної істоти під час імпорту перевіряються:

- canonical English name, українська назва, slug, size, type/subtype та alignment;
- Armor Class, Hit Points, Hit Dice та всі movement types;
- Initiative, якщо він указаний у SRD;
- шість характеристик, modifiers і saving throws;
- skills, vulnerabilities, resistances, damage immunities і condition immunities;
- senses, Passive Perception та languages;
- Challenge Rating, XP, Proficiency Bonus і альтернативні XP, якщо вони є;
- Gear, якщо він указаний;
- усі traits та повний текст їхніх механік;
- actions, bonus actions і reactions;
- attack modifier, reach/range, targets, усі damage components і secondary effects;
- save DC, ability, результат успіху/провалу та повторні saves;
- recharge, daily limits, restoration і conditional usage;
- legendary actions, їхню вартість, тригери та обмеження;
- lair actions, якщо вони є;
- spellcasting, usage groups, spell qualifiers і точні spell relationships;
- source і source page;
- lore/description лише за наявності source-backed тексту.

## Стан моделі даних

`OfficialMonsterEntry` уже підтримує multiple movement types, abilities/saves, defenses, senses, traits, action groups, spellcasting groups, legendary actions, lair actions, description, source page та relationships до Spells, Conditions і Items.

Виявлені прогалини моделі перед масовим імпортом:

| Прогалина | Вплив |
| --- | --- |
| Немає structured Initiative modifier/score | Усі поточні записи втрачають офіційний Initiative block. |
| Немає structured Gear | Спорядження доводиться наближено виражати Item relationships або втрачати. |
| Немає `ruleSlugs` | Прямі механічні зв'язки з Rules не можна зберегти в моделі істоти. |
| Одна structured damage formula/type на дію | Дії з кількома компонентами або типами шкоди зберігають частину механіки лише в prose. |
| Немає structured save DC/ability/outcomes у дії | Save mechanics неможливо надійно фільтрувати чи валідувати без parsing prose. |
| Немає structured recharge/usage/restoration | Recharge та daily limits містяться в назві або тексті. |
| Spellcasting groups не мають per-spell qualifiers | Cast level, включення spell у AC та інші винятки губляться як structured data. |
| Legendary actions не мають structured cost/trigger | Вартість і timing лишаються prose-only. |
| Один XP field | Альтернативний XP, наприклад для істоти в лігві, не представлений. |

Модель підтримує `lairActions`, але ця гілка поки не покрита реальним runtime-записом. Renderer зараз змінювати не потрібно; спочатку слід розширити схему TypeScript і тести для наведених механік.

## Механічна повнота поточних записів

- Attack modifiers, reach/range, основні damage formulas та secondary effects збережені для наявних атак.
- Recharge/daily-use механіки поточних істот представлені в іменах або prose, а не окремими полями.
- Mage має spellcasting groups і 12 чинних spell links, але per-spell qualifiers потребують моделі.
- Aboleth має legendary actions і повторні condition/save effects у source text.
- Наявність лише abilities/AC/HP без повних traits/actions надалі не може давати статус `Complete`.

## Описи та lore

- Істот із заповненим `description`: **0 із 5**.
- Істот без description: **5 із 5**.
- Artwork: **0 із 5**.
- Monster A-Z у SRD 5.2.1 є переважно stat-block reference і не надає окремий повний lore-блок для цих п'яти записів.
- Lore не можна вигадувати. TTG.club може бути лише внутрішнім fallback під час окремого імпорту згідно з source policy й не показується як джерело в UI.
- Поточна модель і renderer підтримують відсутній опис, один абзац і кілька абзаців.

## Relationships

Поточні точні зв'язки:

- Spells: **12 placements**, усі ведуть на чинні spell slug.
- Conditions: **4 placements** (`incapacitated`, `prone`, `charmed`, `grappled`).
- Items: **7 placements** для Bandit і Goblin Boss.
- Dead references: **0**.
- Rules: **0**, бо поле `ruleSlugs` у моделі відсутнє.

Відома точна прогалина: Gear `Wand` у Mage не має однозначного generic item slug у поточному Items dataset. До створення такого запису fake link додавати не можна. Під час імпорту зв'язки створюються лише для прямої згадки spell, condition, item або rule; тематичні links заборонені.

## План масового імпорту

Перед першою партією потрібен малий model-first pass: Initiative, Gear, Rules relationships, multi-damage/save/recharge fields, per-spell qualifiers та legendary action cost. Після цього рекомендовані партії:

| Партія | Склад | Missing | Складність | Основні перевірки |
| --- | --- | ---: | --- | --- |
| 1 | Beasts | 89 | Низька/середня | attacks, grapple/prone/poison, senses, swarms, movement types |
| 2 | Humanoids | 24 | Середня/висока | Gear, multiattack, spellcasting, item/spell links |
| 3 | Elementals + Constructs + Oozes + Plants | 37 | Середня | forms, immunities, resistances, conditional damage |
| 4 | Giants + Celestials | 23 | Середня/висока | ranged/melee variants, saves, healing, spellcasting |
| 5 | Fey + Aberrations | 22 | Висока | telepathy, charms, repeated saves, spell/condition links |
| 6 | Monstrosities | 37 | Середня/висока | recharge, poison, grapple, multiple damage components |
| 7 | Fiends + Undead | 48 | Висока | immunities, conditions, spellcasting, regeneration |
| 8 | Dragons | 45 | Дуже висока | breath recharge, legendary/lair actions, alternate XP, complex saves |
| **Разом** |  | **325** |  |  |

Кожна партія має додавати повні доступні механіки, а не identity-only записи. Після кожної партії потрібні schema validation, dead-link checks, exact source-page verification, renderer smoke test і responsive перевірка складних stat blocks.

## Критерії завершеності Bestiary

Bestiary можна вважати завершеним, коли:

1. Runtime містить рівно 330 canonical SRD 5.2.1 identities без дублікатів D&D 2014.
2. Кожен запис має всі обов'язкові та всі фактично присутні optional stat-block fields.
3. Traits та всі action groups містять повний source-backed mechanical text без placeholders.
4. Structured attack/save/damage/recharge/usage/spellcasting data не втрачає механіку з SRD.
5. Усі точні Spells, Conditions, Items і Rules relationships валідні; dead або thematic links відсутні.
6. Description додається лише там, де є допустимий source-backed lore.
7. Тести перевіряють не лише identity, а й механічну повноту запису.
8. Catalog/detail UI не показує `null`, `undefined`, `[object Object]`, порожні блоки чи зламані посилання.

## Джерело

- System Reference Document 5.2.1: `https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf`
- Ліцензія: CC-BY-4.0.
