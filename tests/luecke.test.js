/* Lücken füllen: Fahrt mit einem geraden Sprung (App war aus) wird über die Straße ergänzt; nach einem Absturz geht die Aufnahme im selben Abschnitt weiter */
const BASE = process.env.BASE || 'http://127.0.0.1:8765';
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
const LAT0 = 49.80, LNG0 = 9.90, KX = 111320 * Math.cos(LAT0 * Math.PI / 180), KY = 110540;
const P = (x, y) => [+(LNG0 + x / KX).toFixed(6), +(LAT0 + y / KY).toFixed(6)];
// 600 m mit 20 m/s, dann 150 s Lücke und 3 km gerader Sprung, dann nochmal 600 m
const seg = []; for(let i = 0; i <= 30; i++) seg.push([...P(i * 20, 0), i]);
for(let i = 0; i <= 30; i++) seg.push([...P(3600 + i * 20, 0), 180 + i]);
const T = {spdChk:1, id:'gap1', name:'Testort Lücke', created:Date.now() - 864e5, dist:4200, dur:210000, maxSpd:21, segs:[seg]};
// Route der Lücke: Bogen über die Straße nach Norden (≈ 4 km)
const ROUTE = [P(600, 0), P(600, 500), P(1800, 520), P(3000, 500), P(3600, 0)];
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block', geolocation:{latitude:LAT0, longitude:LNG0 + 5000 / KX, accuracy:8}, permissions:['geolocation']});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|openstreetmap\.de|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla|overpass/, r => r.abort());
  let osrmCalls = 0;
  await ctx.route(/router\.project-osrm\.org\/route/, r => { osrmCalls++; r.fulfill({contentType:'application/json', body:JSON.stringify({code:'Ok', routes:[{distance:4000, duration:200, geometry:{type:'LineString', coordinates:ROUTE}, legs:[]}]})}); });
  await ctx.addInitScript(T => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    localStorage.setItem('meine-spots-tracks', JSON.stringify([T])); }, T);
  // Standort fest vorgeben (4,4 km weiter östlich als der letzte Punkt vor dem Absturz)
  await ctx.addInitScript(([la, lo]) => { const pos = () => ({coords:{latitude:la, longitude:lo, accuracy:8, speed:null, heading:null, altitude:null, altitudeAccuracy:null}, timestamp:Date.now()});
    Object.defineProperty(navigator, 'geolocation', {value:{watchPosition:cb => { const id = setInterval(() => cb(pos()), 700); return id; }, clearWatch:id => clearInterval(id), getCurrentPosition:cb => setTimeout(() => cb(pos()), 50)}}); }, [LAT0, LNG0 + 5000 / KX]);
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('fehlt ' + s); el.click(); }, s);
  const wait = ms => page.waitForTimeout(ms);
  const stored = () => page.evaluate(() => new Promise(res => { const r = indexedDB.open('spots-kv'); r.onsuccess = () => { const q = r.result.transaction('kv').objectStore('kv').get('tracks'); q.onsuccess = () => res(q.result); q.onerror = () => res(null); }; r.onerror = () => res(null); }));
  await page.goto(`${BASE}/index.html?noonb`); await wait(3000);
  await click('[data-tab=tracks]'); await wait(500);
  await click('[data-track=gap1]'); await wait(2500);
  let ts = await stored(); ts = typeof ts === 'string' ? JSON.parse(ts) : ts;
  const t = (ts || []).find(x => x.id === 'gap1');
  const info = t && {segs:t.segs.map(sg => sg.length + (sg[0].length === 4 ? 'F' : '')), dist:t.dist, chk:t.gapChk, mid:t.segs[1] && t.segs[1].slice(0, 3)};
  console.log('Fahrt:', JSON.stringify(info), 'OSRM:', osrmCalls);
  if(!t || t.segs.length !== 3 || t.segs[1][0].length !== 4 || t.segs[0].length !== 31 || t.segs[2].length !== 31) errs.push('Lücke nicht als eigener Abschnitt ergänzt');
  else {
    const f = t.segs[1];
    if(Math.abs(f[0][2] - 30) > .1 || Math.abs(f[f.length - 1][2] - 180) > .1 || !f.some(q => q[1] > LAT0 + 400 / KY)) errs.push('Ergänzte Punkte falsch (Zeit oder Weg)');
    for(let k = 1; k < f.length; k++) if(f[k][2] < f[k - 1][2]) errs.push('Zeit läuft rückwärts');
    if(!(t.dist > 4800 && t.dist < 5000)) errs.push('Distanz nicht angepasst: ' + t.dist);
    if(t.gapChk !== 1) errs.push('gapChk fehlt');
  }
  const note = await page.evaluate(() => document.querySelector('.gapnote')?.innerText || '');
  console.log('Hinweis:', note); if(!/über die Straße ergänzt/.test(note)) errs.push('Hinweis fehlt');
  // Kein zweites Mal rechnen
  await click('[data-tv=back]'); await wait(400); await click('[data-track=gap1]'); await wait(1200);
  if(osrmCalls !== 1) errs.push('OSRM mehrfach gefragt: ' + osrmCalls);

  // Absturz während der Aufnahme: weiter im selben Abschnitt, nicht als neuer Abschnitt
  const now = Date.now();
  await page.evaluate(([now, s]) => { localStorage.setItem('meine-spots-rec', JSON.stringify({id:'r1', start:now - 300000, segs:[s], dist:600, active:30000, runFrom:now - 100000, lastSeen:now - 60000, maxSpd:20, last:null, weak:false})); }, [now, seg.slice(0, 31)]);
  await page.reload(); await wait(3000);
  await click('[data-tab=tracks]'); await wait(400);
  await click('[data-rec=toggle]'); await wait(2500);
  const r = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-rec')));
  console.log('Aufnahme:', JSON.stringify({segs:r.segs.map(sg => sg.length), active:r.active, crash:r.crash}));
  if(r.segs.length !== 1 || r.segs[0].length !== 32) errs.push('Nach Absturz neuer Abschnitt statt Lücke');
  if(!(r.active >= 30000 + 40000 + 50000)) errs.push('Zeit der Lücke fehlt in der Dauer');
  console.log('errors', JSON.stringify(errs)); await b.close(); process.exit(errs.length ? 1 : 0);
})();
