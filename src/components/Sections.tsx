import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { faqs, links, steps, ventures, type Venture } from '@/lib/site';

const accent = (color: string) => ({ '--c': color }) as CSSProperties;

export function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function VentureTile({ v }: { v: Venture }) {
  return (
    <Link className="tile reveal" href={`/services/${v.id}`} style={accent(v.color)}>
      <img src={v.logo} alt={v.name} loading="lazy" />
      <div className="cat">{v.category}</div>
      <h3>{v.headline}</h3>
      <p>{v.summary}</p>
      <span className="link">Learn more</span>
    </Link>
  );
}

export function VentureTiles({ exclude }: { exclude?: string }) {
  return (
    <div className="tiles">
      {ventures
        .filter((v) => v.id !== exclude)
        .map((v) => (
          <VentureTile key={v.id} v={v} />
        ))}
    </div>
  );
}

export function Logos() {
  return (
    <div className="logos">
      {ventures.map((v) => (
        <Link key={v.id} href={`/services/${v.id}`}>
          <img src={v.logo} alt={`${v.name}: ${v.category}`} loading="lazy" />
        </Link>
      ))}
    </div>
  );
}

export function Steps() {
  return (
    <div className="steps">
      {steps.map(([title, text]) => (
        <div className="step reveal" key={title}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <div className="faq">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function Checks({ items, color }: { items: string[]; color?: string }) {
  return (
    <ul className="checks reveal" style={color ? accent(color) : undefined}>
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );
}

export function Cta({
  title,
  lead,
  href = links.start,
  alt = true,
}: {
  title: string;
  lead?: string;
  href?: string;
  alt?: boolean;
}) {
  return (
    <section className={`section cta${alt ? ' alt' : ''}`}>
      <div className="wrap reveal">
        <h2>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
        <div className="actions center">
          <Link className="btn" href={href}>
            Get started
          </Link>
          <Link className="link" href="/contact">
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}

type Row = { n: string; color: string; title: string; sub: string; tag?: [string, string] };

function MockRows({ rows }: { rows: Row[] }) {
  return rows.map((r) => (
    <div className="mock-row" key={r.title}>
      <span className="dot" style={{ background: r.color }}>
        {r.n}
      </span>
      <div>
        <b>{r.title}</b>
        <span className="small">{r.sub}</span>
      </div>
      {r.tag && <span className={`tag ${r.tag[1]}`}>{r.tag[0]}</span>}
    </div>
  ));
}

/** Illustration of a client roadmap. Clearly labelled as an example. */
export function RoadmapMock() {
  return (
    <div className="mock" aria-label="Example of a client roadmap">
      <div className="mock-top">
        <div>
          <span className="small">Your roadmap · example</span>
          <br />
          <b>Amina’s Kitchen</b>
        </div>
        <span className="tag">HZ-2048</span>
      </div>
      <div className="small">Overall progress · 45%</div>
      <div className="meter">
        <i />
      </div>
      <MockRows
        rows={[
          {
            n: '✓',
            color: '#18875b',
            title: 'Company registration',
            sub: 'bizdoc',
            tag: ['Done', 'done'],
          },
          {
            n: '2',
            color: '#c63645',
            title: 'Brand kit & business profile',
            sub: 'medialy',
            tag: ['In progress', 'now'],
          },
          {
            n: '3',
            color: '#2466bf',
            title: 'Website with enquiry tracking',
            sub: 'subt',
            tag: ['Up next', ''],
          },
        ]}
      />
      <div className="mock-foot">
        <span className="pulse" /> Next update from your team within 48 hours
      </div>
    </div>
  );
}

export function UpdateMock() {
  return (
    <div className="mock reveal" aria-label="Example project update">
      <div className="mock-top">
        <div>
          <span className="small">Latest update · example</span>
          <br />
          <b>Brand kit</b>
        </div>
        <span className="tag now">In progress</span>
      </div>
      <MockRows
        rows={[
          { n: '✓', color: '#12693f', title: 'Completed', sub: 'Logo concepts and colour palette' },
          { n: '→', color: '#8a5300', title: 'Happening now', sub: 'Business profile copy' },
          { n: '?', color: '#5f5f66', title: 'Needed from you', sub: 'Photos of your work' },
        ]}
      />
      <div className="mock-foot">
        <span className="pulse" /> Next update due Thursday
      </div>
    </div>
  );
}

const icon = {
  width: 36,
  height: 36,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const Icons = {
  people: (
    <svg {...icon}>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M15 14.3c2.6-.3 4.8 1.2 5.5 4.2" />
    </svg>
  ),
  document: (
    <svg {...icon}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5M9 13h7M9 17h5" />
    </svg>
  ),
  clock: (
    <svg {...icon}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  ),
  check: (
    <svg {...icon}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  ),
};
