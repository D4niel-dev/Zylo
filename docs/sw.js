const CACHE_NAME = 'zylo-site-v4';
const ASSETS = [
  './',
  './index.html',
  './documentation.html',
  './privacy.html',
  './terms.html',
  './css/design-system.css',
  './css/sections.css',
  './css/components.css',
  './js/main.js',
  './js/animations.js',
  './assets/icons/Zylo_icon.png'
];

// Install: Skip waiting to activate immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // Force activation immediately
  );
});

// Activate: Delete all old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME) // Keep only current cache
          .map((name) => caches.delete(name))    // Delete old caches
      );
    }).then(() => self.clients.claim()) // Take control of all clients immediately
  );
});

// Fetch: Cache-first strategy
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
