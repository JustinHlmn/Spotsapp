/* Tempolimit im Cockpit: bleibt bei schneller Fahrt, langsamem oder gestörtem Server und Länder-Kürzeln (DE:urban) sichtbar */
const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
// Testort: Straße nach Osten auf 49.9° N, Abschnitte mit verschiedenen Angaben, dazu eine Querstraße ohne Angabe
const LAT = 49.9, KX = Math.cos(LAT * Math.PI / 180) * 111320;
const line = (a, b, tags, id) => { const g = []; for(let x = a; x <= b + 1e-9; x += .0008) g.push({lat:LAT, lon:+x.toFixed(6)}); return {type:'way', id, tags:{highway:'primary', ...tags}, geometry:g}; };
const WAYS = [
  line(10.000, 10.020, {maxspeed:'100'}, 1),
  line(10.020, 10.036, {maxspeed:'DE:urban'}, 2),
  line(10.036, 10.048, {'zone:maxspeed':'DE:30', highway:'residential'}, 3),
  line(10.048, 10.075, {maxspeed:'70'}, 4),
  {type:'way', id:5, tags:{highway:'residential'}, geometry:[{lat:LAT - .004, lon:10.03}, {lat:LAT + .004, lon:10.03}]}
];
const want = lng => lng < 10.020 ? '100' : lng < 10.036 ? '50' : lng < 10.048 ? '30' : '70';
const near = lng => [10.020, 10.036, 10.048].some(b => Math.abs(lng - b) * KX < 60);
let calls = {a:0, k:0};
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {}), args:['--use-gl=swiftshader']});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla/, r => r.abort());
  await ctx.route(/overpass/, async r => {
    const u = r.request().url(), q = decodeURIComponent(new URL(u).searchParams.get('data') || '');
    if(!/maxspeed|highway~"\^\(motorway/.test(q)) return r.fulfill({status:200, contentType:'application/json', body:'{"elements":[]}'});
    const k = /kumi/.test(u) ? 'k' : 'a'; calls[k]++;
    if(k === 'a' && calls.a === 1) return r.fulfill({status:429, body:'busy'});                                             // Server 1 überlastet
    if(k === 'k' && calls.k === 1) return r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({elements:[], remark:'runtime error: Query timed out'})});   // Server 2: Fehler als 200
    const m = q.match(/around:(\d+),([\d.]+),([\d.]+)/), R = +m[1], c = {lat:+m[2], lng:+m[3]};
    const inR = g => Math.hypot((g.lon - c.lng) * KX, (g.lat - c.lat) * 110540) <= R;
    await new Promise(res => setTimeout(res, 2500));                                                                        // langsamer Server
    r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({elements:WAYS.filter(w => w.geometry.some(inR))})});
  });
  await ctx.addInitScript(() => {
    const subs = new Map(); let n = 0;
    Object.defineProperty(navigator, 'geolocation', {value:{watchPosition:ok => { subs.set(++n, ok); return n; }, clearWatch:id => subs.delete(id), getCurrentPosition:() => {}}, configurable:true});
    window.__gps = (lat, lng, speed) => subs.forEach(f => f({coords:{latitude:lat, longitude:lng, speed, accuracy:8, heading:90}, timestamp:Date.now()}));
    if(!localStorage.getItem('meine-spots-prefs')) localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
  });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(1800);
  await page.evaluate(() => document.querySelector('[data-tab=tracks]').click()); await page.waitForTimeout(300);
  await page.evaluate(() => { const el = document.querySelector('[data-ck-open]'); if(!el) throw new Error('kein Cockpit-Knopf'); el.click(); }); await page.waitForTimeout(800);
  // 180 km/h (50 m/s), ein Fix pro Sekunde
  const V = 50, step = V / KX; let lng = 10.0, first = null, miss = [], wrong = [];
  for(let i = 0; lng < 10.074; i++){
    await page.evaluate(([la, ln, v]) => __gps(la, ln, v), [LAT, lng, V]);
    await page.waitForTimeout(80);
    const got = await page.evaluate(() => { const el = document.querySelector('#ckLimit'); return el.classList.contains('show') ? (el.classList.contains('none') ? 'none' : el.textContent) : null; });
    if(got && first == null) first = i;
    if(first != null && !near(lng)){ if(!got) miss.push(lng.toFixed(4)); else if(got !== want(lng)) wrong.push(`${lng.toFixed(4)}:${got}≠${want(lng)}`); }
    if(i === 40) await page.screenshot({path:`${OUT}/tl-cockpit.png`});
    await page.waitForTimeout(920);
    lng += step;
  }
  console.log('first sign after', first, 's · overpass calls', JSON.stringify(calls), '· missing', miss.length, JSON.stringify(miss.slice(0, 8)), '· wrong', JSON.stringify(wrong.slice(0, 8)));
  if(first == null || first > 20) errs.push('Schild kommt zu spät: ' + first);
  if(miss.length) errs.push(`Schild fehlt an ${miss.length} Stellen`);
  if(wrong.length) errs.push('falsches Tempolimit: ' + wrong.slice(0, 4).join(', '));
  console.log('errors', JSON.stringify(errs)); await b.close();
  process.exit(errs.length ? 1 : 0);
})();
