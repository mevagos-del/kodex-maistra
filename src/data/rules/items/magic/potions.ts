import { SRD_52_SOURCE } from '../../source';
import type { OfficialItemEntry } from '../../types';

export const potionsMagicItems: OfficialItemEntry[] = [
  {
    "entity": "item",
    "slug": "oil-of-etherealness",
    "nameUk": "Олія ефірності",
    "nameOriginal": "Oil of Etherealness",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "oil-of-etherealness-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Один флакон цієї олії може покрити одну середню або меншу істоту разом із обладнанням, яке воно носить і несе (один додатковий флакон потрібен для кожної категорії розміру вище середнього). Нанесення масла займає 10 хвилин. Потім уражена істота отримує ефект заклинання Ефірність на 1 годину.\n\nНамистинки цієї каламутної сірої олії утворюються на зовнішній стороні контейнера та швидко випаровуються."
      }
    ],
    "usage": {
      "duration": "1 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "oil-of-sharpness",
    "nameUk": "Масло гостроти",
    "nameOriginal": "Oil of Sharpness",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "oil-of-sharpness-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Один флакон цієї олії може покрити одну зброю ближнього бою або двадцять одиниць боєприпасів, але впливають лише на боєприпаси та зброю ближнього бою, які не є магічними та завдають рубальної або колючої шкоди. Нанесення олії займає 1 хвилину, після чого олія чарівним чином просочується у все, що покриває, перетворюючи покриту зброю на +3 зброї або покриті боєприпаси на +3 боєприпаси.\n\nЦе прозоре желеподібне масло виблискує крихітними ультратонкими сріблястими осколками."
      }
    ],
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "oil-of-slipperiness",
    "nameUk": "Олія слизькості",
    "nameOriginal": "Oil of Slipperiness",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "oil-of-slipperiness-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Один флакон цієї олії може покрити одну середню або меншу істоту разом із обладнанням, яке воно носить і несе (один додатковий флакон потрібен для кожної категорії розміру вище середнього). Нанесення масла займає 10 хвилин. Потім уражена істота отримує ефект заклинання «Свобода пересування» на 8 годин.\n\nКрім того, олію можна вилити на землю як магічну дію, де вона покриває 10-футовий квадрат, дублюючи ефект заклинання «Мастило» в цій області протягом 8 годин. Ця липка чорна мазь густа й важка, але швидко тече, коли її вилити."
      }
    ],
    "usage": {
      "activation": "дія Магія",
      "duration": "8 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "philter-of-love",
    "nameUk": "Любовний напій",
    "nameOriginal": "Philter of Love",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "philter-of-love-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Наступного разу, коли ви побачите істоту протягом 10 хвилин після того, як випили цей фільтр, ви зачаровані цією істотою та перебуваєте в стані Чарів протягом 1 години.\n\nЦя шипуча рідина рожевого відтінку містить одну бульбашку, яку легко помітити, у формі серця."
      }
    ],
    "usage": {
      "duration": "1 годину"
    },
    "consumable": true,
    "relatedConditionSlugs": [
      "charmed"
    ]
  },
  {
    "entity": "item",
    "slug": "potion-of-animal-friendship",
    "nameUk": "Зілля Дружби Звірів",
    "nameOriginal": "Potion of Animal Friendship",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-animal-friendship-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви можете застосувати версію заклинання «Дружба тварин» рівня 3 (СК ряткидка закляття 13). Перемішуючи каламутну рідину цього зілля, можна побачити маленькі шматочки: риб’ячу луску, перо колібрі, кіготь кота або біличу шерсть."
      }
    ],
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-clairvoyance",
    "nameUk": "Зілля ясновидіння",
    "nameOriginal": "Potion of Clairvoyance",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-clairvoyance-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Випивши це зілля, ви отримуєте ефект заклинання Ясновидіння (концентрація не потрібна).\n\nОчне яблуко бовтається в жовтуватій рідині цього зілля, але зникає, коли зілля відкривається."
      }
    ],
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-climbing",
    "nameUk": "Зілля скелелазіння",
    "nameOriginal": "Potion of Climbing",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "звичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-climbing-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви отримуєте швидкість підйому, що дорівнює вашій швидкості на 1 годину. Протягом цього часу у вас є перевірки Переваги в силі (легка атлетика) для сходження.\n\nЦе зілля розділене на коричневий, сріблястий і сірий шари, що нагадують смуги каменю. Струшування пляшки не змішує кольори."
      }
    ],
    "usage": {
      "duration": "1 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-diminution",
    "nameUk": "Зілля зменшення",
    "nameOriginal": "Potion of Diminution",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-diminution-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви отримуєте ефект «зменшення» заклинання «Збільшення/Зменшення» на 1d4 години (концентрація не потрібна).\n\nЧервоне в рідині зілля постійно стискається до крихітної кульки, а потім розширюється, забарвлюючи прозору рідину навколо неї. Струсіння пляшки не перериває цей процес."
      }
    ],
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-flying",
    "nameUk": "Зілля польоту",
    "nameOriginal": "Potion of Flying",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-flying-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви отримуєте швидкість польоту, що дорівнює вашій швидкості на 1 годину, і можете зависати. Якщо ви перебуваєте в повітрі, коли зілля закінчується, ви падаєте, якщо у вас немає інших засобів утриматися. Прозора рідина цього зілля плаває на вершині"
      }
    ],
    "usage": {
      "duration": "1 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-gaseous-form",
    "nameUk": "Зілля газоподібної форми",
    "nameOriginal": "Potion of Gaseous Form",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-gaseous-form-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Зілля зцілення (вище)"
      }
    ],
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-giant-strength",
    "nameUk": "Зілля сили велетня",
    "nameOriginal": "Potion of Giant Strength",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "різна",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-giant-strength-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ваш показник сили змінюється на 1 годину. Тип гіганта визначає оцінку (див. таблицю нижче). Зілля не впливає на вас, якщо ваша сила дорівнює або перевищує цей бал.\n\nУ прозорій рідині цього зілля плаває смужка світла, схожа на ніготь велетня.\n\n|Зілля |вул. |Рідкість |\n\n|---|---|---|\n\n|Зілля велетенської сили (пагорб) |21 |Нечасто |\n\n|Зілля величезної сили (мороз або камінь) |23 |Рідкісний |\n\n|Зілля велетенської сили (вогонь) |25 |Рідкісний |\n\n|Зілля гігантської сили (хмара) |27 |Дуже рідко |\n\n|Зілля велетенської сили (гроза) |29 |Легендарний |"
      }
    ],
    "usage": {
      "duration": "1 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-growth",
    "nameUk": "Зілля росту",
    "nameOriginal": "Potion of Growth",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-growth-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви отримуєте ефект «збільшення» заклинання «Збільшення/Зменшення» на 10 хвилин (концентрація не потрібна).\n\nЧервоне в рідині зілля постійно розширюється від крихітної кульки, забарвлюючи прозору рідину навколо неї, а потім стискається. Струсіння пляшки не перериває цей процес."
      }
    ],
    "usage": {
      "duration": "10 хвилину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-heroism",
    "nameUk": "Зілля героїзму",
    "nameOriginal": "Potion of Heroism",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-heroism-property",
        "nameUk": "Магічна властивість",
        "sourceText": "10d4 + 20 Дуже рідко. Коли ви випиваєте це зілля, ви отримуєте ефект заклинання «Газоподібна форма» на 1 годину (концентрація не потрібна) або доки ви не завершите ефект як бонусну дію.\n\nЗдається, у цьому контейнері зілля міститься туман, який рухається й ллється, як вода."
      }
    ],
    "usage": {
      "activation": "бонусна дія",
      "duration": "1 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-invisibility",
    "nameUk": "Зілля невидимості",
    "nameOriginal": "Potion of Invisibility",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-invisibility-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Контейнер з цим зіллям виглядає порожнім, але створюється відчуття, ніби він містить рідину. Коли ви випиваєте зілля, у вас є стан Невидимки на 1 годину. Ефект закінчується раніше, якщо ви робите кидок на атаку, завдаєте шкоди або використовуєте заклинання."
      }
    ],
    "usage": {
      "duration": "1 годину"
    },
    "consumable": true,
    "relatedConditionSlugs": [
      "invisible"
    ]
  },
  {
    "entity": "item",
    "slug": "potion-of-mind-reading",
    "nameUk": "Зілля читання думок",
    "nameOriginal": "Potion of Mind Reading",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-mind-reading-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви отримуєте ефект заклинання «Виявлення думок» (економія СК 13) на 10 хвилин (концентрація не потрібна). У щільній фіолетовій рідині цього зілля плаває яйцеподібна хмара рожевого кольору."
      }
    ],
    "usage": {
      "duration": "10 хвилину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-poison",
    "nameUk": "Зілля отрути",
    "nameOriginal": "Potion of Poison",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-poison-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Ця суміш виглядає, пахне та смакує як зілля зцілення або інше корисне зілля. Однак насправді це отрута, замаскована магією ілюзії. Ідентифікація розкриває його справжню природу.\n\nЯкщо ви вип’єте це зілля, ви отримаєте шкоди від отрути 4d6 і маєте успішно виконати ряткидок СК 13 «Татутура» або перебувати в стані отруєння протягом 1 години."
      }
    ],
    "usage": {
      "duration": "1 годину",
      "saveDc": "13 (Статура)"
    },
    "consumable": true,
    "relatedConditionSlugs": [
      "poisoned"
    ]
  },
  {
    "entity": "item",
    "slug": "potion-of-resistance",
    "nameUk": "Зілля опору",
    "nameOriginal": "Potion of Resistance",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-resistance-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви отримуєте стійкість до одного виду шкоди протягом 1 години. Майстер обирає тип або визначає його випадковим чином, кидаючи за наступною таблицею.\n\n|1d10 |Тип пошкодження |\n\n|---|---|\n\n|1 |Кислота |\n\n|2 |Холодний |\n\n|3 |Пожежа |\n\n|4 |Сила |\n\n|5 |Блискавка |\n\n|6 |Некротичний |\n\n|7 |Отрута |\n\n|8 |Психічний |\n\n|9 |Сяйво |\n\n|10 |Грім |"
      }
    ],
    "usage": {
      "duration": "1 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-speed",
    "nameUk": "Зілля швидкості",
    "nameOriginal": "Potion of Speed",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "дуже рідкісний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-speed-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви випиваєте це зілля, ви отримуєте ефект заклинання «Прискорення» на 1 хвилину (концентрація не потрібна), не відчуваючи хвилі летаргії, яка зазвичай виникає після закінчення ефекту. Жовта рідина цього зілля вкрита чорними смугами та крутиться сама по собі."
      }
    ],
    "usage": {
      "duration": "1 хвилину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potion-of-water-breathing",
    "nameUk": "Зілля водяного дихання",
    "nameOriginal": "Potion of Water Breathing",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "незвичайний",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potion-of-water-breathing-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Дихати під водою можна протягом 24 годин після вживання цього зілля.\n\nЦя каламутна зелена рідина пахне морем, а в ній плаває бульбашка, схожа на медузу."
      }
    ],
    "usage": {
      "duration": "24 годину"
    },
    "consumable": true
  },
  {
    "entity": "item",
    "slug": "potions-of-healing",
    "nameUk": "Зілля зцілення",
    "nameOriginal": "Potions of Healing",
    "status": "official",
    "source": SRD_52_SOURCE,
    "itemType": "зілля",
    "category": "Магічні предмети",
    "subcategory": "Зілля",
    "rarity": "різна",
    "magical": true,
    "attunement": false,
    "weight": "",
    "cost": "",
    "properties": [
      {
        "id": "potions-of-healing-property",
        "nameUk": "Магічна властивість",
        "sourceText": "Коли ви вип'єте це зілля, ви знову отримуєте очки життя. Кількість хітів залежить від рідкості зілля, як показано в таблиці нижче.\n\nЯкою б не була його сила, червона рідина зілля мерехтить, коли її перемішують.\n\n|Зілля |хіти відновлено |Рідкість |\n\n|---|---|---|\n\n|Зілля зцілення |2d4 + 2 |Загальні |\n\n|Зілля зцілення (велике) |4d4 + 4 |Нечасто |\n\n|Зілля зцілення (вище) |8d4 + 8 |Рідкісний |\n\n|Зілля зцілення (вище) |10d4 + 20 |Дуже рідко |"
      }
    ],
    "consumable": true
  }
];
