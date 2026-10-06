export const appRoutes = {
  home: '/',
  races: '/races',
  raceDetail: '/races/:slug',
  classes: '/classes',
  classDetail: '/classes/:slug',
  items: '/items',
  itemDetail: '/items/:slug',
  spells: '/spells',
  spellDetail: '/spells/:slug',
  conditions: '/conditions',
  conditionDetail: '/conditions/:slug',
  feats: '/feats',
  featDetail: '/feats/:slug',
  admin: '/admin',
  login: '/login',
} as const;

export const publicNavigation = [
  { label: 'Головна', path: appRoutes.home },
  { label: 'Раси', path: appRoutes.races },
  { label: 'Класи', path: appRoutes.classes },
  { label: 'Предмети', path: appRoutes.items },
  { label: 'Закляття', path: appRoutes.spells },
];
