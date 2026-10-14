# Аудит довідника класів D&D 2024

Дата оновлення: 2026-10-14.

## Підсумок

- Runtime містить **12 базових класів** і **48 підкласів**, по 4 підкласи на кожен клас.
- Усі 12 класів мають повну progression 1–20 і повні базові feature-тексти.
- Після subclass-ітерації **48/48 підкласів повні**: identity-only записів, порожніх feature arrays і placeholder-текстів немає.
- Усі підкласи обираються на 3 рівні та мають лише feature levels у межах 3–20.
- Eldritch Knight і Arcane Trickster мають окрему structured spell progression рівнів 3–20.
- Starting Equipment усіх 12 класів має перевірені зв'язки з Items: **66 клікабельних розміщень**, що утворюють **65 унікальних class-to-item relationships**.
- TTG.club не відображається у публічних source labels. Runtime використовує короткі позначки SRD 5.2.x або Player's Handbook 2024 відповідно до запису.

## Завершені в цій ітерації підкласи

Завершено **31** підклас, які до ітерації були identity-only або містили placeholder feature cards:

- **Жрець:** Домен життя, Домен світла, Домен обману, Домен війни.
- **Монах:** Воїн відкритої долоні, Воїн милосердя, Воїн тіні, Воїн стихій.
- **Паладин:** Клятва відданості, Клятва предків, Клятва слави, Клятва помсти.
- **Слідопит:** Мисливець, Повелитель звірів, Мандрівник Фейвайлду, Мисливець сутінків.
- **Пройдисвіт:** Злодій, Містичний хитрун, Убивця, Клинок душі.
- **Чаклун:** Драконяче чаклунство, Аберантне чаклунство, Механічне чаклунство, Чаклунство дикої магії.
- **Чорнокнижник:** Покровитель: Демон, Покровитель: Архіфея, Покровитель: Небожитель, Покровитель: Великий Древній.
- **Чарівник:** Аб'юратор, Віщун, Ілюзіоніст.

До ітерації 21 із цих записів були identity-only, а 10 мали feature names без повного `sourceText`. Тепер кожен запис містить українську й оригінальну назви, slug, parent class, source, рівень вибору, feature levels і повні користувацькі описи механік.

## Стан за класами

| Клас | Progression | Base features | Підкласи | Статус |
|---|---:|---:|---:|---|
| Варвар | 20/20 | повні | 4/4 | Повний |
| Бард | 20/20 | повні | 4/4 | Повний |
| Жрець | 20/20 | повні | 4/4 | Повний |
| Друїд | 20/20 | повні | 4/4 | Повний |
| Воїн | 20/20 | повні | 4/4 | Повний |
| Монах | 20/20 | повні | 4/4 | Повний |
| Паладин | 20/20 | повні | 4/4 | Повний |
| Слідопит | 20/20 | повні | 4/4 | Повний |
| Пройдисвіт | 20/20 | повні | 4/4 | Повний |
| Чаклун | 20/20 | повні | 4/4 | Повний |
| Чорнокнижник | 20/20 | повні | 4/4 | Повний |
| Чарівник | 20/20 | повні | 4/4 | Повний |

## Spellcasting-підкласи

### Eldritch Knight

- Заклинальна характеристика: **Інтелект**.
- Список заклять: **Wizard** без застарілого обмеження школами з версії 2014.
- Structured progression охоплює рівні Воїна 3–20.
- Замовляння: 2 на рівнях 3–9, 3 на рівнях 10–20.
- Підготовлені закляття: від 3 на рівні 3 до 13 на рівні 20.
- Комірки: від 2 комірок 1 рівня на рівні 3 до матриці 4/3/3/1 на рівні 20.

### Arcane Trickster

- Заклинальна характеристика: **Інтелект**.
- Список заклять: **Wizard** без застарілого обмеження школами з версії 2014.
- Structured progression охоплює рівні Пройдисвіта 3–20.
- Замовляння: 3 на рівнях 3–9, 4 на рівнях 10–20.
- Підготовлені закляття: від 3 на рівні 3 до 13 на рівні 20.
- Комірки: та сама third-caster матриця 3–20, до 4/3/3/1 на рівні 20.

Spell descriptions не дублюються в subclass data. Зберігаються лише правила subclass spellcasting, progression і валідні relationships до наявних spell slugs.

## Relationships

- Для нових підкласів relationships зберігаються окремо від тексту рис і серіалізуються в runtime detail data.
- Перевіряються `Rules`, `Spells`, `Feats`, `Items` і `Conditions`; кожен вказаний slug мусить існувати у відповідному runtime dataset.
- Посилання на закляття, яких ще немає в runtime, не створюються. Назва закляття може залишатися частиною точної механіки риси без мертвого внутрішнього link.
- Weapon Mastery relationship підтримується схемою, але додається лише коли підклас прямо змінює mastery mechanics; тематичні зв'язки не створюються.
- Generic rule text не копіюється до subclass relationship data: feature містить лише власну механіку, а посилання веде до відповідного правила.
- Після дедуплікації runtime містить **167** subclass-to-Rule, **22** subclass-to-Spell і **23** subclass-to-Condition edges. Feat та Item edges не додавалися без прямої механічної підстави.

## Фінальний технічний pass

