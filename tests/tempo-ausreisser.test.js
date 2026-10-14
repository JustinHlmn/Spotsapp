/* Tempo-Ausreißer (z. B. im Tunnel) dürfen keinen Top-Speed erzeugen; alte Fahrten werden einmalig korrigiert */
const BASE = process.env.BASE || 'http://127.0.0.1:8765';
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|overpass|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla/, r => r.abort());
  await ctx.addInitScript(() => {
    // GPS selbst steuern
    const subs = new Map(); let n = 0;
    const geo = {watchPosition:(ok) => { subs.set(++n, ok); return n; }, clearWatch:id => subs.delete(id), getCurrentPosition:() => {}};
    Object.defineProperty(navigator, 'geolocation', {value:geo, configurable:true});
    window.__gps = (lat, lng, speed, acc, ts) => subs.forEach(f => f({coords:{latitude:lat, longitude:lng, speed, accuracy:acc, heading:90}, timestamp:ts}));
    if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    // ~28 m/s (100 km/h) nach Osten, ein Punkt pro Sekunde
    const seg = n => { const s = []; for(let i = 0; i <= n; i++) s.push([+(10 + i * 28 / 71700).toFixed(6), 49.9, i]); return s; };
    localStorage.setItem('meine-spots-tracks', JSON.stringify([
      {id:'tun', name:'Testort Tunnel', created:Date.now() - 1e6, dist:3360, dur:120000, maxSpd:250 / 3.6, segs:[seg(120)]},
      {id:'ok', name:'Testort normal', created:Date.now() - 2e6, dist:3360, dur:120000, maxSpd:31, segs:[seg(120)]}]));
  });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(2000);
  // 1) alte Fahrten
  const fixed = await page.evaluate(() => new Promise(res => { const r = indexedDB.open('spots-kv', 1); r.onsuccess = () => { const q = r.result.transaction('kv').objectStore('kv').get('tracks'); q.onsuccess = () => res(q.result.map(t => [t.id, Math.round(t.maxSpd * 3.6)])); }; }));
  console.log('old tracks:', JSON.stringify(fixed));
  const km = Object.fromEntries(fixed);
  if(!(km.tun >= 90 && km.tun <= 115)) errs.push('Tunnel-Fahrt nicht korrigiert: ' + km.tun);
  if(km.ok !== Math.round(31 * 3.6)) errs.push('normale Fahrt verändert: ' + km.ok);
  // 2) neue Aufnahme mit Tunnel
  await page.evaluate(() => document.querySelector('[data-tab=tracks]').click()); await page.waitForTimeout(300);
  await page.evaluate(() => document.querySelector('[data-rec=start]').click()); await page.waitForTimeout(300);
  const feed = await page.evaluate(() => {
    const t0 = Date.now(), lng = s => 10 + s / 71700; let x = 0, t = 0;
    const go = (sec, v, rep = v, acc = 8) => { for(let i = 0; i < sec; i++){ x += v; t += 1; __gps(49.9, lng(x), rep, acc, t0 + t * 1000); } };
    go(20, 28);                                   // 100 km/h
    t += 40; x += 40 * 28;                        // Tunnel: 40 s kein GPS
    go(1, 28, 85, 15);                             // erste Messung danach: 306 km/h
    go(1, 28, 72, 18);                             // noch ein Ausreißer: 259 km/h
    go(3, 28, 28, 30);                             // ungenau
    for(let i = 0; i < 3; i++){ x += 28; t += 1; __gps(49.9, lng(x + 1900), null, 12, t0 + t * 1000); }   // Positionssprung ohne Tempo
    go(15, 30);                                   // wieder normal, 108 km/h
    return JSON.parse(localStorage.getItem('meine-spots-rec') || '{}').maxSpd;
  });
  await page.waitForTimeout(2500);
  const top = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-rec') || '{}').maxSpd);
  console.log('recorded top km/h:', Math.round((top || feed) * 3.6));
  const kmh = Math.round((top || feed) * 3.6);
  if(!(kmh >= 100 && kmh <= 110)) errs.push('Top-Speed der Aufnahme falsch: ' + kmh);
  console.log('errors', JSON.stringify(errs)); await b.close();
  process.exit(errs.length ? 1 : 0);
})();
