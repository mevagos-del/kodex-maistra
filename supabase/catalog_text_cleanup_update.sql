-- Кодекс Майстра: безпечне застосування очищеного catalog text до наявної бази.
-- Не змінює schema, RLS, Auth, Storage і не видаляє записи.
-- Оновлює тільки відомі записи за slug та source note за унікальним ключем (title, source_type).

begin;

insert into public.sources (title, source_type, url, comment)
values
  ('SRD 5.2 Reference', 'official', null, 'На основі відкритих правил SRD. Текст адаптовано українською для довідника.')
on conflict (title, source_type) do update
set comment = excluded.comment,
    updated_at = now();

update public.sections
set description = case slug
    when 'races' then 'Тип істоти, розмір, швидкість, мови та расові риси.'
    when 'classes' then 'Кістка хітів, ряткидки, володіння та класові особливості.'
    when 'items' then 'Зброя, броня, спорядження, властивості та ціна.'
    else description
  end,
  updated_at = now()
where slug in ('races', 'classes', 'items');

update public.races
set title_ua = 'Людина',
    title_original = 'Human',
    short_description = 'Раса гуманоїдів. Розмір: Середній. Швидкість: 30 фт.',
    full_description_markdown = E'## Людина\nБазові правила: тип істоти гуманоїд, розмір Середній, швидкість 30 фт.\n\nМови: Спільна та одна додаткова мова.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['раса', 'гуманоїд', 'середній'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    creature_type = 'гуманоїд',
    size = 'Середній',
    speed = '30 фт',
    languages = array['Спільна', 'одна додаткова мова'],
    lifespan = 'до 100 років',
    alignment_or_behavior = 'не визначено правилами',
    race_traits = '[{"name":"Додаткова мова","mechanical_effect":"Володіння однією додатковою мовою.","usage":"Постійно"}]'::jsonb,
    ability_bonuses = '{}'::jsonb,
    proficiencies = '{}'::jsonb,
    additional_skills = '["одне вміння на вибір"]'::jsonb,
    subraces = '[]'::jsonb,
    updated_at = now()
where slug = 'human';

update public.races
set title_ua = 'Ельф',
    title_original = 'Elf',
    short_description = 'Раса гуманоїдів. Розмір: Середній. Швидкість: 30 фт.',
    full_description_markdown = E'## Ельф\nБазові правила: тип істоти гуманоїд, розмір Середній, швидкість 30 фт.\n\nМови: Спільна та Ельфійська.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['раса', 'гуманоїд', 'ельф'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    creature_type = 'гуманоїд',
    size = 'Середній',
    speed = '30 фт',
    languages = array['Спільна', 'Ельфійська'],
    lifespan = 'до 750 років',
    alignment_or_behavior = 'не визначено правилами',
    race_traits = '[{"name":"Темний зір","mechanical_effect":"Темний зір: 60 футів.","usage":"Постійно"},{"name":"Спадок фей","mechanical_effect":"Перевага на ряткидки проти стану зачарований.","usage":"Постійно","saving_throw_advantages":"проти стану зачарований"}]'::jsonb,
    ability_bonuses = '{}'::jsonb,
    proficiencies = '{"skills":["Уважність"]}'::jsonb,
    additional_skills = '[]'::jsonb,
    subraces = '[]'::jsonb,
    updated_at = now()
where slug = 'elf';

