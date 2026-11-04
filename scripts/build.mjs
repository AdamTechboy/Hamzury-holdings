// Builds the deployable site: runs the checks, then copies src/ into a fresh dist/.
// The site is plain HTML/CSS/JS, so no compilation is needed; the host compresses files.
import { execFileSync } from 'node:child_process';
import { cp, rm } from 'node:fs/promises';

execFileSync(process.execPath, ['scripts/check.mjs'], { stdio: 'inherit' });

await rm('dist', { recursive: true, force: true });
await cp('src', 'dist', { recursive: true });

console.log('built dist/');
