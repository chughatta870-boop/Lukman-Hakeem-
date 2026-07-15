const CACHE_NAME = 'lukman-hakeem-v2'; // ورژن چینج کر دیا
const URLS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap' // فونٹ بھی cache
];

// 1. INSTALL - سب فائلیں Cache کریں
self.addEventListener('install', event => {
  self.skipWaiting(); // نیا SW فوراً ایکٹیو
  event.waitUntil(
    caches.open(CACHE_NAME)
     .then(cache => {
       console.log('Cache Opened');
       return cache.addAll(URLS_TO_CACHE);
     })
     .catch(err => console.log('Cache Error:', err))
  );
});

// 2. FETCH - پہلے Cache, نہ ملے تو Network, وہ بھی نہ ملے تو index
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
     .then(response => {
       return response || fetch(event.request);
     })
     .catch(() => {
       // اگر نیٹ نہیں اور فائل cache میں بھی نہیں
       if (event.request.mode === 'navigate') {
         return caches.match('./index.html');
       }
     })
  );
});

// 3. ACTIVATE - پرانے cache ڈیلیٹ
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // فوراً کنٹرول
});
