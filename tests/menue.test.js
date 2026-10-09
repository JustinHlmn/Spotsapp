const BASE = process.env.BASE || 'http://127.0.0.1:8765', OUT = process.env.OUT || require('os').tmpdir();
const { chromium } = require('playwright');
const HS = process.env.CHROME_PATH || undefined;
(async () => {
  const b = await chromium.launch({...(HS ? {executablePath:HS} : {}), args:['--use-gl=swiftshader']});
  const ctx = await b.newContext({viewport:{width:390, height:844}, deviceScaleFactor:2, isMobile:true, hasTouch:true, serviceWorkers:'block'});
  await ctx.route(/amazonaws|overpass|gstatic|firestore|osrm|valhalla|photon|open-meteo|nominatim|dwd|rainviewer/, r => r.abort());
  await ctx.addInitScript(() => { if(!localStorage.getItem('__i')){ localStorage.setItem('__i', 1); localStorage.setItem('meine-spots-prefs', JSON.stringify({labels:true, theme:'dark', onb:1}));
    const spots = []; for(let i = 0; i < 40; i++) spots.push({id:'s' + i, name:'Spot ' + i, lat:50 + i * .01, lng:10 + i * .01, cat:'c1', created:Date.now() - i * 1e6});
    localStorage.setItem('meine-spots-v1', JSON.stringify({cats:[{id:'c1', name:'Aussicht', color:'#f80', icon:'pin'}], spots})); } });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', e => errs.push(e.message));
  const st = () => page.evaluate(() => ({view:[...document.querySelectorAll('#panel .view')].filter(v => !v.hidden).map(v => v.id).join(), y:document.querySelector('#panel').style.transform, full:document.querySelector('#panel').classList.contains('full'), sc:document.querySelector('#listView .pb').scrollTop, items:document.querySelectorAll('#listBody .item').length, lvH:document.querySelector('#listView').clientHeight, dvH:document.querySelector('#detailView').clientHeight}));
  await page.goto(`${BASE}/index.html?noonb`); await page.waitForTimeout(2500);
  console.log('0', JSON.stringify(await st()));
  await page.tap('#listBody .item'); await page.waitForTimeout(700); console.log('1 detail', JSON.stringify(await st()));
  await page.tap('#detailView [data-act=back]'); await page.waitForTimeout(700); console.log('2 back (expect = 0)', JSON.stringify(await st()));
  await page.evaluate(() => document.querySelector('.grabwrap').click()); await page.waitForTimeout(600);
  await page.evaluate(() => { const p = document.querySelector('#panel'); });
  // auf full ziehen
  { const y0 = await page.evaluate(() => document.querySelector('#listView .ph').getBoundingClientRect().top + 20); await page.mouse.move(200, y0); await page.mouse.down(); for(let i = 1; i <= 10; i++){ await page.mouse.move(200, y0 - i * 60); await page.waitForTimeout(16); } await page.mouse.up(); await page.waitForTimeout(700); }
  await page.evaluate(() => window.dispatchEvent(new Event('x')));
  console.log('3', JSON.stringify(await st())); console.log(await page.evaluate(() => { let e = document.querySelector('#listView .pb'), out = []; while(e && e.tagName !== 'BODY'){ const c = getComputedStyle(e); out.push((e.id || e.className.toString().slice(0,30)) + ' h=' + e.clientHeight + ' disp=' + c.display + ' H=' + c.height + ' maxH=' + c.maxHeight + ' flex=' + c.flex + ' minH=' + c.minHeight + ' st=' + e.getAttribute('style') + ' cls=' + e.className + ' fd=' + c.flexDirection + ' kids=' + [...e.children].filter(k => getComputedStyle(k).display !== 'none').map(k => k.id || k.className).join('+')); e = e.parentElement; } return out.join(' | '); }));
  console.log(await page.evaluate(() => { const e = document.querySelector('#listView .pb'); e.scrollTop = 900; return getComputedStyle(e).overflowY + ' ' + e.scrollHeight + '/' + e.clientHeight + ' ' + e.scrollTop; })); await page.waitForTimeout(200); console.log('4 scrolled', JSON.stringify(await st()));
  await page.evaluate(() => [...document.querySelectorAll('#listBody .item')].find(x => x.getBoundingClientRect().top > 300).click()); await page.waitForTimeout(700); console.log('5 detail', JSON.stringify(await st()));
  await page.evaluate(() => document.querySelector('#detailView [data-act=back]').click()); await page.waitForTimeout(700); console.log('6 back (expect sc 900)', JSON.stringify(await st()));
  await page.screenshot({path:`${OUT}/m2-6.png`});
  console.log('errors', JSON.stringify(errs)); await b.close();
})();
