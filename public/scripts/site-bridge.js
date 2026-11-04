// Loaded first in app.html. The app's old public pages now live on the Next.js site, so send
// those routes there. New discovery forms go to /start, which saves enquiries for real
// (the app's own form only keeps answers in the visitor's browser).
// Other app routes (client, access, workspace, ...) are untouched.
(function () {
  const ids = {
    bizdoc: 'bizdoc',
    medialy: 'medialy',
    subt: 'subt',
    iotics: 'iotics',
    'hamzury hub': 'hub',
    iwiin: 'iwiin',
  };
  function target() {
    const [path, query] = location.hash.slice(1).split('?');
    const [page, arg, mode] = path.split('/');
    if (!page || page === 'home') return '/';
    if (page === 'about') return '/about';
    if (['portfolio', 'voices', 'resources'].includes(page)) return '/';
    if (page === 'venture-page') {
      const id = ids[decodeURIComponent(arg || '')];
      return id ? '/services/' + id : '/services';
    }
    if (page === 'form' && mode === 'new') {
      const source = new URLSearchParams(query || '').get('source') || '';
      const id = ids[source.replace(/ website$/, '')];
      return id ? '/start?service=' + id : '/start';
    }
    return null;
  }
  function redirect() {
    const url = target();
    if (url) location.replace(url);
  }
  redirect();
  window.addEventListener('hashchange', redirect);
})();
