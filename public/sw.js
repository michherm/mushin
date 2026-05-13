/**
 * Mushin Service Worker
 *
 * Strategie: minimaler "stale-while-revalidate" für statische Assets,
 * "network-first" für HTML.
 *
 * Ziel: App bleibt nutzbar, wenn du in der U-Bahn keinen Empfang hast
 * und schnell zum Stand-Modul greifen musst.
 *
 * Bewusst klein. Keine Bibliothek. Keine 50 Caches.
 */

const CACHE_NAME = 'mushin-v1';

/* Erste Schicht: bei Installation legen wir das Notwendigste an. */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['/']))
  );
  self.skipWaiting();
});

/* Alte Caches bereinigen, wenn neue Version installiert wird. */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch-Strategie. */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  /* Navigationsanfragen (HTML): network-first, Fallback auf Cache. */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/')))
    );
    return;
  }

  /* Assets: stale-while-revalidate. */
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          /* Nur valide Antworten cachen */
          if (response.ok && response.type !== 'opaque') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
