import { SRD_52_SOURCE } from '../../source';
import type { OfficialItemEntry } from '../../types';

export const armorMagicItems: OfficialItemEntry[] = [
  {
    "entity": "item",
    "slug": "adamantine-armor",
    "nameUk": "Адамантиновий обладунок",
    "nameOriginal": "Adamantine Armor",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "adamantine-armor-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Цей обладунок посилено адамантином, однією з найтвердіших речовин, які існують. Поки ви його носите, будь-який критичне влучання по вас стає звичайним ударом."
      }
    ]
  },
  {
    "entity": "item",
    "slug": "armor",
    "nameUk": "Обладунок",
    "nameOriginal": "Armor",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "рідкісний (+1), Very рідкісний (+2) або легендарний (+3)",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "armor-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Носячи цю броню, ви отримуєте бонус до Класу захисту. Бонус визначається його рідкістю."
      }
    ],
    "variants": [
      {
        "id": "armor-1",
        "nameUk": "Броня +1",
        "sourceText": "Під час носіння цієї броні ви отримуєте бонус +1 до Класу захисту.",
        "scanLine": {
          "Рідкість": "рідкісний"
        }
      },
      {
        "id": "armor-2",
        "nameUk": "Броня +2",
        "sourceText": "Під час носіння цієї броні ви отримуєте бонус +2 до Класу захисту.",
        "scanLine": {
          "Рідкість": "дуже рідкісний"
        }
      },
      {
        "id": "armor-3",
        "nameUk": "Броня +3",
        "sourceText": "Під час носіння цієї броні ви отримуєте бонус +3 до Класу захисту.",
        "scanLine": {
          "Рідкість": "легендарний"
        }
      }
    ]
  },
  {
    "entity": "item",
    "slug": "armor-of-invulnerability",
    "nameUk": "Обладунок невразливості",
    "nameOriginal": "Armor of Invulnerability",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "легендарний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "armor-of-invulnerability-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Під час носіння цієї броні ви маєте стійкість до дробильної, колючої та рубаючої шкоди.\n\nМеталева оболонка. Ви можете застосувати магічну дію, щоб отримати імунітет до дробильної, колючої ​​та рубаючої шкоди на 10 хвилин або доти, поки на вас не буде знято броню. Після того, як ця властивість використана, вона не може бути використана знову до наступного світанку."
      }
    ],
    "usage": {
      "activation": "дія Магія",
      "duration": "10 хвилину"
    }
  },
  {
    "entity": "item",
    "slug": "armor-of-resistance",
    "nameUk": "Обладунок опору",
    "nameOriginal": "Armor of Resistance",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "armor-of-resistance-property",
        "nameUk": "Магічна властивість",
        "sourceText": "У вас є стійкість до одного типу шкоди, поки ви носите цю броню. Майстер обирає тип або визначає його випадковим чином, кидаючи за наступною таблицею.\n\n|1d10 |Тип пошкодження |\n\n|---|---|\n\n|1 |Кислота |\n\n|2 |Холодний |\n\n|3 |Пожежа |\n\n|4 |Сила |\n\n|5 |Блискавка |\n\n|6 |Некротичний |\n\n|7 |Отрута |\n\n|8 |Психічний |\n\n|9 |Сяйво |\n\n|10 |Грім |"
      }
    ]
  },
  {
    "entity": "item",
    "slug": "armor-of-vulnerability",
    "nameUk": "Обладунок вразливості",
    "nameOriginal": "Armor of Vulnerability",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "armor-of-vulnerability-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Під час носіння цієї броні ви маєте стійкість до одного з наступних типів ушкоджень: дробильної, колючою або рубаючою. Майстер обирає тип або визначає його випадковим чином.\n\nПрокляття. Цей обладунок проклятий, факт, який відкривається лише тоді, коли на броню накладено заклинання «Ідентифікація» або ви налаштовуєтесь на неї. Налаштування на броню проклинає вас, доки ви не станете мішенню заклинання «Усунути прокляття» або подібної магії; зняття броні не закінчує прокляття. Під час прокляття ви маєте вразливість до двох із трьох типів пошкоджень, пов’язаних із бронею (не до тієї, якій вона надає опір)."
      }
    ]
  },
  {
    "entity": "item",
    "slug": "demon-armor",
    "nameUk": "Демонічний обладунок",
    "nameOriginal": "Demon Armor",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "demon-armor-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Носячи цей обладунок, ви отримуєте бонус +1 до класу обладунків і знаєте Безоднева. Крім того, кігтисті рукавиці броні дозволяють вашим Беззбройним ударам завдавати 1d8 рубальної шкоди замість звичайної Дубинної шкоди, і ви отримуєте бонус +1 до кидків атаки та шкоди ваших Беззбройних ударів.\n\nПрокляття. Одягнувши цей проклятий обладунок, ви не зможете зняти його, якщо на вас не націлено заклинання «Усунення закляття» або подібна магія. Під час носіння броні ви маєте недолік у кидках атаки проти демонів і в рятувальних кидках проти їхніх чар і спеціальних здібностей."
      }
    ]
  },
  {
    "entity": "item",
    "slug": "dragon-scale-mail",
    "nameUk": "Лускатий обладунок дракона",
    "nameOriginal": "Dragon Scale Mail",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "dragon-scale-mail-property",
        "nameUk": "Магічна властивість",
        "sourceText": "*Кольчуга з луски дракона* виготовлена ​​з луски одного виду дракона. Іноді дракони збирають свою відкинуту луску і дарують її. Іншим разом мисливці дбайливо зберігають шкуру мертвого дракона. У будь-якому випадку *Луска Дракона* високо цінується.\n\nОдягнувши цей обладунок, ви отримуєте бонус +1 до Класу захисту, маєте перевагу в ряткидках проти дихальної зброї Драконів і маєте опір одному типу шкоди, який визначається типом дракона, який надав луску (див. супровідну таблицю).\n\nКрім того, ви можете зосередити свої чуття як магічну дію, щоб визначити відстань і напрямок до найближчого дракона в межах 30 миль від вас, який того самого типу, що й броня. Цю дію можна використовувати знову лише наступного світанку.\n\n|Дракон |Опір |\n\n|---|---|\n\n|Чорний |Кислота |\n\n|Синій |Блискавка |\n\n|Латунь |Пожежа |\n\n|Бронза |Блискавка |\n\n|Мідь |Кислота |\n\n|Золото |Пожежа |\n\n|Зелений |Отрута |\n\n|Червоний |Пожежа |\n\n|Срібло |Холодний |\n\n|Білий |Холодний |"
      }
    ],
    "usage": {
      "activation": "дія Магія",
      "range": "30 миль"
    }
  },
  {
    "entity": "item",
    "slug": "dwarven-plate",
    "nameUk": "Дворфійський латний обладунок",
    "nameOriginal": "Dwarven Plate",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "dwarven-plate-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Носячи цю броню, ви отримуєте бонус +2 до Класу захисту. Крім того, якщо ефект рухає вас по землі проти вашої волі, ви можете застосувати реакцію, щоб зменшити відстань, на яку вас переміщують, до 10 футів."
      }
    ],
    "usage": {
      "activation": "реакція"
    }
  },
  {
    "entity": "item",
    "slug": "elven-chain",
    "nameUk": "Ельфійська кольчуга",
    "nameOriginal": "Elven Chain",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "elven-chain-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Ви отримуєте бонус +1 до Класу захисту, поки носите цю броню. Вважається, що ви навчені цій броні, навіть якщо вам не вистачає середньої або важкої броні."
      }
    ]
  },
  {
    "entity": "item",
    "slug": "glamoured-studded-leather",
    "nameUk": "Зачарований шипований шкіряний обладунок",
    "nameOriginal": "Glamoured Studded Leather",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "glamoured-studded-leather-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Носячи цю броню, ви отримуєте бонус +1 до Класу захисту. Ви також можете виконати бонусну дію, щоб змусити броню виглядати як звичайний комплект одягу чи інший тип броні. Ви вирішуєте, як він виглядатиме, включно з кольором, стилем і аксесуарами, але броня зберігає свій нормальний об’єм і вагу. Ілюзорний вигляд зберігається, доки ви знову не скористаєтеся цією властивістю або не знімете броню."
      }
    ],
    "usage": {
      "activation": "бонусна дія"
    },
    "baseItemSlugs": [
      "studded-leather-armor"
    ]
  },
  {
    "entity": "item",
    "slug": "mithral-armor",
    "nameUk": "Міфралевий обладунок",
    "nameOriginal": "Mithral Armor",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "mithral-armor-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Мітрал — легкий, гнучкий метал. Броню з цієї речовини можна носити під звичайним одягом. Якщо броня зазвичай накладає недоліки на перевірки спритності (невидимості) або має вимогу до сили, мітральна версія броні цього не робить."
      }
    ]
  },
  {
    "entity": "item",
    "slug": "plate-armor-of-etherealness",
    "nameUk": "Латовий обладунок ефірності",
    "nameOriginal": "Plate Armor of Etherealness",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "магічні обладунки",
    "category": "Магічні предмети",
    "subcategory": "Магічні обладунки",
    "rarity": "легендарний",
    "magical": true,
    "attunement": true,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "plate-armor-of-etherealness-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Поки ви носите цю броню, ви можете виконати магічну дію та використати командне слово, щоб отримати ефект заклинання Ефірність. Заклинання припиняється негайно, якщо ви знімете броню або виконайте магічну дію, щоб повторити командне слово. Ця властивість броні не може бути використана знову до наступного світанку."
      }
    ],
    "usage": {
      "activation": "дія Магія"
    }
  }
];
