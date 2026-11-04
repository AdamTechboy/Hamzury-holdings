import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { Checks, Cta, SectionHead, Steps, VentureTiles } from '@/components/Sections';
import { offers } from '@/lib/offers';
import { links, tidy, tiers, ventureById, ventures } from '@/lib/site';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => ventures.map((v) => ({ id: v.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = ventureById((await params).id);
  return v ? { title: `${v.name} · ${v.category}`, description: v.summary } : {};
}

export default async function VenturePage({ params }: Props) {
  const v = ventureById((await params).id);
  if (!v) notFound();
  const packages = offers.filter((o) => o.venture === v.name).sort((a, b) => a.level - b.level);
  const style = { '--c': v.color } as CSSProperties;

  return (
    <div style={style}>
      <section className="venture-hero">
        <div className="wrap">
          <img className="logo" src={v.logo} alt={v.name} />
          <div className="cat">{v.category}</div>
          <h1>{v.headline}</h1>
          <p className="lead">{v.summary}</p>
          <div className="actions center">
            <Link className="btn" href={links.startWith(v)}>
              Get started with {v.name}
            </Link>
            <a className="link" href="#packages">
              See what’s included
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">What you get</span>
            <h2>Built around your business.</h2>
            <p className="lead">
              We start by understanding where you are, then recommend only what fits. No unnecessary
              extras.
            </p>
          </div>
          <Checks items={v.points} color={v.color} />
        </div>
      </section>

      <section className="section alt" id="packages">
        <div className="wrap">
          <SectionHead eyebrow="Packages" title="Start small. Grow when you’re ready." />
          <div className="packages">
            {packages.map((o) => (
              <article className="package reveal" key={o.id}>
                <div className="tier">{tiers[o.level]}</div>
                <h3>{tidy(o.title)}</h3>
                <p>{tidy(o.scope)}</p>
                <dl>
                  <dt>You receive</dt>
                  <dd>{tidy(o.deliver)}</dd>
                  <dt>We’ll need from you</dt>
                  <dd>{tidy(o.req)}</dd>
                </dl>
                <Link className="link package-cta" href={`${links.startWith(v)}&package=${o.id}`}>
                  Request a quote
                </Link>
              </article>
            ))}
          </div>
          <p className="notice">
            Your price and timeline are confirmed in a written quote before any work begins.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="Four simple steps." />
          <Steps />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="One plan, six teams"
            title={`Need more than ${v.name}?`}
            lead="Every Hamzury team works from the same plan, so your next step is always connected."
          />
          <VentureTiles exclude={v.id} />
        </div>
      </section>

      <Cta
        alt={false}
        href={links.startWith(v)}
        title="Ready when you are."
        lead={`Answer a few questions and get a clear recommendation from the ${v.name} team.`}
      />
    </div>
  );
}
