# Аудит Бестіарію SRD 5.2.1

Дата аудиту: 20 жовтня 2026 року.

## Підсумок

- Канонічне джерело: **System Reference Document 5.2.1**, D&D 2024, CC-BY-4.0.
- Розділ зі stat blocks: друковані сторінки **258-364**.
- Повноцінних monster stat blocks: **330**.
- Поточний runtime dataset: **178** істот.
- Complete: **178**.
- Partial: **0**.
- Missing: **152**.
- Перша запланована партія завершена: додано **89** відсутніх Beast stat blocks; разом із Wolf runtime містить усі **90/90** звірів SRD 5.2.1.
- Друга запланована партія завершена: додано **24** відсутні Humanoid stat blocks; разом із Bandit і Mage runtime містить усі **26/26** гуманоїдів SRD 5.2.1.
- Третя запланована партія завершена: додано **37** stat blocks; runtime містить усі **17/17 Elementals, 10/10 Constructs, 4/4 Oozes і 6/6 Plants** SRD 5.2.1.
- Четверта запланована партія завершена: додано **23** stat blocks; runtime містить усі **10/10 Giants і 13/13 Celestials** SRD 5.2.1.

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

### Імпортована партія 2: Humanoids

- Джерело stat blocks: SRD 5.2.1, сторінки **260-337**.
- Додано: **24** істоти.
- Humanoid coverage після імпорту: **26 Complete / 0 Partial / 0 Missing**.
- Runtime coverage після імпорту: **118 Complete / 0 Partial / 212 Missing**.

Імпортовані canonical identities:

Assassin, Bandit Captain, Berserker, Commoner, Cultist, Cultist Fanatic, Druid, Gladiator, Guard, Guard Captain, Knight, Archmage, Noble, Pirate, Pirate Captain, Priest Acolyte, Priest, Scout, Spy, Tough, Tough Boss, Vampire Familiar, Warrior Infantry, Warrior Veteran.

Для кожного запису звірено core stats, Initiative, усі шість abilities/saves, skills, senses, languages, CR/XP/PB, Gear і повний склад Traits/Actions/Bonus Actions/Reactions. Spellcasting структуровано для Cultist Fanatic, Druid, Archmage, Priest Acolyte та Priest. Збережено Multiattack, multiple damage instances, save DC/outcomes, reaction triggers, daily limits, condition effects і точні spell/item/rule relationships.

Невирішені exact-link випадки: generic `Wand` для Archmage не має однозначного Item slug; `Speak with Animals` у Druid відсутнє в поточному Spells dataset. Обидві назви відображаються як точний текст без fake/dead link.

### Імпортована партія 3: Elementals + Constructs + Oozes + Plants

- Джерело stat blocks: SRD 5.2.1, сторінки **258-343**.
- Додано: **37** істот.
- Покриття типів: **17 Elementals / 10 Constructs / 4 Oozes / 6 Plants**, усі Complete.
- Runtime coverage після імпорту: **155 Complete / 0 Partial / 175 Missing**.

Імпортовані canonical identities:

Air Elemental, Animated Armor, Animated Flying Sword, Animated Rug of Smothering, Awakened Shrub, Awakened Tree, Azer Sentinel, Black Pudding, Clay Golem, Djinni, Earth Elemental, Efreeti, Fire Elemental, Flesh Golem, Shrieker Fungus, Violet Fungus, Gargoyle, Gelatinous Cube, Gorgon, Gray Ooze, Homunculus, Invisible Stalker, Iron Golem, Magmin, Dust Mephit, Ice Mephit, Magma Mephit, Steam Mephit, Merfolk Skirmisher, Ochre Jelly, Salamander, Shambling Mound, Shield Guardian, Stone Golem, Treant, Water Elemental, Xorn.

Для кожного запису field-by-field звірено core stats, Initiative, abilities/saves, movement, defenses, senses, languages, CR/XP/PB і повний склад action groups. Збережено forms, поглинання шкоди, Multiattack, кілька компонентів шкоди, conditional damage, повторні ряткидки, Recharge 4-6/5-6/6, X/day, Split, Engulf/Whelm, suffocation, Spell Storing, reaction triggers і spellcasting Djinni/Efreeti.

