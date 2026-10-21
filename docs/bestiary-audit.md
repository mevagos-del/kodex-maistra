# Аудит Бестіарію SRD 5.2.1

Дата аудиту: 21 жовтня 2026 року.

## Підсумок

- Канонічне джерело: **System Reference Document 5.2.1**, D&D 2024, CC-BY-4.0.
- Розділ зі stat blocks: друковані сторінки **258-364**.
- Повноцінних monster stat blocks: **330**.
- Поточний runtime dataset: **330** істот.
- Complete: **330**.
- Partial: **0**.
- Missing: **0**.
- Перша запланована партія завершена: додано **89** відсутніх Beast stat blocks; разом із Wolf runtime містить усі **90/90** звірів SRD 5.2.1.
- Друга запланована партія завершена: додано **24** відсутні Humanoid stat blocks; разом із Bandit і Mage runtime містить усі **26/26** гуманоїдів SRD 5.2.1.
- Третя запланована партія завершена: додано **37** stat blocks; runtime містить усі **17/17 Elementals, 10/10 Constructs, 4/4 Oozes і 6/6 Plants** SRD 5.2.1.
- Четверта запланована партія завершена: додано **23** stat blocks; runtime містить усі **10/10 Giants і 13/13 Celestials** SRD 5.2.1.
- П'ята запланована партія завершена: додано **22** відсутні stat blocks; разом із Goblin Boss та Aboleth runtime містить усі **15/15 Fey і 9/9 Aberrations** SRD 5.2.1.
- Шоста запланована партія завершена: додано **37** stat blocks; runtime містить усі **37/37 Monstrosities** SRD 5.2.1.
- Сьома запланована партія завершена: додано **48** stat blocks; runtime містить усі **29/29 Fiends і 19/19 Undead** SRD 5.2.1.
- Восьма фінальна партія завершена: додано **45** stat blocks; runtime містить усі **45/45 Dragons** SRD 5.2.1, а повне покриття Bestiary становить **330/330**.

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

Початкові п'ять runtime-записів і всі записи партій 1-7 відповідають суворому критерію повного SRD 5.2.1 stat block. Відсутній lore не знижує статус, оскільки він не входить до stat block і не замінюється вигаданим текстом.

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

### Імпортована партія 5: Fey + Aberrations

- Джерело stat blocks: SRD 5.2.1, сторінки **266-342**.
- Додано: **22** істоти.
- Покриття типів: **15 Fey / 9 Aberrations**, усі Complete з урахуванням раніше завершених Goblin Boss і Aboleth.
- Runtime coverage після імпорту: **200 Complete / 0 Partial / 130 Missing**.

Імпортовані canonical identities:

Blink Dog, Bugbear Stalker, Bugbear Warrior, Centaur Trooper, Chuul, Cloaker, Darkmantle, Dryad, Gibbering Mouther, Goblin Minion, Goblin Warrior, Green Hag, Grick, Grimlock, Hobgoblin Warrior, Hobgoblin Captain, Otyugh, Roper, Satyr, Sea Hag, Sprite, Worg.

Для кожного запису field-by-field звірено identity, core stats, Initiative, усі abilities і save modifiers, movement, skills/defenses/senses/languages/Gear, CR/XP/PB, Traits та всі Actions/Bonus Actions. Окремі regression assertions фіксують точний core/action signature кожної з 22 істот.

Structured representation покриває телепортацію, телепатію, Зачарування/Налякання, повторні ряткидки Chuul та Otyugh, кілька типів шкоди, save-for-half, прикріплення Cloaker і Darkmantle, ordered d8 effects Gibbering Mouther, Recharge 4-6/5-6, X/day, rest recharge, spellcasting at-will/daily/coven groups, grapple/restrained-like attachments і руйнівні щупальця Roper. Повний `sourceText` збережено для механік, де structured fields не передають усіх умов.

Партія додала **26 Spell, 24 Condition, 20 Item і 145 Rule placements**. Усі пов'язані slugs перевірені; нових unresolved references немає. Загальний перелік unresolved spell names не змінився: `Speak with Animals`, `Detect Evil and Good`, `Wall of Fire`.

Source-backed description не додано для жодної з 22 істот. SRD 5.2.1 і доступний Basic Rules reference дають canonical stat blocks без окремого придатного lore-шару; пошук дозволених fallback-джерел не підтвердив сумісного SRD 5.2.1 тексту, який можна було б додати без змішування source identities.

### Імпортована партія 6: Monstrosities

- Джерело stat blocks: SRD 5.2.1, сторінки **259-354**.
- Додано: **37** істот.
- Покриття типу: **37 Complete / 0 Partial / 0 Missing**.
- Runtime coverage після імпорту: **237 Complete / 0 Partial / 93 Missing**.

Імпортовані canonical identities:

