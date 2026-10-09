const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const fs = require('fs');
const HS = process.env.CHROME_PATH || undefined;
let wxCalls = [], geoCalls = 0;
function wxMock(r){
  const u = new URL(r.request().url()); wxCalls.push(u.hostname + ' ' + u.searchParams.get('start_date') + '..' + u.searchParams.get('end_date'));
  const s = Date.parse(u.searchParams.get('start_date') + 'T00:00:00Z') / 1000, e = Date.parse(u.searchParams.get('end_date') + 'T23:00:00Z') / 1000;
  const time = [], t = [], p = [], sn = [];
  for(let h = s; h <= e; h += 3600){
    const d = new Date(h * 1000), mo = d.getUTCMonth(), dom = d.getUTCDate();
    const cold = mo === 11 || mo <= 1, temp = cold ? -1 + (dom % 4) : 9 + (dom % 9);
    const pr = dom % 4 === 0 ? 1.4 : 0;
    time.push(h); t.push(temp); p.push(pr); sn.push(temp < 0 && pr ? .6 : 0);
  }
  r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({hourly:{time, temperature_2m:t, precipitation:p, snowfall:sn}})});
}
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block', acceptDownloads:true});
  await ctx.route(/arcgisonline|amazonaws|overpass|openfreemap|gstatic|firestore|osrm|valhalla|photon|dwd\.de|rainviewer|openstreetmap\.de/, r => r.abort());
  await ctx.route(/open-meteo/, r => r.abort());
  await ctx.route(/open-meteo\.com\/v1\/(archive|forecast)\?.*start_date/, wxMock);
  await ctx.route(/nominatim/, r => { geoCalls++; const lat = +new URL(r.request().url()).searchParams.get('lat'); r.fulfill({status:200, contentType:'application/json', body:JSON.stringify(lat < 50 ? {address:{village:'Dorfheim', road:'Hauptstraße'}} : {address:{city:'Werkstadt', suburb:'Industrie', road:'Ernst-Sachs-Straße'}})}); });
  await ctx.addInitScript(() => {
    if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    const H = [10.05, 49.98], W = [10.21, 50.03];
    const line = (a, b, wig, n = 140) => { const out = []; for(let i = 0; i <= n; i++){ const f = i / n; out.push([a[0] + (b[0] - a[0]) * f + Math.sin(f * Math.PI * 3) * wig, a[1] + (b[1] - a[1]) * f + Math.sin(f * Math.PI) * wig * .6]); } return out; };
    const mk = (id, start, pts, durMin, name, car) => {
      const seg = pts.map((q, i) => [+(q[0] + (Math.random() - .5) * 0.0004 * (i === 0 || i === pts.length - 1 ? 1 : 0)).toFixed(6), +q[1].toFixed(6), Math.round(i / (pts.length - 1) * durMin * 60)]);
      let d = 0; for(let i = 1; i < seg.length; i++){ const dx = (seg[i][0] - seg[i-1][0]) * 71500, dy = (seg[i][1] - seg[i-1][1]) * 111320; d += Math.hypot(dx, dy); }
      return {id, name, created:start, dist:Math.round(d), dur:durMin * 60000, maxSpd:25, segs:[seg], car};
    };
    const tracks = [], now = new Date(); let n = 0;
    const deps = [[6, 15, 17], [6, 20, 18], [6, 40, 18], [6, 50, 19], [7, 5, 25], [7, 10, 26], [7, 20, 27], [7, 25, 24], [7, 40, 21], [7, 50, 22], [6, 10, 17], [7, 15, 25]];
    let day = new Date(now); day.setHours(0, 0, 0, 0); day.setDate(day.getDate() - 1);
    const out = line(H, W, .006), back = line(W, H, .006);
    for(let k = 0; k < deps.length; day.setDate(day.getDate() - 1)){
      const wd = day.getDay(); if(wd === 0 || wd === 6) continue;
      const [h, m, dur] = deps[k++], st = new Date(day); st.setHours(h, m, 0, 0);
      tracks.push(mk('c' + (n++), st.getTime(), out, dur, 'Zur Arbeit', 'car1'));
      const ev = new Date(day); ev.setHours(16, 10 + (k % 4) * 15, 0, 0);
      if(k <= 8) tracks.push(mk('r' + (n++), ev.getTime(), back, 19 + (k % 3), 'Heim', 'car1'));
    }
    // Rundfahrten und eine lange Tour
    for(let i = 0; i < 3; i++){ const st = new Date(now); st.setDate(st.getDate() - 3 - i * 6); st.setHours(21, 30); const loop = [...line(H, [10.3, 49.9], .02, 120), ...line([10.3, 49.9], H, .02, 120)]; tracks.push(mk('l' + i, st.getTime(), loop, 55, 'Abendrunde', i ? 'car2' : 'car1')); }
    const lt = new Date(now); lt.setMonth(lt.getMonth() - 2); lt.setHours(10, 0); tracks.push(mk('long', lt.getTime(), line(H, [9.3, 49.6], .05, 300), 120, 'Lange Tour', 'car1'));
    const old = new Date(now.getFullYear() - 1, 11, 12, 18, 0); tracks.push(mk('y1', old.getTime(), line(H, [10.4, 50.2], .01), 30, 'Winterfahrt', 'car1'));
    tracks.sort((a, b) => b.created - a.created);
    localStorage.setItem('meine-spots-tracks', JSON.stringify(tracks));
    localStorage.setItem('meine-spots-garage', JSON.stringify({cars:[{id:'car1', nick:'Golfi', make:'VW', model:'Golf 7 GTI', year:'2016', type:'klein', color:'red', km:84500, kmAt:Date.now()}, {id:'car2', nick:'Papas Kombi', make:'Skoda', model:'Octavia', type:'kombi', color:'silver', km:150000, kmAt:Date.now()}], active:'car1'}));
  });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const shot = n => page.screenshot({path:`${OUT}/st-${n}.png`});
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('missing ' + s); el.click(); }, s);
  const txt = s => page.evaluate(s => (document.querySelector(s) || {}).innerText || null, s);
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(1800);
  await click('[data-tab=tracks]'); await page.waitForTimeout(300); await click('[data-sub=stats]'); await page.waitForTimeout(4500);
  console.log('wx calls:', wxCalls.join(' | '), '| geo calls:', geoCalls);
  console.log('WAYS:', (await txt('#wayCard') || '').replace(/\n+/g, ' / '));
  console.log('CX:', (await txt('#cxCard') || '').replace(/\n+/g, ' / '));
  await page.evaluate(() => document.querySelector('#wayCard').scrollIntoView()); await page.waitForTimeout(200); await shot('1-ways');
  await page.evaluate(() => document.querySelector('#cxCard').scrollIntoView()); await page.waitForTimeout(200); await shot('2-cx');
  console.log('STYLE:', (await txt('#styleCard') || '').replace(/\n+/g, ' / ')); await page.evaluate(() => document.querySelector('#styleCard').scrollIntoView()); await page.waitForTimeout(200); await shot('2b-style');
  await click('#wayCard [data-wy-open]'); await page.waitForTimeout(500); await shot('3-way');
  console.log('WAY DLG:', (await txt('#modal .way-dlg') || '').replace(/\n+/g, ' / ').slice(0, 900));
  await click('[data-wy=ed][data-k=A]'); await page.waitForTimeout(200); await click('[data-wy=pick][data-n=Zuhause]'); await page.waitForTimeout(300);
  await click('[data-wy=ed][data-k=B]'); await page.waitForTimeout(200); await page.fill('#wy-name', 'ZF Werk'); await click('[data-wy=edok]'); await page.waitForTimeout(300);
  console.log('after rename:', await txt('#modal .wy-head'), '| card:', (await txt('#wayCard') || '').replace(/\n+/g, ' / '));
  await page.evaluate(() => document.querySelector('#modal .way-dlg .pad').scrollTop = 600); await page.waitForTimeout(200); await shot('4-way-bottom');
  await click('[data-wy=trip]'); await page.waitForTimeout(1500);
  console.log('TRACK cx:', await txt('#cxTv'), '| way:', await txt('#wayTv'));
  await shot('5-track');
  // Jahresrückblick
  await click('[data-tab=tracks]'); await page.waitForTimeout(200); await click('[data-sub=stats]'); await page.waitForTimeout(600);
  console.log('wrap card:', await txt('.wr-card'));
  await click('[data-wrap-open]'); await page.waitForTimeout(2500); await shot('6-wrap');
  const keys = await page.evaluate(() => document.querySelectorAll('.wr-bars i').length);
  console.log('slides:', keys, '| years:', await txt('.wr-ys'));
  for(let i = 0; i < keys; i++){
    await page.waitForFunction(() => { const im = document.querySelector('.wr-stage img'); return im.src && document.querySelector('.wr-load').hidden; }, null, {timeout:15000});
    const d = await page.evaluate(async () => { const bl = await (await fetch(document.querySelector('.wr-stage img').src)).blob(); const r = new FileReader(); return await new Promise(res => { r.onload = () => res(r.result); r.readAsDataURL(bl); }); });
    fs.writeFileSync(`${OUT}/wr-${i + 1}.png`, Buffer.from(d.split(',')[1], 'base64'));
    if(i < keys - 1){ await click('[data-wr=next]'); await page.waitForTimeout(900); }
  }
  const [dl] = await Promise.all([page.waitForEvent('download', {timeout:3000}).catch(() => null), click('[data-wr=save]')]);
  console.log('download:', dl && dl.suggestedFilename());
  await click('[data-wr=y]'); await page.waitForTimeout(1500); console.log('year switch slides:', await page.evaluate(() => document.querySelectorAll('.wr-bars i').length));
  await click('[data-wr=close]'); await page.waitForTimeout(300);
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
