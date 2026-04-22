const CACHE_NAME = 'notes-app-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// इंस्टॉल होते ही तुरंत कैश करो
self.addEventListener('install', event => {
  self.skipWaiting(); // तुरंत एक्टिवेट हो जाओ
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// पहले कैश से दो, नहीं मिला तो नेटवर्क से लाओ
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// पुराना कैश हटाओ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => clients.claim())
  );
});
