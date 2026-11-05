/* Blitzer: eintragen über das Kartenmenü, Hinweis im Cockpit nur voraus (bis 500 m), nicht hinter mir und nicht für die Gegenrichtung */
const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
const LAT = 49.9, KX = Math.cos(LAT * Math.PI / 180) * 111320;
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {}), args:['--use-gl=swiftshader']});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla|overpass|kumi/, r => r.abort());
  await ctx.addInitScript(([LAT]) => {
    const subs = new Map(); let n = 0;
    Object.defineProperty(navigator, 'geolocation', {value:{watchPosition:ok => { subs.set(++n, ok); return n; }, clearWatch:id => subs.delete(id), getCurrentPosition:() => {}}, configurable:true});
    window.__gps = (lat, lng, speed) => subs.forEach(f => f({coords:{latitude:lat, longitude:lng, speed, accuracy:8, heading:90}, timestamp:Date.now()}));
    if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1, limit:false}));
    localStorage.setItem('meine-spots-bz', JSON.stringify([
      {id:'bz_a', lat:LAT, lng:10.010, dir:null, t:'fix', at:Date.now()},             // voraus, beide Richtungen
      {id:'bz_b', lat:LAT, lng:9.995, dir:null, t:'mob', at:Date.now()},              // hinter mir
      {id:'bz_c', lat:LAT, lng:10.020, dir:270, t:'fix', at:Date.now()},              // nur Gegenrichtung
      {id:'bz_d', lat:LAT, lng:10.004, dir:null, t:'mob', at:Date.now() - 7 * 3600e3} // mobil, abgelaufen
    ]));
  }, [LAT]);
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('missing ' + s); el.click(); }, s);
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(1800);
  // abgelaufener mobiler Blitzer wird beim Start weggeräumt
  const left = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-bz')).map(x => x.id).join(','));
  if(left !== 'bz_a,bz_b,bz_c') errs.push('abgelaufener Blitzer nicht weggeräumt: ' + left);
  // über das Kartenmenü eintragen (Fadenkreuz, mobil)
  await click('#b-layers'); await page.waitForTimeout(200);
  if(!await page.evaluate(() => !!document.querySelector('#b-bz.on'))) errs.push('Blitzer-Schalter ist nicht an');
  await click('#b-bzadd'); await page.waitForTimeout(300);
  await click('#modeView [data-act=center]'); await page.waitForTimeout(300);
  const dlg = await page.evaluate(() => !document.querySelector('#modal').hidden && !!document.querySelector('#modal [data-bz=add-mob]'));
  if(!dlg) errs.push('Auswahl fest/mobil fehlt');
  await page.screenshot({path:`${OUT}/bz-add.png`});
  await click('#modal [data-bz=add-mob]'); await page.waitForTimeout(300);
  const n = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-bz')).filter(x => x.t === 'mob').length);
  if(n !== 2) errs.push('neuer mobiler Blitzer nicht gespeichert: ' + n);
  await page.evaluate(() => { const a = JSON.parse(localStorage.getItem('meine-spots-bz')); localStorage.setItem('meine-spots-bz', JSON.stringify(a.slice(0, 3))); });
  await page.reload(); await page.waitForTimeout(1800);
  // Cockpit, nach Osten mit 90 km/h
  await click('[data-ck-open]'); await page.waitForTimeout(800);
  if(!await page.evaluate(() => getComputedStyle(document.querySelector('#ckBz')).display !== 'none')) errs.push('Melden-Knopf fehlt im Cockpit');
  const V = 25, step = V / KX, seen = [];
  let shot = false;
  for(let lng = 9.998; lng < 10.026; lng += step){
    await page.evaluate(([la, ln, v]) => __gps(la, ln, v), [LAT, lng, V]);
    await page.waitForTimeout(120);
    const t = await page.evaluate(() => { const el = document.querySelector('#ckRoad'); return el.hidden ? '' : el.innerText.trim(); });
    const toA = (10.010 - lng) * KX;
    seen.push([Math.round(toA), t]);
    if(/Blitzer/.test(t) && !shot && toA < 300){ shot = true; await page.screenshot({path:`${OUT}/bz-cockpit.png`}); }
    if(toA > 520 && /Blitzer/.test(t)) errs.push(`Hinweis zu früh (${Math.round(toA)} m)`);
    if(toA < 460 && toA > 60 && !/Blitzer in/.test(t)) errs.push(`Hinweis fehlt bei ${Math.round(toA)} m: "${t}"`);
    if(toA < -60 && /Blitzer/.test(t)) errs.push(`Hinweis nach dem Blitzer (${Math.round(-toA)} m vorbei) oder für die Gegenrichtung: "${t}"`);
    await page.waitForTimeout(80);
  }
  // Melden während der Fahrt: mobil, mit Fahrtrichtung
  await click('#ckBz'); await page.waitForTimeout(300);
  const added = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-bz')).slice(-1)[0]);
  if(!added || added.t !== 'mob' || Math.abs(added.dir - 90) > 5) errs.push('Melden im Cockpit: ' + JSON.stringify(added));
  console.log('Hinweise:', JSON.stringify(seen.filter(x => x[1]).map(x => x[0] + 'm:' + x[1]).slice(0, 6)), '…');
  console.log('errors', JSON.stringify(errs.slice(0, 8))); await b.close();
  process.exit(errs.length ? 1 : 0);
})();