update public.races
set title_ua = 'Дворф',
    title_original = 'Dwarf',
    short_description = 'Раса гуманоїдів. Розмір: Середній. Швидкість: 25 фт.',
    full_description_markdown = E'## Дворф\nБазові правила: тип істоти гуманоїд, розмір Середній, швидкість 25 фт.\n\nМови: Спільна та Дворфійська.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['раса', 'гуманоїд', 'дворф'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    creature_type = 'гуманоїд',
    size = 'Середній',
    speed = '25 фт',
    languages = array['Спільна', 'Дворфійська'],
    lifespan = 'до 350 років',
    alignment_or_behavior = 'не визначено правилами',
    race_traits = '[{"name":"Темний зір","mechanical_effect":"Темний зір: 60 футів.","usage":"Постійно"},{"name":"Стійкість до отрути","mechanical_effect":"Перевага на ряткидки проти отрути та стійкість до отруйної шкоди.","usage":"Постійно","saving_throw":"Статура","resistance":"отруйна шкода"}]'::jsonb,
    ability_bonuses = '{}'::jsonb,
    proficiencies = '{"tools":["ремісничий інструмент на вибір"]}'::jsonb,
    additional_skills = '[]'::jsonb,
    subraces = '[]'::jsonb,
    updated_at = now()
where slug = 'dwarf';

update public.classes
set title_ua = 'Плут',
    title_original = 'Rogue',
    short_description = 'Клас. Кістка хітів: d8. Основна характеристика: Спритність.',
    full_description_markdown = E'## Плут\nКістка хітів: d8. Основна характеристика: Спритність.\n\nРяткидки: Спритність, Інтелект.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['клас', 'спритність', 'скритність'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    hit_die = 'd8',
    primary_ability = 'Спритність',
    saving_throws = array['Спритність', 'Інтелект'],
    armor_proficiencies = array['легка броня'],
    weapon_proficiencies = array['проста зброя', 'точна зброя'],
    tool_proficiencies = array['інструменти злодія'],
    skill_choices = '{"choose":2,"from":["скритність","спритність рук","переконання","обман"]}'::jsonb,
    starting_equipment = '[{"name":"легка броня"},{"name":"інструменти злодія"}]'::jsonb,
    class_features = '[{"level":1,"name":"Прихована атака","mechanical_effect":"Раз на хід додає додаткову шкоду, якщо атака має перевагу або союзник цілі перебуває поруч із нею.","usage":"Раз на хід","scaling":"Шкода зростає з рівнем"}]'::jsonb,
    class_progression = '[{"level":1,"bonus":"+2"},{"level":2,"bonus":"+2"}]'::jsonb,
    subclasses = '[]'::jsonb,
    spellcasting = '{}'::jsonb,
    has_spellcasting = false,
    updated_at = now()
where slug = 'rogue';

update public.classes
set title_ua = 'Варвар',
    title_original = 'Barbarian',
    short_description = 'Клас. Кістка хітів: d12. Основна характеристика: Сила.',
    full_description_markdown = E'## Варвар\nКістка хітів: d12. Основна характеристика: Сила.\n\nРяткидки: Сила, Статура.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['клас', 'сила', 'витривалість'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    hit_die = 'd12',
    primary_ability = 'Сила',
    saving_throws = array['Сила', 'Статура'],
    armor_proficiencies = array['легка броня', 'середня броня', 'щити'],
    weapon_proficiencies = array['проста зброя', 'військова зброя'],
    tool_proficiencies = array[]::text[],
    skill_choices = '{"choose":2,"from":["атлетика","виживання","залякування"]}'::jsonb,
    starting_equipment = '[{"name":"бойова зброя"},{"name":"дорожній набір"}]'::jsonb,
    class_features = '[{"level":1,"name":"Лють","mechanical_effect":"Перевага на перевірки й ряткидки Сили; бонус до шкоди атакою Силою; стійкість до дробильної, колотої та рубаної шкоди.","usage":"Бонусна дія"}]'::jsonb,
    class_progression = '[{"level":1,"bonus":"+2"},{"level":2,"bonus":"+2"}]'::jsonb,
    subclasses = '[]'::jsonb,
    spellcasting = '{}'::jsonb,
    has_spellcasting = false,
    updated_at = now()
where slug = 'barbarian';

