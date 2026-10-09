/* Route-Fehler lässt die Ortsansicht offen · senkrecht wischen auf den Kategorien zieht das Menü */
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined, BASE = process.env.BASE, OUT = process.env.OUT;
(async () => { const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block', geolocation:{latitude:49.9, longitude:10, accuracy:10}, permissions:['geolocation']});
  await ctx.route(/arcgisonline|amazonaws|openfreemap|gstatic|firestore|osrm|valhalla|open-meteo|dwd|rainviewer|overpass|nominatim/, r => r.abort());
  await ctx.route(/photon/, r => r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({features:[{type:'Feature', geometry:{type:'Point', coordinates:[10.1, 50]}, properties:{name:'Testort', city:'Teststadt', country:'Deutschland'}}]})}));
  await ctx.addInitScript(() => { if(sessionStorage.getItem('i')) return; sessionStorage.setItem('i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    const spots = []; for(let i = 0; i < 6; i++) spots.push({id:'s' + i, name:'Spot ' + i, lat:50 + i * .01, lng:10, cat:'c' + (i % 3), created:i});
    localStorage.setItem('meine-spots-v1', JSON.stringify({cats:[0, 1, 2].map(i => ({id:'c' + i, name:'Kategorie ' + i, color:'#f80', icon:'pin'})), spots})); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.goto(`${BASE}/index.html?noonb`, {waitUntil:'domcontentloaded'}); await page.waitForTimeout(2000);
  // senkrecht auf den Chips wischen (erst halb öffnen, damit die Chips zu sehen sind)
  await page.evaluate(() => document.querySelector('.grabwrap').click()); await page.waitForTimeout(700);
  const y0 = await page.evaluate(() => document.querySelector('#panel').style.transform);
  const r = await page.evaluate(() => { const c = document.querySelector('#chips').getBoundingClientRect(); return {x:c.left + 60, y:c.top + c.height / 2}; });
  await page.mouse.move(r.x, r.y); await page.mouse.down(); for(let i = 1; i <= 8; i++){ await page.mouse.move(r.x, r.y - i * 40); await page.waitForTimeout(20); } await page.mouse.up(); await page.waitForTimeout(700);
  const y1 = await page.evaluate(() => document.querySelector('#panel').style.transform);
  if(y0 === y1) errs.push('Wischen auf den Kategorien hat das Menü nicht bewegt');
  // Ort suchen, Route planen schlägt fehl → Ortsansicht bleibt
  await page.evaluate(() => document.querySelector('#searchBtn').click()); await page.waitForTimeout(300);
  await page.fill('#q', 'Testort'); await page.waitForTimeout(400);
  await page.evaluate(() => { const g = document.querySelector('[data-geosearch]'); if(g) g.click(); }); await page.waitForTimeout(1500);
  const opened = await page.evaluate(() => { const it = document.querySelector('#listBody [data-geo], #listBody .geo-it'); if(it){ it.click(); return true; } return false; });
  await page.waitForTimeout(800);
  if(opened){
    await page.evaluate(() => document.querySelector('[data-pl=route]').click()); await page.waitForTimeout(6000);
    const still = await page.evaluate(() => !document.querySelector('#placeView').hidden);
    if(!still) errs.push('Ortsansicht nach fehlgeschlagener Route geschlossen');
  } else console.log('kein Suchtreffer – Routen-Teil übersprungen');
  await page.screenshot({path:`${OUT}/kleinkram.png`});
  console.log('errors', JSON.stringify(errs)); await b.close(); })();
