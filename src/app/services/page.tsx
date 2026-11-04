import type { Metadata } from 'next';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Checks, Cta } from '@/components/Sections';
import { links, ventures } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Registration and compliance, branding and marketing, websites and software, smart hardware, training and grants. Six specialist teams, one plan.',
};

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Services</span>
          <h1>Six teams. One plan for your business.</h1>
          <p className="lead">
            Choose the help you need today. Add more as you grow, and everything stays connected.
          </p>
          <nav className="chips" aria-label="Jump to a service">
            {ventures.map((v) => (
              <a key={v.id} href={`#${v.id}`}>
                {v.category}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section>
        <div className="wrap">
          {ventures.map((v) => (
            <div
              className="service-row reveal"
              id={v.id}
              key={v.id}
              style={{ '--c': v.color } as CSSProperties}
            >
              <div>
                <img className="logo" src={v.logo} alt={v.name} loading="lazy" />
                <div className="cat">{v.category}</div>
                <h2>{v.headline}</h2>
                <p className="lead">{v.summary}</p>
                <div className="actions">
                  <Link className="btn" href={links.startWith(v)}>
                    Get started
                  </Link>
                  <Link className="link" href={`/services/${v.id}`}>
                    Explore {v.name}
                  </Link>
                </div>
              </div>
              <Checks items={v.points} color={v.color} />
            </div>
          ))}
        </div>
      </section>

      <Cta
        title="Not sure where to start?"
        lead="Answer a few questions about your business and we’ll recommend the right first step."
      />
    </>
  );
}
