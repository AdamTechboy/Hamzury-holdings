import Link from 'next/link';
import type { CSSProperties } from 'react';
import { links, ventures } from '@/lib/site';

// Homepage follows the original hamzury layout and lowercase voice:
// hero + assss approach, venture grid, who we are, then portfolio / voices / resources.

const method: [string, string][] = [
  ['awareness', 'understand the situation'],
  ['strategy', 'choose the direction'],
  ['structure', 'put the essentials in place'],
  ['systems', 'make the work repeatable'],
  ['success', 'review the result and next step'],
];

const stories: [string, string, string][] = [
  [
    '/portfolio',
    'work with a story',
    'see the situation, approach, delivery and verified outcome.',
  ],
  ['/voices', 'what people say', 'client and learner experiences, published with permission.'],
  [
    '/resources',
    'reports & useful thinking',
    'read our guidance, reports and downloadable resources.',
  ],
];

const Arrow = () => <span className="arrow">→</span>;

export default function Home() {
  return (
    <div className="home">
      <section className="h-hero">
        <div className="wrap h-hero-grid">
          <div className="h-hero-copy">
            <span className="eyebrow">hamzury holding / business architecture</span>
            <h1>
              understand it.
              <br />
              put it together.
              <br />
              <em>move forward.</em>
            </h1>
            <p className="h-hero-lead">
              a few thoughtful questions. a clearer understanding of your business. a practical next
              step you can choose with confidence.
            </p>
            <div className="actions">
              <Link className="btn" href={links.start}>
                find my next step <Arrow />
              </Link>
              <a className="btn secondary" href={links.track}>
                check my progress <Arrow />
              </a>
            </div>
            <p className="h-hero-note">
              questions that clarify. recommendations that explain. work you can follow.
            </p>
          </div>

          <aside className="h-method" aria-label="the assss approach">
            <span className="eyebrow">the assss approach</span>
            <ol>
              {method.map(([name, text], i) => (
                <li key={name} style={{ '--i': i } as CSSProperties}>
                  <span className="h-method-n">0{i + 1}</span>
                  <strong>{name}</strong>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="h-section">
        <div className="wrap">
          <div className="h-head reveal">
            <span className="eyebrow">different expertise. one business. yours.</span>
            <h2>choose the support you want to explore.</h2>
          </div>
          <div className="h-ventures">
            {ventures.map((v) => (
              <Link
                key={v.id}
                href={`/services/${v.id}`}
                className="h-venture reveal"
                style={{ '--c': v.color } as CSSProperties}
              >
                <img src={v.logo} alt={v.name} loading="lazy" />
                <p>{v.mandate}</p>
                <span className="h-explore">
                  explore {v.name} <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="h-section">
        <div className="wrap h-two">
          <div className="reveal">
            <span className="eyebrow">who we are</span>
            <h2>
              people working together.
              <br />
              businesses moving forward.
            </h2>
            <p className="h-body">
              hamzury holding connects specialist ventures, practical learning and business support.
              our shared method brings a clear reason and next action to the work.
            </p>
            <div className="actions">
              <Link className="btn secondary" href="/about">
                meet hamzury <Arrow />
              </Link>
            </div>
          </div>
          <div className="h-people reveal" aria-label="six ventures, one shared method">
            <div className="h-mosaic" aria-hidden="true">
              {ventures.map((v) => (
                <span key={v.id} style={{ '--c': v.color } as CSSProperties}>
                  {v.name}
                </span>
              ))}
            </div>
            <div className="h-people-caption">
              <span>the people behind the work</span>
              <p>six specialist ventures. one shared method. one team working on your next step.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="h-section">
        <div className="wrap h-stories">
          {stories.map(([href, title, text]) => (
            <Link key={href} href={href} className="h-story reveal">
              <h2>{title}</h2>
              <p>{text}</p>
              <span className="h-explore">
                explore <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