update public.classes
set title_ua = 'Чарівник',
    title_original = 'Wizard',
    short_description = 'Клас. Кістка хітів: d6. Заклинальна характеристика: Інтелект.',
    full_description_markdown = E'## Чарівник\nКістка хітів: d6. Заклинальна характеристика: Інтелект.\n\nРяткидки: Інтелект, Мудрість.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['клас', 'інтелект', 'магія'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    hit_die = 'd6',
    primary_ability = 'Інтелект',
    saving_throws = array['Інтелект', 'Мудрість'],
    armor_proficiencies = array[]::text[],
    weapon_proficiencies = array['посох', 'кинджал'],
    tool_proficiencies = array['набір письма'],
    skill_choices = '{"choose":2,"from":["арканознавство","історія","аналіз"]}'::jsonb,
    starting_equipment = '[{"name":"книга нотаток"},{"name":"фокус для заклять"}]'::jsonb,
    class_features = '[{"level":1,"name":"Заклинання","mechanical_effect":"Використовує Інтелект як заклинальну характеристику.","usage":"За правилами заклинань"}]'::jsonb,
    class_progression = '[{"level":1,"slots":2},{"level":2,"slots":3}]'::jsonb,
    subclasses = '[]'::jsonb,
    spellcasting = '{"ability":"Інтелект","focus":"книга або фокус"}'::jsonb,
    has_spellcasting = true,
    updated_at = now()
where slug = 'wizard';

update public.items
set title_ua = 'Довгий меч',
    title_original = 'Longsword',
    short_description = 'Бойова зброя ближнього бою. Шкода: 1d8 рубана.',
    full_description_markdown = E'## Довгий меч\nБойова зброя ближнього бою.\n\nШкода: 1d8 рубана. Властивість: універсальна 1d10.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['предмет', 'зброя', 'меч'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    item_type = 'зброя',
    category = 'військова',
    rarity = 'звичайний',
    price = '15 зм',
    weight = '3 фунти',
    requires_attunement = false,
    is_magical = false,
    properties = '{"versatile":true}'::jsonb,
    damage = '1d8',
    damage_type = 'рубана',
    range = 'ближній бій',
    armor_class = null,
    required_strength = null,
    stealth_disadvantage = false,
    quantity = '1',
    updated_at = now()
where slug = 'longsword';

update public.items
set title_ua = 'Шкіряна броня',
    title_original = 'Leather Armor',
    short_description = 'Легка броня. Клас захисту: 11 + модифікатор Спритності.',
    full_description_markdown = E'## Шкіряна броня\nЛегка броня.\n\nКлас захисту: 11 + модифікатор Спритності. Перешкода: Скритність — ні.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['предмет', 'броня', 'легка'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    item_type = 'броня',
    category = 'легка',
    rarity = 'звичайний',
    price = '10 зм',
    weight = '10 фунтів',
    requires_attunement = false,
    is_magical = false,
    properties = '{}'::jsonb,
    damage = null,
    damage_type = null,
    range = null,
    armor_class = '11 + модифікатор Спритності',
    required_strength = null,
    stealth_disadvantage = false,
    quantity = '1',
    updated_at = now()
where slug = 'leather-armor';

update public.items
set title_ua = 'Набір мандрівника',
    title_original = 'Adventurer’s Pack',
    short_description = 'Спорядження мандрівника. Кількість: 1 набір.',
    full_description_markdown = E'## Набір мандрівника\nСпорядження мандрівника.\n\nВміст вказано у властивостях предмета.',
    source_id = (select id from public.sources where title = 'SRD 5.2 Reference' and source_type = 'official' limit 1),
    tags = array['предмет', 'спорядження', 'подорож'],
    publication_status = 'published',
    rules_version = '2024',
    content_type = 'official',
    item_type = 'спорядження',
    category = 'пригодницьке',
    rarity = 'звичайний',
    price = '12 зм',
    weight = '8 фунтів',
    requires_attunement = false,
    is_magical = false,
    properties = '{"contains":["мотузка","кресало","сухий пайок"]}'::jsonb,
    damage = null,
    damage_type = null,
    range = null,
    armor_class = null,
    required_strength = null,
    stealth_disadvantage = false,
    quantity = '1 набір',
    updated_at = now()
where slug = 'adventurers-pack';

commit;
