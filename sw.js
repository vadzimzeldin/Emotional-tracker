const CACHE_NAME = 'sostoyanie-v1';
const ASSETS = [
  '/Emotional-tracker/',
  '/Emotional-tracker/index.html',
  '/Emotional-tracker/manifest.json',
  '/Emotional-tracker/icons/icon-192.png',
  '/Emotional-tracker/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request).catch(() => new Response('Офлайн', { status: 503 })))
  );
});
