import { appRoutes } from '@/routes/appRoutes';
import type { FutureModule, SectionMeta } from '@/types/content';

export const coreSections: SectionMeta[] = [
  {
    slug: 'races',
    title: 'Раси',
    description: 'Тип істоти, розмір, швидкість, мови та расові риси.',
    imageAlt: 'Темний фентезійний силует мандрівника',
    path: appRoutes.races,
    materialCountLabel: '0 матеріалів',
  },
  {
    slug: 'classes',
    title: 'Класи',
    description: 'Кістка хітів, ряткидки, володіння та класові особливості.',
    imageAlt: 'Герой з книгою заклинань і зброєю',
    path: appRoutes.classes,
    materialCountLabel: '0 матеріалів',
  },
  {
    slug: 'items',
    title: 'Предмети',
    description: 'Зброя, броня, спорядження, властивості та ціна.',
    imageAlt: 'Старий стіл з мечем і дорожнім набором',
    path: appRoutes.items,
    materialCountLabel: '0 матеріалів',
  },
];

export const referenceQuickAccess = [
  { title: 'Раси', path: appRoutes.races, symbol: 'Р', isDisabled: false },
  { title: 'Класи', path: appRoutes.classes, symbol: 'К', isDisabled: false },
  { title: 'Предмети', path: appRoutes.items, symbol: 'П', isDisabled: false },
  { title: 'Закляття', path: null, symbol: 'З', isDisabled: true },
] as const;

export const toolNavigation = [
  { title: 'Персонажі', status: 'Скоро' },
  { title: 'Сцени', status: 'Скоро' },
  { title: 'Кампанії', status: 'Скоро' },
  { title: 'NPC', status: 'Скоро' },
  { title: 'Бойовий трекер', status: 'Скоро' },
  { title: 'Зона Майстра', status: 'Скоро' },
] as const;

export const futureModules: FutureModule[] = [
  { title: 'Заклинання', description: 'Назва, рівень, школа, час накладання.', status: 'Скоро' },
  { title: 'Монстри', description: 'Статблоки, тип істоти, КЗ, хіти, дії.', status: 'Скоро' },
  { title: 'Магічні предмети', description: 'Рідкість, налаштування, властивості.', status: 'Скоро' },
  { title: 'Зона майстра', description: 'Нотатки, сцени, правила кампанії.', status: 'Скоро' },
  { title: 'Конструктор персонажа', description: 'Раса, клас, характеристики, спорядження.', status: 'Скоро' },
  { title: 'Кампанії', description: 'Сесії, учасники, нотатки кампанії.', status: 'Скоро' },
  { title: 'NPC', description: 'Ім’я, роль, статблок, нотатки.', status: 'Скоро' },
  { title: 'Бойовий трекер', description: 'Ініціатива, стани, раунди.', status: 'Скоро' },
];