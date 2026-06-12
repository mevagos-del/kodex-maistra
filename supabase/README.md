# Supabase для «Кодекс Майстра»

Ця тека містить SQL-фундамент Stage 2.

## Порядок запуску

1. Створіть проєкт у Supabase.
2. Відкрийте **SQL Editor**.
3. Запустіть `schema.sql`.
4. Після успішного виконання запустіть `seed.sql`.
5. Увімкніть Email/Password Auth у **Authentication → Providers**.
6. Створіть Storage bucket `images`.
7. Після створення bucket запустіть `storage.sql`.

## Таблиці

`schema.sql` створює:

- `profiles`
- `sections`
- `sources`
- `races`
- `classes`
- `items`
- `favorites`

Також додаються constraints, індекси, тригери `updated_at`, тригер створення `profiles` після реєстрації користувача та базові RLS-політики.

`storage.sql` додає політики для bucket `images`: публічне читання та керування зображеннями тільки для `admin`/`editor`.

## Ролі

Роль користувача зберігається в `profiles.role`.

- `admin` — повний доступ;
- `editor` — керування контентом;
- `user` — звичайний користувач.

Нові користувачі автоматично отримують роль `user`. Першого адміністратора потрібно призначити вручну в таблиці `profiles` після створення акаунта.

```sql
update public.profiles
set role = 'admin'
where email = 'your-admin-email@example.com';
```

## Storage

Створіть bucket:

- назва: `images`;
- public bucket: так, якщо зображення мають відкриватися напряму на публічному сайті;
- рекомендована структура шляхів:
  - `sections/`
  - `races/`
  - `classes/`
  - `items/`

У фронтенді helper-и працюють з bucket `images` і цими папками.
