import Link from 'next/link';
import { hours, links } from '@/lib/site';

const footerLinks: [string, string, boolean?][] = [
  ['/about', 'who we are'],
  ['/services', 'services'],
  ['/portfolio', 'portfolio'],
  ['/voices', 'what people say'],
  ['/resources', 'reports & resources'],
  [links.track, 'check my progress'],
  [links.desk, 'contact us ↗', true],
  ['https://ridli.org', 'ridli.org ↗', true],
  [links.workspace, 'workspace'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div>
          <img src="/assets/hamzury.png" alt="hamzury holding" width={138} height={24} />
          <span className="foot-method">awareness / strategy / structure / systems / success</span>
          <p>one institution. specialist support. clear next steps.</p>
        </div>
        <nav className="foot-links" aria-label="Footer">
          {footerLinks.map(([href, label, external]) =>
            external || href.startsWith('/app.html') ? (
              <a key={label} href={href} {...(external && { target: '_blank', rel: 'noopener' })}>
                {label}
              </a>
            ) : (
              <Link key={label} href={href}>
                {label}
              </Link>
            ),
          )}
        </nav>
      </div>
      <div className="wrap foot-base">
        <span>© {new Date().getFullYear()} hamzury holding</span>
        <span>{hours.toLowerCase()}</span>
      </div>
    </footer>
  );
}
