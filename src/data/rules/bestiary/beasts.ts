import { SRD_52_SOURCE } from '../source';
import type { OfficialMonsterEntry } from '../types';

export const officialBeasts: OfficialMonsterEntry[] = [
  {
    "entity": "monster",
    "slug": "allosaurus",
    "nameUk": "Алозавр",
    "nameOriginal": "Allosaurus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "51",
    "hitDice": "6к10 + 18",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
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
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "allosaurus-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 15,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к10 + 4"
          }
        ],
        "reach": "5 фт",
        "damage": "15 (2к10 + 4)",
        "damageType": "колюча"
      },
      {
        "id": "allosaurus-claws",
        "nameUk": "Кігті",
        "nameOriginal": "Claws",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "1к8 + 4"
          }
        ],
        "reach": "5 фт",
        "damage": "8 (1к8 + 4)",
        "damageType": "рубальна",
        "sourceText": "Якщо ціль має Великий або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 30 футів по прямій до цілі, ціль отримує стан Збитий з ніг, а алозавр може виконати проти неї одну атаку Укусом."
      }
    ],
    "sourcePage": 344,
    "subtype": "динозавр",
    "skills": {
      "Сприйняття": "+5"
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "ankylosaurus",
    "nameUk": "Анкілозавр",
    "nameOriginal": "Ankylosaurus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "15",
    "hitPoints": "68",
    "hitDice": "8к12 + 16",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+6"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
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
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "ankylosaurus-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Хвіст»."
      },
      {
        "id": "ankylosaurus-tail",
        "nameUk": "Хвіст",
        "nameOriginal": "Tail",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 9,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к10 + 4"
          }
        ],
        "reach": "10 фт",
        "damage": "9 (1к10 + 4)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Величезний або менший розмір, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 344,
    "subtype": "динозавр",
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "ape",
    "nameUk": "Мавпа",
    "nameOriginal": "Ape",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "19",
    "hitDice": "3к8 + 6",
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "ape-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Кулак»."
      },
      {
        "id": "ape-fist",
        "nameUk": "Кулак",
        "nameOriginal": "Fist",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к4 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к4 + 3)",
        "damageType": "дробильна"
      },
      {
        "id": "ape-rock",
        "nameUk": "Камінь",
        "nameOriginal": "Rock",
        "attackType": "далекобійна",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к6 + 3"
          }
        ],
        "range": "25/50 фт",
        "damage": "10 (2к6 + 3)",
        "damageType": "дробильна",
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        }
      }
    ],
    "sourcePage": 344,
    "skills": {
      "Атлетика": "+5",
      "Сприйняття": "+3"
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "archelon",
    "nameUk": "Архелон",
    "nameOriginal": "Archelon",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "17",
    "hitPoints": "90",
    "hitDice": "12к12 + 12",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "20 фт",
      "плавання 80 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "archelon-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Укус»."
      },
      {
        "id": "archelon-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 14,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "3к6 + 4"
          }
        ],
        "reach": "5 фт",
        "damage": "14 (3к6 + 4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 344,
    "subtype": "динозавр",
    "skills": {
      "Скритність": "+5"
    },
    "traits": [
      {
        "id": "archelon-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Істота може дихати повітрям і водою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "baboon",
    "nameUk": "Павіан",
    "nameOriginal": "Baboon",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "3",
    "hitDice": "1к6",
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
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "baboon-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+1",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 - 1"
          }
        ],
        "reach": "5 фт",
        "damage": "1 (1к4 - 1)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 345,
    "traits": [
      {
        "id": "baboon-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
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
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "badger",
    "nameUk": "Борсук",
    "nameOriginal": "Badger",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "5",
    "hitDice": "1к4 + 3",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "20 фт",
      "риття 5 фт"
    ],
    "abilities": {
      "strength": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "badger-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 345,
    "skills": {
      "Сприйняття": "+3"
    },
    "senses": [
      "Темний зір 30 фт"
    ],
    "resistances": [
      "отруйна шкода"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "resistance"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "bat",
    "nameUk": "Кажан",
    "nameOriginal": "Bat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "5 фт",
      "політ 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
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
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "bat-bite",
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
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 345,
    "senses": [
      "Сліпий зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "black-bear",
    "nameUk": "Чорний ведмідь",
    "nameOriginal": "Black Bear",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "19",
    "hitDice": "3к8 + 6",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт",
      "лазіння 30 фт",
      "плавання 30 фт"
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
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "black-bear-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Роздирання»."
      },
      {
        "id": "black-bear-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "1к6 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к6 + 2)",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 345,
    "skills": {
      "Сприйняття": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "blood-hawk",
    "nameUk": "Кривавий яструб",
    "nameOriginal": "Blood Hawk",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "7",
    "hitDice": "2к6",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "10 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
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
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 16,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "blood-hawk-beak",
        "nameUk": "Дзьоб",
        "nameOriginal": "Beak",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 2"
          },
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 2",
            "qualifier": "якщо істота Закривавлена"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к4 + 2)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 345,
    "skills": {
      "Сприйняття": "+6"
    },
    "traits": [
      {
        "id": "blood-hawk-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
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
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "boar",
    "nameUk": "Вепр",
    "nameOriginal": "Boar",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "13",
    "hitDice": "2к8 + 4",
    "initiative": {
      "modifier": "+0",
      "score": 10
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
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "boar-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6 + 1"
          },
          {
            "average": 3,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к6 + 1)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Середній або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує додатково 3 (1к6) колючої шкоди та стан Збитий з ніг."
      }
    ],
    "sourcePage": 346,
    "traits": [
      {
        "id": "boar-bloodied-fury",
        "nameUk": "Лють пораненого",
        "nameOriginal": "Bloodied Fury",
        "sourceText": "Поки істота Закривавлена, вона має Перевагу на кидки атаки."
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
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "brown-bear",
    "nameUk": "Бурий ведмідь",
    "nameOriginal": "Brown Bear",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "22",
    "hitDice": "3к10 + 6",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "40 фт",
      "лазіння 30 фт"
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
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "brown-bear-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує одну атаку «Укус» і одну атаку «Кіготь»."
      },
      {
        "id": "brown-bear-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "7 (1к8 + 3)",
        "damageType": "колюча"
      },
      {
        "id": "brown-bear-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "1к4 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к4 + 3)",
        "damageType": "рубальна",
        "sourceText": "Якщо ціль має Великий або менший розмір, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 346,
    "skills": {
      "Сприйняття": "+3"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "camel",
    "nameUk": "Верблюд",
    "nameOriginal": "Camel",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "17",
    "hitDice": "2к10 + 6",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 17,
        "modifier": "+3",
        "save": "+5"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 11,
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
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "camel-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к4 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к4 + 2)",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 346,
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "cat",
    "nameUk": "Кіт",
    "nameOriginal": "Cat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "2",
    "hitDice": "1к4",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "40 фт",
      "лазіння 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 15,
        "modifier": "+2",
        "save": "+4"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "cat-scratch",
        "nameUk": "Подряпина",
        "nameOriginal": "Scratch",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 346,
    "skills": {
      "Сприйняття": "+3",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "cat-jumper",
        "nameUk": "Стрибун",
        "nameOriginal": "Jumper",
        "sourceText": "Дальність стрибка кота визначається за його Спритністю, а не Силою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "constrictor-snake",
    "nameUk": "Удав",
    "nameOriginal": "Constrictor Snake",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "13",
    "hitDice": "2к10 + 2",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
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
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "constrictor-snake-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к8 + 2)",
        "damageType": "колюча"
      },
      {
        "id": "constrictor-snake-constrict",
        "nameUk": "Стискання",
        "nameOriginal": "Constrict",
        "target": "одна видима змії істота Середнього або меншого розміру в межах 5 футів",
        "savingThrow": {
          "ability": "strength",
          "dc": 12,
          "onFailure": "Ціль отримує повну шкоду та стан Схоплений (втеча СК 12)."
        },
        "damageInstances": [
          {
            "average": 7,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "3к4"
          }
        ]
      }
    ],
    "sourcePage": 346,
    "skills": {
      "Сприйняття": "+2",
      "Скритність": "+4"
    },
    "senses": [
      "Сліпий зір 10 фт"
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
        "grappled"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "crab",
    "nameUk": "Краб",
    "nameOriginal": "Crab",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "3",
    "hitDice": "1к4 + 1",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "20 фт",
      "плавання 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "crab-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 347,
    "skills": {
      "Скритність": "+2"
    },
    "senses": [
      "Сліпий зір 30 фт"
    ],
    "traits": [
      {
        "id": "crab-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Істота може дихати повітрям і водою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "crocodile",
    "nameUk": "Крокодил",
    "nameOriginal": "Crocodile",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "13",
    "hitDice": "2к10 + 2",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "20 фт",
      "плавання 30 фт"
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
        "score": 13,
        "modifier": "+1",
        "save": "+3"
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
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "crocodile-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к8 + 2)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Схоплений (втеча СК 12). Поки ціль Схоплена, вона також має стан Стримуваний."
      }
    ],
    "sourcePage": 347,
    "skills": {
      "Скритність": "+2"
    },
    "traits": [
      {
        "id": "crocodile-hold-breath",
        "nameUk": "Затримка дихання",
        "nameOriginal": "Hold Breath",
        "sourceText": "Істота може затримувати дихання на 1 годину."
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
        "grappled",
        "restrained"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "deer",
    "nameUk": "Олень",
    "nameOriginal": "Deer",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "4",
    "hitDice": "1к8",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
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
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 14,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "deer-ram",
        "nameUk": "Таран",
        "nameOriginal": "Ram",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 2,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к4"
          }
        ],
        "reach": "5 фт",
        "damage": "2 (1к4)",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 347,
    "skills": {
      "Сприйняття": "+4"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "deer-agile",
        "nameUk": "Спритність",
        "nameOriginal": "Agile",
        "sourceText": "Істота не провокує Провоковану атаку, коли виходить за межі досяжності ворога."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "dire-wolf",
    "nameUk": "Жахливий вовк",
    "nameOriginal": "Dire Wolf",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "22",
    "hitDice": "3к10 + 6",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "50 фт"
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
        "score": 15,
        "modifier": "+2",
        "save": "+2"
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
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "dire-wolf-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к10 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "8 (1к10 + 3)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 347,
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "dire-wolf-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
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
        "incapacitated",
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "draft-horse",
    "nameUk": "Ваговоз",
    "nameOriginal": "Draft Horse",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "15",
    "hitDice": "2к10 + 4",
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
        "score": 2,
        "modifier": "−4",
        "save": "−4"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "draft-horse-hooves",
        "nameUk": "Копита",
        "nameOriginal": "Hooves",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к4 + 4"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к4 + 4)",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 347,
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "eagle",
    "nameUk": "Орел",
    "nameOriginal": "Eagle",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "4",
    "hitDice": "1к6 + 1",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "10 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 6,
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
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 16,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "eagle-talons",
        "nameUk": "Пазурі",
        "nameOriginal": "Talons",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "1к4 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к4 + 2)",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 348,
    "skills": {
      "Сприйняття": "+6"
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "elephant",
    "nameUk": "Слон",
    "nameOriginal": "Elephant",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "76",
    "hitDice": "8к12 + 24",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "40 фт"
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
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "elephant-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Удар рогами»."
      },
      {
        "id": "elephant-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 15,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к8 + 6"
          }
        ],
        "reach": "5 фт",
        "damage": "15 (2к8 + 6)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Величезний або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 348,
    "bonusActions": [
      {
        "id": "elephant-trample",
        "nameUk": "Затоптування",
        "nameOriginal": "Trample",
        "target": "одна істота в межах 5 футів, яка має стан Збитий з ніг",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 16,
          "onFailure": "Ціль отримує повну шкоду.",
          "onSuccess": "Ціль отримує половину шкоди."
        },
        "damageInstances": [
          {
            "average": 17,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "2к10 + 6"
          }
        ]
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
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "elk",
    "nameUk": "Лось",
    "nameOriginal": "Elk",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "11",
    "hitDice": "2к10",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "50 фт"
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
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "elk-ram",
        "nameUk": "Таран",
        "nameOriginal": "Ram",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к6 + 3"
          },
          {
            "average": 3,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к6"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к6 + 3)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує додатково 3 (1к6) дробильної шкоди та стан Збитий з ніг."
      }
    ],
    "sourcePage": 348,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "frog",
    "nameUk": "Жаба",
    "nameOriginal": "Frog",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "20 фт",
      "плавання 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "frog-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 348,
    "skills": {
      "Сприйняття": "+1",
      "Скритність": "+3"
    },
    "senses": [
      "Темний зір 30 фт"
    ],
    "traits": [
      {
        "id": "frog-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Істота може дихати повітрям і водою."
      },
      {
        "id": "frog-standing-leap",
        "nameUk": "Стрибок з місця",
        "nameOriginal": "Standing Leap",
        "sourceText": "Стрибок істоти в довжину становить до 10 футів, а у висоту — до 5 футів, із розбігу або без нього."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "movement"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-ape",
    "nameUk": "Гігантська мавпа",
    "nameOriginal": "Giant Ape",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "168",
    "hitDice": "16к12 + 64",
    "initiative": {
      "modifier": "+5",
      "score": 15
    },
    "speed": [
      "40 фт",
      "лазіння 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 23,
        "modifier": "+6",
        "save": "+6"
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
    "passivePerception": 14,
    "languages": [],
    "challengeRating": "7",
    "experiencePoints": 2900,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "giant-ape-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Кулак»."
      },
      {
        "id": "giant-ape-fist",
        "nameUk": "Кулак",
        "nameOriginal": "Fist",
        "attackType": "ближня",
        "attackBonus": "+9",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 22,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "3к10 + 6"
          }
        ],
        "reach": "10 фт",
        "damage": "22 (3к10 + 6)",
        "damageType": "дробильна"
      },
      {
        "id": "giant-ape-boulder-toss",
        "nameUk": "Кидок валуна",
        "nameOriginal": "Boulder Toss",
        "target": "кожна істота у 5-футовій Сфері з центром у вибраній точці",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 17,
          "onFailure": "Ціль отримує повну шкоду та стан Збитий з ніг.",
          "onSuccess": "Ціль отримує половину шкоди."
        },
        "damageInstances": [
          {
            "average": 24,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "7к6"
          }
        ],
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "sourceText": "Мавпа жбурляє валун у видиму точку в межах 90 футів. Якщо ціль має Великий або менший розмір і провалює ряткидок, вона також отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 349,
    "skills": {
      "Атлетика": "+9",
      "Сприйняття": "+4",
      "Виживання": "+4"
    },
    "bonusActions": [
      {
        "id": "giant-ape-leap",
        "nameUk": "Стрибок",
        "nameOriginal": "Leap",
        "sourceText": "Мавпа витрачає 10 футів переміщення та стрибає на відстань до 30 футів."
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
        "movement",
        "saving-throws"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-badger",
    "nameUk": "Гігантський борсук",
    "nameOriginal": "Giant Badger",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "15",
    "hitDice": "2к8 + 6",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт",
      "риття 10 фт"
    ],
    "abilities": {
      "strength": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-badger-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к4 + 1"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (2к4 + 1)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 349,
    "skills": {
      "Сприйняття": "+3"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "resistances": [
      "отруйна шкода"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "resistance"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-bat",
    "nameUk": "Гігантський кажан",
    "nameOriginal": "Giant Bat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "22",
    "hitDice": "4к10",
    "initiative": {
      "modifier": "+3",
      "score": 13
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-bat-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к6 + 3)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 349,
    "senses": [
      "Сліпий зір 120 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-boar",
    "nameUk": "Гігантський вепр",
    "nameOriginal": "Giant Boar",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "42",
    "hitDice": "5к10 + 15",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+5"
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
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-boar-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к6 + 3"
          },
          {
            "average": 7,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к6"
          }
        ],
        "reach": "5 фт",
        "damage": "10 (2к6 + 3)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує додатково 7 (2к6) колючої шкоди та стан Збитий з ніг."
      }
    ],
    "sourcePage": 349,
    "traits": [
      {
        "id": "giant-boar-bloodied-fury",
        "nameUk": "Лють пораненого",
        "nameOriginal": "Bloodied Fury",
        "sourceText": "Поки істота Закривавлена, вона має Перевагу на кидки атаки ближнього бою."
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
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-centipede",
    "nameUk": "Гігантська сороконіжка",
    "nameOriginal": "Giant Centipede",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "9",
    "hitDice": "2к6 + 2",
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-centipede-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к4 + 2)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 349,
    "senses": [
      "Сліпий зір 30 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "poisoned"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-constrictor-snake",
    "nameUk": "Гігантський удав",
    "nameOriginal": "Giant Constrictor Snake",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "60",
    "hitDice": "8к12 + 8",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
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
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-constrictor-snake-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Змія виконує одну атаку Укусом і використовує Стискання."
      },
      {
        "id": "giant-constrictor-snake-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 11,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к6 + 4"
          }
        ],
        "reach": "10 фт",
        "damage": "11 (2к6 + 4)",
        "damageType": "колюча"
      },
      {
        "id": "giant-constrictor-snake-constrict",
        "nameUk": "Стискання",
        "nameOriginal": "Constrict",
        "target": "одна видима змії істота Великого або меншого розміру в межах 10 футів",
        "savingThrow": {
          "ability": "strength",
          "dc": 14,
          "onFailure": "Ціль отримує повну шкоду та стан Схоплений (втеча СК 14)."
        },
        "damageInstances": [
          {
            "average": 13,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "2к8 + 4"
          }
        ]
      }
    ],
    "sourcePage": 350,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Сліпий зір 10 фт"
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
        "grappled"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-crab",
    "nameUk": "Гігантський краб",
    "nameOriginal": "Giant Crab",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "15",
    "hitPoints": "13",
    "hitDice": "3к8",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
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
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-crab-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к6 + 1"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к6 + 1)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Схоплений (втеча СК 11) одним із двох кігтів."
      }
    ],
    "sourcePage": 350,
    "skills": {
      "Скритність": "+3"
    },
    "senses": [
      "Сліпий зір 30 фт"
    ],
    "traits": [
      {
        "id": "giant-crab-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Істота може дихати повітрям і водою."
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
        "grappled"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-crocodile",
    "nameUk": "Гігантський крокодил",
    "nameOriginal": "Giant Crocodile",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "85",
    "hitDice": "9к12 + 27",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "30 фт",
      "плавання 50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 21,
        "modifier": "+5",
        "save": "+5"
      },
      "dexterity": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "giant-crocodile-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує одну атаку «Укус» і одну атаку «Хвіст»."
      },
      {
        "id": "giant-crocodile-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 21,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "3к10 + 5"
          }
        ],
        "reach": "5 фт",
        "damage": "21 (3к10 + 5)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Схоплений (втеча СК 15). Поки ціль Схоплена, вона також має стан Стримуваний і не може бути ціллю атаки Хвостом."
      },
      {
        "id": "giant-crocodile-tail",
        "nameUk": "Хвіст",
        "nameOriginal": "Tail",
        "attackType": "ближня",
        "attackBonus": "+8",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 18,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "3к8 + 5"
          }
        ],
        "reach": "10 фт",
        "damage": "18 (3к8 + 5)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 350,
    "skills": {
      "Скритність": "+5"
    },
    "traits": [
      {
        "id": "giant-crocodile-hold-breath",
        "nameUk": "Затримка дихання",
        "nameOriginal": "Hold Breath",
        "sourceText": "Істота може затримувати дихання на 1 годину."
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
        "grappled",
        "prone",
        "restrained"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-fire-beetle",
    "nameUk": "Гігантський вогняний жук",
    "nameOriginal": "Giant Fire Beetle",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "4",
    "hitDice": "1к6 + 1",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-fire-beetle-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+1",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "вогняна",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "вогняна"
      }
    ],
    "sourcePage": 351,
    "senses": [
      "Сліпий зір 30 фт"
    ],
    "resistances": [
      "вогняна шкода"
    ],
    "traits": [
      {
        "id": "giant-fire-beetle-illumination",
        "nameUk": "Світіння",
        "nameOriginal": "Illumination",
        "sourceText": "Жук випромінює яскраве світло в радіусі 10 футів і тьмяне світло ще на 10 футів."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "resistance"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-frog",
    "nameUk": "Гігантська жаба",
    "nameOriginal": "Giant Frog",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "18",
    "hitDice": "4к8",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
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
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-frog-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к6 + 2)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Схоплений (втеча СК 11)."
      },
      {
        "id": "giant-frog-swallow",
        "nameUk": "Проковтування",
        "nameOriginal": "Swallow",
        "damageInstances": [
          {
            "average": 5,
            "formula": "2к4",
            "damageType": "кислотна",
            "application": "end-of-turn"
          }
        ],
        "sourceText": "Жаба проковтує Схоплену нею ціль Малого або меншого розміру. Проковтнута ціль більше не Схоплена, але має стани Засліплений і Стримуваний та Повне укриття від атак й інших ефектів ззовні жаби. Поки ціль проковтнута, жаба не може використовувати Укус. Якщо жаба помирає, ціль більше не Стримувана й може витратити 5 футів переміщення, щоб вибратися з тіла у стані Збитий з ніг. Наприкінці наступного ходу жаби ціль отримує 5 (2к4) кислотної шкоди. Якщо ця шкода не вбиває ціль, жаба вивергає її у стані Збитий з ніг."
      }
    ],
    "sourcePage": 351,
    "skills": {
      "Сприйняття": "+2",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 30 фт"
    ],
    "traits": [
      {
        "id": "giant-frog-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Істота може дихати повітрям і водою."
      },
      {
        "id": "giant-frog-standing-leap",
        "nameUk": "Стрибок з місця",
        "nameOriginal": "Standing Leap",
        "sourceText": "Стрибок істоти в довжину становить до 20 футів, а у висоту — до 10 футів, із розбігу або без нього."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative",
        "movement"
      ],
      "conditionSlugs": [
        "blinded",
        "grappled",
        "prone",
        "restrained"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-goat",
    "nameUk": "Гігантський козел",
    "nameOriginal": "Giant Goat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "19",
    "hitDice": "3к10 + 3",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "40 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 17,
        "modifier": "+3",
        "save": "+5"
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
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-goat-ram",
        "nameUk": "Таран",
        "nameOriginal": "Ram",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к6 + 3"
          },
          {
            "average": 5,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к4"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к6 + 3)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує додатково 5 (2к4) дробильної шкоди та стан Збитий з ніг."
      }
    ],
    "sourcePage": 351,
    "skills": {
      "Сприйняття": "+3"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-hyena",
    "nameUk": "Гігантська гієна",
    "nameOriginal": "Giant Hyena",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "45",
    "hitDice": "6к10 + 12",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "50 фт"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-hyena-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к6 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "10 (2к6 + 3)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 352,
    "skills": {
      "Сприйняття": "+3"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "bonusActions": [
      {
        "id": "giant-hyena-rampage",
        "nameUk": "Шаленство",
        "nameOriginal": "Rampage",
        "limitedUse": {
          "uses": 1,
          "period": "day"
        },
        "sourceText": "Одразу після завдання шкоди істоті, яка вже була Закривавлена, гієна може переміститися на відстань до половини своєї Швидкості й виконати одну атаку Укусом."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-lizard",
    "nameUk": "Гігантська ящірка",
    "nameOriginal": "Giant Lizard",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "19",
    "hitDice": "3к10 + 3",
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
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+3"
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
        "id": "giant-lizard-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к8 + 2)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 352,
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "giant-lizard-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-octopus",
    "nameUk": "Гігантський восьминіг",
    "nameOriginal": "Giant Octopus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "45",
    "hitDice": "7к10 + 7",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "10 фт",
      "плавання 60 фт"
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
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 14,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-octopus-tentacles",
        "nameUk": "Щупальця",
        "nameOriginal": "Tentacles",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к6 + 3"
          }
        ],
        "reach": "10 фт",
        "damage": "10 (2к6 + 3)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Схоплений (втеча СК 13) усіма вісьмома щупальцями. Поки ціль Схоплена, вона також має стан Стримуваний."
      }
    ],
    "sourcePage": 352,
    "skills": {
      "Сприйняття": "+4",
      "Скритність": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "giant-octopus-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою. Поза водою вона може затримувати дихання на 1 годину."
      }
    ],
    "reactions": [
      {
        "id": "giant-octopus-ink-cloud",
        "nameUk": "Чорнильна хмара",
        "nameOriginal": "Ink Cloud",
        "limitedUse": {
          "uses": 1,
          "period": "day"
        },
        "sourceText": "Тригер: Восьминіг отримує шкоду під водою. Відповідь: восьминіг випускає чорнило, яке заповнює 10-футовий Куб із центром на ньому, і переміщується на відстань до своєї Швидкості плавання. Куб є сильно заслоненою областю протягом 1 хвилини або доки сильна течія чи подібний ефект не розсіє чорнило."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative",
        "reaction"
      ],
      "conditionSlugs": [
        "grappled",
        "restrained"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-rat",
    "nameUk": "Гігантський щур",
    "nameOriginal": "Giant Rat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "7",
    "hitDice": "2к6",
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
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+5"
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
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-rat-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к4 + 3)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 353,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "giant-rat-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
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
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-scorpion",
    "nameUk": "Гігантський скорпіон",
    "nameOriginal": "Giant Scorpion",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "15",
    "hitPoints": "52",
    "hitDice": "7к10 + 14",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "40 фт"
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
        "score": 15,
        "modifier": "+2",
        "save": "+2"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-scorpion-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Скорпіон виконує дві атаки Кігтями й одну атаку Жалом."
      },
      {
        "id": "giant-scorpion-claw",
        "nameUk": "Кіготь",
        "nameOriginal": "Claw",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к6 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к6 + 3)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Схоплений (втеча СК 13) одним із двох кігтів."
      },
      {
        "id": "giant-scorpion-sting",
        "nameUk": "Жало",
        "nameOriginal": "Sting",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 3"
          },
          {
            "average": 11,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "2к10"
          }
        ],
        "reach": "5 фт",
        "damage": "7 (1к8 + 3)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 353,
    "senses": [
      "Сліпий зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "grappled"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-seahorse",
    "nameUk": "Гігантський морський коник",
    "nameOriginal": "Giant Seahorse",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "16",
    "hitDice": "3к10",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "5 фт",
      "плавання 40 фт"
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
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-seahorse-ram",
        "nameUk": "Таран",
        "nameOriginal": "Ram",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 9,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к6 + 2"
          },
          {
            "average": 11,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к8 + 2",
            "qualifier": "альтернативна шкода за умовою дії"
          }
        ],
        "reach": "5 фт",
        "damage": "9 (2к6 + 2)",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 353,
    "traits": [
      {
        "id": "giant-seahorse-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
      }
    ],
    "bonusActions": [
      {
        "id": "giant-seahorse-bubble-dash",
        "nameUk": "Ривок у бульбашці",
        "nameOriginal": "Bubble Dash",
        "sourceText": "Під водою морський коник переміщується на відстань до половини своєї Швидкості плавання, не провокуючи Провокованих атак."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-shark",
    "nameUk": "Гігантська акула",
    "nameOriginal": "Giant Shark",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "92",
    "hitDice": "8к12 + 40",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "5 фт",
      "плавання 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 23,
        "modifier": "+6",
        "save": "+6"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "giant-shark-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Укус»."
      },
      {
        "id": "giant-shark-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+9",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 22,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "3к10 + 6"
          }
        ],
        "reach": "5 фт",
        "damage": "22 (3к10 + 6)",
        "damageType": "колюча",
        "sourceText": "Кидок атаки має Перевагу, якщо ціль не має всіх своїх хітів."
      }
    ],
    "sourcePage": 353,
    "skills": {
      "Сприйняття": "+3"
    },
    "senses": [
      "Сліпий зір 60 фт"
    ],
    "traits": [
      {
        "id": "giant-shark-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-spider",
    "nameUk": "Гігантський павук",
    "nameOriginal": "Giant Spider",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "26",
    "hitDice": "4к10 + 4",
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
        "score": 14,
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
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 14,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-spider-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 3"
          },
          {
            "average": 7,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "2к6"
          }
        ],
        "reach": "5 фт",
        "damage": "7 (1к8 + 3)",
        "damageType": "колюча"
      },
      {
        "id": "giant-spider-web",
        "nameUk": "Павутина",
        "nameOriginal": "Web",
        "target": "одна видима павуку істота в межах 60 футів",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 13,
          "onFailure": "Ціль отримує стан Стримуваний, доки павутину не знищать."
        },
        "damageInstances": [],
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 5,
          "maximum": 6
        },
        "sourceText": "Павутина має КЗ 10, 5 хітів, вразливість до вогняної шкоди та імунітет до отруйної й психічної шкоди."
      }
    ],
    "sourcePage": 353,
    "skills": {
      "Сприйняття": "+4",
      "Скритність": "+7"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "giant-spider-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      },
      {
        "id": "giant-spider-web-walker",
        "nameUk": "Ходіння павутиною",
        "nameOriginal": "Web Walker",
        "sourceText": "Істота ігнорує обмеження переміщення від павутини й знає місцеперебування кожної іншої істоти, яка торкається тієї самої павутини."
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
        "restrained"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-toad",
    "nameUk": "Гігантська ропуха",
    "nameOriginal": "Giant Toad",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "39",
    "hitDice": "6к10 + 6",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-toad-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6 + 2"
          },
          {
            "average": 5,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "2к4"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к6 + 2)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Середній або менший розмір, вона отримує стан Схоплений (втеча СК 12)."
      },
      {
        "id": "giant-toad-swallow",
        "nameUk": "Проковтування",
        "nameOriginal": "Swallow",
        "damageInstances": [
          {
            "average": 10,
            "formula": "3к6",
            "damageType": "кислотна",
            "application": "end-of-turn"
          }
        ],
        "sourceText": "Ропуха проковтує Схоплену нею ціль Середнього або меншого розміру. Проковтнута ціль більше не Схоплена, але має стани Засліплений і Стримуваний та Повне укриття від атак й інших ефектів ззовні ропухи. Наприкінці кожного ходу ропухи ціль отримує 10 (3к6) кислотної шкоди. Ропуха може мати лише одну проковтнуту ціль і не може використовувати Укус, поки тримає її. Якщо ропуха помирає, ціль більше не Стримувана й може витратити 5 футів переміщення, щоб вибратися з тіла у стані Збитий з ніг."
      }
    ],
    "sourcePage": 354,
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "giant-toad-amphibious",
        "nameUk": "Амфібія",
        "nameOriginal": "Amphibious",
        "sourceText": "Істота може дихати повітрям і водою."
      },
      {
        "id": "giant-toad-standing-leap",
        "nameUk": "Стрибок з місця",
        "nameOriginal": "Standing Leap",
        "sourceText": "Стрибок істоти в довжину становить до 20 футів, а у висоту — до 10 футів, із розбігу або без нього."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative",
        "movement"
      ],
      "conditionSlugs": [
        "blinded",
        "grappled",
        "prone",
        "restrained"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-venomous-snake",
    "nameUk": "Гігантська отруйна змія",
    "nameOriginal": "Giant Venomous Snake",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
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
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
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
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-venomous-snake-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 4"
          },
          {
            "average": 4,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "1к8"
          }
        ],
        "reach": "10 фт",
        "damage": "6 (1к4 + 4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 354,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Сліпий зір 10 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-wasp",
    "nameUk": "Гігантська оса",
    "nameOriginal": "Giant Wasp",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "22",
    "hitDice": "5к8",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "10 фт",
      "політ 50 фт"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-wasp-sting",
        "nameUk": "Жало",
        "nameOriginal": "Sting",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6 + 2"
          },
          {
            "average": 5,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "2к4"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к6 + 2)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 354,
    "traits": [
      {
        "id": "giant-wasp-flyby",
        "nameUk": "Проліт",
        "nameOriginal": "Flyby",
        "sourceText": "Істота не провокує Провоковану атаку, коли вилітає за межі досяжності ворога."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-weasel",
    "nameUk": "Гігантська ласка",
    "nameOriginal": "Giant Weasel",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "9",
    "hitDice": "2к8",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "40 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "dexterity": {
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-weasel-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к4 + 3)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 355,
    "skills": {
      "Акробатика": "+5",
      "Сприйняття": "+3",
      "Скритність": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "giant-wolf-spider",
    "nameUk": "Гігантський павук-вовк",
    "nameOriginal": "Giant Wolf Spider",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "40 фт",
      "лазіння 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
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
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "giant-wolf-spider-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 3"
          },
          {
            "average": 5,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "2к4"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к4 + 3)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 355,
    "skills": {
      "Сприйняття": "+3",
      "Скритність": "+7"
    },
    "senses": [
      "Сліпий зір 10 фт, Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "giant-wolf-spider-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "goat",
    "nameUk": "Козел",
    "nameOriginal": "Goat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "4",
    "hitDice": "1к8",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "40 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
        "modifier": "+0",
        "save": "+2"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "goat-ram",
        "nameUk": "Таран",
        "nameOriginal": "Ram",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "дробильна",
            "application": "on-hit"
          },
          {
            "average": 2,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к4",
            "qualifier": "альтернативна шкода за умовою дії"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 355,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "hawk",
    "nameUk": "Яструб",
    "nameOriginal": "Hawk",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "10 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 16,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "hawk-talons",
        "nameUk": "Пазурі",
        "nameOriginal": "Talons",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 355,
    "skills": {
      "Сприйняття": "+6"
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "hippopotamus",
    "nameUk": "Бегемот",
    "nameOriginal": "Hippopotamus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "82",
    "hitDice": "11к10 + 22",
    "initiative": {
      "modifier": "−2",
      "score": 8
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 21,
        "modifier": "+5",
        "save": "+7"
      },
      "dexterity": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "4",
    "experiencePoints": 1100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "hippopotamus-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Укус»."
      },
      {
        "id": "hippopotamus-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 16,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к10 + 5"
          }
        ],
        "reach": "5 фт",
        "damage": "16 (2к10 + 5)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 355,
    "skills": {
      "Сприйняття": "+3"
    },
    "traits": [
      {
        "id": "hippopotamus-hold-breath",
        "nameUk": "Затримка дихання",
        "nameOriginal": "Hold Breath",
        "sourceText": "Істота може затримувати дихання на 10 хвилин."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "hunter-shark",
    "nameUk": "Мисливська акула",
    "nameOriginal": "Hunter Shark",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "45",
    "hitDice": "6к10 + 12",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "5 фт",
      "плавання 40 фт"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "hunter-shark-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 14,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "3к6 + 4"
          }
        ],
        "reach": "5 фт",
        "damage": "14 (3к6 + 4)",
        "damageType": "колюча",
        "sourceText": "Кидок атаки має Перевагу, якщо ціль не має всіх своїх хітів."
      }
    ],
    "sourcePage": 356,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Сліпий зір 60 фт"
    ],
    "traits": [
      {
        "id": "hunter-shark-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "hyena",
    "nameUk": "Гієна",
    "nameOriginal": "Hyena",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "5",
    "hitDice": "1к8 + 1",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 11,
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "hyena-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 3,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6"
          }
        ],
        "reach": "5 фт",
        "damage": "3 (1к6)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 356,
    "skills": {
      "Сприйняття": "+3"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "hyena-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
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
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "jackal",
    "nameUk": "Шакал",
    "nameOriginal": "Jackal",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "3",
    "hitDice": "1к6",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
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
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "jackal-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+1",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 - 1"
          }
        ],
        "reach": "5 фт",
        "damage": "1 (1к4 - 1)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 356,
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 90 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "killer-whale",
    "nameUk": "Косатка",
    "nameOriginal": "Killer Whale",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "90",
    "hitDice": "12к12 + 12",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "5 фт",
      "плавання 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 19,
        "modifier": "+4",
        "save": "+4"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "3",
    "experiencePoints": 700,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "killer-whale-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 21,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "5к6 + 4"
          }
        ],
        "reach": "5 фт",
        "damage": "21 (5к6 + 4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 356,
    "skills": {
      "Сприйняття": "+3",
      "Скритність": "+4"
    },
    "senses": [
      "Сліпий зір 120 фт"
    ],
    "traits": [
      {
        "id": "killer-whale-hold-breath",
        "nameUk": "Затримка дихання",
        "nameOriginal": "Hold Breath",
        "sourceText": "Істота може затримувати дихання на 30 хвилин."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "lion",
    "nameUk": "Лев",
    "nameOriginal": "Lion",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "22",
    "hitDice": "4к10",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "50 фт"
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
        "score": 11,
        "modifier": "+0",
        "save": "+0"
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
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "lion-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Лев виконує дві атаки «Роздирання». Одну атаку він може замінити використанням Реву."
      },
      {
        "id": "lion-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "1к8 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "7 (1к8 + 3)",
        "damageType": "рубальна"
      },
      {
        "id": "lion-roar",
        "nameUk": "Рев",
        "nameOriginal": "Roar",
        "target": "одна істота в межах 15 футів",
        "savingThrow": {
          "ability": "wisdom",
          "dc": 11,
          "onFailure": "Ціль отримує стан Наляканий до початку наступного ходу лева."
        },
        "damageInstances": []
      }
    ],
    "sourcePage": 356,
    "skills": {
      "Сприйняття": "+3",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "lion-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      },
      {
        "id": "lion-running-leap",
        "nameUk": "Стрибок із розбігу",
        "nameOriginal": "Running Leap",
        "sourceText": "Після розбігу на 10 футів істота може виконати стрибок у довжину на відстань до 25 футів."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "initiative",
        "movement",
        "saving-throws"
      ],
      "conditionSlugs": [
        "frightened",
        "incapacitated"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "lizard",
    "nameUk": "Ящірка",
    "nameOriginal": "Lizard",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "2",
    "hitDice": "1к4",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "20 фт",
      "лазіння 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "lizard-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 357,
    "senses": [
      "Темний зір 30 фт"
    ],
    "traits": [
      {
        "id": "lizard-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "mammoth",
    "nameUk": "Мамонт",
    "nameOriginal": "Mammoth",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "126",
    "hitDice": "11к12 + 55",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 24,
        "modifier": "+7",
        "save": "+10"
      },
      "dexterity": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "constitution": {
        "score": 21,
        "modifier": "+5",
        "save": "+8"
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
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "6",
    "experiencePoints": 2300,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "mammoth-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Удар рогами»."
      },
      {
        "id": "mammoth-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 18,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к10 + 7"
          }
        ],
        "reach": "10 фт",
        "damage": "18 (2к10 + 7)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Величезний або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 357,
    "bonusActions": [
      {
        "id": "mammoth-trample",
        "nameUk": "Затоптування",
        "nameOriginal": "Trample",
        "target": "одна істота в межах 5 футів, яка має стан Збитий з ніг",
        "savingThrow": {
          "ability": "dexterity",
          "dc": 18,
          "onFailure": "Ціль отримує повну шкоду.",
          "onSuccess": "Ціль отримує половину шкоди."
        },
        "damageInstances": [
          {
            "average": 29,
            "damageType": "дробильна",
            "application": "failed-save",
            "formula": "4к10 + 7"
          }
        ]
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
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "mastiff",
    "nameUk": "Мастиф",
    "nameOriginal": "Mastiff",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "5",
    "hitDice": "1к8 + 1",
    "initiative": {
      "modifier": "+2",
      "score": 12
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
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+3"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "mastiff-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6 + 1"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к6 + 1)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Середній або менший розмір, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 357,
    "skills": {
      "Сприйняття": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "mule",
    "nameUk": "Мул",
    "nameOriginal": "Mule",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 14,
        "modifier": "+2",
        "save": "+4"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "mule-hooves",
        "nameUk": "Копита",
        "nameOriginal": "Hooves",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к4 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к4 + 2)",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 357,
    "traits": [
      {
        "id": "mule-beast-of-burden",
        "nameUk": "Тяглова тварина",
        "nameOriginal": "Beast of Burden",
        "sourceText": "Для визначення вантажопідйомності істота вважається на один розмір більшою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "octopus",
    "nameUk": "Восьминіг",
    "nameOriginal": "Octopus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Малий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "3",
    "hitDice": "1к6",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "5 фт",
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
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "octopus-tentacles",
        "nameUk": "Щупальця",
        "nameOriginal": "Tentacles",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "дробильна",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 357,
    "skills": {
      "Сприйняття": "+2",
      "Скритність": "+6"
    },
    "senses": [
      "Темний зір 30 фт"
    ],
    "traits": [
      {
        "id": "octopus-compression",
        "nameUk": "Стискання",
        "nameOriginal": "Compression",
        "sourceText": "Істота може пройти крізь простір завширшки лише 1 дюйм, не витрачаючи додаткового переміщення."
      },
      {
        "id": "octopus-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
      }
    ],
    "reactions": [
      {
        "id": "octopus-ink-cloud",
        "nameUk": "Чорнильна хмара",
        "nameOriginal": "Ink Cloud",
        "limitedUse": {
          "uses": 1,
          "period": "day"
        },
        "sourceText": "Тригер: Істота завершує хід у межах 5 футів від восьминога під водою. Відповідь: восьминіг випускає чорнило, яке заповнює 5-футовий Куб із центром на ньому, і переміщується на відстань до своєї Швидкості плавання. Куб є сильно заслоненою областю протягом 1 хвилини або доки сильна течія чи подібний ефект не розсіє чорнило."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "reaction"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "owl",
    "nameUk": "Сова",
    "nameOriginal": "Owl",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "5 фт",
      "політ 60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
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
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "owl-talons",
        "nameUk": "Пазурі",
        "nameOriginal": "Talons",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "рубальна",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 358,
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+5"
    },
    "senses": [
      "Темний зір 120 фт"
    ],
    "traits": [
      {
        "id": "owl-flyby",
        "nameUk": "Проліт",
        "nameOriginal": "Flyby",
        "sourceText": "Істота не провокує Провоковану атаку, коли вилітає за межі досяжності ворога."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "panther",
    "nameUk": "Пантера",
    "nameOriginal": "Panther",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "13",
    "hitDice": "3к8",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "50 фт",
      "лазіння 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 14,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "panther-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "1к6 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к6 + 3)",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 358,
    "skills": {
      "Сприйняття": "+4",
      "Скритність": "+7"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "bonusActions": [
      {
        "id": "panther-nimble-escape",
        "nameUk": "Спритна втеча",
        "nameOriginal": "Nimble Escape",
        "sourceText": "Істота виконує дію Відхід або Сховатися."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "disengage",
        "hide",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "piranha",
    "nameUk": "Піранья",
    "nameOriginal": "Piranha",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "5 фт",
      "плавання 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "piranha-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча",
        "sourceText": "Кидок атаки має Перевагу, якщо ціль не має всіх своїх хітів."
      }
    ],
    "sourcePage": 358,
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "piranha-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "plesiosaurus",
    "nameUk": "Плезіозавр",
    "nameOriginal": "Plesiosaurus",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "68",
    "hitDice": "8к10 + 24",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "20 фт",
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "plesiosaurus-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 11,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к6 + 4"
          }
        ],
        "reach": "10 фт",
        "damage": "11 (2к6 + 4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 358,
    "subtype": "динозавр",
    "skills": {
      "Сприйняття": "+3",
      "Скритність": "+4"
    },
    "traits": [
      {
        "id": "plesiosaurus-hold-breath",
        "nameUk": "Затримка дихання",
        "nameOriginal": "Hold Breath",
        "sourceText": "Істота може затримувати дихання на 1 годину."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "polar-bear",
    "nameUk": "Білий ведмідь",
    "nameOriginal": "Polar Bear",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "42",
    "hitDice": "5к10 + 15",
    "initiative": {
      "modifier": "+2",
      "score": 12
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
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "polar-bear-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Роздирання»."
      },
      {
        "id": "polar-bear-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 9,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "1к8 + 5"
          }
        ],
        "reach": "5 фт",
        "damage": "9 (1к8 + 5)",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 359,
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "resistances": [
      "холодна шкода"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "resistance"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "pony",
    "nameUk": "Поні",
    "nameOriginal": "Pony",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 15,
        "modifier": "+2",
        "save": "+4"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "pony-hooves",
        "nameUk": "Копита",
        "nameOriginal": "Hooves",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к4 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к4 + 2)",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 359,
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "pteranodon",
    "nameUk": "Птеранодон",
    "nameOriginal": "Pteranodon",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "13",
    "hitDice": "3к8",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "10 фт",
      "політ 60 фт"
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
        "save": "+2"
      },
      "constitution": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "pteranodon-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (1к8 + 2)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 359,
    "subtype": "динозавр",
    "skills": {
      "Сприйняття": "+1"
    },
    "traits": [
      {
        "id": "pteranodon-flyby",
        "nameUk": "Проліт",
        "nameOriginal": "Flyby",
        "sourceText": "Істота не провокує Провоковану атаку, коли вилітає за межі досяжності ворога."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "rat",
    "nameUk": "Щур",
    "nameOriginal": "Rat",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "20 фт",
      "лазіння 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
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
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "rat-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 359,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Темний зір 30 фт"
    ],
    "traits": [
      {
        "id": "rat-agile",
        "nameUk": "Спритність",
        "nameOriginal": "Agile",
        "sourceText": "Істота не провокує Провоковану атаку, коли виходить за межі досяжності ворога."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "raven",
    "nameUk": "Ворон",
    "nameOriginal": "Raven",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "2",
    "hitDice": "1к4",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "10 фт",
      "політ 50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
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
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "raven-beak",
        "nameUk": "Дзьоб",
        "nameOriginal": "Beak",
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
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 359,
    "skills": {
      "Сприйняття": "+3"
    },
    "traits": [
      {
        "id": "raven-mimicry",
        "nameUk": "Наслідування",
        "nameOriginal": "Mimicry",
        "sourceText": "Ворон може наслідувати прості звуки, які чув, наприклад шепіт або цвірінькання. Слухач розпізнає імітацію, якщо успішно проходить перевірку Мудрості (Проникливість) СК 10."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "reef-shark",
    "nameUk": "Рифова акула",
    "nameOriginal": "Reef Shark",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "22",
    "hitDice": "4к8 + 4",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "5 фт",
      "плавання 30 фт"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "reef-shark-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к4 + 2"
          }
        ],
        "reach": "5 фт",
        "damage": "7 (2к4 + 2)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 360,
    "skills": {
      "Сприйняття": "+2"
    },
    "senses": [
      "Сліпий зір 30 фт"
    ],
    "traits": [
      {
        "id": "reef-shark-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
      },
      {
        "id": "reef-shark-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
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
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "rhinoceros",
    "nameUk": "Носоріг",
    "nameOriginal": "Rhinoceros",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "45",
    "hitDice": "6к10 + 12",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 21,
        "modifier": "+5",
        "save": "+5"
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
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "rhinoceros-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+7",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 14,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к8 + 5"
          },
          {
            "average": 9,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к8"
          }
        ],
        "reach": "5 фт",
        "damage": "14 (2к8 + 5)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує додатково 9 (2к8) колючої шкоди та стан Збитий з ніг."
      }
    ],
    "sourcePage": 360,
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "riding-horse",
    "nameUk": "Верховий кінь",
    "nameOriginal": "Riding Horse",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "13",
    "hitDice": "2к10 + 2",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "60 фт"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "riding-horse-hooves",
        "nameUk": "Копита",
        "nameOriginal": "Hooves",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 7,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "1к8 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "7 (1к8 + 3)",
        "damageType": "дробильна"
      }
    ],
    "sourcePage": 360,
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "saber-toothed-tiger",
    "nameUk": "Шаблезубий тигр",
    "nameOriginal": "Saber-Toothed Tiger",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "52",
    "hitDice": "7к10 + 14",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+6"
      },
      "dexterity": {
        "score": 17,
        "modifier": "+3",
        "save": "+5"
      },
      "constitution": {
        "score": 15,
        "modifier": "+2",
        "save": "+2"
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
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "saber-toothed-tiger-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Роздирання»."
      },
      {
        "id": "saber-toothed-tiger-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 11,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "2к6 + 4"
          }
        ],
        "reach": "5 фт",
        "damage": "11 (2к6 + 4)",
        "damageType": "рубальна"
      }
    ],
    "sourcePage": 360,
    "skills": {
      "Сприйняття": "+5",
      "Скритність": "+7"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "traits": [
      {
        "id": "saber-toothed-tiger-running-leap",
        "nameUk": "Стрибок із розбігу",
        "nameOriginal": "Running Leap",
        "sourceText": "Після розбігу на 10 футів істота може виконати стрибок у довжину на відстань до 25 футів."
      }
    ],
    "bonusActions": [
      {
        "id": "saber-toothed-tiger-nimble-escape",
        "nameUk": "Спритна втеча",
        "nameOriginal": "Nimble Escape",
        "sourceText": "Істота виконує дію Відхід або Сховатися."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "damage-rolls",
        "disengage",
        "hide",
        "initiative",
        "movement"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "scorpion",
    "nameUk": "Скорпіон",
    "nameOriginal": "Scorpion",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "10 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "charisma": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 9,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "scorpion-sting",
        "nameUk": "Жало",
        "nameOriginal": "Sting",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          },
          {
            "average": 3,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "1к6"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 360,
    "senses": [
      "Сліпий зір 10 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "seahorse",
    "nameUk": "Морський коник",
    "nameOriginal": "Seahorse",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "5 фт",
      "плавання 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "dexterity": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 12,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 0,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "seahorse-bubble-dash",
        "nameUk": "Ривок у бульбашці",
        "nameOriginal": "Bubble Dash",
        "sourceText": "Під водою морський коник переміщується на відстань до своєї Швидкості плавання, не провокуючи Провокованих атак."
      }
    ],
    "sourcePage": 361,
    "skills": {
      "Сприйняття": "+2",
      "Скритність": "+5"
    },
    "traits": [
      {
        "id": "seahorse-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative",
        "opportunity-attacks"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "spider",
    "nameUk": "Павук",
    "nameOriginal": "Spider",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "20 фт",
      "лазіння 20 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 14,
        "modifier": "+2",
        "save": "+2"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "charisma": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "spider-bite",
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
          },
          {
            "average": 2,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "1к4"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 361,
    "skills": {
      "Скритність": "+4"
    },
    "senses": [
      "Темний зір 30 фт"
    ],
    "traits": [
      {
        "id": "spider-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      },
      {
        "id": "spider-web-walker",
        "nameUk": "Ходіння павутиною",
        "nameOriginal": "Web Walker",
        "sourceText": "Істота ігнорує обмеження переміщення від павутини й знає місцеперебування кожної іншої істоти, яка торкається тієї самої павутини."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "swarm-of-bats",
    "nameUk": "Рій кажанів",
    "nameOriginal": "Swarm of Bats",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "11",
    "hitDice": "2к10",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "5 фт",
      "політ 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 5,
        "modifier": "−3",
        "save": "−3"
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
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "swarm-of-bats-bites",
        "nameUk": "Укуси",
        "nameOriginal": "Bites",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к4"
          },
          {
            "average": 2,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4",
            "qualifier": "якщо істота Закривавлена"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (2к4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 361,
    "subtype": "рій крихітних звірів",
    "senses": [
      "Сліпий зір 60 фт"
    ],
    "resistances": [
      "дробильна шкода",
      "колюча шкода",
      "рубальна шкода"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Наляканий",
      "Схоплений",
      "Паралізований",
      "Скам'янілий",
      "Збитий з ніг",
      "Стримуваний",
      "Оглушений"
    ],
    "traits": [
      {
        "id": "swarm-of-bats-swarm",
        "nameUk": "Рій",
        "nameOriginal": "Swarm",
        "sourceText": "Рій може займати простір іншої істоти й навпаки та проходити крізь будь-який отвір, достатній для Крихітної істоти цього рою. Рій не може відновлювати хіти або отримувати тимчасові хіти."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "hit-points",
        "initiative",
        "resistance",
        "temporary-hit-points"
      ],
      "conditionSlugs": [
        "charmed",
        "frightened",
        "grappled",
        "paralyzed",
        "petrified",
        "prone",
        "restrained",
        "stunned"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "swarm-of-insects",
    "nameUk": "Рій комах",
    "nameOriginal": "Swarm of Insects",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "19",
    "hitDice": "3к8 + 6",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "20 фт",
      "лазіння or політ 20 фт (GM’s choice)"
    ],
    "abilities": {
      "strength": {
        "score": 3,
        "modifier": "−4",
        "save": "−4"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      }
    },
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "swarm-of-insects-bites",
        "nameUk": "Укуси",
        "nameOriginal": "Bites",
        "attackType": "ближня",
        "attackBonus": "+3",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 6,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "2к4 + 1"
          },
          {
            "average": 3,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "1к4 + 1",
            "qualifier": "якщо істота Закривавлена"
          }
        ],
        "reach": "5 фт",
        "damage": "6 (2к4 + 1)",
        "damageType": "отруйна"
      }
    ],
    "sourcePage": 361,
    "subtype": "рій крихітних звірів",
    "senses": [
      "Сліпий зір 30 фт"
    ],
    "resistances": [
      "дробильна шкода",
      "колюча шкода",
      "рубальна шкода"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Наляканий",
      "Схоплений",
      "Паралізований",
      "Скам'янілий",
      "Збитий з ніг",
      "Стримуваний",
      "Оглушений"
    ],
    "traits": [
      {
        "id": "swarm-of-insects-spider-climb",
        "nameUk": "Павуче лазіння",
        "nameOriginal": "Spider Climb",
        "sourceText": "Істота може лазити складними поверхнями, зокрема стелями, без перевірки характеристики."
      },
      {
        "id": "swarm-of-insects-swarm",
        "nameUk": "Рій",
        "nameOriginal": "Swarm",
        "sourceText": "Рій може займати простір іншої істоти й навпаки та проходити крізь будь-який отвір, достатній для Крихітної істоти цього рою. Рій не може відновлювати хіти або отримувати тимчасові хіти."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "hit-points",
        "initiative",
        "movement",
        "resistance",
        "temporary-hit-points"
      ],
      "conditionSlugs": [
        "charmed",
        "frightened",
        "grappled",
        "paralyzed",
        "petrified",
        "prone",
        "restrained",
        "stunned"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "swarm-of-piranhas",
    "nameUk": "Рій піраній",
    "nameOriginal": "Swarm of Piranhas",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "28",
    "hitDice": "8к8 − 8",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "5 фт",
      "плавання 40 фт"
    ],
    "abilities": {
      "strength": {
        "score": 13,
        "modifier": "+1",
        "save": "+1"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "intelligence": {
        "score": 1,
        "modifier": "−5",
        "save": "−5"
      },
      "wisdom": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "charisma": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 8,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "swarm-of-piranhas-bites",
        "nameUk": "Укуси",
        "nameOriginal": "Bites",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к4 + 3"
          },
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 3",
            "qualifier": "якщо істота Закривавлена"
          }
        ],
        "reach": "5 фт",
        "damage": "8 (2к4 + 3)",
        "damageType": "колюча",
        "sourceText": "Кидок атаки має Перевагу, якщо ціль не має всіх своїх хітів."
      }
    ],
    "sourcePage": 362,
    "subtype": "рій крихітних звірів",
    "senses": [
      "Темний зір 60 фт"
    ],
    "resistances": [
      "дробильна шкода",
      "колюча шкода",
      "рубальна шкода"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Наляканий",
      "Схоплений",
      "Паралізований",
      "Скам'янілий",
      "Збитий з ніг",
      "Стримуваний",
      "Оглушений"
    ],
    "traits": [
      {
        "id": "swarm-of-piranhas-swarm",
        "nameUk": "Рій",
        "nameOriginal": "Swarm",
        "sourceText": "Рій може займати простір іншої істоти й навпаки та проходити крізь будь-який отвір, достатній для Крихітної істоти цього рою. Рій не може відновлювати хіти або отримувати тимчасові хіти."
      },
      {
        "id": "swarm-of-piranhas-water-breathing",
        "nameUk": "Водне дихання",
        "nameOriginal": "Water Breathing",
        "sourceText": "Істота може дихати лише під водою."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "advantage",
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "hit-points",
        "initiative",
        "resistance",
        "temporary-hit-points"
      ],
      "conditionSlugs": [
        "charmed",
        "frightened",
        "grappled",
        "paralyzed",
        "petrified",
        "prone",
        "restrained",
        "stunned"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "swarm-of-rats",
    "nameUk": "Рій щурів",
    "nameOriginal": "Swarm of Rats",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "14",
    "hitDice": "4к8 − 4",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "30 фт",
      "лазіння 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      },
      "dexterity": {
        "score": 11,
        "modifier": "+0",
        "save": "+2"
      },
      "constitution": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
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
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "swarm-of-rats-bites",
        "nameUk": "Укуси",
        "nameOriginal": "Bites",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к4"
          },
          {
            "average": 2,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4",
            "qualifier": "якщо істота Закривавлена"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (2к4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 362,
    "subtype": "рій крихітних звірів",
    "senses": [
      "Темний зір 30 фт"
    ],
    "resistances": [
      "дробильна шкода",
      "колюча шкода",
      "рубальна шкода"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Наляканий",
      "Схоплений",
      "Паралізований",
      "Скам'янілий",
      "Збитий з ніг",
      "Стримуваний",
      "Оглушений"
    ],
    "traits": [
      {
        "id": "swarm-of-rats-swarm",
        "nameUk": "Рій",
        "nameOriginal": "Swarm",
        "sourceText": "Рій може займати простір іншої істоти й навпаки та проходити крізь будь-який отвір, достатній для Крихітної істоти цього рою. Рій не може відновлювати хіти або отримувати тимчасові хіти."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "hit-points",
        "initiative",
        "resistance",
        "temporary-hit-points"
      ],
      "conditionSlugs": [
        "charmed",
        "frightened",
        "grappled",
        "paralyzed",
        "petrified",
        "prone",
        "restrained",
        "stunned"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "swarm-of-ravens",
    "nameUk": "Рій воронів",
    "nameOriginal": "Swarm of Ravens",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "11",
    "hitDice": "2к8 + 2",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "10 фт",
      "політ 50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
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
        "score": 5,
        "modifier": "−3",
        "save": "−3"
      },
      "wisdom": {
        "score": 12,
        "modifier": "+1",
        "save": "+1"
      },
      "charisma": {
        "score": 6,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 15,
    "languages": [],
    "challengeRating": "1/4",
    "experiencePoints": 50,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "swarm-of-ravens-beaks",
        "nameUk": "Дзьоби",
        "nameOriginal": "Beaks",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 5,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к6 + 2"
          },
          {
            "average": 2,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4",
            "qualifier": "якщо істота Закривавлена"
          }
        ],
        "reach": "5 фт",
        "damage": "5 (1к6 + 2)",
        "damageType": "колюча"
      },
      {
        "id": "swarm-of-ravens-cacophony",
        "nameUk": "Какофонія",
        "nameOriginal": "Cacophony",
        "target": "одна істота у просторі рою",
        "savingThrow": {
          "ability": "wisdom",
          "dc": 10,
          "onFailure": "Ціль отримує стан Оглухлий до початку наступного ходу рою."
        },
        "damageInstances": [],
        "recharge": {
          "kind": "roll",
          "die": 6,
          "minimum": 6
        },
        "sourceText": "Поки ціль Оглухла через цю дію, вона також має Перешкоду на перевірки характеристик і кидки атаки."
      }
    ],
    "sourcePage": 362,
    "subtype": "рій крихітних звірів",
    "skills": {
      "Сприйняття": "+5"
    },
    "resistances": [
      "дробильна шкода",
      "колюча шкода",
      "рубальна шкода"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Наляканий",
      "Схоплений",
      "Паралізований",
      "Скам'янілий",
      "Збитий з ніг",
      "Стримуваний",
      "Оглушений"
    ],
    "traits": [
      {
        "id": "swarm-of-ravens-swarm",
        "nameUk": "Рій",
        "nameOriginal": "Swarm",
        "sourceText": "Рій може займати простір іншої істоти й навпаки та проходити крізь будь-який отвір, достатній для Крихітної істоти цього рою. Рій не може відновлювати хіти або отримувати тимчасові хіти."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "difficulty-class",
        "disadvantage",
        "hit-points",
        "initiative",
        "resistance",
        "saving-throws",
        "temporary-hit-points"
      ],
      "conditionSlugs": [
        "charmed",
        "deafened",
        "frightened",
        "grappled",
        "paralyzed",
        "petrified",
        "prone",
        "restrained",
        "stunned"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "swarm-of-venomous-snakes",
    "nameUk": "Рій отруйних змій",
    "nameOriginal": "Swarm of Venomous Snakes",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "36",
    "hitDice": "8к8",
    "initiative": {
      "modifier": "+4",
      "score": 14
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
      },
      "dexterity": {
        "score": 18,
        "modifier": "+4",
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "2",
    "experiencePoints": 450,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "swarm-of-venomous-snakes-bites",
        "nameUk": "Укуси",
        "nameOriginal": "Bites",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 8,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к8 + 4"
          },
          {
            "average": 6,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 4"
          },
          {
            "average": 10,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "3к6"
          }
        ],
        "reach": "5 фт",
        "damage": "8 (1к8 + 4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 362,
    "subtype": "рій крихітних звірів",
    "senses": [
      "Сліпий зір 10 фт"
    ],
    "resistances": [
      "дробильна шкода",
      "колюча шкода",
      "рубальна шкода"
    ],
    "conditionImmunities": [
      "Зачарований",
      "Наляканий",
      "Схоплений",
      "Паралізований",
      "Скам'янілий",
      "Збитий з ніг",
      "Стримуваний",
      "Оглушений"
    ],
    "traits": [
      {
        "id": "swarm-of-venomous-snakes-swarm",
        "nameUk": "Рій",
        "nameOriginal": "Swarm",
        "sourceText": "Рій може займати простір іншої істоти й навпаки та проходити крізь будь-який отвір, достатній для Крихітної істоти цього рою. Рій не може відновлювати хіти або отримувати тимчасові хіти."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "hit-points",
        "initiative",
        "resistance",
        "temporary-hit-points"
      ],
      "conditionSlugs": [
        "charmed",
        "frightened",
        "grappled",
        "paralyzed",
        "petrified",
        "prone",
        "restrained",
        "stunned"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "tiger",
    "nameUk": "Тигр",
    "nameOriginal": "Tiger",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "30",
    "hitDice": "4к10 + 8",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "40 фт"
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
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "1",
    "experiencePoints": 200,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "tiger-rend",
        "nameUk": "Роздирання",
        "nameOriginal": "Rend",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 10,
            "damageType": "рубальна",
            "application": "on-hit",
            "formula": "2к6 + 3"
          }
        ],
        "reach": "5 фт",
        "damage": "10 (2к6 + 3)",
        "damageType": "рубальна",
        "sourceText": "Якщо ціль має Великий або менший розмір, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 363,
    "skills": {
      "Сприйняття": "+3",
      "Скритність": "+7"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "bonusActions": [
      {
        "id": "tiger-nimble-escape",
        "nameUk": "Спритна втеча",
        "nameOriginal": "Nimble Escape",
        "sourceText": "Істота виконує дію Відхід або Сховатися."
      }
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "bonus-action",
        "conditions",
        "damage-rolls",
        "disengage",
        "hide",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "triceratops",
    "nameUk": "Трицератопс",
    "nameOriginal": "Triceratops",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "14",
    "hitPoints": "114",
    "hitDice": "12к12 + 36",
    "initiative": {
      "modifier": "−1",
      "score": 9
    },
    "speed": [
      "50 фт"
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
        "score": 17,
        "modifier": "+3",
        "save": "+3"
      },
      "intelligence": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
      },
      "wisdom": {
        "score": 11,
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
    "challengeRating": "5",
    "experiencePoints": 1800,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "triceratops-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує дві атаки «Удар рогами»."
      },
      {
        "id": "triceratops-gore",
        "nameUk": "Удар рогами",
        "nameOriginal": "Gore",
        "attackType": "ближня",
        "attackBonus": "+9",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 19,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к12 + 6"
          },
          {
            "average": 9,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "2к8"
          }
        ],
        "reach": "5 фт",
        "damage": "19 (2к12 + 6)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Величезний або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує додатково 9 (2к8) колючої шкоди та стан Збитий з ніг."
      }
    ],
    "sourcePage": 363,
    "subtype": "динозавр",
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "tyrannosaurus-rex",
    "nameUk": "Тиранозавр рекс",
    "nameOriginal": "Tyrannosaurus Rex",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Величезний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "136",
    "hitDice": "13к12 + 52",
    "initiative": {
      "modifier": "+3",
      "score": 13
    },
    "speed": [
      "50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 25,
        "modifier": "+7",
        "save": "+10"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
      },
      "constitution": {
        "score": 19,
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
        "save": "+4"
      },
      "charisma": {
        "score": 9,
        "modifier": "−1",
        "save": "−1"
      }
    },
    "passivePerception": 14,
    "languages": [],
    "challengeRating": "8",
    "experiencePoints": 3900,
    "proficiencyBonus": "+3",
    "actions": [
      {
        "id": "tyrannosaurus-rex-multiattack",
        "nameUk": "Мультиатака",
        "nameOriginal": "Multiattack",
        "sourceText": "Істота виконує одну атаку «Укус» і одну атаку «Хвіст»."
      },
      {
        "id": "tyrannosaurus-rex-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 33,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "4к12 + 7"
          }
        ],
        "reach": "10 фт",
        "damage": "33 (4к12 + 7)",
        "damageType": "колюча",
        "sourceText": "Якщо ціль має Великий або менший розмір, вона отримує стан Схоплений (втеча СК 17). Поки ціль Схоплена, вона також має стан Стримуваний і не може бути ціллю атаки Хвостом."
      },
      {
        "id": "tyrannosaurus-rex-tail",
        "nameUk": "Хвіст",
        "nameOriginal": "Tail",
        "attackType": "ближня",
        "attackBonus": "+10",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 25,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "4к8 + 7"
          }
        ],
        "reach": "15 фт",
        "damage": "25 (4к8 + 7)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Величезний або менший розмір, ціль отримує стан Збитий з ніг."
      }
    ],
    "sourcePage": 363,
    "subtype": "динозавр",
    "skills": {
      "Сприйняття": "+4"
    },
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "grappled",
        "prone",
        "restrained"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "venomous-snake",
    "nameUk": "Отруйна змія",
    "nameOriginal": "Venomous Snake",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "12",
    "hitPoints": "5",
    "hitDice": "2к4",
    "initiative": {
      "modifier": "+2",
      "score": 12
    },
    "speed": [
      "30 фт",
      "плавання 30 фт"
    ],
    "abilities": {
      "strength": {
        "score": 2,
        "modifier": "−4",
        "save": "−4"
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
        "score": 1,
        "modifier": "−5",
        "save": "−5"
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
    "passivePerception": 10,
    "languages": [],
    "challengeRating": "1/8",
    "experiencePoints": 25,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "venomous-snake-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+4",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 4,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4 + 2"
          },
          {
            "average": 3,
            "damageType": "отруйна",
            "application": "on-hit",
            "formula": "1к6"
          }
        ],
        "reach": "5 фт",
        "damage": "4 (1к4 + 2)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 363,
    "senses": [
      "Сліпий зір 10 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "vulture",
    "nameUk": "Стерв'ятник",
    "nameOriginal": "Vulture",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Середній",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "10",
    "hitPoints": "5",
    "hitDice": "1к8 + 1",
    "initiative": {
      "modifier": "+0",
      "score": 10
    },
    "speed": [
      "10 фт",
      "політ 50 фт"
    ],
    "abilities": {
      "strength": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      },
      "dexterity": {
        "score": 10,
        "modifier": "+0",
        "save": "+0"
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
        "score": 4,
        "modifier": "−3",
        "save": "−3"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "vulture-beak",
        "nameUk": "Дзьоб",
        "nameOriginal": "Beak",
        "attackType": "ближня",
        "attackBonus": "+2",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 2,
            "damageType": "колюча",
            "application": "on-hit",
            "formula": "1к4"
          }
        ],
        "reach": "5 фт",
        "damage": "2 (1к4)",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 363,
    "skills": {
      "Сприйняття": "+3"
    },
    "traits": [
      {
        "id": "vulture-pack-tactics",
        "nameUk": "Зграйна тактика",
        "nameOriginal": "Pack Tactics",
        "sourceText": "Істота має Перевагу на кидок атаки проти істоти, якщо принаймні один її союзник перебуває в межах 5 футів від цілі й не має стану Недієздатний."
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
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "warhorse",
    "nameUk": "Бойовий кінь",
    "nameOriginal": "Warhorse",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Великий",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "11",
    "hitPoints": "19",
    "hitDice": "3к10 + 3",
    "initiative": {
      "modifier": "+1",
      "score": 11
    },
    "speed": [
      "60 фт"
    ],
    "abilities": {
      "strength": {
        "score": 18,
        "modifier": "+4",
        "save": "+4"
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
        "score": 12,
        "modifier": "+1",
        "save": "+3"
      },
      "charisma": {
        "score": 7,
        "modifier": "−2",
        "save": "−2"
      }
    },
    "passivePerception": 11,
    "languages": [],
    "challengeRating": "1/2",
    "experiencePoints": 100,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "warhorse-hooves",
        "nameUk": "Копита",
        "nameOriginal": "Hooves",
        "attackType": "ближня",
        "attackBonus": "+6",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 9,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к4 + 4"
          },
          {
            "average": 5,
            "damageType": "дробильна",
            "application": "on-hit",
            "formula": "2к4"
          }
        ],
        "reach": "5 фт",
        "damage": "9 (2к4 + 4)",
        "damageType": "дробильна",
        "sourceText": "Якщо ціль має Великий або менший розмір і нападник безпосередньо перед влучанням перемістився щонайменше на 20 футів по прямій до цілі, ціль отримує додатково 5 (2к4) дробильної шкоди та стан Збитий з ніг."
      }
    ],
    "sourcePage": 364,
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "conditions",
        "damage-rolls",
        "initiative"
      ],
      "conditionSlugs": [
        "prone"
      ]
    }
  },
  {
    "entity": "monster",
    "slug": "weasel",
    "nameUk": "Ласка",
    "nameOriginal": "Weasel",
    "status": "official",
    "source": SRD_52_SOURCE,
    "size": "Крихітний",
    "creatureType": "Звір",
    "alignment": "без світогляду",
    "armorClass": "13",
    "hitPoints": "1",
    "hitDice": "1к4 − 1",
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
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      },
      "dexterity": {
        "score": 16,
        "modifier": "+3",
        "save": "+3"
      },
      "constitution": {
        "score": 8,
        "modifier": "−1",
        "save": "−1"
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
        "score": 3,
        "modifier": "−4",
        "save": "−4"
      }
    },
    "passivePerception": 13,
    "languages": [],
    "challengeRating": "0",
    "experiencePoints": 10,
    "proficiencyBonus": "+2",
    "actions": [
      {
        "id": "weasel-bite",
        "nameUk": "Укус",
        "nameOriginal": "Bite",
        "attackType": "ближня",
        "attackBonus": "+5",
        "target": "одна ціль",
        "damageInstances": [
          {
            "average": 1,
            "damageType": "колюча",
            "application": "on-hit"
          }
        ],
        "reach": "5 фт",
        "damage": "1",
        "damageType": "колюча"
      }
    ],
    "sourcePage": 364,
    "skills": {
      "Акробатика": "+5",
      "Сприйняття": "+3",
      "Скритність": "+5"
    },
    "senses": [
      "Темний зір 60 фт"
    ],
    "relationships": {
      "ruleSlugs": [
        "attack-rolls",
        "damage-rolls",
        "initiative"
      ]
    }
  }
];
