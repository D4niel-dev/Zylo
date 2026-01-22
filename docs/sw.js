const CACHE_NAME = 'zylo-site-v1';
const ASSETS = [
  './',
  './index.html',
  './css/design-system.css',
  './css/sections.css',
  './css/components.css',
  './js/main.js',
  './js/animations.js',
  './assets/icons/Zylo_icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
