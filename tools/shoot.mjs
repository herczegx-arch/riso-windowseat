/**
 * Shoot stills from a film at exact times, and optionally compose a contact sheet.
 *
 *   node shoot.mjs <film.html> --times 0.3,1.8,3.0
 *   node shoot.mjs <film.html> --range 13.4:14.4:0.25 --sheet
 *   node shoot.mjs <film.html> --around 6.0 --window 0.5 --step 0.25 --sheet
 *   node shoot.mjs <film.html> --engine chromium --size 1080
 *
 * Times come from window.__riso.seek(t), so a still is the exact frame the
 * renderer produces at t -- not a realtime sample that may have drifted.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { launch, openFilm, frameAt, parseTimes, args } from './lib/browser.mjs';

const a = args(process.argv.slice(2));
const film = a._[0];
if (!film) { console.error('usage: node shoot.mjs <film.html> [--times|--range|--around] [--sheet]'); process.exit(1); }

const size = Number(a.size || 1080);
const engine = a.engine || 'chromium';
const outDir = path.resolve(a.out || path.join('..', 'out', path.basename(path.dirname(path.resolve(film)))));
fs.mkdirSync(outDir, { recursive: true });

const browser = await launch(engine);
const { page, duration, errors } = await openFilm(browser, film, { size, css: Number(a.css || 720), query: a.query || '' });

let times;
if (a.around !== undefined) {
  const c = Number(a.around), w = Number(a.window || 0.5), s = Number(a.step || 0.25);
  times = parseTimes({ range: `${(c - w).toFixed(4)}:${(c + w).toFixed(4)}:${s}` }, duration);
} else {
  times = parseTimes(a, duration);
}
times = times.filter(t => t >= 0 && t <= duration);

const shots = [];
for (const t of times) {
  const name = `t_${t.toFixed(3).padStart(7, '0')}.png`;
  fs.writeFileSync(path.join(outDir, name), await frameAt(page, t));
  shots.push({ t, name });
  process.stdout.write(`  ${name}\n`);
}

if (a.sheet && shots.length) {
  const cols = Number(a.cols || Math.min(8, Math.ceil(Math.sqrt(shots.length))));
  const cell = Number(a.cell || 220);
  const rows = Math.ceil(shots.length / cols);
  const html = `<!doctype html><meta charset=utf-8><style>
    body{margin:0;background:#1b1b1b;font:11px ui-monospace,monospace;color:#bbb}
    .g{display:grid;grid-template-columns:repeat(${cols},${cell}px);gap:6px;padding:6px}
    figure{margin:0}img{width:${cell}px;height:${cell}px;display:block;background:#000}
    figcaption{text-align:center;padding:2px 0}</style>
    <div class=g>${shots.map(s =>
      `<figure><img src="${s.name}"><figcaption>${s.t.toFixed(2)}s</figcaption></figure>`).join('')}</div>`;
  const sheetHtml = path.join(outDir, '_sheet.html');
  fs.writeFileSync(sheetHtml, html);
  const sp = await browser.newPage({
    viewport: { width: cols * (cell + 6) + 6, height: rows * (cell + 22) + 6 },
  });
  await sp.goto(pathToFileURL(sheetHtml).href, { waitUntil: 'load' });
  const sheetPath = path.join(outDir, a.sheetName || 'sheet.png');
  await sp.screenshot({ path: sheetPath, fullPage: true });
  console.log(`sheet -> ${sheetPath}`);
}

if (errors.length) console.error(`\n!! ${errors.length} page error(s):\n - ${errors.slice(0, 10).join('\n - ')}`);
console.log(`${shots.length} still(s) -> ${outDir}`);
await browser.close();
