const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
// In-Memory-Firestore (REST)
const DB = new Map();   // path -> fields
let calls = 0;
async function fsHandler(r){
  calls++;
  const req = r.request(), u = new URL(req.url()), m = decodeURIComponent(u.pathname).match(/documents\/(.+)$/);
  if(!m) return r.fulfill({status:404, body:'{}'});
  const path = m[1], parts = path.split('/'), isCol = parts.length % 2 === 1, method = req.method();
  const name = p => `projects/jamsis-spots/databases/(default)/documents/${p}`;
  if(method === 'GET' && isCol){
    const pre = path + '/', docs = [...DB.entries()].filter(([k]) => k.startsWith(pre) && !k.slice(pre.length).includes('/'));
    const mask = u.searchParams.getAll('mask.fieldPaths');
    return r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({documents:docs.map(([k, f]) => ({name:name(k), fields:mask.length ? Object.fromEntries(Object.entries(f).filter(([x]) => mask.includes(x))) : f}))})});
  }
  if(method === 'GET'){ const f = DB.get(path); return f ? r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({name:name(path), fields:f})}) : r.fulfill({status:404, body:'{}'}); }
  if(method === 'PATCH'){ const b = JSON.parse(req.postData() || '{}'); DB.set(path, b.fields || {}); return r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({name:name(path), fields:b.fields})}); }
  if(method === 'DELETE'){ DB.delete(path); return r.fulfill({status:200, body:'{}'}); }
  r.fulfill({status:400, body:'{}'});
}
const errs = [];
async function device(b, label, prefs){
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/arcgisonline|amazonaws|open-meteo|overpass|dwd\.de|rainviewer|openfreemap|gstatic|osrm|openstreetmap\.de/, r => r.abort());
  await ctx.route('**/firestore.googleapis.com/**', fsHandler);
  await ctx.addInitScript(p => { if(!sessionStorage.getItem('i')){ sessionStorage.setItem('i', 1); if(!localStorage.getItem('meine-spots-prefs')) localStorage.setItem('meine-spots-prefs', JSON.stringify(p)); } }, prefs);
  const page = await ctx.newPage(); page.on('pageerror', e => errs.push(label + ': ' + e.message));
  page.label = label; return page;
}
const shot = (p, n) => p.screenshot({path:`${OUT}/cr-${n}.png`});
const ev = (p, f, a) => p.evaluate(f, a);
const click = (p, sel) => p.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('missing ' + s); el.click(); }, sel);
const wait = ms => new Promise(r => setTimeout(r, ms));
const openP = async (p, d) => { await click(p, '[data-wss=crew]'); await wait(300); await ev(p, d => document.querySelector(`.crew-grid [data-crew="${d}"]`).click(), d); await wait(500); };
const sync = async p => { await click(p, '[data-tab=crew]'); await wait(200); if(!(await ev(p, () => !!document.querySelector('[data-wsa=sync]')))) await click(p, '[data-wsa=head]'); await wait(100); await click(p, '[data-wsa=sync]'); await wait(900); };
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const base = {labels:true, theme:'dark', onb:1};
  const URL0 = `${BASE}/index.html?noonb`;
  // A erstellt die Crew und legt ein Auto mit Foto an
  const A = await device(b, 'A', {...base, myName:'Alex'}); await A.goto(URL0); await wait(1500);
  await click(A, '#b-settings'); await wait(300); await click(A, '[data-st=gcreate]'); await wait(300);
  await A.fill('#gp-name', 'Test Crew'); await click(A, '[data-gp=create]'); await wait(1500);
  const inv = await ev(A, () => { const p = JSON.parse(localStorage.getItem('meine-spots-prefs')); return {code:p.group.code, dev:p.dev}; });
  await ev(A, () => new Promise(res => {
    const c = document.createElement('canvas'); c.width = 800; c.height = 500; const x = c.getContext('2d'); x.fillStyle = '#c33'; x.fillRect(0, 0, 800, 500);
    c.toBlob(bl => { const r = indexedDB.open('meine-spots', 1); r.onupgradeneeded = () => r.result.createObjectStore('photos');
      r.onsuccess = () => { const t = r.result.transaction('photos', 'readwrite'); t.objectStore('photos').put(bl, 'g_car1_p'); t.oncomplete = () => {
        localStorage.setItem('meine-spots-garage', JSON.stringify({cars:[{id:'car1', make:'Testmarke', model:'Modell X', year:2015, photo:'g_car1_p', type:'limo', color:'carbon', created:1}], active:'car1'})); res(); }; }; }, 'image/jpeg', .8);
  }));
  await A.reload(); await wait(1500); await sync(A);
  const mdoc = () => JSON.parse(DB.get(`groups/${inv.code}/members/${inv.dev}`).d.stringValue);
  for(let i = 0; i < 40 && !(mdoc().rc && mdoc().rc.ph); i++){ if(i === 10) await sync(A); await wait(250); }
  const doc = mdoc();
  console.log('rc shared:', doc.rc && doc.rc.n, '| photo:', !!(doc.rc && /^data:image\/jpeg;base64,/.test(doc.rc.ph)), '| kB:', Math.round(((doc.rc && doc.rc.ph) || '').length / 1024));
  if(!doc.rc || !doc.rc.ph) throw new Error('Autofoto nicht geteilt');
  // eigenes Profil zeigt das Foto
  await openP(A, inv.dev);
  const own = await ev(A, () => { const i = document.querySelector('.crew-carpic img'); return !!i && i.src.startsWith('blob:'); });
  console.log('own profile photo:', own); if(!own) throw new Error('eigenes Profil ohne Autofoto');
  // B tritt bei und sieht Alex' Auto mit Foto
  const join = `${BASE}/index.html?noonb#join=${inv.code}&g=Test%20Crew`;
  const B = await device(b, 'B', {...base, myName:'Max'}); await B.goto(join); await wait(1500); await click(B, '[data-gp=join]'); await wait(1500); await sync(B);
  await openP(B, inv.dev); await shot(B, 'autofoto');
  const seen = await ev(B, () => { const i = document.querySelector('.crew-carpic img'); return [!!i && i.src.startsWith('data:image/jpeg'), document.querySelector('.crew-rc')?.textContent.trim()]; });
  console.log('B sees photo:', seen); if(!seen[0]) throw new Error('B sieht kein Autofoto');
  await click(B, '.crew-carpic'); await wait(200);
  const lb = await ev(B, () => !document.querySelector('#lightbox').hidden && !!document.querySelector('#lightbox img')); console.log('lightbox:', lb); if(!lb) throw new Error('Lightbox fehlt');
  // Teilen aus: Foto verschwindet
  await ev(A, () => document.querySelector('#modal').hidden = true); await click(A, '#b-settings'); await wait(300); await click(A, '[data-st=garage]'); await wait(300); await click(A, '[data-g=share]');
  for(let i = 0; i < 40 && mdoc().rc; i++) await wait(250);
  const doc2 = mdoc(); console.log('after off:', doc2.rc); if(doc2.rc) throw new Error('rc nach Ausschalten noch da');
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
