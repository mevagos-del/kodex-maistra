import { SRD_52_SOURCE } from '../source';
import type { OfficialMonsterEntry } from '../types';

export const officialElementalsConstructsOozesPlants: OfficialMonsterEntry[] = [
  {
    "entity": "monster",
    "slug": "air-elemental",
    "nameUk": "Повітряний елементаль",
    "nameOriginal": "Air Elemental",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "15",
    "hitPoints": "90",
    "hitDice": "12к10 + 24",
    "initiative": {
      "modifier": "+5",
      "score": 15
    },
    "speed": [
      "10 фт",
      "політ 90 фт (зависання)"
    ],
    "abilities": {
      "strength": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "resistances": [
      "дробильна",
      "блискавична",
      "колюча",
      "рубальна"
    ],
    "immunities": [
      "отруйна",
      "громова"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Схоплений",
      "Паралізований",
      "Скам’янілий",
      "Отруєний",
      "Збитий з ніг",
      "Стримуваний",
      "Непритомний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Ауран)"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "air-elemental-air-form",
        "nameUk": "Повітряна форма",
        "nameOriginal": "Air Form",
        "sourceText": "Істота може входити в простір іншої істоти й зупинятися там. Вона може проходити крізь простір завширшки лише 1 дюйм, не витрачаючи додаткового переміщення."
      }
    ],
    "actions": [
      {
        "id": "air-elemental-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Елементаль виконує дві атаки Громовим ударом."
      },
      {
        "id": "air-elemental-thunderous-slam",
        "nameUk": "Громовий удар",
        "nameOriginal": "Thunderous Slam",
        "attackType": "ближня",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 14,
            "formula": "2к8 + 5",
            "damageType": "громова",
            "application": "on-hit"
          }
        ],
        "damage": "14 (2к8 + 5)",
        "damageType": "громова"
      },
      {
        "id": "air-elemental-whirlwind",
        "nameUk": "Смерч",
        "nameOriginal": "Whirlwind",
        "target": "одна Середня або менша істота в просторі елементаля",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 4,
          "maximum": 6
        },
        "damageInstances": [
          {
            "average": 24,
            "damageType": "громова",
            "application": "failed-save",
            "formula": "4к10 + 2"
          }
        ],
        "savingThrow": {
          "ability": "strength",
          "dc": 13,
          "onFailure": "Повна шкода; ціль відштовхується на відстань до 20 футів і отримує стан Збитий з ніг.",
          "onSuccess": "Половина шкоди без додаткових ефектів."
        },
        "sourceText": "Ціль виконує ряткидок Сили СК 13."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "resistance",
        "saving-throws"
      ],
      "conditionSlugs": [
        "exhaustion",
        "grappled",
        "paralyzed",
        "petrified",
        "poisoned",
        "prone",
        "restrained",
        "unconscious"
      ]
    },
    "sourcePage": 258
  },
  {
    "entity": "monster",
    "slug": "animated-armor",
    "nameUk": "Оживлений обладунок",
    "nameOriginal": "Animated Armor",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "18",
    "hitPoints": "33",
    "hitDice": "6к8 + 6",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "25 фт"
    ],
    "abilities": {
      "strength": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "immunities": [
      "отруйна",
      "психічна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Оглухлий",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 6,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "animated-armor-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Обладунок виконує дві атаки Ударом."
      },
      {
        "id": "animated-armor-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
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
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "paralyzed",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 259
  },
  {
    "entity": "monster",
    "slug": "animated-flying-sword",
    "nameUk": "Оживлений летючий меч",
    "nameOriginal": "Animated Flying Sword",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "17",
    "hitPoints": "14",
    "hitDice": "4к6",
    "initiative": {
      "modifier": "+4",
      "score": 14
    },
    "speed": [
      "5 фт",
      "політ 50 фт (зависання)"
    ],
    "abilities": {
      "strength": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+4"
      },
      "constitution": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "immunities": [
      "отруйна",
      "психічна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Оглухлий",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 7,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "animated-flying-sword-slash",
        "nameUk": "Рубаючий удар",
        "nameOriginal": "Slash",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к8 + 2",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к8 + 2)",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "paralyzed",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 259
  },
  {
    "entity": "monster",
    "slug": "animated-rug-of-smothering",
    "nameUk": "Оживлений килим-душитель",
    "nameOriginal": "Animated Rug of Smothering",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "27",
    "hitDice": "5к10",
    "initiative": {
      "modifier": "+4",
      "score": 14
    },
    "speed": [
      "10 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "immunities": [
      "отруйна",
      "психічна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Оглухлий",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 6,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "animated-rug-of-smothering-smother",
        "nameUk": "Задушення",
        "nameOriginal": "Smother",
        "target": "одна ціль",
        "sourceText": "Килим виконує кидок ближньої атаки +5 з досяжністю 5 футів. При влучанні ціль отримує 10 (2к6 + 3) дробильної шкоди. Якщо ціль Середня або менша, килим може замість шкоди надати їй стан Схоплений (втеча СК 13). До завершення захоплення ціль має стани Засліплений і Стримуваний, задихається та отримує 10 (2к6 + 3) дробильної шкоди на початку кожного свого ходу. Килим може душити лише одну істоту; під час захоплення не може використовувати цю дію, ділить отриману шкоду навпіл з округленням донизу, а ціль отримує стільки ж шкоди.",
        "attackType": "ближня",
        "attackBonus": "+5",
        "reach": "5 фт",
        "damage": "10 (2к6 + 3)",
        "damageType": "дробильна",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к6 + 3"
          },
          {
            "average": 10,
            "damageType": "дробильна",
            "application": "start-of-turn",
            "formula": "2к6 + 3"
          }
        ]
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "blinded",
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "grappled",
        "paralyzed",
        "petrified",
        "poisoned",
        "restrained"
      ]
    },
    "sourcePage": 259
  },
  {
    "entity": "monster",
    "slug": "awakened-shrub",
    "nameUk": "Пробуджений кущ",
    "nameOriginal": "Awakened Shrub",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Рослина",
    "alignment": "нейтральний",
    "armorClass": "9",
    "hitPoints": "10",
    "hitDice": "3к6",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 11,
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
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "vulnerabilities": [
      "вогняна"
    ],
    "resistances": [
      "колюча"
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "awakened-shrub-rake",
        "nameUk": "Шкрябання",
        "nameOriginal": "Rake",
        "attackType": "ближня",
        "attackBonus": "+1",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "1",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "resistance"
      ]
    },
    "sourcePage": 260
  },
  {
    "entity": "monster",
    "slug": "awakened-tree",
    "nameUk": "Пробуджене дерево",
    "nameOriginal": "Awakened Tree",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Рослина",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "59",
    "hitDice": "7к12 + 14",
    "initiative": {
      "modifier": "−2",
      "score": 8
    },
    "speed": [
      "20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
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
        "save": "+0"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "vulnerabilities": [
      "вогняна"
    ],
    "resistances": [
      "дробильна",
      "колюча"
    ],
    "passivePerception": 10,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "awakened-tree-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 14,
            "formula": "3к6 + 4",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "14 (3к6 + 4)",
        "damageType": "дробильна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "resistance"
      ]
    },
    "sourcePage": 260
  },
  {
    "entity": "monster",
    "slug": "azer-sentinel",
    "nameUk": "Азер-вартовий",
    "nameOriginal": "Azer Sentinel",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Елементаль",
    "alignment": "законно-нейтральний",
    "armorClass": "17",
    "hitPoints": "39",
    "hitDice": "6к8 + 12",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 15,
        "modifier": "+2",
        "save": "+4"
      },
      "intelligence": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "immunities": [
      "вогняна",
      "отруйна"
    ],
    "conditionImmunities": [
      "Отруєний"
    ],
    "passivePerception": 11,
    "languages": [
      "Первісна (Ігнан)"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "azer-sentinel-fire-aura",
        "nameUk": "Вогняна аура",
        "nameOriginal": "Fire Aura",
        "sourceText": "Наприкінці кожного ходу азера кожна обрана ним істота в 5-футовій еманації від азера отримує 5 (1к10) вогняної шкоди, якщо азер не має стану Недієздатний."
      },
      {
        "id": "azer-sentinel-illumination",
        "nameUk": "Світіння",
        "nameOriginal": "Illumination",
        "sourceText": "Істота випромінює Яскраве світло в радіусі 10 футів і Тьмяне світло ще на 10 футів."
      }
    ],
    "actions": [
      {
        "id": "azer-sentinel-burning-hammer",
        "nameUk": "Палаючий молот",
        "nameOriginal": "Burning Hammer",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "formula": "1к10 + 3",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 3,
            "formula": "1к6",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "8 (1к10 + 3) + 3 (1к6)",
        "damageType": "дробильна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "incapacitated",
        "poisoned"
      ]
    },
    "sourcePage": 261
  },
  {
    "entity": "monster",
    "slug": "black-pudding",
    "nameUk": "Чорний пудинг",
    "nameOriginal": "Black Pudding",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Слиз",
    "alignment": "без світогляду",
    "armorClass": "7",
    "hitPoints": "68",
    "hitDice": "8к10 + 24",
    "initiative": {
      "modifier": "−3",
      "score": 7
    },
    "speed": [
      "20 фт",
      "лазіння 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "immunities": [
      "кислотна",
      "холодна",
      "блискавична",
      "рубальна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Оглухлий",
      "Виснаження",
      "Наляканий",
      "Схоплений",
      "Збитий з ніг",
      "Стримуваний"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "black-pudding-amorphous",
        "nameUk": "Аморфність",
        "nameOriginal": "Amorphous",
        "sourceText": "Істота може проходити крізь простір завширшки лише 1 дюйм, не витрачаючи додаткового переміщення."
      },
      {
        "id": "black-pudding-corrosive-form",
        "nameUk": "Корозійна форма",
        "nameOriginal": "Corrosive Form",
        "sourceText": "Істота, яка влучає по пудингу кидком ближньої атаки, отримує 4 (1к8) кислотної шкоди. Немагічні боєприпаси знищуються після влучання. Немагічна зброя після контакту отримує накопичувальний штраф −1 до кидків атаки й знищується при штрафі −5; «Лагодження» усуває штраф. За 1 хвилину пудинг проїдає 2 фути немагічного дерева або металу."
      },
      {
        "id": "black-pudding-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      }
    ],
    "actions": [
      {
        "id": "black-pudding-dissolving-pseudopod",
        "nameUk": "Розчинна псевдоподія",
        "nameOriginal": "Dissolving Pseudopod",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 17,
            "formula": "4к6 + 3",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "17 (4к6 + 3)",
        "damageType": "кислотна",
        "sourceText": "Немагічний обладунок цілі отримує штраф −1 до наданого КЗ. Обладунок знищується, якщо штраф зменшує його КЗ до 10. «Лагодження» усуває штраф."
      }
    ],
    "reactions": [
      {
        "id": "black-pudding-split",
        "nameUk": "Розділення",
        "nameOriginal": "Split",
        "sourceText": "Тригер: істота Велика або Середня, має щонайменше 10 хітів і стає Закривавленою або зазнає блискавичної чи рубальної шкоди. Відповідь: вона розділяється на два нові Чорні пудинги. Кожна нова істота на один розмір менша, діє за тією самою Ініціативою й отримує половину хітів оригіналу з округленням донизу."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "hit-points",
        "initiative",
        "reaction"
      ],
      "conditionSlugs": [
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "grappled",
        "prone",
        "restrained"
      ],
      "spellSlugs": [
        "mending"
      ]
    },
    "sourcePage": 265
  },
  {
    "entity": "monster",
    "slug": "clay-golem",
    "nameUk": "Глиняний голем",
    "nameOriginal": "Clay Golem",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "123",
    "hitDice": "13к10 + 52",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "dexterity": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "intelligence": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "resistances": [
      "дробильна",
      "колюча",
      "рубальна"
    ],
    "immunities": [
      "кислотна",
      "отруйна",
      "психічна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 9,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "9",
    "experiencePoints": 5000,
    "proficiencyBonus": "+4",
    "traits": [
      {
        "id": "clay-golem-acid-absorption",
        "nameUk": "Поглинання кислоти",
        "nameOriginal": "Acid Absorption",
        "sourceText": "Коли істота мала б отримати кислотної шкоди, вона не отримує її, а натомість відновлює кількість хітів, що дорівнює завданій шкоді."
      },
      {
        "id": "clay-golem-berserk",
        "nameUk": "Берсерк",
        "nameOriginal": "Berserk",
        "sourceText": "Щоразу, коли голем починає хід Закривавленим, киньте 1к6. На 6 голем впадає в лють. Під час кожного ходу в люті він атакує найближчу видиму істоту, а якщо не може дістатися істоти й атакувати її — атакує предмет. Лють триває, доки голема не знищено або він більше не Закривавлений."
      },
      {
        "id": "clay-golem-immutable-form",
        "nameUk": "Незмінна форма",
        "nameOriginal": "Immutable Form",
        "sourceText": "Голем не може змінювати форму."
      },
      {
        "id": "clay-golem-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Істота має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      }
    ],
    "actions": [
      {
        "id": "clay-golem-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Голем виконує дві атаки Ударом або три атаки Ударом, якщо цього ходу використав Прискорення."
      },
      {
        "id": "clay-golem-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+9",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "formula": "1к10 + 5",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 6,
            "formula": "1к12",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "10 (1к10 + 5) + 6 (1к12)",
        "damageType": "дробильна",
        "sourceText": "Максимум хітів цілі зменшується на величину отриманої кислотної шкоди."
      }
    ],
    "bonusActions": [
      {
        "id": "clay-golem-hasten",
        "nameUk": "Прискорення",
        "nameOriginal": "Hasten",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "sourceText": "Голем виконує дії Ривок і Відхід."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "dash",
        "disengage",
        "healing",
        "hit-points",
        "initiative",
        "resistance"
      ],
      "conditionSlugs": [
        "charmed",
        "exhaustion",
        "frightened",
        "paralyzed",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 274
  },
  {
    "entity": "monster",
    "slug": "djinni",
    "nameUk": "Джин",
    "nameOriginal": "Djinni",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "17",
    "hitPoints": "218",
    "hitDice": "19к10 + 114",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "політ 90 фт (зависання)"
    ],
    "abilities": {
      "strength": {
        "score": 21,
        "modifier": "+5",
        "save": "+5"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+6"
      },
      "constitution": {
        "score": 22,
        "modifier": "+6",
        "save": "+6"
      },
      "intelligence": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "wisdom": {
        "score": 16,
        "modifier": "+3",
        "save": "+7"
      },
      "charisma": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      }
    },
    "subtype": "геній",
    "immunities": [
      "блискавична",
      "громова"
    ],
    "senses": [
      "Темний зір 120 фт"
    ],
    "passivePerception": 13,
    "languages": [
      "Первісна (Ауран)"
    ],
    "challengeRating": "11",
    "experiencePoints": 7200,
    "proficiencyBonus": "+4",
    "traits": [
      {
        "id": "djinni-elemental-restoration",
        "nameUk": "Стихійне відновлення",
        "nameOriginal": "Elemental Restoration",
        "sourceText": "Якщо істота помирає поза Стихійним планом Повітря, її тіло розчиняється в туман, а через 1к4 днів вона отримує нове тіло й відроджується з усіма хітами десь на цьому плані."
      },
      {
        "id": "djinni-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Істота має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      },
      {
        "id": "djinni-wishes",
        "nameUk": "Бажання",
        "nameOriginal": "Wishes",
        "sourceText": "Істота має 30-відсотковий шанс знати закляття «Бажання». Якщо знає, то може накласти його лише від імені істоти, яка не є генієм і повідомила бажання зрозумілим способом. Істота не зазнає напруження від цього закляття. Після трьох накладань вона не може накладати його знову протягом 365 днів."
      }
    ],
    "actions": [
      {
        "id": "djinni-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Джин виконує три атаки, використовуючи Буревійне лезо або Буревійний заряд у будь-якому поєднанні."
      },
      {
        "id": "djinni-storm-blade",
        "nameUk": "Буревійне лезо",
        "nameOriginal": "Storm Blade",
        "attackType": "ближня",
        "attackBonus": "+9",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 12,
            "formula": "2к6 + 5",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "блискавична",
            "application": "on-hit"
          }
        ],
        "damage": "12 (2к6 + 5) + 7 (2к6)",
        "damageType": "рубальна"
      },
      {
        "id": "djinni-storm-bolt",
        "nameUk": "Буревійний заряд",
        "nameOriginal": "Storm Bolt",
        "attackType": "далекобійна",
        "attackBonus": "+9",
        "target": "одна ціль",
        "range": "120 фт",
        "damageInstances": [
          {
            "average": 13,
            "formula": "3к8",
            "damageType": "громова",
            "application": "on-hit"
          }
        ],
        "damage": "13 (3к8)",
        "damageType": "громова",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Збитий з ніг."
      },
      {
        "id": "djinni-create-whirlwind",
        "nameUk": "Створення вихору",
        "nameOriginal": "Create Whirlwind",
        "target": "точка в межах 120 фт; циліндр радіусом 20 фт і заввишки 60 фт",
        "damageInstances": [
          {
            "average": 21,
            "damageType": "громова",
            "application": "start-of-turn",
            "formula": "6к6"
          }
        ],
        "savingThrow": {
          "ability": "strength",
          "dc": 17,
          "onFailure": "У вихорі ціль має стан Стримуваний і рухається разом із ним.",
          "repeat": {
            "timing": "наприкінці кожного свого ходу",
            "endsEffectOnSuccess": true
          }
        },
        "sourceText": "Джин створює вихор, що триває, доки не завершиться його Концентрація. На початку кожного свого ходу джин може перемістити вихор на 20 футів. Істота виконує цей ряткидок не частіше одного разу за хід, коли вихор входить у її простір або вона входить у вихор. Джин не зазнає ефекту. Стримувана ціль отримує 21 (6к6) громової шкоди на початку кожного свого ходу й повторює ряткидок наприкінці ходу, завершуючи ефект при успіху."
      }
    ],
    "spellcasting": {
      "ability": "Харизма",
      "saveDc": "17",
      "groups": [
        {
          "mode": "at-will",
          "spells": [
            {
              "nameUk": "Виявлення зла й добра",
              "slug": "detect-evil-and-good"
            },
            {
              "nameUk": "Виявлення магії",
              "slug": "detect-magic"
            }
          ]
        },
        {
          "mode": "daily",
          "uses": 2,
          "each": true,
          "spells": [
            {
              "nameUk": "Створення їжі та води",
              "slug": "create-food-and-water",
              "qualifier": "може створювати вино замість води"
            },
            {
              "nameUk": "Мови",
              "slug": "tongues"
            },
            {
              "nameUk": "Ходіння вітром",
              "slug": "wind-walk"
            }
          ]
        },
        {
          "mode": "daily",
          "uses": 1,
          "each": true,
          "spells": [
            {
              "nameUk": "Створення",
              "slug": "creation"
            },
            {
              "nameUk": "Газоподібна форма",
              "slug": "gaseous-form"
            },
            {
              "nameUk": "Невидимість",
              "slug": "invisibility"
            },
            {
              "nameUk": "Великий образ",
              "slug": "major-image"
            },
            {
              "nameUk": "Перехід між планами",
              "slug": "plane-shift"
            }
          ]
        }
      ],
      "notes": "Джин накладає одне з наведених заклять без Матеріальних компонентів."
    },
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "concentration",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "saving-throws",
        "spellcasting"
      ],
      "conditionSlugs": [
        "prone",
        "restrained"
      ],
      "spellSlugs": [
        "create-food-and-water",
        "creation",
        "detect-evil-and-good",
        "detect-magic",
        "gaseous-form",
        "invisibility",
        "major-image",
        "plane-shift",
        "tongues",
        "wind-walk",
        "wish"
      ]
    },
    "sourcePage": 280
  },
  {
    "entity": "monster",
    "slug": "earth-elemental",
    "nameUk": "Земляний елементаль",
    "nameOriginal": "Earth Elemental",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "17",
    "hitPoints": "147",
    "hitDice": "14к10 + 70",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "30 фт",
      "копання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "dexterity": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "intelligence": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "vulnerabilities": [
      "громова"
    ],
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Паралізований",
      "Скам’янілий",
      "Отруєний",
      "Непритомний"
    ],
    "senses": [
      "Темний зір 60 фт",
      "Треморочуття 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Терран)"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "earth-elemental-earth-glide",
        "nameUk": "Ковзання крізь землю",
        "nameOriginal": "Earth Glide",
        "sourceText": "Істота може прокопуватися крізь немагічні необроблені землю й камінь. Під час такого руху вона не порушує матеріал, крізь який проходить."
      },
      {
        "id": "earth-elemental-siege-monster",
        "nameUk": "Облогове чудовисько",
        "nameOriginal": "Siege Monster",
        "sourceText": "Істота завдає подвійної шкоди предметам і спорудам."
      }
    ],
    "actions": [
      {
        "id": "earth-elemental-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Елементаль виконує дві атаки, використовуючи Удар або Метання каменя у будь-якому поєднанні."
      },
      {
        "id": "earth-elemental-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 14,
            "formula": "2к8 + 5",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "14 (2к8 + 5)",
        "damageType": "дробильна"
      },
      {
        "id": "earth-elemental-rock-launch",
        "nameUk": "Метання каменя",
        "nameOriginal": "Rock Launch",
        "attackType": "далекобійна",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "formula": "1к6 + 5",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "8 (1к6 + 5)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Збитий з ніг."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "exhaustion",
        "paralyzed",
        "petrified",
        "poisoned",
        "prone",
        "unconscious"
      ]
    },
    "sourcePage": 282
  },
  {
    "entity": "monster",
    "slug": "efreeti",
    "nameUk": "Іфрит",
    "nameOriginal": "Efreeti",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "17",
    "hitPoints": "212",
    "hitDice": "17к10 + 119",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "40 фт",
      "політ 60 фт (зависання)"
    ],
    "abilities": {
      "strength": {
        "score": 22,
        "modifier": "+6",
        "save": "+6"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 24,
        "modifier": "+7",
        "save": "+7"
      },
      "intelligence": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "wisdom": {
        "score": 15,
        "modifier": "+2",
        "save": "+6"
      },
      "charisma": {
        "score": 19,
        "modifier": "+4",
        "save": "+8"
      }
    },
    "subtype": "геній",
    "immunities": [
      "вогняна"
    ],
    "senses": [
      "Темний зір 120 фт"
    ],
    "passivePerception": 12,
    "languages": [
      "Первісна (Ігнан)"
    ],
    "challengeRating": "11",
    "experiencePoints": 7200,
    "proficiencyBonus": "+4",
    "traits": [
      {
        "id": "efreeti-elemental-restoration",
        "nameUk": "Стихійне відновлення",
        "nameOriginal": "Elemental Restoration",
        "sourceText": "Якщо істота помирає поза Стихійним планом Вогню, її тіло розчиняється в попіл, а через 1к4 днів вона отримує нове тіло й відроджується з усіма хітами десь на цьому плані."
      },
      {
        "id": "efreeti-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Істота має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      },
      {
        "id": "efreeti-wishes",
        "nameUk": "Бажання",
        "nameOriginal": "Wishes",
        "sourceText": "Істота має 30-відсотковий шанс знати закляття «Бажання». Якщо знає, то може накласти його лише від імені істоти, яка не є генієм і повідомила бажання зрозумілим способом. Істота не зазнає напруження від цього закляття. Після трьох накладань вона не може накладати його знову протягом 365 днів."
      }
    ],
    "actions": [
      {
        "id": "efreeti-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Іфрит виконує три атаки, використовуючи Розпечене лезо або Метання полум’я у будь-якому поєднанні."
      },
      {
        "id": "efreeti-heated-blade",
        "nameUk": "Розпечене лезо",
        "nameOriginal": "Heated Blade",
        "attackType": "ближня",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к6 + 6",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 13,
            "formula": "2к12",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к6 + 6) + 13 (2к12)",
        "damageType": "рубальна"
      },
      {
        "id": "efreeti-hurl-flame",
        "nameUk": "Метання полум’я",
        "nameOriginal": "Hurl Flame",
        "attackType": "далекобійна",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 24,
            "formula": "7к6",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "24 (7к6)",
        "damageType": "вогняна"
      }
    ],
    "spellcasting": {
      "ability": "Харизма",
      "saveDc": "16",
      "groups": [
        {
          "mode": "at-will",
          "spells": [
            {
              "nameUk": "Виявлення магії",
              "slug": "detect-magic"
            },
            {
              "nameUk": "Керування стихіями",
              "slug": "elementalism"
            }
          ]
        },
        {
          "mode": "daily",
          "uses": 1,
          "each": true,
          "spells": [
            {
              "nameUk": "Газоподібна форма",
              "slug": "gaseous-form"
            },
            {
              "nameUk": "Невидимість",
              "slug": "invisibility"
            },
            {
              "nameUk": "Великий образ",
              "slug": "major-image"
            },
            {
              "nameUk": "Перехід між планами",
              "slug": "plane-shift"
            },
            {
              "nameUk": "Мови",
              "slug": "tongues"
            },
            {
              "nameUk": "Стіна вогню",
              "slug": "wall-of-fire",
              "castAtLevel": 7
            }
          ]
        }
      ],
      "notes": "Іфрит накладає одне з наведених заклять без Матеріальних компонентів."
    },
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "hit-points",
        "initiative",
        "spellcasting"
      ],
      "spellSlugs": [
        "detect-magic",
        "elementalism",
        "gaseous-form",
        "invisibility",
        "major-image",
        "plane-shift",
        "tongues",
        "wall-of-fire",
        "wish"
      ]
    },
    "sourcePage": 283
  },
  {
    "entity": "monster",
    "slug": "fire-elemental",
    "nameUk": "Вогняний елементаль",
    "nameOriginal": "Fire Elemental",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "93",
    "hitDice": "11к10 + 33",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "resistances": [
      "дробильна",
      "колюча",
      "рубальна"
    ],
    "immunities": [
      "вогняна",
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Схоплений",
      "Паралізований",
      "Скам’янілий",
      "Отруєний",
      "Збитий з ніг",
      "Стримуваний",
      "Непритомний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Ігнан)"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "fire-elemental-fire-aura",
        "nameUk": "Вогняна аура",
        "nameOriginal": "Fire Aura",
        "sourceText": "Наприкінці кожного ходу елементаля кожна істота в 10-футовій еманації від нього отримує 5 (1к10) вогняної шкоди. Істоти й легкозаймисті предмети в еманації починають горіти."
      },
      {
        "id": "fire-elemental-fire-form",
        "nameUk": "Вогняна форма",
        "nameOriginal": "Fire Form",
        "sourceText": "Елементаль може проходити крізь простір завширшки лише 1 дюйм без додаткових витрат руху, а також входити в простір істоти й зупинятися там. Коли він уперше за хід входить у простір істоти, вона отримує 5 (1к10) вогняної шкоди."
      },
      {
        "id": "fire-elemental-illumination",
        "nameUk": "Світіння",
        "nameOriginal": "Illumination",
        "sourceText": "Елементаль випромінює Яскраве світло в радіусі 30 футів і Тьмяне світло ще на 30 футів."
      },
      {
        "id": "fire-elemental-water-susceptibility",
        "nameUk": "Вразливість до води",
        "nameOriginal": "Water Susceptibility",
        "sourceText": "Елементаль отримує 3 (1к6) холодної шкоди за кожні 5 футів руху у воді або за кожен галон води, вилитий на нього."
      }
    ],
    "actions": [
      {
        "id": "fire-elemental-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Елементаль виконує дві атаки Опіком."
      },
      {
        "id": "fire-elemental-burn",
        "nameUk": "Опік",
        "nameOriginal": "Burn",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "formula": "2к6 + 3",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "10 (2к6 + 3)",
        "damageType": "вогняна",
        "sourceText": "Якщо ціль є істотою або легкозаймистим предметом, вона починає горіти."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative",
        "resistance"
      ],
      "conditionSlugs": [
        "exhaustion",
        "grappled",
        "paralyzed",
        "petrified",
        "poisoned",
        "prone",
        "restrained",
        "unconscious"
      ]
    },
    "sourcePage": 284
  },
  {
    "entity": "monster",
    "slug": "flesh-golem",
    "nameUk": "Голем із плоті",
    "nameOriginal": "Flesh Golem",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Конструкт",
    "alignment": "нейтральний",
    "armorClass": "9",
    "hitPoints": "127",
    "hitDice": "15к8 + 60",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "intelligence": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "immunities": [
      "блискавична",
      "отруйна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Розуміє Спільну та ще одну мову, але не розмовляє"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "flesh-golem-aversion-to-fire",
        "nameUk": "Відраза до вогню",
        "nameOriginal": "Aversion to Fire",
        "sourceText": "Якщо голем отримує вогняну шкоду, до завершення свого наступного ходу він має Невдачу на кидки атаки та перевірки характеристик."
      },
      {
        "id": "flesh-golem-berserk",
        "nameUk": "Берсерк",
        "nameOriginal": "Berserk",
        "sourceText": "Щоразу, коли голем починає хід Закривавленим, киньте 1к6. На 6 голем впадає в лють. Під час кожного ходу в люті він атакує найближчу видиму істоту, а якщо не може дістатися істоти й атакувати її — атакує предмет. Лють триває, доки голема не знищено або він більше не Закривавлений. Творець голема в межах 60 футів може Дією спробувати заспокоїти його перевіркою Харизми (Переконання) СК 15, якщо голем чує творця. При успіху лють припиняється до початку наступного ходу голема."
      },
      {
        "id": "flesh-golem-immutable-form",
        "nameUk": "Незмінна форма",
        "nameOriginal": "Immutable Form",
        "sourceText": "Голем не може змінювати форму."
      },
      {
        "id": "flesh-golem-lightning-absorption",
        "nameUk": "Поглинання блискавки",
        "nameOriginal": "Lightning Absorption",
        "sourceText": "Коли істота мала б отримати блискавичної шкоди, вона не отримує її, а натомість відновлює кількість хітів, що дорівнює завданій шкоді."
      },
      {
        "id": "flesh-golem-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Істота має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      }
    ],
    "actions": [
      {
        "id": "flesh-golem-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Голем виконує дві атаки Ударом."
      },
      {
        "id": "flesh-golem-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к8 + 4",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 4,
            "formula": "1к8",
            "damageType": "блискавична",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к8 + 4) + 4 (1к8)",
        "damageType": "дробильна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "disadvantage",
        "healing",
        "hit-points",
        "initiative"
      ],
      "conditionSlugs": [
        "charmed",
        "exhaustion",
        "frightened",
        "paralyzed",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 285
  },
  {
    "entity": "monster",
    "slug": "shrieker-fungus",
    "nameUk": "Гриб-крикун",
    "nameOriginal": "Shrieker Fungus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Рослина",
    "alignment": "без світогляду",
    "armorClass": "5",
    "hitPoints": "13",
    "hitDice": "3к8",
    "initiative": {
      "modifier": "−5",
      "score": 5
    },
    "speed": [
      "5 фт"
    ],
    "abilities": {
      "strength": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "dexterity": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "conditionImmunities": [
      "Засліплений",
      "Зачарований",
      "Оглухлий",
      "Наляканий"
    ],
    "senses": [
      "Сліпобачення 30 фт"
    ],
    "passivePerception": 6,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 0,
    "proficiencyBonus": "+2",
    "reactions": [
      {
        "id": "shrieker-fungus-shriek",
        "nameUk": "Вереск",
        "nameOriginal": "Shriek",
        "sourceText": "Тригер: істота або джерело Яскравого світла переміщується в межах 30 футів від гриба. Відповідь: гриб видає вереск, чутний у межах 300 футів, протягом 1 хвилини або доки гриб не помре."
      }
    ],
    "actions": [],
    "relationships": {
      "ruleSlugs": [
        "conditions",
        "initiative",
        "reaction"
      ],
      "conditionSlugs": [
        "blinded",
        "charmed",
        "deafened",
        "frightened"
      ]
    },
    "sourcePage": 286
  },
  {
    "entity": "monster",
    "slug": "violet-fungus",
    "nameUk": "Фіолетовий гриб",
    "nameOriginal": "Violet Fungus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Рослина",
    "alignment": "без світогляду",
    "armorClass": "5",
    "hitPoints": "18",
    "hitDice": "4к8",
    "initiative": {
      "modifier": "−5",
      "score": 5
    },
    "speed": [
      "5 фт"
    ],
    "abilities": {
      "strength": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "conditionImmunities": [
      "Засліплений",
      "Зачарований",
      "Оглухлий",
      "Наляканий"
    ],
    "senses": [
      "Сліпобачення 30 фт"
    ],
    "passivePerception": 6,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "violet-fungus-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Гриб виконує дві атаки Гнилим дотиком."
      },
      {
        "id": "violet-fungus-rotting-touch",
        "nameUk": "Гнилий дотик",
        "nameOriginal": "Rotting Touch",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "formula": "1к8",
            "damageType": "некротична",
            "application": "on-hit"
          }
        ],
        "damage": "4 (1к8)",
        "damageType": "некротична"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "blinded",
        "charmed",
        "deafened",
        "frightened"
      ]
    },
    "sourcePage": 286
  },
  {
    "entity": "monster",
    "slug": "gargoyle",
    "nameUk": "Гаргулья",
    "nameOriginal": "Gargoyle",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Елементаль",
    "alignment": "хаотично-злий",
    "armorClass": "15",
    "hitPoints": "67",
    "hitDice": "9к8 + 27",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "skills": {
      "Скритність": "+4"
    },
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Терран)"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "gargoyle-flyby",
        "nameUk": "Проліт",
        "nameOriginal": "Flyby",
        "sourceText": "Гаргулья не провокує Провоковану атаку, коли вилітає з досяжності ворога."
      }
    ],
    "actions": [
      {
        "id": "gargoyle-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Гаргулья виконує дві атаки Кігтем."
      },
      {
        "id": "gargoyle-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "formula": "2к4 + 2",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (2к4 + 2)",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ],
      "conditionSlugs": [
        "exhaustion",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 286
  },
  {
    "entity": "monster",
    "slug": "gelatinous-cube",
    "nameUk": "Желатиновий куб",
    "nameOriginal": "Gelatinous Cube",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Слиз",
    "alignment": "без світогляду",
    "armorClass": "6",
    "hitPoints": "63",
    "hitDice": "6к10 + 30",
    "initiative": {
      "modifier": "−4",
      "score": 6
    },
    "speed": [
      "15 фт"
    ],
    "abilities": {
      "strength": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "constitution": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "immunities": [
      "кислотна"
    ],
    "conditionImmunities": [
      "Засліплений",
      "Зачарований",
      "Оглухлий",
      "Виснаження",
      "Наляканий",
      "Збитий з ніг"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "gelatinous-cube-ooze-cube",
        "nameUk": "Куб слизу",
        "nameOriginal": "Ooze Cube",
        "sourceText": "Куб заповнює весь свій простір і є прозорим. Інші істоти можуть входити в цей простір, але тоді зазнають Поглинання з Невдачею на ряткидок. Істоти всередині мають Повне укриття. Куб утримує одну Велику або до чотирьох Середніх чи Малих істот. Істота в межах 5 футів може Дією витягнути істоту або предмет, успішно пройшовши перевірку Сили (Атлетика) СК 12; вона отримує 10 (3к6) кислотної шкоди."
      },
      {
        "id": "gelatinous-cube-transparent",
        "nameUk": "Прозорий",
        "nameOriginal": "Transparent",
        "sourceText": "Навіть коли куб добре видно, істота повинна успішно пройти перевірку Мудрості (Сприйняття) СК 15, щоб помітити його, якщо вона не бачила, як куб рухався чи діяв."
      }
    ],
    "actions": [
      {
        "id": "gelatinous-cube-pseudopod",
        "nameUk": "Псевдоподія",
        "nameOriginal": "Pseudopod",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 12,
            "formula": "3к6 + 2",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "12 (3к6 + 2)",
        "damageType": "кислотна"
      },
      {
        "id": "gelatinous-cube-engulf",
        "nameUk": "Поглинання",
        "nameOriginal": "Engulf",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "кислотна",
            "application": "failed-save",
            "formula": "3к6"
          },
          {
            "average": 10,
            "damageType": "кислотна",
            "application": "start-of-turn",
            "formula": "3к6"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 12,
          "onFailure": "Повна шкода; ціль поглинута.",
          "onSuccess": "Половина шкоди; ціль переміщується у вільний простір у межах 5 футів."
        },
        "sourceText": "Куб переміщується на відстань до своєї Швидкості, не провокуючи Провокованих атак, і може проходити крізь простір Великих або менших істот, якщо має для них місце. Кожна істота, в чий простір він уперше входить під час цього руху, виконує ряткидок Спритності СК 12. Поглинута ціль задихається, не може накладати закляття з Вербальним компонентом, має стан Стримуваний і отримує 10 (3к6) кислотної шкоди на початку кожного ходу куба. Вона рухається разом із кубом і може Дією здійснити перевірку Сили (Атлетика) СК 12, щоб вийти в найближчий вільний простір. Якщо вільного простору для успішного ряткидка немає, ряткидок вважається проваленим."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "disadvantage",
        "initiative",
        "opportunity-attacks",
        "saving-throws"
      ],
      "conditionSlugs": [
        "blinded",
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "prone",
        "restrained"
      ]
    },
    "sourcePage": 286
  },
  {
    "entity": "monster",
    "slug": "gorgon",
    "nameUk": "Горгона",
    "nameOriginal": "Gorgon",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "19",
    "hitPoints": "114",
    "hitDice": "12к10 + 48",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "skills": {
      "Сприйняття": "+7"
    },
    "conditionImmunities": [
      "Виснаження",
      "Скам’янілий"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 17,
    "languages": [],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "gorgon-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 18,
            "formula": "2к12 + 5",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "18 (2к12 + 5)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір і горгона безпосередньо перед влучанням перемістилася щонайменше на 20 футів по прямій до неї, ціль отримує стан Збитий з ніг."
      },
      {
        "id": "gorgon-petrifying-breath",
        "nameUk": "Скам’янілий подих",
        "nameOriginal": "Petrifying Breath",
        "target": "кожна істота в 30-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "savingThrow": {
          "ability": "constitution",
          "dc": 15,
          "onFailure": "Перший провал: стан Стримуваний. Другий провал: стан Скам’янілий замість Стримуваного.",
          "repeat": {
            "timing": "наприкінці наступного ходу цілі, якщо вона все ще Стримувана",
            "endsEffectOnSuccess": true
          }
        },
        "sourceText": "Ціль повторює ряткидок наприкінці свого наступного ходу, якщо все ще має стан Стримуваний, завершуючи ефект при успіху. Другий провал змінює стан на Скам’янілий."
      }
    ],
    "bonusActions": [
      {
        "id": "gorgon-trample",
        "nameUk": "Затоптування",
        "nameOriginal": "Trample",
        "target": "одна істота в межах 5 фт зі станом Збитий з ніг",
        "damageInstances": [
          {
            "average": 16,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "2к10 + 5"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 16,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Ціль виконує ряткидок Спритності СК 16."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "exhaustion",
        "petrified",
        "prone",
        "restrained"
      ]
    },
    "sourcePage": 292
  },
  {
    "entity": "monster",
    "slug": "gray-ooze",
    "nameUk": "Сірий слиз",
    "nameOriginal": "Gray Ooze",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Слиз",
    "alignment": "без світогляду",
    "armorClass": "9",
    "hitPoints": "22",
    "hitDice": "3к8 + 9",
    "initiative": {
      "modifier": "−2",
      "score": 13
    },
    "speed": [
      "10 фт",
      "лазіння 10 фт"
    ],
    "abilities": {
      "strength": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "dexterity": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "skills": {
      "Скритність": "+2"
    },
    "resistances": [
      "кислотна",
      "холодна",
      "вогняна"
    ],
    "conditionImmunities": [
      "Засліплений",
      "Зачарований",
      "Оглухлий",
      "Виснаження",
      "Наляканий",
      "Схоплений",
      "Збитий з ніг",
      "Стримуваний"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "gray-ooze-amorphous",
        "nameUk": "Аморфність",
        "nameOriginal": "Amorphous",
        "sourceText": "Істота може проходити крізь простір завширшки лише 1 дюйм, не витрачаючи додаткового переміщення."
      },
      {
        "id": "gray-ooze-corrosive-form",
        "nameUk": "Корозійна форма",
        "nameOriginal": "Corrosive Form",
        "sourceText": "Немагічні боєприпаси знищуються після влучання по слизу. Немагічна зброя після контакту отримує накопичувальний штраф −1 до кидків атаки й знищується при штрафі −5; «Лагодження» усуває штраф. За 1 раунд слиз проїдає 2 дюйми немагічного металу або дерева."
      }
    ],
    "actions": [
      {
        "id": "gray-ooze-pseudopod",
        "nameUk": "Псевдоподія",
        "nameOriginal": "Pseudopod",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "formula": "2к8 + 1",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "10 (2к8 + 1)",
        "damageType": "кислотна",
        "sourceText": "Немагічний обладунок цілі отримує штраф −1 до наданого КЗ. Обладунок знищується, якщо штраф зменшує його КЗ до 10. «Лагодження» усуває штраф."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative",
        "resistance"
      ],
      "conditionSlugs": [
        "blinded",
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "grappled",
        "prone",
        "restrained"
      ],
      "spellSlugs": [
        "mending"
      ]
    },
    "sourcePage": 293
  },
  {
    "entity": "monster",
    "slug": "homunculus",
    "nameUk": "Гомункул",
    "nameOriginal": "Homunculus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Конструкт",
    "alignment": "нейтральний",
    "armorClass": "13",
    "hitPoints": "4",
    "hitDice": "1к4 + 2",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "20 фт",
      "політ 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
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
        "save": "+2"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "+0"
      }
    },
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Розуміє Спільну та ще одну мову, але не розмовляє"
    ],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "homunculus-telepathic-bond",
        "nameUk": "Телепатичний зв’язок",
        "nameOriginal": "Telepathic Bond",
        "sourceText": "Поки гомункул і його господар перебувають на одному плані існування, вони можуть телепатично спілкуватися між собою."
      }
    ],
    "actions": [
      {
        "id": "homunculus-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "charmed",
        "poisoned"
      ]
    },
    "sourcePage": 299
  },
  {
    "entity": "monster",
    "slug": "invisible-stalker",
    "nameUk": "Невидимий переслідувач",
    "nameOriginal": "Invisible Stalker",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "14",
    "hitPoints": "97",
    "hitDice": "13к10 + 26",
    "initiative": {
      "modifier": "+7",
      "score": 22
    },
    "speed": [
      "50 фт",
      "політ 50 фт (зависання)"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
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
        "score": 15,
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
      "Сприйняття": "+8",
      "Скритність": "+10"
    },
    "resistances": [
      "дробильна",
      "колюча",
      "рубальна"
    ],
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Схоплений",
      "Паралізований",
      "Скам’янілий",
      "Отруєний",
      "Збитий з ніг",
      "Стримуваний",
      "Непритомний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 18,
    "languages": [
      "Спільна",
      "Первісна (Ауран)"
    ],
    "challengeRating": "6",
    "experiencePoints": 2300,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "invisible-stalker-air-form",
        "nameUk": "Повітряна форма",
        "nameOriginal": "Air Form",
        "sourceText": "Істота може входити в простір іншої істоти й зупинятися там. Вона може проходити крізь простір завширшки лише 1 дюйм, не витрачаючи додаткового переміщення."
      },
      {
        "id": "invisible-stalker-invisibility",
        "nameUk": "Невидимість",
        "nameOriginal": "Invisibility",
        "sourceText": "Переслідувач має стан Невидимий."
      }
    ],
    "actions": [
      {
        "id": "invisible-stalker-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Переслідувач виконує три атаки Ударом вітру. Одну атаку він може замінити використанням Вихору."
      },
      {
        "id": "invisible-stalker-wind-swipe",
        "nameUk": "Удар вітру",
        "nameOriginal": "Wind Swipe",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к6 + 4",
            "damageType": "силова",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к6 + 4)",
        "damageType": "силова"
      },
      {
        "id": "invisible-stalker-vortex",
        "nameUk": "Вихор",
        "nameOriginal": "Vortex",
        "target": "одна Велика або менша істота в просторі переслідувача",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "громова",
            "application": "failed-save",
            "formula": "1к8 + 3"
          },
          {
            "average": 7,
            "damageType": "громова",
            "application": "start-of-turn",
            "formula": "2к6"
          }
        ],
        "savingThrow": {
          "ability": "constitution",
          "dc": 14,
          "onFailure": "Повна шкода; ціль отримує стан Схоплений (втеча СК 13)."
        },
        "sourceText": "До завершення захоплення ціль не може накладати закляття з Вербальним компонентом і отримує 7 (2к6) громової шкоди на початку кожного ходу переслідувача."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "resistance",
        "saving-throws"
      ],
      "conditionSlugs": [
        "exhaustion",
        "grappled",
        "invisible",
        "paralyzed",
        "petrified",
        "poisoned",
        "prone",
        "restrained",
        "unconscious"
      ]
    },
    "sourcePage": 301
  },
  {
    "entity": "monster",
    "slug": "iron-golem",
    "nameUk": "Залізний голем",
    "nameOriginal": "Iron Golem",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "20",
    "hitPoints": "252",
    "hitDice": "24к10 + 120",
    "initiative": {
      "modifier": "+9",
      "score": 19
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 24,
        "modifier": "+7",
        "save": "+7"
      },
      "dexterity": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "intelligence": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "immunities": [
      "вогняна",
      "отруйна",
      "психічна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 120 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Розуміє Спільну та ще дві мови, але не розмовляє"
    ],
    "challengeRating": "16",
    "experiencePoints": 15000,
    "proficiencyBonus": "+5",
    "traits": [
      {
        "id": "iron-golem-fire-absorption",
        "nameUk": "Поглинання вогню",
        "nameOriginal": "Fire Absorption",
        "sourceText": "Коли істота мала б отримати вогняної шкоди, вона не отримує її, а натомість відновлює кількість хітів, що дорівнює завданій шкоді."
      },
      {
        "id": "iron-golem-immutable-form",
        "nameUk": "Незмінна форма",
        "nameOriginal": "Immutable Form",
        "sourceText": "Голем не може змінювати форму."
      },
      {
        "id": "iron-golem-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Істота має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      }
    ],
    "actions": [
      {
        "id": "iron-golem-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Голем виконує дві атаки, використовуючи Лезову руку або Вогняний заряд у будь-якому поєднанні."
      },
      {
        "id": "iron-golem-bladed-arm",
        "nameUk": "Лезова рука",
        "nameOriginal": "Bladed Arm",
        "attackType": "ближня",
        "attackBonus": "+12",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 20,
            "formula": "3к8 + 7",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 10,
            "formula": "3к6",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "20 (3к8 + 7) + 10 (3к6)",
        "damageType": "рубальна"
      },
      {
        "id": "iron-golem-fiery-bolt",
        "nameUk": "Вогняний заряд",
        "nameOriginal": "Fiery Bolt",
        "attackType": "далекобійна",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 36,
            "formula": "8к8",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "36 (8к8)",
        "damageType": "вогняна"
      },
      {
        "id": "iron-golem-poison-breath",
        "nameUk": "Отруйний подих",
        "nameOriginal": "Poison Breath",
        "target": "кожна істота в 60-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "damageInstances": [
          {
            "average": 55,
            "damageType": "отруйна",
            "application": "failed-save",
            "formula": "10к10"
          }
        ],
        "savingThrow": {
          "ability": "constitution",
          "dc": 18,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Ціль виконує ряткидок Статури СК 18."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "healing",
        "hit-points",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "charmed",
        "exhaustion",
        "frightened",
        "paralyzed",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 302
  },
  {
    "entity": "monster",
    "slug": "magmin",
    "nameUk": "Магмін",
    "nameOriginal": "Magmin",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Елементаль",
    "alignment": "хаотично-нейтральний",
    "armorClass": "14",
    "hitPoints": "13",
    "hitDice": "3к6 + 3",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
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
    "immunities": [
      "вогняна"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Ігнан)"
    ],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "magmin-death-burst",
        "nameUk": "Передсмертний вибух",
        "nameOriginal": "Death Burst",
        "sourceText": "Коли істота помирає, вона вибухає. Кожна істота в 10-футовій еманації виконує ряткидок Спритності СК 11. При провалі ціль отримує 7 (2к6) вогняної шкоди, при успіху — половину.",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 11,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "damageInstances": [
          {
            "average": 7,
            "damageType": "вогняна",
            "application": "failed-save",
            "formula": "2к6"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "magmin-touch",
        "nameUk": "Дотик",
        "nameOriginal": "Touch",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "formula": "2к4 + 2",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (2к4 + 2)",
        "damageType": "вогняна",
        "sourceText": "Якщо ціль є істотою або легкозаймистим предметом, який ніхто не носить, вона починає горіти."
      }
    ],
    "bonusActions": [
      {
        "id": "magmin-ignited-illumination",
        "nameUk": "Запалене світіння",
        "nameOriginal": "Ignited Illumination",
        "sourceText": "Магмін запалює або гасить власне полум’я. Поки він палає, випромінює Яскраве світло в радіусі 10 футів і Тьмяне світло ще на 10 футів."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ]
    },
    "sourcePage": 305
  },
  {
    "entity": "monster",
    "slug": "dust-mephit",
    "nameUk": "Пиловий мефіт",
    "nameOriginal": "Dust Mephit",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Елементаль",
    "alignment": "нейтрально-злий",
    "armorClass": "12",
    "hitPoints": "17",
    "hitDice": "5к6",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "політ 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Сприйняття": "+2",
      "Скритність": "+4"
    },
    "vulnerabilities": [
      "вогняна"
    ],
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 12,
    "languages": [
      "Первісна (Ауран",
      "Терран)"
    ],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "dust-mephit-death-burst",
        "nameUk": "Передсмертний вибух",
        "nameOriginal": "Death Burst",
        "sourceText": "Коли істота помирає, вона вибухає. Кожна істота в 5-футовій еманації виконує ряткидок Спритності СК 10. При провалі ціль отримує 5 (2к4) дробильної шкоди, при успіху — половину.",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 10,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "damageInstances": [
          {
            "average": 5,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "2к4"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "dust-mephit-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "formula": "1к4 + 2",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "4 (1к4 + 2)",
        "damageType": "рубальна"
      },
      {
        "id": "dust-mephit-blinding-breath",
        "nameUk": "Сліпучий подих",
        "nameOriginal": "Blinding Breath",
        "target": "кожна істота в 15-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "savingThrow": {
          "ability": "dexterity",
          "dc": 10,
          "onFailure": "Ціль отримує стан Засліплений до завершення наступного ходу мефіта."
        },
        "sourceText": "Ціль виконує ряткидок Спритності СК 10."
      },
      {
        "id": "dust-mephit-sleep",
        "nameUk": "Сон",
        "nameOriginal": "Sleep",
        "limitedUse": {
          "uses": 1,
          "period": "day"
        },
        "sourceText": "Мефіт накладає закляття «Сон» без компонентів, використовуючи Харизму як заклинальну характеристику (СК ряткидка заклять 10)."
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
        "blinded",
        "exhaustion",
        "poisoned"
      ],
      "spellSlugs": [
        "sleep"
      ]
    },
    "sourcePage": 307
  },
  {
    "entity": "monster",
    "slug": "ice-mephit",
    "nameUk": "Крижаний мефіт",
    "nameOriginal": "Ice Mephit",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Елементаль",
    "alignment": "нейтрально-злий",
    "armorClass": "11",
    "hitPoints": "21",
    "hitDice": "6к6",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт",
      "політ 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "skills": {
      "Сприйняття": "+2",
      "Скритність": "+3"
    },
    "vulnerabilities": [
      "вогняна"
    ],
    "immunities": [
      "холодна",
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 12,
    "languages": [
      "Первісна (Акван",
      "Ауран)"
    ],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "ice-mephit-death-burst",
        "nameUk": "Передсмертний вибух",
        "nameOriginal": "Death Burst",
        "sourceText": "Коли істота помирає, вона вибухає. Кожна істота в 5-футовій еманації виконує ряткидок Статури СК 10. При провалі ціль отримує 5 (2к4) холодної шкоди, при успіху — половину.",
        "savingThrow": {
          "ability": "constitution",
          "dc": 10,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "damageInstances": [
          {
            "average": 5,
            "damageType": "холодна",
            "application": "failed-save",
            "formula": "2к4"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "ice-mephit-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
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
            "average": 2,
            "formula": "1к4",
            "damageType": "холодна",
            "application": "on-hit"
          }
        ],
        "damage": "3 (1к4 + 1) + 2 (1к4)",
        "damageType": "рубальна"
      },
      {
        "id": "ice-mephit-fog-cloud",
        "nameUk": "Хмара туману",
        "nameOriginal": "Fog Cloud",
        "limitedUse": {
          "uses": 1,
          "period": "day"
        },
        "sourceText": "Мефіт накладає закляття «Хмара туману» без компонентів, використовуючи Харизму як заклинальну характеристику."
      },
      {
        "id": "ice-mephit-frost-breath",
        "nameUk": "Морозний подих",
        "nameOriginal": "Frost Breath",
        "target": "кожна істота в 15-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "savingThrow": {
          "ability": "constitution",
          "dc": 10,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Ціль виконує ряткидок Статури СК 10.",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "холодна",
            "application": "failed-save",
            "formula": "3к4"
          }
        ]
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
        "exhaustion",
        "poisoned"
      ],
      "spellSlugs": [
        "fog-cloud"
      ]
    },
    "sourcePage": 307
  },
  {
    "entity": "monster",
    "slug": "magma-mephit",
    "nameUk": "Магмовий мефіт",
    "nameOriginal": "Magma Mephit",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Елементаль",
    "alignment": "нейтрально-злий",
    "armorClass": "11",
    "hitPoints": "18",
    "hitDice": "4к6 + 4",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт",
      "політ 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
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
        "score": 7,
        "modifier": "−2",
        "save": "−2"
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
    "skills": {
      "Скритність": "+3"
    },
    "vulnerabilities": [
      "холодна"
    ],
    "immunities": [
      "вогняна",
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Ігнан",
      "Терран)"
    ],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "magma-mephit-death-burst",
        "nameUk": "Передсмертний вибух",
        "nameOriginal": "Death Burst",
        "sourceText": "Коли істота помирає, вона вибухає. Кожна істота в 5-футовій еманації виконує ряткидок Спритності СК 11. При провалі ціль отримує 7 (2к6) вогняної шкоди, при успіху — половину.",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 11,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "damageInstances": [
          {
            "average": 7,
            "damageType": "вогняна",
            "application": "failed-save",
            "formula": "2к6"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "magma-mephit-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
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
            "average": 3,
            "formula": "1к6",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "3 (1к4 + 1) + 3 (1к6)",
        "damageType": "рубальна"
      },
      {
        "id": "magma-mephit-fire-breath",
        "nameUk": "Вогняний подих",
        "nameOriginal": "Fire Breath",
        "target": "кожна істота в 15-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "savingThrow": {
          "ability": "dexterity",
          "dc": 11,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Ціль виконує ряткидок Спритності СК 11.",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "вогняна",
            "application": "failed-save",
            "formula": "2к6"
          }
        ]
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
        "exhaustion",
        "poisoned"
      ]
    },
    "sourcePage": 307
  },
  {
    "entity": "monster",
    "slug": "steam-mephit",
    "nameUk": "Паровий мефіт",
    "nameOriginal": "Steam Mephit",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Елементаль",
    "alignment": "нейтрально-злий",
    "armorClass": "10",
    "hitPoints": "17",
    "hitDice": "5к6",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт",
      "політ 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "skills": {
      "Скритність": "+2"
    },
    "immunities": [
      "вогняна",
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Акван",
      "Ігнан)"
    ],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "steam-mephit-blurred-form",
        "nameUk": "Розмита форма",
        "nameOriginal": "Blurred Form",
        "sourceText": "Кидки атаки проти мефіта виконуються з Невдачею, якщо мефіт не має стану Недієздатний."
      },
      {
        "id": "steam-mephit-death-burst",
        "nameUk": "Передсмертний вибух",
        "nameOriginal": "Death Burst",
        "sourceText": "Коли істота помирає, вона вибухає. Кожна істота в 5-футовій еманації виконує ряткидок Спритності СК 10. При провалі ціль отримує 5 (2к4) вогняної шкоди, при успіху — половину.",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 10,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "damageInstances": [
          {
            "average": 5,
            "damageType": "вогняна",
            "application": "failed-save",
            "formula": "2к4"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "steam-mephit-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 2,
            "formula": "1к4",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 2,
            "formula": "1к4",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "2 (1к4) + 2 (1к4)",
        "damageType": "рубальна"
      },
      {
        "id": "steam-mephit-steam-breath",
        "nameUk": "Паровий подих",
        "nameOriginal": "Steam Breath",
        "target": "кожна істота в 15-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "savingThrow": {
          "ability": "constitution",
          "dc": 10,
          "onFailure": "Повна шкода; Швидкість цілі зменшується на 10 футів до завершення наступного ходу мефіта.",
          "onSuccess": "Половина шкоди без зменшення Швидкості."
        },
        "sourceText": "Ціль виконує ряткидок Статури СК 10. Перебування під водою не надає Стійкості до цієї вогняної шкоди незалежно від успіху чи провалу.",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "вогняна",
            "application": "failed-save",
            "formula": "2к4"
          }
        ]
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "disadvantage",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "exhaustion",
        "incapacitated",
        "poisoned"
      ]
    },
    "sourcePage": 308
  },
  {
    "entity": "monster",
    "slug": "merfolk-skirmisher",
    "nameUk": "Морський народ-стрілець",
    "nameOriginal": "Merfolk Skirmisher",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "11",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "10 фт",
      "плавання 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
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
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "passivePerception": 12,
    "languages": [
      "Спільна",
      "Первісна (Акван)"
    ],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "merfolk-skirmisher-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Істота може дихати повітрям і водою."
      }
    ],
    "actions": [
      {
        "id": "merfolk-skirmisher-ocean-spear",
        "nameUk": "Океанічний спис",
        "nameOriginal": "Ocean Spear",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+2",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 3,
            "formula": "1к6",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 2,
            "formula": "1к4",
            "damageType": "холодна",
            "application": "on-hit"
          }
        ],
        "damage": "3 (1к6) + 2 (1к4)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль є істотою, її Швидкість зменшується на 10 футів до завершення її наступного ходу. Після далекобійної атаки спис негайно магічно повертається до руки морського стрільця незалежно від влучання."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    },
    "sourcePage": 308
  },
  {
    "entity": "monster",
    "slug": "ochre-jelly",
    "nameUk": "Охристий слиз",
    "nameOriginal": "Ochre Jelly",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Слиз",
    "alignment": "без світогляду",
    "armorClass": "8",
    "hitPoints": "52",
    "hitDice": "7к10 + 14",
    "initiative": {
      "modifier": "−2",
      "score": 8
    },
    "speed": [
      "20 фт",
      "лазіння 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "resistances": [
      "кислотна"
    ],
    "immunities": [
      "блискавична",
      "рубальна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Оглухлий",
      "Виснаження",
      "Наляканий",
      "Схоплений",
      "Збитий з ніг",
      "Стримуваний"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "ochre-jelly-amorphous",
        "nameUk": "Аморфність",
        "nameOriginal": "Amorphous",
        "sourceText": "Істота може проходити крізь простір завширшки лише 1 дюйм, не витрачаючи додаткового переміщення."
      },
      {
        "id": "ochre-jelly-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      }
    ],
    "actions": [
      {
        "id": "ochre-jelly-pseudopod",
        "nameUk": "Псевдоподія",
        "nameOriginal": "Pseudopod",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 12,
            "formula": "3к6 + 2",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "12 (3к6 + 2)",
        "damageType": "кислотна"
      }
    ],
    "reactions": [
      {
        "id": "ochre-jelly-split",
        "nameUk": "Розділення",
        "nameOriginal": "Split",
        "sourceText": "Тригер: істота Велика або Середня, має щонайменше 10 хітів і стає Закривавленою або зазнає блискавичної чи рубальної шкоди. Відповідь: вона розділяється на два нові Охристі слизи. Кожна нова істота на один розмір менша, діє за тією самою Ініціативою й отримує половину хітів оригіналу з округленням донизу."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "hit-points",
        "initiative",
        "reaction",
        "resistance"
      ],
      "conditionSlugs": [
        "charmed",
        "deafened",
        "exhaustion",
        "frightened",
        "grappled",
        "prone",
        "restrained"
      ]
    },
    "sourcePage": 312
  },
  {
    "entity": "monster",
    "slug": "salamander",
    "nameUk": "Саламандра",
    "nameOriginal": "Salamander",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтрально-злий",
    "armorClass": "15",
    "hitPoints": "90",
    "hitDice": "12к10 + 24",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "лазіння 30 фт"
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
        "score": 15,
        "modifier": "+2",
        "save": "+2"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "vulnerabilities": [
      "холодна"
    ],
    "immunities": [
      "вогняна"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Ігнан)"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "salamander-fire-aura",
        "nameUk": "Вогняна аура",
        "nameOriginal": "Fire Aura",
        "sourceText": "Наприкінці кожного ходу саламандри кожна обрана нею істота в 5-футовій еманації від саламандри отримує 7 (2к6) вогняної шкоди."
      }
    ],
    "actions": [
      {
        "id": "salamander-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Саламандра виконує дві атаки Полум’яним списом. Одну атаку вона може замінити використанням Стискання."
      },
      {
        "id": "salamander-flame-spear",
        "nameUk": "Полум’яний спис",
        "nameOriginal": "Flame Spear",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к8 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к8 + 4) + 7 (2к6)",
        "damageType": "колюча",
        "sourceText": "Після далекобійної атаки спис негайно магічно повертається до руки саламандри незалежно від влучання."
      },
      {
        "id": "salamander-constrict",
        "nameUk": "Стискання",
        "nameOriginal": "Constrict",
        "target": "одна видима Велика або менша істота в межах 10 фт",
        "damageInstances": [
          {
            "average": 11,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "2к6 + 4"
          },
          {
            "average": 7,
            "damageType": "вогняна",
            "application": "failed-save",
            "formula": "2к6"
          }
        ],
        "savingThrow": {
          "ability": "strength",
          "dc": 15,
          "onFailure": "Повна шкода; ціль отримує стан Схоплений (втеча СК 14) і стан Стримуваний до завершення захоплення."
        },
        "sourceText": "Ціль виконує ряткидок Сили СК 15."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "grappled",
        "restrained"
      ]
    },
    "sourcePage": 321
  },
  {
    "entity": "monster",
    "slug": "shambling-mound",
    "nameUk": "Блукаючий пагорб",
    "nameOriginal": "Shambling Mound",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Рослина",
    "alignment": "без світогляду",
    "armorClass": "15",
    "hitPoints": "110",
    "hitDice": "13к10 + 39",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "30 фт",
      "плавання 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "skills": {
      "Скритність": "+3"
    },
    "resistances": [
      "холодна",
      "вогняна"
    ],
    "immunities": [
      "блискавична"
    ],
    "conditionImmunities": [
      "Оглухлий",
      "Виснаження"
    ],
    "senses": [
      "Сліпобачення 60 фт"
    ],
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "shambling-mound-lightning-absorption",
        "nameUk": "Поглинання блискавки",
        "nameOriginal": "Lightning Absorption",
        "sourceText": "Коли істота мала б отримати блискавичної шкоди, вона не отримує її, а натомість відновлює кількість хітів, що дорівнює завданій шкоді."
      }
    ],
    "actions": [
      {
        "id": "shambling-mound-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Блукаючий пагорб виконує три атаки Зарядженим щупальцем. Одну атаку він може замінити використанням Поглинання."
      },
      {
        "id": "shambling-mound-charged-tendril",
        "nameUk": "Заряджене щупальце",
        "nameOriginal": "Charged Tendril",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к6 + 4",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 5,
            "formula": "2к4",
            "damageType": "блискавична",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к6 + 4) + 5 (2к4)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Середній або менший розмір, пагорб притягує її на 5 футів по прямій до себе."
      },
      {
        "id": "shambling-mound-engulf",
        "nameUk": "Поглинання",
        "nameOriginal": "Engulf",
        "target": "одна Середня або менша істота в межах 5 фт",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "блискавична",
            "application": "start-of-turn",
            "formula": "3к6"
          }
        ],
        "savingThrow": {
          "ability": "strength",
          "dc": 15,
          "onFailure": "Ціль затягується у простір пагорба й отримує стан Схоплений (втеча СК 14)."
        },
        "sourceText": "До завершення захоплення ціль має стани Засліплений і Стримуваний та отримує 10 (3к6) блискавичної шкоди на початку кожного свого ходу. Під час руху пагорба захоплена ціль рухається разом із ним без додаткових витрат руху. Ця дія може утримувати лише одну істоту."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "healing",
        "hit-points",
        "initiative",
        "resistance",
        "saving-throws"
      ],
      "conditionSlugs": [
        "blinded",
        "deafened",
        "exhaustion",
        "grappled",
        "restrained"
      ]
    },
    "sourcePage": 323
  },
  {
    "entity": "monster",
    "slug": "shield-guardian",
    "nameUk": "Щитовий охоронець",
    "nameOriginal": "Shield Guardian",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "17",
    "hitPoints": "142",
    "hitDice": "15к10 + 60",
    "initiative": {
      "modifier": "−1",
      "score": 9
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
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "intelligence": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Сліпобачення 10 фт",
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Розуміє команди будь-якою мовою, але не розмовляє"
    ],
    "challengeRating": "7",
    "experiencePoints": 2900,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "shield-guardian-bound",
        "nameUk": "Прив’язаний",
        "nameOriginal": "Bound",
        "sourceText": "Охоронець магічно прив’язаний до амулета. Поки вони на одному плані, носій амулета може телепатично покликати охоронця, а той знає відстань і напрямок до амулета. Якщо охоронець у межах 60 футів від носія, половина всієї шкоди носієві, округлена вгору, переноситься на охоронця."
      },
      {
        "id": "shield-guardian-regeneration",
        "nameUk": "Регенерація",
        "nameOriginal": "Regeneration",
        "sourceText": "На початку кожного свого ходу охоронець відновлює 10 хітів, якщо має щонайменше 1 хіт."
      },
      {
        "id": "shield-guardian-spell-storing",
        "nameUk": "Зберігання закляття",
        "nameOriginal": "Spell Storing",
        "sourceText": "Заклинач у амулеті охоронця може змусити його зберігати одне закляття 4 рівня або нижче, наклавши його на охоронця в межах 5 футів. Закляття не діє одразу; нове збережене закляття замінює попереднє. Охоронець може накласти збережене закляття без компонентів, із параметрами та заклинальною характеристикою первісного заклинача, після чого закляття втрачається."
      }
    ],
    "actions": [
      {
        "id": "shield-guardian-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Охоронець виконує дві атаки Кулаком."
      },
      {
        "id": "shield-guardian-fist",
        "nameUk": "Кулак",
        "nameOriginal": "Fist",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к6 + 4",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "силова",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к6 + 4) + 7 (2к6)",
        "damageType": "дробильна"
      }
    ],
    "reactions": [
      {
        "id": "shield-guardian-protection",
        "nameUk": "Захист",
        "nameOriginal": "Protection",
        "sourceText": "Тригер: кидок атаки влучає по носієві амулета охоронця, коли носій у межах 5 футів від охоронця. Відповідь: носій отримує +5 до КЗ, зокрема проти цієї атаки, що може перетворити влучання на промах, до початку наступного ходу охоронця."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "armor-class",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "healing",
        "hit-points",
        "initiative",
        "reaction"
      ],
      "conditionSlugs": [
        "charmed",
        "exhaustion",
        "frightened",
        "paralyzed",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 323
  },
  {
    "entity": "monster",
    "slug": "stone-golem",
    "nameUk": "Кам’яний голем",
    "nameOriginal": "Stone Golem",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Конструкт",
    "alignment": "без світогляду",
    "armorClass": "18",
    "hitPoints": "220",
    "hitDice": "21к10 + 105",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 22,
        "modifier": "+6",
        "save": "+6"
      },
      "dexterity": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "intelligence": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "immunities": [
      "отруйна",
      "психічна"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Виснаження",
      "Наляканий",
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 120 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Розуміє Спільну та ще дві мови, але не розмовляє"
    ],
    "challengeRating": "10",
    "experiencePoints": 5900,
    "proficiencyBonus": "+4",
    "traits": [
      {
        "id": "stone-golem-immutable-form",
        "nameUk": "Незмінна форма",
        "nameOriginal": "Immutable Form",
        "sourceText": "Голем не може змінювати форму."
      },
      {
        "id": "stone-golem-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Істота має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      }
    ],
    "actions": [
      {
        "id": "stone-golem-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Голем виконує дві атаки, використовуючи Удар або Силовий заряд у будь-якому поєднанні."
      },
      {
        "id": "stone-golem-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 15,
            "formula": "2к8 + 6",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 9,
            "formula": "2к8",
            "damageType": "силова",
            "application": "on-hit"
          }
        ],
        "damage": "15 (2к8 + 6) + 9 (2к8)",
        "damageType": "дробильна"
      },
      {
        "id": "stone-golem-force-bolt",
        "nameUk": "Силовий заряд",
        "nameOriginal": "Force Bolt",
        "attackType": "далекобійна",
        "attackBonus": "+9",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 22,
            "formula": "4к10",
            "damageType": "силова",
            "application": "on-hit"
          }
        ],
        "damage": "22 (4к10)",
        "damageType": "силова"
      }
    ],
    "bonusActions": [
      {
        "id": "stone-golem-slow",
        "nameUk": "Уповільнення",
        "nameOriginal": "Slow",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "sourceText": "Голем накладає закляття «Уповільнення» без компонентів, використовуючи Статуру як заклинальну характеристику (СК ряткидка 17)."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "charmed",
        "exhaustion",
        "frightened",
        "paralyzed",
        "petrified",
        "poisoned"
      ],
      "spellSlugs": [
        "slow"
      ]
    },
    "sourcePage": 330
  },
  {
    "entity": "monster",
    "slug": "treant",
    "nameUk": "Ент",
    "nameOriginal": "Treant",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Рослина",
    "alignment": "хаотично-добрий",
    "armorClass": "16",
    "hitPoints": "138",
    "hitDice": "12к12 + 60",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 23,
        "modifier": "+6",
        "save": "+6"
      },
      "dexterity": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 21,
        "modifier": "+5",
        "save": "+5"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "vulnerabilities": [
      "вогняна"
    ],
    "resistances": [
      "дробильна",
      "колюча"
    ],
    "passivePerception": 13,
    "languages": [
      "Спільна",
      "Друїдична",
      "Ельфійська",
      "Сильванська"
    ],
    "challengeRating": "9",
    "experiencePoints": 5000,
    "proficiencyBonus": "+4",
    "traits": [
      {
        "id": "treant-siege-monster",
        "nameUk": "Облогове чудовисько",
        "nameOriginal": "Siege Monster",
        "sourceText": "Істота завдає подвійної шкоди предметам і спорудам."
      }
    ],
    "actions": [
      {
        "id": "treant-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Ент виконує дві атаки Ударом."
      },
      {
        "id": "treant-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 16,
            "formula": "3к6 + 6",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "16 (3к6 + 6)",
        "damageType": "дробильна"
      },
      {
        "id": "treant-hail-of-bark",
        "nameUk": "Град кори",
        "nameOriginal": "Hail of Bark",
        "attackType": "далекобійна",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 28,
            "formula": "4к10 + 6",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "28 (4к10 + 6)",
        "damageType": "колюча"
      },
      {
        "id": "treant-animate-trees",
        "nameUk": "Оживлення дерев",
        "nameOriginal": "Animate Trees",
        "limitedUse": {
          "uses": 1,
          "period": "day"
        },
        "sourceText": "Ент магічно оживляє до двох видимих дерев у межах 60 футів. Кожне використовує stat block ента, але має Інтелект і Харизму 1, не розмовляє й не має цієї дії. Дерево ходить одразу після ента за тим самим значенням Ініціативи та слухається його. Воно залишається оживленим 1 день або доки не помре, не помре ент чи відстань до ента не перевищить 120 футів; після цього дерево вкорінюється, якщо може."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "resistance"
      ]
    },
    "sourcePage": 333
  },
  {
    "entity": "monster",
    "slug": "water-elemental",
    "nameUk": "Водяний елементаль",
    "nameOriginal": "Water Elemental",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "14",
    "hitPoints": "114",
    "hitDice": "12к10 + 48",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "плавання 90 фт"
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
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "intelligence": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "resistances": [
      "кислотна",
      "вогняна"
    ],
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Виснаження",
      "Схоплений",
      "Паралізований",
      "Скам’янілий",
      "Отруєний",
      "Збитий з ніг",
      "Стримуваний",
      "Непритомний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Первісна (Акван)"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "water-elemental-freeze",
        "nameUk": "Замерзання",
        "nameOriginal": "Freeze",
        "sourceText": "Якщо елементаль отримує холодну шкоду, його Швидкість зменшується на 20 футів до завершення його наступного ходу."
      },
      {
        "id": "water-elemental-water-form",
        "nameUk": "Водяна форма",
        "nameOriginal": "Water Form",
        "sourceText": "Елементаль може входити в простір ворога й зупинятися там. Він може проходити крізь простір завширшки лише 1 дюйм, не витрачаючи додаткового переміщення."
      }
    ],
    "actions": [
      {
        "id": "water-elemental-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Елементаль виконує дві атаки Ударом."
      },
      {
        "id": "water-elemental-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к8 + 4",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к8 + 4)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Збитий з ніг."
      },
      {
        "id": "water-elemental-whelm",
        "nameUk": "Захлинання",
        "nameOriginal": "Whelm",
        "target": "кожна істота в просторі елементаля",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 4,
          "maximum": 6
        },
        "damageInstances": [
          {
            "average": 22,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "4к8 + 4"
          },
          {
            "average": 9,
            "damageType": "дробильна",
            "application": "start-of-turn",
            "formula": "2к8"
          }
        ],
        "savingThrow": {
          "ability": "strength",
          "dc": 15,
          "onFailure": "Повна шкода; Велика або менша ціль отримує стан Схоплений (втеча СК 14).",
          "onSuccess": "Половина шкоди без додаткових ефектів."
        },
        "sourceText": "До завершення захоплення ціль має стан Стримуваний, задихається, якщо не може дихати водою, і отримує 9 (2к8) дробильної шкоди на початку кожного ходу елементаля. Елементаль може одночасно утримувати одну Велику або до двох Середніх чи менших істот. Істота в межах 5 футів може Дією витягнути захоплену істоту, успішно пройшовши перевірку Сили (Атлетика) СК 14."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "resistance",
        "saving-throws"
      ],
      "conditionSlugs": [
        "exhaustion",
        "grappled",
        "paralyzed",
        "petrified",
        "poisoned",
        "prone",
        "restrained",
        "unconscious"
      ]
    },
    "sourcePage": 337
  },
  {
    "entity": "monster",
    "slug": "xorn",
    "nameUk": "Ксорн",
    "nameOriginal": "Xorn",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Елементаль",
    "alignment": "нейтральний",
    "armorClass": "19",
    "hitPoints": "84",
    "hitDice": "8к8 + 48",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "20 фт",
      "копання 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 22,
        "modifier": "+6",
        "save": "+6"
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
        "save": "+0"
      }
    },
    "skills": {
      "Сприйняття": "+6",
      "Скритність": "+6"
    },
    "immunities": [
      "отруйна"
    ],
    "conditionImmunities": [
      "Паралізований",
      "Скам’янілий",
      "Отруєний"
    ],
    "senses": [
      "Темний зір 60 фт",
      "Треморочуття 60 фт"
    ],
    "passivePerception": 16,
    "languages": [
      "Первісна (Терран)"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "xorn-earth-glide",
        "nameUk": "Ковзання крізь землю",
        "nameOriginal": "Earth Glide",
        "sourceText": "Істота може прокопуватися крізь немагічні необроблені землю й камінь. Під час такого руху вона не порушує матеріал, крізь який проходить."
      },
      {
        "id": "xorn-treasure-sense",
        "nameUk": "Чуття скарбів",
        "nameOriginal": "Treasure Sense",
        "sourceText": "Ксорн точно визначає розташування дорогоцінних металів і каменів у межах 60 футів від себе."
      }
    ],
    "actions": [
      {
        "id": "xorn-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Ксорн виконує одну атаку Укусом і три атаки Кігтем."
      },
      {
        "id": "xorn-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 17,
            "formula": "4к6 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "17 (4к6 + 3)",
        "damageType": "колюча"
      },
      {
        "id": "xorn-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "formula": "1к10 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "8 (1к10 + 3)",
        "damageType": "рубальна"
      }
    ],
    "bonusActions": [
      {
        "id": "xorn-charge",
        "nameUk": "Ривок",
        "nameOriginal": "Charge",
        "sourceText": "Ксорн переміщується на відстань до своєї Швидкості або Швидкості копання по прямій до ворога, якого відчуває."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "paralyzed",
        "petrified",
        "poisoned"
      ]
    },
    "sourcePage": 343
  }
];
