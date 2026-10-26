import ReactMarkdown from 'react-markdown';
import { factIconForLabel } from '../../utils/codexIcons';

type RaceOverviewFact = {
  label: string;
  value: string;
};

type RaceOverviewProps = {
  facts: RaceOverviewFact[];
  description?: string | null;
};

export function RaceOverview({ facts, description }: RaceOverviewProps) {
  return (
    <section id="race-overview" className="race-archive-section race-archive-overview" aria-labelledby="race-overview-title">
      <h2 id="race-overview-title" className="race-archive-section__title"><span>1.</span> Огляд</h2>

      <dl className="race-archive-overview__facts">
        {facts.map((fact) => (
          <div key={fact.label} className="race-archive-overview__fact">
            <img src={factIconForLabel(fact.label)} alt="" aria-hidden="true" />
            <div>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          </div>
        ))}
      </dl>

      {description ? (
        <div className="race-archive-overview__description markdown-content">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      ) : null}
    </section>
  );
}
