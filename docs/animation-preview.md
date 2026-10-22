# Локальне порівняння анімацій

Запуск: `npm run dev -- --host 127.0.0.1 --port 5176 --strictPort`.
Адреса: http://127.0.0.1:5176/animation-preview

Маршрут і його lazy import огорнуті `import.meta.env.DEV`. Production-збірка
не містить сторінки або її CSS. Посилань у навігації та sitemap немає.
React додає `noindex, nofollow, noarchive` лише на час відкриття preview.

Використовується наявний `HomePage`, його статичний індекс, арти, іконки,
типографіка й адаптивна сітка. Опція `externalMotion` вимикає стандартні
reveal hooks і друкування placeholder тільки в preview. Звичайний маршрут `/`
не передає цю опцію і зберігає поточні анімації. Пошук залишається справжнім,
локальним, без додаткових запитів до даних.

| Варіант | Hero / Bento | Stagger | TranslateY |
| --- | --- | --- | --- |
| Cinematic | 540 / 520 ms | 105 ms | 18 px |
| Editorial | 400 / 380 ms | 60 ms | 10 px |
| Atmospheric | 580 / 460 ms | 85 ms | 14 px |

У Atmospheric арт проявляється від opacity 0.65 до 1 за 600 ms, а окремий
декоративний шар — від 0 до 1. Контрастні шари головної сторінки збережені.
Немає blur, анімації background-position або постійного will-change.

Повторення скидає CSS animation через зняття атрибута та синхронне обчислення
стилів. Компонент не перемонтовується, тому зберігає пошук, фокус і зображення.
Кнопка довідника прокручує до секції і створює новий IntersectionObserver.
Картки групуються за фактичним offsetTop, включно з мобільною сіткою.
Observer відключається при повторенні, зміні режиму, reduced motion та unmount.
Таймерів у preview немає. Фокус клавіатури також відкриває відповідний ряд.
Без IntersectionObserver контент залишається видимим.

`prefers-reduced-motion` відстежується під час роботи, з очищенням підписки.
Усі елементи видимі, анімації й декоративні transitions вимкнені;
перемикачі продовжують працювати. CSS обмежений `.animation-preview`.

## Knowledge repository

Наявного спеціалізованого CSS-агента не вдалося знайти серед доступних чатів
і конфігурацій. Рекомендації не видаються за результат його роботи.
Використано локальну бібліотеку `codex-ui-knowledge` лише під час розробки:

- `animations/entrance/fade-in/` і `animations/entrance/slide-in-up/`: перевірено
  документацію, обмеження, performance, accessibility і reduced-motion.
  Команда `npm run recommend -- --use-case entrance` поставила їх на місця 1 і 2.
  Реалізація preview — власні прості opacity/translate keyframes без копіювання
  upstream Animate.css або його демонстраційних компонентів.
- `tokens/easings/`: фактичний шлях замість відсутнього `animations/tokens/easings/`.
  Взято Open Props ease-out-3: `cubic-bezier(0, 0, 0.3, 1)`.
- `backgrounds/gradients/center-spotlight/` і
  `backgrounds/surfaces/dark-horizon-surface/`: адаптовано техніку статичних
  радіальних градієнтів до бронзових і графітових кольорів проєкту та дуже
  низької прозорості. Один окремий pointer-safe шар.

Посилання на походження:
- Open Props, commit `530682d04327f842f56bb1ec33cf84a3cadb3876`,
  https://github.com/argyleink/open-props/blob/530682d04327f842f56bb1ec33cf84a3cadb3876/src/props.easing.css
- Pattern Craft, commit `1550af7903f50b4f19a1b44786f27ca01f3ef6ab`,
  https://github.com/megh-bari/pattern-craft/blob/1550af7903f50b4f19a1b44786f27ca01f3ef6ab/src/data/patterns.ts

MIT License — Copyright (c) 2021 Adam Argyle; Copyright (c) 2025 Megh Bari.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Відтворювані перевірки

- `node --test scripts/homepage.test.mjs`
- `npm run build`
- `npm run lint`
- `node scripts/animation-preview.browser.mjs` після запуску Vite.
  Тест використовує наявний Playwright; `PLAYWRIGHT_MODULE` може вказувати на
  його встановлений модуль, `PLAYWRIGHT_BROWSERS_PATH` — на наявні браузери.
  Нових залежностей або змін lockfile не потрібно.
  `PREVIEW_BASE_URL` змінює адресу; `PREVIEW_SCREENSHOT_DIR` зберігає screenshots.

Браузерний тест перевіряє фактичні CSS animations, три режими, повторення,
scroll reveal, reduced motion під час роботи, 1440/390/320 px, overflow,
layout shift і повернення на головну через SPA-навігацію.

Перевірено 22.10.2026: homepage tests 3/3, build успішний, lint без помилок
(наявне попередження Fast Refresh у AuthProvider). Chromium: усі сценарії
пройшли на 1440/390/320 px, CLS = 0, горизонтального overflow немає.
Окремо пройшли швидкі перемикання, fallback без IntersectionObserver та
production NotFound для `/animation-preview`. Переглянуто повні screenshots
desktop/mobile. У production JS/CSS відсутні маршрут і маркери preview.
