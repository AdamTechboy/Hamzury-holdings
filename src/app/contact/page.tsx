import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, SectionHead } from '@/components/Sections';
import { hours, links } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start with a few questions, track an existing project, or reach the Hamzury desk.',
};

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Contact</span>
          <h1>Let’s talk about your business.</h1>
          <p className="lead">Choose the option that fits. We’ll take it from there.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="options">
            <div className="option primary reveal">
              <span className="tag">Recommended</span>
              <h3>Start with a few questions</h3>
              <p>
                Tell us about your business and goals. Our team reviews your answers and recommends
                a clear first step.
              </p>
              <Link className="btn light" href={links.start}>
                Get started
              </Link>
            </div>
            <div className="option reveal">
              <h3>Track a project</h3>
              <p>Already working with us? Use your client reference to see progress and updates.</p>
              <a className="btn ghost" href={links.track}>
                Track my project
              </a>
            </div>
            <div className="option reveal">
              <h3>Contact our desk</h3>
              <p>
                A question about a service, a partnership or something else? Reach our team
                directly.
              </p>
              <a className="btn ghost" href={links.desk} target="_blank" rel="noopener">
                Open contact desk ↗
              </a>
            </div>
          </div>
          <p className="notice">Working hours: {hours}</p>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead eyebrow="Questions" title="Before you get in touch." />
          <Faq />
        </div>
      </section>
    </>
  );
}
