import Link from 'next/link';
import { hours, links, ventures } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img src="/assets/hamzury.png" alt="Hamzury" width={115} height={20} />
            <p>Six specialist teams. One clear plan for your business.</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {ventures.map((v) => (
                <li key={v.id}>
                  <Link href={`/services/${v.id}`}>{v.category}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Hamzury</Link>
              </li>
              <li>
                <Link href="/#how">How it works</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <a href="https://ridli.org" target="_blank" rel="noopener">
                  ridli.org ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Clients</h4>
            <ul>
              <li>
                <Link href={links.start}>Get started</Link>
              </li>
              <li>
                <a href={links.track}>Track my project</a>
              </li>
              <li>
                <a href={links.desk} target="_blank" rel="noopener">
                  Contact desk ↗
                </a>
              </li>
              <li>
                <a href={links.workspace}>Staff workspace</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Hamzury Holding. All rights reserved.</span>
          <span>{hours}</span>
        </div>
      </div>
    </footer>
  );
}
