/* Spots – Service Worker: App offline starten + Kartenkacheln zwischenspeichern */
const V = 'v59';
const AV = '2026.10.09.03';   // Version von app.js/app.css (tools/bump.py setzt sie zusammen mit index.html)
const APP = 'app-' + V, LIB = 'lib-1', RT = 'tiles-rt';
// App-Dateien: bei jeder Version neu. Bibliotheken und Schriften: eigener Speicher, der Versionen überlebt (spart ~1 MB pro Update)
const SHELL = ['./', './index.html', './app.css?v=' + AV, './app.js?v=' + AV, './manifest.webmanifest', './icon-192.png', './apple-touch-icon.png', './favicon.png'];
const LIBS = ['./lib/maplibre-gl.js', './lib/maplibre-gl.css', './lib/fonts/geist-latin-wght-normal.woff2', './lib/fonts/geist-latin-ext-wght-normal.woff2', './lib/fonts/grenze-gotisch-latin-800-normal.woff2', './lib/fonts/grenze-gotisch-latin-900-normal.woff2'];
const isTile = u => /(^|\.)arcgisonline\.com$/.test(u.hostname) || /elevation-tiles-prod/.test(u.pathname);

self.addEventListener('install', e => {
  e.waitUntil(Promise.all([
    caches.open(APP).then(c => c.addAll(SHELL)),
    caches.open(LIB).then(async c => { for(const u of LIBS) if(!(await c.match(u))) await c.add(u); })
  ]).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('app-') && k !== APP).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

let puts = 0;
async function trim(){
  const c = await caches.open(RT), keys = await c.keys();
  if(keys.length > 3000) await Promise.all(keys.slice(0, keys.length - 2500).map(k => c.delete(k)));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);

  // Clean-Karte (OpenFreeMap): Kacheln ohne Versionsnummer speichern, Schriften dauerhaft, Kachel-Info mit Rückfall
  if(url.hostname === 'tiles.openfreemap.org'){
    const m = url.pathname.match(/^\/planet\/[^/]+\/(\d+)\/(\d+)\/(\d+)\.pbf$/);
    const key = m ? `https://tiles.openfreemap.org/planet/_/${m[1]}/${m[2]}/${m[3]}.pbf` : url.pathname.startsWith('/fonts/') ? req.url : null;
    if(key){
      e.respondWith((async () => {
        const hit = await caches.match(key, {ignoreVary:true});
        if(hit) return hit;
        try{
          const res = await fetch(req);
          if(res.ok){ const copy = res.clone(); caches.open(RT).then(c => c.put(key, copy)).then(() => { if(++puts % 100 === 0) trim(); }).catch(() => {}); }
          return res;
        }catch(err){ return new Response('', {status:504, statusText:'offline'}); }
      })());
      return;
    }
    if(url.pathname === '/planet'){
      e.respondWith(fetch(req).then(res => { if(res.ok){ const copy = res.clone(); caches.open(RT).then(c => c.put(req.url, copy)); } return res; })
        .catch(() => caches.match(req.url).then(hit => hit || new Response('', {status:504}))));
      return;
    }
  }

  // Kartenkacheln: erst Speicher (gespeicherte Gebiete + zuletzt gesehen), dann Netz
  if(isTile(url)){
    e.respondWith((async () => {
      const hit = await caches.match(req.url, {ignoreVary:true});
      if(hit) return hit;
      try{
        const res = await fetch(req);
        if(res.ok){
          const copy = res.clone();
          caches.open(RT).then(c => c.put(req.url, copy)).then(() => { if(++puts % 100 === 0) trim(); }).catch(() => {});
        }
        return res;
      }catch(err){ return new Response('', {status:504, statusText:'offline'}); }
    })());
    return;
  }

  // Eigene Dateien
  if(url.origin === location.origin){
    // Seite selbst: immer zuerst Netz, damit Updates sofort ankommen
    if(req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')){
      // bei schlechtem Netz nach 4 s die gespeicherte Version zeigen (das Netz-Ergebnis landet trotzdem im Speicher)
      const net = fetch(req).then(res => {
        if(res.ok){ const copy = res.clone(); caches.open(APP).then(c => c.put('./index.html', copy)); }
        return res;
      });
      e.respondWith(new Promise(resolve => {
        let done = false; const fin = r => { if(!done && r){ done = true; resolve(r); } };
        const t = setTimeout(() => caches.match('./index.html').then(fin), 4000);
        net.then(r => { clearTimeout(t); fin(r); }).catch(() => { clearTimeout(t); caches.match('./index.html').then(r => fin(r || new Response('Offline', {status:503}))); });
      }));
      return;
    }
    // Versionierte App-Dateien und Bibliotheken ändern sich nie unter derselben Adresse: nur aus dem Speicher, kein Nachladen
    if(url.searchParams.has('v') || url.pathname.includes('/lib/')){
      const store = url.pathname.includes('/lib/') ? LIB : APP;
      e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { if(res.ok){ const copy = res.clone(); caches.open(store).then(c => c.put(req, copy)); } return res; })));
      return;
    }
    // Rest (Icons, Manifest): Speicher sofort, im Hintergrund aktualisieren
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if(res.ok){ const copy = res.clone(); caches.open(APP).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

});
