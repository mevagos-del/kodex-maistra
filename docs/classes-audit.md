# Аудит довідника класів D&D 2024

Дата аудиту: 2026-10-14.

## Обсяг і джерела

- Runtime-набір: **12 базових класів** і **48 зареєстрованих підкласів**.
- Основне джерело даних: `src/data/rules/classes/`.
- Перевірка виконана проти поточної static-first моделі та відкритих таблиць D&D 2024 Basic Rules / SRD 5.2.x. PHB 2024 використовується там, де підклас не входить до SRD.
- TTG.club у публічних source labels не використовується.

Позначення статусу:

- **Повний**: progression 1–20, усі базові feature-тексти та всі чотири зареєстровані підкласи мають feature-тексти.
- **Частковий**: каркас і progression готові, але є placeholder-тексти або підкласи без features.

## Загальний результат

- Усі 12 класів мають рівно 20 progression rows з рівнями 1–20 без пропусків.
- Після першої технічної ітерації **усі 12 класів мають повні base feature-тексти**. Залишок placeholder-описів у базових класах: **0** (до ітерації: 94).
- Повними разом із зареєстрованими підкласами залишаються **4 класи**: Варвар, Бард, Друїд, Воїн. Решта 8 класів часткові лише через незавершені підкласи.
- Renderer повторюваних features виправлено: один canonical feature record повторно використовується на кожному потрібному рівні без копіювання тексту в static data.
- Progression Чорнокнижника містить усі 20 значень для інвокацій, комірок Магії пакту та рівня комірок.
- **17 підкласів повні**, **31 підклас неповний**.
- Серед неповних підкласів 21 має лише identity без features, ще 10 мають feature-каркас із placeholder-текстом.

## Стан за класами

| Клас | Progression | Base features | Підкласи | Spellcasting | Starting Equipment | Weapon Mastery | Статус |
|---|---:|---:|---:|---|---|---|---|
| Варвар | 20/20 | 19/19 | 4/4 повні | Немає | 2 варіанти | Є, текст повний | **Повний** |
| Бард | 20/20 | 12/12 | 4/4 повні | 20/20, cantrips + slots 1–9 | 2 варіанти | Немає | **Повний** |
| Жрець | 20/20 | 11/11 | 0/4 повних | 20/20, cantrips + slots 1–9 | 2 варіанти | Немає | Частковий: підкласи |
| Друїд | 20/20 | 13/13 | 4/4 повні | 20/20, cantrips + slots 1–9 | 2 варіанти | Немає | **Повний** |
| Воїн | 20/20 | 18/18 | 4/4 повні | Немає; Eldritch Knight у subclass data | 3 групи | Є, текст повний | **Повний** |
| Монах | 20/20 | 22/22 | 0/4 повних | Немає | 2 варіанти | Немає | Частковий: підкласи |
| Паладин | 20/20 | 17/17 | 0/4 повних | 20/20, slots 1–5 | 2 варіанти | Є, текст повний | Частковий: підкласи |
| Слідопит | 20/20 | 17/17 | 0/4 повних | 20/20, slots 1–5 | 2 варіанти | Є, текст повний | Частковий: підкласи |
| Пройдисвіт | 20/20 | 18/18 | 0/4 повних | Немає; Arcane Trickster у subclass data | 2 варіанти | Є, текст повний | Частковий: підкласи |
| Чаклун | 20/20 | 10/10 | 0/4 повних | 20/20, cantrips + slots 1–9 | 2 варіанти | Немає | Частковий: підкласи |
| Чорнокнижник | 20/20 | 12/12 | 0/4 повних | 20/20, Pact Magic + invocations | 2 варіанти | Немає | Частковий: підкласи |
| Чарівник | 20/20 | 10/10 | 1/4 повний | 20/20, cantrips + slots 1–9 | 2 варіанти | Немає | Частковий: 3 підкласи |

## Базові features після першої ітерації

- Закрито всі **94** попередні placeholder-записи для Монаха, Паладина, Слідопита, Пройдисвіта, Чаклуна та Чорнокнижника.
- Усі 12 базових класів тепер не мають `Опис не вказано у доступному джерелі.` у `sourceText`.
- Повторні появи «Збільшення характеристик», «Метамагії», «Експертизи» та інших features беруть canonical текст через renderer resolver, а не дублюють його в data.
- Scope підкласів у цій ітерації навмисно не змінювався.

## Неповні підкласи

| Батьківський клас | Неповні підкласи | Стан |
|---|---|---|
| Жрець | Life, Light, Trickery, War | Life: 5 placeholder features; решта без features |
| Монах | Open Hand, Mercy, Shadow, Elements | Open Hand: 4 placeholder features; решта без features |
| Паладин | Devotion, Ancients, Glory, Vengeance | Devotion: 5 placeholder features; решта без features |
| Слідопит | Hunter, Beast Master, Fey Wanderer, Gloom Stalker | Hunter: 5 placeholder features; решта без features |
| Пройдисвіт | Thief, Arcane Trickster, Assassin, Soulknife | Thief: 5 placeholder features; решта без features |
| Чаклун | Draconic, Aberrant, Clockwork, Wild Magic | Draconic: 5 placeholder features; решта без features |
| Чорнокнижник | Fiend, Archfey, Celestial, Great Old One | Fiend: 5 placeholder features; решта без features |
| Чарівник | Abjurer, Diviner, Illusionist | по 5 placeholder features; Evoker повний |

