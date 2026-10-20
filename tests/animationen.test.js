/* Animationen beim Öffnen einer Fahrt und G-Schilder: Zahlen zählen hoch und enden richtig, Linie zeichnet sich, Schilder überlappen nicht; bei „Bewegung reduzieren“ sofort fertig */
const T = (() => {
// Erzeugt realistische Testfahrten (neutrale Gegend, „Testort“) im Format der App
const LAT0 = 49.80, LNG0 = 9.90, KX = 111320 * Math.cos(LAT0 * Math.PI / 180), KY = 110540;
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(2 * Math.PI * rnd());
// plan: [{len (m), kmh (Zielgeschwindigkeit), r (Kurvenradius m, + rechts / - links, 0 gerade)}]
function drive(plan, o = {}){
  const {x0 = 0, y0 = 0, h0 = 90, noise = 2.5, created = Date.now(), name = 'Fahrt', id, jumps = [], gaps = [], accMax = 2.6, decMax = 4.5} = o;
  let x = x0, y = y0, h = h0 * Math.PI / 180, v = 0, t = 0, d = 0, maxSpd = 0;
  const pts = []; let nx = 0, ny = 0, lastFix = -1, last = null, dist = 0;
  const total = plan.reduce((a, s) => a + s.len, 0);
  const segAt = dd => { let a = 0; for(const s of plan){ if(dd < a + s.len) return s; a += s.len; } return plan[plan.length - 1]; };
  // vorausschauend bremsen: Zieltempo = min über die nächsten Bremswege
  const target = dd => { let tv = segAt(dd).kmh / 3.6; let a = 0; for(const s of plan){ if(a > dd && a - dd < 400){ const need = Math.sqrt((s.kmh / 3.6) ** 2 + 2 * 3.0 * (a - dd)); tv = Math.min(tv, need); } a += s.len; } return tv; };
  const dt = .1;
  while(d < total){
    const tv = Math.max(d > total - 30 ? 0 : 1.5, target(d));
    v = v < tv ? Math.min(tv, v + accMax * dt) : Math.max(tv, v - decMax * dt);
    const s = segAt(d); if(s.r) h += v * dt / s.r;
    x += Math.sin(h) * v * dt; y += Math.cos(h) * v * dt; d += v * dt; t += dt;
    // GPS-Fix 1 Hz, Rauschen als langsam wandernder Fehler (wie echtes GPS)
    if(Math.floor(t) > lastFix){
      lastFix = Math.floor(t);
      nx = nx * .8 + gauss() * noise * .6; ny = ny * .8 + gauss() * noise * .6;
      if(gaps.some(g => t >= g[0] && t < g[1])) continue;
      let px = x + nx, py = y + ny;
      const j = jumps.find(j => Math.abs(t - j.t) < .6); if(j){ px += j.dx; py += j.dy; }
      if(last){ const dd = Math.hypot(px - last[0], py - last[1]), dtt = t - last[2]; if(dd < 5) continue; if(dd / dtt > 70) continue; dist += dd; }
      last = [px, py, t];
      pts.push([+(LNG0 + px / KX).toFixed(6), +(LAT0 + py / KY).toFixed(6), Math.round(t * 10) / 10]);
      maxSpd = Math.max(maxSpd, v);
    }
  }
  return {spdChk:1, id:id || 't' + Math.round(rnd() * 1e9), name, created, dist:Math.round(dist), dur:Math.round(t * 1000), maxSpd:+maxSpd.toFixed(2), segs:[pts]};
}
const day = 864e5, now = Date.parse('2026-10-15T17:30:00+02:00');
const commute = (i) => drive([{len:800, kmh:50}, {len:300, kmh:50, r:120}, {len:4000, kmh:100}, {len:400, kmh:80, r:-300}, {len:3000, kmh:100}, {len:250, kmh:50, r:60}, {len:2500, kmh:70}, {len:500, kmh:50}], {name:'Testort Arbeitsweg', created:now - (20 - i) * day, id:'commute' + i});
const T = [];
for(let i = 0; i < 6; i++) T.push(commute(i));
// sportliche Landstraße: enge Kurven schnell (≈0,7–0,8 G quer)
const twisty = []; for(let i = 0; i < 14; i++) twisty.push({len:350, kmh:120}, {len:160, kmh:i % 3 ? 82 : 92, r:(i % 2 ? 70 : -75)});
T.push(drive([{len:600, kmh:70}, ...twisty, {len:800, kmh:100}], {name:'Testort Kurven', created:now - 3 * day, id:'twisty', accMax:4.5, decMax:7.5}));
// Autobahn sehr schnell
T.push(drive([{len:1500, kmh:120}, {len:30000, kmh:225}, {len:400, kmh:140, r:900}, {len:9000, kmh:210}, {len:1500, kmh:100}], {name:'Testort Autobahn', created:now - 2 * day, id:'autobahn'}));
// ruhige Stadtfahrt mit GPS-Sprüngen (Häuserschlucht), echte Fahrt ist harmlos
const city = []; for(let i = 0; i < 10; i++) city.push({len:300, kmh:45}, {len:30, kmh:15, r:i % 2 ? 18 : -18});
T.push(drive(city, {name:'Testort Stadt', created:now - 4 * day, id:'city', noise:4, jumps:[{t:40, dx:35, dy:-10}, {t:95, dx:-30, dy:25}, {t:150, dx:40, dy:5}, {t:210, dx:-25, dy:-30}]}));
// ruhige Landstraße mit Tunnel (Lücke + Drift beim Rauskommen)
T.push(drive([{len:3000, kmh:90}, {len:1200, kmh:90}, {len:4000, kmh:90}], {name:'Testort Tunnel', created:now - 5 * day, id:'tunnel', gaps:[[110, 150]], jumps:[{t:151, dx:120, dy:60}, {t:152, dx:80, dy:40}]}));
// kurze Fahrt (600 m) mit einem GPS-Sprung
T.push(drive([{len:650, kmh:40}], {name:'Testort kurz', created:now - 1 * day, id:'short', jumps:[{t:25, dx:45, dy:0}]}));
return T; })();
const BASE = process.env.BASE || 'http://127.0.0.1:8765';
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
const run = async (b, rm, errs) => {
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block', reducedMotion:rm ? 'reduce' : 'no-preference'});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla|overpass/, r => r.abort());
  await ctx.addInitScript(T => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    localStorage.setItem('meine-spots-tracks', JSON.stringify(T)); }, T);
  const page = await ctx.newPage(); page.on('pageerror', e => errs.push(e.message));
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(2000);
  await page.evaluate(() => document.querySelector('[data-tab=tracks]').click()); await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector('[data-track=twisty]').click());
  const st = () => page.evaluate(() => ({km:document.querySelector('#trackView .tstats b').textContent, risk:document.querySelector('.rk-s b').textContent, drawing:document.body.classList.contains('tvdrawing'), head:!!document.querySelector('.tvhead')}));
  const early = await st();
  await page.waitForTimeout(3200);
  const late = await st();
  const labels = await page.evaluate(() => { const r = e => { const b = e.getBoundingClientRect(); return [b.left, b.top, b.right, b.bottom]; };
    const ov = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
    const gl = [...document.querySelectorAll('.gmk .gl')].map(r), ctrl = r(document.querySelector('#ctrl .stack'));
    return {n:gl.length, overlap:gl.some((a, i) => gl.some((b, j) => i < j && ov(a, b))), ctrl:gl.some(a => ov(a, ctrl)), op:[...document.querySelectorAll('.gmk .gl')].map(e => getComputedStyle(e).opacity)}; });
  console.log(rm ? 'reduce' : 'motion', JSON.stringify({early, late, labels}));
  if(late.km !== '8,53 km' || !/^\d+$/.test(late.risk)) errs.push('Endwerte falsch: ' + JSON.stringify(late));
  if(late.drawing || late.head) errs.push('Zeichnen hört nicht auf');
  if(rm && (early.km !== '8,53 km' || early.drawing)) errs.push('„Bewegung reduzieren“ animiert trotzdem');
  if(!rm && (early.km === '8,53 km' || !early.drawing)) errs.push('keine Animation beim Öffnen');
  if(labels.n !== 3 || labels.overlap || labels.ctrl || labels.op.some(o => o !== '1')) errs.push('G-Schilder: ' + JSON.stringify(labels));
  // erneutes Zeichnen derselben Ansicht (z. B. Ort geladen) startet die Animation nicht neu
  await page.evaluate(() => document.querySelector('[data-tv=fav]').click()); await page.waitForTimeout(150);
  const again = await st(); if(again.km !== '8,53 km' || again.drawing) errs.push('Animation startet beim Neuzeichnen neu');
  await ctx.close();
};
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})}); const errs = [];
  await run(b, false, errs); await run(b, true, errs);
  console.log('errors', JSON.stringify(errs)); await b.close(); process.exit(errs.length ? 1 : 0);
})();
