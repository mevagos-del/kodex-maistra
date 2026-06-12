# Кодекс Майстра

Кодекс Майстра — українськомовний DnD-довідник у форматі React/Vite застосунку. MVP містить публічний каталог рас, класів і предметів, захищену адмін-панель, Supabase Auth, Supabase PostgreSQL, Supabase Storage, CSV-імпорт і базову PWA-підготовку.

Проєкт не містить скопійованого контенту з офіційних книг, ttg.club або сторонніх сайтів. Demo data використовує короткі оригінальні описи тільки для перевірки UI.

## Стек

- React
- Vite
- TypeScript
- React Router
- React Markdown
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- JSONB для складних полів
- CSS
- PWA
- Vercel

## Структура проєкту

```text
public/
  icons/                       PWA icons
  images/placeholders/         fallback-зображення
  templates/                   CSV-шаблони імпорту
  manifest.webmanifest         PWA manifest
  sw.js                        service worker
src/
  app/                         головний застосунок
  components/                  layout і UI-компоненти
  data/                        статичні описи секцій і roadmap
  features/admin/              адмін-панель, import, admin API
  features/auth/               AuthProvider, useAuth, ProtectedRoute
  features/catalog/            публічний catalog data layer
  lib/                         Supabase client, Storage, service worker registration
  pages/                       сторінки маршрутів
  routes/                      маршрути
  styles/                      глобальні стилі
  types/                       спільні типи
supabase/
  schema.sql                   таблиці, constraints, RLS, triggers
  seed.sql                     секції, джерела, demo data
  storage.sql                  Storage policies
  README.md                    коротка інструкція Supabase
```

## Локальний запуск

Потрібні Node.js і npm.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Налаштування `.env`

Створіть `.env` на основі `.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

У frontend додається тільки Supabase anon public key. Не додавайте service role key у Vite-застосунок.

## Supabase project

1. Створіть новий проєкт у Supabase.
2. Скопіюйте Project URL і anon public key у `.env`.
3. Відкрийте SQL Editor.
4. Запустіть `supabase/schema.sql`.
5. Запустіть `supabase/seed.sql`.
6. Створіть Storage bucket `images`.
7. Запустіть `supabase/storage.sql`.

## SQL scripts

`supabase/schema.sql` створює:

- `profiles`;
- `sections`;
- `sources`;
- `races`;
- `classes`;
- `items`;
- `favorites`;
- constraints для ролей, статусів, типів контенту й версій правил;
- індекси;
- triggers для `updated_at`;
- trigger створення профілю після реєстрації користувача;
- базові RLS policies.

`supabase/seed.sql` додає:

- секції `Раси`, `Класи`, `Предмети`;
- джерела `Demo 2024`, `Homebrew Demo`;
- demo races: `Людина`, `Ельф`, `Дворф`;
- demo classes: `Плут`, `Варвар`, `Чарівник`;
- demo items: `Довгий меч`, `Шкіряна броня`, `Набір мандрівника`.

`supabase/storage.sql` додає policies для bucket `images`.

## Supabase Auth

У Supabase відкрийте Authentication → Providers і увімкніть Email provider.

Публічна частина сайту доступна без входу. `/admin` захищений через `ProtectedRoute` і перевіряє роль користувача з `profiles.role`.

## Перший admin-користувач

1. Зареєструйте користувача через `/login` або Supabase Authentication.
2. У SQL Editor призначте роль:

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin-email@example.com';
```

Для редактора:

```sql
update public.profiles
set role = 'editor'
where email = 'editor@example.com';
```

Ролі:

- `admin` — повний доступ;
- `editor` — створення та редагування контенту;
- `user` — звичайний користувач без доступу до адмін-панелі.

## Storage bucket `images`

Створіть public bucket `images`.

Очікувана структура:

```text
images/
  sections/
  races/
  classes/
  items/
```

Зображення секцій завантажуються в `images/sections`, рас — `images/races`, класів — `images/classes`, предметів — `images/items`.

Якщо `image_url` порожній, UI використовує fallback:

- `/images/placeholders/section-placeholder.svg`;
- `/images/placeholders/content-placeholder.svg`.

## Публічний довідник

Публічна частина показує тільки:

