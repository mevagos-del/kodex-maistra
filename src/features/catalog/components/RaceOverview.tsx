import ReactMarkdown from 'react-markdown';
import { factIconForLabel } from '../utils/codexIcons';

type RaceOverviewFact = {
  label: string;
  value: string;
};

type RaceOverviewProps = {
  facts: RaceOverviewFact[];
  details: RaceOverviewFact[];
  description?: string | null;
};

export function RaceOverview({ facts, details, description }: RaceOverviewProps) {
  return (
    <section id="race-overview" className="race-detail-overview race-detail-section" aria-labelledby="race-overview-title">
      <h2 id="race-overview-title" className="race-section-title"><span>1.</span> Огляд</h2>

      <dl className="race-detail-overview__facts">
        {facts.map((fact) => (
          <div key={fact.label} className="race-detail-overview__fact">
            <img src={factIconForLabel(fact.label)} alt="" aria-hidden="true" />
            <div>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          </div>
        ))}
      </dl>

      {details.length > 0 ? (
        <dl className="race-detail-overview__details">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {description ? (
        <div className="race-detail-overview__description markdown-content">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      ) : null}
    </section>
  );
}
