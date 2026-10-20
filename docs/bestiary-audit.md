# Аудит Бестіарію SRD 5.2.1

Дата аудиту: 20 жовтня 2026 року.

## Підсумок

- Канонічне джерело: **System Reference Document 5.2.1**, D&D 2024, CC-BY-4.0.
- Розділ зі stat blocks: друковані сторінки **258-364**.
- Повноцінних monster stat blocks: **330**.
- Поточний runtime dataset: **94** істоти.
- Complete: **94**.
- Partial: **0**.
- Missing: **236**.
- Перша запланована партія завершена: додано **89** відсутніх Beast stat blocks; разом із Wolf runtime містить усі **90/90** звірів SRD 5.2.1.

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

| Істота | Сторінка | Статус і повнота | Relationships | Lore / невирішене |
| --- | ---: | --- | --- | --- |
| Aboleth | 258 | Complete: Initiative, альтернативний XP у лігві, усі п'ять рис, чотири дії, saves/outcomes, daily limits і дві Legendary Actions з вартістю. | 2 Conditions, 6 Rules | Підтвердженого відкритого lore немає; механічних прогалин немає. |
| Bandit | 261 | Complete: Initiative, повний Gear та обидві атаки з точними modifiers, range і damage. | 3 Items, 3 Rules | Підтвердженого відкритого lore немає; механічних прогалин немає. |
| Goblin Boss | 290 | Complete: Initiative, Gear, Multiattack, двокомпонентна шкода за Переваги, Bonus Action і Reaction. | 4 Items, 7 Rules | Підтвердженого відкритого lore немає; механічних прогалин немає. |
| Mage | 305 | Complete: Initiative, Gear, усі action groups, 12 spell links, точні daily groups, Fireball рівня 4 та Mage Armor, врахований у КЗ. | 12 Spells, 8 Rules | Підтвердженого відкритого lore немає. `Wand` не має однозначного item slug, тому fake link не створено. |
| Wolf | 364 | Complete: Initiative, Pack Tactics і Bite з точним secondary condition effect. | 2 Conditions, 5 Rules | Підтвердженого відкритого lore немає; механічних прогалин немає. |

Початкові п'ять runtime-записів і всі записи першої партії відповідають суворому критерію повного SRD 5.2.1 stat block. Відсутній lore не знижує статус, оскільки він не входить до stat block і не замінюється вигаданим текстом.

### Імпортована партія 1: Beasts

- Джерело stat blocks: SRD 5.2.1, сторінки **344-364**.
- Додано: **89** істот.
- Beast coverage після імпорту: **90 Complete / 0 Partial / 0 Missing**.
- Runtime coverage після імпорту: **94 Complete / 0 Partial / 236 Missing**.

Імпортовані canonical identities:

Allosaurus, Ankylosaurus, Ape, Archelon, Baboon, Badger, Bat, Black Bear, Blood Hawk, Boar, Brown Bear, Camel, Cat, Constrictor Snake, Crab, Crocodile, Deer, Dire Wolf, Draft Horse, Eagle, Elephant, Elk, Frog, Giant Ape, Giant Badger, Giant Bat, Giant Boar, Giant Centipede, Giant Constrictor Snake, Giant Crab, Giant Crocodile, Giant Fire Beetle, Giant Frog, Giant Goat, Giant Hyena, Giant Lizard, Giant Octopus, Giant Rat, Giant Scorpion, Giant Seahorse, Giant Shark, Giant Spider, Giant Toad, Giant Venomous Snake, Giant Wasp, Giant Weasel, Giant Wolf Spider, Goat, Hawk, Hippopotamus, Hunter Shark, Hyena, Jackal, Killer Whale, Lion, Lizard, Mammoth, Mastiff, Mule, Octopus, Owl, Panther, Piranha, Plesiosaurus, Polar Bear, Pony, Pteranodon, Rat, Raven, Reef Shark, Rhinoceros, Riding Horse, Saber-Toothed Tiger, Scorpion, Seahorse, Spider, Swarm of Bats, Swarm of Insects, Swarm of Piranhas, Swarm of Rats, Swarm of Ravens, Swarm of Venomous Snakes, Tiger, Triceratops, Tyrannosaurus Rex, Venomous Snake, Vulture, Warhorse, Weasel.

