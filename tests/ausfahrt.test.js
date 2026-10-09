const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
const DB = new Map(); let calls = 0;
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
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block', geolocation:{latitude:49.7913, longitude:9.9534, accuracy:10}, permissions:['geolocation']});
  await ctx.route(/arcgisonline|amazonaws|open-meteo|overpass|dwd\.de|rainviewer|openfreemap|gstatic|osrm|openstreetmap\.de|photon|valhalla/, r => r.abort());
  await ctx.route(/nominatim/, r => r.fulfill({status:200, contentType:'application/json', body:JSON.stringify({name:'Tanke', address:{road:'Teststraße', city:'Teststadt'}})}));
  await ctx.route('**/firestore.googleapis.com/**', fsHandler);
  await ctx.addInitScript(p => { if(!sessionStorage.getItem('i')){ sessionStorage.setItem('i', 1); if(!localStorage.getItem('meine-spots-prefs')) localStorage.setItem('meine-spots-prefs', JSON.stringify(p)); } }, prefs);
  const page = await ctx.newPage(); page.on('pageerror', e => errs.push(label + ': ' + e.message));
  page.label = label; return page;
}
const shot = (p, n) => p.screenshot({path:`${OUT}/ev-${n}.png`});
const ev = (p, f, a) => p.evaluate(f, a);
const click = (p, sel) => p.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('missing ' + s); el.click(); }, sel);
const wait = ms => new Promise(r => setTimeout(r, ms));
const toastTxt = p => ev(p, () => (document.querySelector('#toast') || {}).textContent || '');
const sync = async p => { await click(p, '[data-tab=crew]'); await wait(200); if(!(await ev(p, () => !!document.querySelector('[data-wsa=sync]')))) await click(p, '[data-wsa=head]'); await wait(100); await click(p, '[data-wsa=sync]'); await wait(1000); await ev(p, () => { const h = document.querySelector('[data-wsa=head][aria-expanded=true]'); if(h) h.click(); }); await wait(150); };
const keysOf = code => [...DB.keys()].filter(k => k.startsWith(`groups/${code}/reactions/`)).map(k => k.split('/').pop());
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const base = {labels:true, theme:'dark', onb:1};
  const URL0 = `${BASE}/index.html?noonb`;
  const A = await device(b, 'A', {...base, myName:'Alex'}); await A.goto(URL0); await wait(1500);
  await click(A, '#b-settings'); await wait(300); await click(A, '[data-st=gcreate]'); await wait(300);
  await A.fill('#gp-name', 'Test Crew'); await click(A, '[data-gp=create]'); await wait(1500);
  const code = await ev(A, () => JSON.parse(localStorage.getItem('meine-spots-prefs')).group.code);
  DB.set(`groups/${code}/spots/x1`, {d:{stringValue:JSON.stringify({id:'s1', name:'Aussicht West', lat:49.95, lng:9.55, by:'Max', dev:'zz', cat:{name:'A', color:'#f00', icon:'pin'}, ph:[]})}, m:{stringValue:JSON.stringify({id:'s1', name:'Aussicht West', lat:49.95, lng:9.55, by:'Max', dev:'zz', nph:0})}, t:{integerValue:'1'}});
  const join = `${BASE}/index.html?noonb#join=${code}&g=Alexs%20Crew`;
  const B = await device(b, 'B', {...base, myName:'Max'}); await B.goto(join); await wait(1500); await click(B, '[data-gp=join]'); await wait(1500);
  await ev(A, () => document.querySelector('#modal').hidden = true);
  await sync(A); await shot(A, '1-feed-empty');
  console.log('A new-card:', await ev(A, () => document.querySelector('.ev-new')?.innerText.replace(/\n/g, ' / ')));
  // Ausfahrt anlegen: in 20 Min
  await click(A, '[data-ev=new]'); await wait(300);
  const t = new Date(Date.now() + 20 * 60000), pad = n => String(n).padStart(2, '0');
  await A.fill('[data-evf=title]', 'Sonntagsrunde');
  await A.fill('[data-evf=date]', `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`);
  await A.fill('[data-evf=time]', `${pad(t.getHours())}:${pad(t.getMinutes())}`);
  await click(A, '[data-evd=save]'); await wait(200); console.log('A err w/o meet:', await ev(A, () => document.querySelector('#ev-err').textContent));
  await click(A, '[data-evd=meetmap]'); await wait(400); await shot(A, '2-pick');
  console.log('A mode text:', await ev(A, () => document.querySelector('#modeView .big')?.textContent));
  await click(A, '#modeView [data-act=center]'); await wait(800);
  console.log('A meet name:', await ev(A, () => document.querySelector('[data-evf=meetN]')?.value), '| title kept:', await ev(A, () => document.querySelector('[data-evf=title]').value));
  await A.selectOption('[data-evsel=dest]', 'w:x1'); await wait(300);
  await click(A, '[data-evd=rt][data-v=land]'); await wait(200);
  await A.fill('[data-evf=note]', 'Vollgetankt kommen, danach Essen');
  await shot(A, '3-dialog');
  await click(A, '[data-evd=save]'); await wait(1200); await shot(A, '4-card');
  console.log('A toast:', await toastTxt(A));
  console.log('reactions docs:', keysOf(code));
  console.log('A card:', await ev(A, () => document.querySelector('.ev-card')?.innerText.replace(/\n+/g, ' / ')));
  // B sieht die Ausfahrt und sagt zu
  await sync(B); await shot(B, '5-b-feed');
  console.log('B toast:', await toastTxt(B));
  console.log('B feed row:', await ev(B, () => [...document.querySelectorAll('.feed-row')].map(x => x.innerText.replace(/\n/g, ' ')).find(x => /Ausfahrt/.test(x))));
  const evId = await ev(B, () => document.querySelector('.ev-card').id.slice(3));
  await click(B, `[data-ev=rsvp][data-s=yes][data-id="${evId}"]`); await wait(600);
  console.log('B after yes toast:', await toastTxt(B), '| card who:', await ev(B, () => document.querySelector('.ev-who').innerText));
  await shot(B, '6-b-yes');
  // A sieht die Zusage
  await sync(A); console.log('A feed:', await ev(A, () => [...document.querySelectorAll('.feed-row')].map(x => x.innerText.replace(/\n/g, ' ')).slice(0, 3).join(' | ')), '| who:', await ev(A, () => document.querySelector('.ev-who').innerText));
  // B öffnet das Cockpit -> Live-Einwilligung -> Live an
  await click(B, '#b-cockpit'); await wait(2500);
  console.log('B consent:', await ev(B, () => !document.querySelector('#modal').hidden && document.querySelector('#modal .muted')?.textContent));
  await click(B, '[data-lv=ok]'); await wait(500); await B.context().setGeolocation({latitude:49.7918, longitude:9.9540, accuracy:10}); await wait(2500);
  console.log('B live toast:', await toastTxt(B), '| live doc:', DB.has(`groups/${code}/live/${await ev(B, () => JSON.parse(localStorage.getItem('meine-spots-prefs')).dev)}`));
  await shot(B, '7-b-cockpit');
  // B schaltet Live aus -> beim nächsten Cockpit nicht wieder automatisch
  await click(B, '#ckLive'); await wait(500); await B.keyboard.press('Escape'); await wait(600);
  await click(B, '#b-cockpit'); await wait(2500);
  console.log('B live after re-enter (expect false):', await ev(B, () => document.querySelector('#ckLive')?.classList.contains('on')), await toastTxt(B));
  // Tap auf Treffpunkt -> Ortskarte mit "Crew" zurück
  await B.keyboard.press('Escape'); await wait(600);
  await sync(A); await click(A, `[data-ev=meet][data-id="${evId}"]`); await wait(700);
  console.log('A place:', await ev(A, () => document.querySelector('#placeView h2')?.textContent + ' | ' + document.querySelector('#placeView [data-pl=back]')?.textContent.trim()));
  await click(A, '[data-pl=back]'); await wait(400); console.log('A back in crew:', await ev(A, () => !!document.querySelector('.ev-card')));
  // Ändern
  await click(A, `[data-ev=edit][data-id="${evId}"]`); await wait(300); await A.fill('[data-evf=title]', 'Sonntagsrunde XL'); await click(A, '[data-evd=save]'); await wait(900);
  console.log('A after edit:', await ev(A, () => document.querySelector('.ev-h b').textContent), await toastTxt(A));
  // Absagen
  await click(A, `[data-ev=del][data-id="${evId}"]`); await wait(200); await click(A, `[data-ev=del][data-id="${evId}"]`); await wait(900);
  console.log('A after delete:', await ev(A, () => !!document.querySelector('.ev-card')), '| docs:', keysOf(code));
  await shot(A, '8-after-del');
  console.log('calls', calls, 'errors', JSON.stringify(errs)); await b.close();
})();
