import { appRoutes } from '@/routes/appRoutes';
import type { FutureModule, SectionMeta } from '@/types/content';

export const coreSections: SectionMeta[] = [
  {
    slug: 'races',
    title: 'Раси',
    description: 'Походження, риси та культурні акценти персонажів.',
    imageAlt: 'Темний фентезійний силует мандрівника',
    path: appRoutes.races,
    materialCountLabel: '0 матеріалів',
  },
  {
    slug: 'classes',
    title: 'Класи',
    description: 'Архетипи героїв, бойові ролі та ключові здібності.',
    imageAlt: 'Герой з книгою заклять і зброєю',
    path: appRoutes.classes,
    materialCountLabel: '0 матеріалів',
  },
  {
    slug: 'items',
    title: 'Предмети',
    description: 'Спорядження, зброя, броня та корисні речі для пригод.',
    imageAlt: 'Старий стіл з мечем і дорожнім набором',
    path: appRoutes.items,
    materialCountLabel: '0 матеріалів',
  },
];

export const futureModules: FutureModule[] = [
  { title: 'Заклинання', description: 'Каталог магії для майбутнього релізу.', status: 'Скоро' },
  { title: 'Монстри', description: 'Бестіарій для підготовки сутичок.', status: 'Скоро' },
  { title: 'Магічні предмети', description: 'Окремий розділ рідкісних знахідок.', status: 'Скоро' },
  { title: 'Зона майстра', description: 'Робочий простір для ведення пригод.', status: 'Скоро' },
  { title: 'Конструктор персонажа', description: 'Покрокове створення героя.', status: 'Скоро' },
  { title: 'Кампанії', description: 'Сесії, учасники та довга історія партії.', status: 'Скоро' },
  { title: 'NPC', description: 'Неігрові персонажі та швидкі нотатки.', status: 'Скоро' },
  { title: 'Бойовий трекер', description: 'Ініціатива, стани та хід раундів.', status: 'Скоро' },
];