Підтвердженого сумісного lore не додано. SRD не містить окремого lore для цих stat blocks; перевірені TTG-сторінки належать до MM Basic/2025 і подекуди конфліктують зі SRD 5.2.1 (зокрема за швидкістю Clay Golem і світоглядом Djinni), тому їх не змішано з canonical SRD-партією.

Невирішені exact-link випадки цієї партії: `Detect Evil and Good` і `Wall of Fire` відсутні в поточному Spells dataset. Назви збережено текстом у точних spellcasting groups без fake/dead links. Gear у stat blocks цієї партії не вказано.

### Імпортована партія 4: Giants + Celestials

- Джерело stat blocks: SRD 5.2.1, сторінки **275-352**.
- Додано: **23** істоти.
- Покриття типів: **10 Giants / 13 Celestials**, усі Complete.
- Runtime coverage після імпорту: **178 Complete / 0 Partial / 152 Missing**.

Імпортовані canonical identities:

Cloud Giant, Couatl, Deva, Ettin, Fire Giant, Frost Giant, Guardian Naga, Hill Giant, Ogre, Pegasus, Planetar, Solar, Sphinx of Wonder, Sphinx of Lore, Sphinx of Valor, Stone Giant, Storm Giant, Troll, Troll Limb, Unicorn, Giant Eagle, Giant Elk, Giant Owl.

Для всіх 23 записів виконано field-by-field звірку з PDF: identity, core stats, Initiative, усі шість abilities із save modifiers, optional defenses/skills/senses/languages/Gear, CR/XP/PB та повний склад Traits/Actions/Bonus Actions/Reactions/Legendary Actions/Spellcasting. Окремі regression assertions фіксують точні core/action signatures кожної істоти.

Structured representation зберігає Multiattack, кілька типів шкоди, save-for-half, instant-death threshold Solar, повторний ряткидок другого Roar, послідовні три Roar effects, Recharge 5-6, X/day limits, відновлення хітів, reaction trigger Stone Giant, alternative XP у лігві та Legendary Actions Solar/Sphinx/Unicorn із вартістю. Spellcasting groups зберігають at-will/daily/action qualifiers і рівні накладання Cure Wounds та Flame Strike.

Gear має чотири точні Item links: Battleaxe, Morningstar, Greatclub і три Javelins. Усі інші relationships створено лише за прямими механічними згадками. `Detect Evil and Good` відсутнє в поточному Spells dataset, тому сім його входжень залишено текстом без fake link. Відомі unresolved spell names у всьому Bestiary: `Speak with Animals`, `Detect Evil and Good`, `Wall of Fire`.

Підтвердженого сумісного lore для партії не додано. SRD 5.2.1 містить stat blocks без окремих повних lore-описів. Перевірені TTG fallback-сторінки позначені як MM Basic/2025; вони не є тим самим SRD source identity, тому тексти різних джерел і редакцій не змішувалися.

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
- Recharge збережено для всіх **18** source-backed дій поточного runtime з точними діапазонами 4-6, 5-6 або 6.
- Limited-use mechanics збережено для всіх **27** поточних блоків, включно з Legendary Resistance, Divine Aid, Roar, Troll limbs і реакцією Sphinx of Wonder.
- Складні механіки першої партії включають swallow із повторною шкодою, web object defenses, grapple/restrained/prone conditions, swarm immunities/resistances, кілька типів руху, multiattack та save-for-half effects.
- Mage має 12 чинних spell links, точні at-will/daily groups, рівень накладання Fireball, qualifier Mage Armor та structured 3/day Bonus Action/Reaction.
- Aboleth має structured saves/outcomes, repeated save, daily limits, alternative XP і Legendary Actions із тригером, відновленням та вартістю.
- Наявність лише abilities/AC/HP без повних traits/actions надалі не може давати статус `Complete`.

## Описи та lore

