/* Mehrere Fotos je Auto: altes Einzelfoto wird übernommen, weitere hinzufügen, Titelbild wählen, Foto löschen,
   Speichern räumt Gelöschtes auf, Zurück ohne Speichern verwirft neue Fotos */
const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla|overpass/, r => r.abort());
  await ctx.addInitScript(() => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    localStorage.setItem('meine-spots-garage', JSON.stringify({cars:[{id:'c1', make:'Testmarke', model:'Modell X', type:'limo', color:'carbon', created:1, photo:'g_c1_alt'}], active:'c1'})); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('fehlt ' + s); el.click(); }, s);
  const wait = ms => page.waitForTimeout(ms);
  const db = (op, id, dataUrl) => page.evaluate(([op, id, du]) => new Promise(res => { const r = indexedDB.open('meine-spots', 1); r.onupgradeneeded = () => r.result.createObjectStore('photos');
    r.onsuccess = async () => { const st = r.result.transaction('photos', op === 'get' ? 'readonly' : 'readwrite').objectStore('photos');
      if(op === 'put'){ const bl = await (await fetch(du)).blob(); const t = r.result.transaction('photos', 'readwrite'); t.objectStore('photos').put(bl, id); t.oncomplete = () => res(true); }
      else { const q = st.get(id); q.onsuccess = () => res(!!q.result); } }; }), [op, id, dataUrl]);
  const img = col => page.evaluate(c => { const cv = document.createElement('canvas'); cv.width = 800; cv.height = 500; const g = cv.getContext('2d'); g.fillStyle = c; g.fillRect(0, 0, 800, 500); return cv.toDataURL('image/jpeg', .9); }, col);
  const car = () => page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-garage')).cars[0]);
  const thumbs = () => page.evaluate(() => [...document.querySelectorAll('.gstrip .gth:not(.add) img')].map(i => i.dataset.ph));
  const addPhoto = async col => { await click('[data-g=addph]'); await wait(150); const du = await img(col);
    await page.setInputFiles('#gFile', {name:'f.jpg', mimeType:'image/jpeg', buffer:Buffer.from(du.split(',')[1], 'base64')}); await wait(800); await click('[data-cr=ok]'); await wait(700); };
  await page.goto(`${BASE}/index.html?noonb`); await wait(1500);
  await db('put', 'g_c1_alt', await img('#c33'));
  await click('#b-settings'); await wait(300); await click('[data-st=garage]'); await wait(300); await click('[data-g=open]'); await wait(400);
  let t = await thumbs(); console.log('altes Foto übernommen:', JSON.stringify(t), 'Plus-Kachel:', await page.evaluate(() => !!document.querySelector('[data-g=addph]')));
  if(t.length !== 1 || t[0] !== 'g_c1_alt') errs.push('altes Einzelfoto fehlt in der Galerie');
  await addPhoto('#33c'); await addPhoto('#3c3');
  t = await thumbs(); console.log('nach 2× hinzufügen:', t.length); if(t.length !== 3) errs.push('Fotos nicht hinzugefügt');
  if((await car()).photos) errs.push('vor dem Speichern schon übernommen');
  await page.screenshot({path:`${OUT}/mf-1-galerie.png`});
  // drittes Foto als Titelbild
  const green = t[2]; await click('.gstrip .gth[data-i="2"]'); await wait(800);
  if(!(await page.evaluate(() => !!document.querySelector('[data-cr=cover]') && !!document.querySelector('[data-cr=del]')))) errs.push('Titelbild/Löschen fehlen im Zuschnitt');
  await click('[data-cr=cover]'); await wait(700);
  t = await thumbs(); const coverImg = await page.evaluate(() => document.querySelector('.gphoto img')?.dataset.ph);
  console.log('nach Titelbild:', JSON.stringify(t), 'gross:', coverImg);
  if(t.length !== 3 || coverImg !== t[0] || t.includes(green)) errs.push('Titelbild nicht nach vorne');   // neu zugeschnitten = neue ID, alte weg
  // Titelbild-Platz bietet kein „Als Titelbild“
  await click('.gstrip .gth[data-i="0"]'); await wait(700);
  if(await page.evaluate(() => !!document.querySelector('[data-cr=cover]'))) errs.push('Titelbild bietet „Als Titelbild“ an');
  await click('[data-cr=cancel]'); await wait(300);
  // zweites Foto löschen (zweimal tippen)
  const del = t[1]; await click('.gstrip .gth[data-i="1"]'); await wait(700); await click('[data-cr=del]'); await wait(150);
  if((await thumbs()).length !== 3 || !(await page.evaluate(() => !!document.querySelector('#cropper')))) errs.push('Löschen ohne Rückfrage');
  await click('[data-cr=del]'); await wait(600);
  t = await thumbs(); console.log('nach Löschen:', JSON.stringify(t)); if(t.length !== 2 || t.includes(del)) errs.push('Foto nicht gelöscht');
  await click('[data-g=save]'); await wait(600);
  const c = await car(); console.log('gespeichert:', JSON.stringify({n:c.photos.length, cover:c.photo === c.photos[0].id, ids:c.photos.map(p => p.id)}));
  if(c.photos.length !== 2 || c.photo !== c.photos[0].id) errs.push('Speichern falsch');
  const listCount = await page.evaluate(() => document.querySelector('.gcar .gcount')?.textContent); console.log('Liste zeigt:', listCount); if(listCount !== '2') errs.push('Anzahl in der Liste fehlt');
  await page.screenshot({path:`${OUT}/mf-2-liste.png`});
  if(await db('get', del)) errs.push('gelöschtes Foto noch gespeichert');
  for(const p of c.photos) if(!(await db('get', p.id))) errs.push('Foto-Datei fehlt: ' + p.id);
  // neues Foto hinzufügen, dann „Garage“ ohne Speichern → verworfen
  await click('[data-g=open]'); await wait(400); await addPhoto('#cc3'); const extra = (await thumbs())[2];
  await click('[data-g=back]'); await wait(500);
  const c2 = await car(); if(c2.photos.length !== 2) errs.push('ungespeichertes Foto übernommen'); if(extra && await db('get', extra)) errs.push('ungespeichertes Foto bleibt liegen');
  // Auto löschen räumt alle Fotos weg
  await click('[data-g=open]'); await wait(400); await click('[data-g=del]'); await wait(200); await click('[data-g=del]'); await wait(600);
  for(const p of c.photos){ if(await db('get', p.id)) errs.push('Foto nach Auto-Löschen noch da'); if(p.src && await db('get', p.src)) errs.push('Original nach Auto-Löschen noch da'); }
  console.log('errors', JSON.stringify(errs)); await b.close(); process.exit(errs.length ? 1 : 0);
})();
