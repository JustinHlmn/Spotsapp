#!/usr/bin/env node
/* Alle Prüfungen auf einmal – vor jedem Hochladen laufen lassen:
     node tests/run.js            (alles)
     node tests/run.js crew menue (nur diese Tests)
   Braucht: npm i -D playwright  (und einmal: npx playwright install chromium)
   Optional: CHROME_PATH=/pfad/zu/chromium, wenn ein anderes Chromium genutzt werden soll. */
const http = require('http'), fs = require('fs'), path = require('path'), { spawnSync, spawn } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const red = s => `\x1b[31m${s}\x1b[0m`, green = s => `\x1b[32m${s}\x1b[0m`;
let failed = 0;
const fail = (name, why) => { failed++; console.log(red('✗ ' + name) + (why ? '\n   ' + why.split('\n').slice(0, 12).join('\n   ') : '')); };
const ok = name => console.log(green('✓ ' + name));

// 1. Syntax
for(const f of ['app.js', 'sw.js']){
  const r = spawnSync(process.execPath, ['--check', path.join(ROOT, f)], {encoding:'utf8'});
  r.status === 0 ? ok(`Syntax ${f}`) : fail(`Syntax ${f}`, r.stderr);
}
// 2. Doppelte Funktionsnamen (die zweite überschreibt still die erste)
{
  const src = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
  const names = [...src.matchAll(/^(?:async )?function ([A-Za-z0-9_$]+)\(/gm)].map(m => m[1]);
  const dup = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
  dup.length ? fail('Doppelte Funktionen', dup.join(', ')) : ok('Keine doppelten Funktionen');
}
// 3. Versionen passen zusammen (App, index.html, Service Worker)
{
  const v = (fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8').match(/const VERSION = '([^']+)'/) || [])[1];
  const idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'), sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const iv = [...idx.matchAll(/app\.(?:js|css)\?v=([0-9.]+)/g)].map(m => m[1]), av = (sw.match(/const AV = '([^']+)'/) || [])[1];
  (v && iv.length === 2 && iv.every(x => x === v) && av === v) ? ok(`Version ${v} überall gleich`) : fail('Versionen passen nicht', `app.js ${v} · index ${iv.join('/')} · sw ${av} → python3 tools/bump.py`);
}

// 4. Abläufe im Browser (Handy-Ansicht, alle Netzdienste nachgebaut)
const only = process.argv.slice(2);
const tests = fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js') && (!only.length || only.some(o => f.startsWith(o)))).sort();
const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.webmanifest':'application/manifest+json', '.png':'image/png', '.woff2':'font/woff2', '.svg':'image/svg+xml'};
const server = http.createServer((q, s) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(q.url, 'http://x').pathname));
  if(!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()){ s.writeHead(404); return s.end(); }
  s.writeHead(200, {'content-type':types[path.extname(p)] || 'application/octet-stream'}); fs.createReadStream(p).pipe(s);
}).listen(0, '127.0.0.1', async () => {
  const BASE = `http://127.0.0.1:${server.address().port}`, OUT = fs.mkdtempSync(path.join(require('os').tmpdir(), 'spots-test-'));
  for(const t of tests){
    const r = await new Promise(res => {
      let out = ''; const c = spawn(process.execPath, [path.join(__dirname, t)], {env:{...process.env, BASE, OUT}});
      const kill = setTimeout(() => c.kill('SIGKILL'), 240000);
      c.stdout.on('data', d => out += d); c.stderr.on('data', d => out += d);
      c.on('close', code => { clearTimeout(kill); res({code, out}); });
    });
    const errs = [...r.out.matchAll(/errors?\s*(\[.*\])/g)].map(m => m[1]).filter(x => x !== '[]');
    if(r.code !== 0) fail(t, r.out.trim().split('\n').slice(-8).join('\n'));
    else if(errs.length) fail(t, 'Fehler auf der Seite: ' + errs.join(' '));
    else ok(t);
  }
  server.close();
  console.log(failed ? red(`\n${failed} Prüfung(en) fehlgeschlagen`) : green('\nAlles grün'), `· Bilder: ${OUT}`);
  process.exit(failed ? 1 : 0);
});
