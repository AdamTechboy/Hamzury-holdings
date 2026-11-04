// Sanity check for the legacy app in public/: every script parses and every local file a page links to exists.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'public';
let failed = false;

for (const file of readdirSync(join(SRC, 'scripts'))) {
  try {
    execFileSync(process.execPath, ['--check', join(SRC, 'scripts', file)], { stdio: 'pipe' });
  } catch (err) {
    failed = true;
    console.error(`syntax error in scripts/${file}\n${err.stderr}`);
  }
}

for (const page of readdirSync(SRC).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(join(SRC, page), 'utf8');
  // Local links only: skip external (https:, mailto:) and in-page (#) links.
  for (const [, ref] of html.matchAll(/(?:src|href)="(?![a-z]+:)([^"#?]+)/g)) {
    if (!existsSync(join(SRC, ref))) {
      failed = true;
      console.error(`${page}: missing ${ref}`);
    }
  }
}

if (failed) process.exit(1);
console.log('check passed');
