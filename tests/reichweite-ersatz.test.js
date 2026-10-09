const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
const circ = (lat, lng, km) => { const r = []; for(let i = 0; i <= 40; i++){ const a = i / 40 * Math.PI * 2; r.push([lng + Math.cos(a) * km / 71.5, lat + Math.sin(a) * km / 111.3]); } return r; };
async function run(b, mode){
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block', geolocation:{latitude:49.90, longitude:10.00, accuracy:10}, permissions:['geolocation']});
  await ctx.route(/amazonaws|gstatic|firestore|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|overpass/, r => r.abort());
  let calls = [];
  await ctx.route(/valhalla/, r => { const q = JSON.parse(new URL(r.request().url()).searchParams.get('json')); const ts = q.contours.map(c => c.time); calls.push(ts.join('+'));
    if(mode === 'down') return r.fulfill({status:503, body:'<html>busy</html>'});
    if(ts.includes(90)) return r.fulfill({status:400, contentType:'application/json', body:JSON.stringify({error_code:166, error:'Exceeded max time', status_code:400})});
    const L = q.locations[0]; r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({type:'FeatureCollection', features:ts.map(t => ({type:'Feature', properties:{contour:t}, geometry:{type:'Polygon', coordinates:[circ(L.lat, L.lon, t * .6)]}}))})}); });
  let tbl = 0;
  await ctx.route(/table\/v1/, r => { tbl++; const co = new URL(r.request().url()).pathname.split('/').pop().split(';'); const o = co[0].split(',').map(Number);
    const d = co.map(c => { const p = c.split(',').map(Number); const km = Math.hypot((p[0] - o[0]) * 71.5, (p[1] - o[1]) * 111.3); return km / 1.1 * 60; });
    r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({code:'Ok', durations:[d]})}); });
  await ctx.addInitScript(() => { localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1})); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(1500);
  await page.evaluate(() => { document.querySelector('#b-layers').click(); document.querySelector('#b-reach').click(); }); await page.waitForTimeout(2500);
  console.log(mode, '| calls:', calls.join(' , '), '| table:', tbl, '|', (await page.evaluate(() => document.querySelector('#reach').innerText)).replace(/\n+/g, ' / '), '| errs', JSON.stringify(errs));
  await ctx.close();
}
(async () => { const b = await chromium.launch({...(HS ? {executablePath:HS} : {})}); await run(b, 'limit'); await run(b, 'down'); await b.close(); })();
