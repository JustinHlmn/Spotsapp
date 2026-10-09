(() => {
/* ================= Daten ================= */
const KEY = 'meine-spots-v1', PREF = 'meine-spots-prefs';
const ICONS = {
  mountain:'<path d="M3 19 9 9l4 6 3-4 5 8z"/>',
  camera:'<path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  flag:'<path d="M6 21V4h11l-2 4 2 4H6"/>',
  waves:'<path d="M3 9c3 0 3-2 6-2s3 2 6 2 3-2 6-2M3 15c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>',
  tent:'<path d="M3 20 12 4l9 16zM9.5 20 12 15l2.5 5"/>',
  food:'<path d="M7 3v18M5 3v5a2 2 0 0 0 4 0V3M17 21V3c-2 1.5-3 4-3 7h3"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
  tree:'<path d="M12 3 6 12h3l-3 5h12l-3-5h3zM12 17v4"/>',
  car:'<path d="M5 16v-5l2-5h10l2 5v5M3 16h18v3H3zM7 19v2M17 19v2"/>',
  heart:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  drop:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
  pin:'<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'
};
const ICON_DE = {mountain:'Berg', camera:'Kamera', flag:'Flagge', waves:'Wasser', tent:'Zelt', food:'Essen', star:'Stern', tree:'Baum', car:'Auto', heart:'Herz', drop:'Tropfen', pin:'Markierung'};
const UI = {
  pencil:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', search:'<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>',
  route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/>',
  pause:'<path d="M8.5 5v14M15.5 5v14"/>', play:'<path d="M8 5.5v13l11-6.5z" fill="currentColor"/>',
  stop:'<rect x="6.5" y="6.5" width="11" height="11" rx="2.5" fill="currentColor" stroke="none"/>',
  gauge:'<path d="M4.5 17.5a8.5 8.5 0 1 1 15 0"/><path d="m12 13.5 4.2-4.2"/><circle cx="12" cy="13.5" r="1.4" fill="currentColor"/>',
  timer:'<circle cx="12" cy="13.5" r="7.5"/><path d="M12 13.5V9.5M10 2.5h4M18.5 6.5 20 5"/>',
  share:'<path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/>',
  here:'<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5"/>',
  sidebar:'<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><path d="M9.5 4.5v15M14.5 10l-2 2 2 2"/>',
  list:'<path d="M8 6.5h12M8 12h12M8 17.5h12"/><circle cx="4" cy="6.5" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="17.5" r="1" fill="currentColor"/>',
  layers:'<path d="m12 3.5 8.5 4.6L12 12.7 3.5 8.1z"/><path d="m3.5 12.4 8.5 4.6 8.5-4.6"/><path d="m3.5 16.3 8.5 4.2 8.5-4.2"/>',
  spkOn:'<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11"/>',
  spkOff:'<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/>',
  locate:'<path d="M3 11 21 3l-8 18-2-8z"/>', labels:'<path d="M5 7h14M12 7v12M8 19h8"/>',
  back:'<path d="M15 5 8 12l7 7"/>', close:'<path d="M6 6l12 12M18 6 6 18"/>',
  car:'<path d="M5 16v-5l2-5h10l2 5v5M3 16h18v3H3zM7 19v2M17 19v2"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  nav:'<path d="M3 11 21 3l-8 18-2-8z"/>', globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/>'
};
const svg = (p, s = 16, w = 2.2) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const ic = (name, s) => svg(ICONS[name] || ICONS.pin, s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = () => Math.random().toString(36).slice(2, 10);
const $ = s => document.querySelector(s);

const DEFAULT_CATS = [
  {id:'aussicht', name:'Aussicht',  color:'#f08c00', icon:'mountain'},
  {id:'foto',     name:'Fotospot',  color:'#d6336c', icon:'camera'},
  {id:'wandern',  name:'Wandern',   color:'#2f9e44', icon:'flag'},
  {id:'baden',    name:'Baden',     color:'#1c7ed6', icon:'waves'},
  {id:'camping',  name:'Camping',   color:'#7048e8', icon:'tent'},
  {id:'essen',    name:'Essen',     color:'#e8590c', icon:'food'},
  {id:'sonstiges',name:'Sonstiges', color:'#868e96', icon:'star'}
];
const SAMPLE = [
  {id:'bsp1', name:'Bastei-Aussicht', cat:'aussicht', notes:'Beispiel-Spot (Koordinaten ungefähr) – kannst du löschen.\nBlick über das Elbtal.', lat:50.9619, lng:14.0731, walk:true, parking:{lat:50.9659, lng:14.0682, note:'Parkplatz Bastei, gebührenpflichtig'}, created:Date.now()},
  {id:'bsp2', name:'Eibsee Nordufer', cat:'baden', notes:'Beispiel-Spot (Koordinaten ungefähr) – kannst du löschen.\nRuhige Bucht, früh morgens kommen.', lat:47.4603, lng:10.9745, walk:true, parking:{lat:47.4569, lng:10.9921, note:'Großer Parkplatz am Eibsee'}, created:Date.now()-1}
];

/* Wiederkehrende Aufgaben, die nur bei sichtbarer App laufen: im Hintergrund komplett angehalten (spart Akku) */
const EVERY = [];
function every(fn, ms){ const t = {fn, ms, id:null}; EVERY.push(t); if(!document.hidden) t.id = setInterval(fn, ms); return t; }
document.addEventListener('visibilitychange', () => {
  EVERY.forEach(t => { clearInterval(t.id); t.id = null; if(!document.hidden){ t.id = setInterval(t.fn, t.ms); try{ t.fn(); }catch(e){} } });
});
/* Fremddaten säubern: Farben und IDs landen in HTML-Attributen – nur harmlose Zeichen zulassen */
const okColor = c => typeof c === 'string' && /^#[0-9a-f]{3,8}$/i.test(c) ? c : '#868e96';
const SAFE_ID = new Set(['id', '_id', 'cat', 'dev', 'car', 'docId', 'icon', 'fromDrive', 'fromTrack', 'ws', 'by_dev', 'sid', 'tid', 'cid', 'rid']);
function sanitize(o, depth = 0){
  if(!o || typeof o !== 'object' || depth > 12) return o;
  if(Array.isArray(o)){ for(let i = 0; i < o.length; i++) if(o[i] && typeof o[i] === 'object') sanitize(o[i], depth + 1); return o; }
  for(const k of Object.keys(o)){
    const v = o[k];
    if(k === '__proto__' || k === 'constructor'){ delete o[k]; continue; }
    if(k === 'color' || k === 'col') o[k] = okColor(v);
    else if(typeof v === 'string' && SAFE_ID.has(k)) o[k] = v.replace(/[^\w.:-]/g, '').slice(0, 80);
    else if(v && typeof v === 'object') sanitize(v, depth + 1);
  }
  return o;
}
const sjson = t => sanitize(JSON.parse(t));
function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){ const d = sjson(raw); if(d && Array.isArray(d.spots) && Array.isArray(d.cats)) return d; }
  }catch(e){}
  return {cats: structuredClone(DEFAULT_CATS), spots: structuredClone(SAMPLE)};
}
let data = load();
let storageOk = true;
function save(){
  bkDirty();
  try{ localStorage.setItem(KEY, JSON.stringify(data)); }
  catch(e){ if(storageOk){ storageOk = false; toast('Speichern im Browser nicht möglich – sichere deine Daten unter Einstellungen › „Backup-Datei speichern“.'); } }
}
let prefs = {labels:true, gps:false, terrain:false, base:'sat'};
try{ Object.assign(prefs, JSON.parse(localStorage.getItem(PREF) || '{}')); }catch(e){}
const savePrefs = () => { try{ localStorage.setItem(PREF, JSON.stringify(prefs)); }catch(e){} };
const catById = id => data.cats.find(c => c.id === id) || {id:'?', name:'Ohne Kategorie', color:'#868e96', icon:'pin'};

/* ================= Geo ================= */
function dist(a, b){
  const R = 6371000, r = x => x * Math.PI / 180;
  const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
  const h = Math.sin(dLat/2)**2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
const fmtDist = m => m < 1000 ? `${Math.round(m/10)*10} m` : m < 100000 ? `${(m/1000).toFixed(1).replace('.', ',')} km` : `${Math.round(m/1000)} km`;
const walkMin = m => Math.max(1, Math.round(m / 75)); // ~4,5 km/h
const fmtMin = n => n < 60 ? `${n} Min` : `${Math.floor(n/60)} h ${n%60} Min`;
const fmtCoord = p => `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
const LL = p => [p.lng, p.lat];
function circlePoly(c, r, n = 48){
  const pts = [];
  for(let i = 0; i <= n; i++){
    const a = i / n * 2 * Math.PI;
    pts.push([c.lng + r * Math.cos(a) / (111320 * Math.cos(c.lat * Math.PI / 180)), c.lat + r * Math.sin(a) / 110540]);
  }
  return {type:'Feature', geometry:{type:'Polygon', coordinates:[pts]}, properties:{}};
}
const FC = f => ({type:'FeatureCollection', features:f});

/* ================= Karte (MapLibre) ================= */
const ESRI = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
const BASES = {
  sat:{name:'Satellit', url:ESRI + 'World_Imagery/MapServer/tile/{z}/{y}/{x}', kb:24, maxz:19, credit:'Bilder © Esri, Maxar, Earthstar Geographics'},
  street:{name:'Straße', url:ESRI + 'World_Street_Map/MapServer/tile/{z}/{y}/{x}', kb:20, maxz:19, credit:'Karte © Esri, HERE, Garmin, OpenStreetMap'},
  dark:{name:'Dunkel', url:ESRI + 'Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', kb:9, maxz:16, credit:'Karte © Esri, HERE, Garmin, OpenStreetMap'},
  topo:{name:'Gelände', url:ESRI + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}', kb:26, maxz:19, credit:'Karte © Esri, HERE, Garmin, USGS'},
  vec:{name:'Clean', vector:true, maxz:20, credit:'Karte © OpenFreeMap · OpenMapTiles'}
};
const DARK_REF = ESRI + 'Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}';
const OVERLAYS = [ESRI + 'Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', ESRI + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'];
const map = new maplibregl.Map({
  container:'map',
  style:{
    version:8,
    glyphs:'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
    sources:{
      sat:{type:'raster', tiles:[ESRI + 'World_Imagery/MapServer/tile/{z}/{y}/{x}'], tileSize:256, maxzoom:19, attribution:'Bilder © Esri, Maxar, Earthstar Geographics'},
      street:{type:'raster', tiles:[BASES.street.url], tileSize:256, maxzoom:19},
      dark:{type:'raster', tiles:[BASES.dark.url], tileSize:256, maxzoom:16},
      darkref:{type:'raster', tiles:[DARK_REF], tileSize:256, maxzoom:16},
      topo:{type:'raster', tiles:[BASES.topo.url], tileSize:256, maxzoom:19, attribution:'© Esri'},
      roads:{type:'raster', tiles:[ESRI + 'Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'], tileSize:256, maxzoom:19},
      places:{type:'raster', tiles:[ESRI + 'Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'], tileSize:256, maxzoom:19},
      dem:{type:'raster-dem', tiles:['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'], encoding:'terrarium', tileSize:256, maxzoom:15, attribution:'Höhendaten © Mapzen, AWS Terrain Tiles'}
    },
    layers:[
      {id:'bg', type:'background', paint:{'background-color':'#1b1d1f'}},
      {id:'sat', type:'raster', source:'sat', paint:{'raster-fade-duration':250}},
      {id:'street', type:'raster', source:'street', layout:{visibility:'none'}, paint:{'raster-fade-duration':250}},
      {id:'dark', type:'raster', source:'dark', layout:{visibility:'none'}, paint:{'raster-fade-duration':250}},
      {id:'topo', type:'raster', source:'topo', layout:{visibility:'none'}, paint:{'raster-fade-duration':250}},
      {id:'darkref', type:'raster', source:'darkref', layout:{visibility:'none'}, paint:{'raster-fade-duration':250}},
      {id:'roads', type:'raster', source:'roads', paint:{'raster-opacity':.7, 'raster-fade-duration':250}},
      {id:'places', type:'raster', source:'places', paint:{'raster-fade-duration':250}}
    ]
  },
  center:[10.4, 51.1], zoom:5.2, maxZoom:20.5,
  attributionControl:false, pitchWithRotate:true, touchPitch:true,
  dragRotate:true, maxPitch:0, fadeDuration:150, renderWorldCopies:true
});
map.touchZoomRotate.enableRotation();
// „Bewegung reduzieren“: Kamerafahrten springen sofort statt zu fliegen
(() => {
  const rm = matchMedia('(prefers-reduced-motion: reduce)');
  for(const fn of ['flyTo', 'easeTo', 'fitBounds']){
    const orig = map[fn].bind(map);
    map[fn] = (a, o, ...rest) => {
      if(!rm.matches) return orig(a, o, ...rest);
      if(fn === 'fitBounds') return orig(a, {...(o || {}), duration:0, animate:false}, ...rest);
      return orig({...(a || {}), duration:0, animate:false}, o, ...rest);
    };
  }
})();
function updateCompass(){
  const el = $('#b-compass'); if(!el) return;
  const b = map.getBearing(), pt = map.getPitch(), show = Math.abs(b) > .5 || pt > .5;
  el.hidden = !show;
  if(show && el.firstElementChild) el.firstElementChild.style.transform = `rotate(${-b}deg)`;
}
map.on('rotate', updateCompass); map.on('pitch', updateCompass);

let mapReady = false;
const pendingSrc = {};
function setSrc(id, fc){
  if(!mapReady){ pendingSrc[id] = fc; return; }
  map.getSource(id)?.setData(fc);
}
let initDone = false;
function onMapStyle(){
  if(initDone) return; initDone = true;
  map.addSource('links', {type:'geojson', data:FC([])});
  map.addSource('draftlink', {type:'geojson', data:FC([])});
  map.addSource('acc', {type:'geojson', data:FC([])});
  map.addSource('spots', {type:'geojson', data:FC([]), cluster:true, clusterRadius:52, clusterMaxZoom:14});
  map.addLayer({id:'spots-q', type:'circle', source:'spots', paint:{'circle-radius':0, 'circle-opacity':0}});
  map.addSource('heat', {type:'geojson', data:FC([])});
  map.addLayer({id:'heat', type:'heatmap', source:'heat', layout:{visibility:'none'}, paint:{
    'heatmap-weight':['interpolate', ['linear'], ['get', 'n'], 1, .45, 8, 1],
    'heatmap-intensity':['interpolate', ['linear'], ['zoom'], 6, .6, 12, 1.2, 16, 2],
    'heatmap-radius':['interpolate', ['exponential', 1.6], ['zoom'], 6, 1.5, 10, 3, 13, 6, 16, 18],
    'heatmap-color':['interpolate', ['linear'], ['heatmap-density'], 0, 'rgba(0,0,0,0)', .12, 'rgba(40,110,255,.55)', .35, '#21c4ff', .6, '#7dff6a', .82, '#ffd60a', 1, '#ff6a3d'],
    'heatmap-opacity':.9}});
  map.addSource('gem', {type:'geojson', data:FC([])});
  map.addLayer({id:'gem-fill', type:'fill', source:'gem', layout:{visibility:'none'}, paint:{'fill-color':['case', ['get', 'v'], '#f4d35e', '#000000'], 'fill-opacity':['case', ['get', 'v'], .3, .18]}});
  map.addLayer({id:'gem-line', type:'line', source:'gem', layout:{visibility:'none'}, paint:{'line-color':['case', ['get', 'v'], '#f4d35e', '#ffffff'], 'line-width':['case', ['get', 'v'], 1.8, 1], 'line-opacity':.75}});
  map.addSource('sunray', {type:'geojson', data:FC([])});
  map.addLayer({id:'sunray-glow', type:'line', source:'sunray', filter:['==', ['get', 'k'], 'ray'], layout:{'line-cap':'round'}, paint:{'line-color':'#ffd60a', 'line-width':10, 'line-opacity':.25, 'line-blur':4}});
  map.addLayer({id:'sunray-line', type:'line', source:'sunray', filter:['==', ['get', 'k'], 'ray'], layout:{'line-cap':'round'}, paint:{'line-color':['case', ['get', 'vis'], '#ffd60a', '#ff9f0a'], 'line-width':3, 'line-dasharray':['case', ['get', 'vis'], ['literal', [1, 0]], ['literal', [1.5, 1.5]]]}});
  map.addLayer({id:'sunray-sun', type:'circle', source:'sunray', filter:['==', ['get', 'k'], 'sun'], paint:{'circle-radius':11, 'circle-color':'#ffd60a', 'circle-stroke-color':'#fff7d6', 'circle-stroke-width':3}});
  map.addLayer({id:'acc-fill', type:'fill', source:'acc', paint:{'fill-color':'#4da3ff', 'fill-opacity':.14}});
  map.addLayer({id:'acc-line', type:'line', source:'acc', paint:{'line-color':'#4da3ff', 'line-opacity':.5, 'line-width':1}});
  for(const id of ['track-all','track-view','track-case','track-live','track-ends']) map.addSource(id, {type:'geojson', data:FC([])});
  const rl = {'line-cap':'round', 'line-join':'round'};
  map.addLayer({id:'track-all-line', type:'line', source:'track-all', layout:rl, paint:{'line-color':['case', ['get', 'fav'], '#ffd60a', '#ff9f0a'], 'line-width':['case', ['get', 'fav'], 4, 3], 'line-opacity':['case', ['get', 'fav'], .9, .6]}});
  map.addLayer({id:'track-all-hit', type:'line', source:'track-all', layout:rl, paint:{'line-color':'#000', 'line-width':20, 'line-opacity':0}});
  // Rand als durchgehende Linie und deckende Farbstücke – sonst entstehen an den Stößen dunkle Perlen
  map.addSource('track-cmp', {type:'geojson', data:FC([])});
  map.addLayer({id:'track-cmp-case', type:'line', source:'track-cmp', layout:rl, paint:{'line-color':'#0b1d26', 'line-width':8, 'line-opacity':.9}});
  map.addLayer({id:'track-cmp-line', type:'line', source:'track-cmp', layout:rl, paint:{'line-color':'#64d2ff', 'line-width':4.5}});
  map.addLayer({id:'track-view-case', type:'line', source:'track-case', layout:rl, paint:{'line-color':'#111419', 'line-width':11}});
  map.addLayer({id:'track-view-line', type:'line', source:'track-view', layout:rl, paint:{'line-color':rampExpr(), 'line-width':6.5}});
  map.addLayer({id:'track-live-case', type:'line', source:'track-live', layout:rl, paint:{'line-color':'#ffffff', 'line-width':8, 'line-opacity':.9}});
  map.addLayer({id:'track-live-line', type:'line', source:'track-live', layout:rl, paint:{'line-color':'#ff3b30', 'line-width':5}});
  map.addSource('nav-route', {type:'geojson', data:FC([])});
  map.addSource('nav-alt', {type:'geojson', data:FC([])});
  map.addLayer({id:'nav-alt-case', type:'line', source:'nav-alt', layout:rl, paint:{'line-color':'#0b2f57', 'line-width':9, 'line-opacity':.55}});
  map.addLayer({id:'nav-alt-line', type:'line', source:'nav-alt', layout:rl, paint:{'line-color':'#8fa3bf', 'line-width':5.5, 'line-opacity':.85}});
  map.addLayer({id:'nav-alt-hit', type:'line', source:'nav-alt', layout:rl, paint:{'line-color':'#000', 'line-width':24, 'line-opacity':0}});
  map.addLayer({id:'nav-route-case', type:'line', source:'nav-route', layout:rl, paint:{'line-color':'#0b2f57', 'line-width':12, 'line-opacity':.9}});
  map.addLayer({id:'nav-route-line', type:'line', source:'nav-route', layout:rl, paint:{'line-color':'#4da3ff', 'line-width':7.5}});
  map.addSource('nav-wx', {type:'geojson', data:FC([])});
  map.addLayer({id:'nav-wx-ice', type:'line', source:'nav-wx', layout:rl, filter:['in', ['get', 'k'], ['literal', ['ice', 'frost', 'snow']]], paint:{'line-color':['get', 'c'], 'line-width':7.5}});
  map.addLayer({id:'nav-wx-rain', type:'line', source:'nav-wx', layout:rl, filter:['in', ['get', 'k'], ['literal', ['rain', 'heavy']]], paint:{'line-color':'#ffffff', 'line-width':['case', ['==', ['get', 'k'], 'heavy'], 3.6, 3], 'line-dasharray':[.5, 1.7], 'line-opacity':.95}});
  map.addSource('reach', {type:'geojson', data:FC([])});
  map.addLayer({id:'reach-fill', type:'fill', source:'reach', filter:['==', ['geometry-type'], 'Polygon'], paint:{'fill-color':['get', 'c'], 'fill-opacity':.13}});
  map.addLayer({id:'reach-line', type:'line', source:'reach', filter:['==', ['geometry-type'], 'Polygon'], layout:{'line-join':'round'}, paint:{'line-color':['get', 'c'], 'line-width':2.2, 'line-opacity':.9}});
  map.addLayer({id:'reach-c', type:'circle', source:'reach', filter:['==', ['geometry-type'], 'Point'], paint:{'circle-radius':6, 'circle-color':'#ffffff', 'circle-stroke-color':'#0a84ff', 'circle-stroke-width':3}});
  map.addSource('nav-block', {type:'geojson', data:FC([])});
  map.addLayer({id:'nav-block-line', type:'line', source:'nav-block', layout:rl, paint:{'line-color':['case', ['get', 'on'], '#ff453a', '#ff9f0a'], 'line-width':6, 'line-opacity':.9, 'line-dasharray':[1.2, .8]}});
  map.addSource('nav-wild', {type:'geojson', data:FC([])});
  map.addLayer({id:'nav-wild-line', type:'line', source:'nav-wild', layout:rl, filter:['==', ['geometry-type'], 'LineString'], paint:{'line-color':'#f59e0b', 'line-width':3.2, 'line-dasharray':[1, 1.3]}});
  map.addLayer({id:'nav-wild-sign', type:'circle', source:'nav-wild', filter:['==', ['geometry-type'], 'Point'], paint:{'circle-radius':5.5, 'circle-color':'#f59e0b', 'circle-stroke-color':'#1c1c1e', 'circle-stroke-width':2}});
  for(const id of ['course-all','course-view','course-ends','draw-line','draw-pts']) map.addSource(id, {type:'geojson', data:FC([])});
  map.addLayer({id:'course-all-line', type:'line', source:'course-all', layout:rl, paint:{'line-color':'#bf5af2', 'line-width':3.5, 'line-opacity':.75}});
  map.addLayer({id:'course-all-hit', type:'line', source:'course-all', layout:rl, paint:{'line-color':'#000', 'line-width':20, 'line-opacity':0}});
  map.addLayer({id:'course-view-case', type:'line', source:'course-view', layout:rl, paint:{'line-color':'#ffffff', 'line-width':9, 'line-opacity':.9}});
  map.addLayer({id:'course-view-line', type:'line', source:'course-view', layout:rl, paint:{'line-color':'#bf5af2', 'line-width':5.5}});
  map.addLayer({id:'draw-line-case', type:'line', source:'draw-line', layout:rl, paint:{'line-color':'#ffffff', 'line-width':8, 'line-opacity':.9}});
  map.addLayer({id:'draw-line', type:'line', source:'draw-line', layout:rl, paint:{'line-color':'#bf5af2', 'line-width':5}});
  map.addLayer({id:'draw-pts', type:'circle', source:'draw-pts', paint:{'circle-radius':['case', ['get','end'], 7, 4.5], 'circle-color':['match', ['get','k'], 'start', '#30d158', 'end', '#ff3b30', '#ffffff'], 'circle-stroke-color':['match', ['get','k'], 'mid', '#bf5af2', '#ffffff'], 'circle-stroke-width':2.5}});
  map.addLayer({id:'course-ends', type:'circle', source:'course-ends', paint:{'circle-radius':7.5, 'circle-color':['match', ['get','k'], 'start', '#30d158', '#ff3b30'], 'circle-stroke-color':'#ffffff', 'circle-stroke-width':3}});
  map.addSource('track-secs', {type:'geojson', data:FC([])}); map.addSource('track-cur', {type:'geojson', data:FC([])});
  map.addLayer({id:'track-secs', type:'circle', source:'track-secs', paint:{'circle-radius':3.5, 'circle-color':'#ffffff', 'circle-stroke-color':'#0b0d10', 'circle-stroke-width':1.5}});
  map.addLayer({id:'track-cur', type:'circle', source:'track-cur', paint:{'circle-radius':7, 'circle-color':['case', ['==', ['get', 'k'], 'b'], '#64d2ff', '#ff9f0a'], 'circle-stroke-color':'#ffffff', 'circle-stroke-width':3}});
  map.addLayer({id:'track-ends', type:'circle', source:'track-ends', paint:{'circle-radius':6.5, 'circle-color':['match', ['get','k'], 'start', '#30d158', '#ff3b30'], 'circle-stroke-color':'#ffffff', 'circle-stroke-width':2.5}});
  const lineLayout = {'line-cap':'round', 'line-join':'round'};
  map.addLayer({id:'links', type:'line', source:'links', layout:lineLayout, paint:{
    'line-color':['case', ['get','sel'], '#5cb0ff', '#ffffff'],
    'line-width':['case', ['get','sel'], 4.5, 3],
    'line-opacity':['case', ['get','sel'], 1, .7],
    'line-dasharray':[0.1, 2]}});
  map.addLayer({id:'draftlink', type:'line', source:'draftlink', layout:lineLayout, paint:{'line-color':'#5cb0ff', 'line-width':4.5, 'line-dasharray':[0.1, 2]}});
  mapReady = true; applyTheme();
  for(const id in pendingSrc) map.getSource(id)?.setData(pendingSrc[id]);
  applyLabels(); apply3D(false);
  updateTrackLayers(); drawLive();
  if(rad.on) radStart(); else if(prefs.radar) radToggle(true);   // auch wenn vor dem Kartenstart eingeschaltet
  renderMarkers();
  hideSplash();
}
map.on('style.load', onMapStyle);
map.on('load', onMapStyle);
if(map.isStyleLoaded && map.isStyleLoaded()) onMapStyle();
map.on('moveend', scheduleMarkers);
map.on('sourcedata', e => { if(e.sourceId === 'spots' && e.isSourceLoaded && !map.isMoving()) scheduleMarkers(); });

/* 3D-Gelände */
function apply3D(animate = true){
  $('#b-3d').classList.toggle('on', !!prefs.terrain);
  if(!mapReady) return;
  if(prefs.terrain){
    if(ckOn || rp) return;   // im Cockpit/Replay bleibt die Karte flach (siehe enterCockpit)
    map.setMaxPitch(80);
    try{ map.setTerrain({source:'dem', exaggeration:1.4}); }catch(e){}
    try{ map.setSky && map.setSky({'sky-color':'#7fb2e6', 'horizon-color':'#cfe3f5', 'sky-horizon-blend':.6, 'horizon-fog-blend':.6, 'fog-color':'#cfe3f5', 'fog-ground-blend':.3}); }catch(e){}
    if(animate) map.easeTo({pitch:60, zoom:Math.max(map.getZoom(), 13), duration:1200});
  } else {
    const off = () => { try{ map.setTerrain(null); }catch(e){} map.setMaxPitch(0); };
    if(animate && map.getPitch() > 0){ map.easeTo({pitch:0, duration:900}); map.once('moveend', off); } else off();
  }
}
$('#b-3d').addEventListener('click', () => { prefs.terrain = !prefs.terrain; savePrefs(); apply3D(true); applyLabels(); if(prefs.terrain) toast('3D an – mit zwei Fingern nach oben wischen zum Kippen'); });

/* Startbildschirm */
const splashStart = performance.now();
let splashGone = false;
function hideSplash(){
  if(splashGone) return; splashGone = true;
  const el = $('#splash'); if(!el) return;
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 700); }, Math.max(0, 900 - (performance.now() - splashStart)));
}
setTimeout(hideSplash, 3500);
function applyLabels(){
  const base = BASES[prefs.base] ? prefs.base : 'sat';
  if(mapReady){
    const hyb = base === 'sat' && prefs.labels && useHybrid();
    if(base === 'vec' || hyb) vecEnsure();
    for(const k of Object.keys(BASES)) if(!BASES[k].vector) map.setLayoutProperty(k, 'visibility', k === base ? 'visible' : 'none');
    vecShow(base === 'vec'); hybShow(hyb);
    for(const l of ['roads','places']) map.setLayoutProperty(l, 'visibility', base === 'sat' && prefs.labels && !hyb ? 'visible' : 'none');
    map.setLayoutProperty('darkref', 'visibility', base === 'dark' && prefs.labels ? 'visible' : 'none');
  }
  $('#b-labels').classList.toggle('on', prefs.labels);
  $('#b-labels').hidden = base !== 'sat' && base !== 'dark' && base !== 'vec';
  document.querySelectorAll('[data-base]').forEach(b => b.classList.toggle('on', b.dataset.base === base));
  setAttrib();
}
function setAttrib(){
  const base = BASES[prefs.base] ? prefs.base : 'sat';
  $('#attrib').textContent = BASES[base].credit + (prefs.terrain ? ' · Höhen © Mapzen' : '') + ' · Daten © OpenStreetMap' + (rad.on && rad.src ? (rad.src === 'dwd' ? ' · Radar © DWD' : ' · Radar © RainViewer') : '');
}

/* ================= Regenradar =================
   In und um Deutschland: DWD-Niederschlagsradar (1 km, alle 5 Min, mit 2 h Vorhersage). Sonst: RainViewer (letzte Stunde).
   Zwei Puffer-Ebenen: das nächste Bild lädt unsichtbar und wird erst eingeblendet, wenn es da ist – so flackert nichts. */
const RAD_DWD = 'https://maps.dwd.de/geoserver/dwd/wms?service=WMS&version=1.3.0&request=GetMap&layers=dwd:Niederschlagsradar&styles=&format=image/png&transparent=true&width=512&height=512&crs=EPSG:3857&bbox={bbox-epsg-3857}';
const RAD_BOX = [2, 46.2, 18.2, 55.9], RAD_OP = .75;
const rad = {on:false, src:null, frames:[], now:0, idx:0, cur:'a', pend:null, play:false, timer:0, swapT:0, t:0, busy:false};
const radArea = () => { const c = map.getCenter(); return c.lng > RAD_BOX[0] && c.lng < RAD_BOX[2] && c.lat > RAD_BOX[1] && c.lat < RAD_BOX[3] ? 'dwd' : 'rv'; };
async function radLoadFrames(src){
  if(src === 'dwd'){
    // Zeitstempel schätzen statt jedes Mal das mehrere MB große Capabilities-Dokument zu laden (das machte den Start langsam).
    // Nur gelegentlich (max. alle 15 Min) und mit kurzem Zeitlimit nachprüfen.
    let ref = Math.floor((Date.now() - 8 * 60000) / 300000) * 300000, end = ref + 7200e3;
    if(rad.capsAt && Date.now() - rad.capsAt < 15 * 60000 && rad.capsLag != null) ref = Math.floor((Date.now() - rad.capsLag) / 300000) * 300000;
    else {
      try{
        const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 3500);
        const t = await (await fetch('https://maps.dwd.de/geoserver/dwd/Niederschlagsradar/wms?service=WMS&version=1.3.0&request=GetCapabilities', {signal:ctl.signal})).text(); clearTimeout(to);
        const m = t.match(/name="REFERENCE_TIME" default="([^"]+)"/), e = t.match(/name="time"[^>]*>[^/<]+\/([^/<]+)\/PT5M/);
        if(m && !isNaN(Date.parse(m[1]))){ ref = Date.parse(m[1]); rad.capsLag = Date.now() - ref; rad.capsAt = Date.now(); }
        if(e && !isNaN(Date.parse(e[1]))) end = Date.parse(e[1]);
      }catch(_){ rad.capsAt = Date.now(); rad.capsLag = 8 * 60000; }
    }
    const fr = []; for(let x = ref - 3600e3; x <= Math.min(end, ref + 7200e3) + 1; x += 600e3) fr.push({t:x, url:RAD_DWD + '&time=' + new Date(x).toISOString()});
    return {frames:fr, now:ref};
  }
  const j = await (await fetch('https://api.rainviewer.com/public/weather-maps.json')).json();
  const past = ((j.radar && j.radar.past) || []).slice(-7);
  if(!past.length) throw 0;
  return {frames:past.map(f => ({t:f.time * 1000, url:`${j.host}${f.path}/512/{z}/{x}/{y}/2/1_1.png`})), now:past[past.length - 1].time * 1000};
}
// DWD rechnet jedes Bild auf dem Server: weniger Zoomstufen = viel weniger Anfragen (Radar hat ohnehin ~1 km Auflösung, darüber wird nur vergrößert)
const RAD_MAXZ = 8;
const radSpec = url => rad.src === 'dwd' ? {type:'raster', tiles:[url], tileSize:512, maxzoom:RAD_MAXZ, bounds:[1.46, 45.68, 18.71, 56.21]} : {type:'raster', tiles:[url], tileSize:256, maxzoom:7};
// Nächsten Zeitpunkt unsichtbar mitladen (dritte Ebene mit Deckkraft 0): dieselben Adressen wie später → beim Weiterschalten aus dem Browser-Speicher
function radPrefetch(i){
  const f = rad.frames[(i + 1) % rad.frames.length]; if(!f || !mapReady) return;
  if(!map.getSource('radar-p')){
    const sym = map.getStyle().layers.find(l => l.type === 'symbol'), before = sym ? sym.id : undefined;
    map.addSource('radar-p', radSpec(f.url));
    map.addLayer({id:'radar-p', type:'raster', source:'radar-p', paint:{'raster-opacity':0, 'raster-fade-duration':0}}, before);
  } else map.getSource('radar-p').setTiles([f.url]);
}
function radRemove(){ ['a', 'b', 'p'].forEach(k => { if(map.getLayer('radar-' + k)) map.removeLayer('radar-' + k); if(map.getSource('radar-' + k)) map.removeSource('radar-' + k); }); }
async function radStart(){
  if(!mapReady || rad.busy) return;
  rad.busy = true; const src = radArea();
  try{
    const F = await radLoadFrames(src);
    if(!rad.on) return;
    radRemove();
    rad.src = src; rad.frames = F.frames; rad.now = F.now; rad.t = Date.now(); rad.cur = 'a'; rad.pend = null;
    rad.idx = Math.max(0, F.frames.findIndex(f => f.t >= F.now - 1));
    const sym = map.getStyle().layers.find(l => l.type === 'symbol'), before = sym ? sym.id : 'roads';
    ['a', 'b'].forEach(k => {
      map.addSource('radar-' + k, radSpec(F.frames[rad.idx].url));
      map.addLayer({id:'radar-' + k, type:'raster', source:'radar-' + k, paint:{'raster-opacity':k === 'a' ? RAD_OP : 0, 'raster-opacity-transition':{duration:250, delay:0}, 'raster-fade-duration':0}}, before);
    });
    $('#radar').innerHTML = '';
    setTimeout(() => { if(rad.on) radPrefetch(rad.idx); }, 1500);   // erst das aktuelle Bild, dann das nächste
  }catch(e){ if(rad.on) toast('Regenradar gerade nicht erreichbar.'); }
  finally{ rad.busy = false; }
  radUI(); setAttrib();
}
async function radRefresh(){   // alle 5 Minuten neue Bilder, solange man auf „Jetzt“ schaut
  if(!rad.on || rad.busy || rad.play || !rad.frames.length) return;
  if(radArea() !== rad.src) return radStart();
  const atNow = rad.frames[rad.idx] && rad.frames[rad.idx].t === rad.now;
  try{
    const F = await radLoadFrames(rad.src); if(!rad.on || rad.play) return;
    rad.frames = F.frames; rad.now = F.now; rad.t = Date.now(); $('#radar').innerHTML = '';
    const ni = Math.max(0, F.frames.findIndex(f => f.t >= F.now - 1));
    if(atNow) radShow(ni); else { rad.idx = Math.min(rad.idx, F.frames.length - 1); radUI(); }
  }catch(e){ rad.t = Date.now(); }
}
function radShow(i){
  const f = rad.frames[i]; if(!f || !map.getSource('radar-a')) return;
  rad.idx = i; radUI();
  const nxt = rad.cur === 'a' ? 'b' : 'a';
  rad.pend = {nxt, i};
  map.getSource('radar-' + nxt).setTiles([f.url]);
  radPrefetch(i);
  clearTimeout(rad.swapT); rad.swapT = setTimeout(radSwap, 3000);   // spätestens dann umschalten
}
function radSwap(){
  const p = rad.pend; if(!p) return;
  rad.pend = null; clearTimeout(rad.swapT);
  if(!map.getLayer('radar-' + p.nxt)) return;
  map.setPaintProperty('radar-' + p.nxt, 'raster-opacity', RAD_OP);
  map.setPaintProperty('radar-' + rad.cur, 'raster-opacity', 0);
  rad.cur = p.nxt;
  if(rad.play){ clearTimeout(rad.timer); rad.timer = setTimeout(() => { if(rad.play) radShow((rad.idx + 1) % rad.frames.length); }, rad.frames[rad.idx].t === rad.now ? 1200 : 450); }
}
map.on('sourcedata', e => { const p = rad.pend; if(p && e.tile && e.sourceId === 'radar-' + p.nxt && map.isSourceLoaded(e.sourceId)) radSwap(); });
map.on('moveend', () => { if(rad.on && !rad.busy && rad.src && radArea() !== rad.src){ rad.play = false; radStart(); } });
every(() => { if(rad.on && Date.now() - rad.t > 5 * 60000) radRefresh(); }, 60000);
function radToggle(on){
  rad.on = on; prefs.radar = on; savePrefs();
  rad.play = false; clearTimeout(rad.timer); clearTimeout(rad.swapT); rad.pend = null;
  if(on){ rad.frames = []; $('#radar').innerHTML = ''; radUI(); radStart(); }
  else { if(mapReady) radRemove(); rad.src = null; rad.frames = []; radUI(); setAttrib(); }
}
const radMin = m => m < 60 ? `${m} Min` : m % 60 ? `${Math.floor(m / 60)} h ${m % 60} Min` : `${m / 60} h`;
const RAD_PLAY = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M7.5 5.2v13.6L18.5 12z"/></svg>';
const RAD_PAUSE = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><rect x="6.5" y="5" width="3.6" height="14" rx="1"/><rect x="13.9" y="5" width="3.6" height="14" rx="1"/></svg>';
function radUI(){
  $('#b-radar').classList.toggle('on', rad.on);
  const el = $('#radar'); el.hidden = !rad.on; if(!rad.on) return;
  if(!rad.frames.length){
    el.innerHTML = `<span class="rd-load"><i></i>Regenradar wird geladen …</span><button class="rd-x" data-rd="off" aria-label="Regenradar ausblenden">${svg(UI.close, 12)}</button>`; return;
  }
  const n = rad.frames.length, ni = Math.max(0, rad.frames.findIndex(f => f.t >= rad.now - 1)), pct = n > 1 ? ni / (n - 1) * 100 : 100;
  if(!$('#rdRange')) el.innerHTML = `<button class="rd-play" data-rd="play"></button>
    <div class="rd-mid"><input type="range" id="rdRange" min="0" max="${n - 1}" step="1" aria-label="Zeitpunkt des Radarbilds"><div class="rd-sc"><span>−1 h</span><span class="rd-now" style="left:${pct}%;transform:translateX(-${pct}%)">Jetzt</span><span>${ni < n - 1 ? '+' + radMin(Math.round((rad.frames[n - 1].t - rad.now) / 60000)) : ''}</span></div></div>
    <div class="rd-t"><b id="rdTime"></b><span id="rdLbl"></span></div>
    <button class="rd-x" data-rd="off" aria-label="Regenradar ausblenden">${svg(UI.close, 12)}</button>`;
  const f = rad.frames[rad.idx], d = Math.round((f.t - rad.now) / 60000);
  $('#rdRange').value = rad.idx;
  $('#rdTime').textContent = hhmm(new Date(f.t));
  $('#rdLbl').innerHTML = d === 0 ? (rad.src === 'rv' ? 'Jetzt · <a href="https://www.rainviewer.com" target="_blank" rel="noopener">RainViewer</a>' : 'Jetzt') : d > 0 ? `Vorhersage +${radMin(d)}` : `vor ${radMin(-d)}`;
  el.classList.toggle('fc', d > 0);
  const pb = el.querySelector('.rd-play'); pb.innerHTML = rad.play ? RAD_PAUSE : RAD_PLAY; pb.setAttribute('aria-label', rad.play ? 'Anhalten' : 'Abspielen');
}
$('#radar').addEventListener('click', e => {
  const b = e.target.closest('[data-rd]'); if(!b) return;
  if(b.dataset.rd === 'off') return radToggle(false);
  if(b.dataset.rd === 'play'){
    rad.play = !rad.play; clearTimeout(rad.timer);
    if(rad.play) radShow(rad.idx >= rad.frames.length - 1 ? 0 : rad.idx + 1); else radUI();
  }
});
$('#radar').addEventListener('input', e => { if(e.target.id !== 'rdRange') return; rad.play = false; clearTimeout(rad.timer); radShow(+e.target.value); });
$('#b-heat').addEventListener('click', () => xplHeatToggle(!prefs.heat, true));
$('#b-reach').addEventListener('click', () => reachToggle(!reach.on));
$('#b-radar').addEventListener('click', () => { radToggle(!rad.on); if(rad.on) toast(radArea() === 'dwd' ? 'Regenradar an – mit Vorhersage für die nächsten 2 Stunden' : 'Regenradar an'); });

/* ================= Reichweite: wohin komme ich in 30 / 60 / 90 Minuten (Valhalla-Isochronen) ================= */
const REACH = [[30, '#30d158'], [60, '#ffd60a'], [90, '#ff9f0a']];
const reach = {on:false, busy:false, err:'', at:null, fc:null, land:!!prefs.reachLand};
function inRing(p, r){ let c = false; for(let i = 0, j = r.length - 1; i < r.length; j = i++){ const a = r[i], b = r[j]; if((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < (b[0] - a[0]) * (p[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; }
const inPoly = (p, g) => (g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : []).some(P => inRing(p, P[0]) && !P.slice(1).some(h => inRing(p, h)));
async function reachLoad(at){
  reach.at = at; reach.busy = true; reach.err = ''; reach.fc = null; reachUI(); reachDraw();
  const iso = async mins => {
    const q = {locations:[{lat:+at.lat.toFixed(5), lon:+at.lng.toFixed(5)}], costing:'auto', costing_options:{auto:{use_highways:reach.land ? 0 : 1}}, contours:mins.map(m => ({time:m})), polygons:true, denoise:.4, generalize:150};
    try{
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 20000);
      const r = await fetch('https://valhalla1.openstreetmap.de/isochrone?json=' + encodeURIComponent(JSON.stringify(q)), {signal:ctl.signal});
      clearTimeout(to); const j = await r.json().catch(() => null);
      if(j && j.features && j.features.length) return j.features;
      reach.why = (j && (j.error || j.status)) ? `${j.error || j.status}${j.error_code ? ' (' + j.error_code + ')' : ''}` : `HTTP ${r.status}`; reach.srv = !!(j && j.error_code);
    }catch(e){ reach.why = e && e.name === 'AbortError' ? 'Zeitüberschreitung' : 'keine Verbindung'; reach.srv = false; }
    return null;
  };
  // erst alles auf einmal, sonst einzeln (der Server begrenzt teils Zeit oder Fläche)
  let feats = await iso(REACH.map(([m]) => m));
  if(!feats){ feats = []; if(reach.srv) for(const [m] of REACH){ if(reach.at !== at) return; const f = await iso([m]); if(f) feats.push(...f); else break; } }
  reach.approx = false;
  const miss = REACH.map(([m]) => m).filter(m => !feats.some(f => +(f.properties || {}).contour === m));
  if(miss.length){ const f = await reachOsrm(at); if(reach.at !== at) return; if(f){ feats.push(...f.filter(x => miss.includes(x.properties.contour))); reach.approx = miss.length === REACH.length ? 'all' : miss.map(m => m + ' Min').join(', '); } }
  const fc = feats.length ? {type:'FeatureCollection', features:feats} : null;
  if(reach.at !== at || !reach.on) return;
  reach.busy = false;
  if(!fc){ reach.err = `Reichweite gerade nicht berechenbar${reach.why ? ` (${reach.why})` : ''}.`; reachUI(); return; }
  reach.fc = fc; reachUI(); reachDraw();
  const b = new maplibregl.LngLatBounds(); fc.features.forEach(f => (f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates).forEach(P => P[0].forEach(c => b.extend(c))));
  if(!b.isEmpty()) map.fitBounds(b, {padding:camPad(), duration:900});
}
// Ersatz, wenn der Isochronen-Dienst nicht antwortet: Fahrzeiten in 16 Richtungen × 6 Abständen (OSRM-Tabelle) und daraus Flächen
async function reachOsrm(at){
  const R = [8, 20, 38, 60, 90, 130], D = 16, kx = 111.32 * Math.cos(at.lat * Math.PI / 180), pts = [at];
  for(let d = 0; d < D; d++){ const a = d / D * 2 * Math.PI; R.forEach(km => pts.push({lat:at.lat + Math.cos(a) * km / 110.57, lng:at.lng + Math.sin(a) * km / kx})); }
  const co = pts.map(p => `${p.lng.toFixed(5)},${p.lat.toFixed(5)}`).join(';');
  let dur = null;
  for(const base of ROUTERS){
    try{
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 20000);
      const r = await fetch(base.replace('/route/', '/table/') + co + '?sources=0', {signal:ctl.signal}); clearTimeout(to);
      const j = await r.json(); if(j.code === 'Ok' && j.durations && j.durations[0]){ dur = j.durations[0]; break; }
    }catch(e){}
  }
  if(!dur) return null;
  const slow = reach.land ? 1.25 : 1;   // ohne Autobahn grob langsamer
  return REACH.map(([m]) => {
    const T = m * 60, ring = [], rks = [];
    for(let d = 0; d < D; d++){
      let prevKm = 0, prevT = 0, rk = null;
      for(let k = 0; k < R.length; k++){
        let t = dur[1 + d * R.length + k]; if(t == null) continue; t *= slow;
        if(t >= T){ rk = prevKm + (R[k] - prevKm) * Math.max(0, Math.min(1, (T - prevT) / Math.max(1, t - prevT))); break; }
        prevKm = R[k]; prevT = t; rk = R[k];
      }
      rks.push(rk);
    }
    // Richtungen ohne Daten (Wasser, Grenze …) aus den Nachbarn schätzen statt auf 0 zu fallen
    rks.forEach((rk, d) => { if(rk == null){ const a = rks[(d + D - 1) % D], b = rks[(d + 1) % D]; rks[d] = a != null && b != null ? (a + b) / 2 : a ?? b ?? 0; } });
    for(let d = 0; d < D; d++){ const rk = rks[d], a = d / D * 2 * Math.PI; ring.push([at.lng + Math.sin(a) * rk / kx, at.lat + Math.cos(a) * rk / 110.57]); }
    ring.push(ring[0]);
    return {type:'Feature', properties:{contour:m}, geometry:{type:'Polygon', coordinates:[ring]}};
  });
}
function reachRings(){
  if(!reach.fc) return [];
  return REACH.map(([m, c]) => ({m, c, f:reach.fc.features.find(f => +(f.properties || {}).contour === m)})).filter(x => x.f);
}
function reachDraw(){
  if(!mapReady) return;
  if(!reach.on){ setSrc('reach', FC([])); return; }
  const feats = reachRings().reverse().map(x => ({type:'Feature', properties:{c:x.c, m:x.m}, geometry:x.f.geometry}));
  if(reach.at) feats.push({type:'Feature', properties:{}, geometry:{type:'Point', coordinates:[reach.at.lng, reach.at.lat]}});
  setSrc('reach', FC(feats));
}
function reachUI(){
  $('#b-reach').classList.toggle('on', reach.on); document.body.classList.toggle('reachon', reach.on);
  const el = $('#reach'); el.hidden = !reach.on; if(!reach.on) return;
  const rings = reachRings(), spots = data.spots;
  const cnt = rings.map(x => spots.filter(s => inPoly([s.lng, s.lat], x.f.geometry)).length);
  const body = reach.busy ? '<div class="rc-load"><i class="bk-spin"></i>Wird berechnet …</div>'
    : reach.err ? `<div class="err">${esc(reach.err)}</div>`
    : `<div class="rc-k">${rings.map((x, i) => `<span style="--c:${x.c}"><b>${x.m} Min</b><small>${cnt[i] === 1 ? '1 Spot' : `${cnt[i]} Spots`}</small></span>`).join('')}</div>${reach.approx ? `<small class="muted">${reach.approx === 'all' ? 'Grob geschätzt – der genaue Dienst antwortet gerade nicht.' : `${reach.approx} grob geschätzt.`}</small>` : ''}`;
  el.innerHTML = `<div class="rc-h">${svg(UI.nav, 16)}<b>Reichweite</b><button class="rd-x" data-rc="off" aria-label="Reichweite ausblenden">${svg(UI.close, 12)}</button></div>${body}
    <div class="rc-f"><div class="seg2"><button class="${reach.land ? '' : 'on'}" data-rc="hw">Autobahn</button><button class="${reach.land ? 'on' : ''}" data-rc="land">Landstraße</button></div><button class="rc-mid" data-rc="mid">Kartenmitte</button></div>`;
}
async function reachToggle(on){
  reach.on = on; $('#layersPop').hidden = true; $('#b-layers').classList.remove('on'); $('#b-layers').setAttribute('aria-expanded', 'false');
  if(!on){ reach.at = null; reach.fc = null; reach.busy = false; reachUI(); reachDraw(); return; }
  reach.land = !!prefs.reachLand; reachUI();
  const p = await getHere();
  if(!reach.on) return;
  if(p) reachLoad({lat:p.lat, lng:p.lng});
  else { const c = map.getCenter(); toast('Ohne Standort – Reichweite ab Kartenmitte'); reachLoad({lat:c.lat, lng:c.lng}); }
  if(mobile()) setSnap('peek');
}
$('#reach').addEventListener('click', e => {
  const b = e.target.closest('[data-rc]'); if(!b) return;
  const a = b.dataset.rc;
  if(a === 'off') return reachToggle(false);
  if(a === 'mid'){ const c = map.getCenter(); return reachLoad({lat:c.lat, lng:c.lng}); }
  if((a === 'land') !== reach.land && (a === 'land' || a === 'hw')){ reach.land = a === 'land'; prefs.reachLand = reach.land; savePrefs(); if(reach.at) reachLoad(reach.at); }
});

/* ================= Clean-Karte (Vektor, OpenFreeMap) =================
   Wird im Handy gezeichnet: scharf in jeder Zoomstufe, Schrift bleibt waagerecht. Farben angelehnt an Apple Karten, hell und dunkel. */
const VEC_SRC = 'https://tiles.openfreemap.org/planet';
const VEC_PAL = {
  light:{land:'#f5f3ee', urban:'#efece6', park:'#d6ebc4', wood:'#cfe6bf', water:'#a9d3f2', waterTx:'#3f78a8', bld:'#e7e3da', bldLine:'#dad5ca',
    minor:'#ffffff', minorCase:'#dfdad0', sec:'#ffffff', secCase:'#d3cdc1', pri:'#fde9a8', priCase:'#e3c87a', mot:'#f8c56a', motCase:'#d7a24a', rail:'#cbc6bc',
    border:'#b6a8c8', tx:'#3a3a3c', txSoft:'#6e6e73', halo:'#ffffff', city:'#1c1c1e', hillX:.28, hillS:'rgba(80,62,34,.55)', hillH:'rgba(255,255,255,.35)'},
  dark:{land:'#1d2023', urban:'#22262a', park:'#1d3024', wood:'#1b2a20', water:'#14324a', waterTx:'#6fa3cf', bld:'#2a2e33', bldLine:'#33383e',
    minor:'#363a40', minorCase:'#24272b', sec:'#454a52', secCase:'#2a2d31', pri:'#6b6553', priCase:'#3d3a30', mot:'#a87b3e', motCase:'#5c4422', rail:'#3c4046',
    border:'#6d6280', tx:'#d9d9de', txSoft:'#9a9aa0', halo:'#121416', city:'#f2f2f7', hillX:.35, hillS:'rgba(0,0,0,.6)', hillH:'rgba(255,255,255,.05)'}
};
let vecOn = false, vecPalKey = null;
const vName = ['coalesce', ['get', 'name:de'], ['get', 'name_de'], ['get', 'name']];
const zw = (...st) => ['interpolate', ['exponential', 1.5], ['zoom'], ...st];
function vecLayers(P){
  const road = (id, classes, fill, kase, w, minz) => [
    {id:id + '-c', type:'line', source:'ofm', 'source-layer':'transportation', minzoom:minz, filter:['all', ['in', ['get', 'class'], ['literal', classes]], ['!=', ['get', 'brunnel'], 'tunnel']],
      layout:{'line-cap':'round', 'line-join':'round'}, paint:{'line-color':kase, 'line-width':zw(...w.map((x, i) => i % 2 ? x * 1.35 + .8 : x))}},
    {id:id, type:'line', source:'ofm', 'source-layer':'transportation', minzoom:minz, filter:['all', ['in', ['get', 'class'], ['literal', classes]], ['!=', ['get', 'brunnel'], 'tunnel']],
      layout:{'line-cap':'round', 'line-join':'round'}, paint:{'line-color':fill, 'line-width':zw(...w)}}];
  const txt = {'text-color':P.tx, 'text-halo-color':P.halo, 'text-halo-width':1.4, 'text-halo-blur':.4};
  return [
    {id:'v-land', type:'background', paint:{'background-color':P.land}},
    {id:'v-urban', type:'fill', source:'ofm', 'source-layer':'landuse', filter:['in', ['get', 'class'], ['literal', ['residential', 'suburb', 'neighbourhood', 'commercial', 'retail', 'industrial']]], paint:{'fill-color':P.urban}},
    {id:'v-wood', type:'fill', source:'ofm', 'source-layer':'landcover', filter:['in', ['get', 'class'], ['literal', ['wood', 'forest']]], paint:{'fill-color':P.wood, 'fill-opacity':['interpolate', ['linear'], ['zoom'], 5, .45, 12, P === VEC_PAL.dark ? .75 : 1]}},
    {id:'v-grass', type:'fill', source:'ofm', 'source-layer':'landcover', filter:['in', ['get', 'class'], ['literal', ['grass', 'meadow', 'park']]], paint:{'fill-color':P.park, 'fill-opacity':.55}},
    {id:'v-park', type:'fill', source:'ofm', 'source-layer':'park', paint:{'fill-color':P.park, 'fill-opacity':.85}},
    {id:'v-hill', type:'hillshade', source:'demhs', maxzoom:16, paint:{'hillshade-exaggeration':P.hillX, 'hillshade-shadow-color':P.hillS, 'hillshade-highlight-color':P.hillH, 'hillshade-accent-color':P.hillS, 'hillshade-illumination-anchor':'viewport'}},
    {id:'v-water', type:'fill', source:'ofm', 'source-layer':'water', paint:{'fill-color':P.water}},
    {id:'v-waterway', type:'line', source:'ofm', 'source-layer':'waterway', minzoom:8, layout:{'line-cap':'round'}, paint:{'line-color':P.water, 'line-width':zw(8, .6, 13, 1.6, 18, 5)}},
    {id:'v-building', type:'fill-extrusion', source:'ofm', 'source-layer':'building', minzoom:14, filter:['!=', ['get', 'hide_3d'], true],
      paint:{'fill-extrusion-color':P.bld, 'fill-extrusion-opacity':.9, 'fill-extrusion-vertical-gradient':true,
        'fill-extrusion-height':['interpolate', ['linear'], ['zoom'], 14, 0, 15.5, ['coalesce', ['get', 'render_height'], 6]],
        'fill-extrusion-base':['interpolate', ['linear'], ['zoom'], 14, 0, 15.5, ['coalesce', ['get', 'render_min_height'], 0]]}},
    {id:'v-tunnel', type:'line', source:'ofm', 'source-layer':'transportation', minzoom:12, filter:['==', ['get', 'brunnel'], 'tunnel'], layout:{'line-join':'round'}, paint:{'line-color':P.secCase, 'line-width':zw(12, 1, 18, 8), 'line-opacity':.5, 'line-dasharray':[2, 1.5]}},
    {id:'v-rail', type:'line', source:'ofm', 'source-layer':'transportation', minzoom:10, filter:['==', ['get', 'class'], 'rail'], paint:{'line-color':P.rail, 'line-width':zw(10, .6, 16, 2), 'line-dasharray':[3, 2]}},
    ...road('v-minor', ['minor', 'service', 'track', 'path'], P.minor, P.minorCase, [12, .5, 14, 2, 18, 12], 12),
    ...road('v-sec', ['secondary', 'tertiary'], P.sec, P.secCase, [8, .5, 12, 1.8, 14, 4, 18, 18], 8),
    ...road('v-pri', ['primary', 'trunk'], P.pri, P.priCase, [6, .5, 10, 1.6, 14, 5, 18, 22], 6),
    ...road('v-mot', ['motorway'], P.mot, P.motCase, [5, .6, 10, 2, 14, 6, 18, 26], 4),
    {id:'v-border', type:'line', source:'ofm', 'source-layer':'boundary', filter:['all', ['<=', ['to-number', ['get', 'admin_level'], 99], 4], ['!=', ['to-number', ['get', 'maritime'], 0], 1]], paint:{'line-color':P.border, 'line-width':['interpolate', ['linear'], ['zoom'], 3, .6, 10, 1.6], 'line-dasharray':[3, 2], 'line-opacity':.7}},
    {id:'v-lbl-water', type:'symbol', source:'ofm', 'source-layer':'water_name', layout:{'text-field':vName, 'text-font':['Noto Sans Italic'], 'text-size':12, 'text-max-width':8}, paint:{...txt, 'text-color':P.waterTx}},
    {id:'v-lbl-road', type:'symbol', source:'ofm', 'source-layer':'transportation_name', minzoom:12, filter:['in', ['get', 'class'], ['literal', ['motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'minor']]],
      layout:{'symbol-placement':'line', 'text-field':vName, 'text-font':['Noto Sans Regular'], 'text-size':['interpolate', ['linear'], ['zoom'], 12, 10, 17, 13], 'text-rotation-alignment':'map', 'text-pitch-alignment':'viewport', 'symbol-spacing':320}, paint:{...txt, 'text-color':P.txSoft}},
    {id:'v-lbl-house', type:'symbol', source:'ofm', 'source-layer':'housenumber', minzoom:17, layout:{'text-field':['get', 'housenumber'], 'text-font':['Noto Sans Regular'], 'text-size':10}, paint:{...txt, 'text-color':P.txSoft}},
    {id:'v-lbl-peak', type:'symbol', source:'ofm', 'source-layer':'mountain_peak', minzoom:11, layout:{'text-field':vName, 'text-font':['Noto Sans Italic'], 'text-size':11, 'text-offset':[0, .4]}, paint:{...txt, 'text-color':P.txSoft}},
    {id:'v-lbl-village', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:10, filter:['in', ['get', 'class'], ['literal', ['village', 'hamlet', 'suburb', 'neighbourhood']]],
      layout:{'text-field':vName, 'text-font':['Noto Sans Regular'], 'text-size':['interpolate', ['linear'], ['zoom'], 10, 11, 15, 14], 'text-max-width':8}, paint:{...txt}},
    {id:'v-lbl-town', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:7, filter:['==', ['get', 'class'], 'town'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Regular'], 'text-size':['interpolate', ['linear'], ['zoom'], 7, 11, 14, 16], 'text-max-width':8}, paint:{...txt}},
    {id:'v-lbl-city', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:4, filter:['==', ['get', 'class'], 'city'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Bold'], 'text-size':['interpolate', ['linear'], ['zoom'], 4, 11, 12, 19], 'text-max-width':8}, paint:{...txt, 'text-color':P.city}},
    {id:'v-lbl-country', type:'symbol', source:'ofm', 'source-layer':'place', maxzoom:6.5, filter:['==', ['get', 'class'], 'country'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Bold'], 'text-size':['interpolate', ['linear'], ['zoom'], 2, 11, 6, 15], 'text-transform':'uppercase', 'text-letter-spacing':.08, 'text-max-width':7}, paint:{...txt, 'text-color':P.txSoft}},
    {id:'v-lbl-state', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:5.5, maxzoom:8, filter:['==', ['get', 'class'], 'state'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Regular'], 'text-size':11, 'text-transform':'uppercase', 'text-letter-spacing':.06, 'text-max-width':7}, paint:{...txt, 'text-color':P.txSoft, 'text-opacity':.75}}
  ];
}
// scharfe Straßen und Namen über dem Satellitenbild (wie „Hybrid“ bei Apple)
function hybLayers(){
  const txt = {'text-color':'#ffffff', 'text-halo-color':'rgba(0,0,0,.78)', 'text-halo-width':1.5, 'text-halo-blur':.5};
  const ln = (id, classes, col, w, minz) => ({id, type:'line', source:'ofm', 'source-layer':'transportation', minzoom:minz, filter:['all', ['in', ['get', 'class'], ['literal', classes]], ['!=', ['get', 'brunnel'], 'tunnel']],
    layout:{'line-cap':'round', 'line-join':'round'}, paint:{'line-color':col, 'line-width':zw(...w)}});
  return [
    ln('h-minor', ['minor', 'service'], 'rgba(255,255,255,.28)', [13, .5, 18, 6], 13),
    ln('h-sec', ['secondary', 'tertiary'], 'rgba(255,255,255,.42)', [9, .4, 14, 2, 18, 10], 9),
    ln('h-pri', ['primary', 'trunk'], 'rgba(255,226,140,.62)', [7, .5, 14, 3, 18, 14], 7),
    ln('h-mot', ['motorway'], 'rgba(255,200,90,.75)', [5, .6, 14, 4, 18, 18], 5),
    {id:'h-border', type:'line', source:'ofm', 'source-layer':'boundary', filter:['all', ['<=', ['to-number', ['get', 'admin_level'], 99], 4], ['!=', ['to-number', ['get', 'maritime'], 0], 1]], paint:{'line-color':'rgba(255,255,255,.55)', 'line-width':1.2, 'line-dasharray':[3, 2]}},
    {id:'h-lbl-water', type:'symbol', source:'ofm', 'source-layer':'water_name', layout:{'text-field':vName, 'text-font':['Noto Sans Italic'], 'text-size':12}, paint:{...txt, 'text-color':'#cfe8ff'}},
    {id:'h-lbl-road', type:'symbol', source:'ofm', 'source-layer':'transportation_name', minzoom:13, filter:['in', ['get', 'class'], ['literal', ['motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'minor']]],
      layout:{'symbol-placement':'line', 'text-field':vName, 'text-font':['Noto Sans Regular'], 'text-size':['interpolate', ['linear'], ['zoom'], 13, 10, 17, 13], 'symbol-spacing':320}, paint:{...txt}},
    {id:'h-lbl-village', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:10, filter:['in', ['get', 'class'], ['literal', ['village', 'hamlet', 'suburb', 'neighbourhood']]],
      layout:{'text-field':vName, 'text-font':['Noto Sans Regular'], 'text-size':['interpolate', ['linear'], ['zoom'], 10, 11, 15, 14], 'text-max-width':8}, paint:{...txt}},
    {id:'h-lbl-town', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:7, filter:['==', ['get', 'class'], 'town'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Bold'], 'text-size':['interpolate', ['linear'], ['zoom'], 7, 11, 14, 16], 'text-max-width':8}, paint:{...txt}},
    {id:'h-lbl-city', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:4, filter:['==', ['get', 'class'], 'city'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Bold'], 'text-size':['interpolate', ['linear'], ['zoom'], 4, 12, 12, 20], 'text-max-width':8}, paint:{...txt}},
    {id:'h-lbl-country', type:'symbol', source:'ofm', 'source-layer':'place', maxzoom:6.5, filter:['==', ['get', 'class'], 'country'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Bold'], 'text-size':['interpolate', ['linear'], ['zoom'], 2, 11, 6, 15], 'text-transform':'uppercase', 'text-letter-spacing':.08, 'text-max-width':7}, paint:{...txt, 'text-color':'rgba(255,255,255,.85)'}},
    {id:'h-lbl-state', type:'symbol', source:'ofm', 'source-layer':'place', minzoom:5.5, maxzoom:8, filter:['==', ['get', 'class'], 'state'],
      layout:{'text-field':vName, 'text-font':['Noto Sans Regular'], 'text-size':11, 'text-transform':'uppercase', 'text-letter-spacing':.06, 'text-max-width':7}, paint:{...txt, 'text-color':'rgba(255,255,255,.6)'}}
  ];
}
const vecIds = () => vecLayers(VEC_PAL.light).map(l => l.id);
const hybIds = () => hybLayers().map(l => l.id);
let hybOn = false, ofmOk = 0, ofmFail = 0, ofmBad = false;
const useHybrid = () => !ofmBad;
function vecEnsure(){
  if(!mapReady || !map.getLayer) return;
  const key = curTheme() === 'light' ? 'light' : 'dark';
  if(vecPalKey === key && map.getLayer('v-land')) return;
  if(!map.getSource('ofm')) map.addSource('ofm', {type:'vector', url:VEC_SRC, attribution:'© OpenFreeMap © OpenMapTiles · Daten © OpenStreetMap'});
  if(!map.getSource('demhs')) map.addSource('demhs', {type:'raster-dem', tiles:['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'], encoding:'terrarium', tileSize:256, maxzoom:13});
  vecIds().forEach(id => { if(map.getLayer(id)) map.removeLayer(id); });
  vecLayers(VEC_PAL[key]).forEach(l => map.addLayer({...l, layout:{...(l.layout || {}), visibility:vecOn ? 'visible' : 'none'}}, 'roads'));
  if(!map.getLayer('h-minor')) hybLayers().forEach(l => map.addLayer({...l, layout:{...(l.layout || {}), visibility:'none'}}, 'roads'));
  vecPalKey = key;
}
function hybShow(on){
  hybOn = on;
  if(!mapReady || !map.getLayer || !map.getLayer('h-minor')) return;
  hybIds().forEach(id => map.setLayoutProperty(id, 'visibility', on ? 'visible' : 'none'));
}
map.on('data', e => { if(e.dataType === 'source' && e.sourceId === 'ofm' && e.tile) ofmOk++; });
map.on('error', e => {
  if(!(e.sourceId === 'ofm' || /openfreemap/.test(String(e.error?.url || e.error?.message || '')))) return;
  if(++ofmFail >= 4 && !ofmOk && !ofmBad){ ofmBad = true; applyLabels(); }
});
function vecShow(on){
  vecOn = on;
  if(!mapReady || !map.getLayer || !map.getLayer('v-land')) return;
  vecIds().forEach(id => { const lbl = id.startsWith('v-lbl'); map.setLayoutProperty(id, 'visibility', on && (!lbl || prefs.labels) ? 'visible' : 'none'); });
}

/* Erkennen, wenn keine Kacheln laden */
let tilesOk = 0, tilesBad = 0;
map.on('data', e => { if(e.dataType === 'source' && e.sourceId === 'sat' && e.tile){ tilesOk++; $('#tilewarn').hidden = true; } });
map.on('error', e => {
  if(!(e.sourceId === 'sat' || e.source?.id === 'sat' || /arcgisonline/.test(String(e.error?.url || e.error?.message || '')))) return;
  if(++tilesBad >= 4 && tilesOk === 0){
    const inPreview = window.self !== window.top || location.protocol === 'blob:';
    $('#tilewarn-txt').textContent = inPreview
      ? 'Diese Vorschau blockiert Kartenbilder. Öffne die App direkt im Browser.'
      : 'Prüfe deine Internetverbindung. Firmennetze oder Werbeblocker können den Kartenserver (arcgisonline.com) sperren.';
    $('#tilewarn').hidden = false;
  }
});

/* ================= Zustand ================= */
let filter = new Set();
let selected = null;
let draft = null;
let mode = null;
let view = 'list'; document.body.classList.add('vlist');
let geoResults = [], geoState = 'idle';
let editError = '';
let me = null, searching = false, panelCollapsed = false;
const visibleSpots = () => data.spots.filter(s => !filter.size || filter.has(s.cat));

/* ================= Marker ================= */
const markers = new Map();
function markerEl(kind, id){
  const el = document.createElement('div');
  el.className = (kind === 'spot' ? 'mk-spot' : 'mk-park') + ' new';
  el.dataset.id = id;
  el.addEventListener('animationend', () => el.classList.remove('new'), {once:true});
  el.addEventListener('click', e => { e.stopPropagation(); if(!mode && view !== 'edit' && !ckOn && !drawing) openDetail(id, true); });
  return el;
}
function upsert(key, kind, id, pos, html, sel, z){
  let m = markers.get(key);
  if(!m){
    const el = markerEl(kind, id);
    m = new maplibregl.Marker({element:el, anchor: kind === 'spot' ? 'bottom' : 'center'}).setLngLat(LL(pos)).addTo(map);
    markers.set(key, m);
  } else m.setLngLat(LL(pos));
  const el = m.getElement();
  if(el._html !== html){ el.innerHTML = html; el._html = html; }
  el.classList.toggle('sel', sel);
  el.style.zIndex = z;
}
function renderMarkers(){
  const feats = (tab === 'spots' && spotView === 'ws' && !draft ? [] : visibleSpots()).filter(s => !(draft && draft.id === s.id))
    .map(s => ({type:'Feature', properties:{id:s.id}, geometry:{type:'Point', coordinates:LL(s)}}));
  if(mapReady) map.getSource('spots')?.setData(FC(feats));
  scheduleMarkers();
}
let markerQueued = false, markerTimer = null;
function scheduleMarkers(){
  if(ckOn){ if(markerTimer) return; markerTimer = setTimeout(() => { markerTimer = null; updateMarkers(); }, 700); return; }
  if(markerQueued) return; markerQueued = true;
  requestAnimationFrame(() => { markerQueued = false; updateMarkers(); });
}
function updateMarkers(){
  if(!mapReady || !map.getSource('spots')) return;
  const want = new Set(), lines = [];
  const vis = new Set((tab === 'spots' && spotView === 'ws' && !draft ? [] : visibleSpots()).map(s => s.id));
  const feats = map.querySourceFeatures('spots');
  if(!feats.length && vis.size && map.getSource('spots') && !map.isSourceLoaded('spots')) return;
  for(const f of feats){
    const p = f.properties;
    if(p.cluster){
      const key = 'c:' + p.cluster_id;
      if(want.has(key)) continue; want.add(key);
      upsertCluster(key, p.cluster_id, f.geometry.coordinates, p.point_count);
    } else {
      const s = data.spots.find(x => x.id === p.id);
      if(!s || !vis.has(s.id) || want.has('s:' + s.id) || (draft && draft.id === s.id)) continue;
      const cat = catById(s.cat), sel = s.id === selected;
      want.add('s:' + s.id);
      upsert('s:' + s.id, 'spot', s.id, s, `<div class="pin" style="--c:${cat.color}">${ic(cat.icon, 16)}</div>`, sel, sel ? 4 : 2);
      if(s.walk && s.parking){
        want.add('p:' + s.id);
        upsert('p:' + s.id, 'park', s.id, s.parking, '<div class="pk">P</div>', sel, sel ? 3 : 1);
        lines.push({type:'Feature', properties:{sel}, geometry:{type:'LineString', coordinates:[LL(s.parking), LL(s)]}});
      }
    }
  }
  for(const [k, m] of markers) if(!want.has(k)){ m.remove(); markers.delete(k); }
  setSrc('links', FC(lines));
}
function upsertCluster(key, cid, coords, count){
  let m = markers.get(key);
  if(!m){
    const el = document.createElement('div');
    el.className = 'mk-cluster new';
    el.addEventListener('animationend', () => el.classList.remove('new'), {once:true});
    el.addEventListener('click', e => {
      e.stopPropagation();
      Promise.resolve(map.getSource('spots').getClusterExpansionZoom(cid))
        .then(z => map.easeTo({center:coords, zoom:Math.min((z || map.getZoom() + 2) + .4, 18), duration:800}))
        .catch(() => map.easeTo({center:coords, zoom:map.getZoom() + 2, duration:800}));
    });
    m = new maplibregl.Marker({element:el, anchor:'center'}).setLngLat(coords).addTo(map);
    markers.set(key, m);
  } else m.setLngLat(coords);
  const el = m.getElement(), size = Math.min(42, 32 + count * 2);
  if(el._n !== count){ el._n = count; el.textContent = count; el.style.width = el.style.height = size + 'px'; el.style.fontSize = (count > 99 ? 12 : 14) + 'px'; }
  el.style.zIndex = 3;
}

let draftSpotM = null, draftParkM = null;
function renderDraftMarkers(){
  if(draftSpotM){ draftSpotM.remove(); draftSpotM = null; }
  if(draftParkM){ draftParkM.remove(); draftParkM = null; }
  setSrc('draftlink', FC([]));
  if(!draft || draft.lat == null) return;
  const cat = catById(draft.cat);
  const el = document.createElement('div');
  el.className = 'mk-spot draft';
  el.innerHTML = `<div class="pin" style="--c:${cat.color}">${ic(cat.icon, 16)}</div>`;
  el.style.zIndex = 6;
  draftSpotM = new maplibregl.Marker({element:el, anchor:'bottom', draggable:true}).setLngLat(LL(draft)).addTo(map);
  draftSpotM.on('drag', () => { const p = draftSpotM.getLngLat(); draft.lat = p.lat; draft.lng = p.lng; drawDraftLine(); });
  draftSpotM.on('dragend', () => view === 'edit' && refreshEditLive());
  if(draft.walk && draft.parking){
    const pe = document.createElement('div');
    pe.className = 'mk-park draft'; pe.innerHTML = '<div class="pk">P</div>'; pe.style.zIndex = 5;
    draftParkM = new maplibregl.Marker({element:pe, anchor:'center', draggable:true}).setLngLat(LL(draft.parking)).addTo(map);
    draftParkM.on('drag', () => { const p = draftParkM.getLngLat(); draft.parking.lat = p.lat; draft.parking.lng = p.lng; drawDraftLine(); });
    draftParkM.on('dragend', () => view === 'edit' && refreshEditLive());
  }
  drawDraftLine();
}
function drawDraftLine(){
  setSrc('draftlink', FC(draft && draft.walk && draft.parking && draft.lat != null
    ? [{type:'Feature', properties:{}, geometry:{type:'LineString', coordinates:[LL(draft.parking), LL(draft)]}}] : []));
}

/* ================= Panel / Sheet ================= */
const panel = $('#panel');
const mqMobile = matchMedia('(max-width:640px)');
const mobile = () => mqMobile.matches;
const SNAPS = ['mini', 'peek', 'half', 'full'];
let snap = 'peek', sheetY = 0;

function peekVisible(){
  const head = view === 'list' ? $('#listView .ph') : null;
  const grab = $('.grabwrap').offsetHeight;
  const safe = parseFloat(getComputedStyle(panel).paddingBottom) || 0;
  if(head) return grab + head.offsetHeight + safe;
  // Platzieren / Einzeichnen: so viel zeigen, dass alle Knöpfe sichtbar sind
  const body = (view === 'mode' || view === 'draw') ? $('#' + view + 'View') : null;
  if(body && body.firstElementChild) return Math.min(innerHeight * .6, grab + body.firstElementChild.offsetHeight + safe + 8);
  return 150 + safe;
}
function snapY(name){
  const H = panel.offsetHeight;
  if(name === 'mini') return Math.max(0, H - ($('.grabwrap').offsetHeight + (parseFloat(getComputedStyle(panel).paddingBottom) || 0) + 10));
  const vis = name === 'full' ? H : name === 'half' ? Math.min(H, Math.max(peekVisible() + 60, innerHeight * .5)) : peekVisible();
  return Math.max(0, H - vis);
}
function setSheetY(y, animate){
  sheetY = y;
  panel.classList.toggle('dragging', !animate);
  panel.style.transform = `translateY(${y}px)`;
  const at = $('#attrib');
  at.classList.toggle('dragging', !animate);
  at.style.transform = `translateY(${-(panel.offsetHeight - y) - 4}px)`;
  at.style.opacity = (panel.offsetHeight - y) > innerHeight * .7 ? 0 : 1;
}
function setSnap(name, animate = true){
  if(!mobile()) return;
  snap = name; document.body.classList.toggle('sheetfull', name === 'full');
  panel.classList.toggle('full', name === 'full');
  setSheetY(snapY(name), animate);
}
function visibleSheet(){ return mobile() ? Math.max(0, panel.offsetHeight - sheetY) : 0; }
function camPad(){
  return mobile()
    ? {top:80, bottom:Math.min(visibleSheet(), innerHeight * .55) + 30, left:40, right:70}
    : {top:70, bottom:60, left:panelCollapsed ? 80 : 460, right:90};
}

/* Ziehen mit Schwung */
(() => {
  let start = null, dragging = false, moved = false, samples = [];
  panel.addEventListener('pointerdown', e => {
    if(!mobile() || e.button > 0) return;
    if(e.target.closest('input,textarea,select,.no-drag')) return;
    start = {x:e.clientX, y:e.clientY, sy:sheetY, id:e.pointerId, scroller:e.target.closest('.pb,.pad')};
    dragging = false; moved = false; samples = [{y:e.clientY, t:performance.now()}];
  });
  panel.addEventListener('pointermove', e => {
    if(!start || e.pointerId !== start.id) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if(!dragging){
      if(Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)){ start = null; return; }   // seitlich (z. B. Kategorien wischen): kein Ziehen
      if(Math.abs(dy) < 7 || Math.abs(dy) < Math.abs(dx)) return;
      if(start.scroller && snap === 'full' && !(start.scroller.scrollTop <= 0 && dy > 0)){ start = null; return; }
      dragging = true; moved = true;
      try{ panel.setPointerCapture(e.pointerId); }catch(_){}
      if(document.activeElement && document.activeElement.blur) document.activeElement.blur();
    }
    const maxY = snapY('mini');
    let y = start.sy + dy;
    if(y < 0) y = y / 3;                 // Gummiband oben
    if(y > maxY) y = maxY + (y - maxY) / 3;
    setSheetY(y, false);
    samples.push({y:e.clientY, t:performance.now()});
    if(samples.length > 5) samples.shift();
  });
  const end = e => {
    if(!start || (e && e.pointerId !== start.id)) return;
    if(dragging){
      const a = samples[0], b = samples[samples.length - 1];
      const v = (b.y - a.y) / Math.max(1, b.t - a.t); // px/ms, + = nach unten
      let idx;
      if(Math.abs(v) > .45){
        // Schwung: Endposition hochrechnen und dorthin schnappen – mindestens ein Schritt in Wischrichtung
        const proj = sheetY + v * 220; let best = 0, bd = Infinity;
        SNAPS.forEach((n, i) => { const d = Math.abs(snapY(n) - proj); if(d < bd){ bd = d; best = i; } });
        const cur = SNAPS.indexOf(snap), step = v > 0 ? -1 : 1;
        idx = step > 0 ? Math.max(best, cur + 1) : Math.min(best, cur - 1);
      }
      else {
        let best = 0, bd = Infinity;
        SNAPS.forEach((n, i) => { const d = Math.abs(snapY(n) - sheetY); if(d < bd){ bd = d; best = i; } });
        idx = best;
      }
      const was = snap; setSnap(SNAPS[Math.max(0, Math.min(SNAPS.length - 1, idx))]); if(snap !== was) haptic();
    }
    start = null; dragging = false;
  };
  panel.addEventListener('pointerup', end);
  panel.addEventListener('pointercancel', end);
  panel.addEventListener('click', e => { if(moved){ e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
})();
$('.grabwrap').addEventListener('click', () => setSnap(snap === 'mini' ? 'peek' : snap === 'peek' ? 'half' : snap === 'half' ? 'full' : 'peek'));
function setCollapsed(c){
  panelCollapsed = c;
  panel.classList.toggle('collapsed', c); document.body.classList.toggle('pcol', c);
  $('#panelOpen').hidden = !c;
  try{ prefs.pcol = c; savePrefs(); }catch(e){}
}
$('#collapseBtn').addEventListener('click', () => setCollapsed(true));
$('#panelOpen').addEventListener('click', () => setCollapsed(false));
mqMobile.addEventListener?.('change', () => { if(mobile()) setSnap(snap, false); else { panel.style.transform = ''; $('#attrib').style.transform = ''; panel.classList.remove('full'); } });
addEventListener('resize', () => mobile() && setSnap(snap, false));

const VDEPTH = {list:0, detail:1, place:1, track:1, course:1, ws:1, sun:1, trackSave:1, mode:2, edit:2, draw:2};
function show(v, snapTo){
  const changed = v !== view, dir = (VDEPTH[v] || 0) >= (VDEPTH[view] || 0) ? 'vpush' : 'vpop';
  // Liste merkt sich Höhe und Scrollposition, damit "Zurück" genau dorthin führt
  if(changed && view === 'list'){ const pb = $('#listView .pb'); listMem = {snap, sc:pb ? pb.scrollTop : 0, tab}; }
  if(changed && v === 'list' && listMem && listMem.tab === tab && (!snapTo || snapTo === 'half') && mobile()) snapTo = listMem.snap;
  view = v; document.body.classList.toggle('vlist', v === 'list');
  if(!mobile() && panelCollapsed && v !== 'list') setCollapsed(false);
  for(const id of ['listView','detailView','placeView','editView','modeView','trackView','trackSaveView','courseView','drawView','wsView','sunView']){
    const el = $('#' + id), on = id === v + 'View';
    el.hidden = !on;
    if(on && changed){ el.classList.remove('enter', 'vpush', 'vpop'); void el.offsetWidth; el.classList.add('enter', dir); }
  }
  if(snapTo) setSnap(snapTo); else if(mobile()) setSnap(snap);
  if(changed && v === 'list' && listMem && listMem.tab === tab && listMem.sc){ const pb = $('#listView .pb'), sc = listMem.sc; if(pb){ pb.scrollTop = sc; requestAnimationFrame(() => { if(view === 'list') pb.scrollTop = sc; }); } }
  updateTrackLayers(); renderWsMarkers();
}
let listMem = null;

/* ================= Liste ================= */
function renderChips(){
  const counts = {};
  data.spots.forEach(s => counts[s.cat] = (counts[s.cat] || 0) + 1);
  if(!data.spots.length){ $('#chips').innerHTML = ''; return; }
  const all = `<button class="chip ${filter.size ? '' : 'on'}" data-f="" aria-pressed="${!filter.size}">Alle <span class="n">${data.spots.length}</span></button>`;
  requestAnimationFrame(() => { const on = $('#chips .chip.on'); if(on && on.dataset.f) on.scrollIntoView({inline:'nearest', block:'nearest'}); });
  $('#chips').innerHTML = all + data.cats.map(c =>
    `<button class="chip ${filter.has(c.id) ? 'on' : ''}" data-f="${c.id}" aria-pressed="${filter.has(c.id)}" style="--c:${c.color}"><span class="dot"></span>${esc(c.name)} <span class="n">${counts[c.id] || 0}</span></button>`).join('');
}
// Mausrad auf Chip-Zeilen = seitlich scrollen (am PC sonst nicht erreichbar)
document.addEventListener('wheel', e => { const c = e.target.closest && e.target.closest('.chips'); if(!c || Math.abs(e.deltaX) > Math.abs(e.deltaY) || c.scrollWidth <= c.clientWidth) return; c.scrollLeft += e.deltaY; e.preventDefault(); }, {passive:false});
$('#chips').addEventListener('click', e => {
  const b = e.target.closest('[data-f]'); if(!b) return;
  const f = b.dataset.f;
  if(!f) filter.clear(); else filter.has(f) ? filter.delete(f) : filter.add(f);
  renderChips(); renderList(); renderMarkers(); renderNearest();
});

function itemHTML(s){
  const cat = catById(s.cat);
  let sub = esc(cat.name);
  if(s.walk && s.parking) sub = `<span class="tag-p">P</span>${fmtDist(dist(s.parking, s))} zu Fuß · ` + sub;
  else if(s.walk) sub = 'Kein Parkplatz gesetzt · ' + sub;
  if(me) sub = `<span class="me-d">${fmtDist(dist(me, s))}</span> · ` + sub;
  return `<button class="item" data-id="${s.id}"><span class="ic" style="--c:${cat.color}">${ic(cat.icon, 16)}</span><span class="tx"><span class="t">${esc(s.name)}</span><span class="s">${sub}</span></span>${rwTagHTML(s)}</button>`;
}
const inWsView = () => tab === 'crew' || (tab === 'spots' && spotView === 'ws' && !searching);
function renderList(){
  if(!inWsView()) wsShow = null;
  if(tab === 'tracks') return renderTrackList();
  if(tab === 'crew') return renderWorkshop();
  const q = $('#q').value.trim().toLowerCase();
  const body = $('#listBody');
  if(!q && !searching && spotView === 'ws') return renderWsSpots();
  if(!q && searching && (prefs.recent || []).length){
    body.innerHTML = `<div class="sec">Zuletzt gesucht<button class="txtbtn sm" data-geoclear>Löschen</button></div>` + prefs.recent.map((r, i) => geoRowHTML(r, 'r' + i)).join('')
      + `<div class="sec">Deine Spots</div>` + visibleSpots().slice().sort(me ? (a,b) => dist(me, a) - dist(me, b) : (a,b) => (b.created||0) - (a.created||0)).slice(0, 8).map(itemHTML).join('');
    return;
  }
  if(!q){
    const list = visibleSpots().slice().sort(me ? (a,b) => dist(me, a) - dist(me, b) : (a,b) => (b.created||0) - (a.created||0));
    if(!data.spots.length) body.innerHTML = `<div class="empty"><b>Noch keine Spots</b>Tippe auf <strong>+</strong> und dann auf die Karte, um deinen ersten Spot zu setzen.</div>`;
    else if(!list.length) body.innerHTML = `<div class="empty">Keine Spots in ${filter.size > 1 ? 'diesen Kategorien' : 'dieser Kategorie'}.<button class="btn" data-clearfilter style="margin-top:10px">Filter zurücksetzen</button></div>`;
    else{ body.innerHTML = (filter.size ? '' : sunCardHTML()) + list.map(itemHTML).join(''); rwListLoad(list); }
    return;
  }
  const own = data.spots.filter(s => (s.name + ' ' + (s.notes||'') + ' ' + catById(s.cat).name).toLowerCase().includes(q))
    .sort((a, b) => (b.name.toLowerCase().startsWith(q) - a.name.toLowerCase().startsWith(q)) || (me ? dist(me, a) - dist(me, b) : a.name.localeCompare(b.name, 'de')));
  const showN = searchAll ? own.length : 6;
  let html = own.length ? `<div class="sec">Deine Spots</div>` + own.slice(0, showN).map(itemHTML).join('') + (own.length > showN ? `<button class="item more-it" data-searchall><span class="tx"><span class="t">${own.length - showN} weitere Spots anzeigen</span></span></button>` : '') : '';
  html += `<div class="sec">Orte${geoState === 'loading' ? '<i class="geo-spin"></i>' : ''}</div>`;
  const co = geoCoord($('#q').value);
  if(co) html += geoRowHTML(co, -1);
  if(geoState === 'error') html += `<div class="empty" style="padding:8px">Ortssuche nicht erreichbar. Prüfe deine Internetverbindung.</div>`;
  else if(geoState === 'done' && !geoResults.length && !co) html += `<div class="empty" style="padding:8px">Nichts gefunden. Probier es mit Ort und Straße, z. B. „Domstraße Würzburg“.</div>`;
  else if(geoResults.length) html += geoResults.map(geoRowHTML).join('');
  else if(geoState === 'fallback') html += `<button class="item" data-geosearch="1"><span class="ic" style="--c:var(--accent)">${svg(UI.search,16)}</span><span class="tx"><span class="t">„${esc($('#q').value.trim())}“ suchen</span><span class="s">oder Enter drücken</span></span></button>`;
  else if(geoState === 'loading') html += `<div class="empty" style="padding:8px">Suche …</div>`;
  body.innerHTML = html;
}
let qTimer;
$('#q').addEventListener('input', () => {
  const v = $('#q').value.trim();
  clearTimeout(qTimer); qTimer = setTimeout(renderList, 60);
  clearTimeout(geoTimer);
  if(v.length < 2){ if(geoCtl) geoCtl.abort(); geoState = 'idle'; geoResults = []; return; }
  geoTimer = setTimeout(() => geoSuggest(v), 260);
});
$('#q').addEventListener('focus', () => setSnap('full'));
let searchAll = false, searchBack = '';
function openSearch(){
  if(view === 'place') closePlace(false);
  if(view !== 'list' && view !== 'edit') show('list');
  if(tab !== 'spots') setTab('spots');
  if(!mobile() && panelCollapsed) setCollapsed(false);
  searching = true;
  $('#headRow').hidden = true; $('#searchRow').hidden = false; syncSpotsHead();
  setSnap('full'); renderList();
  setTimeout(() => $('#q').focus(), 30);
}
function closeSearch(){
  if(!searching) return;
  searching = false; searchAll = false; $('#q').value = ''; $('#q').blur(); geoState = 'idle';
  $('#headRow').hidden = false; $('#searchRow').hidden = true; syncSpotsHead();
  renderList();
  if(mobile()) setSnap('peek');
}
$('#searchBtn').addEventListener('click', openSearch);
$('#searchCancel').addEventListener('click', closeSearch);
document.addEventListener('keydown', e => { if(e.key === 'Escape' && searching) closeSearch(); });
$('#q').addEventListener('keydown', e => {
  if(e.key !== 'Enter') return;
  e.preventDefault();
  const v = $('#q').value.trim(), co = geoCoord(v);
  if(co) return openPlace(co);
  if(geoResults.length && geoResultsQ === v){   // wie im Navi: Enter nimmt den besten Treffer (bei Hausnummer die passende Adresse)
    const num = v.match(/\d+\s?[a-z]?\b/i);
    return openPlace((num && geoResults.find(r => r.name.replace(/\s/g, '').toLowerCase().includes(num[0].replace(/\s/g, '').toLowerCase()))) || geoResults[0]);
  }
  clearTimeout(geoTimer); geoSuggest(v, true);
});
/* ================= Ortssuche wie im Navi =================
   Vorschläge beim Tippen über Photon (OpenStreetMap, ohne Key), nach Nähe sortiert. Rückfall: Nominatim. */
let geoCtl = null, geoTimer = 0, geoResultsQ = '', geoLastQ = '', placeCur = null, placeM = null;
const GEO_ZOOM = {country:5, state:7, county:9.5, city:12.2, district:14, locality:14.5, street:16.5, house:17.6, other:17, coord:16.5};
const GEO_IC = {
  city:'<path d="M3 21h18M5 21V9l5-3v15M10 21V4l9 4v13M13 10h3M13 14h3M7 12h1M7 16h1"/>',
  street:'<path d="M8 3 5 21M16 3l3 18M12 4v2.5M12 10.5v3M12 17.5V20"/>',
  house:'<path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-6h4v6"/>',
  fuel:'<path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h14M7 9h6M15 8l3 2v7a1.5 1.5 0 0 0 3 0V9l-3-3"/>',
  park:'<rect x="4" y="3.5" width="16" height="17" rx="3"/><path d="M10 16.5v-9h3a2.6 2.6 0 0 1 0 5.2h-3"/>',
  coord:'<circle cx="12" cy="12" r="7"/><path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4"/>',
  poi:'<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'
};
function geoKind(r){
  if(r.type === 'coord') return 'coord';
  if(r.key === 'amenity' && r.val === 'fuel') return 'fuel';
  if(r.key === 'amenity' && /parking/.test(r.val || '')) return 'park';
  if(['city', 'county', 'state', 'country', 'district', 'locality'].includes(r.type) || r.key === 'place' || r.key === 'boundary') return 'city';
  if(r.type === 'street' || r.key === 'highway') return 'street';
  if(r.type === 'house' && !r.poi) return 'house';
  return 'poi';
}
function geoCoord(v){
  const m = String(v || '').match(/^\s*(-?\d{1,2}(?:[.,]\d+)?)\s*[,;\s]\s*(-?\d{1,3}(?:[.,]\d+)?)\s*$/);
  if(!m) return null;
  const lat = +m[1].replace(',', '.'), lng = +m[2].replace(',', '.');
  if(Math.abs(lat) > 90 || Math.abs(lng) > 180 || !/[.,]/.test(m[1] + m[2])) return null;
  return {name:'Koordinaten', sub:`${lat.toFixed(5)}, ${lng.toFixed(5)}`, lat, lng, type:'coord'};
}
function photonPlace(f){
  const p = f.properties || {}, [lng, lat] = f.geometry.coordinates;
  const street = p.street ? p.street + (p.housenumber ? ' ' + p.housenumber : '') : '';
  const town = p.city || p.town || p.village || p.locality || p.district || p.county || '';
  const isAddr = p.type === 'house' && (!p.name || p.osm_key === 'place' || p.osm_key === 'building');
  const name = isAddr ? (street || p.name || town) : (p.name || street || town || '?');
  const sub = [];
  if(!isAddr && street && p.type !== 'street') sub.push(street);
  if(town && town !== name) sub.push([p.postcode, town].filter(Boolean).join(' '));
  else if(p.type === 'street' && p.postcode) sub.push(p.postcode);
  if(sub.length < 2 && p.state && p.state !== name && p.type !== 'state') sub.push(p.state);
  if(p.countrycode && p.countrycode !== 'DE' && p.country && p.country !== name) sub.push(p.country);
  return {name, sub:sub.join(' · '), lat, lng, ext:p.extent || null, type:p.type || 'other', key:p.osm_key, val:p.osm_value, poi:!isAddr && p.type === 'house'};
}
async function geoSuggest(q, enter){
  if(geoCtl) geoCtl.abort();
  const ctl = geoCtl = new AbortController(), c = me || (mapReady ? map.getCenter() : null);
  geoState = 'loading'; renderList();
  try{
    const r = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&lang=de&limit=10${c ? `&lat=${c.lat.toFixed(4)}&lon=${c.lng.toFixed(4)}` : ''}`, {signal:ctl.signal});
    if(!r.ok) throw new Error('photon ' + r.status);
    const j = await r.json(); if(ctl !== geoCtl) return;
    const seen = new Set();
    geoResults = (j.features || []).map(photonPlace).filter(x => { const k = normName(x.name) + '|' + normName(x.sub); if(seen.has(k)) return false; seen.add(k); return true; }).slice(0, 8);
    geoState = 'done'; geoResultsQ = q;
  }catch(e){
    if(e.name === 'AbortError') return;
    if(enter) return geoSearch();   // Photon weg: einmal Nominatim fragen
    geoState = 'fallback'; geoResults = [];
  }
  if($('#q').value.trim() === q){ renderList(); if(enter && geoResults.length) openPlace(geoResults[0]); }
}
async function geoSearch(){
  const q = $('#q').value.trim(); if(!q) return;
  geoState = 'loading'; renderList();
  try{
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=8&accept-language=de&q=${encodeURIComponent(q)}`);
    if(!r.ok) throw 0;
    geoResults = (await r.json()).map(x => {
      const parts = x.display_name.split(', '), bb = x.boundingbox;
      return {name:x.name || parts[0], sub:parts.slice(1, 4).join(' · '), lat:+x.lat, lng:+x.lon, ext:bb ? [+bb[2], +bb[1], +bb[3], +bb[0]] : null,
        type:x.addresstype === 'road' ? 'street' : ['city', 'town', 'village', 'municipality'].includes(x.addresstype) ? 'city' : x.addresstype === 'house' || x.addresstype === 'building' ? 'house' : x.addresstype || 'other', key:x.category, val:x.type};
    });
    geoState = 'done'; geoResultsQ = q;
  }catch(e){ geoState = 'error'; }
  renderList();
}
function geoRowHTML(r, i){
  const k = geoKind(r), d = me ? dist(me, r) : null;
  return `<button class="item geo-it" data-geo="${i}"><span class="ic geo-ic k-${k}">${svg(GEO_IC[k], 16, 2)}</span><span class="tx"><span class="t">${esc(r.name)}</span><span class="s">${esc(r.sub || '')}</span></span>${d != null ? `<span class="geo-d">${fmtDist(d)}</span>` : ''}</button>`;
}
function rememberPlace(r){
  const keep = {name:r.name, sub:r.sub, lat:r.lat, lng:r.lng, ext:r.ext || null, type:r.type, key:r.key, val:r.val, poi:r.poi};
  prefs.recent = [keep, ...(prefs.recent || []).filter(x => !(Math.abs(x.lat - r.lat) < 1e-5 && Math.abs(x.lng - r.lng) < 1e-5))].slice(0, 8); savePrefs();
}
function openPlace(r){
  if(!r) return;
  geoLastQ = $('#q').value.trim();
  if(r.type !== 'coord' && !r.noRecent) rememberPlace(r);
  placeCur = r;
  if(searching) closeSearch();
  if(placeM) placeM.remove();
  const el = document.createElement('div'); el.className = 'mk-place'; el.innerHTML = `<div class="pin">${svg(GEO_IC[geoKind(r)], 16, 2.2)}</div>`;
  placeM = new maplibregl.Marker({element:el, anchor:'bottom'}).setLngLat([r.lng, r.lat]).addTo(map);
  renderPlace(); show('place', 'half');
  setTimeout(() => {
    const z = GEO_ZOOM[r.type] || GEO_ZOOM.other, big = ['city', 'county', 'state', 'country', 'district', 'locality'].includes(r.type);
    if(big && r.ext && r.ext.length === 4) map.fitBounds([[r.ext[0], r.ext[3]], [r.ext[2], r.ext[1]]], {padding:camPad(), maxZoom:z + 1, duration:1400});
    else map.flyTo({center:[r.lng, r.lat], zoom:z, padding:camPad(), duration:1400});
  }, 60);
}
function renderPlace(){
  const r = placeCur; if(!r) return;
  const k = geoKind(r), d = me ? dist(me, r) : null, co = `${r.lat.toFixed(5)}, ${r.lng.toFixed(5)}`;
  $('#placeView').innerHTML = `
    <div class="top"><button class="txtbtn" data-pl="back">${svg(UI.back, 14)} ${esc(r.back || 'Suche')}</button><button class="icon-btn press" data-pl="close" aria-label="Schließen">${svg(UI.close, 14)}</button></div>
    <div class="pad">
      <div class="pl-head"><span class="pl-ic k-${k}">${svg(GEO_IC[k], 22, 2)}</span><div><h2>${esc(r.name)}</h2>${r.sub ? `<span class="muted">${esc(r.sub)}</span>` : ''}</div></div>
      ${d != null ? `<div class="pl-dist">${fmtDist(d)} Luftlinie von dir</div>` : ''}
      <button class="btn primary wide" data-pl="route">${svg(UI.nav, 16)} Route planen</button>
      <div class="btns"><button class="btn" data-pl="spot">${svg(UI.plus, 15)} Als Spot speichern</button><button class="btn" data-pl="copy">Koordinaten kopieren</button></div>
      <div class="coords"><span>${co}</span></div>
    </div>`;
}
function closePlace(toList = true){
  placeCur = null; if(placeM){ placeM.remove(); placeM = null; }
  if(toList && view === 'place') show('list', mobile() ? 'peek' : undefined);
}
$('#placeView').addEventListener('click', e => {
  const b = e.target.closest('[data-pl]'); if(!b || !placeCur) return;
  const a = b.dataset.pl, r = placeCur;
  if(a === 'close') return closePlace();
  if(a === 'back' && r.back){ closePlace(false); show('list', 'half'); return; }
  if(a === 'back'){ openSearch();if(geoLastQ){ $('#q').value = geoLastQ; renderList(); } return; }
  if(a === 'copy') return copy(`${r.lat.toFixed(5)}, ${r.lng.toFixed(5)}`);
  // Ortsansicht erst schließen, wenn die Route steht – sonst muss man nach einem Fehler neu suchen
  if(a === 'route'){ b.disabled = true; planNav({lat:r.lat, lng:r.lng}, r.name, null).then(ok => { if(b.isConnected) b.disabled = false; if(ok && placeCur === r) closePlace(); }); return; }
  if(a === 'spot'){
    closePlace(false); newDraft(); draft.lat = r.lat; draft.lng = r.lng; draft.name = r.type === 'coord' ? '' : r.name;
    if(r.sub) draft.notes = r.sub;
    showEdit();
  }
});
$('#listBody').addEventListener('click', e => {
  const it = e.target.closest('button'); if(!it) return;
  if(it.hasAttribute('data-clearfilter')){ filter.clear(); renderChips(); renderList(); renderMarkers(); renderNearest(); return; }
  if(it.hasAttribute('data-searchall')){ searchAll = true; return renderList(); }
  if(it.dataset.id){ if(searching){ searchBack = $('#q').value; closeSearch(); } return openDetail(it.dataset.id, true); }
  if(it.dataset.geosearch) return geoSearch();
  if(it.hasAttribute('data-geoclear')){ prefs.recent = []; savePrefs(); renderList(); return; }
  if(it.dataset.geo != null){
    const g = it.dataset.geo, r = g === '-1' ? geoCoord($('#q').value) : g[0] === 'r' ? (prefs.recent || [])[+g.slice(1)] : geoResults[+g];
    openPlace(r);
  }
});

/* ================= Detail ================= */
let delArmed = null;
function openDetail(id, fly){
  const s = data.spots.find(x => x.id === id); if(!s) return;
  const wasSnap = snap;
  selected = id; delArmed = null;
  renderDetail(s); show('detail', mobile() && wasSnap === 'full' ? 'full' : 'half'); renderMarkers();
  if(fly) requestAnimationFrame(() => flyToSpot(s));
}
function flyToSpot(s){
  if(s.walk && s.parking){
    const b = new maplibregl.LngLatBounds(LL(s), LL(s)).extend(LL(s.parking));
    map.fitBounds(b, {padding:camPad(), maxZoom:17, duration:1200});
  } else map.flyTo({center:LL(s), zoom:Math.max(map.getZoom(), 16), padding:camPad(), duration:1200});
}
function extLinks(p){
  const ll = `${p.lat},${p.lng}`;
  return `<div class="ext">Extern öffnen: <a href="https://www.google.com/maps/dir/?api=1&destination=${ll}" target="_blank" rel="noopener">Google Maps</a> · <a href="https://maps.apple.com/?daddr=${ll}" target="_blank" rel="noopener">Apple Karten</a></div>`;
}
function renderDetail(s){
  const cat = catById(s.cat);
  let park = '';
  if(s.walk && s.parking){
    const d = dist(s.parking, s);
    park = `<div class="card">
      <div class="h"><span class="pmark">P</span>Parkplatz</div>
      ${d < 15 ? `<div class="muted" style="font-size:13px">Parkplatz liegt direkt am Spot.</div>` : `<div class="stats"><div><b>${fmtDist(d)}</b><span>Luftlinie</span></div><div><b>ca. ${fmtMin(walkMin(d))}</b><span>zu Fuß</span></div></div>`}
      ${s.parking.note ? `<div>${esc(s.parking.note)}</div>` : ''}
      <div class="coords"><span>${fmtCoord(s.parking)}</span><button class="txtbtn" data-copy="${fmtCoord(s.parking)}">Kopieren</button></div>
      ${extLinks(s.parking)}
    </div>`;
  } else if(s.walk){
    park = `<div class="card"><div class="h"><span class="pmark">P</span>Kein Parkplatz gesetzt</div><div class="muted">Bearbeite den Spot, um einen Parkplatz auf der Karte zu markieren.</div></div>`;
  }
  $('#detailView').innerHTML = `
    <div class="top"><button class="txtbtn" data-act="back">${svg(UI.back,14)} Spots</button><span class="row" style="gap:8px"><button class="icon-btn press" data-act="edit" aria-label="Bearbeiten">${svg(UI.pencil,15)}</button><button class="icon-btn press" data-act="back" aria-label="Schließen">${svg(UI.close,14)}</button></span></div>
    <div class="pad">
      <div style="display:flex;flex-direction:column;gap:6px"><span class="badge" style="--c:${cat.color}"><span class="ic">${ic(cat.icon,13)}</span><span class="bn">${esc(cat.name)}</span>${me ? `<span class="muted" style="font-weight:500;flex:none">· ${fmtDist(dist(me, s))}</span>` : ''}</span><h2>${esc(s.name)}</h2>${s.fromBy ? `<span class="muted">Aus dem Workshop von ${esc(s.fromBy)}</span>` : ''}</div>
      ${FB && grp() && (s.ws || s.from) ? (() => { const k = s.ws || s.from, w = WS.spots.find(x => x._id === k); return w || s.ws ? `<div class="rx-row">${rxHTML('sp:' + k, w ? w.dev : myId(), 'full')}</div>` : ''; })() : ''}
      ${(s.photos || []).length ? `<div class="ph-strip">${s.photos.map((id, i) => `<img data-ph="${id}" data-i="${i}" alt="Foto ${i + 1} von ${esc(s.name)}">`).join('')}</div>` : ''}
      <button class="btn primary wide" data-act="nav">${svg(UI.nav,16)} ${s.walk && s.parking ? 'Zum Parkplatz navigieren' : 'Navigation starten'}</button>
      <div class="btns"><button class="btn" data-act="share">${svg(UI.share, 15)} Link teilen</button><button class="btn${s.ws ? ' on-ws' : ''}" data-act="ws">${svg(s.ws ? '<path d="m5 12.5 4.5 4.5L19 7.5"/>' : '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 6M17.5 14.2A5.5 5.5 0 0 1 20.5 19"/>', 15, 2.2)} ${s.ws ? 'Im Workshop' : 'In den Workshop'}</button></div>
      ${s.notes ? `<p class="notes">${esc(s.notes)}</p>` : ''}
      <div id="rwSpot">${rwSpotHTML(s)}</div>
      <div class="card wx" id="wxCard">${wxHTML(s)}</div>
      <div class="card sunp" id="sunPlan">${sunPlanHTML(s)}</div>
      <div id="seasonSpot"></div>
      ${park}
      <div class="card">
        <div class="h">Position</div>
        <div class="coords"><span>${fmtCoord(s)}</span><button class="txtbtn" data-copy="${fmtCoord(s)}">Kopieren</button></div>
        ${s.walk && s.parking ? '' : extLinks(s)}
      </div>
      <div class="btns"><button class="btn" data-act="edit">Bearbeiten</button><button class="btn danger" data-act="del">Löschen</button></div>
    </div>`;
  loadWeather(s); rwSpotLoad(s); sunPlanLoad(s); seasonSpotLoad(s);
  fillPhotos($('#detailView'));
}
function closeDetail(){
  selected = null; setSrc('sunray', FC([])); show('list', 'half'); renderMarkers();
  if(searchBack){ const q = searchBack; searchBack = ''; openSearch(); $('#q').value = q; renderList(); setTimeout(() => $('#q').blur(), 60); }   // zurück zur Suche, aus der man kam
}
$('#detailView').addEventListener('click', e => {
  const im = e.target.closest('img[data-ph]');
  if(im){ const s = data.spots.find(x => x.id === selected); if(s) openLightbox(s.photos, +im.dataset.i); return; }
  const b = e.target.closest('button'); if(!b) return;
  if(b.dataset.copy) return copy(b.dataset.copy);
  const a = b.dataset.act;
  if(a === 'back') closeDetail();
  if(a === 'edit') startEdit(selected);
  if(a === 'share' || a === 'ws'){
    const s = data.spots.find(x => x.id === selected); if(!s) return;
    if(a === 'share') shareURL(spotLink(s), s.name, `${s.name} – geteilt aus Spots`);
    else wsUploadSpot(s);
  }
  if(a === 'nav'){
    const s = data.spots.find(x => x.id === selected); if(!s) return;
    if(s.walk && s.parking) planNav(s.parking, s.name, {lat:s.lat, lng:s.lng});
    else planNav({lat:s.lat, lng:s.lng}, s.name, null);
  }
  if(a === 'del'){
    if(delArmed === selected){
      const s = data.spots.find(x => x.id === selected);
      (s.photos || []).forEach(id => PDB.del(id).catch(() => {}));
      data.spots = data.spots.filter(x => x.id !== selected); save();
      selected = null; setSrc('sunray', FC([])); show('list', 'half'); refreshAll(); toast(`„${s.name}“ gelöscht`);
    } else {
      delArmed = selected; b.classList.add('armed'); b.textContent = 'Wirklich löschen?';
      setTimeout(() => { if(b.isConnected){ delArmed = null; b.classList.remove('armed'); b.textContent = 'Löschen'; } }, 3500);
    }
  }
});

/* ================= Sonne & Wetter ================= */
const SUN = (() => {
  const rad = Math.PI / 180, dayMs = 864e5, J1970 = 2440588, J2000 = 2451545, e = rad * 23.4397, J0 = .0009;
  const toDays = d => d.valueOf() / dayMs - .5 + J1970 - J2000, fromJ = j => new Date((j + .5 - J1970) * dayMs);
  const M = d => rad * (357.5291 + .98560028 * d);
  const L = m => m + rad * (1.9148 * Math.sin(m) + .02 * Math.sin(2 * m) + .0003 * Math.sin(3 * m)) + rad * 102.9372 + Math.PI;
  const dec = l => Math.asin(Math.sin(e) * Math.sin(l));
  return (date, lat, lng) => {
    const lw = rad * -lng, phi = rad * lat, d = toDays(date), n = Math.round(d - J0 - lw / (2 * Math.PI));
    const ds = J0 + lw / (2 * Math.PI) + n, m = M(ds), l = L(m), dc = dec(l);
    const noon = J2000 + ds + .0053 * Math.sin(m) - .0069 * Math.sin(2 * l);
    const at = h => {
      const w = Math.acos((Math.sin(h * rad) - Math.sin(phi) * Math.sin(dc)) / (Math.cos(phi) * Math.cos(dc)));
      if(isNaN(w)) return [null, null];
      const set = J2000 + (J0 + (w + lw) / (2 * Math.PI) + n) + .0053 * Math.sin(m) - .0069 * Math.sin(2 * l);
      return [fromJ(noon - (set - noon)), fromJ(set)];
    };
    const [rise, sunset] = at(-.833), [, golden] = at(6), [, blue1] = at(-4), [, blue2] = at(-6);
    return {rise, sunset, golden, blue1, blue2};
  };
})();
const hhmm = d => d ? d.toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'}) : '–';
const WXI = {
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  moon:'<path d="M19.5 14.5A7.8 7.8 0 1 1 9.5 4.5a6.2 6.2 0 0 0 10 10z"/>',
  partly:'<circle cx="8.5" cy="8.5" r="3"/><path d="M8.5 2.8v1M3 8.5h1M4.6 4.6l.7.7M12.4 4.6l-.7.7"/><path d="M9 19.5h8.2a3.6 3.6 0 0 0 .2-7.2 5 5 0 0 0-9.6 1.6A2.9 2.9 0 0 0 9 19.5z"/>',
  cloud:'<path d="M7 18.5h10a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6 1.7A3.2 3.2 0 0 0 7 18.5z"/>',
  rain:'<path d="M7 15h10a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6 1.7A3.2 3.2 0 0 0 7 15z"/><path d="M9 18l-1 2.5M13 18l-1 2.5M17 18l-1 2.5"/>',
  snow:'<path d="M7 15h10a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6 1.7A3.2 3.2 0 0 0 7 15z"/><path d="M9 18.5v.01M13 19.5v.01M17 18.5v.01M11 21.5v.01M15 21.5v.01"/>',
  storm:'<path d="M7 15h10a4 4 0 0 0 .3-8 5.5 5.5 0 0 0-10.6 1.7A3.2 3.2 0 0 0 7 15z"/><path d="m12.5 15.5-2 3.5h3l-2 3.5"/>',
  fog:'<path d="M4 9h16M6 13h12M4 17h16"/>'
};
function wxInfo(code, day = 1){
  if(code === 0) return {t:'Klar', i: day ? 'sun' : 'moon'};
  if(code === 1) return {t:'Überwiegend klar', i: day ? 'sun' : 'moon'};
  if(code === 2) return {t:'Teils bewölkt', i:'partly'};
  if(code === 3) return {t:'Bedeckt', i:'cloud'};
  if(code === 45 || code === 48) return {t:'Nebel', i:'fog'};
  if(code >= 51 && code <= 57) return {t:'Nieselregen', i:'rain'};
  if(code >= 61 && code <= 67) return {t:'Regen', i:'rain'};
  if(code >= 71 && code <= 77) return {t:'Schnee', i:'snow'};
  if(code >= 80 && code <= 82) return {t:'Regenschauer', i:'rain'};
  if(code === 85 || code === 86) return {t:'Schneeschauer', i:'snow'};
  if(code >= 95) return {t:'Gewitter', i:'storm'};
  return {t:'–', i:'cloud'};
}
const wxCache = {};
const wxKey = s => `${s.lat.toFixed(2)},${s.lng.toFixed(2)}`;
function sunFor(s, offsetDays = 0){ const d = new Date(); d.setDate(d.getDate() + offsetDays); d.setHours(12, 0, 0, 0); return SUN(d, s.lat, s.lng); }
function hourIdx(w, date){
  if(!w || !w.hourly || !date) return -1;
  const loc = new Date(date.getTime() + (w.utc_offset_seconds || 0) * 1000);
  loc.setUTCMinutes(loc.getUTCMinutes() >= 30 ? 60 : 0, 0, 0);
  return w.hourly.time.indexOf(loc.toISOString().slice(0, 13) + ':00');
}
function wxHTML(s){
  const now = new Date();
  let off = 0, sun = sunFor(s, 0);
  if(sun.blue2 && now > sun.blue2){ off = 1; sun = sunFor(s, 1); }
  const evts = [['Aufgang', sun.rise], ['Goldene Std.', sun.golden], ['Untergang', sun.sunset], ['Blaue Std.', sun.blue1]];
  const nextI = evts.findIndex(x => x[1] && x[1] > now);
  const sunHTML = `<div class="wx-sun">${evts.map((x, i) => `<div class="${i === nextI ? 'next' : ''}"><span>${x[0]}</span><b>${hhmm(x[1])}</b></div>`).join('')}</div>`;
  const c = wxCache[wxKey(s)], w = c && c.data;
  if(!w) return `<div class="h">${off ? 'Morgen am Spot' : 'Heute am Spot'}</div>${sunHTML}<div class="muted">${c && c.err ? 'Wetter gerade nicht verfügbar.' : 'Wetter wird geladen …'}</div>`;
  const cur = w.current || {}, info = wxInfo(cur.weather_code, cur.is_day);
  const hi = hourIdx(w, sun.sunset), cc = hi >= 0 ? w.hourly.cloud_cover[hi] : null;
  const chance = cc == null ? '' : cc < 35 ? '<b class="good">gute Sicht</b>' : cc < 70 ? '<b class="mid">teils bewölkt</b>' : '<b class="bad">eher bewölkt</b>';
  const days = (w.daily && w.daily.time || []).slice(0, 3).map((t, i) => {
    const sd = sunFor(s, i), di = wxInfo(w.daily.weather_code[i], 1), hc = hourIdx(w, sd.sunset);
    const name = i === 0 ? 'Heute' : i === 1 ? 'Morgen' : new Date(t + 'T12:00').toLocaleDateString('de-DE', {weekday:'short'});
    return `<div class="wx-day"><span class="dn">${name}</span><span class="ii">${svg(WXI[di.i], 18, 1.9)}</span>
      <span class="ss"><i>${svg('<path d="M3.5 18h17M7 14.5a5 5 0 0 1 10 0M12 3.5v5M9.5 6.5 12 9l2.5-2.5"/>', 14, 2)}</i>${hhmm(sd.sunset)}${hc >= 0 ? `<i style="margin-left:6px">${svg(WXI.cloud, 14, 2)}</i>${w.hourly.cloud_cover[hc]} %` : ''}</span>
      <span class="tt">${Math.round(w.daily.temperature_2m_max[i])}° / ${Math.round(w.daily.temperature_2m_min[i])}°</span></div>`;
  }).join('');
  return `<div class="wx-now"><span class="wx-ic">${svg(WXI[info.i], 26, 1.9)}</span><div><b>${Math.round(cur.temperature_2m)}°</b>
      <div class="d">${info.t} · Wolken ${cur.cloud_cover} % · Wind ${Math.round(cur.wind_speed_10m)} km/h</div></div></div>
    ${sunHTML}
    ${chance ? `<div class="wx-chance">Sonnenuntergang ${off ? 'morgen' : 'heute'}: ${chance} · ${cc} % Wolken</div>` : ''}
    <div class="wx-days">${days}</div>`;
}
async function loadWeather(s){
  const k = wxKey(s), c = wxCache[k];
  if(c && (c.loading || Date.now() - c.t < 30 * 60000)) return;
  wxCache[k] = {loading:true, t:Date.now(), data:c && c.data};
  try{
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${s.lat.toFixed(4)}&longitude=${s.lng.toFixed(4)}&current=temperature_2m,weather_code,cloud_cover,wind_speed_10m,is_day&hourly=cloud_cover&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3`);
    if(!r.ok) throw 0;
    wxCache[k] = {t:Date.now(), data:await r.json()};
  }catch(e){ wxCache[k] = {t:Date.now() - 25 * 60000, err:true, data:c && c.data}; }
  const el = $('#wxCard');
  if(el && view === 'detail' && selected){ const cur = data.spots.find(x => x.id === selected); if(cur && wxKey(cur) === k) el.innerHTML = wxHTML(cur); }
}

/* ================= Straßenwetter: Regen- und Glättehinweise (Open-Meteo, ohne Key) ================= */
const RW_VARS = 'temperature_2m,precipitation,precipitation_probability,snowfall,weather_code,soil_temperature_0cm,dew_point_2m';
const RWI = {
  dry:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  cold:'<path d="M10 14.6V5.2a2 2 0 0 1 4 0v9.4a3.8 3.8 0 1 1-4 0zM12 10.5v6"/>',
  wet:'<path d="M12 3.5s6 6.3 6 10.4a6 6 0 0 1-12 0c0-4.1 6-10.4 6-10.4z"/>',
  rain:WXI.rain, heavy:WXI.storm, snow:WXI.snow,
  frost:'<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.6 12 7l2.5-2.4M9.5 19.4 12 17l2.5 2.4"/>'
};
RWI.ice = RWI.frost; RWI.load = RWI.wet;
const RW_LV = {dry:0, cold:1, wet:2, rain:3, heavy:4, frost:5, snow:6, ice:7};
const RWC = {ice:'#bf5af2', frost:'#c38cff', snow:'#f2f4f8'};   // Kartenfarben für Glätte-Abschnitte
const rwCache = new Map(), rwWait = new Map();
const rwKey = p => `${(+p.lat).toFixed(2)},${(+p.lng).toFixed(2)}`;   // ≈ 1 km Raster
const rwFresh = k => { const c = rwCache.get(k); return !!c && Date.now() - c.t < (c.err ? 5 : 20) * 60000; };
const rwPeek = p => { const c = rwCache.get(rwKey(p)); return c ? (c.h || null) : undefined; };   // undefined = noch nicht geladen
async function rwGet(pts){
  const keys = pts.map(rwKey), need = [...new Set(keys)].filter(k => !rwFresh(k) && !rwWait.has(k));
  for(let i = 0; i < need.length; i += 40){
    const part = need.slice(i, i + 40);
    const pr = (async () => {
      try{
        const ll = part.map(k => k.split(','));
        const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${ll.map(x => x[0]).join(',')}&longitude=${ll.map(x => x[1]).join(',')}&hourly=${RW_VARS}&past_hours=6&forecast_hours=30&timeformat=unixtime&timezone=GMT`);
        if(!r.ok) throw 0;
        let j = await r.json(); if(!Array.isArray(j)) j = [j];
        part.forEach((k, n) => rwCache.set(k, j[n] && j[n].hourly && j[n].hourly.time ? {t:Date.now(), h:j[n].hourly} : {t:Date.now(), err:true}));
      }catch(e){ part.forEach(k => { const o = rwCache.get(k); rwCache.set(k, {t:Date.now(), err:true, h:o && o.h}); }); }
      part.forEach(k => rwWait.delete(k));
    })();
    part.forEach(k => rwWait.set(k, pr));
  }
  await Promise.all([...new Set(keys.map(k => rwWait.get(k)).filter(Boolean))]);
  return keys.map(k => { const c = rwCache.get(k); return c && c.h ? c.h : null; });
}
// Straßenzustand zu einem Zeitpunkt: Glätte schlägt Regen, Regen schlägt nass
function rwAt(h, t){
  const T = h && h.time; if(!T || !T.length) return null;
  const i = Math.max(0, Math.min(T.length - 1, Math.floor((t / 1000 - T[0]) / 3600)));
  const g = (k, j = i) => { const a = h[k]; return a && a[j] != null ? a[j] : null; };
  const temp = g('temperature_2m'), soil = g('soil_temperature_0cm'), pr = g('precipitation') || 0, sn = g('snowfall') || 0, code = g('weather_code'), dew = g('dew_point_2m'), pp = g('precipitation_probability');
  let wet3 = 0, snow6 = 0;
  for(let j = Math.max(0, i - 6); j <= i; j++){ if(j >= i - 3) wet3 += g('precipitation', j) || 0; snow6 += g('snowfall', j) || 0; }
  const cold = Math.min(temp == null ? 99 : temp, soil == null ? 99 : soil), deg = temp == null ? '' : `${Math.round(temp)}°`;
  const R = (k, tt, d) => ({k, t:tt, d, lv:RW_LV[k], temp, pp, ts:T[i] * 1000, last:i >= T.length - 1});
  if([56, 57, 66, 67].includes(code)) return R('ice', 'Glatteis', 'Gefrierender Regen');
  if(sn >= .1 || (code >= 71 && code <= 77) || code === 85 || code === 86) return R('snow', 'Schnee', deg ? `Schneefall bei ${deg}` : 'Schneefall');
  if(snow6 >= .5 && cold <= 1) return R('snow', 'Schneeglätte', 'Es hat gerade geschneit');
  if(cold <= 1 && (wet3 >= .1 || pr > 0)) return R('ice', 'Glättegefahr', `Nass bei ${deg}`);
  if(cold <= 0 && (code === 48 || (dew != null && temp != null && temp - dew <= 1.5))) return R('frost', 'Reifglätte möglich', `${deg} und feucht`);
  if(code >= 95) return R('heavy', 'Gewitter', 'Starkregen möglich');
  if(pr >= 2.5 || code === 65 || code === 82) return R('heavy', 'Starkregen', 'Aquaplaning möglich');
  if(pr >= .1 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return R('rain', 'Regen', 'Nasse Fahrbahn');
  if(wet3 >= .3) return R('wet', 'Straße nass', 'Es hat gerade geregnet');
  if(temp != null && temp <= 3) return R('cold', `Kalt, ${deg}`, 'Brücken und Waldstücke können glatt sein');
  return R('dry', 'Trocken', deg);
}
const rwBad = r => !!r && r.lv >= RW_LV.rain;
const rwWorst = rs => rs.reduce((w, r) => r && (!w || r.lv > w.lv) ? r : w, null);
const rwHour = ts => `${new Date(ts).getHours()} Uhr`;
function rwNextTxt(at, from = Date.now(), hours = 8){
  const cur = at(from); if(!cur) return '';
  for(let k = 1; k <= hours; k++){
    const r = at(from + k * 3600e3); if(!r) break;
    if(!rwBad(cur) && rwBad(r)) return `${r.t} ab ${rwHour(r.ts)}${r.pp != null && (r.k === 'rain' || r.k === 'heavy') ? ` (${r.pp} %)` : ''}`;
    if(rwBad(cur) && !rwBad(r)) return `bis ca. ${rwHour(r.ts)}`;
    if(r.last) break;
  }
  return rwBad(cur) ? 'auch die nächsten Stunden' : 'die nächsten Stunden trocken';
}
function rwRowHTML(at, title){
  const r = at(Date.now()); if(!r) return '';
  return `<div class="rw-row rwk-${r.k}"><span class="rw-i">${svg(RWI[r.k], 17, 2)}</span><div class="rw-tx"><b>${title}: ${esc(r.t)}</b><span>${esc([r.d, rwNextTxt(at)].filter(Boolean).join(' · '))}</span></div></div>`;
}
const rwLoadHTML = title => `<div class="rw-row rwk-load"><span class="rw-i">${svg(RWI.load, 17, 2)}</span><div class="rw-tx"><b>${title}</b><span>Straßenwetter wird geladen …</span></div></div>`;
// Spot
function rwSpotHTML(s){ const h = rwPeek(s); return h === undefined ? rwLoadHTML('Straße') : h ? rwRowHTML(t => rwAt(h, t), 'Straße') : ''; }
function rwSpotLoad(s){
  if(rwFresh(rwKey(s))) return;
  rwGet([s]).then(() => { const el = $('#rwSpot'), cur = view === 'detail' && data.spots.find(x => x.id === selected); if(el && cur && rwKey(cur) === rwKey(s)) el.innerHTML = rwSpotHTML(cur); });
}
// Spot-Liste: nur echte Hinweise (Regen, Glätte, Schnee) in den nächsten 2 Stunden
function rwTagHTML(s){
  const h = rwPeek(s); if(!h) return '';
  const now = Date.now(), rs = [0, 1, 2].map(k => rwAt(h, now + k * 3600e3)), w = rwWorst(rs);
  if(!rwBad(w)) return '';
  const lbl = {rain:'Regen', heavy:w.t, frost:'Reif', snow:'Schnee', ice:'Glätte'}[w.k], f = rs.find(rwBad);
  return `<span class="rw-tag rwk-${w.k}" title="${esc(w.t + (w.d ? ' · ' + w.d : ''))}">${svg(RWI[w.k], 12, 2.2)}${esc(lbl)}${rwBad(rs[0]) ? '' : ` ab ${rwHour(f.ts)}`}</span>`;
}
let rwListBusy = false;
function rwListLoad(list){
  const pts = list.slice(0, 60);
  if(rwListBusy || !pts.length || pts.every(x => rwFresh(rwKey(x)))) return;
  rwListBusy = true;
  rwGet(pts).then(() => { rwListBusy = false; if(tab === 'spots' && spotView === 'mine' && view === 'list' && !searching && !$('#q').value.trim()) renderList(); });
}
// Rennstrecke: Start, Mitte und Ziel – es zählt der schlechteste Wert
function rwCoursePts(c){ const p = c.pts || []; return p.length ? [p[0], p[Math.floor(p.length / 2)], p[p.length - 1]].map(q => ({lng:q[0], lat:q[1]})) : []; }
function rwCourseHTML(c){
  const hs = rwCoursePts(c).map(rwPeek); if(!hs.length) return '';
  if(hs.every(h => h === undefined)) return rwLoadHTML('Strecke');
  const ok = hs.filter(Boolean); return ok.length ? rwRowHTML(t => rwWorst(ok.map(h => rwAt(h, t))), 'Strecke') : '';
}
function rwCourseLoad(c){
  const pts = rwCoursePts(c); if(!pts.length || pts.every(q => rwFresh(rwKey(q)))) return;
  rwGet(pts).then(() => { const el = $('#rwCourse'); if(el && view === 'course' && selCourse === c.id) el.innerHTML = rwCourseHTML(c); });
}

/* ================= Fotos ================= */
let photoBusy = false;
const PDB = (() => {
  let dbp = null;
  const open = () => dbp || (dbp = new Promise((res, rej) => {
    const r = indexedDB.open('meine-spots', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('photos');
    r.onsuccess = () => res(r.result); r.onerror = () => { dbp = null; rej(r.error); };
  }));
  const run = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => {
    const t = db.transaction('photos', mode), rq = fn(t.objectStore('photos'));
    t.oncomplete = () => res(rq.result); t.onerror = t.onabort = () => rej(t.error);
  }); };
  return {put:(id, b) => run('readwrite', st => st.put(b, id)), get:id => run('readonly', st => st.get(id)), del:id => run('readwrite', st => st.delete(id))};
})();
const photoURL = {};
async function getPhotoURL(id){
  if(photoURL[id]) return photoURL[id];
  const b = await PDB.get(id); if(!b) return null;
  return photoURL[id] = URL.createObjectURL(b);
}
function fillPhotos(root){
  if(!root) return;
  root.querySelectorAll('img[data-ph]').forEach(async img => { const u = await getPhotoURL(img.dataset.ph).catch(() => null); if(u) img.src = u; else img.style.display = 'none'; });
}
async function shrinkImage(file, max = 1800, q = .84){
  const url = URL.createObjectURL(file);
  try{
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    const b = await new Promise(res => c.toBlob(res, 'image/jpeg', q));
    if(!b) throw new Error('encode');
    return b;
  } finally { URL.revokeObjectURL(url); }
}
let lb = null;
async function openLightbox(ids, i){
  lb = {ids, i};
  const el = $('#lightbox');
  el.innerHTML = `<img alt=""><button class="lb-x" aria-label="Schließen">${svg(UI.close, 18, 2.4)}</button>
    ${ids.length > 1 ? `<button class="lb-n prev" aria-label="Vorheriges Foto">${svg(UI.back, 18, 2.4)}</button><button class="lb-n next" aria-label="Nächstes Foto">${svg('<path d="M9 5l7 7-7 7"/>', 18, 2.4)}</button><span class="lb-c"></span>` : ''}`;
  el.hidden = false; await lbShow();
}
async function lbShow(){
  if(!lb) return;
  const el = $('#lightbox'), u = await getPhotoURL(lb.ids[lb.i]).catch(() => null);
  el.querySelector('img').src = u || '';
  const c = el.querySelector('.lb-c'); if(c) c.textContent = `${lb.i + 1} / ${lb.ids.length}`;
}
const lbGo = d => { if(!lb || lb.ids.length < 2) return; lb.i = (lb.i + d + lb.ids.length) % lb.ids.length; lbShow(); };
const lbClose = () => { lb = null; $('#lightbox').hidden = true; };
$('#lightbox').addEventListener('click', e => {
  if(e.target.closest('.lb-x')) return lbClose();
  if(e.target.closest('.prev')) return lbGo(-1);
  if(e.target.closest('.next')) return lbGo(1);
  if(e.target.id === 'lightbox') lbClose();
});
(() => { let x0 = null; const el = $('#lightbox');
  el.addEventListener('pointerdown', e => { x0 = e.clientX; });
  el.addEventListener('pointerup', e => { if(x0 == null) return; const dx = e.clientX - x0; x0 = null; if(Math.abs(dx) > 50) lbGo(dx < 0 ? 1 : -1); });
})();
document.addEventListener('keydown', e => { if(!lb) return; if(e.key === 'Escape') lbClose(); if(e.key === 'ArrowRight') lbGo(1); if(e.key === 'ArrowLeft') lbGo(-1); });

/* ================= Platzieren ================= */
function enterMode(m){
  mode = m;
  $('#map').classList.add('placing');
  const txt = m === 'spot' ? 'Tippe auf die Karte, um den Spot zu setzen.' : m === 'ev-meet' ? 'Tippe auf die Karte, wo ihr euch trefft.' : m === 'ev-dest' ? 'Tippe auf die Karte, wo es hingehen soll.' : 'Tippe auf die Karte, wo du parkst.';
  const tip = m === 'spot' || m.startsWith('ev-') ? 'Tipp: Reinzoomen für mehr Genauigkeit.' : 'Zum Beispiel Wanderparkplatz oder Straßenrand am Wegbeginn.';
  $('#modeView').innerHTML = `<div class="mode">
      <div class="big"><span class="pulse"></span>${txt}</div>
      <div class="muted">${tip}</div>
      <div class="btns"><button class="btn" data-act="cancel">Abbrechen</button><button class="btn primary" data-act="center">Fadenkreuz nehmen</button><button class="btn full" style="grid-column:1/-1" data-act="here">${svg(UI.locate,15)} Mein Standort nehmen</button></div>
    </div>`;
  document.body.classList.add('placing');
  show('mode', 'peek');
}
function exitMode(){ mode = null; $('#map').classList.remove('placing'); document.body.classList.remove('placing'); }
$('#modeView').addEventListener('click', e => {
  const a = e.target.closest('button')?.dataset.act;
  if(a === 'cancel'){
    const was = mode; exitMode();
    if(was && was.startsWith('ev-')){ show('list', 'half'); openEvDlg(); }
    else if(was === 'spot' && draft && draft.lat == null){ draft = null; renderDraftMarkers(); renderMarkers(); show(selected ? 'detail' : 'list', 'half'); }
    else showEdit();
  }
  if(a === 'center') place(map.getCenter());
  if(a === 'here') getHere().then(p => { if(p && mode) place(p); });
});
map.on('click', e => {
  if(navPrevOn && nav && nav.opts && nav.opts.land && mapReady && !nav.busy){
    const h = map.queryRenderedFeatures(e.point, {layers:['nav-alt-hit']}); if(h.length) navPick(nav.mode === 'fast' ? 'land' : 'fast');
    return;
  }
  if(ckOn || navPrevOn) return;
  if(drawing){ addDrawPoint(e.lngLat); return; }
  if(gemOn && mapReady && !mode){ const g = map.queryRenderedFeatures(e.point, {layers:['gem-fill']}); if(g.length){ const p = g[0].properties; toast(p.v ? `${p.n} · befahren am ${new Date(+p.t).toLocaleDateString('de-DE', {day:'numeric', month:'short', year:'numeric'})}` : `${p.n} · noch nicht befahren`); return; } }
  if(mode) return place(e.lngLat);
  if(mapReady && (tab === 'tracks' || view === 'track' || view === 'course') && view !== 'edit' && view !== 'trackSave'){
    const ch = map.queryRenderedFeatures(e.point, {layers:['course-all-hit']});
    if(ch.length){ openCourse(ch[0].properties.id, false); return; }
    const hit = map.queryRenderedFeatures(e.point, {layers:['track-all-hit']});
    if(hit.length){ openTrack(hit[0].properties.id, false); return; }
  }
  if(view === 'track'){ closeTrack(); return; }
  if(view === 'course'){ closeCourse(); return; }
  if(view === 'place'){ closePlace(); return; }
  if(view === 'detail') closeDetail();
  else if(mobile() && view === 'list' && !searching){ setSnap(snap === 'peek' ? 'mini' : 'peek'); }
});
map.on('contextmenu', e => { if(!mode && view !== 'edit'){ newDraft(); place(e.lngLat); } });
function place(ll){
  const p = {lat:ll.lat, lng:ll.lng};
  if(mode && mode.startsWith('ev-')){ const k = mode.slice(3); exitMode(); evPicked(k, p); return; }
  if(mode === 'spot'){ draft.lat = p.lat; draft.lng = p.lng; }
  else if(mode === 'parking'){ draft.parking = {...p, note: draft.parking?.note || ''}; }
  exitMode(); showEdit();
}

/* ================= Bearbeiten ================= */
function newDraft(){
  const c = filter.size === 1 ? [...filter][0] : data.cats[0]?.id;
  draft = {id:uid(), isNew:true, name:'', cat:c, notes:'', lat:null, lng:null, walk:false, parking:null, created:Date.now()};
  selected = null; editError = ''; setSrc('sunray', FC([]));
}
$('#addBtn').addEventListener('click', () => { newDraft(); renderMarkers(); enterMode('spot'); });
function startEdit(id){
  const s = data.spots.find(x => x.id === id); if(!s) return;
  draft = structuredClone(s); draft.isNew = false; editError = ''; setSrc('sunray', FC([]));
  renderMarkers(); showEdit();
}
function showEdit(){
  renderEdit(); const neu = draft && draft.isNew && !draft._shown;
  show('edit', neu ? 'half' : 'full'); renderDraftMarkers(); renderMarkers();
  if(neu){ draft._shown = true; if(draft.lat != null) map.easeTo({center:[draft.lng, draft.lat], padding:camPad(), duration:600}); setTimeout(() => { const n = $('#f-name'); if(n && !n.value) n.focus(); }, 350); }
}
// Hat sich im Formular etwas geändert? (dann beim Abbrechen nachfragen)
function editDirty(){
  if(!draft) return false;
  if((draft._added || []).length) return true;
  if(draft.isNew) return !!(String(draft.name || '').trim() || String(draft.notes || '').trim());
  const o = data.spots.find(x => x.id === draft.id); if(!o) return false;
  const k = x => JSON.stringify([x.name || '', x.notes || '', x.cat, x.lat, x.lng, !!x.walk, x.parking || null, x.photos || []]);
  return k(o) !== k(draft);
}
function syncForm(){
  const n = $('#f-name'); if(!n) return;
  draft.name = n.value; draft.notes = $('#f-notes').value;
  const pn = $('#f-pnote'); if(pn && draft.parking) draft.parking.note = pn.value;
}
function afterEditRender(){ fillPhotos($('#editView')); }
$('#editView').addEventListener('input', e => { if(e.target.id === 'f-name' && editError && e.target.value.trim()){ editError = ''; const er = e.target.parentElement.querySelector('.err'); if(er) er.remove(); } });
$('#editView').addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.id === 'f-name'){ e.preventDefault(); saveDraft(); } });
function refreshEditLive(){ const sc = $('#editView .pad')?.scrollTop || 0; syncForm(); renderEdit(); const p = $('#editView .pad'); if(p) p.scrollTop = sc; }
function renderEdit(){
  const d = draft;
  let park = '';
  if(d.walk){
    if(d.parking){
      const m = dist(d.parking, d);
      park = `<div class="card">
        <div class="h"><span class="pmark">P</span>Parkplatz gesetzt</div>
        ${m < 15 ? `<div class="muted" style="font-size:13px">Parkplatz liegt direkt am Spot.</div>` : `<div class="stats"><div><b>${fmtDist(m)}</b><span>Luftlinie</span></div><div><b>ca. ${fmtMin(walkMin(m))}</b><span>zu Fuß</span></div></div>`}
        <label class="f">Notiz zum Parkplatz<input class="inp" id="f-pnote" value="${esc(d.parking.note)}" placeholder="z. B. kostenlos, max. 2 h"></label>
        <div class="muted">Den P-Marker kannst du auf der Karte ziehen.</div>
        <div class="btns"><button class="btn" data-act="park">Neu setzen</button><button class="btn danger" data-act="unpark">Entfernen</button></div>
      </div>`;
    } else park = `<button class="btn park" data-act="park">${svg(UI.car,16)} Parkplatz auf Karte setzen</button>`;
  }
  $('#editView').innerHTML = `
    <div class="top"><button class="txtbtn" data-act="cancel">Abbrechen</button><strong>${d.isNew ? 'Neuer Spot' : 'Spot bearbeiten'}</strong><button class="txtbtn bold" data-act="save">Speichern</button></div>
    <div class="pad">
      <label class="f">Name<input class="inp" id="f-name" value="${esc(d.name)}" placeholder="z. B. Sonnenuntergang am Hang" maxlength="80">${editError ? `<span class="err">${editError}</span>` : ''}</label>
      <div style="display:flex;flex-direction:column;gap:6px"><span class="f" style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)">Kategorie</span>
        <div class="catpick">${data.cats.map(c => `<button type="button" class="chip ${c.id === d.cat ? 'on' : ''}" data-cat="${c.id}" style="--c:${c.color}"><span class="dot"></span>${esc(c.name)}</button>`).join('')}</div>
      </div>
      <label class="f">Notiz<textarea class="inp" id="f-notes" rows="3" placeholder="Was macht den Spot aus? Beste Uhrzeit, Weg, …">${esc(d.notes)}</textarea></label>
      <div style="display:flex;flex-direction:column;gap:6px"><span class="f" style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)">Fotos</span>
        <div class="ph-edit">${(d.photos || []).map(id => `<div class="ph-thumb"><img data-ph="${id}" alt=""><button data-phdel="${id}" aria-label="Foto entfernen">${svg(UI.close, 11, 2.6)}</button></div>`).join('')}
          <button type="button" class="ph-add${photoBusy ? ' busy' : ''}" data-act="addphoto">${svg(UI.plus, 18, 2.2)}${photoBusy ? 'Lädt …' : 'Foto'}</button></div>
      </div>
      <div class="card"><div class="coords"><span>Position: ${fmtCoord(d)}</span><button class="txtbtn" data-act="move">Neu setzen</button></div><div class="muted">Oder den Marker auf der Karte ziehen.</div></div>
      <div class="toggle"><span>Nicht direkt mit dem Auto erreichbar<small>Dann markierst du, wo du parkst.</small></span><input type="checkbox" class="sw" id="f-walk" ${d.walk ? 'checked' : ''} aria-label="Nicht direkt mit dem Auto erreichbar"></div>
      ${park}
    </div>`;
  afterEditRender();
}
$('#editView').addEventListener('click', e => {
  const b = e.target.closest('button'); if(!b) return;
  if(b.dataset.cat){ syncForm(); draft.cat = b.dataset.cat; refreshEditLive(); renderDraftMarkers(); return; }
  const a = b.dataset.act;
  if(a === 'cancel'){
    syncForm();
    if(editDirty() && !b.classList.contains('armed')){ b.classList.add('armed'); b.textContent = 'Verwerfen?'; setTimeout(() => { if(b.isConnected){ b.classList.remove('armed'); b.textContent = 'Abbrechen'; } }, 3500); return; }
    (draft._added || []).forEach(id => PDB.del(id).catch(() => {})); const back = draft.isNew ? null : draft.id; draft = null; renderDraftMarkers(); if(back) openDetail(back); else { show('list', 'half'); renderMarkers(); } }
  if(a === 'save') saveDraft();
  if(a === 'move'){ syncForm(); enterMode('spot'); }
  if(a === 'park'){ syncForm(); enterMode('parking'); }
  if(a === 'unpark'){ syncForm(); draft.parking = null; refreshEditLive(); renderDraftMarkers(); }
});
$('#editView').addEventListener('click', e => {
  const del = e.target.closest('[data-phdel]');
  if(del && draft){ syncForm(); const id = del.dataset.phdel; draft.photos = (draft.photos || []).filter(x => x !== id); (draft._removed = draft._removed || []).push(id); refreshEditLive(); return; }
  if(e.target.closest('[data-act="addphoto"]') && draft){ syncForm(); $('#photoFile').click(); }
});
$('#photoFile').addEventListener('change', async e => {
  const files = [...e.target.files]; e.target.value = '';
  if(!files.length || !draft) return;
  photoBusy = true; refreshEditLive();
  let fails = 0;
  if(files.length > 12) toast(`Nur 12 Fotos auf einmal – ${files.length - 12} wurden nicht übernommen.`);
  for(const f of files.slice(0, 12)){
    try{
      const blob = await shrinkImage(f);
      const id = 'ph_' + uid();
      await PDB.put(id, blob);
      if(!draft){ PDB.del(id); break; }
      (draft.photos = draft.photos || []).push(id); (draft._added = draft._added || []).push(id);
    }catch(err){ fails++; }
  }
  photoBusy = false;
  if(draft) refreshEditLive();
  if(fails) toast(`${fails} Foto${fails > 1 ? 's' : ''} konnte${fails > 1 ? 'n' : ''} nicht gespeichert werden.`);
});
$('#editView').addEventListener('change', e => {
  if(e.target.id === 'f-walk'){ syncForm(); draft.walk = e.target.checked; refreshEditLive(); renderDraftMarkers(); }
});
function saveDraft(){
  syncForm();
  if(!draft.name.trim()){ editError = 'Gib dem Spot einen Namen.'; renderEdit(); $('#f-name').focus(); return; }
  (draft._removed || []).forEach(id => PDB.del(id).catch(() => {}));
  const s = {...draft, name:draft.name.trim(), notes:draft.notes.trim()}; delete s.isNew; delete s._added; delete s._removed; delete s._shown;
  if(!s.walk) s.parking = null;
  if(s.parking) s.parking.note = (s.parking.note || '').trim();
  const i = data.spots.findIndex(x => x.id === s.id);
  if(i >= 0) data.spots[i] = s; else data.spots.push(s);
  if(filter.size && !filter.has(s.cat)) filter.add(s.cat);
  save(); draft = null; renderDraftMarkers(); refreshAll(); openDetail(s.id);
  toast(i >= 0 ? 'Gespeichert' : `„${s.name}“ hinzugefügt`);
}

/* ================= Kategorien ================= */
function openCats(){ renderCats(); $('#modal').hidden = false; }
function renderCats(){
  const used = {}; data.spots.forEach(s => used[s.cat] = (used[s.cat]||0) + 1);
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Kategorien">
    <div class="top" style="padding:12px 14px"><strong style="font-size:17px">Kategorien</strong><button class="txtbtn bold" data-act="close">Fertig</button></div>
    <div class="pad" style="gap:0;padding-top:0">
      ${data.cats.map(c => `<div class="catblock" data-id="${c.id}" style="--c:${c.color}">
        <div class="catrow"><input type="color" value="${c.color}" data-k="color" aria-label="Farbe"><input class="inp" value="${esc(c.name)}" data-k="name" aria-label="Name" maxlength="30">
        <button class="icon-btn" data-act="delcat" title="${used[c.id] ? `Wird von ${used[c.id]} Spot(s) genutzt` : 'Löschen'}" ${used[c.id] ? 'disabled style="opacity:.35;cursor:default"' : ''} aria-label="Kategorie löschen">${svg(UI.close,13)}</button></div>
        <div class="iconsel">${Object.keys(ICONS).map(k => `<button class="${k === c.icon ? 'on' : ''}" data-icon="${k}" aria-label="Symbol ${ICON_DE[k] || k}" aria-pressed="${k === c.icon}">${ic(k,15)}</button>`).join('')}</div>
      </div>`).join('')}
      <button class="btn" style="margin-top:12px" data-act="addcat">${svg(UI.plus,14)} Kategorie hinzufügen</button>
      <div class="muted" style="margin-top:8px">Kategorien mit Spots lassen sich erst löschen, wenn keine Spots mehr darin sind.</div>
    </div></div>`;
}
$('#catsBtn').addEventListener('click', openCats);
$('#modal').addEventListener('click', e => {
  if(e.target.id === 'modal') return closeCats();
  const b = e.target.closest('button'); if(!b) return;
  const blk = b.closest('.catblock'), cat = blk && data.cats.find(c => c.id === blk.dataset.id);
  if(b.dataset.icon && cat){ cat.icon = b.dataset.icon; save(); renderCats(); return; }
  const a = b.dataset.act;
  if(a === 'close') closeCats();
  if(a === 'delcat' && cat && data.cats.length <= 1){ toast('Mindestens eine Kategorie muss bleiben.'); return; }
  if(a === 'delcat' && cat){ data.cats = data.cats.filter(c => c !== cat); filter.delete(cat.id); save(); renderCats(); }
  if(a === 'addcat'){
    const pal = ['#0ca678','#f59f00','#ae3ec9','#4263eb','#e03131','#5c940d'];
    data.cats.push({id:uid(), name:'Neue Kategorie', color:pal[data.cats.length % pal.length], icon:'pin'}); save(); renderCats();
    const inputs = $('#modal').querySelectorAll('[data-k="name"]'); const last = inputs[inputs.length-1]; last.focus(); last.select();
  }
});
$('#modal').addEventListener('input', e => {
  const blk = e.target.closest('.catblock'); if(!blk) return;
  const cat = data.cats.find(c => c.id === blk.dataset.id);
  if(e.target.dataset.k === 'name') cat.name = e.target.value.trim() || 'Ohne Namen';
  if(e.target.dataset.k === 'color'){ cat.color = e.target.value; blk.style.setProperty('--c', cat.color); }
  save();
});
function closeCats(){ $('#modal').hidden = true; refreshAll(); if(view === 'detail' && selected) renderDetail(data.spots.find(s => s.id === selected)); if(view === 'edit') refreshEditLive(); }
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !$('#modal').hidden) closeCats(); });

/* ================= Spot per Link ================= */
const b64e = str => btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64d = s => decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))));
const appURL = () => location.origin + location.pathname;
function spotLink(s){
  const c = catById(s.cat);
  const o = {n:s.name, a:+s.lat.toFixed(6), o:+s.lng.toFixed(6), c:[c.name, c.color, c.icon]};
  if(s.notes) o.t = s.notes.slice(0, 600);
  if(s.walk) o.w = 1;
  if(s.walk && s.parking) o.p = [+s.parking.lat.toFixed(6), +s.parking.lng.toFixed(6), (s.parking.note || '').slice(0, 200)];
  return `${appURL()}#spot=${b64e(JSON.stringify(o))}`;
}
function copyText(text, msg){
  const done = () => toast(msg);
  const fallback = () => { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast(text); } ta.remove(); };
  if(navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
}
function shareURL(url, title, text){
  if(navigator.share) navigator.share({title, text, url}).catch(() => {});
  else copyText(url, 'Link kopiert – füg ihn in WhatsApp ein');
}
function catFor(name, color, icon){
  let c = data.cats.find(x => x.name.toLowerCase() === String(name || '').toLowerCase());
  if(!c){ c = {id:uid(), name:String(name || 'Geteilt').slice(0, 40), color:okColor(color), icon:ICONS[icon] ? icon : 'pin'}; data.cats.push(c); }
  return c;
}
let incoming = null, incomingM = null;
// Geräte-Link („Auf weiterem Gerät nutzen“) oder Wiederherstellungscode erkennen – egal ob geöffnet oder eingefügt
// Einladung aus Link oder nacktem Code: nur echte Codes (20–40 Buchstaben/Ziffern), sonst null
const CODE_RE = /^[a-z0-9]{20,40}$/i;
const safeDec = v => { try{ return decodeURIComponent(v); }catch(e){ return v; } };
function inviteFrom(raw){
  raw = String(raw || '').trim(); if(!raw) return null;
  const m = raw.match(/[#?&]join=([^&\s#]+)/i), code = m ? m[1] : raw;
  if(!CODE_RE.test(code)) return null;
  const gm = raw.match(/[?&#]g=([^&#\s]+)/);
  return {code, name:(gm ? safeDec(gm[1].replace(/\+/g, ' ')) : 'Crew').slice(0, 40) || 'Crew'};
}
function accountFromText(raw){
  raw = String(raw || '').trim(); if(!raw) return null;
  const q = new URLSearchParams(raw.includes('#') ? raw.slice(raw.indexOf('#') + 1) : raw.replace(/^\?/, ''));
  if(q.get('link') && /^[a-z0-9]{10,64}$/i.test(q.get('link'))){
    const jc = q.get('join');
    return {type:'link', lo:{dev:q.get('link'), name:(q.get('n') || '').slice(0, 24), code:jc && CODE_RE.test(jc) ? jc : null, g:q.get('g') || 'Crew', bk:/^[A-Za-z0-9_-]{43}$/.test(q.get('bk') || '') ? q.get('bk') : null}};
  }
  const m = raw.match(/SPOTS-[A-Za-z0-9_-]{40,}/);
  if(m) return {type:'restore', code:m[0]};
  if(q.get('restore') && /^[A-Za-z0-9_-]{40,}$/.test(q.get('restore'))) return {type:'restore', code:'SPOTS-' + q.get('restore')};
  return null;
}
function openAccount(acc){
  if(acc.type === 'link') return openLinkAccept(acc.lo);
  if(acc.type === 'restore') return openBackup('restore', acc.code);
}
function handleHash(){
  const h = location.hash.slice(1); if(!h) return;
  const q = new URLSearchParams(h);
  try{
    const acc = accountFromText(location.hash);
    if(acc){
      hashSpot = true;   // keine Einführung, das Gerät wird verknüpft
      const tryOpen = () => document.querySelector('#splash') ? setTimeout(tryOpen, 250) : openAccount(acc);   // erst wenn der Startbildschirm weg ist
      setTimeout(tryOpen, 300);
    } else if(q.get('spot')){
      hashSpot = true;
      const o = sjson(b64d(q.get('spot')));
      if(typeof o.a === 'number' && typeof o.o === 'number') showIncoming(o);
    } else if(q.get('join')){
      const jc = q.get('join'), gn = (q.get('g') || 'Crew').slice(0, 40);
      if(!CODE_RE.test(jc)) toast('Dieser Einladungslink ist kaputt. Lass ihn dir nochmal schicken.');
      else if(onbNeeded()) onbInvite = {code:jc, name:gn};
      else openGroupDlg('join', {code:jc, name:gn});
    }
  }catch(e){ toast('Der Link ist kaputt oder unvollständig.'); }
  try{ history.replaceState(null, '', location.pathname + location.search); }catch(e){}
}
/* ================= Einführung für neue Freunde ================= */
let hashSpot = false, onbInvite = null, onbStep = 0, onbInstall = null, onbErr = '', onbNameFix = false;
const isStandalone = () => navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches);
const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); onbInstall = e; if(!$('#onb').hidden) renderOnb(); });
function onbNeeded(){
  if(prefs.onb || /[?&]noonb\b/.test(location.search)) return false;
  if(myName() && grp()) return false;
  const own = data.spots.filter(x => !String(x.id).startsWith('bsp')).length;
  return !own && !tracks.length;
}
function onbSteps(){ return ['hello', ...(isStandalone() ? [] : ['install']), 'me', 'group', 'done']; }
function openOnb(){ onbStep = 0; onbErr = ''; $('#onb').hidden = false; renderOnb(); }
function closeOnb(){ $('#onb').hidden = true; prefs.onb = 1; savePrefs(); refreshAll(); }
function onbInviteLink(){ return onbInvite ? `${appURL()}#join=${onbInvite.code}&g=${encodeURIComponent(onbInvite.name)}` : ''; }
function renderOnb(){
  const steps = onbSteps(), k = steps[Math.min(onbStep, steps.length - 1)];
  const dots = `<div class="onb-dots">${steps.map((x, i) => `<i class="${i === onbStep ? 'on' : i < onbStep ? 'done' : ''}"></i>`).join('')}</div>`;
  const shareIc = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';
  let body = '';
  if(k === 'hello') body = `<div class="onb-hero"><div class="onb-logo"><svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true"><g transform="translate(-4 -2)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M40 88V16" stroke="#faf0ca" stroke-opacity=".32" stroke-width="10"/><path d="M40 88V56c0-11 5-17 13-22.5L69 22" stroke="#fff" stroke-width="10"/><path d="M54 18h17v17" stroke="#fff" stroke-width="10"/></g></svg></div>
      <h1>Spots</h1>${onbInvite ? `<p>Du wurdest in „${esc(onbInvite.name)}“ eingeladen.</p>` : ''}</div>
    <ul class="onb-list"><li><b>📍 Spots merken</b><span>Aussichtspunkte, Parkplätze, Fotospots – mit Fotos und Navigation</span></li>
      <li><b>🛣️ Fahrten aufzeichnen</b><span>Cockpit, Tempo-Verlauf, Rennstrecken und Geister-Rennen</span></li>
      <li><b>👥 Mit der Crew teilen</b><span>News, Bestzeiten, Live-Standort und Wochenrückblick</span></li></ul>
    <button class="btn primary wide" data-onb="next">Los geht's</button>
    <button class="txtbtn" data-onb="restore" style="align-self:center">Ich nutze Spots schon auf einem anderen Gerät</button>`;
  if(k === 'install'){
    const ios = isIOS();
    body = `<div class="onb-head"><span class="onb-ic">📲</span><h2>Zum Home-Bildschirm</h2><p>Dann startet Spots wie eine normale App, im Vollbild und auch ohne Netz.</p></div>
      ${ios ? `<ol class="onb-steps"><li>Unten in Safari auf <b class="onb-key">${shareIc} Teilen</b> tippen</li><li><b>„Zum Home-Bildschirm“</b> wählen</li><li>Die App über das neue Symbol öffnen</li></ol>
        ${onbInvite ? `<div class="onb-note"><b>Wichtig fürs iPhone:</b> Die Home-Bildschirm-App hat einen eigenen Speicher. Kopier jetzt den Einladungslink und füg ihn dort in der App wieder ein.<button class="btn wide" data-onb="copyinv">Einladungslink kopieren</button></div>` : ''}`
      : onbInstall ? `<button class="btn primary wide" data-onb="install">App installieren</button>`
      : `<ol class="onb-steps"><li>Im Browser-Menü <b>„App installieren“</b> oder <b>„Zum Startbildschirm“</b> wählen</li><li>Oder einfach hier im Browser weitermachen</li></ol>`}
      <div class="onb-btns"><button class="btn primary" data-onb="next">Weiter</button></div>`;
  }
  if(k === 'me') body = `<div class="onb-head"><span class="onb-ic">👋</span><h2>Wie heißt du?</h2><p>So sehen dich deine Freunde in der Crew.</p></div>
      <button class="onb-av" data-onb="avatar" aria-label="Profilbild wählen">${avHTML(myId(), myName() || '?', 96)}<span>${prefs.avatar ? 'Bild ändern' : 'Profilbild wählen'}</span></button>
      <label class="f">Dein Name<input class="inp" id="onb-name" maxlength="24" placeholder="z. B. Alex" value="${esc(myName())}" autocomplete="nickname"></label>
      <div class="err">${esc(onbErr)}</div>
      <button class="btn primary wide" data-onb="name">Weiter</button>`;
  if(k === 'group'){
    if(grp()) body = `<div class="onb-head"><span class="onb-ic">✅</span><h2>Du bist in „${esc(grp().name)}“</h2><p>Spots, Fahrten und Bestzeiten der Crew findest du unten unter „Crew“.</p></div>
      <button class="btn primary wide" data-onb="next">Weiter</button>`;
    else if(onbInvite) body = `<div class="onb-head"><span class="onb-ic">👥</span><h2>„${esc(onbInvite.name)}“ beitreten?</h2><p>Danach siehst du die Spots, Fahrten und Bestzeiten der Crew und kannst selbst etwas teilen.</p></div>
      <div class="err">${esc(onbErr)}</div>
      <button class="btn primary wide" data-onb="join">Beitreten</button><button class="txtbtn" data-onb="next" style="align-self:center">Nicht jetzt</button>`;
    else body = `<div class="onb-head"><span class="onb-ic">👥</span><h2>Bist du in einer Crew?</h2><p>Füg den Einladungslink ein, den dir ein Freund geschickt hat. Oder starte eine eigene Crew.</p></div>
      <label class="f">Einladungslink<input class="inp" id="onb-link" placeholder="https://…#join=…" autocomplete="off"></label>
      ${navigator.clipboard && navigator.clipboard.readText ? '<button class="txtbtn" data-onb="paste" style="align-self:flex-start">Aus der Zwischenablage einfügen</button>' : ''}
      <div class="err">${esc(onbErr)}</div>
      <button class="btn primary wide" data-onb="link">Beitreten</button>
      <div class="onb-or"><span>oder</span></div>
      <div class="onb-btns"><button class="btn" data-onb="create">Eigene Crew starten</button><button class="btn" data-onb="next">Später</button></div>`;
  }
  if(k === 'done') body = `<div class="onb-head"><span class="onb-ic">🎉</span><h2>Fertig${myName() ? ', ' + esc(myName()) : ''}!</h2><p>Erlaub noch deinen Standort, damit die Karte weiß, wo du bist, und das Cockpit funktioniert.</p></div>
      <button class="btn primary wide" data-onb="gps">Standort erlauben und los</button><button class="txtbtn" data-onb="close" style="align-self:center">Ohne Standort weiter</button>`;
  const backBtn = onbStep > 0 ? `<button class="txtbtn onb-back" data-onb="back">${svg(UI.back, 14)} Zurück</button>` : '';
  $('#onbBody').innerHTML = backBtn + dots + `<div class="onb-card">${body}</div>`;
  if(k === 'me') setTimeout(() => { const i = $('#onb-name'); if(i && !i.value) i.focus(); }, 80);
}
async function onbJoinChecked(code, gname){
  const msg = FB ? await joinCheck(code, gname, myName()) : '';
  if(!msg){ onbJoin(code, gname); toast(`Willkommen in „${gname}“`); return true; }
  onbInvite = {code, name:gname}; onbErr = msg;
  if(/anderen Namen/.test(msg)){ onbNameFix = true; onbStep = onbSteps().indexOf('me'); }   // zurück zum Namen
  renderOnb(); return false;
}
function onbJoin(code, gname, mk){
  const oldG = grp(); if(oldG && oldG.code !== code) memberGone(oldG.code, myId());
  prefs.group = {code, name:gname || 'Crew', joined:Date.now(), ...(mk ? {mkAdmin:true} : {})}; delete prefs.wsSeen; delete prefs.feedSeen; savePrefs();
  WS.spots = []; WS.runs = []; WS.courses = []; WS.efforts = []; WS.members = []; WS.drives = []; WS.reacts = []; WS.events = []; WS.rsvps = []; WS.loaded = 0; wsSub = 'feed';
  syncSpotsHead(); wsSync(true);
}
$('#onb').addEventListener('click', async e => {
  const b = e.target.closest('[data-onb]'); if(!b) return;
  const a = b.dataset.onb, next = () => { onbErr = ''; onbStep++; renderOnb(); };
  if(a === 'next') return next();
  if(a === 'back'){ onbErr = ''; onbStep = Math.max(0, onbStep - 1); return renderOnb(); }
  if(a === 'restore'){ $('#onb').hidden = true; openBackup('restore'); return; }
  if(a === 'install' && onbInstall){ onbInstall.prompt(); try{ await onbInstall.userChoice; }catch(_){} onbInstall = null; return next(); }
  if(a === 'copyinv'){ copy(onbInviteLink()); return; }
  if(a === 'avatar'){ $('#avFile').click(); return; }
  if(a === 'name'){
    const v = ($('#onb-name').value || '').trim(); if(!v){ onbErr = 'Gib deinen Namen ein.'; return renderOnb(); }
    prefs.myName = v; savePrefs();
    if(onbInvite && onbNameFix){ onbNameFix = false; onbErr = ''; b.disabled = true; const ok = await onbJoinChecked(onbInvite.code, onbInvite.name); b.disabled = false; if(ok){ onbStep = onbSteps().indexOf('group'); renderOnb(); } return; }
    return next();
  }
  if(a === 'join' && onbInvite){ b.disabled = true; const ok = await onbJoinChecked(onbInvite.code, onbInvite.name); b.disabled = false; if(ok) next(); return; }
  if(a === 'paste'){ try{ $('#onb-link').value = (await navigator.clipboard.readText()).trim(); }catch(_){ onbErr = 'Einfügen ging nicht – halt das Feld gedrückt und wähle „Einsetzen“.'; renderOnb(); } return; }
  if(a === 'link'){
    const acc = accountFromText($('#onb-link').value);
    if(acc){ $('#onb').hidden = true; return openAccount(acc); }
    const inv = inviteFrom($('#onb-link').value);
    if(!inv){ onbErr = 'Das sieht nicht nach einem Einladungslink aus. Kopier den ganzen Link.'; return renderOnb(); }
    const code = inv.code, gname = inv.name;
    b.disabled = true; const ok = await onbJoinChecked(code, gname); b.disabled = false; if(ok) next(); return;
  }
  if(a === 'create'){ onbJoin(newCode(), myName() ? `${possName(myName())} Crew` : 'Meine Crew', true); toast('Crew erstellt – du bist der Admin. Lad deine Freunde unter „Crew“ ein.'); return next(); }
  if(a === 'gps'){ prefs.gps = true; savePrefs(); closeOnb(); startGPS(true); return; }
  if(a === 'close') closeOnb();
});

function showIncoming(o){
  incoming = o;
  const dup = data.spots.find(s => Math.abs(s.lat - o.a) < 1e-5 && Math.abs(s.lng - o.o) < 1e-5);
  const col = (o.c && o.c[1]) || '#868e96';
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Spot empfangen">
    <div class="pad" style="padding:18px 16px 16px">
      <span class="badge" style="--c:${esc(col)}"><span class="ic">${ic((o.c && o.c[2]) || 'pin', 13)}</span>${esc((o.c && o.c[0]) || 'Spot')}</span>
      <h2>${esc(o.n || 'Spot')}</h2>
      <div class="muted">Jemand hat dir diesen Spot geschickt.${me ? ` ${fmtDist(dist(me, {lat:o.a, lng:o.o}))} von dir entfernt.` : ''}</div>
      ${o.t ? `<p class="notes">${esc(o.t)}</p>` : ''}
      ${o.p ? `<div class="muted"><span class="tag-p">P</span>Mit Parkplatz, ${fmtDist(dist({lat:o.p[0], lng:o.p[1]}, {lat:o.a, lng:o.o}))} zu Fuß</div>` : ''}
      ${dup ? `<div class="muted">Den hast du schon als „${esc(dup.name)}“.</div>` : ''}
      <div class="btns"><button class="btn" data-in="no">Verwerfen</button><button class="btn primary" data-in="save">${dup ? 'Trotzdem speichern' : 'Spot speichern'}</button></div>
    </div></div>`;
  $('#modal').hidden = false;
  const go = () => {
    if(incomingM) incomingM.remove();
    const el = document.createElement('div'); el.className = 'mk-spot draft';
    el.innerHTML = `<div class="pin" style="--c:${esc(col)}">${ic((o.c && o.c[2]) || 'pin', 16)}</div>`;
    incomingM = new maplibregl.Marker({element:el, anchor:'bottom'}).setLngLat([o.o, o.a]).addTo(map);
    map.flyTo({center:[o.o, o.a], zoom:15, padding:camPad(), duration:1200});
  };
  if(mapReady) go(); else map.once('load', go);
}
function closeIncoming(){ incoming = null; if(incomingM){ incomingM.remove(); incomingM = null; } $('#modal').hidden = true; }
$('#modal').addEventListener('click', e => { if(e.target.id === 'modal'){ if(incoming) closeIncoming(); gpPending = null; } });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && incoming) closeIncoming(); });
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-in]'); if(!b || !incoming) return;
  if(b.dataset.in === 'save'){
    const o = incoming, c = o.c ? catFor(o.c[0], o.c[1], o.c[2]) : catById(null);
    const s = {id:uid(), name:o.n || 'Geteilter Spot', cat:c.id, notes:o.t || '', lat:o.a, lng:o.o, walk:!!o.w, parking:o.p ? {lat:o.p[0], lng:o.p[1], note:o.p[2] || ''} : null, created:Date.now(), photos:[]};
    data.spots.push(s); save(); closeIncoming(); if(tab !== 'spots') setTab('spots'); spotView = 'mine'; syncSpotsHead(); refreshAll(); openDetail(s.id, true);
    toast(`„${s.name}“ gespeichert`);
  } else closeIncoming();
});
window.addEventListener('hashchange', handleHash);

/* ================= Gruppe: Workshop & Bestenlisten =================
   Datenbank: Firebase Firestore (kostenlos). Die Konfiguration kommt hier rein, sobald das Projekt angelegt ist.
   Geschützt über einen langen Crew-Code im Pfad (groups/<code>/…) – ohne Code sieht niemand etwas. */
const FB = {apiKey:'AIzaSyDPD8Bpe1WkswwwSThBUKjlKwDiCAKE4Tw', projectId:'jamsis-spots'};   // Firebase-Projekt der Gruppe (öffentlich, kein Geheimnis)
const WSKEY = 'meine-spots-ws';
const WS = {spots:[], runs:[], courses:[], efforts:[], members:[], drives:[], reacts:[], events:[], rsvps:[], crew:null, loaded:0, busy:false, err:null, rulesOld:false, nameClash:null};
const wsFull = new Map(), wsTrackObjs = new Map();
const okImg = u => typeof u === 'string' && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(u) ? u : '';
try{ Object.assign(WS, JSON.parse(localStorage.getItem(WSKEY) || '{}'), {busy:false, err:null}); }catch(e){}
let spotView = 'mine', wsSub = 'feed', wsSel = null, wsRunKey = null, wsOpenCourse = null, wsDelArmed = false;
const grp = () => prefs.group && prefs.group.code && prefs.group.code.length >= 20 ? prefs.group : null;
function myId(){ if(!prefs.dev){ prefs.dev = uid() + uid(); savePrefs(); } return prefs.dev; }
const myName = () => (prefs.myName || '').trim();
const fsURL = (col, id) => `https://firestore.googleapis.com/v1/projects/${FB.projectId}/databases/(default)/documents/groups/${grp().code}/${col}${id ? '/' + encodeURIComponent(id) : ''}`;
// große Dokumente (Spots mit Fotos, Fahrten) haben ein kleines Feld „m“ für die Liste und „d“ mit allem
async function fsList(col, meta){
  const out = []; let tok = '';
  for(let i = 0; i < 20; i++){
    const r = await fetch(`${fsURL(col)}?pageSize=300${meta ? '&mask.fieldPaths=m&mask.fieldPaths=t' : ''}${tok ? '&pageToken=' + encodeURIComponent(tok) : ''}&key=${FB.apiKey}`);
    if(!r.ok) throw new Error('Firestore ' + r.status);
    const j = await r.json();
    (j.documents || []).forEach(d => { try{ const f = d.fields || {}, v = sjson((meta && f.m ? f.m : f.d).stringValue); v._id = d.name.split('/').pop(); v._t = +((f.t && (f.t.integerValue || f.t.doubleValue)) || 0); out.push(v); }catch(e){} });
    if(!j.nextPageToken) break; tok = j.nextPageToken;
  }
  return out;
}
async function fsGet(col, id){
  const r = await fetch(`${fsURL(col, id)}?key=${FB.apiKey}`);
  if(!r.ok) throw new Error('Firestore ' + r.status);
  const d = await r.json(), v = sjson(d.fields.d.stringValue); v._id = id; return v;
}
async function fsPut(col, id, obj, meta){
  const fields = {d:{stringValue:JSON.stringify(obj)}, t:{integerValue:String(Date.now())}};
  if(meta) fields.m = {stringValue:JSON.stringify(meta)};
  const r = await fetch(`${fsURL(col, id)}?key=${FB.apiKey}`, {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({fields})});
  if(!r.ok) throw new Error('Firestore ' + r.status);
}
async function fsDel(col, id){
  const r = await fetch(`${fsURL(col, id)}?key=${FB.apiKey}`, {method:'DELETE'});
  if(!r.ok && r.status !== 404) throw new Error('Firestore ' + r.status);
}
function wsCache(){
  try{ localStorage.setItem(WSKEY, JSON.stringify({spots:WS.spots.map(s => ({...s, ph:[]})), runs:WS.runs, courses:WS.courses, efforts:WS.efforts, members:WS.members, drives:WS.drives, reacts:WS.reacts, events:WS.events, rsvps:WS.rsvps, crew:WS.crew, loaded:WS.loaded})); }catch(e){}
}
const wsUpsert = (arr, obj) => { const i = arr.findIndex(x => x._id === obj._id); if(i >= 0) arr[i] = obj; else arr.push(obj); };
function newCode(){ const a = new Uint8Array(18); crypto.getRandomValues(a); return Array.from(a, x => 'abcdefghijkmnpqrstuvwxyz23456789'[x % 32]).join('') + uid().slice(0, 6); }
const inviteURL = () => `${appURL()}#join=${grp().code}&g=${encodeURIComponent(grp().name || 'Crew')}`;

/* ================= Crew-Rechte: eindeutige Namen, Admin, Rauswerfen/Sperren, neuer Link =================
   Liegt als Dokument „_crew“ in der Mitglieder-Sammlung (dafür braucht es keine neuen Firebase-Regeln).
   Die Rechte gelten in der App – wer sich auskennt, könnte sie umgehen. */
const CREW_DOC = '_crew';
// Namen vergleichbar machen: Akzente weg, Groß/klein egal, ähnlich aussehende kyrillische/griechische Buchstaben wie lateinische
const NAME_FOLD = {'а':'a','е':'e','о':'o','р':'p','с':'c','х':'x','у':'y','к':'k','м':'m','т':'t','н':'h','в':'b','і':'i','ј':'j','ѕ':'s','α':'a','ο':'o','ρ':'p','ν':'v','τ':'t','κ':'k','ι':'i','υ':'u','ε':'e'};
const normName = v => String(v || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/./gu, c => NAME_FOLD[c] || c).replace(/[^\p{L}\p{N}]+/gu, '');
const crewDoc = () => WS.crew || {};
const isAdmin = (dev = myId()) => (crewDoc().admin || []).includes(dev);
const crewBan = () => crewDoc().ban || {};
const adminName = () => { const a = (crewDoc().admin || [])[0]; return a === myId() ? myName() : ((WS.members.find(m => m._id === a) || {}).name || 'der Admin'); };
const mSince = m => m.since || m.at || 0;
// Wem gehört dieser Name schon? (anderes Gerät, gesperrter Name zählt mit)
function nameOwner(name, mems = WS.members, crew = WS.crew, me = myId()){
  const n = normName(name); if(!n) return null;
  const m = mems.find(x => x._id !== me && x._id !== CREW_DOC && normName(x.name) === n); if(m) return {name:m.name, dev:m._id, m};
  const b = Object.entries((crew && crew.ban) || {}).find(([d, x]) => d !== me && normName(x.n) === n); return b ? {name:b[1].n, dev:b[0], banned:true} : null;
}
const fsBase = code => `https://firestore.googleapis.com/v1/projects/${FB.projectId}/databases/(default)/documents/groups/${code}`;
async function fsRawList(code, col){
  const out = []; let tok = '';
  for(let i = 0; i < 50; i++){
    const r = await fetch(`${fsBase(code)}/${col}?pageSize=300${tok ? '&pageToken=' + encodeURIComponent(tok) : ''}&key=${FB.apiKey}`);
    if(r.status === 403 || r.status === 404) return out;
    if(!r.ok) throw new Error('Firestore ' + r.status);
    const j = await r.json();
    (j.documents || []).forEach(d => out.push({id:d.name.split('/').pop(), fields:d.fields || {}}));
    if(!j.nextPageToken) break; tok = j.nextPageToken;
  }
  return out;
}
async function fsRawPut(code, col, id, fields){
  const r = await fetch(`${fsBase(code)}/${col}/${encodeURIComponent(id)}?key=${FB.apiKey}`, {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({fields})});
  if(!r.ok) throw new Error('Firestore ' + r.status);
}
async function fsRawDel(code, col, id){
  const r = await fetch(`${fsBase(code)}/${col}/${encodeURIComponent(id)}?key=${FB.apiKey}`, {method:'DELETE'});
  if(!r.ok && r.status !== 404) throw new Error('Firestore ' + r.status);
}
const docFields = obj => ({d:{stringValue:JSON.stringify(obj)}, t:{integerValue:String(Date.now())}});
// Mitglieder + Crew-Dokument einer (noch fremden) Gruppe, z. B. vor dem Beitritt
async function crewPeek(code){
  const list = await fsRawList(code, 'members'), mems = []; let crew = null;
  list.forEach(d => { try{ const v = sjson(d.fields.d.stringValue); v._id = d.id; if(d.id === CREW_DOC) crew = v; else mems.push(v); }catch(e){} });
  return {mems, crew};
}
// Darf ich mit diesem Namen in diese Gruppe? Liefert eine Fehlermeldung oder ''
async function joinCheck(code, gname, name){
  if(!/\p{L}/u.test(String(name || ''))) return 'Der Name braucht mindestens einen Buchstaben. Nimm bitte einen anderen Namen.';
  let pk; try{ pk = await crewPeek(code); }catch(e){ return ''; }   // offline: später beim Hochladen nochmal geprüft
  if(!pk.crew && !pk.mems.length) return 'Diese Crew gibt es nicht (mehr). Prüf den Link.';
  const c = pk.crew || {};
  if(c.moved) return 'Dieser Einladungslink ist abgelaufen. Frag nach dem neuen Link.';
  if(c.ban && c.ban[myId()]) return `Du bist in „${gname}“ gesperrt.`;
  const o = nameOwner(name, pk.mems, c);
  return o ? `In „${gname}“ gibt es schon ${o.banned ? 'einen gesperrten Namen' : 'jemanden namens'} „${o.name}“. ${o.banned ? 'Nimm bitte einen anderen Namen.' : 'Bist du das auf einem anderen Gerät? Dann melde dich mit dem Geräte-Link oder deinem Wiederherstellungscode an. Sonst nimm einen anderen Namen.'}` : '';
}
// Crew-Dokument ändern: immer auf dem frischesten Stand aufsetzen und nur schreiben, wenn sich dazwischen nichts geändert hat
// (sonst überschreiben sich zwei Admins gegenseitig). patch darf eine Funktion cur => {...} sein.
async function crewSave(patch){
  for(let i = 0; i < 4; i++){
    const r = await fetch(`${fsURL('members', CREW_DOC)}?key=${FB.apiKey}`);
    let cur = {}, ut = null;
    if(r.ok){ const j = await r.json(); ut = j.updateTime || null; try{ cur = sjson(j.fields.d.stringValue); }catch(e){} }
    else if(r.status !== 404) throw new Error('Firestore ' + r.status);
    const p = typeof patch === 'function' ? patch(cur) : patch;
    const doc = {...cur, ...p, at:Date.now()};
    const pre = ut ? `&currentDocument.updateTime=${encodeURIComponent(ut)}` : '&currentDocument.exists=false';
    const w = await fetch(`${fsURL('members', CREW_DOC)}?key=${FB.apiKey}${pre}`, {method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({fields:docFields(doc)})});
    if(w.ok){ WS.crew = doc; wsCache(); return doc; }
    if(w.status !== 400 && w.status !== 409 && w.status !== 412) throw new Error('Firestore ' + w.status);
    await sleep(300 + Math.random() * 500);   // jemand war schneller – neu lesen und nochmal
  }
  throw new Error('Crew gerade beschäftigt');
}
// Mitglied (und Live-Position) in einer Gruppe austragen – beim Verlassen, Wechseln oder Verknüpfen, sonst bleibt ein Geist zurück
function memberGone(code, dev){
  if(!FB || !code || !dev) return Promise.resolve();
  return Promise.all([fsRawDel(code, 'members', dev).catch(() => {}), fsRawDel(code, 'live', dev).catch(() => {})]);
}
function leaveGroupLocal(msg){
  liveStop(true); delete prefs.group; delete prefs.wsSeen; delete prefs.rxSeen; savePrefs(); liveWatch();
  WS.spots = []; WS.runs = []; WS.courses = []; WS.efforts = []; WS.members = []; WS.drives = []; WS.reacts = []; WS.events = []; WS.rsvps = []; WS.crew = null; WS.loaded = 0; wsCache();
  syncSpotsHead(); refreshAll(); renderWsMarkers();
  if(msg){
    $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Hinweis"><div class="pad" style="padding:20px 16px 16px;gap:12px"><h2>Nicht mehr in der Crew</h2><div class="muted">${esc(msg)}</div><button class="btn primary" data-gp-ok>OK</button></div></div>`;
    $('#modal').hidden = false;
  }
}
$('#modal').addEventListener('click', e => { if(e.target.closest('[data-gp-ok]')) $('#modal').hidden = true; });
// Nach jedem Abgleich: gesperrt, rausgeworfen oder umgezogen?
function crewEnforce(){
  const g = grp(), c = WS.crew; if(!g || !c) return false;
  if(c.moved){ leaveGroupLocal(`„${g.name}“ hat einen neuen Einladungslink. Frag ${c.by || 'den Admin'} danach.`); return true; }
  if(c.ban && c.ban[myId()]){ leaveGroupLocal(`Du wurdest aus „${g.name}“ entfernt.`); return true; }
  const k = c.kick && c.kick[myId()];
  if(k && k > (g.joined || 0)){ leaveGroupLocal(`${adminName()} hat dich aus „${g.name}“ genommen. Mit dem Einladungslink kannst du wieder beitreten.`); return true; }
  return false;
}

/* Profilbilder */
const AV_COLS = ['#ff9f0a', '#30d158', '#0a84ff', '#bf5af2', '#ff375f', '#64d2ff', '#ffd60a', '#ac8e68'];
function avHTML(dev, name, size = 22){
  const m = dev === myId() ? {av:prefs.avatar, name:myName()} : WS.members.find(x => x._id === dev);
  const nm = (m && m.name) || name || '?', av = okImg(m && m.av);
  if(av) return `<img class="uav" src="${av}" style="width:${size}px;height:${size}px" alt="">`;
  const col = AV_COLS[[...nm].reduce((a, c) => a + c.charCodeAt(0), 0) % AV_COLS.length];
  return `<span class="uav" style="width:${size}px;height:${size}px;background:${col};font-size:${Math.round(size * .46)}px">${esc(nm.slice(0, 1).toUpperCase())}</span>`;
}
async function avatarFrom(file){
  const url = URL.createObjectURL(file);
  try{
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const w = img.naturalWidth, h = img.naturalHeight, sz = Math.min(w, h), c = document.createElement('canvas'); c.width = c.height = 288;
    c.getContext('2d').drawImage(img, (w - sz) / 2, (h - sz) / 2, sz, sz, 0, 0, 288, 288);
    return c.toDataURL('image/jpeg', .82);
  }finally{ URL.revokeObjectURL(url); }
}
$('#avFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if(!f) return;
  try{ prefs.avatar = await avatarFrom(f); savePrefs(); }catch(_){ toast('Das Bild konnte nicht gelesen werden.'); return; }
  toast('Profilbild gespeichert');
  if(!$('#modal').hidden && $('#modal [aria-label="Einstellungen"]')) renderSettings();
  if(!$('#onb').hidden) renderOnb();
  wsRefreshUI(); if(grp()) pushMember().then(() => { wsCache(); wsRefreshUI(); });
});

/* Gruppe erstellen / beitreten / Name */
let gpPending = null;
function openGroupDlg(kind, arg){
  gpPending = {kind, arg};
  const nm = esc(myName());
  const nameField = `<label class="f">Dein Name in der Crew<input class="inp" id="gp-me" value="${nm}" maxlength="24" placeholder="z. B. Alex"></label>`;
  let body = '';
  if(kind === 'join') body = `<h2>Crew „${esc(arg.name)}“ beitreten?</h2><div class="muted">Danach siehst du die Spots und Bestenlisten der Crew und kannst selbst Spots teilen.</div>${nameField}
      <div class="btns"><button class="btn" data-gp="cancel">Abbrechen</button><button class="btn primary" data-gp="join">Beitreten</button></div>
      <button class="txtbtn" data-gp="tocode" style="align-self:center">Schon in der Crew? Mit Geräte-Link anmelden</button>`;
  if(kind === 'create') body = `<h2>Crew erstellen</h2><div class="muted">Du bekommst einen Einladungslink für deine Freunde. Nur wer den Link hat, kommt rein.</div>
      <label class="f">Name der Crew<input class="inp" id="gp-name" value="${esc((prefs.group && prefs.group.name) || '')}" maxlength="30" placeholder="z. B. Freitagsrunde"></label>${nameField}
      <div class="btns"><button class="btn" data-gp="cancel">Abbrechen</button><button class="btn primary" data-gp="create">Erstellen</button></div>
      <button class="txtbtn" data-gp="tocode" style="align-self:center">Schon eingeladen? Link einfügen</button>`;
  if(kind === 'code') body = `<h2>Link einfügen</h2><div class="muted">Einladungslink, Spot-Link, Geräte-Link oder Wiederherstellungscode. Mit Geräte-Link oder Code bist du hier derselbe wie auf deinem Handy.</div>
      <label class="f">Link oder Code<input class="inp" id="gp-code" maxlength="300" autocomplete="off"></label>${nameField}
      <div class="btns"><button class="btn" data-gp="cancel">Abbrechen</button><button class="btn primary" data-gp="code">Beitreten</button></div>`;
  if(kind === 'name') body = `<h2>Wie heißt du?</h2><div class="muted">So sehen die anderen, von wem ein Spot oder eine Zeit kommt.</div>${nameField}
      <div class="btns"><button class="btn" data-gp="cancel">Abbrechen</button><button class="btn primary" data-gp="name">Weiter</button></div>`;
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Crew"><div class="pad" style="padding:18px 16px 16px">${body}<div class="err" id="gp-err"></div></div></div>`;
  $('#modal').hidden = false;
  setTimeout(() => { const i = $('#modal input'); if(i && !i.value) i.focus(); }, 60);
}
$('#modal').addEventListener('click', async e => {
  const b = e.target.closest('[data-gp]'); if(!b || !gpPending) return;
  const a = b.dataset.gp, err = t => { $('#gp-err').textContent = t; };
  if(a === 'cancel'){ gpPending = null; $('#modal').hidden = true; return; }
  if(a === 'tocode'){ openGroupDlg('code', gpPending.arg); return; }
  if(a === 'code'){   // eingefügter Spot-Link (z. B. aus WhatsApp, wenn die App vom Home-Bildschirm läuft)
    const acc = accountFromText($('#gp-code').value);
    if(acc){ gpPending = null; $('#modal').hidden = true; return openAccount(acc); }   // eigenes Konto vom anderen Gerät
    const sm = $('#gp-code').value.match(/#spot=([A-Za-z0-9_-]+)/);
    if(sm){ try{ const o = sjson(b64d(sm[1])); gpPending = null; showIncoming(o); }catch(_){ err('Der Spot-Link ist kaputt.'); } return; }
  }
  const me_ = ($('#gp-me') && $('#gp-me').value.trim()) || '';
  if(!me_) return err('Gib deinen Namen ein.');
  let target = null;
  if(a === 'join') target = {code:gpPending.arg.code, name:gpPending.arg.name};
  if(a === 'code'){
    const inv = inviteFrom($('#gp-code').value);
    if(!inv) return err('Das ist kein gültiger Einladungslink. Kopier den ganzen Link.');
    target = inv;
  }
  if(a === 'name' && grp() && FB){ target = {code:grp().code, name:grp().name, same:true}; }
  if(target && FB){
    b.disabled = true; err('Prüfe den Namen …');
    const msg = await joinCheck(target.code, target.name, me_);
    b.disabled = false; err('');
    if(msg) return err(msg);
  }
  prefs.myName = me_;
  const oldG = grp();
  if(oldG && ((target && !target.same && target.code !== oldG.code) || a === 'create')) memberGone(oldG.code, myId());
  if(target && !target.same) prefs.group = {code:target.code, name:target.name, joined:Date.now()};
  if(a === 'create') prefs.group = {code:newCode(), name:($('#gp-name').value.trim() || 'Meine Crew'), joined:Date.now(), mkAdmin:true};
  WS.nameClash = null;
  savePrefs();
  const next = gpPending; gpPending = null; $('#modal').hidden = true;
  if(a === 'name' && next.arg && next.arg.then) return next.arg.then();
  if(a === 'create') toast('Crew erstellt – lad jetzt deine Freunde ein');
  if(a === 'join' || a === 'code') toast(`Willkommen in „${prefs.group.name}“`);
  wsSub = 'feed'; if(tab !== 'crew') setTab('crew');
  WS.spots = []; WS.runs = []; WS.courses = []; WS.efforts = []; WS.members = []; WS.drives = []; WS.reacts = []; WS.events = []; WS.rsvps = []; WS.loaded = 0; delete prefs.wsSeen; delete prefs.rxSeen;
  syncSpotsHead(); refreshAll(); wsSync(true);
  if(next.arg && next.arg.then) next.arg.then();
});
function needGroup(then){
  if(!FB){ toast('Teilen geht gerade nicht.'); return false; }
  if(!grp()){ toast('Zum Teilen brauchst du eine Crew – erstell eine oder tritt einer bei.'); openGroupDlg('create', {then}); return false; }
  if(!myName()){ openGroupDlg('name', {then}); return false; }
  return true;
}

/* Abgleich */
async function wsSync(force){
  liveWatch();
  if(!FB || !grp() || WS.busy) return;
  if(!force && Date.now() - WS.loaded < 90000) return;
  WS.busy = true; WS.err = null; wsRefreshUI();
  try{
    const soft = c => e => { if(/403/.test(e.message)){ WS.rulesOld = true; return null; } throw e; };
    const [sp, ru, co, ef, mb, dr, rx] = await Promise.all([fsList('spots', true), fsList('runs'), fsList('courses'), fsList('efforts'), fsList('members').catch(soft('members')), fsList('drives', true).catch(soft('drives')), fsList('reactions').catch(() => null)]);
    Object.assign(WS, {spots:sp, runs:ru, courses:co, efforts:ef, loaded:Date.now()});
    if(mb){ WS.crew = mb.find(m => m._id === CREW_DOC) || null; WS.members = mb.filter(m => m._id !== CREW_DOC); WS.drives = dr || []; WS.rulesOld = false; }
    if(rx){ WS.reacts = rx.filter(r => !isEvDoc(r)); WS.events = rx.filter(r => r.kind === 'ev'); WS.rsvps = rx.filter(r => r.kind === 'rv'); evTidy(); }
    if(mb && crewEnforce()){ WS.busy = false; return; }
    // Crew-Name kommt zentral aus dem Crew-Dokument (nicht aus dem Link, den jemand geöffnet hat)
    if(mb && WS.crew && typeof WS.crew.name === 'string' && WS.crew.name.trim() && WS.crew.name !== grp().name){ prefs.group = {...grp(), name:WS.crew.name.trim().slice(0, 40)}; savePrefs(); }
    else if(mb && WS.crew && !WS.crew.name && isAdmin()) crewSave(c => c.name ? {} : {name:grp().name}).catch(() => {});
    { const bn = crewBan(); if(Object.keys(bn).length){ const ok = x => !x.dev || !bn[x.dev]; ['spots', 'runs', 'efforts', 'drives', 'reacts', 'events', 'rsvps'].forEach(k => { WS[k] = (WS[k] || []).filter(ok); }); } }   // Gesperrte ausblenden
    if(mb && grp().mkAdmin && !(crewDoc().admin || []).length){ await crewSave(c => (c.admin || []).length ? {} : {admin:[myId()], since:Date.now(), name:c.name || grp().name}).catch(() => {}); }
    if(grp() && grp().mkAdmin){ delete prefs.group.mkAdmin; savePrefs(); }
    const meDoc = WS.members.find(m => m._id === myId());
    if(meDoc && prefs.linkAdopt){   // frisch verknüpftes Gerät: Profilbild und Auto vom anderen Gerät übernehmen
      if(!prefs.avatar && okImg(meDoc.av)) prefs.avatar = meDoc.av;
      if(meDoc.car && !prefs.carType && CAR_TYPES[meDoc.car.t]){ prefs.carType = meDoc.car.t; prefs.carColor = meDoc.car.c; }
      delete prefs.linkAdopt; savePrefs();
    }
    await pushBests(); await pushMember();
    wsCache(); feedNotify(); evLiveCheck();
  }catch(e){ WS.err = 'Crew gerade nicht erreichbar. Prüfe dein Internet.'; }
  WS.busy = false; wsRefreshUI();
}
function wsRefreshUI(){
  wsBadges();
  if(inWsView() && view === 'list') renderList();
  if(view === 'ws') renderWsDetail();
  renderWsMarkers();
}
async function pushMember(){
  if(!myName() || WS.rulesOld) return;
  const cur = WS.members.find(m => m._id === myId()), clash = nameOwner(myName());
  if(clash && !(isAdmin() && !isAdmin(clash.dev)) && (clash.banned || isAdmin(clash.dev) || !cur || mSince(clash.m || {}) <= mSince(cur))){
    if(WS.nameClash !== clash.name){ WS.nameClash = clash.name; toast(`Den Namen „${clash.name}“ gibt es in der Crew schon – bitte ändere deinen Namen.`); }
    return;
  }
  WS.nameClash = null;
  let st = onOff('shareStats') ? memberStats() : null;
  if(st && !tracks.length && cur && cur.st) st = cur.st;   // zweites Gerät ohne Fahrten: Kilometer vom Handy behalten
  const sig = myName() + '|' + (prefs.avatar || '').length + '|' + (prefs.avatar || '').slice(-24) + '|' + JSON.stringify(st) + '|' + carType() + carColor() + '|' + (gActive() && prefs.gShare !== false ? gModel(gActive()) + gActive().year : '');
  if(prefs.memberSig === sig && WS.members.some(m => m._id === myId())) return;
  if(!grp().since){ prefs.group.since = (cur && cur.since) || Date.now(); savePrefs(); }
  const ga = gActive(), rc = ga && prefs.gShare !== false && gModel(ga) ? {n:gModel(ga).slice(0, 40), y:ga.year || null} : (cur && !garage.cars.length ? cur.rc || null : null);
  const obj = {name:myName(), av:okImg(prefs.avatar) || (cur && okImg(cur.av)) || '', st, car:{t:carType(), c:carColor()}, rc, since:grp().since, at:Date.now()};
  try{ await fsPut('members', myId(), obj); prefs.memberSig = sig; savePrefs(); wsUpsert(WS.members, {...obj, _id:myId()}); }
  catch(e){ if(/403/.test(e.message)) WS.rulesOld = true; }
}
async function pushBests(){
  if(!myName()) return;
  const dev = myId(), best = {};
  runs.forEach(r => { const k = `${r.from}-${r.to}`; if(!best[k] || r.time < best[k].time) best[k] = r; });
  for(const [k, r] of Object.entries(best)){
    const id = `${dev}_${k}`, cur = WS.runs.find(x => x._id === id);
    if(cur && cur.time <= r.time && cur.by === myName()) continue;
    const obj = {by:myName(), dev, from:r.from, to:r.to, time:r.time, ga:r.ga || +((r.to - r.from) / 3.6 / r.time / 9.81).toFixed(2), date:r.date};
    await fsPut('runs', id, obj); wsUpsert(WS.runs, {...obj, _id:id});
  }
  for(const c of courses){
    if(!WS.courses.some(x => x._id === c.id)) continue;
    const b = courseEfforts(c.id)[0]; if(!b) continue;
    const id = `${c.id}_${dev}`, cur = WS.efforts.find(x => x._id === id);
    if(cur && cur.time <= b.time && cur.by === myName() && (cur.splits || !b.splits)) continue;
    let sp = b.splits && b.splits.length > 1 ? b.splits : null;
    while(sp && sp.length > 700) sp = sp.filter((_, i) => i % 2 === 0 || i === sp.length - 1);
    const obj = {by:myName(), dev, course:c.id, time:b.time, date:b.start, splits:sp};
    await fsPut('efforts', id, obj); wsUpsert(WS.efforts, {...obj, _id:id});
  }
}

/* Spot hochladen / speichern / löschen */
async function smallJPEG(blob, max = 1000, q = .7){
  const url = URL.createObjectURL(blob);
  try{
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas'); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', q);
  }finally{ URL.revokeObjectURL(url); }
}
async function wsUploadSpot(s){
  if(!needGroup(() => wsUploadSpot(s))) return;
  toast('Wird hochgeladen …');
  try{
    const cat = catById(s.cat), ph = [];
    for(const id of (s.photos || []).slice(0, 3)){ const b = await PDB.get(id).catch(() => null); if(b){ try{ ph.push(await smallJPEG(b)); }catch(e){} } }
    const obj = {id:s.id, name:s.name, lat:s.lat, lng:s.lng, notes:s.notes || '', walk:!!s.walk, parking:s.walk && s.parking ? s.parking : null,
                 cat:{name:cat.name, color:cat.color, icon:cat.icon}, ph, by:myName(), dev:myId(), at:Date.now()};
    while(JSON.stringify(obj).length > 900000 && obj.ph.length) obj.ph.pop();
    const docId = `${myId()}_${s.id}`, meta = {...obj, ph:undefined, nph:obj.ph.length};
    await fsPut('spots', docId, obj, meta);
    s.ws = docId; save(); wsUpsert(WS.spots, {...meta, _id:docId}); wsFull.set(docId, {...obj, _id:docId}); wsCache();
    toast(`„${s.name}“ ist jetzt in der Crew`);
    if(view === 'detail' && selected === s.id) renderDetail(s);
    wsRefreshUI();
  }catch(e){ toast('Hochladen hat nicht geklappt. Prüfe dein Internet.'); }
}
async function wsRemoveSpot(docId){
  try{
    await fsDel('spots', docId);
    WS.spots = WS.spots.filter(x => x._id !== docId); wsCache();
    data.spots.forEach(s => { if(s.ws === docId) delete s.ws; }); save();
    toast('Aus der Crew entfernt');
    if(view === 'ws'){ wsSel = null; show('list', 'half'); }
    if(view === 'detail' && selected){ const s = data.spots.find(x => x.id === selected); if(s) renderDetail(s); }
    wsRefreshUI();
  }catch(e){ toast('Löschen hat nicht geklappt. Prüfe dein Internet.'); }
}
const wsSavedAs = w => data.spots.find(s => s.from === w._id || s.ws === w._id);
async function wsFullSpot(w){
  if(!w.nph) return w;
  if(wsFull.has(w._id)) return wsFull.get(w._id);
  try{ const f = await fsGet('spots', w._id); wsFull.set(w._id, f); return f; }catch(e){ return w; }
}
async function wsSaveSpot(w){
  const have = wsSavedAs(w); if(have){ openDetail(have.id, true); return; }
  w = await wsFullSpot(w);
  const c = catFor(w.cat && w.cat.name, w.cat && w.cat.color, w.cat && w.cat.icon);
  const s = {id:uid(), name:w.name, cat:c.id, notes:w.notes || '', lat:w.lat, lng:w.lng, walk:!!w.walk, parking:w.parking || null, created:Date.now(), photos:[], from:w._id, fromBy:w.by};
  for(const du of (w.ph || []).map(okImg).filter(Boolean)){ try{ const b = await (await fetch(du)).blob(); const id = uid(); await PDB.put(id, b); s.photos.push(id); }catch(e){} }
  data.spots.push(s); save(); refreshAll();
  toast(`„${s.name}“ bei deinen Spots gespeichert`);
  if(view === 'ws') renderWsDetail();
}

/* Kopf im Spots-Tab: Meine Spots | Workshop */
function syncSpotsHead(){
  const h = $('#spotsHead'), on = tab === 'spots' && !searching;
  h.hidden = !on;
  $('#chips').hidden = !on || spotView === 'ws';
  if(on) h.innerHTML = `<div class="seg2" role="tablist"><button data-sv="mine" class="${spotView === 'mine' ? 'on' : ''}">Meine</button><button data-sv="ws" class="${spotView === 'ws' ? 'on' : ''}">Crew${spotView !== 'ws' && wsNewCount('sp') ? '<i class="nw nwd"></i>' : WS.spots.length ? ` <span class="n">${WS.spots.length}</span>` : ''}</button></div>`;
  wsBadges(true);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-sv]'); if(!b || b.dataset.sv === spotView) return;
  spotView = b.dataset.sv; syncSpotsHead(); renderList(); renderMarkers(); renderWsMarkers();
  if(spotView === 'ws') wsSync(false);
});

/* Workshop-Liste */
const ago = ts => { const m = Math.round((Date.now() - ts) / 60000); return m < 2 ? 'gerade eben' : m < 60 ? `vor ${m} Min` : m < 1440 ? `vor ${Math.round(m / 60)} Std` : m < 2880 ? 'gestern' : `vor ${Math.round(m / 1440)} Tagen`; };
function wsNoGroupHTML(){
  if(!FB) return `<div class="ws-card"><b>Crew ist vorbereitet</b><span>Es fehlt nur noch die Verbindung zur Datenbank. Bis dahin kannst du jeden Spot als Link teilen.</span></div>`;
  return `<div class="ws-card"><b>Noch in keiner Crew</b><span>Erstell eine Crew und schick deinen Freunden den Einladungslink, oder tritt mit einem Link bei.</span>
    <div class="btns"><button class="btn" data-wsa="code">Mit Link beitreten</button><button class="btn primary" data-wsa="create">Crew erstellen</button></div></div>`;
}
let wsHeadOpen = false;
function renderWorkshop(){
  const body = $('#listBody');
  if(!FB || !grp()){ body.innerHTML = wsNoGroupHTML(); return; }
  if(wsSub === 'spots') wsSub = 'feed';
  wsMarkSeen();
  const faces = [{dev:myId(), name:myName()}, ...WS.members.filter(m => m._id !== myId()).map(m => ({dev:m._id, name:m.name}))];
  const head = `<div class="ws-head2${wsHeadOpen ? ' open' : ''}">
      <button class="wh-top" data-wsa="head" aria-expanded="${wsHeadOpen}"><span class="ws-faces">${faces.slice(0, 4).map(f => avHTML(f.dev, f.name, 22)).join('')}</span><b>${esc(grp().name)}</b><small>${faces.length}${WS.busy ? ' · lädt …' : ''}</small><span class="wh-chev">${svg('<path d="m6 9 6 6 6-6"/>', 14)}</span></button>
      ${wsHeadOpen ? `<div class="wh-acts"><button class="btn primary" data-wsa="invite">${svg(UI.share, 15)} Einladen</button><button class="btn" data-wsa="sync">Aktualisieren</button><button class="btn" data-wsa="avatar">Profilbild</button><button class="btn" data-wsa="code">Link einfügen</button></div>` : ''}
    </div>
    ${WS.err ? `<div class="ws-err">${esc(WS.err)}</div>` : ''}
    ${prefs.bkTodo ? `<div class="bk-todo"><span>${svg('<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>', 18, 2)}</span><div><b>Backup ist an</b><small>Sicher dir jetzt deinen Wiederherstellungscode – damit holst du alles auf ein neues Handy.</small></div><button class="btn sm primary" data-bktodo>Code sichern</button></div>` : ''}
    ${WS.rulesOld ? `<div class="ws-err">Profilbilder und geteilte Fahrten gehen in dieser Crew gerade nicht.</div>` : ''}
    ${WS.nameClash ? `<button class="ws-err ws-clash" data-wsa="rename">Den Namen „${esc(WS.nameClash)}“ gibt es in der Crew schon. Die anderen sehen dich erst, wenn du ihn änderst – hier tippen.</button>` : ''}
    <div class="seg2 ws-seg"><button data-wss="feed" class="${wsSub === 'feed' ? 'on' : ''}">News${wsSub === 'feed' ? '' : nwBadge('dr') || nwBadge('lb') || nwBadge('sp')}</button><button data-wss="drives" class="${wsSub === 'drives' ? 'on' : ''}">Fahrten${nwBadge('dr')}</button><button data-wss="lb" class="${wsSub === 'lb' ? 'on' : ''}">Zeiten${nwBadge('lb')}</button><button data-wss="crew" class="${wsSub === 'crew' ? 'on' : ''}">Leute</button></div>`;
  body.innerHTML = head + (wsSub === 'feed' ? wsFeedHTML() : wsSub === 'lb' ? wsBoardsHTML() : wsSub === 'drives' ? wsDrivesHTML() : wsCrewHTML());
}
function renderWsSpots(){
  const body = $('#listBody');
  if(!FB || !grp()){ body.innerHTML = wsNoGroupHTML(); return; }
  wsMarkSeen('gspots');
  body.innerHTML = wsSpotsHTML() + `<button class="link ws-paste" data-wsa="code">Geteilten Spot-Link einfügen</button>`;
}

function wsSpotsHTML(){
  const list = WS.spots.slice().sort((a, b) => (b.at || 0) - (a.at || 0));
  if(!list.length) return `<div class="empty"><b>Noch keine Spots in der Crew</b>Öffne einen deiner Spots und tippe auf „In die Crew“.</div>`;
  return list.map(w => {
    const saved = wsSavedAs(w), mine = w.dev === myId(), col = (w.cat && w.cat.color) || '#868e96';
    return `<button class="item" data-ws="${esc(w._id)}"><span class="ic" style="--c:${esc(col)}">${ic((w.cat && w.cat.icon) || 'pin', 16)}</span>
      <span class="tx"><span class="t">${esc(w.name)}${isNewIn('sp', w) ? '<i class="nw-tag">Neu</i>' : ''}</span><span class="s ws-by">${avHTML(w.dev, w.by, 16)}${mine ? 'von dir' : `von ${esc(w.by || '?')}`}${me ? ` · <span class="me-d">${fmtDist(dist(me, w))}</span>` : ''} · ${ago(w.at || 0)}</span>${rxHTML('sp:' + w._id, w.dev, 'row')}</span>
      ${saved || mine ? `<span class="ws-ok">${svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 15, 2.6)}</span>` : `<span class="ws-add" data-wsave="${esc(w._id)}" role="button" aria-label="Speichern">${svg(UI.plus, 15, 2.6)}</span>`}</button>`;
  }).join('');
}
const crewName = (dev, by) => dev === myId() ? 'Du' : ((WS.members.find(m => m._id === dev) || {}).name || by || '?');
function podiumHTML(rows, fmt, sub, key){
  if(!rows.length) return '';
  const top = rows.slice(0, 3), order = [top[1], top[0], top[2]];
  const pod = `<div class="podium">${order.map(r => {
    if(!r) return '<div class="pd empty"></div>';
    const place = r === top[0] ? 1 : r === top[1] ? 2 : 3;
    return `<button class="pd p${place}${r.dev === myId() ? ' is-me' : ''}" data-crew="${esc(r.dev)}">
      ${isNewIn('lb', r) ? '<i class="nw-tag">Neu</i>' : ''}<span class="pd-av">${avHTML(r.dev, r.by, place === 1 ? 66 : 52)}</span>
      <b class="pd-n">${esc(crewName(r.dev, r.by))}</b><span class="pd-t">${fmt(r.time)}</span>
      <span class="pd-d">${place === 1 ? 'Bestzeit' : fmtDelta(r.time - top[0].time)}</span>
      ${key ? rxHTML(key(r), r.dev, 'mini') : ''}<i class="pd-b">${place}</i></button>`;
  }).join('')}</div>`;
  const rest = rows.slice(3).map((r, i) => `<button class="pd-row${r.dev === myId() ? ' is-me' : ''}" data-crew="${esc(r.dev)}"><span class="pd-rk">${i + 4}</span>${avHTML(r.dev, r.by, 32)}
      <span class="pd-rn">${esc(crewName(r.dev, r.by))}${isNewIn('lb', r) ? '<i class="nw-tag">Neu</i>' : ''}<small>${sub(r)}</small>${key ? rxHTML(key(r), r.dev, 'mini') : ''}</span><span class="pd-rt">${fmt(r.time)}<small>${fmtDelta(r.time - rows[0].time)}</small></span></button>`).join('');
  return pod + (rest ? `<div class="pd-rows">${rest}</div>` : '');
}
function wsBoardsHTML(){
  const keys = [...new Set(WS.runs.map(r => `${r.from}-${r.to}`))].sort((a, b) => { const [a1, a2] = a.split('-').map(Number), [b1, b2] = b.split('-').map(Number); return a1 - b1 || a2 - b2; });
  if(!wsRunKey || !keys.includes(wsRunKey)) wsRunKey = keys.includes('0-100') ? '0-100' : keys[0];
  let html = `<div class="sec">Beschleunigung</div>`;
  if(!keys.length) html += `<div class="empty" style="padding:10px">Noch keine Zeiten. Miss eine 0–100, deine Bestzeit wird automatisch geteilt.</div>`;
  else {
    html += `<div class="chips ws-chips">${keys.map(k => `<button class="chip ${k === wsRunKey ? 'on' : ''}" data-wsk="${k}">${k.replace('-', '–')} km/h${WS.runs.some(r => `${r.from}-${r.to}` === k && isNewIn('lb', r)) ? '<i class="nwdot"></i>' : ''}</button>`).join('')}</div>`;
    const rows = WS.runs.filter(r => `${r.from}-${r.to}` === wsRunKey).sort((a, b) => a.time - b.time);
    html += podiumHTML(rows, fmtS, r => `Ø ${fmtGn(r.ga)} G · ${new Date(r.date).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}`, r => `ru:${r._id}:${r.time}`);
  }
  html += `<div class="sec">Rennstrecken</div>`;
  if(!WS.courses.length) html += `<div class="empty" style="padding:10px">Noch keine Rennstrecke geteilt. Öffne eine Rennstrecke und tippe auf „In die Crew“.</div>`;
  else html += WS.courses.slice().sort((a, b) => (b.at || 0) - (a.at || 0)).map(c => {
    const rows = WS.efforts.filter(f => f.course === c._id).sort((a, b) => a.time - b.time), have = courses.some(x => x.id === c._id), open = wsOpenCourse === c._id;
    return `<div class="ws-course${open ? ' open' : ''}">
      <button class="ws-chead" data-wsc="${esc(c._id)}"><span class="ic" style="--c:#bf5af2">${svg(ICONS.flag, 16)}</span>
        <span class="tx"><b>${esc(c.name)}${isNewIn('lb', c) || rows.some(f => isNewIn('lb', f)) ? '<i class="nw-tag">Neu</i>' : ''}</b><span>${fmtKm(c.len || 0)} · von ${esc(crewName(c.dev, c.by))}</span></span>
        ${rows[0] ? `<span class="ws-cbest">${avHTML(rows[0].dev, rows[0].by, 26)}<b>${fmtLap(rows[0].time)}</b></span>` : '<span class="ws-cbest muted">keine Zeit</span>'}
        <span class="ws-chev">${svg('<path d="m6 9 6 6 6-6"/>', 16)}</span></button>
      ${open ? `<div class="ws-cbody">${rows.length ? podiumHTML(rows, fmtLap, f => `${c.len ? Math.round(c.len / f.time * 3.6) + ' km/h Ø · ' : ''}${new Date(f.date).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}`, f => `ef:${f._id}:${f.time}`) : '<div class="muted">Noch keine Zeiten auf dieser Strecke.</div>'}
        ${have ? '<div class="muted">Ist bei deinen Rennstrecken. Deine Bestzeit wird automatisch geteilt.</div>' : `<button class="btn primary" data-wscsave="${esc(c._id)}">${svg(UI.plus, 15)} Strecke übernehmen und mitfahren</button>`}</div>` : ''}
    </div>`;
  }).join('');
  return `<div class="ws-boards">${html}</div>`;
}

/* Crew: Mitglieder, Wochen-Kilometer, Profile */
let crewPeriod = 'wk';
function monthStart(ts){ const d = new Date(ts); return new Date(d.getFullYear(), d.getMonth(), 1).getTime(); }
// je Woche/Monat: [Start, km, Fahrten, Top km/h, Minuten, Ø Risk]
function memberStats(){
  const wk0 = weekStart(Date.now()), weeks = [], mos = [], now = new Date();
  for(let i = 7; i >= 0; i--) weeks.push({s:weekStart(wk0 - i * 7 * 864e5 + 3 * 3600e3), km:0, n:0, top:0, m:0, rs:0, rn:0});
  for(let i = 2; i >= 0; i--) mos.push({s:new Date(now.getFullYear(), now.getMonth() - i, 1).getTime(), km:0, n:0, top:0, m:0, rs:0, rn:0});
  let km = 0, n = 0, top = 0, h = 0;
  tracks.forEach(t => {
    const k = (t.dist || 0) / 1000, sp = (t.maxSpd || 0) * 3.6, mn = (t.dur || 0) / 60000;
    const add = b => { if(!b) return; b.km += k; b.n++; b.top = Math.max(b.top, sp); b.m += mn; const r = trackRisk(t); if(r){ b.rs += r.score; b.rn++; } };
    add(weeks.find(x => x.s === weekStart(t.created))); add(mos.find(x => x.s === monthStart(t.created)));
    km += k; n++; top = Math.max(top, sp); h += mn / 60;
  });
  const pack = b => [b.s, +b.km.toFixed(1), b.n, Math.round(b.top), Math.round(b.m), b.rn ? Math.round(b.rs / b.rn) : null];
  return {wk:weeks.map(pack), mo:mos.map(pack), km:+km.toFixed(1), n, top:Math.round(top), h:+h.toFixed(1)};
}
function crewList(){
  const map = new Map();
  WS.members.forEach(m => map.set(m._id, {dev:m._id, name:m.name || '?', st:m.st || null}));
  const rem = (map.get(myId()) || {}).st || null;
  map.set(myId(), {dev:myId(), name:myName() || 'Ich', st:onOff('shareStats') ? (!tracks.length && rem ? rem : memberStats()) : rem});
  if(!WS.members.length) [...WS.spots, ...WS.runs, ...WS.drives, ...WS.efforts].forEach(x => { if(x.dev && !map.has(x.dev)) map.set(x.dev, {dev:x.dev, name:x.by || '?', st:null}); });
  const ban = crewBan(), kick = crewDoc().kick || {};
  return [...map.values()].filter(m => !ban[m.dev] && !(kick[m.dev] && !WS.members.some(x => x._id === m.dev)));
}
function weekKm(st, back){ if(!st || !st.wk) return null; const w = weekStart(Date.now() - back * 7 * 864e5); const hit = st.wk.find(x => x[0] === w); return hit ? hit[1] : 0; }
function periodKm(st, p){
  if(!st) return null;
  if(p === 'wk') return weekKm(st, 0);
  if(p === 'lwk') return weekKm(st, 1);
  if(p === '4w') return [0, 1, 2, 3].reduce((a, i) => a + (weekKm(st, i) || 0), 0);
  return st.km || 0;
}
const PERIODS = [['wk', 'Diese Woche'], ['lwk', 'Letzte Woche'], ['4w', '4 Wochen'], ['all', 'Gesamt']];
function sparkSVG(st, w = 120, h = 30){
  if(!st || !st.wk) return '';
  const vals = [7, 6, 5, 4, 3, 2, 1, 0].map(i => weekKm(st, i) || 0), mx = Math.max(1, ...vals), bw = w / vals.length;
  return `<svg class="crew-spark" viewBox="0 0 ${w} ${h}" aria-hidden="true">${vals.map((v, i) => { const bh = Math.max(2, v / mx * (h - 2)); return `<rect x="${(i * bw + 1.5).toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${(bw - 3).toFixed(1)}" height="${bh.toFixed(1)}" rx="2" class="${i === 7 ? 'on' : ''}"/>`; }).join('')}</svg>`;
}
function wsCrewHTML(){
  const list = crewList().map(m => ({...m, v:periodKm(m.st, crewPeriod)}));
  const ranked = list.filter(m => m.v != null).sort((a, b) => b.v - a.v), mx = Math.max(1, ...ranked.map(m => m.v));
  const label = PERIODS.find(p => p[0] === crewPeriod)[1];
  let html = `<div class="chips ws-chips">${PERIODS.map(([k, n]) => `<button class="chip ${k === crewPeriod ? 'on' : ''}" data-crewp="${k}">${n}</button>`).join('')}</div>`;
  html += `<div class="crew-board">${ranked.length ? ranked.map((m, i) => `<button class="crew-row${m.dev === myId() ? ' is-me' : ''}" data-crew="${esc(m.dev)}">
      <span class="crew-rk">${i + 1}</span>${avHTML(m.dev, m.name, 38)}
      <span class="crew-main"><span class="crew-n">${esc(crewName(m.dev, m.name))}</span><span class="crew-bar"><i style="width:${Math.max(2, m.v / mx * 100).toFixed(1)}%"></i></span></span>
      <span class="crew-km"><b>${m.v < 100 ? m.v.toFixed(1).replace('.', ',') : Math.round(m.v).toLocaleString('de-DE')}</b><small>km</small></span></button>`).join('')
    : '<div class="muted" style="padding:10px 4px">Noch keine Kilometer geteilt.</div>'}</div>`;
  const noData = list.filter(m => m.v == null);
  if(noData.length) html += `<div class="muted crew-nd">Ohne Kilometer: ${noData.map(m => esc(m.name)).join(', ')} (ältere App-Version oder Teilen ausgeschaltet)</div>`;
  html += `<div class="sec">Mitglieder</div><div class="crew-grid">${list.sort((a, b) => (b.v || 0) - (a.v || 0)).map(m => `<button class="crew-card${m.dev === myId() ? ' is-me' : ''}${liveOf(m.dev) || (m.dev === myId() && live.on) ? ' live' : ''}" data-crew="${esc(m.dev)}">
      ${liveOf(m.dev) || (m.dev === myId() && live.on) ? '<span class="crew-livechip"><span class="lv-dot on"></span>LIVE</span>' : ''}<span class="crew-cav" data-crewav="${esc(m.dev)}">${avHTML(m.dev, m.name, 64)}</span>
      <b>${esc(crewName(m.dev, m.name))}${isAdmin(m.dev) ? '<i class="adm-tag sm" title="Admin">Admin</i>' : ''}</b>
      <span>${m.st ? `${(weekKm(m.st, 0) || 0).toFixed(0)} km diese Woche` : 'keine Fahrdaten'}</span>
      ${sparkSVG(m.st)}
      <small>${m.st ? `${Math.round(m.st.km).toLocaleString('de-DE')} km · ${m.st.n} Fahrt${m.st.n === 1 ? '' : 'en'}` : '&nbsp;'}</small></button>`).join('')}</div>
    <div class="muted crew-nd">${label}: geteilt wird nur die Wochenstatistik, keine Strecken. Ausschalten in den Einstellungen unter „Crew“.</div>`;
  return html;
}
function zoomAvatar(dev){
  const m = dev === myId() ? {av:prefs.avatar, name:myName()} : WS.members.find(x => x._id === dev), av = okImg(m && m.av);
  if(!av) return false;
  $('#lightbox').innerHTML = `<img src="${av}" alt="" class="lb-avatar"><button class="lb-x" aria-label="Schließen">${svg(UI.close, 18, 2.4)}</button><span class="lb-c">${esc(crewName(dev, m.name))}</span>`;
  $('#lightbox').hidden = false; return true;
}
let crewOpen = null;
function openCrew(dev){
  const m = crewList().find(x => x.dev === dev); if(!m) return;
  crewOpen = dev;
  const st = m.st, bestRuns = WS.runs.filter(r => r.dev === dev).sort((a, b) => a.from - b.from || a.to - b.to);
  const spots = WS.spots.filter(x => x.dev === dev), drives = WS.drives.filter(x => x.dev === dev).sort((a, b) => (b.created || 0) - (a.created || 0));
  const vals = [7, 6, 5, 4, 3, 2, 1, 0].map(i => ({i, v:st ? weekKm(st, i) || 0 : 0}));
  const mx = Math.max(1, ...vals.map(x => x.v)), W = 300, H = 110, bw = W / 8;
  const chart = st ? `<svg viewBox="0 0 ${W} ${H + 18}" class="crew-chart" role="img" aria-label="Kilometer pro Woche">${vals.map((x, k) => { const bh = Math.max(3, x.v / mx * H);
      return `<rect class="bar${x.i === 0 ? ' on' : ''}" data-cw="${k}" x="${(k * bw + 4).toFixed(1)}" y="${(H - bh).toFixed(1)}" width="${(bw - 8).toFixed(1)}" height="${bh.toFixed(1)}" rx="4"/>
        <text class="ax" x="${(k * bw + bw / 2).toFixed(1)}" y="${H + 14}" text-anchor="middle">${x.i === 0 ? 'Diese Wo.' : new Date(weekStart(Date.now() - x.i * 7 * 864e5)).toLocaleDateString('de-DE', {day:'numeric', month:'numeric'})}</text>`; }).join('')}</svg>` : '';
  $('#modal').innerHTML = `<div class="dlg crew-dlg" role="dialog" aria-modal="true" aria-label="Profil">
    <div class="top" style="padding:12px 14px"><span></span><button class="txtbtn bold" data-crewx>Fertig</button></div>
    <div class="pad" style="padding-top:0;gap:14px">
      <div class="crew-hero"><button class="crew-big" data-crewav="${esc(dev)}" aria-label="Profilbild vergrößern">${avHTML(dev, m.name, 112)}</button><h2>${esc(crewName(dev, m.name))}${isAdmin(dev) ? ' <i class="adm-tag">Admin</i>' : ''}</h2>
        ${(() => { const mc = dev === myId() ? {t:carType(), c:carColor()} : (WS.members.find(x => x._id === dev) || {}).car; const rc = dev === myId() ? (gActive() && prefs.gShare !== false && gModel(gActive()) ? {n:gModel(gActive()), y:gActive().year} : null) : (WS.members.find(x => x._id === dev) || {}).rc;
          return (mc && CAR_TYPES[mc.t] && CAR_COLORS[mc.c] ? `<div class="crew-car">${carSideSVG(mc.t, mc.c)}<span>${esc(CAR_TYPES[mc.t].name)} · ${esc(CAR_COLORS[mc.c].name)}</span></div>` : '') + (rc && rc.n ? `<div class="crew-rc">${svg(UI.car, 14)} Fährt ${esc(String(rc.n).slice(0, 40))}${rc.y ? ` · ${esc(String(rc.y).slice(0, 4))}` : ''}</div>` : ''); })()}${dev === myId() ? '<button class="txtbtn" data-crewme>Profilbild ändern</button>' : ''}${liveOf(dev) ? `<button class="btn live" data-crewlive="${esc(dev)}"><span class="lv-dot"></span>Live${liveOf(dev).v >= 6 ? ` · ${Math.round(liveOf(dev).v)} km/h` : ''} · Live-Stats ansehen</button>` : ''}</div>
      ${st ? `<div class="tstats">
        <div><b>${(weekKm(st, 0) || 0).toFixed(1).replace('.', ',')} km</b><span>Diese Woche</span></div>
        <div><b>${Math.round(st.km).toLocaleString('de-DE')} km</b><span>Gesamt</span></div>
        <div><b>${st.n}</b><span>Fahrten · ${Math.round(st.h)} h</span></div>
        <div><b>${st.top} km/h</b><span>Top-Speed</span></div></div>
      <div class="st-h"><span>Kilometer pro Woche</span><em id="crewCap">Diese Woche ${(weekKm(st, 0) || 0).toFixed(1).replace('.', ',')} km</em></div>
      <div class="st-chart" id="crewChart">${chart}</div>` : '<div class="muted">Teilt noch keine Kilometer.</div>'}
      ${(() => { const g = new Map(); trophiesOf(dev).forEach(a => { const x = g.get(a.k) || {...a, n:0, ws:[]}; x.n++; x.ws.push(a.when); g.set(a.k, x); });
        const tr = [...g.values()].sort((a, b) => b.n - a.n);
        return tr.length ? `<div class="st-h"><span>Auszeichnungen</span><em>letzte 2 Monate</em></div><div class="trophies">${tr.map(a => `<span class="trophy"><i>${a.ic}</i><span><b>${esc(a.t)}${a.n > 1 ? ` <em>×${a.n}</em>` : ''}</b><small>${esc(a.ws.slice(0, 3).join(', '))}${a.ws.length > 3 ? ' …' : ''}</small></span></span>`).join('')}</div>` : ''; })()}
      ${bestRuns.length ? `<div class="st-h"><span>Bestzeiten</span></div><div class="st-list">${bestRuns.map(r => `<div class="st-row"><span class="k">${r.from}–${r.to} km/h</span><span class="v">${fmtS(r.time)}<small>Ø ${fmtGn(r.ga)} G</small></span></div>`).join('')}</div>` : ''}
      ${drives.length ? `<div class="st-h"><span>Geteilte Fahrten</span></div><div class="st-list">${drives.slice(0, 8).map(d => `<button class="st-row crew-link" data-crewdrv="${esc(d._id)}"><span class="k">${esc(d.name)}</span><span class="v">${fmtKmS(d.dist || 0)}<small>${new Date(d.created || d.at).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}</small></span></button>`).join('')}</div>` : ''}
      ${spots.length ? `<div class="st-h"><span>Geteilte Spots</span></div><div class="st-list">${spots.slice(0, 8).map(x => `<button class="st-row crew-link" data-crewspot="${esc(x._id)}"><span class="k">${esc(x.name)}</span><span class="v">${esc((x.cat && x.cat.name) || '')}</span></button>`).join('')}</div>` : ''}
    </div></div>`;
  $('#modal').hidden = false;
  const ch = $('#crewChart');
  if(ch){
    const pick = k => { ch.querySelectorAll('.bar').forEach(b => b.classList.toggle('on', +b.dataset.cw === k)); const x = vals[k]; $('#crewCap').textContent = `${x.i === 0 ? 'Diese Woche' : 'Woche ab ' + new Date(weekStart(Date.now() - x.i * 7 * 864e5)).toLocaleDateString('de-DE', {day:'numeric', month:'short'})} ${x.v.toFixed(1).replace('.', ',')} km`; };
    ch.addEventListener('pointerover', e => { const t = e.target.closest('[data-cw]'); if(t) pick(+t.dataset.cw); });
    ch.addEventListener('click', e => { const t = e.target.closest('[data-cw]'); if(t) pick(+t.dataset.cw); });
  }
}
$('#modal').addEventListener('click', e => {
  if(!crewOpen) return;
  if(!$('#modal .crew-dlg')){ crewOpen = null; return; }
  if(e.target.id === 'modal' || e.target.closest('[data-crewx]')){ crewOpen = null; $('#modal').hidden = true; return; }
  const av = e.target.closest('[data-crewav]'); if(av){ zoomAvatar(av.dataset.crewav); return; }
  if(e.target.closest('[data-crewme]')){ $('#avFile').click(); return; }
  const lv = e.target.closest('[data-crewlive]'); if(lv){ crewOpen = null; $('#modal').hidden = true; openLiveCard(lv.dataset.crewlive); return; }
  const dv = e.target.closest('[data-crewdrv]'); if(dv){ crewOpen = null; $('#modal').hidden = true; openWsDrive(dv.dataset.crewdrv); return; }
  const sp = e.target.closest('[data-crewspot]'); if(sp){ crewOpen = null; $('#modal').hidden = true; openWsSpot(sp.dataset.crewspot); }
});
$('#listBody').addEventListener('click', e => {
  if(!inWsView()) return;
  const a = e.target.closest('[data-wsa]');
  if(a){
    const k = a.dataset.wsa;
    if(k === 'create') openGroupDlg('create', {});
    if(k === 'code') openGroupDlg('code', {});
    if(k === 'sync') wsSync(true);
    if(k === 'avatar') $('#avFile').click();
    if(k === 'head'){ wsHeadOpen = !wsHeadOpen; renderList(); }
    if(k === 'rename') openGroupDlg('name', {then:() => { prefs.memberSig = ''; pushMember().then(() => { wsCache(); wsRefreshUI(); }).catch(() => {}); pushBests().catch(() => {}); }});
    if(k === 'invite') shareURL(inviteURL(), `Crew ${grp().name}`, `Komm in unsere Crew „${grp().name}“ bei Spots:`);
    return;
  }
  const sv = e.target.closest('[data-wsave]');
  if(sv){ e.stopPropagation(); const w = WS.spots.find(x => x._id === sv.dataset.wsave); if(w) wsSaveSpot(w).then(() => renderList()); return; }
  const fd = e.target.closest('[data-feed]'); if(fd){ feedGo(fd.dataset.feed); return; }
  const ro = e.target.closest('[data-rvopen]'); if(ro){ openReview(ro.dataset.rvopen, 1); return; }
  const evb = e.target.closest('[data-ev]'); if(evb){ evAct(evb); return; }
  const ss = e.target.closest('[data-wss]'); if(ss){ wsSub = ss.dataset.wss; renderList(); return; }
  const cp = e.target.closest('[data-crewp]'); if(cp){ crewPeriod = cp.dataset.crewp; renderList(); return; }
  const cav = e.target.closest('.crew-card [data-crewav]'); if(cav && zoomAvatar(cav.dataset.crewav)) return;
  const cr = e.target.closest('[data-crew]'); if(cr){ openCrew(cr.dataset.crew); return; }
  const kk = e.target.closest('[data-wsk]'); if(kk){ wsRunKey = kk.dataset.wsk; renderList(); return; }
  const cc = e.target.closest('[data-wsc]'); if(cc){ wsOpenCourse = wsOpenCourse === cc.dataset.wsc ? null : cc.dataset.wsc; renderList(); return; }
  const cs = e.target.closest('[data-wscsave]');
  if(cs){
    const c = WS.courses.find(x => x._id === cs.dataset.wscsave); if(!c || courses.some(x => x.id === c._id)) return;
    const lead = WS.efforts.filter(f => f.course === c._id && f.dev !== myId() && f.splits && f.splits.length > 1).sort((a, b) => a.time - b.time)[0];
    courses.push({id:c._id, name:c.name, created:Date.now(), pts:c.pts, len:c.len, loop:!!c.loop, from:c.by, ghost:lead ? lead.dev : null}); saveCourses(); syncMatchers();
    let n = 0; tracks.forEach(t => n += scanTrack(t, c._id).length);
    toast(`„${c.name}“ übernommen${lead ? ` · Geist: ${lead.by} (${fmtLap(lead.time)})` : ''}${n ? ` · ${n} Zeit${n > 1 ? 'en' : ''} aus deinen Fahrten` : ''}`);
    pushBests().then(() => { wsCache(); renderList(); }).catch(() => {}); renderList(); return;
  }
  const dv = e.target.closest('[data-wsdrv]'); if(dv){ openWsDrive(dv.dataset.wsdrv); return; }
  const it = e.target.closest('[data-ws]'); if(it) openWsSpot(it.dataset.ws);
});

/* „Neu“ seit dem letzten Besuch: zählt Spots, Fahrten, Zeiten und Reaktionen auf deine Sachen */
const NEWK = {spots:['sp'], drives:['dr'], lb:['lb'], feed:['sp', 'dr', 'lb'], gspots:['sp']};
let wsShow = null;   // Stand beim Betreten des Workshops – so lange bleibt „Neu“ sichtbar
function wsSeen(){ if(!prefs.wsSeen){ const n = Date.now(); prefs.wsSeen = {sp:n, dr:n, lb:n}; savePrefs(); } return prefs.wsSeen; }
const rxCat = k => k.startsWith('sp:') ? 'sp' : k.startsWith('dr:') ? 'dr' : 'lb';
function wsNewList(cat, since){
  const mine = myId(), fresh = x => x && x.dev !== mine && (x._t || 0) > since;
  const arr = cat === 'sp' ? WS.spots : cat === 'dr' ? WS.drives : [...WS.runs, ...WS.efforts, ...WS.courses];
  return arr.filter(fresh).concat(WS.reacts.filter(r => r.o === mine && rxCat(r.k) === cat && fresh(r)));
}
const wsNewCount = cat => grp() ? wsNewList(cat, wsSeen()[cat]).length : 0;
const wsNewTotal = () => wsNewCount('sp') + wsNewCount('dr') + wsNewCount('lb');
const isNewIn = (cat, x) => !!(wsShow && x && x.dev !== myId() && (x._t || 0) > wsShow[cat]);
const nwBadge = cat => { const n = wsNewCount(cat); return n ? `<i class="nw">${n}</i>` : ''; };
function wsMarkSeen(key){
  if(!grp()) return;
  if(!wsShow) wsShow = {...wsSeen()};
  const cats = NEWK[key || wsSub]; if(!cats) return;
  let ch = false;
  cats.forEach(cat => { const t = Math.max(Date.now(), ...wsNewList(cat, 0).map(x => x._t || 0)); if(prefs.wsSeen[cat] !== t){ prefs.wsSeen[cat] = t; ch = true; } });
  if(ch) savePrefs();
  syncSpotsHead();
}
function wsBadges(skipHead){
  const ns = wsNewCount('sp'), nc = wsNewCount('dr') + wsNewCount('lb');
  const tb = document.querySelector('.tabs [data-tab="spots"]'); if(tb) tb.classList.toggle('dot', ns > 0 && !(tab === 'spots' && spotView === 'ws'));
  const tc = document.querySelector('.tabs [data-tab="crew"]'); if(tc) tc.classList.toggle('dot', nc + ns > 0 && tab !== 'crew');
  if(!skipHead) syncSpotsHead();
}

/* Reaktionen 🔥 💀 auf Spots, Fahrten und Bestzeiten */
const RX = {f:'🔥', s:'💀'};
const rxOf = key => WS.reacts.filter(r => r.k === key);
function rxHTML(key, owner, mode){
  if(!FB || !grp()) return '';
  const list = rxOf(key), mine = list.find(r => r.dev === myId());
  if(mode === 'row' && !list.length) return '';
  const fresh = list.some(r => r.o === myId() && isNewIn(rxCat(key), r));
  const btn = e => { const n = list.filter(r => r.e === e).length; if(mode === 'row' && !n) return '';
    return `<span class="rx-b${mine && mine.e === e ? ' on' : ''}${n ? '' : ' z'}" role="button" tabindex="0" data-rx="${e}" aria-label="${e === 'f' ? 'Feuer' : 'Totenkopf'}${n ? ': ' + n : ''}">${RX[e]}${n ? `<b>${n}</b>` : ''}</span>`; };
  let who = '';
  if(mode === 'full' && list.length){
    const names = e => list.filter(r => r.e === e).map(r => esc(crewName(r.dev, r.by)));
    const part = e => { const n = names(e); return n.length ? `${RX[e]} ${n.slice(0, 3).join(', ')}${n.length > 3 ? ` +${n.length - 3}` : ''}` : ''; };
    who = `<span class="rx-who">${list.slice(0, 4).map(r => avHTML(r.dev, r.by, 20)).join('')}<em>${[part('f'), part('s')].filter(Boolean).join(' · ')}</em></span>`;
  }
  return `<span class="rx ${mode}${fresh ? ' fresh' : ''}" data-rxk="${esc(key)}" data-rxo="${esc(owner || '')}" data-rxm="${mode}">${btn('f')}${btn('s')}${who}</span>`;
}
function rxPatch(key){
  document.querySelectorAll('[data-rxk]').forEach(el => { if(el.dataset.rxk === key) el.outerHTML = rxHTML(key, el.dataset.rxo, el.dataset.rxm); });
}
async function react(key, e, owner){
  if(!needGroup(() => react(key, e, owner))) return;
  const id = `${myId()}_${key}`, cur = WS.reacts.find(x => x._id === id), before = WS.reacts.slice();
  if(navigator.vibrate) try{ navigator.vibrate(8); }catch(_){}
  try{
    if(cur && cur.e === e){ WS.reacts = WS.reacts.filter(x => x._id !== id); rxPatch(key); await fsDel('reactions', id); }
    else {
      const o = {k:key, e, o:owner || '', dev:myId(), by:myName(), at:Date.now()};
      wsUpsert(WS.reacts, {...o, _id:id, _t:o.at}); rxPatch(key);
      document.querySelectorAll(`[data-rxk] [data-rx="${e}"]`).forEach(b => { if(b.closest('[data-rxk]').dataset.rxk === key) b.classList.add('rx-hit'); });
      await fsPut('reactions', id, o);
    }
    wsCache();
  }catch(err){ WS.reacts = before; rxPatch(key); toast('Reaktion hat nicht geklappt. Prüfe dein Internet.'); }
}
document.addEventListener('click', e => {   // vor den Zeilen-Klicks abfangen
  const b = e.target.closest('[data-rx]'), w = b && b.closest('[data-rxk]'); if(!w) return;
  e.stopPropagation(); e.preventDefault();
  react(w.dataset.rxk, b.dataset.rx, w.dataset.rxo);
}, true);
function rxWhat(k){
  const id = k.slice(3), pre = k.slice(0, 3);
  if(pre === 'sp:'){ const w = WS.spots.find(x => x._id === id); return w ? `deinen Spot „${w.name}“` : 'deinen Spot'; }
  if(pre === 'dr:'){ const d = WS.drives.find(x => x._id === id); return d ? `deine Fahrt „${d.name}“` : 'deine Fahrt'; }
  const rid = id.slice(0, id.lastIndexOf(':'));
  if(pre === 'ru:'){ const r = WS.runs.find(x => x._id === rid); return r ? `deine ${r.from}–${r.to}-Zeit` : 'deine Bestzeit'; }
  const f = WS.efforts.find(x => x._id === rid), c = f && WS.courses.find(x => x._id === f.course);
  return c ? `deine Zeit auf „${c.name}“` : 'deine Rundenzeit';
}
/* News: was in der Gruppe passiert ist */
const feedCat = go => go.startsWith('sp:') ? 'sp' : go.startsWith('dr:') || go.startsWith('ev:') ? 'dr' : 'lb';
function rxGo(k){
  const id = k.slice(3), pre = k.slice(0, 3);
  if(pre === 'sp:' || pre === 'dr:') return k;
  const rid = id.slice(0, id.lastIndexOf(':'));
  if(pre === 'ru:'){ const r = WS.runs.find(x => x._id === rid); return r ? `ru:${r.from}-${r.to}` : 'ru:'; }
  const f = WS.efforts.find(x => x._id === rid); return f ? 'co:' + f.course : 'co:';
}
function feedItems(){
  const out = [], mine = myId(), cut = Date.now() - 30 * 864e5;
  const add = (t, dev, by, ic, html, s, go) => { if(t && t > cut && dev) out.push({t, dev, by, ic, html, s, go, cat:feedCat(go)}); };
  liveFresh().forEach(p => out.push({t:Date.now() + 1, dev:p.id, by:p.by, ic:'🟢', html:`ist gerade <b>live</b> unterwegs${p.v >= 6 ? ` · ${Math.round(p.v)} km/h` : ''}`, s:`ist live${p.v >= 6 ? ` · ${Math.round(p.v)} km/h` : ''}`, go:'lv:' + p.id, cat:'lv', live:true}));
  WS.runs.forEach(r => add(r._t || r.date, r.dev, r.by, '⏱️', `hat eine neue Bestzeit gesetzt: <b>${r.from}–${r.to} km/h in ${fmtS(r.time)}</b>`, `Bestzeit ${r.from}–${r.to} · <b>${fmtS(r.time)}</b>`, `ru:${r.from}-${r.to}`));
  WS.efforts.forEach(f => { const c = WS.courses.find(x => x._id === f.course); if(!c) return;
    const first = WS.efforts.filter(x => x.course === f.course).sort((a, b) => a.time - b.time)[0] === f;
    add(f._t || f.date, f.dev, f.by, first ? '🥇' : '🏁', `hat eine neue Bestzeit auf <b>„${esc(c.name)}“</b> gesetzt: <b>${fmtLap(f.time)}</b>${first ? ' – jetzt Platz 1' : ''}`, `${first ? 'Platz 1' : 'Bestzeit'} ${esc(c.name)} · <b>${fmtLap(f.time)}</b>`, 'co:' + f.course); });
  WS.drives.forEach(d => add(d._t || d.at, d.dev, d.by, '🛣️', `hat eine Fahrt geteilt: <b>„${esc(d.name)}“</b> · ${fmtKmS(d.dist || 0)}`, `Fahrt ${esc(d.name)} · ${fmtKmS(d.dist || 0)}`, 'dr:' + d._id));
  WS.spots.forEach(x => add(x._t || x.at, x.dev, x.by, '📍', `hat einen Spot geteilt: <b>„${esc(x.name)}“</b>`, `Spot ${esc(x.name)}`, 'sp:' + x._id));
  WS.courses.forEach(c => add(c._t || c.at, c.dev, c.by, '🚩', `hat eine Rennstrecke geteilt: <b>„${esc(c.name)}“</b>`, `Rennstrecke ${esc(c.name)}`, 'co:' + c._id));
  WS.reacts.filter(r => r.o === mine && r.dev !== mine).forEach(r => add(r._t || r.at, r.dev, r.by, RX[r.e], `hat auf ${esc(rxWhat(r.k))} mit ${RX[r.e]} reagiert`, `${RX[r.e]} ${esc(rxWhat(r.k))}`, rxGo(r.k)));
  WS.events.forEach(ev => add(ev.created || ev._t, ev.dev, ev.by, '📅', `plant eine Ausfahrt: <b>„${esc(ev.title)}“</b> · ${esc(evWhen(ev.at))}`, `Ausfahrt ${esc(ev.title)} · <b>${esc(evWhen(ev.at))}</b>`, 'ev:' + ev._id));
  WS.rsvps.forEach(r => { const ev = WS.events.find(x => x._id === r.ev); if(ev && ev.dev === mine && r.dev !== mine && r.s === 'yes') add(r._t || r.at, r.dev, r.by, '✅', `ist bei <b>„${esc(ev.title)}“</b> dabei`, `dabei bei ${esc(ev.title)}`, 'ev:' + ev._id); });
  return out.sort((a, b) => (b.live ? 1 : 0) - (a.live ? 1 : 0) || b.t - a.t).slice(0, 80);
}
const feedWho = it => it.dev === myId() ? 'Du' : crewName(it.dev, it.by);
const feedVerb = it => it.dev === myId() ? it.html.replace(/^hat /, 'hast ').replace(/^ist /, 'bist ').replace(/^plant /, 'planst ').replace(/^fährt /, 'fährst ').replace(/^teilt /, 'teilst ').replace(/^sagt /, 'sagst ').replace(/^war /, 'warst ') : it.html;
const possName = n => /[sßxz]$/i.test(n) ? `${n}’` : `${n}s`;   // „Jonas’ Crew“, „Maxis Crew“
const feedText = it => `${feedWho(it)} ${feedVerb(it).replace(/<[^>]+>/g, '')}`;
const isNewFeed = it => !it.live && !!wsShow && it.dev !== myId() && it.t > (wsShow[it.cat] || 0);
function feedDay(it){
  const d0 = new Date(); d0.setHours(0, 0, 0, 0); const today = d0.getTime(), t = it.t;
  if(it.live) return 'Jetzt';
  if(t >= today) return 'Heute';
  if(t >= today - 864e5) return 'Gestern';
  if(t >= weekStart(Date.now())) return 'Diese Woche';
  return 'Früher';
}
function feedTime(it, day){
  if(it.live) return 'live';
  const d = new Date(it.t);
  if(day === 'Heute' || day === 'Gestern') return d.toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'});
  if(day === 'Diese Woche') return d.toLocaleDateString('de-DE', {weekday:'short'});
  return d.toLocaleDateString('de-DE', {day:'numeric', month:'numeric'});
}
function wsFeedHTML(){
  const items = feedItems();
  let html = reviewCardsHTML() + evSecHTML();
  if(!items.length) return html + `<div class="empty"><b>Noch nichts los</b>Hier landen neue Bestzeiten, geteilte Fahrten und Spots und wer gerade live ist.</div>`;
  let day = null;
  html += '<div class="feed">';
  items.forEach(it => {
    const d = feedDay(it);
    if(d !== day){ day = d; html += `<div class="feed-day">${d}</div>`; }
    html += `<button class="feed-row${isNewFeed(it) ? ' new' : ''}${it.live ? ' live' : ''}" data-feed="${esc(it.go)}" title="${esc(feedText(it))}">
      <span class="feed-av">${avHTML(it.dev, it.by, 28)}<i>${it.ic}</i></span>
      <span class="feed-tx"><b>${esc(feedWho(it))}</b> ${it.s}</span><span class="feed-t">${feedTime(it, d)}</span></button>`;
  });
  return html + '</div>';
}
function feedGo(go){
  const [k, ...rest] = go.split(':'), v = rest.join(':');
  if(k === 'lv') return openLiveCard(v);
  if(k === 'ev') return evShow(v);
  if(k === 'dr') return openWsDrive(v);
  if(k === 'sp') return openWsSpot(v);
  if(k === 'ru'){ wsSub = 'lb'; if(v) wsRunKey = v; renderList(); return; }
  if(k === 'co'){ wsSub = 'lb'; if(v) wsOpenCourse = v; renderList(); }
}
function feedNotify(){
  const mine = myId(), since = prefs.feedSeen || prefs.rxSeen;
  const items = feedItems().filter(it => !it.live && it.dev !== mine && it.t > (since || 0));
  prefs.feedSeen = Math.max(Date.now(), ...items.map(i => i.t)); delete prefs.rxSeen; savePrefs();
  const rv = reviewNotice();
  if(rv) return toast(rv);
  if(!since || !items.length) return;
  toast(items.length === 1 ? `${items[0].ic} ${feedText(items[0])}` : `${items.length} Neuigkeiten in deiner Crew – schau in die News`);
}

/* ================= Ausfahrten: Treffpunkt, Uhrzeit, Route – die Crew sagt zu, beim Treffen geht Live an =================
   Liegen als ev_… und rv_… in der Reaktionen-Sammlung (keine neuen Firebase-Regeln nötig; ältere App-Versionen ignorieren sie). */
const EV_PRE = 'ev_', RV_PRE = 'rv_', EV_BEFORE = 30 * 60000, EV_AFTER = 3 * 3600e3;
const isEvDoc = r => r && (r.kind === 'ev' || r.kind === 'rv');
const evList = () => WS.events.filter(e => e.at + EV_AFTER > Date.now()).sort((a, b) => a.at - b.at);
const evRsvps = id => WS.rsvps.filter(r => r.ev === id && r.s);
const evMine = id => (WS.rsvps.find(r => r.ev === id && r.dev === myId()) || {}).s || null;
const evCanDel = ev => ev.dev === myId() || isAdmin();
const pad2 = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
function evX(id){ prefs.evx = prefs.evx || {}; return prefs.evx[id] || (prefs.evx[id] = {}); }
function evWhen(at){
  const d = new Date(at), d0 = new Date(); d0.setHours(0, 0, 0, 0);
  const day = Math.round((new Date(at).setHours(0, 0, 0, 0) - d0.getTime()) / 864e5), hm = d.toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'});
  const dl = day === 0 ? 'Heute' : day === 1 ? 'Morgen' : day > 1 && day < 7 ? d.toLocaleDateString('de-DE', {weekday:'long'}) : d.toLocaleDateString('de-DE', {weekday:'short', day:'numeric', month:'numeric'});
  return `${dl}, ${hm} Uhr`;
}
function evCountdown(at){
  const ms = at - Date.now();
  if(ms <= 0) return Date.now() < at + EV_AFTER ? 'läuft' : 'vorbei';
  const m = Math.ceil(ms / 60000), d0 = new Date(); d0.setHours(0, 0, 0, 0); const d1 = new Date(at); d1.setHours(0, 0, 0, 0);
  const dd = Math.round((d1 - d0) / 864e5);   // Kalendertage, passend zu „Morgen“ / Wochentag
  return m < 60 ? `in ${m} Min` : m < 1440 ? `in ${Math.floor(m / 60)} Std${m % 60 ? ` ${m % 60} Min` : ''}` : `in ${dd} Tag${dd === 1 ? '' : 'en'}`;
}
function evSecHTML(){
  if(!grp()) return '';
  const list = evList();
  if(!list.length) return `<div class="ev-sec"><button class="ev-new" data-ev="new"><span class="ic">📅</span><span class="tx"><b>Ausfahrt planen</b><small>Treffpunkt, Uhrzeit und Route – die Crew sagt zu</small></span><span class="pl">${svg(UI.plus, 16)}</span></button></div>`;
  return `<div class="ev-sec">${list.map(evCardHTML).join('')}<button class="txtbtn ev-more" data-ev="new">${svg(UI.plus, 14)} Weitere Ausfahrt planen</button></div>`;
}
function evCardHTML(ev){
  const id = esc(ev._id), rs = evRsvps(ev._id), yes = rs.filter(r => r.s === 'yes'), maybe = rs.filter(r => r.s === 'maybe'), mine = evMine(ev._id);
  const now = Date.now(), d = new Date(ev.at), soon = now >= ev.at - EV_BEFORE, host = ev.dev === myId() ? 'dir' : esc(crewName(ev.dev, ev.by));
  const pt = (k, icon, label) => { const p = ev[k]; return p ? `<button class="ev-pt" data-ev="${k}" data-id="${id}"><span class="i">${svg(icon, 15, 2)}</span><span class="n"><em>${label}</em> ${esc(p.n)}${k === 'dest' ? ` · ${ev.rt === 'land' ? 'Landstraße' : 'schnellste Route'}` : ''}</span>${me ? `<small>${fmtDist(dist(me, p))}</small>` : ''}</button>` : ''; };
  return `<div class="ev-card${now >= ev.at ? ' now' : ''}" id="ev-${id}">
    <div class="ev-top"><span class="ev-cal"><small>${esc(d.toLocaleDateString('de-DE', {month:'short'}).replace('.', ''))}</small><b>${d.getDate()}</b></span>
      <div class="ev-h"><b>${esc(ev.title)}</b><span>${esc(evWhen(ev.at))} · <em>${evCountdown(ev.at)}</em></span></div></div>
    <div class="ev-pts">${pt('meet', GEO_IC.poi, 'Treffen')}${pt('dest', ICONS.flag, 'Ziel')}</div>
    ${ev.note ? `<div class="ev-note">${esc(ev.note)}</div>` : ''}
    <div class="ev-who">${yes.length ? `<span class="ev-faces">${yes.slice(0, 6).map(r => avHTML(r.dev, r.by, 24)).join('')}</span>` : ''}<span>${yes.length ? `${yes.length} dabei` : 'Noch keine Zusagen'}${maybe.length ? ` · ${maybe.length} vielleicht` : ''} · von ${host}</span></div>
    <div class="seg2 ev-rsvp">${[['yes', 'Bin dabei'], ['maybe', 'Vielleicht'], ['no', 'Kann nicht']].map(([s, n]) => `<button class="${mine === s ? 'on ' + s : ''}" data-ev="rsvp" data-s="${s}" data-id="${id}">${n}</button>`).join('')}</div>
    ${mine === 'yes' ? `<div class="ev-live"><i class="lv-dot on"></i>${soon ? (liveIsOn() ? 'Du bist live' : evX(ev._id).off ? 'Live hast du für diese Ausfahrt ausgemacht' : 'Öffne das Cockpit – Live geht automatisch an') : 'Beim Treffen geht Live im Cockpit automatisch an'}</div>` : ''}
    <div class="ev-acts"><button class="btn sm" data-ev="route" data-id="${id}">${svg(UI.nav, 14)} Zum Treffpunkt</button>${ev.dest ? `<button class="btn sm" data-ev="routeall" data-id="${id}">${svg(ICONS.flag, 14)} Ganze Route</button>` : ''}${ev.dev === myId() ? `<button class="btn sm" data-ev="edit" data-id="${id}">Ändern</button>` : ''}${evCanDel(ev) ? `<button class="btn sm danger" data-ev="del" data-id="${id}">${ev.dev === myId() ? 'Absagen' : 'Entfernen'}</button>` : ''}</div>
  </div>`;
}
function evShow(id){
  wsSub = 'feed'; renderList();
  setTimeout(() => { const el = document.getElementById('ev-' + id); if(!el) return; el.scrollIntoView({block:'center', behavior:'smooth'}); el.classList.add('flash'); setTimeout(() => el.classList.remove('flash'), 1600); }, 60);
}
function evRefresh(){ if(inWsView() && view === 'list') renderList(); }
async function evAct(b){
  const a = b.dataset.ev, id = b.dataset.id, ev = WS.events.find(x => x._id === id);
  if(a === 'new'){ if(evDraft && evDraft.id) evDraft = null; return openEvDlg(); }
  if(!ev) return;
  if(a === 'rsvp') return evRsvp(ev, b.dataset.s);
  if(a === 'meet' || a === 'dest'){ const p = ev[a]; openPlace({name:p.n, sub:`${a === 'meet' ? 'Treffpunkt' : 'Ziel'} · ${ev.title} · ${evWhen(ev.at)}`, lat:p.lat, lng:p.lng, type:'other', noRecent:true, back:'Crew'}); return; }
  if(a === 'route') return planNav(ev.meet, ev.meet.n, null);
  if(a === 'routeall') return planNav(ev.dest, ev.dest.n, null, {stops:[{lat:ev.meet.lat, lng:ev.meet.lng, name:ev.meet.n, kind:'place'}], mode:ev.rt});
  if(a === 'edit') return openEvDlg(id);
  if(a === 'del'){
    const lbl = b.textContent;
    if(!b.classList.contains('armed')){ b.classList.add('armed'); b.textContent = 'Wirklich?'; setTimeout(() => { if(b.isConnected){ b.classList.remove('armed'); b.textContent = lbl; } }, 3500); return; }
    return evDelete(id);
  }
}
async function evRsvp(ev, s, quiet){
  if(!needGroup(() => evRsvp(ev, s, quiet))) return;
  const rid = `${RV_PRE}${ev._id}_${myId()}`, before = WS.rsvps.slice(), o = {kind:'rv', ev:ev._id, s, by:myName(), dev:myId(), at:Date.now()};
  wsUpsert(WS.rsvps, {...o, _id:rid, _t:o.at}); evRefresh();
  try{ await fsPut('reactions', rid, o); }
  catch(e){ WS.rsvps = before; evRefresh(); toast('Zusage hat nicht geklappt. Prüfe dein Internet.'); return; }
  wsCache();
  if(s === 'yes'){
    const x = evX(ev._id), act = evActive(), soon = !!act && act._id === ev._id; delete x.off;
    if(soon && !ckOn) x.h = 1;   // der Hinweis steckt schon im Toast
    savePrefs();
    if(!quiet) toast(soon && !ckOn ? 'Du bist dabei – öffne zum Treffen das Cockpit, dann geht Live automatisch an' : 'Du bist dabei – beim Treffen geht Live im Cockpit automatisch an');
    evLiveCheck();
  }
}
async function evDelete(id, quiet){
  const rs = WS.rsvps.filter(r => r.ev === id);
  try{ await fsDel('reactions', id); }catch(e){ if(!quiet) toast('Ging gerade nicht. Prüfe dein Internet.'); return; }
  rs.forEach(r => fsDel('reactions', r._id).catch(() => {}));
  WS.events = WS.events.filter(e => e._id !== id); WS.rsvps = WS.rsvps.filter(r => r.ev !== id); wsCache();
  if(!quiet){ toast('Ausfahrt ist abgesagt'); evRefresh(); }
}
// nach dem Abgleich: alte eigene Ausfahrten wegräumen, gemerkte Hinweise ausdünnen
function evTidy(){
  WS.events.filter(e => e.dev === myId() && e.at < Date.now() - 7 * 864e5).forEach(e => evDelete(e._id, true));
  if(prefs.evx){ let ch = false; Object.keys(prefs.evx).forEach(k => { if(!WS.events.some(e => e._id === k)){ delete prefs.evx[k]; ch = true; } }); if(ch) savePrefs(); }
}
// Live beim Treffen: wer zugesagt hat, ist ab 30 Min vorher bis 3 Std danach im Cockpit automatisch live
const evTried = new Set();
const liveIsOn = () => { try{ return live.on; }catch(e){ return false; } };   // live ist weiter unten deklariert
function evActive(){
  if(!grp()) return null;
  const now = Date.now();
  return WS.events.filter(e => evMine(e._id) === 'yes' && now >= e.at - EV_BEFORE && now <= e.at + EV_AFTER).sort((a, b) => a.at - b.at)[0] || null;
}
function evLiveCheck(){
  const ev = evActive(); if(!ev) return;
  const x = evX(ev._id);
  if(!ckOn){
    if(!x.h && !document.hidden){ x.h = 1; savePrefs(); toast(`📅 „${ev.title}“ ${Date.now() < ev.at ? evCountdown(ev.at) : 'läuft'} – öffne das Cockpit, dann geht Live automatisch an`); }
    return;
  }
  if(live.on || x.off || evTried.has(ev._id)) return;
  evTried.add(ev._id); liveStart({ev});
}
every(() => evLiveCheck(), 30000);

/* Ausfahrt anlegen / ändern */
let evDraft = null;
function evChoices(){
  const out = [], seen = new Set(), key = s => normName(s.name) + '|' + Math.round(s.lat * 1e3) + '|' + Math.round(s.lng * 1e3);
  data.spots.forEach(s => { if(s.lat == null) return; out.push({k:'m:' + s.id, n:s.name || 'Spot', lat:s.lat, lng:s.lng, g:'Meine Spots'}); seen.add(key(s)); });
  WS.spots.forEach(s => { if(s.lat == null || seen.has(key(s))) return; out.push({k:'w:' + s._id, n:s.name || 'Spot', lat:s.lat, lng:s.lng, g:'Crew-Spots'}); });
  return me ? out.sort((a, b) => dist(me, a) - dist(me, b)) : out.sort((a, b) => a.n.localeCompare(b.n, 'de'));
}
function openEvDlg(edit){
  if(!needGroup(() => openEvDlg(edit))) return;
  if(edit){ const ev = WS.events.find(x => x._id === edit); if(ev){ const d = new Date(ev.at); evDraft = {id:ev._id, created:ev.created, title:ev.title, date:ymd(d), time:`${pad2(d.getHours())}:${pad2(d.getMinutes())}`, meet:{...ev.meet}, dest:ev.dest ? {...ev.dest} : null, rt:ev.rt || 'fast', note:ev.note || ''}; } }
  if(!evDraft){ const d = new Date(); if(d.getHours() >= 17) d.setDate(d.getDate() + 1); evDraft = {title:'', date:ymd(d), time:'19:00', meet:null, dest:null, rt:prefs.navMode === 'land' ? 'land' : 'fast', note:''}; }
  const e = evDraft, ch = evChoices(), keep = $('#modal .ev-dlg .pad'), st = keep ? keep.scrollTop : 0;
  const opts = () => ['Meine Spots', 'Crew-Spots'].map(g => { const l = ch.filter(c => c.g === g); return l.length ? `<optgroup label="${g}">${l.map(c => `<option value="${esc(c.k)}">${esc(c.n)}${me ? ' · ' + fmtDist(dist(me, c)) : ''}</option>`).join('')}</optgroup>` : ''; }).join('');
  const pt = (k, label) => { const p = e[k];
    if(p) return `<div class="ev-set"><span class="i">${svg(k === 'meet' ? GEO_IC.poi : ICONS.flag, 16, 2)}</span><input class="inp" data-evf="${k}N" value="${esc(p.n)}" maxlength="60" aria-label="${label}"><button class="ev-x" data-evd="${k}x" aria-label="${label} entfernen">${svg(UI.close, 12)}</button></div>${me ? `<small class="ev-sub">${fmtDist(dist(me, p))} von dir</small>` : ''}`;
    return `<div class="ev-pick">${ch.length ? `<select class="inp" data-evsel="${k}" aria-label="${label}: Spot wählen"><option value="">Spot wählen …</option>${opts()}</select>` : ''}<button class="btn" data-evd="${k}map">${svg(GEO_IC.coord, 15, 2)} Auf der Karte</button></div>`; };
  $('#modal').innerHTML = `<div class="dlg ev-dlg" role="dialog" aria-modal="true" aria-label="Ausfahrt planen">
    <div class="top" style="padding:12px 14px"><button class="txtbtn" data-evd="cancel">Abbrechen</button><strong style="font-size:17px">${e.id ? 'Ausfahrt ändern' : 'Ausfahrt planen'}</strong><button class="txtbtn bold" data-evd="save">${e.id ? 'Sichern' : 'Posten'}</button></div>
    <div class="pad" style="padding-top:2px;gap:12px">
      <label class="f">Name<input class="inp" data-evf="title" value="${esc(e.title)}" maxlength="50" placeholder="z. B. Sonntagsrunde Spessart"></label>
      <div class="g2"><label class="f">Tag<input class="inp" type="date" data-evf="date" value="${esc(e.date)}" min="${ymd(new Date())}"></label><label class="f">Uhrzeit<input class="inp" type="time" data-evf="time" value="${esc(e.time)}" step="300"></label></div>
      <div class="set-sec">Treffpunkt</div>
      ${pt('meet', 'Treffpunkt')}
      <div class="set-sec">Ziel <span class="ev-opt">optional</span></div>
      ${pt('dest', 'Ziel')}
      ${e.dest ? `<div class="set-sec">Route vom Treffpunkt</div><div class="seg2">${[['fast', 'Schnellste'], ['land', 'Landstraße ohne Autobahn']].map(([k, n]) => `<button class="${e.rt === k ? 'on' : ''}" data-evd="rt" data-v="${k}">${n}</button>`).join('')}</div>` : ''}
      <label class="f">Info für die Crew<textarea class="inp" data-evf="note" rows="2" maxlength="300" placeholder="z. B. Vollgetankt kommen, danach gibt’s Essen">${esc(e.note)}</textarea></label>
      <div class="muted ev-hint">Wer zusagt, ist beim Treffen im Cockpit automatisch live – ab 30 Minuten vorher bis 3 Stunden danach. Treffpunkt und Ziel sieht nur die Crew.</div>
      <div class="err" id="ev-err"></div>
    </div></div>`;
  $('#modal').hidden = false;
  if(st) $('#modal .ev-dlg .pad').scrollTop = st;
}
function evSync(){
  const m = $('#modal'); if(!evDraft || !m.querySelector('.ev-dlg')) return;
  m.querySelectorAll('[data-evf]').forEach(i => { const k = i.dataset.evf; if(k === 'meetN' || k === 'destN'){ const p = evDraft[k.slice(0, -1)]; if(p) p.n = i.value; } else evDraft[k] = i.value; });
}
async function evRevName(p){
  try{
    const j = await (await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=17&accept-language=de&lat=${p.lat.toFixed(5)}&lon=${p.lng.toFixed(5)}`)).json(), ad = j.address || {};
    return [j.name || ad.road || '', ad.city || ad.town || ad.village || ad.municipality || ''].filter(Boolean).join(', ') || null;
  }catch(e){ return null; }
}
function evPicked(k, p){
  if(!evDraft) return;
  const def = k === 'meet' ? 'Treffpunkt' : 'Ziel', pt = {lat:p.lat, lng:p.lng, n:def};
  evDraft[k] = pt; show('list', 'half'); openEvDlg();
  evRevName(p).then(n => {
    if(!n || !evDraft || evDraft[k] !== pt || pt.n !== def) return;
    pt.n = n; const i = $(`#modal .ev-dlg [data-evf="${k}N"]`); if(i && i.value === def) i.value = n;
  });
}
async function evSave(b){
  evSync();
  const e = evDraft, err = m => { const x = $('#ev-err'); if(x) x.textContent = m; };
  if(!e.title.trim()) return err('Gib der Ausfahrt einen Namen.');
  const at = new Date(`${e.date}T${e.time || '19:00'}`).getTime();
  if(!e.date || isNaN(at)) return err('Tag und Uhrzeit fehlen.');
  const orig = e.id ? (WS.events || []).find(x => x.id === e.id || x._id === e.id) : null;
  if(at < Date.now() - 15 * 60000 && (!orig || +orig.at !== at)) return err('Der Zeitpunkt liegt in der Vergangenheit.');
  if(at > Date.now() + 120 * 864e5) return err('Höchstens vier Monate im Voraus.');
  if(!e.meet) return err('Wähle einen Treffpunkt.');
  const P = p => p ? {lat:+p.lat.toFixed(5), lng:+p.lng.toFixed(5), n:(p.n || '').trim().slice(0, 60) || 'Treffpunkt'} : null;
  const id = e.id || EV_PRE + uid() + uid(), doc = {kind:'ev', title:e.title.trim().slice(0, 50), at, meet:P(e.meet), dest:P(e.dest), rt:e.rt === 'land' ? 'land' : 'fast', note:(e.note || '').trim().slice(0, 300), by:myName(), dev:myId(), created:e.created || Date.now()};
  if(doc.dest && doc.dest.n === 'Treffpunkt') doc.dest.n = 'Ziel';
  b.disabled = true; err('');
  try{ await fsPut('reactions', id, doc); }
  catch(x){ b.disabled = false; return err('Ging gerade nicht. Prüfe dein Internet.'); }
  wsUpsert(WS.events, {...doc, _id:id, _t:Date.now()}); wsCache();
  const isNew = !e.id; evDraft = null; $('#modal').hidden = true;
  if(isNew) await evRsvp({...doc, _id:id}, 'yes', true);
  toast(isNew ? 'Ausfahrt ist in der Crew – du bist dabei' : 'Ausfahrt geändert');
  evShow(id);
}
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-evd]'); if(!b || !$('#modal .ev-dlg')) return;
  const a = b.dataset.evd; evSync();
  if(a === 'cancel'){ evDraft = null; $('#modal').hidden = true; return; }
  if(a === 'save') return evSave(b);
  if(a === 'meetx' || a === 'destx'){ evDraft[a.slice(0, -1)] = null; return openEvDlg(); }
  if(a === 'meetmap' || a === 'destmap'){ $('#modal').hidden = true; enterMode('ev-' + a.slice(0, -3)); return; }
  if(a === 'rt'){ evDraft.rt = b.dataset.v; return openEvDlg(); }
});
$('#modal').addEventListener('change', e => {
  const s = e.target.closest('[data-evsel]'); if(!s || !evDraft || !s.value) return;
  evSync(); const c = evChoices().find(x => x.k === s.value); if(!c) return;
  evDraft[s.dataset.evsel] = {lat:c.lat, lng:c.lng, n:c.n}; openEvDlg();
});

/* Wochen- und Monatsrückblick mit Awards */
function isoWeek(ts){ const d = new Date(ts); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7); const w1 = new Date(d.getFullYear(), 0, 4); return 1 + Math.round(((d - w1) / 864e5 - 3 + (w1.getDay() + 6) % 7) / 7); }
function revPeriod(kind, back){
  if(kind === 'w'){ const s = weekStart(Date.now() - back * 7 * 864e5), e = weekStart(s + 8 * 864e5); return {kind, back, s, e, now:back === 0, title:`KW ${isoWeek(s)}`, sub:`${new Date(s).toLocaleDateString('de-DE', {day:'numeric', month:'short'})} – ${new Date(e - 1).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}`}; }
  const d = new Date(), s = new Date(d.getFullYear(), d.getMonth() - back, 1).getTime(), e = new Date(d.getFullYear(), d.getMonth() - back + 1, 1).getTime();
  return {kind, back, s, e, now:back === 0, title:new Date(s).toLocaleDateString('de-DE', {month:'long'}), sub:String(new Date(s).getFullYear())};
}
function memPeriod(st, P){
  const arr = st && (P.kind === 'w' ? st.wk : st.mo); if(!arr || !arr.length) return null;
  const x = arr.find(a => a[0] === P.s);
  if(!x) return P.s >= arr[0][0] && P.s <= arr[arr.length - 1][0] ? {km:0, n:0, top:0, m:0, r:null} : null;
  return {km:x[1] || 0, n:x[2] ?? null, top:x[3] ?? null, m:x[4] ?? null, r:x[5] ?? null};
}
function reviewData(P){
  const inP = t => t >= P.s && t < P.e;
  const mem = crewList().map(m => ({...m, p:memPeriod(m.st, P)}));
  const bests = [...WS.runs.filter(r => inP(r.date)).map(r => ({dev:r.dev, by:r.by, txt:`${r.from}–${r.to} km/h in ${fmtS(r.time)}`, t:r.date})),
    ...WS.efforts.filter(f => inP(f.date)).map(f => { const c = WS.courses.find(x => x._id === f.course); return c ? {dev:f.dev, by:f.by, txt:`„${c.name}“ in ${fmtLap(f.time)}`, t:f.date} : null; }).filter(Boolean)].sort((a, b) => b.t - a.t);
  const spots = WS.spots.filter(x => inP(x.at)), drives = WS.drives.filter(d => inP(d.created || d.at)), likes = WS.reacts.filter(r => inP(r.at) && r.o && r.o !== r.dev);
  const tot = {km:0, n:0, m:0}; mem.forEach(m => { if(m.p){ tot.km += m.p.km || 0; tot.n += m.p.n || 0; tot.m += m.p.m || 0; } });
  const count = (arr, key) => { const c = new Map(); arr.forEach(x => c.set(x[key], (c.get(x[key]) || 0) + 1)); return [...c].sort((a, b) => b[1] - a[1])[0] || null; };
  const awards = [], pl = (n, a, b) => `${n} ${n === 1 ? a : b}`;
  const kmW = mem.filter(m => m.p && m.p.km >= 1).sort((a, b) => b.p.km - a.p.km)[0];
  const kmTxt = k => k >= 100 ? Math.round(k).toLocaleString('de-DE') : k.toFixed(1).replace('.', ',');
  if(kmW) awards.push({k:'km', ic:'🛣️', t:'Kilometerfresser', dev:kmW.dev, v:`${kmTxt(kmW.p.km)} km`});
  const bw = count(bests, 'dev'); if(bw) awards.push({k:'best', ic:'⏱️', t:'Bestzeiten-Jäger', dev:bw[0], v:pl(bw[1], 'neue Bestzeit', 'neue Bestzeiten')});
  const sw = count(spots, 'dev'); if(sw) awards.push({k:'spot', ic:'📍', t:'Entdecker', dev:sw[0], v:pl(sw[1], 'Spot geteilt', 'Spots geteilt')});
  const lw = count(likes, 'o'); if(lw) awards.push({k:'like', ic:'🔥', t:'Crew-Liebling', dev:lw[0], v:pl(lw[1], 'Reaktion bekommen', 'Reaktionen bekommen')});
  const calm = mem.filter(m => m.p && m.p.r != null && m.p.n >= 2).sort((a, b) => a.p.r - b.p.r);
  if(calm.length >= 2) awards.push({k:'calm', ic:'🧘', t:'Ruhigste Hand', dev:calm[0].dev, v:`Ø Risk ${calm[0].p.r} – am entspanntesten gefahren`});
  const timeW = mem.filter(m => m.p && m.p.m >= 30).sort((a, b) => b.p.m - a.p.m)[0];
  if(timeW && timeW.dev !== (kmW && kmW.dev)) awards.push({k:'time', ic:'⏳', t:'Dauergast', dev:timeW.dev, v:`${timeW.p.m >= 60 ? `${Math.floor(timeW.p.m / 60)} h ${Math.round(timeW.p.m % 60)} min` : `${Math.round(timeW.p.m)} min`} unterwegs`});
  // Wall of Almost: geteilte Fahrten ab Risk 70 – nach Datum, nicht nach Score, kein Preis
  const almost = drives.filter(d => typeof d.risk === 'number' && d.risk >= 70).sort((a, b) => (b.created || b.at || 0) - (a.created || a.at || 0));
  return {P, mem, bests, spots, drives, likes, tot, awards, almost};
}
let rvKind = 'w', rvBack = 1;
function openReview(kind, back){
  rvKind = kind || 'w'; rvBack = back == null ? 1 : back;
  const P = revPeriod(rvKind, 1); prefs[rvKind === 'w' ? 'rvSeenW' : 'rvSeenM'] = P.s; savePrefs();
  $('#review').hidden = false; $('#review').scrollTop = 0; renderReview();
  if(inWsView() && view === 'list') renderList();
}
function renderReview(){
  const P = revPeriod(rvKind, rvBack), R = reviewData(P), nm = d => esc(crewName(d, (R.mem.find(m => m.dev === d) || {}).name));
  const ranked = R.mem.filter(m => m.p && m.p.km > 0).sort((a, b) => b.p.km - a.p.km), mx = Math.max(1, ...ranked.map(m => m.p.km));
  const empty = !R.tot.km && !R.bests.length && !R.spots.length && !R.drives.length;
  $('#rvBody').innerHTML = `
    <div class="rv-bar"><div class="rv-seg"><button data-rv="w" class="${rvKind === 'w' ? 'on' : ''}">Woche</button><button data-rv="m" class="${rvKind === 'm' ? 'on' : ''}">Monat</button></div><button class="dl-x" data-rv="close" aria-label="Schließen">${svg(UI.close, 15)}</button></div>
    <header class="rv-head"><span class="rv-k">${rvKind === 'w' ? 'Wochenrückblick' : 'Monatsauszeichnungen'} · ${esc(grp() ? grp().name : '')}</span><h1>${esc(P.title)}</h1>
      <div class="rv-nav"><button data-rv="prev" aria-label="Davor" ${rvBack >= (rvKind === 'w' ? 7 : 2) ? 'disabled' : ''}>${svg(UI.back, 15)}</button><span>${esc(P.sub)}${P.now ? ' · läuft noch' : ''}</span><button data-rv="next" aria-label="Danach" ${rvBack <= 0 ? 'disabled' : ''}>${svg(UI.back, 15).replace('<svg', '<svg style="transform:scaleX(-1)"')}</button></div></header>
    <div class="rv-hero"><div><b>${Math.round(R.tot.km).toLocaleString('de-DE')}</b><span>km zusammen</span></div><div><b>${R.tot.n}</b><span>Fahrten</span></div><div><b>${R.tot.m >= 60 ? Math.round(R.tot.m / 60) + ' h' : Math.round(R.tot.m) + ' min'}</b><span>unterwegs</span></div></div>
    ${empty ? `<div class="rv-empty"><b>${P.now ? 'Noch nichts passiert' : 'Ruhige Zeit'}</b>In diesem Zeitraum hat niemand Kilometer, Bestzeiten oder Spots geteilt.</div>` : ''}
    ${R.awards.length ? `<div class="rv-sec">${rvKind === 'w' ? 'Auszeichnungen der Woche' : 'Auszeichnungen des Monats'}${P.now ? ' (Stand jetzt)' : ''}</div>
      <div class="rv-awards">${R.awards.map((a, i) => `<button class="rv-aw${i === 0 ? ' big' : ''}" data-crewrv="${esc(a.dev)}"><span class="rv-ic">${a.ic}</span><span class="rv-at">${esc(a.t)}</span><span class="rv-who">${avHTML(a.dev, '', i === 0 ? 34 : 26)}<b>${nm(a.dev)}</b></span><span class="rv-v">${esc(a.v)}</span></button>`).join('')}</div>` : ''}
    ${ranked.length ? `<div class="rv-sec">Kilometer</div><div class="rv-km">${ranked.map((m, i) => `<div class="rv-row"><span class="rv-rk">${i + 1}</span>${avHTML(m.dev, m.name, 30)}<span class="rv-main"><b>${nm(m.dev)}</b><i style="width:${Math.max(3, m.p.km / mx * 100).toFixed(1)}%"></i></span><span class="rv-n">${m.p.km >= 100 ? Math.round(m.p.km).toLocaleString('de-DE') : m.p.km.toFixed(1).replace('.', ',')} km${m.p.n ? `<small>${m.p.n} Fahrt${m.p.n > 1 ? 'en' : ''}</small>` : ''}</span></div>`).join('')}</div>` : ''}
    ${R.bests.length ? `<div class="rv-sec">Neue Bestzeiten</div><div class="rv-list">${R.bests.slice(0, 12).map(b => `<div class="rv-li">${avHTML(b.dev, b.by, 26)}<span><b>${nm(b.dev)}</b> ${esc(b.txt)}</span></div>`).join('')}</div>` : ''}
    <div class="rv-sec woa-t">Wall of Almost</div>
    <div class="woa">${R.almost.length ? `<div class="woa-head"><b>${R.almost.length}</b><span>${R.almost.length === 1 ? 'Fahrt' : 'Fahrten'} ${P.now ? (rvKind === 'w' ? 'diese Woche' : 'diesen Monat') : 'in ' + esc(P.title)}, die richtig hätten schiefgehen können</span></div>
      ${R.almost.map(d => { const lv = riskLevel(d.risk); return `<button class="woa-row" data-woa="${esc(d._id)}">${avHTML(d.dev, d.by, 34)}<span class="woa-tx"><b>${nm(d.dev)}</b><span>${esc(placeTxt(d) || d.name)} · ${new Date(d.created || d.at).toLocaleDateString('de-DE', {weekday:'short', day:'numeric', month:'numeric'})}</span></span><span class="woa-rk" style="--lv:${lv.col}"><b>${d.risk}</b><small>${lv.name}</small></span></button>`; }).join('')}`
      : `<div class="woa-empty"><b>Niemand auf der Warnwand.</b>Genau so soll es sein.</div>`}
      <p class="woa-foot">Kein Preis, sondern eine Warnung: Wer hier steht, hatte Glück. Zählt nur Fahrten, die in der Crew geteilt sind, ab Risk 70.</p></div>
    ${R.spots.length || R.drives.length || R.likes.length ? `<div class="rv-sec">Geteilt</div><div class="rv-chips">${R.drives.length ? `<span>🛣️ ${R.drives.length} Fahrt${R.drives.length > 1 ? 'en' : ''}</span>` : ''}${R.spots.length ? `<span>📍 ${R.spots.length} Spot${R.spots.length > 1 ? 's' : ''}</span>` : ''}${R.likes.length ? `<span>🔥 ${R.likes.length} Reaktion${R.likes.length > 1 ? 'en' : ''}</span>` : ''}</div>` : ''}
    <p class="rv-foot">Zählt nur, was in der Crew geteilt ist: Kilometer pro Woche (Einstellungen › Crew), Bestzeiten, Spots und Fahrten. Wer eine ältere App-Version hat, fehlt bei Fahrten und Awards.</p>`;
}
$('#review').addEventListener('click', e => {
  const b = e.target.closest('[data-rv], [data-crewrv], [data-woa]'); if(!b) return;
  if(b.dataset.woa){ $('#review').hidden = true; openWsDrive(b.dataset.woa); return; }
  if(b.dataset.crewrv){ $('#review').hidden = true; openCrew(b.dataset.crewrv); return; }
  const a = b.dataset.rv;
  if(a === 'close'){ $('#review').hidden = true; return; }
  if(a === 'w' || a === 'm'){ rvKind = a; rvBack = 1; }
  if(a === 'prev') rvBack++;
  if(a === 'next') rvBack = Math.max(0, rvBack - 1);
  renderReview(); $('#review').scrollTop = 0;
});
function reviewCardsHTML(){
  if(!grp()) return '';
  const W = revPeriod('w', 1), M = revPeriod('m', 1), rw = reviewData(W), rm = reviewData(M);
  const nw = prefs.rvSeenW !== W.s && (rw.tot.km || rw.bests.length), nm = prefs.rvSeenM !== M.s && rm.awards.length;
  return `<div class="rv-cards"><button class="rv-card w" data-rvopen="w"><span class="ic">📊</span><span class="tx"><b>${W.title}</b><small>Rückblick · ${Math.round(rw.tot.km)} km</small></span>${nw ? '<i class="nwd"></i>' : ''}</button>
    <button class="rv-card m" data-rvopen="m"><span class="ic">🏆</span><span class="tx"><b>${esc(M.title)}</b><small>Auszeichnungen & Warnwand</small></span>${nm ? '<i class="nwd"></i>' : ''}</button></div>`;
}
function reviewNotice(){
  if(!grp()) return null;
  const W = revPeriod('w', 1), M = revPeriod('m', 1);
  if(prefs.rvNoteM !== M.s){ const first = prefs.rvNoteM == null; prefs.rvNoteM = M.s; savePrefs(); const r = reviewData(M); if(!first && r.awards.length) return `🏆 Die Monatsauszeichnungen für ${M.title} sind da – schau in die News`; }
  if(prefs.rvNoteW !== W.s){ const first = prefs.rvNoteW == null; prefs.rvNoteW = W.s; savePrefs(); const r = reviewData(W); if(!first && (r.tot.km || r.bests.length)) return `📊 Dein Wochenrückblick für ${W.title} ist da – schau in die News`; }
  return null;
}
function trophiesOf(dev){
  const out = [];
  [['m', 1], ['m', 2], ['w', 1], ['w', 2], ['w', 3], ['w', 4]].forEach(([k, b]) => { const P = revPeriod(k, b); reviewData(P).awards.filter(a => a.dev === dev).forEach(a => out.push({...a, when:k === 'm' ? P.title : P.title})); });
  return out;
}

function rxNotify(){
  const mine = myId(), since = prefs.rxSeen;
  const fresh = WS.reacts.filter(r => r.o === mine && r.dev !== mine && (r._t || 0) > (since || 0));
  prefs.rxSeen = Math.max(Date.now(), ...fresh.map(r => r._t || 0)); savePrefs();
  if(!since || !fresh.length) return;
  if(fresh.length === 1){ const r = fresh[0]; toast(`${RX[r.e]} ${r.by} hat auf ${rxWhat(r.k)} reagiert`); }
  else toast(`${fresh.length} neue Reaktionen auf deine Sachen`);
}

/* Fahrten teilen und ansehen */
function trimSegs(segs, m){   // Start und Ziel kürzen, damit z. B. die Haustür nicht sichtbar ist
  const pts = []; let D = 0, prev = null;
  segs.forEach((sg, si) => sg.forEach(q => { if(prev) D += dist({lat:prev[1], lng:prev[0]}, {lat:q[1], lng:q[0]}); pts.push({q, si, d:D}); prev = q; }));
  if(D < 3 * m) return null;
  const out = [];
  pts.forEach(p => { if(p.d < m || p.d > D - m) return; (out[p.si] || (out[p.si] = [])).push(p.q); });
  return out.filter(sg => sg && sg.length > 1);
}
async function wsUploadDrive(t){
  if(!needGroup(() => wsUploadDrive(t))) return;
  if(WS.rulesOld){ toast('Teilen von Fahrten geht in dieser Crew gerade nicht.'); return; }
  const segs = trimSegs(t.segs, 250);
  if(!segs || !segs.length){ toast('Die Fahrt ist zu kurz zum Teilen.'); return; }
  toast('Fahrt wird geteilt …');
  try{
    if(!t.place) await fetchPlace(t).catch(() => {});
    const r = trackRisk(t);
    let g = null;
    if(t.g){
      const flat = segs.flat(), near = ll => ll && flat.some(q => dist({lat:q[1], lng:q[0]}, {lat:ll[1], lng:ll[0]}) < 40);
      g = {};
      if(t.g.lat && near(t.g.latAt)){ g.lat = t.g.lat; g.latAt = t.g.latAt; }
      if(t.g.brake && near(t.g.brakeAt)){ g.brake = t.g.brake; g.brakeAt = t.g.brakeAt; }
      if(t.g.acc && near(t.g.accAt)){ g.acc = t.g.acc; g.accAt = t.g.accAt; }
      if(!Object.keys(g).length) g = null;
    }
    const obj = {name:t.name, created:t.created, dist:t.dist, dur:t.dur, maxSpd:t.maxSpd, segs, g, place:t.place || null, by:myName(), dev:myId(), at:Date.now()};
    while(JSON.stringify(obj).length > 850000) obj.segs = obj.segs.map(sg => sg.filter((_, i) => i % 2 === 0 || i === sg.length - 1));
    if(r) obj.risk = {score:r.score, why:r.why.slice(0, 4).map(x => x.t)};
    const meta = {name:t.name, created:t.created, dist:t.dist, dur:t.dur, maxSpd:t.maxSpd, place:t.place || null, risk:r ? r.score : null, by:myName(), dev:myId(), at:obj.at};
    const docId = `${myId()}_${t.id}`;
    await fsPut('drives', docId, obj, meta);
    t.ws = docId; saveTracks(); wsUpsert(WS.drives, {...meta, _id:docId}); wsTrackObjs.delete(docId); wsCache();
    toast(`„${t.name}“ ist in der Crew – Start und Ziel sind um 250 m gekürzt`);
    if(view === 'track') renderTrackView();
  }catch(e){ toast(/403/.test(e.message) ? 'Teilen geht in dieser Crew gerade nicht.' : 'Teilen hat nicht geklappt. Prüfe dein Internet.'); }
}
async function wsRemoveDrive(t){
  try{
    await fsDel('drives', t.ws);
    WS.drives = WS.drives.filter(x => x._id !== t.ws); wsTrackObjs.delete(t.ws); delete t.ws; saveTracks(); wsCache();
    toast('Fahrt aus der Crew genommen');
    if(view === 'track') renderTrackView();
  }catch(e){ toast('Entfernen hat nicht geklappt. Prüfe dein Internet.'); }
}
function wsDrivesHTML(){
  const list = WS.drives.slice().sort((a, b) => (b.created || b.at || 0) - (a.created || a.at || 0));
  if(!list.length) return `<div class="empty"><b>Noch keine Fahrten geteilt</b>Öffne unter „Fahrten“ eine deiner Fahrten und tippe auf „Fahrt in die Crew teilen“. Start und Ziel werden dabei um 250 m gekürzt.</div>`;
  return list.map(d => `<button class="item ws-drive" data-wsdrv="${esc(d._id)}">${avHTML(d.dev, d.by, 40)}
      <span class="tx"><span class="t">${esc(d.name)}${isNewIn('dr', d) ? '<i class="nw-tag">Neu</i>' : ''}</span>
        <span class="s">${d.dev === myId() ? 'Du' : esc(d.by || '?')}${placeTxt(d) ? ' · ' + esc(placeTxt(d)) : ''}</span>
        <span class="s">${fmtKmS(d.dist || 0)} · ${Math.round((d.maxSpd || 0) * 3.6)} km/h top · ${fmtDate(d.created || d.at)}</span>${rxHTML('dr:' + d._id, d.dev, 'row')}</span>
      ${d.risk != null ? `<span class="rk-pill" style="--lv:${riskLevel(d.risk).col}">${d.risk}</span>` : ''}</button>`).join('');
}
async function openWsDrive(id){
  const d = WS.drives.find(x => x._id === id); if(!d) return;
  if(!wsTrackObjs.has(id)){
    toast('Fahrt wird geladen …');
    try{
      const f = await fsGet('drives', id);
      wsTrackObjs.set(id, {id:'ws:' + id, name:f.name, created:f.created, dist:f.dist, dur:f.dur, maxSpd:f.maxSpd, segs:f.segs || [], g:f.g || null, place:f.place || null,
        _ws:{dev:f.dev, by:f.by, docId:id, risk:f.risk && typeof f.risk.score === 'number' ? f.risk : (typeof d.risk === 'number' ? {score:d.risk, why:[]} : null)}});
    }catch(e){ toast('Fahrt konnte nicht geladen werden. Prüfe dein Internet.'); return; }
    hideToast();
  }
  const t = wsTrackObjs.get(id);
  selTrack = t.id; trackRenaming = false; trackDelArmed = false; tvSel = -1; tvCmp = null;
  renderTrackView(); show('track', mobile() && snap === 'full' ? 'full' : 'half');
  fitTrack(t.segs);
}

/* Workshop-Spot ansehen */
function openWsSpot(id){
  const w = WS.spots.find(x => x._id === id); if(!w) return;
  wsSel = id; wsDelArmed = false; renderWsDetail(); show('ws', mobile() && snap === 'full' ? 'full' : 'half');
  map.flyTo({center:[w.lng, w.lat], zoom:Math.max(map.getZoom(), 14), padding:camPad(), duration:900});
  renderWsMarkers();
}
function renderWsDetail(){
  const w = WS.spots.find(x => x._id === wsSel), el = $('#wsView');
  if(!w){ el.innerHTML = `<div class="top"><button class="txtbtn" data-wsd="back">${svg(UI.back, 14)} Crew</button></div><div class="pad"><div class="muted">Dieser Spot ist nicht mehr im Workshop.</div></div>`; return; }
  const saved = wsSavedAs(w), mine = w.dev === myId(), col = (w.cat && w.cat.color) || '#868e96';
  const park = w.walk && w.parking ? `<div class="card"><div class="h"><span class="pmark">P</span>Parkplatz</div><div class="stats"><div><b>${fmtDist(dist(w.parking, w))}</b><span>Luftlinie</span></div><div><b>ca. ${fmtMin(walkMin(dist(w.parking, w)))}</b><span>zu Fuß</span></div></div>${w.parking.note ? `<div>${esc(w.parking.note)}</div>` : ''}</div>` : '';
  el.innerHTML = `<div class="top"><button class="txtbtn" data-wsd="back">${svg(UI.back, 14)} ${tab === 'crew' ? 'Crew' : 'Crew'}</button><button class="icon-btn press" data-wsd="back" aria-label="Schließen">${svg(UI.close, 14)}</button></div>
    <div class="pad">
      <div style="display:flex;flex-direction:column;gap:6px"><span class="badge" style="--c:${esc(col)}"><span class="ic">${ic((w.cat && w.cat.icon) || 'pin', 13)}</span>${esc((w.cat && w.cat.name) || 'Spot')}</span><h2>${esc(w.name)}</h2>
        <span class="muted ws-by">${avHTML(w.dev, w.by, 20)}Geteilt ${mine ? 'von dir' : `von ${esc(w.by || '?')}`} · ${ago(w.at || 0)}${me ? ` · ${fmtDist(dist(me, w))} entfernt` : ''}</span></div>
      <div class="rx-row">${rxHTML('sp:' + w._id, w.dev, 'full')}</div>
      ${(() => { const f = wsFull.get(w._id), ph = ((f || w).ph || []).map(okImg).filter(Boolean);
        if(ph.length) return `<div class="ph-strip">${ph.map((u, i) => `<img src="${u}" data-wsph="${i}" alt="Foto ${i + 1}">`).join('')}</div>`;
        if(w.nph && !f){ wsFullSpot(w).then(() => { if(view === 'ws' && wsSel === w._id) renderWsDetail(); }); return `<div class="muted">${w.nph} Foto${w.nph > 1 ? 's' : ''} wird geladen …</div>`; }
        return ''; })()}
      ${saved ? `<button class="btn wide" data-wsd="mine">${svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 16, 2.6)} ${mine ? 'Dein Spot – öffnen' : 'Gespeichert – öffnen'}</button>` : `<button class="btn primary wide" data-wsd="save">${svg(UI.plus, 16, 2.4)} Bei meinen Spots speichern</button>`}
      <div class="btns"><button class="btn" data-wsd="nav">${svg(UI.nav, 15)} Navigation</button><button class="btn" data-wsd="share">${svg(UI.share, 15)} Link teilen</button></div>
      ${w.notes ? `<p class="notes">${esc(w.notes)}</p>` : ''}
      ${park}
      <div class="card"><div class="coords"><span>${fmtCoord(w)}</span><button class="txtbtn" data-copy="${fmtCoord(w)}">Kopieren</button></div>${extLinks(w)}</div>
      ${mine ? `<button class="btn danger" data-wsd="del">Aus der Crew entfernen</button>` : ''}
    </div>`;
}
$('#wsView').addEventListener('click', e => {
  const im = e.target.closest('img[data-wsph]');
  if(im){ const w = wsFull.get(wsSel); if(w){ $('#lightbox').innerHTML = `<img src="${okImg(w.ph[+im.dataset.wsph])}" alt=""><button class="lb-x" aria-label="Schließen">${svg(UI.close, 18, 2.4)}</button>`; $('#lightbox').hidden = false; } return; }
  const b = e.target.closest('button'); if(!b) return;
  if(b.dataset.copy) return copy(b.dataset.copy);
  const a = b.dataset.wsd, w = WS.spots.find(x => x._id === wsSel);
  if(a === 'back'){ wsSel = null; show('list', 'half'); renderWsMarkers(); return; }
  if(!w) return;
  if(a === 'save') wsSaveSpot(w);
  if(a === 'mine'){ const s = wsSavedAs(w); if(s){ spotView = 'mine'; syncSpotsHead(); renderMarkers(); renderWsMarkers(); openDetail(s.id, true); } }
  if(a === 'nav'){ if(w.walk && w.parking) planNav(w.parking, w.name, {lat:w.lat, lng:w.lng}); else planNav({lat:w.lat, lng:w.lng}, w.name, null); }
  if(a === 'share'){ const tmp = {name:w.name, lat:w.lat, lng:w.lng, notes:w.notes, walk:w.walk, parking:w.parking, cat:null}; const c = catFor(w.cat && w.cat.name, w.cat && w.cat.color, w.cat && w.cat.icon); tmp.cat = c.id; shareURL(spotLink(tmp), w.name, `${w.name} – geteilt aus Spots`); }
  if(a === 'del'){
    if(!wsDelArmed){ wsDelArmed = true; b.classList.add('armed'); b.textContent = 'Wirklich entfernen?'; setTimeout(() => { if(b.isConnected){ wsDelArmed = false; b.classList.remove('armed'); b.textContent = 'Aus dem Workshop entfernen'; } }, 3500); return; }
    wsRemoveSpot(w._id);
  }
});

/* Workshop-Marker auf der Karte */
const wsMk = new Map();
function renderWsMarkers(){
  const on = mapReady && !ckOn && ((tab === 'spots' && spotView === 'ws' && view === 'list') || view === 'ws');
  const want = new Set();
  if(on) for(const w of WS.spots){
    if(typeof w.lat !== 'number') continue;
    want.add(w._id);
    let m = wsMk.get(w._id);
    if(!m){
      const el = document.createElement('div'); el.className = 'mk-spot mk-ws';
      el.addEventListener('click', ev => { ev.stopPropagation(); openWsSpot(w._id); });
      m = new maplibregl.Marker({element:el, anchor:'bottom'}).setLngLat([w.lng, w.lat]).addTo(map); wsMk.set(w._id, m);
    }
    const el = m.getElement(), col = (w.cat && w.cat.color) || '#868e96', sel = view === 'ws' && wsSel === w._id;
    el.innerHTML = `<div class="pin" style="--c:${esc(col)}">${ic((w.cat && w.cat.icon) || 'pin', 16)}</div><span class="by">${avHTML(w.dev, w.by, 19)}</span>`;
    el.classList.toggle('sel', sel); el.style.zIndex = sel ? 4 : 2;
  }
  for(const [k, m] of wsMk) if(!want.has(k)){ m.remove(); wsMk.delete(k); }
}

/* Rennstrecke teilen */
async function wsUploadCourse(c){
  if(!needGroup(() => wsUploadCourse(c))) return;
  try{
    const obj = {name:c.name, pts:c.pts, len:c.len, loop:!!c.loop, by:myName(), dev:myId(), at:Date.now()};
    await fsPut('courses', c.id, obj); wsUpsert(WS.courses, {...obj, _id:c.id});
    await pushBests(); wsCache();
    toast(`„${c.name}“ ist jetzt in der Crew – eure Zeiten landen in einer Bestenliste`);
    if(view === 'course') renderCourseView();
  }catch(e){ toast('Hochladen hat nicht geklappt. Prüfe dein Internet.'); }
}

/* ================= Bester Sonnenuntergang ================= */
const sunWx = {t:0, key:'', data:null, busy:false, err:false};
async function loadSunWx(force){
  const spots = data.spots.slice(0, 80); if(!spots.length) return;
  const key = spots.map(s => wxKey(s)).join('|');
  if(sunWx.busy || (!force && sunWx.key === key && Date.now() - sunWx.t < 30 * 60000)) return;
  sunWx.busy = true;
  try{
    const lat = spots.map(s => s.lat.toFixed(3)).join(','), lng = spots.map(s => s.lng.toFixed(3)).join(',');
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,precipitation_probability&timezone=auto&forecast_days=2`);
    if(!r.ok) throw 0;
    const j = await r.json();
    sunWx.data = Array.isArray(j) ? j : [j]; sunWx.key = key; sunWx.t = Date.now(); sunWx.err = false;
  }catch(e){ sunWx.err = true; sunWx.key = key; sunWx.t = Date.now() - 25 * 60000; }
  sunWx.busy = false;
  setTimeout(() => {
    if(tab === 'spots' && spotView === 'mine' && view === 'list' && !searching) renderList();
    if(view === 'sun') renderSunView();
  }, 0);
}
function sunScore(low, mid, high, visM, pp){
  const bell = (x, m, w) => Math.max(0, 1 - Math.abs(x - m) / w);
  const sLow = Math.pow(1 - (low || 0) / 100, 1.5);
  const color = Math.max(.35, bell(high || 0, 45, 40), .85 * bell(mid || 0, 35, 30));
  const vis = visM == null ? .6 : clamp01((visM / 1000 - 5) / 25);
  const dry = 1 - (pp || 0) / 100;
  return Math.round(100 * (.42 * sLow + .2 * vis + .2 * color + .18 * dry));
}
const sunLabel = s => s >= 85 ? 'Traumhaft' : s >= 70 ? 'Gut' : s >= 50 ? 'Geht so' : 'Eher nix';
function sunRanking(){
  if(!sunWx.data) return null;
  const spots = data.spots.slice(0, 80), now = new Date(), out = [];
  spots.forEach((s, i) => {
    const w = sunWx.data[i]; if(!w || !w.hourly || !w.hourly.cloud_cover_low) return;
    let off = 0, sun = sunFor(s, 0);
    if(sun.sunset && now > new Date(sun.sunset.getTime() + 15 * 60000)){ off = 1; sun = sunFor(s, 1); }
    const hi = hourIdx(w, sun.sunset); if(hi < 0) return;
    const H = w.hourly, low = H.cloud_cover_low[hi], mid = H.cloud_cover_mid[hi], high = H.cloud_cover_high[hi], vis = H.visibility ? H.visibility[hi] : null, pp = H.precipitation_probability ? H.precipitation_probability[hi] : 0;
    let score = sunScore(low, mid, high, vis, pp);
    const cat = catById(s.cat); if(/aussicht|foto/i.test(cat.id + ' ' + cat.name)) score = Math.min(100, score + 4);
    let late = false;
    if(me && !off){ const km = dist(me, s) / 1000, etaMin = km / 55 * 60 + 5; late = now.getTime() + etaMin * 60000 > sun.sunset.getTime(); }
    out.push({s, off, sun, low, mid, high, vis, pp, score, late, elev:w.elevation});
  });
  return out.sort((a, b) => (a.off - b.off) || (b.score - a.score));
}
function sunCardHTML(){
  if(!data.spots.length) return '';
  const rk = sunRanking();
  if(!rk && sunWx.err){ if(Date.now() - (sunWx.t || 0) > 5 * 60000) loadSunWx(false); return ''; }   // Wetter fehlt: Karte weglassen statt Fehlermeldung oben in der Liste
  if(!rk){ loadSunWx(false); return `<button class="sun-card" data-sun="open"><span class="t">Sonnenuntergang</span><span class="s">${sunWx.err ? 'Wetter gerade nicht erreichbar' : 'Suche den besten Spot …'}</span></button>`; }
  if(Date.now() - sunWx.t > 30 * 60000) loadSunWx(false);
  const b = rk[0]; if(!b) return '';
  return `<button class="sun-card" data-sun="open"><span class="t">Sonnenuntergang ${b.off ? 'morgen' : 'heute'} · ${hhmm(b.sun.sunset)}</span>
    <span class="s">Bester Spot: <b>${esc(b.s.name)}</b> · ${b.score} % ${sunLabel(b.score).toLowerCase()}</span><span class="sun-bar"><i style="width:${b.score}%"></i></span></button>`;
}
function renderSunView(){
  const rk = sunRanking(), el = $('#sunView');
  const top = `<div class="top"><button class="txtbtn" data-sunv="back">${svg(UI.back, 14)} Spots</button><button class="icon-btn press" data-sunv="back" aria-label="Schließen">${svg(UI.close, 14)}</button></div>`;
  if(!rk){ el.innerHTML = `${top}<div class="pad"><h2>Bester Sonnenuntergang</h2><div class="muted">${sunWx.err ? 'Wetter gerade nicht erreichbar. Prüfe dein Internet.' : 'Wetter wird geladen …'}</div></div>`; return; }
  const day = rk[0] && rk[0].off ? 'morgen' : 'heute';
  el.innerHTML = `${top}<div class="pad">
    <div style="display:flex;flex-direction:column;gap:4px"><h2>Bester Sonnenuntergang ${day}</h2><span class="muted">Bewertet nach tiefen Wolken (blockieren die Sonne), Schleierwolken weiter oben (machen die Farben), Sichtweite und Regenrisiko zur Untergangszeit.</span></div>
    <div class="sun-list">${rk.map((x, i) => `<button class="sun-row" data-sunid="${x.s.id}">
      <span class="sun-n">${i + 1}</span>
      <span class="sun-b"><span class="sun-name">${esc(x.s.name)}</span>
        <span class="sun-meta"><span>${x.off ? 'Morgen' : 'Heute'} ${hhmm(x.sun.sunset)}</span><span>Goldene Std. ${hhmm(x.sun.golden)}</span>${me ? `<span>${fmtDist(dist(me, x.s))}</span>` : ''}</span>
        <span class="sun-meta"><span>Sicht ${x.vis == null ? '–' : Math.round(x.vis / 1000) + ' km'}</span><span>Wolken ${x.low} / ${x.mid} / ${x.high} %</span><span>Regen ${x.pp || 0} %</span></span>
        ${x.late ? '<span class="sun-late">Schaffst du heute vermutlich nicht mehr rechtzeitig</span>' : ''}
        <span class="sun-bar"><i style="width:${x.score}%"></i></span></span>
      <span class="sun-score"><b>${x.score}</b><span>${sunLabel(x.score)}</span></span></button>`).join('')}</div>
    <div class="muted">Wolken: tief / mittel / hoch. Sichtweite und Wolken von Open-Meteo, Sonnenzeiten berechnet.</div>
  </div>`;
}
function openSunView(){
  sunWx.t = Math.min(sunWx.t, Date.now() - 25 * 60000); loadSunWx(false);
  renderSunView(); show('sun', mobile() ? 'full' : undefined);
  const rk = sunRanking();
  if(rk && rk.length){ const pts = rk.slice(0, 3).map(x => x.s); const b = pts.reduce((b, s) => b.extend([s.lng, s.lat]), new maplibregl.LngLatBounds([pts[0].lng, pts[0].lat], [pts[0].lng, pts[0].lat])); map.fitBounds(b, {padding:camPad(), maxZoom:13, duration:1000}); }
}
document.addEventListener('click', e => {
  if(e.target.closest('[data-sun="open"]')){ openSunView(); return; }
  const b = e.target.closest('[data-sunv="back"]'); if(b){ show('list', 'half'); return; }
  const r = e.target.closest('[data-sunid]'); if(r) openDetail(r.dataset.sunid, true);
});

/* ================= Einstellungen ================= */
const VERSION = '2026.10.09.03';
const ACCENTS = {vanille:['#f4d35e','#0d3b66','Vanille'], blue:['#4da3ff','#0a6fe0','Blau'], teal:['#2dd4bf','#0b8c80','Türkis'], green:['#34d058','#178a3c','Grün'], orange:['#ff9f0a','#c96a00','Orange'], red:['#ff5a5f','#d4262c','Rot'], purple:['#b583ff','#7a3ae6','Lila']};
const darkMQ = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : {matches:true};
function onOff(k, def = true){ return prefs[k] == null ? def : !!prefs[k]; }
function curTheme(){ const t = prefs.theme || 'dark'; return t === 'auto' ? (darkMQ.matches ? 'dark' : 'light') : t; }
function accentCol(th = curTheme()){ const a = ACCENTS[prefs.accent] || ACCENTS.vanille; return th === 'light' ? a[1] : a[0]; }
function applyTheme(){
  if(typeof vecOn !== 'undefined' && vecOn && mapReady){ vecEnsure(); vecShow(true); }
  const th = curTheme(), root = document.documentElement, col = accentCol(th);
  root.dataset.theme = th;
  root.style.setProperty('--accent', col);
  root.style.setProperty('--accent-soft', `color-mix(in srgb, ${col} 16%, transparent)`);
  root.style.setProperty('--accent-fg', th === 'dark' && ['vanille','teal','green','orange'].includes(ACCENTS[prefs.accent] ? prefs.accent : 'vanille') ? '#0b2540' : '#ffffff');
  const m = document.querySelector('meta[name="theme-color"]'); if(m) m.content = th === 'light' ? '#efece3' : '#06111d';
  if(mapReady){ try{ map.setPaintProperty('acc-fill', 'fill-color', col); map.setPaintProperty('acc-line', 'line-color', col); map.setPaintProperty('nav-route-line', 'line-color', col); }catch(e){} }
}
if(darkMQ.addEventListener) darkMQ.addEventListener('change', () => { if(prefs.theme === 'auto') applyTheme(); });
function openSettings(){
  $('#layersPop').hidden = true; $('#b-layers').classList.remove('on'); $('#b-layers').setAttribute('aria-expanded', 'false');
  renderSettings(); $('#modal').hidden = false;
}
function renderSettings(){
  const pad = $('#modal .pad'), keep = pad && $('#modal [aria-label="Einstellungen"]') ? pad.scrollTop : 0;
  const th = prefs.theme || 'dark', cam = prefs.cam || 'normal', lt = curTheme() === 'light', chev = `<span class="ri chev">${svg(UI.back, 14)}</span>`;
  const tg = (k, label, sub) => `<button class="set-row${onOff(k) ? ' on' : ''}" data-st="tg" data-k="${k}" role="switch" aria-checked="${onOff(k)}"><span>${label}${sub ? `<small>${sub}</small>` : ''}</span><i class="tg"></i></button>`;
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Einstellungen">
    <div class="top" style="padding:12px 14px"><strong style="font-size:17px">Einstellungen</strong><button class="txtbtn bold" data-st="close">Fertig</button></div>
    <div class="pad" style="padding-top:2px;gap:8px">
      <div class="set-sec">Darstellung</div>
      <div class="set-card">
        <div class="set-theme">${[['dark','Dunkel'],['light','Hell'],['auto','Automatisch']].map(([k, n]) => `<button data-st="theme" data-v="${k}" class="${th === k ? 'on' : ''}"><i class="th-${k}"></i>${n}</button>`).join('')}</div>
        ${tg('haptic', 'Haptik', 'Kurzes Vibrieren beim Tippen')}
        <div class="set-row col"><span>Akzentfarbe</span><div class="swatches">${Object.entries(ACCENTS).map(([k, a]) => `<button data-st="accent" data-v="${k}" class="${(ACCENTS[prefs.accent] ? prefs.accent : 'vanille') === k ? 'on' : ''}" style="--c:${lt ? a[1] : a[0]}" aria-label="${a[2]}" title="${a[2]}"></button>`).join('')}</div></div>
      </div>
      <div class="set-sec">Fahren</div>
      <div class="set-card">
        ${tg('recCockpit', 'Aufzeichnen öffnet Cockpit', 'Ein Tipp, direkt losfahren')}
        <div class="set-row"><span>Nachtmodus<small>Cockpit dunkel ab Sonnenuntergang</small></span><div class="set-seg">${[['auto','Auto'],['on','An'],['off','Aus']].map(([k, n]) => `<button data-st="cknight" data-v="${k}" class="${(prefs.ckNight || 'auto') === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
        <div class="set-row"><span>Kamera<small>im Cockpit</small></span><div class="set-seg">${[['near','Nah'],['normal','Normal'],['far','Weit']].map(([k, n]) => `<button data-st="cam" data-v="${k}" class="${cam === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>
        <button class="set-row" data-st="garage"><span>Garage${garage.cars.some(c => gDue(c).some(d => d.lvl >= 1)) ? '<i class="gdot"></i>' : ''}<small>${gActive() ? `${esc(gTitle(gActive()))} · ${fmtNum(gKm(gActive()))} km` : 'Deine echten Autos, TÜV und Service'}</small></span>${chev}</button>
        <button class="set-row car-row" data-st="car"><span>Dein Auto<small>${esc(CAR_TYPES[carType()].name)} · ${esc(CAR_COLORS[carColor()].name)}</small></span><span class="ri">${carSideSVG(carType(), carColor(), 'mini')}</span></button>
        ${tg('car3d', '3D-Auto', 'Aus: flaches Symbol, spart Akku')}
        ${tg('gforce', 'G-Kraft-Anzeige', 'Bewegungssensor, richtet sich beim Fahren selbst aus')}
        ${tg('limit', 'Tempolimit anzeigen')}
        ${tg('autoPark', 'Parkplatz merken', 'Nach einer Fahrt beim Verlassen des Cockpits')}
        ${tg('ghost', 'Geister-Auto auf Rennstrecken')}
        ${tg('sound', 'Töne bei der 0–100-Messung')}
      </div>
      ${FB ? `<div class="set-sec">Crew</div>
      <div class="set-card">${grp() ? `
        <div class="set-row"><span>${esc(grp().name)}<small>Geteilte Spots, Fahrten und Bestenlisten sehen alle in dieser Crew</small></span></div>
        <button class="set-row" data-st="avatar"><span>Profilbild<small>Sehen die anderen in der Crew</small></span><span class="ri">${avHTML(myId(), myName(), 34)}</span></button>
        <button class="set-row" data-st="gname"><span>Dein Name</span><span class="ri">${esc(myName() || '–')}${svg('<path d="M15 5 8 12l7 7"/>', 14).replace('<svg', '<svg style="transform:scaleX(-1)"')}</span></button>
        <button class="set-row${onOff('shareStats') ? ' on' : ''}" data-st="tg" data-k="shareStats" role="switch" aria-checked="${onOff('shareStats')}"><span>Wochenstatistik teilen<small>Kilometer, Anzahl Fahrten, Fahrzeit, Höchsttempo und Ø Risiko pro Woche – keine Strecken</small></span><i class="tg"></i></button>
        <button class="set-row" data-st="ginvite"><span>Freunde einladen</span><span class="ri">${svg(UI.share, 16)}</span></button>
        ${isAdmin() ? `<button class="set-row adm-row" data-st="admin"><span>Crew verwalten<small>Rauswerfen, sperren, neuer Einladungslink</small></span><span class="ri"><i class="adm-tag">Admin</i>${chev}</span></button>`
          : !(crewDoc().admin || []).length && WS.crew ? `<button class="set-row" data-st="mkadmin"><span>Admin werden<small>Diese Crew hat noch keinen Admin</small></span>${chev}</button>` : ''}
        <button class="set-row" data-st="link"><span>Auf weiterem Gerät nutzen<small>Z. B. am PC – dort bist du dann auch ${esc(myName() || 'du')}${isAdmin() ? ', mit Admin-Rechten' : ''}</small></span>${chev}</button>
        <button class="set-row" data-st="gleave"><span style="color:var(--danger)">Crew verlassen</span></button>` : `
        <button class="set-row" data-st="gcreate"><span>Crew erstellen</span>${chev}</button>
        <button class="set-row" data-st="gjoin"><span>Mit Link beitreten</span>${chev}</button>`}</div>` : ''}
      <div class="set-sec">Daten</div>
      <div class="set-card">
        <button class="set-row" data-st="backup"><span>Automatisches Backup${prefs.bkTodo ? ' <i class="nwd"></i>' : ''}<small>${prefs.bkTodo ? 'Wiederherstellungscode noch nicht gesichert' : esc(bkStatusTxt())}</small></span>${chev}</button>
        <button class="set-row" data-st="export"><span>Backup-Datei speichern<small>Spots, Kategorien, Strecken und Zeiten (ohne Fotos)</small></span><span class="ri">${svg(UI.share, 16)}</span></button>
        <button class="set-row" data-st="import"><span>Backup-Datei laden</span>${chev}</button>
        <button class="set-row" data-st="offline"><span>Offline-Karten</span><span class="ri">${offAreas.length ? `${offAreas.length} ${offAreas.length > 1 ? 'Gebiete' : 'Gebiet'}` : ''}${svg('<path d="M15 5 8 12l7 7"/>', 14).replace('<svg', '<svg style="transform:scaleX(-1)"')}</span></button>
        <div class="set-row"><span>Speicher belegt</span><span class="ri" id="stStore">…</span></div>
      </div>
      <div class="set-sec">Über</div>
      <div class="set-card"><div class="set-row"><span>Spots<small>Deine Spots und Fahrten liegen auf diesem Gerät. In die Crew geht nur, was du teilst – und dein verschlüsseltes Backup.</small></span><span class="ri">Version ${VERSION}</span></div></div>
    </div></div>`;
  if(keep) $('#modal .pad').scrollTop = keep;
  storageInfo();
}
async function storageInfo(){
  let txt = '–';
  try{ if(navigator.storage && navigator.storage.estimate){ const e = await navigator.storage.estimate(); let ls = 0; try{ for(let i = 0; i < localStorage.length; i++){ const k = localStorage.key(i); ls += (k.length + (localStorage.getItem(k) || '').length) * 2; } }catch(_){} txt = fmtMB(((e.usage || 0) + ls) / 1048576); } }catch(e){}
  const el = $('#stStore'); if(el) el.textContent = txt;
}
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-st]'); if(!b) return;
  const a = b.dataset.st;
  if(a === 'close'){ $('#modal').hidden = true; return; }
  if(a === 'theme'){ prefs.theme = b.dataset.v; savePrefs(); applyTheme(); renderSettings(); }
  if(a === 'accent'){ prefs.accent = b.dataset.v; savePrefs(); applyTheme(); renderSettings(); if(view === 'track') updateTrackLayers(); }
  if(a === 'cam'){ prefs.cam = b.dataset.v; savePrefs(); renderSettings(); }
  if(a === 'cknight'){ prefs.ckNight = b.dataset.v; savePrefs(); renderSettings(); ckNightCheck(true); }
  if(a === 'tg'){ const k = b.dataset.k; prefs[k] = !onOff(k); savePrefs(); b.classList.toggle('on', prefs[k]); b.setAttribute('aria-checked', prefs[k]); if(k === 'gforce'){ if(prefs[k]){ gStart(); setTimeout(() => { if(!ckOn && !(rec && !rec.stopped)) gStop(); }, 2000); } else gStop(); } if(k === 'shareStats' && grp()) pushMember().then(wsCache).catch(() => {}); }
  if(a === 'avatar'){ $('#avFile').click(); return; }
  if(a === 'car'){ openCarPicker(); return; }
  if(a === 'garage'){ openGarage(); return; }
  if(a === 'gname') openGroupDlg('name', {then:() => { prefs.memberSig = ''; pushMember().catch(() => {}); pushBests().catch(() => {}); }});
  if(a === 'ginvite') shareURL(inviteURL(), `Crew ${grp().name}`, `Komm in unsere Crew „${grp().name}“ bei Spots:`);
  if(a === 'gcreate') openGroupDlg('create', {});
  if(a === 'admin'){ openAdmin(); return; }
  if(a === 'link'){ openLinkDlg(); return; }
  if(a === 'mkadmin'){ claimAdmin(); return; }
  if(a === 'gjoin') openGroupDlg('code', {});
  if(a === 'gleave'){
    if(!b.classList.contains('armed')){ b.classList.add('armed'); b.querySelector('span').textContent = 'Wirklich verlassen? Nochmal tippen'; return; }
    memberGone(grp() && grp().code, myId()); leaveGroupLocal(); renderSettings(); toast('Crew verlassen');
  }
  if(a === 'backup') return openBackup();
  if(a === 'export') $('#exportBtn').click();
  if(a === 'import') $('#importBtn').click();
  if(a === 'offline') openOffline();
});
$('#setBtn').addEventListener('click', openSettings);
$('#b-settings').addEventListener('click', e => { e.stopPropagation(); openSettings(); });

/* Admin-Panel */
let admArmed = null, admBusy = false;
function openAdmin(){
  if(!isAdmin()){ renderSettings(); return; }
  const ban = crewBan(), mems = WS.members.filter(m => !ban[m._id]).sort((a, b) => (isAdmin(b._id) - isAdmin(a._id)) || String(a.name).localeCompare(String(b.name), 'de'));
  const ago = t => { if(!t) return ''; const d = Math.floor((Date.now() - t) / 864e5); return d <= 0 ? 'heute aktiv' : d === 1 ? 'gestern aktiv' : `vor ${d} Tagen aktiv`; };
  const row = m => {
    const me_ = m._id === myId(), adm = isAdmin(m._id), arm = k => admArmed === k + m._id;
    return `<div class="adm-m">${avHTML(m._id, m.name, 38)}<div class="adm-tx"><b>${esc(me_ ? myName() : m.name || '?')}${adm ? ' <i class="adm-tag sm">Admin</i>' : ''}${me_ ? ' <small>(du)</small>' : ''}</b><span>${ago(m.at)}</span></div>
      ${me_ ? '' : adm ? `<div class="adm-acts"><button class="btn sm${arm('a') ? ' armed' : ''}" data-adm="unadmin" data-dev="${esc(m._id)}">${arm('a') ? 'Sicher?' : 'Admin entfernen'}</button></div>` : `<div class="adm-acts"><button class="btn sm${arm('m') ? ' armed' : ''}" data-adm="mkadm" data-dev="${esc(m._id)}">${arm('m') ? 'Sicher?' : 'Zum Admin'}</button><button class="btn sm${arm('k') ? ' armed' : ''}" data-adm="kick" data-dev="${esc(m._id)}">${arm('k') ? 'Sicher?' : 'Rauswerfen'}</button><button class="btn sm danger${arm('b') ? ' armed' : ''}" data-adm="ban" data-dev="${esc(m._id)}">${arm('b') ? 'Sicher?' : 'Sperren'}</button></div>`}</div>`;
  };
  const bans = Object.entries(ban).sort((a, b) => b[1].t - a[1].t);
  $('#modal').innerHTML = `<div class="dlg adm-dlg" role="dialog" aria-modal="true" aria-label="Crew verwalten">
    <div class="top" style="padding:12px 14px"><button class="txtbtn" data-adm="back">${svg(UI.back, 14)} Einstellungen</button><strong style="font-size:17px">Crew verwalten</strong><span style="width:60px"></span></div>
    <div class="pad" style="padding-top:2px;gap:10px">
      <div class="adm-head"><span class="adm-shield">${svg('<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>', 22, 2)}</span><div><b>${esc(grp().name)}</b><span>${mems.length} Mitglied${mems.length === 1 ? '' : 'er'} · du bist Admin</span></div></div>
      <div class="set-sec">Name der Crew</div>
      <div class="set-card adm-renew"><div class="row" style="gap:8px"><input class="inp" id="adm-name" value="${esc(grp().name)}" maxlength="40" style="flex:1"><button class="btn" data-adm="rename">Ändern</button></div></div>
      <div class="set-sec">Mitglieder</div>
      <div class="set-card adm-list">${mems.map(row).join('') || '<div class="muted" style="padding:12px 14px">Noch niemand außer dir.</div>'}</div>
      <div class="adm-note"><b>Rauswerfen:</b> fliegt raus, kann mit dem Einladungslink aber wieder rein. <b>Sperren:</b> kommt mit diesem Gerät und Namen nicht mehr rein.</div>
      ${bans.length ? `<div class="set-sec">Gesperrt</div><div class="set-card adm-list">${bans.map(([d, x]) => `<div class="adm-m">${avHTML(d, x.n, 38)}<div class="adm-tx"><b>${esc(x.n || '?')}</b><span>gesperrt am ${new Date(x.t).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}</span></div><div class="adm-acts"><button class="btn sm" data-adm="unban" data-dev="${esc(d)}">Entsperren</button></div></div>`).join('')}</div>` : ''}
      <div class="set-sec">Einladungslink</div>
      <div class="set-card adm-renew">
        <div class="adm-tx"><b>Neuen Einladungslink erstellen</b><span>Der alte Link geht danach nicht mehr. Alle Spots, Fahrten und Zeiten ziehen mit um. Schick den neuen Link in eure Crew – wer ihn nicht bekommt, ist draußen.</span></div>
        <button class="btn${admArmed === 'renew' ? ' armed danger' : ''}" data-adm="renew" ${admBusy ? 'disabled' : ''}>${admArmed === 'renew' ? 'Wirklich? Nochmal tippen' : 'Link erneuern'}</button>
        <div class="adm-prog" id="admProg"></div>
      </div>
    </div></div>`;
  $('#modal').hidden = false;
}
async function admKick(dev, ban){
  const m = WS.members.find(x => x._id === dev), name = (m && m.name) || '?';
  try{
    if(ban) await crewSave(c => ({ban:{...(c.ban || {}), [dev]:{n:name, t:Date.now()}}}));
    else await crewSave(c => ({kick:{...(c.kick || {}), [dev]:Date.now()}}));
    await fsDel('members', dev).catch(() => {}); await fsDel('live', dev).catch(() => {});
    WS.members = WS.members.filter(x => x._id !== dev); wsCache();
    toast(ban ? `${name} ist gesperrt` : `${name} ist raus – mit dem Einladungslink kann ${name} wieder beitreten`);
  }catch(e){ toast('Ging gerade nicht. Prüfe dein Internet.'); }
  admArmed = null; openAdmin(); wsRefreshUI();
}
async function pool(items, n, fn){ let i = 0; await Promise.all(Array.from({length:Math.min(n, items.length)}, async () => { while(i < items.length){ const x = items[i++]; await fn(x); } })); }
async function crewRenew(){
  const old = grp().code, neu = newCode(), cols = ['spots', 'runs', 'courses', 'efforts', 'drives', 'reactions', 'members'];
  const prog = t => { const el = $('#admProg'); if(el) el.textContent = t; };
  admBusy = true; prog('Sammle alles ein …');
  try{
    const all = {}; let total = 0, done = 0;
    // verschlüsselte Backups (bk_…) nicht über dieses Handy schleusen – jedes Mitglied lädt sein Backup beim nächsten Abgleich selbst neu hoch
    let bkOld = [];
    for(const c of cols){
      all[c] = (await fsRawList(old, c)).filter(d => !(c === 'members' && (d.id === CREW_DOC || crewBan()[d.id])));
      if(c === 'drives'){ bkOld = all[c].filter(d => d.id.startsWith('bk_')); all[c] = all[c].filter(d => !d.id.startsWith('bk_')); }
      total += all[c].length;
    }
    for(const c of cols) await pool(all[c], 6, async d => { await fsRawPut(neu, c, d.id, d.fields); done++; if(done % 5 === 0 || done === total) prog(`Ziehe um … ${done} von ${total}`); });
    // zweiter Durchgang: was andere während des Umzugs neu geschrieben oder geändert haben, auch mitnehmen
    prog('Prüfe auf Neues …');
    for(const c of cols){
      const seen = new Map(all[c].map(d => [d.id, JSON.stringify(d.fields)]));
      const late = (await fsRawList(old, c)).filter(d => !(c === 'members' && (d.id === CREW_DOC || crewBan()[d.id])) && !d.id.startsWith('bk_') && seen.get(d.id) !== JSON.stringify(d.fields));
      await pool(late, 6, d => fsRawPut(neu, c, d.id, d.fields));
      late.forEach(d => { if(!seen.has(d.id)) all[c].push(d); });
    }
    const crew = {...crewDoc(), kick:{}, moved:false, renewed:Date.now(), at:Date.now()};
    await fsRawPut(neu, 'members', CREW_DOC, docFields(crew));
    // ab hier gilt der neue Code; danach die alten Daten löschen und den alten Link schließen
    liveStop(true);
    prefs.group = {...grp(), code:neu}; savePrefs(); WS.crew = crew; wsCache(); liveWatch();
    prog('Räume den alten Link auf …');
    const live = await fsRawList(old, 'live').catch(() => []);
    for(const c of cols) await pool(all[c], 6, d => fsRawDel(old, c, d.id).catch(() => {}));
    await pool(live, 6, d => fsRawDel(old, 'live', d.id).catch(() => {}));
    await pool(bkOld, 6, d => fsRawDel(old, 'drives', d.id).catch(() => {}));
    bk.sent = {}; bk.code = grp().code; bkSave(); setTimeout(() => { if(bkOn()) bkRun(); }, 1500);   // eigenes Backup gleich in die neue Ablage
    await fsRawPut(old, 'members', CREW_DOC, docFields({moved:true, by:myName(), at:Date.now()})).catch(() => {});
    admBusy = false; admArmed = null; WS.loaded = 0; wsSync(true);
    $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Neuer Link"><div class="pad" style="padding:20px 16px 16px;gap:12px">
      <h2>Neuer Einladungslink ist da</h2><div class="muted">Der alte Link funktioniert nicht mehr. Schick den neuen jetzt in eure Crew. Auf deinem PC: dort einmal „Auf weiterem Gerät nutzen“ neu öffnen.</div>
      <div class="lnk-box">${esc(inviteURL())}</div>
      <div class="btns"><button class="btn" data-lk="copyinv">Kopieren</button><button class="btn primary" data-lk="shareinv">${svg(UI.share, 15)} Teilen</button></div>
      <button class="txtbtn" data-gp-ok style="align-self:center">Fertig</button></div></div>`;
  }catch(e){
    admBusy = false; admArmed = null; prog('');
    toast('Umzug hat nicht geklappt – der alte Link gilt weiter. Prüfe dein Internet.');
    if(grp() && grp().code === old) openAdmin();
  }
}
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-adm]'); if(!b || !$('#modal .adm-dlg')) return;
  const a = b.dataset.adm, dev = b.dataset.dev;
  if(a === 'back'){ admArmed = null; renderSettings(); return; }
  if(a === 'rename'){
    const n = ($('#adm-name').value || '').trim().slice(0, 40); if(!n) return toast('Gib der Crew einen Namen.');
    b.disabled = true;
    crewSave({name:n}).then(() => { prefs.group = {...grp(), name:n}; savePrefs(); toast(`Crew heißt jetzt „${n}“`); openAdmin(); wsRefreshUI(); })
      .catch(() => { b.disabled = false; toast('Ging gerade nicht. Prüfe dein Internet.'); });
    return;
  }
  if(a === 'kick' || a === 'ban'){ const k = (a === 'kick' ? 'k' : 'b') + dev; if(admArmed !== k){ admArmed = k; openAdmin(); return; } admKick(dev, a === 'ban'); return; }
  if(a === 'mkadm'){ const k = 'm' + dev; if(admArmed !== k){ admArmed = k; openAdmin(); return; } admArmed = null; crewSave(c => ({admin:[...new Set([...(c.admin || []), dev])]})).then(() => { toast('Ist jetzt Admin'); openAdmin(); wsRefreshUI(); }).catch(() => toast('Ging gerade nicht. Prüfe dein Internet.')); return; }
  if(a === 'unadmin'){ const k = 'a' + dev; if(admArmed !== k){ admArmed = k; openAdmin(); return; } admArmed = null; crewSave(c => ({admin:(c.admin || []).filter(x => x !== dev)})).then(() => { toast('Admin-Rechte entfernt'); openAdmin(); wsRefreshUI(); }).catch(() => toast('Ging gerade nicht. Prüfe dein Internet.')); return; }
  if(a === 'unban'){ const n = (crewBan()[dev] || {}).n; crewSave(c => { const bn = {...(c.ban || {})}; delete bn[dev]; return {ban:bn}; }).then(() => { toast(`${n || 'Gerät'} ist entsperrt`); openAdmin(); }).catch(() => toast('Ging gerade nicht. Prüfe dein Internet.')); return; }
  if(a === 'renew' && !admBusy){ if(admArmed !== 'renew'){ admArmed = 'renew'; openAdmin(); return; } crewRenew(); }
});

/* Admin: wer die Crew erstellt, ist Admin. Admins können andere zu Admins machen.
   Hat eine (ältere) Crew gar keinen Admin, darf das erste Mitglied, das es möchte, Admin werden. */
async function claimAdmin(){
  try{
    let got = false;
    await crewSave(c => { if((c.admin || []).length) return {}; got = true; return {admin:[myId()], since:c.since || Date.now()}; });
    if(got){ toast('Du bist jetzt Admin dieser Crew'); wsRefreshUI(); openAdmin(); }
    else { toast('Die Crew hat inzwischen einen Admin.'); renderSettings(); }
  }catch(e){ toast('Ging gerade nicht. Prüfe dein Internet.'); }
}

/* Gerät verknüpfen: derselbe Mensch auf Handy und PC */
const linkURL = () => `${appURL()}#link=${myId()}&n=${encodeURIComponent(myName())}${grp() ? `&join=${grp().code}&g=${encodeURIComponent(grp().name || 'Crew')}` : ''}${grp() && window.crypto?.subtle ? `&bk=${bkKeyRaw()}` : ''}`;
function openLinkDlg(){
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Weiteres Gerät"><div class="pad" style="padding:18px 16px 16px;gap:12px">
    <h2>Auf weiterem Gerät nutzen</h2>
    <div class="muted">Öffne diesen Link auf deinem PC oder zweiten Handy – oder füg ihn dort in Spots unter Crew › Link einfügen ein. Dort bist du dann auch „${esc(myName())}“ in „${esc((grp() || {}).name || '')}“${isAdmin() ? ' – mit deinen Admin-Rechten' : ''}. Nicht den Einladungslink verwenden, der macht ein neues Konto.</div>
    <div class="lnk-box">${esc(linkURL())}</div>
    <div class="btns"><button class="btn" data-lk="copy">Link kopieren</button><button class="btn primary" data-lk="share">${svg(UI.share, 15)} An mich senden</button></div>
    <div class="onb-note"><b>Nur an dich selbst schicken.</b> Wer diesen Link öffnet, ist in der Crew du.</div>
    <div class="muted" style="font-size:12.5px">Dort kannst du danach deine Spots und Fahrten aus dem Backup übernehmen.</div>
    <button class="txtbtn" data-lk="back" style="align-self:center">Zurück</button></div></div>`;
  $('#modal').hidden = false;
}
let linkPending = null;
function openLinkAccept(o){
  linkPending = o;
  const other = myName() && prefs.dev && prefs.dev !== o.dev ? myName() : '';
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Gerät verknüpfen"><div class="pad" style="padding:20px 16px 16px;gap:12px">
    <h2>Dieses Gerät als „${esc(o.name || '?')}“ nutzen?</h2>
    <div class="muted">Dann bist du hier dieselbe Person wie auf deinem anderen Gerät${o.code ? `, in „${esc(o.g)}“` : ''}. Nur bestätigen, wenn der Link von dir selbst kommt.</div>
    ${other ? `<div class="onb-note">Auf diesem Gerät bist du gerade „${esc(other)}“. Das wird ersetzt.</div>` : ''}
    <div class="btns"><button class="btn" data-lk="no">Abbrechen</button><button class="btn primary" data-lk="yes">Ja, verknüpfen</button></div></div></div>`;
  $('#modal').hidden = false;
}
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-lk]'); if(!b) return;
  const a = b.dataset.lk;
  if(a === 'copy') return copyText(linkURL(), 'Link kopiert – öffne ihn auf dem anderen Gerät');
  if(a === 'share') return shareURL(linkURL(), 'Spots', 'Mein Gerät verknüpfen:');
  if(a === 'copyinv') return copyText(inviteURL(), 'Einladungslink kopiert');
  if(a === 'shareinv') return shareURL(inviteURL(), `Crew ${grp().name}`, `Neuer Link für „${grp().name}“ bei Spots:`);
  if(a === 'back'){ renderSettings(); return; }
  if(a === 'no'){ linkPending = null; $('#modal').hidden = true; if(onbNeeded() && $('#onb').hidden){ $('#onb').hidden = false; renderOnb(); } return; }
  if(a === 'yes' && linkPending){
    const o = linkPending; linkPending = null;
    liveStop(true);
    const oldDev = prefs.dev, oldGrp = grp();
    if(oldGrp && oldDev && (oldDev !== o.dev || (o.code && o.code !== oldGrp.code))) memberGone(oldGrp.code, oldDev);   // altes Konto dieses Geräts austragen
    prefs.dev = o.dev; if(o.name) prefs.myName = o.name; prefs.linkAdopt = true; prefs.memberSig = ''; prefs.onb = 1;
    if(o.code) prefs.group = {code:o.code, name:o.g, joined:Date.now()};
    if(o.bk && o.bk !== prefs.bkKey){ prefs.bkKey = o.bk; bk.sent = {}; bkSave(); }   // gleicher Schlüssel wie das andere Gerät, eigenes Backup neu verschlüsseln
    delete prefs.wsSeen; delete prefs.rxSeen; savePrefs();
    WS.spots = []; WS.runs = []; WS.courses = []; WS.efforts = []; WS.members = []; WS.drives = []; WS.reacts = []; WS.events = []; WS.rsvps = []; WS.crew = null; WS.loaded = 0; wsCache();
    $('#modal').hidden = true; if(!$('#onb').hidden) $('#onb').hidden = true;
    syncSpotsHead(); refreshAll(); liveWatch(); wsSync(true);
    toast(`Verknüpft – du bist jetzt auch hier ${o.name || 'du'}`);
    if(o.bk && o.code) setTimeout(() => bkOffer({g:o.code, gn:o.g, d:o.dev, n:o.name, k:o.bk}, false), 900);
  }
});

/* ================= Haptik: kurzes Feedback beim Tippen =================
   iPhone (ab iOS 18): ein verstecktes System-Schalterchen löst das Haptik-Klicken aus. Android: kurze Vibration. */
const hapticIOS = /iPhone|iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
let hapticLbl = null;
function haptic(strong){
  if(!onOff('haptic')) return;
  try{
    if(!hapticIOS && navigator.vibrate){ navigator.vibrate(strong ? 16 : 7); return; }
    if(!hapticIOS) return;
    if(!hapticLbl){
      hapticLbl = document.createElement('label'); hapticLbl.setAttribute('aria-hidden', 'true');
      hapticLbl.style.cssText = 'position:fixed;left:-200px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden';
      const i = document.createElement('input'); i.type = 'checkbox'; i.setAttribute('switch', ''); i.tabIndex = -1; hapticLbl.appendChild(i);
      hapticLbl.addEventListener('click', e => e.stopPropagation());
      document.body.appendChild(hapticLbl);
    }
    hapticLbl.click();
  }catch(e){}
}
document.addEventListener('click', e => {
  if(!e.isTrusted) return;
  const b = e.target.closest('button,.chip,[role="button"],a.btn,.item,.set-row,.pop-row');
  if(!b || b.disabled || b === hapticLbl) return;
  haptic(b.matches('.primary,.armed,[data-rec],[data-ck-open],.rec-start'));
}, true);

/* Vom linken Rand wischen = zurück (Handy) */
function viewBack(){ const el = $('#' + view + 'View'), b = el && el.querySelector('.top > button.txtbtn:first-child'); if(b) b.click(); else show('list'); }
(() => {
  const OK = ['detail', 'place', 'track', 'course', 'ws', 'sun'];
  let s = null;
  panel.addEventListener('touchstart', e => {
    s = null;
    if(!mobile() || !OK.includes(view) || e.touches.length !== 1 || ckOn) return;
    const t = e.touches[0];
    if(t.clientX - panel.getBoundingClientRect().left > 26) return;
    s = {x:t.clientX, y:t.clientY, el:$('#' + view + 'View'), go:false, t0:performance.now(), dx:0};
  }, {passive:true});
  panel.addEventListener('touchmove', e => {
    if(!s) return;
    const t = e.touches[0], dx = t.clientX - s.x, dy = t.clientY - s.y;
    if(!s.go){ if(Math.abs(dy) > 10 && Math.abs(dy) > dx){ s = null; return; } if(dx < 8) return; s.go = true; s.el.style.transition = 'none'; s.el.classList.remove('enter'); }
    e.preventDefault();
    s.dx = Math.max(0, dx); s.el.style.transform = `translateX(${s.dx}px)`; s.el.style.opacity = String(1 - Math.min(.45, s.dx / 700));
  }, {passive:false});
  const end = () => {
    const S = s; s = null; if(!S || !S.go) return;
    const v = S.dx / Math.max(1, performance.now() - S.t0);
    S.el.style.transition = 'transform .26s var(--ease), opacity .26s';
    if(S.dx > panel.offsetWidth * .3 || (v > .45 && S.dx > 40)){
      S.el.style.transform = `translateX(${panel.offsetWidth}px)`; S.el.style.opacity = '0'; haptic();
      setTimeout(() => { S.el.style.transition = ''; S.el.style.transform = ''; S.el.style.opacity = ''; viewBack(); }, 190);
    } else { S.el.style.transform = ''; S.el.style.opacity = ''; setTimeout(() => { S.el.style.transition = ''; }, 280); }
  };
  panel.addEventListener('touchend', end); panel.addEventListener('touchcancel', end);
})();

/* ================= Nachtmodus im Cockpit: nach der Abenddämmerung dunkel und blendfrei ================= */
let ckNightOn = false, ckNightT = 0;
function ckIsDark(){
  const p = (ckOn && ckBestPos()) || me || (mapReady ? map.getCenter() : null); if(!p) return false;
  const d = new Date(); d.setHours(12, 0, 0, 0);
  const S = SUN(d, p.lat, p.lng); if(!S.rise || !S.blue1 || !S.sunset) return false;
  const now = Date.now();
  return now < S.rise.getTime() - (S.blue1 - S.sunset) || now > S.blue1.getTime();
}
function ckNightCheck(force){
  if(!force && Date.now() - ckNightT < 60000) return;
  ckNightT = Date.now();
  const m = prefs.ckNight || 'auto', on = ckOn && (m === 'on' || (m === 'auto' && ckIsDark()));
  if(on === ckNightOn && !force) return;
  ckNightOn = on; document.body.classList.toggle('cknight', on);
}

/* ================= Automatisches Backup: verschlüsselt bei der eigenen Gruppe =================
   AES-GCM (256 Bit) direkt im Browser, vorher gzip. Den Schlüssel haben nur deine Geräte und dein Wiederherstellungscode –
   in der Datenbank liegt nur unlesbarer Datensalat. Dokumente „bk_<Person>_<Gerät>_…“ in der Fahrten-Sammlung; die normalen Listen überspringen sie.
   Jedes Gerät sichert für sich; beim Wiederherstellen werden alle Backups der Person zusammengeführt. */
var bk = {sent:{}, at:0, n:null, busy:false, err:null, prog:''};
try{ Object.assign(bk, JSON.parse(localStorage.getItem('meine-spots-bk') || '{}'), {busy:false, err:null, prog:''}); }catch(e){}
const BK_COL = 'drives', BK_CHUNK = 700000, BK_PREFS = ['myName', 'avatar', 'carType', 'carColor', 'accent', 'theme', 'labels', 'base', 'terrain', 'wayPlaces', 'wayGeo', 'navMode', 'cam', 'car3d', 'gforce', 'recCockpit', 'shareStats', 'gShare'];
function bkSave(){ try{ localStorage.setItem('meine-spots-bk', JSON.stringify({sent:bk.sent, at:bk.at, n:bk.n, dev:bk.dev, code:bk.code})); }catch(e){} }
function bkDirty(){ try{ localStorage.setItem('meine-spots-bk-dirty', '1'); }catch(e){} clearTimeout(window.__bkT); window.__bkT = setTimeout(() => { try{ bkRun(); }catch(e){} }, 40000); }
const bkOn = () => !!(FB && grp() && prefs.bk !== false && window.crypto && crypto.subtle);
const u8b64 = u8 => { let s = ''; for(let i = 0; i < u8.length; i += 32768) s += String.fromCharCode.apply(null, u8.subarray(i, i + 32768)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const b64u8 = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); const b = atob(s + '==='.slice((s.length + 3) % 4)), u = new Uint8Array(b.length); for(let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
const u8enc = x => new TextEncoder().encode(JSON.stringify(x)), u8dec = u => JSON.parse(new TextDecoder().decode(u));
function bkKeyRaw(){ if(!prefs.bkKey){ const a = new Uint8Array(32); crypto.getRandomValues(a); prefs.bkKey = u8b64(a); savePrefs(); } return prefs.bkKey; }
function bkId(){ if(!prefs.bkId){ prefs.bkId = uid() + uid(); savePrefs(); } return prefs.bkId; }
let bkCK = null;
async function bkCrypto(raw){ if(bkCK && bkCK.raw === raw) return bkCK.key; const key = await crypto.subtle.importKey('raw', b64u8(raw), 'AES-GCM', false, ['encrypt', 'decrypt']); bkCK = {raw, key}; return key; }
const pipeZ = async (u8, T) => new Uint8Array(await new Response(new Blob([u8]).stream().pipeThrough(new T('gzip'))).arrayBuffer());
async function bkSeal(u8, zip, raw = bkKeyRaw()){
  let body = u8, z = 0;
  if(zip && window.CompressionStream){ try{ body = await pipeZ(u8, CompressionStream); z = 1; }catch(e){ body = u8; } }
  const iv = crypto.getRandomValues(new Uint8Array(12)), ct = new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM', iv}, await bkCrypto(raw), body));
  const out = new Uint8Array(13 + ct.length); out[0] = z; out.set(iv, 1); out.set(ct, 13);
  return u8b64(out);
}
async function bkUnseal(str, raw){
  const a = b64u8(str), pt = new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM', iv:a.slice(1, 13)}, await bkCrypto(raw), a.slice(13)));
  return a[0] ? pipeZ(pt, DecompressionStream) : pt;
}
const bkDoc = (bid, name, i, dev = myId()) => `bk_${dev}_${bid}_${name}${i ? '.' + i : ''}`;
async function bkPut(name, str){
  const n = Math.max(1, Math.ceil(str.length / BK_CHUNK));
  for(let i = 0; i < n; i++) await fsPut(BK_COL, bkDoc(bkId(), name, i), {bk:1, n, x:str.slice(i * BK_CHUNK, (i + 1) * BK_CHUNK)});
  return n;
}
async function bkGet1(code, docId){   // aus einer bestimmten Gruppe lesen (auch wenn dieses Gerät noch in keiner ist)
  const r = await fetch(`${fsBase(code)}/${BK_COL}/${encodeURIComponent(docId)}?key=${FB.apiKey}`);
  if(!r.ok) throw new Error('Firestore ' + r.status);
  return sjson((await r.json()).fields.d.stringValue);
}
async function bkGet(code, dev, bid, name, n){
  const first = await bkGet1(code, bkDoc(bid, name, 0, dev)); let s = first.x; n = first.n || n || 1;
  for(let i = 1; i < n; i++) s += (await bkGet1(code, bkDoc(bid, name, i, dev))).x;
  return s;
}
// alle Backups einer Person finden (nur Namen und Zeit laden, nicht die Daten)
async function bkFind(code, dev){
  const out = []; let tok = '';
  for(let i = 0; i < 30; i++){
    const r = await fetch(`${fsBase(code)}/${BK_COL}?pageSize=300&mask.fieldPaths=t${tok ? '&pageToken=' + encodeURIComponent(tok) : ''}&key=${FB.apiKey}`);
    if(!r.ok) throw new Error('Firestore ' + r.status);
    const j = await r.json();
    (j.documents || []).forEach(d => { const id = d.name.split('/').pop(), m = id.match(/^bk_([^_]+)_([^_]+)_c$/); if(m && m[1] === dev) out.push({bid:m[2], t:+((d.fields && d.fields.t && d.fields.t.integerValue) || 0)}); });
    if(!j.nextPageToken) break; tok = j.nextPageToken;
  }
  return out.sort((a, b) => b.t - a.t);
}
const bkLabel = () => /iPhone/.test(navigator.userAgent) ? 'iPhone' : /iPad/.test(navigator.userAgent) ? 'iPad' : /Android/.test(navigator.userAgent) ? 'Android' : 'PC';
const bkSig = t => (t.segs || []).length + ':' + (t.segs || []).reduce((a, s) => a + s.length, 0);
const bkPhotoIds = () => { const s = new Set(); data.spots.forEach(x => (x.photos || []).forEach(p => s.add(p))); garage.cars.forEach(c => c.photo && s.add(c.photo)); return [...s]; };
async function bkRun(force){
  if(!bkOn() || bk.busy || !navigator.onLine || WS.rulesOld) return;
  if(!force && localStorage.getItem('meine-spots-bk-dirty') !== '1' && Date.now() - (bk.at || 0) < 20 * 3600e3) return;
  bk.busy = true; bk.err = null; bkUI();
  if(bk.dev !== myId()){ bk.sent = {}; bk.dev = myId(); }   // andere Person auf diesem Gerät: alles neu sichern
  if(bk.code !== grp().code){ if(bk.code) bk.sent = {}; bk.code = grp().code; }   // neuer Einladungslink: Backup in die neue Crew-Ablage neu hochladen
  try{
    const id = bkId(), sent = bk.sent, own = myTracks().filter(t => !t._ws), parts = {t:{}, p:{}}, types = {};
    let i = 0;
    for(const t of own){
      i++; const k = 't:' + t.id, sig = bkSig(t);
      if(sent[k] && sent[k].s === sig){ parts.t[t.id] = sent[k].n; continue; }
      bk.prog = `Fahrten ${i}/${own.length}`; bkUI();
      sent[k] = {s:sig, n:await bkPut('t_' + t.id, await bkSeal(u8enc(t.segs || []), true))}; parts.t[t.id] = sent[k].n; bkSave();
    }
    const ph = bkPhotoIds(); i = 0;
    for(const p of ph){
      i++; const k = 'p:' + p;
      if(sent[k]){ parts.p[p] = sent[k].n; types[p] = sent[k].ty; continue; }
      const b = await PDB.get(p).catch(() => null); if(!b) continue;
      bk.prog = `Fotos ${i}/${ph.length}`; bkUI();
      sent[k] = {n:await bkPut('p_' + p, await bkSeal(new Uint8Array(await b.arrayBuffer()), false)), ty:b.type || 'image/jpeg'}; parts.p[p] = sent[k].n; types[p] = sent[k].ty; bkSave();
    }
    bk.prog = 'Spots und Einstellungen'; bkUI();
    const prefsOut = {}; BK_PREFS.forEach(k => { if(prefs[k] != null) prefsOut[k] = prefs[k]; });
    const core = {v:1, at:Date.now(), dev:myId(), name:myName(), label:bkLabel(), data, tracks:own.map(t => { const {segs, ...r} = t; return r; }), runs, courses, efforts, garage, roads:xRoads, prefs:prefsOut, parts, types};
    const cn = await bkPut('c', await bkSeal(u8enc(core), true));
    for(let j = cn; j < (sent.c || 0); j++) fsDel(BK_COL, bkDoc(id, 'c', j)).catch(() => {});
    sent.c = cn;
    Object.keys(sent).forEach(k => {   // gelöschte Fahrten und Fotos auch im Backup wegräumen
      if(k === 'c') return; const ty = k[0], x = k.slice(2);
      if((ty === 't' ? parts.t : parts.p)[x] != null) return;
      for(let j = 0; j < (sent[k].n || 1); j++) fsDel(BK_COL, bkDoc(id, ty + '_' + x, j)).catch(() => {});
      delete sent[k];
    });
    bk.at = Date.now(); bk.n = {s:data.spots.filter(x => !String(x.id).startsWith('bsp')).length, t:own.length, p:Object.keys(parts.p).length};
    try{ localStorage.removeItem('meine-spots-bk-dirty'); }catch(e){}
    bkSave();
    if(prefs.bkCodeSeen && !prefs.bkCodeFor) prefs.bkCodeFor = prefs.bkCodeG || grp().code;
    if(!prefs.bkCodeSeen || prefs.bkCodeFor !== grp().code){   // erstes Backup oder neuer Einladungslink: der alte Code gilt nicht mehr → neu sichern
      // kein Popup mitten in der Bedienung: ruhige Karte in der Crew und ein Punkt in den Einstellungen, bis der Code gesichert ist
      prefs.bkCodeSeen = 1; prefs.bkCodeFor = grp().code; prefs.bkTodo = 1; delete prefs.bkCodeG; savePrefs();
      if(tab === 'crew' && view === 'list') renderList();
    }
  }catch(e){ bk.err = /403/.test(e.message || '') ? 'Die Crew-Datenbank hat das Backup abgelehnt.' : 'Backup gerade nicht möglich. Es wird später nochmal versucht.'; }
  bk.busy = false; bk.prog = ''; bkUI();
}
function bkAgo(ts){ if(!ts) return 'noch nie'; const m = Math.round((Date.now() - ts) / 60000); return m < 1 ? 'gerade eben' : m < 60 ? `vor ${m} Min` : m < 1440 ? `vor ${Math.round(m / 60)} Std` : `am ${new Date(ts).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}`; }
function bkStatusTxt(){
  if(!(window.crypto && crypto.subtle)) return 'Geht in diesem Browser nicht';
  if(!grp()) return 'Braucht eine Crew';
  if(prefs.bk === false) return 'Aus';
  if(bk.busy) return 'Sichert …';
  return bk.at ? `Gesichert ${bkAgo(bk.at)}` : 'Noch nicht gesichert';
}
// Wiederherstellungscode: Gruppe, Person, Schlüssel und Backup-Nummer in einem
const bkCode = () => 'SPOTS-' + u8b64(u8enc({g:grp().code, gn:grp().name || 'Crew', d:myId(), n:myName(), k:bkKeyRaw()}));
function bkParse(raw){
  const m = String(raw || '').match(/SPOTS-([A-Za-z0-9_-]{40,})/) || String(raw || '').match(/restore=([A-Za-z0-9_-]{40,})/);
  if(!m) return null;
  try{ const o = u8dec(b64u8(m[1])); return o && o.g && o.g.length >= 20 && /^[A-Za-z0-9_-]{43}$/.test(o.k) && /^[a-z0-9]{8,64}$/i.test(o.d || '') ? o : null; }catch(e){ return null; }
}
let bkMode = 'main', bkCodeIn = '', bkErr = '', bkRes = null, bkOfferSrc = null;
document.addEventListener('click', e => { if(e.target.closest('[data-bktodo]')) openBackup('first'); });
function openBackup(mode = 'main', code = ''){
  bkMode = mode; bkErr = ''; if(code) bkCodeIn = code;
  $('#modal').hidden = false; renderBackup();
  if(mode === 'main' && bkOn() && !bk.busy && Date.now() - (bk.at || 0) > 60000) bkRun();
}
function bkUI(){
  if($('#modal .bk-dlg [data-bk="now"]') && !bkRes) renderBackup();
  const r = document.querySelector('[data-st="backup"] small'); if(r) r.textContent = bkStatusTxt();
}
function renderBackup(){
  const ti = $('#bk-in'); if(ti) bkCodeIn = ti.value;
  const has = window.crypto && crypto.subtle, n = bk.n;
  const head = `<div class="top"><strong>${bkMode === 'restore' ? 'Von anderem Gerät übernehmen' : 'Backup'}</strong><button class="icon-btn press" data-bk="close" aria-label="Schließen">${svg(UI.close, 14)}</button></div>`;
  const restore = `<label class="f">Code oder Geräte-Link<textarea class="inp bk-code-in" id="bk-in" rows="3" placeholder="SPOTS-… oder https://…#link=…" autocomplete="off" spellcheck="false">${esc(bkCodeIn)}</textarea></label>
    ${navigator.clipboard && navigator.clipboard.readText ? '<button class="txtbtn" data-bk="paste" style="align-self:flex-start">Aus der Zwischenablage einfügen</button>' : ''}
    <div class="err">${esc(bkErr)}</div>
    <button class="btn primary" data-bk="restore">Wiederherstellen</button>`;
  let body;
  if(!has) body = `<div class="muted">Dieser Browser kann nicht verschlüsseln. Nutze „Backup-Datei speichern“.</div>`;
  else if(bkMode === 'restore') body = `<div class="muted">Füg deinen Wiederherstellungscode ein – oder den Link aus „Auf weiterem Gerät nutzen“ von deinem Handy. Danach bist du hier derselbe, deine Spots und Fahrten kommen dazu.</div>${restore}`;
  else if(!grp()) body = `<div class="muted">Das Backup liegt verschlüsselt bei deiner Crew. Erstell eine Crew – auch nur für dich – oder tritt einer bei.</div>
    <div class="btns"><button class="btn" data-bk="gjoin">Beitreten</button><button class="btn primary" data-bk="gcreate">Crew erstellen</button></div>
    <div class="set-sec">Backup wiederherstellen</div>${restore}`;
  else body = `
    ${bkMode === 'first' ? `<div class="bk-first"><b>Backup ist an.</b><span>Speicher jetzt deinen Wiederherstellungscode, z. B. in den Notizen. Nur damit bekommst du alles auf ein neues Handy zurück.</span></div>` : ''}
    <div class="bk-stat${bk.err ? ' err' : bk.at ? ' ok' : ''}"><span class="bk-ic">${bk.busy ? '<i class="bk-spin"></i>' : bk.err ? '!' : bk.at ? '✓' : '…'}</span><div><b>${bk.busy ? `Sichert … ${esc(bk.prog || '')}` : prefs.bk === false ? 'Automatisches Backup ist aus' : bk.at ? `Gesichert ${bkAgo(bk.at)}` : 'Noch nicht gesichert'}</b><span>${bk.err ? esc(bk.err) : n ? `${n.s} Spots · ${n.t} Fahrten · ${n.p} Fotos · verschlüsselt` : 'Spots, Fahrten, Fotos, Garage und Zeiten · verschlüsselt'}</span></div></div>
    <button class="set-row bk-tg${prefs.bk !== false ? ' on' : ''}" data-bk="toggle"><span>Automatisch sichern<small>Kurz nach jeder Änderung</small></span><i class="tg"></i></button>
    <button class="btn" data-bk="now" ${bk.busy ? 'disabled' : ''}>Jetzt sichern</button>
    <div class="set-sec">Wiederherstellungscode</div>
    <div class="muted bk-txt">Damit holst du alles auf ein neues Gerät zurück. Wer den Code hat, kann dein Backup öffnen und ist in der Crew du – nur für dich aufbewahren.</div>
    <div class="btns"><button class="btn" data-bk="copy">Kopieren</button><button class="btn primary" data-bk="share">${svg(UI.share, 15)} Sichern</button></div>
    <div class="set-sec">Anderes Backup laden</div>${restore}`;
  const keep = $('#modal .bk-dlg .pad'), st = keep ? keep.scrollTop : 0;
  $('#modal').innerHTML = `<div class="dlg bk-dlg" role="dialog" aria-modal="true" aria-label="Backup">${head}<div class="pad">${body}</div></div>`;
  if(st) $('#modal .bk-dlg .pad').scrollTop = st;
}
function bkClose(){ $('#modal').hidden = true; bkRes = null; if(onbNeeded() && $('#onb').hidden){ $('#onb').hidden = false; renderOnb(); } }
// Nach „Gerät verknüpfen“: Daten vom anderen Gerät anbieten
function bkOffer(src, adopt){
  bkRes = null; bkOfferSrc = {src, adopt};
  $('#modal').innerHTML = `<div class="dlg bk-dlg" role="dialog" aria-modal="true" aria-label="Backup übernehmen"><div class="pad" style="padding:20px 16px 16px;gap:12px">
    <h2>Spots und Fahrten übernehmen?</h2><div class="muted">Aus dem Backup deines anderen Geräts. Nichts auf diesem Gerät wird gelöscht.</div>
    <div class="btns"><button class="btn" data-bk="close">Nicht jetzt</button><button class="btn primary" data-bk="offer">Übernehmen</button></div></div></div>`;
  $('#modal').hidden = false;
}
async function bkRestore(src, adopt){
  bkRes = {txt:'Suche Backup …'};
  const prog = t => { bkRes.txt = t; const el = $('#bk-prog'); if(el) el.textContent = t; };
  $('#modal').innerHTML = `<div class="dlg bk-dlg" role="dialog" aria-modal="true" aria-label="Wiederherstellen"><div class="pad" style="padding:24px 16px;gap:12px;align-items:center;text-align:center"><i class="bk-spin big"></i><b id="bk-prog">Suche Backup …</b><span class="muted">App bitte offen lassen.</span></div></div>`;
  $('#modal').hidden = false;
  const raw = src.k, fail = msg => { bkRes = null; bkMode = 'restore'; bkErr = msg; renderBackup(); };
  let found, cores = [];
  try{ found = await bkFind(src.g, src.d); }catch(e){ return fail('Backup gerade nicht erreichbar. Prüfe dein Internet.'); }
  if(!found.length){
    let moved = false; try{ moved = !!(await crewPeek(src.g)).crew?.moved; }catch(e){}
    return fail(moved ? 'Deine Crew hat inzwischen einen neuen Einladungslink. Dieser Code gilt deshalb nicht mehr – öffne Spots auf deinem alten Gerät und hol dir unter Backup den neuen Code.' : 'Zu diesem Code gibt es (noch) kein Backup.');
  }
  for(const f of found){ try{ cores.push({bid:f.bid, c:u8dec(await bkUnseal(await bkGet(src.g, src.d, f.bid, 'c'), raw))}); }catch(e){} }
  if(!cores.length) return fail('Der Code passt nicht zum Backup.');
  if(adopt){   // neues Gerät oder App neu installiert: Gruppe und Person übernehmen, eigenes neues Backup
    const oldG = grp();
    if(oldG && (oldG.code !== src.g || myId() !== src.d)){
      if(!confirm(`Dieses Gerät ist gerade als „${myName() || 'du'}“ in „${oldG.name}“. Mit dem Code wechselt es zu „${src.gn || 'deiner Crew'}“${src.n ? ` als „${src.n}“` : ''} und verlässt „${oldG.name}“. Weiter?`)){ bkRes = null; renderBackup(); return; }
      memberGone(oldG.code, myId());
    }
    liveStop(true);
    prefs.group = {code:src.g, name:src.gn || 'Crew', joined:Date.now()}; prefs.dev = src.d; if(src.n) prefs.myName = src.n;
    if(prefs.bkKey !== raw){ prefs.bkKey = raw; bk.sent = {}; }
    prefs.linkAdopt = true; prefs.memberSig = ''; prefs.onb = 1; prefs.bkCodeSeen = 1; prefs.bkCodeG = src.g; delete prefs.wsSeen; delete prefs.rxSeen; savePrefs();
  }
  let ns = 0, nt = 0, np = 0;
  for(const {bid, c:core} of cores){
    sanitize(core);
    (core.data && core.data.cats || []).forEach(c => { if(c && c.id && !data.cats.some(x => x.id === c.id)) data.cats.push(c); });
    const real = (core.data && core.data.spots || []).filter(s => !String(s.id).startsWith('bsp'));
    if(real.length) data.spots = data.spots.filter(s => !String(s.id).startsWith('bsp'));
    real.forEach(s => { if(s && typeof s.lat === 'number' && !data.spots.some(x => x.id === s.id)){ data.spots.push(s); ns++; } });
    (core.runs || []).forEach(r => { if(r && r.id && !runs.some(x => x.id === r.id)) runs.push(r); });
    (core.courses || []).forEach(c => { if(c && c.id && !courses.some(x => x.id === c.id)) courses.push(c); });
    (core.efforts || []).forEach(f => { if(f && f.id && !efforts.some(x => x.id === f.id)) efforts.push(f); });
    if(core.garage && Array.isArray(core.garage.cars)){ core.garage.cars.forEach(c => { if(c && c.id && !garage.cars.some(x => x.id === c.id)) garage.cars.push(c); }); if(!garage.active) garage.active = core.garage.active || null; }
    if(core.roads) Object.entries(core.roads).forEach(([k, v]) => { if(!xRoads[k]) xRoads[k] = v; });
    Object.entries(core.prefs || {}).forEach(([k, v]) => { if(k === 'wayPlaces'){ const have = new Set((prefs.wayPlaces || []).map(x => x.id)); prefs.wayPlaces = [...(prefs.wayPlaces || []), ...(v || []).filter(x => !have.has(x.id))]; } else if(prefs[k] == null) prefs[k] = v; });
    save(); runs.sort((a, b) => b.date - a.date); saveRuns(); saveCourses(); saveEfforts(); saveGarage(); savePrefs();
    try{ localStorage.setItem(XR_KEY, JSON.stringify(xRoads)); }catch(e){}
    const parts = core.parts || {t:{}, p:{}}, todo = (core.tracks || []).filter(t => t && t.id && !tracks.some(x => x.id === t.id));
    for(let i = 0; i < todo.length; i++){
      const t = todo[i]; prog(`Fahrten ${i + 1} von ${todo.length}`);
      try{ tracks.push({...t, segs:u8dec(await bkUnseal(await bkGet(src.g, src.d, bid, 't_' + t.id, parts.t[t.id]), raw))}); nt++; }catch(e){}
      if(i % 10 === 9) saveTracks();
    }
    tracks.sort((a, b) => b.created - a.created); saveTracks();
    const pids = Object.keys(parts.p || {});
    for(let i = 0; i < pids.length; i++){
      const p = pids[i]; prog(`Fotos ${i + 1} von ${pids.length}`);
      try{ if(!(await PDB.get(p).catch(() => null))){ const u = await bkUnseal(await bkGet(src.g, src.d, bid, 'p_' + p, parts.p[p]), raw); await PDB.put(p, new Blob([u], {type:(core.types || {})[p] || 'image/jpeg'})); np++; } }catch(e){}
    }
  }
  try{ syncMatchers(); }catch(e){}
  bkDirty();
  bkRes = null; $('#modal').hidden = true; $('#onb').hidden = true;
  if(adopt){ WS.spots = []; WS.runs = []; WS.courses = []; WS.efforts = []; WS.members = []; WS.drives = []; WS.reacts = []; WS.events = []; WS.rsvps = []; WS.crew = null; WS.loaded = 0; }
  applyTheme(); syncSpotsHead(); refreshAll(); liveWatch(); if(grp()) wsSync(true);
  toast(`Wiederhergestellt: ${ns} Spots, ${nt} Fahrten, ${np} Fotos`);
}
$('#modal').addEventListener('click', async e => {
  const b = e.target.closest('[data-bk]'); if(!b) return;
  const a = b.dataset.bk, inp = $('#bk-in'); if(inp) bkCodeIn = inp.value;
  if(a === 'close') return bkClose();
  if(a === 'toggle'){ prefs.bk = prefs.bk === false; savePrefs(); renderBackup(); if(prefs.bk !== false) bkRun(true); return; }
  if(a === 'now') return bkRun(true);
  if(a === 'copy' || a === 'share'){ prefs.bkCodeG = grp().code; delete prefs.bkTodo; savePrefs(); if(tab === 'crew' && view === 'list') renderList(); }
  if(a === 'copy') return copyText(bkCode(), 'Code kopiert – leg ihn an einem sicheren Ort ab');
  if(a === 'share') return shareURL(`${appURL()}#restore=${bkCode().slice(6)}`, 'Spots-Wiederherstellungscode', `Mein Spots-Wiederherstellungscode (nicht weitergeben):\n${bkCode()}\n`);
  if(a === 'gcreate'){ $('#modal').hidden = true; openGroupDlg('create', {}); return; }
  if(a === 'gjoin'){ $('#modal').hidden = true; openGroupDlg('code', {}); return; }
  if(a === 'paste'){ try{ bkCodeIn = (await navigator.clipboard.readText()).trim(); bkErr = ''; }catch(_){ bkErr = 'Einfügen ging nicht – halt das Feld gedrückt und wähle „Einsetzen“.'; } return renderBackup(); }
  if(a === 'restore'){
    const acc = accountFromText(bkCodeIn); if(acc && acc.type === 'link'){ bkCodeIn = ''; return openLinkAccept(acc.lo); }
    const o = bkParse(bkCodeIn); if(!o){ bkErr = 'Das ist kein gültiger Wiederherstellungscode. Kopier ihn komplett (beginnt mit SPOTS-).'; return renderBackup(); }
    const same = grp() && grp().code === o.g && myId() === o.d;   // gleiche Person: nur Daten zusammenführen
    return bkRestore(o, !same && (!grp() || !myName() || (!tracks.length && !data.spots.some(s => !String(s.id).startsWith('bsp')))));
  }
  if(a === 'offer' && bkOfferSrc){ const x = bkOfferSrc; bkOfferSrc = null; return bkRestore(x.src, x.adopt); }
});
// beim Start: liegengebliebene Änderungen sichern
setTimeout(() => { if(bkOn() && (localStorage.getItem('meine-spots-bk-dirty') === '1' || Date.now() - (bk.at || 0) > 20 * 3600e3)) bkRun(); }, 12000);
window.addEventListener('online', () => { if(bkOn() && localStorage.getItem('meine-spots-bk-dirty') === '1') setTimeout(bkRun, 5000); });

/* ================= Garage: deine echten Autos =================
   Bleibt auf diesem Gerät. Kilometerstand = eingetragener Stand + aufgezeichnete Fahrten danach. */
const GKEY = 'meine-spots-garage';
let garage = {cars:[], active:null};
try{ const g = JSON.parse(localStorage.getItem(GKEY) || 'null'); if(g && Array.isArray(g.cars)) garage = g; }catch(e){}
function saveGarage(){ bkDirty(); try{ localStorage.setItem(GKEY, JSON.stringify(garage)); return true; }catch(e){ toast('Speicher ist voll.'); return false; } }
const gCar = id => garage.cars.find(c => c.id === id) || null;
const gActive = () => gCar(garage.active);
const gModel = c => [c.make, c.model].filter(Boolean).join(' ');
const gTitle = c => c.nick || gModel(c) || 'Auto';
const fmtNum = n => Math.round(n).toLocaleString('de-DE');
const gTracks = c => tracks.filter(t => t.car === c.id);
function gKm(c){ return Math.round((+c.km || 0) + gTracks(c).filter(t => (t.created || 0) > (c.kmAt || 0)).reduce((a, t) => a + (t.dist || 0), 0) / 1000); }
function gDue(c){
  const out = [], now = new Date(), mo = now.getMonth() + 1;
  if(c.tuv && /^\d{4}-\d{2}$/.test(c.tuv)){
    const [y, m] = c.tuv.split('-').map(Number), end = new Date(y, m, 0, 23, 59), days = Math.round((end - now) / 864e5), lbl = new Date(y, m - 1).toLocaleDateString('de-DE', {month:'short', year:'numeric'});
    out.push({k:'tuv', lvl:days < 0 ? 2 : days <= 45 ? 1 : 0, txt:days < 0 ? `TÜV überfällig (${lbl})` : `TÜV ${lbl}`});
  }
  if(+c.svcKm){ const left = +c.svcKm - gKm(c); out.push({k:'svc', lvl:left <= 0 ? 2 : left <= 1000 ? 1 : 0, txt:left <= 0 ? `Service fällig (${fmtNum(-left)} km drüber)` : `Service in ${fmtNum(left)} km`}); }
  if(c.svcDate){ const d = new Date(c.svcDate), days = Math.round((d - now) / 864e5); out.push({k:'svcd', lvl:days < 0 ? 2 : days <= 30 ? 1 : 0, txt:days < 0 ? 'Service-Termin überfällig' : `Service bis ${d.toLocaleDateString('de-DE', {day:'numeric', month:'short', year:'numeric'})}`}); }
  if(c.tires === 'summer' && (mo >= 10 || mo <= 3)) out.push({k:'tires', lvl:1, txt:'Zeit für Winterreifen'});
  if(c.tires === 'winter' && mo >= 5 && mo <= 9) out.push({k:'tires', lvl:0, txt:'Sommerreifen drauf?'});
  return out;
}
const gDueHTML = c => gDue(c).map(d => `<span class="gdue l${d.lvl}">${esc(d.txt)}</span>`).join('');
function gUse(id){
  const c = gCar(id); if(!c) return;
  garage.active = id; saveGarage();
  if(CAR_TYPES[c.type] && CAR_COLORS[c.color]){ prefs.carType = c.type; prefs.carColor = c.color; savePrefs(); carApplyAll(); }
  if(grp()) pushMember().then(wsCache).catch(() => {});
}
function gCheck(){   // einmal am Tag an fällige Sachen erinnern
  const day = new Date().toDateString(); if(prefs.gChk === day || !garage.cars.length) return;
  prefs.gChk = day; savePrefs();
  for(const c of garage.cars){ const d = gDue(c).find(x => x.lvl >= 1 && x.k !== 'tires') || gDue(c).find(x => x.lvl >= 1); if(d){ toast(`${gTitle(c)}: ${d.txt}`); break; } }
}
setTimeout(gCheck, 5000);
let gEdit = null, gDelArmed = false;
function openGarage(){
  gEdit = null;
  const cars = garage.cars.slice().sort((a, b) => (b.id === garage.active) - (a.id === garage.active) || (a.created || 0) - (b.created || 0));
  $('#modal').innerHTML = `<div class="dlg gar-dlg" role="dialog" aria-modal="true" aria-label="Garage">
    <div class="top" style="padding:12px 14px"><button class="txtbtn" data-g="settings">${svg(UI.back, 14)} Einstellungen</button><strong style="font-size:17px">Garage</strong><button class="txtbtn bold" data-g="new">${svg(UI.plus, 14)} Auto</button></div>
    <div class="pad" style="padding-top:2px;gap:10px">
      ${cars.length ? cars.map(c => `<button class="gcar${c.id === garage.active ? ' on' : ''}" data-g="open" data-id="${c.id}">
        <span class="gpic">${c.photo ? `<img data-ph="${esc(c.photo)}" alt="">` : carSideSVG(CAR_TYPES[c.type] ? c.type : 'limo', CAR_COLORS[c.color] ? c.color : 'carbon')}</span>
        <span class="gtx"><b>${esc(gTitle(c))}${c.id === garage.active ? '<i class="gact">Aktiv</i>' : ''}</b><span>${esc([c.nick ? gModel(c) : '', c.year].filter(Boolean).join(' · ') || 'Tippen zum Bearbeiten')}</span>
          <span class="gkm">${fmtNum(gKm(c))} km${gTracks(c).length ? ` · ${gTracks(c).length} Fahrt${gTracks(c).length === 1 ? '' : 'en'} aufgezeichnet` : ''}</span><span class="gdues">${gDueHTML(c)}</span></span></button>`).join('')
      : `<div class="empty"><b>Noch kein Auto in der Garage</b>Leg dein Auto an – mit Kilometerstand, TÜV und Service-Erinnerung. Aufgezeichnete Fahrten zählen automatisch dazu.</div>`}
      <button class="btn primary" data-g="new">${svg(UI.plus, 15)} Auto hinzufügen</button>
      ${garage.cars.length ? `<button class="set-row${prefs.gShare !== false ? ' on' : ''}" data-g="share" role="switch" aria-checked="${prefs.gShare !== false}" style="border-radius:14px;background:var(--solid);border:1px solid var(--line)"><span>Marke und Modell in der Crew zeigen<small>Vom aktiven Auto, z. B. im Profil</small></span><i class="tg"></i></button>` : ''}
    </div></div>`;
  $('#modal').hidden = false; fillPhotos($('#modal'));
}
function openGarageCar(id){
  const c = id ? gCar(id) : null;
  if(!gEdit || gEdit.id !== (id || gEdit.id)) gEdit = c ? {...c} : {id:uid(), isNew:true, type:carType(), color:carColor(), tires:'', created:Date.now()};
  const e = gEdit, isNew = !c, tr = c ? gTracks(c) : [];
  const fld = (k, label, attrs = '') => `<label class="f">${label}<input class="inp" data-gf="${k}" value="${esc(e[k] == null ? '' : e[k])}" ${attrs}></label>`;
  $('#modal').innerHTML = `<div class="dlg gar-dlg" role="dialog" aria-modal="true" aria-label="Auto">
    <div class="top" style="padding:12px 14px"><button class="txtbtn" data-g="back">${svg(UI.back, 14)} Garage</button><strong style="font-size:17px">${isNew ? 'Neues Auto' : esc(gTitle(e))}</strong><button class="txtbtn bold" data-g="save">Speichern</button></div>
    <div class="pad" style="padding-top:2px;gap:12px">
      <button class="gphoto" data-g="photo">${e.photo ? `<img data-ph="${esc(e.photo)}" alt="">` : `${carSideSVG(CAR_TYPES[e.type] ? e.type : 'limo', CAR_COLORS[e.color] ? e.color : 'carbon')}<span>Foto hinzufügen</span>`}</button>
      ${fld('nick', 'Spitzname', 'placeholder="z. B. Golfi" maxlength="24"')}
      <div class="g2">${fld('make', 'Marke', 'placeholder="z. B. VW" maxlength="24"')}${fld('model', 'Modell', 'placeholder="z. B. Golf 7 GTI" maxlength="30"')}</div>
      <div class="g2">${fld('year', 'Baujahr', 'inputmode="numeric" maxlength="4" placeholder="2016"')}${fld('km', 'Kilometerstand', 'inputmode="numeric" maxlength="7" placeholder="z. B. 84500"')}</div>
      <div class="set-sec">Termine</div>
      <div class="g2">${fld('tuv', 'TÜV fällig', 'type="month"')}${fld('svcKm', 'Service bei km', 'inputmode="numeric" maxlength="7" placeholder="z. B. 90000"')}</div>
      ${fld('svcDate', 'oder Service bis', 'type="date"')}
      <div class="f">Reifen gerade<div class="seg2">${[['summer', 'Sommer'], ['winter', 'Winter'], ['all', 'Ganzjahr']].map(([k, n]) => `<button class="${e.tires === k ? 'on' : ''}" data-g="tires" data-v="${k}">${n}</button>`).join('')}</div></div>
      <div class="set-sec">In der App</div>
      <div class="gtypes">${Object.entries(CAR_TYPES).map(([k, x]) => `<button class="gtype${e.type === k ? ' on' : ''}" data-g="type" data-v="${k}">${carSideSVG(k, e.color)}<span>${esc(x.short || x.name)}</span></button>`).join('')}</div>
      <div class="cp-colors">${Object.entries(CAR_COLORS).map(([k, x]) => `<button class="cp-col${k === e.color ? ' on' : ''}" data-g="color" data-v="${k}" style="--c:${x.hex}" aria-label="${esc(x.name)}" title="${esc(x.name)}"></button>`).join('')}</div>
      <label class="f">Notizen<textarea class="inp" data-gf="notes" rows="2" maxlength="400" placeholder="z. B. Reifendruck 2,4 bar, Ölsorte 5W-30">${esc(e.notes || '')}</textarea></label>
      ${tr.length ? `<div class="muted">Aufgezeichnet: ${fmtKmS(tr.reduce((a, t) => a + (t.dist || 0), 0))} in ${tr.length} Fahrt${tr.length === 1 ? '' : 'en'}</div>` : ''}
      <div class="err" id="g-err"></div>
      ${!isNew && garage.active !== e.id ? `<button class="btn primary" data-g="use">Als aktives Auto nutzen</button>` : ''}
      ${!isNew ? `<button class="btn danger${gDelArmed ? ' armed' : ''}" data-g="del">${gDelArmed ? 'Wirklich löschen? Nochmal tippen' : 'Auto löschen'}</button>` : ''}
    </div></div>`;
  $('#modal').hidden = false; fillPhotos($('#modal'));
}
function gSync(){ $('#modal').querySelectorAll('[data-gf]').forEach(i => { gEdit[i.dataset.gf] = i.value.trim(); }); }
$('#modal').addEventListener('click', async e => {
  const b = e.target.closest('[data-g]'); if(!b || !$('#modal .gar-dlg')) return;
  const a = b.dataset.g;
  if(a === 'settings'){ renderSettings(); return; }
  if(a === 'new'){ gEdit = null; gDelArmed = false; openGarageCar(null); return; }
  if(a === 'open'){ gEdit = null; gDelArmed = false; openGarageCar(b.dataset.id); return; }
  if(a === 'back'){ gEdit = null; openGarage(); return; }
  if(a === 'share'){ prefs.gShare = prefs.gShare === false; savePrefs(); openGarage(); if(grp()) pushMember().then(wsCache).catch(() => {}); return; }
  if(!gEdit) return;
  gSync();
  if(a === 'tires' || a === 'type' || a === 'color'){ gEdit[a] = b.dataset.v; openGarageCar(gEdit.isNew ? null : gEdit.id); return; }
  if(a === 'photo'){ $('#gFile').click(); return; }
  if(a === 'use'){ gUse(gEdit.id); toast(`${gTitle(gEdit)} ist jetzt dein aktives Auto`); openGarage(); return; }
  if(a === 'del'){
    if(!gDelArmed){ gDelArmed = true; openGarageCar(gEdit.id); return; }
    const c = gCar(gEdit.id); if(c && c.photo) PDB.del(c.photo).catch(() => {});
    garage.cars = garage.cars.filter(x => x.id !== gEdit.id); if(garage.active === gEdit.id) garage.active = garage.cars[0] ? garage.cars[0].id : null;
    saveGarage(); gDelArmed = false; gEdit = null; toast('Auto gelöscht'); openGarage(); return;
  }
  if(a === 'save'){
    const x = gEdit, err = t => { $('#g-err').textContent = t; };
    if(!x.nick && !x.make && !x.model) return err('Gib wenigstens einen Spitznamen oder Marke/Modell ein.');
    for(const k of ['year', 'km', 'svcKm']){ x[k] = String(x[k] || '').replace(/[^\d]/g, ''); if(x[k] === '') delete x[k]; else x[k] = +x[k]; }
    if(x.year && (x.year < 1900 || x.year > new Date().getFullYear() + 1)) return err('Das Baujahr passt nicht.');
    const old = gCar(x.id);
    if(!old || +old.km !== +x.km) x.kmAt = Date.now();   // neuer Stand: Fahrten ab jetzt zählen dazu
    const isNew = x.isNew; delete x.isNew;
    if(old) Object.assign(old, x); else garage.cars.push(x);
    if(isNew && !garage.active) garage.active = x.id;
    saveGarage();
    if(garage.active === x.id) gUse(x.id);
    toast(isNew ? `${gTitle(x)} steht in der Garage` : 'Gespeichert');
    gEdit = null; openGarage();
  }
});
$('#gFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if(!f || !gEdit) return;
  try{ const bl = await shrinkImage(f, 1200, .82), id = 'g_' + gEdit.id + '_' + uid(); await PDB.put(id, bl); if(gEdit.photo && gEdit.photo !== (gCar(gEdit.id) || {}).photo) PDB.del(gEdit.photo).catch(() => {}); gEdit.photo = id; openGarageCar(gEdit.isNew ? null : gEdit.id); }
  catch(_){ toast('Das Bild konnte nicht gelesen werden.'); }
});
// Beim Speichern einer Fahrt: mit welchem Auto?
let tsCar = null;
function tsCarHTML(){
  if(!garage.cars.length) return '';
  if(tsCar == null) tsCar = garage.active;
  return `<div class="f">Gefahren mit<div class="chips ts-cars">${garage.cars.map(c => `<button class="chip${c.id === tsCar ? ' on' : ''}" data-tscar="${c.id}">${esc(gTitle(c))}</button>`).join('')}</div></div>`;
}
document.addEventListener('click', e => { const b = e.target.closest('[data-tscar]'); if(!b) return; tsCar = b.dataset.tscar; document.querySelectorAll('[data-tscar]').forEach(x => x.classList.toggle('on', x === b)); });

/* ================= Fahrt als Bild teilen =================
   Story (9:16) oder Quadrat. Start und Ziel sind um 250 m gekürzt, damit die Haustür nicht drauf ist. */
let shareImg = {t:null, fmt:'story', url:null, blob:null};
async function drawDriveImage(t, fmt){
  const W = 1080, H = fmt === 'story' ? 1920 : 1080, c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  try{ await Promise.all([document.fonts.load('800 80px Geist'), document.fonts.load('600 40px Geist')]); }catch(e){}
  const F = (w, px) => `${w} ${px}px Geist, system-ui, -apple-system, sans-serif`;
  const acc = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#4da3ff';
  // Hintergrund
  const bg = x.createLinearGradient(0, 0, W * .4, H); bg.addColorStop(0, '#0d1422'); bg.addColorStop(.55, '#0a0d14'); bg.addColorStop(1, '#06070a');
  x.fillStyle = bg; x.fillRect(0, 0, W, H);
  const glow = x.createRadialGradient(W * .7, H * .32, 20, W * .7, H * .32, W * .9); glow.addColorStop(0, 'rgba(27,94,154,.35)'); glow.addColorStop(1, 'rgba(27,94,154,0)');
  x.fillStyle = glow; x.fillRect(0, 0, W, H);
  const segs = trimSegs(t.segs || [], 250) || [];
  const flat = segs.flat(); if(flat.length < 2) throw new Error('kurz');
  // Projektion (Mercator) in den Kartenbereich
  const my = lat => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) * 180 / Math.PI;
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  flat.forEach(q => { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); const yy = my(q[1]); y0 = Math.min(y0, yy); y1 = Math.max(y1, yy); });
  const box = fmt === 'story' ? {l:110, t:370, w:W - 220, h:H - 370 - 590} : {l:110, t:290, w:W - 220, h:H - 290 - 400};
  const sc = Math.min(box.w / Math.max(1e-6, x1 - x0), box.h / Math.max(1e-6, y1 - y0)), ox = box.l + (box.w - (x1 - x0) * sc) / 2, oy = box.t + (box.h - (y1 - y0) * sc) / 2;
  const P = q => [ox + (q[0] - x0) * sc, oy + (y1 - my(q[1])) * sc];
  // andere eigene Fahrten in der Gegend ganz leicht als Kulisse
  const pad = (x1 - x0) * .25 + .002;
  x.lineCap = x.lineJoin = 'round';
  myTracks().filter(o => o.id !== t.id).forEach(o => (o.segs || []).forEach(sg => {
    if(!sg.some(q => q[0] > x0 - pad && q[0] < x1 + pad && my(q[1]) > y0 - pad && my(q[1]) < y1 + pad)) return;
    x.beginPath(); sg.forEach((q, i) => { const [a, b] = P(q); i ? x.lineTo(a, b) : x.moveTo(a, b); }); x.strokeStyle = 'rgba(255,255,255,.07)'; x.lineWidth = 5; x.stroke();
  }));
  // die Fahrt: Leuchten, dann Farbverlauf
  const [sx, sy] = P(flat[0]), [ex, ey] = P(flat[flat.length - 1]);
  const gr = x.createLinearGradient(sx, sy, ex, ey); gr.addColorStop(0, acc); gr.addColorStop(1, '#ff9f0a');
  const path = () => { x.beginPath(); segs.forEach(sg => sg.forEach((q, i) => { const [a, b] = P(q); i ? x.lineTo(a, b) : x.moveTo(a, b); })); };
  x.save(); x.shadowColor = acc.startsWith('#') ? hexA(acc, .5) : 'rgba(244,211,94,.5)'; x.shadowBlur = 36; path(); x.strokeStyle = gr; x.lineWidth = 14; x.stroke(); x.restore();
  path(); x.strokeStyle = 'rgba(255,255,255,.85)'; x.lineWidth = 3.5; x.stroke();
  const dot = (a, b, col) => { x.beginPath(); x.arc(a, b, 17, 0, 7); x.fillStyle = '#fff'; x.fill(); x.beginPath(); x.arc(a, b, 11, 0, 7); x.fillStyle = col; x.fill(); };
  dot(sx, sy, '#30d158'); dot(ex, ey, '#ff453a');
  // Kopf
  x.fillStyle = 'rgba(255,255,255,.55)'; x.font = F(700, 30); x.textBaseline = 'alphabetic';
  x.fillText('SPOTS', 90, fmt === 'story' ? 150 : 110);
  x.fillStyle = '#fff'; x.font = F(800, fmt === 'story' ? 78 : 64);
  let title = t.name || 'Fahrt'; while(x.measureText(title).width > W - 180 && title.length > 4) title = title.slice(0, -2);
  if(title !== (t.name || 'Fahrt')) title = title.trim() + '…';
  x.fillText(title, 90, fmt === 'story' ? 240 : 185);
  const when = new Date(t.created).toLocaleDateString('de-DE', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  const where = t.place && (t.place.a || t.place.b) ? (t.place.a && t.place.b && t.place.a !== t.place.b ? `${t.place.a} → ${t.place.b}` : t.place.a || t.place.b) : '';
  x.fillStyle = 'rgba(255,255,255,.62)'; x.font = F(600, 32);
  x.fillText(where ? `${when} · ${where}` : when, 90, fmt === 'story' ? 292 : 228, W - 180);
  // Zahlen
  const avg = t.dur ? t.dist / (t.dur / 1000) * 3.6 : 0, xp = xplCalc().per[t.id], car = t.car && gCar(t.car);
  const mins = Math.round((t.dur || 0) / 60000), dur = mins < 60 ? [`${mins}`, 'Minuten'] : [`${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`, 'Stunden'];
  const stats = [[fmtKm1(t.dist), 'Kilometer'], dur, [String(Math.round(avg)), 'Ø km/h']];
  const sy0 = fmt === 'story' ? H - 430 : H - 250, cw = (W - 180) / 3;
  x.fillStyle = 'rgba(255,255,255,.08)'; x.beginPath(); x.roundRect ? x.roundRect(60, sy0 - 95, W - 120, 190, 36) : x.rect(60, sy0 - 95, W - 120, 190); x.fill();
  stats.forEach(([v, l], i) => {
    x.fillStyle = '#fff'; x.font = F(800, 72); x.fillText(v, 90 + i * cw, sy0 + 10, cw - 20);
    x.fillStyle = 'rgba(255,255,255,.55)'; x.font = F(600, 28); x.fillText(l, 92 + i * cw, sy0 + 58);
  });
  const extra = [xp && xp.newKm >= .5 ? `Neuland +${fmtKm1(xp.newKm * 1000)} km` : '', car ? `mit ${gTitle(car)}` : ''].filter(Boolean).join('  ·  ');
  if(extra && fmt === 'story'){ x.fillStyle = 'rgba(255,255,255,.7)'; x.font = F(600, 34); x.fillText(extra, 90, H - 210, W - 180); }
  x.fillStyle = 'rgba(255,255,255,.35)'; x.font = F(600, 24); x.fillText('Start und Ziel gekürzt', 90, fmt === 'story' ? H - 120 : H - 60);
  return await new Promise(res => c.toBlob(res, 'image/png'));
}
async function openShareImg(t, fmt = shareImg.fmt){
  shareImg.t = t; shareImg.fmt = fmt;
  let blob; try{ blob = await drawDriveImage(t, fmt); }catch(e){ toast('Die Fahrt ist zu kurz für ein Bild.'); return; }
  if(shareImg.url) URL.revokeObjectURL(shareImg.url);
  shareImg.blob = blob; shareImg.url = URL.createObjectURL(blob);
  $('#modal').innerHTML = `<div class="dlg shimg-dlg" role="dialog" aria-modal="true" aria-label="Fahrt als Bild"><div class="pad" style="padding:16px;gap:12px">
    <div class="seg2">${[['story', 'Story 9:16'], ['square', 'Quadrat']].map(([k, n]) => `<button class="${k === fmt ? 'on' : ''}" data-shi="fmt" data-v="${k}">${n}</button>`).join('')}</div>
    <div class="shimg-prev ${fmt}"><img src="${shareImg.url}" alt="Vorschau"></div>
    <div class="btns"><button class="btn" data-shi="save">Speichern</button><button class="btn primary" data-shi="share">${svg(UI.share, 15)} Teilen</button></div>
    <button class="txtbtn" data-shi="close" style="align-self:center">Schließen</button></div></div>`;
  $('#modal').hidden = false;
}
$('#modal').addEventListener('click', async e => {
  const b = e.target.closest('[data-shi]'); if(!b || !shareImg.t) return;
  const a = b.dataset.shi, name = `${(shareImg.t.name || 'fahrt').replace(/[^\wäöüÄÖÜß -]+/g, '').trim() || 'fahrt'}.png`;
  if(a === 'fmt') return openShareImg(shareImg.t, b.dataset.v);
  if(a === 'close'){ $('#modal').hidden = true; return; }
  if(a === 'share'){
    const f = new File([shareImg.blob], name, {type:'image/png'});
    if(navigator.canShare && navigator.canShare({files:[f]})){ try{ await navigator.share({files:[f], title:shareImg.t.name || 'Fahrt'}); }catch(_){} return; }
  }
  const l = document.createElement('a'); l.href = shareImg.url; l.download = name; document.body.appendChild(l); l.click(); l.remove();
  if(a === 'share') toast('Teilen geht hier nicht direkt – das Bild wurde gespeichert.');
});

/* ================= Export / Import ================= */
$('#exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({app:'meine-spots', version:1, exported:new Date().toISOString(), ...data, tracks, runs, courses, efforts, garage:{cars:garage.cars.map(c => ({...c, photo:undefined})), active:garage.active}}, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = `spots-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast(`${data.spots.length} Spots exportiert`);
});
$('#importBtn').addEventListener('click', () => $('#importFile').click());
$('#importFile').addEventListener('change', async e => {
  const f = e.target.files[0]; e.target.value = ''; if(!f) return;
  try{
    const j = sjson(await f.text());
    if(!Array.isArray(j.spots) && !Array.isArray(j.tracks) && !Array.isArray(j.runs) && !Array.isArray(j.courses)) throw 0;
    (j.cats || []).forEach(c => { if(c && c.id && !data.cats.some(x => x.id === c.id)) data.cats.push(c); });
    let n = 0, nt = 0;
    if(Array.isArray(j.spots)){
      if(j.spots.some(s => s && !String(s.id).startsWith('bsp'))) data.spots = data.spots.filter(s => !String(s.id).startsWith('bsp'));
      j.spots.forEach(s => {
        if(!s || typeof s.lat !== 'number' || typeof s.lng !== 'number') return;
        const i = data.spots.findIndex(x => x.id === s.id);
        if(i >= 0) data.spots[i] = s; else data.spots.push({...s, id: s.id || uid()});
        n++;
      });
    }
    if(j.garage && Array.isArray(j.garage.cars)){
      j.garage.cars.forEach(c => { if(!c || !c.id) return; const i = garage.cars.findIndex(x => x.id === c.id); if(i >= 0) garage.cars[i] = {...garage.cars[i], ...c, photo:garage.cars[i].photo}; else garage.cars.push(c); });
      if(!garage.active && j.garage.active) garage.active = j.garage.active; saveGarage();
    }
    if(Array.isArray(j.tracks)){
      j.tracks.forEach(t => {
        if(!t || !t.id || !Array.isArray(t.segs)) return;
        const i = tracks.findIndex(x => x.id === t.id);
        if(i >= 0) tracks[i] = t; else tracks.push(t);
        nt++;
      });
      tracks.sort((a, b) => b.created - a.created); saveTracks();
    }
    if(Array.isArray(j.runs)){
      j.runs.forEach(r => { if(r && r.id && !runs.some(x => x.id === r.id)) runs.push(r); });
      runs.sort((a, b) => b.date - a.date); saveRuns();
    }
    if(Array.isArray(j.courses)){
      j.courses.forEach(c => { if(c && c.id && Array.isArray(c.pts)){ const i = courses.findIndex(x => x.id === c.id); if(i >= 0) courses[i] = c; else courses.push(c); } });
      saveCourses(); syncMatchers();
    }
    if(Array.isArray(j.efforts)){
      j.efforts.forEach(f => { if(f && f.id && f.course && !efforts.some(x => x.id === f.id)) efforts.push(f); });
      saveEfforts();
    }
    save(); refreshAll(); if(n) fitAll(); updateTrackLayers();
    toast(`${n} Spots${nt ? ` und ${nt} Strecken` : ''} importiert`);
  }catch(err){ toast('Datei konnte nicht gelesen werden. Erwartet wird eine Backup-Datei aus Spots.'); }
});

/* ================= Standort (live) ================= */
let meMarker = null, watchId = null, centerOnFix = false, lastListPos = null, meTime = 0, meAccM = 0;
/* Aktuellen Standort holen (frisch, genau) */
function getHere(){
  return new Promise(resolve => {
    if(!navigator.geolocation){ toast('Standort wird von diesem Browser nicht unterstützt.'); return resolve(null); }
    if(me && Date.now() - meTime < 15000 && meAccM <= 50) return resolve({...me});
    toast('Standort wird ermittelt …');
    navigator.geolocation.getCurrentPosition(p => {
      onPos(p); hideToast();
      if(p.coords.accuracy > 50) toast(`Genauigkeit ca. ${Math.round(p.coords.accuracy)} m – Marker ggf. verschieben.`);
      resolve({lat:p.coords.latitude, lng:p.coords.longitude});
    }, err => {
      toast(err.code === 1 ? 'Standortzugriff verweigert. Erlaube ihn in den Einstellungen für Safari/Chrome.' : 'Standort gerade nicht verfügbar. Versuch es draußen nochmal.');
      resolve(null);
    }, {enableHighAccuracy:true, maximumAge:0, timeout:15000});
    if(watchId == null) startGPS(false);
  });
}
async function saveHere(){
  if(view === 'edit' || mode) return;
  const btn = $('#hereBtn'); btn.disabled = true;
  const p = await getHere();
  btn.disabled = false;
  if(!p) return;
  newDraft(); draft.lat = p.lat; draft.lng = p.lng;
  showEdit();
  map.flyTo({center:LL(p), zoom:Math.max(map.getZoom(), 17), padding:camPad(), duration:1200});
  setTimeout(() => $('#f-name')?.focus(), 450);
}
$('#hereBtn').addEventListener('click', saveHere);
function startGPS(center){
  if(!navigator.geolocation){ toast('Standort wird von diesem Browser nicht unterstützt.'); return; }
  centerOnFix = center;
  if(watchId != null){ if(center && me) map.flyTo({center:LL(me), zoom:Math.max(map.getZoom(), 15), padding:camPad(), duration:1200}); return; }
  if(center) toast('Standort wird ermittelt …');
  watchId = navigator.geolocation.watchPosition(onPos, err => {
    navigator.geolocation.clearWatch(watchId); watchId = null;
    if(center || err.code !== 1) toast(err.code === 1 ? 'Standortzugriff verweigert. Erlaube ihn in den Einstellungen für Safari/Chrome.' : 'Standort gerade nicht verfügbar.');
    prefs.gps = false; savePrefs();
  }, {enableHighAccuracy:true, maximumAge:5000, timeout:20000});
}
// Standort im Hintergrund nicht weiter abfragen (außer bei Aufnahme, Cockpit oder 0–100)
let gpsPaused = false;
document.addEventListener('visibilitychange', () => {
  if(document.hidden){ if(watchId != null && !(rec && !rec.stopped) && !ckOn && !perfOn){ navigator.geolocation.clearWatch(watchId); watchId = null; gpsPaused = true; } }
  else if(gpsPaused){ gpsPaused = false; startGPS(false); }
});
function onPos(p){
  feedLive(p);
  me = {lat:p.coords.latitude, lng:p.coords.longitude}; meTime = Date.now(); meAccM = p.coords.accuracy || 0;
  const acc = p.coords.accuracy || 0;
  if(!meMarker){
    const el = document.createElement('div'); el.className = 'me'; el.innerHTML = '<span class="p"></span><span class="h"></span><span class="d"></span>' + carSVG('car');
    meMarker = new maplibregl.Marker({element:el, anchor:'center'}).setLngLat(LL(me)).addTo(map);
  } else if(!ckOn) tweenMe(me);
  setSrc('acc', FC(acc > 5 && !ckOn ? [circlePoly(me, acc)] : []));
  if(!ckOn){
    const hd = p.coords.heading, sp = p.coords.speed;
    if(hd != null && !isNaN(hd) && sp != null && sp > 1.5) setMeHeading(hd);
    else if(sp != null && sp < .5) setMeHeading(null);
  }
  $('#b-locate').classList.add('on');
  if(!prefs.gps){ prefs.gps = true; savePrefs(); }
  if(centerOnFix){ centerOnFix = false; hideToast(); map.flyTo({center:LL(me), zoom:Math.max(map.getZoom(), 15), padding:camPad(), duration:1400}); }
  renderNearest();
  if(!lastListPos || dist(lastListPos, me) > 25){
    lastListPos = me;
    if(view === 'list') renderList();
    if(view === 'detail' && selected){ const s = data.spots.find(x => x.id === selected); if(s){ const sc = $('#detailView .pad')?.scrollTop || 0; renderDetail(s); const pd = $('#detailView .pad'); if(pd) pd.scrollTop = sc; } }
  }
}
let meTween = 0;
function tweenMe(to){
  const from = meMarker.getLngLat(), a = {lat:from.lat, lng:from.lng};
  cancelAnimationFrame(meTween);
  if(dist(a, to) > 300){ meMarker.setLngLat(LL(to)); return; }
  const t0 = performance.now(), D = 700;
  const step = now => {
    const k = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - k, 3);
    meMarker.setLngLat([a.lng + (to.lng - a.lng) * e, a.lat + (to.lat - a.lat) * e]);
    if(k < 1) meTween = requestAnimationFrame(step);
  };
  meTween = requestAnimationFrame(step);
}
function renderNearest(){
  const el = $('#near');
  const list = visibleSpots();
  if(!me || !list.length || (rec && !rec.stopped)){ el.hidden = true; return; }
  let best = null, bd = Infinity;
  for(const s of list){ const d = dist(me, s); if(d < bd){ bd = d; best = s; } }
  const cat = catById(best.cat);
  el.dataset.id = best.id;
  el.innerHTML = `<span class="ic" style="--c:${cat.color}">${ic(cat.icon,15)}</span><span class="tx"><span class="l">Nächster Spot</span><span class="t">${esc(best.name)}</span></span><span class="d">${fmtDist(bd)}</span>`;
  el.hidden = false;
}
$('#near').addEventListener('click', e => { const id = e.currentTarget.dataset.id; if(id && !mode && view !== 'edit') openDetail(id, true); });
$('#b-locate').addEventListener('click', () => { if(rec && !rec.stopped) followMe = true; startGPS(true); });
$('#b-labels').addEventListener('click', () => { prefs.labels = !prefs.labels; savePrefs(); applyLabels(); });
// Dialoge: Fokus hinein beim Öffnen, Tab bleibt drin, beim Schließen zurück zum Auslöser
['#modal', '#onb'].forEach(sel => {
  const el = $(sel); if(!el) return; let back = null;
  new MutationObserver(() => {
    if(!el.hidden){
      if(!back) back = document.activeElement;
      setTimeout(() => { if(el.hidden || el.contains(document.activeElement)) return; const f = el.querySelector('[autofocus],h2,h1,button,input,select,textarea,[tabindex]'); if(f){ if(/^H[12]$/.test(f.tagName)) f.setAttribute('tabindex', '-1'); f.focus({preventScroll:true}); } }, 60);
    } else if(back){ const b = back; back = null; if(b.isConnected && b.focus) try{ b.focus({preventScroll:true}); }catch(e){} }
  }).observe(el, {attributes:true, attributeFilter:['hidden']});
  el.addEventListener('keydown', e => {
    if(e.key !== 'Tab' || el.hidden) return;
    const fs = [...el.querySelectorAll('button,input,select,textarea,a[href],[tabindex]:not([tabindex="-1"])')].filter(x => !x.disabled && x.offsetParent);
    if(!fs.length) return;
    const first = fs[0], last = fs[fs.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  });
});
new MutationObserver(() => document.body.classList.toggle('popopen', !$('#layersPop').hidden)).observe($('#layersPop'), {attributes:true, attributeFilter:['hidden']});
$('#b-layers').addEventListener('click', e => {
  e.stopPropagation();
  const pop = $('#layersPop'); pop.hidden = !pop.hidden;
  $('#b-layers').classList.toggle('on', !pop.hidden); $('#b-layers').setAttribute('aria-expanded', !pop.hidden);
});
document.addEventListener('click', e => {
  const pop = $('#layersPop');
  if(!pop.hidden && (!e.target.closest('#layersPop') || e.target.closest('[data-pf-open]'))){ pop.hidden = true; $('#b-layers').classList.remove('on'); $('#b-layers').setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-base]'); if(!b) return;
  prefs.base = b.dataset.base; savePrefs(); applyLabels();
});
$('#b-compass').addEventListener('click', () => map.easeTo({bearing:0, pitch:prefs.terrain ? map.getPitch() : 0, duration:600}));

/* ================= Helfer ================= */
let tt;
function toast(msg){ const t = $('#toast'); t.textContent = msg; t.hidden = true; void t.offsetWidth; t.hidden = false; clearTimeout(tt); tt = setTimeout(hideToast, 2800); }
function hideToast(){ $('#toast').hidden = true; }
function copy(text){
  const done = () => toast('Koordinaten kopiert');
  if(navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  function fallback(){ const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast(text); } ta.remove(); }
}
function refreshAll(){ renderChips(); renderList(); renderMarkers(); renderNearest(); }
function fitAll(animate){
  const pts = data.spots.flatMap(s => s.walk && s.parking ? [LL(s), LL(s.parking)] : [LL(s)]);
  if(!pts.length) return;
  const b = pts.reduce((b, p) => b.extend(p), new maplibregl.LngLatBounds(pts[0], pts[0]));
  map.fitBounds(b, {padding:camPad(), maxZoom:14, duration: animate === false ? 0 : 1200});
}

/* ================= Strecken ================= */
const TKEY = 'meine-spots-tracks', RKEY = 'meine-spots-rec';
let tracks = [];
/* Fahrten liegen in IndexedDB (viel mehr Platz als localStorage). Alte Daten aus localStorage werden einmalig übernommen. */
const KV = (() => {
  let dbp = null;
  const open = () => dbp || (dbp = new Promise((res, rej) => {
    const r = indexedDB.open('spots-kv', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onsuccess = () => res(r.result); r.onerror = () => { dbp = null; rej(r.error); };
  }));
  const run = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => {
    const t = db.transaction('kv', mode), rq = fn(t.objectStore('kv'));
    t.oncomplete = () => res(rq.result); t.onerror = t.onabort = () => rej(t.error);
  }); };
  return {get:k => run('readonly', st => st.get(k)), put:(k, v) => run('readwrite', st => st.put(v, k))};
})();
let tracksVer = 0, tracksReady = false, tracksLS = false, tracksSaveT = null, tracksSaving = Promise.resolve();
try{ const raw = localStorage.getItem(TKEY); if(raw){ tracks = sjson(raw); tracksLS = true; } if(!Array.isArray(tracks)) tracks = []; }catch(e){ tracks = []; }
(async () => {
  let stored = null;
  try{ stored = await KV.get('tracks'); }catch(e){}
  if(Array.isArray(stored)){
    sanitize(stored);
    // was vor dem Laden schon neu dazukam (z. B. wiederhergestellte Aufzeichnung), behalten
    const ids = new Set(stored.map(t => t.id));
    tracks = [...tracks.filter(t => !ids.has(t.id)), ...stored].sort((a, b) => (b.created || 0) - (a.created || 0));
  }
  tracksReady = true;
  if(tracksLS || !Array.isArray(stored)) await tracksWrite();
  if(tracksLS){ try{ if(Array.isArray(await KV.get('tracks'))) localStorage.removeItem(TKEY); }catch(e){} }
  riskCache = new WeakMap(); riskSig = tracksSig(); riskWarm();
  try{ if(stored && stored.length){ renderList(); if(tab === 'tracks') renderTracksHead(); updateTrackLayers(); } }catch(e){}
})();
async function tracksWrite(){
  try{ await KV.put('tracks', tracks); return true; }
  catch(e){
    try{ localStorage.setItem(TKEY, JSON.stringify(tracks)); tracksLS = true; return true; }
    catch(_){ toast('Fahrten konnten nicht gespeichert werden – Speicher voll. Exportiere deine Daten.'); return false; }
  }
}
let rec = null, recWatch = null, recTick = null, wake = null, followMe = true, lastPersist = 0;
let tab = 'spots', selTrack = null, trackRenaming = false, trackDelArmed = false, discardArmed = false;

let riskCache = new WeakMap(), riskSig = '';
// Risiko vergleicht mit anderen Fahrten → nur neu rechnen, wenn Fahrten dazukommen oder wegfallen (nicht bei Umbenennen, Stern …)
const tracksSig = () => tracks.length + ':' + (tracks[0] && tracks[0].id) + ':' + (tracks[tracks.length - 1] && tracks[tracks.length - 1].id);
function saveTracks(){
  const sg = tracksSig(); if(sg !== riskSig){ riskSig = sg; riskCache = new WeakMap(); riskWarm(); }
  bkDirty(); tracksVer++;
  if(!tracksReady){ setTimeout(saveTracks, 300); return true; }
  // kurz sammeln: mehrere Änderungen hintereinander = ein Schreibvorgang (jedes Schreiben kopiert alle Fahrten)
  clearTimeout(tracksSaveT); tracksSaveT = setTimeout(tracksFlush, 700);
  return true;
}
function tracksFlush(){ if(!tracksSaveT) return; clearTimeout(tracksSaveT); tracksSaveT = null; tracksSaving = tracksSaving.then(tracksWrite); }
addEventListener('pagehide', tracksFlush);
document.addEventListener('visibilitychange', () => { if(document.visibilityState === 'hidden') tracksFlush(); });
function persistRec(force){
  if(!rec) { try{ localStorage.removeItem(RKEY); }catch(e){} return; }
  if(!force && Date.now() - lastPersist < 2000) return;
  lastPersist = Date.now(); rec.lastSeen = Date.now();
  try{ localStorage.setItem(RKEY, JSON.stringify(rec)); }catch(e){}
}
const recElapsed = () => rec ? rec.active + (rec.runFrom ? Date.now() - rec.runFrom : 0) : 0;
const fmtKm = m => m < 1000 ? `${Math.round(m)} m` : `${(m/1000).toFixed(2).replace('.', ',')} km`;
const fmtDur = ms => { const t = Math.floor(ms/1000), h = Math.floor(t/3600), m = Math.floor(t%3600/60), sec = t%60;
  return h ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`; };
const fmtDurU = ms => { const t = Math.round(ms / 1000), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), sec = t % 60; return h ? `${h}:${String(m).padStart(2, '0')} h` : `${m}:${String(sec).padStart(2, '0')} Min`; };
const fmtDurLong = ms => { const m = Math.round(ms/60000); return m < 60 ? `${m} Min` : `${Math.floor(m/60)} h ${m%60} Min`; };
const fmtSpd = v => `${(v*3.6).toFixed(1).replace('.', ',')} km/h`;
const DTF = {y:new Intl.DateTimeFormat('de-DE', {weekday:'short', day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'}), n:new Intl.DateTimeFormat('de-DE', {weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})};
const fmtDate = ts => { const d = new Date(ts); return (d.getFullYear() !== new Date().getFullYear() ? DTF.y : DTF.n).format(d); };
// Für die Übersicht aller Fahrten: Punkte unter ~15 m Abstand weglassen (bei hunderten Fahrten viel weniger Daten für die Karte)
const lightCache = new WeakMap();
let trackAllKey = null;
function lightSegs(t){
  let c = lightCache.get(t); if(c) return c;
  c = (t.segs || []).map(sg => { const out = []; let l = null; sg.forEach((q, i) => { if(!l || i === sg.length - 1 || Math.abs(q[0] - l[0]) + Math.abs(q[1] - l[1]) > .00018){ out.push(q); l = q; } }); return out; });
  lightCache.set(t, c); return c;
}
const segFeatures = (segs, props = {}) => segs.filter(sg => sg.length > 1).map(sg => ({type:'Feature', properties:props, geometry:{type:'LineString', coordinates:sg.map(q => [q[0], q[1]])}}));

/* Tabs */
function setTab(t){
  tab = t;
  document.querySelectorAll('.tabs button').forEach(b => { b.classList.toggle('on', b.dataset.tab === t); b.setAttribute('aria-selected', b.dataset.tab === t); });
  if(searching && t !== 'spots') closeSearch();
  syncSpotsHead();
  $('#tracksHead').hidden = t !== 'tracks';
  $('#spotActions').hidden = t !== 'spots';
  $('#searchBtn').hidden = t === 'crew';
  if(t === 'crew') wsSync(false);
  if(t === 'tracks') renderTracksHead();
  renderList(); updateTrackLayers(); renderMarkers(); renderWsMarkers();
  if(mobile()) setSnap(snap);
}
document.querySelector('.tabs').addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if(b && b.dataset.tab !== tab) setTab(b.dataset.tab); });

/* Kartenlinien */
function updateTrackLayers(){
  if(!mapReady) return;
  xplHeatApply();
  const showAll = tab === 'tracks' && sub === 'rec' && view === 'list';
  // nur neu an die Karte geben, wenn sich etwas geändert hat (bei hunderten Fahrten sonst jedes Mal spürbar)
  const key = showAll ? `${tracksVer}|${tracks.length}|${selTrack}|${prefs.trkFav ? 1 : 0}` : '';
  if(key !== trackAllKey){ trackAllKey = key; setSrc('track-all', FC(showAll ? tracks.filter(t => t.id !== selTrack && (!prefs.trkFav || t.fav)).flatMap(t => segFeatures(lightSegs(t), {id:t.id, fav:!!t.fav})) : [])); }
  const t = view === 'track' && curTrack();
  if(t){
    const segs = t.segs.filter(sg => sg.length);
    const first = segs[0][0], lastSeg = segs[segs.length - 1], last = lastSeg[lastSeg.length - 1];
    const an = analyzeTrack(t);
    setSrc('track-view', FC(an ? an.feats : segFeatures(t.segs)));
    setSrc('track-case', FC(segFeatures(t.segs)));
    const cb = cmpPartner(t); setSrc('track-cmp', FC(cb ? segFeatures(cb.segs) : []));
    setSrc('track-secs', FC(an ? an.bounds : []));
    setSrc('track-ends', FC([{type:'Feature', properties:{k:'start'}, geometry:{type:'Point', coordinates:[first[0], first[1]]}},
                             {type:'Feature', properties:{k:'end'}, geometry:{type:'Point', coordinates:[last[0], last[1]]}}]));
  } else { setSrc('track-cmp', FC([])); setSrc('track-view', FC([])); setSrc('track-case', FC([])); setSrc('track-ends', FC([])); setSrc('track-secs', FC([])); setSrc('track-cur', FC([])); }
  tvPaint(); tvGMarkers(t || null);
  updateCourseLayers();
}
function drawLive(){ setSrc('track-live', FC(rec ? segFeatures(rec.segs) : [])); }

/* Aufzeichnung */
async function requestWake(){ try{ if(navigator.wakeLock && !wake) { wake = await navigator.wakeLock.request('screen'); wake.addEventListener?.('release', () => { wake = null; }); } }catch(e){ wake = null; } }
function releaseWake(){ if(ckOn || perfOn || (rec && rec.runFrom)) return; try{ wake && wake.release(); }catch(e){} wake = null; }
document.addEventListener('visibilitychange', () => { if(document.visibilityState === 'visible' && ((rec && rec.runFrom) || ckOn || perfOn)) requestWake(); });
function startWatch(){
  if(recWatch != null) return;
  recWatch = navigator.geolocation.watchPosition(onRecPos, err => {
    if(err.code === 1){ toast('Standortzugriff verweigert. Ohne Standort kann nichts aufgezeichnet werden.'); pauseRec(); }
  }, {enableHighAccuracy:true, maximumAge:0, timeout:30000});
}
function stopWatch(){ if(recWatch != null){ navigator.geolocation.clearWatch(recWatch); recWatch = null; } }
function startTick(){ clearInterval(recTick); recTick = setInterval(() => { updateRecUI(); persistRec(); }, 1000); }
// beim Wegwischen oder Sperren sofort sichern, damit nichts von der Aufzeichnung verloren geht
addEventListener('pagehide', () => { if(rec) persistRec(true); });
document.addEventListener('visibilitychange', () => { if(document.visibilityState === 'hidden' && rec) persistRec(true); });

function startRec(){
  if(!navigator.geolocation){ toast('Standort wird von diesem Browser nicht unterstützt.'); return; }
  if(rec && rec.stopped){ openTrackSave(); return; }
  if(rec) return;
  rec = {id:uid(), start:Date.now(), segs:[[]], dist:0, active:0, runFrom:Date.now(), maxSpd:0, last:null, weak:false};
  followMe = true;
  startWatch(); startGPS(false); requestWake(); startTick();
  persistRec(true); renderTracksHead(); updateRecUI(); renderNearest();
  // Direkt in den Fahrmodus: Cockpit mit laufender Aufnahme
  gStart();
  if(onOff('recCockpit') && !ckOn && !mode && view !== 'edit') enterCockpit();
  else if(mobile() && !ckOn) setSnap('peek');
  toast(ckOn ? 'Aufnahme läuft – gute Fahrt' : 'Aufzeichnung läuft');
}
function pauseRec(){
  if(!rec || !rec.runFrom) return;
  rec.active += Date.now() - rec.runFrom; rec.runFrom = null; rec.last = null;
  stopWatch(); releaseWake();
  persistRec(true); renderTracksHead(); updateRecUI();
}
function resumeRec(){
  if(!rec || rec.runFrom || rec.stopped) return;
  if(rec.segs[rec.segs.length - 1].length) rec.segs.push([]);
  rec.runFrom = Date.now(); rec.last = null; followMe = true;
  startWatch(); requestWake(); startTick();
  persistRec(true); renderTracksHead(); updateRecUI();
}
function stopRec(){
  if(!rec || rec.stopped) return;
  if(ckOn) exitCockpit();
  else parkAuto(rec.dist || 0, me && meTime && Date.now() - meTime < 120000 ? me : null, null);
  gStop();
  if(rec.runFrom){ rec.active += Date.now() - rec.runFrom; rec.runFrom = null; }
  stopWatch(); releaseWake(); clearInterval(recTick);
  const pts = rec.segs.reduce((n, sg) => n + sg.length, 0);
  if(pts < 2){
    rec = null; persistRec(true); drawLive();
    toast('Fahrt zu kurz – nichts gespeichert.');
  } else {
    rec.stopped = true; persistRec(true);
    if(view !== 'edit' && !mode) openTrackSave(); else toast('Aufzeichnung beendet – speichere sie unter „Fahrten“.');
  }
  renderTracksHead(); updateRecUI(); renderNearest();
}
function onRecPos(p){
  feedLive(p);
  if(!rec || !rec.runFrom) return;
  const c = p.coords, ts = p.timestamp || Date.now();
  if(!ckOn) gGpsFix(c.speed != null && c.speed >= 0 ? c.speed : 0, c.heading != null && !isNaN(c.heading) ? c.heading : null, ts);
  if(c.accuracy > 35){ if(!rec.weak){ rec.weak = true; updateRecUI(); } return; }
  if(rec.weak){ rec.weak = false; updateRecUI(); }
  const pt = {lat:c.latitude, lng:c.longitude};
  if(rec.last){
    const d = dist(rec.last, pt), dt = (ts - rec.last.ts) / 1000;
    if(d < Math.max(5, c.accuracy * .4)) return;
    if(dt > 0 && d / dt > 70) return; // GPS-Sprung
    rec.dist += d;
    const spd = (c.speed != null && c.speed >= 0) ? c.speed : (dt >= 2 ? d / dt : 0);
    if(spd > rec.maxSpd && c.accuracy <= 20) rec.maxSpd = spd;
  }
  const q = [+pt.lng.toFixed(6), +pt.lat.toFixed(6), Math.round((ts - rec.start) / 100) / 10], gp = gTake();
  if(gp) q.push(+gp[0].toFixed(2), +gp[1].toFixed(2));
  rec.segs[rec.segs.length - 1].push(q);
  rec.last = {...pt, ts};
  drawLive(); persistRec(); updateRecUI();
  if(followMe && !ckOn && mapReady && !map.isMoving()) map.easeTo({center:LL(pt), padding:camPad(), duration:900});
}
map.on('dragstart', () => { followMe = false; });
map.on('zoomstart', e => { if(e.originalEvent) followMe = false; });

function updateRecUI(){
  const bar = $('#recbar'), active = rec && !rec.stopped;
  bar.hidden = !active;
  if(!active) return;
  bar.classList.toggle('paused', !rec.runFrom);
  const t = fmtDur(recElapsed()), d = fmtKm(rec.dist);
  document.querySelectorAll('[data-rt]').forEach(el => el.textContent = t);
  document.querySelectorAll('[data-rd]').forEach(el => el.textContent = rec.runFrom ? (rec.weak ? 'GPS schwach …' : d) : `${d} · Pause`);
  document.querySelectorAll('[data-rec="toggle"]').forEach(b => {
    const st = rec.runFrom ? 'run' : 'pause';
    if(b.dataset.st !== st){ b.dataset.st = st; b.innerHTML = svg(st === 'run' ? UI.pause : UI.play, 18, 2.6); b.setAttribute('aria-label', st === 'run' ? 'Pause' : 'Fortsetzen'); }
  });
}
function renderTracksHead(){
  const h = $('#tracksHead');
  const segHTML = `<div class="seg2" role="tablist"><button data-sub="rec" role="tab" aria-selected="${sub === 'rec'}" class="${sub === 'rec' ? 'on' : ''}">Meine</button><button data-sub="race" class="${sub === 'race' ? 'on' : ''}">Rennstrecken</button><button data-sub="stats" class="${sub === 'stats' ? 'on' : ''}">Statistik</button></div>`;
  if(sub === 'stats' && !(rec && !rec.stopped)){ h.innerHTML = segHTML; renderCkTop(); updateRecUI(); return; }
  if(sub === 'race' && !(rec && !rec.stopped)){
    h.innerHTML = segHTML + `<button class="btn primary" data-race="draw">${svg(ICONS.flag, 16)} Rennstrecke einzeichnen</button>
      ${courses.length ? '' : '<div class="hint">Oder eine Fahrt öffnen und „Als Rennstrecke speichern“ wählen. Die Zeit läuft automatisch ab der Startlinie.</div>'}`;
    renderCkTop(); updateRecUI(); return;
  }
  if(!rec){
    h.innerHTML = segHTML + `<button class="btn rec-start" data-rec="start"><span class="rdot"></span>Aufzeichnung starten</button>
      <div class="btns"><button class="btn" data-ck-open>${svg(UI.gauge, 17)} Cockpit</button><button class="btn" data-pf-open>${svg(UI.timer, 17)} 0–100</button></div>
      <button class="btn tour-open" data-tour-open>${svg(TOUR_IC, 17)} Kurvige Rundtour</button>
      ${tracks.length ? '' : '<div class="hint">Bildschirm anlassen – im Hintergrund pausiert das Handy die Ortung.</div>'}`;
  } else if(rec.stopped){
    h.innerHTML = segHTML + `<button class="btn primary" data-rec="opensave">Beendete Aufzeichnung speichern</button>`;
  } else {
    h.innerHTML = segHTML + `<div class="reccard"><div class="tx"><span class="big" data-rt></span><span class="sm" data-rd></span></div>
      <button class="rb" data-ck-open aria-label="Cockpit öffnen">${svg(UI.gauge, 18)}</button><button class="rb" data-rec="toggle"></button><button class="rb stop" data-rec="stop" aria-label="Aufzeichnung beenden">${svg(UI.stop, 18)}</button></div>
      <div class="hint">Lass den Bildschirm an. Im Hintergrund pausiert das Handy die Ortung.</div>`;
  }
  renderCkTop();
  updateRecUI();
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-rec]'); if(!b) return;
  const a = b.dataset.rec;
  if(a === 'start') startRec();
  if(a === 'toggle') rec && rec.runFrom ? pauseRec() : resumeRec();
  if(a === 'stop') stopRec();
  if(a === 'opensave') openTrackSave();
});
document.addEventListener('click', e => {
  if(e.target.closest('[data-ck-open]')) return enterCockpit();
  if(e.target.closest('[data-ck="close"]')) return exitCockpit();
  if(e.target.closest('[data-ck="dest"]')){ liveResume = live.on ? Date.now() + 10 * 60000 : 0; exitCockpit(); openSearch(); return; }
});

/* Speichern */
function openTrackSave(){
  if(!rec || !rec.stopped) return;
  discardArmed = false;
  if(tab !== 'tracks') setTab('tracks');
  const def = `Strecke ${new Date(rec.start).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}, ${new Date(rec.start).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'})}`;
  const avg = rec.active > 0 ? rec.dist / (rec.active / 1000) : 0;
  $('#trackSaveView').innerHTML = `
    <div class="top"><button class="txtbtn" data-ts="discard">Verwerfen</button><strong>Fahrt speichern</strong><button class="txtbtn bold" data-ts="save">Speichern</button></div>
    <div class="pad">
      <label class="f">Name<input class="inp" id="t-name" value="${esc(def)}" maxlength="80"></label>
      <div class="tstats">
        <div><b>${fmtKm(rec.dist)}</b><span>Distanz</span></div>
        <div><b>${fmtDur(rec.active)}</b><span>Dauer</span></div>
        <div><b>${fmtSpd(avg)}</b><span>Ø Tempo</span></div>
        <div><b>${fmtSpd(rec.maxSpd)}</b><span>Max. Tempo</span></div>
      </div>
      ${tsCarHTML()}
      <div class="muted">Die Strecke wird nur auf diesem Gerät gespeichert.</div>
    </div>`;
  show('trackSave', 'full');
  const segs = rec.segs.filter(sg => sg.length);
  if(segs.length) fitTrack(segs);
}
$('#trackSaveView').addEventListener('click', e => {
  const b = e.target.closest('[data-ts]'); if(!b || !rec) return;
  if(b.dataset.ts === 'save'){
    const t = {id:rec.id, name:($('#t-name').value.trim() || $('#t-name').defaultValue || 'Fahrt'), created:rec.start, dist:Math.round(rec.dist), dur:rec.active, maxSpd:rec.maxSpd,
               segs:rec.segs.filter(sg => sg.length)};
    if(rec.g && (rec.g.lat || rec.g.brake || rec.g.acc)) t.g = rec.g;
    if(garage.cars.length && gCar(tsCar || garage.active)) t.car = tsCar || garage.active;
    tsCar = null;
    tracks.unshift(t);
    if(!saveTracks()){ tracks.shift(); return; }
    rec = null; persistRec(true); drawLive(); renderTracksHead();
    renderList(); openTrack(t.id, false);
    fetchPlace(t); if(grp()) setTimeout(() => pushMember().then(wsCache).catch(() => {}), 1500);
    const found = scanTrack(t);
    toast(found.length ? `Fahrt gespeichert · ${found.length} neue Zeit${found.length > 1 ? 'en' : ''} auf Rennstrecken` : 'Fahrt gespeichert');
  } else {
    if(!discardArmed){ discardArmed = true; b.textContent = 'Wirklich verwerfen?'; b.style.color = 'var(--danger)'; setTimeout(() => { if(b.isConnected){ discardArmed = false; b.textContent = 'Verwerfen'; b.style.color = ''; } }, 3500); return; }
    rec = null; persistRec(true); drawLive(); renderTracksHead(); renderNearest();
    show('list', 'half'); renderList(); toast('Aufzeichnung verworfen');
  }
});

/* Statistik */
function weekStart(ts){ const d = new Date(ts); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); }
function barPath(x, y, w, h, r){ r = Math.min(r, w / 2, h); return h <= 0 ? '' : `M${x},${y + h}V${y + r}Q${x},${y} ${x + r},${y}H${x + w - r}Q${x + w},${y} ${x + w},${y + r}V${y + h}Z`; }
const fmtKmS = m => m < 1000 ? `${Math.round(m)} m` : m < 100000 ? `${(m / 1000).toFixed(1).replace('.', ',')} km` : `${Math.round(m / 1000).toLocaleString('de-DE')} km`;
function renderStats(){
  const body = $('#listBody');
  const now = Date.now(), wk = weekStart(now), mon = new Date(); mon.setDate(1); mon.setHours(0, 0, 0, 0);
  const tot = tracks.reduce((a, t) => a + (t.dist || 0), 0), dur = tracks.reduce((a, t) => a + (t.dur || 0), 0);
  const top = tracks.reduce((a, t) => Math.max(a, t.maxSpd || 0), 0), longest = tracks.reduce((a, t) => (t.dist || 0) > (a ? a.dist : 0) ? t : a, null);
  const kmWeek = tracks.filter(t => t.created >= wk).reduce((a, t) => a + t.dist, 0), kmMonth = tracks.filter(t => t.created >= mon.getTime()).reduce((a, t) => a + t.dist, 0);
  // km pro Woche, letzte 8 Wochen
  const weeks = [];
  for(let i = 7; i >= 0; i--){ const st = wk - i * 7 * 864e5; weeks.push({st, km:0}); }
  tracks.forEach(t => { const w = weekStart(t.created), b = weeks.find(x => x.st === w); if(b) b.km += t.dist / 1000; });
  const maxKm = Math.max(1, ...weeks.map(w => w.km)), niceMax = maxKm <= 10 ? Math.ceil(maxKm) : maxKm <= 100 ? Math.ceil(maxKm / 10) * 10 : Math.ceil(maxKm / 50) * 50;
  const W = 320, H = 118, pl = 26, pb = 18, pt = 8, cw = W - pl - 4, ch = H - pb - pt, bw = cw / weeks.length, gap = Math.max(4, bw * .28);
  const bars = weeks.map((w, i) => {
    const h = w.km / niceMax * ch, x = pl + i * bw + gap / 2, y = pt + ch - h;
    const lab = new Date(w.st).toLocaleDateString('de-DE', {day:'numeric', month:'numeric'});
    return `<path class="bar${i === 7 ? ' on' : ''}" data-i="${i}" d="${barPath(x, y, bw - gap, h, 4)}"/>
      <rect class="hit" data-i="${i}" x="${pl + i * bw}" y="${pt}" width="${bw}" height="${ch + pb}"/>
      <text class="ax" x="${x + (bw - gap) / 2}" y="${H - 4}" text-anchor="middle">${i === 7 ? 'Diese Wo.' : lab}</text>`;
  }).join('');
  const chart = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Kilometer pro Woche, letzte 8 Wochen">
      <line class="grid" x1="${pl}" x2="${W - 4}" y1="${pt}" y2="${pt}"/><line class="grid" x1="${pl}" x2="${W - 4}" y1="${pt + ch / 2}" y2="${pt + ch / 2}"/><line class="grid" x1="${pl}" x2="${W - 4}" y1="${pt + ch}" y2="${pt + ch}"/>
      <text class="ax" x="${pl - 5}" y="${pt + 3}" text-anchor="end">${niceMax}</text><text class="ax" x="${pl - 5}" y="${pt + ch / 2 + 3}" text-anchor="end">${niceMax / 2}</text><text class="ax" x="${pl - 5}" y="${pt + ch + 3}" text-anchor="end">0</text>
      ${bars}</svg>`;
  // Bestzeiten
  const bestRuns = {};
  runs.forEach(r => { const k = `${r.from}–${r.to}`; if(!bestRuns[k] || r.time < bestRuns[k].time) bestRuns[k] = r; });
  const runRows = Object.values(bestRuns).sort((a, b) => a.from - b.from || a.to - b.to)
    .map(r => `<div class="st-row"><span class="k">${r.from}–${r.to} km/h</span><span class="v">${fmtS(r.time)}<small>${new Date(r.date).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}</small></span></div>`).join('');
  const courseRows = courses.map(c => ({c, b:courseEfforts(c.id)[0], n:courseEfforts(c.id).length})).filter(x => x.b)
    .map(x => `<div class="st-row"><span class="k">${esc(x.c.name)}</span><span class="v">${fmtLap(x.b.time)}<small>${x.n} Fahrt${x.n > 1 ? 'en' : ''}</small></span></div>`).join('');
  const catCount = {}; data.spots.forEach(sp => catCount[sp.cat] = (catCount[sp.cat] || 0) + 1);
  const catRows = Object.entries(catCount).sort((a, b) => b[1] - a[1]).slice(0, 4)
    .map(([id, n]) => { const c = catById(id); return `<div class="st-row"><span class="k"><span class="chip" style="--c:${c.color};height:auto;border:0;padding:0;background:none"><span class="dot"></span>${esc(c.name)}</span></span><span class="v">${n}</span></div>`; }).join('');
  if(!tracks.length && !runs.length && !efforts.length){
    body.innerHTML = `<div class="st"><div class="st-tiles"><div class="st-tile"><b>${data.spots.length}</b><span>Spots</span></div><div class="st-tile"><b>0 km</b><span>gefahren</span></div></div>
      <div class="empty"><b>Noch keine Fahrten</b>Zeichne eine Fahrt auf, dann füllt sich die Statistik von selbst.</div></div>`;
    return;
  }
  body.innerHTML = `<div class="st">${dlEntryHTML()}${wrapCardHTML()}
    <div class="st-tiles">
      <div class="st-tile"><b>${fmtKmS(tot)}</b><span>gesamt gefahren</span></div>
      <div class="st-tile"><b>${tracks.length}</b><span>Fahrt${tracks.length === 1 ? '' : 'en'} · ${fmtDurLong(dur)}</span></div>
      <div class="st-tile"><b>${Math.round(top * 3.6)} km/h</b><span>Top-Speed</span></div>
      <div class="st-tile"><b>${dur ? Math.round(tot / (dur / 1000) * 3.6) : 0} km/h</b><span>Ø Tempo</span></div>
    </div>
    <div id="xplCard">${xplCardHTML()}</div>
    <div id="gemCard">${gemCardHTML()}</div>
    <div id="wayCard">${wayCardHTML()}</div>
    <div id="cxCard">${cxCardHTML()}</div>
    <div id="styleCard">${styleCardHTML()}</div>
    <div class="st-h"><span>Kilometer pro Woche</span><em id="stCap">Diese Woche ${fmtKmS(kmWeek)}</em></div>
    <div class="st-chart" id="stChart">${chart}</div>
    <div class="st-list">
      <div class="st-row"><span class="k">Diesen Monat</span><span class="v">${fmtKmS(kmMonth)}</span></div>
      ${longest ? `<div class="st-row"><span class="k">Längste Fahrt</span><span class="v">${fmtKmS(longest.dist)}<small>${esc(longest.name)}</small></span></div>` : ''}
      <div class="st-row"><span class="k">Spots</span><span class="v">${data.spots.length}</span></div>
    </div>
    ${runRows ? `<div class="st-h"><span>Beschleunigung · Bestzeiten</span></div><div class="st-list">${runRows}</div>` : ''}
    ${courseRows ? `<div class="st-h"><span>Rennstrecken · Bestzeiten</span></div><div class="st-list">${courseRows}</div>` : ''}
    ${catRows ? `<div class="st-h"><span>Spots nach Kategorie</span></div><div class="st-list">${catRows}</div>` : ''}
  </div>`;
  const chartEl = $('#stChart'), cap = $('#stCap');
  const pick = i => {
    chartEl.querySelectorAll('.bar').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
    const w = weeks[i]; cap.textContent = `${i === 7 ? 'Diese Woche' : 'Woche ab ' + new Date(w.st).toLocaleDateString('de-DE', {day:'numeric', month:'short'})} ${fmtKmS(w.km * 1000)}`;
  };
  chartEl.addEventListener('pointerover', e => { const t = e.target.closest('[data-i]'); if(t) pick(+t.dataset.i); });
  chartEl.addEventListener('click', e => { const t = e.target.closest('[data-i]'); if(t) pick(+t.dataset.i); });
  chartEl.addEventListener('pointerleave', () => pick(7));
  setTimeout(xrRun, 400);
  setTimeout(() => { if(tab === 'tracks' && sub === 'stats'){ wayGeoFetch(); cxRun(); gemAuto(); } }, 700);
}

/* ================= Straßen-Sammler: Heatmap und Neuland =================
   Jede Fahrt wird in ein 30-m-Raster gelegt. Felder, die vorher noch keine Fahrt berührt hat, sind Neuland.
   Straßennamen kommen per Map-Matching (OSRM) – ohne die ersten und letzten 300 m, damit die Haustür nicht rausgeht. */
const XC = 30, XLAT = XC / 111320, XLNG = XC / (111320 * .64), XM = 25;   // ≈ 25 m Straße pro Rasterfeld
const xCell = (lng, lat) => `${Math.round(lat / XLAT)}:${Math.round(lng / XLNG)}`;
const myTracks = () => tracks.filter(t => !(t._ws && t._ws.dev !== myId()));
let xpl = null;
const cellCache = new WeakMap();
function trackCells(t){
  const hit = cellCache.get(t); if(hit) return hit;
  const set = new Set(); cellCache.set(t, set);
  for(const sg of t.segs || []) for(let i = 0; i < sg.length; i++){
    const p = sg[i]; set.add(xCell(p[0], p[1]));
    if(!i) continue;
    const q = sg[i-1], d = Math.hypot((p[0] - q[0]) * 111320 * .64, (p[1] - q[1]) * 111320);
    if(d > XC * .5 && d < 400){ const n = Math.ceil(d / (XC * .5)); for(let k = 1; k < n; k++) set.add(xCell(q[0] + (p[0] - q[0]) * k / n, q[1] + (p[1] - q[1]) * k / n)); }
  }
  return set;
}
function xplCalc(){
  const ts = myTracks().filter(t => (t.dist || 0) >= 100).sort((a, b) => (a.created || 0) - (b.created || 0));
  const sig = ts.map(t => t.id + (t.segs || []).reduce((a, sg) => a + sg.length, 0)).join('|');
  if(xpl && xpl.sig === sig) return xpl;
  const seen = new Map(), per = {};
  for(const t of ts){
    const cs = trackCells(t); let nw = 0;
    cs.forEach(k => { const n = seen.get(k); if(n) seen.set(k, n + 1); else { seen.set(k, 1); nw++; } });
    per[t.id] = {newKm:nw * XM / 1000, km:cs.size * XM / 1000};
  }
  xpl = {sig, ts, per, seen, total:seen.size * XM / 1000, heat:null};
  return xpl;
}
function xplHeatFC(){
  const X = xplCalc();
  if(!X.heat){ const f = []; X.seen.forEach((n, k) => { const [r, c] = k.split(':'); f.push({type:'Feature', properties:{n}, geometry:{type:'Point', coordinates:[+(c * XLNG).toFixed(6), +(r * XLAT).toFixed(6)]}}); }); X.heat = FC(f); }
  return X.heat;
}
let xplHeatShown = null;
function xplHeatApply(){
  if(!mapReady || !map.getLayer('heat')) return;
  const on = !!prefs.heat && !ckOn;
  map.setLayoutProperty('heat', 'visibility', on ? 'visible' : 'none');
  const fc = on ? xplHeatFC() : null;
  if(on && fc !== xplHeatShown){ setSrc('heat', fc); xplHeatShown = fc; }
  const pb = $('#b-heat'); if(pb) pb.classList.toggle('on', !!prefs.heat);
}
function xplHeatToggle(on, fit){
  prefs.heat = on; savePrefs(); xplHeatApply();
  const tb = document.querySelector('[data-xh]'); if(tb) tb.classList.toggle('on', on);
  if(on && fit && mapReady){
    let b = null; myTracks().forEach(t => (t.segs || []).forEach(sg => sg.forEach(q => { b = b ? b.extend([q[0], q[1]]) : new maplibregl.LngLatBounds([q[0], q[1]], [q[0], q[1]]); })));
    if(b) map.fitBounds(b, {padding:{top:60, bottom:mobile() ? 300 : 60, left:mobile() ? 30 : 460, right:60}, maxZoom:14, duration:900});
  }
  if(on && !myTracks().length) toast('Noch keine Fahrten – die Heatmap füllt sich mit jeder Aufzeichnung.');
}
// Straßennamen
const XR_KEY = 'meine-spots-roads';
let xRoads = {}; try{ xRoads = JSON.parse(localStorage.getItem(XR_KEY) || '{}') || {}; }catch(e){ xRoads = {}; }
let xrBusy = false;
const xrKey = st => ((st.ref || '').split(';')[0].trim() || (st.name || '').trim()).replace(/\s+/g, ' ');
async function xrFetch(ch){
  const q = ch.map(p => `${p[0].toFixed(5)},${p[1].toFixed(5)}`).join(';');
  for(const base of ROUTERS){
    try{
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 12000);
      const r = await fetch(`${base.replace('/route/', '/match/')}${q}?overview=false&steps=true&gaps=split&tidy=true&radiuses=${ch.map(() => 30).join(';')}`, {signal:ctl.signal});
      clearTimeout(to);
      const j = await r.json();
      if(j.code === 'Ok') return j;
      if(j.code === 'NoMatch' || j.code === 'NoSegment') return {matchings:[]};
    }catch(e){}
  }
  return null;
}
async function xrMatch(t){
  const flat = []; (t.segs || []).forEach(sg => sg.forEach(q => flat.push(q)));
  const cum = [0]; for(let i = 1; i < flat.length; i++) cum.push(cum[i-1] + dist({lng:flat[i-1][0], lat:flat[i-1][1]}, {lng:flat[i][0], lat:flat[i][1]}));
  const L = cum[cum.length - 1] || 0; if(flat.length < 2 || L < 900) return {r:[]};
  const pick = []; let la = -1e9;
  for(let i = 0; i < flat.length; i++) if(cum[i] >= 300 && cum[i] <= L - 300 && cum[i] - la >= 120){ pick.push(flat[i]); la = cum[i]; }
  const names = new Set();
  for(let i = 0; i < pick.length - 1; i += 89){
    const j = await xrFetch(pick.slice(i, i + 90)); if(!j) return null;
    (j.matchings || []).forEach(m => (m.legs || []).forEach(l => (l.steps || []).forEach(st => { const k = xrKey(st); if(k) names.add(k); })));
    await new Promise(r => setTimeout(r, 1100));
  }
  return {r:[...names]};
}
const xplOpen = () => tab === 'tracks' && sub === 'stats' && view === 'list' && !!$('#xplCard');
let xrFail = 0;
async function xrRun(){
  if(xrBusy || !navigator.onLine) return; xrBusy = true;
  try{
    const ids = new Set(tracks.map(t => t.id)); let pruned = false;
    for(const k of Object.keys(xRoads)) if(!ids.has(k)){ delete xRoads[k]; pruned = true; }
    if(pruned) try{ localStorage.setItem(XR_KEY, JSON.stringify(xRoads)); }catch(e){}
    for(const t of myTracks().sort((a, b) => (a.created || 0) - (b.created || 0))){   // älteste zuerst, damit „neu“ stimmt
      if(xRoads[t.id] || (t.dist || 0) < 900) continue;
      if(!xplOpen()) break;
      const r = await xrMatch(t); if(!r){ xrFail = Date.now(); const el = $('#xplCard'); if(el && xplOpen()) el.innerHTML = xplCardHTML(); break; }
      xrFail = 0;
      xRoads[t.id] = r; try{ localStorage.setItem(XR_KEY, JSON.stringify(xRoads)); }catch(e){}
      const el = $('#xplCard'); if(el && xplOpen()) el.innerHTML = xplCardHTML();
    }
  }finally{ xrBusy = false; }
}
function xrStats(){
  const ts = myTracks().sort((a, b) => (a.created || 0) - (b.created || 0)), seen = new Set(), per = {};
  let done = 0, need = 0;
  for(const t of ts){
    if((t.dist || 0) < 900) continue;
    need++; const r = xRoads[t.id]; if(!r) continue;
    done++; const nw = r.r.filter(k => !seen.has(k)); nw.forEach(k => seen.add(k)); per[t.id] = nw;
  }
  return {total:seen.size, per, done, need};
}
function xplCardHTML(){
  const X = xplCalc(), R = xrStats();
  const d0 = new Date(); d0.setDate(1); d0.setHours(0, 0, 0, 0);
  const months = []; for(let i = 5; i >= 0; i--){ const d = new Date(d0); d.setMonth(d.getMonth() - i); months.push({st:d.getTime(), km:0}); }
  X.ts.forEach(t => { const pp = X.per[t.id]; if(!pp) return; for(let i = months.length - 1; i >= 0; i--) if((t.created || 0) >= months[i].st){ months[i].km += pp.newKm; break; } });
  const mx = Math.max(.1, ...months.map(m => m.km));
  const bars = months.map((m, i) => `<div class="xb${i === 5 ? ' on' : ''}" title="${fmtKmS(m.km * 1000)} Neuland"><i style="height:${Math.max(4, m.km / mx * 100)}%"></i><span>${new Date(m.st).toLocaleDateString('de-DE', {month:'short'}).replace('.', '')}</span></div>`).join('');
  const recent = X.ts.slice(-3).reverse().map(t => {
    const pp = X.per[t.id] || {newKm:0, km:0}, nr = R.per[t.id], pct = pp.km ? Math.round(pp.newKm / pp.km * 100) : 0;
    return `<button class="xr" data-xt="${t.id}"><span class="t">${esc(t.name || 'Fahrt')}<small>${fmtDate(t.created)}</small></span><span class="v"><b>+${fmtKmS(pp.newKm * 1000)}</b><small>${pct} % neu${nr && nr.length ? ` · ${nr.length} neue Straße${nr.length === 1 ? '' : 'n'}` : ''}</small></span></button>`;
  }).join('');
  return `<div class="st-h"><span>Straßen-Sammler</span><button class="xh-tg${prefs.heat ? ' on' : ''}" data-xh>${svg('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.6 1.2 2.6 2.3 2.9C10.8 9 11 6 12 3z"/>', 13, 2)} Heatmap</button></div>
    <div class="xpl">
      <div class="xpl-tiles">
        <div><b>${fmtKmS(X.total * 1000)}</b><span>Straße erkundet</span></div>
        <div><b>${R.done ? R.total : '–'}</b><span>verschiedene Straßen</span></div>
        <div><b>+${fmtKmS(months[5].km * 1000)}</b><span>Neuland im ${new Date().toLocaleDateString('de-DE', {month:'long'})}</span></div>
      </div>
      <div class="xbars" aria-label="Neuland pro Monat">${bars}</div>
      ${R.done < R.need ? (xrFail ? `<div class="muted" style="font-size:12.5px">Straßennamen gerade nicht abrufbar – ${R.need - R.done} Fahrten fehlen noch.</div>` : `<div class="xpl-prog"><i></i>Straßennamen werden erkannt … ${R.done} von ${R.need} Fahrten</div>`) : ''}
      ${recent ? `<div class="xrs">${recent}</div>` : ''}
    </div>`;
}
function xplTrackHTML(t){
  if(t._ws && t._ws.dev !== myId()) return '';
  const X = xplCalc(), pp = X.per[t.id]; if(!pp || !pp.km) return '';
  const nr = xrStats().per[t.id], pct = Math.round(pp.newKm / pp.km * 100);
  return `<div class="xt"><span class="xt-i">${svg('<path d="M4 19 9 5l3 8 3-5 5 11z"/>', 16, 2)}</span><div><b>${pp.newKm >= .05 ? `Neuland: +${fmtKmS(pp.newKm * 1000)}` : 'Kein Neuland'}</b><span>${pct} % der Strecke zum ersten Mal${nr && nr.length ? ` · neu: ${esc(nr.slice(0, 4).join(', '))}${nr.length > 4 ? ` +${nr.length - 4}` : ''}` : ''}</span></div></div>`;
}

/* ================= Deine Wege: wiederkehrende Strecken =================
   Start- und Zielpunkte werden zu Orten gebündelt (450 m). Ab 3 Fahrten zwischen denselben zwei Orten ist es ein Weg.
   Rundfahrten (Start = Ziel) und große Umwege zählen nicht. Alles bleibt auf dem Gerät. */
const WAY_R = 450, WAY_MIN = 3, WDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
let waysCache = null, wayGeoBusy = false, wayCur = null, wayEdit = null;
const minOfDay = ts => { const d = new Date(ts); return d.getHours() * 60 + d.getMinutes(); };
const hm = m => `${Math.floor(m / 60) % 24}:${String(Math.round(m % 60)).padStart(2, '0')}`;
const fmtMn = m => { const r = Math.round(m); return r < 60 ? `${r} Min` : `${Math.floor(r / 60)} h ${String(r % 60).padStart(2, '0')}`; };
const median = a => { if(!a.length) return 0; const s = a.slice().sort((x, y) => x - y), i = s.length / 2; return s.length % 2 ? s[Math.floor(i)] : (s[i - 1] + s[i]) / 2; };
function trackEnds(t){
  const segs = (t.segs || []).filter(sg => sg.length); if(!segs.length) return null;
  const a = segs[0][0], l = segs[segs.length - 1], b = l[l.length - 1];
  return {s:{lat:a[1], lng:a[0]}, e:{lat:b[1], lng:b[0]}};
}
function waySlots(trips){
  const wd = trips.filter(t => { const d = new Date(t.created).getDay(); return d > 0 && d < 6; }), use = wd.length >= 4 ? wd : trips, bins = new Map();
  use.forEach(t => { const b = Math.floor(minOfDay(t.created) / 30) * 30; if(!bins.has(b)) bins.set(b, []); bins.get(b).push(t.dur / 60000); });
  const list = [...bins].map(([b, d]) => ({b, n:d.length, med:median(d)})).sort((a, b) => a.b - b.b), ok = list.filter(s => s.n >= 2);
  const best = ok.length >= 2 ? ok.reduce((a, s) => s.med < a.med ? s : a) : null, worst = ok.length >= 2 ? ok.reduce((a, s) => s.med > a.med ? s : a) : null;
  return {list, best, worst, wd:use === wd && wd.length < trips.length};
}
function waysCalc(){
  const ts = myTracks().filter(t => (t.dist || 0) >= 800 && (t.dur || 0) >= 60000 && t.created).sort((a, b) => a.created - b.created);
  const sig = ts.map(t => t.id + ':' + t.dist).join('|') + '#' + JSON.stringify(prefs.wayPlaces || []);
  if(waysCache && waysCache.sig === sig) return waysCache;
  const places = (prefs.wayPlaces || []).map(p => ({id:p.id, lat:p.lat, lng:p.lng, n:p.n, named:true, k:0}));
  const assign = p => {
    let best = null, bd = WAY_R;
    for(const pl of places){ const d = dist(pl, p); if(d < bd){ bd = d; best = pl; } }
    if(!best){ best = {id:'a' + places.length, lat:p.lat, lng:p.lng, k:0}; places.push(best); }
    best.k++;
    if(!best.named){ best.lat += (p.lat - best.lat) / best.k; best.lng += (p.lng - best.lng) / best.k; }
    return best;
  };
  const groups = new Map(), byTrack = {}, ways = [];
  for(const t of ts){
    const en = trackEnds(t); if(!en) continue;
    const A = assign(en.s), B = assign(en.e); if(A === B) continue;
    const k = A.id + '>' + B.id; if(!groups.has(k)) groups.set(k, {A, B, trips:[]}); groups.get(k).trips.push(t);
  }
  groups.forEach((g, k) => {
    if(g.trips.length < WAY_MIN) return;
    const md = median(g.trips.map(t => t.dist)), trips = g.trips.filter(t => t.dist <= md * 1.35 && t.dist >= md * .7);
    if(trips.length < WAY_MIN) return;
    const durs = trips.map(t => t.dur / 60000);
    const w = {id:k, A:g.A, B:g.B, trips, n:trips.length, dist:median(trips.map(t => t.dist)), typ:median(durs), fast:Math.min(...durs), slots:waySlots(trips)};
    trips.forEach(t => byTrack[t.id] = w); ways.push(w);
  });
  ways.sort((a, b) => b.n - a.n || b.trips[b.trips.length - 1].created - a.trips[a.trips.length - 1].created);
  waysCache = {sig, ways, byTrack, places};
  return waysCache;
}
const wayGeoKey = p => p.lat.toFixed(2) + ',' + p.lng.toFixed(2);
function placeName(p){ if(p.n) return p.n; const g = (prefs.wayGeo || {})[wayGeoKey(p)]; return g ? g.n : null; }
function wayTitle(w){
  let a = placeName(w.A) || 'Start', b = placeName(w.B) || 'Ziel';
  if(a === b){ const ga = (prefs.wayGeo || {})[wayGeoKey(w.A)], gb = (prefs.wayGeo || {})[wayGeoKey(w.B)]; if(!w.A.n && ga && ga.r) a = ga.r; if(!w.B.n && gb && gb.r) b = gb.r; }
  return `${a} → ${b}`;
}
async function wayGeoFetch(){
  if(wayGeoBusy || !navigator.onLine) return; wayGeoBusy = true;
  try{
    const need = new Map();
    waysCalc().ways.forEach(w => [w.A, w.B].forEach(p => { if(!placeName(p)) need.set(wayGeoKey(p), p); }));
    for(const [k, p] of need){
      let n = null, r = null;
      try{
        const j = await (await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&accept-language=de&lat=${p.lat.toFixed(4)}&lon=${p.lng.toFixed(4)}`)).json(), ad = j.address || {};
        n = ad.village || ad.hamlet || ad.town || ad.city || ad.municipality || ad.suburb || null; r = ad.road || ad.suburb || j.name || null;
      }catch(e){ break; }
      prefs.wayGeo = {...(prefs.wayGeo || {}), [k]:{n:n || 'Ort', r}}; savePrefs(); wayRefresh();
      await sleep(1100);
    }
  }finally{ wayGeoBusy = false; }
}
function wayRefresh(){
  const c = $('#wayCard'); if(c) c.innerHTML = wayCardHTML();
  const tv = $('#wayTv'), t = view === 'track' && curTrack(); if(tv && t) tv.innerHTML = wayTrackHTML(t);
  if(wayCur && $('#modal .way-dlg') && !wayEdit) renderWay();
}
function wayCardHTML(){
  const W = waysCalc();
  const head = `<div class="st-h"><span>Deine Wege</span>${W.ways.length ? `<em>${W.ways.length} erkannt</em>` : ''}</div>`;
  if(!W.ways.length) return head + `<div class="wy-empty">Fährst du dieselbe Strecke dreimal, zum Beispiel zur Arbeit, erkennt die App sie automatisch – mit typischer Fahrzeit und der Abfahrtszeit mit dem wenigsten Stau.</div>`;
  return head + `<div class="wy-list">${W.ways.slice(0, 6).map(w => `<button class="wy-row" data-wy-open="${w.trips[0].id}"><span class="wy-ic">${svg(UI.route, 16)}</span><span class="tx"><b>${esc(wayTitle(w))}</b><small>${w.n}× · typisch ${fmtMn(w.typ)}${w.slots.best && w.slots.worst.med - w.slots.best.med >= 1 ? ` · beste Abfahrt ${hm(w.slots.best.b)}–${hm(w.slots.best.b + 30)}` : ''}</small></span><span class="wy-chev">${svg(UI.back, 14).replace('<svg', '<svg style="transform:scaleX(-1)"')}</span></button>`).join('')}</div>`;
}
function wayTrackHTML(t){
  if(t._ws && t._ws.dev !== myId()) return '';
  const w = waysCalc().byTrack[t.id]; if(!w) return '';
  const d = t.dur / 60000 - w.typ, i = w.trips.indexOf(t) + 1;
  const txt = Math.abs(d) < 1 ? 'so schnell wie meistens' : d < 0 ? `${Math.round(-d)} Min schneller als typisch` : `${Math.round(d)} Min länger als typisch`;
  return `<button class="wy-t" data-wy-open="${t.id}"><span class="wy-ic">${svg(UI.route, 16)}</span><span class="tx"><b>${esc(wayTitle(w))}</b><small>${i}. von ${w.n} Fahrten · ${txt} (${fmtMn(w.typ)})</small></span></button>`;
}
function wayChart(w){
  const W = 320, H = 156, pl = 30, pr = 8, pt = 10, pb = 22, cw = W - pl - pr, ch = H - pt - pb;
  const use = w.slots.wd ? w.trips.filter(t => { const d = new Date(t.created).getDay(); return d > 0 && d < 6; }) : w.trips;
  const xs = use.map(t => minOfDay(t.created)), ys = use.map(t => t.dur / 60000);
  let x0 = Math.floor((Math.min(...xs) - 20) / 30) * 30, x1 = Math.ceil((Math.max(...xs) + 20) / 30) * 30;
  if(x1 - x0 < 120){ const c = (x0 + x1) / 2; x0 = Math.floor((c - 60) / 30) * 30; x1 = x0 + 120; }
  const y0 = Math.max(0, Math.floor(Math.min(...ys) * .85)), y1 = Math.ceil(Math.max(...ys) * 1.1 + 1);
  const X = m => pl + (m - x0) / (x1 - x0) * cw, Y = v => pt + ch - (v - y0) / (y1 - y0) * ch;
  const step = x1 - x0 > 360 ? 120 : 60, ticks = []; for(let m = Math.ceil(x0 / step) * step; m <= x1; m += step) ticks.push(m);
  const col = v => { const r = (v - w.fast) / Math.max(1, w.fast); return r <= .1 ? '#30d158' : r <= .3 ? '#ffd60a' : '#ff9f0a'; };
  const bins = w.slots.list.map(s => `<rect class="wy-bin${w.slots.best && s.b === w.slots.best.b ? ' best' : ''}" x="${X(s.b) + 1}" y="${Y(s.med) - 1.5}" width="${Math.max(2, X(s.b + 30) - X(s.b) - 2)}" height="3" rx="1.5"/>`).join('');
  const bestBand = w.slots.best ? `<rect class="wy-band" x="${X(w.slots.best.b)}" y="${pt}" width="${X(w.slots.best.b + 30) - X(w.slots.best.b)}" height="${ch}"/>` : '';
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Fahrzeit nach Abfahrtszeit">
    ${bestBand}
    <line class="grid" x1="${pl}" x2="${W - pr}" y1="${Y(y1)}" y2="${Y(y1)}"/><line class="grid" x1="${pl}" x2="${W - pr}" y1="${Y((y0 + y1) / 2)}" y2="${Y((y0 + y1) / 2)}"/><line class="grid" x1="${pl}" x2="${W - pr}" y1="${Y(y0)}" y2="${Y(y0)}"/>
    <text class="ax" x="${pl - 5}" y="${Y(y1) + 3}" text-anchor="end">${y1}′</text><text class="ax" x="${pl - 5}" y="${Y((y0 + y1) / 2) + 3}" text-anchor="end">${Math.round((y0 + y1) / 2)}′</text><text class="ax" x="${pl - 5}" y="${Y(y0) + 3}" text-anchor="end">${y0}′</text>
    ${ticks.map(m => `<text class="ax" x="${X(m)}" y="${H - 6}" text-anchor="middle">${hm(m)}</text>`).join('')}
    ${bins}
    ${use.map((t, i) => `<circle class="wy-dot" cx="${X(xs[i]).toFixed(1)}" cy="${Y(ys[i]).toFixed(1)}" r="4.5" fill="${col(ys[i])}"/>`).join('')}
  </svg>`;
}
function openWay(tid){ wayCur = tid; wayEdit = null; renderWay(); $('#modal').hidden = false; wayGeoFetch(); }
function renderWay(){
  const W = waysCalc(), w = W.byTrack[wayCur]; if(!w){ $('#modal').hidden = true; wayCur = null; return; }
  const sl = w.slots, back = W.ways.find(x => x.A === w.B && x.B === w.A), loss = Math.max(0, w.typ - w.fast);
  const pl = (k, p) => `<button class="wy-pl" data-wy="ed" data-k="${k}"><i class="${k}"></i><b>${esc(placeName(p) || (k === 'A' ? 'Start' : 'Ziel'))}</b><span>Umbenennen</span></button>`;
  const ed = wayEdit ? `<div class="wy-ed"><input class="inp" id="wy-name" maxlength="30" value="${esc(placeName(w[wayEdit]) || '')}" placeholder="Name für diesen Ort">
      <div class="chips">${['Zuhause', 'Arbeit', 'Schule', 'Freunde'].map(n => `<button class="chip" data-wy="pick" data-n="${n}">${n}</button>`).join('')}</div>
      <div class="btns"><button class="btn" data-wy="edx">Abbrechen</button><button class="btn primary" data-wy="edok">Speichern</button></div></div>` : '';
  let best;
  if(sl.best && sl.worst.med - sl.best.med >= 1) best = `<b>Beste Abfahrt: ${hm(sl.best.b)}–${hm(sl.best.b + 30)}</b><span>Typisch ${fmtMn(sl.best.med)}. Wer ${hm(sl.worst.b)}–${hm(sl.worst.b + 30)} losfährt, braucht ${fmtMn(sl.worst.med)} – ${fmtMn(sl.worst.med - sl.best.med)} mehr.</span>`;
  else if(sl.best) best = `<b>Die Abfahrtszeit ist fast egal</b><span>Zwischen ${hm(sl.list[0].b)} und ${hm(sl.list[sl.list.length - 1].b + 30)} brauchst du überall etwa ${fmtMn(w.typ)}.</span>`;
  else best = `<b>Beste Abfahrtszeit kommt noch</b><span>Dafür braucht es mindestens 2 Fahrten in 2 verschiedenen halben Stunden${sl.wd ? ' (Mo–Fr)' : ''}. Fahr ruhig mal früher oder später los.</span>`;
  const wdm = [1, 2, 3, 4, 5, 6, 0].map(d => { const l = w.trips.filter(t => new Date(t.created).getDay() === d); return {d, n:l.length, med:median(l.map(t => t.dur / 60000))}; }).filter(x => x.n);
  const rows = w.trips.slice().reverse().slice(0, 8).map(t => { const d = t.dur / 60000 - w.typ; return `<button class="st-row wy-trip" data-wy="trip" data-id="${t.id}"><span class="k">${new Date(t.created).toLocaleDateString('de-DE', {weekday:'short', day:'numeric', month:'numeric'})}<small>ab ${hm(minOfDay(t.created))}</small></span><span class="v">${fmtMn(t.dur / 60000)}<small class="${d <= -1 ? 'pos' : d >= 1 ? 'neg' : ''}">${Math.abs(d) < 1 ? '±0' : (d < 0 ? '−' : '+') + Math.round(Math.abs(d))} Min</small></span></button>`; }).join('');
  const keep = $('#modal .way-dlg .pad'), st = keep ? keep.scrollTop : 0;
  $('#modal').innerHTML = `<div class="dlg way-dlg" role="dialog" aria-modal="true" aria-label="Dein Weg">
    <div class="top"><span class="wy-k">Dein Weg · ${fmtKmS(w.dist)}</span><button class="icon-btn press" data-wy="close" aria-label="Schließen">${svg(UI.close, 14)}</button></div>
    <div class="pad">
      <div class="wy-head">${pl('A', w.A)}<span class="wy-line"></span>${pl('B', w.B)}</div>
      ${ed}
      <div class="wy-tiles"><div><b>${fmtMn(w.typ)}</b><span>typisch</span></div><div><b>${fmtMn(w.fast)}</b><span>am schnellsten</span></div><div><b>+${fmtMn(loss)}</b><span>Stau & Ampeln</span></div></div>
      <div class="wy-best${sl.best && sl.worst.med - sl.best.med >= 1 ? ' on' : ''}">${best}</div>
      <div class="st-h"><span>Abfahrt und Fahrzeit</span><em>${w.n} Fahrten${sl.wd ? ' · Grafik Mo–Fr' : ''}</em></div>
      <div class="st-chart wy-chart">${wayChart(w)}</div>
      <div class="wy-leg"><span><i style="background:#30d158"></i>freie Fahrt</span><span><i style="background:#ffd60a"></i>etwas zäh</span><span><i style="background:#ff9f0a"></i>Stau</span><span><i class="bar"></i>typisch je ½ Std</span></div>
      ${wdm.length >= 2 ? `<div class="wy-days">${wdm.map(x => `<div><span>${WDAYS[x.d]}</span><b>${Math.round(x.med)}′</b><small>${x.n}×</small></div>`).join('')}</div>` : ''}
      <div class="st-h"><span>Letzte Fahrten</span></div>
      <div class="st-list">${rows}</div>
      ${back ? `<button class="btn" data-wy="back" data-id="${back.trips[0].id}">${svg(UI.route, 15)} Rückweg: ${esc(wayTitle(back))} · ${back.n}×</button>` : ''}
      <div class="muted wy-note">Erkannt aus deinen aufgezeichneten Fahrten. Die Orte und Namen bleiben auf diesem Gerät.</div>
    </div></div>`;
  if(st) $('#modal .way-dlg .pad').scrollTop = st;
  if(wayEdit) setTimeout(() => { const i = $('#wy-name'); if(i){ i.focus(); i.select(); } }, 50);
}
function wayPlaceSet(p, n){
  n = n.trim().slice(0, 30); if(!n) return;
  const list = (prefs.wayPlaces || []).slice();
  if(p.named){ const x = list.find(q => q.id === p.id); if(x) x.n = n; }
  else list.push({id:'w' + uid(), lat:+p.lat.toFixed(5), lng:+p.lng.toFixed(5), n});
  prefs.wayPlaces = list; savePrefs();
}
document.addEventListener('click', e => { const b = e.target.closest('[data-wy-open]'); if(b) openWay(b.dataset.wyOpen); });
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-wy]'); if(!b || !$('#modal .way-dlg')) return;
  const a = b.dataset.wy, w = waysCalc().byTrack[wayCur];
  if(a === 'close'){ $('#modal').hidden = true; wayCur = null; return; }
  if(a === 'ed'){ wayEdit = b.dataset.k; return renderWay(); }
  if(a === 'edx'){ wayEdit = null; return renderWay(); }
  if(a === 'pick'){ const i = $('#wy-name'); if(i) i.value = b.dataset.n; }
  if((a === 'edok' || a === 'pick') && w){ wayPlaceSet(w[wayEdit], $('#wy-name').value); wayEdit = null; renderWay(); wayRefresh(); return; }
  if(a === 'trip'){ $('#modal').hidden = true; wayCur = null; openTrack(b.dataset.id, true); return; }
  if(a === 'back'){ wayCur = b.dataset.id; wayEdit = null; renderWay(); $('#modal .way-dlg .pad').scrollTop = 0; }
});
$('#modal').addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.id === 'wy-name'){ e.preventDefault(); $('#modal [data-wy="edok"]').click(); } });

/* ================= Fahrbedingungen: Nacht, Regen, Glätte =================
   Dunkel = vor der Morgendämmerung oder nach der bürgerlichen Abenddämmerung (Sonnenstand, lokal gerechnet).
   Wetter kommt nachträglich stündlich von Open-Meteo (ohne Key) – nur ein grober Punkt pro Gegend, nicht die Strecke. */
const CX_V = 1;
let cxBusy = false; const cxTried = new Set();
function cxCalc(t, wx){
  const R = {v:CX_V, tot:[0, 0], n:[0, 0], r:[0, 0], g:[0, 0], sn:[0, 0], dry:[0, 0], tmin:null, tmax:null, wx:wx ? 1 : 0};
  const total = Math.max(1, t.dist || 0), hasT = (t.segs || []).some(sg => sg.some(q => q[2] > 0)), sunC = {};
  let cum = 0, hit = 0, miss = 0;
  const dark = (ts, lat, lng) => {
    const d = new Date(ts), k = d.toDateString();
    if(!(k in sunC)){ const nd = new Date(d); nd.setHours(12, 0, 0, 0); const S = SUN(nd, lat, lng); sunC[k] = S.rise && S.blue2 && S.sunset ? {dawn:S.rise.getTime() - (S.blue2 - S.sunset), dusk:S.blue2.getTime()} : null; }
    const s = sunC[k]; return s ? ts < s.dawn || ts > s.dusk : false;
  };
  const add = (k, m, s) => { R[k][0] += m; R[k][1] += s; };
  for(const sg of t.segs || []) for(let i = 1; i < sg.length; i++){
    const p = sg[i - 1], q = sg[i], m = dist({lng:p[0], lat:p[1]}, {lng:q[0], lat:q[1]});
    const s = hasT ? (q[2] || 0) - (p[2] || 0) : m / total * (t.dur || 0) / 1000, ts = hasT ? t.created + (p[2] || 0) * 1000 : t.created + cum / total * (t.dur || 0);
    cum += m; if(s < 0 || s > 900) continue;
    add('tot', m, s); if(dark(ts, p[1], p[0])) add('n', m, s);
    if(!wx) continue;
    const h = Math.ceil(ts / 3600e3) * 3600, cur = wx.get(h), tp = wx.get(Math.round(ts / 3600e3) * 3600);
    if(!cur || cur.p == null || !tp || tp.t == null){ miss++; continue; }
    hit++;
    const wet = [0, 1, 2, 3].some(j => { const x = wx.get(h - j * 3600); return x && x.p >= .1; }), snow = cur.s > 0, temp = tp.t;
    R.tmin = R.tmin == null ? temp : Math.min(R.tmin, temp); R.tmax = R.tmax == null ? temp : Math.max(R.tmax, temp);
    const glatt = temp <= 1 && (wet || snow), rain = cur.p >= .2 && !snow;
    if(snow) add('sn', m, s);
    if(glatt) add('g', m, s);
    if(rain) add('r', m, s);
    if(!snow && !glatt && !rain) add('dry', m, s);
  }
  if(wx && (!hit || miss > hit)) R.wx = 0;   // Wetter (noch) nicht da – später nochmal
  return R;
}
const cxNeedsWx = t => t.cx && !t.cx.wx && !cxTried.has(t.id) && t.created < Date.now() - 2 * 3600e3 && Date.now() - t.created < 4 * 365 * 864e5;
async function cxRun(list){
  const all = (list || myTracks()).filter(t => !(t._ws && t._ws.dev !== myId()));
  let ch = false;
  all.forEach(t => { if(!t.cx || t.cx.v !== CX_V){ t.cx = cxCalc(t, null); ch = true; } });
  if(ch){ saveTracks(); cxRefresh(); }
  if(cxBusy || !navigator.onLine) return; cxBusy = true;
  try{
    const groups = new Map();
    all.filter(cxNeedsWx).forEach(t => { const e = trackEnds(t); if(!e) return; const src = Date.now() - t.created > 60 * 864e5 ? 'a' : 'f', k = `${src}|${e.s.lat.toFixed(1)}|${e.s.lng.toFixed(1)}`; if(!groups.has(k)) groups.set(k, []); groups.get(k).push(t); });
    for(const [k, ts] of groups){
      const [src, la, ln] = k.split('|');
      ts.sort((a, b) => a.created - b.created);
      const chunks = []; ts.forEach(t => { const c = chunks[chunks.length - 1]; if(c && t.created - c[0].created < 150 * 864e5) c.push(t); else chunks.push([t]); });
      for(const c of chunks){
        const d0 = new Date(c[0].created - 5 * 3600e3).toISOString().slice(0, 10), last = c[c.length - 1], d1 = new Date(last.created + (last.dur || 0) + 2 * 3600e3).toISOString().slice(0, 10);
        const url = `${src === 'a' ? 'https://archive-api.open-meteo.com/v1/archive' : 'https://api.open-meteo.com/v1/forecast'}?latitude=${la}&longitude=${ln}&start_date=${d0}&end_date=${d1}&hourly=temperature_2m,precipitation,snowfall&timeformat=unixtime&timezone=GMT`;
        let j = null; try{ const r = await fetch(url); if(r.ok) j = await r.json(); }catch(e){}
        c.forEach(t => cxTried.add(t.id));
        if(!j || !j.hourly || !j.hourly.time) continue;
        const H = j.hourly, wx = new Map(); H.time.forEach((tm, i) => wx.set(tm, {t:H.temperature_2m[i], p:H.precipitation[i], s:H.snowfall ? H.snowfall[i] : 0}));
        c.forEach(t => { const r = cxCalc(t, wx); if(r.wx) t.cx = r; });
        saveTracks(); cxRefresh();
        await sleep(350);
      }
    }
  }finally{ cxBusy = false; cxRefresh(); }
}
function cxRefresh(){
  const c = $('#cxCard'); if(c) c.innerHTML = cxCardHTML();
  const tv = $('#cxTv'), t = view === 'track' && curTrack(); if(tv && t) tv.innerHTML = cxTrackHTML(t);
}
function cxStats(ts){
  const S = {tot:[0, 0], n:[0, 0], r:[0, 0], g:[0, 0], sn:[0, 0], dry:[0, 0], wxTot:[0, 0], wx:0, need:0, nightRisk:[], dayRisk:[]};
  ts.forEach(t => {
    const c = t.cx; if(!c) return; if(c.wx || (c.tot[0] > 0 && cxNeedsWx(t))) S.need++;   // nur, was noch ladbar ist
    ['tot', 'n'].forEach(k => { S[k][0] += c[k][0]; S[k][1] += c[k][1]; });
    if(c.wx){ S.wx++; ['r', 'g', 'sn', 'dry'].forEach(k => { S[k][0] += c[k][0]; S[k][1] += c[k][1]; }); S.wxTot[0] += c.tot[0]; S.wxTot[1] += c.tot[1]; }
    const f = c.tot[0] ? c.n[0] / c.tot[0] : 0, rk = trackRisk(t);
    if(rk){ if(f >= .6) S.nightRisk.push(rk.score); else if(f <= .05) S.dayRisk.push(rk.score); }
  });
  return S;
}
const kmh = v => v[1] > 0 ? v[0] / v[1] * 3.6 : 0;
function cxInsights(S){
  const out = [];
  if(S.r[0] >= 5000 && S.dry[0] >= 20000){ const d = kmh(S.dry) - kmh(S.r); if(d >= 2) out.push(`Bei Regen fährst du im Schnitt ${Math.round(d)} km/h langsamer als im Trockenen.`); else if(d <= -2) out.push(`Bei Regen bist du im Schnitt ${Math.round(-d)} km/h schneller unterwegs als im Trockenen – auf nasser Straße ist der Bremsweg länger.`); else out.push('Bei Regen und im Trockenen fährst du im Schnitt gleich schnell.'); }
  if(S.nightRisk.length >= 3 && S.dayRisk.length >= 3){ const n = Math.round(median(S.nightRisk)), d = Math.round(median(S.dayRisk)); out.push(n > d + 3 ? `Nachts liegt dein Risk typisch bei ${n}, tagsüber bei ${d}.` : n < d - 3 ? `Nachts fährst du ruhiger: Risk typisch ${n}, tagsüber ${d}.` : `Nachts und tagsüber fährst du ähnlich ruhig (Risk um ${d}).`); }
  return out;
}
function cxCardHTML(){
  const S = cxStats(myTracks()); if(!S.tot[0]) return '';
  const pct = (v, of) => of ? Math.round(v / of * 100) : 0;
  const row = (ic, k, v, of, col) => `<div class="cx-row"><span class="cx-ic">${ic}</span><span class="k">${k}</span><span class="cx-bar"><i style="width:${v ? Math.max(2, v / of * 100) : 0}%;background:${col}"></i></span><span class="v">${fmtKmS(v)}<small>${pct(v, of)} %</small></span></div>`;
  const ins = cxInsights(S), loading = S.wx < S.need;
  return `<div class="st-h"><span>Fahrbedingungen</span><em>${fmtKmS(S.tot[0])}</em></div>
    <div class="cx">
      ${row('🌙', 'Im Dunkeln', S.n[0], S.tot[0], '#5e5ce6')}
      ${S.wx ? row('🌧️', 'Bei Regen', S.r[0], S.wxTot[0], '#0a84ff') + row('🧊', 'Glättegefahr', S.g[0], S.wxTot[0], '#64d2ff') + (S.sn[0] ? row('🌨️', 'Bei Schnee', S.sn[0], S.wxTot[0], '#ebebf5') : '') + row('☀️', 'Trocken', S.dry[0], S.wxTot[0], '#ffd60a') : ''}
      ${ins.map(x => `<div class="cx-ins">${esc(x)}</div>`).join('')}
      ${loading ? `<div class="xpl-prog"><i></i>${navigator.onLine ? `Wetter wird nachgeladen … ${S.wx} von ${S.need} Fahrten` : `Wetter für ${S.need - S.wx} Fahrten lädt, sobald du online bist`}</div>` : `<div class="cx-foot">Glättegefahr = um 0 °C mit Nässe oder Schnee. Wetter von Open-Meteo, stündlich für die Gegend.</div>`}
    </div>`;
}
function cxTrackHTML(t){
  if(t._ws && t._ws.dev !== myId()) return '';
  const c = t.cx || cxCalc(t, null); if(!c || !c.tot[0]) return '';
  const f = v => v[0] / c.tot[0], tags = [];
  tags.push(f(c.n) >= .6 ? '🌙 Im Dunkeln' : f(c.n) > .05 ? '🌗 Teils im Dunkeln' : '☀️ Bei Tag');
  if(c.wx){
    if(f(c.sn) > .05) tags.push('🌨️ Schnee');
    if(f(c.g) > .05) tags.push('🧊 Glättegefahr');
    if(f(c.r) > .05) tags.push(`🌧️ Regen${f(c.r) < .6 ? ' (teils)' : ''}`); else if(f(c.sn) <= .05) tags.push('Trocken');
    if(c.tmin != null) tags.push(`${Math.round(c.tmin) === Math.round(c.tmax) ? Math.round(c.tmin) : Math.round(c.tmin) + '–' + Math.round(c.tmax)} °C`);
  }
  return `<div class="cx-tags">${tags.map(x => `<span>${x}</span>`).join('')}</div>`;
}

/* ================= Fahrstil-Trend: Risk, Bremsen und Kurven über die Zeit =================
   Pro Monat (bei weniger als 10 Wochen Daten: pro Woche) der typische Wert deiner Fahrten. Niedriger = ruhiger. */
function styleData(){
  const xs = myTracks().filter(t => t.created && !t._ws).map(t => ({t, r:trackRisk(t)})).filter(x => x.r).sort((a, b) => a.t.created - b.t.created);
  if(xs.length < 3) return {list:[], n:xs.length};
  const weekly = xs[xs.length - 1].t.created - xs[0].t.created < 70 * 864e5;
  const key = ts => weekly ? weekStart(ts) : new Date(new Date(ts).getFullYear(), new Date(ts).getMonth(), 1).getTime();
  const B = new Map(); xs.forEach(x => { const k = key(x.t.created); if(!B.has(k)) B.set(k, []); B.get(k).push(x); });
  const list = [...B].map(([k, a]) => { const D = a.reduce((s, x) => s + (x.r.an ? x.r.an.D : 0), 0); return {k, n:a.length, risk:Math.round(median(a.map(x => x.r.score))), brake:median(a.map(x => x.r.brake)), lat:median(a.map(x => x.r.lat)), ev:D > 0 ? a.reduce((s, x) => s + x.r.ev, 0) / (D / 100000) : 0}; })
    .sort((a, b) => a.k - b.k).slice(weekly ? -10 : -8);
  return {weekly, list, n:xs.length};
}
const styleLabel = (S, k) => S.weekly ? `KW ${isoWeek(k)}` : new Date(k).toLocaleDateString('de-DE', {month:'short'}).replace('.', '') + (new Date(S.list[0].k).getFullYear() !== new Date(S.list[S.list.length - 1].k).getFullYear() ? ' ' + String(new Date(k).getFullYear()).slice(2) : '');
const styleWhen = (S, k) => S.weekly ? `KW ${isoWeek(k)}` : new Date(k).toLocaleDateString('de-DE', new Date(k).getFullYear() === new Date().getFullYear() ? {month:'long'} : {month:'long', year:'numeric'});
function styleCardHTML(){
  const S = styleData(), head = `<div class="st-h"><span>Fahrstil</span>${S.n ? `<em>${S.n} Fahrten</em>` : ''}</div>`;
  if(S.list.length < 2) return head + `<div class="wy-empty">Der Trend erscheint, sobald du in zwei verschiedenen ${S.weekly === false ? 'Monaten' : 'Wochen'} gefahren bist. Er zeigt, ob du ruhiger oder sportlicher fährst.</div>`;
  const L = S.list, W = 320, H = 132, pl = 26, pr = 10, pt = 12, pb = 20, cw = W - pl - pr, ch = H - pt - pb;
  const top = Math.max(30, Math.ceil((Math.max(...L.map(x => x.risk)) + 8) / 10) * 10);
  const X = i => pl + (L.length === 1 ? cw / 2 : i / (L.length - 1) * cw), Y = v => pt + ch - v / top * ch;
  const line = L.map((x, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(x.risk).toFixed(1)}`).join(' ');
  const area = `${line} L${X(L.length - 1).toFixed(1)} ${Y(0)} L${X(0).toFixed(1)} ${Y(0)} Z`;
  const svgC = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Risk pro ${S.weekly ? 'Woche' : 'Monat'}">
    <defs><linearGradient id="stA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--accent);stop-opacity:.28"/><stop offset="1" style="stop-color:var(--accent);stop-opacity:0"/></linearGradient></defs>
    ${[0, top / 2, top].map(v => `<line class="grid" x1="${pl}" x2="${W - pr}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ax" x="${pl - 5}" y="${Y(v) + 3}" text-anchor="end">${v}</text>`).join('')}
    <path d="${area}" fill="url(#stA)"/><path d="${line}" fill="none" style="stroke:var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${L.map((x, i) => `<circle cx="${X(i).toFixed(1)}" cy="${Y(x.risk).toFixed(1)}" r="4.5" fill="${riskLevel(x.risk).col}" style="stroke:var(--solid-2)" stroke-width="1.5"/><text class="ax" x="${X(i).toFixed(1)}" y="${H - 5}" text-anchor="middle">${styleLabel(S, x.k)}</text>`).join('')}
  </svg>`;
  const ok = L.filter(x => x.n >= 2), a = ok.length >= 2 ? ok[0] : L[0], b = ok.length >= 2 ? ok[ok.length - 1] : L[L.length - 1], d = b.risk - a.risk;
  const msg = d <= -3 ? `Du fährst ruhiger als ${S.weekly ? 'in' : 'im'} ${styleWhen(S, a.k)}: Risk ${a.risk} → ${b.risk}.` : d >= 3 ? `Zuletzt sportlicher als ${S.weekly ? 'in' : 'im'} ${styleWhen(S, a.k)}: Risk ${a.risk} → ${b.risk}.` : `Dein Fahrstil ist gleichmäßig: Risk um ${b.risk}.`;
  const tile = (k, va, vb, f, eps) => { const up = vb - va > Math.max(eps, va * .08), dn = va - vb > Math.max(eps, va * .08); return `<div class="sty-t"><span>${k}</span><b>${f(va)} → ${f(vb)}</b><i class="${dn ? 'good' : up ? 'bad' : ''}">${dn ? '↓ ruhiger' : up ? '↑ mehr' : '= gleich'}</i></div>`; };
  return head + `<div class="sty">
    <div class="st-chart sty-chart">${svgC}</div>
    <div class="cx-ins">${esc(msg)}</div>
    <div class="sty-tiles">
      ${tile('Bremsen in G', a.brake, b.brake, v => v.toFixed(2).replace('.', ','), .03)}
      ${tile('Kurven in G', a.lat, b.lat, v => v.toFixed(2).replace('.', ','), .03)}
      ${tile('Manöver/100 km', a.ev, b.ev, v => (v >= 10 ? Math.round(v) : v.toFixed(1).replace('.', ',')), .3)}
    </div>
    <div class="cx-foot">Typischer Wert pro ${S.weekly ? 'Woche' : 'Monat'}, verglichen ${styleWhen(S, a.k)} mit ${styleWhen(S, b.k)}. Bremsen und Kurven: stärkster Wert je Fahrt.</div>
  </div>`;
}

/* ================= Jahresrückblick: Story-Bilder wie „Wrapped“ =================
   Nur aus den eigenen Fahrten. Start und Ziel jeder Fahrt sind um 250 m gekürzt, keine Kartenbilder, kein Top-Speed. */
let wrap = null;
const WR_COL = {cover:'#f4d35e', km:'#30d158', map:'#ff9f0a', way:'#bf5af2', car:'#ff375f', cx:'#64d2ff', sum:'#ffd60a'};
const WRF = (w, px) => `${w} ${px}px Geist, system-ui, -apple-system, sans-serif`;
const hexA = (h, a) => `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;
const MON1 = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const wrapYears = () => [...new Set(myTracks().filter(t => t.created).map(t => new Date(t.created).getFullYear()))].sort((a, b) => a - b);
function wrapData(y){
  const ts = myTracks().filter(t => (t.dist || 0) >= 100 && t.created && new Date(t.created).getFullYear() === y).sort((a, b) => a.created - b.created);
  const km = ts.reduce((a, t) => a + (t.dist || 0), 0) / 1000, dur = ts.reduce((a, t) => a + (t.dur || 0), 0);
  const months = Array(12).fill(0); ts.forEach(t => months[new Date(t.created).getMonth()] += (t.dist || 0) / 1000);
  const topM = months.indexOf(Math.max(...months)), days = new Set(ts.map(t => new Date(t.created).toDateString())).size;
  const wd = Array(7).fill(0), hrs = Array(24).fill(0); ts.forEach(t => { const d = new Date(t.created); wd[d.getDay()]++; hrs[d.getHours()]++; });
  const X = xplCalc(), R = xrStats(), neu = ts.reduce((a, t) => a + ((X.per[t.id] || {}).newKm || 0), 0), roads = ts.reduce((a, t) => a + ((R.per[t.id] || []).length), 0);
  const W = waysCalc(); let way = null, wayN = 0;
  W.ways.forEach(w => { const n = w.trips.filter(t => new Date(t.created).getFullYear() === y).length; if(n > wayN){ wayN = n; way = w; } });
  const longest = ts.reduce((a, t) => (t.dist || 0) > (a ? a.dist : 0) ? t : a, null);
  const carKm = new Map(); ts.forEach(t => { if(t.car && gCar(t.car)) carKm.set(t.car, (carKm.get(t.car) || 0) + (t.dist || 0) / 1000); });
  const cars = [...carKm].map(([id, k]) => ({c:gCar(id), km:k})).sort((a, b) => b.km - a.km);
  const S = cxStats(ts);
  return {y, now:y === new Date().getFullYear(), ts, km, n:ts.length, dur, months, topM, days, wdTop:wd.indexOf(Math.max(...wd)), hrTop:hrs.indexOf(Math.max(...hrs)), neu, roads, roadsDone:R.done >= R.need, way, wayN, longest, cars, S};
}
function wrapKeys(D){ return ['cover', 'km', 'map', 'way', 'car', 'cx', 'sum'].filter(k => k !== 'way' || D.way || D.longest); }
function wrCanvas(key, D){
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  const x = c.getContext('2d'), col = WR_COL[key];
  const bg = x.createLinearGradient(0, 0, 500, 1920); bg.addColorStop(0, '#11151f'); bg.addColorStop(.55, '#0a0c12'); bg.addColorStop(1, '#050608');
  x.fillStyle = bg; x.fillRect(0, 0, 1080, 1920);
  const g = x.createRadialGradient(820, 420, 10, 820, 420, 1050); g.addColorStop(0, hexA(col, .26)); g.addColorStop(1, hexA(col, 0));
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920);
  x.textBaseline = 'alphabetic'; x.lineCap = x.lineJoin = 'round';
  x.fillStyle = 'rgba(255,255,255,.5)'; x.font = WRF(700, 30); x.fillText(`SPOTS · ${D.y}${D.now ? ' BIS JETZT' : ''}`, 90, 150);
  return {c, x, col};
}
function wrTitle(x, txt, y, px = 80){
  x.fillStyle = '#fff'; x.font = WRF(800, px);
  const words = txt.split(' '), lines = []; let cur = '';
  words.forEach(w => { const t = cur ? cur + ' ' + w : w; if(x.measureText(t).width > 900 && cur){ lines.push(cur); cur = w; } else cur = t; });
  if(cur) lines.push(cur);
  lines.forEach((l, i) => x.fillText(l, 90, y + i * px * 1.1));
  return y + (lines.length - 1) * px * 1.1;
}
function wrStat(x, v, label, X, Y, px = 110, col = '#fff', maxW = 440){
  x.fillStyle = col; x.font = WRF(800, px); x.fillText(v, X, Y, maxW);
  x.fillStyle = 'rgba(255,255,255,.58)'; x.font = WRF(600, 34); x.fillText(label, X + 2, Y + 50, maxW);
}
function wrTracks(x, ts, box, col, o = {}){
  const segsL = ts.map(t => trimSegs(t.segs || [], 250)).filter(Boolean), flat = segsL.flat(2);
  if(flat.length < 2) return false;
  const my = lat => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) * 180 / Math.PI;
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  flat.forEach(q => { x0 = Math.min(x0, q[0]); x1 = Math.max(x1, q[0]); const yy = my(q[1]); y0 = Math.min(y0, yy); y1 = Math.max(y1, yy); });
  const sc = Math.min(box.w / Math.max(1e-6, x1 - x0), box.h / Math.max(1e-6, y1 - y0)), ox = box.l + (box.w - (x1 - x0) * sc) / 2, oy = box.t + (box.h - (y1 - y0) * sc) / 2;
  const P = q => [ox + (q[0] - x0) * sc, oy + (y1 - my(q[1])) * sc];
  x.save();
  if(o.glow){ x.shadowColor = hexA(col, .6); x.shadowBlur = 30; }
  x.globalCompositeOperation = o.add ? 'lighter' : 'source-over';
  segsL.forEach(segs => segs.forEach(sg => { x.beginPath(); sg.forEach((q, i) => { const [a, b] = P(q); i ? x.lineTo(a, b) : x.moveTo(a, b); }); x.strokeStyle = o.stroke || hexA(col, o.a || .35); x.lineWidth = o.w || 4; x.stroke(); }));
  x.restore();
  if(o.dots){ const f = segsL[0].flat(), [sx, sy] = P(f[0]), [ex, ey] = P(f[f.length - 1]); [[sx, sy, '#30d158'], [ex, ey, '#ff453a']].forEach(([a, b, c2]) => { x.beginPath(); x.arc(a, b, 17, 0, 7); x.fillStyle = '#fff'; x.fill(); x.beginPath(); x.arc(a, b, 11, 0, 7); x.fillStyle = c2; x.fill(); }); }
  return true;
}
async function wrSvgImg(s, w){
  const vb = (s.match(/viewBox="([^"]+)"/) || [])[1].split(/\s+/).map(Number), h = Math.round(w * vb[3] / vb[2]);
  const im = new Image(); await new Promise((res, rej) => { im.onload = res; im.onerror = rej; im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s.replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" `)); });
  return im;
}
const wrKm = k => k >= 100 ? Math.round(k).toLocaleString('de-DE') : k.toFixed(1).replace('.', ',');
async function drawWrap(key, D){
  try{ await Promise.all([document.fonts.load('800 80px Geist'), document.fonts.load('600 40px Geist')]); }catch(e){}
  const {c, x, col} = wrCanvas(key, D), hours = D.dur / 3600e3, monName = i => new Date(2020, i, 1).toLocaleDateString('de-DE', {month:'long'});
  const foot = t => { x.fillStyle = 'rgba(255,255,255,.35)'; x.font = WRF(600, 26); x.fillText(t, 90, 1800); };
  if(key === 'cover'){
    x.fillStyle = '#fff'; x.font = WRF(800, 120); x.fillText('Dein Jahr', 90, 330);
    x.fillStyle = col; x.font = WRF(800, 210); x.fillText(String(D.y), 82, 520);
    wrTracks(x, D.ts, {l:110, t:600, w:860, h:780}, col, {add:true, a:.5, w:5, glow:true});
    wrStat(x, `${wrKm(D.km)} km`, `auf ${D.n} Fahrt${D.n === 1 ? '' : 'en'}${D.now ? ` · Stand ${new Date().toLocaleDateString('de-DE', {day:'numeric', month:'long'})}` : ''}`, 90, 1560, 140, '#fff', 900);
    foot('Tippe weiter für deinen Rückblick');
  }
  if(key === 'km'){
    wrTitle(x, 'So viel warst du unterwegs', 290);
    wrStat(x, wrKm(D.km), 'Kilometer', 90, 560); wrStat(x, String(D.n), 'Fahrten', 570, 560);
    wrStat(x, hours >= 10 ? String(Math.round(hours)) : hours.toFixed(1).replace('.', ','), 'Stunden am Steuer', 90, 790); wrStat(x, String(D.days), 'Tage gefahren', 570, 790);
    const mx = Math.max(1, ...D.months), bx = 90, by = 1450, bh = 420, bw = 900 / 12;
    D.months.forEach((v, i) => {
      const h = Math.max(v ? 8 : 3, v / mx * bh); x.fillStyle = i === D.topM && v ? col : 'rgba(255,255,255,.18)';
      x.beginPath(); x.roundRect ? x.roundRect(bx + i * bw + 8, by - h, bw - 16, h, 10) : x.rect(bx + i * bw + 8, by - h, bw - 16, h); x.fill();
      x.fillStyle = 'rgba(255,255,255,.5)'; x.font = WRF(700, 28); x.textAlign = 'center'; x.fillText(MON1[i], bx + i * bw + bw / 2, by + 44); x.textAlign = 'left';
    });
    if(D.months[D.topM]){ x.fillStyle = '#fff'; x.font = WRF(700, 40); x.fillText(`Stärkster Monat: ${monName(D.topM)} · ${wrKm(D.months[D.topM])} km`, 90, 1600, 900); }
    x.fillStyle = 'rgba(255,255,255,.7)'; x.font = WRF(600, 36); x.fillText(`Am häufigsten: ${['sonntags', 'montags', 'dienstags', 'mittwochs', 'donnerstags', 'freitags', 'samstags'][D.wdTop]} gegen ${D.hrTop} Uhr`, 90, 1670, 900);
  }
  if(key === 'map'){
    wrTitle(x, 'Deine Straßen', 290);
    wrTracks(x, D.ts, {l:90, t:360, w:900, h:980}, col, {add:true, a:.42, w:5, glow:true});
    wrStat(x, `+${wrKm(D.neu)} km`, 'Neuland – zum ersten Mal gefahren', 90, 1530, 120, col, 900);
    if(D.roads && D.roadsDone) { x.fillStyle = '#fff'; x.font = WRF(700, 44); x.fillText(`${D.roads} neue Straßen entdeckt`, 90, 1690, 900); }
    foot('Start und Ziel jeder Fahrt gekürzt');
  }
  if(key === 'way'){
    if(D.way){
      const w = D.way, [a, b] = wayTitle(w).split(' → ');
      x.fillStyle = 'rgba(255,255,255,.6)'; x.font = WRF(700, 40); x.fillText('Dein häufigster Weg', 90, 270);
      x.fillStyle = '#fff'; x.font = WRF(800, 84); x.fillText(a, 90, 380, 900); x.fillStyle = col; x.fillText('→ ' + b, 90, 480, 900);
      wrTracks(x, w.trips.filter(t => new Date(t.created).getFullYear() === D.y).slice(-12), {l:150, t:560, w:780, h:760}, col, {a:.5, w:7, glow:true, dots:true});
      wrStat(x, `${D.wayN}×`, 'gefahren', 90, 1500, 130, '#fff'); wrStat(x, fmtMn(w.typ), 'typische Fahrzeit', 570, 1500, 110);
      if(w.slots.best && w.slots.worst.med - w.slots.best.med >= 1){ x.fillStyle = 'rgba(255,255,255,.75)'; x.font = WRF(600, 38); x.fillText(`Beste Abfahrt ${hm(w.slots.best.b)} – spart dir ${fmtMn(w.slots.worst.med - w.slots.best.med)} Stau`, 90, 1680, 900); }
    } else {
      const t = D.longest;
      x.fillStyle = 'rgba(255,255,255,.6)'; x.font = WRF(700, 40); x.fillText('Deine längste Fahrt', 90, 270);
      wrTitle(x, t.name || 'Fahrt', 370, 76);
      wrTracks(x, [t], {l:150, t:520, w:780, h:800}, col, {a:.7, w:9, glow:true, dots:true});
      wrStat(x, `${wrKm(t.dist / 1000)} km`, new Date(t.created).toLocaleDateString('de-DE', {day:'numeric', month:'long'}) + (placeTxt(t) ? ' · ' + placeTxt(t) : ''), 90, 1540, 130, '#fff', 900);
    }
  }
  if(key === 'car'){
    const top = D.cars[0], kind = top ? top.c.type : carType(), colr = top ? top.c.color : carColor();
    x.fillStyle = 'rgba(255,255,255,.6)'; x.font = WRF(700, 40); x.fillText(top ? 'Dein Auto des Jahres' : 'Dein Auto in der App', 90, 270);
    try{ const im = await wrSvgImg(carSideSVG(CAR_TYPES[kind] ? kind : 'limo', CAR_COLORS[colr] ? colr : 'carbon'), 900); x.save(); x.shadowColor = hexA(col, .45); x.shadowBlur = 80; x.drawImage(im, 90, 820 - im.height / 2 - 80); x.restore(); }catch(e){}
    if(top){
      x.fillStyle = '#fff'; x.font = WRF(800, 96); x.fillText(gTitle(top.c), 90, 1180, 900);
      if(top.c.nick && gModel(top.c)){ x.fillStyle = 'rgba(255,255,255,.62)'; x.font = WRF(600, 42); x.fillText(gModel(top.c) + (top.c.year ? ' · ' + top.c.year : ''), 90, 1250, 900); }
      wrStat(x, `${wrKm(top.km)} km`, `${Math.round(top.km / Math.max(.1, D.km) * 100)} % deiner Kilometer ${D.y}`, 90, 1480, 130, col, 900);
      if(D.cars[1]){ x.fillStyle = 'rgba(255,255,255,.62)'; x.font = WRF(600, 36); x.fillText('Auch gefahren: ' + D.cars.slice(1, 3).map(o => `${gTitle(o.c)} ${wrKm(o.km)} km`).join(' · '), 90, 1660, 900); }
    } else {
      x.fillStyle = '#fff'; x.font = WRF(800, 90); x.fillText((CAR_TYPES[kind] || CAR_TYPES.limo).name, 90, 1180, 900);
      wrStat(x, `${wrKm(D.km)} km`, `zusammen gefahren in ${D.y}`, 90, 1460, 130, col, 900);
      foot('Trag dein echtes Auto in der Garage ein');
    }
  }
  if(key === 'cx'){
    const S = D.S, base = S.tot[0] || 1, wb = S.wxTot[0] || 1;
    wrTitle(x, 'Unterwegs bei Tag und Nacht', 290);
    const rows = [['🌙', 'Im Dunkeln', S.n[0], base, '#7d7aff']];
    if(S.wx) rows.push(['🌧️', 'Bei Regen', S.r[0], wb, '#0a84ff']);
    if(S.wx && S.g[0] >= 100) rows.push(['🧊', 'Glättegefahr', S.g[0], wb, '#64d2ff']);
    if(S.sn[0]) rows.push(['🌨️', 'Bei Schnee', S.sn[0], wb, '#ebebf5']);
    if(S.wx) rows.push(['☀️', 'Trocken', S.dry[0], wb, '#ffd60a']);
    rows.forEach(([ic, k, v, of, cl], i) => {
      const Y = 520 + i * 210;
      x.font = WRF(600, 64); x.fillText(ic, 90, Y + 10);
      x.fillStyle = '#fff'; x.font = WRF(800, 64); x.fillText(`${wrKm(v / 1000)} km`, 200, Y);
      x.fillStyle = 'rgba(255,255,255,.6)'; x.font = WRF(600, 34); x.fillText(`${k} · ${Math.round(v / of * 100)} %`, 202, Y + 50);
      x.fillStyle = 'rgba(255,255,255,.1)'; x.fillRect(200, Y + 76, 790, 12); x.fillStyle = cl; x.fillRect(200, Y + 76, Math.max(v ? 8 : 0, 790 * v / of), 12);
    });
    const ins = cxInsights(S)[0]; if(ins){ x.fillStyle = 'rgba(255,255,255,.78)'; x.font = WRF(600, 38); const ws = ins.split(' '); let l = '', Y = 1640; ws.forEach(w => { if(x.measureText(l + ' ' + w).width > 900 && l){ x.fillText(l, 90, Y); Y += 50; l = w; } else l = l ? l + ' ' + w : w; }); x.fillText(l, 90, Y); }
    if(!S.wx) foot('Wetter lädt nach, wenn du die Statistik öffnest');
  }
  if(key === 'sum'){
    x.fillStyle = '#fff'; x.font = WRF(800, 110); x.fillText(`Dein ${D.y}`, 90, 330);
    const top = D.cars[0], tiles = [[`${wrKm(D.km)} km`, 'gefahren'], [String(D.n), 'Fahrten'], [`${Math.round(hours)} h`, 'am Steuer'], [`+${wrKm(D.neu)} km`, 'Neuland']];
    if(D.roads && D.roadsDone) tiles.push([String(D.roads), 'neue Straßen']);
    tiles.push([`${Math.round(D.S.n[0] / Math.max(1, D.S.tot[0]) * 100)} %`, 'im Dunkeln']);
    tiles.forEach(([v, l], i) => { const X = 90 + (i % 2) * 480, Y = 520 + Math.floor(i / 2) * 230; wrStat(x, v, l, X, Y, 92, i === 0 ? col : '#fff', 420); });
    let Y = 520 + Math.ceil(tiles.length / 2) * 230 + 20;
    const line = (k, v) => { x.fillStyle = 'rgba(255,255,255,.55)'; x.font = WRF(600, 32); x.fillText(k, 90, Y); x.fillStyle = '#fff'; x.font = WRF(700, 46); x.fillText(v, 90, Y + 58, 900); Y += 140; };
    if(D.way) line('Lieblingsstrecke', `${wayTitle(D.way)} · ${D.wayN}×`);
    if(top) line('Auto des Jahres', `${gTitle(top.c)} · ${wrKm(top.km)} km`);
    if(D.months[D.topM]) line('Stärkster Monat', `${monName(D.topM)} · ${wrKm(D.months[D.topM])} km`);
    foot('Spots · Jahresrückblick');
  }
  return await new Promise(res => c.toBlob(res, 'image/png'));
}
function wrapEl(){
  let el = $('#wrap'); if(el) return el;
  el = document.createElement('div'); el.id = 'wrap'; el.hidden = true;
  el.innerHTML = `<div class="wr-in"><div class="wr-bars"></div><div class="wr-top"><div class="wr-ys"></div><button class="wr-x" data-wr="close" aria-label="Schließen">${svg(UI.close, 16)}</button></div>
    <div class="wr-stage"><img alt="Jahresrückblick"><div class="wr-load">Wird gemalt …</div><button class="wr-prev" data-wr="prev" aria-label="Zurück"></button><button class="wr-next" data-wr="next" aria-label="Weiter"></button></div>
    <div class="wr-acts"><button class="btn" data-wr="save">Speichern</button><button class="btn" data-wr="all">Alle teilen</button><button class="btn primary" data-wr="share">${svg(UI.share, 15)} Teilen</button></div></div>`;
  document.body.appendChild(el);
  el.addEventListener('click', e => { const b = e.target.closest('[data-wr]'); if(b) wrapAct(b.dataset.wr, b); });
  document.addEventListener('keydown', e => { if(!wrap || el.hidden) return; if(e.key === 'Escape') wrapClose(); if(e.key === 'ArrowRight') wrapGo(1); if(e.key === 'ArrowLeft') wrapGo(-1); });
  return el;
}
function wrapFree(){ if(wrap) Object.values(wrap.urls).forEach(u => URL.revokeObjectURL(u)); }
function openWrap(y){
  const ys = wrapYears(); if(!ys.length){ toast('Noch keine Fahrten – der Rückblick füllt sich mit jeder Aufzeichnung.'); return; }
  if(!ys.includes(y)) y = ys[ys.length - 1];
  wrapFree();
  const D = wrapData(y); wrap = {y, D, i:0, keys:wrapKeys(D), urls:{}, blobs:{}, ys};
  const el = wrapEl(); el.hidden = false;
  el.querySelector('.wr-ys').innerHTML = ys.length > 1 ? ys.map(v => `<button class="${v === y ? 'on' : ''}" data-wr="y" data-y="${v}">${v}</button>`).join('') : '';
  el.querySelector('.wr-bars').innerHTML = wrap.keys.map(() => '<i></i>').join('');
  wrapShow(0);
  if(myTracks().some(t => !t.cx || cxNeedsWx(t))) cxRun().then(() => { if(wrap && wrap.y === y){ wrap.D = wrapData(y); ['cx', 'sum'].forEach(k => { if(wrap.urls[k]) URL.revokeObjectURL(wrap.urls[k]); delete wrap.urls[k]; delete wrap.blobs[k]; }); if(['cx', 'sum'].includes(wrap.keys[wrap.i])) wrapShow(wrap.i); } });
}
async function wrapRender(i){
  const k = wrap.keys[i], W = wrap; if(!k || W.blobs[k]) return;
  const b = await drawWrap(k, W.D); if(wrap !== W) return;
  W.blobs[k] = b; W.urls[k] = URL.createObjectURL(b);
}
async function wrapShow(i){
  const W = wrap, el = $('#wrap'); W.i = Math.max(0, Math.min(W.keys.length - 1, i));
  el.querySelectorAll('.wr-bars i').forEach((b, j) => b.classList.toggle('on', j <= W.i));
  const img = el.querySelector('.wr-stage img'), k = W.keys[W.i];
  el.querySelector('.wr-load').hidden = !!W.urls[k];
  await wrapRender(W.i); if(wrap !== W || W.i !== i) return;
  img.src = W.urls[k]; el.querySelector('.wr-load').hidden = true;
  wrapRender(W.i + 1);
}
const wrapGo = d => { if(wrap) wrapShow(wrap.i + d); };
function wrapClose(){ $('#wrap').hidden = true; wrapFree(); wrap = null; }
async function wrapAct(a, b){
  if(!wrap) return;
  if(a === 'close') return wrapClose();
  if(a === 'prev') return wrapGo(-1);
  if(a === 'next') return wrap.i < wrap.keys.length - 1 ? wrapGo(1) : null;
  if(a === 'y') return openWrap(+b.dataset.y);
  const name = k => `jahresrueckblick-${wrap.y}-${wrap.keys.indexOf(k) + 1}.png`;
  if(a === 'all'){
    b.disabled = true; for(let i = 0; i < wrap.keys.length; i++) await wrapRender(i); b.disabled = false;
    const files = wrap.keys.map(k => new File([wrap.blobs[k]], name(k), {type:'image/png'}));
    if(navigator.canShare && navigator.canShare({files})){ try{ await navigator.share({files, title:`Mein ${wrap.y}`}); }catch(_){} return; }
    for(const k of wrap.keys){ const l = document.createElement('a'); l.href = wrap.urls[k]; l.download = name(k); document.body.appendChild(l); l.click(); l.remove(); await sleep(250); }
    toast('Teilen geht hier nicht direkt – die Bilder wurden gespeichert.'); return;
  }
  const k = wrap.keys[wrap.i]; await wrapRender(wrap.i); if(!wrap.blobs[k]) return;
  if(a === 'share'){ const f = new File([wrap.blobs[k]], name(k), {type:'image/png'}); if(navigator.canShare && navigator.canShare({files:[f]})){ try{ await navigator.share({files:[f], title:`Mein ${wrap.y}`}); }catch(_){} return; } }
  const l = document.createElement('a'); l.href = wrap.urls[k]; l.download = name(k); document.body.appendChild(l); l.click(); l.remove();
  if(a === 'share') toast('Teilen geht hier nicht direkt – das Bild wurde gespeichert.');
}
function wrapCardHTML(){
  const ys = wrapYears(); if(!ys.length) return '';
  const y = ys[ys.length - 1], km = myTracks().filter(t => t.created && new Date(t.created).getFullYear() === y).reduce((a, t) => a + (t.dist || 0), 0);
  return `<button class="wr-card" data-wrap-open="${y}"><span class="ic">🎬</span><span class="tx"><b>Dein Jahr ${y}</b><small>Rückblick als Story · ${fmtKmS(km)}</small></span><span class="wr-play">${svg(UI.play, 14)}</span></button>`;
}
document.addEventListener('click', e => { const b = e.target.closest('[data-wrap-open]'); if(b) openWrap(+b.dataset.wrapOpen); });

/* Liste & Detail */
$('#listBody').addEventListener('click', e => {
  const h = e.target.closest('[data-xh]'); if(h){ xplHeatToggle(!prefs.heat, true); return; }
  const x = e.target.closest('[data-xt]'); if(x) openTrack(x.dataset.xt);
});
function renderTrackList(){
  if(sub === 'race') return renderCourseList();
  if(sub === 'stats') return renderStats();
  const body = $('#listBody');
  if(!tracks.length){ body.innerHTML = `<div class="empty"><b>Noch keine Fahrten</b>Tippe auf „Aufzeichnung starten“ und los geht’s.</div>`; return; }
  const nFav = tracks.filter(t => t.fav).length; if(!nFav && prefs.trkFav){ prefs.trkFav = false; savePrefs(); }
  const list = prefs.trkFav ? tracks.filter(t => t.fav) : tracks;
  const chips = nFav ? `<div class="chips fav-chips"><button class="chip ${prefs.trkFav ? '' : 'on'}" data-trkfav="0">Alle <span class="n">${tracks.length}</span></button><button class="chip ${prefs.trkFav ? 'on' : ''}" data-trkfav="1" style="--c:#ffd60a">${svg(ICONS.star, 13, 2.2)} Lieblinge <span class="n">${nFav}</span></button></div>` : '';
  body.innerHTML = chips + (prefs.trkFav ? "" : dlEntryHTML()) + list.map(t => { const r = trackRisk(t); return `<button class="item" data-track="${t.id}"><span class="ic${t.fav ? ' fav' : ''}" style="--c:${t.fav ? '#ffd60a' : '#ff9f0a'}">${svg(t.fav ? ICONS.star : UI.route, 16)}</span><span class="tx"><span class="t">${esc(t.name)}</span><span class="s">${fmtKm(t.dist)} · ${fmtDurLong(t.dur)} · ${fmtDate(t.created)}</span></span>${r ? `<span class="rk-pill" style="--lv:${r.lv.col}">${r.score}</span>` : ''}</button>`; }).join('');
}
$('#listBody').addEventListener('click', e => {
  const f = e.target.closest('[data-trkfav]'); if(f){ prefs.trkFav = f.dataset.trkfav === '1'; savePrefs(); renderList(); updateTrackLayers(); return; }
  const b = e.target.closest('[data-track]'); if(b) openTrack(b.dataset.track, true);
});
function fitTrack(segs){
  const pts = segs.flat(); if(!pts.length) return;
  const b = pts.reduce((b, q) => b.extend([q[0], q[1]]), new maplibregl.LngLatBounds([pts[0][0], pts[0][1]], [pts[0][0], pts[0][1]]));
  requestAnimationFrame(() => map.fitBounds(b, {padding:camPad(), maxZoom:17, duration:1200}));
}
function openTrack(id, fly = true){
  const t = tracks.find(x => x.id === id); if(!t) return;
  selTrack = id; trackRenaming = false; trackDelArmed = false; tvSel = -1; tvCmp = null;
  if(tab !== 'tracks') setTab('tracks');
  if(sub !== 'rec'){ sub = 'rec'; renderTracksHead(); renderList(); }
  renderTrackView(); show('track', mobile() && snap === 'full' ? 'full' : 'half');
  fitTrack(t.segs);
}
function curTrack(){ return selTrack && String(selTrack).startsWith('ws:') ? (wsTrackObjs.get(selTrack.slice(3)) || null) : tracks.find(x => x.id === selTrack); }
function closeTrack(){ const foreign = selTrack && String(selTrack).startsWith('ws:'); selTrack = null; tvSel = -1; tvCmp = null; renderList(); show('list', 'half'); if(foreign) renderWsMarkers(); }
function renderTrackView(){
  const t = curTrack(); if(!t) return;
  const avg = t.dur > 0 ? t.dist / (t.dur / 1000) : 0, tiny = trkLen(t) < 100;
  $('#trackView').innerHTML = `
    <div class="top"><button class="txtbtn" data-tv="back">${svg(UI.back,14)} ${t._ws ? 'Crew' : 'Fahrten'}</button><span class="row" style="gap:8px">${t._ws ? '' : `<button class="icon-btn press fav-btn${t.fav ? ' on' : ''}" data-tv="fav" aria-pressed="${!!t.fav}" aria-label="${t.fav ? 'Aus Lieblingsstrecken entfernen' : 'Als Lieblingsstrecke markieren'}">${svg(ICONS.star, 16, 2.2)}</button>`}<button class="icon-btn press" data-tv="back" aria-label="Schließen">${svg(UI.close,14)}</button></span></div>
    <div class="pad">
      ${t._ws ? `<div style="display:flex;flex-direction:column;gap:6px"><span class="badge ws-by">${avHTML(t._ws.dev, t._ws.by, 22)}Fahrt von ${t._ws.dev === myId() ? 'dir' : esc(t._ws.by)}</span><h2>${esc(t.name)}</h2><span class="muted">${fmtDate(t.created)}${placeTxt(t) ? ' · ' + esc(placeTxt(t)) : ''}</span></div>` : trackRenaming
        ? `<div class="row"><input class="inp" id="tv-name" value="${esc(t.name)}" maxlength="80"><button class="txtbtn bold" data-tv="renamesave">Fertig</button></div>`
        : `<div style="display:flex;flex-direction:column;gap:4px"><span class="badge" style="--c:#ff9f0a"><span class="ic">${svg(UI.route,13)}</span>Fahrt</span><h2>${esc(t.name)}</h2><span class="muted">${fmtDate(t.created)}</span></div>`}
      ${t._ws ? `<div class="rx-row">${rxHTML('dr:' + t._ws.docId, t._ws.dev, 'full')}</div>` : t.ws && FB && grp() ? `<div class="rx-row">${rxHTML('dr:' + t.ws, myId(), 'full')}</div>` : ''}
      <div class="tstats">
        <div><b>${fmtKm(t.dist)}</b><span>Distanz</span></div>
        <div><b>${fmtDurU(t.dur)}</b><span>Dauer</span></div>
        <div><b>${fmtSpd(avg)}</b><span>Ø Tempo gesamt</span></div>
        <div><b>${fmtSpd(t.maxSpd || 0)}</b><span>Max. Tempo</span></div>
      </div>
      ${tiny ? '<div class="muted" style="font-size:13px">Diese Aufzeichnung ist zu kurz für Auswertungen.</div>' : `<div id="cxTv">${cxTrackHTML(t)}</div>
      ${riskCardHTML(t)}
      <div id="wayTv">${wayTrackHTML(t)}</div>
      ${xplTrackHTML(t)}
      ${cmpHTML(t)}
      ${analyzeTrack(t) ? `<button class="btn primary" data-tv="replay">${svg(UI.play, 15)} Fahrt abspielen</button>` : ''}`}
      ${trkLen(t) > 1500 ? `<button class="btn" data-tv="again">${svg(UI.nav, 15)} Nochmal fahren</button>` : ''}
      ${tvDetailsHTML(t)}
      ${t._ws && t._ws.dev !== myId() ? `<button class="btn rival" data-tv="rival">${svg(ICONS.flag,15)} ${courses.some(c => c.fromDrive === t._ws.docId) ? `Geister-Rennen gegen ${esc(t._ws.by)} öffnen` : `Geister-Rennen gegen ${esc(t._ws.by)}`}</button>` : ''}
      ${tiny || (t._ws && t._ws.dev !== myId()) ? '' : `<button class="btn" data-tv="course">${svg(ICONS.flag,15)} Als Rennstrecke speichern</button>`}
      ${tiny || (t._ws && t._ws.dev !== myId()) ? '' : `<button class="btn" data-tv="img">${svg(UI.share,15)} Als Bild teilen</button>`}
      <button class="btn" data-tv="gpx">${svg(UI.share,15)} Als GPX exportieren</button>
      ${FB && !t._ws ? `<button class="btn${t.ws ? ' on-ws' : ''}" data-tv="ws">${t.ws ? 'In der Crew geteilt · entfernen' : 'Fahrt in die Crew teilen'}</button>` : ''}
      ${t._ws ? '' : `<div class="btns"><button class="btn" data-tv="rename">Umbenennen</button><button class="btn danger" data-tv="del">Löschen</button></div>`}
    </div>`;
  if(trackRenaming) setTimeout(() => { const i = $('#tv-name'); if(i){ i.focus(); i.select(); } }, 50);
  if(tvSel >= 0) tvApplySel(false);
  if(!t._ws && (!t.cx || cxNeedsWx(t))) setTimeout(() => cxRun([t]), 300);
  if(waysCalc().byTrack[t.id]) setTimeout(wayGeoFetch, 400);
}
$('#trackView').addEventListener('click', e => {
  const b = e.target.closest('[data-tv]'); if(!b) return;
  const t = curTrack(); if(!t) return;
  const a = b.dataset.tv;
  if(a === 'back') closeTrack();
  if(a === 'rename'){ trackRenaming = true; renderTrackView(); }
  if(a === 'renamesave'){ t.name = $('#tv-name').value.trim() || t.name; saveTracks(); trackRenaming = false; renderTrackView(); }
  if(a === 'course') return courseFromTrack(t);
  if(a === 'rival') return rivalFromDrive(t);
  if(a === 'replay') return startReplay(t);
  if(a === 'again') return favGo(t);
  if(a === 'fav'){ t.fav = !t.fav; saveTracks(); haptic(); renderTrackView(); toast(t.fav ? 'Zu den Lieblingsstrecken hinzugefügt' : 'Aus den Lieblingsstrecken entfernt'); return; }
  if(a === 'img'){ if(!t.place) fetchPlace(t).catch(() => {}).finally(() => openShareImg(t)); else openShareImg(t); return; }
  if(a === 'ws'){
    if(!t.ws) return wsUploadDrive(t);
    if(!b.classList.contains('armed')){ b.classList.add('armed'); b.textContent = 'Wirklich aus der Crew nehmen?'; setTimeout(() => { if(b.isConnected){ b.classList.remove('armed'); b.textContent = 'In der Crew geteilt · entfernen'; } }, 3500); return; }
    return wsRemoveDrive(t);
  }
  if(a === 'gpx') downloadText(`${t.name.replace(/[^\wäöüÄÖÜß -]+/g, '').trim() || 'strecke'}.gpx`, toGPX(t), 'application/gpx+xml');
  if(a === 'del'){
    if(!trackDelArmed){ trackDelArmed = true; b.classList.add('armed'); b.textContent = 'Wirklich löschen?'; setTimeout(() => { if(b.isConnected){ trackDelArmed = false; b.classList.remove('armed'); b.textContent = 'Löschen'; } }, 3500); return; }
    tracks = tracks.filter(x => x.id !== t.id); saveTracks(); selTrack = null;
    show('list', 'half'); renderList(); toast(`„${t.name}“ gelöscht`);
  }
});
$('#trackView').addEventListener('keydown', e => {
  if(e.target.id !== 'tv-name') return;
  if(e.key === 'Enter'){ e.preventDefault(); $('#trackView [data-tv="renamesave"]').click(); }
  if(e.key === 'Escape'){ e.preventDefault(); e.stopPropagation(); trackRenaming = false; renderTrackView(); }
});
function toGPX(t){
  const x = s => String(s).replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Spots" xmlns="http://www.topografix.com/GPX/1/1">\n<trk><name>${x(t.name)}</name>\n` +
    t.segs.map(sg => '<trkseg>\n' + sg.map(q => `<trkpt lat="${q[1]}" lon="${q[0]}"><time>${new Date(t.created + q[2] * 1000).toISOString()}</time></trkpt>`).join('\n') + '\n</trkseg>').join('\n') +
    `\n</trk>\n</gpx>\n`;
}
/* ================= Strecken-Analyse: Tempo-Verlauf & Sektoren ================= */
const TRAMP = ['#22c55e', '#a3e635', '#facc15', '#f97316', '#ef4444'];   // Linienfarbe = Tempo: grün = langsam, rot = schnell
const rampExpr = () => ['interpolate', ['linear'], ['coalesce', ['get', 'k'], .5], 0, TRAMP[0], .25, TRAMP[1], .5, TRAMP[2], .75, TRAMP[3], 1, TRAMP[4]];
const tCol = k => { const i = Math.max(0, Math.min(.9999, k)) * (TRAMP.length - 1), a = Math.floor(i), f = i - a, h = x => [1, 3, 5].map(j => parseInt(x.slice(j, j + 2), 16)); const p = h(TRAMP[a]), q = h(TRAMP[a + 1]); return '#' + p.map((v, j) => Math.round(v + (q[j] - v) * f).toString(16).padStart(2, '0')).join(''); };
const anCache = new WeakMap();
let tvSel = -1, tvDown = false;
function analyzeTrack(t){
  if(anCache.has(t)) return anCache.get(t);
  const P = []; let D = 0, TA = 0;
  t.segs.forEach((sg, si) => sg.forEach((q, i) => {
    if(i){ const p = sg[i - 1]; D += dist({lat:p[1], lng:p[0]}, {lat:q[1], lng:q[0]}); TA += Math.max(0, q[2] - p[2]); }
    P.push({lng:q[0], lat:q[1], d:D, ta:TA, si, sl:q.length > 4 ? q[3] : null, sn:q.length > 4 ? q[4] : null});
  }));
  if(P.length < 3 || D < 30){ anCache.set(t, null); return null; }
  // Tempo je Punkt, über ±2 Nachbarpunkte geglättet (km/h)
  P.forEach((p, k) => {
    let j0 = k, j1 = k;
    for(let n = 0; n < 2; n++){ if(j0 > 0 && P[j0 - 1].si === p.si) j0--; if(j1 < P.length - 1 && P[j1 + 1].si === p.si) j1++; }
    const dt = P[j1].ta - P[j0].ta;
    p.v = dt > .4 ? Math.min(400, (P[j1].d - P[j0].d) / dt * 3.6) : null;
  });
  for(let k = 1; k < P.length; k++) if(P[k].v == null) P[k].v = P[k - 1].v;
  for(let k = P.length - 2; k >= 0; k--) if(P[k].v == null) P[k].v = P[k + 1].v;
  P.forEach(p => { if(p.v == null) p.v = 0; });
  // G-Kräfte je Punkt: Sensorwerte, wenn aufgezeichnet, sonst aus GPS (Tempoänderung + Kurvenradius)
  P.forEach((p, k) => {
    let j0 = k, j1 = k;
    for(let n = 0; n < 2; n++){ if(j0 > 0 && P[j0 - 1].si === p.si) j0--; if(j1 < P.length - 1 && P[j1 + 1].si === p.si) j1++; }
    const A = P[j0], B = P[j1], dt = B.ta - A.ta, vm = p.v / 3.6;
    let lon = dt > .5 ? (B.v - A.v) / 3.6 / dt / 9.81 : 0, lat = 0;
    if(j0 < k && j1 > k && vm > 3){
      const ds = (B.d - A.d) / 2;
      if(ds > 6){ const dh = ((bearing(p, B) - bearing(A, p) + 540) % 360) - 180; lat = vm * vm * (dh * Math.PI / 180) / ds / 9.81; }
    }
    p.glat = p.sl != null ? p.sl : Math.max(-1.5, Math.min(1.5, lat));
    p.glon = p.sn != null ? p.sn : Math.max(-1.5, Math.min(1.5, lon));
  });
  const gSrc = P.some(p => p.sl != null) ? 'sensor' : 'gps';
  let iLat = 0, iBr = 0, iAc = 0;
  P.forEach((p, k) => { if(Math.abs(p.glat) > Math.abs(P[iLat].glat)) iLat = k; if(p.glon < P[iBr].glon) iBr = k; if(p.glon > P[iAc].glon) iAc = k; });
  const at = k => [P[k].lng, P[k].lat];
  const gx = {src:gSrc, lat:{v:P[iLat].glat, at:at(iLat), kmh:P[iLat].v}, brake:{v:Math.max(0, -P[iBr].glon), at:at(iBr), kmh:P[iBr].v}, acc:{v:Math.max(0, P[iAc].glon), at:at(iAc), kmh:P[iAc].v}};
  if(t.g){   // Spitzenwerte vom Sensor während der Fahrt (genauer)
    gx.src = 'sensor';
    const vNear = ll => { if(!ll) return null; let b = null, bd = Infinity; for(const p of P){ const dd = Math.abs(p.lat - ll[1]) + Math.abs(p.lng - ll[0]); if(dd < bd){ bd = dd; b = p; } } return b ? b.v : null; };
    if(t.g.lat) gx.lat = {v:t.g.lat, at:t.g.latAt || gx.lat.at, kmh:vNear(t.g.latAt) ?? gx.lat.kmh};
    if(t.g.brake) gx.brake = {v:t.g.brake, at:t.g.brakeAt || gx.brake.at, kmh:vNear(t.g.brakeAt) ?? gx.brake.kmh};
    if(t.g.acc) gx.acc = {v:t.g.acc, at:t.g.accAt || gx.acc.at, kmh:vNear(t.g.accAt) ?? gx.acc.kmh};
  }
  const vs = P.map(p => p.v).sort((a, b) => a - b), pc = q => vs[Math.min(vs.length - 1, Math.floor(q * vs.length))];
  const lo = pc(.05), hi = Math.max(pc(.95), lo + 5);
  // Sektoren: runde Länge, ca. 4–10 Stück
  const L = [100,200,250,500,1000,2000,2500,5000,10000,20000,25000,50000,100000].find(l => D / l <= 10) || 100000;
  const n = Math.max(1, Math.round(D / L)), secOf = d => Math.min(n - 1, Math.floor(d / L));
  const idx = d => { let a = 0, b = P.length - 1; while(b - a > 1){ const m = (a + b) >> 1; if(P[m].d < d) a = m; else b = m; } return [P[a], P[b]]; };
  const lerp = (d, k) => { const [a, b] = idx(d), f = b.d > a.d ? Math.max(0, Math.min(1, (d - a.d) / (b.d - a.d))) : 0; return a[k] + f * (b[k] - a[k]); };
  const secs = [];
  for(let i = 0; i < n; i++){
    const a = i * L, b = i === n - 1 ? D : (i + 1) * L, tm = Math.max(.1, lerp(b, 'ta') - lerp(a, 'ta'));
    let mx = 0; for(const p of P) if(p.d >= a && p.d <= b && p.v > mx) mx = p.v;
    secs.push({a, b, t:tm, avg:(b - a) / tm * 3.6, max:mx});
  }
  const fast = secs.length > 1 ? secs.reduce((m, s, i) => s.avg > secs[m].avg ? i : m, 0) : -1;
  const feats = [];
  for(let k = 1; k < P.length; k++){
    const a = P[k - 1], b = P[k]; if(a.si !== b.si) continue;
    const v = (a.v + b.v) / 2;
    feats.push({type:'Feature', properties:{k:+Math.max(0, Math.min(1, (v - lo) / (hi - lo))).toFixed(3), s:secOf((a.d + b.d) / 2)}, geometry:{type:'LineString', coordinates:[[a.lng, a.lat], [b.lng, b.lat]]}});
  }
  const bounds = secs.slice(1).map(s => ({type:'Feature', properties:{}, geometry:{type:'Point', coordinates:[lerp(s.a, 'lng'), lerp(s.a, 'lat')]}}));
  const prof = Array.from({length:240}, (_, i) => { const d = D * i / 239; return [d, lerp(d, 'v')]; });
  const an = {P, D, L, n, secs, fast, lo, hi, feats, bounds, prof, secOf, lerp, g:gx};
  anCache.set(t, an); return an;
}
const fmtG = x => `${(+x || 0).toFixed(2).replace('.', ',')} G`;
const fmtGn = x => (+x || 0).toFixed(2).replace('.', ',');
const fmtLen = m => m < 1000 ? `${m} m` : `${String(m / 1000).replace('.', ',')} km`;
const fmtKm1 = m => (m / 1000).toFixed(m < 10000 ? 1 : 0).replace('.', ',');
function tvGeom(an){
  const W = 340, H = 150, l = 30, r = 10, tp = 18, bt = 20, iw = W - l - r, ih = H - tp - bt;
  const vmax = Math.max(10, ...an.prof.map(p => p[1]));
  const step = [5,10,20,25,50,100].find(s => vmax / s <= 4) || 100, ymax = Math.ceil(vmax / step) * step;
  return {W, H, l, r, tp, bt, iw, ih, step, ymax, X:d => l + d / an.D * iw, Y:v => tp + ih - v / ymax * ih};
}
function tvDetailsHTML(t){
  const an = analyzeTrack(t); if(!an) return '';
  const g = tvGeom(an), {X, Y} = g, f1 = x => x.toFixed(1);
  let grid = '';
  for(let v = 0; v <= g.ymax; v += g.step) grid += `<line class="grid" x1="${g.l}" x2="${g.W - g.r}" y1="${f1(Y(v))}" y2="${f1(Y(v))}"/><text class="ax" x="${g.l - 6}" y="${f1(Y(v) + 3)}" text-anchor="end">${v}</text>`;
  let sb = '';
  an.secs.forEach((s, i) => {
    if(i) sb += `<line class="sb" x1="${f1(X(s.a))}" x2="${f1(X(s.a))}" y1="${g.tp - 4}" y2="${g.tp + g.ih}"/>`;
    if(X(s.b) - X(s.a) >= 12) sb += `<text class="sl" x="${f1((X(s.a) + X(s.b)) / 2)}" y="${g.tp - 7}">${i + 1}</text>`;
  });
  const line = an.prof.map((p, i) => `${i ? 'L' : 'M'}${f1(X(p[0]))} ${f1(Y(p[1]))}`).join('');
  const area = `${line}L${f1(X(an.D))} ${g.tp + g.ih}L${g.l} ${g.tp + g.ih}Z`;
  const mi = an.prof.reduce((m, p, i) => p[1] > an.prof[m][1] ? i : m, 0), mp = an.prof[mi];
  const mx = X(mp[0]), my = Y(mp[1]), anchor = mx > g.W - 50 ? 'end' : mx < g.l + 30 ? 'start' : 'middle';
  const xl = `<text class="ax" x="${g.l}" y="${g.H - 5}">0</text><text class="ax" x="${f1(X(an.D / 2))}" y="${g.H - 5}" text-anchor="middle">${fmtKm1(an.D / 2)}</text><text class="ax" x="${g.W - g.r}" y="${g.H - 5}" text-anchor="end">${fmtKm1(an.D)} km</text>`;
  const svgC = `<svg viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Tempo über die Strecke, höchstens ${Math.round(mp[1])} km/h">
    <defs><linearGradient id="tvGrad" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="${f1(Y(an.lo))}" y2="${f1(Y(an.hi))}">${TRAMP.map((c, i) => `<stop offset="${i / (TRAMP.length - 1)}" stop-color="${c}"/>`).join('')}</linearGradient></defs>
    <rect id="tvBand" class="band" x="0" y="${g.tp}" width="0" height="${g.ih}"/>${grid}${sb}
    <path class="ar" d="${area}"/><path class="ln" d="${line}"/>
    <circle class="mxd" cx="${f1(mx)}" cy="${f1(my)}" r="4"/><text class="mxt" x="${f1(mx)}" y="${f1(Math.max(g.tp + 2, my - 8))}" text-anchor="${anchor}">${Math.round(mp[1])} km/h</text>
    ${xl}<line id="tvX" class="cx" x1="0" x2="0" y1="${g.tp}" y2="${g.tp + g.ih}" visibility="hidden"/><circle id="tvDot" class="cd" r="4.5" cx="0" cy="0" visibility="hidden"/></svg>`;
  const maxAvg = Math.max(...an.secs.map(s => s.avg));
  const rows = an.secs.map((s, i) => `<button class="tv-row${tvSel === i ? ' on' : ''}" data-sec="${i}" aria-label="Sektor ${i + 1}">
      <span class="n">${i + 1}</span>
      <span class="av"><b>${Math.round(s.avg)} <small>km/h</small>${i === an.fast ? '<span class="tv-fast">Schnellster</span>' : ''}</b><i style="width:${Math.max(3, s.avg / maxAvg * 100).toFixed(1)}%;background:${tCol((s.avg - an.lo) / (an.hi - an.lo))}"></i></span>
      <span class="tm">${fmtDur(s.t * 1000)}</span><span class="mx">${Math.round(s.max)}</span></button>`).join('');
  return `<div class="st-h">Tempo-Verlauf <em id="tvRead">Tippe auf die Kurve</em></div>
    <div class="tv-chart no-drag" id="tvChart">${svgC}</div>
    <div class="tv-leg"><span>Farbe:</span><span>${Math.round(an.lo)}</span><i style="background:linear-gradient(90deg,${TRAMP.join(',')})"></i><span>${Math.round(an.hi)} km/h</span></div>
    <div class="st-h">G-Kräfte <em>${an.g.src === 'sensor' ? 'Bewegungssensor' : 'aus GPS, ungefähr'}</em></div>
    <div class="tv-g">
      <button data-gat="lat" style="--c:#bf5af2"><b><i></i>${fmtG(Math.abs(an.g.lat.v))}</b><span>Querkraft${Math.abs(an.g.lat.v) < .05 ? '' : ` · ${an.g.lat.v >= 0 ? 'Rechtskurve' : 'Linkskurve'}`}</span></button>
      <button data-gat="brake" style="--c:#ff453a"><b><i></i>${fmtG(an.g.brake.v)}</b><span>Stärkste Bremsung</span></button>
      <button data-gat="acc" style="--c:#0a84ff"><b><i></i>${fmtG(an.g.acc.v)}</b><span>Stärkste Beschleunigung</span></button>
    </div>
    <div class="st-h">Sektoren <em>je ${fmtLen(an.L)}</em></div>
    <div class="tv-tab"><div class="tv-head"><span>#</span><span>Ø Tempo</span><span>Zeit</span><span>Max</span></div>${rows}</div>`;
}
let gMks = [];
function tvGMarkers(t){
  gMks.forEach(m => m.remove()); gMks = [];
  const an = t && analyzeTrack(t); if(!an) return;
  [['lat', 'Q', '#bf5af2', 'quer'], ['brake', 'B', '#ff453a', 'Bremsen'], ['acc', 'A', '#0a84ff', 'Beschl.']].forEach(([k, l, c, txt]) => {
    const v = Math.abs(an.g[k].v); if(v < .05) return;
    const e = document.createElement('div'); e.className = 'gmk'; e.style.setProperty('--c', c);
    e.innerHTML = `<i>${l}</i>${fmtG(v)} ${txt}`;
    e.addEventListener('click', ev => { ev.stopPropagation(); map.flyTo({center:an.g[k].at, zoom:Math.max(map.getZoom(), 16.5), padding:camPad(), duration:800}); });
    gMks.push(new maplibregl.Marker({element:e, anchor:'bottom', offset:[0, -8]}).setLngLat(an.g[k].at).addTo(map));
  });
}
function tvPaint(){
  if(!mapReady) return;
  const on = view === 'track' && tvSel >= 0, m = ['==', ['get', 's'], tvSel];
  try{
    map.setPaintProperty('track-view-line', 'line-color', on ? ['case', m, rampExpr(), '#5b616c'] : rampExpr());
  }catch(e){}
}
function tvApplySel(fit = true){
  const t = curTrack(), an = t && analyzeTrack(t); if(!an) return;
  document.querySelectorAll('#trackView [data-sec]').forEach(el => el.classList.toggle('on', +el.dataset.sec === tvSel));
  const band = $('#tvBand'), g = tvGeom(an);
  if(band){ if(tvSel < 0) band.setAttribute('width', 0); else { const s = an.secs[tvSel]; band.setAttribute('x', g.X(s.a).toFixed(1)); band.setAttribute('width', (g.X(s.b) - g.X(s.a)).toFixed(1)); } }
  tvPaint();
  if(!fit || !mapReady) return;
  if(tvSel < 0){ fitTrack(t.segs); return; }
  const s = an.secs[tvSel], pts = an.P.filter(p => p.d >= s.a && p.d <= s.b); if(!pts.length) return;
  const b = pts.reduce((b, p) => b.extend([p.lng, p.lat]), new maplibregl.LngLatBounds([pts[0].lng, pts[0].lat], [pts[0].lng, pts[0].lat]));
  map.fitBounds(b, {padding:camPad(), maxZoom:17, duration:900});
}
function tvScrub(e){
  const t = curTrack(), an = t && analyzeTrack(t), el = $('#tvChart svg'); if(!an || !el) return;
  const g = tvGeom(an), r = el.getBoundingClientRect(); if(!r.width) return;
  const fx = (e.clientX - r.left) / r.width * g.W, d = Math.max(0, Math.min(an.D, (fx - g.l) / g.iw * an.D));
  const v = an.lerp(d, 'v'), x = g.X(d).toFixed(1), y = g.Y(v).toFixed(1), s = an.secOf(d);
  const cx = $('#tvX'), cd = $('#tvDot');
  cx.setAttribute('x1', x); cx.setAttribute('x2', x); cx.setAttribute('visibility', 'visible');
  cd.setAttribute('cx', x); cd.setAttribute('cy', y); cd.setAttribute('visibility', 'visible');
  $('#tvRead').textContent = `${fmtKm1(d)} km · ${Math.round(v)} km/h · Sektor ${s + 1}`;
  setSrc('track-cur', FC([{type:'Feature', properties:{}, geometry:{type:'Point', coordinates:[an.lerp(d, 'lng'), an.lerp(d, 'lat')]}}]));
}
function tvScrubEnd(){
  const cx = $('#tvX'), cd = $('#tvDot');
  if(cx) cx.setAttribute('visibility', 'hidden'); if(cd) cd.setAttribute('visibility', 'hidden');
  const rd = $('#tvRead'); if(rd) rd.textContent = 'Tippe auf die Kurve';
  setSrc('track-cur', FC([]));
}
$('#trackView').addEventListener('pointerdown', e => {
  if(e.target.closest('#cmpChart')){ cmpDown = true; try{ e.target.closest('#cmpChart').setPointerCapture(e.pointerId); }catch(_){} cmpScrub(e); return; }
  if(!e.target.closest('#tvChart')) return;
  tvDown = true; try{ e.target.closest('#tvChart').setPointerCapture(e.pointerId); }catch(_){}
  tvScrub(e);
});
$('#trackView').addEventListener('pointermove', e => { if(cmpDown || (e.pointerType === 'mouse' && e.target.closest('#cmpChart'))) return cmpScrub(e); if(tvDown || (e.pointerType === 'mouse' && e.target.closest('#tvChart'))) tvScrub(e); });
$('#trackView').addEventListener('pointerup', () => { tvDown = false; cmpDown = false; });
$('#trackView').addEventListener('pointercancel', () => { tvDown = false; cmpDown = false; });
$('#trackView').addEventListener('pointerout', e => { if(e.pointerType === 'mouse' && !tvDown && e.target.closest('#tvChart') && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('#tvChart'))) tvScrubEnd(); });
$('#trackView').addEventListener('click', e => {
  const cc = e.target.closest('[data-cmp]');
  if(cc){ const t = curTrack(); tvCmp = tvCmp === cc.dataset.cmp ? null : cc.dataset.cmp; renderTrackView(); updateTrackLayers();
    const b = cmpPartner(t); if(t && b) fitTrack([...t.segs, ...b.segs]); return; }
  const gb = e.target.closest('[data-gat]');
  if(gb){ const t = curTrack(), an = t && analyzeTrack(t); if(an) map.flyTo({center:an.g[gb.dataset.gat].at, zoom:Math.max(map.getZoom(), 16.5), padding:camPad(), duration:900}); return; }
  const r = e.target.closest('[data-sec]'); if(!r) return;
  const i = +r.dataset.sec; tvSel = tvSel === i ? -1 : i; tvApplySel();
});

/* ================= Eigene Fahrten vergleichen =================
   Ähnliche Fahrten: mindestens die Hälfte beider Strecken deckt sich, gleiche Richtung.
   Verglichen wird der gemeinsame Abschnitt, gemessen entlang dieser Fahrt. */
let tvCmp = null, cmpDown = false;
const sigCache = new WeakMap(), simCache = new Map(), cmpCache = new Map();
const GCELL = .001;
function trackSig(t){
  if(sigCache.has(t)) return sigCache.get(t);
  const out = []; let last = null;
  t.segs.forEach(sg => sg.forEach(q => { const p = {lat:q[1], lng:q[0]}; if(!last || dist(last, p) >= 40){ out.push(p); last = p; } }));
  sigCache.set(t, out); return out;
}
function gridOf(pts){ const g = new Map(); pts.forEach((p, i) => { const k = Math.floor(p.lat / GCELL) + ':' + Math.floor(p.lng / GCELL); let l = g.get(k); if(!l) g.set(k, l = []); l.push(i); }); return g; }
function gridNear(g, pts, p, r){
  const a = Math.floor(p.lat / GCELL), b = Math.floor(p.lng / GCELL), out = [];
  for(let i = -1; i <= 1; i++) for(let j = -1; j <= 1; j++){ const l = g.get((a + i) + ':' + (b + j)); if(l) for(const k of l) if(dist(pts[k], p) <= r) out.push(k); }
  return out;
}
function simOf(a, b){
  const key = a.id + '|' + b.id; if(simCache.has(key)) return simCache.get(key);
  const A = trackSig(a), B = trackSig(b); let res = null;
  if(A.length >= 6 && B.length >= 6){
    const gA = gridOf(A), gB = gridOf(B);
    let hitB = 0, prev = -1, fw = 0, bw = 0;
    B.forEach(p => { const n = gridNear(gA, A, p, 60); if(!n.length) return; hitB++;
      const k = prev < 0 ? Math.min(...n) : n.reduce((m, x) => Math.abs(x - prev) < Math.abs(m - prev) ? x : m, n[0]);
      if(prev >= 0){ if(k > prev) fw++; else if(k < prev) bw++; } prev = k; });
    let hitA = 0; A.forEach(p => { if(gridNear(gB, B, p, 60).length) hitA++; });
    const oA = hitA / A.length, oB = hitB / B.length;
    if(oA >= .5 && oB >= .5 && fw > bw * 2) res = {oA, oB};
  }
  simCache.set(key, res); return res;
}
function similarTracks(t){
  if(!t || t._ws || !analyzeTrack(t)) return [];
  return tracks.filter(x => x.id !== t.id && x.segs && x.segs.length && analyzeTrack(x) && simOf(t, x))
    .sort((p, q) => Math.abs((p.created || 0) - (t.created || 0)) - Math.abs((q.created || 0) - (t.created || 0))).slice(0, 8)
    .sort((p, q) => (q.created || 0) - (p.created || 0));
}
function cmpPartner(t){ if(!t || !tvCmp || t._ws) return null; const b = tracks.find(x => x.id === tvCmp); return b && b.id !== t.id ? b : null; }
function cmpCalc(a, b){
  const key = a.id + '>' + b.id; if(cmpCache.has(key)) return cmpCache.get(key);
  const anA = analyzeTrack(a), anB = analyzeTrack(b); let res = null;
  if(anA && anB){
    const PA = anA.P, gA = gridOf(PA), m = []; let last = -1, lastD = -1;
    anB.P.forEach(p => {
      const n = gridNear(gA, PA, p, 45); if(!n.length) return;
      let best = -1, bc = Infinity;
      for(const k of n){ const back = last >= 0 ? Math.max(0, PA[last].d - PA[k].d) : 0, jump = last >= 0 ? Math.abs(PA[k].d - PA[last].d) : 0; const c = dist(PA[k], p) + back * 3 + jump * .05; if(c < bc){ bc = c; best = k; } }
      let d = PA[best].d; const nx = PA[best + 1];
      if(nx && nx.si === PA[best].si && nx.d > d){   // auf das Teilstück projizieren
        const kx = Math.cos(p.lat * Math.PI / 180), ax = (nx.lng - PA[best].lng) * kx, ay = nx.lat - PA[best].lat, bx = (p.lng - PA[best].lng) * kx, by = p.lat - PA[best].lat;
        const f = Math.max(0, Math.min(1, (ax * bx + ay * by) / (ax * ax + ay * ay || 1))); d += f * (nx.d - d);
      }
      if(d <= lastD) return;
      m.push({d, t:p.ta, v:p.v}); lastD = d; last = best;
    });
    if(m.length >= 8 && m[m.length - 1].d - m[0].d >= 500){
      const d0 = m[0].d, d1 = m[m.length - 1].d, L = d1 - d0;
      const at = (d, k) => { let lo = 0, hi = m.length - 1; while(hi - lo > 1){ const md = (lo + hi) >> 1; if(m[md].d < d) lo = md; else hi = md; } const A = m[lo], B = m[hi], f = B.d > A.d ? Math.max(0, Math.min(1, (d - A.d) / (B.d - A.d))) : 0; return A[k] + f * (B[k] - A[k]); };
      const tA0 = anA.lerp(d0, 'ta'), tB0 = m[0].t, N = 220, rows = [];
      for(let i = 0; i < N; i++){ const d = d0 + L * i / (N - 1), ta = anA.lerp(d, 'ta') - tA0, tb = at(d, 't') - tB0; rows.push({d, x:d - d0, ta, tb, gap:tb - ta, va:anA.lerp(d, 'v'), vb:at(d, 'v')}); }
      const tA = rows[N - 1].ta, tB = rows[N - 1].tb;
      res = {d0, d1, L, rows, tA, tB, avgA:L / Math.max(1, tA) * 3.6, avgB:L / Math.max(1, tB) * 3.6, maxA:Math.max(...rows.map(r => r.va)), maxB:Math.max(...rows.map(r => r.vb)), share:L / anA.D};
    }
  }
  cmpCache.set(key, res); return res;
}
const fmtGap = s => { const a = Math.abs(s); return a < 60 ? `${a.toFixed(a < 10 ? 1 : 0).replace('.', ',')} s` : fmtDurU(a * 1000); };
const dayLbl = ts => new Date(ts).toLocaleDateString('de-DE', {weekday:'short', day:'numeric', month:'numeric'});
function cmpGeom(c){
  const W = 340, l = 30, r = 10, tp = 16, h1 = 112, gapY = 26, h2 = 74, bt = 18, H = tp + h1 + gapY + h2 + bt, iw = W - l - r;
  const vmax = Math.max(10, c.maxA, c.maxB), step = [5,10,20,25,50,100].find(s => vmax / s <= 4) || 100, ymax = Math.ceil(vmax / step) * step;
  const gmax = Math.max(2, ...c.rows.map(x => Math.abs(x.gap))) * 1.1, y2 = tp + h1 + gapY;
  return {W, H, l, r, tp, h1, h2, y2, iw, step, ymax, gmax, X:x => l + x / c.L * iw, Y:v => tp + h1 - v / ymax * h1, G:g => y2 + h2 / 2 - g / gmax * (h2 / 2)};
}
function cmpHTML(t){
  const list = similarTracks(t); if(!list.length) return '';
  if(tvCmp && !list.some(x => x.id === tvCmp)) tvCmp = null;
  let html = `<div class="st-h">Vergleichen <em>${tvCmp ? 'mit früherer Fahrt' : `${list.length} ähnliche Fahrt${list.length > 1 ? 'en' : ''}`}</em></div>
    <div class="chips cmp-chips">${list.map(x => `<button class="chip${x.id === tvCmp ? ' on' : ''}" data-cmp="${esc(x.id)}">${dayLbl(x.created)}${Math.abs((x.created || 0) - (t.created || 0)) > 6 * 864e5 && Math.abs((x.created || 0) - (t.created || 0)) < 8 * 864e5 ? ' · letzte Woche' : ''}</button>`).join('')}</div>`;
  const b = cmpPartner(t); if(!b) return html;
  const c = cmpCalc(t, b);
  if(!c) return html + `<div class="muted">Die gemeinsame Strecke ist zu kurz für einen Vergleich.</div>`;
  const diff = c.tB - c.tA, rA = trackRisk(t), rB = trackRisk(b), f1 = x => x.toFixed(1), g = cmpGeom(c), {X, Y, G} = g;
  const win = (a, bb, hi = true) => a === bb ? ['', ''] : (a > bb) === hi ? [' win', ''] : ['', ' win'];
  const row = (k, a, bb, wa, wb) => `<span class="k">${k}</span><span class="a${wa || ''}">${a}</span><span class="b${wb || ''}">${bb}</span>`;
  const [wt1, wt2] = win(c.tA, c.tB, false), [wv1, wv2] = win(Math.round(c.avgA), Math.round(c.avgB)), [wm1, wm2] = win(Math.round(c.maxA), Math.round(c.maxB));
  let grid = '';
  for(let v = 0; v <= g.ymax; v += g.step) grid += `<line class="grid" x1="${g.l}" x2="${g.W - g.r}" y1="${f1(Y(v))}" y2="${f1(Y(v))}"/><text class="ax" x="${g.l - 6}" y="${f1(Y(v) + 3)}" text-anchor="end">${v}</text>`;
  const path = k => c.rows.map((r, i) => `${i ? 'L' : 'M'}${f1(X(r.x))} ${f1(Y(r[k]))}`).join('');
  const zero = G(0), up = `M${g.l} ${f1(zero)}` + c.rows.map(r => `L${f1(X(r.x))} ${f1(G(Math.max(0, r.gap)))}`).join('') + `L${f1(X(c.L))} ${f1(zero)}Z`;
  const dn = `M${g.l} ${f1(zero)}` + c.rows.map(r => `L${f1(X(r.x))} ${f1(G(Math.min(0, r.gap)))}`).join('') + `L${f1(X(c.L))} ${f1(zero)}Z`;
  const gl = Math.round(g.gmax / 1.1);
  const svgC = `<svg viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="Tempo und Abstand beider Fahrten">
    <text class="cmp-pl" x="${g.l}" y="${g.tp - 6}">Tempo km/h</text>${grid}
    <path class="cmp-lb" d="${path('vb')}"/><path class="cmp-la" d="${path('va')}"/>
    <text class="cmp-pl" x="${g.l}" y="${g.y2 - 8}">Vorsprung</text>
    <path class="cmp-up" d="${up}"/><path class="cmp-dn" d="${dn}"/>
    <line class="cmp-z" x1="${g.l}" x2="${g.W - g.r}" y1="${f1(zero)}" y2="${f1(zero)}"/>
    <text class="ax" x="${g.l - 6}" y="${f1(G(gl) + 3)}" text-anchor="end">+${gl}s</text><text class="ax" x="${g.l - 6}" y="${f1(G(-gl) + 3)}" text-anchor="end">−${gl}s</text>
    <text class="ax" x="${g.l}" y="${g.H - 4}">0</text><text class="ax" x="${f1(X(c.L / 2))}" y="${g.H - 4}" text-anchor="middle">${fmtKm1(c.L / 2)}</text><text class="ax" x="${g.W - g.r}" y="${g.H - 4}" text-anchor="end">${fmtKm1(c.L)} km</text>
    <line id="cmpX" class="cx" x1="0" x2="0" y1="${g.tp}" y2="${g.y2 + g.h2}" visibility="hidden"/></svg>`;
  return html + `<div class="cmp">
    <div class="cmp-head"><span class="cmp-a"><i></i>Diese Fahrt<small>${dayLbl(t.created)} · ${new Date(t.created).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'})}</small></span><span class="cmp-b"><i></i>${esc(b.name)}<small>${dayLbl(b.created)} · ${new Date(b.created).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'})}</small></span></div>
    <div class="cmp-verdict"><b class="${Math.abs(diff) < .5 ? '' : diff > 0 ? 'up' : 'dn'}">${Math.abs(diff) < .5 ? 'Gleich schnell' : `${fmtGap(diff)} ${diff > 0 ? 'schneller' : 'langsamer'}`}</b><span>auf ${fmtKm(c.L)} gemeinsamer Strecke${c.share < .9 ? ` (${Math.round(c.share * 100)} % dieser Fahrt)` : ''}</span></div>
    <div class="cmp-tab"><span class="h"></span><span class="h a">Diese</span><span class="h b">Vergleich</span>
      ${row('Zeit', fmtDur(c.tA * 1000), fmtDur(c.tB * 1000), wt1, wt2)}
      ${row('Ø Tempo', `${Math.round(c.avgA)} km/h`, `${Math.round(c.avgB)} km/h`, wv1, wv2)}
      ${row('Max', `${Math.round(c.maxA)} km/h`, `${Math.round(c.maxB)} km/h`, wm1, wm2)}
      ${rA && rB ? row('Risk', rA.score, rB.score) : ''}</div>
    <div class="st-h">Verlauf <em id="cmpRead">Tippe auf die Kurve</em></div>
    <div class="tv-chart no-drag" id="cmpChart">${svgC}</div>
    <div class="tv-leg"><span style="color:#ff9f0a">━ Diese Fahrt</span><span style="color:#64d2ff">╍ Vergleich</span><span>grün = du warst vorne</span></div>
  </div>`;
}
function cmpScrub(e){
  const t = curTrack(), b = cmpPartner(t), c = t && b && cmpCalc(t, b), el = $('#cmpChart svg'); if(!c || !el) return;
  const g = cmpGeom(c), r = el.getBoundingClientRect(); if(!r.width) return;
  const fx = (e.clientX - r.left) / r.width * g.W, x = Math.max(0, Math.min(c.L, (fx - g.l) / g.iw * c.L));
  const i = Math.round(x / c.L * (c.rows.length - 1)), row = c.rows[i], cx = $('#cmpX');
  cx.setAttribute('x1', g.X(row.x).toFixed(1)); cx.setAttribute('x2', g.X(row.x).toFixed(1)); cx.setAttribute('visibility', 'visible');
  $('#cmpRead').textContent = `${fmtKm1(row.x)} km · ${Math.round(row.va)} / ${Math.round(row.vb)} km/h · ${Math.abs(row.gap) < .5 ? 'gleichauf' : `${row.gap > 0 ? '+' : '−'}${fmtGap(row.gap)}`}`;
  // wo war die frühere Fahrt nach derselben Zeit?
  let j = 0; while(j < c.rows.length - 1 && c.rows[j + 1].tb <= row.ta) j++;
  const an = analyzeTrack(t);
  setSrc('track-cur', FC([{type:'Feature', properties:{k:'b'}, geometry:{type:'Point', coordinates:[an.lerp(c.rows[j].d, 'lng'), an.lerp(c.rows[j].d, 'lat')]}},
    {type:'Feature', properties:{k:'a'}, geometry:{type:'Point', coordinates:[an.lerp(row.d, 'lng'), an.lerp(row.d, 'lat')]}}]));
}

function downloadText(name, text, type){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], {type})); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

/* ================= Cockpit ================= */
let ckOn = false, ck = null, ckWatch = null, ckTick = null, ckFollow = true, ckUserZoom = null;
function setMeHeading(h){
  if(!meMarker) return;
  const el = meMarker.getElement();
  if(h == null){ el.classList.remove('dir'); return; }
  el.classList.add('dir');
  meMarker.setRotationAlignment('map'); meMarker.setPitchAlignment('map'); meMarker.setRotation(h);
}
function bearing(a, b){
  const r = x => x * Math.PI / 180, y = Math.sin(r(b.lng - a.lng)) * Math.cos(r(b.lat));
  const x = Math.cos(r(a.lat)) * Math.sin(r(b.lat)) - Math.sin(r(a.lat)) * Math.cos(r(b.lat)) * Math.cos(r(b.lng - a.lng));
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}
const ckPad = () => ({top:Math.round(innerHeight * .42), bottom:110, left:20, right:20});
function ckZoom(v){ const k = (v || 0) * 3.6, o = prefs.cam === 'near' ? .7 : prefs.cam === 'far' ? -.8 : 0; return (k < 15 ? 17.2 : k < 40 ? 16.6 : k < 70 ? 16 : k < 110 ? 15.3 : 14.6) + o; }
const cam = {raf:0, last:0, fix:null, disp:null, bearing:null, zoom:null, hold:0};
let userGesture = false, ckUserPitch = null;
function offsetPt(p, brg, d){
  const r = brg * Math.PI / 180;
  return {lat:p.lat + d * Math.cos(r) / 110540, lng:p.lng + d * Math.sin(r) / (111320 * Math.cos(p.lat * Math.PI / 180))};
}
// Absolute Geländehöhe (inkl. Überhöhung) – queryTerrainElevation liefert nur die Höhe relativ zur Bildmitte,
// dadurch steckte das 3D-Auto bei 3D-Gelände im Berg
function terrainAlt(p){
  if(!prefs.terrain || !mapReady || !p) return 0;
  try{ const t = map.terrain; if(t && t.getElevationForLngLatZoom) return t.getElevationForLngLatZoom(maplibregl.LngLat.convert([p.lng, p.lat]), map.transform.tileZoom) || 0;
    if(!t) return 0; const r = map.queryTerrainElevation([p.lng, p.lat]); return r == null ? 0 : r + (map.transform.elevation || 0); }catch(e){ return 0; }
}
function camStart(){
  if(cam.raf) return;
  cam.last = 0;
  const loop = now => {
    cam.raf = requestAnimationFrame(loop);
    if(cam.last && now - cam.last < 30) return;           // ≈ 30 FPS
    const dt = cam.last ? Math.min(.1, (now - cam.last) / 1000) : .033;
    cam.last = now;
    camStep(now, dt);
  };
  cam.raf = requestAnimationFrame(loop);
}
function camStop(){ cancelAnimationFrame(cam.raf); cam.raf = 0; }
function camStep(now, dt){
  const f = cam.fix; if(!f) return;
  const age = Math.min(2.5, Math.max(0, (now - f.t) / 1000));
  let pred = {lat:f.lat, lng:f.lng}, brgT = f.h;
  if(f.v > .8 && f.h != null) pred = offsetPt(pred, f.h, f.v * age);   // weiterrollen bis zum nächsten GPS-Punkt
  if(nav && nav.active && !nav.arrived){ const sp = navSnap(pred); if(sp){ pred = sp.pt; if(f.v > 1 && sp.brg != null) brgT = sp.brg; } }
  if(!cam.disp || dist(cam.disp, pred) > 250) cam.disp = pred;
  else { const k = 1 - Math.exp(-dt / .3); cam.disp = {lat:cam.disp.lat + (pred.lat - cam.disp.lat) * k, lng:cam.disp.lng + (pred.lng - cam.disp.lng) * k}; }
  if(brgT != null && f.v > 1.4){
    if(cam.bearing == null) cam.bearing = brgT;
    else { const d = ((brgT - cam.bearing + 540) % 360) - 180; cam.bearing = (cam.bearing + d * (1 - Math.exp(-dt / .5)) + 360) % 360; }
  }
  const zt = ckUserZoom != null ? ckUserZoom : ckZoom(f.v);
  cam.zoom = cam.zoom == null ? zt : cam.zoom + (zt - cam.zoom) * (1 - Math.exp(-dt / 1.5));
  if(meMarker){
    meMarker.setLngLat(LL(cam.disp));
    if(cam.bearing != null && (ckOn || meMarker.getElement().classList.contains('dir'))) meMarker.setRotation(cam.bearing);
  }
  car3d.pos = cam.disp; if(cam.bearing != null) car3d.brg = cam.bearing;
  car3d.alt = terrainAlt(cam.disp);
  if(!(ckFollow && !userGesture && now > cam.hold) && car3d.ready && mapReady) map.triggerRepaint();
  if(ckFollow && !userGesture && now > cam.hold && mapReady)
    map.jumpTo({center:LL(cam.disp), bearing:cam.bearing != null ? cam.bearing : map.getBearing(), zoom:cam.zoom, pitch:ckUserPitch != null ? ckUserPitch : 55});
  updateGhost();
  if(document.body.classList.contains('gon')) gRender(gNow());
}
let liveResume = 0;   // Live war an, als man aus dem Cockpit ein Ziel gesucht hat → beim Zurückkommen wieder an
function enterCockpit(){
  if(ckOn) return;
  if(liveResume > Date.now() && grp()){ liveResume = 0; setTimeout(() => { if(ckOn && !live.on) liveStart(); }, 800); }
  if(!navigator.geolocation){ toast('Standort wird von diesem Browser nicht unterstützt.'); return; }
  if(mode || view === 'edit'){ toast('Erst den Spot fertig bearbeiten.'); return; }
  ckOn = true; document.body.classList.add('cockpit'); xplHeatApply();
  car3d.on = onOff('car3d'); car3d.pos = me ? {...me} : null;
  if(car3d.on) enableCar3d(); else document.body.classList.remove('car3d');
  document.body.classList.toggle('gon', onOff('gforce')); gStart(); gRender(null);
  if(meMarker){ meMarker.setRotationAlignment('map'); meMarker.setPitchAlignment('map'); }
  ck = {start:Date.now(), dist:0, max:0, v:null, h:null, last:null, ts:0};
  ckFollow = true; ckUserZoom = null; ckFollowUI();
  $('#q').blur();
  map.setMaxPitch(70);
  // Beim Fahren flach: mit 3D-Gelände ruckelte die Kamera, Auto und Route lagen teils im Berg. Schattierung bleibt, beim Verlassen kommt 3D zurück.
  if(prefs.terrain && mapReady) try{ map.setTerrain(null); }catch(e){}
  ckWatch = navigator.geolocation.watchPosition(onDrivePos, err => {
    if(err.code === 1){ toast('Standortzugriff verweigert. Das Cockpit braucht deinen Standort.'); exitCockpit(); }
  }, {enableHighAccuracy:true, maximumAge:0, timeout:30000});
  requestWake();
  clearInterval(ckTick); ckTick = setInterval(updateCockpitUI, 1000);
  rwCk.t = 0; rwCk.r = null; rwCk.warned = '';
  renderCkTop(); updateRecUI(); updateCockpitUI(); liveUI();
  evTried.clear(); setTimeout(evLiveCheck, 1500);   // geplante Ausfahrt: Live automatisch an
  ckNightCheck(true);
  const fresh = me && Date.now() - meTime < 120000;   // alter Standort würde irgendwohin zentrieren
  cam.fix = fresh ? {lat:me.lat, lng:me.lng, t:performance.now(), v:0, h:null} : null;
  cam.disp = null; cam.bearing = null; cam.zoom = null; ckUserPitch = null; userGesture = false;
  map.easeTo({center:fresh ? LL(me) : map.getCenter(), zoom:ckZoom(0), pitch:55, padding:ckPad(), duration:1100});
  cam.hold = performance.now() + 1150;
  if(!fresh) toast('Suche GPS …');
  // schnell einen aktuellen Punkt holen; der erste Punkt im Cockpit zentriert immer genau aufs Auto
  navigator.geolocation.getCurrentPosition(p => { if(ckOn && !ck.got) onDrivePos(p); }, () => {}, {enableHighAccuracy:true, maximumAge:15000, timeout:10000});
  camStart();
}
function ckFollowUI(){ const b = $('#ckRecenter'); b.classList.toggle('off', !ckFollow); b.setAttribute('aria-label', ckFollow ? 'Auf das Auto zentrieren' : 'Zentrieren – Karte folgt wieder dem Auto'); }
function ckBestPos(){
  const f = cam.fix; if(f && performance.now() - f.t < 120000) return {lat:f.lat, lng:f.lng};
  return me && Date.now() - meTime < 120000 ? {...me} : null;
}
function ckCenter(dur = 650){
  ckFollow = true; userGesture = false; ckUserZoom = null; ckUserPitch = null; ckFollowUI();
  const c = ckBestPos(); if(!c){ toast('Suche GPS …'); return; }
  cam.disp = c; cam.zoom = ckZoom(ck.v);
  cam.hold = performance.now() + dur + 60;
  map.easeTo({center:LL(c), bearing:cam.bearing != null ? cam.bearing : map.getBearing(), zoom:cam.zoom, pitch:55, padding:ckPad(), duration:dur});
}
function exitCockpit(){
  if(!ckOn) return;
  if(nav && nav.active) endNav(true);
  camStop(); hideGhost(); $('#ckLimit').classList.remove('show'); $('#ckSpeed').classList.remove('over'); $('#ckRoad').hidden = true;
  ckOn = false; document.body.classList.remove('cockpit', 'ckrec', 'gon'); xplHeatApply(); ckNightCheck(true);
  liveStop();
  parkAuto(ck.dist, ck.ts && Date.now() - ck.ts < 120000 ? ck.last : null, ck.v);
  if(!(rec && !rec.stopped)) gStop();
  car3d.on = false; document.body.classList.remove('car3d'); if(mapReady) map.triggerRepaint();
  ckTarget = null; updateCourseLayers();
  if(ckWatch != null){ navigator.geolocation.clearWatch(ckWatch); ckWatch = null; }
  clearInterval(ckTick); releaseWake();
  setMeHeading(null);
  map.easeTo({pitch:prefs.terrain ? map.getPitch() : 0, bearing:0, padding:camPad(), duration:900});
  if(prefs.terrain && mapReady){ try{ map.setTerrain({source:'dem', exaggeration:1.4}); }catch(e){} map.setMaxPitch(80); }
  if(!prefs.terrain) map.once('moveend', () => { if(!ckOn && !prefs.terrain) map.setMaxPitch(0); });
  renderNearest(); updateRecUI();
  if(mobile()) setSnap(snap, false);
}
function onDrivePos(p){
  if(!ckOn) return;
  const c = p.coords, ts = p.timestamp || Date.now(), pt = {lat:c.latitude, lng:c.longitude};
  let v = (c.speed != null && !isNaN(c.speed) && c.speed >= 0) ? c.speed : null;
  let d = 0, dt = 0;
  if(ck.last){ d = dist(ck.last, pt); dt = (ts - ck.last.ts) / 1000; }
  if(v == null && ck.last && dt >= .8) v = d / dt;
  if(v != null) ck.v = ck.v == null ? v : ck.v * .35 + v * .65;
  let h = (c.heading != null && !isNaN(c.heading) && (ck.v || 0) > 1.4) ? c.heading : null;
  if(h == null && ck.last && d > 4 && (ck.v || 0) > 1.4) h = bearing(ck.last, pt);
  if(h != null) ck.h = h;
  gGpsFix(ck.v || 0, (ck.v || 0) > 1.4 ? ck.h : null, ts);
  if(ck.last && c.accuracy <= 35 && d >= 3 && (dt <= 0 || d / dt < 70)) ck.dist += d;
  if(ck.v != null && c.accuracy <= 25 && ck.v > ck.max && ck.v < 70) ck.max = ck.v;
  if(!ck.last || d >= 3 || dt > 5) ck.last = {...pt, ts};
  ck.ts = Date.now();
  onPos(p);
  setMeHeading((ck.v || 0) > 1.4 ? ck.h : null);
  updateCockpitUI();
  cam.fix = {lat:pt.lat, lng:pt.lng, t:performance.now(), v:ck.v || 0, h:ck.h};
  if(!ck.got){ ck.got = true; if(ckFollow) ckCenter(700); }
  if(onOff('limit')) limitFix(pt); else if(limitNow){ showLimit(null); }
  if(nav && nav.active) onNavFix(pt, c.accuracy);
  liveFeed(pt, ck.v, (ck.v || 0) > 1.4 ? ck.h : null, c.accuracy);
  if(prefs.park && ck.dist > 200 && dist(pt, prefs.park) > 300){ delete prefs.park; savePrefs(); renderPark(); }   // weggefahren: alter Parkplatz gilt nicht mehr
}
map.on('dragstart', () => { if(ckOn){ ckFollow = false; ckFollowUI(); } });
map.on('rotatestart', e => { if(ckOn && e.originalEvent){ ckFollow = false; ckFollowUI(); } });
map.on('zoomstart', e => { if(ckOn && e.originalEvent) userGesture = true; });
map.on('zoomend', e => { if(ckOn && userGesture){ userGesture = false; ckUserZoom = map.getZoom(); cam.zoom = ckUserZoom; } });
map.on('pitchstart', e => { if(ckOn && e.originalEvent) userGesture = true; });
map.on('pitchend', e => { if(ckOn && userGesture){ userGesture = false; ckUserPitch = map.getPitch(); } });
$('#ckRecenter').addEventListener('click', () => ckCenter(650));
function renderCkTop(){
  const h = $('#ckTop'), active = rec && !rec.stopped;
  h.classList.toggle('paused', !!(active && !rec.runFrom));
  h.innerHTML = active
    ? `<span class="dot"></span><div class="tx"><b data-rt></b><span data-rd></span></div>
       <button class="rb" data-ck="dest" aria-label="Ziel suchen">${svg(UI.search, 17)}</button>
       <button class="rb" data-rec="toggle"></button>
       <button class="rb stop" data-rec="stop" aria-label="Aufzeichnung beenden">${svg(UI.stop, 16)}</button>
       <button class="rb" data-ck="close" aria-label="Cockpit schließen">${svg(UI.close, 15)}</button>`
    : `<div class="tx"><b>Cockpit</b><span>Ohne Aufnahme</span></div>
       <button class="rb txt" data-pf-open aria-label="Beschleunigung messen">0–100</button>
       <button class="rb" data-ck="dest" aria-label="Ziel suchen">${svg(UI.search, 17)}</button>
       <button class="rb rec" data-rec="start" aria-label="Aufzeichnung starten"><span class="rdot"></span></button>
       <button class="rb" data-ck="close" aria-label="Cockpit schließen">${svg(UI.close, 15)}</button>`;
}
function updateCockpitUI(){
  if(!ckOn) return;
  ckNightCheck();
  renderRaceCard(); rwCkCheck(); rwCkRender();
  const stale = !ck.ts || Date.now() - ck.ts > 6000;
  const kmh = ck.v == null ? null : ck.v * 3.6;
  const vtxt = stale || kmh == null ? '–' : String(kmh < 1 ? 0 : Math.round(kmh));
  $('[data-ck="v"]').textContent = vtxt; $('#ckSpeed').classList.toggle('w3', vtxt.length >= 3);
  const recOn = !!(rec && !rec.stopped);
  $('#ckSpeed').style.setProperty('--p', stale || kmh == null ? 0 : Math.min(1, kmh / (recOn ? 260 : 200)).toFixed(3));
  $('#ckSpeed').classList.toggle('over', !stale && kmh != null && limitNow && limitNow.v != null && kmh > limitNow.v + 3);
  document.body.classList.toggle('ckrec', recOn);
  let dst, time, max;
  if(recOn){ dst = rec.dist; time = recElapsed(); max = rec.maxSpd; }
  else { dst = ck.dist; time = Date.now() - ck.start; max = ck.max; }
  const avg = time > 0 ? dst / (time / 1000) : 0;
  $('[data-ck="dist"]').textContent = fmtKm(dst);
  $('[data-ck="time"]').textContent = fmtDur(time);
  $('[data-ck="avg"]').textContent = String(Math.round(avg * 3.6));
  const mx = Math.round(max * 3.6), mEl = $('[data-ck="max"]');
  if(mEl.textContent !== String(mx)){
    mEl.textContent = String(mx);
    if(recOn && mx >= 30 && ck.mxShown != null && mx > ck.mxShown){ const p = mEl.parentNode; p.classList.remove('hit'); void p.offsetWidth; p.classList.add('hit'); }
    ck.mxShown = mx;
  }
}
document.addEventListener('keydown', e => { if(e.key === 'Escape' && ckOn) exitCockpit(); });

/* ================= Parkplatz merken ================= */
let parkMk = null;
const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
function parkSave(p, quiet){
  prefs.park = {lat:+p.lat.toFixed(6), lng:+p.lng.toFixed(6), at:Date.now()}; savePrefs(); renderPark();
  if(!quiet) toast('Parkplatz gemerkt – tipp auf das Auto-Symbol, um zurückzufinden');
}
function parkAuto(driven, p, v){   // nach einer echten Fahrt, wenn man steht
  if(!onOff('autoPark') || !p || driven < 400 || (v != null && v > 4)) return;
  if(prefs.park && Date.now() - prefs.park.at < 15000) return;
  parkSave(p);
}
function renderPark(){
  const p = prefs.park;
  if(!p){ if(parkMk){ parkMk.remove(); parkMk = null; } return; }
  if(!parkMk){
    const el = document.createElement('div'); el.className = 'mk-car';
    el.innerHTML = `<div class="cpk">${svg(UI.car, 19, 2.2)}</div><span class="ct">Dein Auto</span>`;
    el.addEventListener('click', ev => { ev.stopPropagation(); openPark(); });
    parkMk = new maplibregl.Marker({element:el, anchor:'top', offset:[0, -18]}).setLngLat(LL(p)).addTo(map);
  } else parkMk.setLngLat(LL(p));
}
function openPark(){
  const p = prefs.park; if(!p) return;
  const d = me ? dist(me, p) : null, ll = `${p.lat},${p.lng}`;
  const walk = isApple ? `https://maps.apple.com/?daddr=${ll}&dirflg=w` : `https://www.google.com/maps/dir/?api=1&destination=${ll}&travelmode=walking`;
  $('#modal').innerHTML = `<div class="dlg park-dlg" role="dialog" aria-modal="true" aria-label="Parkplatz"><div class="pad" style="padding:18px 16px 16px">
    <div class="park-hero"><span class="cpk">${svg(UI.car, 28, 2)}</span><div><h2>Dein Auto</h2><span class="muted">Geparkt ${ago(p.at)} · ${new Date(p.at).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'})} Uhr</span></div></div>
    ${d != null ? `<div class="tstats"><div><b>${fmtDist(d)}</b><span>Luftlinie</span></div><div><b>${d < 25 ? 'Du bist da' : 'ca. ' + fmtMin(walkMin(d))}</b><span>zu Fuß</span></div></div>` : ''}
    <div class="btns"><a class="btn primary" href="${walk}" target="_blank" rel="noopener">${svg(UI.nav, 15)} Hinlaufen</a><button class="btn" data-pk="show">Auf der Karte</button></div>
    <div class="btns"><button class="btn" data-pk="share">${svg(UI.share, 15)} Teilen</button><button class="btn danger" data-pk="del">Vergessen</button></div>
    <button class="txtbtn" data-pk="close" style="align-self:center">Schließen</button></div></div>`;
  $('#modal').hidden = false;
}
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-pk]'); if(!b) return;
  const a = b.dataset.pk, p = prefs.park;
  if(a === 'close'){ $('#modal').hidden = true; return; }
  if(!p) return;
  if(a === 'show'){ $('#modal').hidden = true; if(mobile() && snap === 'full') setSnap('peek'); const pts = me ? [me, p] : [p];
    if(pts.length > 1 && dist(me, p) > 60){ const bb = new maplibregl.LngLatBounds(LL(me), LL(me)); bb.extend(LL(p)); map.fitBounds(bb, {padding:camPad(), maxZoom:17, duration:900}); }
    else map.flyTo({center:LL(p), zoom:Math.max(map.getZoom(), 16.5), padding:camPad(), duration:900}); }
  if(a === 'share') shareURL(`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`, 'Mein Auto', 'Hier steht mein Auto:');
  if(a === 'del'){ delete prefs.park; savePrefs(); renderPark(); $('#modal').hidden = true; toast('Parkplatz vergessen'); }
});
$('#b-park').addEventListener('click', () => {
  $('#layersPop').hidden = true; $('#b-layers').classList.remove('on'); $('#b-layers').setAttribute('aria-expanded', 'false');
  if(prefs.park && (!me || dist(me, prefs.park) > 30)) return openPark();
  if(!me){ getHere().then(p => { if(p) parkSave(p); }); return; }
  parkSave(me);
});
function parkPopUI(){ const b = $('#b-park'); if(b) b.querySelector('span').textContent = prefs.park && (!me || dist(me, prefs.park) > 30) ? 'Mein Auto' : 'Hier geparkt'; }
$('#b-layers').addEventListener('click', parkPopUI);

/* ================= Live-Standort =================
   Freiwillig und nur im Cockpit: geht beim Verlassen automatisch wieder aus.
   Gespeichert wird nur die letzte Position (groups/<code>/live/<gerät>), keine Route.
   Echtzeit über das Firestore-SDK (ca. 1 s), ohne SDK alle paar Sekunden per Abfrage. */
const FBV = '10.14.1';
const LIVE_MIN = 3000, LIVE_BEAT = 20000, LIVE_OLD = 45000, LIVE_GONE = 15 * 60000, LIVE_MAX = 4 * 3600e3, LIVE_TRASH = 6 * 3600e3;
const live = {on:false, until:0, lastSent:null, sending:false, fails:0, code:null, mode:null, unsub:null, poll:0, peers:new Map(), mk:new Map(), raf:0, first:true, cleaned:new Set(), sig:''};
let fbx = null, fbTry = 0;
async function fbLoad(){
  if(fbx) return fbx;
  if(fbTry && Date.now() - fbTry < 60000) return null;
  fbTry = Date.now();
  try{
    const [app, fs] = await Promise.all([import(`https://www.gstatic.com/firebasejs/${FBV}/firebase-app.js`), import(`https://www.gstatic.com/firebasejs/${FBV}/firebase-firestore.js`)]);
    const a = app.initializeApp({apiKey:FB.apiKey, projectId:FB.projectId, authDomain:`${FB.projectId}.firebaseapp.com`}, 'live');
    fbx = {db:fs.getFirestore(a), fs};
  }catch(e){ fbx = null; }
  return fbx;
}
function liveParse(id, o){
  try{
    const v = sanitize(typeof o.d === 'string' ? JSON.parse(o.d) : o);
    if(!isFinite(v.lat) || !isFinite(v.lng) || Math.abs(v.lat) > 90 || Math.abs(v.lng) > 180) return null;
    const rc = v.rc && typeof v.rc === 'object' ? {n:String(v.rc.n || '').slice(0, 40), el:Math.max(0, +v.rc.el || 0), p:Math.max(0, Math.min(100, +v.rc.p || 0)), dl:v.rc.dl == null || !isFinite(v.rc.dl) ? null : +v.rc.dl, vs:v.rc.vs ? String(v.rc.vs).slice(0, 24) : null} : null;
    return {id, lat:+v.lat, lng:+v.lng, v:Math.max(0, +v.v || 0), h:v.h == null || !isFinite(v.h) ? null : +v.h, by:String(v.by || '?').slice(0, 24), at:+v.at || 0,
      d:Math.max(0, +v.d || 0), t0:+v.t0 || 0, mx:Math.max(0, +v.mx || 0), rc};
  }catch(e){ return null; }
}
// Zuhören, solange die App offen ist und man in einer Gruppe ist (kostet nichts, solange niemand live ist)
async function liveWatch(){
  const g = grp(), code = FB && g && document.visibilityState !== 'hidden' ? g.code : null;
  if(live.code === code) return;
  liveUnwatch();
  if(!code){ live.peers.clear(); liveRender(); return; }
  live.code = code; live.first = true;
  if(live.on || fbx) return liveRealtime(code);
  livePoll(code);   // leise nachsehen; das Echtzeit-Paket (≈300 KB) kommt erst, wenn jemand live ist
}
async function liveRealtime(code){
  const x = await fbLoad();
  if(live.code !== code || live.mode === 'rt') return;
  if(x){
    try{
      clearTimeout(live.poll); live.mode = 'rt';
      live.unsub = x.fs.onSnapshot(x.fs.collection(x.db, 'groups', code, 'live'),
        qs => { if(live.code === code) liveIngest(qs.docs.map(d => liveParse(d.id, d.data()))); },
        () => { if(live.code !== code) return; live.unsub = null; live.mode = null; livePoll(code); });
      return;
    }catch(e){ live.unsub = null; live.mode = null; }
  }
  clearTimeout(live.poll); live.mode = null; livePoll(code);
}
function livePoll(code){
  clearTimeout(live.poll); live.mode = 'poll';
  const tick = async () => {
    if(live.code !== code) return;
    try{ const arr = await fsList('live'); if(live.code === code) liveIngest(arr.map(v => liveParse(v._id, v))); }catch(e){}
    if(live.code !== code || live.mode !== 'poll') return;
    const busy = live.on || liveFresh().length > 0;
    if(busy && (fbx || !fbTry || Date.now() - fbTry > 60000)){ liveRealtime(code); return; }
    clearTimeout(live.poll); live.poll = setTimeout(tick, busy ? 4000 : 45000);
  };
  tick();
}
// Rausgeworfen oder gesperrt? Auch ohne Crew-Tab regelmäßig prüfen – sonst sieht man weiter die Live-Positionen
let crewChkT = 0;
async function crewCheck(force){
  if(!FB || !grp() || document.visibilityState === 'hidden' || (!force && Date.now() - crewChkT < 30000)) return;
  crewChkT = Date.now();
  try{ const c = await fsGet('members', CREW_DOC); delete c._id; WS.crew = c; crewEnforce(); }catch(e){}
}
every(() => { if(live.code) crewCheck(); }, 60000);
function liveUnwatch(){
  if(live.unsub){ try{ live.unsub(); }catch(e){} live.unsub = null; }
  clearTimeout(live.poll); live.poll = 0; live.code = null; live.mode = null;
}
function liveIngest(list){
  if(list.some(p => p && p.id !== myId())) crewCheck();
  const now = Date.now(), seen = new Set(), mine = myId();
  list.forEach(p => {
    if(!p || p.id === mine) return;
    if(now - p.at > LIVE_TRASH){   // Reste von Apps, die nicht sauber beendet wurden
      if(!live.cleaned.has(p.id)){ live.cleaned.add(p.id); fsDel('live', p.id).catch(() => {}); }
      return;
    }
    seen.add(p.id);
    const old = live.peers.get(p.id);
    if(old && old.at === p.at) return;
    if(!live.first && (!old || now - old.rx > LIVE_OLD) && now - p.at < LIVE_OLD) toast(`${p.by} ist jetzt live`);
    live.peers.set(p.id, {...p, rx:old ? now : Math.min(now, p.at), disp:old ? old.disp : null});
  });
  [...live.peers.keys()].forEach(id => { if(!seen.has(id)) live.peers.delete(id); });
  live.first = false;
  liveRender();
}
const liveAge = p => Date.now() - p.rx;
const liveFresh = () => [...live.peers.values()].filter(p => liveAge(p) < LIVE_OLD);
const liveOf = dev => { const p = live.peers.get(dev); return p && liveAge(p) < LIVE_OLD ? p : null; };
function liveRender(){
  for(const [id, m] of live.mk){ const p = live.peers.get(id); if(!p || liveAge(p) > LIVE_GONE){ m.remove(); live.mk.delete(id); } }
  for(const [id, p] of live.peers){
    const age = liveAge(p); if(age > LIVE_GONE) continue;
    let m = live.mk.get(id);
    if(!m){
      const el = document.createElement('div'); el.className = 'live-mk';
      el.innerHTML = `<i class="lm-arr"></i><span class="lm-car"></span>${avHTML(id, p.by, 36)}<span class="lm-tag"></span>`;
      el.addEventListener('click', e => { e.stopPropagation(); openLiveCard(id); });
      m = new maplibregl.Marker({element:el, anchor:'center'}).setLngLat(LL(p)).addTo(map);
      m._el = el; m._arr = el.querySelector('.lm-arr'); m._tag = el.querySelector('.lm-tag'); m._car = el.querySelector('.lm-car');
      live.mk.set(id, m);
    }
    const old = age >= LIVE_OLD, still = old || p.v < 6 || p.h == null, mc = memberCar(id), sig = mc ? mc.t + mc.c : '';
    if(m._carSig !== sig){ m._carSig = sig; m._car.innerHTML = mc ? carSVG('friend', {c:mc.c, t:mc.t}) : ''; }
    m._el.classList.toggle('old', old); m._el.classList.toggle('still', still); m._el.classList.toggle('drive', !still && !!mc);
    const nm = (WS.members.find(x => x._id === id) || {}).name || p.by;
    m._tag.textContent = old ? `${nm} · vor ${Math.max(1, Math.round(age / 60000))} Min` : p.v >= 6 ? `${nm} · ${Math.round(p.v)} km/h` : nm;
  }
  liveArrows(); liveUI(); liveAnim(); if(liveCardId) renderLiveCard();
  const sig = liveFresh().map(p => p.id).sort().join();
  if(sig !== live.sig){ live.sig = sig; if(tab === 'crew' && view === 'list') renderList(); }
}
function liveArrows(){
  if(!live.mk.size) return;
  const b = map.getBearing();
  for(const [id, m] of live.mk){ const p = live.peers.get(id); if(p && p.h != null){ const r = `rotate(${(p.h - b).toFixed(1)}deg)`; m._arr.style.transform = r; m._car.style.transform = r; } }
}
map.on('rotate', liveArrows);
// weich gleiten und zwischen den Updates in Fahrtrichtung weiterrollen
function liveAnim(){
  if(live.raf || !live.mk.size) return;
  let last = 0;
  const loop = t => {
    live.raf = 0;
    if(!live.mk.size || document.hidden) return;
    live.raf = requestAnimationFrame(loop);
    if(last && t - last < 45) return;
    const dt = last ? Math.min(.25, (t - last) / 1000) : .05; last = t;
    let busy = false;
    for(const [id, m] of live.mk){
      const p = live.peers.get(id); if(!p) continue;
      const age = liveAge(p) / 1000, ms = p.v / 3.6;
      let pred = {lat:p.lat, lng:p.lng};
      if(ms > 1.6 && p.h != null && age < 8) pred = offsetPt(pred, p.h, ms * Math.min(age + .8, 4));
      if(!p.disp || dist(p.disp, pred) > 400) p.disp = pred;
      else { const k = 1 - Math.exp(-dt / .35); p.disp = {lat:p.disp.lat + (pred.lat - p.disp.lat) * k, lng:p.disp.lng + (pred.lng - p.disp.lng) * k}; }
      m.setLngLat(LL(p.disp));
      if(liveFollowId === id && !ckOn && mapReady) map.jumpTo({center:LL(p.disp)});
      if(dist(p.disp, pred) > .3 || (ms > 1.6 && age < 5)) busy = true;
    }
    if(!busy){ cancelAnimationFrame(live.raf); live.raf = 0; }
  };
  live.raf = requestAnimationFrame(loop);
}
every(() => { if(live.peers.size) liveRender(); }, 15000);
function liveUI(){
  const fresh = liveFresh(), avs = fresh.slice(0, 3).map(p => avHTML(p.id, p.by, 20)).join('');
  const b = $('#ckLive');
  b.hidden = !(FB && grp());
  b.classList.toggle('on', live.on); b.setAttribute('aria-pressed', String(live.on));
  b.classList.toggle('warn', live.on && live.fails >= 3);
  b.querySelector('.lv-avs').innerHTML = avs;
  const g = $('#liveBadge');
  g.hidden = !fresh.length;
  if(fresh.length){ g.querySelector('.lv-avs').innerHTML = avs; g.querySelector('b').textContent = fresh.length === 1 ? `${fresh[0].by} ist live` : `${fresh.length} live`; }
}
function liveFocus(id){
  const p = live.peers.get(id); if(!p) return;
  const c = p.disp || p;
  if(ckOn){ ckFollow = false; ckFollowUI(); cam.hold = performance.now() + 900; map.easeTo({center:LL(c), zoom:Math.max(map.getZoom(), 15), duration:800}); return; }
  if(mobile() && snap === 'full') setSnap('peek');
  map.flyTo({center:LL(c), zoom:Math.max(map.getZoom(), 14.5), padding:camPad(), duration:1100});
}
function liveFocusAll(){
  const pts = liveFresh().map(p => p.disp || p); if(!pts.length) return;
  if(pts.length === 1) return liveFocus(liveFresh()[0].id);
  if(me) pts.push(me);
  const b = new maplibregl.LngLatBounds(LL(pts[0]), LL(pts[0])); pts.forEach(p => b.extend(LL(p)));
  if(mobile() && snap === 'full') setSnap('peek');
  map.fitBounds(b, {padding:camPad(), maxZoom:15, duration:1100});
}
$('#liveBadge').addEventListener('click', () => { const f = liveFresh(); if(f.length === 1) openLiveCard(f[0].id); else liveFocusAll(); });

/* Live-Stats eines Freundes */
let liveCardId = null, liveFollowId = null, liveCardTimer = 0;
function openLiveCard(id){
  if(!live.peers.has(id)){ toast('Gerade nicht mehr live'); return; }
  liveCardId = id; renderLiveCard(); liveFocus(id);
  clearTimeout(liveCardTimer); if(ckOn) liveCardTimer = setTimeout(closeLiveCard, 9000);   // beim Fahren nicht ablenken
}
function closeLiveCard(){ liveCardId = null; liveFollowId = null; $('#liveCard').hidden = true; }
function renderLiveCard(){
  const el = $('#liveCard'), p = liveCardId && live.peers.get(liveCardId);
  if(!p){ closeLiveCard(); return; }
  const age = liveAge(p), old = age >= LIVE_OLD, nm = crewName(p.id, p.by);
  const dur = p.t0 && p.at > p.t0 ? p.at - p.t0 + (old ? 0 : age) : null, avg = dur > 30000 && p.d > 100 ? p.d / ((p.at - p.t0) / 1000) * 3.6 : null;
  el.innerHTML = `<div class="lc-top">${avHTML(p.id, p.by, 42)}<div class="lc-n"><b>${esc(nm)}</b><span>${old ? `zuletzt vor ${Math.max(1, Math.round(age / 60000))} Min` : `<i class="lv-dot on"></i>Live${dur ? ` · seit ${fmtDur(dur)}` : ''}`}</span></div><button class="lc-x" data-lc="close" aria-label="Schließen">${svg(UI.close, 13)}</button></div>
    <div class="lc-stats"><div class="lc-v"><b>${old ? '–' : Math.round(p.v)}</b><span>km/h jetzt</span></div><div><b>${p.d ? fmtKmS(p.d) : '–'}</b><span>gefahren</span></div><div><b>${avg ? Math.round(avg) : '–'}</b><span>Ø km/h</span></div><div><b>${p.mx || '–'}</b><span>Top km/h</span></div></div>
    ${p.rc ? `<div class="lc-race"><span class="lc-fl">🏁</span><div><b>${esc(p.rc.n)}</b><span>${fmtDur((p.rc.el + (old ? 0 : age / 1000)) * 1000)} · ${p.rc.p} % geschafft${p.rc.dl != null ? ` · <em class="${p.rc.dl <= 0 ? 'neg' : 'pos'}">${fmtDelta(p.rc.dl)}</em> ${p.rc.vs ? 'gegen ' + esc(p.rc.vs) : 'zur Bestzeit'}` : ''}</span></div></div>` : ''}
    ${ckOn ? '' : `<div class="lc-btns"><button class="btn${liveFollowId === p.id ? ' primary' : ''}" data-lc="follow">${liveFollowId === p.id ? 'Folge ich' : 'Folgen'}</button><button class="btn" data-lc="crew">Profil</button></div>`}`;
  el.hidden = false;
}
$('#liveCard').addEventListener('click', e => {
  const b = e.target.closest('[data-lc]'); if(!b) return;
  const a = b.dataset.lc, id = liveCardId;
  if(a === 'close') return closeLiveCard();
  if(a === 'follow'){ liveFollowId = liveFollowId === id ? null : id; if(liveFollowId) liveFocus(id); renderLiveCard(); liveAnim(); }
  if(a === 'crew'){ closeLiveCard(); openCrew(id); }
});
map.on('dragstart', () => { if(liveFollowId){ liveFollowId = null; if(liveCardId) renderLiveCard(); } });
every(() => { if(liveCardId && !$('#liveCard').hidden) renderLiveCard(); }, 2000);

/* eigenen Standort senden (nur im Cockpit, nach Zustimmung) */
function liveStart(o){
  if(!ckOn || live.on) return;
  const ev = o && o.ev ? o.ev : null;
  if(!needGroup(liveStart)) return;
  if(prefs.liveOk !== (grp() && grp().code)){ openLiveConsent(ev); return; }
  live.on = true; live.until = Date.now() + LIVE_MAX; live.lastSent = null; live.fails = 0; live.ev = ev ? ev._id : null;
  if(ev) live.until = Math.min(live.until, ev.at + EV_AFTER);
  liveWatch(); if(live.code && live.mode !== 'rt') liveRealtime(live.code);
  toast(ev ? `📅 „${ev.title}“: Live ist automatisch an, bis ${new Date(live.until).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'})} Uhr` : `Live an – „${grp().name}“ sieht dich auf der Karte`);
  liveUI();
  if(ck.last && ck.ts && Date.now() - ck.ts < 10000) liveFeed(ck.last, ck.v, (ck.v || 0) > 1.4 ? ck.h : null, 0);
}
function liveStop(quiet){
  if(!live.on) return;
  live.on = false; live.lastSent = null; live.ev = null;
  liveDelete(); liveUI();
  if(!quiet) toast('Live aus – dein Standort wird nicht mehr geteilt');
}
async function liveDelete(){
  const g = grp(); if(!g) return;
  const x = fbx;
  try{ if(x) await x.fs.deleteDoc(x.fs.doc(x.db, 'groups', g.code, 'live', myId())); else await fsDel('live', myId()); }
  catch(e){ try{ await fsDel('live', myId()); }catch(_){} }
}
function liveFeed(pt, v, h, acc){
  if(!live.on || !grp()) return;
  const now = Date.now();
  if(now > live.until){ const ev = live.ev; liveStop(true); toast(ev ? 'Ausfahrt vorbei – Live ist automatisch aus' : 'Live nach 4 Stunden automatisch beendet'); return; }
  if(acc > 80) return;
  const L = live.lastSent, kmh = (v || 0) * 3.6;
  if(L){
    const dt = now - L.at; if(dt < LIVE_MIN) return;
    const dh = h != null && L.h != null ? Math.abs(((h - L.h + 540) % 360) - 180) : 0;
    if(dt < LIVE_BEAT && dist(L, pt) < 12 && Math.abs(kmh - L.v) < 8 && dh < 25 && (h == null) === (L.h == null)) return;
  }
  let rc = null; const ar = ckOn ? activeRun() : null;
  if(ar){ const el = runElapsed(ar.run), ref = ghostRef(ar.cid), rb = ref && ref.splits ? bestAt(ref.splits, ar.run.prog) : null;
    rc = {n:ar.g.c.name.slice(0, 40), el:Math.round(el), p:Math.round(ar.run.prog / ar.g.L * 100), dl:rb != null && ar.run.prog > 30 ? Math.round((el - rb) * 10) / 10 : null, vs:ref && ref.rival ? String(ref.name).slice(0, 24) : null}; }
  liveWrite({lat:+pt.lat.toFixed(6), lng:+pt.lng.toFixed(6), v:Math.round(kmh), h:h == null ? null : Math.round(h), by:myName() || 'Ich', at:now,
    d:ck ? Math.round(ck.dist || 0) : 0, t0:ck ? ck.start : 0, mx:ck ? Math.round((ck.max || 0) * 3.6) : 0, rc});
}
async function liveWrite(o){
  if(live.sending) return;
  live.sending = true; live.lastSent = o;
  try{
    const x = fbx, g = grp();
    const p = x ? x.fs.setDoc(x.fs.doc(x.db, 'groups', g.code, 'live', myId()), {d:JSON.stringify(o), t:o.at}) : fsPut('live', myId(), o);
    await Promise.race([p, new Promise(r => setTimeout(r, 8000))]);   // offline: das SDK schickt es nach, nicht blockieren
    live.fails = 0;
  }catch(e){ live.fails++; if(live.lastSent === o) live.lastSent = {...o, at:0}; }
  live.sending = false;
  if(!live.on) liveDelete();   // während des Sendens ausgeschaltet
  liveUI();
}
let liveConsentEv = null;
function openLiveConsent(ev){
  liveConsentEv = ev || null;
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Live-Standort"><div class="pad" style="padding:18px 16px 16px">
    <h2>Live-Standort teilen?</h2>
    <div class="muted">${ev ? `Du bist bei „${esc(ev.title)}“ dabei. ` : ''}Alle in „${esc(grp().name)}“ sehen dich auf der Karte, mit Richtung und Tempo, solange das Cockpit offen ist.</div>
    <ul class="live-pts"><li>Geht beim Verlassen des Cockpits automatisch aus</li><li>Gespeichert wird nur die letzte Position, keine Route</li><li>Die App muss dafür offen bleiben</li></ul>
    <div class="btns"><button class="btn" data-lv="cancel">Abbrechen</button><button class="btn primary" data-lv="ok">Live teilen</button></div></div></div>`;
  $('#modal').hidden = false;
}
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-lv]'); if(!b) return;
  $('#modal').hidden = true;
  const ev = liveConsentEv; liveConsentEv = null;
  if(b.dataset.lv === 'ok'){ prefs.liveOk = grp() && grp().code; savePrefs(); liveStart(ev ? {ev} : null); }
});
$('#ckLive').addEventListener('click', () => {
  if(!live.on) return liveStart();
  if(live.ev){ evX(live.ev).off = 1; savePrefs(); }   // bei dieser Ausfahrt nicht wieder automatisch einschalten
  liveStop();
});
document.addEventListener('visibilitychange', () => { liveWatch(); if(!document.hidden) liveRender(); else wsShow = null; });
window.addEventListener('pagehide', () => {   // App wird geschlossen: Position sofort entfernen
  if(!live.on || !grp()) return;
  live.lastSent = null;
  try{ fetch(`${fsURL('live', myId())}?key=${FB.apiKey}`, {method:'DELETE', keepalive:true}).catch(() => {}); }catch(e){}
});

/* ================= Risk-Indikator ================= */
const RISK_LV = [[85, 'Kritisch', '#ff2d55'], [70, 'Gefährlich', '#ff3b30'], [50, 'Riskant', '#ff9f0a'], [30, 'Sportlich', '#ffd60a'], [0, 'Entspannt', '#30d158']];
const riskLevel = s => { const l = RISK_LV.find(x => s >= x[0]); return {name:l[1], col:l[2]}; };
const clamp01 = x => Math.max(0, Math.min(1, x));
const baseCache = new WeakMap();
function trackBase(t){
  if(baseCache.has(t)) return baseCache.get(t);
  const an = analyzeTrack(t); let b = null;
  if(an){
    const vs = an.P.map(p => p.v).sort((x, y) => x - y), dur = an.P[an.P.length - 1].ta || 1;
    b = {p95:vs[Math.floor(.95 * (vs.length - 1))], avg:an.D / dur * 3.6, s:an.P[0], e:an.P[an.P.length - 1], D:an.D, dur};
  }
  baseCache.set(t, b); return b;
}
// Risiko-Werte in Leerlaufzeiten vorab rechnen, damit „Fahrten“ und Statistik sofort aufgehen (auch bei hunderten Fahrten)
let riskWarmT = 0;
function riskWarm(){
  clearTimeout(riskWarmT); let i = 0;
  const idle = window.requestIdleCallback || (f => setTimeout(() => f({timeRemaining:() => 12}), 30));
  const step = dl => { const end = performance.now() + Math.max(8, Math.min(40, dl.timeRemaining())); while(i < tracks.length && performance.now() < end){ try{ trackRisk(tracks[i]); trackCells(tracks[i]); }catch(e){} i++; } if(i < tracks.length) riskWarmT = setTimeout(() => idle(step), 0); };
  riskWarmT = setTimeout(() => idle(step), 1500);
}
function trackRisk(t){
  if(riskCache.has(t)) return riskCache.get(t);
  const an = analyzeTrack(t), b = trackBase(t);
  if(!an || !b || an.D < 500){ riskCache.set(t, null); return null; }
  const P = an.P; let tHigh = 0, ev = 0, lastEv = -1e9;
  for(let k = 1; k < P.length; k++){
    const p = P[k], q = P[k - 1];
    if(p.si === q.si && (p.v + q.v) / 2 > 130) tHigh += p.ta - q.ta;
    if((Math.abs(p.glon) > .35 || Math.abs(p.glat) > .4) && p.ta - lastEv > 5){ ev++; lastEv = p.ta; }
  }
  const fHigh = tHigh / b.dur, evPer10 = ev / Math.max(1, an.D / 10000);
  const brake = an.g.brake.v, acc = an.g.acc.v, lat = Math.abs(an.g.lat.v);
  // Vergleich mit früheren Fahrten: gleiche Strecke (Start + Ziel), sonst deine üblichen Fahrten
  const pool = t._ws ? [...wsTrackObjs.values()].filter(x => x._ws.dev === t._ws.dev) : tracks;
  const prev = pool.filter(x => x !== t && x.created < t.created).map(trackBase).filter(Boolean);
  const same = prev.filter(x => dist(x.s, b.s) < 400 && dist(x.e, b.e) < 400);
  const pct = r => r >= 1 ? `${Math.round((r - 1) * 100)} % schneller` : `${Math.round((1 - r) * 100)} % langsamer`;
  let ratio = 1, cmpTxt = 'Erste Fahrt zum Vergleich';
  if(same.length){ ratio = b.avg / (same.reduce((a, x) => a + x.avg, 0) / same.length); cmpTxt = `${pct(ratio)} als sonst auf dieser Strecke`; }
  else if(prev.length >= 2){ const ps = prev.map(x => x.p95).sort((x, y) => x - y); ratio = b.p95 / ps[Math.floor(ps.length / 2)]; cmpTxt = `${pct(ratio)} als deine üblichen Fahrten`; }
  const F = [
    {w:.18, c:clamp01((b.p95 - 80) / 120), t:`Top-Tempo ${Math.round(b.p95)} km/h`},
    {w:.10, c:clamp01((b.avg - 50) / 90), t:`Ø ${Math.round(b.avg)} km/h in Fahrt`},
    {w:.12, c:clamp01(fHigh / .4), t:`${Math.round(fHigh * 100)} % der Zeit über 130`},
    {w:.15, c:clamp01((brake - .3) / .6), t:`Bremsung ${fmtG(brake)}`},
    {w:.08, c:clamp01((acc - .2) / .4), t:`Beschleunigung ${fmtG(acc)}`},
    {w:.15, c:clamp01((lat - .3) / .6), t:`Querkraft ${fmtG(lat)}`},
    {w:.12, c:clamp01(evPer10 / 6), t:`${ev} harte${ev === 1 ? 's' : ''} Manöver`},
    {w:.10, c:clamp01((ratio - 1) / .3), t:cmpTxt},
  ];
  let score = Math.round(100 * F.reduce((a, x) => a + x.w * x.c, 0));
  const shared = t._ws && t._ws.risk;   // geteilte Fahrt: Wert so, wie ihn der Fahrer selbst hat
  if(shared) score = Math.max(0, Math.min(100, Math.round(shared.score)));
  const r = {score, lv:riskLevel(score), F, cmpTxt, ratio, top:Math.max((t.maxSpd || 0) * 3.6, b.p95), avg:b.avg, brake, lat, acc, ev, an,
             why:shared && shared.why && shared.why.length ? shared.why.slice(0, 4).map(x => ({t:String(x)})) : F.filter(x => x.c > .05).sort((x, y) => y.w * y.c - x.w * x.c)};
  riskCache.set(t, r); return r;
}
function riskRank(t){ const i = deathTop().findIndex(x => x.t === t); return i >= 0 ? i + 1 : 0; }
const VERDICTS = [[85, 'Das war knapper, als du denkst.'], [70, 'Hier hat nicht viel gefehlt.'], [50, 'Am Limit gekratzt.'], [30, 'Sportlich, aber mit Luft.'], [0, 'Ganz entspannt.']];
const verdict = s => VERDICTS.find(x => s >= x[0])[1];
// „Was wäre wenn" – Physik, vereinfacht: 1 s Reaktion, ~0,9 G Vollbremsung, Haftgrenze ~1 G (trocken) / ~0,6 G (nass), 1,5 t
function riskStory(r){
  const v = r.top / 3.6, L = [], kmh = Math.round(r.top);
  const react = v, brakeD = v * v / (2 * 9), stop = react + brakeD, fall = v * v / 19.62, mj = .5 * 1500 * v * v / 1e6;
  if(r.lat > .3){
    const more = Math.round((Math.sqrt(1 / r.lat) - 1) * 100), vc = r.an.g.lat.kmh, vWet = vc ? vc * Math.sqrt(.6 / r.lat) : 0;
    L.push({h:`${Math.max(0, Math.round((1 - r.lat) * 100))} % Grip-Reserve`, t:`In deiner schärfsten ${r.an.g.lat.v >= 0 ? 'Rechts' : 'Links'}kurve lagen ${fmtG(r.lat)} an. Reifen halten auf trockener Straße etwa 1 G. ${more > 0 ? `${more} % mehr Tempo, und sie hätten losgelassen.` : 'Du warst an der Haftgrenze.'}${r.lat > .6 && vc > vWet + 3 ? ` Bei Regen wäre schon bei ${Math.round(vWet)} km/h Schluss gewesen. Du warst mit ${Math.round(vc)} km/h drin.` : ''}`});
  }
  L.push({h:`${Math.round(stop)} m bis zum Stillstand`, t:`Aus ${kmh} km/h: ${Math.round(react)} m fährst du allein in der Schrecksekunde, bevor die Bremse überhaupt packt.${stop > 105 ? ` Zusammen ${(stop / 105).toFixed(1).replace('.', ',')} Fußballfelder.` : ''}`});
  L.push({h:`Wie ein Sturz aus ${Math.round(fall)} m`, t:`So viel Wucht hätte ein Aufprall mit ${kmh} km/h. Das ist ungefähr das ${Math.max(1, Math.round(fall / 3))}. Stockwerk.`});
  if(r.brake > .4) L.push({h:`${Math.max(0, Math.round((1 - r.brake) * 100))} % Brems-Reserve`, t:`Deine härteste Bremsung: ${fmtG(r.brake)}${r.an.g.brake.kmh ? ` bei ${Math.round(r.an.g.brake.kmh)} km/h` : ''}. Viel mehr als 1 G gibt kein Reifen her.`});
  L.push({h:`${mj.toFixed(1).replace('.', ',')} Megajoule`, t:`Bewegungsenergie bei Top-Tempo, so viel wie ${(mj / 4.184).toFixed(1).replace('.', ',')} kg TNT.`});
  return L;
}
function riskCardHTML(t){
  const r = trackRisk(t); if(!r) return '';
  const rank = t._ws ? 0 : riskRank(t);
  return `<div class="rk" style="--lv:${r.lv.col}">
    <div class="rk-top"><div class="rk-s"><b>${r.score}</b><span>Risk</span></div>
      <div class="rk-t"><b>${r.lv.name}</b><span>${t._ws ? `Fahrt von ${t._ws.dev === myId() ? 'dir' : esc(t._ws.by)}` : rank ? `Platz ${rank} auf der Death List` : 'Nicht in den Top 10'}</span></div>
      ${t._ws ? '' : '<button class="rk-go" data-dl-open-list>Death List</button>'}</div>
    <div class="rk-bar"><i style="width:${Math.max(3, r.score)}%;background-size:${(10000 / Math.max(3, r.score)).toFixed(1)}% 100%"></i></div>
    ${r.why.length ? `<div class="rk-why">${r.why.slice(0, 4).map(x => `<span>${esc(x.t)}</span>`).join('')}</div>` : ''}
  </div>`;
}

/* ================= Death List ================= */
const sleep = ms => new Promise(r => setTimeout(r, ms));
function deathTop(){ return tracks.map(t => ({t, r:trackRisk(t)})).filter(x => x.r).sort((a, b) => b.r.score - a.r.score).slice(0, 10); }
function placeTxt(t){ const p = t.place; if(!p) return null; return p.a && p.b && p.a !== p.b ? `${p.a} → ${p.b}` : (p.a || p.b || null); }
const DL_PULSE = '<path d="M0 22H40l5-3 4 3h14l5-17 6 28 6-22 4 11H120"/>';
function dlEntryHTML(){
  const top = deathTop(); if(!top.length) return '';
  const x = top[0];
  return `<button class="dl-entry" data-dl-open-list aria-label="Death List öffnen"><svg viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">${DL_PULSE}</svg>
    <span class="t">Death List</span><span class="s"><span>Platz 1: ${esc(placeTxt(x.t) || x.t.name)}</span><span>Risk <b>${x.r.score}</b></span></span></button>`;
}
function ecgPath(an, w, h, vmax){
  const pts = an.prof.filter((_, i) => i % 3 === 0);
  return pts.map((p, i) => `${i ? 'L' : 'M'}${(i / (pts.length - 1) * w).toFixed(1)} ${(h - 2 - p[1] / vmax * (h - 4)).toFixed(1)}`).join('');
}
function openDeath(){
  if(rp) return;
  $('#death').hidden = false; $('#death').scrollTop = 0;
  const p = $('#death .dl-pulse path'); if(p){ p.style.animation = 'none'; void p.getBoundingClientRect(); p.style.animation = ''; }
  renderDeath(); dlPlaces();
}
function closeDeath(){ $('#death').hidden = true; }
function renderDeath(){
  const top = deathTop(), list = $('#dlList');
  if(!top.length){ list.innerHTML = `<div class="dl-empty"><b>Noch leer</b>Zeichne Fahrten auf. Ab 500 m bekommt jede Fahrt einen Risk-Score, die zehn höchsten landen hier.</div>`; return; }
  const vmax = Math.max(100, ...top.map(x => x.r.top));
  list.innerHTML = top.map((x, i) => {
    const t = x.t, r = x.r, d = new Date(t.created), hero = i === 0, h = hero ? 46 : 26;
    const story = riskStory(r).slice(0, hero ? 5 : 1);
    return `<button class="dl-row${hero ? ' hero' : ''}" data-dl-open="${t.id}" style="--lv:${r.lv.col}">
      <span class="dl-rank">${i + 1}</span>
      <span class="dl-body">
        <span class="dl-place">${esc(placeTxt(t) || t.name)}</span>
        <span class="dl-when"><span>${d.toLocaleDateString('de-DE', {weekday:'short', day:'numeric', month:'short', year:'numeric'})}</span><span>${d.toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'})} Uhr</span><span>${fmtKmS(t.dist)}</span></span>
        ${hero || r.score >= 50 ? `<span class="dl-verdict">${verdict(r.score)}</span>` : ''}
        <svg class="dl-ecg" viewBox="0 0 200 ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${ecgPath(r.an, 200, h, vmax)}"/></svg>
        ${hero ? `<span class="dl-facts"><span><b>${Math.round(r.top)}</b>km/h top</span><span><b>${fmtGn(r.brake)}</b>G Bremsen</span><span><b>${fmtGn(r.lat)}</b>G quer</span><span><b>${r.ev}</b>harte Manöver</span></span>
          <span class="dl-facts"><span>${esc(r.cmpTxt)}</span></span>` : ''}
        <span class="dl-wi">${story.map(s => `<div><b>${esc(s.h)}</b><span>${esc(s.t)}</span></div>`).join('')}</span>
      </span>
      <span class="dl-score"><b>${r.score}</b><span>Risk</span><em>${r.lv.name}</em></span>
    </button>`;
  }).join('');
}
async function reverseName(p){
  try{
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=de&lat=${p.lat.toFixed(5)}&lon=${p.lng.toFixed(5)}`);
    const j = await r.json(), ad = j.address || {};
    return ad.city || ad.town || ad.village || ad.municipality || ad.county || null;
  }catch(e){ return null; }
}
async function fetchPlace(t){
  if(t.place) return true;
  const b = trackBase(t); if(!b) return false;
  const a = await reverseName(b.s); let e = a;
  if(dist(b.s, b.e) > 1500){ await sleep(1100); e = await reverseName(b.e); }
  if(!a && !e) return false;
  t.place = {a, b:e};
  if(tracksReady){ clearTimeout(tracksSaveT); tracksSaveT = setTimeout(tracksFlush, 700); }
  return true;
}
let dlBusy = false;
async function dlPlaces(){
  if(dlBusy) return; dlBusy = true;
  for(const x of deathTop()){
    if($('#death').hidden) break;
    if(x.t.place) continue;
    if(await fetchPlace(x.t)) renderDeath();
    await sleep(1100);
  }
  dlBusy = false;
}
document.addEventListener('click', e => {
  if(e.target.closest('[data-dl-open-list]')){ openDeath(); return; }
  if(e.target.closest('[data-dl="close"]')){ closeDeath(); return; }
  const o = e.target.closest('[data-dl-open]');
  if(o){ closeDeath(); openTrack(o.dataset.dlOpen, true); }
});
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !$('#death').hidden) closeDeath(); });

/* ================= G-Kräfte ================= */
// Sensor liefert Beschleunigung im Handy-Koordinatensystem. Der waagrechte Anteil wird über GPS
// (Tempoänderung, Kurven) automatisch auf „vorne/seitlich" ausgerichtet – egal wie das Handy in der Halterung steckt.
const gs = {on:false, s:[0,0,0], u:null, gl:null, sum:[0,0,0], cnt:0, facc:[0,0,0], fn:0, lacc:0, ln:0, lsign:1, f:null, live:null, peak:null, gps:null, lastGps:null, vNow:0};
const v3 = {add:(a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub:(a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], mul:(a, k) => [a[0] * k, a[1] * k, a[2] * k],
  dot:(a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], len:a => Math.hypot(a[0], a[1], a[2]), cross:(a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]};
const v3n = a => v3.mul(a, 1 / (v3.len(a) || 1));
const lpf = (o, n, dt, tau) => o ? v3.add(o, v3.mul(v3.sub(n, o), 1 - Math.exp(-dt / tau))) : n;
const gCal = () => !!(gs.f && gs.ln >= 3);
function onMotion(e){
  const ag = e.accelerationIncludingGravity, a = e.acceleration;
  if(!ag || ag.x == null) return;
  const iv = e.interval > 1 ? e.interval / 1000 : (e.interval || .016), dt = Math.min(.1, Math.max(.005, iv));
  const AG = [ag.x, ag.y, ag.z || 0];
  let ua, grav;
  if(a && a.x != null){ ua = [a.x, a.y, a.z || 0]; grav = v3.sub(AG, ua); }
  else { gs.gl = lpf(gs.gl, AG, dt, 1); grav = gs.gl; ua = v3.sub(AG, grav); }
  if(v3.len(ua) > 25) return;                     // Handy wird gerade angefasst
  gs.u = v3n(lpf(gs.u, grav, dt, .5));
  gs.s = lpf(gs.s, ua, dt, .25);
  const h = v3.sub(gs.s, v3.mul(gs.u, v3.dot(gs.s, gs.u)));
  gs.sum = v3.add(gs.sum, h); gs.cnt++;
  if(!gs.f) return;                               // Längsachse noch nicht gelernt
  const lon = v3.dot(h, gs.f) / 9.81, full = gCal();
  const lat = full ? gs.lsign * v3.dot(h, v3.cross(gs.u, gs.f)) / 9.81 : (gs.gps ? gs.gps.lat : 0);
  if(Math.hypot(lat, lon) > 2.2) return;
  gs.live = {lat, lon, full, t:performance.now()};
  if(gs.vNow > 3) gPeak(full ? lat : 0, lon);
}
function gPeak(lat, lon){
  const p = gs.peak || (gs.peak = {lat:0, lon:0});
  if(Math.abs(lat) > Math.abs(p.lat)) p.lat = lat;
  if(Math.abs(lon) > Math.abs(p.lon)) p.lon = lon;
  if(rec && rec.runFrom && !rec.stopped){
    const g = rec.g || (rec.g = {lat:0, brake:0, acc:0}), at = me ? [+me.lng.toFixed(6), +me.lat.toFixed(6)] : null;
    if(Math.abs(lat) > Math.abs(g.lat)){ g.lat = +lat.toFixed(2); g.latAt = at; }
    if(-lon > g.brake){ g.brake = +(-lon).toFixed(2); g.brakeAt = at; }
    if(lon > g.acc){ g.acc = +lon.toFixed(2); g.accAt = at; }
  }
}
function gTake(){ const p = gs.peak; gs.peak = null; return gCal() && p ? [p.lat, p.lon] : null; }
function gGpsFix(v, hd, t){     // v m/s, hd Grad oder null
  const L = gs.lastGps; gs.lastGps = {v, h:hd, t}; gs.vNow = v;
  if(!L) return;
  const dt = (t - L.t) / 1000;
  if(dt < .4 || dt > 3.5){ gs.sum = [0,0,0]; gs.cnt = 0; return; }
  const aLon = (v - L.v) / dt;
  let aLat = 0;
  if(hd != null && L.h != null && v > 3){ const dh = ((hd - L.h + 540) % 360) - 180; aLat = v * (dh * Math.PI / 180) / dt; }
  gs.gps = {lat:Math.max(-1.6, Math.min(1.6, aLat / 9.81)), lon:Math.max(-1.6, Math.min(1.6, aLon / 9.81)), t:performance.now()};
  if(gs.cnt && gs.u){
    const hb = v3.mul(gs.sum, 1 / gs.cnt);
    if(v > 3 && Math.abs(aLon) > .8 && Math.abs(aLat) < 1){ gs.facc = v3.add(v3.mul(gs.facc, .97), v3.mul(hb, aLon)); gs.fn++; }
    if(gs.fn >= 4){ const fh = v3.sub(gs.facc, v3.mul(gs.u, v3.dot(gs.facc, gs.u))); if(v3.len(fh) > .3) gs.f = v3n(fh); }
    if(gs.f && v > 5 && Math.abs(aLat) > 1 && Math.abs(aLon) < 1.2){ gs.lacc = gs.lacc * .97 + v3.dot(hb, v3.cross(gs.u, gs.f)) * aLat; gs.ln++; gs.lsign = gs.lacc >= 0 ? 1 : -1; }
  }
  gs.sum = [0,0,0]; gs.cnt = 0;
}
function gNow(){
  const now = performance.now();
  if(gs.f && gs.live && now - gs.live.t < 1000) return {lat:gs.live.lat, lon:gs.live.lon, src:'sensor'};
  if(gs.gps && now - gs.gps.t < 4000) return {lat:gs.gps.lat, lon:gs.gps.lon, src:'gps'};
  return null;
}
function gStart(){
  if(gs.on || !onOff('gforce')) return;
  const DM = window.DeviceMotionEvent; if(!DM) return;
  const go = () => { if(gs.on) return; window.addEventListener('devicemotion', onMotion); gs.on = true; };
  try{ if(typeof DM.requestPermission === 'function') DM.requestPermission().then(r => { if(r === 'granted') go(); }).catch(() => {}); else go(); }catch(e){}
}
function gStop(){ if(!gs.on) return; window.removeEventListener('devicemotion', onMotion); gs.on = false; gs.live = null; }
const gShow = {lat:0, lon:0};
function gRender(g){
  const dot = $('#gDot'); if(!dot) return;
  const d = g || {lat:0, lon:0};
  gShow.lat += (d.lat - gShow.lat) * .3; gShow.lon += (d.lon - gShow.lon) * .3;
  let x = -gShow.lat * 44, y = gShow.lon * 44; const r = Math.hypot(x, y); if(r > 46){ x *= 46 / r; y *= 46 / r; }   // wie eine Kugel in der Schüssel
  dot.setAttribute('cx', (50 + x).toFixed(1)); dot.setAttribute('cy', (50 + y).toFixed(1));
  $('#gVal').textContent = g ? Math.hypot(gShow.lat, gShow.lon).toFixed(2).replace('.', ',') : '–';
  $('#gMeter').classList.toggle('gps', !!(g && g.src === 'gps'));
}

/* ================= Fahrt-Replay ================= */
const RP_SPEEDS = [5, 10, 20, 50, 100];
let rp = null, rpMk = null;
function rpAt(an, tr){
  const P = an.P; let a = 0, b = P.length - 1;
  if(tr <= P[0].ta) b = 0; else if(tr >= P[b].ta) a = b;
  else while(b - a > 1){ const m = (a + b) >> 1; if(P[m].ta < tr) a = m; else b = m; }
  const A = P[a], B = P[b], f = B.ta > A.ta ? (tr - A.ta) / (B.ta - A.ta) : 0, L = k => A[k] + f * (B[k] - A[k]);
  return {lat:L('lat'), lng:L('lng'), v:L('v'), d:L('d'), glat:L('glat'), glon:L('glon')};
}
function startReplay(t){
  const an = analyzeTrack(t); if(!an || rp || ckOn) return;
  rp = {id:t.id, an, tr:0, dur:an.P[an.P.length - 1].ta, mult:RP_SPEEDS.includes(prefs.rpMult) ? prefs.rpMult : 20, playing:true, last:0, carBrg:null, camBrg:null, zoom:null, userZoom:null, gest:false, hud:0};
  tvScrubEnd(); tvSel = -1; tvPaint();
  document.body.classList.add('replay');
  car3d.on = onOff('car3d'); car3d.pos = {lat:an.P[0].lat, lng:an.P[0].lng};
  if(car3d.on) enableCar3d(); else document.body.classList.remove('car3d');
  const e = document.createElement('div'); e.className = 'rp-car'; e.innerHTML = carSVG('car');
  rpMk = new maplibregl.Marker({element:e, anchor:'center', rotationAlignment:'map', pitchAlignment:'map'}).setLngLat([an.P[0].lng, an.P[0].lat]).addTo(map);
  map.setMaxPitch(70); try{ map.dragPan.disable(); map.dragRotate.disable(); }catch(_){}
  $('#rpTop').innerHTML = `<b>Replay</b><span>${esc(t.name)}</span>`;
  gShow.lat = gShow.lon = 0;
  rpUI(); rp.raf = requestAnimationFrame(rpFrame);
}
function exitReplay(){
  if(!rp) return;
  cancelAnimationFrame(rp.raf); const id = rp.id; rp = null;
  document.body.classList.remove('replay');
  if(!ckOn){ car3d.on = false; document.body.classList.remove('car3d'); if(mapReady) map.triggerRepaint(); }
  if(rpMk){ rpMk.remove(); rpMk = null; }
  try{ map.dragPan.enable(); map.dragRotate.enable(); }catch(_){}
  map.easeTo({pitch:prefs.terrain ? map.getPitch() : 0, bearing:0, padding:camPad(), duration:600});
  if(!prefs.terrain) map.once('moveend', () => { if(!ckOn && !rp && !prefs.terrain) map.setMaxPitch(0); });
  const t = tracks.find(x => x.id === id) || wsTrackObjs.get(String(id).slice(3)); if(t) setTimeout(() => fitTrack(t.segs), 650);
  gRender(null); updateTrackLayers();
}
function rpFrame(now){
  if(!rp) return;
  rp.raf = requestAnimationFrame(rpFrame);
  const dt = rp.last ? Math.min(.1, (now - rp.last) / 1000) : 0; rp.last = now;
  if(rp.playing){ rp.tr = Math.min(rp.dur, rp.tr + dt * rp.mult); if(rp.tr >= rp.dur){ rp.playing = false; rpUI(); } }
  rpDraw(dt, now);
}
function rpDraw(dt = 0, now = performance.now()){
  const an = rp.an, p = rpAt(an, rp.tr);
  const ahead = Math.min(an.D, p.d + 18), back = Math.max(0, ahead - 18);
  const pa = {lat:an.lerp(ahead, 'lat'), lng:an.lerp(ahead, 'lng')}, pb = {lat:an.lerp(back, 'lat'), lng:an.lerp(back, 'lng')};
  if(dist(pa, pb) > 3){
    const tb = bearing(pb, pa), sm = (cur, tau) => cur == null ? tb : (cur + ((((tb - cur + 540) % 360) - 180) * (dt ? 1 - Math.exp(-dt / tau) : 1)) + 360) % 360;
    rp.carBrg = sm(rp.carBrg, .1); rp.camBrg = sm(rp.camBrg, .45);
  }
  const zt = rp.userZoom != null ? rp.userZoom : ckZoom(p.v / 3.6) - .2;
  rp.zoom = rp.zoom == null || !dt ? zt : rp.zoom + (zt - rp.zoom) * (1 - Math.exp(-dt / 1.2));
  car3d.pos = {lat:p.lat, lng:p.lng}; if(rp.carBrg != null) car3d.brg = rp.carBrg;
  car3d.alt = terrainAlt(p);
  if(rpMk){ rpMk.setLngLat([p.lng, p.lat]); if(rp.carBrg != null) rpMk.setRotation(rp.carBrg); }
  if(mapReady && !rp.gest) map.jumpTo({center:[p.lng, p.lat], bearing:rp.camBrg != null ? rp.camBrg : map.getBearing(), zoom:rp.zoom, pitch:55, padding:ckPad()});
  gRender({lat:p.glat, lon:p.glon, src:an.g.src});
  if(now - rp.hud > 90 || !dt){
    rp.hud = now;
    const kmh = Math.max(0, p.v), txt = String(Math.round(kmh));
    $('[data-ck="v"]').textContent = txt; $('#ckSpeed').classList.toggle('w3', txt.length >= 3); $('#ckSpeed').classList.remove('over');
    $('#ckSpeed').style.setProperty('--p', Math.min(1, kmh / 260).toFixed(3));
    $('#rpTime').textContent = `${fmtDur(rp.tr * 1000)} / ${fmtDur(rp.dur * 1000)}`;
    $('#rpInfo').textContent = `Sektor ${an.secOf(p.d) + 1} · ${fmtKm1(p.d)} km`;
    if(!rp.seeking) $('#rpSeek').value = Math.round(rp.tr / (rp.dur || 1) * 1000);
  }
}
function rpUI(){
  if(!rp) return;
  const b = $('#rpBar [data-rp="play"]');
  b.innerHTML = svg(rp.playing ? UI.pause : UI.play, 20, 2.6); b.setAttribute('aria-label', rp.playing ? 'Pause' : 'Abspielen');
  $('#rpBar [data-rp="speed"]').textContent = `${rp.mult}×`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-rp]'); if(!b || !rp) return;
  const a = b.dataset.rp;
  if(a === 'play'){ if(!rp.playing && rp.tr >= rp.dur) rp.tr = 0; rp.playing = !rp.playing; rp.last = 0; rpUI(); }
  if(a === 'speed'){ rp.mult = RP_SPEEDS[(RP_SPEEDS.indexOf(rp.mult) + 1) % RP_SPEEDS.length]; prefs.rpMult = rp.mult; savePrefs(); rpUI(); }
  if(a === 'close') exitReplay();
});
$('#rpSeek').addEventListener('input', e => { if(!rp) return; rp.seeking = true; rp.tr = e.target.value / 1000 * rp.dur; rpDraw(); });
$('#rpSeek').addEventListener('change', () => { if(rp) rp.seeking = false; });
map.on('zoomstart', e => { if(rp && e.originalEvent) rp.gest = true; });
map.on('zoomend', () => { if(rp && rp.gest){ rp.gest = false; rp.userZoom = map.getZoom(); rp.zoom = rp.userZoom; } });
document.addEventListener('keydown', e => { if(rp && e.key === 'Escape') exitReplay(); if(rp && e.key === ' '){ e.preventDefault(); $('#rpBar [data-rp="play"]').click(); } });

/* ================= Auto-Symbol ================= */
// Auto von oben; o.c / o.t = Lack und Karosserie (Standard: dein eigenes), Geister ohne Farbe sind lila
const memberCar = dev => { const mc = (WS.members.find(x => x._id === dev) || {}).car; return mc && CAR_TYPES[mc.t] && CAR_COLORS[mc.c] ? mc : null; };
function carSVG(kind, o = {}){
  const ghost = kind === 'ghost' && !o.c, cKey = o.c || carColor(), tKey = o.t || carType(), T = CAR_TYPES[tKey] || CAR_TYPES.limo;
  const sx = (T.W / 1.84).toFixed(3), sy = ((T.F - T.Rr) / 4.72).toFixed(3);
  const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16), f = v => Math.max(0, Math.min(255, Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k))); return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`; };
  const ch = (CAR_COLORS[cKey] || CAR_COLORS.carbon).hex;
  const paint = ghost ? '<stop offset="0" stop-color="#7a2fb0"/><stop offset=".5" stop-color="#c67cf5"/><stop offset="1" stop-color="#7a2fb0"/>'
                      : cKey === 'carbon' ? '<stop offset="0" stop-color="#04060b"/><stop offset=".22" stop-color="#0b1426"/><stop offset=".5" stop-color="#1b3263"/><stop offset=".78" stop-color="#0b1426"/><stop offset="1" stop-color="#04060b"/>'
                      : `<stop offset="0" stop-color="${shade(ch, -.55)}"/><stop offset=".22" stop-color="${shade(ch, -.2)}"/><stop offset=".5" stop-color="${shade(ch, .18)}"/><stop offset=".78" stop-color="${shade(ch, -.2)}"/><stop offset="1" stop-color="${shade(ch, -.55)}"/>`;
  const id = ghost ? 'g' : 'c' + cKey;
  return `<svg class="${kind === 'car' ? 'car' : ''}" viewBox="0 0 48 96" aria-hidden="true"><g transform="translate(24 48) scale(${sx} ${sy}) translate(-24 -48)">
    <defs><linearGradient id="${id}p" x1="0" x2="1" y1="0" y2="0">${paint}</linearGradient>
      <linearGradient id="${id}w" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3a4d6e"/><stop offset="1" stop-color="#0a0f18"/></linearGradient></defs>
    <path d="M24 3C33 3 39 6 40.5 13L42 24C42.6 28 42 32 41.4 36L41 58C41.6 62 42.4 67 42 72L41 84C40 90 34 93 24 93S8 90 7 84L6 72C5.6 67 6.4 62 7 58L6.6 36C6 32 5.4 28 6 24L7.5 13C9 6 15 3 24 3Z" fill="url(#${id}p)" stroke="${ghost ? '#e3b8ff' : '#24396a'}" stroke-width=".8"/>
    <path d="M6.6 36l-3.4 1.2.5 2.6 3.1-.7zM41.4 36l3.4 1.2-.5 2.6-3.1-.7z" fill="${ghost ? '#c67cf5' : '#0d131d'}"/>
    <path d="M17 10q-1 10 0 19M31 10q1 10 0 19" stroke="rgba(255,255,255,.1)" stroke-width=".8" fill="none"/>
    <path d="M11.5 33Q24 27.5 36.5 33L34.6 43.5Q24 41 13.4 43.5Z" fill="url(#${id}w)"/>
    <path d="M13 34.3Q20 31.6 27 31.9L25.5 33.2Q19 33.3 14 35.6Z" fill="rgba(255,255,255,.18)"/>
    <path d="M11.8 44.5l1.6-.8 1.1 17.5-2.6 1.2zM36.2 44.5l-1.6-.8-1.1 17.5 2.6 1.2z" fill="url(#${id}w)"/>
    <path d="M14.6 61.5Q24 63.6 33.4 61.5L32.5 77Q24 79.6 15.5 77Z" fill="url(#${id}w)"/>
    <path d="M9.4 10Q12 6.9 16.3 6.5L16.8 8.2Q12.8 8.7 10.5 11.4ZM38.6 10Q36 6.9 31.7 6.5L31.2 8.2Q35.2 8.7 37.5 11.4Z" fill="${ghost ? '#f3e1ff' : '#e6eeff'}"/>
    <path d="M13.5 4.6h21" stroke="#05070b" stroke-width="1.2" stroke-linecap="round" opacity="${ghost ? 0 : .8}"/>
    <path d="M8.6 83.5Q9.2 89 15.2 90.6L15.7 88.6Q11.2 87.6 10.6 83.5ZM39.4 83.5Q38.8 89 32.8 90.6L32.3 88.6Q36.8 87.6 37.4 83.5Z" fill="${ghost ? '#f3e1ff' : '#ff2b2b'}"/>
    <path d="M15.5 85.5Q24 87.6 32.5 85.5" stroke="rgba(255,255,255,.14)" stroke-width=".8" fill="none"/>
  </g></svg>`;
}

/* ================= Autos zur Auswahl =================
   Eigene, frei erfundene Formen (keine echten Modelle oder Logos). Meter, vorne = +X, oben = +Y. */
const CAR_TYPES = {
  limo:{name:'Sportlimousine', short:'Limousine', sub:'Vier Türen, flaches Fastback', F:2.36, Rr:-2.36, S:.30, R:.40, fA:1.41, rA:-1.40, wr:.34, W:1.84, nose:.66, tail:.66, tailY:.80,
    top:[[2.10, .80], [1.30, .90], [.66, .96], [-1.0, .99], [-1.95, .98], [-2.22, .96, -2.30, .86]],
    gh:[[.70, .95], [.02, 1.34], [-.20, 1.39], [-.80, 1.40], [-1.20, 1.31], [-1.98, .99], [.70, .95]], ghW:1.56,
    roof:[[-.02, 1.35], [-.20, 1.405], [-.80, 1.415], [-1.10, 1.36], [-.95, 1.34], [-.15, 1.335]], roofW:1.24, tumbleY:.9, mirror:[.50, 1.02]},
  coupe:{name:'Coupé', sub:'Zwei Türen, lange Haube', F:2.26, Rr:-2.22, S:.28, R:.39, fA:1.40, rA:-1.30, wr:.34, W:1.88, nose:.62, tail:.62, tailY:.78,
    top:[[2.02, .76], [1.20, .86], [.42, .92], [-1.0, .95], [-1.88, .94], [-2.14, .92, -2.22, .82]],
    gh:[[.46, .91], [-.18, 1.26], [-.42, 1.31], [-.95, 1.30], [-1.32, 1.17], [-1.95, .95], [.46, .91]], ghW:1.54,
    roof:[[-.20, 1.27], [-.42, 1.325], [-.94, 1.315], [-1.18, 1.25], [-1.02, 1.235], [-.30, 1.24]], roofW:1.20, tumbleY:.88, mirror:[.25, .98]},
  super:{name:'Supersportler', short:'Supersport', sub:'Flach, breit, Motor in der Mitte', F:2.30, Rr:-2.26, S:.24, R:.38, fA:1.48, rA:-1.42, wr:.34, W:2.00, nose:.50, tail:.62, tailY:.76,
    top:[[2.02, .60], [1.25, .72], [.62, .80], [-.20, .88], [-1.55, .91], [-2.14, .90, -2.26, .80]],
    gh:[[.66, .79], [.05, 1.10], [-.22, 1.15], [-.72, 1.13], [-1.35, .93], [.66, .79]], ghW:1.46,
    roof:[[.03, 1.105], [-.22, 1.165], [-.70, 1.145], [-.86, 1.10], [-.20, 1.11]], roofW:1.10, tumbleY:.82, mirror:[.40, .90], wing:true},
  suv:{name:'SUV', sub:'Hoch, kräftig, große Räder', F:2.40, Rr:-2.38, S:.42, R:.45, fA:1.46, rA:-1.46, wr:.40, W:1.98, nose:.98, tail:.98, tailY:1.04,
    top:[[2.14, 1.04], [1.36, 1.11], [.82, 1.15], [-1.60, 1.17], [-2.30, 1.16], [-2.38, 1.08]],
    gh:[[.82, 1.14], [.16, 1.62], [-.08, 1.66], [-2.06, 1.64], [-2.28, 1.42], [-2.33, 1.16], [.82, 1.14]], ghW:1.70,
    roof:[[.14, 1.625], [-.08, 1.68], [-2.02, 1.66], [-2.12, 1.62], [-.10, 1.625]], roofW:1.46, tumbleY:1.16, mirror:[.55, 1.22], rails:true},
  kombi:{name:'Kombi', sub:'Lang, flach, viel Platz', F:2.42, Rr:-2.42, S:.30, R:.40, fA:1.46, rA:-1.48, wr:.34, W:1.86, nose:.66, tail:.70, tailY:.84,
    top:[[2.16, .80], [1.34, .90], [.70, .96], [-1.20, .99], [-2.28, .99], [-2.42, .92]],
    gh:[[.74, .95], [.06, 1.33], [-.18, 1.38], [-2.00, 1.37], [-2.32, 1.18], [-2.38, .99], [.74, .95]], ghW:1.58,
    roof:[[.04, 1.335], [-.18, 1.395], [-1.96, 1.385], [-2.10, 1.35], [-.20, 1.34]], roofW:1.30, tumbleY:.92, mirror:[.52, 1.02], rails:true},
  hatch:{name:'Kompakt', sub:'Kurz, wendig, frech', F:2.06, Rr:-2.00, S:.30, R:.38, fA:1.28, rA:-1.24, wr:.32, W:1.80, nose:.70, tail:.74, tailY:.88,
    top:[[1.82, .82], [1.10, .92], [.56, .97], [-1.00, 1.00], [-1.88, 1.00], [-2.00, .95]],
    gh:[[.60, .96], [-.04, 1.38], [-.26, 1.42], [-1.45, 1.40], [-1.86, 1.18], [-1.96, 1.00], [.60, .96]], ghW:1.54,
    roof:[[-.06, 1.385], [-.26, 1.435], [-1.42, 1.415], [-1.56, 1.38], [-.26, 1.385]], roofW:1.26, tumbleY:.95, mirror:[.40, 1.04], lip:true},
  klein:{name:'Kleinwagen', sub:'Alltagsheld, fünf Türen, steiles Heck', F:2.10, Rr:-2.10, S:.30, R:.37, fA:1.32, rA:-1.30, wr:.32, W:1.78, nose:.72, tail:.84, tailY:.94,
    top:[[1.88, .86], [1.18, .95], [.62, 1.00], [-1.00, 1.04], [-1.94, 1.05], [-2.07, 1.01, -2.10, .92]],
    gh:[[.64, .99], [-.02, 1.41], [-.22, 1.46], [-1.58, 1.46], [-1.90, 1.34], [-2.04, 1.05], [.64, .99]], ghW:1.52,
    roof:[[-.04, 1.415], [-.22, 1.475], [-1.56, 1.475], [-1.74, 1.43], [-.22, 1.42]], roofW:1.24, tumbleY:.99, mirror:[.42, 1.07],
    pillar:[[-1.32, 1.04], [-1.50, 1.40], [-1.64, 1.40], [-1.88, 1.30], [-2.02, 1.05]]},
  pickup:{name:'Pickup', sub:'Ladefläche, viel Bodenfreiheit', F:2.62, Rr:-2.62, S:.50, R:.46, fA:1.66, rA:-1.56, wr:.42, W:2.02, nose:1.08, tail:1.05, tailY:1.08,
    top:[[2.36, 1.14], [1.56, 1.19], [.96, 1.21], [-2.52, 1.21], [-2.62, 1.16]],
    gh:[[.96, 1.20], [.36, 1.72], [.10, 1.76], [-.86, 1.75], [-1.00, 1.66], [-1.02, 1.20], [.96, 1.20]], ghW:1.74,
    roof:[[.34, 1.725], [.10, 1.78], [-.84, 1.77], [-.92, 1.72], [.10, 1.725]], roofW:1.50, tumbleY:1.2, mirror:[.70, 1.28], bed:[-1.08, -2.50]}
};
const CAR_COLORS = {
  carbon:{name:'Carbonschwarz', hex:'#0e1d42', metal:1, rough:.40},
  black:{name:'Schwarz', hex:'#0a0b0d', metal:.9, rough:.32},
  white:{name:'Weiß', hex:'#e9ecf0', metal:.15, rough:.30},
  silver:{name:'Silber', hex:'#aeb4bc', metal:.85, rough:.30},
  grey:{name:'Grau', hex:'#6f757d', metal:.5, rough:.45},
  red:{name:'Rot', hex:'#b8121c', metal:.55, rough:.32},
  blue:{name:'Blau', hex:'#1a4fb5', metal:.75, rough:.32},
  green:{name:'Grün', hex:'#174a33', metal:.7, rough:.35},
  yellow:{name:'Gelb', hex:'#f2c21a', metal:.25, rough:.30},
  orange:{name:'Orange', hex:'#e8641e', metal:.35, rough:.30},
  purple:{name:'Lila', hex:'#5b2a86', metal:.8, rough:.32}
};
const carType = () => CAR_TYPES[prefs.carType] ? prefs.carType : 'limo';
const carColor = () => CAR_COLORS[prefs.carColor] ? prefs.carColor : 'carbon';
function carBodyPts(t){
  const {Rr, F, S, R, fA, rA} = t;
  return [[Rr + .08, S], [rA - R - .04, S], [rA - R, S + R * .8, rA, S + R], [rA + R, S + R * .8, rA + R + .04, S], [fA - R - .04, S],
    [fA - R, S + R * .8, fA, S + R], [fA + R, S + R * .8, fA + R + .04, S], [F - .12, S - .02], [F, S + .06, F, S + .22], [F - .02, t.nose],
    ...t.top, [Rr, t.tail], [Rr + .02, S + .10, Rr + .08, S]];
}
function buildCar(THREE, typeKey, colorKey){
  const t = CAR_TYPES[typeKey || carType()], col = CAR_COLORS[colorKey || carColor()];
  const g = new THREE.Group(), half = (t.F - t.Rr) / 2;
  const paint = new THREE.MeshPhysicalMaterial({color:new THREE.Color(col.hex), metalness:col.metal, roughness:col.rough, clearcoat:.65, clearcoatRoughness:.07, envMapIntensity:.9});
  const glass = new THREE.MeshPhysicalMaterial({color:0x020305, metalness:.1, roughness:.03, clearcoat:1, clearcoatRoughness:.02, envMapIntensity:.8});
  const black = new THREE.MeshStandardMaterial({color:0x07090c, metalness:.2, roughness:.55});
  const tire = new THREE.MeshStandardMaterial({color:0x050505, roughness:.92});
  const rim = new THREE.MeshStandardMaterial({color:0x1d2127, metalness:.9, roughness:.25});
  const head = new THREE.MeshStandardMaterial({color:0xeaf2ff, emissive:0xdbe8ff, emissiveIntensity:1.6});
  const tail = new THREE.MeshStandardMaterial({color:0xff2a2a, emissive:0xff1010, emissiveIntensity:1.8});
  const extrude = (pts, width, bevel, mat, tumbleOn, zOff = 0) => {
    const sh = new THREE.Shape(); sh.moveTo(pts[0][0], pts[0][1]);
    let cx = pts[0][0], cy = pts[0][1];
    for(let i = 1; i < pts.length; i++){
      const p = pts[i];
      if(p.length === 4){ sh.quadraticCurveTo(p[0], p[1], p[2], p[3]); cx = p[2]; cy = p[3]; continue; }
      const n = Math.max(1, Math.ceil(Math.hypot(p[0] - cx, p[1] - cy) / .12));
      for(let k = 1; k <= n; k++) sh.lineTo(cx + (p[0] - cx) * k / n, cy + (p[1] - cy) * k / n);
      cx = p[0]; cy = p[1];
    }
    const geo = new THREE.ExtrudeGeometry(sh, {depth:width - 2 * bevel, bevelEnabled:true, bevelThickness:bevel, bevelSize:bevel * .7, bevelSegments:5, curveSegments:18});
    geo.translate(0, 0, -(width - 2 * bevel) / 2 + zOff);
    const pos = geo.attributes.position, mid = (t.F + t.Rr) / 2;
    for(let i = 0; i < pos.count; i++){
      const x = pos.getX(i) - mid, y = pos.getY(i);
      const ends = Math.max(0, (Math.abs(x) - (half - .8)) / .9), taper = 1 - .16 * ends * ends;
      const tumble = tumbleOn && y > t.tumbleY ? 1 - .30 * Math.min(1, (y - t.tumbleY) / .5) : 1;
      pos.setZ(i, pos.getZ(i) * taper * tumble);
    }
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, mat);
  };
  g.add(extrude(carBodyPts(t), t.W, .14, paint));
  const gm = extrude(t.gh, t.ghW, .12, glass, true); gm.position.y = .005; g.add(gm);
  const rf = extrude(t.roof, t.roofW, .05, paint, true); rf.position.y = .05; g.add(rf);   // liegt über der Glaskante, damit das Dach lackiert wirkt
  [-1, 1].forEach(sd => { const m = new THREE.Mesh(new THREE.BoxGeometry(.22, .11, .14), paint); m.position.set(t.mirror[0], t.mirror[1], sd * (t.W / 2 + .02)); g.add(m); });
  const wGeo = new THREE.CylinderGeometry(t.wr, t.wr, .26, 36); wGeo.rotateX(Math.PI / 2);
  const rGeo = new THREE.CylinderGeometry(t.wr * .7, t.wr * .7, .265, 24); rGeo.rotateX(Math.PI / 2);
  const tz = t.W / 2 - .12;
  [[t.fA, 1], [t.fA, -1], [t.rA, 1], [t.rA, -1]].forEach(([x, sd]) => {
    const w = new THREE.Mesh(wGeo, tire); w.position.set(x, t.wr, sd * tz); g.add(w);
    const r = new THREE.Mesh(rGeo, rim); r.position.set(x, t.wr, sd * (tz + .01)); g.add(r);
  });
  [-1, 1].forEach(sd => {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(.10, .06, .40), head); hl.position.set(t.F + .04, t.nose - .02, sd * (t.W / 2 - .36)); hl.rotation.y = sd * -.18; g.add(hl);
    const tl = new THREE.Mesh(new THREE.BoxGeometry(.06, .08, .44), tail); tl.position.set(t.Rr - .08, t.tailY, sd * (t.W / 2 - .36)); tl.rotation.y = sd * .12; g.add(tl);
  });
  const v = new THREE.Mesh(new THREE.BoxGeometry(.05, .14, t.W * .6), black); v.position.set(t.F + .08, t.S + .12, 0); g.add(v);
  const d = new THREE.Mesh(new THREE.BoxGeometry(.06, .10, t.W * .65), black); d.position.set(t.Rr - .07, t.S + .08, 0); g.add(d);
  if(t.wing){   // Heckflügel
    const wing = new THREE.Mesh(new THREE.BoxGeometry(.34, .04, t.W * .92), paint); wing.position.set(t.Rr + .22, 1.14, 0); wing.rotation.z = .06; g.add(wing);
    [-1, 1].forEach(sd => { const st = new THREE.Mesh(new THREE.BoxGeometry(.06, .24, .05), black); st.position.set(t.Rr + .26, 1.01, sd * .55); g.add(st); });
  }
  if(t.rails) [-1, 1].forEach(sd => { const r2 = new THREE.Mesh(new THREE.BoxGeometry(Math.abs(t.roof[2][0] - t.roof[0][0]) + .1, .04, .05), black); r2.position.set((t.roof[0][0] + t.roof[2][0]) / 2, t.roof[1][1] + .04, sd * (t.roofW / 2 - .06)); g.add(r2); });
  if(t.pillar) [-1, 1].forEach(sd => { const pm = extrude(t.pillar, .16, .04, paint, true, sd * (t.ghW / 2 - .05)); pm.position.y = .006; g.add(pm); });   // breite Dachsäule hinten in Wagenfarbe, nur an den Seiten
  if(t.lip){ const lp = new THREE.Mesh(new THREE.BoxGeometry(.24, .04, t.roofW * .9), paint); lp.position.set(t.roof[2][0] - .02, t.roof[2][1] + .01, 0); g.add(lp); }
  if(t.bed){   // offene Ladefläche
    const bd = new THREE.Mesh(new THREE.BoxGeometry(t.bed[0] - t.bed[1], .03, t.W - .5), black); bd.position.set((t.bed[0] + t.bed[1]) / 2, t.top[2][1] + .105, 0); g.add(bd);
  }
  return g;
}
// Seitenansicht als SVG – für die Auswahl und das Profil
function carSideSVG(typeKey, colorKey, cls = ''){
  const t = CAR_TYPES[typeKey] || CAR_TYPES.limo, c = CAR_COLORS[colorKey] || CAR_COLORS.carbon;
  const path = pts => pts.map((p, i) => i === 0 ? `M${p[0]} ${-p[1]}` : p.length === 4 ? `Q${p[0]} ${-p[1]} ${p[2]} ${-p[3]}` : `L${p[0]} ${-p[1]}`).join('') + 'Z';
  const x0 = t.Rr - .25, x1 = t.F + .25, top = Math.max(...t.gh.map(p => p[1]), ...(t.wing ? [1.2] : [])) + .1, id = 'cg' + typeKey + colorKey;
  const wheel = x => `<circle cx="${x}" cy="${-t.wr}" r="${t.wr}" fill="#0b0c0e"/><circle cx="${x}" cy="${-t.wr}" r="${t.wr * .62}" fill="#3a3f47"/><circle cx="${x}" cy="${-t.wr}" r="${t.wr * .18}" fill="#14171b"/>`;
  return `<svg class="car-side ${cls}" viewBox="${x0} ${-top} ${x1 - x0} ${top + .04}" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient></defs>
    <ellipse cx="${(t.F + t.Rr) / 2}" cy="0" rx="${(t.F - t.Rr) / 2 + .1}" ry=".05" fill="#000" opacity=".35"/>
    ${t.wing ? `<rect x="${t.Rr + .05}" y="${-1.16}" width=".36" height=".05" fill="${c.hex}"/><rect x="${t.Rr + .22}" y="${-1.12}" width=".05" height=".24" fill="#111"/>` : ''}
    <path d="${path(t.gh)}" fill="#7d8aa0"/><path d="${path(t.gh)}" fill="url(#${id})" opacity=".8"/>${t.pillar ? `<path d="${path(t.pillar)}" fill="${c.hex}"/>` : ''}<path d="${path(t.roof)}" fill="${c.hex}"/>
    <path d="${path(carBodyPts(t))}" fill="${c.hex}"/><path d="${path(carBodyPts(t))}" fill="url(#${id})"/>
    <rect x="${t.F - .12}" y="${-(t.nose + .03)}" width=".14" height=".06" rx=".02" fill="#eaf2ff"/><rect x="${t.Rr - .02}" y="${-(t.tailY + .05)}" width=".1" height=".08" rx=".02" fill="#ff3030"/>
    ${wheel(t.fA)}${wheel(t.rA)}</svg>`;
}
function carRebuild(){
  const L = car3d.layer; if(!L || !window.THREE) return;
  L.scene.remove(L.car);
  L.car.traverse(o => { if(o.geometry) o.geometry.dispose(); });
  const t = CAR_TYPES[carType()];
  L.car = buildCar(window.THREE); const sh = carShadow(window.THREE, t); L.car.add(sh); L.scene.add(L.car);
  if(mapReady) map.triggerRepaint();
}
function carApplyAll(){
  carRebuild();
  document.querySelectorAll('.me svg.car, .rp-car svg.car').forEach(el => { el.outerHTML = carSVG('car'); });
}

/* Auto-Auswahl: drehbare 3D-Vorschau, Karosserie und Lack */
const cp = {type:null, color:null, r:null, raf:0, ang:.6, drag:null};
function openCarPicker(){
  cp.type = carType(); cp.color = carColor();
  $('#modal').innerHTML = `<div class="dlg car-dlg" role="dialog" aria-modal="true" aria-label="Auto wählen">
    <div class="top" style="padding:12px 14px"><button class="txtbtn" data-cp="cancel">Abbrechen</button><strong style="font-size:17px">Dein Auto</strong><button class="txtbtn bold" data-cp="save">Fertig</button></div>
    <div class="pad" style="padding-top:0;gap:14px">
      <div class="cp-stage" id="cpStage"><canvas id="cpCanvas"></canvas><div class="cp-fallback" id="cpFallback"></div><span class="cp-hint">Zum Drehen ziehen</span></div>
      <div class="cp-name"><b id="cpName"></b><span id="cpSub"></span></div>
      <div class="cp-types" id="cpTypes"></div>
      <div class="st-h">Lack <em id="cpColName"></em></div>
      <div class="cp-colors" id="cpColors"></div>
    </div></div>`;
  $('#modal').hidden = false;
  cpRender(); cpStart();
}
function cpRender(){
  const t = CAR_TYPES[cp.type], c = CAR_COLORS[cp.color];
  $('#cpName').textContent = t.name; $('#cpSub').textContent = t.sub; $('#cpColName').textContent = c.name;
  $('#cpTypes').innerHTML = Object.entries(CAR_TYPES).map(([k, x]) => `<button class="cp-type${k === cp.type ? ' on' : ''}" data-cpt="${k}">${carSideSVG(k, cp.color)}<span>${esc(x.short || x.name)}</span></button>`).join('');
  $('#cpColors').innerHTML = Object.entries(CAR_COLORS).map(([k, x]) => `<button class="cp-col${k === cp.color ? ' on' : ''}" data-cpc="${k}" style="--c:${x.hex}" aria-label="${esc(x.name)}" title="${esc(x.name)}"></button>`).join('');
  if(!cp.r) $('#cpFallback').innerHTML = carSideSVG(cp.type, cp.color, 'big');
  cpCar();
}
async function cpStart(){
  try{ await loadThree(); }catch(e){ return; }
  const cv = $('#cpCanvas'); if(!cv || $('#modal').hidden) return;
  const THREE = window.THREE, st = $('#cpStage');
  const r = new THREE.WebGLRenderer({canvas:cv, antialias:true, alpha:true}); r.setPixelRatio(Math.min(2, devicePixelRatio || 1)); r.outputEncoding = THREE.sRGBEncoding;
  const scene = new THREE.Scene(); scene.environment = carEnv(THREE, r);
  scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x202020, .9)); const dl = new THREE.DirectionalLight(0xffffff, 1.4); dl.position.set(3, 8, 4); scene.add(dl);
  const cam = new THREE.PerspectiveCamera(28, 2, .1, 100);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(4.2, 48), new THREE.MeshBasicMaterial({color:0x000000, transparent:true, opacity:.18})); floor.rotation.x = -Math.PI / 2; scene.add(floor);
  cp.r = {r, scene, cam, THREE, car:null};
  $('#cpFallback').innerHTML = ''; st.classList.add('gl');
  cpCar();
  const loop = () => {
    if($('#modal').hidden || !$('#cpCanvas')){ cpStop(); return; }
    cp.raf = requestAnimationFrame(loop);
    const w = st.clientWidth, h = st.clientHeight;
    if(cv.width !== Math.round(w * r.getPixelRatio())){ r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
    if(!cp.drag) cp.ang += .006;
    const len = CAR_TYPES[cp.type].F - CAR_TYPES[cp.type].Rr, d = 3.1 + len * 1.15;
    cam.position.set(Math.cos(cp.ang) * d, 1.55 + len * .18, Math.sin(cp.ang) * d); cam.lookAt(0, .62, 0);
    r.render(scene, cam);
  };
  loop();
}
function cpCar(){
  const R = cp.r; if(!R) return;
  if(R.car){ R.scene.remove(R.car); R.car.traverse(o => { if(o.geometry) o.geometry.dispose(); }); }
  const t = CAR_TYPES[cp.type];
  R.car = buildCar(R.THREE, cp.type, cp.color); R.car.position.x = -(t.F + t.Rr) / 2; R.car.add(carShadow(R.THREE, t)); R.scene.add(R.car);
}
function cpStop(){ cancelAnimationFrame(cp.raf); cp.raf = 0; if(cp.r){ try{ cp.r.r.dispose(); }catch(e){} cp.r = null; } }
$('#modal').addEventListener('click', e => {
  if(!$('#modal .car-dlg')) return;
  const tb = e.target.closest('[data-cpt]'); if(tb){ cp.type = tb.dataset.cpt; cpRender(); return; }
  const cb = e.target.closest('[data-cpc]'); if(cb){ cp.color = cb.dataset.cpc; cpRender(); return; }
  const b = e.target.closest('[data-cp]'); if(!b) return;
  if(b.dataset.cp === 'save'){
    const ch = prefs.carType !== cp.type || prefs.carColor !== cp.color;
    prefs.carType = cp.type; prefs.carColor = cp.color; savePrefs();
    if(ch){ carApplyAll(); toast(`${CAR_TYPES[cp.type].name} in ${CAR_COLORS[cp.color].name} – steht bereit`); if(grp()) pushMember().catch(() => {}); }
  }
  cpStop(); openSettings();
});
$('#modal').addEventListener('pointerdown', e => { const st = e.target.closest('#cpStage'); if(!st) return; cp.drag = {x:e.clientX, a:cp.ang}; try{ st.setPointerCapture(e.pointerId); }catch(_){} });
$('#modal').addEventListener('pointermove', e => { if(cp.drag) cp.ang = cp.drag.a - (e.clientX - cp.drag.x) / 90; });
['pointerup', 'pointercancel'].forEach(n => $('#modal').addEventListener(n, () => { cp.drag = null; }));

/* ================= 3D-Auto (three.js, wird erst im Cockpit geladen) ================= */
function carEnv(THREE, renderer){
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const x = c.getContext('2d'), gr = x.createLinearGradient(0, 0, 0, 128);
  gr.addColorStop(0, '#93a7cf'); gr.addColorStop(.42, '#4f6286'); gr.addColorStop(.5, '#1e2430'); gr.addColorStop(1, '#07080b');
  x.fillStyle = gr; x.fillRect(0, 0, 256, 128);
  x.fillStyle = 'rgba(255,255,255,.9)'; x.fillRect(60, 20, 40, 10); x.fillRect(170, 26, 30, 8);
  const tex = new THREE.CanvasTexture(c); tex.mapping = THREE.EquirectangularReflectionMapping;
  const pm = new THREE.PMREMGenerator(renderer); const env = pm.fromEquirectangular(tex).texture; pm.dispose(); tex.dispose();
  return env;
}
function carShadow(THREE, t){
  t = t || CAR_TYPES[carType()];
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d'), gr = x.createRadialGradient(64, 64, 8, 64, 64, 64);
  gr.addColorStop(0, 'rgba(0,0,0,.65)'); gr.addColorStop(.6, 'rgba(0,0,0,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(t.F - t.Rr + .9, t.W + .8), new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c), transparent:true, depthWrite:false}));
  m.rotation.x = -Math.PI / 2; m.position.set((t.F + t.Rr) / 2, .02, 0); return m;
}

const car3d = {on:false, ready:false, loading:false, pos:null, brg:0, alt:0};
function loadThree(){
  return new Promise((res, rej) => {
    if(window.THREE) return res();
    const sc = document.createElement('script'); sc.src = 'lib/three.min.js'; sc.onload = res; sc.onerror = rej; document.head.appendChild(sc);
  });
}
async function enableCar3d(){
  if(car3d.ready){ document.body.classList.toggle('car3d', car3d.on); return; }
  if(car3d.loading || !mapReady) return;
  car3d.loading = true;
  try{ await loadThree(); addCarLayer(); car3d.ready = true; document.body.classList.toggle('car3d', car3d.on); map.triggerRepaint(); }
  catch(e){ /* Fallback: flaches Auto-Symbol bleibt */ }
  car3d.loading = false;
}
function addCarLayer(){
  const THREE = window.THREE;
  if(THREE.ColorManagement) THREE.ColorManagement.legacyMode = false;
  const rotX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  map.addLayer({
    id:'car3d', type:'custom', renderingMode:'3d',
    onAdd(m, gl){
      this.camera = new THREE.Camera(); this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({canvas:m.getCanvas(), context:gl, antialias:true});
      this.renderer.autoClear = false; this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.scene.environment = carEnv(THREE, this.renderer);
      this.scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x202020, .9));
      const dl = new THREE.DirectionalLight(0xffffff, 1.4); dl.position.set(3, 8, 4); this.scene.add(dl);
      this.car = buildCar(THREE); this.car.add(carShadow(THREE)); this.scene.add(this.car); car3d.layer = this;
    },
    render(gl, matrix){
      if(!car3d.on || !car3d.pos) return;
      const ll = car3d.pos, mc = maplibregl.MercatorCoordinate.fromLngLat([ll.lng, ll.lat], car3d.alt || 0);
      const ppm = 512 * Math.pow(2, map.getZoom()) / (40075016.686 * Math.cos(ll.lat * Math.PI / 180));
      const sc = mc.meterInMercatorCoordinateUnits() * Math.max(1, 86 / (4.7 * ppm));
      this.car.rotation.y = (90 - car3d.brg) * Math.PI / 180;
      const l = new THREE.Matrix4().makeTranslation(mc.x, mc.y, mc.z).scale(new THREE.Vector3(sc, -sc, sc)).multiply(rotX);
      const M = new THREE.Matrix4().fromArray(matrix).multiply(l);
      // echte Kameraposition im Auto-Raum, damit Lack-Reflexionen stimmen
      const cp = new THREE.Vector4(0, 0, 1, 0).applyMatrix4(M.clone().invert());
      if(Math.abs(cp.w) > 1e-12) this.camera.position.set(cp.x / cp.w, cp.y / cp.w, cp.z / cp.w);
      this.camera.updateMatrixWorld(true);
      this.camera.projectionMatrix = M.multiply(this.camera.matrixWorld);
      this.renderer.resetState(); this.renderer.render(this.scene, this.camera);
    }
  });
}

/* ================= Geister-Auto ================= */
let ghostM = null;
function progAt(splits, t){
  if(!splits || splits.length < 2) return 0;
  if(t <= 0) return 0;
  for(let i = 1; i < splits.length; i++) if(splits[i][1] >= t){
    const a = splits[i-1], b = splits[i], f = (t - a[1]) / ((b[1] - a[1]) || 1);
    return a[0] + f * (b[0] - a[0]);
  }
  return splits[splits.length - 1][0];
}
function hideGhost(){ if(ghostM){ ghostM.remove(); ghostM = null; } }
function updateGhost(){
  if(!onOff('ghost')){ hideGhost(); return; }
  const ar = ckOn ? activeRun() : null, best = ar && ghostRef(ar.cid);
  if(!ar || !best || !best.splits || best.splits.length < 2){ hideGhost(); return; }
  const el = runElapsed(ar.run), gp = progAt(best.splits, el);
  const a = ar.g.at(gp), b = ar.g.at(Math.min(ar.g.L, gp + 6)), pos = ar.g.toLL(a[0], a[1]);
  const brg = (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180 / Math.PI + 360) % 360;
  if(!ghostM){
    const e = document.createElement('div'); e.className = 'ghost';
    e.innerHTML = '<span class="ghost-car"></span><span class="ghost-tag"></span>';
    ghostM = new maplibregl.Marker({element:e, anchor:'center', rotationAlignment:'map', pitchAlignment:'map'}).setLngLat(LL(pos)).addTo(map);
  }
  const ge = ghostM.getElement(), gl = best.rival ? best.name : 'Bestzeit', rc = best.rival ? memberCar(best.dev) : null, ck = rc ? rc.t + rc.c : 'ghost';
  if(ge._ck !== ck){ ge._ck = ck; ge.querySelector('.ghost-car').innerHTML = rc ? carSVG('ghost', {c:rc.c, t:rc.t}) : carSVG('ghost'); }
  if(ge._gl !== gl){ ge._gl = gl; ge.querySelector('.ghost-tag').textContent = gl; ge.classList.toggle('rival', !!best.rival); }
  ghostM.setLngLat(LL(pos)); ghostM.setRotation(brg);
}

/* ================= Tempolimit (OpenStreetMap) ================= */
let limitCache = null, limitBusy = false, limitLastQ = 0, limitNow = null, limitWay = null;
const OVERPASS = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
async function limitFetch(pt){
  if(limitBusy || Date.now() - limitLastQ < 10000) return;
  limitBusy = true; limitLastQ = Date.now();
  const q = `[out:json][timeout:12];way(around:500,${pt.lat.toFixed(5)},${pt.lng.toFixed(5)})[highway~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street|road)$"];out tags geom;`;
  for(const base of OVERPASS){
    try{
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 14000);
      const r = await fetch(`${base}?data=${encodeURIComponent(q)}`, {signal:ctl.signal});
      clearTimeout(to);
      if(!r.ok) continue;
      const j = await r.json();
      const kx = Math.cos(pt.lat * Math.PI / 180) * 111320, ky = 110540;
      limitCache = {c:{...pt}, kx, ky, ways:(j.elements || []).filter(w => w.geometry && w.geometry.length > 1).map(w => ({id:w.id, tags:w.tags || {}, xy:w.geometry.map(g => [(g.lon - pt.lng) * kx, (g.lat - pt.lat) * ky])}))};
      break;
    }catch(e){}
  }
  limitBusy = false;
}
function parseLimit(tags, forward){
  let v = tags['maxspeed:' + (forward ? 'forward' : 'backward')] || tags.maxspeed;
  if(!v){
    const z = tags['zone:maxspeed'] || tags['source:maxspeed'] || tags['maxspeed:type'] || '';
    if(/urban/i.test(z)) v = '50'; else if(/rural/i.test(z)) v = '100'; else if(/motorway/i.test(z)) v = 'none';
    else { const m = z.match(/(\d{2,3})/); if(m) v = m[1]; }
  }
  if(!v && tags.highway === 'motorway') v = 'none';
  if(!v && tags.highway === 'living_street') v = 'walk';
  if(!v) return null;
  v = String(v).split(';')[0].trim();
  if(v === 'none') return {none:true};
  if(v === 'walk') return {v:7};
  const m = v.match(/^(\d+)\s*(mph)?/); if(!m) return null;
  return {v:m[2] ? Math.round(+m[1] * 1.609) : +m[1]};
}
function limitFix(pt){
  if(!ckOn) return;
  if(!limitCache || dist(limitCache.c, pt) > 350) limitFetch(pt);
  if(!limitCache){ showLimit(null); return; }
  const L = limitCache, p = [(pt.lng - L.c.lng) * L.kx, (pt.lat - L.c.lat) * L.ky], h = (ck.v || 0) > 2 ? ck.h : null;
  let best = null;
  for(const w of L.ways){
    const ow = w.tags.oneway === 'yes' || /^motorway/.test(w.tags.highway) || w.tags.junction === 'roundabout';
    for(let i = 1; i < w.xy.length; i++){
      const a = w.xy[i-1], b = w.xy[i], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx*dx + dy*dy; if(!l2) continue;
      const f = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2));
      const d = Math.hypot(a[0] + f * dx - p[0], a[1] + f * dy - p[1]); if(d > 30) continue;
      const sb = (Math.atan2(dx, dy) * 180 / Math.PI + 360) % 360;
      let diff = h == null ? 0 : Math.abs(((h - sb + 540) % 360) - 180);
      const forward = diff <= 90;
      let pen = 0;
      if(h != null){ const dd = ow ? diff : Math.min(diff, 180 - diff); if(dd > 40) pen = ow && diff > 120 ? 60 : 25; }
      const score = d + pen - (limitWay === w.id ? 6 : 0);
      if(!best || score < best.score) best = {score, w, forward};
    }
  }
  if(!best || best.score > 35){ showLimit(null); return; }
  limitWay = best.w.id;
  showLimit(parseLimit(best.w.tags, best.forward));
}
function showLimit(l){
  limitNow = l;
  const el = $('#ckLimit');
  if(!l){ el.classList.remove('show'); return; }
  el.classList.add('show'); el.classList.toggle('none', !!l.none); el.classList.toggle('small', !l.none && l.v >= 100);
  el.textContent = l.none ? '' : String(l.v);
  el.setAttribute('aria-label', l.none ? 'Kein Tempolimit' : `Tempolimit ${l.v} km/h`);
}

/* ================= Offline-Karten ================= */
const OKEY = 'meine-spots-offline', TILE_CACHE = 'tiles-saved', MAXT = 12000;
let offAreas = []; try{ offAreas = JSON.parse(localStorage.getItem(OKEY) || '[]'); }catch(e){ offAreas = []; }
const saveOff = () => { try{ localStorage.setItem(OKEY, JSON.stringify(offAreas)); }catch(e){} };
let offDetail = 16, offJob = null, offDelArmed = null;
const lon2x = (lon, z) => Math.floor((lon + 180) / 360 * 2 ** z);
const lat2y = (lat, z) => { const r = lat * Math.PI / 180; return Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * 2 ** z); };
// Vektorkacheln: im Speicher ohne Versionsnummer, damit sie nach einem Karten-Update weiter passen
const OFM_KEY = 'https://tiles.openfreemap.org/planet/_/{z}/{x}/{y}.pbf';
const DEM_TPL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';
const OFM_GLYPHS = ['Noto Sans Regular', 'Noto Sans Bold', 'Noto Sans Italic'].flatMap(f => ['0-255', '256-511', '8192-8447'].map(r => `https://tiles.openfreemap.org/fonts/${encodeURIComponent(f)}/${r}.pbf`));
function areaURLs(a){
  const out = [], [w, sB, e, n] = a.bbox;
  const grid = (tpl, z0, z1) => { for(let z = z0; z <= z1; z++){ const x0 = lon2x(w, z), x1 = lon2x(e, z), y0 = lat2y(n, z), y1 = lat2y(sB, z);
    for(let x = x0; x <= x1; x++) for(let y = y0; y <= y1; y++) out.push(tpl.replace('{z}', z).replace('{x}', x).replace('{y}', y)); } };
  const vecTiles = a.base === 'vec' || (a.base === 'sat' && a.labels && a.hyb);
  if(!BASES[a.base].vector){
    const tpl = [BASES[a.base].url, ...(a.labels && !vecTiles ? (a.base === 'sat' ? OVERLAYS : a.base === 'dark' ? [DARK_REF] : []) : [])];
    tpl.forEach(t => grid(t, 6, Math.min(a.maxZ, BASES[a.base].maxz || 19)));
  }
  if(vecTiles){ grid(OFM_KEY, 6, Math.min(a.maxZ, 14)); out.push(...OFM_GLYPHS); }
  if(a.base === 'vec') grid(DEM_TPL, 6, Math.min(a.maxZ, 11));
  return out;
}
function curArea(){
  const b = map.getBounds(), base = BASES[prefs.base] ? prefs.base : 'sat';
  return {bbox:[b.getWest(), b.getSouth(), b.getEast(), b.getNorth()], maxZ:offDetail, base, labels:(base === 'sat' || base === 'dark' || base === 'vec') && prefs.labels, hyb:base === 'sat' && useHybrid()};
}
function offEstimate(a){
  const n = areaURLs(a).length, perTile = a.base === 'vec' ? 18 : a.labels ? (a.base === 'sat' ? (a.hyb ? BASES.sat.kb * .85 : (BASES.sat.kb + 2 * 7) / 3) : (BASES[a.base].kb + 6) / 2) : BASES[a.base].kb;
  return {n, mb: n * perTile / 1024};
}
const fmtMB = mb => mb < 1 ? `${Math.max(1, Math.round(mb * 1024))} KB` : mb < 100 ? `${mb.toFixed(1).replace('.', ',')} MB` : `${Math.round(mb)} MB`;
function openOffline(){
  $('#layersPop').hidden = true; $('#b-layers').classList.remove('on');
  renderOffline(); $('#modal').hidden = false;
}
function renderOffline(){
  const ok = 'caches' in window && 'serviceWorker' in navigator;
  const a = curArea(), est = offEstimate(a), tooBig = est.n > MAXT;
  const rows = offAreas.map(x => `<div class="off-row"><div class="tx"><b>${esc(x.name)}</b><span>${BASES[x.base].name} · bis Zoom ${x.maxZ} · ${fmtMB(x.bytes / 1048576)} · ${new Date(x.date).toLocaleDateString('de-DE', {day:'numeric', month:'short'})}</span></div>
    <button class="icon-btn" data-off="show" data-id="${x.id}" aria-label="Auf Karte zeigen">${svg(UI.locate, 15)}</button>
    <button class="lb-del${offDelArmed === x.id ? ' armed' : ''}" data-off="del" data-id="${x.id}" aria-label="Löschen">${svg(UI.close, 12)}</button></div>`).join('');
  const prog = offJob ? `<div class="off-bar"><i style="width:${Math.round(offJob.done / offJob.total * 100)}%"></i></div>
      <div class="off-est">${offJob.done.toLocaleString('de-DE')} / ${offJob.total.toLocaleString('de-DE')} Kacheln · ${fmtMB(offJob.bytes / 1048576)}${offJob.fail ? ` · ${offJob.fail} fehlgeschlagen` : ''}</div>
      <button class="btn" data-off="cancel">Abbrechen</button>` : '';
  $('#modal').innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-label="Offline-Karten">
    <div class="top" style="padding:12px 14px"><strong style="font-size:17px">Offline-Karten</strong><button class="txtbtn bold" data-off="close">Fertig</button></div>
    <div class="pad" style="padding-top:4px">
      ${ok ? '' : '<div class="muted">Dein Browser unterstützt keine Offline-Speicherung.</div>'}
      <div class="muted">Speichert den sichtbaren Kartenausschnitt (${BASES[a.base].name}${a.labels ? ' mit Beschriftung' : ''}), damit die Karte auch ohne Netz funktioniert.</div>
      <div class="off-seg">
        <button data-od="14" class="${offDetail === 14 ? 'on' : ''}">Grob<small>bis Zoom 14</small></button>
        <button data-od="16" class="${offDetail === 16 ? 'on' : ''}">Standard<small>bis Zoom 16</small></button>
        <button data-od="17" class="${offDetail === 17 ? 'on' : ''}">Detail<small>bis Zoom 17</small></button>
      </div>
      ${offJob ? prog : `<div class="off-est">≈ ${est.n.toLocaleString('de-DE')} Kacheln · ≈ ${fmtMB(est.mb)}${tooBig ? ' – zu groß, zoom weiter rein oder wähle weniger Detail' : ''}</div>
      <button class="btn primary" data-off="save" ${ok && !tooBig ? '' : 'disabled style="opacity:.45"'}>Ausschnitt speichern</button>`}
      ${rows ? `<div class="card" style="padding:4px 14px">${rows}</div>` : '<div class="muted">Noch keine Gebiete gespeichert.</div>'}
    </div></div>`;
}
async function offSave(){
  const a = curArea(), urls = areaURLs(a);
  if(urls.length > MAXT) return;
  try{ navigator.storage && navigator.storage.persist && navigator.storage.persist(); }catch(e){}
  let name = 'Gebiet ' + new Date().toLocaleDateString('de-DE', {day:'numeric', month:'short'});
  try{
    const c = map.getCenter();
    const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=de&lat=${c.lat}&lon=${c.lng}`);
    const j = await r.json(), ad = j.address || {};
    name = ad.city || ad.town || ad.village || ad.municipality || ad.county || name;
  }catch(e){}
  let ofmTpl = null;
  if(urls.some(u => u.startsWith('https://tiles.openfreemap.org/planet/_/'))){
    try{ const tj = await (await fetch(VEC_SRC)).json(); ofmTpl = tj.tiles[0]; }catch(e){ toast('Die Clean-Karte ist gerade nicht erreichbar.'); return; }
  }
  const src = u => ofmTpl && u.startsWith('https://tiles.openfreemap.org/planet/_/') ? ofmTpl.replace('{z}/{x}/{y}', u.split('/_/')[1].replace('.pbf', '')) : u;
  const job = offJob = {total:urls.length, done:0, bytes:0, fail:0, stop:false};
  renderOffline();
  const cache = await caches.open(TILE_CACHE);
  let i = 0;
  const worker = async () => {
    while(!job.stop && i < urls.length){
      const u = urls[i++];
      try{
        let hit = await cache.match(u);
        if(!hit){
          const r = await fetch(src(u), {mode:'cors'});
          if(!r.ok) throw 0;
          const b = await r.blob();
          await cache.put(u, new Response(b, {headers:{'content-type':r.headers.get('content-type') || 'image/jpeg'}}));
          job.bytes += b.size;
        } else job.bytes += (await hit.blob()).size;
      }catch(e){ job.fail++; }
      job.done++;
      if(job.done % 25 === 0 && !$('#modal').hidden && $('#modal [data-off="cancel"]')) renderOffline();
    }
  };
  await Promise.all(Array.from({length:6}, worker));
  offJob = null;
  if(job.stop){ toast('Download abgebrochen'); }
  else if(job.fail > urls.length * .5){ toast(`Download fehlgeschlagen – ${job.fail} von ${urls.length} Kacheln kamen nicht an. Prüfe dein Internet.`); }
  else {
    offAreas.unshift({id:uid(), name, ...a, n:urls.length, bytes:job.bytes, date:Date.now()}); saveOff();
    toast(`„${name}“ offline gespeichert${job.fail ? ` (${job.fail} Kacheln fehlen)` : ''}`);
  }
  if(!$('#modal').hidden && $('#modal [aria-label="Offline-Karten"]')) renderOffline();
}
async function offDelete(id){
  const a = offAreas.find(x => x.id === id); if(!a) return;
  offAreas = offAreas.filter(x => x.id !== id); saveOff();
  const keep = new Set(offAreas.flatMap(areaURLs));
  try{ const cache = await caches.open(TILE_CACHE); await Promise.all(areaURLs(a).filter(u => !keep.has(u)).map(u => cache.delete(u))); }catch(e){}
  toast(`„${a.name}“ gelöscht`);
}
$('#b-offline').addEventListener('click', e => { e.stopPropagation(); openOffline(); });
$('#modal').addEventListener('click', e => {
  if(!$('#modal [aria-label="Offline-Karten"]')) return;
  const od = e.target.closest('[data-od]');
  if(od){ if(!offJob){ offDetail = +od.dataset.od; renderOffline(); } return; }
  const b = e.target.closest('[data-off]'); if(!b || b.disabled) return;
  const a = b.dataset.off;
  if(a === 'close'){ $('#modal').hidden = true; }
  if(a === 'save') offSave();
  if(a === 'cancel' && offJob){ offJob.stop = true; }
  if(a === 'show'){ const x = offAreas.find(y => y.id === b.dataset.id); if(x){ $('#modal').hidden = true; map.fitBounds([[x.bbox[0], x.bbox[1]], [x.bbox[2], x.bbox[3]]], {padding:camPad(), duration:1000}); } }
  if(a === 'del'){
    if(offDelArmed !== b.dataset.id){ offDelArmed = b.dataset.id; renderOffline(); setTimeout(() => { if(offDelArmed === b.dataset.id){ offDelArmed = null; if(!$('#modal').hidden && $('#modal [aria-label="Offline-Karten"]')) renderOffline(); } }, 3000); return; }
    offDelArmed = null; offDelete(b.dataset.id).then(() => { if(!$('#modal').hidden) renderOffline(); });
  }
});

/* ================= Navigation ================= */
let nav = null, navPrevOn = false;
const ROUTERS = ['https://router.project-osrm.org/route/v1/driving/', 'https://routing.openstreetmap.de/routed-car/route/v1/driving/'];
async function osrm(pts, q = ''){
  const co = pts.map(p => `${p.lng.toFixed(6)},${p.lat.toFixed(6)}`).join(';');
  for(const base of ROUTERS){
    try{
      const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 12000);
      const r = await fetch(`${base}${co}?overview=full&geometries=geojson&steps=true${q}`, {signal:ctl.signal});
      clearTimeout(to);
      const j = await r.json();
      if(j.code === 'Ok' && j.routes && j.routes[0] && j.routes[0].geometry.coordinates.length > 1) return j.routes;
    }catch(e){}
  }
  return null;
}
async function fetchRoute(a, b){ const rs = await osrm([a, b]); return rs ? rs[0] : null; }
// Landstraßen-Route: Valhalla (FOSSGIS, ohne Key) mit „Autobahn meiden“, Antwort im OSRM-Format
async function valhalla(pts, noHighway){
  const q = {locations:pts.map(p => ({lat:+p.lat.toFixed(6), lon:+p.lng.toFixed(6), ...(p.sh ? {type:'through'} : {})})), costing:'auto', costing_options:{auto:{use_highways:noHighway ? 0 : 1}},
    directions_options:{units:'kilometers', language:'de-DE'}, format:'osrm', shape_format:'geojson'};
  try{
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 15000);
    const r = await fetch('https://valhalla1.openstreetmap.de/route?json=' + encodeURIComponent(JSON.stringify(q)), {signal:ctl.signal});
    clearTimeout(to);
    const j = await r.json();
    if(j.routes && j.routes[0] && j.routes[0].geometry && j.routes[0].geometry.coordinates && j.routes[0].geometry.coordinates.length > 1) return j.routes;
  }catch(e){}
  return null;
}
// Wie viele Meter laufen über Autobahn?
const mwM = r => { let m = 0; (r.legs || []).forEach(l => (l.steps || []).forEach(x => { if((x.intersections || []).some(i => (i.classes || []).includes('motorway')) || /^A\s?\d/.test(x.ref || '')) m += x.distance; })); return m; };
// Schnellste Route und eine ohne Autobahn (falls der Server das nicht kann: die Alternative mit am wenigsten Autobahn)
async function navRoutes(pts){
  let [fr, lr] = await Promise.all([osrm(pts, pts.length === 2 ? '&alternatives=true' : ''), valhalla(pts, true)]);
  if(!fr) fr = await valhalla(pts, false);
  if(!fr) return null;
  const fast = fr[0]; let land = lr ? lr[0] : null;
  if(land && mwM(land) > mwM(fast) * .5) land = null;   // Ausschluss hat nicht gegriffen
  if(!land && fr.length > 1){ const alt = fr.slice(1).sort((x, y) => mwM(x) - mwM(y))[0]; if(mwM(alt) < mwM(fast) * .5) land = alt; }
  if(land && mwM(fast) < 800) land = null;   // die schnellste fährt eh keine Autobahn
  return {fast, land};
}
function prepRoute(r, viaNames = []){
  const coords = r.geometry.coordinates;
  const lat0 = coords[0][1], lng0 = coords[0][0], kx = Math.cos(lat0 * Math.PI / 180) * 111320, ky = 110540;
  const xy = coords.map(q => [(q[0] - lng0) * kx, (q[1] - lat0) * ky]), cum = [0];
  for(let i = 1; i < xy.length; i++) cum.push(cum[i-1] + Math.hypot(xy[i][0] - xy[i-1][0], xy[i][1] - xy[i-1][1]));
  const L = cum[cum.length - 1] || 1;
  const legs = r.legs || [], total = legs.reduce((t, l) => t + (l.steps || []).reduce((a, x) => a + x.distance, 0), 0) || 1, sc = L / total;
  let acc = 0; const steps = [], viaAt = [];
  legs.forEach((l, li) => {
    (l.steps || []).forEach(x => {
      const st = {type:x.maneuver.type, mod:x.maneuver.modifier, exit:x.maneuver.exit, name:x.name || '', ref:x.ref || '', dest:x.destinations || '', exits:x.exits || '', dur:x.duration, start:acc * sc};
      if(st.type === 'arrive' && li < legs.length - 1){ st.via = viaNames[li] || 'Zwischenstopp'; }
      if(st.type === 'depart' && li > 0) st.cont = true;
      acc += x.distance; st.end = acc * sc; steps.push(st);
    });
    if(li < legs.length - 1) viaAt.push(acc * sc);
  });
  return {coords, xy, cum, L, steps, viaAt, dur:r.duration, dist:r.distance, mw:mwM(r),
    toXY:(lng, lat) => [(lng - lng0) * kx, (lat - lat0) * ky], toLL:(x, y) => ({lng:x / kx + lng0, lat:y / ky + lat0})};
}
function routeProject(R, p, near, back, ahead){
  let best = {along:0, off:Infinity, i:1, x:0, y:0};
  for(let i = 1; i < R.xy.length; i++){
    if(near != null && (R.cum[i] < near - back || R.cum[i-1] > near + ahead)) continue;
    const a = R.xy[i-1], b = R.xy[i], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx*dx + dy*dy;
    const f = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
    const x = a[0] + f * dx, y = a[1] + f * dy, off = Math.hypot(x - p[0], y - p[1]);
    if(off < best.off) best = {along:R.cum[i-1] + f * Math.sqrt(l2), off, i, x, y};
  }
  return best;
}
function navSnap(pt){
  const R = nav.route, p = R.toXY(pt.lng, pt.lat), pr = routeProject(R, p, nav.prog, 40, 260);
  if(pr.off > 30) return null;
  let i = pr.i, a = R.xy[i-1], b = R.xy[i];
  while(Math.hypot(b[0] - a[0], b[1] - a[1]) < 2 && i < R.xy.length - 1){ i++; a = R.xy[i-1]; b = R.xy[i]; }
  const brg = Math.hypot(b[0] - a[0], b[1] - a[1]) < 2 ? null : (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180 / Math.PI + 360) % 360;
  return {pt:R.toLL(pr.x, pr.y), brg};
}
function remainingCoords(R, prog){
  let i = 1; while(i < R.cum.length - 1 && R.cum[i] < prog) i++;
  const a = R.xy[i-1], b = R.xy[i], seg = (R.cum[i] - R.cum[i-1]) || 1, f = Math.max(0, Math.min(1, (prog - R.cum[i-1]) / seg));
  const s0 = R.toLL(a[0] + f * (b[0] - a[0]), a[1] + f * (b[1] - a[1]));
  return [[s0.lng, s0.lat], ...R.coords.slice(i)];
}
const routeFC = coords => FC(coords.length > 1 ? [{type:'Feature', properties:{}, geometry:{type:'LineString', coordinates:coords}}] : []);

/* Anweisungen */
const DIRW = {left:'links', right:'rechts', 'slight left':'leicht links', 'slight right':'leicht rechts', 'sharp left':'scharf links', 'sharp right':'scharf rechts', straight:'geradeaus', uturn:'wenden'};
const cap = t => t ? t[0].toUpperCase() + t.slice(1) : t;
const low = t => t ? t[0].toLowerCase() + t.slice(1) : t;
const isMan = st => st.type === 'arrive' || !(['new name','continue','notification'].includes(st.type) && (!st.mod || st.mod === 'straight'));
function instr(st){
  if(!st) return '';
  const road = st.name || st.ref, onto = road ? ` auf ${road}` : '', d = DIRW[st.mod] || '';
  const toward = st.dest ? ` Richtung ${st.dest.split(',')[0].split(':').pop().trim()}` : onto;
  switch(st.type){
    case 'depart': return st.cont ? (road ? `Weiterfahren auf ${road}` : 'Weiterfahren') : road ? `Losfahren auf ${road}` : 'Losfahren';
    case 'arrive': if(st.via) return `Zwischenstopp: ${st.via}`; return st.mod === 'left' ? 'Ziel liegt links' : st.mod === 'right' ? 'Ziel liegt rechts' : 'Ziel erreicht';
    case 'end of road': return `Am Ende der Straße ${d.replace('leicht ', '').replace('scharf ', '') || 'abbiegen'} abbiegen${onto}`.replace('abbiegen abbiegen', 'abbiegen');
    case 'turn': return st.mod === 'uturn' ? 'Wenden' : st.mod === 'straight' ? `Geradeaus weiter${onto}` : `${cap(d)} abbiegen${onto}`;
    case 'continue': case 'new name': return st.mod === 'uturn' ? 'Wenden' : /left|right/.test(st.mod || '') ? `${cap(d)} halten${onto}` : `Weiter${onto || ' geradeaus'}`;
    case 'merge': return `Einfädeln${onto}`;
    case 'on ramp': return `Auffahrt nehmen${toward}`;
    case 'off ramp': return `Ausfahrt${st.exits ? ' ' + st.exits.split(';')[0] : ''} nehmen${toward}`;
    case 'fork': return `An der Gabelung ${/left/.test(st.mod || '') ? 'links' : 'rechts'} halten${toward}`;
    case 'roundabout': case 'rotary': case 'roundabout turn': return st.exit ? `Im Kreisverkehr die ${st.exit}. Ausfahrt nehmen${onto}` : `In den Kreisverkehr fahren${onto}`;
    case 'exit roundabout': case 'exit rotary': return `Kreisverkehr verlassen${onto}`;
    default: return `Weiter${onto}`;
  }
}
const NAVI = {
  straight:'<path d="M12 20V5M6.5 10.5 12 5l5.5 5.5"/>',
  left:'<path d="M16 20v-6.5A4.5 4.5 0 0 0 11.5 9H5M9 5 5 9l4 4"/>',
  right:'<path d="M8 20v-6.5A4.5 4.5 0 0 1 12.5 9H19M15 5l4 4-4 4"/>',
  'slight left':'<path d="M14.5 20v-6L8.5 8M8 14V8h6"/>',
  'slight right':'<path d="M9.5 20v-6l6-6M10 8h6v6"/>',
  'sharp left':'<path d="M15 20V7L7 15M7 9v6h6"/>',
  'sharp right':'<path d="M9 20V7l8 8M11 15h6V9"/>',
  uturn:'<path d="M8 20v-9a4 4 0 0 1 8 0v4.5M12.5 12 16 15.5l3.5-3.5"/>',
  round:'<circle cx="12" cy="9" r="4.5"/><path d="M12 13.5V20M15.5 5.5 18.5 3M18.5 6V3h-3"/>',
  arrive:'<path d="M6 21V4h11l-2 4 2 4H6"/>'
};
const navIcon = st => !st ? NAVI.straight : st.type === 'arrive' ? NAVI.arrive : /roundabout|rotary/.test(st.type) ? NAVI.round : (NAVI[st.mod] || NAVI.straight);
const fmtNav = m => m < 25 ? 'Jetzt' : m < 100 ? `${Math.round(m / 10) * 10} m` : m < 975 ? `${Math.round(m / 50) * 50} m` : m < 10000 ? `${(m / 1000).toFixed(1).replace('.', ',')} km` : `${Math.round(m / 1000)} km`;
const fmtDurNav = sec => { const m = Math.max(1, Math.round(sec / 60)); return m < 60 ? `${m} Min` : `${Math.floor(m / 60)} h ${m % 60} Min`; };
const clock = sec => new Date(Date.now() + sec * 1000).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'});

function navState(){
  const R = nav.route, prog = nav.prog;
  let i = R.steps.findIndex((st, k) => k > 0 && st.start > prog - 3 && isMan(st));
  if(i < 0) i = R.steps.length - 1;
  const st = R.steps[i] || null, d = st ? Math.max(0, st.start - prog) : R.L - prog;
  let then = null;
  if(st) for(let k = i + 1; k < R.steps.length; k++) if(isMan(R.steps[k])){ if(R.steps[k].start - st.start < 220) then = R.steps[k]; break; }
  let rem = 0;
  R.steps.forEach(x => { if(x.end <= prog) return; const len = (x.end - x.start) || 1; rem += x.dur * Math.min(1, (x.end - Math.max(prog, x.start)) / len); });
  if(!R.steps.length) rem = R.dur * (1 - prog / R.L);
  return {i, st, d, then, remDist:Math.max(0, R.L - prog), remTime:rem};
}

/* Wetter entlang der Route: alle ~5 km, jeweils zur voraussichtlichen Durchfahrtszeit */
function routeAt(R, a){
  let i = 1; while(i < R.cum.length - 1 && R.cum[i] < a) i++;
  const sl = (R.cum[i] - R.cum[i-1]) || 1, f = Math.max(0, Math.min(1, (a - R.cum[i-1]) / sl)), A = R.xy[i-1], B = R.xy[i];
  return {i, ...R.toLL(A[0] + f * (B[0] - A[0]), A[1] + f * (B[1] - A[1]))};
}
function routeSlice(R, a, b){
  const p = routeAt(R, a), q = routeAt(R, b), out = [[p.lng, p.lat]];
  for(let k = p.i; k < q.i; k++) out.push(R.coords[k]);
  out.push([q.lng, q.lat]); return out;
}
async function rwNav(){
  if(!nav) return;
  const R = nav.route; nav.rw = null;
  const n = Math.min(25, Math.max(2, Math.ceil(R.L / 5000) + 1)), S = [];
  for(let k = 0; k < n; k++){ const a = R.L * k / (n - 1); S.push({a, ...routeAt(R, a)}); }
  const hs = await rwGet(S);
  if(!nav || nav.route !== R) return;
  const t0 = Date.now(), half = R.L / (n - 1) / 2, segs = [];
  S.forEach((q, k) => {
    const eta = R.dur * q.a / R.L, r = hs[k] ? rwAt(hs[k], t0 + eta * 1000) : null; if(!r) return;
    const a = Math.max(0, q.a - half), b = Math.min(R.L, q.a + half), last = segs[segs.length - 1];
    if(last && last.r.k === r.k && Math.abs(last.b - a) < 1) last.b = b; else segs.push({a, b, r, eta});
  });
  nav.rw = segs;
  if(navPrevOn) renderNavPrev();
  rwNavDraw();
}
function rwNavDraw(){
  if(!nav || !nav.rw){ setSrc('nav-wx', FC([])); return; }
  const R = nav.route, from = nav.active ? nav.prog : 0;
  setSrc('nav-wx', FC(nav.rw.filter(x => rwBad(x.r) && x.b > from + 5).map(x => ({type:'Feature', properties:{k:x.r.k, c:RWC[x.r.k] || '#ffffff'}, geometry:{type:'LineString', coordinates:routeSlice(R, Math.max(x.a, from), x.b)}}))));
}
function rwNavHTML(){
  if(!nav.rw) return `<div class="rw-route load"><div class="rw-bar"><i class="rwk-load" style="flex:1"></i></div><span class="rw-sum rwk-load">${svg(RWI.load, 15, 2.2)}Wetter auf der Strecke wird geladen …</span></div>`;
  if(!nav.rw.length) return '';
  const segs = nav.rw, L = nav.route.L, first = ks => segs.find(x => ks.includes(x.r.k));
  const where = x => x.a < 500 ? 'ab Start' : `ab km ${Math.round(x.a / 1000)} · ca. ${hhmm(new Date(Date.now() + x.eta * 1000))}`;
  const icy = first(['ice', 'snow', 'frost']), heavy = first(['heavy']), rain = first(['rain', 'heavy']);
  let k = 'dry', txt = 'Trocken auf der ganzen Strecke';
  if(icy){ k = icy.r.k; txt = `${icy.r.t} ${where(icy)}`; }
  else if(heavy){ k = 'heavy'; txt = `${heavy.r.t} ${where(heavy)}`; }
  else if(rain){ k = 'rain'; txt = `Regen auf ${fmtKmS(segs.filter(x => x.r.k === 'rain' || x.r.k === 'heavy').reduce((t, x) => t + x.b - x.a, 0))} · ${where(rain)}`; }
  else if(first(['wet'])){ k = 'wet'; txt = 'Teilweise nasse Straße'; }
  else if(first(['cold'])){ k = 'cold'; txt = 'Trocken, aber kalt – Brücken können glatt sein'; }
  return `<div class="rw-route"><div class="rw-bar">${segs.map(x => `<i class="rwk-${x.r.k}" style="flex:${Math.max(1, Math.round((x.b - x.a) / L * 1000))}"></i>`).join('')}</div><span class="rw-sum rwk-${k}">${svg(RWI[k], 15, 2.2)}${esc(txt)}</span></div>`;
}
/* Cockpit: Hinweis am eigenen Standort und – mit Navi – voraus auf der Route */
const rwCk = {t:0, r:null, warned:'', html:''};
async function rwCkCheck(){
  if(!ckOn || !me || Date.now() - rwCk.t < 10 * 60000) return;
  rwCk.t = Date.now();
  const [h] = await rwGet([me]); if(!ckOn) return;
  rwCk.r = h ? rwAt(h, Date.now()) : null;
  if(rwCk.r && rwCk.r.lv >= RW_LV.heavy && rwCk.warned !== rwCk.r.k){ rwCk.warned = rwCk.r.k; toast(`${rwCk.r.t}: ${rwCk.r.d}. Fahr vorsichtig.`); }
  rwCkRender();
}
function rwCkRender(){
  const el = $('#ckRoad'); if(!el) return;
  let k = null, txt = '';
  if(nav && nav.active && nav.rw){
    const x = nav.rw.find(q => q.b > nav.prog && rwBad(q.r));
    if(x){ k = x.r.k; txt = x.a <= nav.prog ? x.r.t : `${x.r.t} in ${fmtNav(x.a - nav.prog)}`; }
  }
  const r = rwCk.r;
  if(r && r.k !== 'dry' && (!k || r.lv > RW_LV[k])){ k = r.k; txt = r.t; }
  const wa = (!k || RW_LV[k] < RW_LV.rain) ? wildAhead() : null; if(wa){ k = 'wild'; txt = wa; }
  const html = k ? `<span class="rw-i">${svg(k === 'wild' ? WILD_IC : RWI[k], 15, 2.2)}</span><b>${esc(txt)}</b>` : '';
  el.hidden = !k || !ckOn;
  if(html !== rwCk.html){ rwCk.html = html; el.className = `glass rwk-${k || 'dry'}`; el.innerHTML = html; }
}

/* ================= Sperrungen auf der Route: Wintersperre, Durchfahrtsverbot, nur Anlieger, Baustelle (aus OpenStreetMap) ================= */
const BLK_IC = '<circle cx="12" cy="12" r="8.5"/><path d="M7.5 12h9"/>';
const BLK_MON = {Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11}, BLK_MDE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const BLK_DAY = {Mo:'Mo', Tu:'Di', We:'Mi', Th:'Do', Fr:'Fr', Sa:'Sa', Su:'So', PH:'Feiertag'};
const BLK_VAL = {no:'Durchfahrt verboten', destination:'Nur Anlieger', agricultural:'Nur Landwirtschaft', forestry:'Nur Forstwirtschaft', private:'Privatweg', delivery:'Nur Lieferverkehr', agricultural_forestry:'Nur Land- und Forstwirtschaft'};
const blkCondDE = c => c.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, m => BLK_MDE[BLK_MON[m]]).replace(/\b(Mo|Tu|We|Th|Fr|Sa|Su|PH)\b/g, m => BLK_DAY[m]).replace(/\b(Jan|Feb|Mär|Apr|Mai|Jun|Jul|Aug|Sep|Okt|Nov|Dez) (\d{1,2})\b/g, (m, mo, d) => `${+d}. ${mo}`).replace(/\s*-\s*/g, '–').replace(/;\s*/g, ', ');
function blkMonths(c){   // "Nov-Apr", "Nov 01-Apr 30" → aktiv in diesem Monat?
  const m = c.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b(?:\s*\d+)?\s*-\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
  if(!m) return null;
  const a = BLK_MON[m[1]], b = BLK_MON[m[2]], n = new Date().getMonth();
  return a <= b ? n >= a && n <= b : n >= a || n <= b;
}
const blkWinter = () => { const n = new Date().getMonth(); return n >= 10 || n <= 2; };
function blkClassify(t){
  const out = [];
  for(const k of ['motor_vehicle:conditional', 'motorcar:conditional', 'vehicle:conditional', 'access:conditional']){
    if(!t[k]) continue;
    t[k].split(/;(?![^(]*\))/).forEach(rule => {
      const m = rule.match(/^\s*([a-z_]+)\s*@\s*\(?(.+?)\)?\s*$/); if(!m || !BLK_VAL[m[1]]) return;
      const mon = blkMonths(m[2]), wint = mon != null;
      out.push({k:m[1] === 'no' && wint ? 'winter' : m[1], txt:m[1] === 'no' ? (wint ? 'Wintersperre' : 'Zeitweise gesperrt') : BLK_VAL[m[1]] + ' (zeitweise)', when:blkCondDE(m[2]), on:wint ? mon : m[1] === 'no' ? null : null});
    });
  }
  if(t.seasonal && t.seasonal !== 'no') out.push({k:'winter', txt:t.seasonal === 'summer' ? 'Nur im Sommer offen' : t.seasonal === 'winter' ? 'Nur im Winter offen' : 'Saisonal gesperrt', when:'', on:t.seasonal === 'winter' ? !blkWinter() : t.seasonal === 'summer' || t.seasonal === 'yes' ? blkWinter() : null});
  for(const k of ['motor_vehicle', 'motorcar', 'vehicle', 'access']){ const v = t[k]; if(v && BLK_VAL[v] && !out.some(x => x.k === v)){ out.push({k:v, txt:BLK_VAL[v], when:'', on:true}); break; } }
  if(t.highway === 'construction'){ const e = t.opening_date || t['construction:end_date'] || ''; const d = /^\d{4}-\d{2}-\d{2}$/.test(e) ? new Date(e + 'T12:00') : null;
    out.push({k:'build', txt:'Baustelle – gesperrt', when:d ? 'bis ' + d.toLocaleDateString('de-DE', {day:'numeric', month:'short', year:'numeric'}) : '', on:true}); }
  if(t.winter_service === 'no' && blkWinter()) out.push({k:'nows', txt:'Kein Winterdienst', when:'', on:true, lo:true});
  return out;
}
async function blockLoad(){
  const n = nav; if(!n || !n.route || n.busy) return;
  const R = n.route;
  if(n.block && n.block.R === R) return;
  const B = n.block = {R, list:null};
  const st = Math.max(150, R.L / 380), pts = [];
  for(let a = 0; a <= R.L; a += st){ const q = routeAt(R, a); pts.push(`${q.lat.toFixed(5)},${q.lng.toFixed(5)}`); }
  const V = '"^(no|destination|agricultural|forestry|private|delivery|agricultural_forestry)$"';
  const q = `[out:json][timeout:30];way(around:18,${pts.join(',')})["highway"]->.r;(way.r[~"^(motor_vehicle|motorcar|vehicle|access):conditional$"~"."];way.r["seasonal"]["seasonal"!="no"];way.r["winter_service"="no"];way.r["motor_vehicle"~${V}];way.r["motorcar"~${V}];way.r["vehicle"~${V}];way.r["access"~${V}];way.r["highway"="construction"];);out tags geom 120;`;
  let j = null;
  for(const base of OVERPASS){ try{ const r = await fetch(base, {method:'POST', body:'data=' + encodeURIComponent(q)}); if(r.ok){ j = await r.json(); break; } }catch(e){} }
  if(nav !== n || n.block !== B) return;
  const list = [];
  ((j && j.elements) || []).forEach(e => {
    if(!e.geometry || e.geometry.length < 2) return;
    const near = e.geometry.map(g => routeProject(R, R.toXY(g.lon, g.lat))).filter(p => p.off < 15).map(p => p.along);
    if(near.length < 2) return;
    const a = Math.min(...near), b = Math.max(...near); if(b - a < 40) return;
    const t = e.tags || {}, name = t.name || t.ref || '';
    blkClassify(t).forEach(c => {
      if((c.k === 'destination' || c.k === 'private' || c.k === 'delivery') && (a < 400 || b > R.L - 400)) return;   // am Start oder Ziel normal
      const last = list.find(x => x.txt === c.txt && x.when === c.when && Math.max(x.a, a) - Math.min(x.b, b) < 300);
      if(last){ last.a = Math.min(last.a, a); last.b = Math.max(last.b, b); if(!last.name && name) last.name = name; }
      else list.push({...c, a, b, name});
    });
  });
  B.list = list.sort((x, y) => x.a - y.a);
  if(nav !== n) return;
  blockDraw(); if(navPrevOn && !n.pick) renderNavPrev();
}
function blockDraw(){
  const B = nav && nav.block; if(!B || !B.list || B.R !== nav.route){ setSrc('nav-block', FC([])); return; }
  const R = nav.route, from = nav.active ? nav.prog : 0;
  setSrc('nav-block', FC(B.list.filter(x => x.b > from).map(x => ({type:'Feature', properties:{on:x.on !== false && !x.lo}, geometry:{type:'LineString', coordinates:routeSlice(R, Math.max(x.a, from), Math.max(x.b, x.a + 30))}}))));
}
function blockNavHTML(){
  const B = nav.block; if(!B || B.R !== nav.route || !B.list || !B.list.length) return '';
  const L = B.list.slice(0, 4);
  return `<div class="blk-list">${L.map(x => {
    const now = x.on === true ? (x.k === 'winter' ? ' · jetzt gesperrt' : '') : x.on === false ? ' · gerade offen' : '';
    const sub = [x.when, `km ${Math.max(0, Math.round(x.a / 1000))}`, x.name].filter(Boolean).join(' · ');
    return `<span class="rw-sum ${x.on === false || x.lo ? 'rwk-blocklo' : 'rwk-block'}">${svg(BLK_IC, 15, 2.2)}<span>${esc(x.txt + now)}<small>${esc(sub)}</small></span></span>`; }).join('')}
    ${B.list.length > 4 ? `<small class="muted">+${B.list.length - 4} weitere Hinweise</small>` : ''}</div>`;
}

/* ================= Wildwechsel: Waldstücke auf der Route, die man in der Dämmerung oder bei Dunkelheit durchfährt =================
   Wald aus OpenStreetMap (is_in je Messpunkt), dazu Wildwechsel-Schilder an der Strecke. Nur ein Hinweis – keine Garantie. */
const WILD_IC = '<path d="M8 3v3.5L10 8M5.5 4.5 8 6M16 3v3.5L14 8M18.5 4.5 16 6"/><path d="M10 8h4l1.5 3-1 1.5V17a2.5 2.5 0 0 1-5 0v-4.5l-1-1.5z"/><path d="M11 18.5h2"/>';
function dayPhase(t, lat, lng){
  const d = new Date(t); d.setHours(12, 0, 0, 0);
  const S = SUN(d, lat, lng); if(!S.rise || !S.sunset) return 'day';
  const r = S.rise.getTime(), s = S.sunset.getTime(), M = 60000;
  if((t >= s - 40 * M && t <= s + 80 * M) || (t >= r - 80 * M && t <= r + 40 * M)) return 'dusk';
  return t > s + 80 * M || t < r - 80 * M ? 'night' : 'day';
}
async function wildLoad(){
  const n = nav; if(!n || !n.route || n.busy) return;
  const R = n.route;
  if(n.wild && n.wild.R === R) return;
  const W = n.wild = {R, segs:null, signs:[]};
  const st = Math.max(300, R.L / 220), t0 = Date.now(), S = [];
  for(let a = st / 2; a < R.L; a += st){ const q = routeAt(R, a), t = t0 + R.dur * 1000 * a / R.L, ph = dayPhase(t, q.lat, q.lng); if(ph !== 'day') S.push({a, lat:q.lat, lng:q.lng, t, ph}); }
  if(!S.length){ W.segs = []; return wildDone(n, W); }
  const pts = S.map(q => `${q.lat.toFixed(5)},${q.lng.toFixed(5)}`).join(',');
  const q = '[out:json][timeout:40];' + S.map((p, i) => `is_in(${p.lat.toFixed(5)},${p.lng.toFixed(5)})->.a;(area.a["landuse"="forest"];area.a["natural"="wood"];);make w i="${i}",n=count(areas);out;`).join('') +
    `(node["hazard"="animal_crossing"](around:40,${pts});node["traffic_sign"~"DE:142-10"](around:40,${pts}););out 60;`;
  let j = null;
  for(const base of OVERPASS){ try{ const r = await fetch(base, {method:'POST', body:'data=' + encodeURIComponent(q)}); if(r.ok){ j = await r.json(); break; } }catch(e){} }
  if(nav !== n || n.wild !== W) return;
  if(!j){ W.segs = []; W.err = true; return wildDone(n, W); }
  const forest = new Set();
  (j.elements || []).forEach(e => {
    if(e.type === 'w' && e.tags && +e.tags.n > 0) forest.add(+e.tags.i);
    else if(e.type === 'node' && e.lat != null){ const pr = routeProject(R, R.toXY(e.lon, e.lat)); if(pr.off < 60 && !W.signs.some(x => Math.abs(x.a - pr.along) < 150)) W.signs.push({a:pr.along, lat:e.lat, lng:e.lon}); }
  });
  const segs = [];
  S.forEach((p, i) => {
    if(!forest.has(i)) return;
    const a = Math.max(0, p.a - st / 2), b = Math.min(R.L, p.a + st / 2), last = segs[segs.length - 1];
    if(last && a - last.b < st * 1.6){ last.b = b; if(p.ph === 'dusk') last.ph = 'dusk'; } else segs.push({a, b, ph:p.ph, t:p.t});
  });
  W.segs = segs.filter(x => x.b - x.a >= 400 || W.signs.some(g => g.a >= x.a && g.a <= x.b));
  W.signs.sort((x, y) => x.a - y.a);
  wildDone(n, W);
}
function wildDone(n, W){ if(nav !== n) return; wildDraw(); if(navPrevOn && !n.pick) renderNavPrev(); }
function wildDraw(){
  const W = nav && nav.wild; if(!W || !W.segs || W.R !== nav.route){ setSrc('nav-wild', FC([])); return; }
  const R = nav.route, from = nav.active ? nav.prog : 0;
  setSrc('nav-wild', FC([
    ...W.segs.filter(x => x.b > from + 5).map(x => ({type:'Feature', properties:{}, geometry:{type:'LineString', coordinates:routeSlice(R, Math.max(x.a, from), x.b)}})),
    ...W.signs.filter(g => g.a > from).map(g => ({type:'Feature', properties:{}, geometry:{type:'Point', coordinates:[g.lng, g.lat]}}))]));
}
function wildNavHTML(){
  const W = nav.wild; if(!W || W.R !== nav.route || !W.segs || !W.segs.length) return '';
  const km = W.segs.reduce((t, x) => t + x.b - x.a, 0), f = W.segs[0], dusk = W.segs.some(x => x.ph === 'dusk');
  const where = f.a < 500 ? 'ab Start' : `ab km ${Math.round(f.a / 1000)} · ca. ${hhmm(new Date(f.t))}`;
  return `<div class="rw-route wild-route"><span class="rw-sum rwk-wild">${svg(WILD_IC, 15, 2)}Wildwechsel möglich: ${fmtKmS(km)} Wald ${dusk ? 'in der Dämmerung' : 'bei Dunkelheit'} · ${where}</span>${W.signs.length ? `<small class="muted">${W.signs.length === 1 ? '1 Wildwechsel-Schild' : `${W.signs.length} Wildwechsel-Schilder`} an der Strecke</small>` : ''}</div>`;
}
// Cockpit: Wald voraus (bis 1,5 km) oder gerade drin
function wildAhead(){
  if(!nav || !nav.active || !nav.wild || !nav.wild.segs || nav.wild.R !== nav.route) return null;
  const p = nav.prog, x = nav.wild.segs.find(s => s.b > p && s.a - p < 1500); if(!x) return null;
  if(dayPhase(Date.now(), me ? me.lat : nav.dest.lat, me ? me.lng : nav.dest.lng) === 'day') return null;
  return x.a <= p ? 'Wald · Wildwechsel möglich' : `Wald in ${fmtNav(x.a - p)} · Wildwechsel möglich`;
}

/* Vorschau & Start */
const navLeft = () => nav.stops.filter(x => !x.done);
const navUser = () => navLeft().filter(x => !x.sh);   // sichtbare Zwischenstopps (ohne Stützpunkte einer Lieblingsstrecke)
const navPts = from => [from, ...navLeft(), nav.dest];
let planBusy = 0;
async function planNav(target, name, walkTo, o = {}){
  if(planBusy && Date.now() - planBusy < 30000) return;   // Doppeltipp: nicht zweimal planen
  planBusy = Date.now();
  try{ return await planNavRun(target, name, walkTo, o); } finally { planBusy = 0; }
}
async function planNavRun(target, name, walkTo, o){
  if(ckOn) exitCockpit();
  if(nav) endNav();
  const here = await getHere(); if(!here) return false;
  navStatus('Route wird berechnet …');
  const stops = (o.stops || []).filter(x => dist(x, here) > 300).map(x => ({...x}));   // Zwischenstopp, an dem ich schon stehe, weglassen
  nav = {active:false, start:{lat:here.lat, lng:here.lng}, dest:{lat:target.lat, lng:target.lng}, name, walkTo, stops, mode:(o.mode || prefs.navMode) === 'land' ? 'land' : 'fast', opts:null, route:null, prog:0, off:0, lastReroute:0, arrived:false, pick:null};
  const n = nav;
  const ok = await navReplan(true);
  if(nav !== n) return false;
  if(!ok){ nav = null; navStatus(''); toast('Route konnte nicht berechnet werden. Prüfe deine Internetverbindung.'); return false; }
  navStatus(''); hideToast();
  navPrevOn = true; document.body.classList.add('navprev');
  navFit(); navRefit(n);
  return true;
}
// Wenn Hinweise nachgeladen sind, ist die Vorschau höher – einmal nachjustieren, solange niemand die Karte bewegt hat
function navRefit(n){
  let moved = false; const mv = e => { if(e.originalEvent) moved = true; };
  map.on('movestart', mv);
  setTimeout(() => { map.off('movestart', mv); if(!moved && nav === n && navPrevOn) navFit(); }, 2600);
}
// Dauerhafter Hinweis, solange eine Route gerechnet wird (Toasts verschwinden nach 3 s)
function navStatus(t){
  let el = $('#navBusy');
  if(!t){ if(el) el.hidden = true; return; }
  if(!el){ el = document.createElement('div'); el.id = 'navBusy'; el.className = 'glass'; document.body.appendChild(el); }
  el.innerHTML = `<i class="bk-spin"></i>${esc(t)}`; el.hidden = false;
}
// Routen neu holen (z. B. nach neuem Zwischenstopp) und anzeigen
async function navReplan(first){
  const n = nav; if(!n) return false;
  n.busy = true; if(!first && navPrevOn) renderNavPrev();
  const o = n.tour ? await valhalla(navPts(n.start), !n.tour.fav).then(r => r ? {fast:r[0], land:r[0]} : null) : await navRoutes(navPts(n.start));
  if(nav !== n) return false;
  n.busy = false;
  if(!o){ if(!first){ toast('Route mit Zwischenstopp ging gerade nicht.'); renderNavPrev(); } return false; }
  const vs = navUser(), names = vs.map(x => x.name);
  n.opts = {fast:prepRoute(o.fast, names), land:o.land ? prepRoute(o.land, names) : null};
  n.opts.fast.viaStops = vs; if(n.opts.land) n.opts.land.viaStops = vs;
  navPick(n.mode, true);
  return true;
}
function navPick(mode, quiet){
  const o = nav.opts; if(!o) return;
  nav.mode = mode === 'land' && o.land ? 'land' : 'fast';
  if(!quiet){ prefs.navMode = mode; savePrefs(); }
  nav.route = o[nav.mode]; nav.prog = 0;
  const alt = nav.mode === 'fast' ? o.land : o.fast;
  setSrc('nav-route', routeFC(nav.route.coords));
  setSrc('nav-alt', alt ? routeFC(alt.coords) : FC([]));
  navStopMarks();
  nav.rw = null; renderNavPrev(); rwNav();
}
function navFit(){
  const c = [...nav.route.coords, ...((nav.opts.land && nav.opts.land.coords) || [])], b = c.reduce((bb, q) => bb.extend(q), new maplibregl.LngLatBounds(c[0], c[0]));
  const np = $('#navPrev'), h = np && navPrevOn ? np.offsetHeight + 30 : 0;
  // Vorschau immer von oben: mit 3D-Gelände und Neigung lagen Teile der Route hinter Hügeln oder außerhalb des Bildes
  map.fitBounds(b, {padding:{top:80, bottom:Math.max(mobile() ? 200 : 120, Math.min(h || 420, innerHeight * .64)), left:50, right:mobile() ? 70 : 90}, maxZoom:16, duration:1200, pitch:0, bearing:0});
}
let navStopMk = [];
function navStopMarks(){
  navStopMk.forEach(m => m.remove()); navStopMk = [];
  if(!nav) return;
  navUser().forEach((x, k) => {
    const el = document.createElement('div'); el.className = 'mk-stop'; el.innerHTML = `<b>${k + 1}</b>`;
    navStopMk.push(new maplibregl.Marker({element:el, anchor:'center'}).setLngLat([x.lng, x.lat]).addTo(map));
  });
}
const STOP_IC = {fuel:GEO_IC.fuel, spot:GEO_IC.poi, friend:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>', place:GEO_IC.poi, view:'<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.6"/>', pass:'<path d="M3 19 9 9l4 6 3-4 5 8z"/>', lake:'<path d="M3 9c3 0 3-2 6-2s3 2 6 2 3-2 6-2M3 15c3 0 3-2 6-2s3 2 6 2 3-2 6-2"/>'};
function renderNavPrev(){
  if(nav.pick) return renderStopPick();
  const R = nav.route, o = nav.opts, walk = nav.walkTo ? dist(nav.dest, nav.walkTo) : 0;
  const mwTxt = r => r.mw >= 800 ? `${fmtKmS(r.mw)} Autobahn` : 'ohne Autobahn';
  const card = (k, r) => {
    const f = o.fast, dd = k === 'land' ? Math.round((r.dur - f.dur) / 60) : 0, dk = k === 'land' ? r.L - f.L : 0;
    return `<button class="nopt${nav.mode === k ? ' on' : ''}" data-nav="mode" data-m="${k}"><b>${k === 'fast' ? (o.land && o.land.dur < r.dur ? 'Mit Autobahn' : 'Schnellste') : 'Landstraße'}</b><span class="nt">${fmtDurNav(r.dur)} · ${fmtKmS(r.L)}</span>
      <small>${k === 'land' ? [`${dd >= 0 ? '+' : '−'}${Math.abs(dd)} Min`, Math.abs(dk) >= 100 ? `${dk >= 0 ? '+' : '−'}${fmtKmS(Math.abs(dk))}` : ''].filter(Boolean).join(' · ') + ' · ohne Autobahn' : mwTxt(r)}</small></button>`;
  };
  const opts = nav.tour && nav.tour.fav ? `<div class="nopt-note tour-note">${svg(ICONS.star, 15)} Folgt deiner gespeicherten Fahrt${nav.tour.toStart > 300 ? ` · ${fmtKmS(nav.tour.toStart)} bis zum Start` : ''}</div>` : nav.tour ? `<div class="nopt-note tour-note">${svg(TOUR_IC, 15)} Rundtour · ${tourDots(nav.tour.curv)} · ${esc(nav.tour.via || 'Landstraßen')}</div>` : o.land ? `<div class="nopts">${card('fast', o.fast)}${card('land', o.land)}</div>`
    : `<div class="nopt-note">${o.fast.mw >= 800 ? 'Keine sinnvolle Strecke ohne Autobahn gefunden.' : 'Die schnellste Route fährt schon ohne Autobahn.'}</div>`;
  const stops = navUser();
  $('#navPrev').innerHTML = `
    <div class="nh"><span class="ni">${svg(UI.nav, 20)}</span><div><b>${esc(nav.name)}</b><span>${nav.walkTo ? `Zum Parkplatz · danach ca. ${fmtMin(walkMin(walk))} zu Fuß` : 'Mit dem Auto'}</span></div></div>
    ${nav.busy ? '<div class="nopt-note">Route wird neu berechnet …</div>' : opts}
    <div class="nsum"><div><b>${fmtDurNav(R.dur)}</b><span>Fahrzeit</span></div><div><b>${fmtNav(R.L).replace('Jetzt', '0 m')}</b><span>Strecke</span></div><div><b>${clock(R.dur)}</b><span>Ankunft</span></div></div>
    <div class="nstops">${stops.map((x, k) => `<div class="nstop"><span class="nsi">${k + 1}</span><span class="nsic">${svg(STOP_IC[x.kind] || STOP_IC.place, 14, 2.2)}</span><span class="nsn">${esc(x.name)}</span><button class="nsx" data-nav="rmstop" data-i="${k}" aria-label="Zwischenstopp entfernen">${svg(UI.close, 12)}</button></div>`).join('')}
      ${stops.length < 3 ? `<button class="nadd" data-nav="addstop">${svg(UI.plus, 14)} Zwischenstopp</button>` : ''}</div>
    ${nav.busy ? '' : navSightsHTML()}
    ${rwNavHTML()}
    ${nav.busy ? '' : blockNavHTML()}
    ${nav.busy ? '' : wildNavHTML()}
    <div class="btns"><button class="btn" data-nav="cancel">Abbrechen</button><button class="btn primary" data-nav="go" ${nav.busy ? 'disabled' : ''}>${svg(UI.nav, 16)} Los</button></div>`;
  navSightsLoad(); navSightMarks(); wildLoad(); wildDraw(); blockLoad(); blockDraw();
}
/* ================= Gemeinden sammeln =================
   Gemeindegrenzen des Landkreises aus OpenStreetMap (Overpass), vereinfacht und auf dem Gerät gespeichert.
   Befahren = mindestens ein Punkt einer eigenen Fahrt liegt in der Gemeinde. */
const GEM_KEY = 'meine-spots-gem';
let gemDB = {}; try{ gemDB = JSON.parse(localStorage.getItem(GEM_KEY) || '{}') || {}; }catch(e){ gemDB = {}; }
let gemOn = false, gemBusy = false, gemErr = '', gemCache = null, gemTried = false;
const gemSave = () => { try{ localStorage.setItem(GEM_KEY, JSON.stringify(gemDB)); }catch(e){ toast('Speicher voll – Gemeinden nicht gespeichert.'); } };
async function ovp(q){
  for(const base of OVERPASS){ try{ const r = await fetch(base, {method:'POST', body:'data=' + encodeURIComponent(q)}); if(r.ok) return await r.json(); }catch(e){} }
  return null;
}
function osmRings(members){
  const segs = (members || []).filter(m => m.type === 'way' && m.geometry && m.geometry.length > 1 && m.role !== 'inner').map(m => m.geometry.map(g => [g.lon, g.lat]));
  const same = (a, b) => Math.abs(a[0] - b[0]) < 1e-7 && Math.abs(a[1] - b[1]) < 1e-7, out = [];
  while(segs.length){
    let ring = segs.shift();
    for(let guard = 0; guard < 4000; guard++){
      const last = ring[ring.length - 1]; if(same(ring[0], last)) break;
      const i = segs.findIndex(sg => same(sg[0], last) || same(sg[sg.length - 1], last)); if(i < 0) break;
      let sg = segs.splice(i, 1)[0]; if(!same(sg[0], last)) sg = sg.slice().reverse();
      ring = ring.concat(sg.slice(1));
    }
    if(ring.length >= 4) out.push(ring);
  }
  return out;
}
function simplifyRing(r, m = 35){ const out = [r[0]]; let l = r[0]; for(let i = 1; i < r.length - 1; i++){ if(dist({lng:l[0], lat:l[1]}, {lng:r[i][0], lat:r[i][1]}) >= m){ out.push(r[i]); l = r[i]; } } out.push(r[r.length - 1]); return out.map(c => [+c[0].toFixed(5), +c[1].toFixed(5)]); }
const ringBox = r => r.reduce((b, c) => [Math.min(b[0], c[0]), Math.min(b[1], c[1]), Math.max(b[2], c[0]), Math.max(b[3], c[1])], [180, 90, -180, -90]);
// inRing(p, r): siehe Reichweite oben
const inGem = (p, g) => g.rings.some((r, k) => { const b = g.box[k]; return p[0] >= b[0] && p[0] <= b[2] && p[1] >= b[1] && p[1] <= b[3] && inRing(p, r); });
async function gemLoad(pt){
  if(gemBusy) return; gemBusy = true; gemErr = ''; gemRefresh();
  try{
    const a = await ovp(`[out:json][timeout:25];is_in(${pt.lat.toFixed(5)},${pt.lng.toFixed(5)})->.a;area.a["boundary"="administrative"]["admin_level"="6"];out tags;`);
    const ar = a && (a.elements || [])[0];
    if(!ar){ gemErr = a ? 'Hier wurde kein Landkreis gefunden.' : 'Kartendaten gerade nicht erreichbar.'; return; }
    const rel = ar.id - 3600000000, kname = ar.tags.name || 'Landkreis';
    let j = null, lvl = 8;
    for(const l of [8, 9, 10]){
      j = await ovp(`[out:json][timeout:90];area(${ar.id})->.k;rel(area.k)["boundary"="administrative"]["admin_level"="${l}"];out geom;rel(${rel});out geom;`);
      if(!j){ gemErr = 'Gemeinden gerade nicht ladbar. Versuch es später.'; return; }
      if((j.elements || []).filter(e => e.tags && e.tags.admin_level === String(l)).length >= 2){ lvl = l; break; }
    }
    const kr = (j.elements || []).find(e => e.id === rel), kRings = kr ? osmRings(kr.members).map(r => simplifyRing(r, 60)) : [];
    const kG = {rings:kRings, box:kRings.map(ringBox)};
    const gems = (j.elements || []).filter(e => e.type === 'relation' && e.id !== rel && e.tags && e.tags.admin_level === String(lvl) && e.tags.name).map(e => {
      const rings = osmRings(e.members).map(r => simplifyRing(r)); if(!rings.length) return null;
      const all = rings.flat(), c = [all.reduce((s, x) => s + x[0], 0) / all.length, all.reduce((s, x) => s + x[1], 0) / all.length];
      return {id:e.id, n:e.tags.name, rings, box:rings.map(ringBox), c};
    }).filter(g => g && (!kRings.length || inGem(g.c, kG)) && !/gemeindefrei/i.test(g.n));
    if(gems.length < 2){ gemErr = 'Für diesen Landkreis gibt es keine Gemeindegrenzen.'; return; }
    gemDB[rel] = {n:kname, lvl, at:Date.now(), gems}; prefs.gemCur = rel; savePrefs(); gemSave(); gemCache = null;
    if(gemOn) gemShow(true);
  }finally{ gemBusy = false; gemRefresh(); }
}
function gemCalc(){
  const K = gemDB[prefs.gemCur]; if(!K) return null;
  const ts = myTracks().filter(t => !t._ws), sig = prefs.gemCur + '|' + ts.map(t => t.id).join(',');
  if(gemCache && gemCache.sig === sig) return gemCache;
  const vis = {}; let lastG = null;
  ts.slice().sort((a, b) => a.created - b.created).forEach(t => (t.segs || []).forEach(sg => { let lp = null; sg.forEach(q => {
    if(lp && Math.abs(q[0] - lp[0]) < .0012 && Math.abs(q[1] - lp[1]) < .0008) return; lp = q;
    const p = [q[0], q[1]];
    if(lastG && inGem(p, lastG)){ if(!vis[lastG.id]) vis[lastG.id] = t.created; return; }
    const g = K.gems.find(x => inGem(p, x)); if(g){ lastG = g; if(!vis[g.id]) vis[g.id] = t.created; }
  }); }));
  gemCache = {sig, K, vis, n:Object.keys(vis).length, tot:K.gems.length};
  return gemCache;
}
function gemShow(on){
  gemOn = on; if(!mapReady) return;
  ['gem-fill', 'gem-line'].forEach(l => map.setLayoutProperty(l, 'visibility', on ? 'visible' : 'none'));
  const G = gemCalc();
  if(on && G){
    setSrc('gem', FC(G.K.gems.map(g => ({type:'Feature', properties:{n:g.n, v:!!G.vis[g.id], t:G.vis[g.id] || 0}, geometry:{type:'MultiPolygon', coordinates:g.rings.map(r => [r])}}))));
    const b = new maplibregl.LngLatBounds(); G.K.gems.forEach(g => g.box.forEach(x => { b.extend([x[0], x[1]]); b.extend([x[2], x[3]]); }));
    map.fitBounds(b, {padding:camPad(), duration:900});
    if(mobile()) setSnap('peek');
  }
  gemRefresh();
}
function gemAuto(){
  if(gemTried || gemDB[prefs.gemCur] || gemBusy || !navigator.onLine) return;
  gemTried = true;
  const t = myTracks().find(x => x.segs && x.segs[0] && x.segs[0][0]), p = me || (t ? {lng:t.segs[0][0][0], lat:t.segs[0][0][1]} : null);
  if(p) gemLoad(p);
}
function gemRefresh(){ const el = $('#gemCard'); if(el) el.innerHTML = gemCardHTML(); }
function gemCardHTML(){
  const G = gemCalc(), K = G && G.K, word = K && K.lvl > 8 ? 'Stadtteile' : 'Gemeinden';
  const head = `<div class="st-h"><span>${word}</span>${G ? `<em>${G.n} von ${G.tot}</em>` : ''}</div>`;
  if(!G) return head + `<div class="gem">${gemBusy ? '<div class="xpl-prog"><i></i>Lade Gemeindegrenzen …</div>' : `<div class="muted" style="font-size:13px">${esc(gemErr || 'Zeigt, wie viele Gemeinden deines Landkreises du schon befahren hast.')}</div><button class="btn" data-gem="here">Landkreis hier laden</button>`}</div>`;
  const pct = Math.round(G.n / G.tot * 100), ref = me || null;
  const open = K.gems.filter(g => !G.vis[g.id]).map(g => ({g, d:ref ? dist(ref, {lng:g.c[0], lat:g.c[1]}) : 0})).sort((a, b) => a.d - b.d).slice(0, 4);
  const kn = Object.entries(gemDB).filter(([id]) => id !== String(prefs.gemCur));
  return head + `<div class="gem">
    <div class="gem-k"><b>${esc(K.n)}</b><span>${pct} %</span></div>
    <div class="gem-bar"><i style="width:${Math.max(2, pct)}%"></i></div>
    ${open.length ? `<div class="gem-open">Noch offen: ${open.map(o => `${esc(o.g.n)}${ref ? ` <small>${fmtKmS(o.d)}</small>` : ''}`).join(', ')}</div>` : `<div class="gem-open">Alle ${word} befahren!</div>`}
    <div class="btns"><button class="btn${gemOn ? ' primary' : ''}" data-gem="map">${gemOn ? 'Karte ausblenden' : 'Auf der Karte'}</button><button class="btn" data-gem="here" ${gemBusy ? 'disabled' : ''}>${gemBusy ? 'Lädt …' : 'Landkreis an Kartenmitte'}</button></div>
    ${kn.length ? `<div class="chips gem-chips">${kn.map(([id, k]) => `<button class="chip" data-gem="pick" data-id="${id}">${esc(k.n)}</button>`).join('')}</div>` : ''}
    ${gemErr ? `<div class="err">${esc(gemErr)}</div>` : ''}
  </div>`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-gem]'); if(!b) return;
  const a = b.dataset.gem;
  if(a === 'map') gemShow(!gemOn);
  if(a === 'here'){ const c = mapReady ? map.getCenter() : me; if(c) gemLoad({lat:c.lat, lng:c.lng}); }
  if(a === 'pick'){ prefs.gemCur = +b.dataset.id; savePrefs(); gemCache = null; if(gemOn) gemShow(true); else gemRefresh(); }
});

/* ================= Fotospot-Planer: Sonne am Spot mit Gelände-Horizont =================
   Sonnenstand gerechnet, Gelände rundherum aus dem Höhenmodell von Open-Meteo (90 m, ohne Key).
   Sichtbar = Sonne steht höher als der Horizont (Berge, Hügel) in ihrer Richtung. */
const HZ_KEY = 'meine-spots-hz', HZ_D = [120, 250, 400, 600, 850, 1200, 1700, 2400, 3300, 4500, 6000, 8000, 11000, 15000, 20000];
let hzDB = {}; try{ hzDB = JSON.parse(localStorage.getItem(HZ_KEY) || '{}') || {}; }catch(e){ hzDB = {}; }
let sunP = {id:null, day:0, min:null, busy:false, err:''};
function sunPos(date, lat, lng){
  const rad = Math.PI / 180, d = date.valueOf() / 864e5 - .5 + 2440588 - 2451545;
  const M = rad * (357.5291 + .98560028 * d), C = rad * (1.9148 * Math.sin(M) + .02 * Math.sin(2 * M) + .0003 * Math.sin(3 * M));
  const L = M + C + rad * 102.9372 + Math.PI, e = rad * 23.4397;
  const dec = Math.asin(Math.sin(e) * Math.sin(L)), ra = Math.atan2(Math.sin(L) * Math.cos(e), Math.cos(L));
  const phi = rad * lat, H = rad * (280.16 + 360.9856235 * d) - rad * -lng - ra;
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
  const alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
  return {az:(az / rad + 180 + 360) % 360, alt:alt / rad};
}
const DIR8 = ['Norden', 'Nordosten', 'Osten', 'Südosten', 'Süden', 'Südwesten', 'Westen', 'Nordwesten'];
const dir8 = az => DIR8[Math.round(az / 45) % 8];
function sunDay(s){ const d = new Date(); d.setDate(d.getDate() + sunP.day); d.setHours(12, 0, 0, 0); return {noon:d, S:SUN(d, s.lat, s.lng)}; }
function hzAt(H, az){   // Horizont-Höhe in Grad, zwischen den gerechneten Richtungen interpoliert
  if(!H || !H.a) return null;
  const k = Object.keys(H.a).map(Number).sort((a, b) => a - b); if(!k.length) return null;
  let lo = null, hi = null; k.forEach(x => { if(x <= az) lo = x; if(x >= az && hi == null) hi = x; });
  if(lo == null || hi == null) return null;
  if(hi - lo > 8) return null;
  return hi === lo ? H.a[lo] : H.a[lo] + (H.a[hi] - H.a[lo]) * (az - lo) / (hi - lo);
}
async function hzFetch(s){
  const key = s.id, H = hzDB[key] && Math.abs(hzDB[key].lat - s.lat) < 1e-5 && Math.abs(hzDB[key].lng - s.lng) < 1e-5 ? hzDB[key] : (hzDB[key] = {lat:s.lat, lng:s.lng, h0:null, a:{}});
  const {S} = sunDay(s); if(!S.rise || !S.sunset) return H;
  const az0 = Math.floor(sunPos(new Date(S.rise.getTime() - 40 * 60000), s.lat, s.lng).az / 3) * 3, az1 = Math.ceil(sunPos(new Date(S.sunset.getTime() + 40 * 60000), s.lat, s.lng).az / 3) * 3;
  const need = []; for(let a = az0; a <= az1; a += 3) if(H.a[a] == null) need.push(a);
  if(!need.length && H.h0 != null) return H;
  const pts = [[s.lat, s.lng, -1, 0]];
  need.forEach(a => HZ_D.forEach(d => { const p = tourBearPt(s, a, d); pts.push([p.lat, p.lng, a, d]); }));
  const el = [];
  for(let i = 0; i < pts.length; i += 100){
    const ch = pts.slice(i, i + 100);
    const r = await fetch(`https://api.open-meteo.com/v1/elevation?latitude=${ch.map(x => x[0].toFixed(5)).join(',')}&longitude=${ch.map(x => x[1].toFixed(5)).join(',')}`);
    if(!r.ok) throw new Error('elev'); el.push(...(await r.json()).elevation);
  }
  if(H.h0 == null) H.h0 = el[0];
  const best = {};
  pts.forEach((x, i) => { if(x[2] < 0) return; const drop = x[3] * x[3] / (2 * 6371000) * .87, ang = Math.atan2(el[i] - H.h0 - 1.7 - drop, x[3]) * 180 / Math.PI; if(best[x[2]] == null || ang > best[x[2]]) best[x[2]] = ang; });
  Object.entries(best).forEach(([a, v]) => { H.a[a] = +v.toFixed(2); });
  const ks = Object.keys(hzDB); if(ks.length > 60) delete hzDB[ks[0]];
  try{ localStorage.setItem(HZ_KEY, JSON.stringify(hzDB)); }catch(e){}
  return H;
}
function sunSee(s, t){ const p = sunPos(t, s.lat, s.lng), h = hzAt(hzDB[s.id], p.az); return {...p, hz:h, vis:p.alt > (h == null ? 0 : Math.max(h, -.8))}; }
function sunWindow(s){   // wann die Sonne am Spot wirklich zu sehen ist
  const {noon, S} = sunDay(s); if(!S.rise || !S.sunset || !hzDB[s.id] || hzDB[s.id].h0 == null) return null;
  let first = null, last = null;
  for(let t = S.rise.getTime() - 20 * 60000; t <= S.sunset.getTime() + 20 * 60000; t += 120000){ const v = sunSee(s, new Date(t)); if(v.hz == null) continue; if(v.vis){ if(first == null) first = t; last = t; } }
  return {first, last, rise:S.rise.getTime(), set:S.sunset.getTime(), noon:noon.getTime()};
}
function sunPlanHTML(s){
  const {S} = sunDay(s); if(!S.rise || !S.sunset) return '';
  if(sunP.id !== s.id){ sunP.id = s.id; sunP.err = ''; const now = Date.now(); sunP.min = now > S.rise.getTime() && now < S.sunset.getTime() && !sunP.day ? Math.round((now - S.rise.getTime()) / 60000) : Math.max(0, Math.round((S.sunset - S.rise) / 60000) - 45); }
  const span = Math.round((S.sunset - S.rise) / 60000) + 30, t = new Date(S.rise.getTime() - 15 * 60000 + (sunP.min + 15) * 60000), v = sunSee(s, t), W = sunWindow(s), H = hzDB[s.id];
  const hm2 = ms => new Date(ms).toLocaleTimeString('de-DE', {hour:'2-digit', minute:'2-digit'});
  const st = v.alt <= -.8 ? ['night', 'Sonne unter dem Horizont'] : v.hz == null ? ['', sunP.busy ? 'Gelände wird geprüft …' : sunP.err || 'Gelände noch nicht geprüft'] : v.vis ? ['ok', 'Vom Spot aus sichtbar'] : ['blk', `Hinter dem Gelände (${Math.max(0, v.hz).toFixed(1).replace('.', ',')}° hoch)`];
  const chart = sunChart(s, t);
  return `<div class="h">${svg(WXI.sun, 16, 2)} Sonne am Spot</div>
    <div class="seg2 sunp-day">${['Heute', 'Morgen', 'In 7 Tagen'].map((n, i) => `<button class="${[0, 1, 7][i] === sunP.day ? 'on' : ''}" data-sunp="day" data-v="${[0, 1, 7][i]}">${n}</button>`).join('')}</div>
    <div class="sunp-now"><b>${hm2(t)}</b><span>aus ${dir8(v.az)} · ${Math.round(v.az)}° · ${v.alt > 0 ? Math.round(v.alt) + '° hoch' : 'unter dem Horizont'}</span></div>
    <input type="range" class="sunp-r" data-sunp="t" min="0" max="${span}" step="5" value="${sunP.min}" aria-label="Uhrzeit">
    <div class="sunp-st ${st[0]}"><i></i>${esc(st[1])}</div>
    ${chart}
    ${W ? `<div class="sunp-win">${W.first ? `Sonne am Spot: <b>${hm2(W.first)}–${hm2(W.last)}</b>` : '<b>Heute kommt die Sonne hier nicht über das Gelände.</b>'}<small>Offiziell ${hm2(W.rise)}–${hm2(W.set)}${W.first && (W.first - W.rise > 6e5 || W.set - W.last > 6e5) ? ' · Berge und Hügel verdecken sie früher' : ''}</small></div>` : ''}
    <div class="sunp-note">Gelb auf der Karte: Richtung zur Sonne. Grafik: Horizont rundherum und Sonnenbahn.</div>`;
}
function sunChart(s, t){
  const H = hzDB[s.id], {S} = sunDay(s); if(!H || !Object.keys(H.a).length) return '';
  const path = []; for(let m = S.rise.getTime() - 40 * 60000; m <= S.sunset.getTime() + 40 * 60000; m += 600000) path.push(sunPos(new Date(m), s.lat, s.lng));
  const azs = Object.keys(H.a).map(Number).sort((a, b) => a - b), a0 = azs[0], a1 = azs[azs.length - 1];
  const top = Math.max(10, ...path.map(p => p.alt), ...azs.map(a => H.a[a])) + 3, bot = Math.min(-3, ...azs.map(a => H.a[a])) - 1;
  const Wd = 320, Ht = 112, X = a => 4 + (a - a0) / Math.max(1, a1 - a0) * (Wd - 8), Y = v => 6 + (top - v) / (top - bot) * (Ht - 22);
  const terr = `M${X(a0)} ${Y(bot)} ` + azs.map(a => `L${X(a).toFixed(1)} ${Y(H.a[a]).toFixed(1)}`).join(' ') + ` L${X(a1)} ${Y(bot)} Z`;
  const sp = path.filter(p => p.az >= a0 && p.az <= a1).map((p, i) => `${i ? 'L' : 'M'}${X(p.az).toFixed(1)} ${Y(p.alt).toFixed(1)}`).join(' ');
  const now = sunPos(t, s.lat, s.lng), ticks = [90, 135, 180, 225, 270].filter(a => a > a0 + 5 && a < a1 - 5);
  return `<svg class="sunp-ch" viewBox="0 0 ${Wd} ${Ht}" role="img" aria-label="Horizont und Sonnenbahn">
    <line x1="4" x2="${Wd - 4}" y1="${Y(0)}" y2="${Y(0)}" class="hz0"/>
    <path d="${sp}" fill="none" class="sp"/><path d="${terr}" class="terr"/>
    ${now.az >= a0 && now.az <= a1 ? `<circle cx="${X(now.az).toFixed(1)}" cy="${Y(now.alt).toFixed(1)}" r="6.5" class="sun"/>` : ''}
    ${ticks.map(a => `<text x="${X(a)}" y="${Ht - 3}" text-anchor="middle" class="ax">${{90:'O', 135:'SO', 180:'S', 225:'SW', 270:'W'}[a]}</text>`).join('')}
  </svg>`;
}
function sunRay(s, t){
  const v = sunSee(s, t); if(v.alt <= -2){ setSrc('sunray', FC([])); return; }
  const end = tourBearPt(s, v.az, 2500), far = tourBearPt(s, v.az, 3000);
  setSrc('sunray', FC([{type:'Feature', properties:{k:'ray', vis:v.vis}, geometry:{type:'LineString', coordinates:[[s.lng, s.lat], [end.lng, end.lat]]}}, {type:'Feature', properties:{k:'sun'}, geometry:{type:'Point', coordinates:[far.lng, far.lat]}}]));
}
async function sunPlanLoad(s){
  const t = () => { const {S} = sunDay(s); return new Date(S.rise.getTime() - 15 * 60000 + (sunP.min + 15) * 60000); };
  try{ sunRay(s, t()); }catch(e){}
  if(sunP.busy || !navigator.onLine) return;
  sunP.busy = true;
  try{ await hzFetch(s); sunP.err = ''; }catch(e){ sunP.err = 'Gelände gerade nicht prüfbar'; }
  sunP.busy = false;
  if(selected === s.id && view === 'detail'){ const el = $('#sunPlan'); if(el) el.innerHTML = sunPlanHTML(s); try{ sunRay(s, t()); }catch(e){} }
}
$('#detailView').addEventListener('input', e => {
  const r = e.target.closest('[data-sunp="t"]'); if(!r) return;
  const s = data.spots.find(x => x.id === selected); if(!s) return;
  sunP.min = +r.value; const el = $('#sunPlan'), tmp = document.createElement('div'); tmp.innerHTML = sunPlanHTML(s);
  const olds = [...el.children], news = [...tmp.children];   // Regler selbst nicht ersetzen, sonst bricht das Ziehen ab
  if(olds.length === news.length) olds.forEach((c, i) => { if(!c.matches('.sunp-r') && c.outerHTML !== news[i].outerHTML) c.replaceWith(news[i]); });
  const {S} = sunDay(s); sunRay(s, new Date(S.rise.getTime() - 15 * 60000 + (sunP.min + 15) * 60000));
});
$('#detailView').addEventListener('click', e => {
  const b = e.target.closest('[data-sunp="day"]'); if(!b) return;
  const s = data.spots.find(x => x.id === selected); if(!s) return;
  sunP.day = +b.dataset.v; sunP.id = null; $('#sunPlan').innerHTML = sunPlanHTML(s); sunPlanLoad(s);
});

/* ================= Saison-Hinweise: Sperrungen, Baustellen, Winter (laut OpenStreetMap) ================= */
const MON3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], MON_DE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
function condInfo(v){   // z. B. "no @ (Nov 1-Apr 30)"
  const out = []; let now = false;
  String(v).split(';').forEach(part => {
    const m = part.match(/^\s*([a-z_]+)\s*@\s*\(?([^)]*)\)?/i); if(!m) return;
    const what = m[1].toLowerCase(), cond = m[2];
    if(!/^(no|destination|private|agricultural|forestry|delivery)$/.test(what)) return;
    const who = what === 'no' ? 'gesperrt' : what === 'destination' ? 'nur Anlieger' : 'gesperrt (nur Land-/Forstwirtschaft)';
    const r = cond.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*(\d{1,2})?\s*-\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*(\d{1,2})?/);
    if(r){
      const a = MON3.indexOf(r[1]), b = MON3.indexOf(r[3]), d = new Date(), md = d.getMonth() * 100 + d.getDate(), s0 = a * 100 + (+r[2] || 1), s1 = b * 100 + (+r[4] || 31);
      const inn = s0 <= s1 ? md >= s0 && md <= s1 : md >= s0 || md <= s1; if(inn) now = true;
      out.push(`${who} ${r[2] ? r[2] + '. ' : ''}${MON_DE[a]} – ${r[4] ? r[4] + '. ' : ''}${MON_DE[b]}`);
    } else if(/winter|snow|ice/i.test(cond)) out.push(`${who} im Winter / bei Schnee`);
    else if(/\d{1,2}:\d{2}/.test(cond)) out.push(`zeitweise ${who} (${cond.replace(/\s+/g, ' ').slice(0, 40)})`);
    else out.push(`zeitweise ${who}`);
  });
  return out.length ? {txt:out.join(', '), now} : null;
}
function seasonItems(els, R){
  const out = [];
  (els || []).forEach(e => {
    const t = e.tags || {}, nm = t.ref || t.name || t['construction:name'] || '', c = e.center ? {lat:e.center.lat, lng:e.center.lon} : null; if(!c) return;
    let txt = null, lvl = 'info';
    if(t.highway === 'construction'){ txt = 'Baustelle' + (t.opening_date ? ` (bis ${t.opening_date})` : ''); lvl = 'warn'; }
    else {
      const k = Object.keys(t).find(x => /^(access|motor_vehicle|vehicle|motorcar):conditional$/.test(x)), ci = k ? condInfo(t[k]) : null;
      if(ci){ txt = ci.now ? `Jetzt ${ci.txt}` : `${ci.txt[0].toUpperCase()}${ci.txt.slice(1)}`; lvl = ci.now ? 'warn' : 'info'; }
      else if(t.seasonal && t.seasonal !== 'no'){ txt = t.seasonal === 'winter' ? 'Nur im Winter befahrbar' : t.seasonal === 'summer' ? 'Nur im Sommer befahrbar' : 'Nur saisonal befahrbar'; lvl = 'info'; }
      else if(t.winter_service === 'no'){ txt = 'Kein Winterdienst'; lvl = 'info'; }
    }
    if(!txt) return;
    const it = {txt, lvl, nm, c};
    if(R){ const pr = routeProject(R, R.toXY(c.lng, c.lat)); it.along = pr.along; }
    if(!out.some(x => x.txt === it.txt && x.nm === it.nm && dist(x.c, c) < 2000)) out.push(it);
  });
  return out.sort((a, b) => (a.lvl === 'warn' ? 0 : 1) - (b.lvl === 'warn' ? 0 : 1) || (a.along || 0) - (b.along || 0)).slice(0, 6);
}
const SEASON_F = `["highway"]["highway"!~"^(footway|path|cycleway|steps|bridleway|track|pedestrian|service)$"]`;
async function seasonNavLoad(){
  const n = nav; if(!n || !n.route || n.busy) return;
  const R = n.route, key = n.mode + ':' + Math.round(R.L) + ':' + R.coords.length;
  if(n.season && n.season.key === key) return;
  n.season = {key, list:null};
  const pts = []; const st = Math.max(250, R.L / 160); for(let a = 0; a <= R.L; a += st){ const q = routeAt(R, a); pts.push(`${q.lat.toFixed(5)},${q.lng.toFixed(5)}`); }
  const P = pts.join(',');
  const j = await ovp(`[out:json][timeout:25];(way(around:30,${P})["highway"="construction"];way(around:30,${P})${SEASON_F}[~"^(access|motor_vehicle|vehicle|motorcar):conditional$"~"."];way(around:30,${P})${SEASON_F}["seasonal"];way(around:30,${P})${SEASON_F}["winter_service"="no"];);out tags center 60;`);
  if(nav !== n || !n.season || n.season.key !== key) return;
  n.season.list = j ? seasonItems(j.elements, R) : [];
  if(navPrevOn && !n.pick && n.season.list.length) renderNavPrev();
}
function seasonNavHTML(){
  const S = nav.season; if(!S || !S.list || !S.list.length) return '';
  return `<div class="season"><div class="season-h">${svg('<path d="M12 3 2.5 20h19z"/><path d="M12 10v4.5M12 17.5v.5"/>', 14, 2.2)} Hinweise zur Strecke</div>
    ${S.list.map(x => `<div class="season-r ${x.lvl}"><b>${esc(x.txt)}</b><span>${esc([x.nm, x.along != null ? `bei km ${Math.max(0, x.along / 1000).toFixed(x.along < 10000 ? 1 : 0).replace('.', ',')}` : ''].filter(Boolean).join(' · '))}</span></div>`).join('')}
    <div class="season-f">Laut OpenStreetMap – kann veraltet sein.</div></div>`;
}
async function seasonSpotLoad(s){
  if(!navigator.onLine) return;
  const j = await ovp(`[out:json][timeout:20];(way(around:400,${s.lat.toFixed(5)},${s.lng.toFixed(5)})["highway"="construction"];way(around:400,${s.lat.toFixed(5)},${s.lng.toFixed(5)})${SEASON_F}[~"^(access|motor_vehicle|vehicle|motorcar):conditional$"~"."];way(around:400,${s.lat.toFixed(5)},${s.lng.toFixed(5)})${SEASON_F}["seasonal"];way(around:400,${s.lat.toFixed(5)},${s.lng.toFixed(5)})${SEASON_F}["winter_service"="no"];);out tags center 20;`);
  if(!j || selected !== s.id) return;
  const L = seasonItems(j.elements, null).filter(x => dist(s, x.c) <= 700), el = $('#seasonSpot'); if(!el) return;
  el.innerHTML = L.length ? `<div class="season"><div class="season-h">${svg('<path d="M12 3 2.5 20h19z"/><path d="M12 10v4.5M12 17.5v.5"/>', 14, 2.2)} Hinweise zur Anfahrt</div>${L.map(x => `<div class="season-r ${x.lvl}"><b>${esc(x.txt)}</b><span>${esc([x.nm, fmtDist(dist(s, x.c)) + ' vom Spot'].filter(Boolean).join(' · '))}</span></div>`).join('')}<div class="season-f">Laut OpenStreetMap – kann veraltet sein.</div></div>` : '';
}

/* ================= Kurvige Rundtour =================
   Sucht kurvige Landstraßen (OpenStreetMap über Overpass) in passender Entfernung, legt drei Wegpunkte darauf
   und lässt Valhalla eine Runde ohne Autobahn zurück zum Start rechnen. Bewertet wird die Kurvigkeit der fertigen Route. */
const TOUR_IC = '<path d="M5 20c0-4 4-4 4-8s-4-4-4-8"/><path d="M12 20c0-4 4-4 4-8s-4-4-4-8"/><circle cx="19" cy="5" r="1.6" fill="currentColor"/>';
let tour = {min:60, dir:null, busy:false, msg:'', res:null, err:''};
const tourDots = c => { const n = c < 50 ? 1 : c < 90 ? 2 : c < 140 ? 3 : c < 200 ? 4 : 5; return '●'.repeat(n) + '○'.repeat(5 - n); };
function tourCurv(coords){   // Grad Richtungswechsel pro km, nur echte Kurven (nicht Kreuzungs-Ecken)
  const pts = []; let last = null;
  coords.forEach(c => { const p = {lng:c[0], lat:c[1]}; if(!last || dist(last, p) >= 25){ pts.push(p); last = p; } });
  let ang = 0, L = 0;
  const brg = (a, b) => Math.atan2((b.lng - a.lng) * Math.cos(a.lat * Math.PI / 180), b.lat - a.lat) * 180 / Math.PI;
  for(let i = 1; i < pts.length; i++) L += dist(pts[i - 1], pts[i]);
  for(let i = 2; i < pts.length; i++){ let d = Math.abs(brg(pts[i - 1], pts[i]) - brg(pts[i - 2], pts[i - 1])); if(d > 180) d = 360 - d; if(d >= 4 && d <= 100) ang += d; }
  return L > 0 ? ang / (L / 1000) : 0;
}
function tourOverlap(coords){   // Anteil der Strecke, der doppelt gefahren wird (hin und zurück auf derselben Straße)
  const seen = new Map(); let dup = 0, n = 0;
  coords.forEach(c => { const k = Math.round(c[1] / .0006) + ':' + Math.round(c[0] / .0009); n++; seen.set(k, (seen.get(k) || 0) + 1); });
  seen.forEach(v => { if(v > 1) dup += v - 1; });
  return n ? dup / n : 0;
}
async function tourRoads(S, R){
  const q = `[out:json][timeout:45];way["highway"~"^(secondary|tertiary)$"](around:${Math.round(R)},${S.lat.toFixed(5)},${S.lng.toFixed(5)});out geom qt;`;
  let j = null;
  for(const base of OVERPASS){ try{ const r = await fetch(base, {method:'POST', body:'data=' + encodeURIComponent(q)}); if(r.ok){ j = await r.json(); break; } }catch(e){} }
  if(!j) return null;
  return (j.elements || []).filter(e => e.geometry && e.geometry.length > 3).map(e => {
    const c = e.geometry.map(g => [g.lon, g.lat]); let L = 0; for(let i = 1; i < c.length; i++) L += dist({lng:c[i - 1][0], lat:c[i - 1][1]}, {lng:c[i][0], lat:c[i][1]});
    const mid = c[Math.floor(c.length / 2)], t = e.tags || {};
    return {L, curv:tourCurv(c), mid:{lng:mid[0], lat:mid[1]}, name:t.ref || t.name || ''};
  }).filter(w => w.L >= 500);
}
const tourBearPt = (S, deg, m) => { const r = deg * Math.PI / 180; return {lat:S.lat + Math.cos(r) * m / 111320, lng:S.lng + Math.sin(r) * m / (111320 * Math.cos(S.lat * Math.PI / 180))}; };
async function tourPlan(){
  if(tour.busy) return;
  tour.busy = true; tour.err = ''; tour.res = null; tour.msg = 'Suche deinen Standort …'; renderTour();
  try{
    const S = await getHere(); if(!S){ tour.err = 'Ohne Standort geht keine Rundtour.'; return; }
    const L = tour.min * 60 * 14.5, R = L / 6.8;
    tour.msg = 'Suche kurvige Straßen …'; renderTour();
    const roads = await tourRoads(S, R * 1.45);
    if(!roads){ tour.err = 'Straßendaten gerade nicht erreichbar. Prüfe dein Internet.'; return; }
    if(roads.length < 6){ tour.err = 'Hier gibt es zu wenig Landstraßen für eine Rundtour.'; return; }
    const base = tour.dir != null ? tour.dir : Math.random() * 360;
    const heads = tour.dir != null ? [base, base - 38, base + 38] : [base, base + 120, base + 240];
    const cands = heads.map(h => {
      const used = new Set();
      return [-55, 0, 55].map((off, k) => {
        const T = tourBearPt(S, h + off, R * (k === 1 ? 1.2 : 1));
        let best = null, bs = -1;
        roads.forEach((w, i) => { if(used.has(i)) return; const d = dist(w.mid, T); if(d > R * .6) return; const sc = (w.curv + 15) * Math.min(1, w.L / 2500) * (1 - d / (R * 1.2)); if(sc > bs){ bs = sc; best = i; } });
        if(best == null) return null;
        used.add(best); return roads[best];
      });
    }).filter(c => c.every(Boolean));
    if(!cands.length){ tour.err = 'Keine passenden Straßen in dieser Richtung gefunden.'; return; }
    tour.msg = 'Berechne Touren …'; renderTour();
    const res = [];
    for(const c of cands){
      const r = await valhalla([S, ...c.map(w => w.mid), S], true); if(!r) continue;
      const rt = r[0], co = rt.geometry.coordinates, curv = tourCurv(co), ov = tourOverlap(co), mins = rt.duration / 60;
      const fit = Math.max(0, 1 - Math.abs(mins - tour.min) / tour.min);
      res.push({S, way:c, route:rt, curv, ov, mins, km:rt.distance / 1000, via:[...new Set(c.map(w => w.name).filter(Boolean))].slice(0, 3).join(', '), score:curv * (.4 + fit) * (1 - Math.min(.8, ov * 1.5))});
    }
    if(!res.length){ tour.err = 'Route gerade nicht berechenbar. Versuch es gleich nochmal.'; return; }
    tour.res = res.sort((a, b) => b.score - a.score);
  }catch(e){ tour.err = 'Ging gerade nicht. Versuch es nochmal.'; }
  finally{ tour.busy = false; tour.msg = ''; renderTour(); }
}
function tourSketch(co){
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  co.forEach(c => { x0 = Math.min(x0, c[0]); x1 = Math.max(x1, c[0]); y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]); });
  const k = Math.cos(y0 * Math.PI / 180), w = (x1 - x0) * k || 1e-6, h = (y1 - y0) || 1e-6, sc = 52 / Math.max(w, h);
  const P = c => `${(6 + ((c[0] - x0) * k) * sc + (52 - w * sc) / 2).toFixed(1)},${(6 + (y1 - c[1]) * sc + (52 - h * sc) / 2).toFixed(1)}`;
  const step = Math.max(1, Math.floor(co.length / 160));
  return `<svg viewBox="0 0 64 64" class="tour-sk"><polyline points="${co.filter((_, i) => i % step === 0).map(P).join(' ')}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${P(co[0]).split(',')[0]}" cy="${P(co[0]).split(',')[1]}" r="3.4" fill="#30d158"/></svg>`;
}
function openTour(){ tour.err = ''; $('#modal').hidden = false; renderTour(); }
function renderTour(){
  if(!$('#modal .tour-dlg') && $('#modal').hidden) return;
  const dirs = [[null, 'Egal'], [0, 'N'], [90, 'O'], [180, 'S'], [270, 'W']];
  const res = tour.res ? tour.res.map((t, i) => `<button class="tour-c" data-tour="go" data-i="${i}">${tourSketch(t.route.geometry.coordinates)}<span class="tx"><b>${fmtMn(t.mins)} · ${t.km.toFixed(0)} km</b><span class="tour-d">${tourDots(t.curv)}<i>${t.curv >= 140 ? 'sehr kurvig' : t.curv >= 90 ? 'kurvig' : t.curv >= 50 ? 'etwas kurvig' : 'eher gerade'}</i></span>${t.via ? `<small>über ${esc(t.via)}</small>` : ''}</span></button>`).join('') : '';
  $('#modal').innerHTML = `<div class="dlg tour-dlg" role="dialog" aria-modal="true" aria-label="Kurvige Rundtour">
    <div class="top"><strong>Kurvige Rundtour</strong><button class="icon-btn press" data-tour="close" aria-label="Schließen">${svg(UI.close, 14)}</button></div>
    <div class="pad">
      <div class="f">Dauer<div class="seg2">${[[30, '30 Min'], [60, '1 h'], [90, '1,5 h'], [120, '2 h']].map(([m, n]) => `<button class="${tour.min === m ? 'on' : ''}" data-tour="min" data-v="${m}">${n}</button>`).join('')}</div></div>
      <div class="f">Richtung<div class="seg2">${dirs.map(([d, n]) => `<button class="${tour.dir === d ? 'on' : ''}" data-tour="dir" data-v="${d}">${n}</button>`).join('')}</div></div>
      <button class="btn primary" data-tour="plan" ${tour.busy ? 'disabled' : ''}>${tour.busy ? `<i class="bk-spin"></i> ${esc(tour.msg)}` : tour.res ? 'Neue Touren suchen' : 'Touren suchen'}</button>
      ${tour.err ? `<div class="err">${esc(tour.err)}</div>` : ''}
      ${res ? `<div class="tour-list">${res}</div>` : ''}
      <div class="muted tour-hint">Start und Ziel bei dir, ohne Autobahn. Kurvige Straßen aus OpenStreetMap.</div>
    </div></div>`;
}
/* Lieblingsstrecke nochmal fahren: Navi zum Start und dann genau die Strecke entlang */
function trkLen(t){ let L = 0; (t.segs || []).forEach(sg => { for(let i = 1; i < sg.length; i++) L += dist({lat:sg[i-1][1], lng:sg[i-1][0]}, {lat:sg[i][1], lng:sg[i][0]}); }); return L; }
function trkSample(t){
  const pts = (t.segs || []).flat().map(q => ({lat:q[1], lng:q[0]})); if(pts.length < 2) return null;
  const cum = [0]; for(let i = 1; i < pts.length; i++) cum.push(cum[i-1] + dist(pts[i-1], pts[i]));
  const L = cum[cum.length - 1], n = Math.max(3, Math.min(14, Math.round(L / 2500))), out = [];
  for(let k = 1; k <= n; k++){ const a = L * k / (n + 1); let i = cum.findIndex(c => c >= a); out.push(pts[Math.max(0, i)]); }
  return {start:pts[0], end:pts[pts.length - 1], via:out, L};
}
async function favGo(t){
  if(planBusy && Date.now() - planBusy < 30000) return;
  planBusy = Date.now();
  try{ await favGoRun(t); } finally { planBusy = 0; navStatus(''); }
}
async function favGoRun(t){
  if(ckOn) exitCockpit();
  if(nav) endNav();
  const P = trkSample(t); if(!P){ toast('Diese Fahrt hat zu wenig Punkte.'); return; }
  const here = await getHere(); if(!here) return;
  navStatus('Route wird berechnet …');
  const toStart = dist(here, P.start), loop = dist(P.start, P.end) < 400;
  // Startpunkt nur anfahren, wenn man nicht schon dort steht
  const sh = [...(toStart > 250 ? [P.start] : []), ...P.via].map((x, i) => ({lat:x.lat, lng:x.lng, name:'Strecke', kind:'place', sh:true, along:-1000 + i}));
  nav = {active:false, start:{lat:here.lat, lng:here.lng}, dest:{lat:P.end.lat, lng:P.end.lng}, name:t.name || 'Lieblingsstrecke', walkTo:null, stops:sh, mode:'land', opts:null, route:null, prog:0, off:0, lastReroute:0, arrived:false, pick:null,
    tour:{fav:true, name:t.name || 'Fahrt', toStart, loop}};
  const n = nav, ok = await navReplan(true);
  if(nav !== n) return;
  if(!ok){ nav = null; toast('Route konnte nicht berechnet werden. Prüfe deine Internetverbindung.'); return; }
  const R = nav.opts.fast; nav.stops.forEach(x => { x.along = routeProject(R, R.toXY(x.lng, x.lat)).along; });
  hideToast(); navPrevOn = true; document.body.classList.add('navprev'); navFit(); navRefit(nav);
}
function tourGo(t){
  if(ckOn) exitCockpit();
  if(nav) endNav();
  const names = t.way.map(w => w.name || 'Kurvenstück');
  nav = {active:false, start:{lat:t.S.lat, lng:t.S.lng}, dest:{lat:t.S.lat, lng:t.S.lng}, name:'Kurvige Rundtour', walkTo:null,
    stops:t.way.map((w, i) => ({lat:w.mid.lat, lng:w.mid.lng, name:names[i], kind:'place', along:-1000 + i, sh:true})), mode:'land', opts:null, route:null, prog:0, off:0, lastReroute:0, arrived:false, pick:null,
    tour:{curv:t.curv, via:t.via}};
  const R = prepRoute(t.route, names);
  nav.opts = {fast:R, land:R}; R.viaStops = navUser();
  $('#modal').hidden = true;
  navPick('land', true);
  navPrevOn = true; document.body.classList.add('navprev');
  navFit();
}
$('#modal').addEventListener('click', e => {
  const b = e.target.closest('[data-tour]'); if(!b || !$('#modal .tour-dlg')) return;
  const a = b.dataset.tour;
  if(a === 'close'){ $('#modal').hidden = true; return; }
  if(a === 'min'){ tour.min = +b.dataset.v; tour.res = null; return renderTour(); }
  if(a === 'dir'){ tour.dir = b.dataset.v === 'null' ? null : +b.dataset.v; tour.res = null; return renderTour(); }
  if(a === 'plan') return tourPlan();
  if(a === 'go'){ const t = tour.res && tour.res[+b.dataset.i]; if(t) tourGo(t); }
});
document.addEventListener('click', e => { if(e.target.closest('[data-tour-open]')) openTour(); });

/* Unterwegs sehenswert: Aussichtspunkte, Pässe und Seen nah an der Route (OpenStreetMap über Overpass) */
let navSightMk = [];
async function navSightsLoad(){
  const n = nav; if(!n || !n.opts || n.busy) return;
  const key = `${n.start.lat.toFixed(3)},${n.start.lng.toFixed(3)}>${n.dest.lat.toFixed(3)},${n.dest.lng.toFixed(3)}`;
  if(n.sights && n.sights.key === key) return;
  const F = n.opts.fast;
  if(F.L < 6000){ n.sights = {key, all:[]}; return; }
  n.sights = {key, all:null};
  const pts = []; [n.opts.fast, n.opts.land].filter(Boolean).forEach(R => { const st = Math.max(1200, R.L / 90); for(let a = 0; a <= R.L; a += st){ const q = routeAt(R, a); pts.push(`${q.lat.toFixed(4)},${q.lng.toFixed(4)}`); } });
  const P = pts.join(',');
  const q = `[out:json][timeout:25];(node["tourism"="viewpoint"](around:1500,${P});node["mountain_pass"="yes"](around:300,${P});)->.n;way["natural"="water"]["name"](around:900,${P})->.w;relation["natural"="water"]["name"](around:900,${P})->.r;.n out 150;.w out geom 40;.r out center 15;`;
  let j = null;
  for(const base of OVERPASS){ try{ const r = await fetch(base, {method:'POST', body:'data=' + encodeURIComponent(q)}); if(r.ok){ j = await r.json(); break; } }catch(e){} }
  if(nav !== n || !n.sights || n.sights.key !== key) return;
  const all = [], badWater = /^(river|canal|stream|ditch|drain|wastewater|basin|reflecting_pool|moat|fish_pass)$/;
  ((j && j.elements) || []).forEach(e => {
    const t = e.tags || {}, ele = t.ele ? ` · ${Math.round(parseFloat(t.ele))} m` : '';
    if(e.type === 'node' && t.tourism === 'viewpoint') all.push({lat:e.lat, lng:e.lon, name:t.name || 'Aussichtspunkt', named:!!t.name, kind:'view', sub:ele.slice(3)});
    else if(e.type === 'node' && t.mountain_pass === 'yes') all.push({lat:e.lat, lng:e.lon, name:t.name || 'Pass', named:!!t.name, kind:'pass', sub:ele.slice(3)});
    else if(t.natural === 'water' && t.name && !badWater.test(t.water || '')){
      if(e.geometry && e.geometry.length){   // Ufer-Punkt, der der Straße am nächsten ist
        let best = null; e.geometry.forEach(g => { const pr = routeProject(F, F.toXY(g.lon, g.lat)); if(!best || pr.off < best.off) best = {lat:g.lat, lng:g.lon, off:pr.off}; });
        if(best) all.push({lat:best.lat, lng:best.lng, name:t.name, named:true, kind:'lake', sub:'See'});
      } else if(e.center) all.push({lat:e.center.lat, lng:e.center.lon, name:t.name, named:true, kind:'lake', sub:'See'});
    }
  });
  n.sights.all = all; if(nav === n && navPrevOn && !n.pick) renderNavPrev();
}
function navSightsList(){
  const S = nav.sights; if(!S || !S.all) return null;
  const R = nav.route || nav.opts.fast, stops = navUser(), out = [];
  S.all.map(x => { const pr = routeProject(R, R.toXY(x.lng, x.lat)); return {...x, along:pr.along, off:pr.off}; })
    .filter(x => x.along > 1000 && x.along < R.L - 800 && x.off <= (x.kind === 'lake' ? 1200 : x.kind === 'pass' ? 300 : 1600) && !stops.some(y => dist(x, y) < 300))
    .sort((a, b) => (b.named - a.named) || ({pass:0, view:1, lake:2}[a.kind] - {pass:0, view:1, lake:2}[b.kind]) || a.off - b.off)
    .forEach(x => { if(!out.some(y => dist(x, y) < 500 || (y.name === x.name && x.named && dist(x, y) < 3000))) out.push(x); });
  return out.slice(0, 6).sort((a, b) => a.along - b.along);
}
function navSightsHTML(){
  const S = nav.sights; if(!S) return '';
  if(!S.all) return `<div class="nsights"><div class="nsh">${svg(STOP_IC.view, 14)} Unterwegs sehenswert<i class="nsl"></i></div></div>`;
  const L = S.show = navSightsList(); if(!L || !L.length) return '';
  const full = navUser().length >= 3;
  return `<div class="nsights"><div class="nsh">${svg(STOP_IC.view, 14)} Unterwegs sehenswert</div>
    ${L.map((x, i) => { const det = x.off < 150 ? 'direkt an der Strecke' : `${fmtDist(x.off)} daneben · ca. +${Math.max(1, Math.round(x.off * 2 / 11 / 60))} Min`; return `<div class="nsight"><span class="nsic k-${x.kind}">${svg(STOP_IC[x.kind], 15, 2)}</span><span class="nst"><b>${esc(x.name)}</b><small>${esc([x.sub, `nach ${fmtKmS(x.along)}`, det].filter(Boolean).join(' · '))}</small></span>${full ? '' : `<button class="nsadd" data-nav="sight" data-i="${i}" aria-label="${esc(x.name)} als Zwischenstopp">${svg(UI.plus, 14, 2.4)}</button>`}</div>`; }).join('')}
  </div>`;
}
function navSightMarks(){
  navSightMk.forEach(m => m.remove()); navSightMk = [];
  if(!nav || !navPrevOn || !nav.sights || !nav.sights.show) return;
  nav.sights.show.forEach((x, i) => {
    const el = document.createElement('button'); el.className = `mk-sight k-${x.kind}`; el.setAttribute('aria-label', x.name); el.innerHTML = svg(STOP_IC[x.kind], 13, 2.2);
    el.addEventListener('click', e => { e.stopPropagation(); const b = document.querySelector(`#navPrev [data-nav="sight"][data-i="${i}"]`); if(b){ b.scrollIntoView({block:'nearest'}); b.closest('.nsight').classList.add('hl'); setTimeout(() => b.closest('.nsight') && b.closest('.nsight').classList.remove('hl'), 1200); } });
    navSightMk.push(new maplibregl.Marker({element:el, anchor:'center'}).setLngLat([x.lng, x.lat]).addTo(map));
  });
}
/* Zwischenstopp wählen: Tankstelle an der Strecke, eigener Spot oder ein Freund, der gerade live ist */
async function stopPickLoad(kind){
  const P = nav.pick = {kind, list:null, err:''}; renderNavPrev();
  const R = nav.route || nav.opts.fast, near = x => { const pr = routeProject(R, R.toXY(x.lng, x.lat)); return {...x, along:pr.along, off:pr.off}; };
  try{
    if(kind === 'fuel'){
      const pts = []; for(let a = 0; a <= R.L; a += Math.max(1500, R.L / 120)){ const q = routeAt(R, a); pts.push(`${q.lat.toFixed(5)},${q.lng.toFixed(5)}`); }
      const q = `[out:json][timeout:20];node["amenity"="fuel"](around:1200,${pts.join(',')});out 120;`;
      let j = null;
      for(const base of OVERPASS){ try{ const r = await fetch(base, {method:'POST', body:'data=' + encodeURIComponent(q)}); if(r.ok){ j = await r.json(); break; } }catch(e){} }
      if(!j) throw 0;
      P.list = (j.elements || []).map(e => near({lat:e.lat, lng:e.lon, name:(e.tags && (e.tags.name || e.tags.brand)) || 'Tankstelle', sub:e.tags && e.tags.brand && e.tags.name && e.tags.brand !== e.tags.name ? e.tags.brand : ''}))
        .filter(x => x.off <= 1300 && x.along > 300).sort((a, b) => a.along - b.along).slice(0, 25);
    }
    if(kind === 'spot') P.list = data.spots.filter(x => dist(x, nav.dest) > 60 && !nav.stops.some(y => dist(x, y) < 30)).map(x => near({lat:x.lat, lng:x.lng, name:x.name, sub:catById(x.cat).name})).sort((a, b) => (a.off > 5000) - (b.off > 5000) || (a.off <= 5000 ? a.along - b.along : a.off - b.off)).slice(0, 20);
    if(kind === 'friend') P.list = liveFresh().map(x => near({lat:x.lat, lng:x.lng, name:(WS.members.find(m => m._id === x.id) || {}).name || x.by, sub:x.v >= 6 ? `fährt gerade · ${Math.round(x.v)} km/h` : 'steht gerade'}));
  }catch(e){ P.err = 'Ging gerade nicht. Prüfe dein Internet.'; P.list = []; }
  if(nav && nav.pick === P) renderNavPrev();
}
function renderStopPick(){
  const P = nav.pick, k = P.kind, tabs = [['fuel', 'Tankstelle'], ['spot', 'Spot'], ['friend', 'Freund']];
  const row = (x, i) => `<button class="item geo-it" data-nav="setstop" data-i="${i}"><span class="ic geo-ic k-${k === 'fuel' ? 'fuel' : k === 'friend' ? 'coord' : 'poi'}">${svg(STOP_IC[k], 16, 2)}</span><span class="tx"><span class="t">${esc(x.name)}</span><span class="s">${esc([x.sub, x.off <= 5000 ? `nach ${fmtKmS(x.along)}${x.off > 150 ? ` · ${fmtDist(x.off)} neben der Strecke` : ''}` : `${fmtKmS(x.off)} von der Strecke weg`].filter(Boolean).join(' · '))}</span></span></button>`;
  const empty = {fuel:'Keine Tankstelle direkt an der Strecke gefunden.', spot:'Du hast noch keine Spots.', friend:'Gerade ist niemand aus der Crew live.'}[k];
  $('#navPrev').innerHTML = `
    <div class="nh"><span class="ni">${svg(UI.plus, 20)}</span><div><b>Zwischenstopp</b><span>Wird in die Route eingebaut</span></div></div>
    <div class="seg2">${tabs.map(([t, n]) => `<button class="${t === k ? 'on' : ''}" data-nav="picktab" data-k="${t}">${n}</button>`).join('')}</div>
    <div class="npick">${!P.list ? '<div class="nopt-note">Suche …</div>' : P.err ? `<div class="nopt-note">${esc(P.err)}</div>` : P.list.length ? P.list.map(row).join('') : `<div class="nopt-note">${empty}</div>`}</div>
    <div class="btns"><button class="btn" data-nav="pickback">Zurück</button></div>`;
}
function startNav(){
  if(!nav || nav.busy) return;
  nav.pick = null; setSrc('nav-alt', FC([])); navSightMk.forEach(m => m.remove()); navSightMk = [];
  navPrevOn = false; document.body.classList.remove('navprev');
  nav.active = true; document.body.classList.add('nav');
  enterCockpit();
  if(!ckOn){ endNav(); return; }
  renderNav();
}
function endNav(fromExit, keepCk){
  if(!nav) return;
  const wasActive = nav.active;
  nav = null; navPrevOn = false; navStopMarks(); navSightMk.forEach(m => m.remove()); navSightMk = [];
  document.body.classList.remove('nav', 'navprev');
  setSrc('nav-route', FC([])); setSrc('nav-wx', FC([])); setSrc('nav-wild', FC([])); setSrc('nav-block', FC([])); setSrc('nav-alt', FC([]));
  if(wasActive && !fromExit && ckOn && !keepCk) exitCockpit();
  if(keepCk && ckOn){ try{ updateCockpitUI(); }catch(e){} }
  if(mobile()) setSnap(snap, false);
}

/* Fortschritt */
function onNavFix(pt, acc){
  if(!nav || !nav.active || nav.arrived) return;
  const R = nav.route, xy = R.toXY(pt.lng, pt.lat);
  let pr = routeProject(R, xy, nav.prog, 80, 600);
  if(pr.off > 45){ const all = routeProject(R, xy, nav.prog, 80, 1e9); if(all.off <= 45) pr = all; }   // GPS-Lücke (Tunnel, Bildschirm aus): weiter vorne wieder auf der Route
  if(pr.off > 45 && acc <= 40) nav.off++; else if(pr.off <= 45) nav.off = 0;   // ungenaue Punkte zählen nicht, setzen aber auch nicht zurück
  if(pr.off <= 45 && pr.along > nav.prog) nav.prog = pr.along;
  if(nav.off >= 3 && Date.now() - nav.lastReroute > 10000){ reroute(pt); return; }
  let hit = false;
  (R.viaAt || []).forEach((a, k) => { const x = (R.viaStops || [])[k]; if(x && !x.done && (nav.prog > a - 30 || dist(pt, x) < 40)){ x.done = true; hit = true; toast(`Zwischenstopp „${x.name}“ erreicht`); } });
  if(hit) navStopMarks();
  // Stützpunkte der Lieblingsstrecke abhaken, sobald man vorbei ist (auch alle davor)
  const sh = nav.stops.filter(x => x.sh), k = sh.map(x => !x.done && dist(pt, x) < 90).lastIndexOf(true);
  for(let i = 0; i <= k; i++) sh[i].done = true;
  if(R.L - nav.prog < 30 || (dist(pt, nav.dest) < 25 && (!nav.tour || nav.prog > R.L * .8))){ arrive(); return; }
  setSrc('nav-route', routeFC(remainingCoords(R, nav.prog)));
  if(nav.rw) rwNavDraw();
  wildDraw(); blockDraw();
  renderNav();
}
async function reroute(pt){
  const n = nav; n.lastReroute = Date.now(); n.off = 0;
  toast('Neue Route wird berechnet …');
  const pts = navPts({lat:pt.lat, lng:pt.lng}), names = navUser().map(x => x.name), fav = n.tour && n.tour.fav, land = fav || n.tour || n.mode === 'land';
  // erster Dienst passend zum Modus, bei Ausfall der jeweils andere
  let rs = land ? await valhalla(pts, !fav) : await osrm(pts.filter(x => !x.sh));
  if(!rs && nav === n) rs = land ? await osrm(pts.filter(x => !x.sh)) : await valhalla(pts, false);
  const r = rs && rs[0];
  if(nav !== n || !n.active) return;
  if(!r){ toast('Neue Route gerade nicht verfügbar.'); return; }
  nav.route = prepRoute(r, names); nav.route.viaStops = navUser(); nav.prog = 0; navStopMarks();
  setSrc('nav-route', routeFC(nav.route.coords)); renderNav(); rwNav(); wildLoad(); blockLoad();
}
function arrive(){
  nav.arrived = true;
  setSrc('nav-route', FC([])); setSrc('nav-wx', FC([])); setSrc('nav-wild', FC([])); setSrc('nav-block', FC([]));
  const walk = nav.walkTo ? dist(nav.dest, nav.walkTo) : 0;
  renderNav();
}
function renderNav(){
  if(!nav || !nav.active) return;
  const top = $('#navTop'), bot = $('#navBottom');
  if(nav.arrived){
    const walk = nav.walkTo ? dist(nav.dest, nav.walkTo) : 0;
    top.innerHTML = `<span class="mi arr">${svg(NAVI.arrive, 30, 2.4)}</span><div class="tx"><div class="md">${nav.walkTo ? 'Parkplatz erreicht' : 'Angekommen'}</div><div class="mt">${esc(nav.name)}</div></div>`;
    bot.innerHTML = `<div class="eta"><b>${nav.walkTo ? `${fmtDist(walk)} zu Fuß` : 'Ziel erreicht'}</b><span>${nav.walkTo ? `ca. ${fmtMin(walkMin(walk))} bis zum Spot` : clock(0) + ' Uhr'}</span></div><button class="nbtn done" data-nav="end">Fertig</button>`;
    return;
  }
  const s = navState();
  const thenHTML = s.then && s.d < 600 ? `<div class="then">Dann <i>${svg(navIcon(s.then), 14, 2.4)}</i>${esc(instr(s.then))}</div>` : '';
  const html = `<span class="mi">${svg(navIcon(s.st), 32, 2.4)}</span><div class="tx"><div class="md">${fmtNav(s.d)}</div><div class="mt">${esc(instr(s.st))}</div>${thenHTML}</div>`;
  if(top._h !== html){ top.innerHTML = html; top._h = html; }
  const bh = `<div class="eta"><b>${clock(s.remTime)}</b><span>${fmtDurNav(s.remTime)} · ${fmtNav(s.remDist).replace('Jetzt', '0 m')}</span></div>
    ${Date.now() - (nav.endArm || 0) < 3000 ? `<button class="nbtn end armed" data-nav="end" aria-label="Navigation wirklich beenden">Beenden?</button>` : `<button class="nbtn end" data-nav="end" aria-label="Navigation beenden">${svg(UI.close, 18, 2.6)}</button>`}`;
  if(bot._h !== bh){ bot.innerHTML = bh; bot._h = bh; }
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-nav]'); if(!b) return;
  const a = b.dataset.nav;
  if(a === 'go') startNav();
  if(a === 'cancel') endNav();
  if(!nav) return;
  if(a === 'mode' && !nav.busy) navPick(b.dataset.m);
  if(a === 'addstop') stopPickLoad(nav.pick ? nav.pick.kind : 'fuel');
  if(a === 'picktab') stopPickLoad(b.dataset.k);
  if(a === 'pickback'){ nav.pick = null; renderNavPrev(); }
  if(a === 'rmstop'){ const x = navUser()[+b.dataset.i]; nav.stops = nav.stops.filter(y => y !== x); navReplan(); }
  if(a === 'setstop' && nav.pick && nav.pick.list){
    const x = nav.pick.list[+b.dataset.i]; if(!x) return;
    nav.stops.push({lat:x.lat, lng:x.lng, name:x.name, kind:nav.pick.kind, along:x.along});
    nav.stops.sort((p, q) => (p.along || 0) - (q.along || 0));
    nav.pick = null; navReplan().then(ok => { if(ok) navFit(); });
  }
  if(a === 'sight' && nav.sights && nav.sights.show){
    const x = nav.sights.show[+b.dataset.i]; if(!x || navUser().length >= 3) return;
    nav.stops.push({lat:x.lat, lng:x.lng, name:x.name, kind:x.kind, along:x.along});
    nav.stops.sort((p, q) => (p.along || 0) - (q.along || 0));
    toast(`„${x.name}“ ist jetzt Zwischenstopp`);
    navReplan().then(ok => { if(ok) navFit(); });
  }
  if(a === 'end'){
    // laufende Navi: erst nachfragen (ein Fehltipp beim Fahren soll nichts beenden), dann nur die Navi beenden – das Cockpit bleibt
    if(nav && nav.active && !nav.arrived){
      if(Date.now() - (nav.endArm || 0) > 3000){ nav.endArm = Date.now(); renderNav(); const n = nav; setTimeout(() => { if(nav === n) renderNav(); }, 3100); return; }
      endNav(false, true); toast('Navigation beendet'); return;
    }
    endNav();
  }
});
document.addEventListener('keydown', e => { if(e.key === 'Escape' && navPrevOn){ if(nav && nav.pick){ nav.pick = null; renderNavPrev(); } else endNav(); } });
/* Zurück-Taste (Android, Browser-Geste) und Escape: erst Overlays schließen, dann eine Ansicht zurück, erst danach die App verlassen */
const overlayOpen = () => !!(searching || lb || !$('#modal').hidden || incoming || (wrap && !$('#wrap').hidden) || ckOn || !$('#death').hidden || rp || navPrevOn || perfOn);
window.addEventListener('keydown', e => { if(e.key === 'Escape') e.__ov = overlayOpen(); }, true);
document.addEventListener('keydown', e => {
  if(e.key !== 'Escape' || e.__ov || e.defaultPrevented) return;
  const tg = e.target; if(tg && /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName) && view !== 'edit' && view !== 'detail') return;
  if(view !== 'list' && view !== 'mode' && view !== 'draw') viewBack();
});
(() => {
  if(!history.pushState) return;
  try{ history.replaceState({sp:0}, ''); history.pushState({sp:1}, ''); }catch(e){ return; }
  addEventListener('popstate', () => {
    if(!$('#onb') || $('#onb').hidden){
      if(overlayOpen()){ document.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true})); try{ history.pushState({sp:1}, ''); }catch(e){} return; }
      if(view !== 'list'){ viewBack(); try{ history.pushState({sp:1}, ''); }catch(e){} return; }
    }
    history.back();   // nichts mehr offen: App wirklich verlassen
  });
})();
every(() => { if(nav && nav.active && !nav.arrived) renderNav(); }, 15000);

/* ================= Beschleunigung ================= */
const PKEY = 'meine-spots-runs';
const PRESETS = [[0,50],[0,100],[0,200],[50,100],[80,120],[100,150],[100,200],[150,200]];
let runs = [];
try{ runs = JSON.parse(localStorage.getItem(PKEY) || '[]'); if(!Array.isArray(runs)) runs = []; }catch(e){ runs = []; }
const saveRuns = () => { bkDirty(); try{ localStorage.setItem(PKEY, JSON.stringify(runs.slice(0, 200))); }catch(e){} };
let perfOn = false, pfWatch = null, pfRaf = null, audio = null, pfClearArmed = false;
let pf = {from:0, to:100, custom:false, state:'idle', prev:null, v:null, acc:null, ts:[], tStart:0, wallStart:0, dist:0, maxV:0, result:null};
if(prefs.perf && typeof prefs.perf.from === 'number'){ pf.from = prefs.perf.from; pf.to = prefs.perf.to; pf.custom = !!prefs.perf.custom; }
const fmtS = x => x.toFixed(2).replace('.', ',') + ' s';
const pkey = (a, b) => `${a}–${b}`;

function beep(freq = 880, dur = .12, vol = .25){
  if(!onOff('sound')) return;
  try{
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if(audio.state === 'suspended') audio.resume();
    const o = audio.createOscillator(), g = audio.createGain();
    o.frequency.value = freq; o.type = 'sine';
    g.gain.setValueAtTime(vol, audio.currentTime); g.gain.exponentialRampToValueAtTime(.001, audio.currentTime + dur);
    o.connect(g).connect(audio.destination); o.start(); o.stop(audio.currentTime + dur);
  }catch(e){}
}
function openPerf(){
  if(perfOn) return;
  if(!navigator.geolocation){ toast('Standort wird von diesem Browser nicht unterstützt.'); return; }
  perfOn = true; $('#perf').hidden = false;
  pf.state = 'idle'; pf.prev = null; pf.v = null; pf.ts = []; pf.result = null; pf.gpk = 0;
  gStart();
  pfWatch = navigator.geolocation.watchPosition(onPerfPos, err => {
    if(err.code === 1){ toast('Standortzugriff verweigert. Die Messung braucht deinen Standort.'); closePerf(); }
  }, {enableHighAccuracy:true, maximumAge:0, timeout:30000});
  requestWake();
  renderPerf();
}
function closePerf(){
  if(!perfOn) return;
  perfOn = false; $('#perf').hidden = true;
  if(pfWatch != null){ navigator.geolocation.clearWatch(pfWatch); pfWatch = null; }
  cancelAnimationFrame(pfRaf); releaseWake();
  if(!ckOn && !(rec && !rec.stopped)) gStop();
}
function setPreset(a, b, custom){
  if(['arm','wait','run'].includes(pf.state)) return;
  pf.from = a; pf.to = b; pf.custom = custom; pf.state = 'idle'; pf.result = null;
  prefs.perf = {from:a, to:b, custom}; savePrefs();
  renderPerf();
}
function interp(prev, cur, target){
  if(!prev || cur.v === prev.v) return cur.t;
  const f = Math.min(1, Math.max(0, (target - prev.v) / (cur.v - prev.v)));
  return prev.t + f * (cur.t - prev.t);
}
function onPerfPos(p){
  if(!perfOn) return;
  const c = p.coords, t = p.timestamp || Date.now(), pt = {lat:c.latitude, lng:c.longitude};
  let v = (c.speed != null && !isNaN(c.speed) && c.speed >= 0) ? c.speed * 3.6 : null;
  if(v == null && pf.prev && t - pf.prev.t >= 500) v = dist(pf.prev, pt) / ((t - pf.prev.t) / 1000) * 3.6;
  if(v == null) v = pf.prev ? pf.prev.v : 0;
  pf.v = v; pf.acc = c.accuracy;
  if(!ckOn) gGpsFix(v / 3.6, c.heading != null && !isNaN(c.heading) ? c.heading : null, t);
  pf.ts.push(t); if(pf.ts.length > 6) pf.ts.shift();
  const cur = {v, t, ...pt}, prev = pf.prev;

  if(pf.state === 'arm'){
    if(pf.from === 0 ? v < 3 : v < pf.from - 3){ pf.state = 'wait'; beep(660, .1); }
  } else if(pf.state === 'wait'){
    if(pf.from === 0){
      if(v >= 3){ pf.tStart = prev && prev.v < 3 ? interp(prev, cur, 1) : (prev ? prev.t : t); startRun(); }
    } else if(prev && prev.v < pf.from && v >= pf.from){ pf.tStart = interp(prev, cur, pf.from); startRun(); }
  } else if(pf.state === 'run'){
    if(prev) pf.dist += dist(prev, cur);
    pf.maxV = Math.max(pf.maxV, v);
    if(v >= pf.to){
      const tEnd = interp(prev, cur, pf.to), sec = (tEnd - pf.tStart) / 1000;
      const k = pkey(pf.from, pf.to), best = runs.filter(r => pkey(r.from, r.to) === k).reduce((m, r) => Math.min(m, r.time), Infinity);
      const ga = (pf.to - pf.from) / 3.6 / sec / 9.81;
      const r = {id:uid(), from:pf.from, to:pf.to, time:Math.round(sec * 100) / 100, dist:Math.round(pf.dist), date:Date.now(), hz:+hzNow().toFixed(1), acc:Math.round(pf.acc || 0), ga:+ga.toFixed(2), gp:+Math.max(ga, pf.gpk || 0).toFixed(2)};
      runs.unshift(r); saveRuns();
      pf.result = {...r, best: sec < best};
      pf.state = 'done'; cancelAnimationFrame(pfRaf);
      beep(1046, .18, .3); setTimeout(() => beep(1318, .25, .3), 160);
    } else if(v < pf.maxV - 8 || t - pf.tStart > 90000){
      pf.state = 'fail'; cancelAnimationFrame(pfRaf); beep(300, .3);
    }
  }
  pf.prev = cur;
  renderPerf();
}
function startRun(){
  pf.state = 'run'; pf.dist = 0; pf.maxV = pf.v; pf.wallStart = Date.now() - Math.max(0, Date.now() - pf.tStart);
  beep(990, .15, .3);
  pf.gpk = 0;
  const loop = () => {
    if(pf.state !== 'run') return;
    $('#pfTime').textContent = fmtS(Math.max(0, (Date.now() - pf.tStart) / 1000));
    const g = gNow(); if(g && g.lon > pf.gpk) pf.gpk = g.lon;
    $('#pfG').innerHTML = `<div class="live"><b>${fmtGn(g ? Math.max(0, g.lon) : 0)}</b><span>G jetzt</span></div><div><b>${fmtGn(pf.gpk)}</b><span>G Spitze</span></div>`;
    pfRaf = requestAnimationFrame(loop);
  };
  cancelAnimationFrame(pfRaf); pfRaf = requestAnimationFrame(loop);
}
function hzNow(){ const ts = pf.ts; return ts.length > 1 ? (ts.length - 1) / ((ts[ts.length - 1] - ts[0]) / 1000) : 0; }
function renderPerf(){
  if(!perfOn) return;
  const busy = ['arm','wait','run'].includes(pf.state);
  // Chips
  const chips = PRESETS.map(([a, b]) => `<button class="pf-chip ${!pf.custom && pf.from === a && pf.to === b ? 'on' : ''}" data-pp="${a}-${b}" ${busy ? 'disabled' : ''}>${a}–${b}</button>`).join('')
    + `<button class="pf-chip ${pf.custom ? 'on' : ''}" data-pp="custom" ${busy ? 'disabled' : ''}>Eigene</button>`;
  if($('#pfChips')._h !== chips){ $('#pfChips').innerHTML = chips; $('#pfChips')._h = chips; }
  $('#pfCustom').hidden = !pf.custom;
  // GPS
  const g = $('#pfGps'), hz = hzNow();
  if(pf.acc == null) { g.textContent = 'Warte auf GPS …'; g.classList.add('bad'); }
  else { g.textContent = `GPS ±${Math.round(pf.acc)} m · ${hz ? hz.toFixed(1).replace('.', ',') : '–'} Hz`; g.classList.toggle('bad', pf.acc > 15 || (hz && hz < .8)); }
  // Tempo + Balken
  $('#pfV').textContent = pf.v == null ? '–' : String(Math.round(pf.v < 1 ? 0 : pf.v));
  $('#pfFromL').textContent = pf.from; $('#pfToL').textContent = pf.to;
  const prog = pf.v == null ? 0 : Math.max(0, Math.min(1, (pf.v - pf.from) / (pf.to - pf.from)));
  $('#pfBar').style.width = (pf.state === 'done' ? 100 : prog * 100) + '%';
  $('#pfBar').style.background = pf.state === 'done' ? '#30d158' : pf.state === 'fail' ? '#ff453a' : '#0a84ff';
  // Zeit + Text
  const tm = $('#pfTime'), msg = $('#pfMsg');
  tm.classList.toggle('done', pf.state === 'done'); tm.classList.toggle('fail', pf.state === 'fail');
  const label = `${pf.from}–${pf.to} km/h`;
  if(pf.state === 'idle'){ tm.textContent = '0,00 s'; msg.innerHTML = `Messung <b>${label}</b>. Tippe auf Start.`; }
  if(pf.state === 'arm'){ tm.textContent = '0,00 s'; msg.innerHTML = pf.v == null ? 'Warte auf GPS …' : pf.from === 0 ? 'Halte an. Die Messung startet, sobald du stehst.' : `Werde langsamer als <b>${pf.from - 3} km/h</b>.`; }
  if(pf.state === 'wait'){ tm.textContent = '0,00 s'; msg.innerHTML = pf.from === 0 ? '<b>Bereit.</b> Fahr los – die Zeit startet automatisch.' : `<b>Bereit.</b> Beschleunige – die Zeit startet bei ${pf.from} km/h.`; }
  if(pf.state === 'run'){ msg.innerHTML = `Läuft … Ziel <b>${pf.to} km/h</b>`; }
  if(pf.state === 'done'){ const r = pf.result; tm.textContent = fmtS(r.time); msg.innerHTML = `<b>${label}</b> in ${fmtS(r.time)} · ${r.dist} m${r.best ? '<span class="pf-best">Bestzeit</span>' : ''}`; }
  if(pf.state === 'fail'){ tm.textContent = 'Abbruch'; msg.innerHTML = 'Das Tempo ist gefallen oder es hat zu lange gedauert. Nochmal?'; }
  if(pf.state === 'done' && pf.result) $('#pfG').innerHTML = `<div><b>${fmtGn(pf.result.ga)}</b><span>Ø G</span></div><div><b>${fmtGn(pf.result.gp)}</b><span>G Spitze</span></div>`;
  else if(pf.state !== 'run'){ const g = gNow(); $('#pfG').innerHTML = g && pf.state !== 'fail' ? `<div class="live"><b>${fmtGn(Math.abs(g.lon))}</b><span>G jetzt</span></div>` : ''; }
  // Button
  const go = $('#pfGo');
  go.textContent = busy ? 'Abbrechen' : pf.state === 'idle' ? 'Messung starten' : 'Nochmal';
  go.classList.toggle('abort', busy);
  renderRuns();
}
function renderRuns(){
  const bests = {};
  runs.forEach(r => { const k = pkey(r.from, r.to); if(!bests[k] || r.time < bests[k].time) bests[k] = r; });
  const html = runs.length ? runs.slice(0, 30).map(r => `<div class="pf-row"><span class="k">${r.from}–${r.to}</span><span class="v">${fmtS(r.time)}</span>${bests[pkey(r.from, r.to)] === r ? '<span class="pf-best">Best</span>' : ''}<span class="d">${fmtDate(r.date)}<br>Ø ${fmtGn(r.ga || (r.to - r.from) / 3.6 / r.time / 9.81)} G${r.gp && r.gp > (r.ga || 0) + .01 ? ` · max ${fmtGn(r.gp)}` : ''} · ${r.dist} m</span></div>`).join('')
    : '<div class="pf-empty">Noch keine Messungen.</div>';
  const l = $('#pfList'); if(l._h !== html){ l.innerHTML = html; l._h = html; }
  $('#pfClear').hidden = !runs.length;
}
$('#pfGo').addEventListener('click', () => {
  beep(0, .01, .001); // Audio im Klick freischalten
  if(['arm','wait','run'].includes(pf.state)){ pf.state = 'idle'; cancelAnimationFrame(pfRaf); renderPerf(); return; }
  if(pf.custom){
    const a = Math.max(0, Math.round(+$('#pfFrom').value || 0)), b = Math.round(+$('#pfTo').value || 0);
    if(!(b > a + 4)){ toast('„Bis“ muss mindestens 5 km/h über „Von“ liegen.'); return; }
    pf.from = a; pf.to = b; prefs.perf = {from:a, to:b, custom:true}; savePrefs();
  }
  pf.state = 'arm'; pf.result = null; pf.prev = null;
  renderPerf();
});
$('#pfChips').addEventListener('click', e => {
  const b = e.target.closest('[data-pp]'); if(!b || b.disabled) return;
  if(b.dataset.pp === 'custom'){ setPreset(+$('#pfFrom').value || 100, +$('#pfTo').value || 150, true); return; }
  const [a, z] = b.dataset.pp.split('-').map(Number); setPreset(a, z, false);
});
$('#pfClear').addEventListener('click', e => {
  if(!pfClearArmed){ pfClearArmed = true; e.target.textContent = 'Wirklich löschen?'; e.target.style.color = '#ff453a'; setTimeout(() => { pfClearArmed = false; e.target.textContent = 'Verlauf löschen'; e.target.style.color = ''; }, 3500); return; }
  runs = []; saveRuns(); pfClearArmed = false; e.target.textContent = 'Verlauf löschen'; e.target.style.color = ''; renderRuns();
});
document.addEventListener('click', e => {
  if(e.target.closest('[data-pf-open]')) return openPerf();
  if(e.target.closest('[data-pf="close"]')) return closePerf();
});
document.addEventListener('keydown', e => { if(e.key === 'Escape' && perfOn) closePerf(); });
if(pf.custom){ $('#pfFrom').value = pf.from; $('#pfTo').value = pf.to; }

/* ================= Rennstrecken ================= */
const CKEY = 'meine-spots-courses', EKEY = 'meine-spots-efforts';
let courses = [], efforts = [];
try{ courses = JSON.parse(localStorage.getItem(CKEY) || '[]'); if(!Array.isArray(courses)) courses = []; }catch(e){ courses = []; }
try{ efforts = JSON.parse(localStorage.getItem(EKEY) || '[]'); if(!Array.isArray(efforts)) efforts = []; }catch(e){ efforts = []; }
const saveCourses = () => { bkDirty(); try{ localStorage.setItem(CKEY, JSON.stringify(courses)); }catch(e){ toast('Speicher voll.'); } };
const saveEfforts = () => { bkDirty(); try{ localStorage.setItem(EKEY, JSON.stringify(efforts)); }catch(e){ toast('Speicher voll.'); } };
let sub = 'rec', selCourse = null, courseRenaming = false, courseDelArmed = false, ckTarget = null;
let drawing = false, draw = null, raceFlash = null;
const GATE = 30, CP_R = 50;
const fmtLap = sec => { if(sec >= 3600){ const h = Math.floor(sec/3600), m = Math.floor(sec%3600/60), x = Math.floor(sec%60); return `${h}:${String(m).padStart(2,'0')}:${String(x).padStart(2,'0')}`; }
  const m = Math.floor(sec/60), x = sec - m*60; return `${m}:${x.toFixed(2).padStart(5,'0').replace('.', ',')}`; };
const fmtDelta = d => `${d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(2).replace('.', ',')} s`;
const courseEfforts = id => efforts.filter(f => f.course === id).sort((a, b) => a.time - b.time);

document.addEventListener('click', e => {
  const b = e.target.closest('[data-sub]'); if(!b || b.dataset.sub === sub) return;
  sub = b.dataset.sub; renderTracksHead(); renderList(); updateTrackLayers(); if(mobile()) setSnap(sub !== 'rec' && (snap === 'peek' || snap === 'mini') ? 'half' : snap);
});

/* Geometrie (lokales Meter-System) */
function prepCourse(c){
  const lat0 = c.pts[0][1], lng0 = c.pts[0][0], kx = Math.cos(lat0 * Math.PI / 180) * 111320, ky = 110540;
  const toXY = (lng, lat) => [(lng - lng0) * kx, (lat - lat0) * ky];
  const xy = c.pts.map(q => toXY(q[0], q[1])), cum = [0];
  for(let i = 1; i < xy.length; i++) cum.push(cum[i-1] + Math.hypot(xy[i][0] - xy[i-1][0], xy[i][1] - xy[i-1][1]));
  const L = cum[cum.length - 1];
  const at = d => { d = Math.max(0, Math.min(L, d)); let i = 1; while(i < cum.length - 1 && cum[i] < d) i++;
    const f = (d - cum[i-1]) / ((cum[i] - cum[i-1]) || 1); return [xy[i-1][0] + f * (xy[i][0] - xy[i-1][0]), xy[i-1][1] + f * (xy[i][1] - xy[i-1][1])]; };
  const unit = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1; return [dx / n, dy / n]; };
  const sDir = unit(xy[0], at(Math.min(25, L / 4))), fDir = unit(at(Math.max(L - 25, L * .75)), xy[xy.length - 1]);
  const loop = Math.hypot(xy[0][0] - xy[xy.length-1][0], xy[0][1] - xy[xy.length-1][1]) < GATE;
  const step = Math.max(150, L / 15), cps = [];
  for(let d = step; d < L - step / 2; d += step) cps.push(at(d));
  const toLL = (x, y) => ({lng:x / kx + lng0, lat:y / ky + lat0});
  return {c, toXY, toLL, at, xy, cum, L, sO:xy[0], sDir, fO: loop ? xy[0] : xy[xy.length - 1], fDir: loop ? sDir : fDir, loop, cps};
}
function gateCross(prev, cur, o, dir){
  const sp = (prev[0] - o[0]) * dir[0] + (prev[1] - o[1]) * dir[1], sc = (cur[0] - o[0]) * dir[0] + (cur[1] - o[1]) * dir[1];
  if(!(sp < 0 && sc >= 0)) return null;
  const f = -sp / (sc - sp), cx = prev[0] + f * (cur[0] - prev[0]), cy = prev[1] + f * (cur[1] - prev[1]);
  const lat = Math.abs((cx - o[0]) * dir[1] - (cy - o[1]) * dir[0]);
  return lat <= GATE ? f : null;
}
function segPointDist(a, b, p){
  const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx*dx + dy*dy;
  const f = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
  return Math.hypot(a[0] + f * dx - p[0], a[1] + f * dy - p[1]);
}
function project(g, p, near){
  let best = {along:0, off:Infinity};
  for(let i = 1; i < g.xy.length; i++){
    if(near != null && (g.cum[i] < near - 150 || g.cum[i-1] > near + 600)) continue;
    const a = g.xy[i-1], b = g.xy[i], dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx*dx + dy*dy;
    const f = l2 ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2)) : 0;
    const off = Math.hypot(a[0] + f * dx - p[0], a[1] + f * dy - p[1]);
    if(off < best.off) best = {along:g.cum[i-1] + f * Math.sqrt(l2), off};
  }
  return best;
}

/* Matcher: verarbeitet einen Punkt-Strom und meldet Start/Ziel */
function makeMatcher(c){
  const g = prepCourse(c);
  const m = {g, prev:null, run:null};
  m.feed = (lat, lng, t) => {
    const p = g.toXY(lng, lat), ev = [];
    if(m.prev && t <= m.prev.t) return ev;
    const prev = m.prev; m.prev = {p, t};
    if(!prev) return ev;
    if(Math.hypot(p[0] - prev.p[0], p[1] - prev.p[1]) > 2500){ m.run = null; return ev; }
    const startRun = tt => { m.run = {start:tt, cp:0, prog:0, off:0, splits:[[0, 0]], lastSplit:0}; ev.push({type:'start', t:tt}); };
    if(m.run){
      const r = m.run;
      while(r.cp < g.cps.length && segPointDist(prev.p, p, g.cps[r.cp]) < CP_R) r.cp++;
      const pr = project(g, p, r.prog);
      r.off = pr.off > 100 ? r.off + 1 : 0;
      if(pr.along > r.prog && pr.along < r.prog + 800) r.prog = pr.along;
      if(r.prog - r.lastSplit >= 25){ r.splits.push([Math.round(r.prog), Math.round((t - r.start) / 100) / 10]); r.lastSplit = r.prog; }
      const ff = r.cp >= g.cps.length ? gateCross(prev.p, p, g.fO, g.fDir) : null;
      if(ff != null && (r.prog > g.L * .6 || g.cps.length > 0)){
        const tf = prev.t + ff * (t - prev.t), time = (tf - r.start) / 1000;
        r.splits.push([Math.round(g.L), Math.round(time * 10) / 10]);
        ev.push({type:'finish', start:r.start, time, splits:r.splits});
        m.run = null;
        if(g.loop) startRun(tf);
        return ev;
      }
      if(r.off >= 4 || t - r.start > 3 * 3600000){ m.run = null; ev.push({type:'abort'}); return ev; }
      if(!g.loop || r.prog < g.L * .5){
        const fs = gateCross(prev.p, p, g.sO, g.sDir);
        if(fs != null && r.prog > 60){ startRun(prev.t + fs * (t - prev.t)); return ev; }
      }
      r.now = t;
      return ev;
    }
    const fs = gateCross(prev.p, p, g.sO, g.sDir);
    if(fs != null) startRun(prev.t + fs * (t - prev.t));
    return ev;
  };
  return m;
}
const matchers = new Map();
function syncMatchers(){
  for(const id of [...matchers.keys()]) if(!courses.some(c => c.id === id)) matchers.delete(id);
  for(const c of courses) if(!matchers.has(c.id) || matchers.get(c.id).g.c !== c) matchers.set(c.id, makeMatcher(c));
}
function addEffort(cid, start, time, splits, src, trackId){
  if(efforts.some(f => f.course === cid && Math.abs(f.start - start) < 3000)) return null;
  const f = {id:uid(), course:cid, start:Math.round(start), time:Math.round(time * 100) / 100, splits, src, track:trackId || null};
  efforts.push(f); saveEfforts();
  return f;
}
function rankOf(f){ return courseEfforts(f.course).findIndex(x => x.id === f.id) + 1; }

/* Live */
let gpsClockOff = 0;
const runElapsed = r => (Date.now() - gpsClockOff - r.start) / 1000;
function feedLive(p){
  if(!courses.length) return;
  const c = p.coords; if(c.accuracy > 30) return;
  const t = p.timestamp || Date.now();
  gpsClockOff = Date.now() - t;
  for(const [cid, m] of matchers){
    for(const ev of m.feed(c.latitude, c.longitude, t)){
      const course = m.g.c;
      if(ev.type === 'start'){ if(ckOn) beep(880, .12); }
      if(ev.type === 'finish'){
        const ref = ghostRef(cid);
        const f = addEffort(cid, ev.start, ev.time, ev.splits, 'live');
        if(!f) continue;
        const rank = rankOf(f), n = courseEfforts(cid).length;
        const vs = ref && ref.rival ? (f.time < ref.time ? `${ref.name} geschlagen! ${fmtDelta(f.time - ref.time)}` : `${ref.name} war ${fmtDelta(ref.time - f.time).replace('−', '')} schneller`) : null;
        raceFlash = {cid, time:f.time, rank, n, vs, until:Date.now() + 12000};
        beep(1046, .18, .3); setTimeout(() => beep(1318, .25, .3), 160);
        toast(`${course.name}: ${fmtLap(f.time)} · ${vs || (rank === 1 ? 'Neue Bestzeit!' : `Platz ${rank} von ${n}`)}`);
        if(view === 'course' && selCourse === cid) renderCourseView();
        if(tab === 'tracks' && sub === 'race' && view === 'list') renderList();
      }
    }
  }
  if(ckOn) renderRaceCard();
}
function activeRun(){
  let best = null;
  for(const [cid, m] of matchers) if(m.run && (!best || m.run.start > best.run.start)) best = {cid, run:m.run, g:m.g};
  return best;
}
function bestAt(splits, prog){
  if(!splits || splits.length < 2) return null;
  for(let i = 1; i < splits.length; i++) if(splits[i][0] >= prog){
    const a = splits[i-1], b = splits[i], f = (prog - a[0]) / ((b[0] - a[0]) || 1);
    return a[1] + f * (b[1] - a[1]);
  }
  return null;
}
let raceRaf = null;
function renderRaceCard(){
  const el = $('#ckRace');
  if(!ckOn){ el.classList.remove('show'); return; }
  const ar = activeRun();
  if(raceFlash && Date.now() > raceFlash.until) raceFlash = null;
  let html = '';
  if(ar){
    const c = ar.g.c, el2 = runElapsed(ar.run), best = ghostRef(c.id), gname = best && best.rival ? best.name : 'Geist';
    const ref = best ? bestAt(best.splits, ar.run.prog) : null, delta = ref != null && ar.run.prog > 30 ? el2 - ref : null;
    html = `<div class="rn"><span class="fl">${svg(ICONS.flag, 11)}</span>${esc(c.name)}</div>
      <div class="rt"><b data-race-t>${fmtLap(el2)}</b>${delta != null ? `<span class="dl ${delta <= 0 ? 'neg' : 'pos'}">${fmtDelta(delta)}</span>` : ''}</div>
      <div class="pg"><i style="width:${Math.min(100, ar.run.prog / ar.g.L * 100)}%"></i></div>
      ${best ? (() => { const gp = progAt(best.splits, el2), gap = Math.round(gp - ar.run.prog); return Math.abs(gap) >= 5 ? `<div class="rs">${esc(gname)} ${Math.abs(gap)} m ${gap > 0 ? 'vor dir' : 'hinter dir'}</div>` : `<div class="rs">Gleichauf mit ${best.rival ? esc(gname) : 'dem Geist'}</div>`; })() : ''}`;
    cancelAnimationFrame(raceRaf);
    const tick = () => { const b = el.querySelector('[data-race-t]'); if(!b || !activeRun()) return; b.textContent = fmtLap(Math.max(0, runElapsed(activeRun().run))); raceRaf = requestAnimationFrame(tick); };
    raceRaf = requestAnimationFrame(tick);
  } else if(raceFlash){
    const c = courses.find(x => x.id === raceFlash.cid);
    html = `<div class="rn"><span class="fl">${svg(ICONS.flag, 11)}</span>${esc(c ? c.name : '')}</div>
      <div class="rt"><b class="fin">${fmtLap(raceFlash.time)}</b></div>
      <div class="rs">${raceFlash.vs ? esc(raceFlash.vs) : raceFlash.rank === 1 ? 'Neue Bestzeit!' : `Platz ${raceFlash.rank} von ${raceFlash.n}`}</div>`;
  } else if(ckTarget){
    const c = courses.find(x => x.id === ckTarget);
    if(c){
      const d = me ? dist(me, {lat:c.pts[0][1], lng:c.pts[0][0]}) : null, best = ghostRef(c.id);
      html = `<div class="rn"><span class="fl">${svg(ICONS.flag, 11)}</span>${esc(c.name)}</div>
        <div class="rt"><b style="font-size:24px">${d == null ? 'Warte auf GPS …' : `Zum Start: ${fmtDist(d)}`}</b></div>
        <div class="rs">Zeit startet an der grünen Linie${best ? best.rival ? ` · Gegen ${esc(best.name)}: ${fmtLap(best.time)}` : ` · Bestzeit ${fmtLap(best.time)}` : ''}</div>`;
    }
  }
  el.classList.toggle('show', !!html);
  if(el._h !== html){ el.innerHTML = html; el._h = html; }
}

/* Kartenlinien */
function courseFeat(c, props = {}){ return {type:'Feature', properties:props, geometry:{type:'LineString', coordinates:c.pts}}; }
function updateCourseLayers(){
  if(!mapReady) return;
  const showAll = tab === 'tracks' && sub === 'race' && view === 'list' && !ckOn;
  const ar = ckOn ? activeRun() : null;
  const focus = view === 'course' ? selCourse : ckOn ? (ar ? ar.cid : ckTarget) : null;
  setSrc('course-all', FC(showAll || view === 'course' ? courses.filter(c => c.id !== focus).map(c => courseFeat(c, {id:c.id})) : []));
  const c = focus && courses.find(x => x.id === focus);
  setSrc('course-view', FC(c ? [courseFeat(c)] : []));
  setSrc('course-ends', FC(c ? [{type:'Feature', properties:{k:'end'}, geometry:{type:'Point', coordinates:c.pts[c.pts.length - 1]}},
                                 {type:'Feature', properties:{k:'start'}, geometry:{type:'Point', coordinates:c.pts[0]}}] : []));
}

/* Liste */
function renderCourseList(){
  const body = $('#listBody');
  if(!courses.length){ body.innerHTML = `<div class="empty"><b>Noch keine Rennstrecken</b>Zeichne eine Strecke ein und fahr sie im Cockpit oder beim Aufzeichnen ab.</div>`; return; }
  body.innerHTML = courses.slice().sort((a, b) => b.created - a.created).map(c => {
    const ef = courseEfforts(c.id), best = ef[0];
    return `<button class="item" data-course="${c.id}"><span class="ic" style="--c:#bf5af2">${svg(ICONS.flag, 16)}</span><span class="tx"><span class="t">${esc(c.name)}</span>
      <span class="s">${fmtKm(c.len)}${c.loop ? ' · Rundkurs' : ''} · ${best ? `Bestzeit <span class="me-d">${fmtLap(best.time)}</span> · ${ef.length} Fahrt${ef.length > 1 ? 'en' : ''}` : 'Noch keine Zeit'}</span></span></button>`;
  }).join('');
}
$('#listBody').addEventListener('click', e => { const b = e.target.closest('[data-course]'); if(b) openCourse(b.dataset.course, true); });

/* Detail */
function fitCourse(c){
  const b = c.pts.reduce((b, q) => b.extend(q), new maplibregl.LngLatBounds(c.pts[0], c.pts[0]));
  requestAnimationFrame(() => map.fitBounds(b, {padding:camPad(), maxZoom:17, duration:1200}));
}
function openCourse(id, fly = true){
  const c = courses.find(x => x.id === id); if(!c) return;
  selCourse = id; courseRenaming = false; courseDelArmed = false;
  if(tab !== 'tracks') setTab('tracks');
  if(sub !== 'race'){ sub = 'race'; renderTracksHead(); renderList(); }
  renderCourseView(); show('course', mobile() && snap === 'full' ? 'full' : 'half');
  fitCourse(c);
}
function closeCourse(){ selCourse = null; renderList(); show('list', 'half'); }
function renderCourseView(){
  const c = courses.find(x => x.id === selCourse); if(!c) return;
  const ef = courseEfforts(c.id), best = ef[0];
  const rows = ef.map((f, i) => `<div class="lb-row"><span class="lb-rank ${i < 3 ? 'r' + (i + 1) : ''}">${i + 1}</span>
      <div style="display:flex;flex-direction:column"><span class="lb-time">${fmtLap(f.time)}</span><span class="lb-sub">${fmtDate(f.start)} · ${Math.round(c.len / f.time * 3.6)} km/h Ø</span></div>
      <span class="lb-delta">${i ? fmtDelta(f.time - best.time) : ''}</span>
      <button class="lb-del" data-cv="deleff" data-id="${f.id}" aria-label="Zeit löschen">${svg(UI.close, 12)}</button></div>`).join('');
  $('#courseView').innerHTML = `
    <div class="top"><button class="txtbtn" data-cv="back">${svg(UI.back,14)} Rennstrecken</button><button class="icon-btn press" data-cv="back" aria-label="Schließen">${svg(UI.close,14)}</button></div>
    <div class="pad">
      ${courseRenaming
        ? `<div class="row"><input class="inp" id="cv-name" value="${esc(c.name)}" maxlength="80"><button class="txtbtn bold" data-cv="renamesave">Fertig</button></div>`
        : `<div style="display:flex;flex-direction:column;gap:4px"><span class="badge" style="--c:#bf5af2"><span class="ic">${svg(ICONS.flag,13)}</span>Rennstrecke</span><h2>${esc(c.name)}</h2><span class="muted">${fmtKm(c.len)}${c.loop ? ' · Rundkurs' : ''}</span></div>`}
      <div class="tstats">
        <div><b>${best ? fmtLap(best.time) : '–'}</b><span>Bestzeit</span></div>
        <div><b>${best ? Math.round(c.len / best.time * 3.6) + ' km/h' : '–'}</b><span>Ø bei Bestzeit</span></div>
      </div>
      <div id="rwCourse">${rwCourseHTML(c)}</div>
      ${ghostChipsHTML(c)}
      <button class="btn primary" data-cv="drive">${svg(UI.gauge,16)} ${(() => { const r = ghostRef(c.id); return r && r.rival ? `Gegen ${esc(r.name)} fahren` : 'Jetzt fahren'; })()}</button>
      ${FB ? `<button class="btn" data-cv="ws">${WS.courses.some(x => x._id === c.id) ? 'In der Crew – Bestenliste der Crew ansehen' : 'In die Crew: Crew-Bestenliste'}</button>` : ''}
      <div class="card"><div class="h">Bestenliste</div>${rows ? `<div class="lb">${rows}</div>` : '<div class="muted">Noch keine Zeit. Tippe auf „Jetzt fahren“ und fahr über die grüne Startlinie.</div>'}</div>
      <button class="btn" data-cv="scan">Aufzeichnungen nach Zeiten durchsuchen</button>
      <div class="btns"><button class="btn" data-cv="rename">Umbenennen</button><button class="btn danger" data-cv="del">Löschen</button></div>
    </div>`;
  if(courseRenaming) setTimeout(() => { const i = $('#cv-name'); if(i){ i.focus(); i.select(); } }, 50);
  rwCourseLoad(c);
}
let effDelArmed = null;
$('#courseView').addEventListener('click', e => {
  const b = e.target.closest('[data-cv]'); if(!b) return;
  const c = courses.find(x => x.id === selCourse); if(!c) return;
  const a = b.dataset.cv;
  if(a === 'back') closeCourse();
  if(a === 'drive'){ ckTarget = c.id; enterCockpit(); updateCourseLayers(); renderRaceCard(); }
  if(a === 'ws'){
    if(WS.courses.some(x => x._id === c.id)){ closeCourse(); wsSub = 'lb'; wsOpenCourse = c.id; setTab('crew'); }
    else wsUploadCourse(c);
    return;
  }
  if(a === 'ghost'){ c.ghost = b.dataset.dev || null; saveCourses(); renderCourseView(); return; }
  if(a === 'rename'){ courseRenaming = true; renderCourseView(); }
  if(a === 'renamesave'){ c.name = $('#cv-name').value.trim() || c.name; saveCourses(); courseRenaming = false; renderCourseView(); }
  if(a === 'scan'){ let n = 0; tracks.forEach(t => n += scanTrack(t, c.id).length); renderCourseView(); toast(n ? `${n} neue Zeit${n > 1 ? 'en' : ''} gefunden` : 'Keine neuen Zeiten in deinen Aufzeichnungen'); }
  if(a === 'deleff'){
    const id = b.dataset.id;
    if(effDelArmed !== id){ effDelArmed = id; b.classList.add('armed'); setTimeout(() => { if(b.isConnected){ effDelArmed = null; b.classList.remove('armed'); } }, 3000); return; }
    efforts = efforts.filter(f => f.id !== id); saveEfforts(); effDelArmed = null; renderCourseView();
  }
  if(a === 'del'){
    if(!courseDelArmed){ courseDelArmed = true; b.classList.add('armed'); b.textContent = 'Wirklich löschen?'; setTimeout(() => { if(b.isConnected){ courseDelArmed = false; b.classList.remove('armed'); b.textContent = 'Löschen'; } }, 3500); return; }
    courses = courses.filter(x => x.id !== c.id); efforts = efforts.filter(f => f.course !== c.id);
    saveCourses(); saveEfforts(); syncMatchers(); selCourse = null;
    show('list', 'half'); renderList(); toast(`„${c.name}“ gelöscht`);
  }
});
$('#courseView').addEventListener('keydown', e => { if(e.key === 'Enter' && e.target.id === 'cv-name'){ e.preventDefault(); $('#courseView [data-cv="renamesave"]').click(); } });

/* Aufzeichnungen durchsuchen */
function scanTrack(t, onlyCid){
  const found = [];
  for(const c of courses){
    if(onlyCid && c.id !== onlyCid) continue;
    for(const sg of t.segs){
      const m = makeMatcher(c);
      for(const q of sg) for(const ev of m.feed(q[1], q[0], t.created + q[2] * 1000))
        if(ev.type === 'finish'){ const f = addEffort(c.id, ev.start, ev.time, ev.splits, 'track', t.id); if(f) found.push(f); }
    }
  }
  return found;
}

/* Geist: eigene Bestzeit oder die eines Freundes (aus der Gruppe oder aus einer geteilten Fahrt) */
function ghostOptions(c){
  const out = [], mine = courseEfforts(c.id)[0], byDev = new Map();
  if(mine) out.push({dev:null, by:'Du', time:mine.time, splits:mine.splits});
  (c.rivals || []).forEach(r => byDev.set(r.dev, r));
  WS.efforts.filter(f => f.course === c.id && f.dev !== myId() && f.splits && f.splits.length > 1)
    .forEach(f => { const cur = byDev.get(f.dev); if(!cur || f.time < cur.time) byDev.set(f.dev, {dev:f.dev, by:f.by, time:f.time, splits:f.splits, src:'ws'}); });
  return out.concat([...byDev.values()]).sort((a, b) => a.time - b.time);
}
function ghostRef(cid){
  const c = courses.find(x => x.id === cid); if(!c) return null;
  if(c.ghost){ const o = ghostOptions(c).find(x => x.dev === c.ghost); if(o && o.splits && o.splits.length > 1) return {...o, name:crewName(o.dev, o.by), rival:true}; }
  const b = courseEfforts(cid)[0];
  return b ? {dev:null, by:'Du', name:'Bestzeit', time:b.time, splits:b.splits, rival:false} : null;
}
function ghostChipsHTML(c){
  const opts = ghostOptions(c); if(!opts.some(o => o.dev)) return '';
  const sel = ghostRef(c.id), on = o => sel && (sel.rival ? sel.dev === o.dev : !o.dev);
  return `<div class="st-h">Geister-Rennen <em>gegen wen fährst du?</em></div>
    <div class="chips ghost-chips">${opts.map(o => `<button class="chip${on(o) ? ' on' : ''}" data-cv="ghost" data-dev="${esc(o.dev || '')}">${avHTML(o.dev || myId(), o.by, 22)}${esc(o.dev ? crewName(o.dev, o.by) : 'Du')} · ${fmtLap(o.time)}</button>`).join('')}</div>`;
}
function rivalFromDrive(t){
  const w = t._ws; if(!w) return;
  let c = courses.find(x => x.fromDrive === w.docId);
  if(c){ openCourse(c.id, true); return; }
  const flat = t.segs.flat(); let D = 0; const cum = [0];
  for(let i = 1; i < flat.length; i++) cum.push(D += dist({lat:flat[i-1][1], lng:flat[i-1][0]}, {lat:flat[i][1], lng:flat[i][0]}));
  if(flat.length < 10 || D < 800){ toast('Die Fahrt ist zu kurz für ein Rennen.'); return; }
  // 40 m nach dem Anfang starten und 40 m vor dem Ende aufhören, damit die Fahrt Start und Ziel sauber überquert
  const pts = simplify(flat.filter((q, i) => cum[i] >= 40 && cum[i] <= D - 40).map(q => [q[0], q[1]]), 4);
  c = {id:uid(), name:`${w.by}: ${t.name}`.slice(0, 80), created:Date.now(), pts:pts.map(q => [+q[0].toFixed(6), +q[1].toFixed(6)]), len:0, loop:false, fromDrive:w.docId, from:w.by};
  c.len = Math.round(lineLen(c.pts));
  c.loop = dist({lat:c.pts[0][1], lng:c.pts[0][0]}, {lat:c.pts[c.pts.length-1][1], lng:c.pts[c.pts.length-1][0]}) < GATE;
  // Zeit des Freundes genauso messen wie deine
  const m = makeMatcher(c); let fin = null;
  for(const q of flat){ for(const ev of m.feed(q[1], q[0], t.created + q[2] * 1000)) if(ev.type === 'finish' && !fin) fin = ev; if(fin) break; }
  if(!fin){   // Notlösung: Fortschritt entlang der Strecke über die Zeit
    const g = prepCourse(c), sp = [[0, 0]]; let t0 = null, prog = 0, last = 0;
    for(const q of flat){ const pr = project(g, g.toXY(q[0], q[1]), prog); if(pr.off > 60) continue; if(t0 == null){ if(pr.along > 30) continue; t0 = q[2]; }
      if(pr.along > prog && pr.along < prog + 800) prog = pr.along; if(prog - last >= 25){ sp.push([Math.round(prog), Math.round((q[2] - t0) * 10) / 10]); last = prog; } }
    if(t0 != null && prog > c.len * .9){ const tt = sp[sp.length - 1][1]; sp.push([c.len, tt]); fin = {time:tt, splits:sp}; }
  }
  if(!fin){ toast('Aus dieser Fahrt lässt sich keine Zeit ablesen.'); return; }
  c.rivals = [{dev:w.dev, by:w.by, time:Math.round(fin.time * 100) / 100, splits:fin.splits, src:'drive'}]; c.ghost = w.dev;
  courses.push(c); saveCourses(); syncMatchers();
  let n = 0; tracks.forEach(tt => n += scanTrack(tt, c.id).length);
  openCourse(c.id, true);
  toast(`Rennen gegen ${w.by}: ${fmtLap(fin.time)} auf ${fmtKm(c.len)}${n ? ` · ${n} eigene Zeit${n > 1 ? 'en' : ''} gefunden` : ''} – fahr über die grüne Linie`);
}

/* Rennstrecke aus Aufzeichnung */
function simplify(pts, tol){
  if(pts.length < 3) return pts;
  const lat0 = pts[0][1], kx = Math.cos(lat0 * Math.PI / 180) * 111320, ky = 110540;
  const xy = pts.map(q => [q[0] * kx, q[1] * ky]), keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while(stack.length){
    const [a, b] = stack.pop(); let mi = -1, md = tol;
    for(let i = a + 1; i < b; i++){ const d = segPointDist(xy[a], xy[b], xy[i]); if(d > md){ md = d; mi = i; } }
    if(mi > 0){ keep[mi] = 1; stack.push([a, mi], [mi, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
function lineLen(pts){ let L = 0; for(let i = 1; i < pts.length; i++) L += dist({lat:pts[i-1][1], lng:pts[i-1][0]}, {lat:pts[i][1], lng:pts[i][0]}); return L; }
function createCourse(name, pts){
  const c = {id:uid(), name, created:Date.now(), pts:pts.map(q => [+q[0].toFixed(6), +q[1].toFixed(6)]), len:0, loop:false};
  c.len = Math.round(lineLen(c.pts));
  c.loop = dist({lat:c.pts[0][1], lng:c.pts[0][0]}, {lat:c.pts[c.pts.length-1][1], lng:c.pts[c.pts.length-1][0]}) < GATE;
  courses.push(c); saveCourses(); syncMatchers();
  let n = 0; tracks.forEach(t => n += scanTrack(t, c.id).length);
  return {c, n};
}
function courseFromTrack(t){
  const ex = courses.find(x => x.fromTrack === t.id); if(ex){ openCourse(ex.id, true); return; }
  const flat = t.segs.flat(); let D = 0; const cum = [0];
  for(let i = 1; i < flat.length; i++) cum.push(D += dist({lat:flat[i-1][1], lng:flat[i-1][0]}, {lat:flat[i][1], lng:flat[i][0]}));
  // wie beim Geister-Rennen: 40 m innen anfangen und aufhören, sonst überquert die eigene Fahrt die Startlinie nie
  const pts = simplify(flat.filter((q, i) => cum[i] >= 40 && cum[i] <= D - 40).map(q => [q[0], q[1]]), 4);
  if(pts.length < 2 || lineLen(pts) < 100){ toast('Die Aufzeichnung ist zu kurz für eine Rennstrecke.'); return; }
  const {c, n} = createCourse(t.name, pts); c.fromTrack = t.id; saveCourses();
  openCourse(c.id, true);
  toast(n ? `Rennstrecke erstellt · ${n} Zeit${n > 1 ? 'en' : ''} aus Aufzeichnungen` : 'Rennstrecke erstellt');
}

/* Einzeichnen */
document.addEventListener('click', e => { if(e.target.closest('[data-race="draw"]')) startDraw(); });
function startDraw(){
  if(rec && !rec.stopped && ckOn) return;
  drawing = true; draw = {wps:[], legs:[], loopLeg:null, snap:true, loop:false, name:`Rennstrecke ${courses.length + 1}`, busy:0, warned:false};
  $('#map').classList.add('placing');
  renderDraw(); show('draw', 'peek'); drawMap();
}
function endDraw(){ drawing = false; draw = null; $('#map').classList.remove('placing'); drawMap(); }
function drawPts(){
  const out = [];
  const push = arr => arr.forEach(q => { const l = out[out.length - 1]; if(!l || l[0] !== q[0] || l[1] !== q[1]) out.push(q); });
  if(draw.wps.length) push([[draw.wps[0].lng, draw.wps[0].lat]]);
  draw.legs.forEach(push);
  if(draw.loop && draw.loopLeg) push(draw.loopLeg);
  return out;
}
function drawMap(){
  if(!draw){ setSrc('draw-line', FC([])); setSrc('draw-pts', FC([])); return; }
  const pts = drawPts();
  setSrc('draw-line', FC(pts.length > 1 ? [{type:'Feature', properties:{}, geometry:{type:'LineString', coordinates:pts}}] : []));
  setSrc('draw-pts', FC(draw.wps.map((w, i) => ({type:'Feature', properties:{k: i === 0 ? 'start' : (i === draw.wps.length - 1 && !draw.loop ? 'end' : 'mid'), end: i === 0 || (i === draw.wps.length - 1 && !draw.loop)}, geometry:{type:'Point', coordinates:[w.lng, w.lat]}}))));
}
async function routeLeg(a, b){
  const straight = [[a.lng, a.lat], [b.lng, b.lat]];
  if(!draw.snap) return straight;
  try{
    const ctl = new AbortController(); setTimeout(() => ctl.abort(), 8000);
    const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`, {signal:ctl.signal});
    const j = await r.json();
    const co = j.routes && j.routes[0] && j.routes[0].geometry.coordinates;
    if(co && co.length > 1) return [[a.lng, a.lat], ...co, [b.lng, b.lat]];
  }catch(e){}
  if(!draw.warned){ draw.warned = true; toast('Straßenverlauf gerade nicht erreichbar – gerade Linie verwendet.'); }
  return straight;
}
async function addDrawPoint(ll){
  if(!draw || draw.busy) return;
  const w = {lng:ll.lng, lat:ll.lat};
  if(!draw.wps.length){ draw.wps.push(w); renderDraw(); drawMap(); return; }
  draw.busy++; renderDraw();
  const prev = draw.wps[draw.wps.length - 1];
  draw.wps.push(w); draw.legs.push([[prev.lng, prev.lat], [w.lng, w.lat]]); drawMap();
  const leg = await routeLeg(prev, w);
  if(!draw) return;
  draw.legs[draw.legs.length - 1] = leg;
  if(draw.loop) draw.loopLeg = await routeLeg(w, draw.wps[0]);
  if(!draw) return;
  draw.busy--; renderDraw(); drawMap();
}
function renderDraw(){
  if(!draw) return;
  const pts = drawPts(), L = pts.length > 1 ? lineLen(pts) : 0, ok = L >= 100 && !draw.busy;
  $('#drawView').innerHTML = `
    <div class="top"><button class="txtbtn" data-dr="cancel">Abbrechen</button><strong>Rennstrecke</strong><button class="txtbtn bold" data-dr="save" ${ok ? '' : 'disabled style="opacity:.4"'}>Speichern</button></div>
    <div class="pad">
      <div class="mode" style="padding:0"><div class="big"><span class="pulse"></span>${!draw.wps.length ? 'Tippe auf der Karte den Startpunkt.' : draw.busy ? 'Suche Straßenverlauf …' : 'Tippe weitere Punkte bis zum Ziel.'}</div></div>
      <div class="stats"><div><b>${fmtKm(L)}</b><span>Länge</span></div><div><b>${draw.wps.length}</b><span>Punkte</span></div></div>
      <div class="btns"><button class="btn" data-dr="undo" ${draw.wps.length ? '' : 'disabled style="opacity:.4"'}>Rückgängig</button><button class="btn" data-dr="center">Kartenmitte</button></div>
      <div class="toggle"><span>Straßen folgen<small>Die Linie läuft automatisch die Straße entlang.</small></span><input type="checkbox" class="sw" id="dr-snap" ${draw.snap ? 'checked' : ''} aria-label="Straßen folgen"></div>
      <div class="toggle"><span>Rundkurs<small>Ziel ist gleich Start, mehrere Runden möglich.</small></span><input type="checkbox" class="sw" id="dr-loop" ${draw.loop ? 'checked' : ''} aria-label="Rundkurs"></div>
      <label class="f">Name<input class="inp" id="dr-name" value="${esc(draw.name)}" maxlength="80"></label>
    </div>`;
}
$('#drawView').addEventListener('input', e => { if(e.target.id === 'dr-name' && draw) draw.name = e.target.value; });
$('#drawView').addEventListener('change', async e => {
  if(!draw) return;
  if(e.target.id === 'dr-snap') draw.snap = e.target.checked;
  if(e.target.id === 'dr-loop'){
    draw.loop = e.target.checked;
    if(draw.loop && draw.wps.length > 1){ draw.busy++; renderDraw(); draw.loopLeg = await routeLeg(draw.wps[draw.wps.length - 1], draw.wps[0]); if(!draw) return; draw.busy--; }
    renderDraw(); drawMap();
  }
});
$('#drawView').addEventListener('click', e => {
  const b = e.target.closest('[data-dr]'); if(!b || !draw || b.disabled) return;
  const a = b.dataset.dr;
  if(a === 'cancel'){ endDraw(); show('list', 'half'); }
  if(a === 'center') addDrawPoint(map.getCenter());
  if(a === 'undo' && !draw.busy){
    draw.wps.pop(); draw.legs.pop();
    if(draw.loop && draw.wps.length > 1) routeLeg(draw.wps[draw.wps.length - 1], draw.wps[0]).then(l => { if(draw){ draw.loopLeg = l; drawMap(); } }); else draw.loopLeg = null;
    renderDraw(); drawMap();
  }
  if(a === 'save'){
    const pts = drawPts(); if(lineLen(pts) < 100) return;
    const name = (draw.name || '').trim() || `Rennstrecke ${courses.length + 1}`;
    endDraw();
    const {c, n} = createCourse(name, pts);
    openCourse(c.id, false);
    toast(n ? `Rennstrecke gespeichert · ${n} Zeit${n > 1 ? 'en' : ''} aus Aufzeichnungen` : 'Rennstrecke gespeichert');
  }
});
syncMatchers();

/* Unterbrochene Aufzeichnung wiederherstellen */
try{
  const r = JSON.parse(localStorage.getItem(RKEY) || 'null');
  if(r && Array.isArray(r.segs)){
    rec = r; rec.last = null;
    if(!rec.stopped && rec.runFrom){ rec.active += Math.max(0, (rec.lastSeen || rec.runFrom) - rec.runFrom); rec.runFrom = null; }
  }
}catch(e){ rec = null; }

/* ================= Start ================= */
$('#addBtn').innerHTML = svg(UI.plus, 18, 2.4);
$('#hereBtn').innerHTML = svg('<path d="M12 21s-6-5.8-6-10.4a6 6 0 0 1 12 0C18 15.2 12 21 12 21z"/><path d="M12 8v5M9.5 10.5h5"/>', 19);
$('#searchBtn').innerHTML = svg(UI.search, 18);
$('#collapseBtn').innerHTML = svg(UI.sidebar, 18);
$('#panelOpen').innerHTML = svg(UI.list, 20);
$('#searchIc').innerHTML = svg(UI.search, 15);
$('#b-locate').innerHTML = svg(UI.locate, 19);
$('#b-layers').innerHTML = svg(UI.layers, 20);
$('#popTimer').innerHTML = svg(UI.timer, 17);
$('#popSet').innerHTML = svg(UI.gear, 17, 2);
applyTheme();
$('#b-compass').innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M12 3.5 15.2 12H8.8z" fill="#ff5a5f"/><path d="M12 20.5 8.8 12h6.4z" fill="#d5dae2"/></svg>';
if(prefs.pcol && !mobile()) setCollapsed(true);
$('#popOff').innerHTML = svg('<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/>', 17);
if('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
$('#b-3d').classList.toggle('on', !!prefs.terrain);
$('#recbar [data-rec="stop"]').innerHTML = svg(UI.stop, 16);
$('#recbar [data-ck-open]').innerHTML = svg(UI.gauge, 18);
$('#b-cockpit').innerHTML = svg(UI.gauge, 19);
$('#ckRecenter').innerHTML = svg(UI.locate, 19) + '<span>Zentrieren</span>';
$('#perf [data-pf="close"]').innerHTML = svg(UI.close, 15);
$('#rpBar [data-rp="close"]').innerHTML = svg(UI.close, 16);
$('#death [data-dl="close"]').innerHTML = svg(UI.close, 15);
applyLabels(); syncSpotsHead(); refreshAll();
handleHash();
if(onbNeeded()){ if(!hashSpot) openOnb(); } else if(!prefs.onb){ prefs.onb = 1; savePrefs(); }
const idle = (f, t) => window.requestIdleCallback ? requestIdleCallback(f, {timeout:t}) : setTimeout(f, Math.min(t, 1500));
if(grp()) idle(() => wsSync(false), 3000);
setTimeout(() => idle(() => { if(navigator.serviceWorker && navigator.serviceWorker.controller && !car3d.ready) fetch('lib/three.min.js').catch(() => {}); }, 20000), 15000);
renderPark();
if(rec){
  setTab('tracks'); renderTracksHead(); updateRecUI(); renderNearest();
  if(rec.stopped) setTimeout(openTrackSave, 300); else toast('Aufzeichnung wiederhergestellt – pausiert. Tippe ▶ zum Fortsetzen.');
}
if(mobile()) setSnap('peek', false);
requestAnimationFrame(() => fitAll(false));
(async () => {
  let granted = prefs.gps;
  try{ const st = await navigator.permissions?.query({name:'geolocation'}); if(st) granted = st.state === 'granted' || (st.state === 'prompt' && prefs.gps); }catch(e){}
  if(granted) startGPS(false);
})();
})();
