// Dev server: serves a folder and reloads open pages when files change.
// Usage: node scripts/dev.mjs [dir] [port] [--no-reload]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const ROOT = resolve(args[0] || 'src');
const PORT = Number(args[1] || 8000);
const LIVE = !process.argv.includes('--no-reload');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

const RELOAD_SNIPPET = `<script>new EventSource('/__reload').onmessage=()=>location.reload()</script>`;
const clients = new Set();

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);

  if (path === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let file = normalize(join(ROOT, path));
  if (!file.startsWith(ROOT)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    let body = await readFile(file);
    const type = TYPES[extname(file)] || 'application/octet-stream';
    if (LIVE && extname(file) === '.html') {
      body = body.toString().replace('</body>', `${RELOAD_SNIPPET}</body>`);
    }
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found');
  }
})
  .on('error', (err) => {
    if (err.code !== 'EADDRINUSE') throw err;
    console.error(
      `port ${PORT} is already in use. Stop the other server (or close its terminal), ` +
        `or pick another port: node scripts/dev.mjs ${args[0] || 'src'} ${PORT + 1}`,
    );
    process.exit(1);
  })
  .listen(PORT, () => {
    console.log(`serving ${ROOT} at http://localhost:${PORT}`);
  });

if (LIVE) {
  let timer;
  watch(ROOT, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => clients.forEach((c) => c.write('data: reload\n\n')), 100);
  });
}
