'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { links } from '@/lib/site';

/** Fades in every `.reveal` element as it scrolls into view. Re-runs on navigation. */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}

/** Phone-only call to action that slides up once the page's first `.actions` row scrolls away. */
export function StickyCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    const first = document.querySelector('main .actions');
    if (!first || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) =>
      setShow(!e.isIntersecting && e.boundingClientRect.top < 0),
    );
    io.observe(first);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === '/start') return null;
  return (
    <div className={`sticky-cta${show ? ' show' : ''}`} aria-hidden={!show}>
      <Link className="btn" href={links.start} tabIndex={show ? 0 : -1}>
        my next step →
      </Link>
      <a className="btn ghost" href={links.track} tabIndex={show ? 0 : -1}>
        my progress
      </a>
    </div>
  );
}
