import { SRD_52_SOURCE } from '../source';
import type { OfficialMonsterEntry } from '../types';

export const officialMonstrosities: OfficialMonsterEntry[] = [
  {
    "entity": "monster",
    "slug": "ankheg",
    "nameUk": "Анкхег",
    "nameOriginal": "Ankheg",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "45",
    "hitDice": "6к10 + 12",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт",
      "копання 10 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
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
        "save": "+2"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "senses": [
      "Темний зір 60 фт",
      "Треморочуття 60 фт"
    ],
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "ankheg-tunneler",
        "nameUk": "Тунельник",
        "nameOriginal": "Tunneler",
        "sourceText": "Анкхег може прокопуватися крізь суцільну породу з половиною Швидкості копання та залишає за собою тунель діаметром 10 футів."
      }
    ],
    "actions": [
      {
        "id": "ankheg-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 10,
            "formula": "2к6 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 3,
            "formula": "1к6",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "10 (2к6 + 3) + 3 (1к6)",
        "damageType": "рубальна",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Схоплений (втеча СК 13). Кидок атаки виконується з Перевагою, якщо ціль уже Схоплена анкхегом."
      },
      {
        "id": "ankheg-acid-spray",
        "nameUk": "Кислотний струмінь",
        "nameOriginal": "Acid Spray",
        "target": "кожна істота в лінії завдовжки 30 фт і завширшки 5 фт",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "damageInstances": [
          {
            "average": 14,
            "formula": "4к6",
            "damageType": "кислотна",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 12,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Кожна ціль виконує ряткидок Спритності СК 12."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "grappled"
      ]
    },
    "sourcePage": 259
  },
  {
    "entity": "monster",
    "slug": "axe-beak",
    "nameUk": "Сокиродзьоб",
    "nameOriginal": "Axe Beak",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "19",
    "hitDice": "3к10 + 3",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
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
        "score": 2,
        "modifier": "−4",
        "save": "−4"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "axe-beak-beak",
        "nameUk": "Дзьоб",
        "nameOriginal": "Beak",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "reach": "5 фт",
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
        "damage-rolls",
        "initiative"
      ]
    },
    "sourcePage": 260
  },
  {
    "entity": "monster",
    "slug": "basilisk",
    "nameUk": "Василіск",
    "nameOriginal": "Basilisk",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "15",
    "hitPoints": "52",
    "hitDice": "8к8 + 16",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "basilisk-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 10,
            "formula": "2к6 + 3",
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
        "damage": "10 (2к6 + 3) + 7 (2к6)",
        "damageType": "колюча"
      }
    ],
    "bonusActions": [
      {
        "id": "basilisk-petrifying-gaze",
        "nameUk": "Скам’янілий погляд",
        "nameOriginal": "Petrifying Gaze",
        "target": "кожна істота в 30-футовому конусі; також власник погляду, якщо бачить своє відображення в конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 4,
          "maximum": 6
        },
        "savingThrow": {
          "ability": "constitution",
          "dc": 12,
          "onFailure": "Перший провал: стан Стримуваний. Другий провал: стан Скам’янілий замість Стримуваного.",
          "repeat": {
            "timing": "наприкінці наступного ходу цілі, якщо вона все ще Стримувана",
            "endsEffectOnSuccess": true
          }
        },
        "sourceText": "Після першого провалу ціль повторює ряткидок наприкінці свого наступного ходу, якщо все ще Стримувана, завершуючи ефект при успіху. Другий провал змінює стан на Скам’янілий."
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
      ],
      "conditionSlugs": [
        "petrified",
        "restrained"
      ]
    },
    "sourcePage": 262
  },
  {
    "entity": "monster",
    "slug": "behir",
    "nameUk": "Бегір",
    "nameOriginal": "Behir",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Монстр",
    "alignment": "нейтрально-злий",
    "armorClass": "17",
    "hitPoints": "168",
    "hitDice": "16к12 + 64",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "50 фт",
      "лазіння 50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 23,
        "modifier": "+6",
        "save": "+6"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
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
    "skills": {
      "Сприйняття": "+6",
      "Скритність": "+7"
    },
    "immunities": [
      "блискавична"
    ],
    "senses": [
      "Темний зір 90 фт"
    ],
    "passivePerception": 16,
    "languages": [
      "Драконяча"
    ],
    "challengeRating": "11",
    "experiencePoints": 7200,
    "proficiencyBonus": "+4",
    "actions": [
      {
        "id": "behir-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Бегір виконує одну атаку Укусом і використовує Стискання."
      },
      {
        "id": "behir-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+10",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 19,
            "formula": "2к12 + 6",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 11,
            "formula": "2к10",
            "damageType": "блискавична",
            "application": "on-hit"
          }
        ],
        "damage": "19 (2к12 + 6) + 11 (2к10)",
        "damageType": "колюча"
      },
      {
        "id": "behir-constrict",
        "nameUk": "Стискання",
        "nameOriginal": "Constrict",
        "target": "одна видима Велика або менша істота в межах 5 фт",
        "damageInstances": [
          {
            "average": 28,
            "formula": "5к8 + 6",
            "damageType": "дробильна",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "strength",
          "dc": 18,
          "onFailure": "Повна шкода; стани Схоплений (втеча СК 16) і Стримуваний до завершення захоплення."
        },
        "sourceText": "Ціль виконує ряткидок Сили СК 18."
      },
      {
        "id": "behir-lightning-breath",
        "nameUk": "Блискавичний подих",
        "nameOriginal": "Lightning Breath",
        "target": "кожна істота в лінії завдовжки 90 фт і завширшки 5 фт",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "damageInstances": [
          {
            "average": 66,
            "formula": "12к10",
            "damageType": "блискавична",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 16,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Кожна ціль виконує ряткидок Спритності СК 16."
      }
    ],
    "bonusActions": [
      {
        "id": "behir-swallow",
        "nameUk": "Поглинання",
        "nameOriginal": "Swallow",
        "target": "одна Велика або менша істота, Схоплена істотою; одночасно можна проковтнути до одну істоту",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 18,
          "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
        },
        "damageInstances": [
          {
            "average": 21,
            "formula": "6к6",
            "damageType": "кислотна",
            "application": "start-of-turn"
          }
        ],
        "sourceText": "Проковтнута істота має стани Засліплений і Стримуваний та Повне укриття від атак й ефектів ззовні. На початку кожного ходу бегіра ціль отримує 21 (6к6) кислотної шкоди. Якщо істота отримує щонайменше 30 шкоди за один хід від проковтнутої істоти, наприкінці цього ходу вона виконує ряткидок Статури СК 14; у разі провалу відригує всіх проковтнутих істот, які падають у просторі в межах 10 футів і отримують стан Збитий з ніг. Після смерті істоти проковтнута ціль більше не Стримувана й може вибратися з тіла, витративши 15 футів переміщення, виходячи Збитою з ніг.",
        "mechanicSteps": [
          {
            "id": "behir-swallow-save",
            "order": 1,
            "label": "Ряткидок",
            "text": "Ціль виконує ряткидок Спритності СК 18.",
            "savingThrow": {
              "ability": "dexterity",
              "dc": 18,
              "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
            }
          },
          {
            "id": "behir-swallow-contained",
            "order": 2,
            "label": "Усередині",
            "text": "Ціль має стани Засліплений і Стримуваний та Повне укриття від зовнішніх атак й ефектів.",
            "conditionSlugs": [
              "blinded",
              "restrained"
            ]
          },
          {
            "id": "behir-swallow-damage",
            "order": 3,
            "label": "Початок ходу",
            "text": "На початку кожного ходу бегіра ціль отримує 21 (6к6) кислотної шкоди.",
            "damageInstances": [
              {
                "average": 21,
                "formula": "6к6",
                "damageType": "кислотна",
                "application": "start-of-turn"
              }
            ]
          },
          {
            "id": "behir-swallow-release",
            "order": 4,
            "label": "Звільнення",
            "text": "Після 30 шкоди зсередини за один хід істота мусить пройти ряткидок Статури СК 14 або відригнути всіх проковтнутих істот."
          }
        ]
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
      ],
      "conditionSlugs": [
        "blinded",
        "grappled",
        "prone",
        "restrained"
      ]
    },
    "sourcePage": 263
  },
  {
    "entity": "monster",
    "slug": "bulette",
    "nameUk": "Булет",
    "nameOriginal": "Bulette",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "17",
    "hitPoints": "94",
    "hitDice": "9к10 + 45",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "40 фт",
      "копання 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 21,
        "modifier": "+5",
        "save": "+5"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
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
      "Сприйняття": "+6"
    },
    "senses": [
      "Темний зір 60 фт",
      "Треморочуття 120 фт"
    ],
    "passivePerception": 16,
    "languages": [],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "bulette-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Булет виконує дві атаки Укусом."
      },
      {
        "id": "bulette-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 17,
            "formula": "2к12 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "17 (2к12 + 4)",
        "damageType": "колюча"
      },
      {
        "id": "bulette-deadly-leap",
        "nameUk": "Смертельний стрибок",
        "nameOriginal": "Deadly Leap",
        "target": "кожна істота у просторі приземлення",
        "damageInstances": [
          {
            "average": 19,
            "formula": "3к12",
            "damageType": "дробильна",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 15,
          "onFailure": "Повна шкода та стан Збитий з ніг.",
          "onSuccess": "Половина шкоди; ціль відштовхується на 5 футів по прямій від булета."
        },
        "sourceText": "Булет витрачає 5 футів переміщення, щоб стрибнути у простір у межах 15 футів, де є одна чи більше Великих або менших істот."
      }
    ],
    "bonusActions": [
      {
        "id": "bulette-leap",
        "nameUk": "Стрибок",
        "nameOriginal": "Leap",
        "sourceText": "Булет стрибає на відстань до 30 футів, витрачаючи 10 футів переміщення."
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
      ],
      "conditionSlugs": [
        "prone"
      ]
    },
    "sourcePage": 272
  },
  {
    "entity": "monster",
    "slug": "chimera",
    "nameUk": "Химера",
    "nameOriginal": "Chimera",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "хаотично-злий",
    "armorClass": "14",
    "hitPoints": "114",
    "hitDice": "12к10 + 48",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "intelligence": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      }
    },
    "skills": {
      "Сприйняття": "+8"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 18,
    "languages": [
      "Розуміє Драконячу, але не розмовляє"
    ],
    "challengeRating": "6",
    "experiencePoints": 2300,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "chimera-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Химера виконує одну атаку Тараном, одну Укусом і одну Кігтем. Атаку Кігтем вона може замінити Вогняним подихом, якщо той доступний."
      },
      {
        "id": "chimera-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к6 + 4",
            "damageType": "колюча",
            "application": "on-hit",
            "qualifier": "звичайне влучання"
          },
          {
            "average": 18,
            "formula": "4к6 + 4",
            "damageType": "колюча",
            "application": "on-hit",
            "qualifier": "якщо кидок атаки мав Перевагу"
          }
        ],
        "damage": "11 (2к6 + 4) + 18 (4к6 + 4)",
        "damageType": "колюча",
        "sourceText": "Якщо кидок атаки мав Перевагу, колюча шкода становить 18 (4к6 + 4) замість 11 (2к6 + 4)."
      },
      {
        "id": "chimera-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к6 + 4",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к6 + 4)",
        "damageType": "рубальна"
      },
      {
        "id": "chimera-ram",
        "nameUk": "Таран",
        "nameOriginal": "Ram",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 10,
            "formula": "1к12 + 4",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "10 (1к12 + 4)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Збитий з ніг."
      },
      {
        "id": "chimera-fire-breath",
        "nameUk": "Вогняний подих",
        "nameOriginal": "Fire Breath",
        "target": "кожна істота в 15-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "damageInstances": [
          {
            "average": 31,
            "formula": "7к8",
            "damageType": "вогняна",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 15,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Кожна ціль виконує ряткидок Спритності СК 15."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "prone"
      ]
    },
    "sourcePage": 273
  },
  {
    "entity": "monster",
    "slug": "cockatrice",
    "nameUk": "Кокатрис",
    "nameOriginal": "Cockatrice",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "22",
    "hitDice": "5к6 + 5",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "20 фт",
      "політ 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
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
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "conditionImmunities": [
      "Скам’янілий"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "cockatrice-petrifying-bite",
        "nameUk": "Скам’янілий укус",
        "nameOriginal": "Petrifying Bite",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 3,
            "formula": "1к4 + 1",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "3 (1к4 + 1)",
        "damageType": "колюча",
        "savingThrow": {
          "ability": "constitution",
          "dc": 11,
          "onFailure": "Перший провал: стан Стримуваний. Другий провал: стан Скам’янілий на 24 години замість Стримуваного.",
          "repeat": {
            "timing": "наприкінці наступного ходу цілі, якщо вона все ще Стримувана",
            "endsEffectOnSuccess": true
          }
        },
        "sourceText": "Якщо ціль є істотою, вона виконує ряткидок Статури СК 11. Після першого провалу повторює його наприкінці наступного ходу; успіх завершує ефект, а другий провал надає стан Скам’янілий на 24 години."
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
        "petrified",
        "restrained"
      ]
    },
    "sourcePage": 275
  },
  {
    "entity": "monster",
    "slug": "death-dog",
    "nameUk": "Пес смерті",
    "nameOriginal": "Death Dog",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "нейтрально-злий",
    "armorClass": "12",
    "hitPoints": "39",
    "hitDice": "6к8 + 12",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+4"
    },
    "conditionImmunities": [
      "Засліплений",
      "Зачарований",
      "Оглухлий",
      "Наляканий",
      "Приголомшений",
      "Непритомний"
    ],
    "senses": [
      "Темний зір 120 фт"
    ],
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "death-dog-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Пес смерті виконує дві атаки Укусом."
      },
      {
        "id": "death-dog-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 4,
            "formula": "1к4 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "4 (1к4 + 2)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль є істотою, вона виконує ряткидок Статури СК 12. Перший провал надає стан Отруєний. Поки ціль Отруєна, максимум її хітів не відновлюється після Тривалого відпочинку, і вона повторює ряткидок кожні 24 години, завершуючи ефект при успіху. Кожен наступний провал зменшує максимум хітів Отруєної цілі на 5 (1к10).",
        "savingThrow": {
          "ability": "constitution",
          "dc": 12,
          "onFailure": "Перший провал: стан Отруєний; наступні провали зменшують максимум хітів на 5 (1к10).",
          "repeat": {
            "timing": "кожні 24 години",
            "endsEffectOnSuccess": true
          }
        }
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "poisoned"
      ]
    },
    "sourcePage": 279
  },
  {
    "entity": "monster",
    "slug": "doppelganger",
    "nameUk": "Допельгангер",
    "nameOriginal": "Doppelganger",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "нейтральний",
    "armorClass": "14",
    "hitPoints": "52",
    "hitDice": "8к8 + 16",
    "initiative": {
      "modifier": "+4",
      "score": 14
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
        "save": "+4"
      },
      "constitution": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      }
    },
    "skills": {
      "Обман": "+6",
      "Проникливість": "+3"
    },
    "conditionImmunities": [
      "Зачарований"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 11,
    "languages": [
      "Спільна та ще три мови"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "doppelganger-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Допельгангер виконує дві атаки Ударом і використовує Моторошний образ, якщо той доступний."
      },
      {
        "id": "doppelganger-slam",
        "nameUk": "Удар",
        "nameOriginal": "Slam",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к6 + 4",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к6 + 4)",
        "damageType": "дробильна",
        "sourceText": "У першому раунді кожного бою кидок атаки виконується з Перевагою."
      },
      {
        "id": "doppelganger-read-thoughts",
        "nameUk": "Читання думок",
        "nameOriginal": "Read Thoughts",
        "sourceText": "Допельгангер накладає «Читання думок» без компонентів, використовуючи Харизму як заклинальну характеристику (СК ряткидка заклять 12)."
      },
      {
        "id": "doppelganger-unsettling-visage",
        "nameUk": "Моторошний образ",
        "nameOriginal": "Unsettling Visage",
        "target": "кожна істота в 15-футовій еманації, яка бачить допельгангера",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "savingThrow": {
          "ability": "wisdom",
          "dc": 12,
          "onFailure": "Стан Наляканий.",
          "repeat": {
            "timing": "наприкінці кожного свого ходу",
            "endsEffectOnSuccess": true
          }
        },
        "sourceText": "Ціль повторює ряткидок наприкінці кожного свого ходу, завершуючи ефект при успіху. Через 1 хвилину вона автоматично досягає успіху."
      }
    ],
    "bonusActions": [
      {
        "id": "doppelganger-shape-shift",
        "nameUk": "Зміна форми",
        "nameOriginal": "Shape-Shift",
        "sourceText": "Допельгангер змінює форму на Середнього або Малого Гуманоїда або повертається до істинної форми. Його ігрові параметри, крім розміру, однакові в кожній формі. Спорядження, яке він носить або тримає, не перетворюється."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "frightened"
      ],
      "spellSlugs": [
        "detect-thoughts"
      ]
    },
    "sourcePage": 280
  },
  {
    "entity": "monster",
    "slug": "drider",
    "nameUk": "Драйдер",
    "nameOriginal": "Drider",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "хаотично-злий",
    "armorClass": "19",
    "hitPoints": "123",
    "hitDice": "13к10 + 52",
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
        "score": 18,
        "modifier": "+4",
        "save": "+4"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "skills": {
      "Сприйняття": "+6",
      "Скритність": "+10"
    },
    "senses": [
      "Темний зір 120 фт"
    ],
    "passivePerception": 16,
    "languages": [
      "Ельфійська, Підземна спільна"
    ],
    "challengeRating": "6",
    "experiencePoints": 2300,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "drider-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Драйдер може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      },
      {
        "id": "drider-sunlight-sensitivity",
        "nameUk": "Чутливість до сонячного світла",
        "nameOriginal": "Sunlight Sensitivity",
        "sourceText": "Під сонячним світлом драйдер має Невдачу на перевірки характеристик і кидки атаки."
      },
      {
        "id": "drider-web-walker",
        "nameUk": "Ходіння павутиною",
        "nameOriginal": "Web Walker",
        "sourceText": "Драйдер ігнорує обмеження руху від павутини й знає місцеперебування будь-якої іншої істоти, що торкається тієї самої павутини."
      }
    ],
    "actions": [
      {
        "id": "drider-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Драйдер виконує три атаки Передньою ногою або Отруйним спалахом у будь-якому поєднанні."
      },
      {
        "id": "drider-foreleg",
        "nameUk": "Передня нога",
        "nameOriginal": "Foreleg",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к8 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к8 + 4)",
        "damageType": "колюча"
      },
      {
        "id": "drider-poison-burst",
        "nameUk": "Отруйний спалах",
        "nameOriginal": "Poison Burst",
        "attackType": "далекобійна",
        "attackBonus": "+6",
        "target": "одна ціль",
        "range": "120 фт",
        "damageInstances": [
          {
            "average": 13,
            "formula": "3к6 + 3",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "13 (3к6 + 3)",
        "damageType": "отруйна"
      }
    ],
    "bonusActions": [
      {
        "id": "drider-magic-of-the-spider-queen",
        "nameUk": "Магія Павучої Королеви",
        "nameOriginal": "Magic of the Spider Queen",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "sourceText": "Драйдер накладає «Темряву», «Фейське сяйво» або «Павутину» без Матеріальних компонентів, використовуючи Мудрість як заклинальну характеристику (СК ряткидка заклять 14)."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "disadvantage",
        "initiative"
      ],
      "spellSlugs": [
        "darkness",
        "faerie-fire",
        "web"
      ]
    },
    "sourcePage": 281
  },
  {
    "entity": "monster",
    "slug": "ettercap",
    "nameUk": "Еттеркап",
    "nameOriginal": "Ettercap",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "нейтрально-злий",
    "armorClass": "13",
    "hitPoints": "44",
    "hitDice": "8к8 + 8",
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
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "skills": {
      "Сприйняття": "+3",
      "Скритність": "+4",
      "Виживання": "+3"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "ettercap-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Еттеркап може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      },
      {
        "id": "ettercap-web-walker",
        "nameUk": "Ходіння павутиною",
        "nameOriginal": "Web Walker",
        "sourceText": "Еттеркап ігнорує обмеження руху від павутини й знає місцеперебування будь-якої іншої істоти, що торкається тієї самої павутини."
      }
    ],
    "actions": [
      {
        "id": "ettercap-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Еттеркап виконує одну атаку Укусом і одну Кігтем."
      },
      {
        "id": "ettercap-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 5,
            "formula": "1к6 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 2,
            "formula": "1к4",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к6 + 2) + 2 (1к4)",
        "damageType": "колюча",
        "sourceText": "Ціль отримує стан Отруєний до початку наступного ходу еттеркапа."
      },
      {
        "id": "ettercap-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "reach": "5 фт",
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
      },
      {
        "id": "ettercap-web-strand",
        "nameUk": "Павутинна нитка",
        "nameOriginal": "Web Strand",
        "target": "одна видима Велика або менша істота в межах 30 фт",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "savingThrow": {
          "ability": "dexterity",
          "dc": 12,
          "onFailure": "Стан Стримуваний, доки павутину не знищено."
        },
        "sourceText": "Павутина має КЗ 10, 5 хітів, Вразливість до вогняної шкоди й Імунітет до дробильної, отруйної та психічної шкоди."
      }
    ],
    "bonusActions": [
      {
        "id": "ettercap-reel",
        "nameUk": "Підтягування",
        "nameOriginal": "Reel",
        "sourceText": "Еттеркап притягує на відстань до 25 футів по прямій до себе одну істоту в межах 30 футів, Стримувану його Павутинною ниткою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "poisoned",
        "restrained"
      ]
    },
    "sourcePage": 284
  },
  {
    "entity": "monster",
    "slug": "griffon",
    "nameUk": "Грифон",
    "nameOriginal": "Griffon",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "59",
    "hitDice": "7к10 + 21",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "політ 80 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "skills": {
      "Сприйняття": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "griffon-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Грифон виконує дві атаки Роздиранням."
      },
      {
        "id": "griffon-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 8,
            "formula": "1к8 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "8 (1к8 + 4)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Схоплений (втеча СК 14) обома передніми кігтями грифона."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "grappled"
      ]
    },
    "sourcePage": 295
  },
  {
    "entity": "monster",
    "slug": "harpy",
    "nameUk": "Гарпія",
    "nameOriginal": "Harpy",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "хаотично-злий",
    "armorClass": "11",
    "hitPoints": "38",
    "hitDice": "7к8 + 7",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "20 фт",
      "політ 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
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
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "passivePerception": 10,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "harpy-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 6,
            "formula": "2к4 + 1",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "6 (2к4 + 1)",
        "damageType": "рубальна"
      },
      {
        "id": "harpy-luring-song",
        "nameUk": "Зваблива пісня",
        "nameOriginal": "Luring Song",
        "target": "кожен Гуманоїд і Велетень у 300-футовій еманації на початку пісні",
        "savingThrow": {
          "ability": "wisdom",
          "dc": 11,
          "onFailure": "Стан Зачарований до завершення пісні.",
          "onSuccess": "Імунітет до Звабливої пісні цієї гарпії на 24 години.",
          "repeat": {
            "timing": "наприкінці кожного свого ходу, перед входом у небезпечну місцевість і після шкоди від іншого джерела",
            "endsEffectOnSuccess": true
          }
        },
        "sourceText": "Мелодія триває, доки гарпія підтримує Концентрацію. Зачарована ціль також Недієздатна, ігнорує пісні інших гарпій і у свій хід рухається найпрямішим шляхом до простору в межах 5 футів від гарпії, не уникаючи Провокованих атак. Вона повторює ряткидок перед входом у небезпечну місцевість і щоразу після шкоди не від гарпії."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "concentration",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "opportunity-attacks",
        "saving-throws"
      ],
      "conditionSlugs": [
        "charmed"
      ]
    },
    "sourcePage": 297
  },
  {
    "entity": "monster",
    "slug": "hippogriff",
    "nameUk": "Гіпогриф",
    "nameOriginal": "Hippogriff",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "26",
    "hitDice": "4к10 + 4",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "40 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
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
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "skills": {
      "Сприйняття": "+5"
    },
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "hippogriff-flyby",
        "nameUk": "Проліт",
        "nameOriginal": "Flyby",
        "sourceText": "Гіпогриф не провокує Провоковану атаку, коли вилітає з досяжності ворога."
      }
    ],
    "actions": [
      {
        "id": "hippogriff-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Гіпогриф виконує дві атаки Роздиранням."
      },
      {
        "id": "hippogriff-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к8 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к8 + 3)",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    },
    "sourcePage": 298
  },
  {
    "entity": "monster",
    "slug": "hydra",
    "nameUk": "Гідра",
    "nameOriginal": "Hydra",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "15",
    "hitPoints": "184",
    "hitDice": "16к12 + 80",
    "initiative": {
      "modifier": "+4",
      "score": 14
    },
    "speed": [
      "40 фт",
      "плавання 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
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
    "skills": {
      "Сприйняття": "+6"
    },
    "conditionImmunities": [
      "Засліплений",
      "Зачарований",
      "Оглухлий",
      "Наляканий",
      "Приголомшений",
      "Непритомний"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 16,
    "languages": [],
    "challengeRating": "8",
    "experiencePoints": 3900,
    "proficiencyBonus": "+3",
    "traits": [
      {
        "id": "hydra-hold-breath",
        "nameUk": "Затримка дихання",
        "nameOriginal": "Hold Breath",
        "sourceText": "Гідра може затримувати дихання на 1 годину."
      },
      {
        "id": "hydra-multiple-heads",
        "nameUk": "Багато голів",
        "nameOriginal": "Multiple Heads",
        "sourceText": "Гідра має п’ять голів. Коли вона отримує щонайменше 25 шкоди за один хід, одна голова гине. Гідра помирає, якщо загинули всі голови. Наприкінці кожного свого ходу, якщо лишилася хоча б одна жива голова, гідра вирощує дві голови за кожну голову, що загинула від її попереднього ходу, якщо відтоді вона не отримувала вогняної шкоди. Вирощуючи нові голови, гідра відновлює 20 хітів."
      },
      {
        "id": "hydra-reactive-heads",
        "nameUk": "Реактивні голови",
        "nameOriginal": "Reactive Heads",
        "sourceText": "За кожну голову понад одну гідра отримує додаткову Реакцію, яку можна використати лише для Провокованої атаки."
      }
    ],
    "actions": [
      {
        "id": "hydra-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Гідра виконує стільки атак Укусом, скільки має голів."
      },
      {
        "id": "hydra-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+8",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 10,
            "formula": "1к10 + 5",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "10 (1к10 + 5)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "hit-points",
        "initiative",
        "opportunity-attacks"
      ]
    },
    "sourcePage": 300
  },
  {
    "entity": "monster",
    "slug": "kraken",
    "nameUk": "Кракен",
    "nameOriginal": "Kraken",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Колосальний",
    "creatureType": "Монстр",
    "alignment": "хаотично-злий",
    "armorClass": "18",
    "hitPoints": "481",
    "hitDice": "26к20 + 208",
    "initiative": {
      "modifier": "+14",
      "score": 24
    },
    "speed": [
      "30 фт",
      "плавання 120 фт"
    ],
    "abilities": {
      "strength": {
        "score": 30,
        "modifier": "+10",
        "save": "+17"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+7"
      },
      "constitution": {
        "score": 26,
        "modifier": "+8",
        "save": "+15"
      },
      "intelligence": {
        "score": 22,
        "modifier": "+6",
        "save": "+6"
      },
      "wisdom": {
        "score": 18,
        "modifier": "+4",
        "save": "+11"
      },
      "charisma": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
      }
    },
    "subtype": "титан",
    "skills": {
      "Історія": "+13",
      "Сприйняття": "+11"
    },
    "immunities": [
      "холодна",
      "блискавична"
    ],
    "conditionImmunities": [
      "Наляканий",
      "Схоплений",
      "Паралізований",
      "Стримуваний"
    ],
    "senses": [
      "Істинний зір 120 фт"
    ],
    "passivePerception": 21,
    "languages": [
      "Розуміє Безодневу, Небесну, Інфернальну та Первісну, але не розмовляє",
      "телепатія 120 ft."
    ],
    "challengeRating": "23",
    "experiencePoints": 50000,
    "proficiencyBonus": "+7",
    "alternativeExperience": [
      {
        "experiencePoints": 62000,
        "condition": "у лігві"
      }
    ],
    "traits": [
      {
        "id": "kraken-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Кракен може дихати повітрям і водою."
      },
      {
        "id": "kraken-legendary-resistance",
        "nameUk": "Легендарний опір",
        "nameOriginal": "Legendary Resistance",
        "sourceText": "Якщо кракен провалює ряткидок, він може натомість досягти успіху.",
        "limitedUse": {
          "uses": 4,
          "period": "day",
          "qualifier": "5 разів на день у лігві"
        }
      },
      {
        "id": "kraken-siege-monster",
        "nameUk": "Облогове чудовисько",
        "nameOriginal": "Siege Monster",
        "sourceText": "Кракен завдає подвійної шкоди предметам і спорудам."
      }
    ],
    "actions": [
      {
        "id": "kraken-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Кракен виконує дві атаки Щупальцем і використовує Жбурляння, Удар блискавки або Поглинання."
      },
      {
        "id": "kraken-tentacle",
        "nameUk": "Щупальце",
        "nameOriginal": "Tentacle",
        "attackType": "ближня",
        "attackBonus": "+17",
        "target": "одна ціль",
        "reach": "30 фт",
        "damageInstances": [
          {
            "average": 24,
            "formula": "4к6 + 10",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "24 (4к6 + 10)",
        "damageType": "дробильна"
      },
      {
        "id": "kraken-fling",
        "nameUk": "Жбурляння",
        "nameOriginal": "Fling",
        "target": "кинута Велика або менша Схоплена істота та кожна істота у просторі приземлення в межах 60 фт",
        "damageInstances": [
          {
            "average": 18,
            "formula": "4к8",
            "damageType": "дробильна",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 25,
          "onFailure": "Повна шкода та стан Збитий з ніг.",
          "onSuccess": "Половина шкоди без додаткового ефекту."
        },
        "sourceText": "Кракен жбурляє Схоплену істоту у видимий простір, який не розташований у повітрі."
      },
      {
        "id": "kraken-lightning-strike",
        "nameUk": "Удар блискавки",
        "nameOriginal": "Lightning Strike",
        "target": "одна видима істота в межах 120 фт",
        "damageInstances": [
          {
            "average": 33,
            "formula": "6к10",
            "damageType": "блискавична",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "dexterity",
          "dc": 23,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Ціль виконує ряткидок Спритності СК 23."
      },
      {
        "id": "kraken-swallow",
        "nameUk": "Поглинання",
        "nameOriginal": "Swallow",
        "target": "одна Велика або менша істота, Схоплена істотою; одночасно можна проковтнути до чотири істоти",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 25,
          "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
        },
        "damageInstances": [
          {
            "average": 23,
            "formula": "3к8 + 10",
            "damageType": "колюча",
            "application": "failed-save"
          },
          {
            "average": 24,
            "formula": "7к6",
            "damageType": "кислотна",
            "application": "start-of-turn"
          }
        ],
        "sourceText": "Проковтнута істота має стани Засліплений і Стримуваний та Повне укриття від атак й ефектів ззовні. При провалі ціль спершу отримує 23 (3к8 + 10) колючої шкоди; проковтнута ціль отримує 24 (7к6) кислотної шкоди на початку кожного свого ходу. Якщо істота отримує щонайменше 50 шкоди за один хід від проковтнутої істоти, наприкінці цього ходу вона виконує ряткидок Статури СК 25; у разі провалу відригує всіх проковтнутих істот, які падають у просторі в межах 10 футів і отримують стан Збитий з ніг. Після смерті істоти проковтнута ціль більше не Стримувана й може вибратися з тіла, витративши 15 футів переміщення, виходячи Збитою з ніг.",
        "mechanicSteps": [
          {
            "id": "kraken-swallow-save",
            "order": 1,
            "label": "Ряткидок",
            "text": "Ціль виконує ряткидок Спритності СК 25.",
            "savingThrow": {
              "ability": "dexterity",
              "dc": 25,
              "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
            }
          },
          {
            "id": "kraken-swallow-contained",
            "order": 2,
            "label": "Усередині",
            "text": "Ціль має стани Засліплений і Стримуваний та Повне укриття від зовнішніх атак й ефектів.",
            "conditionSlugs": [
              "blinded",
              "restrained"
            ]
          },
          {
            "id": "kraken-swallow-damage",
            "order": 3,
            "label": "Початок ходу",
            "text": "При провалі ціль спершу отримує 23 (3к8 + 10) колючої шкоди; проковтнута ціль отримує 24 (7к6) кислотної шкоди на початку кожного свого ходу.",
            "damageInstances": [
              {
                "average": 23,
                "formula": "3к8 + 10",
                "damageType": "колюча",
                "application": "failed-save"
              },
              {
                "average": 24,
                "formula": "7к6",
                "damageType": "кислотна",
                "application": "start-of-turn"
              }
            ]
          },
          {
            "id": "kraken-swallow-release",
            "order": 4,
            "label": "Звільнення",
            "text": "Після 50 шкоди зсередини за один хід істота мусить пройти ряткидок Статури СК 25 або відригнути всіх проковтнутих істот."
          }
        ]
      }
    ],
    "legendaryActions": [
      {
        "id": "kraken-storm-bolt",
        "nameUk": "Буревійний заряд",
        "nameOriginal": "Storm Bolt",
        "sourceText": "Кракен використовує Удар блискавки.",
        "legendaryActionCost": 1
      },
      {
        "id": "kraken-toxic-ink",
        "nameUk": "Токсичне чорнило",
        "nameOriginal": "Toxic Ink",
        "target": "кожна істота в 15-футовій еманації від кракена, поки він під водою",
        "savingThrow": {
          "ability": "constitution",
          "dc": 23,
          "onFailure": "Стани Засліплений і Отруєний до завершення наступного ходу кракена."
        },
        "sourceText": "Після цього кракен переміщується на відстань до своєї Швидкості. Незалежно від успіху чи провалу він не може знову використати цю дію до початку свого наступного ходу.",
        "legendaryActionCost": 1
      }
    ],
    "legendaryActionUses": "3 (4 у лігві)",
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "blinded",
        "grappled",
        "poisoned",
        "prone",
        "restrained"
      ]
    },
    "sourcePage": 303
  },
  {
    "entity": "monster",
    "slug": "manticore",
    "nameUk": "Мантикора",
    "nameOriginal": "Manticore",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "законно-злий",
    "armorClass": "14",
    "hitPoints": "68",
    "hitDice": "8к10 + 24",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт",
      "політ 50 фт"
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
        "save": "+3"
      },
      "constitution": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 11,
    "languages": [
      "Спільна"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "manticore-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Мантикора виконує три атаки Роздиранням або Хвостовим шипом у будь-якому поєднанні."
      },
      {
        "id": "manticore-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к8 + 3",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к8 + 3)",
        "damageType": "рубальна"
      },
      {
        "id": "manticore-tail-spike",
        "nameUk": "Хвостовий шип",
        "nameOriginal": "Tail Spike",
        "attackType": "далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "range": "100/200 фт",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к8 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к8 + 3)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    },
    "sourcePage": 306
  },
  {
    "entity": "monster",
    "slug": "medusa",
    "nameUk": "Медуза",
    "nameOriginal": "Medusa",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "законно-злий",
    "armorClass": "15",
    "hitPoints": "127",
    "hitDice": "17к8 + 51",
    "initiative": {
      "modifier": "+6",
      "score": 16
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "wisdom": {
        "score": 13,
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
      "Обман": "+5",
      "Сприйняття": "+4",
      "Скритність": "+6"
    },
    "senses": [
      "Темний зір 150 фт"
    ],
    "passivePerception": 14,
    "languages": [
      "Спільна та ще одна мова"
    ],
    "challengeRating": "6",
    "experiencePoints": 2300,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "medusa-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Медуза виконує дві атаки Кігтем і одну атаку Зміїним волоссям або три атаки Отруйним променем."
      },
      {
        "id": "medusa-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
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
        "id": "medusa-snake-hair",
        "nameUk": "Зміїне волосся",
        "nameOriginal": "Snake Hair",
        "attackType": "ближня",
        "attackBonus": "+6",
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
            "average": 14,
            "formula": "4к6",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "5 (1к4 + 3) + 14 (4к6)",
        "damageType": "колюча"
      },
      {
        "id": "medusa-poison-ray",
        "nameUk": "Отруйний промінь",
        "nameOriginal": "Poison Ray",
        "attackType": "далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "range": "150 фт",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к8 + 2",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к8 + 2)",
        "damageType": "отруйна"
      }
    ],
    "bonusActions": [
      {
        "id": "medusa-petrifying-gaze",
        "nameUk": "Скам’янілий погляд",
        "nameOriginal": "Petrifying Gaze",
        "target": "кожна істота в 30-футовому конусі; також власник погляду, якщо бачить своє відображення в конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "savingThrow": {
          "ability": "constitution",
          "dc": 13,
          "onFailure": "Перший провал: стан Стримуваний. Другий провал: стан Скам’янілий замість Стримуваного.",
          "repeat": {
            "timing": "наприкінці наступного ходу цілі, якщо вона все ще Стримувана",
            "endsEffectOnSuccess": true
          }
        },
        "sourceText": "Після першого провалу ціль повторює ряткидок наприкінці свого наступного ходу, якщо все ще Стримувана, завершуючи ефект при успіху. Другий провал змінює стан на Скам’янілий."
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
      ],
      "conditionSlugs": [
        "petrified",
        "restrained"
      ]
    },
    "sourcePage": 306
  },
  {
    "entity": "monster",
    "slug": "merrow",
    "nameUk": "Мерроу",
    "nameOriginal": "Merrow",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "хаотично-злий",
    "armorClass": "13",
    "hitPoints": "45",
    "hitDice": "6к10 + 12",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "10 фт",
      "плавання 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [
      "Безоднева, Первісна (Акван)"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "merrow-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Мерроу може дихати повітрям і водою."
      }
    ],
    "actions": [
      {
        "id": "merrow-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Мерроу виконує дві атаки Укусом, Кігтем або Гарпуном у будь-якому поєднанні."
      },
      {
        "id": "merrow-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к4 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к4 + 4)",
        "damageType": "колюча",
        "sourceText": "Ціль отримує стан Отруєний до завершення наступного ходу мерроу."
      },
      {
        "id": "merrow-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 9,
            "formula": "2к4 + 4",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "9 (2к4 + 4)",
        "damageType": "рубальна"
      },
      {
        "id": "merrow-harpoon",
        "nameUk": "Гарпун",
        "nameOriginal": "Harpoon",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
        "range": "20/60 фт",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к6 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к6 + 4)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір, мерроу притягує її на відстань до 15 футів по прямій до себе."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "poisoned"
      ]
    },
    "sourcePage": 308
  },
  {
    "entity": "monster",
    "slug": "mimic",
    "nameUk": "Мімік",
    "nameOriginal": "Mimic",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "нейтральний",
    "armorClass": "12",
    "hitPoints": "58",
    "hitDice": "9к8 + 18",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "20 фт"
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
        "save": "+2"
      },
      "intelligence": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "skills": {
      "Скритність": "+5"
    },
    "immunities": [
      "кислотна"
    ],
    "conditionImmunities": [
      "Збитий з ніг"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "mimic-adhesive",
        "nameUk": "Клейкість",
        "nameOriginal": "Adhesive",
        "sourceText": "Лише у формі предмета. Мімік прилипає до всього, що його торкається. Величезна або менша істота, яка прилипла до міміка, отримує стан Схоплений (втеча СК 13). Перевірки характеристик для втечі з цього захоплення виконуються з Невдачею."
      }
    ],
    "actions": [
      {
        "id": "mimic-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к8 + 3",
            "damageType": "колюча",
            "application": "on-hit",
            "qualifier": "або 12 (2к8 + 3), якщо ціль Схоплена міміком"
          },
          {
            "average": 4,
            "formula": "1к8",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к8 + 3) + 12 (2к8 + 3) + 4 (1к8)",
        "damageType": "колюча",
        "sourceText": "Кидок атаки виконується з Перевагою проти цілі, Схопленої міміком. Колюча шкода становить 12 (2к8 + 3) замість 7 (1к8 + 3), якщо ціль Схоплена міміком."
      },
      {
        "id": "mimic-pseudopod",
        "nameUk": "Псевдоподія",
        "nameOriginal": "Pseudopod",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 7,
            "formula": "1к8 + 3",
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 4,
            "formula": "1к8",
            "damageType": "кислотна",
            "application": "on-hit"
          }
        ],
        "damage": "7 (1к8 + 3) + 4 (1к8)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Схоплений (втеча СК 13). Перевірки характеристик для втечі виконуються з Невдачею."
      }
    ],
    "bonusActions": [
      {
        "id": "mimic-shape-shift",
        "nameUk": "Зміна форми",
        "nameOriginal": "Shape-Shift",
        "sourceText": "Мімік змінює форму, щоб нагадувати Середній або Малий предмет, зберігаючи ігрові параметри, або повертається до істинної аморфної форми. Спорядження, яке він носить або тримає, не перетворюється."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "disadvantage",
        "initiative"
      ],
      "conditionSlugs": [
        "grappled"
      ]
    },
    "sourcePage": 308
  },
  {
    "entity": "monster",
    "slug": "minotaur-of-baphomet",
    "nameUk": "Мінотавр Бафомета",
    "nameOriginal": "Minotaur of Baphomet",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "хаотично-злий",
    "armorClass": "14",
    "hitPoints": "85",
    "hitDice": "10к10 + 30",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
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
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "charisma": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "skills": {
      "Сприйняття": "+7",
      "Виживання": "+7"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 17,
    "languages": [
      "Безоднева"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "minotaur-of-baphomet-abyssal-glaive",
        "nameUk": "Безоднева глефа",
        "nameOriginal": "Abyssal Glaive",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 10,
            "formula": "1к12 + 4",
            "damageType": "рубальна",
            "application": "on-hit"
          },
          {
            "average": 10,
            "formula": "3к6",
            "damageType": "некротична",
            "application": "on-hit"
          }
        ],
        "damage": "10 (1к12 + 4) + 10 (3к6)",
        "damageType": "рубальна"
      },
      {
        "id": "minotaur-of-baphomet-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 18,
            "formula": "4к6 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 10,
            "formula": "3к6",
            "damageType": "колюча",
            "application": "on-hit",
            "qualifier": "після розбігу щонайменше 10 фт по прямій"
          }
        ],
        "damage": "18 (4к6 + 4) + 10 (3к6)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір і мінотавр безпосередньо перед влучанням перемістився щонайменше на 10 футів по прямій до неї, ціль отримує додатково 10 (3к6) колючої шкоди та стан Збитий з ніг.",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        }
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    },
    "sourcePage": 309
  },
  {
    "entity": "monster",
    "slug": "owlbear",
    "nameUk": "Сововідь",
    "nameOriginal": "Owlbear",
    "status": "official",
    "source": SRD_52_SOURCE,
    "description": "Сововідь — великий безмовний монстр із масивною статурою, гострим сприйняттям і темним зором. Він швидко пересувається землею та впевнено лазить, тому складний рельєф не завжди стримує його переслідування. У бою сововідь не використовує складних прийомів: він тисне на одну ціль і послідовно завдає потужних рубальних ударів.",
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "59",
    "hitDice": "7к10 + 21",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "40 фт",
      "лазіння 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 20,
        "modifier": "+5",
        "save": "+5"
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
        "score": 3,
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
      "Сприйняття": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "owlbear-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Сововідь виконує дві атаки Роздиранням."
      },
      {
        "id": "owlbear-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 14,
            "formula": "2к8 + 5",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "14 (2к8 + 5)",
        "damageType": "рубальна"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    },
    "sourcePage": 313
  },
  {
    "entity": "monster",
    "slug": "phase-spider",
    "nameUk": "Фазовий павук",
    "nameOriginal": "Phase Spider",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "45",
    "hitDice": "7к10 + 7",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
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
    "skills": {
      "Скритність": "+7"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "phase-spider-ethereal-sight",
        "nameUk": "Ефірний зір",
        "nameOriginal": "Ethereal Sight",
        "sourceText": "Павук бачить на 60 футів у Ефірний план, перебуваючи на Матеріальному плані, і навпаки."
      },
      {
        "id": "phase-spider-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Павук може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      },
      {
        "id": "phase-spider-web-walker",
        "nameUk": "Ходіння павутиною",
        "nameOriginal": "Web Walker",
        "sourceText": "Павук ігнорує обмеження руху від павутини й знає місцеперебування будь-якої іншої істоти, що торкається тієї самої павутини."
      }
    ],
    "actions": [
      {
        "id": "phase-spider-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Фазовий павук виконує дві атаки Укусом."
      },
      {
        "id": "phase-spider-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 8,
            "formula": "1к10 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 9,
            "formula": "2к8",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "8 (1к10 + 3) + 9 (2к8)",
        "damageType": "колюча",
        "sourceText": "Якщо ця шкода зменшує хіти цілі до 0, ціль стає Стабільною й отримує стан Отруєний на 1 годину. Поки вона Отруєна таким чином, вона також має стан Паралізований."
      }
    ],
    "bonusActions": [
      {
        "id": "phase-spider-ethereal-jaunt",
        "nameUk": "Ефірний стрибок",
        "nameOriginal": "Ethereal Jaunt",
        "sourceText": "Павук телепортується з Матеріального плану на Ефірний план або навпаки."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "hit-points",
        "initiative"
      ],
      "conditionSlugs": [
        "paralyzed",
        "poisoned"
      ]
    },
    "sourcePage": 313
  },
  {
    "entity": "monster",
    "slug": "purple-worm",
    "nameUk": "Пурпуровий черв",
    "nameOriginal": "Purple Worm",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Колосальний",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "18",
    "hitPoints": "247",
    "hitDice": "15к20 + 90",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "50 фт",
      "копання 50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 28,
        "modifier": "+9",
        "save": "+9"
      },
      "dexterity": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "constitution": {
        "score": 22,
        "modifier": "+6",
        "save": "+11"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "+4"
      },
      "charisma": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "senses": [
      "Сліпобачення 30 фт",
      "Треморочуття 60 фт"
    ],
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "15",
    "experiencePoints": 13000,
    "proficiencyBonus": "+5",
    "traits": [
      {
        "id": "purple-worm-tunneler",
        "nameUk": "Тунельник",
        "nameOriginal": "Tunneler",
        "sourceText": "Черв може прокопуватися крізь суцільну породу з половиною Швидкості копання та залишає за собою тунель діаметром 10 футів."
      }
    ],
    "actions": [
      {
        "id": "purple-worm-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Пурпуровий черв виконує одну атаку Укусом і одну Хвостовим жалом."
      },
      {
        "id": "purple-worm-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+14",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 22,
            "formula": "3к8 + 9",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "22 (3к8 + 9)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стани Схоплений (втеча СК 19) і Стримуваний до завершення захоплення."
      },
      {
        "id": "purple-worm-tail-stinger",
        "nameUk": "Хвостове жало",
        "nameOriginal": "Tail Stinger",
        "attackType": "ближня",
        "attackBonus": "+14",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 16,
            "formula": "2к6 + 9",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 35,
            "formula": "10к6",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "16 (2к6 + 9) + 35 (10к6)",
        "damageType": "колюча"
      }
    ],
    "bonusActions": [
      {
        "id": "purple-worm-swallow",
        "nameUk": "Поглинання",
        "nameOriginal": "Swallow",
        "target": "одна Велика або менша істота, Схоплена істотою; одночасно можна проковтнути до три істоти",
        "savingThrow": {
          "ability": "strength",
          "dc": 19,
          "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
        },
        "damageInstances": [
          {
            "average": 17,
            "formula": "5к6",
            "damageType": "кислотна",
            "application": "start-of-turn"
          }
        ],
        "sourceText": "Проковтнута істота має стани Засліплений і Стримуваний та Повне укриття від атак й ефектів ззовні. На початку кожного ходу черва ціль отримує 17 (5к6) кислотної шкоди. Якщо істота отримує щонайменше 30 шкоди за один хід від проковтнутої істоти, наприкінці цього ходу вона виконує ряткидок Статури СК 21; у разі провалу відригує всіх проковтнутих істот, які падають у просторі в межах 5 футів і отримують стан Збитий з ніг. Після смерті істоти проковтнута ціль більше не Стримувана й може вибратися з тіла, витративши 20 футів переміщення, виходячи Збитою з ніг.",
        "mechanicSteps": [
          {
            "id": "purple-worm-swallow-save",
            "order": 1,
            "label": "Ряткидок",
            "text": "Ціль виконує ряткидок Сили СК 19.",
            "savingThrow": {
              "ability": "strength",
              "dc": 19,
              "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
            }
          },
          {
            "id": "purple-worm-swallow-contained",
            "order": 2,
            "label": "Усередині",
            "text": "Ціль має стани Засліплений і Стримуваний та Повне укриття від зовнішніх атак й ефектів.",
            "conditionSlugs": [
              "blinded",
              "restrained"
            ]
          },
          {
            "id": "purple-worm-swallow-damage",
            "order": 3,
            "label": "Початок ходу",
            "text": "На початку кожного ходу черва ціль отримує 17 (5к6) кислотної шкоди.",
            "damageInstances": [
              {
                "average": 17,
                "formula": "5к6",
                "damageType": "кислотна",
                "application": "start-of-turn"
              }
            ]
          },
          {
            "id": "purple-worm-swallow-release",
            "order": 4,
            "label": "Звільнення",
            "text": "Після 30 шкоди зсередини за один хід істота мусить пройти ряткидок Статури СК 21 або відригнути всіх проковтнутих істот."
          }
        ]
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
      ],
      "conditionSlugs": [
        "blinded",
        "grappled",
        "prone",
        "restrained"
      ]
    },
    "sourcePage": 316
  },
  {
    "entity": "monster",
    "slug": "remorhaz",
    "nameUk": "Реморгаз",
    "nameOriginal": "Remorhaz",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "17",
    "hitPoints": "195",
    "hitDice": "17к12 + 85",
    "initiative": {
      "modifier": "+5",
      "score": 15
    },
    "speed": [
      "40 фт",
      "копання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 24,
        "modifier": "+7",
        "save": "+7"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 21,
        "modifier": "+5",
        "save": "+5"
      },
      "intelligence": {
        "score": 4,
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
    "immunities": [
      "холодна",
      "вогняна"
    ],
    "senses": [
      "Темний зір 60 фт",
      "Треморочуття 60 фт"
    ],
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "11",
    "experiencePoints": 7200,
    "proficiencyBonus": "+4",
    "traits": [
      {
        "id": "remorhaz-heat-aura",
        "nameUk": "Аура жару",
        "nameOriginal": "Heat Aura",
        "sourceText": "Наприкінці кожного ходу реморгаза кожна істота в 5-футовій еманації від нього отримує 16 (3к10) вогняної шкоди.",
        "damageInstances": [
          {
            "average": 16,
            "formula": "3к10",
            "damageType": "вогняна",
            "application": "end-of-turn"
          }
        ]
      }
    ],
    "actions": [
      {
        "id": "remorhaz-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+11",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 18,
            "formula": "2к10 + 7",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 14,
            "formula": "4к6",
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "damage": "18 (2к10 + 7) + 14 (4к6)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стани Схоплений (втеча СК 17) і Стримуваний до завершення захоплення."
      }
    ],
    "bonusActions": [
      {
        "id": "remorhaz-swallow",
        "nameUk": "Поглинання",
        "nameOriginal": "Swallow",
        "target": "одна Велика або менша істота, Схоплена істотою; одночасно можна проковтнути до дві істоти",
        "savingThrow": {
          "ability": "strength",
          "dc": 19,
          "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
        },
        "damageInstances": [
          {
            "average": 10,
            "formula": "3к6",
            "damageType": "кислотна",
            "application": "start-of-turn"
          },
          {
            "average": 10,
            "formula": "3к6",
            "damageType": "вогняна",
            "application": "start-of-turn"
          }
        ],
        "sourceText": "Проковтнута істота має стани Засліплений і Стримуваний та Повне укриття від атак й ефектів ззовні. На початку кожного ходу реморгаза ціль отримує 10 (3к6) кислотної та 10 (3к6) вогняної шкоди. Якщо істота отримує щонайменше 30 шкоди за один хід від проковтнутої істоти, наприкінці цього ходу вона виконує ряткидок Статури СК 15; у разі провалу відригує всіх проковтнутих істот, які падають у просторі в межах 5 футів і отримують стан Збитий з ніг. Після смерті істоти проковтнута ціль більше не Стримувана й може вибратися з тіла, витративши 15 футів переміщення, виходячи Збитою з ніг.",
        "mechanicSteps": [
          {
            "id": "remorhaz-swallow-save",
            "order": 1,
            "label": "Ряткидок",
            "text": "Ціль виконує ряткидок Сили СК 19.",
            "savingThrow": {
              "ability": "strength",
              "dc": 19,
              "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
            }
          },
          {
            "id": "remorhaz-swallow-contained",
            "order": 2,
            "label": "Усередині",
            "text": "Ціль має стани Засліплений і Стримуваний та Повне укриття від зовнішніх атак й ефектів.",
            "conditionSlugs": [
              "blinded",
              "restrained"
            ]
          },
          {
            "id": "remorhaz-swallow-damage",
            "order": 3,
            "label": "Початок ходу",
            "text": "На початку кожного ходу реморгаза ціль отримує 10 (3к6) кислотної та 10 (3к6) вогняної шкоди.",
            "damageInstances": [
              {
                "average": 10,
                "formula": "3к6",
                "damageType": "кислотна",
                "application": "start-of-turn"
              },
              {
                "average": 10,
                "formula": "3к6",
                "damageType": "вогняна",
                "application": "start-of-turn"
              }
            ]
          },
          {
            "id": "remorhaz-swallow-release",
            "order": 4,
            "label": "Звільнення",
            "text": "Після 30 шкоди зсередини за один хід істота мусить пройти ряткидок Статури СК 15 або відригнути всіх проковтнутих істот."
          }
        ]
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
      ],
      "conditionSlugs": [
        "blinded",
        "grappled",
        "prone",
        "restrained"
      ]
    },
    "sourcePage": 319
  },
  {
    "entity": "monster",
    "slug": "roc",
    "nameUk": "Рок",
    "nameOriginal": "Roc",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Колосальний",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "15",
    "hitPoints": "248",
    "hitDice": "16к20 + 80",
    "initiative": {
      "modifier": "+8",
      "score": 18
    },
    "speed": [
      "20 фт",
      "політ 120 фт"
    ],
    "abilities": {
      "strength": {
        "score": 28,
        "modifier": "+9",
        "save": "+9"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+4"
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
        "score": 10,
        "modifier": "+0",
        "save": "+4"
      },
      "charisma": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "skills": {
      "Сприйняття": "+8"
    },
    "passivePerception": 18,
    "languages": [],
    "challengeRating": "11",
    "experiencePoints": 7200,
    "proficiencyBonus": "+4",
    "actions": [
      {
        "id": "roc-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Рок виконує дві атаки Дзьобом. Одну атаку він може замінити атакою Кігтями."
      },
      {
        "id": "roc-beak",
        "nameUk": "Дзьоб",
        "nameOriginal": "Beak",
        "attackType": "ближня",
        "attackBonus": "+13",
        "target": "одна ціль",
        "reach": "10 фт",
        "damageInstances": [
          {
            "average": 28,
            "formula": "3к12 + 9",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "28 (3к12 + 9)",
        "damageType": "колюча"
      },
      {
        "id": "roc-talons",
        "nameUk": "Кігті",
        "nameOriginal": "Talons",
        "attackType": "ближня",
        "attackBonus": "+13",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 23,
            "formula": "4к6 + 9",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "23 (4к6 + 9)",
        "damageType": "рубальна",
        "sourceText": "Якщо ціль має Величезний або менший розмір, вона отримує стани Схоплений (втеча СК 19) обома кігтями та Стримуваний до завершення захоплення."
      }
    ],
    "bonusActions": [
      {
        "id": "roc-swoop",
        "nameUk": "Пікірування",
        "nameOriginal": "Swoop",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "sourceText": "Якщо рок тримає істоту Схопленою, він летить на відстань до половини Швидкості польоту без провокування Провокованих атак і скидає цю істоту."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ],
      "conditionSlugs": [
        "grappled",
        "restrained"
      ]
    },
    "sourcePage": 320
  },
  {
    "entity": "monster",
    "slug": "rust-monster",
    "nameUk": "Іржаве чудовисько",
    "nameOriginal": "Rust Monster",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "33",
    "hitDice": "6к8 + 6",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "40 фт"
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
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "rust-monster-iron-scent",
        "nameUk": "Чуття заліза",
        "nameOriginal": "Iron Scent",
        "sourceText": "Іржаве чудовисько точно визначає розташування чорного металу в межах 30 футів."
      }
    ],
    "actions": [
      {
        "id": "rust-monster-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Іржаве чудовисько виконує одну атаку Укусом і двічі використовує Вусики."
      },
      {
        "id": "rust-monster-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "reach": "5 фт",
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
      },
      {
        "id": "rust-monster-antennae",
        "nameUk": "Вусики",
        "nameOriginal": "Antennae",
        "target": "один немагічний металевий обладунок або зброя, яку носить чи тримає істота в межах 5 фт",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 11,
          "onFailure": "Предмет отримує штраф -1 до наданого КЗ (обладунок) або кидків атаки (зброя)."
        },
        "sourceText": "Обладунок знищується, якщо штраф зменшує його КЗ до 10; зброя знищується, якщо штраф досягає -5. Закляття «Лагодження» усуває штраф."
      },
      {
        "id": "rust-monster-destroy-metal",
        "nameUk": "Знищення металу",
        "nameOriginal": "Destroy Metal",
        "sourceText": "Іржаве чудовисько торкається немагічного металевого предмета в межах 5 футів, який ніхто не носить і не тримає, та знищує кубічний фут цього предмета."
      }
    ],
    "reactions": [
      {
        "id": "rust-monster-reflexive-antennae",
        "nameUk": "Рефлекторні вусики",
        "nameOriginal": "Reflexive Antennae",
        "sourceText": "Тригер: кидок атаки влучає в іржаве чудовисько. Відповідь: чудовисько використовує Вусики."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "reaction",
        "saving-throws"
      ],
      "spellSlugs": [
        "mending"
      ]
    },
    "sourcePage": 320
  },
  {
    "entity": "monster",
    "slug": "stirge",
    "nameUk": "Стирдж",
    "nameOriginal": "Stirge",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "5",
    "hitDice": "2к4",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "10 фт",
      "політ 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "stirge-proboscis",
        "nameUk": "Хоботок",
        "nameOriginal": "Proboscis",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к6 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 5,
            "formula": "2к4",
            "damageType": "некротична",
            "application": "start-of-turn",
            "qualifier": "поки стирдж прикріплений"
          }
        ],
        "damage": "6 (1к6 + 3) + 5 (2к4)",
        "damageType": "колюча",
        "sourceText": "Стирдж прикріплюється до цілі. Поки він прикріплений, він не може атакувати Хоботком, а ціль отримує 5 (2к4) некротичної шкоди на початку кожного ходу стирджа. Стирдж може відчепитися, витративши 5 футів переміщення; ціль або істота в межах 5 футів від неї може відчепити стирджа Дією."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    },
    "sourcePage": 329
  },
  {
    "entity": "monster",
    "slug": "tarrasque",
    "nameUk": "Тараск",
    "nameOriginal": "Tarrasque",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Колосальний",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "25",
    "hitPoints": "697",
    "hitDice": "34к20 + 340",
    "initiative": {
      "modifier": "+18",
      "score": 28
    },
    "speed": [
      "60 фт",
      "копання 40 фт",
      "лазіння 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 30,
        "modifier": "+10",
        "save": "+10"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+9"
      },
      "constitution": {
        "score": 30,
        "modifier": "+10",
        "save": "+10"
      },
      "intelligence": {
        "score": 3,
        "modifier": "−4",
        "save": "+5"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+9"
      },
      "charisma": {
        "score": 11,
        "modifier": "+0",
        "save": "+9"
      }
    },
    "subtype": "титан",
    "skills": {
      "Сприйняття": "+9"
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
      "Зачарований",
      "Оглухлий",
      "Наляканий",
      "Паралізований",
      "Отруєний"
    ],
    "senses": [
      "Сліпобачення 120 фт"
    ],
    "passivePerception": 19,
    "languages": [],
    "challengeRating": "30",
    "experiencePoints": 155000,
    "proficiencyBonus": "+9",
    "traits": [
      {
        "id": "tarrasque-legendary-resistance",
        "nameUk": "Легендарний опір",
        "nameOriginal": "Legendary Resistance",
        "sourceText": "Якщо тараск провалює ряткидок, він може натомість досягти успіху.",
        "limitedUse": {
          "uses": 6,
          "period": "day"
        }
      },
      {
        "id": "tarrasque-magic-resistance",
        "nameUk": "Опір магії",
        "nameOriginal": "Magic Resistance",
        "sourceText": "Тараск має Перевагу на ряткидки проти заклять та інших магічних ефектів."
      },
      {
        "id": "tarrasque-reflective-carapace",
        "nameUk": "Відбивний панцир",
        "nameOriginal": "Reflective Carapace",
        "sourceText": "Якщо тараск стає ціллю закляття «Магічна стріла» або закляття, що потребує далекобійного кидка атаки, киньте 1к6. На 1–5 тараск не зазнає ефекту. На 6 тараск не зазнає ефекту й відбиває закляття, роблячи заклинача його ціллю."
      },
      {
        "id": "tarrasque-siege-monster",
        "nameUk": "Облогове чудовисько",
        "nameOriginal": "Siege Monster",
        "sourceText": "Тараск завдає подвійної шкоди предметам і спорудам."
      }
    ],
    "actions": [
      {
        "id": "tarrasque-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Тараск виконує одну атаку Укусом і ще три атаки Кігтем або Хвостом у будь-якому поєднанні."
      },
      {
        "id": "tarrasque-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+19",
        "target": "одна ціль",
        "reach": "15 фт",
        "damageInstances": [
          {
            "average": 36,
            "formula": "4к12 + 10",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "36 (4к12 + 10)",
        "damageType": "колюча",
        "sourceText": "Ціль отримує стан Схоплений (втеча СК 20). До завершення захоплення вона має стан Стримуваний і не може телепортуватися."
      },
      {
        "id": "tarrasque-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+19",
        "target": "одна ціль",
        "reach": "15 фт",
        "damageInstances": [
          {
            "average": 28,
            "formula": "4к8 + 10",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "28 (4к8 + 10)",
        "damageType": "рубальна"
      },
      {
        "id": "tarrasque-tail",
        "nameUk": "Хвіст",
        "nameOriginal": "Tail",
        "attackType": "ближня",
        "attackBonus": "+19",
        "target": "одна ціль",
        "reach": "30 фт",
        "damageInstances": [
          {
            "average": 23,
            "formula": "3к8 + 10",
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "damage": "23 (3к8 + 10)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Величезний або менший розмір, вона отримує стан Збитий з ніг."
      },
      {
        "id": "tarrasque-thunderous-bellow",
        "nameUk": "Громовий рев",
        "nameOriginal": "Thunderous Bellow",
        "target": "кожна істота й кожен предмет, який ніхто не носить і не тримає, у 150-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "damageInstances": [
          {
            "average": 78,
            "formula": "12к12",
            "damageType": "громова",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "constitution",
          "dc": 27,
          "onFailure": "Повна шкода; стани Оглухлий і Наляканий до завершення наступного ходу цілі.",
          "onSuccess": "Половина шкоди без додаткових ефектів."
        },
        "sourceText": "Кожна ціль виконує ряткидок Статури СК 27."
      }
    ],
    "bonusActions": [
      {
        "id": "tarrasque-swallow",
        "nameUk": "Поглинання",
        "nameOriginal": "Swallow",
        "target": "одна Велика або менша істота, Схоплена істотою; одночасно можна проковтнути до шість істот",
        "savingThrow": {
          "ability": "strength",
          "dc": 27,
          "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
        },
        "damageInstances": [
          {
            "average": 56,
            "formula": "16к6",
            "damageType": "кислотна",
            "application": "start-of-turn"
          }
        ],
        "sourceText": "Проковтнута істота має стани Засліплений і Стримуваний та Повне укриття від атак й ефектів ззовні. На початку кожного ходу тараска ціль отримує 56 (16к6) кислотної шкоди; вона також не може телепортуватися. Якщо істота отримує щонайменше 60 шкоди за один хід від проковтнутої істоти, наприкінці цього ходу вона виконує ряткидок Статури СК 20; у разі провалу відригує всіх проковтнутих істот, які падають у просторі в межах 10 футів і отримують стан Збитий з ніг. Після смерті істоти проковтнута ціль більше не Стримувана й може вибратися з тіла, витративши 20 футів переміщення, виходячи Збитою з ніг.",
        "mechanicSteps": [
          {
            "id": "tarrasque-swallow-save",
            "order": 1,
            "label": "Ряткидок",
            "text": "Ціль виконує ряткидок Сили СК 27.",
            "savingThrow": {
              "ability": "strength",
              "dc": 27,
              "onFailure": "Ціль проковтнута, а стан Схоплений завершується."
            }
          },
          {
            "id": "tarrasque-swallow-contained",
            "order": 2,
            "label": "Усередині",
            "text": "Ціль має стани Засліплений і Стримуваний та Повне укриття від зовнішніх атак й ефектів.",
            "conditionSlugs": [
              "blinded",
              "restrained"
            ]
          },
          {
            "id": "tarrasque-swallow-damage",
            "order": 3,
            "label": "Початок ходу",
            "text": "На початку кожного ходу тараска ціль отримує 56 (16к6) кислотної шкоди; вона також не може телепортуватися.",
            "damageInstances": [
              {
                "average": 56,
                "formula": "16к6",
                "damageType": "кислотна",
                "application": "start-of-turn"
              }
            ]
          },
          {
            "id": "tarrasque-swallow-release",
            "order": 4,
            "label": "Звільнення",
            "text": "Після 60 шкоди зсередини за один хід істота мусить пройти ряткидок Статури СК 20 або відригнути всіх проковтнутих істот."
          }
        ]
      }
    ],
    "legendaryActions": [
      {
        "id": "tarrasque-onslaught",
        "nameUk": "Навала",
        "nameOriginal": "Onslaught",
        "sourceText": "Тараск переміщується на відстань до половини своєї Швидкості та виконує одну атаку Кігтем або Хвостом.",
        "legendaryActionCost": 1
      },
      {
        "id": "tarrasque-world-shaking-movement",
        "nameUk": "Рух, що стрясає світ",
        "nameOriginal": "World-Shaking Movement",
        "sourceText": "Тараск переміщується на відстань до своєї Швидкості. Наприкінці руху він створює миттєву ударну хвилю в 60-футовій еманації: істоти в ній втрачають Концентрацію, а Середні або менші також отримують стан Збитий з ніг. Тараск не може знову використати цю дію до початку свого наступного ходу.",
        "legendaryActionCost": 1
      }
    ],
    "legendaryActionUses": "3",
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "bonus-action",
        "concentration",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "blinded",
        "deafened",
        "frightened",
        "grappled",
        "prone",
        "restrained"
      ],
      "spellSlugs": [
        "magic-missile"
      ]
    },
    "sourcePage": 331
  },
  {
    "entity": "monster",
    "slug": "werebear",
    "nameUk": "Ведмедевертень",
    "nameOriginal": "Werebear",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Монстр",
    "alignment": "нейтрально-добрий",
    "armorClass": "15",
    "hitPoints": "135",
    "hitDice": "18к8 + 54",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "30 фт",
      "40 фт (лише форма ведмедя)",
      "лазіння 30 фт (лише форма ведмедя)"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      }
    },
    "subtype": "лікантроп",
    "gear": [
      {
        "nameUk": "Ручна сокира",
        "itemSlug": "handaxe",
        "quantity": 4
      }
    ],
    "skills": {
      "Сприйняття": "+7"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 17,
    "languages": [
      "Спільна (не розмовляє у формі ведмедя)"
    ],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "werebear-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Ведмедевертень виконує дві атаки Ручною сокирою або Роздиранням у будь-якому поєднанні. Одну атаку він може замінити Укусом."
      },
      {
        "id": "werebear-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 17,
            "formula": "2к12 + 4",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "17 (2к12 + 4)",
        "damageType": "колюча",
        "savingThrow": {
          "ability": "constitution",
          "dc": 14,
          "onFailure": "Ціль проклята. Якщо її хіти зменшуються до 0, вона натомість стає Ведмедевертня під контролем Майстра й має 10 хітів.",
          "onSuccess": "Імунітет до прокляття цієї істоти на 24 години."
        },
        "sourceText": "Лише у формі ведмедя або гібридній формі. Якщо ціль є Гуманоїдом, вона виконує ряткидок Статури СК 14."
      },
      {
        "id": "werebear-handaxe",
        "nameUk": "Ручна сокира",
        "nameOriginal": "Handaxe",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "range": "20/60 фт",
        "damageInstances": [
          {
            "average": 14,
            "formula": "3к6 + 4",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "14 (3к6 + 4)",
        "damageType": "рубальна",
        "sourceText": "Лише у гуманоїдній або гібридній формі."
      },
      {
        "id": "werebear-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 13,
            "formula": "2к8 + 4",
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "damage": "13 (2к8 + 4)",
        "damageType": "рубальна",
        "sourceText": "Лише у формі ведмедя або гібридній формі."
      }
    ],
    "bonusActions": [
      {
        "id": "werebear-shape-shift",
        "nameUk": "Зміна форми",
        "nameOriginal": "Shape-Shift",
        "sourceText": "Ведмедевертень змінює форму на Великого гібрида ведмедя й гуманоїда або Великого ведмедя чи повертається до істинної гуманоїдної форми. Його ігрові параметри, крім розміру, однакові в кожній формі. Спорядження не перетворюється."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "saving-throws"
      ],
      "itemSlugs": [
        "handaxe"
      ]
    },
    "sourcePage": 337
  },
  {
    "entity": "monster",
    "slug": "wereboar",
    "nameUk": "Кабановертень",
    "nameOriginal": "Wereboar",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Монстр",
    "alignment": "нейтрально-злий",
    "armorClass": "15",
    "hitPoints": "97",
    "hitDice": "15к8 + 30",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "40 фт (лише форма кабана)"
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
    "subtype": "лікантроп",
    "gear": [
      {
        "nameUk": "Дротик",
        "itemSlug": "javelin",
        "quantity": 6
      }
    ],
    "skills": {
      "Сприйняття": "+2"
    },
    "passivePerception": 12,
    "languages": [
      "Спільна (не розмовляє у формі кабана)"
    ],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "wereboar-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Кабановертень виконує дві атаки Дротиком або Іклом у будь-якому поєднанні. Одну атаку він може замінити Ударом рогами."
      },
      {
        "id": "wereboar-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 12,
            "formula": "2к8 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "12 (2к8 + 3)",
        "damageType": "колюча",
        "savingThrow": {
          "ability": "constitution",
          "dc": 12,
          "onFailure": "Ціль проклята. Якщо її хіти зменшуються до 0, вона натомість стає Кабановертня під контролем Майстра й має 10 хітів.",
          "onSuccess": "Імунітет до прокляття цієї істоти на 24 години."
        },
        "sourceText": "Лише у формі кабана або гібридній формі. Якщо ціль є Гуманоїдом, вона виконує ряткидок Статури СК 12."
      },
      {
        "id": "wereboar-javelin",
        "nameUk": "Дротик",
        "nameOriginal": "Javelin",
        "attackType": "ближня або далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "range": "30/120 фт",
        "damageInstances": [
          {
            "average": 13,
            "formula": "3к6 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "13 (3к6 + 3)",
        "damageType": "колюча",
        "sourceText": "Лише у гуманоїдній або гібридній формі."
      },
      {
        "id": "wereboar-tusk",
        "nameUk": "Ікло",
        "nameOriginal": "Tusk",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 10,
            "formula": "2к6 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 7,
            "formula": "2к6",
            "damageType": "колюча",
            "application": "on-hit",
            "qualifier": "після розбігу щонайменше 20 фт по прямій"
          }
        ],
        "damage": "10 (2к6 + 3) + 7 (2к6)",
        "damageType": "колюча",
        "sourceText": "Лише у формі кабана або гібридній формі. Якщо ціль має Середній або менший розмір і кабановертень безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до неї, ціль отримує додатково 7 (2к6) колючої шкоди та стан Збитий з ніг."
      }
    ],
    "bonusActions": [
      {
        "id": "wereboar-shape-shift",
        "nameUk": "Зміна форми",
        "nameOriginal": "Shape-Shift",
        "sourceText": "Кабановертень змінює форму на Середнього гібрида кабана й гуманоїда або Малого кабана чи повертається до істинної гуманоїдної форми. Його ігрові параметри, крім розміру, однакові в кожній формі. Спорядження не перетворюється."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "prone"
      ],
      "itemSlugs": [
        "javelin"
      ]
    },
    "sourcePage": 338
  },
  {
    "entity": "monster",
    "slug": "wererat",
    "nameUk": "Щуровертень",
    "nameOriginal": "Wererat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Монстр",
    "alignment": "законно-злий",
    "armorClass": "13",
    "hitPoints": "60",
    "hitDice": "11к8 + 11",
    "initiative": {
      "modifier": "+3",
      "score": 13
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
        "score": 16,
        "modifier": "+3",
        "save": "+3"
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
    "subtype": "лікантроп",
    "gear": [
      {
        "nameUk": "Ручний арбалет",
        "itemSlug": "hand-crossbow"
      }
    ],
    "skills": {
      "Сприйняття": "+4",
      "Скритність": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 14,
    "languages": [
      "Спільна (не розмовляє у формі щура)"
    ],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "wererat-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Щуровертень виконує дві атаки Дряпанням або Ручним арбалетом у будь-якому поєднанні. Одну атаку він може замінити Укусом."
      },
      {
        "id": "wererat-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 8,
            "formula": "2к4 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "8 (2к4 + 3)",
        "damageType": "колюча",
        "savingThrow": {
          "ability": "constitution",
          "dc": 11,
          "onFailure": "Ціль проклята. Якщо її хіти зменшуються до 0, вона натомість стає Щуровертня під контролем Майстра й має 10 хітів.",
          "onSuccess": "Імунітет до прокляття цієї істоти на 24 години."
        },
        "sourceText": "Лише у формі щура або гібридній формі. Якщо ціль є Гуманоїдом, вона виконує ряткидок Статури СК 11."
      },
      {
        "id": "wererat-scratch",
        "nameUk": "Дряпання",
        "nameOriginal": "Scratch",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
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
        "id": "wererat-hand-crossbow",
        "nameUk": "Ручний арбалет",
        "nameOriginal": "Hand Crossbow",
        "attackType": "далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "range": "30/120 фт",
        "damageInstances": [
          {
            "average": 6,
            "formula": "1к6 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "6 (1к6 + 3)",
        "damageType": "колюча",
        "sourceText": "Лише у гуманоїдній або гібридній формі."
      }
    ],
    "bonusActions": [
      {
        "id": "wererat-shape-shift",
        "nameUk": "Зміна форми",
        "nameOriginal": "Shape-Shift",
        "sourceText": "Щуровертень змінює форму на Середнього гібрида щура й гуманоїда або Малого щура чи повертається до істинної гуманоїдної форми. Його ігрові параметри, крім розміру, однакові в кожній формі. Спорядження не перетворюється."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "saving-throws"
      ],
      "itemSlugs": [
        "hand-crossbow"
      ]
    },
    "sourcePage": 338
  },
  {
    "entity": "monster",
    "slug": "weretiger",
    "nameUk": "Тигровертень",
    "nameOriginal": "Weretiger",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Монстр",
    "alignment": "нейтральний",
    "armorClass": "12",
    "hitPoints": "120",
    "hitDice": "16к8 + 48",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "40 фт (лише форма тигра)"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 10,
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
    "subtype": "лікантроп",
    "gear": [
      {
        "nameUk": "Довгий лук",
        "itemSlug": "longbow"
      }
    ],
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 15,
    "languages": [
      "Спільна (не розмовляє у формі тигра)"
    ],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "weretiger-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Тигровертень виконує дві атаки Дряпанням або Довгим луком у будь-якому поєднанні. Одну атаку він може замінити Укусом."
      },
      {
        "id": "weretiger-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 12,
            "formula": "2к8 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "12 (2к8 + 3)",
        "damageType": "колюча",
        "savingThrow": {
          "ability": "constitution",
          "dc": 13,
          "onFailure": "Ціль проклята. Якщо її хіти зменшуються до 0, вона натомість стає Тигровертня під контролем Майстра й має 10 хітів.",
          "onSuccess": "Імунітет до прокляття цієї істоти на 24 години."
        },
        "sourceText": "Лише у формі тигра або гібридній формі. Якщо ціль є Гуманоїдом, вона виконує ряткидок Статури СК 13."
      },
      {
        "id": "weretiger-scratch",
        "nameUk": "Дряпання",
        "nameOriginal": "Scratch",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
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
        "id": "weretiger-longbow",
        "nameUk": "Довгий лук",
        "nameOriginal": "Longbow",
        "attackType": "далекобійна",
        "attackBonus": "+4",
        "target": "одна ціль",
        "range": "150/600 фт",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к8 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к8 + 2)",
        "damageType": "колюча",
        "sourceText": "Лише у гуманоїдній або гібридній формі."
      }
    ],
    "bonusActions": [
      {
        "id": "weretiger-prowl",
        "nameUk": "Підкрадання",
        "nameOriginal": "Prowl",
        "sourceText": "Лише у формі тигра або гібридній формі. Тигровертень переміщується на відстань до своєї Швидкості без провокування Провокованих атак. Наприкінці цього руху він може виконати дію Сховатися."
      },
      {
        "id": "weretiger-shape-shift",
        "nameUk": "Зміна форми",
        "nameOriginal": "Shape-Shift",
        "sourceText": "Тигровертень змінює форму на Великого гібрида тигра й гуманоїда або Великого тигра чи повертається до істинної гуманоїдної форми. Його ігрові параметри, крім розміру, однакові в кожній формі. Спорядження не перетворюється."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "opportunity-attacks",
        "saving-throws"
      ],
      "itemSlugs": [
        "longbow"
      ]
    },
    "sourcePage": 339
  },
  {
    "entity": "monster",
    "slug": "werewolf",
    "nameUk": "Вовкулака",
    "nameOriginal": "Werewolf",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній або Малий",
    "creatureType": "Монстр",
    "alignment": "хаотично-злий",
    "armorClass": "15",
    "hitPoints": "71",
    "hitDice": "11к8 + 22",
    "initiative": {
      "modifier": "+4",
      "score": 14
    },
    "speed": [
      "30 фт",
      "40 фт (лише форма вовка)"
    ],
    "abilities": {
      "strength": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "dexterity": {
        "score": 14,
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
    "subtype": "лікантроп",
    "gear": [
      {
        "nameUk": "Довгий лук",
        "itemSlug": "longbow"
      }
    ],
    "skills": {
      "Сприйняття": "+4",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 14,
    "languages": [
      "Спільна (не розмовляє у формі вовка)"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "werewolf-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Вовкулака має Перевагу на кидок атаки проти істоти, якщо принаймні один союзник вовкулаки перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      }
    ],
    "actions": [
      {
        "id": "werewolf-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Вовкулака виконує дві атаки Дряпанням або Довгим луком у будь-якому поєднанні. Одну атаку він може замінити Укусом."
      },
      {
        "id": "werewolf-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 12,
            "formula": "2к8 + 3",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "12 (2к8 + 3)",
        "damageType": "колюча",
        "savingThrow": {
          "ability": "constitution",
          "dc": 12,
          "onFailure": "Ціль проклята. Якщо її хіти зменшуються до 0, вона натомість стає Вовкулаку під контролем Майстра й має 10 хітів.",
          "onSuccess": "Імунітет до прокляття цієї істоти на 24 години."
        },
        "sourceText": "Лише у формі вовка або гібридній формі. Якщо ціль є Гуманоїдом, вона виконує ряткидок Статури СК 12."
      },
      {
        "id": "werewolf-scratch",
        "nameUk": "Дряпання",
        "nameOriginal": "Scratch",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "reach": "5 фт",
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
        "id": "werewolf-longbow",
        "nameUk": "Довгий лук",
        "nameOriginal": "Longbow",
        "attackType": "далекобійна",
        "attackBonus": "+4",
        "target": "одна ціль",
        "range": "150/600 фт",
        "damageInstances": [
          {
            "average": 11,
            "formula": "2к8 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "11 (2к8 + 2)",
        "damageType": "колюча",
        "sourceText": "Лише у гуманоїдній або гібридній формі."
      }
    ],
    "bonusActions": [
      {
        "id": "werewolf-shape-shift",
        "nameUk": "Зміна форми",
        "nameOriginal": "Shape-Shift",
        "sourceText": "Вовкулака змінює форму на Великого гібрида вовка й гуманоїда або Середнього вовка чи повертається до істинної гуманоїдної форми. Його ігрові параметри, крім розміру, однакові в кожній формі. Спорядження не перетворюється."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "difficulty-class",
        "hit-points",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "incapacitated"
      ],
      "itemSlugs": [
        "longbow"
      ]
    },
    "sourcePage": 339
  },
  {
    "entity": "monster",
    "slug": "winter-wolf",
    "nameUk": "Зимовий вовк",
    "nameOriginal": "Winter Wolf",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "нейтрально-злий",
    "armorClass": "13",
    "hitPoints": "75",
    "hitDice": "10к10 + 20",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
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
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+5"
    },
    "immunities": [
      "холодна"
    ],
    "passivePerception": 15,
    "languages": [
      "Спільна, Велетенська"
    ],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "winter-wolf-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Вовк має Перевагу на кидок атаки проти істоти, якщо принаймні один союзник вовка перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      }
    ],
    "actions": [
      {
        "id": "winter-wolf-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
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
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Збитий з ніг."
      },
      {
        "id": "winter-wolf-cold-breath",
        "nameUk": "Холодний подих",
        "nameOriginal": "Cold Breath",
        "target": "кожна істота в 15-футовому конусі",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "damageInstances": [
          {
            "average": 18,
            "formula": "4к8",
            "damageType": "холодна",
            "application": "failed-save"
          }
        ],
        "savingThrow": {
          "ability": "constitution",
          "dc": 12,
          "onFailure": "Повна шкода.",
          "onSuccess": "Половина шкоди."
        },
        "sourceText": "Кожна ціль виконує ряткидок Статури СК 12."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "saving-throws"
      ],
      "conditionSlugs": [
        "incapacitated",
        "prone"
      ]
    },
    "sourcePage": 342
  },
  {
    "entity": "monster",
    "slug": "flying-snake",
    "nameUk": "Летюча змія",
    "nameOriginal": "Flying Snake",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Монстр",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "5",
    "hitDice": "2к4",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "політ 60 фт",
      "плавання 30 фт"
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
        "score": 11,
        "modifier": "+0",
        "save": "+0"
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
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "senses": [
      "Сліпобачення 10 фт"
    ],
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "flying-snake-flyby",
        "nameUk": "Проліт",
        "nameOriginal": "Flyby",
        "sourceText": "Змія не провокує Провоковану атаку, коли вилітає з досяжності ворога."
      }
    ],
    "actions": [
      {
        "id": "flying-snake-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 5,
            "formula": "2к4",
            "damageType": "отруйна",
            "application": "on-hit"
          }
        ],
        "damage": "1 + 5 (2к4)",
        "damageType": "колюча"
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    },
    "sourcePage": 348
  },
  {
    "entity": "monster",
    "slug": "giant-vulture",
    "nameUk": "Гігантський гриф",
    "nameOriginal": "Giant Vulture",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Монстр",
    "alignment": "нейтрально-злий",
    "armorClass": "10",
    "hitPoints": "25",
    "hitDice": "3к10 + 9",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "10 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 10,
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
      "Сприйняття": "+3"
    },
    "resistances": [
      "некротична"
    ],
    "senses": [
      "Темний зір 60 фт"
    ],
    "passivePerception": 13,
    "languages": [
      "Розуміє Спільну, але не розмовляє"
    ],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "traits": [
      {
        "id": "giant-vulture-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Гриф має Перевагу на кидок атаки проти істоти, якщо принаймні один союзник грифа перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      }
    ],
    "actions": [
      {
        "id": "giant-vulture-gouge",
        "nameUk": "Роздирання",
        "nameOriginal": "Gouge",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "reach": "5 фт",
        "damageInstances": [
          {
            "average": 9,
            "formula": "2к6 + 2",
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "damage": "9 (2к6 + 2)",
        "damageType": "колюча",
        "sourceText": "Ціль отримує стан Отруєний до завершення свого наступного ходу."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "incapacitated",
        "poisoned"
      ]
    },
    "sourcePage": 354
  }
];
