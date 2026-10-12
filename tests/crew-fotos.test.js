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
  const A = await device(b, 'A', {...base, myName:'Alex'}); await A.goto(`${BASE}/index.html?noonb`); await wait(1500);
  await click(A, '#b-settings'); await wait(300); await click(A, '[data-st=gcreate]'); await wait(300);
  await A.fill('#gp-name', 'Test Crew'); await click(A, '[data-gp=create]'); await wait(1500);
  const inv = await ev(A, () => { const p = JSON.parse(localStorage.getItem('meine-spots-prefs')); return {code:p.group.code, dev:p.dev}; });
  const jpg = col => ev(A, c => { const cv = document.createElement('canvas'); cv.width = 400; cv.height = 300; const x = cv.getContext('2d'); x.fillStyle = c; x.fillRect(0, 0, 400, 300); return cv.toDataURL('image/jpeg', .8); }, col);
  const red = await jpg('#c33');
  // Spot A im Workshop, mit einem Foto
  const sp = {id:'s1', name:'Spot A', lat:49.8, lng:9.9, notes:'', walk:false, parking:null, cat:{name:'Aussicht', color:'#f80', icon:'pin'}, ph:[red], by:'Alex', dev:inv.dev, at:1};
  const docP = `groups/${inv.code}/spots/${inv.dev}_s1`;
  DB.set(docP, {d:{stringValue:JSON.stringify(sp)}, m:{stringValue:JSON.stringify({...sp, ph:undefined, nph:1})}, t:{integerValue:'1'}});
  const spDoc = () => JSON.parse(DB.get(docP).d.stringValue), spMeta = () => JSON.parse(DB.get(docP).m.stringValue);
  const openSpot = async p => { await openP(p, inv.dev); await click(p, '[data-crewspot]'); await wait(800); };
  await sync(A); await openSpot(A);
  console.log('A editor:', await ev(A, () => [!!document.querySelector('.ws-ph-h'), document.querySelectorAll('#wsView .ph-strip img').length, !!document.querySelector('[data-wsd=phadd]')]));
  // Foto löschen
  await click(A, '[data-wsd=phedit]'); await wait(200); await shot(A, 'wsph-edit'); await click(A, '[data-wsd=phdel]');
  for(let i = 0; i < 20 && spDoc().ph.length; i++) await wait(150);
  console.log('after delete:', spDoc().ph.length, spMeta().nph); if(spDoc().ph.length !== 0 || spMeta().nph !== 0) throw new Error('Foto nicht gelöscht');
  await wait(300); const ui1 = await ev(A, () => document.querySelectorAll('#wsView .ph-strip img').length); console.log('ui after delete:', ui1); if(ui1) throw new Error('Foto noch sichtbar');
  // zwei Fotos hinzufügen
  const buf = du => ({name:'f.jpg', mimeType:'image/jpeg', buffer:Buffer.from(du.split(',')[1], 'base64')});
  await A.setInputFiles('#wsPhFile', [buf(await jpg('#3c3')), buf(await jpg('#33c'))]);
  for(let i = 0; i < 30 && spDoc().ph.length < 2; i++) await wait(150);
  console.log('after add:', spDoc().ph.length, spMeta().nph, spDoc().name); if(spDoc().ph.length !== 2 || spMeta().nph !== 2 || spDoc().name !== 'Spot A') throw new Error('Fotos nicht hinzugefügt');
  await wait(400); await shot(A, 'wsph-added');
  const ui2 = await ev(A, () => document.querySelectorAll('#wsView .ph-strip img').length); console.log('ui after add:', ui2); if(ui2 !== 2) throw new Error('neue Fotos nicht sichtbar');
  // B (kein Admin) sieht die neuen Fotos, kann aber nichts ändern
  const B = await device(b, 'B', {...base, myName:'Max'}); await B.goto(`${BASE}/index.html?noonb#join=${inv.code}&g=Test%20Crew`); await wait(1500); await click(B, '[data-gp=join]'); await wait(1500);
  await sync(B); await openSpot(B); await wait(600);
  const vb = await ev(B, () => [document.querySelectorAll('#wsView .ph-strip img').length, !!document.querySelector('.ws-ph-h'), !!document.querySelector('[data-wsd=phadd]')]);
  console.log('B view:', vb); if(vb[0] !== 2 || vb[1] || vb[2]) throw new Error('B-Ansicht falsch');
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
