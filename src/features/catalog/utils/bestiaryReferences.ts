export type BestiaryInlineReference = {
  slug: string;
  href: string;
  labels: string[];
};

export type BestiaryTextSegment = {
  text: string;
  href?: string;
  slug?: string;
};

export function segmentBestiaryReferences(text: string, references: BestiaryInlineReference[]): BestiaryTextSegment[] {
  const normalizedText = text.toLocaleLowerCase('uk-UA');
  const segments: BestiaryTextSegment[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    let next: { index: number; label: string; reference: BestiaryInlineReference } | null = null;

    for (const reference of references) {
      for (const label of reference.labels) {
        if (!label) continue;
        const index = normalizedText.indexOf(label.toLocaleLowerCase('uk-UA'), cursor);
        if (index < 0) continue;
        if (!next || index < next.index || (index === next.index && label.length > next.label.length)) {
          next = { index, label, reference };
        }
      }
    }

    if (!next) {
      segments.push({ text: text.slice(cursor) });
      break;
    }
    if (next.index > cursor) segments.push({ text: text.slice(cursor, next.index) });
    const end = next.index + next.label.length;
    segments.push({ text: text.slice(next.index, end), href: next.reference.href, slug: next.reference.slug });
    cursor = end;
  }

  return segments.length ? segments : [{ text }];
}