## Spellcasting

- Повні 20-рівневі full-caster таблиці з cantrips, prepared spells і slots 1–9 мають Бард, Жрець, Друїд, Чаклун і Чарівник.
- Паладин і Слідопит мають 20-рівневі half-caster таблиці зі slots 1–5.
- Чорнокнижник має повну 20-рівневу progression: `eldritch_invocations` зберігається як class resource, а `pact_slots` і `pact_slot_level` — як spellcasting values разом із cantrips та prepared spells. Значення звірені з D&D 2024 Basic Rules.
- Eldritch Knight та Arcane Trickster не мають окремої структурованої subclass spell progression. Це не dead reference, але detail-page не може показати їхню магічну прогресію як таблицю.
- Spell relationships валідні: **879** class-spell edges, усі class slugs існують.

## Starting Equipment і паспорт класу

- Усі 12 класів мають Hit Die, primary ability, дві saving throw proficiencies, weapon proficiencies, skill choice та щонайменше два варіанти Starting Equipment.
- Воїн має три equipment groups; інші класи — по два.
- Starting Equipment зберігається як готові текстові рядки, а не item slugs. UI відображає їх коректно, але автоматично перевірити кожен предмет проти Items dataset або створити внутрішні links зараз неможливо.
- Armor, weapon, tool та skill proficiencies структуровані й не містять `null`, `undefined` або `[object Object]`.

## Weapon Mastery

- Feature `Майстерність зброї` зареєстрований у правильних п’яти класах: Варвар, Воїн, Паладин, Слідопит і Пройдисвіт.
- Усі п’ять класів мають повний feature text. Для Паладина, Слідопита й Пройдисвіта текст явно обмежує Майстерність двома обраними видами зброї, якими персонаж володіє, з можливістю змінити вибір після тривалого відпочинку.
- Жоден опис не трактує feature як автоматичне володіння всіма mastery properties.
- Зв’язок із mastery properties предметів не структурований на рівні class schema; він існує через feature name та item-side mastery rules.

## Relationships

| Модуль | Стан | Кількість class edges |
|---|---|---:|
| Rules | Усі `relatedClassSlugs` валідні | 37 |
| Spells | Усі spell class slugs валідні | 879 |
| Feats | Усі `classSlugs` валідні | 72 |
| Items | Немає окремого class relationship field | 0 структурованих |
| Conditions | Немає окремого class relationship field | 0 структурованих |

Items і Conditions можуть згадувати механіки класу текстом, але це не машинно перевірюваний relationship. Dead class references у Rules, Spells і Feats не знайдені.

## Legacy / 2014 ризики

- Явних маркерів `2014`, `Legacy`, `Unearthed Arcana` або `playtest` у runtime class data не знайдено.
- Усі 48 підкласів обираються на 3 рівні, що відповідає 2024 class structure.
- Основний залишковий ризик не legacy collision, а незаповнені PHB 2024 subclass features: placeholder не дозволяє перевірити точну механіку й може приховувати застарілий текст при майбутньому ручному доповненні.
- Warlock progression після цієї ітерації повна й окремо зафіксована автоматичними тестами для рівнів 1–20.

## UI та responsive

- Detail-page не виводить raw objects; formatter приховує invalid values.
- «Паспорт класу» та «Старт класу» не дублюють одні й ті самі rows: паспорт містить Hit Die, primary ability, saves і spellcasting flag; старт — proficiencies, skills та equipment.
- Назви умінь закономірно повторюються між progression table та feature list: у таблиці це індекс/anchor, нижче — повний текст. Це корисна навігаційна дедуплікація, а не повтор повного опису.
- Renderer defect для повторюваних features виправлено. Новий resolver індексує canonical картки за назвою, матеріалізує їх на кожному рівні progression і підмінює лише рядок рівня. Fighter ASI більше не створює п’ять fallback-карток.
- Для порожнього підкласу selector працює, але progression залишає загальний рядок «Особливість підкласу», а повних subclass cards немає. Це головна видима ознака незавершеного контенту.
- Таблиця має `min-width: 560px` і внутрішній horizontal scroll. На mobile це не створює page overflow, але потребує горизонтального прокручування самої таблиці.
- Sidebar і navigation переходять в одну колонку на mobile; критичного responsive overflow не знайдено.

## Рекомендований порядок завершення

1. Завершити **31 неповний підклас**: спочатку 10 підкласів із feature-каркасом і placeholder-текстами, потім 21 identity-only підклас.
2. Додати структуровану spell progression для Eldritch Knight і Arcane Trickster.
3. Після subclass content pass повторно перевірити relationship edges до Rules, Spells, Feats, Items і Conditions.
4. Додати item-slug mapping для Starting Equipment лише там, де відповідні предмети вже існують у runtime Items dataset.
5. Повторити UI-аудит порожніх станів підкласів після заповнення даних; редизайн до цього не потрібен.
