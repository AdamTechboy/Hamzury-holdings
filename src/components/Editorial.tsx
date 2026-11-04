import Link from 'next/link';
import { links } from '@/lib/site';

/** Simple page for sections whose content (case studies, testimonials, reports) is still being prepared. */
export default function Editorial({
  eyebrow,
  title,
  text,
  pending,
}: {
  eyebrow: string;
  title: string;
  text: string;
  pending: string;
}) {
  return (
    <section className="page-hero" style={{ textAlign: 'left' }}>
      <div className="wrap" style={{ maxWidth: 860 }}>
        <span className="eyebrow">{eyebrow}</span>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <p className="lead" style={{ marginLeft: 0 }}>
          {text}
        </p>
        <p className="notice" style={{ textAlign: 'left', marginTop: 36 }}>
          {pending}
        </p>
        <div className="actions">
          <Link className="btn" href={links.start}>
            find my next step <span className="arrow">→</span>
          </Link>
          <Link className="btn secondary" href="/">
            back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