Ankheg, Axe Beak, Basilisk, Behir, Bulette, Chimera, Cockatrice, Death Dog, Doppelganger, Drider, Ettercap, Griffon, Harpy, Hippogriff, Hydra, Kraken, Manticore, Medusa, Merrow, Mimic, Minotaur of Baphomet, Owlbear, Phase Spider, Purple Worm, Remorhaz, Roc, Rust Monster, Stirge, Tarrasque, Werebear, Wereboar, Wererat, Weretiger, Werewolf, Winter Wolf, Flying Snake, Giant Vulture.

Для кожної істоти field-by-field звірено identity, size/type/subtype/alignment, AC/HP/Hit Dice, Initiative, усі movement types, abilities і save modifiers, skills/defenses/senses/languages/Gear, CR/XP/PB, усі Traits/Actions/Bonus Actions/Reactions/Legendary Actions та source page. Окремі regression assertions фіксують точний core/action signature всіх 37 записів.

Structured representation покриває Multiattack, кілька компонентів шкоди, отруту, захоплення/стримування, павутину, двоетапне скам'яніння, повторні ряткидки, forced movement, knock prone, Recharge 4-6/5-6/6, X/day, регенерацію голів Hydra, прикріплення Stirge, прокляття лікантропів, легендарний опір, alternative XP у лігві та Legendary Actions Kraken/Tarrasque. Для Behir, Kraken, Purple Worm, Remorhaz і Tarrasque поглинання збережено як ordered mechanic steps із точними порогами шкоди, ряткидками від відригування та шкодою на початку ходу. Повний `sourceText` лишено там, де structured fields не передають усіх умов.

Партія додала **6 Spell, 51 Condition, 5 Item і 201 Rule placements**. Gear має точні Item links для Handaxe, Javelin, Hand Crossbow і Longbow. Усі додані relationships ведуть на чинні canonical slugs; нових unresolved references немає. Загальний перелік unresolved spell names не змінився: `Speak with Animals`, `Detect Evil and Good`, `Wall of Fire`.

Source-backed description не додано для жодної з 37 істот. SRD 5.2.1 не містить окремого повного lore-шару для цих stat blocks. Перевірені fallback-сторінки TTG позначені як `MM Basic`, тобто мають інший source identity; їх не змішано з canonical SRD 5.2.1 записами. TTG не показується в UI.

### Імпортована партія 7: Fiends + Undead

- Джерело stat blocks: SRD 5.2.1, сторінки **261-344**.
- Додано: **48** істот.
- Покриття типів: **29/29 Fiends і 19/19 Undead Complete**.
- Runtime coverage після імпорту: **285 Complete / 0 Partial / 45 Missing**.

Імпортовані canonical identities:

Balor, Barbed Devil, Bearded Devil, Bone Devil, Chain Devil, Swarm of Crawling Claws, Dretch, Erinyes, Ghast, Ghost, Ghoul, Glabrezu, Gnoll Warrior, Hell Hound, Hezrou, Horned Devil, Ice Devil, Imp, Incubus, Lamia, Lemure, Lich, Marilith, Mummy, Mummy Lord, Nalfeshnee, Night Hag, Nightmare, Oni, Pit Fiend, Quasit, Rakshasa, Sahuagin Warrior, Shadow, Skeleton, Warhorse Skeleton, Minotaur Skeleton, Specter, Spirit Naga, Succubus, Vampire Spawn, Vampire, Vrock, Wight, Will-o’-Wisp, Wraith, Zombie, Ogre Zombie.

Для всіх 48 записів виконано field-by-field звірку з PDF: identity, core stats, Initiative, усі abilities/save modifiers, optional defenses/skills/senses/languages/Gear, CR/XP/PB, Traits та повний склад Actions/Bonus Actions/Reactions/Legendary Actions/Spellcasting. Незалежний QA-manifest підтвердив **80 Traits, 140 Actions, 17 Bonus Actions, 6 Reactions і 8 Legendary Actions**; окремі regression assertions фіксують точну core/action signature кожної істоти.

Structured representation покриває імунітети та стійкості, infernal/demonic/undead restoration, регенерацію, Life Drain і зменшення максимуму хітів, одержимість Ghost, incorporeal movement, sunlight weaknesses, charm/fear/paralysis/poison, повторні ряткидки, кілька компонентів шкоди, Recharge 4-6/5-6/6, X/day limits, Legendary Resistance, alternative XP у лігві, Legendary Actions Lich/Mummy Lord/Vampire та впорядковані наслідки Vampire Bite/Misty Escape. Повний `sourceText` збережено там, де structured поля не передають усіх умов.

Партія додала **80 Spell, 118 Condition, 4 Item і 366 Rule placements**. Точні Item links: Shortbow, Shortsword, Studded Leather Armor і Component Pouch. Після звірки з поточним повним Spells dataset усі названі закляття партії отримали чинні canonical slugs; dead і unresolved references у цій партії відсутні.

