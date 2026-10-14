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
- **4 класи повні на рівні static data**: Варвар, Бард, Друїд, Воїн. Водночас detail renderer помилково створює fallback-картки для повторних появ того самого feature на вищих рівнях, тому user-facing сторінки ще потребують окремого точкового виправлення.
- **8 класів часткові**: Жрець, Монах, Паладин, Слідопит, Пройдисвіт, Чаклун, Чорнокнижник, Чарівник.
- У базових класах залишилося **94** feature-записи з текстом `Опис не вказано у доступному джерелі.`
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
| Монах | 20/20 | 0/22 повних | 0/4 повних | Немає | 2 варіанти | Немає | Частковий: base + підкласи |
| Паладин | 20/20 | 0/17 повних | 0/4 повних | 20/20, slots 1–5 | 2 варіанти | Є, текст відсутній | Частковий: base + підкласи |
| Слідопит | 20/20 | 1/17 повних | 0/4 повних | 20/20, slots 1–5 | 2 варіанти | Є, текст відсутній | Частковий: base + підкласи |
| Пройдисвіт | 20/20 | 1/18 повних | 0/4 повних | Немає; Arcane Trickster у subclass data | 2 варіанти | Є, текст відсутній | Частковий: base + підкласи |
| Чаклун | 20/20 | 0/10 повних | 0/4 повних | 20/20, cantrips + slots 1–9 | 2 варіанти | Немає | Частковий: base + підкласи |
| Чорнокнижник | 20/20 | 0/12 повних | 0/4 повних | 20/20, але лише cantrips/prepared spells | 2 варіанти | Немає | Частковий: base + spell table + підкласи |
| Чарівник | 20/20 | 10/10 | 1/4 повний | 20/20, cantrips + slots 1–9 | 2 варіанти | Немає | Частковий: 3 підкласи |

## Неповні базові features

- **Монах:** 22 placeholder-описи.
- **Паладин:** 17 placeholder-описів.
- **Слідопит:** 16 placeholder-описів; заповнена лише «Експертиза».
- **Пройдисвіт:** 17 placeholder-описів; заповнена лише «Експертиза».
- **Чаклун:** 10 placeholder-описів.
- **Чорнокнижник:** 12 placeholder-описів.
- Варвар, Бард, Жрець, Друїд, Воїн і Чарівник не мають пропусків у base feature sourceText.

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
- **Чорнокнижник неповний структурно:** progression містить cantrips і prepared spells, але не містить колонок `eldritch_invocations`, `pact_slots` та `pact_slot_level`, хоча renderer уже підтримує ці ключі. Офіційна 2024 table вимагає всі три показники.
- Eldritch Knight та Arcane Trickster не мають окремої структурованої subclass spell progression. Це не dead reference, але detail-page не може показати їхню магічну прогресію як таблицю.
- Spell relationships валідні: **879** class-spell edges, усі class slugs існують.

## Starting Equipment і паспорт класу

- Усі 12 класів мають Hit Die, primary ability, дві saving throw proficiencies, weapon proficiencies, skill choice та щонайменше два варіанти Starting Equipment.
- Воїн має три equipment groups; інші класи — по два.
- Starting Equipment зберігається як готові текстові рядки, а не item slugs. UI відображає їх коректно, але автоматично перевірити кожен предмет проти Items dataset або створити внутрішні links зараз неможливо.
- Armor, weapon, tool та skill proficiencies структуровані й не містять `null`, `undefined` або `[object Object]`.

## Weapon Mastery

- Feature `Майстерність зброї` зареєстрований у правильних п’яти класах: Варвар, Воїн, Паладин, Слідопит і Пройдисвіт.
- Варвар і Воїн мають повний feature text та resource columns у progression.
- Паладин, Слідопит і Пройдисвіт мають feature у progression, але його sourceText поки placeholder.
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
- Основний ризик не legacy collision, а незаповнені PHB 2024 features: placeholder не дозволяє перевірити точну механіку й може приховувати застарілий текст при майбутньому ручному доповненні.
- Warlock progression потрібно звірити першочергово: відсутні Pact Magic slots/slot level та кількість інвокацій, а не лише опис feature.

## UI та responsive

- Detail-page не виводить raw objects; formatter приховує invalid values.
- «Паспорт класу» та «Старт класу» не дублюють одні й ті самі rows: паспорт містить Hit Die, primary ability, saves і spellcasting flag; старт — proficiencies, skills та equipment.
- Назви умінь закономірно повторюються між progression table та feature list: у таблиці це індекс/anchor, нижче — повний текст. Це корисна навігаційна дедуплікація, а не повтор повного опису.
- Знайдено renderer defect для повторюваних features. `featuresFromProgression` зберігає один canonical feature record, але `progressionFeatureCards` шукає його за парою `назва + рівень`; тому наступні «Збільшення характеристик» та подібні повтори отримують fallback `Точний опис уміння не вказано у доступному джерелі.` На сторінці Воїна видно 5 таких хибних fallback-карток, хоча canonical опис у data існує.
- Для порожнього підкласу selector працює, але progression залишає загальний рядок «Особливість підкласу», а повних subclass cards немає. Це головна видима ознака незавершеного контенту.
- Таблиця має `min-width: 560px` і внутрішній horizontal scroll. На mobile це не створює page overflow, але потребує горизонтального прокручування самої таблиці.
- Sidebar і navigation переходять в одну колонку на mobile; критичного responsive overflow не знайдено.

## Рекомендований порядок завершення

1. **Renderer repeated-feature fix:** повторно використовувати canonical опис для наступних рівнів того самого feature замість генерації хибного fallback. Це одразу прибере видиму помилку з усіх класів без переписування правил.
2. **Чорнокнижник:** додати Pact Magic resource columns та повні base features; це єдина структурно неповна spellcasting table.
3. **Монах, Паладин, Слідопит, Пройдисвіт, Чаклун:** заповнити 82 відсутні base feature-тексти; окремо завершити Weapon Mastery для Паладина, Слідопита й Пройдисвіта.
4. **Жрець і Чарівник:** base class уже готовий, тому завершити їхні підкласи дає швидкий результат без зміни class progression.
5. **Інші 25 неповних підкласів:** спочатку feature-каркаси з placeholder, потім identity-only підкласи.
6. Додати структуровану spell progression для Eldritch Knight і Arcane Trickster.
7. Після контенту додати item-slug mapping для Starting Equipment та явні class relationships до Items/Conditions лише там, де це механічно виправдано.
8. Повторити UI-аудит порожніх станів підкласів після заповнення даних; редизайн до цього не потрібен.
