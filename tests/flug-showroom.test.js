/* 3D-Flug (ansehen, als Video, zu kurz, abbrechen) und Showroom (3D-Auto, Daten, Fotos, Bearbeiten, Escape) */
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
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla|overpass/, r => r.abort());
  T.forEach(t => { t.car = 'c1'; });
  await ctx.addInitScript(T => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1, car3d:false}));
    localStorage.setItem('meine-spots-garage', JSON.stringify({cars:[{id:'c1', make:'Testmarke', model:'Modell X', year:2016, km:84500, kmAt:1, tuv:'2030-11', type:'coupe', color:'red', created:1}, {id:'c2', make:'Testmarke', model:'Kombi', type:'kombi', color:'silver', created:2}], active:'c1'}));
    localStorage.setItem('meine-spots-tracks', JSON.stringify(T)); }, T);
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('fehlt ' + s); el.click(); }, s);
  const wait = ms => page.waitForTimeout(ms);
  const flying = () => page.evaluate(() => document.body.classList.contains('flight'));
  await page.goto(`${BASE}/index.html?noonb`); await wait(3200);
  await click('[data-tab=tracks]'); await wait(500);

  // Kurze Fahrt: Video verweigert (Start und Ziel werden um 250 m gekürzt)
  await click('[data-track=short]'); await wait(1200);
  await click('[data-tv=flyrec]'); await wait(500);
  if(await flying()) errs.push('Video bei zu kurzer Fahrt gestartet');
  if(!/zu kurz/.test(await page.evaluate(() => document.querySelector('#toast')?.textContent || document.body.innerText))) errs.push('Kein Hinweis „zu kurz“');
  await click('[data-tv=back]'); await wait(500);

  // Flug ansehen und abbrechen: alles wieder wie vorher
  await click('[data-track=twisty]'); await wait(2500);
  await click('[data-tv=fly]'); await wait(800);
  const f1 = await page.evaluate(() => ({on:document.body.classList.contains('flight'), top:document.querySelector('#flTop').innerText, panel:getComputedStyle(document.querySelector('#panel')).display, head:!!document.querySelector('.tvhead.flkeep')}));
  console.log('Flug:', JSON.stringify(f1));
  if(!f1.on || !/3D-Flug/.test(f1.top) || f1.panel !== 'none' || !f1.head) errs.push('Flug startet nicht richtig');
  await wait(6500);
  const pg = await page.evaluate(() => parseFloat(document.querySelector('#flProg').style.width) || 0);
  console.log('Fortschritt:', pg); if(!(pg > 0)) errs.push('Flug kommt nicht voran');
  await click('[data-fl=close]'); await wait(1200);
  const f2 = await page.evaluate(() => ({on:document.body.classList.contains('flight'), head:!!document.querySelector('.tvhead'), panel:getComputedStyle(document.querySelector('#panel')).display}));
  if(f2.on || f2.head || f2.panel === 'none') errs.push('Flug räumt nicht auf: ' + JSON.stringify(f2));

  // Als Video: läuft durch, danach Karte mit Video, Teilen und Speichern
  await click('[data-tv=flyrec]'); await wait(1000);
  if(!/Video/.test(await page.evaluate(() => document.querySelector('#flTop').innerText))) errs.push('Video-Modus fehlt');
  await page.waitForFunction(() => !!document.querySelector('#flResult'), null, {timeout:60000}).catch(() => errs.push('Kein Video nach dem Flug'));
  await wait(800);
  const v = await page.evaluate(() => { const v = document.querySelector('#flResult video'), a = document.querySelector('#flResult [data-flr=save]'); return v ? {w:v.videoWidth, h:v.videoHeight, name:a.download, share:!!document.querySelector('#flResult [data-flr=share]'), flight:document.body.classList.contains('flight')} : null; });
  console.log('Video:', JSON.stringify(v));
  if(!v || v.w !== 720 || v.h !== 1280 || !/\.(mp4|webm)$/.test(v.name) || !v.share || v.flight) errs.push('Video falsch');
  await click('#flResult [data-flr=close]'); await wait(400);
  if(await page.evaluate(() => !!document.querySelector('#flResult'))) errs.push('Video-Karte schließt nicht');

  // Showroom aus der Fahrt (Auto-Zeile)
  await click('[data-tvcar]'); await wait(2500);
  const s1 = await page.evaluate(() => ({open:!document.querySelector('#showroom').hidden, gl:document.querySelector('#srStage').classList.contains('gl'), h:document.querySelector('#showroom h2').textContent,
    tiles:[...document.querySelectorAll('.sr-t')].map(t => t.innerText.replace(/\s+/g, ' ')), act:!!document.querySelector('#showroom .gact')}));
  console.log('Showroom:', JSON.stringify(s1));
  if(!s1.open || !s1.gl || s1.h !== 'Testmarke Modell X' || !s1.act) errs.push('Showroom falsch');
  if(!s1.tiles.some(t => /^84\.\d{3} km gesamt$/.test(t)) || !s1.tiles.some(t => /^11\/30 TÜV$/.test(t)) || !s1.tiles.some(t => /Top-Speed/.test(t))) errs.push('Showroom-Daten falsch');
  // drehen per Finger
  await page.mouse.move(250, 200); await page.mouse.down(); await page.mouse.move(100, 200, {steps:6}); await page.mouse.up(); await wait(300);
  await page.keyboard.press('Escape'); await wait(500);
  if(await page.evaluate(() => !document.querySelector('#showroom').hidden)) errs.push('Escape schließt den Showroom nicht');

  // Garage: zweites Auto antippen → Showroom, „Als aktives Auto“, „Bearbeiten“ öffnet den Editor
  await click('[data-tv=back]'); await wait(300);
  await click('#b-settings'); await wait(300); await click('[data-st=garage]'); await wait(300);
  await click('[data-g=open][data-id=c2]'); await wait(600);
  if(!(await page.evaluate(() => /Kombi/.test(document.querySelector('#showroom h2')?.textContent || '')))) errs.push('Garage öffnet keinen Showroom');
  await click('[data-sr=use]'); await wait(500);
  const act = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-garage')).active);
  if(act !== 'c2' || !(await page.evaluate(() => !!document.querySelector('#showroom .gact')))) errs.push('Als aktives Auto geht nicht');
  await click('[data-sr=edit]'); await wait(500);
  const ed = await page.evaluate(() => ({sr:document.querySelector('#showroom').hidden, ed:!!document.querySelector('#modal [data-gf]')}));
  if(!ed.sr || !ed.ed) errs.push('Bearbeiten öffnet den Editor nicht');
  console.log('errors', JSON.stringify(errs)); await b.close(); process.exit(errs.length ? 1 : 0);
})();
