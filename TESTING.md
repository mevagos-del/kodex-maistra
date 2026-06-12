# TESTING

Базовий checklist для MVP “Кодекс Майстра”.

## Публічний сайт

- [ ] Головна сторінка відкривається.
- [ ] Плитки секцій видимі.
- [ ] Майбутні модулі показують “Скоро” і не є клікабельними.
- [ ] `/races` відкривається.
- [ ] `/classes` відкривається.
- [ ] `/items` відкривається.
- [ ] Пошук працює.
- [ ] Фільтри працюють.
- [ ] Detail page відкривається.
- [ ] Відсутній матеріал показує “Матеріал не знайдено”.
- [ ] Fallback-зображення працюють.

## Auth і admin

- [ ] `/admin` перенаправляє неавторизованого користувача на `/login`.
- [ ] Login page відкривається.
- [ ] Користувач з роллю `user` не може відкрити адмін-панель.
- [ ] Користувач з роллю `admin` може відкрити адмін-панель.
- [ ] Користувач з роллю `editor` може відкрити адмін-панель.

## Admin content management

- [ ] Admin може створити секцію.
- [ ] Admin може редагувати секцію.
- [ ] Admin може завантажити зображення секції.
- [ ] Admin може створити расу.
- [ ] Admin може створити клас.
- [ ] Admin може створити предмет.
- [ ] Admin може редагувати існуючий матеріал.
- [ ] Admin може встановити статус `draft`.
- [ ] Admin може встановити статус `published`.
- [ ] Admin може встановити статус `hidden`.
- [ ] Published content з’являється на публічному сайті.
- [ ] Hidden/draft content не з’являється на публічному сайті.

## Import

- [ ] CSV template downloads працюють.
- [ ] CSV файл завантажується.
- [ ] Preview з’являється.
- [ ] Validation errors показуються.
- [ ] Duplicate slug всередині файлу виявляється.
- [ ] Existing slug у базі обробляється безпечним skip.
- [ ] Імпорт потребує confirmation.
- [ ] Imported content з’являється в admin list.
- [ ] Published imported content з’являється публічно.

## PWA

- [ ] Manifest loads.
- [ ] App має назву “Кодекс Майстра”.
- [ ] Icons доступні.
- [ ] Service worker не блокує свіжі Supabase data.

## Deployment

- [ ] `VITE_SUPABASE_URL` додано у Vercel.
- [ ] `VITE_SUPABASE_ANON_KEY` додано у Vercel.
- [ ] Build command: `npm run build`.
- [ ] Output directory: `dist`.
- [ ] Після зміни env виконано redeploy.
