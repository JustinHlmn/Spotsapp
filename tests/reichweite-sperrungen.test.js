const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
(async () => { const b = await chromium.launch({...(HS ? {executablePath:HS} : {}), args:['--use-gl=swiftshader']});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block', timezoneId:'Europe/Berlin', geolocation:{latitude:49.90, longitude:10.00, accuracy:10}, permissions:['geolocation']});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap/, r => r.abort());
  let isoQ = null;
  const circ = (lat, lng, km) => { const r = []; for(let i = 0; i <= 40; i++){ const a = i / 40 * Math.PI * 2; r.push([lng + Math.cos(a) * km / 71.5, lat + Math.sin(a) * km / 111.3]); } return r; };
  await ctx.route(/valhalla/, r => { const u = new URL(r.request().url()), q = JSON.parse(u.searchParams.get('json'));
    if(u.pathname.includes('isochrone')){ isoQ = q; const L = q.locations[0]; return r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({type:'FeatureCollection', features:q.contours.map(c => ({type:'Feature', properties:{contour:c.time, metric:'time'}, geometry:{type:'Polygon', coordinates:[circ(L.lat, L.lon, c.time * .6)]}})).reverse()})}); }
    const L = q.locations, co = []; L.forEach((p, i) => { if(i) for(let f = .05; f < 1; f += .05) co.push([L[i-1].lon + (p.lon - L[i-1].lon) * f, L[i-1].lat + (p.lat - L[i-1].lat) * f]); co.push([p.lon, p.lat]); });
    const breaks = L.filter((p, i) => i === 0 || i === L.length - 1 || p.type !== 'through').length;
    const legs = Array.from({length:breaks - 1}, () => ({steps:[{maneuver:{type:'depart'}, name:'Landstraße', distance:5000, duration:300}, {maneuver:{type:'arrive'}, name:'', distance:0, duration:0}]}));
    r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({routes:[{geometry:{type:'LineString', coordinates:co}, legs, duration:2400, distance:40000}]})}); });
  let blkQ = 0;
  await ctx.route(/overpass|kumi|private\.coffee/, async r => { const body = decodeURIComponent((r.request().postData() || '').slice(5));
    if(!/way\.r\[/.test(body)) return r.fulfill({status:200, contentType:'application/json', body:'{"elements":[]}'});
    blkQ++; if(!/around:18,/.test(body)) console.log("BODY", body.slice(0, 300)); const raw = body.match(/around:18,([^)]+)\)/)[1].split(',').map(Number), P = []; for(let i = 0; i < raw.length; i += 2) P.push([raw[i+1], raw[i]]);
    const sl = (i, n) => P.slice(i, i + n).map(p => ({lat:p[1], lon:p[0]}));
    const n = P.length, els = [
      {type:'way', id:1, tags:{highway:'secondary', name:'Passstraße', 'motor_vehicle:conditional':'no @ (Nov 01-Apr 30)'}, geometry:sl(Math.floor(n * .3), 8)},
      {type:'way', id:2, tags:{highway:'unclassified', name:'Waldweg', motor_vehicle:'destination'}, geometry:sl(Math.floor(n * .6), 5)},
      {type:'way', id:3, tags:{highway:'tertiary', 'motor_vehicle:conditional':'no @ (Mo-Fr 22:00-06:00)'}, geometry:sl(Math.floor(n * .8), 4)},
      {type:'way', id:4, tags:{highway:'residential', motor_vehicle:'no'}, geometry:[{lat:P[Math.floor(n * .5)][1], lon:P[Math.floor(n * .5)][0]}, {lat:P[Math.floor(n * .5)][1] + .01, lon:P[Math.floor(n * .5)][0] + .01}]}];
    r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({elements:els})}); });
  await ctx.addInitScript(() => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    const spots = [[49.92, 10.02], [49.95, 10.1], [50.1, 10.3], [49.5, 9.0]].map((p, i) => ({id:'s' + i, name:'Spot ' + i, lat:p[0], lng:p[1], cat:'c1', created:Date.now()}));
    localStorage.setItem('meine-spots-v1', JSON.stringify({cats:[{id:'c1', name:'Aussicht', color:'#f80', icon:'pin'}], spots}));
    const seg = []; for(let i = 0; i <= 200; i++){ const f = i / 200; seg.push([+(9.9 - .3 * f).toFixed(6), +(49.8 - .1 * f).toFixed(6), i * 10]); }
    localStorage.setItem('meine-spots-tracks', JSON.stringify([{id:'c', name:'Testrunde', created:Date.now() - 1e7, dist:25000, dur:1500000, maxSpd:25, segs:[seg]}])); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.clock.setFixedTime(new Date('2026-12-10T12:00:00+01:00'));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('missing ' + s); el.click(); }, s);
  const txt = s => page.evaluate(s => (document.querySelector(s) || {}).innerText || null, s);
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(2000);
  // Reichweite
  await click('#b-layers'); await page.waitForTimeout(200); await click('#b-reach'); await page.waitForTimeout(1800);
  console.log('reach:', (await txt('#reach') || '').replace(/\n+/g, ' / '), '| hw:', isoQ && isoQ.costing_options.auto.use_highways, '| pop hidden:', await page.evaluate(() => document.querySelector('#layersPop').hidden));
  await page.screenshot({path:`${OUT}/reach-1.png`});
  await click('[data-rc=land]'); await page.waitForTimeout(1200); console.log('land hw:', isoQ.costing_options.auto.use_highways, (await txt('#reach')).replace(/\n+/g, ' / '));
  await click('[data-rc=off]'); await page.waitForTimeout(300); console.log('reach hidden:', await page.evaluate(() => document.querySelector('#reach').hidden));
  // Sperrungen
  await click('[data-tab=tracks]'); await page.waitForTimeout(300); await click('[data-track=c]'); await page.waitForTimeout(400);
  await click('[data-tv=again]'); await page.waitForTimeout(6000);
  console.log('navPrev:', (await txt('#navPrev') || '-').replace(/\n+/g, ' / ').slice(0, 200));
  console.log('block q:', blkQ, '| html:', (await txt('.blk-list') || '-').replace(/\n+/g, ' / '));
  await page.screenshot({path:`${OUT}/block-1.png`});
  console.log('errors', JSON.stringify(errs)); await b.close(); })();