Для кожного запису перенесено всі наявні core stats, Initiative, усі movement types, abilities/saves, skills, defenses, senses, languages, CR/XP/PB, traits і повні action groups. Structured representation покриває multiple damage instances, save DC/outcomes, Recharge, limited uses, conditions і точні Rules relationships. У партії немає source-backed spellcasting, Gear, Legendary Actions або Lair Actions, тому порожні механіки не додавалися.

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

Підготовчий model pass додав:

| Структура | Підтримка |
| --- | --- |
| `OfficialMonsterInitiative` | Initiative modifier і фіксований score. |
| `OfficialMonsterGear` | Назва, кількість, optional canonical Item slug і примітка. |
| `OfficialMonsterDamageInstance[]` | Кілька формул і типів шкоди, application timing та qualifier. Legacy `damage`/`damageType` нормалізуються без зміни чинних записів. |
| `OfficialMonsterSavingThrow` | Ability, DC, наслідки успіху/провалу та повторний save. |
| `OfficialMonsterRecharge` | Dice recharge, recharge після відпочинку або точний source-backed timing. |
| `OfficialMonsterLimitedUse` | X/day, per turn/round і відновлення після відпочинку. |
| `OfficialMonsterMechanicStep[]` | Впорядковані послідовні механічні умови з trigger, save, damage і condition links. |
| `OfficialMonsterSpellcastingGroup` | At will, daily, slots, rest/custom groups, uses, slot level та recharge. |
| `OfficialMonsterSpellReference` | Cast level, Concentration і source-backed per-spell qualifier. |
| `legendaryActionCost` | Різна вартість Legendary Actions. |
| `alternativeExperience` | Альтернативний XP із точною умовою. |
| `relationships.ruleSlugs` | Canonical links до Rules разом зі Spells, Conditions та Items. |

Renderer використовує ці поля як компактні scan facts у чинних секціях. Повний `sourceText` не замінюється structured переказом і залишається обов'язковим там, де механіка має додаткові умови. Порожні або невалідні structured values formatter приховує.

Модель підтримує `lairActions`, але ця гілка поки не покрита реальним runtime-записом. Нові структури перевірені type-safe fixtures, а не неповними production-істотами.

## Механічна повнота поточних записів

- Attack modifiers, reach/range, основні damage formulas та secondary effects збережені для наявних атак.
- Recharge перенесено лише для чотирьох source-backed дій: Ape Rock, Giant Ape Boulder Toss, Giant Spider Web і Swarm of Ravens Cacophony. Giant Spider має точний діапазон 5-6; решта відновлюються на 6.
- Limited-use mechanics збережено для Giant Hyena Rampage та Ink Cloud у Giant Octopus/Octopus разом із наявними Mage й Aboleth usage limits.
- Складні механіки першої партії включають swallow із повторною шкодою, web object defenses, grapple/restrained/prone conditions, swarm immunities/resistances, кілька типів руху, multiattack та save-for-half effects.
- Mage має 12 чинних spell links, точні at-will/daily groups, рівень накладання Fireball, qualifier Mage Armor та structured 3/day Bonus Action/Reaction.
- Aboleth має structured saves/outcomes, repeated save, daily limits, alternative XP і Legendary Actions із тригером, відновленням та вартістю.
- Наявність лише abilities/AC/HP без повних traits/actions надалі не може давати статус `Complete`.

## Описи та lore

- Істот із заповненим `description`: **0 із 94**.
- Істот без description: **94 із 94**.
- Artwork: **0 із 94**.
- Monster A-Z у SRD 5.2.1 є stat-block reference і не надає окремих повних lore-блоків для імпортованої Beast-партії. Перевірка дозволених fallback-джерел не дала послідовного повного відкритого lore-набору, придатного для точного перенесення всієї партії.
- Lore не вигадується, а внутрішній fallback не показується як джерело в UI. Тому `description` навмисно лишається порожнім.
- Поточна модель і renderer підтримують відсутній опис, один абзац і кілька абзаців.

