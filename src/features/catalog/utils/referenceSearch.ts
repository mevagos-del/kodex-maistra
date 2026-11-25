// Add only verified alternative names. Keys are canonical English slugs.
export const REFERENCE_SEARCH_ALIASES: Record<string, readonly string[]> = {
  fireball: ['вогняна куля'],
};

export function normalizeReferenceSearch(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('uk-UA')
    .replace(/[’ʼ`']/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim().replace(/\s+/g, ' ');
}

export type SearchIdentity = { nameUk: string; nameOriginal?: string | null; slug?: string };

export function referenceSearchScore(identity: SearchIdentity, query: string): number {
  const needle = normalizeReferenceSearch(query);
  if (!needle) return 0;
  const names = [identity.nameUk, identity.nameOriginal].filter((value): value is string => Boolean(value))
    .map(normalizeReferenceSearch);
  const aliases = (identity.slug ? REFERENCE_SEARCH_ALIASES[identity.slug] ?? [] : []).map(normalizeReferenceSearch);
  if (names.includes(needle)) return 5;
  if (aliases.includes(needle)) return 4;
  if ([...names, ...aliases].some((name) => name.startsWith(needle))) return 3;
  const words = needle.split(' ');
  if ([...names, ...aliases].some((name) => {
    const tokens = name.split(' ');
    return words.every((word) => tokens.some((token) => token.startsWith(word)));
  })) return 2;
  if (needle.length >= 3 && [...names, ...aliases].some((name) => name.includes(needle))) return 1;
  return 0;
}

export function searchReferences<T>(entries: readonly T[], query: string, identity: (entry: T) => SearchIdentity, preserveOrder = false): T[] {
  if (!normalizeReferenceSearch(query)) return [...entries];
  const matches = entries.map((entry, index) => ({ entry, index, score: referenceSearchScore(identity(entry), query) }))
    .filter(({ score }) => score > 0);
  if (!preserveOrder) matches.sort((a, b) => b.score - a.score || a.index - b.index);
  return matches.map(({ entry }) => entry);
}
