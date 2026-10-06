import type { ConditionSlug } from './conditions';

// Explicit applications reviewed against SRD 5.2.1 spell descriptions (including
// conditional options and summoned creatures). Immunity/removal and invisible
// sensors, portals or forces are intentionally not applications of a condition.
export const spellConditionApplications: Record<string, readonly ConditionSlug[]> = {
  'hold-person': ['paralyzed'], invisibility: ['invisible'],
  'blindness-deafness': ['blinded', 'deafened'], grease: ['prone'], silence: ['deafened'],
  'greater-invisibility': ['invisible'], 'hold-monster': ['paralyzed'],
  'divine-word': ['blinded', 'deafened', 'stunned'], 'power-word-stun': ['stunned'], sunburst: ['blinded'],
  'animal-friendship': ['charmed'], 'charm-person': ['charmed'], 'color-spray': ['blinded'],
  command: ['prone'], 'ensnaring-strike': ['restrained'], entangle: ['restrained'],
  'hideous-laughter': ['prone', 'incapacitated'], 'ray-of-sickness': ['poisoned'],
  sleep: ['incapacitated', 'unconscious'], 'find-steed': ['frightened'], suggestion: ['charmed'],
  web: ['restrained'], fear: ['frightened'], 'hypnotic-pattern': ['charmed', 'incapacitated'],
  'meld-into-stone': ['prone'], 'sleet-storm': ['prone'], 'stinking-cloud': ['poisoned'],
  'arcane-hand': ['grappled'], awaken: ['charmed'], banishment: ['incapacitated'],
  'black-tentacles': ['restrained'], 'charm-monster': ['charmed'], compulsion: ['charmed'],
  'conjure-elemental': ['restrained'], 'contact-other-plane': ['incapacitated'], contagion: ['poisoned'],
  'dominate-beast': ['charmed'], 'dominate-person': ['charmed'], dream: ['incapacitated'],
  geas: ['charmed'], 'giant-insect': ['poisoned'], hallow: ['frightened'], mislead: ['invisible'],
  'modify-memory': ['charmed', 'incapacitated'], telekinesis: ['restrained'], 'conjure-fey': ['frightened'],
  eyebite: ['unconscious', 'frightened', 'poisoned'], 'flesh-to-stone': ['restrained', 'petrified'],
  'freezing-sphere': ['restrained'], 'irresistible-dance': ['charmed'], 'magic-jar': ['incapacitated'],
  'mass-suggestion': ['charmed'], sunbeam: ['blinded'], 'wind-walk': ['stunned'],
  'antipathy-sympathy': ['frightened', 'charmed'], 'astral-projection': ['unconscious'],
  demiplane: ['prone'], 'dominate-monster': ['charmed'], earthquake: ['prone'], 'holy-aura': ['blinded'],
  imprisonment: ['restrained', 'unconscious'], 'prismatic-spray': ['restrained', 'petrified', 'blinded'],
  'prismatic-wall': ['blinded', 'restrained', 'petrified'], sequester: ['invisible', 'unconscious'],
  'storm-of-vengeance': ['deafened'], symbol: ['frightened', 'incapacitated', 'unconscious', 'stunned'],
  weird: ['frightened'],
};

// Legacy translations are resolved only at the presentation boundary; source
// text and qualifiers remain intact. This map is NOT used to infer applications.
const adjective = '(?:ими|ого|ої|ій|ою|ому|их|им|ий|а|е|і|у)';
const alias = (slug: ConditionSlug, pattern: string) => ({ slug, pattern: new RegExp(pattern, 'giu') });
export const conditionTextAliases = [
  alias('blinded', `(?:Засліплен|Осліплен)${adjective}`),
  alias('charmed', `Зачарован${adjective}`), alias('deafened', `Оглухл${adjective}`),
  alias('exhaustion', 'Виснаженн(?:ям|я|ю|і)'), alias('frightened', `Налякан${adjective}`),
  alias('grappled', `Схоплен${adjective}`), alias('incapacitated', `Недієздатн${adjective}`),
  alias('invisible', `Невидим${adjective}`), alias('paralyzed', `Паралізован${adjective}`),
  alias('petrified', `Скам[’'ʼ]яніл${adjective}`), alias('poisoned', `Отруєн${adjective}`),
  alias('prone', `(?:Збит${adjective} з ніг|Лежач${adjective})`),
  alias('restrained', `(?:Стримуван|Обплутан|Скут)${adjective}|Обмежений(?: у русі)?`),
  alias('stunned', `(?:Оглушен|Приголомшен)${adjective}`), alias('unconscious', `Непритомн${adjective}`),
];

export function conditionTextMatches(text: string, slugs: readonly ConditionSlug[]) {
  return conditionTextAliases.filter(alias => slugs.includes(alias.slug))
    .flatMap(alias => [...text.matchAll(alias.pattern)].map(match => ({ slug: alias.slug, text: match[0], index: match.index })))
    .filter(match => !/\p{L}/u.test(text[match.index - 1] ?? '') && !/\p{L}/u.test(text[match.index + match.text.length] ?? ''))
    // "Обмежений" also describes mundane limits, not just legacy Restrained.
    .filter(match => !/^Обмежений$/iu.test(match.text) || match.index === 0 || /стан[\p{L}]*\s*$/iu.test(text.slice(0, match.index)))
    .sort((a, b) => a.index - b.index);
}

export function conditionLinkLabel(slug: ConditionSlug, text: string) {
  if (slug === 'blinded') return text.replace(/Осліплен/iu, 'Засліплен');
  if (slug === 'stunned') return text.replace(/Приголомшен/iu, 'Оглушен');
  if (slug === 'restrained') return text.replace(/Обмежений(?: у русі)?/iu, 'Стримуваний').replace(/Обплутан|Скут/iu, 'Стримуван');
  if (slug === 'prone' && /^Лежач/iu.test(text)) return text.replace(/^Лежач/iu, 'Збит') + ' з ніг';
  return text;
}
