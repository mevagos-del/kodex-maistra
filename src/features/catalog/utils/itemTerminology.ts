const masteryLabels: Record<string, string> = {
  Cleave: 'Розсікання',
  Graze: 'Зачіпання',
  Nick: 'Швидкий надріз',
  Push: 'Поштовх',
  Sap: 'Ослаблення',
  Slow: 'Уповільнення',
  Topple: 'Повалення',
  Vex: 'Дошкуляння',
};

const weaponPropertyLabels: Record<string, string> = {
  Ammunition: 'Боєприпаси',
  Finesse: 'Фехтувальна',
  Heavy: 'Важка',
  Light: 'Легка',
  Loading: 'Перезаряджання',
  Reach: 'Досяжність',
  Thrown: 'Метальна',
  'Two-Handed': 'Дворучна',
  Versatile: 'Універсальна',
};

export function itemMasteryLabel(value: string) {
  return masteryLabels[value] ?? value;
}

export function itemWeaponPropertyLabel(value: string) {
  const match = value.match(/^([^()]+?)(\s*\(.*\))?$/);
  if (!match) return value;
  const name = match[1].trim();
  return `${weaponPropertyLabels[name] ?? name}${match[2] ?? ''}`;
}

export function capitalizeItemTerm(value: string) {
  const trimmed = value.trim();
  return trimmed ? `${trimmed[0].toLocaleUpperCase('uk-UA')}${trimmed.slice(1)}` : trimmed;
}
