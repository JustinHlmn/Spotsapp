/* Wetter, Sonne und Straßenwetter nur bei Aussicht-/Chill-artigen Spots, pro Kategorie umschaltbar */
const BASE = process.env.BASE || 'http://127.0.0.1:8765';
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla|overpass/, r => r.abort());
  const wxCalls = [];
  await ctx.route(/open-meteo/, r => { wxCalls.push(new URL(r.request().url()).searchParams.get('latitude')); r.abort(); });
  await ctx.addInitScript(() => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    localStorage.setItem('meine-spots-v1', JSON.stringify({cats:[
      {id:'aus', name:'Aussicht', color:'#f08c00', icon:'mountain'},
      {id:'chill', name:'Chillspot', color:'#7048e8', icon:'star'},
      {id:'park', name:'Parkspot', color:'#3b82f6', icon:'car'},
      {id:'misc', name:'Sonstiges', color:'#868e96', icon:'star'}],
      spots:[
      {id:'a', name:'Spot A', cat:'aus', lat:49.81, lng:9.91, notes:'', created:1, photos:[]},
      {id:'c', name:'Spot B', cat:'chill', lat:49.82, lng:9.92, notes:'', created:2, photos:[]},
      {id:'p', name:'Spot C', cat:'park', lat:49.83, lng:9.93, notes:'', created:3, photos:[]}]})); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('fehlt ' + s); el.click(); }, s);
  const wait = ms => page.waitForTimeout(ms);
  await page.goto(`${BASE}/index.html?noonb`); await wait(2500);
  const cards = async id => { await click(`.item[data-id="${id}"]`); await wait(600); const r = await page.evaluate(() => ({wx:!!document.querySelector('#wxCard'), sun:!!document.querySelector('#sunPlan'), rw:!!document.querySelector('#rwSpot')})); await click('[data-act=back]'); await wait(400); return r; };
  const A = await cards('a'), C = await cards('c'), P = await cards('p');
  console.log('Aussicht', JSON.stringify(A), '| Chill', JSON.stringify(C), '| Park', JSON.stringify(P));
  if(!A.wx || !A.sun || !A.rw) errs.push('Aussicht ohne Wetter');
  if(!C.wx || !C.sun) errs.push('Chillspot ohne Wetter');
  if(P.wx || P.sun || P.rw) errs.push('Parkspot zeigt Wetter');
  // Wetter wird für den Parkspot gar nicht abgefragt (auch nicht für Liste/Sonnenuntergang)
  const parkAsked = wxCalls.some(l => (l || '').split(',').some(x => Math.abs(+x - 49.83) < .001));
  console.log('Abfragen:', wxCalls.length, 'Parkspot abgefragt:', parkAsked); if(parkAsked) errs.push('Wetter für Parkspot geladen');
  // Schalter in den Kategorien: Parkspot einschalten → Wetter da
  await page.evaluate(() => document.querySelector('#catsBtn').click()); await wait(400);
  const sw = await page.evaluate(() => [...document.querySelectorAll('.catblock')].map(b => b.dataset.id + ':' + b.querySelector('.cat-wx').getAttribute('aria-checked')).join(' '));
  console.log('Schalter:', sw); if(sw !== 'aus:true chill:true park:false misc:false') errs.push('Schalter-Vorgaben falsch');
  await page.evaluate(() => document.querySelector('.catblock[data-id="park"] .cat-wx').click()); await wait(200);
  await page.evaluate(() => document.querySelector('#modal [data-act=close]').click()); await wait(400);
  const P2 = await cards('p'); console.log('Park nach Umschalten', JSON.stringify(P2)); if(!P2.wx) errs.push('Schalter wirkt nicht');
  console.log('errors', JSON.stringify(errs)); await b.close(); process.exit(errs.length ? 1 : 0);
})();
