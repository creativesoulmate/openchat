const CACHE_NAME = 'whatsapp-launcher-cache-v1';
const urlsToCache = [
  '/', // your index.html
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  // add your CSS, JS, font URLs here
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap',
  // You can also cache your favicon, images etc.
];

// Install event - cache important files
self.addEventListener('install', event => {
  console.log('✅ Service Worker: Installing and caching...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - cleanup old caches if you want
self.addEventListener('activate', event => {
  console.log('✅ Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch event - respond with cache or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return cached file
        return cachedResponse;
      }
      // Otherwise fetch from network
      return fetch(event.request);
    })
  );
});
