/* Jamsis Spots – Service Worker: App offline starten + Kartenkacheln zwischenspeichern */
const V = 'v16';
const APP = 'app-' + V, RT = 'tiles-rt', SAVED = 'tiles-saved';
const SHELL = ['./', './index.html', './lib/maplibre-gl.js', './lib/maplibre-gl.css', './lib/three.min.js', './lib/fonts/grenze-gotisch-latin-800-normal.woff2', './lib/fonts/grenze-gotisch-latin-900-normal.woff2', './manifest.webmanifest', './icon-192.png', './apple-touch-icon.png', './favicon.png'];
const isTile = u => /(^|\.)arcgisonline\.com$/.test(u.hostname) || /elevation-tiles-prod/.test(u.pathname);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).catch(() => {}).then(() => self.skipWaiting()));
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
      e.respondWith(fetch(req).then(res => {
        if(res.ok){ const copy = res.clone(); caches.open(APP).then(c => c.put('./index.html', copy)); }
        return res;
      }).catch(() => caches.match('./index.html')));
      return;
    }
    // Rest (Bibliothek, Icons): Speicher sofort, im Hintergrund aktualisieren
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if(res.ok){ const copy = res.clone(); caches.open(APP).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // Schrift
  if(/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(APP).then(c => c.put(req, copy)); return res;
    })));
  }
});
