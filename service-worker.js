self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('lexical-analysis-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/main.js',
        '/click-sound.mp3',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
        '/favicon.ico',
        // Add any other assets that should be cached
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});