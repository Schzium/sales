const CACHE = 'sal-app-v67';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).then(r => {
    if (r && r.status === 200 && e.request.method === 'GET') {
      const clone = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
    }
    return r;
  }).catch(() => caches.match(e.request)));
});