Source-backed description не додано для жодної з 48 істот. SRD 5.2.1 не містить окремого повного lore-шару для цих stat blocks. Перевірені fallback-сторінки TTG позначені як `MM Basic` і мають інший source identity, тому їх не змішано з canonical SRD 5.2.1 записами. TTG не показується в UI.

### Імпортована партія 8: Dragons

- Джерело stat blocks: SRD 5.2.1, сторінки **263-343**.
- Додано: **45** істот.
- Покриття типу: **45/45 Dragons Complete**.
- Runtime coverage після імпорту: **330 Complete / 0 Partial / 0 Missing**.

Імпортовано чотири вікові категорії десяти chromatic/metallic родин: Black, Blue, Green, Red, White, Brass, Bronze, Copper, Gold і Silver Dragon; також Dragon Turtle, Half-Dragon, Kobold Warrior, Pseudodragon та Wyvern.

Для всіх 45 записів виконано field-by-field звірку з PDF: identity, core stats, Initiative, movement, усі abilities/save modifiers, optional defenses/skills/senses/languages/Gear, CR/XP/PB, alternative XP та повний склад action groups. Незалежна перевірка сирого тексту підтвердила всі заголовки й **45 Traits, 170 Actions, 1 Bonus Action, 0 Reactions і 60 Legendary Actions**. Окремі regression assertions фіксують точну core/action signature кожної істоти.

Structured representation покриває десять родин breath weapons, Recharge 5-6, save-for-half, кілька компонентів шкоди, Frightful Presence, Sleep/Repulsion/Slowing/Weakening/Paralyzing Breath, повторні ряткидки, ordered effects, poison та unconscious chains Pseudodragon, Multiattack, special movement, Legendary Resistance, spellcasting qualifiers, 60 Legendary Actions із вартістю та alternative XP у лігві. У жодному з 45 stat blocks SRD 5.2.1 немає окремої секції Lair Actions; модель і renderer її підтримують, але порожні або вигадані дії лігва не додано.

Партія додала **109 Spell, 39 Condition, 1 Item і 348 Rule placements**. Item relationship веде на canonical `dagger` Kobold Warrior. Усі названі закляття мають чинні slugs; нових або невирішених references немає. Раніше відомі `Speak with Animals`, `Detect Evil and Good` і `Wall of Fire` повторно перевірені в актуальному Spells dataset та існують як canonical entries.

Source-backed description не додано для жодної з 45 істот. SRD 5.2.1 не надає окремого повного lore-шару для цих stat blocks, а сумісного fallback-тексту з тією самою source identity не підтверджено. Lore не вигадано, TTG не показується в UI.

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

Модель і renderer підтримують `lairActions`, але жоден із 330 canonical stat blocks SRD 5.2.1 не містить окремої секції Lair Actions. Гілка перевірена type-safe fixtures; production data не доповнюється механіками, яких немає у джерелі.

## Механічна повнота поточних записів

- Attack modifiers, reach/range, основні damage formulas та secondary effects збережені для наявних атак.
- Recharge збережено для всіх **87** source-backed блоків поточного runtime з точними діапазонами 4-6, 5-6, 6 або відновленням після відпочинку.
- Limited-use mechanics збережено для всіх **63** поточних блоків, включно з Legendary Resistance, Divine Aid, Roar, Troll limbs, магією ковену, Darkness Aura та ресурсами дорослих/стародавніх драконів.
- Складні механіки першої партії включають swallow із повторною шкодою, web object defenses, grapple/restrained/prone conditions, swarm immunities/resistances, кілька типів руху, multiattack та save-for-half effects.
- Mage має 12 чинних spell links, точні at-will/daily groups, рівень накладання Fireball, qualifier Mage Armor та structured 3/day Bonus Action/Reaction.
- Aboleth має structured saves/outcomes, repeated save, daily limits, alternative XP і Legendary Actions із тригером, відновленням та вартістю.
- Наявність лише abilities/AC/HP без повних traits/actions надалі не може давати статус `Complete`.

## Описи та lore

