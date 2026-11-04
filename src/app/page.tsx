import Link from 'next/link';
import {
  Cta,
  Faq,
  Icons,
  Logos,
  RoadmapMock,
  SectionHead,
  Steps,
  UpdateMock,
  VentureTiles,
} from '@/components/Sections';
import { links } from '@/lib/site';

const features = [
  {
    icon: Icons.people,
    title: 'One partner, six specialists',
    text: 'Registration, branding, software, smart hardware, training and funding, all coordinated so nothing falls between the cracks.',
  },
  {
    icon: Icons.document,
    title: 'Clear before you commit',
    text: 'You see the scope, timeline and price in writing before you pay. Third-party fees are listed separately. No surprises.',
  },
  {
    icon: Icons.clock,
    title: 'Never left wondering',
    text: 'You hear from us at least every 48 hours: what’s done, what’s happening and anything we need from you.',
  },
  {
    icon: Icons.check,
    title: 'Only what you need',
    text: 'We check what you already have and what actually applies to you. Nothing is recommended just to fill a package.',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="eyebrow">Hamzury Holding</span>
          <h1>
            Your business,
            <br />
            put together.
          </h1>
          <p className="lead">
            Registration, branding, software, training and funding support, planned around your
            goals and delivered by one team of specialists.
          </p>
          <div className="actions center">
            <Link className="btn" href={links.start}>
              Get started
            </Link>
            <Link className="link" href="#how">
              See how it works
            </Link>
          </div>
          <p className="note">Answer a few questions. Get a clear plan. No commitment.</p>
          <div className="hero-visual reveal">
            <RoadmapMock />
          </div>
        </div>
      </section>

      <section className="section alt slim" aria-label="Our ventures">
        <div className="wrap">
          <p className="small" style={{ textAlign: 'center', marginBottom: 28 }}>
            Six specialist teams under one roof
          </p>
          <Logos />
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="What we do"
            title="Everything your business needs. In one place."
            lead="Pick a single service or let us plan the full journey. Either way, every team works from the same plan."
          />
          <VentureTiles />
        </div>
      </section>

      <section className="section alt" id="how">
        <div className="wrap">
          <SectionHead
            eyebrow="How it works"
            title="Simple from the first question."
            lead="You always know what happens next, what it costs and who is on it."
          />
          <Steps />
          <div className="actions center">
            <Link className="btn" href={links.start}>
              Start with a few questions
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Why Hamzury" title="Clarity at every step." />
          <div className="features">
            {features.map((f) => (
              <div className="feature reveal" key={f.title}>
                {f.icon}
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap split">
          <div className="reveal">
            <span className="eyebrow">Your client portal</span>
            <h2>Always know where things stand.</h2>
            <p className="lead">
              Use your client reference to see your plan, what’s finished, what’s next and anything
              we need from you, at any time.
            </p>
            <div className="actions">
              <a className="btn light" href={links.track}>
                Track my project
              </a>
            </div>
          </div>
          <UpdateMock />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead eyebrow="Questions" title="Good to know." />
          <Faq />
        </div>
      </section>

      <Cta
        alt={false}
        title="Your next step starts here."
        lead="Tell us about your business. We’ll come back with a clear, practical plan."
      />
    </>
  );
}
