const CACHE='peak-progress-v2-24-dev2';
const CORE=['./','./index.html','./manifest.webmanifest?v=2231','./icon-192.png?v=2231','./icon-512.png?v=2231','./audio/rain.mp3','./audio/ocean.mp3','./audio/river-wind.mp3','./audio/soft-chime.mp3'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{let copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match('./index.html'))))});