- Істот із заповненим `description`: **0 із 330**.
- Істот без description: **330 із 330**.
- Artwork: **0 із 330**.
- Monster A-Z у SRD 5.2.1 є stat-block reference і не надає окремих повних lore-блоків для імпортованої Beast-партії. Перевірка дозволених fallback-джерел не дала послідовного повного відкритого lore-набору, придатного для точного перенесення всієї партії.
- Для Humanoids додатково перевірено TTG fallback. Доступні сторінки належать до MM Basic/2025 і в окремих записах мають механічні значення, що не збігаються зі SRD 5.2.1; змішувати цей lore із canonical SRD-партією небезпечно. Тому description не додано.
- Для третьої партії перевірка TTG fallback повторно підтвердила MM Basic/2025 походження й фактичні розбіжності зі SRD 5.2.1. Description не додано, щоб не змішувати різні source identities.
- Для четвертої партії TTG fallback також повернув MM Basic/2025 сторінки. Description не додано, оскільки їх не можна атрибутувати canonical SRD 5.2.1 записам без змішування source identities.
- Для п'ятої партії перевірено SRD 5.2.1, D&D 2024 Basic Rules і дозволений fallback. Окремого сумісного lore-шару для точного перенесення не підтверджено; description не вигадано.
- Для сьомої партії перевірено SRD 5.2.1, D&D 2024 Basic Rules і дозволений fallback. TTG-сторінки належать до `MM Basic`, тому їхній lore не змішано з SRD source identity.
- Для восьмої партії окремий сумісний lore-шар із тією самою source identity не підтверджено; опис не вигадано й механічний stat block не дублюється як lore.
- Lore не вигадується, а внутрішній fallback не показується як джерело в UI. Тому `description` навмисно лишається порожнім.
- Поточна модель і renderer підтримують відсутній опис, один абзац і кілька абзаців.

## Relationships

Поточні точні зв'язки:

- Spells: **371 placements**, усі ведуть на чинні spell slug.
- Conditions: **556 placements**, усі ведуть на чинні condition slug.
- Items: **98 placements**, усі ведуть на чинні item slug.
- Dead references: **0**.
- Rules: **2004 placements**, усі ведуть на чинні canonical rule slug.

Відома точна прогалина: Gear `Wand` у Mage та Archmage не має однозначного generic item slug, тому показується текстом без fake Item link. Раніше зафіксовані spell names (`Speak with Animals`, `Detect Evil and Good`, `Wall of Fire`) тепер мають canonical записи у поточному Spells dataset. У партії 8 всі named spells зв'язані; unresolved або dead relationship slugs у runtime немає. Під час імпорту зв'язки створюються лише для прямої згадки spell, condition, item або rule; тематичні links заборонені.

## План масового імпорту

Model-first pass завершено: Initiative, Gear, Rules relationships, multi-damage/save/recharge fields, per-spell qualifiers, ordered mechanics, legendary action cost та alternative XP підтримуються. Рекомендовані партії:

| Партія | Склад | Missing | Складність | Основні перевірки |
| --- | --- | ---: | --- | --- |
| 1 | Beasts | 0 (89 імпортовано) | Завершено | attacks, grapple/prone/poison, senses, swarms, movement types |
| 2 | Humanoids | 0 (24 імпортовано) | Завершено | Gear, multiattack, spellcasting, item/spell links |
| 3 | Elementals + Constructs + Oozes + Plants | 0 (37 імпортовано) | Завершено | forms, immunities, resistances, conditional damage |
| 4 | Giants + Celestials | 0 (23 імпортовано) | Завершено | ranged/melee variants, saves, healing, spellcasting, legendary actions |
| 5 | Fey + Aberrations | 0 (22 імпортовано) | Завершено | telepathy, charms, repeated saves, spell/condition links |
| 6 | Monstrosities | 0 (37 імпортовано) | Завершено | recharge, poison, grapple, petrification, swallow, legendary actions |
| 7 | Fiends + Undead | 0 (48 імпортовано) | Завершено | immunities, conditions, spellcasting, regeneration |
| 8 | Dragons | 0 (45 імпортовано) | Завершено | breath recharge, legendary actions, alternate XP, complex saves |

| **Залишилось** |  | **0** |  |  |

Усі вісім запланованих партій завершено. Bestiary містить повні доступні механіки для 330 canonical SRD 5.2.1 stat blocks без identity-only записів. Фінальна перевірка включає schema validation, dead-link checks, exact source-page і per-entry signature verification та renderer smoke tests.

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

Початкові п'ять істот і всі імпортовані записи партій 1-8 пройшли source verification та мають статус `Complete`. Manifest фіксує **330 Complete / 0 Partial / 0 Missing**; Bestiary data module готовий як повний SRD 5.2.1 reference.

Відомі обмеження:

- модель не намагається перетворити кожну довільну source-backed умову на окремий enum; повний `sourceText` залишається потрібним;
- українська морфологія типів шкоди й conditions зберігається у source data, formatter її не вигадує;
- універсального importer немає; кожна завершена партія сформована з окремим source extraction та перевірена per-entry;
- generic Gear `Wand` у Mage/Archmage не має однозначного canonical Item target, тому показується без fake relationship;
- manifest із 330 identities не змінював canonical перелік; coverage-status оновлено для всіх 330 перевірених істот.

## Джерело

- System Reference Document 5.2.1: `https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf`
- Ліцензія: CC-BY-4.0.
