# Аудит довідника класів D&D 2024

Дата оновлення: 2026-10-14.

## Підсумок

- Runtime містить **12 базових класів** і **48 підкласів**, по 4 підкласи на кожен клас.
- Усі 12 класів мають повну progression 1–20 і повні базові feature-тексти.
- Після subclass-ітерації **48/48 підкласів повні**: identity-only записів, порожніх feature arrays і placeholder-текстів немає.
- Усі підкласи обираються на 3 рівні та мають лише feature levels у межах 3–20.
- Eldritch Knight і Arcane Trickster мають окрему structured spell progression рівнів 3–20.
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
