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
const sync = async p => { await click(p, '[data-tab=crew]'); await wait(200); if(!(await ev(p, () => !!document.querySelector('[data-wsa=sync]')))) await click(p, '[data-wsa=head]'); await wait(100); await click(p, '[data-wsa=sync]'); await wait(900); };
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const base = {labels:true, theme:'dark', onb:1};
  const URL0 = `${BASE}/index.html?noonb`;
  // A: Alex erstellt die Crew
  const A = await device(b, 'A', {...base, myName:'Alex'}); await A.goto(URL0); await wait(1500);
  await click(A, '#b-settings'); await wait(300); await click(A, '[data-st=gcreate]'); await wait(300);
  await A.fill('#gp-name', 'Test Crew'); await click(A, '[data-gp=create]'); await wait(1500);
  const inv = await ev(A, () => { const p = JSON.parse(localStorage.getItem('meine-spots-prefs')); return {code:p.group.code, dev:p.dev}; });
  await wait(1500); console.log('keys', [...DB.keys()].map(k => k.split('/').slice(2).join('/')).join(',')); console.log('A admin?', [...DB.keys()].filter(k => k.endsWith('/_crew')).length, JSON.parse(DB.get(`groups/${inv.code}/members/_crew`).d.stringValue).admin[0] === inv.dev);
  const join = `${BASE}/index.html?noonb#join=${inv.code}&g=Alexs%20Crew`;
  // B: Max tritt bei
  const B = await device(b, 'B', {...base, myName:'Max'}); await B.goto(join); await wait(1500); await click(B, '[data-gp=join]'); await wait(1500);
  // C: will "max" heißen -> Fehler; dann "Alex" -> Fehler; dann "Lena"
  const C = await device(b, 'C', {...base}); await C.goto(join); await wait(1500);
  await C.fill('#gp-me', 'max'); await click(C, '[data-gp=join]'); await wait(800); const e1 = await ev(C, () => document.querySelector('#gp-err').textContent);
  await shot(C, '1-dupe');
  await C.fill('#gp-me', 'Älex'); await click(C, '[data-gp=join]'); await wait(800); const e2 = await ev(C, () => document.querySelector('#gp-err').textContent);
  await C.fill('#gp-me', 'Lena'); await click(C, '[data-gp=join]'); await wait(1500);
  console.log('C errors:', e1, '|', e2, '| joined:', await ev(C, () => !!JSON.parse(localStorage.getItem('meine-spots-prefs')).group));
  // A: Admin-Panel
  await sync(A); await click(A, '#b-settings'); await wait(300);
  console.log('A has admin row:', await ev(A, () => !!document.querySelector('[data-st=admin]')), 'B has admin row:', await (async () => { await click(B, '#b-settings'); await wait(300); return ev(B, () => !!document.querySelector('[data-st=admin]')); })());
  await click(A, '[data-st=admin]'); await wait(300); await shot(A, '2-admin');
  // Lena rauswerfen, Max sperren
  const devOf = async p => ev(p, () => JSON.parse(localStorage.getItem('meine-spots-prefs')).dev);
  const devB = await devOf(B), devC = await devOf(C);
  await click(A, `[data-adm=kick][data-dev="${devC}"]`); await wait(200); await click(A, `[data-adm=kick][data-dev="${devC}"]`); await wait(900);
  await click(A, `[data-adm=ban][data-dev="${devB}"]`); await wait(200); await click(A, `[data-adm=ban][data-dev="${devB}"]`); await wait(900); await shot(A, '3-after');
  await ev(B, () => document.querySelector('#modal').hidden = true); await sync(B); await shot(B, '4-banned');
  console.log('B kicked out:', await ev(B, () => !JSON.parse(localStorage.getItem('meine-spots-prefs')).group), await ev(B, () => document.querySelector('#modal .muted')?.textContent));
  await sync(C); console.log('C kicked out:', await ev(C, () => !JSON.parse(localStorage.getItem('meine-spots-prefs')).group), await ev(C, () => document.querySelector('#modal .muted')?.textContent));
  // B versucht wieder beizutreten
  await B.goto(join); await wait(1500); await click(B, '[data-gp=join]'); await wait(900); console.log('B rejoin:', await ev(B, () => document.querySelector('#gp-err')?.textContent));
  // C darf wieder rein
  await C.goto(join); await wait(1500); await click(C, '[data-gp=join]'); await wait(1500); await sync(C); console.log('C rejoined:', await ev(C, () => !!JSON.parse(localStorage.getItem('meine-spots-prefs')).group));
  // Ein Spot im Workshop, dann Link erneuern
  DB.set(`groups/${inv.code}/spots/x1`, {d:{stringValue:JSON.stringify({id:'s1', name:'Testspot', lat:49.8, lng:9.9, by:'Lena', dev:devC, cat:{name:'A', color:'#f00', icon:'pin'}, ph:[]})}, m:{stringValue:JSON.stringify({id:'s1', name:'Testspot', lat:49.8, lng:9.9, by:'Lena', dev:devC, nph:0})}, t:{integerValue:'1'}});
  await ev(A, () => document.querySelector('#modal').hidden = true); await sync(A); await click(A, '#b-settings'); await wait(300); await click(A, '[data-st=admin]'); await wait(300);
  await click(A, '[data-adm=renew]'); await wait(200); await click(A, '[data-adm=renew]'); await wait(3000); await shot(A, '5-renewed');
  const code2 = await ev(A, () => JSON.parse(localStorage.getItem('meine-spots-prefs')).group.code);
  console.log('renewed:', code2 !== inv.code, 'old docs left:', [...DB.keys()].filter(k => k.startsWith(`groups/${inv.code}/`)).map(k => k.split('/').slice(2).join('/')), 'new docs:', [...DB.keys()].filter(k => k.startsWith(`groups/${code2}/`)).length);
  await sync(C); console.log('C after renew:', await ev(C, () => !JSON.parse(localStorage.getItem('meine-spots-prefs')).group), await ev(C, () => document.querySelector('#modal .muted')?.textContent));
  // Gerät verknüpfen: PC übernimmt Alex
  await ev(A, () => document.querySelector('#modal').hidden = true); await click(A, '#b-settings'); await wait(300); await click(A, '[data-st=link]'); await wait(300); await shot(A, '6-linkdlg');
  const link = await ev(A, () => document.querySelector('.lnk-box').textContent);
  const D = await device(b, 'D', {...base, myName:'PC-Test'}); await D.goto(link.replace('index.html', 'index.html?noonb').replace(/^https?:\/\/[^/]+/, `${BASE}`)); await wait(3500); await shot(D, '7-accept');
  await click(D, '[data-lk=yes]'); await wait(1800); await click(D, '#b-settings'); await wait(300);
  console.log('D is Alex admin:', await ev(D, () => [JSON.parse(localStorage.getItem('meine-spots-prefs')).myName, !!document.querySelector('[data-st=admin]')]));
  await shot(D, '8-settings');
  // E: neues Handy über die Einführung, Name schon vergeben
  const join2 = `${BASE}/index.html#join=${code2}&g=Alexs%20Crew`;
  const E = await device(b, 'E', {labels:true, theme:'dark'}); await E.goto(join2); await wait(2500);
  const onbTxt = () => ev(E, () => (document.querySelector('#onb .onb-head h2, #onb .onb-hero h1') || {}).textContent);
  await click(E, '[data-onb=next]'); await wait(200); await click(E, '[data-onb=next]'); await wait(200);
  await E.fill('#onb-name', 'lena'); await click(E, '[data-onb=name]'); await wait(300);
  console.log('E group step:', await onbTxt()); await click(E, '[data-onb=join]'); await wait(900);
  console.log('E after join try:', await onbTxt(), '|', await ev(E, () => document.querySelector('#onb .err')?.textContent)); await shot(E, '9-onb-dupe');
  await E.fill('#onb-name', 'Tom'); await click(E, '[data-onb=name]'); await wait(1200);
  console.log('E final:', await onbTxt(), '| group:', await ev(E, () => !!JSON.parse(localStorage.getItem('meine-spots-prefs')).group), '| name:', await ev(E, () => JSON.parse(localStorage.getItem('meine-spots-prefs')).myName));
  console.log('calls', calls, 'errors', JSON.stringify(errs)); await b.close();
})();
