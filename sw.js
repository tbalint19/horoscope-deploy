const OFFLINE_URL = '/offline.html';

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open('offline-cache').then((c) => c.add(OFFLINE_URL)));
});

self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE_URL)));
  }
});