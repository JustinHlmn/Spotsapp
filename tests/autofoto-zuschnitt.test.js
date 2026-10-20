/* Autofoto: vor dem Übernehmen zuschneiden (verschieben, zoomen), Ergebnis 16:10, Ausschnitt später wieder änderbar, Abbrechen ändert nichts */
const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {})});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|gstatic|firestore|osrm|photon|open-meteo|nominatim|dwd|rainviewer|arcgis|openfreemap|valhalla|overpass/, r => r.abort());
  await ctx.addInitScript(() => { if(localStorage.getItem('__i')) return; localStorage.setItem('__i', 1);
    localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    localStorage.setItem('meine-spots-garage', JSON.stringify({cars:[{id:'c1', make:'Testmarke', model:'Modell X', type:'limo', color:'carbon', created:1}], active:'c1'})); });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const click = s => page.evaluate(s => { const el = document.querySelector(s); if(!el) throw new Error('fehlt ' + s); el.click(); }, s);
  const wait = ms => page.waitForTimeout(ms);
  await page.goto(`${BASE}/index.html?noonb`); await wait(1800);
  await click('#b-settings'); await wait(300); await click('[data-st=garage]'); await wait(300); await click('[data-g=open]'); await wait(300);
  // Testbild 1600×1200: grau, rotes „Auto“ ganz rechts unten
  const jpg = await page.evaluate(() => { const c = document.createElement('canvas'); c.width = 1600; c.height = 1200; const g = c.getContext('2d'); g.fillStyle = '#777'; g.fillRect(0, 0, 1600, 1200); g.fillStyle = '#e11'; g.fillRect(1250, 700, 300, 200); return c.toDataURL('image/jpeg', .9).split(',')[1]; });
  await click('[data-g=photo]'); await wait(200);
  await page.setInputFiles('#gFile', {name:'auto.jpg', mimeType:'image/jpeg', buffer:Buffer.from(jpg, 'base64')}); await wait(900);
  if(!(await page.evaluate(() => !!document.querySelector('#cropper')))) errs.push('Zuschnitt öffnet nicht');
  const stored0 = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-garage')).cars[0].photo || null);
  if(stored0) errs.push('Foto ist schon vor „Fertig“ übernommen');
  await page.screenshot({path:`${OUT}/zs-1-offen.png`});
  // Rahmen-Mitte → rotes Rechteck: nach links oben ziehen, dann zoomen (Regler) und mit Mausrad
  const fr = await page.evaluate(() => { const r = document.querySelector('.cr-frame').getBoundingClientRect(); return {x:r.left + r.width / 2, y:r.top + r.height / 2, w:r.width, h:r.height}; });
  await page.mouse.move(fr.x, fr.y); await page.mouse.down(); await page.mouse.move(fr.x - 120, fr.y - 60, {steps:8}); await page.mouse.move(fr.x - 400, fr.y - 300, {steps:8}); await page.mouse.up();
  await page.evaluate(() => { const r = document.querySelector('#cropper input'); r.value = '2.4'; r.dispatchEvent(new Event('input')); }); await wait(100);
  await page.mouse.move(fr.x, fr.y); await page.mouse.down(); await page.mouse.move(fr.x - 300, fr.y - 200, {steps:10}); await page.mouse.up();
  await page.mouse.move(fr.x, fr.y); await page.mouse.wheel(0, 120); await wait(150);
  // Pinch mit zwei Fingern (Pointer-Ereignisse)
  await page.evaluate(([x, y]) => { const st = document.querySelector('.cr-stage'), P = (t, id, px, py) => st.dispatchEvent(new PointerEvent(t, {pointerId:id, clientX:px, clientY:py, bubbles:true, pointerType:'touch'}));
    P('pointerdown', 11, x - 40, y); P('pointerdown', 12, x + 40, y); for(let i = 1; i <= 6; i++){ P('pointermove', 11, x - 40 - i * 6, y); P('pointermove', 12, x + 40 + i * 6, y); } P('pointerup', 11, 0, 0); P('pointerup', 12, 0, 0); }, [fr.x, fr.y]);
  // jetzt das Auto (Bildpunkt 1400/800) genau in die Rahmenmitte ziehen
  const red = await page.evaluate(() => { const r = document.querySelector('#cropper img').getBoundingClientRect(); return {x:r.left + 1400 / 1600 * r.width, y:r.top + 800 / 1200 * r.height}; });
  const fr2 = await page.evaluate(() => { const r = document.querySelector('.cr-frame').getBoundingClientRect(); return {x:r.left + r.width / 2, y:r.top + r.height / 2}; });
  await page.mouse.move(red.x, red.y); await page.mouse.down(); await page.mouse.move(fr2.x, fr2.y, {steps:12}); await page.mouse.up();
  const st = await page.evaluate(() => { const i = document.querySelector('#cropper img'), f = document.querySelector('.cr-frame').getBoundingClientRect(), r = i.getBoundingClientRect(); return {z:+document.querySelector('#cropper input').value, cover:r.left <= f.left + .5 && r.top <= f.top + .5 && r.right >= f.right - .5 && r.bottom >= f.bottom - .5}; });
  console.log('nach Ziehen/Zoomen:', JSON.stringify(st)); if(!st.cover) errs.push('Bild deckt den Rahmen nicht'); if(!(st.z > 1.2)) errs.push('Zoom wirkt nicht');
  await page.screenshot({path:`${OUT}/zs-2-angepasst.png`});
  await click('[data-cr=ok]'); await wait(900);
  if(await page.evaluate(() => !!document.querySelector('#cropper'))) errs.push('Zuschnitt schließt nicht');
  await page.screenshot({path:`${OUT}/zs-3-uebernommen.png`});
  await click('[data-g=save]'); await wait(500);
  const car = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-garage')).cars[0]);
  console.log('gespeichert:', JSON.stringify({photo:!!car.photo, src:!!car.photoSrc, crop:car.crop}));
  if(!car.photo || !car.photoSrc || !car.crop) errs.push('Foto/Original/Ausschnitt fehlt');
  // gespeichertes Bild: 1280×800, Mitte rot (Auto im Ausschnitt), Ecke nicht ganz rot
  const px = await page.evaluate(id => new Promise(res => { const r = indexedDB.open('meine-spots', 1); r.onsuccess = () => { const q = r.result.transaction('photos').objectStore('photos').get(id); q.onsuccess = async () => { const bm = await createImageBitmap(q.result), c = document.createElement('canvas'); c.width = bm.width; c.height = bm.height; const g = c.getContext('2d'); g.drawImage(bm, 0, 0); const at = (x, y) => [...g.getImageData(x, y, 1, 1).data.slice(0, 3)]; res({w:bm.width, h:bm.height, mid:at(640, 400), corner:at(5, 5)}); }; }; }), car.photo);
  console.log('Ergebnis:', JSON.stringify(px));
  if(px.w !== 1280 || px.h !== 800) errs.push('nicht 16:10');
  if(!(px.mid[0] > 180 && px.mid[1] < 80)) errs.push('Auto nicht in der Mitte des Ausschnitts');
  // erneut öffnen: Ausschnitt wiederhergestellt; Abbrechen ändert nichts
  await click('[data-g=open]'); await wait(300); await click('[data-g=photo]'); await wait(900);
  const z2 = await page.evaluate(() => +document.querySelector('#cropper input').value);
  console.log('wieder geöffnet, Zoom', z2, 'gespeichert', car.crop.z); if(Math.abs(z2 - car.crop.z) > .02) errs.push('Ausschnitt nicht wiederhergestellt');
  await page.keyboard.press('Escape'); await wait(300);
  if(await page.evaluate(() => !!document.querySelector('#cropper'))) errs.push('Escape schließt nicht');
  const car2 = await page.evaluate(() => JSON.parse(localStorage.getItem('meine-spots-garage')).cars[0]);
  if(car2.photo !== car.photo) errs.push('Abbrechen hat das Foto geändert');
  if(!(await page.evaluate(() => !document.querySelector('#modal').hidden && !!document.querySelector('#modal .gar-dlg')))) errs.push('Garage-Dialog nach Escape weg');
  console.log('errors', JSON.stringify(errs)); await b.close(); process.exit(errs.length ? 1 : 0);
})();
