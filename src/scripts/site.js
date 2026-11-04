// Public site: shared header/footer and the sections rendered from SITE (site-data.js).
// Pages mark placeholders with data-render="<name>"; see renderers below.

(function () {
  const { links, ventures, steps, faqs, tiers, tidy } = window.SITE;
  const esc = (s) =>
    String(s ?? '').replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  const page = document.body.dataset.page;
  document.documentElement.classList.add('js');

  const ventureUrl = (v) => `venture.html?v=${v.id}`;

  const header = () => {
    const nav = [
      ['services.html', 'Services', 'services'],
      ['index.html#how', 'How it works', ''],
      ['about.html', 'About', 'about'],
      ['contact.html', 'Contact', 'contact'],
      [links.track, 'Track my project', ''],
    ];
    return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap nav">
  <a class="nav-logo" href="index.html"><img src="assets/hamzury.png" alt="Hamzury home" width="127" height="22"></a>
  <nav class="nav-links" id="nav-links" aria-label="Main">
    ${nav.map(([href, label, id]) => `<a href="${href}"${id && id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
  </nav>
  <a class="btn btn-sm" href="${links.start}">Get started</a>
  <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg>
  </button>
</div></header>`;
  };

  const footer = () => `<footer class="site-footer"><div class="wrap">
  <div class="footer-grid">
    <div><img src="assets/hamzury.png" alt="Hamzury" width="115" height="20"><p>Six specialist teams. One clear plan for your business.</p></div>
    <div><h4>Services</h4><ul>${ventures.map((v) => `<li><a href="${ventureUrl(v)}">${esc(v.category)}</a></li>`).join('')}</ul></div>
    <div><h4>Company</h4><ul>
      <li><a href="about.html">About Hamzury</a></li>
      <li><a href="index.html#how">How it works</a></li>
      <li><a href="contact.html">Contact</a></li>
      <li><a href="https://ridli.org" target="_blank" rel="noopener">ridli.org ↗</a></li>
    </ul></div>
    <div><h4>Clients</h4><ul>
      <li><a href="${links.start}">Get started</a></li>
      <li><a href="${links.track}">Track my project</a></li>
      <li><a href="${links.desk}" target="_blank" rel="noopener">Contact desk ↗</a></li>
      <li><a href="${links.workspace}">Staff workspace</a></li>
    </ul></div>
  </div>
  <div class="footer-base"><span>© ${new Date().getFullYear()} Hamzury Holding. All rights reserved.</span><span>${esc(window.SITE.hours)}</span></div>
</div></footer>
<div class="sticky-cta" aria-hidden="true"><a class="btn" href="${links.start}" tabindex="-1">Get started</a><a class="btn ghost" href="${links.track}" tabindex="-1">Track project</a></div>`;

  const tile = (v) =>
    `<a class="tile reveal" href="${ventureUrl(v)}" style="--c:${v.color}">
      <img src="${v.logo}" alt="${esc(v.name)}" loading="lazy">
      <div class="cat">${esc(v.category)}</div>
      <h3>${esc(v.headline)}</h3>
      <p>${esc(v.summary)}</p>
      <span class="link">Learn more</span>
    </a>`;

  const renderers = {
    tiles: () => ventures.map(tile).join(''),

    logos: () =>
      ventures
        .map(
          (v) =>
            `<a href="${ventureUrl(v)}"><img src="${v.logo}" alt="${esc(v.name)}: ${esc(v.category)}" loading="lazy"></a>`,
        )
        .join(''),

    steps: () =>
      steps
        .map(([t, p]) => `<div class="step reveal"><h3>${esc(t)}</h3><p>${esc(p)}</p></div>`)
        .join(''),

    faq: () =>
      faqs
        .map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)
        .join(''),

    chips: () => ventures.map((v) => `<a href="#${v.id}">${esc(v.category)}</a>`).join(''),

    services: () =>
      ventures
        .map(
          (v) => `<div class="service-row reveal" id="${v.id}" style="--c:${v.color}">
      <div>
        <img class="logo" src="${v.logo}" alt="${esc(v.name)}" loading="lazy">
        <div class="cat">${esc(v.category)}</div>
        <h2>${esc(v.headline)}</h2>
        <p class="lead">${esc(v.summary)}</p>
        <div class="actions"><a class="btn" href="${links.startWith(v)}">Get started</a><a class="link" href="${ventureUrl(v)}">Explore ${esc(v.name)}</a></div>
      </div>
      <ul class="checks">${v.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
    </div>`,
        )
        .join(''),

    venture: () => {
      const id = new URLSearchParams(location.search).get('v');
      const v = ventures.find((x) => x.id === id) || ventures[0];
      document.title = `${v.name} · ${v.category} · Hamzury`;
      document.body.style.setProperty('--c', v.color);
      const offers = (window.offerSeed || [])
        .filter((o) => o.v === v.name)
        .sort((a, b) => a.level - b.level);
      const others = ventures.filter((x) => x !== v);
      return `<section class="venture-hero" style="--c:${v.color}"><div class="wrap">
        <img class="logo" src="${v.logo}" alt="${esc(v.name)}">
        <div class="cat">${esc(v.category)}</div>
        <h1>${esc(v.headline)}</h1>
        <p class="lead">${esc(v.summary)}</p>
        <div class="actions center"><a class="btn" href="${links.startWith(v)}">Get started with ${esc(v.name)}</a><a class="link" href="#packages">See what’s included</a></div>
      </div></section>

      <section class="section"><div class="wrap split">
        <div class="reveal"><span class="eyebrow">What you get</span><h2>Built around your business.</h2><p class="lead">We start by understanding where you are, then recommend only what fits. No unnecessary extras.</p></div>
        <ul class="checks reveal" style="--c:${v.color}">${v.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      </div></section>

      <section class="section alt" id="packages"><div class="wrap">
        <div class="section-head reveal"><span class="eyebrow">Packages</span><h2>Start small. Grow when you’re ready.</h2></div>
        <div class="packages">${offers
          .map(
            (o) => `<article class="package reveal" style="--c:${v.color}">
              <div class="tier">${esc(tiers[o.level] || '')}</div>
              <h3>${esc(tidy(o.title))}</h3>
              <p>${esc(tidy(o.scope))}</p>
              <dl><dt>You receive</dt><dd>${esc(tidy(o.deliver))}</dd><dt>We’ll need from you</dt><dd>${esc(tidy(o.req))}</dd></dl>
              <a class="link package-cta" href="${links.startWith(v)}">Request a quote</a>
            </article>`,
          )
          .join('')}</div>
        <p class="notice">Your price and timeline are confirmed in a written quote before any work begins.</p>
      </div></section>

      <section class="section"><div class="wrap">
        <div class="section-head reveal"><span class="eyebrow">How it works</span><h2>Four simple steps.</h2></div>
        <div class="steps">${renderers.steps()}</div>
      </div></section>

      <section class="section alt"><div class="wrap">
        <div class="section-head reveal"><span class="eyebrow">One plan, six teams</span><h2>Need more than ${esc(v.name)}?</h2><p class="lead">Every Hamzury team works from the same plan, so your next step is always connected.</p></div>
        <div class="tiles">${others.map(tile).join('')}</div>
      </div></section>

      <section class="section cta"><div class="wrap reveal">
        <h2>Ready when you are.</h2>
        <p class="lead">Answer a few questions and get a clear recommendation from the ${esc(v.name)} team.</p>
        <div class="actions center"><a class="btn" href="${links.startWith(v)}">Get started</a><a class="link" href="contact.html">Talk to us</a></div>
      </div></section>`;
    },
  };

  document.body.insertAdjacentHTML('afterbegin', header());
  document.body.insertAdjacentHTML('beforeend', footer());
  document.querySelectorAll('[data-render]').forEach((el) => {
    el.innerHTML = renderers[el.dataset.render]();
  });
  document.querySelectorAll('[data-link]').forEach((el) => {
    el.href = links[el.dataset.link];
  });

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-links');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
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
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Mobile sticky call to action appears once the first call to action scrolls away
  const sticky = document.querySelector('.sticky-cta');
  const firstCta = document.querySelector('main .actions');
  if (firstCta && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      const show = !e.isIntersecting && e.boundingClientRect.top < 0;
      sticky.classList.toggle('show', show);
      sticky.setAttribute('aria-hidden', String(!show));
      sticky.querySelectorAll('a').forEach((a) => (a.tabIndex = show ? 0 : -1));
    }).observe(firstCta);
  }
})();
