# Аудит Бестіарію

## Поточний стан

- Runtime dataset: 5 офіційних істот з SRD 5.2.1.
- Маршрути: `/bestiary` і `/bestiary/:slug`.
- Official content зберігається статично в `src/data/rules/bestiary.ts`; Supabase не використовується як джерело.

## Модель даних

`OfficialMonsterEntry` підтримує:

- slug, українську та англійську назви;
- розмір, тип, підтип, світогляд;
- КЗ, хіти, кістки хітів, швидкості;
- шість характеристик із modifier і saving throw;
- навички, вразливості, стійкості, імунітети та імунітети до станів;
- чуття, пасивне сприйняття, мови;
- ПО, досвід, бонус майстерності;
- риси, дії, бонусні дії, реакції, легендарні дії та дії лігва;
- structured spellcasting із групами використання;
- середовище, опис, artwork path;
- прямі relationships до Spells, Conditions та Items;
- компактне офіційне джерело і сторінку SRD.

## Перший набір

- Бандит / Bandit: простий Humanoid із двома structured attacks та Items relationships.
- Гоблін-ватажок / Goblin Boss: structured attacks, bonus action, reaction, Items relationships.
- Вовк / Wolf: простий beast, trait, attack і Conditions relationships.
- Маг / Mage: spellcasting groups, bonus-action spell, reaction spells і прямі Spells relationships.
- Аболет / Aboleth: складні traits/actions, повторні ряткидки, Conditions relationships і legendary actions.

## Renderer

- Header компактно показує identity, тип, ПО, XP і source; artwork рендериться лише за наявності.
- Stat block показує vitals, ability scores/modifiers, saving throws і тільки заповнені secondary rows.
- Traits мають text-first формат `Назва. Текст` без окремих великих карток.
- Attacks відокремлюють structured attack facts від secondary effect prose.
- Bonus Actions, Reactions, Legendary Actions, Lair Actions, Spellcasting і Description умовні.
- Spell names ведуть лише на існуючі `/spells/:slug`.
- Conditions та Items показуються компактними навігаційними links унизу.

## Relationships

- Spells: 12 унікальних посилань мага.
- Conditions: 4 placements (`incapacitated`, `prone`, `charmed`, `grappled`).
- Items: 7 точних посилань спорядження Bandit і Goblin Boss.

## Відомі обмеження

- Перший dataset навмисно малий і перевіряє renderer, а не повноту SRD bestiary.
- Artwork для перших п’яти істот не додавався: локальних source-backed assets немає.
- Lair Actions підтримуються моделлю та UI, але у першому наборі немає окремого запису з офіційним lair-action block.
- Lore не вигадується; description приховується, якщо SRD stat block не містить source-backed narrative text.

## Наступний рекомендований import

1. Додати 15–25 SRD-істот із вразливостями, стійкостями, імунітетами та різними senses.
2. Додати одну SRD-істоту з окремими Lair Actions для runtime-перевірки цієї гілки.
3. Після другого контрольованого batch автоматизувати конвертацію решти SRD stat blocks у поточну модель.
