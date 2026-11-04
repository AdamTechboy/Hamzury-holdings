// Loaded first in app.html. The app's old public pages now live on the corporate site,
// so send those routes there. App routes (form, client, access, workspace, ...) are untouched.
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
    const [page, arg] = location.hash.slice(1).split('?')[0].split('/');
    if (!page || page === 'home') return 'index.html';
    if (page === 'about') return 'about.html';
    if (['portfolio', 'voices', 'resources'].includes(page)) return 'index.html';
    if (page === 'venture-page') {
      const id = ids[decodeURIComponent(arg || '')];
      return id ? 'venture.html?v=' + id : 'services.html';
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
