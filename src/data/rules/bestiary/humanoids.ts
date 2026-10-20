import { SRD_52_SOURCE } from '../source';
import type { OfficialMonsterEntry } from '../types';

export const officialHumanoids: OfficialMonsterEntry[] = [
  {
    "entity": "monster",
    "slug": "assassin",
    "nameUk": "Асасин",
    "nameOriginal": "Assassin",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "16",
    "hitPoints": "97",
    "hitDice": "15к8 + 30",
    "initiative": {
      "modifier": "+10",
      "score": 20
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 18,
        "modifier": "+4",
        "save": "+7"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 16,
        "modifier": "+3",
        "save": "+6"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Акробатика": "+7",
      "Сприйняття": "+6",
      "Скритність": "+10"
    },
    "resistances": [
      "отруйна"
    ],
    "gear": [
      {
        "nameUk": "Легкий арбалет",
        "itemSlug": "light-crossbow"
      },
      {
        "nameUk": "Короткий меч",
        "itemSlug": "shortsword"
      },
      {
        "nameUk": "Шипований шкіряний обладунок",
        "itemSlug": "studded-leather-armor"
      }
    ],
    "passivePerception": 16,
    "languages": [
      "Спільна",
      "Злодійський жаргон"
    ],
    "challengeRating": "8",
    "experiencePoints": 3900,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "assassin-evasion",
        "nameUk": "Ухилення",
        "nameOriginal": "Evasion",
        "sourceText": "Якщо асасин потрапляє під дію ефекту, що дозволяє зробити ряткидок Спритності, щоб отримати лише половину шкоди, то при успіху він не отримує шкоди, а при провалі — лише половину. Асасин не може використовувати цю рису, якщо має стан Недієздатний."
      }
    ],
    "actions": [
      {
        "id": "assassin-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Асасин виконує три атаки, використовуючи Короткий меч або Легкий арбалет у будь-якому поєднанні."
      },
      {
        "id": "assassin-shortsword",
        "nameUk": "Короткий меч",
        "nameOriginal": "Shortsword",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к6 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 17,
            "formula": "5к6",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к6 + 4) + 17 (5к6)",
        "damageType": "колюча",
        "sourceText": "Ціль отримує стан Отруєний до початку наступного ходу асасина."
      },
      {
        "id": "assassin-light-crossbow",
        "nameUk": "Легкий арбалет",
        "nameOriginal": "Light Crossbow",
        "attackType": "далекобійна",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "formula": "1к8 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 21,
            "formula": "6к6",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "8 (1к8 + 4) + 21 (6к6)",
        "damageType": "колюча"
      }
    ],
    "bonusActions": [
      {
        "id": "assassin-cunning-action",
        "nameUk": "Хитра дія",
        "nameOriginal": "Cunning Action",
        "sourceText": "Істота виконує дію Ривок, Відхід або Сховатися."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "dash",
        "disengage",
        "hide",
        "initiative",
        "resistance"
      ],
      "conditionSlugs": [
        "incapacitated",
        "poisoned"
      ],
      "itemSlugs": [
        "light-crossbow",
        "shortsword",
        "studded-leather-armor"
      ]
    },
    "sourcePage": 260
  },
  {
    "entity": "monster",
    "slug": "bandit-captain",
    "nameUk": "Капітан бандитів",
    "nameOriginal": "Bandit Captain",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "15",
    "hitPoints": "52",
    "hitDice": "8к8 + 16",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+4"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+5"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+2"
      },
      "charisma": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      }
    },
    "skills": {
      "Атлетика": "+4",
      "Обман": "+4"
    },
    "gear": [
      {
        "nameUk": "Пістоль",
        "itemSlug": "pistol"
      },
      {
        "nameUk": "Ятаган",
        "itemSlug": "scimitar"
      },
      {
        "nameUk": "Шипований шкіряний обладунок",
        "itemSlug": "studded-leather-armor"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна",
      "Злодійський жаргон"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "bandit-captain-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Капітан бандитів виконує дві атаки, використовуючи Ятаган або Пістоль у будь-якому поєднанні."
      },
      {
        "id": "bandit-captain-scimitar",
        "nameUk": "Ятаган",
        "nameOriginal": "Scimitar",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к6 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к6 + 3)",
        "damageType": "рубальна"
      },
      {
        "id": "bandit-captain-pistol",
        "nameUk": "Пістоль",
        "nameOriginal": "Pistol",
        "attackType": "далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "formula": "1к10 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "8 (1к10 + 3)",
        "damageType": "колюча"
      }
    ],
    "reactions": [
      {
        "id": "bandit-captain-parry",
        "nameUk": "Парирування",
        "nameOriginal": "Parry",
        "sourceText": "Тригер: істота отримує влучання кидком ближньої атаки, тримаючи зброю. Відповідь: істота додає 2 до свого КЗ проти цієї атаки, що може перетворити влучання на промах."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "reaction"
      ],
      "itemSlugs": [
        "pistol",
        "scimitar",
        "studded-leather-armor"
      ]
    },
    "sourcePage": 261
  },
  {
    "entity": "monster",
    "slug": "berserker",
    "nameUk": "Берсерк",
    "nameOriginal": "Berserker",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "67",
    "hitDice": "9к8 + 27",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "gear": [
      {
        "nameUk": "Велика сокира",
        "itemSlug": "greataxe"
      },
      {
        "nameUk": "Шкуряний обладунок",
        "itemSlug": "hide-armor"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "berserker-bloodied-frenzy",
        "nameUk": "Шаленство пораненого",
        "nameOriginal": "Bloodied Frenzy",
        "sourceText": "Поки берсерк Закривавлений, він має Перевагу на кидки атаки та ряткидки."
      }
    ],
    "actions": [
      {
        "id": "berserker-greataxe",
        "nameUk": "Велика сокира",
        "nameOriginal": "Greataxe",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 9,
            "formula": "1к12 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "9 (1к12 + 3)",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "hit-points",
        "initiative"
      ],
      "itemSlugs": [
        "greataxe",
        "hide-armor"
      ]
    },
    "sourcePage": 263
  },
  {
    "entity": "monster",
    "slug": "commoner",
    "nameUk": "Простолюдин",
    "nameOriginal": "Commoner",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "10",
    "hitPoints": "4",
    "hitDice": "1к8",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "gear": [
      {
        "nameUk": "Дубина",
        "itemSlug": "club"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "commoner-training",
        "nameUk": "Навчання",
        "nameOriginal": "Training",
        "sourceText": "Простолюдин володіє однією навичкою за вибором Майстра й має Перевагу щоразу, коли виконує перевірку характеристики з використанням цієї навички."
      }
    ],
    "actions": [
      {
        "id": "commoner-club",
        "nameUk": "Дубина",
        "nameOriginal": "Club",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 2,
            "formula": "1к4",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "2 (1к4)",
        "damageType": "дробильна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "ability-checks",
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "proficiency"
      ],
      "itemSlugs": [
        "club"
      ]
    },
    "sourcePage": 275
  },
  {
    "entity": "monster",
    "slug": "cultist",
    "nameUk": "Культист",
    "nameOriginal": "Cultist",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "12",
    "hitPoints": "9",
    "hitDice": "2к8",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+2"
      },
      "charisma": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Обман": "+2",
      "Релігія": "+2"
    },
    "gear": [
      {
        "nameUk": "Шкіряний обладунок",
        "itemSlug": "leather-armor"
      },
      {
        "nameUk": "Серп",
        "itemSlug": "sickle"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "cultist-ritual-sickle",
        "nameUk": "Ритуальний серп",
        "nameOriginal": "Ritual Sickle",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 3,
            "formula": "1к4 + 1",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 1,
            "damageType": "некротична",
            "application": "on-hit"
          }
        ],
        "damage": "3 (1к4 + 1) + 1",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "itemSlugs": [
        "leather-armor",
        "sickle"
      ]
    },
    "sourcePage": 278
  },
  {
    "entity": "monster",
    "slug": "cultist-fanatic",
    "nameUk": "Фанатик культу",
    "nameOriginal": "Cultist Fanatic",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "44",
    "hitDice": "8к8 + 8",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+4"
      },
      "charisma": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "skills": {
      "Обман": "+3",
      "Переконання": "+3",
      "Релігія": "+2"
    },
    "gear": [
      {
        "nameUk": "Святий символ",
        "itemSlug": "holy-symbol"
      },
      {
        "nameUk": "Шкіряний обладунок",
        "itemSlug": "leather-armor"
      }
    ],
    "passivePerception": 12,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "cultist-fanatic-pact-blade",
        "nameUk": "Клинок пакту",
        "nameOriginal": "Pact Blade",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к8 + 2",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "некротична",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к8 + 2) + 7 (2к6)",
        "damageType": "рубальна"
      }
    ],
    "bonusActions": [
      {
        "id": "cultist-fanatic-spiritual-weapon",
        "nameUk": "Духовна зброя",
        "nameOriginal": "Spiritual Weapon",
        "limitedUse": {
          "uses": 2,
          "period": "day"
        },
        "sourceText": "Культист накладає «Духовну зброю», використовуючи ту саму заклинальну характеристику, що й для Накладання заклять."
      }
    ],
    "spellcasting": {
      "ability": "Мудрість",
      "saveDc": "12",
      "attackBonus": "+4",
      "groups": [
        {
          "mode": "at-will",
          "spells": [
            {
              "nameUk": "Світло",
              "slug": "light"
            },
            {
              "nameUk": "Чудотворство",
              "slug": "thaumaturgy"
            }
          ]
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Наказ",
              "slug": "command"
            }
          ],
          "uses": 2
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Утримання особи",
              "slug": "hold-person"
            }
          ],
          "uses": 1
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Духовна зброя",
              "slug": "spiritual-weapon"
            }
          ],
          "uses": 2,
          "label": "Бонусна дія · 2/день"
        }
      ]
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "initiative",
        "spellcasting"
      ],
      "itemSlugs": [
        "holy-symbol",
        "leather-armor"
      ],
      "spellSlugs": [
        "light",
        "thaumaturgy",
        "command",
        "hold-person",
        "spiritual-weapon"
      ]
    },
    "sourcePage": 278
  },
  {
    "entity": "monster",
    "slug": "druid",
    "nameUk": "Друїд",
    "nameOriginal": "Druid",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "subtype": "друїд",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "44",
    "hitDice": "8к8 + 8",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "wisdom": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "charisma": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Медицина": "+5",
      "Природа": "+3",
      "Сприйняття": "+5"
    },
    "gear": [
      {
        "nameUk": "Шипований шкіряний обладунок",
        "itemSlug": "studded-leather-armor"
      }
    ],
    "passivePerception": 15,
    "languages": [
      "Спільна",
      "Друїдична",
      "Сильванська"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "druid-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Друїд виконує дві атаки, використовуючи Лозовий посох або Зелений вогник у будь-якому поєднанні."
      },
      {
        "id": "druid-vine-staff",
        "nameUk": "Лозовий посох",
        "nameOriginal": "Vine Staff",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к8 + 3",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 2,
            "formula": "1к4",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к8 + 3) + 2 (1к4)",
        "damageType": "дробильна"
      },
      {
        "id": "druid-verdant-wisp",
        "nameUk": "Зелений вогник",
        "nameOriginal": "Verdant Wisp",
        "attackType": "далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "formula": "3к6",
            "damageType": "промениста",
            "application": "on-hit"
          }
        ],
        "damage": "10 (3к6)",
        "damageType": "промениста"
      }
    ],
    "spellcasting": {
      "ability": "Мудрість",
      "saveDc": "13",
      "groups": [
        {
          "mode": "at-will",
          "spells": [
            {
              "nameUk": "Друїдичне мистецтво",
              "slug": "druidcraft"
            },
            {
              "nameUk": "Розмова з тваринами"
            }
          ]
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Обплутування",
              "slug": "entangle"
            },
            {
              "nameUk": "Громова хвиля",
              "slug": "thunderwave"
            }
          ],
          "uses": 2,
          "each": true
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Тварина-посланець",
              "slug": "animal-messenger"
            },
            {
              "nameUk": "Довгий крок",
              "slug": "longstrider"
            },
            {
              "nameUk": "Місячний промінь",
              "slug": "moonbeam"
            }
          ],
          "uses": 1,
          "each": true
        }
      ]
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "spellcasting"
      ],
      "itemSlugs": [
        "studded-leather-armor"
      ],
      "spellSlugs": [
        "druidcraft",
        "entangle",
        "thunderwave",
        "animal-messenger",
        "longstrider",
        "moonbeam"
      ]
    },
    "sourcePage": 282
  },
  {
    "entity": "monster",
    "slug": "gladiator",
    "nameUk": "Гладіатор",
    "nameOriginal": "Gladiator",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "16",
    "hitPoints": "112",
    "hitDice": "15к8 + 45",
    "initiative": {
      "modifier": "+5",
      "score": 15
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+7"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+5"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+6"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+4"
      },
      "charisma": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      }
    },
    "skills": {
      "Атлетика": "+10",
      "Виступ": "+5"
    },
    "gear": [
      {
        "nameUk": "Щит",
        "itemSlug": "shield"
      },
      {
        "nameUk": "Спис",
        "quantity": 3,
        "itemSlug": "spear"
      },
      {
        "nameUk": "Шипований шкіряний обладунок",
        "itemSlug": "studded-leather-armor"
      }
    ],
    "passivePerception": 11,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "gladiator-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Гладіатор виконує три атаки Списом. Одну атаку він може замінити використанням Удару щитом."
      },
      {
        "id": "gladiator-spear",
        "nameUk": "Спис",
        "nameOriginal": "Spear",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к6 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к6 + 4)",
        "damageType": "колюча"
      },
      {
        "id": "gladiator-shield-bash",
        "nameUk": "Удар щитом",
        "nameOriginal": "Shield Bash",
        "target": "одна видима істота в межах 5 фт",
        "damageInstances": [
          {
            "average": 9,
            "formula": "2к4 + 4",
            "damageType": "дробильна",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "strength",
          "dc": 15,
          "onFailure": "Ціль отримує повну шкоду; якщо вона має Середній або менший розмір, також отримує стан Збитий з ніг."
        },
        "sourceText": "Ціль виконує ряткидок Сили СК 15."
      }
    ],
    "reactions": [
      {
        "id": "gladiator-parry",
        "nameUk": "Парирування",
        "nameOriginal": "Parry",
        "sourceText": "Тригер: істота отримує влучання кидком ближньої атаки, тримаючи зброю. Відповідь: істота додає 3 до свого КЗ проти цієї атаки, що може перетворити влучання на промах."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "reaction",
        "saving-throws"
      ],
      "conditionSlugs": [
        "prone"
      ],
      "itemSlugs": [
        "shield",
        "spear",
        "studded-leather-armor"
      ]
    },
    "sourcePage": 289
  },
  {
    "entity": "monster",
    "slug": "guard",
    "nameUk": "Вартовий",
    "nameOriginal": "Guard",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "16",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Сприйняття": "+2"
    },
    "gear": [
      {
        "nameUk": "Кольчужна сорочка",
        "itemSlug": "chain-shirt"
      },
      {
        "nameUk": "Щит",
        "itemSlug": "shield"
      },
      {
        "nameUk": "Спис",
        "itemSlug": "spear"
      }
    ],
    "passivePerception": 12,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "guard-spear",
        "nameUk": "Спис",
        "nameOriginal": "Spear",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+3",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 4,
            "formula": "1к6 + 1",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "4 (1к6 + 1)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "itemSlugs": [
        "chain-shirt",
        "shield",
        "spear"
      ]
    },
    "sourcePage": 296
  },
  {
    "entity": "monster",
    "slug": "guard-captain",
    "nameUk": "Капітан варти",
    "nameOriginal": "Guard Captain",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "18",
    "hitPoints": "75",
    "hitDice": "10к8 + 30",
    "initiative": {
      "modifier": "+4",
      "score": 14
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "skills": {
      "Атлетика": "+6",
      "Сприйняття": "+4"
    },
    "gear": [
      {
        "nameUk": "Кіраса",
        "itemSlug": "breastplate"
      },
      {
        "nameUk": "Дротик",
        "quantity": 6,
        "itemSlug": "javelin"
      },
      {
        "nameUk": "Довгий меч",
        "itemSlug": "longsword"
      },
      {
        "nameUk": "Щит",
        "itemSlug": "shield"
      }
    ],
    "passivePerception": 14,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "guard-captain-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Капітан варти виконує дві атаки, використовуючи Дротик або Довгий меч у будь-якому поєднанні."
      },
      {
        "id": "guard-captain-javelin",
        "nameUk": "Дротик",
        "nameOriginal": "Javelin",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 14,
            "formula": "3к6 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "14 (3к6 + 4)",
        "damageType": "колюча"
      },
      {
        "id": "guard-captain-longsword",
        "nameUk": "Довгий меч",
        "nameOriginal": "Longsword",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 15,
            "formula": "2к10 + 4",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "15 (2к10 + 4)",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "itemSlugs": [
        "breastplate",
        "javelin",
        "longsword",
        "shield"
      ]
    },
    "sourcePage": 296
  },
  {
    "entity": "monster",
    "slug": "knight",
    "nameUk": "Лицар",
    "nameOriginal": "Knight",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "18",
    "hitPoints": "52",
    "hitDice": "8к8 + 16",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+4"
      },
      "intelligence": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+2"
      },
      "charisma": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      }
    },
    "conditionImmunities": [
      "Наляканий"
    ],
    "gear": [
      {
        "nameUk": "Дворучний меч",
        "itemSlug": "greatsword"
      },
      {
        "nameUk": "Важкий арбалет",
        "itemSlug": "heavy-crossbow"
      },
      {
        "nameUk": "Латний обладунок",
        "itemSlug": "plate-armor"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "knight-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Лицар виконує дві атаки, використовуючи Дворучний меч або Важкий арбалет у будь-якому поєднанні."
      },
      {
        "id": "knight-greatsword",
        "nameUk": "Дворучний меч",
        "nameOriginal": "Greatsword",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "formula": "2к6 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 4,
            "formula": "1к8",
            "damageType": "промениста",
            "application": "on-hit"
          }
        ],
        "damage": "10 (2к6 + 3) + 4 (1к8)",
        "damageType": "рубальна"
      },
      {
        "id": "knight-heavy-crossbow",
        "nameUk": "Важкий арбалет",
        "nameOriginal": "Heavy Crossbow",
        "attackType": "далекобійна",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к10",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 4,
            "formula": "1к8",
            "damageType": "промениста",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к10) + 4 (1к8)",
        "damageType": "колюча"
      }
    ],
    "reactions": [
      {
        "id": "knight-parry",
        "nameUk": "Парирування",
        "nameOriginal": "Parry",
        "sourceText": "Тригер: істота отримує влучання кидком ближньої атаки, тримаючи зброю. Відповідь: істота додає 2 до свого КЗ проти цієї атаки, що може перетворити влучання на промах."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative",
        "reaction"
      ],
      "conditionSlugs": [
        "frightened"
      ],
      "itemSlugs": [
        "greatsword",
        "heavy-crossbow",
        "plate-armor"
      ]
    },
    "sourcePage": 302
  },
  {
    "entity": "monster",
    "slug": "archmage",
    "nameUk": "Архімаг",
    "nameOriginal": "Archmage",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "subtype": "чарівник",
    "alignment": "нейтральний",
    "armorClass": "17",
    "hitPoints": "170",
    "hitDice": "31к8 + 31",
    "initiative": {
      "modifier": "+7",
      "score": 17
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 20,
        "modifier": "+5",
        "save": "+9"
      },
      "wisdom": {
        "score": 15,
        "modifier": "+2",
        "save": "+6"
      },
      "charisma": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      }
    },
    "skills": {
      "Аркана": "+13",
      "Історія": "+9",
      "Сприйняття": "+6"
    },
    "immunities": [
      "психічна"
    ],
    "conditionImmunities": [
      "Зачарований (під дією Недоторканного розуму)"
    ],
    "gear": [
      {
        "nameUk": "Паличка"
      }
    ],
    "passivePerception": 16,
    "languages": [
      "Спільна та ще п’ять мов"
    ],
    "challengeRating": "12",
    "experiencePoints": 8000,
    "proficiencyBonus": "+4",
    "traits": [
      {
        "id": "archmage-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Архімаг має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      }
    ],
    "actions": [
      {
        "id": "archmage-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Архімаг виконує чотири атаки «Арканний сплеск»."
      },
      {
        "id": "archmage-arcane-burst",
        "nameUk": "Арканний сплеск",
        "nameOriginal": "Arcane Burst",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+9",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 27,
            "formula": "4к10 + 5",
            "damageType": "силова",
            "application": "on-hit"
          }
        ],
        "damage": "27 (4к10 + 5)",
        "damageType": "силова"
      }
    ],
    "bonusActions": [
      {
        "id": "archmage-misty-step",
        "nameUk": "Туманний крок",
        "nameOriginal": "Misty Step",
        "limitedUse": {
          "uses": 3,
          "period": "day"
        },
        "sourceText": "Архімаг накладає «Туманний крок», використовуючи ту саму заклинальну характеристику, що й для Накладання заклять."
      }
    ],
    "reactions": [
      {
        "id": "archmage-protective-magic",
        "nameUk": "Захисна магія",
        "nameOriginal": "Protective Magic",
        "limitedUse": {
          "uses": 3,
          "period": "day"
        },
        "sourceText": "У відповідь на тригер закляття архімаг накладає «Контрзакляття» або «Щит», використовуючи ту саму заклинальну характеристику, що й для Накладання заклять."
      }
    ],
    "spellcasting": {
      "ability": "Інтелект",
      "saveDc": "17",
      "groups": [
        {
          "mode": "at-will",
          "spells": [
            {
              "nameUk": "Виявлення магії",
              "slug": "detect-magic"
            },
            {
              "nameUk": "Виявлення думок",
              "slug": "detect-thoughts"
            },
            {
              "nameUk": "Маскування себе",
              "slug": "disguise-self"
            },
            {
              "nameUk": "Невидимість",
              "slug": "invisibility"
            },
            {
              "nameUk": "Світло",
              "slug": "light"
            },
            {
              "nameUk": "Обладунок мага",
              "slug": "mage-armor",
              "qualifier": "враховано в КЗ"
            },
            {
              "nameUk": "Рука мага",
              "slug": "mage-hand"
            },
            {
              "nameUk": "Спритність рук",
              "slug": "prestidigitation"
            }
          ]
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Політ",
              "slug": "fly"
            },
            {
              "nameUk": "Блискавка",
              "slug": "lightning-bolt",
              "castAtLevel": 7
            }
          ],
          "uses": 2,
          "each": true
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Конус холоду",
              "slug": "cone-of-cold",
              "castAtLevel": 9
            },
            {
              "nameUk": "Недоторканний розум",
              "slug": "mind-blank",
              "qualifier": "накладено до бою"
            },
            {
              "nameUk": "Спостереження",
              "slug": "scrying"
            },
            {
              "nameUk": "Телепортація",
              "slug": "teleport"
            }
          ],
          "uses": 1,
          "each": true
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Туманний крок",
              "slug": "misty-step"
            }
          ],
          "uses": 3,
          "label": "Бонусна дія · 3/день"
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Контрзакляття",
              "slug": "counterspell"
            },
            {
              "nameUk": "Щит",
              "slug": "shield"
            }
          ],
          "uses": 3,
          "label": "Реакція · 3/день"
        }
      ]
    },
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "initiative",
        "reaction",
        "spellcasting"
      ],
      "conditionSlugs": [
        "charmed"
      ],
      "spellSlugs": [
        "detect-magic",
        "detect-thoughts",
        "disguise-self",
        "invisibility",
        "light",
        "mage-armor",
        "mage-hand",
        "prestidigitation",
        "fly",
        "lightning-bolt",
        "cone-of-cold",
        "mind-blank",
        "scrying",
        "teleport",
        "misty-step",
        "counterspell",
        "shield"
      ]
    },
    "sourcePage": 305
  },
  {
    "entity": "monster",
    "slug": "noble",
    "nameUk": "Шляхтич",
    "nameOriginal": "Noble",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "15",
    "hitPoints": "9",
    "hitDice": "2к8",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      }
    },
    "skills": {
      "Обман": "+5",
      "Проникливість": "+4",
      "Переконання": "+5"
    },
    "gear": [
      {
        "nameUk": "Кіраса",
        "itemSlug": "breastplate"
      },
      {
        "nameUk": "Рапіра",
        "itemSlug": "rapier"
      }
    ],
    "passivePerception": 12,
    "languages": [
      "Спільна та ще дві мови"
    ],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "noble-rapier",
        "nameUk": "Рапіра",
        "nameOriginal": "Rapier",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к8 + 1",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к8 + 1)",
        "damageType": "колюча"
      }
    ],
    "reactions": [
      {
        "id": "noble-parry",
        "nameUk": "Парирування",
        "nameOriginal": "Parry",
        "sourceText": "Тригер: істота отримує влучання кидком ближньої атаки, тримаючи зброю. Відповідь: істота додає 2 до свого КЗ проти цієї атаки, що може перетворити влучання на промах."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "reaction"
      ],
      "itemSlugs": [
        "breastplate",
        "rapier"
      ]
    },
    "sourcePage": 312
  },
  {
    "entity": "monster",
    "slug": "pirate",
    "nameUk": "Пірат",
    "nameOriginal": "Pirate",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "14",
    "hitPoints": "33",
    "hitDice": "6к8 + 6",
    "initiative": {
      "modifier": "+5",
      "score": 15
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+5"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 14,
        "modifier": "+2",
        "save": "+4"
      }
    },
    "gear": [
      {
        "nameUk": "Кинджал",
        "quantity": 6,
        "itemSlug": "dagger"
      },
      {
        "nameUk": "Шкіряний обладунок",
        "itemSlug": "leather-armor"
      }
    ],
    "passivePerception": 11,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "pirate-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Пірат виконує дві атаки Кинджалом. Одну атаку він може замінити використанням Захопливої бравади."
      },
      {
        "id": "pirate-dagger",
        "nameUk": "Кинджал",
        "nameOriginal": "Dagger",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к4 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к4 + 3)",
        "damageType": "колюча"
      },
      {
        "id": "pirate-enthralling-panache",
        "nameUk": "Захоплива бравада",
        "nameOriginal": "Enthralling Panache",
        "target": "одна видима пірату істота в межах 30 фт",
        "savingThrow": {
          "ability": "wisdom",
          "dc": 12,
          "onFailure": "Ціль отримує стан Зачарований до початку наступного ходу пірата."
        },
        "sourceText": "Ціль виконує ряткидок Мудрості СК 12."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "charmed"
      ],
      "itemSlugs": [
        "dagger",
        "leather-armor"
      ]
    },
    "sourcePage": 314
  },
  {
    "entity": "monster",
    "slug": "pirate-captain",
    "nameUk": "Капітан піратів",
    "nameOriginal": "Pirate Captain",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "17",
    "hitPoints": "84",
    "hitDice": "13к8 + 26",
    "initiative": {
      "modifier": "+7",
      "score": 17
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+3"
      },
      "dexterity": {
        "score": 18,
        "modifier": "+4",
        "save": "+7"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+5"
      },
      "charisma": {
        "score": 17,
        "modifier": "+3",
        "save": "+6"
      }
    },
    "skills": {
      "Акробатика": "+7",
      "Сприйняття": "+5"
    },
    "gear": [
      {
        "nameUk": "Пістоль",
        "itemSlug": "pistol"
      },
      {
        "nameUk": "Рапіра",
        "itemSlug": "rapier"
      }
    ],
    "passivePerception": 15,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "6",
    "experiencePoints": 2300,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "pirate-captain-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Капітан піратів виконує три атаки, використовуючи Рапіру або Пістоль у будь-якому поєднанні."
      },
      {
        "id": "pirate-captain-rapier",
        "nameUk": "Рапіра",
        "nameOriginal": "Rapier",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к8 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к8 + 4)",
        "damageType": "колюча",
        "sourceText": "Пірат має Перевагу на наступний кидок атаки, який зробить до завершення цього ходу."
      },
      {
        "id": "pirate-captain-pistol",
        "nameUk": "Пістоль",
        "nameOriginal": "Pistol",
        "attackType": "далекобійна",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 15,
            "formula": "2к10 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "15 (2к10 + 4)",
        "damageType": "колюча"
      }
    ],
    "bonusActions": [
      {
        "id": "pirate-captain-captain-s-charm",
        "nameUk": "Чари капітана",
        "nameOriginal": "Captain’s Charm",
        "target": "одна видима пірату істота в межах 30 фт",
        "savingThrow": {
          "ability": "wisdom",
          "dc": 14,
          "onFailure": "Ціль отримує стан Зачарований до початку наступного ходу пірата."
        },
        "sourceText": "Ціль виконує ряткидок Мудрості СК 14."
      }
    ],
    "reactions": [
      {
        "id": "pirate-captain-riposte",
        "nameUk": "Рипост",
        "nameOriginal": "Riposte",
        "sourceText": "Тригер: пірат отримує влучання кидком ближньої атаки, тримаючи зброю. Відповідь: пірат додає 3 до свого КЗ проти цієї атаки, що може перетворити влучання на промах. У разі промаху пірат виконує одну атаку Рапірою проти істоти, яка спричинила реакцію, якщо вона в межах досяжності."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "armor-class",
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "reaction",
        "saving-throws"
      ],
      "conditionSlugs": [
        "charmed"
      ],
      "itemSlugs": [
        "pistol",
        "rapier"
      ]
    },
    "sourcePage": 314
  },
  {
    "entity": "monster",
    "slug": "priest-acolyte",
    "nameUk": "Священник-аколіт",
    "nameOriginal": "Priest Acolyte",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "subtype": "клірик",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Медицина": "+4",
      "Релігія": "+2"
    },
    "gear": [
      {
        "nameUk": "Кольчужна сорочка",
        "itemSlug": "chain-shirt"
      },
      {
        "nameUk": "Святий символ",
        "itemSlug": "holy-symbol"
      },
      {
        "nameUk": "Булава",
        "itemSlug": "mace"
      }
    ],
    "passivePerception": 12,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "priest-acolyte-mace",
        "nameUk": "Булава",
        "nameOriginal": "Mace",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к6 + 2",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 2,
            "formula": "1к4",
            "damageType": "промениста",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к6 + 2) + 2 (1к4)",
        "damageType": "дробильна"
      },
      {
        "id": "priest-acolyte-radiant-flame",
        "nameUk": "Променисте полум’я",
        "nameOriginal": "Radiant Flame",
        "attackType": "далекобійна",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "промениста",
            "application": "on-hit"
          }
        ],
        "damage": "7 (2к6)",
        "damageType": "промениста"
      }
    ],
    "bonusActions": [
      {
        "id": "priest-acolyte-divine-aid",
        "nameUk": "Божественна допомога",
        "nameOriginal": "Divine Aid",
        "limitedUse": {
          "uses": 1,
          "period": "day"
        },
        "sourceText": "Священник накладає одне із заклять, указаних у відповідній групі Божественної допомоги, використовуючи ту саму заклинальну характеристику, що й для Накладання заклять."
      }
    ],
    "spellcasting": {
      "ability": "Мудрість",
      "groups": [
        {
          "mode": "at-will",
          "spells": [
            {
              "nameUk": "Світло",
              "slug": "light"
            },
            {
              "nameUk": "Чудотворство",
              "slug": "thaumaturgy"
            }
          ]
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Благословення",
              "slug": "bless"
            },
            {
              "nameUk": "Цілюще слово",
              "slug": "healing-word"
            },
            {
              "nameUk": "Святилище",
              "slug": "sanctuary"
            }
          ],
          "uses": 1,
          "label": "Бонусна дія · 1/день"
        }
      ]
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "initiative",
        "spellcasting"
      ],
      "itemSlugs": [
        "chain-shirt",
        "holy-symbol",
        "mace"
      ],
      "spellSlugs": [
        "light",
        "thaumaturgy",
        "bless",
        "healing-word",
        "sanctuary"
      ]
    },
    "sourcePage": 316
  },
  {
    "entity": "monster",
    "slug": "priest",
    "nameUk": "Священник",
    "nameOriginal": "Priest",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "subtype": "клірик",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "38",
    "hitDice": "7к8 + 7",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "wisdom": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "charisma": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "skills": {
      "Медицина": "+7",
      "Сприйняття": "+5",
      "Релігія": "+5"
    },
    "gear": [
      {
        "nameUk": "Кольчужна сорочка",
        "itemSlug": "chain-shirt"
      },
      {
        "nameUk": "Святий символ",
        "itemSlug": "holy-symbol"
      },
      {
        "nameUk": "Булава",
        "itemSlug": "mace"
      }
    ],
    "passivePerception": 15,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "priest-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Священник виконує дві атаки, використовуючи Булаву або Променисте полум’я у будь-якому поєднанні."
      },
      {
        "id": "priest-mace",
        "nameUk": "Булава",
        "nameOriginal": "Mace",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к6 + 3",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 5,
            "formula": "2к4",
            "damageType": "промениста",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к6 + 3) + 5 (2к4)",
        "damageType": "дробильна"
      },
      {
        "id": "priest-radiant-flame",
        "nameUk": "Променисте полум’я",
        "nameOriginal": "Radiant Flame",
        "attackType": "далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к10",
            "damageType": "промениста",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к10)",
        "damageType": "промениста"
      }
    ],
    "bonusActions": [
      {
        "id": "priest-divine-aid",
        "nameUk": "Божественна допомога",
        "nameOriginal": "Divine Aid",
        "limitedUse": {
          "uses": 3,
          "period": "day"
        },
        "sourceText": "Священник накладає одне із заклять, указаних у відповідній групі Божественної допомоги, використовуючи ту саму заклинальну характеристику, що й для Накладання заклять."
      }
    ],
    "spellcasting": {
      "ability": "Мудрість",
      "saveDc": "13",
      "groups": [
        {
          "mode": "at-will",
          "spells": [
            {
              "nameUk": "Світло",
              "slug": "light"
            },
            {
              "nameUk": "Чудотворство",
              "slug": "thaumaturgy"
            }
          ]
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Духи-охоронці",
              "slug": "spirit-guardians"
            }
          ],
          "uses": 1
        },
        {
          "mode": "daily",
          "spells": [
            {
              "nameUk": "Благословення",
              "slug": "bless"
            },
            {
              "nameUk": "Розсіювання магії",
              "slug": "dispel-magic"
            },
            {
              "nameUk": "Цілюще слово",
              "slug": "healing-word"
            },
            {
              "nameUk": "Мале відновлення",
              "slug": "lesser-restoration"
            }
          ],
          "uses": 3,
          "label": "Бонусна дія · 3/день"
        }
      ]
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "initiative",
        "spellcasting"
      ],
      "itemSlugs": [
        "chain-shirt",
        "holy-symbol",
        "mace"
      ],
      "spellSlugs": [
        "light",
        "thaumaturgy",
        "spirit-guardians",
        "bless",
        "dispel-magic",
        "healing-word",
        "lesser-restoration"
      ]
    },
    "sourcePage": 316
  },
  {
    "entity": "monster",
    "slug": "scout",
    "nameUk": "Розвідник",
    "nameOriginal": "Scout",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "16",
    "hitDice": "3к8 + 3",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Природа": "+4",
      "Сприйняття": "+5",
      "Скритність": "+6",
      "Виживання": "+5"
    },
    "gear": [
      {
        "nameUk": "Шкіряний обладунок",
        "itemSlug": "leather-armor"
      },
      {
        "nameUk": "Довгий лук",
        "itemSlug": "longbow"
      },
      {
        "nameUk": "Короткий меч",
        "itemSlug": "shortsword"
      }
    ],
    "passivePerception": 15,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "scout-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Розвідник виконує дві атаки, використовуючи Короткий меч або Довгий лук у будь-якому поєднанні."
      },
      {
        "id": "scout-shortsword",
        "nameUk": "Короткий меч",
        "nameOriginal": "Shortsword",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к6 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к6 + 2)",
        "damageType": "колюча"
      },
      {
        "id": "scout-longbow",
        "nameUk": "Довгий лук",
        "nameOriginal": "Longbow",
        "attackType": "далекобійна",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к8 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к8 + 2)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "itemSlugs": [
        "leather-armor",
        "longbow",
        "shortsword"
      ]
    },
    "sourcePage": 322
  },
  {
    "entity": "monster",
    "slug": "spy",
    "nameUk": "Шпигун",
    "nameOriginal": "Spy",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "12",
    "hitPoints": "27",
    "hitDice": "6к8",
    "initiative": {
      "modifier": "+4",
      "score": 14
    },
    "speed": [
      "30 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      }
    },
    "skills": {
      "Обман": "+5",
      "Проникливість": "+4",
      "Розслідування": "+5",
      "Сприйняття": "+6",
      "Спритність рук": "+4",
      "Скритність": "+6"
    },
    "gear": [
      {
        "nameUk": "Ручний арбалет",
        "itemSlug": "hand-crossbow"
      },
      {
        "nameUk": "Короткий меч",
        "itemSlug": "shortsword"
      },
      {
        "nameUk": "Злодійські інструменти",
        "itemSlug": "thieves-tools"
      }
    ],
    "passivePerception": 16,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "spy-shortsword",
        "nameUk": "Короткий меч",
        "nameOriginal": "Shortsword",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к6 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к6 + 2) + 7 (2к6)",
        "damageType": "колюча"
      },
      {
        "id": "spy-hand-crossbow",
        "nameUk": "Ручний арбалет",
        "nameOriginal": "Hand Crossbow",
        "attackType": "далекобійна",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к6 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к6 + 2) + 7 (2к6)",
        "damageType": "колюча"
      }
    ],
    "bonusActions": [
      {
        "id": "spy-cunning-action",
        "nameUk": "Хитра дія",
        "nameOriginal": "Cunning Action",
        "sourceText": "Істота виконує дію Ривок, Відхід або Сховатися."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "dash",
        "disengage",
        "hide",
        "initiative"
      ],
      "itemSlugs": [
        "hand-crossbow",
        "shortsword",
        "thieves-tools"
      ]
    },
    "sourcePage": 329
  },
  {
    "entity": "monster",
    "slug": "tough",
    "nameUk": "Громила",
    "nameOriginal": "Tough",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "12",
    "hitPoints": "32",
    "hitDice": "5к8 + 10",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "gear": [
      {
        "nameUk": "Важкий арбалет",
        "itemSlug": "heavy-crossbow"
      },
      {
        "nameUk": "Шкіряний обладунок",
        "itemSlug": "leather-armor"
      },
      {
        "nameUk": "Булава",
        "itemSlug": "mace"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "tough-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Громила має Перевагу на кидок атаки проти істоти, якщо принаймні один союзник громила перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      }
    ],
    "actions": [
      {
        "id": "tough-mace",
        "nameUk": "Булава",
        "nameOriginal": "Mace",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к6 + 2",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к6 + 2)",
        "damageType": "дробильна"
      },
      {
        "id": "tough-heavy-crossbow",
        "nameUk": "Важкий арбалет",
        "nameOriginal": "Heavy Crossbow",
        "attackType": "далекобійна",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к10 + 1",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к10 + 1)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "incapacitated"
      ],
      "itemSlugs": [
        "heavy-crossbow",
        "leather-armor",
        "mace"
      ]
    },
    "sourcePage": 332
  },
  {
    "entity": "monster",
    "slug": "tough-boss",
    "nameUk": "Ватажок громил",
    "nameOriginal": "Tough Boss",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "16",
    "hitPoints": "82",
    "hitDice": "11к8 + 33",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+5"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+5"
      },
      "intelligence": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 11,
        "modifier": "+0",
        "save": "+2"
      }
    },
    "gear": [
      {
        "nameUk": "Кольчуга",
        "itemSlug": "chain-mail"
      },
      {
        "nameUk": "Важкий арбалет",
        "itemSlug": "heavy-crossbow"
      },
      {
        "nameUk": "Бойовий молот",
        "itemSlug": "warhammer"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "tough-boss-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Громила має Перевагу на кидок атаки проти істоти, якщо принаймні один союзник громила перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      }
    ],
    "actions": [
      {
        "id": "tough-boss-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Ватажок громил виконує дві атаки, використовуючи Бойовий молот або Важкий арбалет у будь-якому поєднанні."
      },
      {
        "id": "tough-boss-warhammer",
        "nameUk": "Бойовий молот",
        "nameOriginal": "Warhammer",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 12,
            "formula": "2к8 + 3",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "12 (2к8 + 3)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір, громила штовхає її на відстань до 10 футів прямо від себе."
      },
      {
        "id": "tough-boss-heavy-crossbow",
        "nameUk": "Важкий арбалет",
        "nameOriginal": "Heavy Crossbow",
        "attackType": "далекобійна",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к10 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к10 + 2)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "incapacitated"
      ],
      "itemSlugs": [
        "chain-mail",
        "heavy-crossbow",
        "warhammer"
      ]
    },
    "sourcePage": 332
  },
  {
    "entity": "monster",
    "slug": "vampire-familiar",
    "nameUk": "Фамільяр вампіра",
    "nameOriginal": "Vampire Familiar",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтрально-злий",
    "armorClass": "15",
    "hitPoints": "65",
    "hitDice": "10к8 + 20",
    "initiative": {
      "modifier": "+5",
      "score": 15
    },
    "speed": [
      "30 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+5"
      },
      "constitution": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+2"
      },
      "charisma": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      }
    },
    "skills": {
      "Сприйняття": "+4",
      "Переконання": "+4",
      "Скритність": "+7"
    },
    "resistances": [
      "некротична"
    ],
    "conditionImmunities": [
      "Зачарований (крім впливу господаря-вампіра)"
    ],
    "gear": [
      {
        "nameUk": "Кинджал",
        "quantity": 10,
        "itemSlug": "dagger"
      }
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 14,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "vampire-familiar-vampiric-connection",
        "nameUk": "Вампірський зв’язок",
        "nameOriginal": "Vampiric Connection",
        "sourceText": "Поки фамільяр і його господар-вампір перебувають на одному плані існування, вампір може телепатично спілкуватися з фамільяром і сприймати світ через його чуття."
      }
    ],
    "actions": [
      {
        "id": "vampire-familiar-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Фамільяр виконує дві атаки Тіньовим кинджалом."
      },
      {
        "id": "vampire-familiar-umbral-dagger",
        "nameUk": "Тіньовий кинджал",
        "nameOriginal": "Umbral Dagger",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к4 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "3к4",
            "damageType": "некротична",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к4 + 3) + 7 (3к4)",
        "damageType": "колюча",
        "sourceText": "Якщо ця атака зменшує хіти цілі до 0, ціль стає Стабільною, але отримує стан Отруєний на 1 годину. Поки ціль має стан Отруєний, вона також має стан Паралізований."
      }
    ],
    "bonusActions": [
      {
        "id": "vampire-familiar-deathless-agility",
        "nameUk": "Невмируща спритність",
        "nameOriginal": "Deathless Agility",
        "sourceText": "Фамільяр виконує дію Ривок або Відхід."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "dash",
        "disengage",
        "hit-points",
        "initiative",
        "resistance"
      ],
      "conditionSlugs": [
        "charmed",
        "paralyzed",
        "poisoned"
      ],
      "itemSlugs": [
        "dagger"
      ]
    },
    "sourcePage": 334
  },
  {
    "entity": "monster",
    "slug": "warrior-infantry",
    "nameUk": "Воїн-піхотинець",
    "nameOriginal": "Warrior Infantry",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "9",
    "hitDice": "2к8",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "gear": [
      {
        "nameUk": "Кольчужна сорочка",
        "itemSlug": "chain-shirt"
      },
      {
        "nameUk": "Спис",
        "itemSlug": "spear"
      }
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "warrior-infantry-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Воїн має Перевагу на кидок атаки проти істоти, якщо принаймні один союзник воїн перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      }
    ],
    "actions": [
      {
        "id": "warrior-infantry-spear",
        "nameUk": "Спис",
        "nameOriginal": "Spear",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+3",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 4,
            "formula": "1к6 + 1",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "4 (1к6 + 1)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "incapacitated"
      ],
      "itemSlugs": [
        "chain-shirt",
        "spear"
      ]
    },
    "sourcePage": 336
  },
  {
    "entity": "monster",
    "slug": "warrior-veteran",
    "nameUk": "Воїн-ветеран",
    "nameOriginal": "Warrior Veteran",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Гуманоїд",
    "alignment": "нейтральний",
    "armorClass": "17",
    "hitPoints": "65",
    "hitDice": "10к8 + 20",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Атлетика": "+5",
      "Сприйняття": "+2"
    },
    "gear": [
      {
        "nameUk": "Дворучний меч",
        "itemSlug": "greatsword"
      },
      {
        "nameUk": "Важкий арбалет",
        "itemSlug": "heavy-crossbow"
      },
      {
        "nameUk": "Ламелярний обладунок",
        "itemSlug": "splint-armor"
      }
    ],
    "passivePerception": 12,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "warrior-veteran-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Воїн виконує дві атаки Дворучним мечем або Важким арбалетом."
      },
      {
        "id": "warrior-veteran-greatsword",
        "nameUk": "Дворучний меч",
        "nameOriginal": "Greatsword",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "formula": "2к6 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "10 (2к6 + 3)",
        "damageType": "рубальна"
      },
      {
        "id": "warrior-veteran-heavy-crossbow",
        "nameUk": "Важкий арбалет",
        "nameOriginal": "Heavy Crossbow",
        "attackType": "далекобійна",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 12,
            "formula": "2к10 + 1",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "12 (2к10 + 1)",
        "damageType": "колюча"
      }
    ],
    "reactions": [
      {
        "id": "warrior-veteran-parry",
        "nameUk": "Парирування",
        "nameOriginal": "Parry",
        "sourceText": "Тригер: істота отримує влучання кидком ближньої атаки, тримаючи зброю. Відповідь: істота додає 2 до свого КЗ проти цієї атаки, що може перетворити влучання на промах."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "reaction"
      ],
      "itemSlugs": [
        "greatsword",
        "heavy-crossbow",
        "splint-armor"
      ]
    },
    "sourcePage": 337
  }
];