- Істот із заповненим `description`: **0 із 178**.
- Істот без description: **178 із 178**.
- Artwork: **0 із 178**.
- Monster A-Z у SRD 5.2.1 є stat-block reference і не надає окремих повних lore-блоків для імпортованої Beast-партії. Перевірка дозволених fallback-джерел не дала послідовного повного відкритого lore-набору, придатного для точного перенесення всієї партії.
- Для Humanoids додатково перевірено TTG fallback. Доступні сторінки належать до MM Basic/2025 і в окремих записах мають механічні значення, що не збігаються зі SRD 5.2.1; змішувати цей lore із canonical SRD-партією небезпечно. Тому description не додано.
- Для третьої партії перевірка TTG fallback повторно підтвердила MM Basic/2025 походження й фактичні розбіжності зі SRD 5.2.1. Description не додано, щоб не змішувати різні source identities.
- Для четвертої партії TTG fallback також повернув MM Basic/2025 сторінки. Description не додано, оскільки їх не можна атрибутувати canonical SRD 5.2.1 записам без змішування source identities.
- Lore не вигадується, а внутрішній fallback не показується як джерело в UI. Тому `description` навмисно лишається порожнім.
- Поточна модель і renderer підтримують відсутній опис, один абзац і кілька абзаців.

## Relationships

Поточні точні зв'язки:

- Spells: **150 placements**, усі ведуть на чинні spell slug.
- Conditions: **324 placements**, усі ведуть на чинні condition slug.
- Items: **68 placements**, усі ведуть на чинні item slug.
- Dead references: **0**.
- Rules: **944 placements**, усі ведуть на чинні canonical rule slug.

Відомі точні прогалини: Gear `Wand` у Mage та Archmage не має однозначного generic item slug; `Speak with Animals`, `Detect Evil and Good` і `Wall of Fire` відсутні у Spells dataset. До створення canonical записів fake links не додаються. Під час імпорту зв'язки створюються лише для прямої згадки spell, condition, item або rule; тематичні links заборонені.

## План масового імпорту

Model-first pass завершено: Initiative, Gear, Rules relationships, multi-damage/save/recharge fields, per-spell qualifiers, ordered mechanics, legendary action cost та alternative XP підтримуються. Рекомендовані партії:

| Партія | Склад | Missing | Складність | Основні перевірки |
| --- | --- | ---: | --- | --- |
| 1 | Beasts | 0 (89 імпортовано) | Завершено | attacks, grapple/prone/poison, senses, swarms, movement types |
| 2 | Humanoids | 0 (24 імпортовано) | Завершено | Gear, multiattack, spellcasting, item/spell links |
| 3 | Elementals + Constructs + Oozes + Plants | 0 (37 імпортовано) | Завершено | forms, immunities, resistances, conditional damage |
| 4 | Giants + Celestials | 0 (23 імпортовано) | Завершено | ranged/melee variants, saves, healing, spellcasting, legendary actions |
| 5 | Fey + Aberrations | 22 | Висока | telepathy, charms, repeated saves, spell/condition links |
| 6 | Monstrosities | 37 | Середня/висока | recharge, poison, grapple, multiple damage components |
| 7 | Fiends + Undead | 48 | Висока | immunities, conditions, spellcasting, regeneration |
| 8 | Dragons | 45 | Дуже висока | breath recharge, legendary/lair actions, alternate XP, complex saves |
| **Залишилось** |  | **152** |  |  |

Наступна партія за планом: **22 записи Fey + Aberrations**. Її в цій ітерації не розпочато. Кожна партія має додавати повні доступні механіки, а не identity-only записи. Після кожної партії потрібні schema validation, dead-link checks, exact source-page verification, renderer smoke test і responsive перевірка складних stat blocks.

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

Початкові п'ять істот, усі 89 записів Beast-партії та 24 записи Humanoid-партії пройшли source verification і мають статус `Complete`. Manifest тепер фіксує **118 Complete / 0 Partial / 212 Missing**.

Відомі обмеження:

- модель не намагається перетворити кожну довільну source-backed умову на окремий enum; повний `sourceText` залишається потрібним;
- українська морфологія типів шкоди й conditions зберігається у source data, formatter її не вигадує;
- універсального importer для решти 212 записів немає; кожна завершена партія сформована з окремим source extraction та перевірена per-entry;
- наступні партії потребують per-entry source validation, exact slug resolution і перевірки відсутності 2014 mechanics;
- generic Gear `Wand` у Mage/Archmage і `Speak with Animals` у Druid не мають canonical target у відповідних runtime-каталогах, тому показуються без fake relationship;
- manifest із 330 identities не змінював canonical перелік; coverage-status тепер оновлено для 118 перевірених істот.

## Джерело

- System Reference Document 5.2.1: `https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf`
- Ліцензія: CC-BY-4.0.
