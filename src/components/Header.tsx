'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { links } from '@/lib/site';

const nav = [
  { href: '/services', label: 'Services' },
  { href: '/#how', label: 'How it works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap nav">
          <Link className="nav-logo" href="/">
            <img src="/assets/hamzury.png" alt="Hamzury home" width={127} height={22} />
          </Link>
          <nav className={`nav-links${open ? ' open' : ''}`} id="nav-links" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  pathname.startsWith(item.href) && item.href !== '/#how' ? 'page' : undefined
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={links.track}>Track my project</a>
          </nav>
          {pathname !== '/start' && (
            <Link className="btn btn-sm" href={links.start}>
              Get started
            </Link>
          )}
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
