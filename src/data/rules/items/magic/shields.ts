import { SRD_52_SOURCE } from '../../source';
import type { OfficialItemEntry } from '../../types';

export const shieldsMagicItems: OfficialItemEntry[] = [
  {
    "entity": "item",
    "slug": "animated-shield",
    "nameUk": "Анімований щит",
    "nameOriginal": "Animated Shield",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "щити",
    "category": "Магічні предмети",
    "subcategory": "Щити",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "animated-shield-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Тримаючи цей щит, ви можете виконати додаткову дію, щоб змусити його анімувати. Щит підстрибує в повітря та ширяє у вашому просторі, щоб захистити вас, ніби ви ним користуєтеся, залишаючи ваші руки вільними. Щит залишається живим протягом 1 хвилини, доки ви не виконаєте додаткову дію, щоб припинити цей ефект, або поки ви не помрете чи не станете недієздатним, після чого щит падає на землю або вам у руку, якщо є вільний."
      }
    ],
    "usage": {
      "activation": "бонусна дія",
      "duration": "1 хвилину"
    },
    "relatedConditionSlugs": [
      "incapacitated"
    ],
    "baseItemSlugs": [
      "shield"
    ]
  },
  {
    "entity": "item",
    "slug": "arrow-catching-shield",
    "nameUk": "Стрілоловний щит",
    "nameOriginal": "Arrow-Catching Shield",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "щити",
    "category": "Магічні предмети",
    "subcategory": "Щити",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "arrow-catching-shield-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Ви отримуєте бонус +2 до Класу захисту проти кидків дальньої атаки, поки тримаєте цей щит. Цей бонус є доповненням до звичайного бонусу Щита до КЗ.\n\nЩоразу, коли зловмисник робить кидок дальньої атаки проти цілі в межах 5 футів від вас, ви можете прийняти Реакцію, щоб стати ціллю атаки."
      }
    ],
    "usage": {
      "activation": "реакція",
      "range": "5 футів"
    },
    "baseItemSlugs": [
      "shield"
    ]
  },
  {
    "entity": "item",
    "slug": "shield",
    "nameUk": "Щит",
    "nameOriginal": "Shield",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "щити",
    "category": "Магічні предмети",
    "subcategory": "Щити",
    "rarity": "незвичайний (+1), рідкісний (+2) або Very рідкісний (+3)",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "shield-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Тримаючи цей щит, ви отримуєте бонус до Класу захисту, який визначається рідкістю щита, на додаток до звичайного бонусу щита до КЗ."
      }
    ],
    "variants": [
      {
        "id": "shield-1",
        "nameUk": "Щит +1",
        "sourceText": "Тримаючи цей щит, ви отримуєте бонус +1 до Класу захисту на додаток до звичайного бонусу щита до КЗ.",
        "scanLine": {
          "Рідкість": "незвичайний"
        }
      },
      {
        "id": "shield-2",
        "nameUk": "Щит +2",
        "sourceText": "Тримаючи цей щит, ви отримуєте бонус +2 до Класу захисту на додаток до звичайного бонусу щита до КЗ.",
        "scanLine": {
          "Рідкість": "рідкісний"
        }
      },
      {
        "id": "shield-3",
        "nameUk": "Щит +3",
        "sourceText": "Тримаючи цей щит, ви отримуєте бонус +3 до Класу захисту на додаток до звичайного бонусу щита до КЗ.",
        "scanLine": {
          "Рідкість": "дуже рідкісний"
        }
      }
    ],
    "baseItemSlugs": [
      "shield"
    ]
  },
  {
    "entity": "item",
    "slug": "shield-of-missile-attraction",
    "nameUk": "Щит ракетного притягання",
    "nameOriginal": "Shield of Missile Attraction",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "щити",
    "category": "Магічні предмети",
    "subcategory": "Щити",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "shield-of-missile-attraction-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Тримаючи цей щит, ви маєте опір шкоді від атак зброєю дальнього бою.\n\nПрокляття. Цей щит проклятий. Налаштування на нього проклинає вас, доки ви не станете мішенню заклинання «Усунення прокляття» або подібної магії. Зняття щита не закінчує прокляття на вас. Щоразу, коли атака зі зброєю дальнього бою спрямована на істоту в межах 10 футів від вас, прокляття змушує вас ставати ціллю."
      }
    ],
    "usage": {
      "range": "10 футів"
    },
    "baseItemSlugs": [
      "shield"
    ]
  },
  {
    "entity": "item",
    "slug": "spellguard-shield",
    "nameUk": "Щит заклинань",
    "nameOriginal": "Spellguard Shield",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "щити",
    "category": "Магічні предмети",
    "subcategory": "Щити",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "spellguard-shield-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Тримаючи цей щит, ви маєте перевагу в ряткидках проти заклинань та інших магічних ефектів, а кидки на атаку заклинаннями мають недолік проти вас."
      }
    ],
    "baseItemSlugs": [
      "shield"
    ]
  }
];
