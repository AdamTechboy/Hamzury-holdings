import type { Metadata } from 'next';
import { Cta, SectionHead, VentureTiles } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hamzury Holding brings six specialist ventures together around one practical method: understand the business, agree the priorities, put the essentials in place and deliver results.',
};

const approach = [
  [
    'Awareness',
    'We understand your situation first: your business, customers, goals and what you already have.',
  ],
  ['Strategy', 'We agree the priorities with you, and explain why each one matters now.'],
  [
    'Structure',
    'We put the essentials in place: clear scope, owners, timeline and approved price.',
  ],
  ['Systems', 'We make the work repeatable, with tools and routines your business can keep using.'],
  [
    'Success',
    'We check the result against what was agreed, gather your feedback and suggest the next useful step.',
  ],
];

const standards = [
  [
    'A named owner for your work',
    'Every task has a responsible person and a reviewer. You always know who is on it.',
  ],
  [
    'Updates at least every 48 hours',
    'What’s done, what’s happening, what we need from you, and when you’ll hear next.',
  ],
  [
    'Quality checked before delivery',
    'Work is reviewed against the agreed result before it reaches you, never just marked as done.',
  ],
  [
    'Honest recommendations',
    'We only suggest what applies to your business. Grants and approvals are never promised when they aren’t ours to give.',
  ],
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">About Hamzury</span>
          <h1>We help businesses get put together.</h1>
          <p className="lead">
            Hamzury Holding brings six specialist ventures together under one practical method. We
            take the time to understand your situation, recommend what actually matters, and deliver
            it with you.
          </p>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead
            eyebrow="Our approach"
            title="Five steps. Every project."
            lead="Whether it’s a registration or a full growth programme, every piece of work follows the same path."
          />
          <ol className="approach">
            {approach.map(([name, text]) => (
              <li className="reveal" key={name}>
                <b>{name}</b>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our standards" title="What you can count on." />
          <div className="features">
            {standards.map(([title, text]) => (
              <div className="feature reveal" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Growing talent</span>
            <h2>Building the next generation.</h2>
          </div>
          <p className="lead reveal" style={{ margin: 0 }}>
            Through hamzury hub, learners gain practical skills on supervised, real projects, then
            progress into junior roles, paid projects, employment or businesses of their own.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Our ventures">
        <div className="wrap">
          <SectionHead eyebrow="Our ventures" title="Meet the teams." />
          <VentureTiles />
        </div>
      </section>

      <Cta title="Let’s build what’s next." />
    </>
  );
}
