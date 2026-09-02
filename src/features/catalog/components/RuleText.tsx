type RuleTextProps = {
  children: string;
};

const emphasizedTerm = /(Переваг(?:а|у|ою|і)|Невдач(?:а|у|ею|і))/giu;

export function RuleText({ children }: RuleTextProps) {
  return children.split(emphasizedTerm).map((part, index) => {
    if (/^Переваг/iu.test(part)) return <strong className="rules-term-advantage" key={`${part}-${index}`}>{part}</strong>;
    if (/^Невдач/iu.test(part)) return <strong className="rules-term-disadvantage" key={`${part}-${index}`}>{part}</strong>;
    return part;
  });
}
