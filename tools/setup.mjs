// Downloads the browser builds this playwright-core expects for the engines in RISO_ENGINES
// (Chromium by default). Skips Chromium when RISO_CHROMIUM_PATH names a binary to use instead.
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { CHECKED } from './lib/browser.mjs';

const builds = CHECKED.flatMap(e =>
  e === 'chromium' ? (process.env.RISO_CHROMIUM_PATH ? [] : ['chromium', 'chromium-headless-shell']) : [e]);
if (!builds.length) {
  console.log(`setup: using RISO_CHROMIUM_PATH=${process.env.RISO_CHROMIUM_PATH}, nothing to download`);
  process.exit(0);
}
// cli.js is not in the package exports; find it next to package.json, as the npm bin does.
const cli = path.join(path.dirname(createRequire(import.meta.url).resolve('playwright-core/package.json')), 'cli.js');
const r = spawnSync(process.execPath, [cli, 'install', ...builds], { stdio: 'inherit' });
process.exit(r.status ?? 1);