## Relationships

Поточні точні зв'язки:

- Spells: **12 placements**, усі ведуть на чинні spell slug.
- Conditions: **102 placements**, усі ведуть на чинні condition slug.
- Items: **7 placements** для Bandit і Goblin Boss.
- Dead references: **0**.
- Rules: **420 placements**, усі ведуть на чинні canonical rule slug.

Відома точна прогалина: Gear `Wand` у Mage не має однозначного generic item slug у поточному Items dataset. До створення такого запису fake link додавати не можна. Під час імпорту зв'язки створюються лише для прямої згадки spell, condition, item або rule; тематичні links заборонені.

## План масового імпорту

Model-first pass завершено: Initiative, Gear, Rules relationships, multi-damage/save/recharge fields, per-spell qualifiers, ordered mechanics, legendary action cost та alternative XP підтримуються. Рекомендовані партії:

| Партія | Склад | Missing | Складність | Основні перевірки |
| --- | --- | ---: | --- | --- |
| 1 | Beasts | 0 (89 імпортовано) | Завершено | attacks, grapple/prone/poison, senses, swarms, movement types |
| 2 | Humanoids | 24 | Середня/висока | Gear, multiattack, spellcasting, item/spell links |
| 3 | Elementals + Constructs + Oozes + Plants | 37 | Середня | forms, immunities, resistances, conditional damage |
| 4 | Giants + Celestials | 23 | Середня/висока | ranged/melee variants, saves, healing, spellcasting |
| 5 | Fey + Aberrations | 22 | Висока | telepathy, charms, repeated saves, spell/condition links |
| 6 | Monstrosities | 37 | Середня/висока | recharge, poison, grapple, multiple damage components |
| 7 | Fiends + Undead | 48 | Висока | immunities, conditions, spellcasting, regeneration |
| 8 | Dragons | 45 | Дуже висока | breath recharge, legendary/lair actions, alternate XP, complex saves |
| **Залишилось** |  | **236** |  |  |

Наступна партія за планом: **24 відсутні Humanoids**. Кожна партія має додавати повні доступні механіки, а не identity-only записи. Після кожної партії потрібні schema validation, dead-link checks, exact source-page verification, renderer smoke test і responsive перевірка складних stat blocks.

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

## Готовність до імпорту

Data model готова представляти всі класи механік, виявлені під час аудиту 330 stat blocks. Fixtures підтверджують простого звіра, гуманоїда зі спорядженням, complex/multi-damage attack, spellcaster, Recharge, limited uses, Legendary Action із вартістю, alternative XP та дракона з послідовними механічними кроками.

Початкові п'ять істот і всі 89 записів Beast-партії пройшли source verification та мають статус `Complete`. Підтверджені Initiative, movement types, damage instances, saves/outcomes, Recharge, usage limits і condition/rule relationships перенесено у structured fields без втрати повного rule text. Manifest тепер фіксує **94 Complete / 0 Partial / 236 Missing**.

Відомі обмеження:

- модель не намагається перетворити кожну довільну source-backed умову на окремий enum; повний `sourceText` залишається потрібним;
- українська морфологія типів шкоди й conditions зберігається у source data, formatter її не вигадує;
- універсального importer для решти 236 записів немає; Beast-партія сформована з окремим source extraction та перевірена per-entry;
- наступні партії потребують per-entry source validation, exact slug resolution і перевірки відсутності 2014 mechanics;
- generic Gear `Wand` у Mage не має однозначного item slug у поточному Items dataset, тому показується точна назва без fake relationship;
- manifest із 330 identities не змінював canonical перелік; coverage-status тепер оновлено для 94 перевірених істот.

## Джерело

- System Reference Document 5.2.1: `https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf`
- Ліцензія: CC-BY-4.0.