- секції з `is_published = true`;
- матеріали з `publication_status = 'published'`.

Маршрути:

- `/`;
- `/races`;
- `/races/:slug`;
- `/classes`;
- `/classes/:slug`;
- `/items`;
- `/items/:slug`;
- `/login`;
- `/admin`.

На головній є hero, глобальний пошук, плитки секцій, останні додані матеріали та неактивні майбутні модулі зі статусом `Скоро`.

Пошук працює по:

- українській назві;
- оригінальній назві;
- короткому опису;
- тегах.

Фільтри працюють разом із пошуком.

## Адмін-панель

`/admin` має вкладки:

- `Розділи`;
- `Матеріали`;
- `Імпорт`.

Доступ мають тільки `admin` і `editor`. Неавторизований користувач перенаправляється на `/login`. Користувач із роллю `user` бачить повідомлення про відсутність доступу.

### Розділи

Можна створювати й редагувати:

- `title`;
- `slug`;
- `description`;
- `image_url`;
- `sort_order`;
- `is_published`.

Також підтримується upload зображення секції в Storage.

### Матеріали

Підтримується створення й редагування:

- рас;
- класів;
- предметів.

Спільні поля:

- назва українською;
- оригінальна назва;
- slug;
- короткий опис;
- Markdown-опис;
- зображення;
- джерело;
- теги;
- статус публікації;
- версія правил;
- тип контенту.

JSONB-поля редагуються через JSON textarea з валідацією. Markdown-поле має preview.

## CSV import

Імпорт доступний у `/admin` → `Імпорт`.

Підтримується CSV для:

- рас;
- класів;
- предметів.

Шаблони:

- `public/templates/races_import_template.csv`;
- `public/templates/classes_import_template.csv`;
- `public/templates/items_import_template.csv`.

Обов’язкові поля:

- `title_ua`;
- `slug`;
- `publication_status`;
- `rules_version`;
- `content_type`.

Allowed values:

- `publication_status`: `draft`, `published`, `hidden`;
- `rules_version`: `2024`, `homebrew`;
- `content_type`: `official`, `homebrew`, `campaign`, `draft`.

Boolean-значення:

- `true`;
- `false`;
- `так`;
- `ні`;
- `yes`;
- `no`;
- `1`;
- `0`.

`tags` і array-поля можна передавати як comma-separated text або JSON array.

JSONB-поля мають містити валідний JSON. Порожні JSONB-поля зберігаються як `{}` або `[]` залежно від типу.

Duplicate strategy:

- slug-дублі всередині файлу блокують імпорт;
- slug, який уже є в базі, показується як warning і пропускається;
- існуючі дані не перезаписуються.

## Обмеження Excel `.xlsx`

`.xlsx` поки не парситься в браузері. Для імпорту Excel-таблицю потрібно зберегти як CSV. Це свідоме MVP-обмеження, щоб не додавати неперевірену залежність без можливості виконати build у поточному середовищі.

## PWA

Додано:

- `public/manifest.webmanifest`;
- `public/sw.js`;
- `public/offline.html`;
- SVG icons;
- registration у `src/lib/registerServiceWorker.ts`.

Service worker кешує app shell і статичні assets. Supabase dynamic data не кешується агресивно, щоб уникнути stale data.

## Деплой на Vercel

1. Запуште проєкт у GitHub.
2. У Vercel натисніть Add New Project.
3. Імпортуйте репозиторій.
4. Додайте environment variables:
   - `VITE_SUPABASE_URL`;
   - `VITE_SUPABASE_ANON_KEY`.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Задеплойте.
8. Якщо змінюєте environment variables, зробіть redeploy.

## Roadmap

Майбутні модулі залишаються неактивними плитками `Скоро`:

- заклинання;
- монстри;
- магічні предмети;
- зона майстра;
- конструктор персонажа;
- кампанії;
- NPC;
- бойовий трекер;
- обране.

Не входить у MVP:

- повний character builder;
- DM tools;
- campaigns;
- NPC tools;
- combat tracker;
- favorites UI;
- monsters catalog;
- spells catalog;
- magic items catalog як окремий розділ.

## Перевірка

Базовий checklist винесено в `TESTING.md`.
