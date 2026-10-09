const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
async function run(b, when, label){
  let ovq = 0, nPts = 0;
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block', timezoneId:'Europe/Berlin', geolocation:{latitude:49.90, longitude:10.00, accuracy:10}, permissions:['geolocation']});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap/, r => r.abort());
  await ctx.route(/overpass|kumi|private\.coffee/, async r => { const body = decodeURIComponent((r.request().postData() || '').slice(5));
    if(!/is_in/.test(body)) return r.fulfill({status:200, contentType:'application/json', body:'{"elements":[]}'});
    ovq++; const ins = [...body.matchAll(/is_in\(([\d.]+),([\d.]+)\)/g)]; nPts = ins.length;
    const els = ins.map((m, i) => ({type:'w', id:i, tags:{i:String(i), n:(i > nPts * .3 && i < nPts * .6) ? '1' : '0'}}));
    const mid = ins[Math.floor(nPts * .45)]; els.push({type:'node', id:99, lat:+mid[1], lon:+mid[2], tags:{hazard:'animal_crossing'}});
    r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({elements:els})}); });
  await ctx.route(/valhalla/, r => { const q = JSON.parse(new URL(r.request().url()).searchParams.get('json'));
    const L = q.locations, co = []; L.forEach((p, i) => { if(i) for(let f = .1; f < 1; f += .1) co.push([L[i-1].lon + (p.lon - L[i-1].lon) * f, L[i-1].lat + (p.lat - L[i-1].lat) * f]); co.push([p.lon, p.lat]); });
    const breaks = L.filter((p, i) => i === 0 || i === L.length - 1 || p.type !== 'through').length;
    const legs = Array.from({length:breaks - 1}, () => ({steps:[{maneuver:{type:'depart'}, name:'Landstraße', distance:5000, duration:300}, {maneuver:{type:'arrive'}, name:'', distance:0, duration:0}]}));
    r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({routes:[{geometry:{type:'LineString', coordinates:co}, legs, duration:2400, distance:40000}]})}); });
  await ctx.addInitScript(() => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    const seg = []; for(let i = 0; i <= 200; i++){ const f = i / 200; seg.push([+(9.9 - .3 * f).toFixed(6), +(49.8 - .1 * f + Math.sin(f * 9) * .01).toFixed(6), i * 10]); }
    localStorage.setItem('meine-spots-tracks', JSON.stringify([{id:'c', name:'Waldstrecke', created:Date.now() - 1e7, dist:25000, dur:1500000, maxSpd:25, segs:[seg]}])); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.clock.setFixedTime(new Date(when));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('missing ' + s); el.click(); }, s);
  await page.goto(`${BASE}/index.html?noonb`, {waitUntil:'domcontentloaded'}); await page.waitForTimeout(2000);
  await click('[data-tab=tracks]'); await page.waitForTimeout(300); await click('[data-track=c]'); await page.waitForTimeout(400);
  await click('[data-tv=again]'); await page.waitForTimeout(3000);
  console.log(label, '| overpass is_in calls:', ovq, 'pts:', nPts, '| wild:', await page.evaluate(() => (document.querySelector('.wild-route') || {}).innerText || '-'));
  await page.screenshot({path:`${OUT}/wild-${label}.png`});
  console.log(label, 'errors', JSON.stringify(errs)); await ctx.close();
}
(async () => { const b = await chromium.launch({...(HS ? {executablePath:HS} : {}), args:['--use-gl=swiftshader']});
  await run(b, '2026-10-06T18:40:00+02:00', 'evening'); await run(b, '2026-10-06T12:00:00+02:00', 'noon'); await b.close(); })();