### Starting Equipment → Items

- Для всіх 12 класів додано `itemLinks` лише там, де назва однозначно відповідає наявному item slug.
- Runtime repository передає посилання всередині відповідної equipment group та окремо формує deduplicated `relationships.item_slugs`.
- Перевірено **66** видимих link placements і **65** унікальних class-to-item edges. Різниця спричинена набором дослідника підземель, який входить до двох альтернатив спорядження Воїна.
- Назви `Клепаний шкіряний обладунок` / `Клепана шкіряна броня` нормалізовано до наявної української identity `Шипований шкіряний обладунок`; `скімітари` — до `ятаган`; `магічний фокус` — до `арканний фокус`; `набір науковця` — до `набір ученого`.
- Навмисно не пов'язані: грошові альтернативи; `20 стріл` (dataset містить лише загальну категорію боєприпасів); `обраний інструмент` Монаха; `книга окультних знань` Чорнокнижника; `книга заклять` Чарівника. Для них немає точного item slug або запис є категорією/вибором.
- UI показує тільки назву спорядження як посилання. Шкода, КЗ, вага, ціна, рідкість та інші механіки предметів не дублюються на сторінці класу.

### Passport і дедуплікація

- Passport містить Кістку хітів, Основну характеристику, Ряткидки та позначку Заклинань лише для spellcasting classes.
- Некастери більше не отримують малоінформативний блок `Заклинання — Ні`; source metadata не показується великою карткою.
- Progression table лишається коротким покажчиком рівнів, feature names і structured progression values; повний rule text відображається тільки в feature section.
- Repeated features продовжують використовувати canonical resolver, тому повтори ASI та інших рис не створюють fallback descriptions.

### Subclass та runtime UI

- Перевірено 48 підкласів: selector/modal, `?subclass=`, parent classes, feature levels, повні feature texts і relationships валідні.
- Identity-only, placeholder, fallback та empty subclass sections відсутні.
- `Старт класу` зберігає наявну композицію: володіння, вибір навичок і варіанти спорядження; додані лише доступні inline links з видимим keyboard focus.
- Progression table використовує власний горизонтальний scroll container на вузьких екранах; нові links не змінюють ширину layout і не створюють page-level overflow.
- Автоматичний аудит не знаходить `null`, `undefined`, `[object Object]`, dead relationships або 2014/playtest markers у runtime class data.

### Фінальний стан relationships

- Base reverse relationships: **37** Rule-to-Class, **879** Spell-to-Class, **72** Feat-to-Class і **65** унікальних Class-to-Item edges.
- Subclass relationships: **167** до Rules, **22** до Spells і **23** до Conditions.
- Weapon Mastery зареєстровано рівно для Варвара, Воїна, Паладина, Слідопита та Пройдисвіта; це не трактується як автоматичне володіння всіма mastery properties.
- Feat/Item/Condition edges не створюються за тематичною схожістю: лише точні механічні зв'язки.

### Висновок

Classes можна вважати завершеним reference module у поточному scope: 12/12 progression, 48/48 підкласів, 0 placeholder features, валідні spellcasting progressions і перевірені exact-item links. Відомі обмеження стосуються лише назв спорядження без окремої identity у Items dataset та майбутнього окремого UI для subclass spell progression; вони не створюють мертвих посилань або втрати правил.

## Renderer і UI

- Існуючий canonical feature resolver використовується без дублювання однакового rule text на різних рівнях.
- Repository передає `spellcasting` і `relationships` разом із subclass identity та features.
- Class header, selector, modal, `?subclass=`, progression table, feature blocks і sticky navigation не змінювалися.
- Усі subclass features відображаються на наявних feature cards; fallback/placeholder cards більше не потрібні.
- Structured objects не перетворюються на видимі `null`, `undefined` або `[object Object]`.
- Нової CSS-розмітки або mobile overflow ця ітерація не додає.

## Legacy / 2014 перевірка

- Runtime data не містить маркерів `2014`, `Legacy`, `Unearthed Arcana` або `playtest`.
- Усі 48 підкласів використовують D&D 2024 level structure.
- Eldritch Knight і Arcane Trickster використовують 2024 spell preparation model та відкритий Wizard spell list, а не старі school constraints.
- Source labels не маскують PHB entries як SRD/CC-BY записи.

## Автоматична перевірка

`scripts/classes.test.mjs` перевіряє:

- 12 класів, 48 підкласів і рівно 4 підкласи на клас;
- унікальні subclass ID, slugs та English identities;
- валідні parent class і feature levels;
- відсутність identity-only, empty та placeholder subclass entries;
- повну third-caster progression Eldritch Knight і Arcane Trickster;
- відсутність dead Rules/Spells/Feats/Items/Conditions relationships;
- відсутність явних 2014/playtest/raw-object leaks;
- незмінну цілісність base progression, Warlock Pact Magic і canonical repeated-feature resolver.

## Залишкові питання

- Неповних підкласів після цієї ітерації немає.
- Item та Feat relationships не додаються без прямої механічної підстави; це свідомо не вважається прогалиною.
- Окремий UI для subclass spell progression може бути доданий майбутньою UX-ітерацією. Дані вже структуровані, але поточний дизайн Classes у цьому завданні не змінювався.
