/* 300 Fahrten mit je 900 Punkten: Tabs und Ansichten müssen flüssig bleiben */
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined, BASE = process.env.BASE || 'http://127.0.0.1:8765';
(async () => { const b = await chromium.launch({...(HS ? {executablePath:HS} : {}), args:['--use-gl=swiftshader']});
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/arcgisonline|amazonaws|openfreemap|gstatic|firestore|osrm|valhalla|photon|open-meteo|nominatim|dwd|rainviewer|overpass/, r => r.abort());
  const N = +(process.argv[2] || 300), slow = [];
  await ctx.addInitScript(n => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    const tr = [], now = Date.now();
    for(let k = 0; k < n; k++){ const seg = [], a = [10 + (k % 20) * .02, 50 + Math.floor(k / 20) * .02]; for(let i = 0; i < 900; i++){ seg.push([+(a[0] + i * .00012 + Math.sin(i / 30) * .001).toFixed(6), +(a[1] + i * .00005).toFixed(6), i * 2]); }
      tr.push({id:'t' + k, name:'Fahrt ' + k, created:now - k * 36e5 * 20, dist:9000 + k, dur:1800000, maxSpd:25, segs:[seg]}); }
    window.__seed = tr; }, N);
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(1500);
  await page.evaluate(() => new Promise((res, rej) => { const r = indexedDB.open('spots-kv', 1); r.onupgradeneeded = () => r.result.createObjectStore('kv'); r.onsuccess = () => { const t = r.result.transaction('kv', 'readwrite'); t.objectStore('kv').put(window.__seed, 'tracks'); t.oncomplete = res; t.onerror = rej; }; }));
  const t0 = Date.now(); await page.reload(); await page.waitForTimeout(3000);
  console.log('load+3s wall', Date.now() - t0, 'ms');
  const m = async (label, fn) => { const ms = await page.evaluate(async f => { const s = performance.now(); eval(f)(); await new Promise(r => requestAnimationFrame(() => setTimeout(r, 0))); return Math.round(performance.now() - s); }, fn); console.log(label, ms, 'ms'); if(ms > 2500) slow.push(label + ' ' + ms + ' ms'); };
  await m('tab Fahrten', "() => document.querySelector('[data-tab=tracks]').click()");
  await page.waitForTimeout(800);
  await m('open track', "() => document.querySelector('[data-track]').click()");
  await page.waitForTimeout(800);
  await m('back', "() => document.querySelector('#trackView [data-tv=back]').click()");
  await m('Statistik', "() => document.querySelector('[data-sub=stats]').click()");
  await page.waitForTimeout(4000);
  await m('Meine again', "() => document.querySelector('[data-sub=rec]').click()");
  const lt = await page.evaluate(() => { const e = performance.getEntriesByType('longtask'); return e.length; });
  console.log('mem', await page.evaluate(() => performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1e6) + ' MB' : '-'));
  if(slow.length) errs.push('zu langsam: ' + slow.join(', '));
  console.log('errors', JSON.stringify(errs)); await b.close(); })();
