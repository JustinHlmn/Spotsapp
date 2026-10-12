/* Navi: Aufnahme startet automatisch, Knopf im Navi, Ende bietet Speichern an */
const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
let vq = null;
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {}), args:['--use-gl=swiftshader']});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block', geolocation:{latitude:49.90, longitude:10.00, accuracy:10}, permissions:['geolocation']});
  await ctx.route(/amazonaws|overpass|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis/, r => r.abort());
  await ctx.route(/valhalla/, r => { const q = JSON.parse(new URL(r.request().url()).searchParams.get('json')); vq = q;
    const L = q.locations, co = []; L.forEach((p, i) => { if(i) for(let f = .25; f < 1; f += .25) co.push([L[i-1].lon + (p.lon - L[i-1].lon) * f, L[i-1].lat + (p.lat - L[i-1].lat) * f]); co.push([p.lon, p.lat]); });
    const breaks = L.filter((p, i) => i === 0 || i === L.length - 1 || p.type !== 'through').length;
    const legs = Array.from({length:breaks - 1}, () => ({steps:[{maneuver:{type:'depart'}, name:'Landstraße', distance:5000, duration:300}, {maneuver:{type:'arrive'}, name:'', distance:0, duration:0}]}));
    r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({routes:[{geometry:{type:'LineString', coordinates:co}, legs, duration:1800, distance:breaks * 5000}]})}); });
  await ctx.addInitScript(() => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    const mk = (id, name, a, b, n) => { const seg = []; for(let i = 0; i <= n; i++){ const f = i / n; seg.push([+(a[0] + (b[0] - a[0]) * f + Math.sin(f * 9) * .01).toFixed(6), +(a[1] + (b[1] - a[1]) * f).toFixed(6), i * 10]); } return {id, name, created:Date.now() - n * 1e5, dist:20000, dur:1200000, maxSpd:25, segs:[seg]}; };
    localStorage.setItem('meine-spots-tracks', JSON.stringify([mk('a', 'Abendrunde', [10.05, 49.98], [10.3, 49.85], 200), mk('b', 'Zur Arbeit', [10.1, 49.95], [10.2, 50.03], 120), mk('c', 'Bergstrecke', [9.9, 49.8], [9.6, 49.7], 160)])); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('missing ' + s); el.click(); }, s);
  const txt = s => page.evaluate(s => (document.querySelector(s) || {}).innerText || null, s);
  const shot = n => page.screenshot({path:`${OUT}/fav-${n}.png`});
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(2000);
  // Navi zeichnet automatisch auf, Aufnahme-Knopf sichtbar, Beenden bietet Speichern an
  await click('[data-tab=tracks]'); await page.waitForTimeout(400);
  await click('[data-track=c]'); await page.waitForTimeout(500);
  await click('[data-tv=again]'); await page.waitForTimeout(2500);
  await click('[data-nav=go]'); await page.waitForTimeout(1500);
  const st = await page.evaluate(() => ({nav:document.body.classList.contains('nav'), btn:getComputedStyle(document.querySelector('#navRec') || document.body).display, on:!!document.querySelector('#navRec.on'), route:getComputedStyle(document.body).getPropertyValue('--x')}));
  console.log('nav rec:', JSON.stringify(st));
  if(!st.nav) errs.push('Navi nicht gestartet');
  if(!st.on || st.btn === 'none') errs.push('Aufnahme im Navi läuft nicht oder Knopf fehlt');
  await shot('6-nav-rec');
  await click('[data-nav=end]'); await page.waitForTimeout(300); await click('[data-nav=end]'); await page.waitForTimeout(1200);
  const after = await page.evaluate(() => ({save:!document.querySelector('#trackSaveView').hidden, ck:document.body.classList.contains('cockpit')}));
  console.log('after end:', JSON.stringify(after));
  await shot('7-after-end');
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
