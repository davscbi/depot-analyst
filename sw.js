// Offline-Cache für Depot Analyst. Inhalte sind verschlüsselt; der Cache enthält nur die verschlüsselte Seite.
const CACHE='depot-analyst-1f7c98646c';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./favicon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url); if(url.origin!==location.origin) return;
  const isPage=req.mode==='navigate'||url.pathname.endsWith('/')||url.pathname.endsWith('index.html');
  if(isPage){ // Netz zuerst, damit Updates ankommen; offline aus dem Cache
    e.respondWith(fetch(req).then(r=>{const cp=r.clone(); caches.open(CACHE).then(c=>c.put('./index.html',cp)); return r}).catch(()=>caches.match('./index.html')));
  } else {
    e.respondWith(caches.match(req).then(r=>r||fetch(req)));
  }
});
